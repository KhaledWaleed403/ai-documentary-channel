"""Build Episode 003 shot timing and captions from the measured narration takes.

Run from the project root (any Python 3, stdlib only):
  python -I scripts/audio/build-ep003-timeline.py

Inputs:  episodes/episode-003/{long-v1,shorts}/narration.json and assets/audio/vo/manifest.json
Outputs: episodes/episode-003/long-v1/timeline.json, captions.json, captions.srt
         episodes/episode-003/shorts/timeline.json, shorts/<ShortName>/captions.json, captions.srt
Same pacing and caption rules as Episode 002's long-form (build-ep002-timeline.py).
"""
import json
import math
import re
from pathlib import Path

FPS = 30
ROOT = Path.cwd()
EP = ROOT / "episodes" / "episode-003"

# Long-form pacing (frames).
L_FIRST_LEAD, L_SCENE_LEAD, L_SHOT_GAP, L_SCENE_TAIL, L_END_HOLD = 24, 6, 10, 12, 150
# Shorts pacing (frames).
S_LEAD, S_SHOT_GAP, S_END_HOLD = 6, 5, 45
# Extra visual hold (frames) after a scene's last line. v1 held 1-3 s after scenes 3, 5, 6, 9
# and 11, which played as dead air; every animation already lands before its scene's last line ends.
EXTRA_TAIL: dict[int, int] = {}


def frames(seconds: float) -> int:
    return math.ceil(seconds * FPS)


def split_cues(text: str, max_line: int, max_lines: int) -> list[list[str]]:
    words = text.split()
    cues, cur = [], []

    def lines_of(ws):
        out, line = [], ""
        for w in ws:
            cand = f"{line} {w}".strip()
            if len(cand) > max_line and line:
                out.append(line)
                line = w
            else:
                line = cand
        if line:
            out.append(line)
        return out

    for w in words:
        trial = cur + [w]
        if len(lines_of(trial)) > max_lines:
            cues.append(lines_of(cur))
            cur = [w]
            continue
        cur = trial
        filled = len(" ".join(cur)) >= 0.55 * max_line * max_lines
        if filled and re.search(r"[.,;:?!—]$", w):
            cues.append(lines_of(cur))
            cur = []
    if cur:
        cues.append(lines_of(cur))
    # Avoid a tiny orphan cue: rebalance the last two cues by words.
    if len(cues) > 1 and len(" ".join(cues[-1])) < 16:
        ws = " ".join(cues[-2] + cues[-1]).split()
        best = None
        for k in range(1, len(ws)):
            a, b = lines_of(ws[:k]), lines_of(ws[k:])
            if len(a) <= max_lines and len(b) <= max_lines:
                score = abs(len(" ".join(ws[:k])) - len(" ".join(ws[k:])))
                if best is None or score < best[0]:
                    best = (score, a, b)
        if best:
            cues[-2:] = [best[1], best[2]]
    # Don't end a cue on a weak word ("… works if the" / "planets are …"): move it to the next cue.
    weak = {"the", "a", "an", "of", "to", "and", "in", "its", "if", "at", "so", "but"}
    for i in range(len(cues) - 1):
        words = " ".join(cues[i]).split()
        while len(words) > 2 and words[-1].lower() in weak:
            cues[i] = lines_of(words[:-1])
            cues[i + 1] = lines_of([words[-1]] + " ".join(cues[i + 1]).split())
            words = words[:-1]
    # No one-word last line ("before / it."): pull a word down from the line above.
    for c in cues:
        if len(c) == 2 and len(c[1].split()) == 1 and len(c[0].split()) > 2:
            a = c[0].split()
            c[0], c[1] = " ".join(a[:-1]), f"{a[-1]} {c[1]}"
    # Drop dangling dashes at cue edges.
    return [[ln.strip(" —") or ln for ln in c] for c in cues]


def timed_cues(start_frame: int, take: dict, max_line: int, max_lines: int) -> list[dict]:
    parts = split_cues(take["text"], max_line, max_lines)
    s0 = start_frame + take["speechStart"] * FPS
    s1 = start_frame + take["speechEnd"] * FPS
    total = sum(len(" ".join(p)) for p in parts)
    out, acc = [], 0
    for p in parts:
        n = len(" ".join(p))
        a = s0 + (s1 - s0) * acc / total
        acc += n
        b = s0 + (s1 - s0) * acc / total
        out.append({"start": int(round(a)), "end": int(round(b)), "lines": p})
    for i in range(len(out) - 1):
        out[i]["end"] = out[i + 1]["start"]
    return out


