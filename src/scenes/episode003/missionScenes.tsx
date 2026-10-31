// Episode 003 mission scenes: Voyager (1, 2, 9), the Sun problem and Parker (10–12),
// the recap (13) and the close (14). Solar-system maps compress distance
// (r ∝ AU^0.7) so Earth and Neptune fit one frame; the narration never quotes map scale.
import React from "react";
import { easeOut, lerp } from "../../animations/timing";
import { VectorArrow } from "../../components/VectorArrow";
import { type SceneProps } from "./frameScenes";
import { FLYBY, FLYBY_FRONT, relPath, scr, sunPath } from "./flybyModel";
import { Craft, H, Inset, Jupiter, K, Planet, SpeedBar, Stage, Sun, T, Tag, ViewBadge, W, pr, win } from "./kit";
import { ellipseAt, ellipsePath, polyline, type V2 } from "./orbits";

// ---------- Compressed solar-system map ----------
export const mapR = (au: number) => 70 * Math.pow(au, 0.7);
export const SUN: V2 = { x: 640, y: 600 };
export const polar = (r: number, deg: number, c: V2 = SUN): V2 => ({ x: c.x + r * Math.cos((deg * Math.PI) / 180), y: c.y - r * Math.sin((deg * Math.PI) / 180) });
export const AU = { earth: 1, jupiter: 5.2, saturn: 9.5, uranus: 19.2, neptune: 30.1 };

// Voyager 2: launch at perihelion (left of the Sun), a half-ellipse below the Sun to
// aphelion at Jupiter's distance (right). Hypothetical branch: the same ellipse carries on
// past aphelion and curves back inward. Actual path: bends at Jupiter and spirals outward.
const TRANSFER = { q: AU.earth, Q: AU.jupiter };
export const transferPoint = (deg: number) => {
  // Polar ellipse with perihelion at 180°: r = p / (1 + e cos(θ − 180°)).
  const a = (TRANSFER.q + TRANSFER.Q) / 2;
  const e = (TRANSFER.Q - TRANSFER.q) / (TRANSFER.Q + TRANSFER.q);
  const r = (a * (1 - e * e)) / (1 + e * Math.cos(((deg - 180) * Math.PI) / 180));
  return polar(mapR(r), deg);
};
// Launch (180°) → aphelion (360°), counter-clockwise through the bottom of the map.
export const transferPts = (to = 1) => Array.from({ length: 91 }, (_, i) => transferPoint(180 + 180 * to * (i / 90)));
// Hypothetical: past aphelion, round the top and back inward (one arc, no repeat).
export const ghostPts = (to = 1) => Array.from({ length: 61 }, (_, i) => transferPoint(360 + 120 * to * (i / 60)));
// Actual path after Jupiter: angle grows slowly while the radius grows (Saturn, Uranus, Neptune lie on it).
const OUT_MAX = 1.3; // map units beyond Neptune
export const outPoint = (s: number) => {
  const au = AU.jupiter * Math.pow(AU.neptune * OUT_MAX / AU.jupiter, s);
  const deg = 360 + 34 * Math.pow(s, 0.8);
  return polar(mapR(au), deg);
};
export const outS = (au: number) => Math.log(au / AU.jupiter) / Math.log((AU.neptune * OUT_MAX) / AU.jupiter);
export const outPts = (to = 1) => Array.from({ length: 121 }, (_, i) => outPoint(to * (i / 120)));
export const planetOnPath = (au: number) => outPoint(outS(au));

const OrbitRings: React.FC<{ opacity?: number; names?: number }> = ({ opacity = 1, names = 0 }) => (
  <g opacity={opacity}>
    {(Object.keys(AU) as (keyof typeof AU)[]).map((k) => (
      <circle key={k} cx={SUN.x} cy={SUN.y} r={mapR(AU[k])} fill="none" stroke={K.line} strokeWidth={1.5} opacity={0.8} />
    ))}
    <g opacity={names}>
      <T x={SUN.x - mapR(1) - 14} y={SUN.y + 8} size={20} color={K.muted} anchor="end">
        Earth
      </T>
    </g>
  </g>
);

