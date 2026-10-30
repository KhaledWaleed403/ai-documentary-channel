"""Generate Episode 002 narration takes with Kokoro (kokoro-onnx) and write the VO manifests.

Run with the Kokoro venv from the project root:
  ~/.luminexplain-kokoro/.venv/Scripts/python.exe -I scripts/audio/generate-ep002-vo.py

Reads episodes/episode-002/{long-v1,shorts}/narration.json. Writes one take per
snippet to <folder>/assets/audio/vo/<id>-takeNN.wav (NN = the snippet's optional
"take" field, default 1; never overwrites an existing take) and <folder>/assets/audio/vo/manifest.json with spoken text, measured
duration, speech start/end, sample peak and the playback gain Remotion applies.
Same voice and pause settings as Episode 001.
"""
import json
import re
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path.cwd()
MODELS = Path.home() / ".luminexplain-kokoro" / "models"
VOICE, SPEED, LANG = "af_heart", 1.0, "en-us"
SENTENCE_PAUSE, CLAUSE_PAUSE = 0.4, 0.3
NUMBERS = {"76": "seventy-six", "77": "seventy-seven", "35": "thirty-five"}


def spoken(text: str) -> str:
    # Numerals that are not years are spelled out. "US" stays as written: Kokoro's
    # phonemizer reads it as "you-ESS", while "U.S." made it pause after each letter.
    return re.sub(r"\b(76|77|35)\b", lambda m: NUMBERS[m.group(1)], text)


def measure(samples: np.ndarray, rate: int) -> dict:
    env = np.abs(samples)
    thresh = 10 ** (-40 / 20)
    idx = np.nonzero(env > thresh)[0]
    peak_db = 20 * np.log10(max(float(env.max()), 1e-9))
    return {
        "seconds": round(len(samples) / rate, 3),
        "speechStart": round(idx[0] / rate, 3) if len(idx) else 0.0,
        "speechEnd": round(idx[-1] / rate, 3) if len(idx) else 0.0,
        "samplePeakDb": round(peak_db, 2),
        # +5.5 dB like Episode 001, capped so the sample peak stays <= -1.5 dBFS.
        "gainDb": round(min(5.5, -1.5 - peak_db), 2),
    }


def run(folder: Path, snippets: list, kokoro: Kokoro) -> None:
    vo = folder / "assets" / "audio" / "vo"
    vo.mkdir(parents=True, exist_ok=True)
    entries = []
    for s in snippets:
        take = f"{s['id'].lower()}-take{s.get('take', 1):02d}.wav"
        path = vo / take
        tts = spoken(s["text"])
        if not path.exists():
            samples, rate = kokoro.create(tts, voice=VOICE, speed=SPEED, lang=LANG,
                                          sentence_pause=SENTENCE_PAUSE, clause_pause=CLAUSE_PAUSE)
            sf.write(path, samples, rate, subtype="PCM_16")
        samples, rate = sf.read(path)
        entries.append({"id": s["id"], "text": s["text"], "spoken": tts, "approvedTake": take,
                        "sampleRate": rate, **measure(samples, rate)})
        print(s["id"], entries[-1]["seconds"], flush=True)
    manifest = {"episode": "episode-002", "engine": "kokoro-onnx", "model": "Kokoro-82M v1.0",
                "voice": VOICE, "speed": SPEED, "lang": LANG, "sentencePause": SENTENCE_PAUSE,
                "clausePause": CLAUSE_PAUSE, "status": "first-cut takes; not yet listened to by a human",
                "snippets": entries}
    (vo / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    long_dir = ROOT / "episodes" / "episode-002" / "long-v1"
    shorts_dir = ROOT / "episodes" / "episode-002" / "shorts"
    run(long_dir, json.loads((long_dir / "narration.json").read_text(encoding="utf-8"))["shots"], kokoro)
    shorts = json.loads((shorts_dir / "narration.json").read_text(encoding="utf-8"))["shorts"]
    run(shorts_dir, [line for sh in shorts for line in sh["lines"]], kokoro)
    return 0


if __name__ == "__main__":
    sys.exit(main())
