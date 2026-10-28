"""Episode 001 Shorts batch (v1): narration manifest, takes, measurements and timing.

For each Short in episodes/episode-001/shorts/<Name>/<version>/ (default v1):
  1. Creates assets/audio/vo/manifest.json from storyboard.json if it doesn't exist
     (one snippet per shot; text copied verbatim), and refuses to run if a
     manifest snippet's text no longer matches its shot.
  2. --generate: makes take01 for any snippet with no takes, using the Kokoro
     snippet script (af_heart, speed 1.0, en-us, 0.4 / 0.3 s pauses; the
     long-form settings). Existing takes are never touched.
  3. Measures each approved take (speech start/end, LUFS, true peak, sha256)
     and sets gainDb = min(+5.5, -1.5 - true peak), as in the long-form.
  4. Writes timing into storyboard.json: shot start/end frames, speech window,
     beat frames (word position in the take, punctuation pauses weighted) and
     sound frames; plus captions.srt.
  5. Byte-copies the sound files the storyboard names from the long-form
     assets (episodes/episode-001/long-v1/assets/audio/) into the Short's own
     assets/audio/sfx/, verifying the hash. Sources are only read.

Run from the project root with the Kokoro venv's Python:
  ~/.luminexplain-kokoro/.venv/Scripts/python.exe -I scripts/audio/build-ep001-shorts.py [--generate] [--version vN] [Name ...]
"""
import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[2]
SHORTS = ROOT / "episodes" / "episode-001" / "shorts"
LONG_AUDIO = ROOT / "episodes" / "episode-001" / "long-v1" / "assets" / "audio"
FFMPEG = ROOT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
KOKORO = Path.home() / ".luminexplain-kokoro"
KOKORO_PY = KOKORO / ".venv" / "Scripts" / "python.exe"
KOKORO_SCRIPT = KOKORO / "scripts" / "kokoro_snippet.py"
NAMES = ["CandyBarDiscovery", "MicrowaveSafeDishes", "StandingTime", "SuperheatedWater"]
VOICE = {"engine": "kokoro-onnx", "model": "Kokoro-82M v1.0", "voice": "af_heart", "speed": 1.0, "lang": "en-us", "sentencePause": 0.4, "clausePause": 0.3}
FPS = 30
TODAY = "2026-10-28"
VERSION = "v1"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_manifest(name: str, board: dict) -> tuple[Path, dict]:
    path = SHORTS / name / VERSION / "assets" / "audio" / "vo" / "manifest.json"
    if path.exists():
        manifest = json.loads(path.read_text(encoding="utf-8"))
    else:
        manifest = {
            "episode": "episode-001",
            "short": name,
            "version": VERSION,
            "script": f"episodes/episode-001/shorts/{name}/{VERSION}/script.md",
            **VOICE,
            "generator": str(KOKORO_SCRIPT).replace("\\", "/"),
            "snippets": [],
        }
    by_id = {s["id"]: s for s in manifest["snippets"]}
    snippets = []
    for shot in board["shots"]:
        snippet = by_id.get(shot["id"])
        if snippet is None:
            snippet = {"id": shot["id"], "shot": shot["id"], "text": shot["narration"], "approvedTake": None, "offsetFrames": shot["offsetFrames"], "takes": []}
        elif snippet["text"] != shot["narration"]:
            sys.exit(f"{name} {shot['id']}: manifest text differs from storyboard.json; add a new snippet take deliberately")
        snippet["offsetFrames"] = shot["offsetFrames"]
        snippets.append(snippet)
    manifest["snippets"] = snippets
    return path, manifest


def generate(manifest_path: Path, manifest: dict) -> None:
    for snippet in manifest["snippets"]:
        if snippet["takes"]:
            continue
        out = manifest_path.parent / f"{snippet['id'].lower()}-take01.wav"
        cmd = [str(KOKORO_PY), "-I", str(KOKORO_SCRIPT), str(manifest_path), snippet["id"], str(out),
               "--voice", VOICE["voice"], "--speed", str(VOICE["speed"]), "--lang", VOICE["lang"],
               "--sentence-pause", str(VOICE["sentencePause"]), "--clause-pause", str(VOICE["clausePause"])]
        if out.exists():
            # Left by an interrupted run of this script: adopt it, never regenerate over it.
            print("adopting existing", out.name, flush=True)
        else:
            print("generating", out.name, flush=True)
            subprocess.run(cmd, check=True)
        snippet["takes"].append({"file": out.name, **VOICE, "generatedAt": TODAY, "status": "approved",
                                 "notes": "Batch v1 take; text read from this manifest, which matches storyboard.json. Not reviewed by ear yet."})
        snippet["approvedTake"] = out.name