const PlanetTag: React.FC<{ p: V2; name: string; opacity: number; r?: number; year?: string }> = ({ p, name, opacity, r = 9, year }) => (
  <g opacity={opacity}>
    <Planet x={p.x} y={p.y} r={r} />
    <T x={p.x + 16} y={p.y + 30} size={22} color={K.amber} weight={650}>
      {name}
      {year ? ` · ${year}` : ""}
    </T>
  </g>
);

// ---------- Scene 1: a path that should have turned back ----------
export const S01: React.FC<SceneProps> = ({ t, dur, beats }) => {
  const b = beats;
  const leg1 = pr(t, b[0] + 10, 230, easeOut);
  const ghost = pr(t, b[1] + 110, 110);
  const out = pr(t, b[2] + 10, 160);
  const pull = pr(t, 0, dur);
  const scale = lerp(1.18, 0.92, pull);
  const cx = W / 2;
  const cy = H / 2;
  const earth = transferPoint(180);
  const jupP = transferPoint(360);
  const ends = outPoint(out);
  return (
    <Stage>
      <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}>
        <OrbitRings names={pr(t, 20, 20)} />
        <Sun x={SUN.x} y={SUN.y} r={16} />
        <Planet x={earth.x} y={earth.y} r={8} color="#7FB8D8" />
        <Jupiter x={jupP.x} y={jupP.y} r={13} />
        <path d={polyline(transferPts(leg1))} fill="none" stroke={K.cyan} strokeWidth={4} />
        <path d={polyline(ghostPts(ghost))} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.8 * (1 - 0.5 * out)} />
        {out > 0 ? <path d={polyline(outPts(out))} fill="none" stroke={K.cyan} strokeWidth={4} /> : null}
        <PlanetTag p={planetOnPath(AU.saturn)} name="Saturn" opacity={pr(t, b[2] + 60, 12)} r={10} />
        <PlanetTag p={planetOnPath(AU.uranus)} name="Uranus" opacity={pr(t, b[2] + 95, 12)} r={8} />
        <PlanetTag p={planetOnPath(AU.neptune)} name="Neptune" opacity={pr(t, b[2] + 130, 12)} r={8} />
        <g opacity={pr(t, b[2] + 10, 12)}>
          <T x={jupP.x + 20} y={jupP.y + 34} size={22} color={K.amber} weight={650}>
            Jupiter
          </T>
        </g>
        {leg1 < 1 || out === 0 ? <Craft x={leg1 < 1 ? transferPoint(180 + 180 * leg1).x : out > 0 ? ends.x : jupP.x} y={leg1 < 1 ? transferPoint(180 + 180 * leg1).y : out > 0 ? ends.y : jupP.y} r={7} /> : <Craft x={ends.x} y={ends.y} r={7} />}
        <g opacity={pr(t, b[1] + 150, 15)}>
          <T x={transferPoint(420).x + 20} y={transferPoint(420).y - 20} size={24} color={K.cyan} weight={650}>
            hypothetical: no Jupiter flyby
          </T>
        </g>
        <g opacity={pr(t, b[1] + 200, 15)}>
          <T x={earth.x - 12} y={earth.y - 18} size={20} color={K.muted} anchor="end">
            1 AU
          </T>
          <T x={transferPoint(390).x + 14} y={transferPoint(390).y - 8} size={20} color={K.muted}>
            5 AU
          </T>
        </g>
      </g>
      <Tag x={80} y={1010} text="Voyager 2 · launched 1977" size={26} color={K.ivory} opacity={win(t, b[0] + 20, b[2])} />
      <Tag x={W - 80} y={1010} text="interstellar space · 2018" size={26} color={K.ivory} anchor="end" opacity={pr(t, b[3], 15)} />
    </Stage>
  );
};

// ---------- Scene 2: the question ----------
export const S02: React.FC<SceneProps> = ({ t, dur }) => {
  const zoom = pr(t, 0, 40);
  const c: V2 = { x: 1440, y: 560 };
  const sc = 0.55;
  const path = polyline(sunPath({ x: 0, y: 0 }).map((p) => scr(p, c, sc)));
  return (
    <Stage>
      <g opacity={zoom}>
        <Inset x={c.x} y={c.y} r={300} id="e3s2inset">
          <path d={path} fill="none" stroke={K.cyan} strokeWidth={4} />
          <Jupiter x={c.x} y={c.y} r={26} />
        </Inset>
      </g>
      <g opacity={win(t, 25, dur + 30, 20)}>
        <T x={140} y={500} size={76} color={K.ivory} weight={750}>
          How a Spacecraft
        </T>
        <T x={140} y={600} size={76} color={K.ivory} weight={750}>
          Steals Speed
        </T>
        <rect x={142} y={640} width={260 * pr(t, 40, 30)} height={6} fill={K.cyan} />
      </g>
    </Stage>
  );
};

