// Generates the original Episode 001 audio package: music bed + synthesized
// effects. Plain Node.js, no dependencies, deterministic (fixed seed).
//
//   node scripts/audio/generate-ep001-audio.mjs
//
// Output: episodes/episode-001/v2.3/assets/audio/{music,sfx}/*.wav
// (48 kHz, 24-bit PCM, stereo). Bowl, door/latch and spoon Foley are NOT
// generated here; they will be recorded separately.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 48000;
const TAU = Math.PI * 2;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "episodes", "episode-001", "v2.3", "assets", "audio");

// ---------------------------------------------------------------- utilities
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const db = (x) => 20 * Math.log10(Math.max(x, 1e-12));
const makeRng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
};
const stereo = (sec) => {
  const n = Math.round(sec * SR);
  return [new Float32Array(n), new Float32Array(n)];
};
const panGains = (pan) => {
  // Equal-power pan, pan in [-1, 1].
  const a = ((pan + 1) / 2) * (Math.PI / 2);
  return [Math.cos(a), Math.sin(a)];
};
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

// Attack/decay/sustain/release envelope. `hold` = time the note is held.
const adsr = (t, a, d, s, r, hold) => {
  if (t < 0) return 0;
  let v;
  if (t < a) v = t / a;
  else if (t < a + d) v = 1 - (1 - s) * ((t - a) / d);
  else v = s;
  if (t > hold) {
    const held = adsr(hold, a, d, s, r, Infinity);
    v = held * Math.max(0, 1 - (t - hold) / r);
  }
  return v;
};

// Band-limited sawtooth (polyBLEP).
const polyBlep = (t, dt) => {
  if (t < dt) {
    const x = t / dt;
    return x + x - x * x - 1;
  }
  if (t > 1 - dt) {
    const x = (t - 1) / dt;
    return x * x + x + x + 1;
  }
  return 0;
};

// RBJ biquad.
class Biquad {
  constructor() {
    this.x1 = this.x2 = this.y1 = this.y2 = 0;
    this.set("lp", 1000, 0.707);
  }
  set(type, f, q) {
    const w = (TAU * Math.min(f, SR * 0.45)) / SR;
    const cos = Math.cos(w);
    const alpha = Math.sin(w) / (2 * q);
    let b0, b1, b2;
    if (type === "lp") {
      b0 = (1 - cos) / 2;
      b1 = 1 - cos;
      b2 = (1 - cos) / 2;
    } else if (type === "hp") {
      b0 = (1 + cos) / 2;
      b1 = -(1 + cos);
      b2 = (1 + cos) / 2;
    } else {
      // Band-pass, constant 0 dB peak gain.
      b0 = alpha;
      b1 = 0;
      b2 = -alpha;
    }
    const a0 = 1 + alpha;
    this.b0 = b0 / a0;
    this.b1 = b1 / a0;
    this.b2 = b2 / a0;
    this.a1 = (-2 * cos) / a0;
    this.a2 = (1 - alpha) / a0;
  }
  process(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }
}

// Freeverb-style stereo reverb.
const reverb = ([inL, inR], { room = 0.84, damp = 0.3, wet = 1 } = {}) => {
  const scale = SR / 44100;
  const combT = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
  const apT = [556, 441, 341, 225];
  const spread = 23;
  const run = (input, off) => {
    const n = input.length;
    const out = new Float32Array(n);
    const combs = combT.map((t) => ({ buf: new Float32Array(Math.round((t + off) * scale)), i: 0, store: 0 }));
    const aps = apT.map((t) => ({ buf: new Float32Array(Math.round((t + off) * scale)), i: 0 }));
    for (let k = 0; k < n; k++) {
      const x = input[k] * 0.015;
      let s = 0;
      for (const c of combs) {
        const y = c.buf[c.i];
        c.store = y * (1 - damp) + c.store * damp;
        c.buf[c.i] = x + c.store * room;
        c.i = (c.i + 1) % c.buf.length;
        s += y;
      }
      for (const a of aps) {
        const b = a.buf[a.i];
        a.buf[a.i] = s + b * 0.5;
        a.i = (a.i + 1) % a.buf.length;
        s = b - s;
      }
      out[k] = s * wet;
    }
    return out;
  };
  return [run(inL, 0), run(inR, spread)];
};

