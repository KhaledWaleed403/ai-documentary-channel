// Episode 003 Shorts (9:16, 1080×1920). Diagrams sit between y ≈ 400 and y ≈ 1330,
// below the title (y 170–370) and clear of the burned-in captions (block bottom at y 1520).
// Same physics helpers as the long-form: flybyModel.ts, orbits.ts and the solar-system map.
import React from "react";
import { easeOut, lerp } from "../../animations/timing";
import { VectorArrow } from "../../components/VectorArrow";
import type { Ep3ShortName } from "../../data/episode003Shorts";
import { FLYBY, HALF, PLANET_VEL, relPath, scr, speedRelPlanet, speedRelSun, sunPath, vInRel, vOutRel } from "./flybyModel";
import { Craft, Jupiter, K, Planet, SpeedBar, Stage, Sun, T, Tag, ViewBadge, pr, win } from "./kit";
import { AU, GIANTS, NAMES, PERIOD, YEARS, encounterDeg, mapR, outPts, outS, polar, transferPoint, transferPts, type Giant } from "./missionScenes";
import { ellipseAt, ellipsePath, polyline, type V2 } from "./orbits";

export const SW = 1080;
export const SH = 1920;

export type ShortSceneProps = { t: number; dur: number; beats: number[] };

const VStage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stage w={SW} h={SH}>
    {children}
  </Stage>
);

const BADGE = { x: 56, y: 420 };
const BAR_K = 46;

// ---------- Short 1: How can a planet speed up a spacecraft? ----------
// Sun-frame flyby drawn at `s` with Jupiter at `ca` at closest approach; `tau` = flyby time.
const SunFlyby: React.FC<{ tau: number; ca: V2; s: number; carried?: number }> = ({ tau, ca, s, carried = 0 }) => {
  const steps = 160;
  const trail = sunPath({ x: 0, y: 0 }, FLYBY, HALF, steps)
    .filter((_, i) => -HALF + (2 * HALF * i) / steps <= tau)
    .map((p) => scr(p, ca, s));
  const jup = { x: ca.x + PLANET_VEL.x * tau * s, y: ca.y };
  const craft = scr(FLYBY.rel(tau).p, jup, s);
  return (
    <g>
      <line x1={0} y1={ca.y} x2={SW} y2={ca.y} stroke={K.amber} strokeOpacity={0.28} strokeWidth={2} strokeDasharray="10 10" />
      <path d={polyline(relPath().map((p) => scr(p, jup, s)))} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="9 9" opacity={0.85 * carried} />
      {trail.length > 1 ? <path d={polyline(trail)} fill="none" stroke={K.cyan} strokeWidth={6} strokeLinecap="round" /> : null}
      <Jupiter x={jup.x} y={jup.y} r={44 * s} />
      <VectorArrow x={jup.x + 44 * s + 10} y={jup.y} dx={95} dy={0} color={K.amber} width={7} head="filled" />
      <Craft x={craft.x} y={craft.y} r={11} />
    </g>
  );
};