// ---------- Scene 9: a favourable alignment ----------
export const PERIOD = { jupiter: 11.86, saturn: 29.46, uranus: 84.0, neptune: 164.8 };
export type Giant = keyof typeof PERIOD;
export const GIANTS: Giant[] = ["jupiter", "saturn", "uranus", "neptune"];
export const NAMES: Record<Giant, string> = { jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune" };
export const YEARS: Record<Giant, string> = { jupiter: "1979", saturn: "1981", uranus: "1986", neptune: "1989" };
// Angle of each planet at the encounter (on Voyager 2's drawn path).
export const encounterDeg = (g: Giant) => {
  const p = g === "jupiter" ? transferPoint(360) : planetOnPath(AU[g]);
  return (Math.atan2(SUN.y - p.y, p.x - SUN.x) * 180) / Math.PI;
};

export const S09: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  // Time-lapse: years run up to 1977; each planet moves at its true relative rate.
  const lapse = pr(t, b[0] + 10, 260, easeOut);
  const year = lerp(1962, 1977, lapse);
  const leg1 = pr(t, b[1] + 40, 140);
  const outP = pr(t, b[2] + 10, 270);
  const v1 = pr(t, b[3] + 20, 200);
  const sumIn = pr(t, b[4], 20);
  const ghostBack = pr(t, b[4] + 140, 30);
  const enc = (g: Giant) => b[2] + 10 + 270 * outS(AU[g]);
  const insetAt: Record<Giant, number> = { jupiter: b[2] + 10, saturn: enc("saturn"), uranus: enc("uranus"), neptune: enc("neptune") };
  const ang = (g: Giant) => encounterDeg(g) - (360 * (1977 - year)) / PERIOD[g];
  // Voyager 1: same first leg, Jupiter, Saturn, then turned away by Titan.
  const v1Pts = outPts(outS(AU.saturn)).concat(
    Array.from({ length: 30 }, (_, i) => {
      const s0 = planetOnPath(AU.saturn);
      const k = (i + 1) / 30;
      return { x: s0.x + 120 * k, y: s0.y - 330 * k * k - 40 * k };
    }),
  );
  const v1Shown = v1Pts.slice(0, Math.max(0, Math.round(v1 * v1Pts.length)));
  return (
    <Stage>
      <OrbitRings />
      <Sun x={SUN.x} y={SUN.y} r={16} />
      {GIANTS.map((g) => {
        const p = polar(mapR(AU[g]), ang(g));
        return g === "jupiter" ? <Jupiter key={g} x={p.x} y={p.y} r={13} /> : <PlanetTag key={g} p={p} name={NAMES[g]} opacity={1} r={g === "saturn" ? 10 : 8} year={outP > outS(AU[g]) && lapse >= 1 ? YEARS[g] : undefined} />;
      })}
      <T x={polar(mapR(AU.jupiter), ang("jupiter")).x + 20} y={polar(mapR(AU.jupiter), ang("jupiter")).y + 34} size={22} color={K.amber} weight={650}>
        Jupiter{outP > 0 ? " · 1979" : ""}
      </T>
      {/* Year counter and the label */}
      <g opacity={win(t, b[0], b[1] + 60)}>
        <T x={1640} y={170} size={64} color={K.ivory} anchor="middle" weight={750}>
          {Math.floor(year)}
        </T>
        <T x={1640} y={220} size={24} color={K.muted} anchor="middle">
          planets at their true relative speeds
        </T>
      </g>
      <Tag x={1640} y={300} text="favourable alignment" size={28} color={K.amber} anchor="middle" opacity={pr(t, b[0] + 270, 20)} />
      {/* Hypothetical branch returns at the end */}
      <path d={polyline(ghostPts())} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.8 * ghostBack} />
      <g opacity={ghostBack}>
        <T x={transferPoint(420).x + 20} y={transferPoint(420).y - 20} size={22} color={K.cyan} weight={650}>
          hypothetical: no Jupiter flyby
        </T>
      </g>
      {/* Voyager 2 */}
      <path d={polyline(transferPts(leg1))} fill="none" stroke={K.cyan} strokeWidth={4} />
      {outP > 0 ? <path d={polyline(outPts(outP))} fill="none" stroke={K.cyan} strokeWidth={4} /> : null}
      <g opacity={pr(t, b[1] + 40, 15)}>
        <T x={transferPoint(270).x} y={transferPoint(270).y + 40} size={24} color={K.cyan} anchor="middle" weight={700}>
          Voyager 2
        </T>
      </g>
      {/* Voyager 1, thinner */}
      {v1Shown.length > 1 ? <path d={polyline(v1Shown)} fill="none" stroke={K.cyan} strokeWidth={2.5} strokeOpacity={0.8} strokeDasharray="2 0" /> : null}
      <g opacity={pr(t, b[3] + 200, 15)}>
        <T x={planetOnPath(AU.saturn).x + 90} y={planetOnPath(AU.saturn).y - 420} size={22} color={K.cyan} weight={650} anchor="end">
          Voyager 1 · Titan, then away from the planets
        </T>
      </g>
      {/* Encounter insets: direction change only */}
      {GIANTS.map((g, i) => {
        const at = insetAt[g];
        const o = win(t, at, at + 90, 10) * (t < b[3] ? 1 : 0);
        if (o <= 0) {
          return null;
        }
        const c: V2 = { x: 1560, y: 560 };
        const sc = 0.5;
        const rel = polyline(relPath(FLYBY).map((p) => scr(p, c, sc)));
        return (
          <g key={g} opacity={o}>
            <Inset x={c.x} y={c.y} r={190} id={`e3s9i${i}`}>
              <path d={rel} fill="none" stroke={K.cyan} strokeWidth={4} />
              <Planet x={c.x} y={c.y} r={20} />
            </Inset>
            <T x={c.x} y={c.y + 230} size={24} color={K.ivory} anchor="middle" weight={650}>
              {NAMES[g]}: path bends
            </T>
          </g>
        );
      })}
      {/* One cumulative comparison, no numbers */}
      <g opacity={sumIn}>
        <SpeedBar x={1200} y={830} label="Voyager 2 · speed rel. Sun · after launch" kind="sun" max={600} value={210} />
        <SpeedBar x={1200} y={940} label="after the flybys" kind="sun" max={600} value={210 * 2.3 * pr(t, b[4] + 20, 40)} />
        <T x={1500} y={1040} size={30} color={K.white} anchor="middle" weight={750} opacity={pr(t, b[4] + 60, 15)}>
          more than doubled
        </T>
      </g>
    </Stage>
  );
};

