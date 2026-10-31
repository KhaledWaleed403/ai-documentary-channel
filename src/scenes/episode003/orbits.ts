// Episode 003 orbital geometry. Everything here is plain two-body physics, so the
// drawn flybys and orbits are physically consistent rather than hand-shaped.
// Coordinates are "math" units: x right, y UP. Scenes flip y when drawing.

export type V2 = { x: number; y: number };

export const add = (a: V2, b: V2): V2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: V2, b: V2): V2 => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: V2, k: number): V2 => ({ x: a.x * k, y: a.y * k });
export const len = (a: V2) => Math.hypot(a.x, a.y);
export const fromAngle = (deg: number, r = 1): V2 => ({ x: r * Math.cos((deg * Math.PI) / 180), y: r * Math.sin((deg * Math.PI) / 180) });
export const rot = (a: V2, deg: number): V2 => {
  const c = Math.cos((deg * Math.PI) / 180);
  const s = Math.sin((deg * Math.PI) / 180);
  return { x: a.x * c - a.y * s, y: a.x * s + a.y * c };
};

// Unpowered hyperbolic flyby relative to the planet (planet at the origin).
// vInf: speed far from the planet; turnDeg: how far gravity turns the velocity;
// rp: closest-approach distance; inDeg: direction of travel on the way in;
// cw: true if the path turns clockwise. Time unit = frames.
export type Flyby = {
  vInf: number;
  turnDeg: number;
  rp: number;
  inDeg: number;
  outDeg: number;
  // Position and velocity relative to the planet, `tau` frames after closest approach.
  rel: (tau: number) => { p: V2; v: V2 };
};

export const makeFlyby = ({ vInf, turnDeg, rp, inDeg, cw }: { vInf: number; turnDeg: number; rp: number; inDeg: number; cw: boolean }): Flyby => {
  // sin(δ/2) = 1/e for a hyperbola; a = rp / (e − 1); μ = a·v∞².
  const e = 1 / Math.sin((turnDeg * Math.PI) / 360);
  const a = rp / (e - 1);
  const mu = a * vInf * vInf;
  const n = Math.sqrt(mu / (a * a * a));
  const b = a * Math.sqrt(e * e - 1);
  const m = cw ? -1 : 1;
  // Perifocal frame: periapsis on +x; incoming asymptote direction is (1, m·√(e²−1)) normalised... rotate it onto inDeg.
  const asym = (Math.atan2(m * Math.sqrt(e * e - 1), 1) * 180) / Math.PI;
  const phi = inDeg - asym;
  const solveH = (M: number) => {
    // Hyperbolic Kepler equation: M = e·sinh H − H (Newton).
    let H = Math.asinh(M / e);
    for (let i = 0; i < 40; i++) {
      const f = e * Math.sinh(H) - H - M;
      const d = e * Math.cosh(H) - 1;
      H -= f / d;
      if (Math.abs(f) < 1e-10) {
        break;
      }
    }
    return H;
  };
  const rel = (tau: number) => {
    const H = solveH(n * tau);
    const p = { x: a * (e - Math.cosh(H)), y: m * b * Math.sinh(H) };
    const dH = n / (e * Math.cosh(H) - 1);
    const v = { x: -a * Math.sinh(H) * dH, y: m * b * Math.cosh(H) * dH };
    return { p: rot(p, phi), v: rot(v, phi) };
  };
  return { vInf, turnDeg, rp, inDeg, outDeg: inDeg + (cw ? -turnDeg : turnDeg), rel };
};

// Bound Kepler orbit with the Sun at the origin and perihelion along +x, rotated by `argDeg`.
// `M` = mean anomaly in radians; returns position and the relative speed factor (v / v_perihelion).
export const ellipseAt = (aAxis: number, e: number, M: number, argDeg = 0) => {
  let E = M;
  for (let i = 0; i < 30; i++) {
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  const p = { x: aAxis * (Math.cos(E) - e), y: aAxis * Math.sqrt(1 - e * e) * Math.sin(E) };
  const r = len(p);
  // Vis-viva ratio: v ∝ sqrt(2/r − 1/a).
  const vRatio = Math.sqrt(2 / r - 1 / aAxis) / Math.sqrt(2 / (aAxis * (1 - e)) - 1 / aAxis);
  return { p: rot(p, argDeg), r, vRatio };
};

// SVG path of a full ellipse (focus at origin) in screen space: centre (cx, cy), y flipped, `scale` px per unit.
export const ellipsePath = (aAxis: number, e: number, argDeg: number, cx: number, cy: number, scale = 1, steps = 180, from = 0, to = 1) => {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const E = 2 * Math.PI * (from + (to - from) * (i / steps));
    const p = rot({ x: aAxis * (Math.cos(E) - e), y: aAxis * Math.sqrt(1 - e * e) * Math.sin(E) }, argDeg);
    pts.push(`${i ? "L" : "M"}${(cx + p.x * scale).toFixed(1)} ${(cy - p.y * scale).toFixed(1)}`);
  }
  return pts.join(" ");
};

// SVG polyline through screen points.
export const polyline = (pts: V2[]) => pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