const addInto = (dst, src, gain = 1) => {
  for (let c = 0; c < 2; c++) for (let i = 0; i < dst[c].length && i < src[c].length; i++) dst[c][i] += src[c][i] * gain;
};

const peakOf = (b) => {
  let p = 0;
  for (const ch of b) for (const v of ch) p = Math.max(p, Math.abs(v));
  return p;
};
const rmsOf = (b) => {
  let s = 0;
  let n = 0;
  for (const ch of b)
    for (const v of ch) {
      s += v * v;
      n++;
    }
  return Math.sqrt(s / n);
};
const normalize = (b, peakDb) => {
  const g = Math.pow(10, peakDb / 20) / peakOf(b);
  for (const ch of b) for (let i = 0; i < ch.length; i++) ch[i] *= g;
};
// Remove DC / sub-rumble.
const highpass = (b, f) => {
  for (const ch of b) {
    const hp = new Biquad();
    hp.set("hp", f, 0.707);
    for (let i = 0; i < ch.length; i++) ch[i] = hp.process(ch[i]);
  }
};
const fadeEdges = (b, inSec, outSec) => {
  const n = b[0].length;
  const fi = Math.round(inSec * SR);
  const fo = Math.round(outSec * SR);
  for (const ch of b) {
    for (let i = 0; i < fi; i++) ch[i] *= smooth(i / fi);
    for (let i = 0; i < fo; i++) ch[n - 1 - i] *= smooth(i / fo);
  }
};
// Make a seamless loop of `len` seconds from a buffer that runs longer.
const makeLoop = (b, len, xfade) => {
  const n = Math.round(len * SR);
  const x = Math.round(xfade * SR);
  return b.map((ch) => {
    const out = ch.slice(0, n);
    for (let i = 0; i < x; i++) {
      const w = i / x;
      out[i] = ch[i] * Math.sin((w * Math.PI) / 2) + ch[n + i] * Math.cos((w * Math.PI) / 2);
    }
    return out;
  });
};

const writeWav = (path, [L, R]) => {
  const n = L.length;
  const data = Buffer.alloc(n * 6);
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 2; c++) {
      const v = Math.max(-1, Math.min(1, (c ? R : L)[i]));
      const s = Math.round(v * 8388607);
      data.writeIntLE(s, i * 6 + c * 3, 3);
    }
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(2, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 6, 28);
  h.writeUInt16LE(6, 32);
  h.writeUInt16LE(24, 34);
  h.write("data", 36);
  h.writeUInt32LE(data.length, 40);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, Buffer.concat([h, data]));
};

// ------------------------------------------------------------------ voices
// Soft detuned-saw pad note through a gently moving low-pass filter.
const padNote = (dst, { m, t0, hold, a = 0.6, r = 1.4, cutoff = 1100, gain = 0.06, pan = 0 }) => {
  const [gl, gr] = panGains(pan);
  const f = mtof(m);
  const detune = [-0.07, 0, 0.07].map((c) => f * Math.pow(2, c / 12));
  const ph = [0.1, 0.4, 0.7];
  const lp = new Biquad();
  const start = Math.round(t0 * SR);
  const n = Math.round((hold + r) * SR);
  for (let i = 0; i < n && start + i < dst[0].length; i++) {
    const t = i / SR;
    if (i % 32 === 0) lp.set("lp", cutoff * (1 + 0.15 * Math.sin(TAU * 0.13 * (t0 + t) + m)), 0.6);
    let s = 0;
    for (let k = 0; k < 3; k++) {
      const dt = detune[k] / SR;
      ph[k] = (ph[k] + dt) % 1;
      s += 2 * ph[k] - 1 - polyBlep(ph[k], dt);
    }
    const v = lp.process(s / 3) * adsr(t, a, 0.8, 0.85, r, hold) * gain;
    dst[0][start + i] += v * gl;
    dst[1][start + i] += v * gr;
  }
};