// ---------- Scene 10: why the Sun is hard to reach ----------
const S10C: V2 = { x: 820, y: 520 };
const RE = 360;
// Orbit that starts at Earth's distance with tangential speed fraction f of circular speed:
// aphelion RE, perihelion RE·f²/(2 − f²).
export const dropOrbit = (f: number) => {
  const q = (RE * f * f) / (2 - f * f);
  const a = (RE + q) / 2;
  const e = (RE - q) / (RE + q);
  return { a, e };
};

export const S10: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const earth: V2 = { x: S10C.x, y: S10C.y + RE };
  const aim = pr(t, b[2], 25);
  const miss = pr(t, b[2] + 30, 90);
  const shrink = pr(t, b[2] + 130, 70);
  const f = lerp(0.82, 0.22, shrink);
  const o = dropOrbit(f);
  // Earth at aphelion (bottom): perihelion points up (90°).
  const orbit = ellipsePath(o.a, o.e, 90, S10C.x, S10C.y, 1, 180, 0.5, 0.5 + miss);
  const AK = 230;
  return (
    <Stage>
      <circle cx={S10C.x} cy={S10C.y} r={RE} fill="none" stroke={K.line} strokeWidth={2} />
      <Sun x={S10C.x} y={S10C.y} r={34} />
      <Planet x={earth.x} y={earth.y} r={14} color="#7FB8D8" />
      <T x={earth.x} y={earth.y + 54} size={24} color={K.muted} anchor="middle">
        Earth
      </T>
      <g opacity={pr(t, b[1], 20)}>
        <VectorArrow x={earth.x} y={earth.y} dx={AK * (aim > 0 ? lerp(1, f, shrink) : 1)} dy={0} color={K.amber} width={9} head="filled" />
        <T x={earth.x + 260} y={earth.y - 26} size={26} color={K.amber} weight={700}>
          ~30 km/s sideways (rel. Sun)
        </T>
      </g>
      <g opacity={aim}>
        <line x1={earth.x} y1={earth.y} x2={S10C.x} y2={S10C.y + 40} stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.7} />
        <T x={earth.x - 20} y={S10C.y + 200} size={24} color={K.cyan} anchor="end" weight={650}>
          aimed here
        </T>
        <path d={orbit} fill="none" stroke={K.cyan} strokeWidth={4} />
        <T x={S10C.x + o.a * 0.9} y={S10C.y - 40} size={24} color={K.cyan} weight={650} opacity={pr(t, b[2] + 80, 15)}>
          actually goes here
        </T>
      </g>
      <Tag x={W / 2} y={1030} text="lose sideways speed to fall closer" size={28} color={K.ivory} anchor="middle" opacity={pr(t, b[2] + 140, 20)} />
      <ViewBadge sun={1} opacity={pr(t, 0, 15)} />
    </Stage>
  );
};