def loudness(path: Path) -> tuple[float, float]:
    # Integrated loudness and true peak via ffmpeg's loudnorm analysis (the
    # Remotion ffmpeg build has no ebur128 filter).
    proc = subprocess.run([str(FFMPEG), "-hide_banner", "-nostats", "-i", str(path), "-af", "loudnorm=print_format=json", "-f", "null", "-"],
                          capture_output=True, text=True)
    stats = json.loads(proc.stderr[proc.stderr.rindex("{"):proc.stderr.rindex("}") + 1])
    return float(stats["input_i"]), float(stats["input_tp"])


def measure(take_path: Path) -> dict:
    data, rate = sf.read(take_path, dtype="float64")
    if data.ndim > 1:
        data = data.mean(axis=1)
    hop = int(rate * 0.01)
    frames = len(data) // hop
    rms = np.sqrt(np.mean(data[: frames * hop].reshape(frames, hop) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    voiced = np.where(db > -45)[0]
    lufs, true_peak = loudness(take_path)
    return {
        "durationSeconds": round(len(data) / rate, 3),
        "speechStartSeconds": round(voiced[0] * 0.01, 2),
        "speechEndSeconds": round((voiced[-1] + 1) * 0.01, 2),
        "samplePeakDBFS": round(20 * np.log10(np.max(np.abs(data)) + 1e-12), 2),
        "loudnessLUFS": lufs,
        "truePeakDBTP": true_peak,
        "sha256": sha256(take_path),
        "format": f"wav pcm_s16le {rate // 1000} kHz mono",
    }


def word_fraction(text: str, word: str) -> float:
    # Where a word starts in the read, 0..1. Kokoro pauses after punctuation,
    # so those marks count as extra "characters" of time.
    match = re.search(rf"(?<![\w']){re.escape(word)}(?![\w'])", text, flags=re.IGNORECASE)
    if not match:
        raise SystemExit(f"beat word '{word}' not in: {text}")
    weights = []
    for ch in text:
        if ch in ".?!":
            weights.append(1 + 6.0)
        elif ch in ",;:—":
            weights.append(1 + 4.5)
        else:
            weights.append(1.0)
    total = sum(weights)
    return sum(weights[: match.start()]) / total


def time_board(board: dict, manifest: dict) -> None:
    by_id = {s["id"]: s for s in manifest["snippets"]}
    cursor = 0
    for shot in board["shots"]:
        snippet = by_id[shot["id"]]
        take = next(t for t in snippet["takes"] if t["file"] == snippet["approvedTake"])
        start = cursor
        speech_start = start + shot["offsetFrames"] + round(take["speechStartSeconds"] * FPS)
        speech_end = start + shot["offsetFrames"] + round(take["speechEndSeconds"] * FPS)
        end = speech_end + shot["tailFrames"]
        shot.update({
            "startFrame": start, "endFrame": end, "start": round(start / FPS, 2), "end": round(end / FPS, 2),
            "speechStartFrame": speech_start, "speechEndFrame": speech_end,
            "take": snippet["approvedTake"], "takeSeconds": take["durationSeconds"], "words": len(shot["narration"].split()),
        })
        beats = {}
        for beat in shot["beats"]:
            if "word" in beat:
                base = speech_start + word_fraction(shot["narration"], beat["word"]) * (speech_end - speech_start)
            else:
                base = {"start": start, "speech": speech_start, "end": speech_end}[beat["at"]]
            beat["frame"] = int(round(base + beat.get("delta", 0)))
            beat["frame"] = max(start, min(end - 1, beat["frame"]))
            beats[beat["id"]] = beat["frame"]
        for cue in shot["sound"]:
            cue["frame"] = beats[cue["beat"]] + cue.get("delta", 0)
            if "untilBeat" in cue:
                cue["endFrame"] = beats[cue["untilBeat"]] + cue.get("extra", 0)
            elif cue.get("untilShotEnd"):
                cue["endFrame"] = end + cue.get("extra", 0)
        cursor = end
    board["durationInFrames"] = cursor
    board["draft"] = False


def srt_time(frame: float) -> str:
    ms = int(round(frame / FPS * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def captions(board: dict) -> str:
    # One cue per sentence, timed by its weighted position inside the take.
    lines, n = [], 1
    for shot in board["shots"]:
        text = shot["narration"]
        parts = [p for p in re.split(r"(?<=[.?!])\s+", text) if p]
        span = shot["speechEndFrame"] - shot["speechStartFrame"]
        for i, part in enumerate(parts):
            a = shot["speechStartFrame"] + word_fraction(text, part.split()[0]) * span if i else shot["speechStartFrame"]
            b = shot["speechStartFrame"] + word_fraction(text, parts[i + 1].split()[0]) * span - 3 if i + 1 < len(parts) else shot["speechEndFrame"] + 6
            lines.append(f"{n}\n{srt_time(a)} --> {srt_time(b)}\n{part}\n")
            n += 1
    return "\n".join(lines)


def copy_sfx(name: str, board: dict) -> list[str]:
    dest = SHORTS / name / VERSION / "assets" / "audio" / "sfx"
    dest.mkdir(parents=True, exist_ok=True)
    copied = []
    for file in sorted({cue["file"] for shot in board["shots"] for cue in shot["sound"]}):
        src = next((p for p in (LONG_AUDIO / "sfx" / file, LONG_AUDIO / "foley" / file) if p.exists()), None)
        if src is None:
            raise SystemExit(f"{name}: no long-form sound named {file}")
        out = dest / file
        if out.exists():
            if sha256(out) != sha256(src):
                raise SystemExit(f"{out} exists and differs from {src}; not overwriting")
        else:
            shutil.copyfile(src, out)
        copied.append(f"{file} <- {src.relative_to(ROOT).as_posix()} ({sha256(src)[:12]})")
    return copied


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--generate", action="store_true")
    parser.add_argument("--version", default="v1", help="episode folder version, e.g. v2")
    parser.add_argument("names", nargs="*", default=NAMES)
    args = parser.parse_args()
    global VERSION
    VERSION = args.version
    for name in args.names:
        board_path = SHORTS / name / VERSION / "storyboard.json"
        board = json.loads(board_path.read_text(encoding="utf-8"))
        manifest_path, manifest = load_manifest(name, board)
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        if args.generate:
            generate(manifest_path, manifest)
            manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        for snippet in manifest["snippets"]:
            if not snippet["approvedTake"]:
                print(f"{name} {snippet['id']}: no take yet (run with --generate)")
                return 1
            take = next(t for t in snippet["takes"] if t["file"] == snippet["approvedTake"])
            take.update(measure(manifest_path.parent / take["file"]))
            snippet["gainDb"] = round(min(5.5, -1.5 - take["truePeakDBTP"]), 1)
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        time_board(board, manifest)
        board_path.write_text(json.dumps(board, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        (SHORTS / name / VERSION / "captions.srt").write_text(captions(board), encoding="utf-8")
        copied = copy_sfx(name, board)
        print(f"{name}: {len(board['shots'])} shots, {board['durationInFrames']} frames ({board['durationInFrames'] / FPS:.1f} s)")
        for shot in board["shots"]:
            snippet = next(s for s in manifest["snippets"] if s["id"] == shot["id"])
            take = snippet["takes"][-1]
            print(f"  {shot['id']} {shot['start']:6.2f}-{shot['end']:6.2f}s speech {take['speechEndSeconds']:.2f}s "
                  f"{take['loudnessLUFS']} LUFS {take['truePeakDBTP']} dBTP gain {snippet['gainDb']}")
        for line in copied:
            print("  sfx", line)
    return 0


if __name__ == "__main__":
    sys.exit(main())