const GravityAssistSpeed: React.FC<ShortSceneProps> = ({ t, beats: b }) => {
  const s = 0.8;
  const ca: V2 = { x: 360, y: 760 };
  // A: hook — the Sun-frame flyby, fast, from frame 0.
  const tauA = lerp(-0.65 * HALF, HALF, pr(t, 0, b[1] - 15, (x) => x));
  const inA = t < b[1];
  // B: the planet's view.
  const tauB = lerp(-HALF, HALF, pr(t, b[1] + 15, b[2] + 50 - (b[1] + 15), (x) => x));
  const inB = t >= b[1] && t < b[3];
  // C: the Sun's view again, with the planet-relative curve carried along.
  const tauC = lerp(-HALF, HALF, pr(t, b[3] + 20, 200, (x) => x));
  const inC = t >= b[3];
  const fadeB = pr(t, b[1], 12);
  const fadeC = pr(t, b[3], 12);
  const center: V2 = { x: 480, y: 760 };
  const relTrail = Array.from({ length: 161 }, (_, i) => -HALF + (2 * HALF * i) / 160)
    .filter((x) => x <= tauB)
    .map((x) => scr(FLYBY.rel(x).p, center, s));
  const craftB = scr(FLYBY.rel(tauB).p, center, s);
  const arrows = pr(t, b[2] + 20, 20);
  const vin = vInRel();
  const vout = vOutRel();
  const AK = 46;
  const pIn = scr(FLYBY.rel(-HALF).p, center, s);
  const pOut = scr(FLYBY.rel(HALF).p, center, s);
  const sunTau = inA ? tauA : tauC;
  return (
    <VStage>
      {inA ? <SunFlyby tau={tauA} ca={ca} s={s} /> : null}
      {inB ? (
        <g opacity={fadeB}>
          <Jupiter x={center.x} y={center.y} r={44 * s} />
          {relTrail.length > 1 ? <path d={polyline(relTrail)} fill="none" stroke={K.cyan} strokeWidth={6} strokeLinecap="round" /> : null}
          <Craft x={craftB.x} y={craftB.y} r={11} />
          <g opacity={arrows}>
            <VectorArrow x={pIn.x} y={pIn.y} dx={vin.x * AK} dy={-vin.y * AK} color={K.cyan} width={7} head="open" dashed />
            <VectorArrow x={pOut.x} y={pOut.y} dx={vout.x * AK} dy={-vout.y * AK} color={K.cyan} width={7} head="open" />
            <T x={540} y={1070} size={38} color={K.ivory} anchor="middle" weight={750}>
              same speed, new direction
            </T>
          </g>
          <SpeedBar x={260} y={1250} label="speed rel. Jupiter" kind="planet" max={560} value={speedRelPlanet(tauB) * BAR_K} ghost={speedRelPlanet(-HALF) * BAR_K} ghostLabel="arriving" />
        </g>
      ) : null}
      {inC ? (
        <g opacity={fadeC}>
          <SunFlyby tau={tauC} ca={ca} s={s} carried={win(t, b[3] + 20, b[4] + 40, 15)} />
          <SpeedBar x={260} y={1150} label="speed rel. Jupiter" kind="planet" max={560} value={speedRelPlanet(tauC) * BAR_K} ghost={speedRelPlanet(-HALF) * BAR_K} />
        </g>
      ) : null}
      {inA || inC ? (
        <SpeedBar x={260} y={1270} label="speed rel. Sun" kind="sun" max={560} value={speedRelSun(sunTau) * BAR_K} ghost={speedRelSun(-HALF) * BAR_K} ghostLabel="arriving" />
      ) : null}
      <g opacity={pr(t, b[4], 15)}>
        <T x={540} y={1030} size={34} color={K.amber} anchor="middle" weight={700}>
          borrowed from Jupiter's orbit
        </T>
        <T x={540} y={1074} size={28} color={K.muted} anchor="middle" weight={600}>
          Jupiter's change: almost imperceptible
        </T>
      </g>
      <ViewBadge sun={inB ? 1 - pr(t, b[1], 15) : 1} x={BADGE.x} y={BADGE.y} />
    </VStage>
  );
};

// ---------- Short 2: How do you reach the Sun when Earth is moving so fast? ----------
const SC: V2 = { x: 540, y: 800 };
const RE2 = 330;
const drop = (f: number) => {
  const q = (RE2 * f * f) / (2 - f * f);
  return { a: (RE2 + q) / 2, e: (RE2 - q) / (RE2 + q) };
};
const parker = (k: number) => {
  const Q = lerp(1.0, 0.73, k) * RE2;
  const q = lerp(0.17, 0.05, Math.pow(k, 0.8)) * RE2;
  return { a: (Q + q) / 2, e: (Q - q) / (Q + q) };
};

