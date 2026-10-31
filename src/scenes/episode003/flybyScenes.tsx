// Episode 003 Scenes 3, 4, 7 and 8: the flyby seen from Jupiter, speed vs velocity,
// who pays, and passing behind vs in front. Same demonstration flyby as Scenes 5–6.
import React from "react";
import { easeOut, lerp } from "../../animations/timing";
import { VectorArrow } from "../../components/VectorArrow";
import { BAR_K, type SceneProps } from "./frameScenes";
import { FLYBY, FLYBY_FRONT, HALF, PLANET_VEL, relPath, scr, speedRelPlanet, speedRelSun, sunPath, vInRel, vOutRel } from "./flybyModel";
import type { Flyby } from "./orbits";
import { Craft, F, Jupiter, K, SpeedBar, Stage, T, Tag, ViewBadge, W, pr, win } from "./kit";
import { fromAngle, polyline, type V2 } from "./orbits";

const CENTER: V2 = { x: 900, y: 560 };
const PR = 46;

// ---------- Scene 3: the flyby, seen from the planet ----------
export const S03: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  // Replay slowed so the fall in, swing round and climb out match the lines.
  const tc = b[2] + 30;
  const span = 190;
  const tau = Math.max(-HALF, Math.min(HALF, ((t - tc) / span) * HALF));
  const started = t >= tc - span;
  const steps = 200;
  const pts = Array.from({ length: steps + 1 }, (_, i) => -HALF + (2 * HALF * i) / steps)
    .filter((x) => x <= tau)
    .map((x) => scr(FLYBY.rel(x).p, CENTER));
  const craft = scr(FLYBY.rel(tau).p, CENTER);
  const vNow = speedRelPlanet(tau);
  const vIn = speedRelPlanet(-HALF);
  const exitShown = pr(t, b[3] + 20, 20);
  return (
    <Stage>
      <Jupiter x={CENTER.x} y={CENTER.y} r={PR} />
      {pts.length > 1 ? <path d={polyline(pts)} fill="none" stroke={K.cyan} strokeWidth={5} strokeLinecap="round" /> : null}
      {started ? <Craft x={craft.x} y={craft.y} /> : null}
      <g opacity={pr(t, b[1], 15)}>
        <SpeedBar x={1240} y={820} label="speed rel. Jupiter" kind="planet" max={560} value={vNow * BAR_K} ghost={vIn * BAR_K} ghostLabel="arriving" note="same" noteOpacity={exitShown} />
      </g>
      <Tag x={1240} y={985} text="no engines firing" size={24} color={K.muted} opacity={pr(t, b[3] + 40, 15)} />
      <Tag x={CENTER.x} y={CENTER.y + 100} text="Jupiter, held still" size={24} color={K.amber} anchor="middle" opacity={win(t, b[0] + 30, b[1] + 60)} />
      <ViewBadge sun={0} />
    </Stage>
  );
};

// ---------- Scene 4: same speed, new direction ----------
export const S04: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  // Quick replay with the velocity arrow riding along, then freeze at the exit.
  const run = pr(t, b[0] + 10, 100);
  const tau = lerp(-HALF, HALF, run);
  const path = polyline(relPath().map((p) => scr(p, CENTER)));
  const craft = scr(FLYBY.rel(tau).p, CENTER);
  const v = FLYBY.rel(tau).v;
  const AK = 34;
  // Entry and exit arrows meet at one origin.
  const meet = pr(t, b[0] + 125, 30);
  const O: V2 = { x: 1430, y: 470 };
  const vin = vInRel();
  const vout = vOutRel();
  const k = 70;
  const sweep = pr(t, b[2], 50);
  const arc = Array.from({ length: 41 }, (_, i) => {
    const a = lerp(FLYBY.inDeg, lerp(FLYBY.inDeg, FLYBY.outDeg, sweep), i / 40);
    const p = fromAngle(a, 70);
    return { x: O.x + p.x, y: O.y - p.y };
  });
  const barsIn = pr(t, b[1], 20);
  return (
    <Stage>
      <Jupiter x={CENTER.x} y={CENTER.y} r={PR} />
      <path d={path} fill="none" stroke={K.cyan} strokeWidth={4} strokeOpacity={0.55} />
      <g opacity={1 - meet}>
        <Craft x={craft.x} y={craft.y} />
        <VectorArrow x={craft.x} y={craft.y} dx={v.x * AK} dy={-v.y * AK} color={K.cyan} width={6} head="open" draw={pr(t, b[0] + 5, 10)} />
      </g>
      <g opacity={meet}>
        <VectorArrow x={O.x} y={O.y} dx={vin.x * k} dy={-vin.y * k} color={K.cyan} width={7} head="open" dashed opacity={0.75} />
        <VectorArrow x={O.x} y={O.y} dx={vout.x * k} dy={-vout.y * k} color={K.cyan} width={7} head="open" />
        <circle cx={O.x} cy={O.y} r={7} fill={K.cyan} />
        <T x={O.x + vin.x * k - 14} y={O.y - vin.y * k - 16} size={24} color={K.muted} anchor="middle" weight={600}>
          arriving
        </T>
        <T x={O.x + vout.x * k + 16} y={O.y - vout.y * k + 30} size={24} color={K.cyan} weight={650}>
          leaving
        </T>
        <path d={polyline(arc)} fill="none" stroke={K.ivory} strokeWidth={3} opacity={sweep > 0 ? 0.85 : 0} />
        <T x={O.x} y={O.y - 300} size={30} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, b[0] + 150, 20)}>
          same length · different direction
        </T>
      </g>
      <g opacity={barsIn}>
        <SpeedBar x={1150} y={760} label="speed rel. Jupiter · arriving" kind="planet" max={420} value={speedRelPlanet(-HALF) * BAR_K} />
        <SpeedBar x={1150} y={870} label="speed rel. Jupiter · leaving" kind="planet" max={420} value={speedRelPlanet(HALF) * BAR_K} />
        <T x={1150} y={990} size={30} color={K.ivory} weight={700} opacity={pr(t, b[1] + 90, 20)}>
          speed: how fast
        </T>
        <T x={1150} y={1036} size={30} color={K.cyan} weight={700} opacity={pr(t, b[1] + 150, 20)}>
          velocity: how fast and which way
        </T>
      </g>
      <ViewBadge sun={0} />
    </Stage>
  );
};

