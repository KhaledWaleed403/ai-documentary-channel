// Generates the Episode 001 sound-design V2 effects: synthesized motifs plus
// processed CC0 Foley. Plain Node.js, no dependencies, deterministic (fixed
// seed). Foley sources are decoded with Remotion's bundled ffmpeg.
//
//   node scripts/audio/generate-ep001-sfx-v2.mjs
//
// Output (never touches V1 files or narration):
//   episodes/episode-001/v2.3/assets/audio/sfx/*-v2.wav    synthesized
//   episodes/episode-001/v2.3/assets/audio/foley/*-v2.wav  from foley/source/*.mp3
// 48 kHz, 24-bit PCM, stereo. Spec and cue sheet: episodes/episode-001/v2.3/sound-design-v2.md.
// Motion-synced files (bowl slides, turntable) derive their envelopes from the
// same easing curves and frame ranges as the scenes; keep them in sync.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 48000;
const FPS = 30;
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
const rand = makeRng(2002);
const noise = () => rand() * 2 - 1;
const stereo = (sec) => {
  const n = Math.round(sec * SR);
  return [new Float32Array(n), new Float32Array(n)];
};
const panGains = (pan) => {
  const a = ((pan + 1) / 2) * (Math.PI / 2);
  return [Math.cos(a), Math.sin(a)];
};
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

// Same cubic-bezier easing as Remotion's Easing.bezier / src/animations/timing.ts.
const bezier = (x1, y1, x2, y2) => {
  const coord = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  return (x) => {
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 40; k++) {
      const mid = (lo + hi) / 2;
      if (coord(mid, x1, x2) < x) lo = mid;
      else hi = mid;
    }
    return coord((lo + hi) / 2, y1, y2);
  };
};
const easeOut = bezier(0.16, 1, 0.3, 1);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
// Normalised speed (peak 1) of an eased move over `frames`, at time t (s) from its start.
const speedCurve = (ease, frames) => {
  const dur = frames / FPS;
  const raw = (t) => (t <= 0 || t >= dur ? 0 : (ease(Math.min(1, (t + 0.002) / dur)) - ease(Math.max(0, (t - 0.002) / dur))) / 0.004);
  let peak = 0;
  for (let t = 0; t < dur; t += 0.002) peak = Math.max(peak, raw(t));
  return (t) => raw(t) / peak;
};