// ---------- Scene 11: seven Venus flybys ----------
const PC: V2 = { x: 760, y: 520 };
const PAU = 420;
export const parkerOrbit = (k: number) => {
  // From a wide first orbit to the tight final one (schematic shapes, no values shown).
  const Q = lerp(1.0, 0.73, k) * PAU;
  const q = lerp(0.17, 0.05, Math.pow(k, 0.8)) * PAU;
  return { a: (Q + q) / 2, e: (Q - q) / (Q + q) };
};

export const S11: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const morph = pr(t, b[1] + 20, b[2] + 260 - (b[1] + 20));
  const first = parkerOrbit(0);
  const now = parkerOrbit(morph);
  const ticks = Array.from({ length: 7 }, (_, i) => i);
  return (
    <Stage>
      <circle cx={PC.x} cy={PC.y} r={0.72 * PAU} fill="none" stroke={K.amber} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 8" />
      <T x={PC.x + 0.72 * PAU * 0.72} y={PC.y + 0.72 * PAU * 0.72 + 30} size={22} color={K.amber} weight={600} opacity={0.8}>
        Venus's orbit
      </T>
      <Sun x={PC.x} y={PC.y} r={11} />
      <path d={ellipsePath(first.a, first.e, 180, PC.x, PC.y)} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.75} />
      <g opacity={pr(t, b[0] + 30, 15)}>
        <T x={PC.x + first.a * 1.1} y={PC.y - 190} size={24} color={K.cyan} weight={650}>
          first orbit
        </T>
      </g>
      <g opacity={pr(t, b[1] + 20, 15)}>
        <path d={ellipsePath(now.a, now.e, 180, PC.x, PC.y)} fill="none" stroke={K.cyan} strokeWidth={5} />
        <T x={PC.x - 30} y={PC.y - now.a * Math.sqrt(1 - now.e * now.e) - 24} size={24} color={K.cyan} anchor="middle" weight={700} opacity={pr(t, b[2] + 240, 20)}>
          final orbit
        </T>
      </g>
      {/* Cumulative energy, one bar */}
      <g opacity={pr(t, b[1] + 20, 20)}>
        <T x={1440} y={250} size={26} color={K.white} weight={700}>
          orbital energy rel. Sun
        </T>
        <T x={1440} y={284} size={22} color={K.muted} weight={600}>
          (total, all flybys)
        </T>
        <rect x={1500} y={320} width={110} height={460} rx={8} fill={K.bg2} stroke={K.line} strokeWidth={2} />
        <rect x={1510} y={330 + 300 * morph} width={90} height={440 - 300 * morph} rx={6} fill={K.white} opacity={0.9} />
        <T x={1640} y={360 + 300 * morph} size={34} color={K.white} weight={750} opacity={morph > 0.05 ? 1 : 0}>
          ▼
        </T>
      </g>
      {/* Timeline of the seven Venus flybys (positions on the timeline only) */}
      <g opacity={pr(t, b[1] + 20, 20)}>
        <line x1={300} y1={960} x2={1300} y2={960} stroke={K.line} strokeWidth={3} />
        {ticks.map((i) => {
          const x = 330 + i * 150;
          const lit = pr(t, b[1] + 25 + i * 14, 10);
          return <circle key={i} cx={x} cy={960} r={10} fill={lit > 0.5 ? K.amber : K.bg} stroke={K.amber} strokeWidth={3} />;
        })}
        <T x={300} y={1020} size={24} color={K.amber} weight={650}>
          7 Venus flybys · last on 6 Nov 2024
        </T>
      </g>
      <Tag x={W / 2} y={110} text="Parker Solar Probe · needed to shed ~53,000 mph sideways" size={28} color={K.ivory} anchor="middle" opacity={pr(t, b[0] + 120, 20)} />
      <ViewBadge sun={1} opacity={pr(t, 0, 15)} />
    </Stage>
  );
};