// ---------- Scene 7: who pays ----------
export const S07: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const craftGain = pr(t, b[1] + 60, 70, easeOut);
  const jupDip = pr(t, b[1] + 60, 70, easeOut);
  const mag = pr(t, b[2] + 10, 35);
  const baseY = 860;
  const craftH = lerp(140, 300, craftGain);
  const jupH = 560;
  // Jupiter's change drawn as a 1 px nick — "almost imperceptible".
  const dip = 1.2 * jupDip;
  const jx = 1180;
  const jw = 300;
  const magX = 1700;
  const magY = 300;
  return (
    <Stage>
      <T x={W / 2} y={150} size={40} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, b[0], 20)}>
        Where does the extra energy come from?
      </T>
      {/* Craft's orbital energy */}
      <rect x={480} y={baseY - craftH} width={220} height={craftH} rx={8} fill={K.cyan} opacity={0.9} />
      <T x={590} y={baseY + 50} size={26} color={K.cyan} anchor="middle" weight={700}>
        spacecraft's orbital energy
      </T>
      <T x={590} y={baseY + 84} size={22} color={K.muted} anchor="middle" weight={600}>
        (relative to the Sun)
      </T>
      <T x={590} y={baseY - craftH - 22} size={28} color={K.cyan} anchor="middle" weight={750} opacity={craftGain}>
        gains
      </T>
      {/* Jupiter's orbital energy: a broken bar (the scale is cut, it is far larger than shown) */}
      <rect x={jx} y={baseY - jupH + dip} width={jw} height={jupH - dip} rx={8} fill={K.amber} opacity={0.85} />
      <path
        d={`M${jx - 6} ${baseY - 250} l${jw / 4 + 3} -14 l${jw / 4 + 3} 14 l${jw / 4 + 3} -14 l${jw / 4 + 3} 14 v22 l${-(jw / 4 + 3)} -14 l${-(jw / 4 + 3)} 14 l${-(jw / 4 + 3)} -14 l${-(jw / 4 + 3)} 14 Z`}
        fill={K.bg}
      />
      <T x={jx + jw / 2} y={baseY + 50} size={26} color={K.amber} anchor="middle" weight={700}>
        Jupiter's orbital energy
      </T>
      {/* Transfer arrow */}
      <g opacity={craftGain}>
        <VectorArrow x={jx - 30} y={baseY - 330} dx={-(jx - 30 - 740)} dy={0} color={K.ivory} width={5} head="filled" label="orbital energy" labelOffset={30} fontFamily={F} />
      </g>
      {/* Magnifier on the top edge of Jupiter's bar */}
      <g opacity={mag}>
        <defs>
          <clipPath id="e3s7mag">
            <circle cx={magX} cy={magY} r={150} />
          </clipPath>
        </defs>
        <line x1={jx + jw - 18} y1={baseY - jupH - 14} x2={magX - 110} y2={magY + 100} stroke={K.muted} strokeWidth={2} />
        <circle cx={jx + jw - 30} cy={baseY - jupH} r={18} fill="none" stroke={K.muted} strokeWidth={3} />
        <circle cx={magX} cy={magY} r={150} fill={K.bg} />
        <g clipPath="url(#e3s7mag)">
          <rect x={magX - 150} y={magY + 2 * jupDip} width={300} height={170} fill={K.amber} opacity={0.85} />
          <line x1={magX - 150} y1={magY} x2={magX + 150} y2={magY} stroke={K.ivory} strokeWidth={2} strokeDasharray="6 6" opacity={0.8} />
          <T x={magX} y={magY - 30} size={22} color={K.muted} anchor="middle" weight={600}>
            level before the flyby
          </T>
        </g>
        <circle cx={magX} cy={magY} r={150} fill="none" stroke={K.muted} strokeWidth={4} />
        <T x={magX} y={magY + 196} size={26} color={K.ivory} anchor="middle" weight={700}>
          almost imperceptible
        </T>
      </g>
      <Tag x={W / 2} y={1010} text="The spacecraft didn't make speed. It borrowed it." size={30} color={K.ivory} anchor="middle" opacity={pr(t, b[3], 15)} />
    </Stage>
  );
};