// RBJ biquad.
class Biquad {
  constructor(type = "lp", f = 1000, q = 0.707) {
    this.x1 = this.x2 = this.y1 = this.y2 = 0;
    this.set(type, f, q);
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

// Freeverb-style stereo reverb (same as the V1 generator).
const reverb = ([inL, inR], { room = 0.8, damp = 0.4 } = {}) => {
  const scale = SR / 44100;
  const combT = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
  const apT = [556, 441, 341, 225];
  const run = (input, off) => {
    const out = new Float32Array(input.length);
    const combs = combT.map((t) => ({ buf: new Float32Array(Math.round((t + off) * scale)), i: 0, store: 0 }));
    const aps = apT.map((t) => ({ buf: new Float32Array(Math.round((t + off) * scale)), i: 0 }));
    for (let k = 0; k < input.length; k++) {
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
      out[k] = s;
    }
    return out;
  };
  return [run(inL, 0), run(inR, 23)];
};

const addInto = (dst, src, gain = 1, at = 0) => {
  const o = Math.round(at * SR);
  for (let c = 0; c < 2; c++) for (let i = 0; i < src[c].length && i + o < dst[c].length; i++) dst[c][i + o] += src[c][i] * gain;
};
const peakOf = (b) => {
  let p = 0;
  for (const ch of b) for (const v of ch) p = Math.max(p, Math.abs(v));
  return p;
};
const rmsOf = (b) => {
  let s = 0;
  for (const ch of b) for (const v of ch) s += v * v;
  return Math.sqrt(s / (b[0].length * 2));
};
const normalize = (b, peakDb) => {
  const g = Math.pow(10, peakDb / 20) / peakOf(b);
  for (const ch of b) for (let i = 0; i < ch.length; i++) ch[i] *= g;
};
const filter = (b, type, f, q = 0.707) => {
  for (const ch of b) {
    const bq = new Biquad(type, f, q);
    for (let i = 0; i < ch.length; i++) ch[i] = bq.process(ch[i]);
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
// Gentle soft clip that adds low-order harmonics, so low tones read on phones.
const warmth = (b, drive) => {
  for (const ch of b) for (let i = 0; i < ch.length; i++) ch[i] = Math.tanh(ch[i] * drive) / Math.tanh(drive);
};

const writeWav = (path, [L, R]) => {
  const n = L.length;
  const data = Buffer.alloc(n * 6);
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 2; c++) {
      const v = Math.max(-1, Math.min(1, (c ? R : L)[i]));
      data.writeIntLE(Math.round(v * 8388607), i * 6 + c * 3, 3);
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

// Decode a Foley source to 48 kHz stereo floats via Remotion's ffmpeg.
const TMP = mkdtempSync(join(tmpdir(), "ep001-sfx-v2-"));
const decode = (file, start, length) => {
  const wav = join(TMP, "decode.wav");
  execFileSync(
    "npx",
    ["remotion", "ffmpeg", "-v", "error", "-y", "-ss", String(start), "-t", String(length), "-i", join(OUT, "foley", "source", file), "-ac", "2", "-ar", String(SR), "-c:a", "pcm_s16le", wav],
    { cwd: ROOT, shell: process.platform === "win32", stdio: ["ignore", "ignore", "inherit"] },
  );
  const raw = readFileSync(wav);
  const k = raw.indexOf("data") + 8;
  const n = Math.floor((raw.length - k) / 4);
  const b = [new Float32Array(n), new Float32Array(n)];
  for (let i = 0; i < n; i++) {
    b[0][i] = raw.readInt16LE(k + i * 4) / 32768;
    b[1][i] = raw.readInt16LE(k + i * 4 + 2) / 32768;
  }
  return b;
};
// Trim so the first transient (smoothed level above `rel` of peak) sits `pre` s into the file.
const alignOnset = (b, rel = 0.3, pre = 0.008) => {
  const peak = peakOf(b);
  let env = 0;
  let onset = 0;
  for (let i = 0; i < b[0].length; i++) {
    env = Math.max(Math.abs(b[0][i]), Math.abs(b[1][i]), env * 0.995);
    if (env > rel * peak) {
      onset = i;
      break;
    }
  }
  const s = Math.max(0, onset - Math.round(pre * SR));
  return b.map((ch) => ch.slice(s));
};
// Downward expander: pushes the noise floor between contacts further down.
const expand = (b, thresholdDb, ratio = 2.5) => {
  const thr = Math.pow(10, thresholdDb / 20);
  let env = 0;
  for (let i = 0; i < b[0].length; i++) {
    const x = Math.max(Math.abs(b[0][i]), Math.abs(b[1][i]));
    env = x > env ? env + (x - env) * 0.2 : env * 0.9995;
    const g = env >= thr ? 1 : Math.pow(env / thr, ratio - 1);
    b[0][i] *= g;
    b[1][i] *= g;
  }
};

// ------------------------------------------------------- wave / field motif
// A clean pitched tone with a gentle glide and a slight wobble (the drawn
// wave's wiggle). Episode key: D. Variations: emit, reflect, absorb, heat.
const motifTone = (dst, { f0, f1 = f0, glide = 0.25, t0 = 0, a = 0.03, hold = 0.4, decay = 0.5, gain = 0.3, pan0 = 0, pan1 = pan0, vib = 0.004, bright = 0.22 }) => {
  const n0 = Math.round(t0 * SR);
  const len = a + hold + decay * 5;
  let ph = 0;
  for (let i = 0; i < len * SR && n0 + i < dst[0].length; i++) {
    const t = i / SR;
    const env = (t < a ? smooth(t / a) : 1) * (t > a + hold ? Math.exp(-(t - a - hold) / decay) : 1);
    const f = (f0 + (f1 - f0) * smooth(t / glide)) * (1 + vib * Math.sin(TAU * 6.2 * t));
    ph += f / SR;
    const v = (Math.sin(TAU * ph) + bright * Math.sin(TAU * 2 * ph) + bright * 0.3 * Math.sin(TAU * 3 * ph)) * env * gain;
    const [gl, gr] = panGains(pan0 + (pan1 - pan0) * smooth(t / (a + hold + decay)));
    dst[0][n0 + i] += v * gl;
    dst[1][n0 + i] += v * gr;
  }
};
const withSpace = (b, wet, room = 0.78) => {
  addInto(b, reverb(b, { room, damp: 0.45 }), wet);
  return b;
};

// Emission: rises A4 -> D5 and travels right -> left with the drawn wave (50 frames).
const waveEmit = () => {
  const b = stereo(2.6);
  motifTone(b, { f0: mtof(69), f1: mtof(74), glide: 0.22, a: 0.05, hold: 1.0, decay: 0.32, gain: 0.35, pan0: 0.55, pan1: -0.45 });
  motifTone(b, { f0: mtof(81), f1: mtof(86), glide: 0.22, a: 0.08, hold: 0.8, decay: 0.25, gain: 0.04, pan0: 0.55, pan1: -0.45, bright: 0 });
  withSpace(b, 0.45);
  filter(b, "hp", 150);
  fadeEdges(b, 0.002, 0.3);
  normalize(b, -6);
  return b;
};
// Second, softer wave: same motif a fifth lower, shorter.
const waveEmitEcho = () => {
  const b = stereo(2.0);
  motifTone(b, { f0: mtof(62), f1: mtof(69), glide: 0.22, a: 0.06, hold: 0.7, decay: 0.28, gain: 0.35, pan0: 0.5, pan1: -0.4 });
  withSpace(b, 0.45);
  filter(b, "hp", 150);
  fadeEdges(b, 0.002, 0.3);
  normalize(b, -6);
  return b;
};
// Reflection off the metal wall: quick attack, a faint inharmonic partial for a
// metallic edge, short ring.
const reflectPing = (m, pan) => () => {
  const b = stereo(1.2);
  motifTone(b, { f0: mtof(m + 0.3), f1: mtof(m), glide: 0.04, a: 0.003, hold: 0.01, decay: 0.14, gain: 0.4, pan0: pan, vib: 0.002, bright: 0.12 });
  motifTone(b, { f0: mtof(m) * 2.76, a: 0.002, hold: 0.0, decay: 0.05, gain: 0.05, pan0: pan, vib: 0, bright: 0 });
  withSpace(b, 0.35, 0.7);
  filter(b, "lp", 5000);
  fadeEdges(b, 0.001, 0.2);
  normalize(b, -6);
  return b;
};
// Absorption: the motif dips an octave and darkens as it enters the food.
const absorb = (m, pan) => () => {
  const b = stereo(1.4);
  const tmp = stereo(1.4);
  motifTone(tmp, { f0: mtof(m), f1: mtof(m - 12), glide: 0.32, a: 0.012, hold: 0.15, decay: 0.18, gain: 0.4, pan0: pan, bright: 0.3 });
  const lp = [new Biquad(), new Biquad()];
  for (let i = 0; i < tmp[0].length; i++) {
    if (i % 32 === 0) {
      const fc = 3500 * Math.exp(-(i / SR) / 0.12) + 450;
      lp[0].set("lp", fc, 0.9);
      lp[1].set("lp", fc, 0.9);
    }
    b[0][i] = lp[0].process(tmp[0][i]);
    b[1][i] = lp[1].process(tmp[1][i]);
  }
  withSpace(b, 0.3, 0.7);
  filter(b, "hp", 120);
  fadeEdges(b, 0.002, 0.3);
  normalize(b, -6);
  return b;
};

// Soft detuned-saw pad voice, low-passed, for the heat motif.
const padVoice = (dst, { m, t0 = 0, a, hold, r, cutoff, cutoffEnd = cutoff, gain, pan = 0 }) => {
  const n0 = Math.round(t0 * SR);
  const len = a + hold + r;
  const [gl, gr] = panGains(pan);
  const lp = new Biquad();
  const ph = [0, 0.33, 0.66];
  const det = [-0.07, 0, 0.06];
  for (let i = 0; i < len * SR && n0 + i < dst[0].length; i++) {
    const t = i / SR;
    if (i % 32 === 0) lp.set("lp", cutoff + (cutoffEnd - cutoff) * smooth(t / len), 0.6);
    const env = smooth(t / a) * (t > a + hold ? Math.max(0, 1 - (t - a - hold) / r) ** 2 : 1);
    let s = 0;
    for (let k = 0; k < 3; k++) {
      ph[k] = (ph[k] + mtof(m + det[k]) / SR) % 1;
      s += 2 * ph[k] - 1;
    }
    const v = lp.process(s / 3) * env * gain;
    dst[0][n0 + i] += v * gl;
    dst[1][n0 + i] += v * gr;
  }
};

// Energy -> heat: the wave tone bends down into a warm D chord (SH05 opening).
const heatTransition = () => {
  const b = stereo(3.2);
  motifTone(b, { f0: mtof(74), f1: mtof(62), glide: 0.7, a: 0.04, hold: 0.45, decay: 0.35, gain: 0.22 });
  [50, 57, 62, 66].forEach((m, k) => padVoice(b, { m, t0: 0.25, a: 0.55, hold: 0.35, r: 1.5, cutoff: 380, cutoffEnd: 900, gain: 0.16, pan: (k - 1.5) * 0.35 }));
  motifTone(b, { f0: mtof(38), t0: 0.3, a: 0.5, hold: 0.4, decay: 0.45, gain: 0.18, vib: 0, bright: 0.35 });
  warmth(b, 1.6);
  withSpace(b, 0.35, 0.82);
  filter(b, "hp", 60);
  fadeEdges(b, 0.003, 0.5);
  normalize(b, -6);
  return b;
};
// Heat spreading through the cross-section: slow swell that opens up and peaks
// about 3 s in (in the narration gap after SH05's line), then settles.
const heatSpread = () => {
  const b = stereo(5.0);
  [50, 57, 64, 69].forEach((m, k) => padVoice(b, { m, t0: 0, a: 2.6, hold: 0.5, r: 1.8, cutoff: 300, cutoffEnd: 1100, gain: 0.15, pan: (k - 1.5) * 0.4 }));
  motifTone(b, { f0: mtof(38), a: 2.4, hold: 0.6, decay: 0.5, gain: 0.16, vib: 0, bright: 0.35 });
  warmth(b, 1.5);
  withSpace(b, 0.4, 0.84);
  filter(b, "hp", 60);
  fadeEdges(b, 0.05, 0.6);
  normalize(b, -6);
  return b;
};
// Closing reprise: a short wave statement resolving into the heat chord; fades
// out by 2.9 s (ends on the last video frame when placed at frame 1142).
const heatReprise = () => {
  const b = stereo(2.9);
  motifTone(b, { f0: mtof(69), f1: mtof(74), glide: 0.18, a: 0.04, hold: 0.25, decay: 0.3, gain: 0.2, pan0: 0.1 });
  [50, 57, 62, 66, 69].forEach((m, k) => padVoice(b, { m, t0: 0.35, a: 0.6, hold: 0.9, r: 1.0, cutoff: 450, cutoffEnd: 1000, gain: 0.13, pan: (k - 2) * 0.3 }));
  motifTone(b, { f0: mtof(38), t0: 0.35, a: 0.6, hold: 0.8, decay: 0.4, gain: 0.15, vib: 0, bright: 0.35 });
  warmth(b, 1.5);
  withSpace(b, 0.35, 0.8);
  filter(b, "hp", 60);
  fadeEdges(b, 0.003, 0.9);
  normalize(b, -6);
  return b;
};
// Finale (revision 2.3): the reprise's warm chord only, without its opening
// wave statement. Starts as the view settles on the bowl (frame 1152) and
// fades out by the last frame.
const heatFinale = () => {
  const b = stereo(2.6);
  [50, 57, 62, 66, 69].forEach((m, k) => padVoice(b, { m, t0: 0, a: 0.6, hold: 0.9, r: 1.0, cutoff: 450, cutoffEnd: 1000, gain: 0.13, pan: (k - 2) * 0.3 }));
  motifTone(b, { f0: mtof(38), t0: 0, a: 0.6, hold: 0.8, decay: 0.4, gain: 0.15, vib: 0, bright: 0.35 });
  warmth(b, 1.5);
  withSpace(b, 0.35, 0.8);
  filter(b, "hp", 60);
  fadeEdges(b, 0.003, 0.9);
  normalize(b, -6);
  return b;
};
// Small wave icon drawing on in SH07 (16 frames): a brief, quiet motif statement.
const waveIcon = () => {
  const b = stereo(1.3);
  motifTone(b, { f0: mtof(69), f1: mtof(74), glide: 0.15, a: 0.03, hold: 0.4, decay: 0.18, gain: 0.35, pan0: -0.25, pan1: 0.25 });
  withSpace(b, 0.4);
  filter(b, "hp", 150);
  fadeEdges(b, 0.002, 0.25);
  normalize(b, -6);
  return b;
};

// Zoom into the soup: the motif climbs an octave while its wobble speeds up
// (oscillation getting faster as we go smaller); ends on the cut.
const zoomRiser = () => {
  const len = 1.1;
  const b = stereo(len);
  const bp = [new Biquad("bp", 400, 1.2), new Biquad("bp", 420, 1.2)];
  let ph = 0;
  let wph = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const x = t / len;
    const env = Math.pow(smooth(x), 1.8);
    if (i % 32 === 0) {
      bp[0].set("bp", 350 * Math.pow(6, x), 1.3);
      bp[1].set("bp", 370 * Math.pow(6, x), 1.3);
    }
    wph += (3 + 22 * x * x) / SR;
    ph += (mtof(62) * Math.pow(2, smooth(x))) / SR;
    const tone = (Math.sin(TAU * ph) + 0.2 * Math.sin(TAU * 2 * ph)) * (0.75 + 0.25 * Math.sin(TAU * wph)) * 0.32;
    b[0][i] = (bp[0].process(noise()) * 0.35 + tone) * env;
    b[1][i] = (bp[1].process(noise()) * 0.35 + tone) * env;
  }
  fadeEdges(b, 0.01, 0.02);
  normalize(b, -6);
  return b;
};
// Arrival at molecular scale (SH04 cut): soft low bloom, then quiet.
const zoomArrival = () => {
  const b = stereo(2.0);
  motifTone(b, { f0: mtof(50), a: 0.012, hold: 0.05, decay: 0.45, gain: 0.3, vib: 0, bright: 0.4 });
  motifTone(b, { f0: mtof(57), a: 0.015, hold: 0.05, decay: 0.35, gain: 0.16, vib: 0, bright: 0.2, pan0: 0.25 });
  motifTone(b, { f0: mtof(74), a: 0.02, hold: 0.0, decay: 0.25, gain: 0.05, vib: 0, bright: 0, pan0: -0.3 });
  warmth(b, 1.4);
  withSpace(b, 0.4, 0.8);
  filter(b, "hp", 70);
  fadeEdges(b, 0.001, 0.4);
  normalize(b, -6);
  return b;
};

// ------------------------------------------------------ mechanisms / machine
// Short dry relay/latch click: contact tick plus a 9 ms bounce and a small body.
const clickInto = (dst, t0, gain, { tone = 1600, body = 190 } = {}) => {
  const n0 = Math.round(t0 * SR);
  const bp = new Biquad("bp", tone, 1.6);
  for (const [off, g] of [[0, 1], [0.009, 0.45]]) {
    const o = n0 + Math.round(off * SR);
    for (let i = 0; i < 0.05 * SR && o + i < dst[0].length; i++) {
      const t = i / SR;
      const v = (bp.process(noise()) * Math.exp(-t / 0.004) + Math.sin(TAU * body * t) * 0.5 * Math.exp(-t / 0.012)) * g * gain;
      dst[0][o + i] += v;
      dst[1][o + i] += v;
    }
  }
};
// Oven start-up and running texture (frames 70 -> 375): transformer hum with
// audible harmonics, a fan spinning up (blade-rate flutter speeding up), then a
// steady operating bed. Not looped: one continuous 10.6 s take.
const ovenRun = () => {
  const len = 10.6;
  const b = stereo(len);
  const fan = [new Biquad("bp", 300, 0.8), new Biquad("bp", 320, 0.8)];
  const lp = [new Biquad("lp", 2800, 0.7), new Biquad("lp", 2900, 0.7)];
  let blade = 0;
  let whine = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const spin = 1 - Math.exp(-t / 0.5); // fan speed 0 -> 1
    const humEnv = smooth(t / 0.06) * (0.45 + 0.55 * smooth(t / 0.9));
    if (i % 64 === 0) {
      fan[0].set("bp", 250 + 450 * spin, 0.8);
      fan[1].set("bp", 270 + 470 * spin, 0.8);
    }
    blade += (6 + 34 * spin) / SR;
    whine += (110 + 130 * spin) / SR;
    const flutter = 0.8 + 0.2 * Math.sin(TAU * blade);
    const wob = 1 + 0.04 * Math.sin(TAU * 0.4 * t);
    const hum =
      (Math.sin(TAU * 120 * t) * 0.32 + Math.sin(TAU * 240 * t) * 0.24 + Math.sin(TAU * 360 * t) * 0.14 + Math.sin(TAU * 480 * t) * 0.07 + Math.sin(TAU * 600 * t) * 0.035) *
      humEnv *
      wob;
    const motor = Math.sin(TAU * whine) * 0.05 * spin;
    const air = spin * spin * flutter * 1.5;
    b[0][i] = lp[0].process(hum + motor + fan[0].process(noise()) * air);
    b[1][i] = lp[1].process(hum * 0.96 + motor + fan[1].process(noise()) * air);
  }
  clickInto(b, 0.0, 0.6, { tone: 1400, body: 160 });
  filter(b, "hp", 80);
  fadeEdges(b, 0.0005, 0.5);
  normalize(b, -9);
  return b;
};

// Cut into the cutaway (SH01 -> SH02): a tactile low thump with a short air
// tail. Pitch drops 140 -> 55 Hz; harmonics keep it audible on small speakers.
const cutawayThump = () => {
  const b = stereo(1.0);
  const bp = [new Biquad("bp", 700, 0.7), new Biquad("bp", 760, 0.7)];
  let ph = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    ph += (55 + 85 * Math.exp(-t / 0.05)) / SR;
    const body = (Math.sin(TAU * ph) + 0.35 * Math.sin(TAU * 2 * ph) + 0.12 * Math.sin(TAU * 3 * ph)) * Math.exp(-t / 0.13) * smooth(t / 0.003);
    const air = Math.exp(-t / 0.09) * smooth(t / 0.01) * 0.3;
    b[0][i] = body * 0.8 + bp[0].process(noise()) * air;
    b[1][i] = body * 0.8 + bp[1].process(noise()) * air;
  }
  withSpace(b, 0.25, 0.75);
  filter(b, "hp", 40);
  fadeEdges(b, 0.0005, 0.3);
  normalize(b, -6);
  return b;
};

// Power feed (SH02 frames 134 -> 164): relay click, then a clean electrical buzz
// that brightens as the pulse travels up the feed, and settles as it reaches the
// magnetron. No sparks or zaps.
const electricPulse = () => {
  const len = 1.35;
  const travel = 30 / FPS;
  const b = stereo(len);
  const bp = [new Biquad("bp", 300, 1.1), new Biquad("bp", 320, 1.1)];
  let ph = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const x = clamp01(t / travel);
    const env = (0.25 + 0.75 * smooth(x)) * smooth(t / 0.03) * (t > travel ? Math.exp(-(t - travel) / 0.07) : 1);
    if (i % 32 === 0) {
      bp[0].set("bp", 260 + 1100 * smooth(x), 1.1);
      bp[1].set("bp", 280 + 1150 * smooth(x), 1.1);
    }
    ph = (ph + 100 / SR) % 1;
    const saw = 2 * ph - 1;
    b[0][i] = bp[0].process(saw) * env;
    b[1][i] = bp[1].process(saw) * env;
  }
  clickInto(b, 0.0, 0.5, { tone: 1500, body: 180 });
  filter(b, "hp", 90);
  fadeEdges(b, 0.0005, 0.08);
  normalize(b, -6);
  return b;
};

// Turntable (SH06): starts on frame 940, accelerates, peaks at 1000, stops on
// 1060 (easeInOut cubic over 120 frames). File starts at frame 935.
// Motor engage click on 939, whir and roller rumble follow the plate's speed,
// soft stop on 1060.
const turntable = () => {
  const lead = 5 / FPS;
  const run = 120 / FPS;
  const len = lead + run + 0.6;
  const speed = speedCurve(easeInOutCubic, 120);
  const b = stereo(len);
  const rumble = [new Biquad("bp", 300, 0.9), new Biquad("bp", 320, 0.9)];
  const lp = [new Biquad("lp", 2400, 0.7), new Biquad("lp", 2400, 0.7)];
  let gear = 0;
  let roll = 0;
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR;
    const tr = t - lead;
    const v = speed(tr);
    const energised = smooth((t - (lead - 1 / FPS)) / 0.05) * (tr < run ? 1 : Math.exp(-(tr - run) / 0.06));
    if (i % 64 === 0) {
      rumble[0].set("bp", 220 + 380 * v, 0.9);
      rumble[1].set("bp", 240 + 400 * v, 0.9);
    }
    gear += (140 + 160 * v) / SR;
    roll += (1.5 + 5 * v) / SR;
    const hum = (Math.sin(TAU * 100 * t) * 0.06 + Math.sin(TAU * 200 * t) * 0.05 + Math.sin(TAU * 300 * t) * 0.025) * energised;
    const whir = (Math.sin(TAU * gear) + 0.3 * Math.sin(TAU * 2 * gear)) * 0.3 * v;
    const bumps = 0.85 + 0.15 * Math.sin(TAU * roll);
    b[0][i] = lp[0].process(hum + whir + rumble[0].process(noise()) * 0.8 * v * bumps);
    b[1][i] = lp[1].process(hum * 0.97 + whir + rumble[1].process(noise()) * 0.8 * v * bumps);
  }
  clickInto(b, lead - 1 / FPS, 0.5, { tone: 1300, body: 150 });
  clickInto(b, lead + run, 0.35, { tone: 900, body: 120 });
  filter(b, "hp", 80);
  fadeEdges(b, 0.0005, 0.3);
  normalize(b, -6);
  return b;
};

