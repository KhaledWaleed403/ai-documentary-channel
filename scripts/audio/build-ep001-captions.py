"""Episode 001 captions, aligned to the real narration audio.

Every narration take is a separate Kokoro snippet placed at a known frame, and
Kokoro leaves a short silence at each punctuation mark (sentence 0.4 s,
clause 0.3 s). For each take this script:
  1. finds the speech window and the silent gaps inside it (10 ms RMS gate);
  2. splits the narration into phrases at punctuation and snaps each phrase
     boundary to the matching measured gap (falling back to a weighted
     character estimate only if no gap is near);
  3. splits long phrases into caption-sized chunks (timed by character share
     inside the phrase) and balances them over at most two lines.
It writes captions.json (cues in frames, for the Remotion caption overlay) and
captions.srt (same cues, for upload), and prints an alignment report.

Run from the project root with the Kokoro venv's Python:
  ~/.luminexplain-kokoro/.venv/Scripts/python.exe -I scripts/audio/build-ep001-captions.py <target> [...]
Targets: short:<Name>:<version>  ·  original:v2.4  ·  long
"""
import json
import re
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[2]
EP = ROOT / "episodes" / "episode-001"
FPS = 30
GATE_DB = -45.0
MIN_GAP = 0.09  # seconds of silence that count as a Kokoro pause

# Spoken forms written for TTS → reading forms for captions (display only).
DISPLAY = [
    ("mid-nineteen-forties", "mid-1940s"),
    ("nineteen forty-five", "1945"),
    ("nineteen sixty-seven", "1967"),
    ("nineteen forties", "1940s"),
    ("Four hundred and ninety-five dollars", "$495"),
    ("about two and a half billion times", "about 2.5 billion times"),
    ("about ten centimeters", "about 10 centimeters"),
    ("about twelve", "about 12"),
]


def display(text: str) -> str:
    for a, b in DISPLAY:
        text = text.replace(a, b)
    return text