// Soft FM bell/pluck (motif).
const bellNote = (dst, { m, t0, decay = 0.7, gain = 0.12, pan = 0, ratio = 2, index = 1.6 }) => {
  const [gl, gr] = panGains(pan);
  const f = mtof(m);
  const start = Math.round(t0 * SR);
  const n = Math.round(decay * 6 * SR);
  for (let i = 0; i < n && start + i < dst[0].length; i++) {
    const t = i / SR;
    const idx = index * Math.exp(-t * 5);
    const mod = Math.sin(TAU * f * ratio * t) * idx;
    const amp = Math.min(1, t / 0.006) * Math.exp(-t / decay);
    const v = (Math.sin(TAU * f * t + mod) * 0.8 + Math.sin(TAU * f * 2 * t) * 0.08 * Math.exp(-t * 3)) * amp * gain;
    dst[0][start + i] += v * gl;
    dst[1][start + i] += v * gr;
  }
};

// Short muted pluck for the restrained pulse.
const pulseNote = (dst, { m, t0, gain = 0.03, pan = 0 }) => {
  const [gl, gr] = panGains(pan);
  const f = mtof(m);
  const start = Math.round(t0 * SR);
  const n = Math.round(0.5 * SR);
  const lp = new Biquad();
  lp.set("lp", 1800, 0.7);
  for (let i = 0; i < n && start + i < dst[0].length; i++) {
    const t = i / SR;
    const tri = (2 / Math.PI) * Math.asin(Math.sin(TAU * f * t));
    const v = lp.process(tri) * Math.min(1, t / 0.003) * Math.exp(-t / 0.09) * gain;
    dst[0][start + i] += v * gl;
    dst[1][start + i] += v * gr;
  }
};

const subNote = (dst, { m, t0, hold, gain = 0.16, a = 0.5, r = 1.0 }) => {
  const f = mtof(m);
  const start = Math.round(t0 * SR);
  const n = Math.round((hold + r) * SR);
  for (let i = 0; i < n && start + i < dst[0].length; i++) {
    const t = i / SR;
    const v = Math.sin(TAU * f * t) * adsr(t, a, 0.5, 0.9, r, hold) * gain;
    dst[0][start + i] += v;
    dst[1][start + i] += v;
  }
};

// Stereo ping-pong delay (returns the wet signal only).
const pingPong = ([L, R], time, fb) => {
  const d = Math.round(time * SR);
  const n = L.length;
  const oL = new Float32Array(n);
  const oR = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const inL = i >= d ? L[i - d] + oR[i - d] * fb : 0;
    const inR = i >= d ? oL[i - d] * fb : 0;
    oL[i] = inL;
    oR[i] = inR;
  }
  return [oL, oR];
};

// ------------------------------------------------------------------- music
// 96 BPM, one chord per bar (2.5 s). Bar boundaries line up with the edit:
// bar 10 = 25.0 s (cut to the heating cross-section), bar 16 = 40.0 s
// (resolution after the last line). Video ends at 41.0 s.
const BEAT = 60 / 96;
const BAR = BEAT * 4;
const MUSIC_LEN = 41.5;
const VIDEO_END = 41.0;

const CHORDS = {
  Dmaj9: { notes: [50, 57, 61, 64, 66], root: 38 },
  Bm11: { notes: [47, 54, 57, 62, 64], root: 35 },
  Gmaj9: { notes: [43, 50, 54, 59, 69], root: 31 },
  Aadd9: { notes: [45, 52, 59, 61, 64], root: 33 },
};
const PROGRESSION = ["Dmaj9", "Bm11", "Gmaj9", "Aadd9"];
// Motif: rising, curious figure over D bars (A4 D5 E5 A5 … F#5).
const MOTIF = [
  [0, 69],
  [1, 74],
  [1.5, 76],
  [2, 81],
  [3, 78],
];