const ReachingTheSun: React.FC<ShortSceneProps> = ({ t, beats: b }) => {
  const earth: V2 = { x: SC.x, y: SC.y + RE2 };
  // Hook: a probe "falls" toward the Sun and swings past it.
  const hook = pr(t, 0, b[1] + 20, (x) => x);
  const hookOrbit = drop(0.55);
  const hp = ellipseAt(hookOrbit.a, hookOrbit.e, lerp(Math.PI, 3 * Math.PI, hook), 90);
  const hookTrail = Array.from({ length: 80 }, (_, i) => {
    const p = ellipseAt(hookOrbit.a, hookOrbit.e, lerp(Math.PI, lerp(Math.PI, 3 * Math.PI, hook), i / 79), 90).p;
    return { x: SC.x + p.x, y: SC.y - p.y };
  });
  const phase2 = t >= b[4];
  const sideways = win(t, b[1], b[4] + 10);
  const shrink = pr(t, b[3] + 40, 90);
  const aim = win(t, b[2], b[4] + 10);
  const miss = pr(t, b[2] + 20, 80);
  const missOrbit = drop(0.82);
  const morph = pr(t, b[4] + 60, 170);
  const first = parker(0);
  const now = parker(morph);
  const fin = parker(1);
  const dive = pr(t, b[5] + 30, 150, (x) => x);
  const dp = ellipseAt(fin.a, fin.e, lerp(-0.5, 0.5, dive), 90);
  const sunR = phase2 ? 14 : 40;
  return (
    <VStage>
      <circle cx={SC.x} cy={SC.y} r={RE2} fill="none" stroke={K.line} strokeWidth={2} opacity={phase2 ? 0.4 : 1} />
      <Sun x={SC.x} y={SC.y} r={sunR} />
      {/* Hook */}
      <g opacity={1 - pr(t, b[1], 15)}>
        <path d={polyline(hookTrail)} fill="none" stroke={K.cyan} strokeWidth={5} />
        <Craft x={SC.x + hp.p.x} y={SC.y - hp.p.y} r={11} />
      </g>
      {/* Earth and its sideways motion */}
      <g opacity={phase2 ? 1 - pr(t, b[4], 15) : pr(t, b[1], 15)}>
        <Planet x={earth.x} y={earth.y} r={14} color="#7FB8D8" />
        <T x={earth.x} y={earth.y + 54} size={28} color={K.muted} anchor="middle">
          Earth
        </T>
      </g>
      <g opacity={sideways}>
        <VectorArrow x={earth.x} y={earth.y} dx={240 * lerp(1, 0.25, shrink)} dy={0} color={K.amber} width={10} head="filled" />
        <T x={540} y={1250} size={34} color={K.amber} anchor="middle" weight={700}>
          ~30 km/s sideways (rel. Sun)
        </T>
      </g>
      {/* Aimed vs actual */}
      <g opacity={aim}>
        <line x1={earth.x} y1={earth.y} x2={SC.x} y2={SC.y + 50} stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.7} />
        <path d={ellipsePath(missOrbit.a, missOrbit.e, 90, SC.x, SC.y, 1, 180, 0.5, 0.5 + miss)} fill="none" stroke={K.cyan} strokeWidth={5} />
        <T x={SC.x - 40} y={SC.y + 210} size={30} color={K.cyan} anchor="end" weight={650}>
          aimed here
        </T>
        <T x={SC.x + 170} y={SC.y - 200} size={30} color={K.cyan} weight={650} opacity={pr(t, b[2] + 70, 12)}>
          goes here
        </T>
      </g>
      <Tag x={540} y={500} text="Parker: shed ~53,000 mph sideways" size={32} color={K.ivory} anchor="middle" opacity={win(t, b[3], b[4] + 20)} />
      {/* Seven Venus flybys: first orbit → final orbit, one cumulative energy bar */}
      <g opacity={pr(t, b[4], 20)}>
        <circle cx={SC.x} cy={SC.y} r={0.72 * RE2} fill="none" stroke={K.amber} strokeOpacity={0.4} strokeWidth={2} strokeDasharray="4 8" />
        <T x={SC.x + 0.72 * RE2 * 0.7 + 10} y={SC.y + 0.72 * RE2 * 0.7 + 34} size={26} color={K.amber} weight={600}>
          Venus's orbit
        </T>
        <path d={ellipsePath(first.a, first.e, 90, SC.x, SC.y)} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="10 9" opacity={0.7} />
        <path d={ellipsePath(now.a, now.e, 90, SC.x, SC.y)} fill="none" stroke={K.cyan} strokeWidth={6} />
        <g>
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={300 + i * 80} cy={1240} r={13} fill={pr(t, b[4] + 60 + i * 22, 8) > 0.5 ? K.amber : K.bg} stroke={K.amber} strokeWidth={3} />
          ))}
          <T x={540} y={1300} size={30} color={K.amber} anchor="middle" weight={650}>
            7 Venus flybys
          </T>
        </g>
        <g>
          <rect x={940} y={560} width={60} height={420} rx={8} fill={K.bg2} stroke={K.line} strokeWidth={2} />
          <rect x={948} y={568 + 280 * morph} width={44} height={404 - 280 * morph} rx={6} fill={K.white} />
          <T x={970} y={540} size={24} color={K.white} anchor="middle" weight={700}>
            orbital energy
          </T>
          <T x={970} y={1010} size={22} color={K.muted} anchor="middle" weight={600}>
            rel. Sun
          </T>
        </g>
      </g>
      {/* The dive */}
      <g opacity={pr(t, b[5], 15)}>
        <Craft x={SC.x + dp.p.x} y={SC.y - dp.p.y} r={11} />
        <Tag x={540} y={500} text="24 Dec 2024 · closest any spacecraft has come to the Sun" size={30} color={K.ivory} anchor="middle" opacity={pr(t, b[5] + 60, 15)} />
      </g>
    </VStage>
  );
};