// ---------- Scene 12: fastest by slowing down ----------
export const S12: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  // Zoom on the Sun: radius 60 px; closest approach ≈ 9.8 solar radii from the centre.
  const R = 26;
  const q = 9.8 * R;
  const Q = 157 * R;
  const a = (Q + q) / 2;
  const e = (Q - q) / (Q + q);
  const C: V2 = { x: 1460, y: 540 };
  const run = pr(t, b[0] + 60, 300, (x) => x);
  // Mean anomaly sweeps through perihelion, so the dot's speed follows Kepler's law.
  const M = lerp(-0.09, 0.09, run);
  const pos = ellipseAt(a, e, M, 180);
  const craft = { x: C.x + pos.p.x, y: C.y - pos.p.y };
  const trail = Array.from({ length: 60 }, (_, i) => {
    const m = lerp(-0.09, M, i / 59);
    const p = ellipseAt(a, e, m, 180).p;
    return { x: C.x + p.x, y: C.y - p.y };
  });
  const arc = ellipsePath(a, e, 180, C.x, C.y, 1, 600, -0.06, 0.06);
  return (
    <Stage>
      <Sun x={C.x} y={C.y} r={R} />
      <path d={arc} fill="none" stroke={K.cyan} strokeWidth={2.5} strokeDasharray="8 8" opacity={0.45} />
      {run > 0 ? <path d={polyline(trail)} fill="none" stroke={K.cyan} strokeWidth={5} /> : null}
      <Craft x={craft.x} y={craft.y} r={10} opacity={pr(t, b[0], 15)} />
      <g opacity={pr(t, b[0] + 160, 20)}>
        <T x={140} y={300} size={34} color={K.ivory} weight={750}>
          24 Dec 2024
        </T>
        <T x={140} y={360} size={28} color={K.muted} weight={600}>
          ≈ 6.1 million km from the Sun's surface
        </T>
        <T x={140} y={420} size={28} color={K.white} weight={650}>
          ≈ 690,000 km/h rel. Sun
        </T>
        <T x={140} y={480} size={28} color={K.white} weight={650}>
          fastest human-made object
        </T>
      </g>
      <Tag x={140} y={640} text="It got there by slowing down first." size={30} color={K.ivory} opacity={pr(t, b[1], 15)} />
      <ViewBadge sun={1} opacity={pr(t, 0, 15)} />
    </Stage>
  );
};

// ---------- Scene 13: the whole picture ----------
const Tile: React.FC<{ x: number; title: string; sub: string; opacity: number; children: React.ReactNode }> = ({ x, title, sub, opacity, children }) => (
  <g opacity={opacity}>
    <rect x={x} y={240} width={520} height={520} rx={22} fill={K.bg2} stroke={K.line} strokeWidth={2.5} />
    {children}
    <T x={x + 260} y={830} size={34} color={K.ivory} anchor="middle" weight={750}>
      {title}
    </T>
    <T x={x + 260} y={876} size={24} color={K.muted} anchor="middle" weight={600}>
      {sub}
    </T>
  </g>
);