const music = () => {
  const dry = stereo(MUSIC_LEN);
  const send = stereo(MUSIC_LEN);
  const motifBus = stereo(MUSIC_LEN);

  for (let bar = 0; bar <= 16; bar++) {
    const t0 = bar * BAR;
    const final = bar === 16;
    const chord = CHORDS[final ? "Dmaj9" : PROGRESSION[bar % 4]];
    // Heat section (bar 10+) opens the filter and adds a warm sub.
    const warm = bar >= 10;
    const hold = final ? VIDEO_END - t0 - 0.2 : BAR;
    chord.notes.forEach((m, k) => {
      const opts = {
        m,
        t0,
        hold,
        a: bar === 0 ? 0.05 : final ? 0.12 : 0.6,
        r: final ? 0.6 : 1.4,
        cutoff: warm ? 1350 : 1100,
        gain: 0.05,
        pan: (k - 2) * 0.25,
      };
      padNote(dry, opts);
      padNote(send, { ...opts, gain: opts.gain * 0.8 });
    });
    // Kept low: the lift should add warmth (~3–4 dB), not loudness.
    if (warm) subNote(dry, { m: chord.root, t0, hold, gain: final ? 0.045 : 0.035 });

    // Restrained pulse: 8ths, thinned to quarters in the molecule close-up
    // (bars 5–7 ≈ 12.5–20 s), absent on the final bar.
    if (!final) {
      const thin = bar >= 5 && bar <= 7;
      const step = thin ? 1 : 0.5;
      const top = chord.notes.slice(2).map((m) => m + 12);
      const pattern = [0, 1, 2, 1];
      for (let b = 0, k = 0; b < 4; b += step, k++) {
        const accent = b % 1 === 0 ? 1 : 0.7;
        pulseNote(dry, {
          m: top[pattern[k % 4]],
          t0: t0 + b * BEAT,
          gain: (thin ? 0.022 : 0.028) * accent,
          pan: k % 2 ? 0.3 : -0.3,
        });
      }
    }

    // Motif on D bars outside the molecule close-up; hook at 0.0 s.
    if (!final && bar % 4 === 0) {
      MOTIF.forEach(([beat, m], k) => {
        // Full level only for the opening hook; repeats sit back under narration.
        bellNote(motifBus, { m, t0: t0 + beat * BEAT, gain: bar === 0 ? 0.11 : 0.065, pan: k % 2 ? 0.2 : -0.2 });
      });
    }
  }
  // Resolution: tonic bell at 40.0 s over the final chord.
  bellNote(motifBus, { m: 74, t0: 16 * BAR, decay: 0.9, gain: 0.11 });
  bellNote(motifBus, { m: 86, t0: 16 * BAR + 0.01, decay: 0.7, gain: 0.04, pan: 0.2 });

  addInto(dry, motifBus);
  addInto(send, motifBus, 0.9);
  addInto(dry, pingPong(motifBus, BEAT * 0.75, 0.35), 0.28);

  const wet = reverb(send, { room: 0.86, damp: 0.35 });
  addInto(dry, wet, 0.55);

  highpass(dry, 30);
  // Gentle saturation for glue, then final level.
  normalize(dry, -3);
  for (const ch of dry) for (let i = 0; i < ch.length; i++) ch[i] = Math.tanh(ch[i] * 1.2) / Math.tanh(1.2);
  // Let the final chord ring, then close cleanly on the last video frame.
  const fadeStart = Math.round(40.35 * SR);
  const fadeEnd = Math.round(VIDEO_END * SR);
  for (const ch of dry)
    for (let i = fadeStart; i < ch.length; i++) ch[i] *= i >= fadeEnd ? 0 : Math.cos(((i - fadeStart) / (fadeEnd - fadeStart)) * (Math.PI / 2));
  normalize(dry, -6);
  return dry;
};

