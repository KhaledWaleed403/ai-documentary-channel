"""Build the sound effects for Episode 001 long-form (episodes/episode-001/long-v1).

Run from the project root with the Kokoro venv's Python (it has numpy + soundfile):
  ~/.luminexplain-kokoro/.venv/Scripts/python.exe -I scripts/audio/build-ep001-long-sfx.py

Three kinds of output, all 48 kHz stereo PCM 24-bit, written only under
episodes/episode-001/long-v1/assets/audio/:
  1. sfx/lf-*.wav copied byte-for-byte from the Short (read-only; Short files are never touched).
  2. foley/lf-*.wav cut from CC0 Freesound previews in foley/source/ (see audio-credits.md).
  3. sfx/lf-*.wav synthesized here, deterministic (fixed seed), in the Short's key of D.
No music is produced.
"""
import shutil
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[2]
SHORT = ROOT / "episodes/episode-001/v2.3/assets/audio"
OUT = ROOT / "episodes/episode-001/long-v1/assets/audio"
SR = 48000
rng = np.random.default_rng(2001)

# ---------------------------------------------------------------- helpers
def t(sec):
    return np.arange(int(sec * SR)) / SR

def env(n, a=0.005, r=0.1, sustain=True):
    """Linear attack, exponential-ish release over the last r seconds."""
    e = np.ones(n)
    na, nr = max(1, int(a * SR)), max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na)
    if sustain:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    else:
        e *= np.exp(-np.arange(n) / (r * SR))
        e[:na] *= np.linspace(0, 1, na)
    return e

def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y

def highpass(x, fc):
    return x - lowpass(x, fc)

def bandpass(x, lo, hi):
    return lowpass(highpass(x, lo), hi)

def stereo(x, pan=0.0):
    """Equal-power pan, pan in [-1, 1]; pan may be an array."""
    p = (np.asarray(pan) + 1) * np.pi / 4
    return np.stack([x * np.cos(p), x * np.sin(p)], axis=1)

def write(name, y, peak_db=-6.0, fade=0.01):
    y = np.atleast_2d(y.T).T if y.ndim == 1 else y
    if y.ndim == 1 or y.shape[1] == 1:
        y = stereo(y.reshape(-1))
    nf = int(fade * SR)
    y[-nf:] *= np.linspace(1, 0, nf)[:, None]
    y = y - y.mean(axis=0)
    y *= 10 ** (peak_db / 20) / (np.abs(y).max() + 1e-12)
    path = OUT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(path, y, SR, subtype="PCM_24")
    print(f"{name:34s} {len(y) / SR:6.2f} s  peak {peak_db} dBFS")

def decode(mp3):
    wav = OUT / "foley/source" / (Path(mp3).stem + ".decoded.wav")
    if not wav.exists():
        subprocess.run(["npx", "remotion", "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(mp3), "-ac", "1", "-ar", str(SR), str(wav)],
                       check=True, cwd=ROOT, shell=True)
    x, _ = sf.read(wav)
    return x

def cut(src, start, dur, fade_in=0.005, fade_out=0.1):
    x = decode(OUT / "foley/source" / f"freesound-{src}.mp3")
    seg = x[int(start * SR): int((start + dur) * SR)].copy()
    fi, fo = int(fade_in * SR), int(fade_out * SR)
    seg[:fi] *= np.linspace(0, 1, fi)
    seg[-fo:] *= np.linspace(1, 0, fo) ** 2
    return seg

def resample(x, ratio):
    n = int(len(x) / ratio)
    return np.interp(np.arange(n) * ratio, np.arange(len(x)), x)

def place(total, items):
    y = np.zeros(int(total * SR))
    for at, x, g in items:
        i = int(at * SR)
        y[i:i + len(x)] += g * x[: len(y) - i]
    return y

# ---------------------------------------------------------------- 1. copies from the Short (read-only)
COPIES = {
    "sfx/wave-emit-v2.wav": "sfx/lf-wave-emit.wav",
    "sfx/wave-reflect-1-v2.wav": "sfx/lf-wave-reflect-1.wav",
    "sfx/wave-reflect-2-v2.wav": "sfx/lf-wave-reflect-2.wav",
    "sfx/wave-reflect-3-v2.wav": "sfx/lf-wave-reflect-3.wav",
    "sfx/wave-absorb-a-v2.wav": "sfx/lf-wave-absorb.wav",
    "sfx/heat-transition-v2.wav": "sfx/lf-heat-swell.wav",
    "sfx/heat-spread-v2.wav": "sfx/lf-heat-spread.wav",
    "sfx/heat-finale-v2.wav": "sfx/lf-heat-finale.wav",
    "sfx/oven-startup-run-v2.wav": "sfx/lf-oven-startup.wav",
    "sfx/s4-oven-hum-loop.wav": "sfx/lf-oven-hum-loop.wav",
    "sfx/turntable-motor-v2.wav": "sfx/lf-turntable.wav",
    "sfx/s6-turntable-motor-loop.wav": "sfx/lf-turntable-loop.wav",
    "sfx/s3-start-beep.wav": "sfx/lf-start-beep.wav",
    "foley/spoon-stir-v2.wav": "foley/lf-spoon-stir.wav",
}
for src, dst in COPIES.items():
    (OUT / dst).parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SHORT / src, OUT / dst)
    print(f"{dst:34s} copied from Short {src}")

