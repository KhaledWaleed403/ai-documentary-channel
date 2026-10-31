"""Generate Episode 003 narration takes with Kokoro (kokoro-onnx) and write the VO manifest.

Run with the Kokoro venv from the project root:
  ~/.luminexplain-kokoro/.venv/Scripts/python.exe -I scripts/audio/generate-ep003-vo.py

Reads episodes/episode-003/{long-v1,shorts}/narration.json. Writes one take per line to
<folder>/assets/audio/vo/<id>-takeNN.wav (NN = the shot's optional "take" field,
default 1; never overwrites an existing take) and vo/manifest.json with spoken
text, measured duration, speech start/end, sample peak and playback gain.
Same voice, pause and gain settings as Episodes 001 and 002.
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
SPOKEN = {"1977": "nineteen seventy-seven"}


def spoken(text: str) -> str:
    return re.sub(r"\b(1977)\b", lambda m: SPOKEN[m.group(1)], text)


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
        "gainDb": round(min(5.5, -1.5 - peak_db), 2),
    }


def run(folder: Path, shots: list, kokoro: Kokoro) -> None:
    vo = folder / "assets" / "audio" / "vo"
    vo.mkdir(parents=True, exist_ok=True)
    entries = []
    for s in shots:
        take = f"{s['id'].lower()}-take{s.get('take', 1):02d}.wav"
        path = vo / take
        tts = s.get("spoken") or spoken(s["text"])
        if not path.exists():
            samples, rate = kokoro.create(tts, voice=VOICE, speed=SPEED, lang=LANG,
                                          sentence_pause=SENTENCE_PAUSE, clause_pause=CLAUSE_PAUSE)
            sf.write(path, samples, rate, subtype="PCM_16")
        samples, rate = sf.read(path)
        entries.append({"id": s["id"], "text": s["text"], "spoken": tts, "approvedTake": take,
                        "sampleRate": rate, **measure(samples, rate)})
        print(s["id"], entries[-1]["seconds"], flush=True)
    manifest = {"episode": "episode-003", "engine": "kokoro-onnx", "model": "Kokoro-82M v1.0",
                "voice": VOICE, "speed": SPEED, "lang": LANG, "sentencePause": SENTENCE_PAUSE,
                "clausePause": CLAUSE_PAUSE, "status": "first-cut takes; not yet listened to by a human",
                "snippets": entries}
    (vo / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    ep = ROOT / "episodes" / "episode-003"
    run(ep / "long-v1", json.loads((ep / "long-v1" / "narration.json").read_text(encoding="utf-8"))["shots"], kokoro)
    shorts = json.loads((ep / "shorts" / "narration.json").read_text(encoding="utf-8"))["shorts"]
    run(ep / "shorts", [line for sh in shorts for line in sh["lines"]], kokoro)
    return 0


if __name__ == "__main__":
    sys.exit(main())