// ----------------------------------------------------------------- effects
const rand = makeRng(1001);
const noise = () => rand() * 2 - 1;

// T1: very subtle electrical activation — soft mains-like buzz swelling in.
const electricActivation = () => {
  const len = 1.1;
  const b = stereo(len);
  const lp = new Biquad();
  lp.set("lp", 420, 0.8);
  let ph = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const env = smooth(t / 0.55) * Math.exp(-Math.max(0, t - 0.55) / 0.22);
    const f = 100;
    ph = (ph + f / SR) % 1;
    const saw = 2 * ph - 1 - polyBlep(ph, f / SR);
    const tone = Math.sin(TAU * (180 + 140 * smooth(t / 0.7)) * t) * 0.25;
    const v = (lp.process(saw) * 0.8 + tone) * env;
    b[0][i] = v;
    b[1][i] = v;
  }
  fadeEdges(b, 0.005, 0.05);
  normalize(b, -9);
  return b;
};

// T2: airy shimmer as the first wave appears.
const microwaveShimmer = () => {
  const len = 2.2;
  const b = stereo(len);
  const partials = [86, 93, 98, 102, 105].map((m, k) => ({ f: mtof(m), pan: (k - 2) * 0.4, rate: 5 + k * 1.7, ph: k }));
  const bp = [new Biquad(), new Biquad()];
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const env = smooth(t / 0.45) * Math.exp(-Math.max(0, t - 0.45) / 0.55);
    const glide = 1 + 0.03 * smooth(t / 1.2);
    let l = 0;
    let r = 0;
    partials.forEach((p, k) => {
      const trem = 0.6 + 0.4 * Math.sin(TAU * p.rate * t + p.ph);
      const s = Math.sin(TAU * p.f * glide * t) * trem * (k === 0 ? 0.5 : 0.3);
      const [gl, gr] = panGains(p.pan);
      l += s * gl;
      r += s * gr;
    });
    if (i % 32 === 0) {
      const fc = 5000 + 3000 * smooth(t / 1.2);
      bp[0].set("bp", fc, 2);
      bp[1].set("bp", fc * 1.05, 2);
    }
    l += bp[0].process(noise()) * 0.35;
    r += bp[1].process(noise()) * 0.35;
    b[0][i] = l * env;
    b[1][i] = r * env;
  }
  const wet = reverb(b, { room: 0.8, damp: 0.4 });
  addInto(b, wet, 0.6);
  fadeEdges(b, 0.004, 0.25);
  normalize(b, -9);
  return b;
};

// S5: soft riser into the molecular zoom; ends cleanly on the cut.
const zoomRiser = () => {
  const len = 1.05;
  const b = stereo(len);
  const bp = [new Biquad(), new Biquad()];
  let ph = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const x = t / len;
    const env = Math.pow(smooth(x), 1.6);
    if (i % 32 === 0) {
      const fc = 400 * Math.pow(10, x);
      bp[0].set("bp", fc, 1.4);
      bp[1].set("bp", fc * 1.08, 1.4);
    }
    ph += (300 + 600 * x * x) / SR;
    const tone = Math.sin(TAU * ph) * 0.25;
    b[0][i] = (bp[0].process(noise()) * 0.8 + tone) * env;
    b[1][i] = (bp[1].process(noise()) * 0.8 + tone) * env;
  }
  fadeEdges(b, 0.01, 0.03);
  normalize(b, -9);
  return b;
};

// T3: warm tonal swell as the food heats (G chord, matches music bar 10).
const heatSwell = () => {
  const len = 2.6;
  const b = stereo(len);
  [43, 50, 59, 62].forEach((m, k) =>
    padNote(b, { m, t0: 0, hold: 0.9, a: 0.8, r: 1.4, cutoff: 650, gain: 0.12, pan: (k - 1.5) * 0.3 }),
  );
  subNote(b, { m: 31, t0: 0, hold: 0.9, a: 0.7, r: 1.2, gain: 0.25 });
  const wet = reverb(b, { room: 0.82, damp: 0.5 });
  addInto(b, wet, 0.4);
  highpass(b, 28);
  fadeEdges(b, 0.01, 0.3);
  normalize(b, -9);
  return b;
};