# trimmed copy of the heat swell (first 1.6 s with a fade) for the small S2-05 moment
hs, _ = sf.read(OUT / "sfx/lf-heat-swell.wav")
hs = hs[: int(1.6 * SR)].copy()
hs[-int(0.5 * SR):] *= (np.linspace(1, 0, int(0.5 * SR)) ** 2)[:, None]
write("sfx/lf-heat-swell-short.wav", hs, peak_db=float(20 * np.log10(np.abs(hs).max())))

# ---------------------------------------------------------------- 2. Foley from CC0 sources
write("foley/lf-pocket-rustle.wav", cut(565969, 0.3, 2.2, 0.05, 0.4), -6)
write("foley/lf-wrapper-crinkle.wav", cut(269338, 0.0, 1.3, 0.01, 0.3), -6)
write("foley/lf-dish-set.wav", cut(463902, 1.10, 0.45, 0.003, 0.15), -6)
write("foley/lf-fork-tap.wav", cut(463902, 2.18, 0.45, 0.003, 0.15), -6)
pop = cut(792666, 0.0, 0.33, 0.002, 0.08)
pops = place(2.2, [(0.00, pop, 1.0), (0.31, resample(pop, 1.12), 0.8), (0.52, resample(pop, 0.92), 0.9),
                   (0.88, resample(pop, 1.05), 0.7), (1.17, resample(pop, 0.97), 0.6), (1.62, resample(pop, 1.18), 0.45)])
write("foley/lf-popcorn-pops.wav", pops, -4)
egg = cut(150479, 0.0, 0.6, 0.002, 0.2)
splat = cut(868245, 0.0, 0.5, 0.002, 0.25)
write("foley/lf-egg-burst.wav", place(0.8, [(0, egg, 1.0), (0.02, lowpass(splat, 3000), 0.6)]), -6)
write("foley/lf-paper-slide.wav", cut(154403, 0.3, 1.05, 0.05, 0.25), -8)
write("foley/lf-stamp.wav", cut(448474, 0.95, 0.5, 0.003, 0.2), -6)
write("foley/lf-calendar-flip.wav", cut(459657, 1.2, 1.15, 0.01, 0.25), -6)
write("foley/lf-water-trickle.wav", cut(452304, 7.0, 3.0, 0.4, 0.8), -8)
write("foley/lf-glass-clink.wav", cut(498511, 2.85, 0.5, 0.002, 0.25), -8)
write("foley/lf-ice-crackle.wav", cut(262635, 0.10, 0.95, 0.003, 0.3), -6)
write("foley/lf-mug-tap.wav", resample(cut(498511, 3.33, 0.35, 0.002, 0.15), 0.8), -8)
write("foley/lf-water-burst.wav", cut(634158, 0.0, 0.9, 0.002, 0.3), -5)

# ---------------------------------------------------------------- 3. synthesized (key of D)
D5, A4, D4, A3, D3 = 587.33, 440.0, 293.66, 220.0, 146.83

# radar-era tube hum: 120 Hz family with audible 240-600 Hz harmonics, slow swell in and out
x = t(6.0)
hum = sum(a * np.sin(2 * np.pi * f * x) for f, a in [(120, 0.5), (240, 0.6), (360, 0.35), (480, 0.25), (600, 0.15)])
hum += 0.08 * bandpass(rng.standard_normal(len(x)), 200, 900)
hum *= np.minimum(1, x / 1.5) * np.minimum(1, (6.0 - x) / 2.0)
write("sfx/lf-tube-hum.wav", hum, -12, 0.05)