// One Sun-frame flyby panel for Scene 8, drawn at `scale` around `ca` (Jupiter at closest approach).
const SunFlybyPanel: React.FC<{ t: number; start: number; fly: Flyby; ca: V2; scale: number; label: string }> = ({ t, start, fly, ca, scale, label }) => {
  const run = pr(t, start, 150);
  const tau = lerp(-HALF, HALF, run);
  const steps = 160;
  const pts = sunPath({ x: 0, y: 0 }, fly, HALF, steps)
    .filter((_, i) => -HALF + (2 * HALF * i) / steps <= tau)
    .map((p) => scr(p, ca, scale));
  const jup = { x: ca.x + PLANET_VEL.x * tau * scale, y: ca.y };
  const craft = scr({ x: PLANET_VEL.x * tau + fly.rel(tau).p.x, y: fly.rel(tau).p.y }, ca, scale);
  return (
    <g>
      <line x1={ca.x - 420} y1={ca.y} x2={ca.x + 420} y2={ca.y} stroke={K.amber} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="10 10" />
      {pts.length > 1 ? <path d={polyline(pts)} fill="none" stroke={K.cyan} strokeWidth={4} /> : null}
      <Jupiter x={jup.x} y={jup.y} r={PR * scale} />
      <VectorArrow x={jup.x + PR * scale + 8} y={jup.y} dx={70} dy={0} color={K.amber} width={5} head="filled" />
      {run > 0 ? <Craft x={craft.x} y={craft.y} r={7} /> : null}
      <T x={ca.x} y={150} size={32} color={K.ivory} anchor="middle" weight={700}>
        {label}
      </T>
    </g>
  );
};

// ---------- Scene 8: behind or in front ----------
export const S08: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const left: V2 = { x: 480, y: 520 };
  const right: V2 = { x: 1440, y: 520 };
  const s = 0.62;
  const doneL = pr(t, b[1] + 150, 15);
  const doneR = pr(t, b[2] + 150, 15);
  return (
    <Stage>
      <line x1={W / 2} y1={110} x2={W / 2} y2={900} stroke={K.line} strokeWidth={2} />
      <g opacity={pr(t, b[0], 15)}>
        <SunFlybyPanel t={t} start={b[1]} fly={FLYBY} ca={left} scale={s} label="passes behind Jupiter" />
      </g>
      <g opacity={pr(t, b[0] + 20, 15)}>
        <SunFlybyPanel t={t} start={b[2]} fly={FLYBY_FRONT} ca={right} scale={s} label="passes in front of Jupiter" />
      </g>
      <g opacity={doneL}>
        <SpeedBar x={180} y={820} label="speed rel. Sun" kind="sun" max={560} value={speedRelSun(HALF) * BAR_K} ghost={speedRelSun(-HALF) * BAR_K} ghostLabel="arriving" />
        <T x={460} y={940} size={30} color={K.white} anchor="middle" weight={750}>
          ▲ leaves faster
        </T>
      </g>
      <g opacity={doneR}>
        <SpeedBar x={1140} y={820} label="speed rel. Sun" kind="sun" max={560} value={speedRelSun(HALF, FLYBY_FRONT) * BAR_K} ghost={speedRelSun(-HALF, FLYBY_FRONT) * BAR_K} ghostLabel="arriving" />
        <T x={1420} y={940} size={30} color={K.white} anchor="middle" weight={750}>
          ▼ leaves slower
        </T>
      </g>
      <Tag x={W / 2} y={1030} text="Galileo · flew past Jupiter's moon Io to shed energy · saved 90 kg of fuel" size={26} color={K.ivory} anchor="middle" opacity={pr(t, b[3] + 120, 20)} />
      <ViewBadge sun={1} />
    </Stage>
  );
};