// S4: microwave running hum (seamless 6 s loop). All periodic parts complete
// whole cycles in 6 s; the noise layer is cross-faded at the seam.
const ovenHumLoop = () => {
  const len = 6;
  const b = stereo(len + 0.5);
  const lp = [new Biquad(), new Biquad()];
  lp[0].set("lp", 700, 0.7);
  lp[1].set("lp", 760, 0.7);
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const wob = 1 + 0.08 * Math.sin(TAU * 0.5 * t);
    const hum = (Math.sin(TAU * 120 * t) * 0.5 + Math.sin(TAU * 240 * t) * 0.22 + Math.sin(TAU * 360 * t) * 0.08) * wob;
    b[0][i] = hum + lp[0].process(noise()) * 0.5;
    b[1][i] = hum + lp[1].process(noise()) * 0.5;
  }
  highpass(b, 40);
  const loop = makeLoop(b, len, 0.5);
  normalize(loop, -12);
  return loop;
};

// S6: low, quiet turntable motor (seamless 6 s loop).
const turntableMotorLoop = () => {
  const len = 6;
  const b = stereo(len + 0.5);
  const bp = [new Biquad(), new Biquad()];
  bp[0].set("bp", 520, 1.2);
  bp[1].set("bp", 560, 1.2);
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const wob = 1 + 0.15 * Math.sin(TAU * 1.5 * t);
    const motor = (Math.sin(TAU * 85 * t) * 0.45 + Math.sin(TAU * 170 * t) * 0.2 + Math.sin(TAU * 255 * t) * 0.06) * wob;
    b[0][i] = motor + bp[0].process(noise()) * 0.25 * wob;
    b[1][i] = motor + bp[1].process(noise()) * 0.25 * wob;
  }
  highpass(b, 45);
  const loop = makeLoop(b, len, 0.5);
  normalize(loop, -12);
  return loop;
};

// S3 (optional): single soft start beep.
const startBeep = () => {
  const len = 0.3;
  const b = stereo(len);
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const env = smooth(t / 0.012) * (t < 0.16 ? 1 : Math.max(0, 1 - (t - 0.16) / 0.06));
    const v = (Math.sin(TAU * 1760 * t) + Math.sin(TAU * 3520 * t) * 0.12) * env;
    b[0][i] = v;
    b[1][i] = v;
  }
  normalize(b, -12);
  return b;
};

// --------------------------------------------------------------------- run
const assets = [
  ["music/ep001-music-bed.wav", music],
  ["sfx/t1-electric-activation.wav", electricActivation],
  ["sfx/t2-microwave-shimmer.wav", microwaveShimmer],
  ["sfx/s5-zoom-riser.wav", zoomRiser],
  ["sfx/t3-heat-swell.wav", heatSwell],
  ["sfx/s4-oven-hum-loop.wav", ovenHumLoop],
  ["sfx/s6-turntable-motor-loop.wav", turntableMotorLoop],
  ["sfx/s3-start-beep.wav", startBeep],
];

for (const [file, make] of assets) {
  const b = make();
  const path = join(OUT, file);
  writeWav(path, b);
  const seam = file.includes("loop")
    ? ` | loop seam jump ${db(Math.max(Math.abs(b[0][0] - b[0][b[0].length - 1]), Math.abs(b[1][0] - b[1][b[1].length - 1])) / peakOf(b)).toFixed(1)} dB re peak`
    : "";
  console.log(
    `${relative(ROOT, path).replace(/\\/g, "/")} | ${(b[0].length / SR).toFixed(3)} s | peak ${db(peakOf(b)).toFixed(1)} dBFS | rms ${db(rmsOf(b)).toFixed(1)} dBFS${seam}`,
  );
}