def analyse(path: Path) -> tuple[float, float, list[tuple[float, float]]]:
    data, rate = sf.read(path, dtype="float64")
    if data.ndim > 1:
        data = data.mean(axis=1)
    hop = int(rate * 0.01)
    n = len(data) // hop
    db = 20 * np.log10(np.sqrt(np.mean(data[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12))
    voiced = db > GATE_DB
    idx = np.where(voiced)[0]
    s0, s1 = idx[0], idx[-1] + 1
    gaps, i = [], s0
    while i < s1:
        if not voiced[i]:
            j = i
            while j < s1 and not voiced[j]:
                j += 1
            if (j - i) * 0.01 >= MIN_GAP:
                gaps.append((i * 0.01, j * 0.01))
            i = j
        else:
            i += 1
    return s0 * 0.01, s1 * 0.01, gaps


def phrases(text: str) -> list[str]:
    # Split after , . ; : ? ! and around em dashes, keeping the punctuation.
    parts = re.split(r"(?<=[,.;:?!])\s+|\s+(?=—)|(?<=—)\s+", text)
    out: list[str] = []
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if p == "—" and out:
            out[-1] += " —"
        else:
            out.append(p)
    return out


def weight(s: str) -> float:
    return sum(7.0 if c in ".?!" else 5.5 if c in ",;:—" else 1.0 for c in s)


def align(text: str, s0: float, s1: float, gaps: list[tuple[float, float]]) -> tuple[list[tuple[str, float, float]], int, int]:
    ps = phrases(text)
    total = sum(weight(p) for p in ps)
    est, acc = [], 0.0
    for p in ps[:-1]:
        acc += weight(p)
        est.append(s0 + (s1 - s0) * acc / total)
    # Snap each boundary, in order, to the nearest unused gap after the last one.
    bounds, used, snapped = [], -1, 0
    for e in est:
        best = None
        for k in range(used + 1, len(gaps)):
            mid = (gaps[k][0] + gaps[k][1]) / 2
            if abs(mid - e) <= 0.8 and (best is None or abs(mid - e) < abs((gaps[best][0] + gaps[best][1]) / 2 - e)):
                best = k
        if best is None:
            bounds.append((e, e))
        else:
            bounds.append(gaps[best])
            used = best
            snapped += 1
    out, start = [], s0
    for p, (g0, g1) in zip(ps, bounds):
        out.append((p, start, g0))
        start = g1
    out.append((ps[-1], start, s1))
    return out, snapped, len(est)


# Words a caption chunk or line shouldn't end on, and words it's natural to
# break before.
STOP = {"the", "a", "an", "to", "of", "and", "in", "by", "for", "with", "its", "your", "their", "from", "at", "on", "as", "or",
        "that", "is", "be", "been", "had", "has", "was", "can", "may", "it's", "should", "around", "into", "every", "this"}
BREAK_BEFORE = {"and", "or", "but", "to", "into", "in", "from", "for", "with", "by", "around", "while", "when", "after", "before", "then", "that", "so", "than"}
# Word pairs that read as one unit and shouldn't be split across lines or cues.
KEEP = {("back", "and"), ("and", "forth"), ("positive", "and"), ("and", "negative"), ("glass", "or"), ("or", "plastic"),
        ("coffee", "or"), ("or", "sugar"), ("let", "it"), ("it", "stand"), ("tugging", "and"), ("and", "bumping"), ("metal", "box"), ("candy", "bar")}


def split_score(words: list[str], i: int) -> float:
    l1, l2 = " ".join(words[:i]), " ".join(words[i:])
    short = 6 if min(len(l1), len(l2)) < 12 else 0
    keep = 20 if (words[i - 1].lower().strip(",.—"), words[i].lower().strip(",.—")) in KEEP else 0
    return 0.5 * abs(len(l1) - len(l2)) + short + keep + (10 if words[i - 1].lower() in STOP else 0) - (4 if words[i].lower() in BREAK_BEFORE else 0)


def chunk(phrase: str, a: float, b: float, limit: int) -> list[tuple[str, float, float]]:
    # Too long for one two-line cue: split at the best word boundary, recursively,
    # timing each part by its share of the characters.
    if len(phrase) <= limit * 2:
        return [(phrase, a, b)]
    words = phrase.split()
    i = min(range(1, len(words)), key=lambda k: split_score(words, k))
    left, right = " ".join(words[:i]), " ".join(words[i:])
    mid = a + (b - a) * len(left) / (len(left) + len(right))
    return chunk(left, a, mid, limit) + chunk(right, mid, b, limit)


def lines(text: str, limit: int) -> list[str]:
    if len(text) <= limit + 4:
        return [text]
    words = text.split()
    i = min(range(1, len(words)), key=lambda k: split_score(words, k) + (3 if len(" ".join(words[:k])) < len(" ".join(words[k:])) * 0.6 else 0))
    return [" ".join(words[:i]), " ".join(words[i:])]


def build(items: list[tuple[str, Path, int]], limit: int, min_frames: int) -> tuple[list[dict], list[str]]:
    """items: (narration text, take path, absolute frame where the take starts)."""
    cues, report = [], []
    for text, take, frame0 in items:
        s0, s1, gaps = analyse(take)
        aligned, snapped, total = align(text, s0, s1, gaps)
        report.append(f"{take.name}: {snapped}/{total} phrase boundaries snapped to measured pauses")
        # Merge a very short phrase into the next one if both fit in one cue,
        # but never across the end of a statement (".").
        merged: list[tuple[str, float, float]] = []
        for p, a, b in aligned:
            prev = merged[-1] if merged else None
            if prev and (prev[2] - prev[1] < 0.55 or len(prev[0]) < 14) and not prev[0].endswith(".") and len(prev[0]) + len(p) + 1 <= limit * 2:
                q = merged.pop()
                merged.append((q[0] + " " + p, q[1], b))
            else:
                merged.append((p, a, b))
        for p, a, b in merged:
            for x, c, d in chunk(p, a, b, limit):
                cues.append({"text": display(x), "start": frame0 + c * FPS, "end": frame0 + d * FPS})
    # Frames, continuity and minimum duration.
    for i, cue in enumerate(cues):
        nxt = cues[i + 1]["start"] if i + 1 < len(cues) else None
        start = int(round(cue["start"])) - 2  # appear a hair before the word
        end = int(round(cue["end"])) + 8
        if nxt is not None:
            gap = nxt - cue["end"]
            end = int(round(nxt)) - 2 if gap < 18 else end
        if end - start < min_frames:
            end = start + min_frames
            if nxt is not None:
                end = min(end, int(round(nxt)) - 2)
        cue["start"], cue["end"] = max(0, start), end
        cue["lines"] = lines(cue["text"], limit)
    for i in range(len(cues) - 1):
        cues[i]["end"] = min(cues[i]["end"], cues[i + 1]["start"])
    return cues, report


def srt_time(frame: int) -> str:
    ms = int(round(frame / FPS * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def write(folder: Path, cues: list[dict], name: str, duration: int) -> None:
    if cues[-1]["end"] > duration:
        cues[-1]["end"] = duration
    payload = {"fps": FPS, "source": "scripts/audio/build-ep001-captions.py (aligned to narration takes)", "video": name, "cues": [{k: c[k] for k in ("start", "end", "text", "lines")} for c in cues]}
    (folder / "captions.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    srt = "\n".join(f"{i + 1}\n{srt_time(c['start'])} --> {srt_time(c['end'])}\n" + "\n".join(c["lines"]) + "\n" for i, c in enumerate(cues))
    (folder / "captions.srt").write_text(srt, encoding="utf-8")


def load(p: Path) -> dict:
    return json.loads(p.read_text(encoding="utf-8"))


def main() -> int:
    for target in sys.argv[1:]:
        kind, *rest = target.split(":")
        if kind == "short":
            name, version = rest
            folder = EP / "shorts" / name / version
            board, man = load(folder / "storyboard.json"), load(folder / "assets" / "audio" / "vo" / "manifest.json")
            vo = folder / "assets" / "audio" / "vo"
            items = []
            for shot in board["shots"]:
                sn = next(s for s in man["snippets"] if s["shot"] == shot["id"])
                assert sn["text"] == shot["narration"], shot["id"]
                items.append((shot["narration"], vo / sn["approvedTake"], shot["startFrame"] + sn["offsetFrames"]))
            cues, report = build(items, limit=26, min_frames=24)
            write(folder, cues, f"{name} {version}", board["durationInFrames"])
        elif kind == "original":
            (version,) = rest
            board, man = load(EP / "v2.3" / "storyboard.json"), load(EP / "v2.3" / "assets" / "audio" / "vo" / "manifest.json")
            vo = EP / "v2.3" / "assets" / "audio" / "vo"
            items = []
            for shot in board["shots"]:
                sn = next(s for s in man["snippets"] if s["shot"] == shot["id"])
                assert sn["text"] == shot["narration"], shot["id"]
                items.append((shot["narration"], vo / sn["approvedTake"], shot["startFrame"] + sn["offsetFrames"]))
            folder = EP / version
            folder.mkdir(exist_ok=True)
            cues, report = build(items, limit=26, min_frames=24)
            write(folder, cues, f"HowMicrowavesWork {version}", board["durationInFrames"])
        elif kind == "long":
            folder = EP / "long-v1"
            board, man = load(folder / "storyboard.json"), load(folder / "assets" / "audio" / "vo" / "manifest.json")
            items = []
            for shot in board["shots"]:
                sn = next(s for s in man["snippets"] if s["shot"] == shot["id"])
                assert sn["text"] == shot["narration"], shot["id"]
                items.append((shot["narration"], folder / "assets" / "audio" / "vo" / sn["approvedTake"], shot["startFrame"] + sn["offsetFrames"]))
            cues, report = build(items, limit=42, min_frames=30)
            write(folder, cues, "Episode 001 long-form (long-v1, cut 3 timing)", board["durationInFrames"])
        else:
            raise SystemExit(f"unknown target {target}")
        print(f"{target}: {len(cues)} cues -> {folder.relative_to(ROOT).as_posix()}/captions.json, captions.srt")
        for line in report:
            print("   ", line)
    return 0


if __name__ == "__main__":
    sys.exit(main())