def srt_time(frame: int) -> str:
    ms = int(round(frame / FPS * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def write_captions(folder: Path, cues: list[dict]) -> None:
    (folder / "captions.json").write_text(json.dumps({"fps": FPS, "cues": cues}, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    srt = []
    for i, c in enumerate(cues, 1):
        srt.append(f"{i}\n{srt_time(c['start'])} --> {srt_time(c['end'])}\n" + "\n".join(c["lines"]) + "\n")
    (folder / "captions.srt").write_text("\n".join(srt), encoding="utf-8")


def manifest(folder: Path) -> dict:
    data = json.loads((folder / "assets" / "audio" / "vo" / "manifest.json").read_text(encoding="utf-8"))
    return {s["id"]: s for s in data["snippets"]}


def build_long() -> None:
    folder = EP / "long-v1"
    shots = json.loads((folder / "narration.json").read_text(encoding="utf-8"))["shots"]
    takes = manifest(folder)
    t, out, scenes, cues = 0, [], [], []
    prev_scene = None
    for shot in shots:
        take = takes[shot["id"]]
        if take["text"] != shot["text"]:
            raise SystemExit(f"text mismatch for {shot['id']}")
        if shot["scene"] != prev_scene:
            if prev_scene is not None:
                t += L_SCENE_TAIL + EXTRA_TAIL.get(prev_scene, 0)
                scenes[-1]["end"] = t
            t += L_FIRST_LEAD if prev_scene is None else L_SCENE_LEAD
            scenes.append({"scene": shot["scene"], "start": t - (L_FIRST_LEAD if prev_scene is None else L_SCENE_LEAD), "shots": []})
            prev_scene = shot["scene"]
        else:
            t += L_SHOT_GAP
        length = frames(take["seconds"])
        entry = {"id": shot["id"], "scene": shot["scene"], "start": t, "end": t + length,
                 "speechStart": t + round(take["speechStart"] * FPS), "speechEnd": t + round(take["speechEnd"] * FPS)}
        out.append(entry)
        scenes[-1]["shots"].append(shot["id"])
        cues += timed_cues(t, take, 42, 2)
        t += length
    t += L_END_HOLD + EXTRA_TAIL.get(prev_scene, 0)
    scenes[-1]["end"] = t
    timeline = {"fps": FPS, "width": 1920, "height": 1080, "durationInFrames": t, "scenes": scenes, "shots": out}
    (folder / "timeline.json").write_text(json.dumps(timeline, indent=1) + "\n", encoding="utf-8")
    write_captions(folder, cues)
    print(f"long-v1: {t} frames = {t / FPS:.1f}s, {len(cues)} caption cues")



def build_shorts() -> None:
    folder = EP / "shorts"
    shorts = json.loads((folder / "narration.json").read_text(encoding="utf-8"))["shorts"]
    takes = manifest(folder)
    result = []
    for sh in shorts:
        t, lines, cues = S_LEAD, [], []
        for i, line in enumerate(sh["lines"]):
            take = takes[line["id"]]
            if take["text"] != line["text"]:
                raise SystemExit(f"text mismatch for {line['id']}")
            if i:
                t += S_SHOT_GAP
            length = frames(take["seconds"])
            lines.append({"id": line["id"], "start": t, "end": t + length,
                          "speechStart": t + round(take["speechStart"] * FPS), "speechEnd": t + round(take["speechEnd"] * FPS)})
            cues += timed_cues(t, take, 28, 2)
            t += length
        t += S_END_HOLD
        result.append({"name": sh["name"], "number": sh["number"], "title": sh["title"], "durationInFrames": t, "lines": lines})
        sub = folder / sh["name"]
        sub.mkdir(exist_ok=True)
        write_captions(sub, cues)
        print(f"{sh['name']}: {t} frames = {t / FPS:.1f}s, {len(cues)} cues")
    (folder / "timeline.json").write_text(json.dumps({"fps": FPS, "width": 1080, "height": 1920, "shorts": result}, indent=1) + "\n", encoding="utf-8")



if __name__ == "__main__":
    build_long()
    build_shorts()