def click(dur=0.06, body=1800, seed_gain=1.0):
    n = rng.standard_normal(int(dur * SR))
    c = bandpass(n, body * 0.6, body * 2.2) * env(len(n), 0.0005, 0.012, sustain=False)
    b = 0.5 * np.sin(2 * np.pi * body / 6 * t(dur)) * env(len(n), 0.0005, 0.02, sustain=False)
    return seed_gain * (c + b)

write("sfx/lf-click.wav", click(), -8)
# conveyor ticks: six ticks accelerating
ticks = place(2.0, [(s, click(0.05, 2200 + 120 * i), 1 - 0.08 * i) for i, s in enumerate([0, 0.42, 0.78, 1.08, 1.34, 1.56])])
write("sfx/lf-conveyor-ticks.wav", ticks, -10)
# clock ticks (time-lapse): four dry ticks
write("sfx/lf-clock-ticks.wav", place(2.2, [(i * 0.5, click(0.04, 3000), 1.0) for i in range(4)]), -12)

def thud(dur, f0, weight):
    x = t(dur)
    f = f0 * (1 + 0.6 * np.exp(-x / 0.03))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x / (0.09 * weight))
    harm = 0.5 * np.sin(2 * np.pi * np.cumsum(f * 3.1) / SR) * np.exp(-x / 0.05)
    knock = 0.6 * bandpass(rng.standard_normal(len(x)), 300, 2500) * np.exp(-x / 0.012)
    return body + harm + knock

write("sfx/lf-heavy-thud.wav", thud(0.9, 70, 2.0), -6)
write("sfx/lf-light-thud.wav", thud(0.5, 140, 0.8), -8)

def motif_tone(dur, f, wobble=6.0, depth=0.004):
    x = t(dur)
    ph = 2 * np.pi * np.cumsum(f * (1 + depth * np.sin(2 * np.pi * wobble * x))) / SR
    return np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)

# sustained field-swing tone, panning L/R at the on-screen swing rate (~1 cycle/s)
x = t(8.0)
swing = motif_tone(8.0, D4) * np.minimum(1, x / 1.0) * np.minimum(1, (8.0 - x) / 1.5)
write("sfx/lf-field-swing.wav", stereo(swing, 0.6 * np.sin(2 * np.pi * 1.0 * x)), -14, 0.05)

# analogy collisions: soft muted bumps, sparse then dense, randomized (non-rhythmic)
def bump():
    d = 0.09
    return lowpass(rng.standard_normal(int(d * SR)), 700) * env(int(d * SR), 0.002, 0.03, sustain=False)
times = np.sort(np.concatenate([rng.uniform(0, 2.5, 5), rng.uniform(2.5, 6.0, 28)]))
bumps = np.zeros((int(6.4 * SR), 2))
for at in times:
    b = stereo(bump() * rng.uniform(0.4, 1.0), rng.uniform(-0.7, 0.7))
    i = int(at * SR)
    bumps[i:i + len(b)] += b
bumps *= np.minimum(1, (6.4 - t(6.4)) / 1.0)[:, None]
write("sfx/lf-crowd-bumps.wav", bumps, -14)

# interference: two motif tones; first they reinforce (in phase), then cancel (phase drifts to pi)
x = t(5.0)
a = motif_tone(5.0, A4, depth=0)
phase = np.clip((x - 2.4) / 0.8, 0, 1) * np.pi
b = np.sin(2 * np.pi * A4 * x + phase) + 0.18 * np.sin(2 * (2 * np.pi * A4 * x + phase)) + 0.08 * np.sin(3 * (2 * np.pi * A4 * x + phase))
inter = (a * np.minimum(1, x / 0.3) + b * np.clip((x - 0.8) / 0.4, 0, 1)) * np.minimum(1, (5.0 - x) / 0.6)
write("sfx/lf-interference.wav", stereo(inter, 0.0), -12, 0.05)

# heat blip: tiny warm D chord pluck
def heat_blip(dur=0.6):
    x = t(dur)
    chord = sum(np.sin(2 * np.pi * f * x) for f in (D4, A4 * 0.5 * 2, 369.99))
    return lowpass(chord, 1500) * env(len(x), 0.02, 0.25, sustain=False)
write("sfx/lf-heat-blip.wav", heat_blip(), -10)

# stepped heat: three blips rising in pitch and level (runaway)
steps = place(3.0, [(0.0, heat_blip(0.9), 0.5), (0.9, resample(heat_blip(1.0), 1.12), 0.75), (1.8, resample(heat_blip(1.2), 1.26), 1.0)])
write("sfx/lf-heat-steps.wav", steps, -10)
print("done")