// ---------- Short 3: Why did Voyager need a rare planetary alignment? ----------
const MK = 0.62;
const MC: V2 = { x: 470, y: 860 };
const m = (p: V2): V2 => ({ x: MC.x + (p.x - 640) * MK, y: MC.y + (p.y - 600) * MK });

const VoyagerAlignment: React.FC<ShortSceneProps> = ({ t, beats: b }) => {
  const lapse = pr(t, 0, b[2] - 10, easeOut);
  const year = lerp(1950, 1977, lapse);
  const leg1 = pr(t, b[2] + 50, 110);
  const outP = pr(t, b[3] + 10, 260);
  const sum = pr(t, b[4], 20);
  const ang = (g: Giant) => encounterDeg(g) - (360 * (1977 - year)) / PERIOD[g];
  const sun = m({ x: 640, y: 600 });
  const encAt = (g: Giant) => (g === "jupiter" ? 0 : outS(AU[g]));
  return (
    <VStage>
      {(Object.keys(AU) as (keyof typeof AU)[]).map((k) => (
        <circle key={k} cx={sun.x} cy={sun.y} r={mapR(AU[k]) * MK} fill="none" stroke={K.line} strokeWidth={1.8} />
      ))}
      <Sun x={sun.x} y={sun.y} r={13} />
      {GIANTS.map((g) => {
        const p = m(polar(mapR(AU[g]), ang(g)));
        const passed = outP > encAt(g) + 0.001 || (g === "jupiter" && outP > 0);
        return (
          <g key={g}>
            {g === "jupiter" ? <Jupiter x={p.x} y={p.y} r={14} /> : <Planet x={p.x} y={p.y} r={g === "saturn" ? 11 : 9} />}
            <T x={p.x > 760 ? p.x - 20 : p.x + 18} y={p.x > 760 ? p.y - 22 : p.y + 34} size={28} color={K.amber} weight={700} anchor={p.x > 760 ? "end" : "start"}>
              {NAMES[g]}
              {passed ? ` · ${YEARS[g]}` : ""}
            </T>
            {passed ? <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={K.cyan} strokeWidth={3} opacity={0.8} /> : null}
          </g>
        );
      })}
      <g opacity={win(t, 0, b[3] + 20)}>
        <T x={540} y={1230} size={72} color={K.ivory} anchor="middle" weight={750}>
          {Math.floor(year)}
        </T>
        <T x={540} y={1280} size={26} color={K.muted} anchor="middle">
          planets at their true relative speeds
        </T>
      </g>
      <Tag x={540} y={470} text="favourable alignment · ~once every 175 years" size={30} color={K.amber} anchor="middle" opacity={pr(t, b[1] + 60, 15)} />
      <Tag x={540} y={540} text="not a straight line" size={28} color={K.muted} anchor="middle" opacity={win(t, b[2], b[3] + 30)} />
      {/* Voyager 2 */}
      <path d={polyline(transferPts(leg1).map(m))} fill="none" stroke={K.cyan} strokeWidth={5} />
      {outP > 0 ? <path d={polyline(outPts(outP).map(m))} fill="none" stroke={K.cyan} strokeWidth={5} /> : null}
      {leg1 > 0 && leg1 < 1 ? <Craft x={m(transferPoint(180 + 180 * leg1)).x} y={m(transferPoint(180 + 180 * leg1)).y} r={10} /> : null}
      <g opacity={pr(t, b[2] + 50, 15)}>
        <T x={m(transferPoint(270)).x} y={m(transferPoint(270)).y + 46} size={30} color={K.cyan} anchor="middle" weight={700}>
          Voyager 2 · 1977
        </T>
      </g>
      {/* One cumulative comparison */}
      <g opacity={sum}>
        <rect x={150} y={1150} width={780} height={180} rx={16} fill={K.bg} fillOpacity={0.9} />
        <SpeedBar x={250} y={1200} label="speed rel. Sun · after launch" kind="sun" max={580} value={190} />
        <SpeedBar x={250} y={1290} label="after the flybys: more than doubled" kind="sun" max={580} value={190 * 2.3 * pr(t, b[4] + 20, 40)} />
      </g>
    </VStage>
  );
};

export const SHORT_SCENES: Record<Ep3ShortName, React.FC<ShortSceneProps>> = {
  GravityAssistSpeed,
  ReachingTheSun,
  VoyagerAlignment,
};