// ----------------------------------------------------------------- Foley
// Ceramic bowl slide, shaped to the scene's motion. Source: steady part of a
// plate sliding on a table (no set-down hits). Amplitude follows the bowl's
// speed (easeOut), with a soft floor so the friction texture never vanishes
// abruptly. `frames` = move length; file starts 1 frame before the move.
const bowlSlide = (srcStart, frames, tail = 0.25) => () => {
  const lead = 1 / FPS;
  const dur = frames / FPS;
  const len = lead + dur + tail;
  const src = decode("freesound-79037.mp3", srcStart, len + 0.1);
  const speed = speedCurve(easeOut, frames);
  const b = stereo(len);
  for (let i = 0; i < b[0].length; i++) {
    const t = i / SR - lead;
    const v = t < 0 ? 0 : t < dur ? Math.pow(speed(t), 0.6) * smooth(t / 0.03) : 0;
    b[0][i] = src[0][i] * v;
    b[1][i] = src[1][i] * v;
  }
  // Smooth the gain curve's steps and keep the texture warm and mid-focused.
  filter(b, "hp", 140);
  filter(b, "lp", 5500);
  fadeEdges(b, 0.002, tail);
  normalize(b, -6);
  return b;
};
const doorClose = () => {
  let b = decode("freesound-632468.mp3", 0, 0.75);
  b = alignOnset(b);
  filter(b, "hp", 70);
  filter(b, "lp", 8000);
  fadeEdges(b, 0.001, 0.15);
  normalize(b, -6);
  return b;
};
const doorOpen = () => {
  let b = decode("freesound-632470.mp3", 0, 0.62);
  b = alignOnset(b);
  filter(b, "hp", 70);
  filter(b, "lp", 8000);
  fadeEdges(b, 0.001, 0.15);
  normalize(b, -6);
  return b;
};
// Spoon: two soft contacts and a short scrape from a recorded stir (9.95-11.35 s
// of the source). The source has an 8 kHz hiss floor, so it's low-passed and
// the floor between contacts is expanded down.
const spoonStir = () => {
  const b = decode("freesound-554557.mp3", 10.0, 1.4);
  filter(b, "hp", 150);
  filter(b, "lp", 5200);
  filter(b, "lp", 5200);
  expand(b, -40, 2.5);
  fadeEdges(b, 0.01, 0.3);
  normalize(b, -6);
  return b;
};