export const S13: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const x0 = 110;
  const gap = 590;
  const c1: V2 = { x: x0 + 260, y: 500 };
  const c3l: V2 = { x: x0 + 2 * gap + 140, y: 500 };
  const c3r: V2 = { x: x0 + 2 * gap + 380, y: 500 };
  const s = 0.42;
  return (
    <Stage>
      <Tile x={x0} title="1 · change your view" sub="planet: only turned · Sun: speed changes" opacity={pr(t, b[0] + 120, 20)}>
        <path d={polyline(relPath().map((p) => scr(p, c1, s)))} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="8 8" opacity={0.7} />
        <path d={polyline(sunPath({ x: 0, y: 0 }).map((p) => scr(p, c1, s)))} fill="none" stroke={K.cyan} strokeWidth={4} />
        <Jupiter x={c1.x} y={c1.y} r={18} />
      </Tile>
      <Tile x={x0 + gap} title="2 · nothing is created" sub="orbital energy is transferred" opacity={pr(t, b[1], 20)}>
        <rect x={x0 + gap + 110} y={700 - 260} width={110} height={260} rx={6} fill={K.cyan} />
        <rect x={x0 + gap + 300} y={700 - 380} width={110} height={380} rx={6} fill={K.amber} opacity={0.85} />
        <VectorArrow x={x0 + gap + 290} y={380} dx={-60} dy={0} color={K.ivory} width={5} />
      </Tile>
      <Tile x={x0 + 2 * gap} title="3 · aim decides" sub="rel. Sun: behind = faster · in front = slower" opacity={pr(t, b[2], 20)}>
        <path d={polyline(sunPath({ x: 0, y: 0 }, FLYBY).map((p) => scr(p, c3l, 0.3)))} fill="none" stroke={K.cyan} strokeWidth={3} />
        <Jupiter x={c3l.x} y={c3l.y} r={14} />
        <path d={polyline(sunPath({ x: 0, y: 0 }, FLYBY_FRONT).map((p) => scr(p, c3r, 0.3)))} fill="none" stroke={K.cyan} strokeWidth={3} />
        <Jupiter x={c3r.x} y={c3r.y} r={14} />
        <T x={c3l.x} y={690} size={30} color={K.white} anchor="middle" weight={750}>
          ▲
        </T>
        <T x={c3r.x} y={690} size={30} color={K.white} anchor="middle" weight={750}>
          ▼
        </T>
      </Tile>
    </Stage>
  );
};

// ---------- Scene 14: where it leaves us ----------
export const S14: React.FC<SceneProps> = ({ t, beats, dur }) => {
  const b = beats;
  const pull = pr(t, 0, dur);
  const earth: V2 = { x: 300, y: 600 };
  const v1: V2 = { x: lerp(1500, 1620, pull), y: lerp(360, 330, pull) };
  const ring = pr(t, b[0] + 120, 260, (x) => x);
  const fade = 1 - pr(t, dur - 50, 50);
  return (
    <Stage starShift={pull * 60}>
      <g opacity={fade}>
        <Sun x={earth.x - 40} y={earth.y + 10} r={10} />
        <Planet x={earth.x} y={earth.y} r={7} color="#7FB8D8" />
        <T x={earth.x} y={earth.y + 44} size={22} color={K.muted} anchor="middle">
          Earth
        </T>
        <path d={`M${earth.x} ${earth.y} Q ${(earth.x + v1.x) / 2} ${earth.y - 120} ${v1.x} ${v1.y}`} fill="none" stroke={K.cyan} strokeWidth={3} opacity={0.7} />
        <Craft x={v1.x} y={v1.y} r={9} />
        <circle cx={earth.x} cy={earth.y} r={Math.max(1, ring * Math.hypot(v1.x - earth.x, v1.y - earth.y))} fill="none" stroke={K.white} strokeWidth={2.5} opacity={0.6 * (1 - 0.6 * ring)} />
        <g opacity={pr(t, b[0] + 60, 20)}>
          <T x={v1.x} y={v1.y - 40} size={28} color={K.ivory} anchor="middle" weight={700}>
            Voyager 1
          </T>
        </g>
        <Tag x={W / 2} y={960} text="Voyager 1 · one light-day from Earth · 18 Nov 2026" size={30} color={K.ivory} anchor="middle" opacity={pr(t, b[0] + 150, 20)} />
      </g>
    </Stage>
  );
};