// --------------------------------------------------------------------- run
const assets = [
  ["sfx/oven-startup-run-v2.wav", ovenRun],
  ["sfx/cutaway-thump-v2.wav", cutawayThump],
  ["sfx/electric-pulse-v2.wav", electricPulse],
  ["sfx/wave-emit-v2.wav", waveEmit],
  ["sfx/wave-emit-echo-v2.wav", waveEmitEcho],
  ["sfx/wave-reflect-1-v2.wav", reflectPing(76, -0.6)],
  ["sfx/wave-reflect-2-v2.wav", reflectPing(78, 0.2)],
  ["sfx/wave-reflect-3-v2.wav", reflectPing(81, -0.6)],
  ["sfx/wave-absorb-a-v2.wav", absorb(74, 0.25)],
  ["sfx/wave-absorb-b-v2.wav", absorb(76, 0.05)],
  ["sfx/zoom-riser-v2.wav", zoomRiser],
  ["sfx/zoom-arrival-v2.wav", zoomArrival],
  ["sfx/heat-transition-v2.wav", heatTransition],
  ["sfx/heat-spread-v2.wav", heatSpread],
  ["sfx/turntable-motor-v2.wav", turntable],
  ["sfx/wave-icon-v2.wav", waveIcon],
  ["sfx/heat-reprise-v2.wav", heatReprise],
  ["sfx/heat-finale-v2.wav", heatFinale],
  ["foley/bowl-slide-in-v2.wav", bowlSlide(1.6, 40)],
  ["foley/bowl-slide-out-v2.wav", bowlSlide(3.0, 36)],
  ["foley/door-close-v2.wav", doorClose],
  ["foley/door-open-v2.wav", doorOpen],
  ["foley/spoon-stir-v2.wav", spoonStir],
];

// The approved files were generated with a relay-click asset first in this list
// (removed as unused); it drew 4800 noise samples. Skip them so the remaining
// files stay bit-identical to what was reviewed.
for (let i = 0; i < 4800; i++) rand();

try {
  for (const [file, make] of assets) {
    const b = make();
    const path = join(OUT, file);
    writeWav(path, b);
    console.log(`${relative(ROOT, path).replace(/\\/g, "/")} | ${(b[0].length / SR).toFixed(3)} s | peak ${db(peakOf(b)).toFixed(1)} dBFS | rms ${db(rmsOf(b)).toFixed(1)} dBFS`);
  }
} finally {
  rmSync(TMP, { recursive: true, force: true });
}
