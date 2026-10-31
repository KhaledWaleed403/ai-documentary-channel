// Episode 003 Scenes 5–6: the reference-frame switch and the vector sum.
// Same flyby as Scenes 3–4 (flybyModel.ts). In the Sun's view Jupiter moves at a
// constant velocity; the spacecraft's planet-relative curve rides along with it,
// and the solid cyan trail is the spacecraft's actual path relative to the Sun.
import React from "react";
import { lerp } from "../../animations/timing";
import { VectorArrow } from "../../components/VectorArrow";
import { FLYBY, HALF, PLANET_VEL, V_INF, relPath, scr, speedRelPlanet, speedRelSun, sunPath, vInSun, vOutSun } from "./flybyModel";
import { F, Jupiter, K, SpeedBar, Stage, T, Tag, ViewBadge, W, pr, win, Craft } from "./kit";
import { add, fromAngle, len, polyline, type V2 } from "./orbits";

export type SceneProps = { t: number; dur: number; beats: number[]; ends: number[] };

// Bar length per px/frame of speed (same scale in every speed gauge of the flyby scenes).
export const BAR_K = 50;
const PLANET_R = 46;
const TRACK_Y = 560;

// ---------- Scene 5: the switch, seen from the Sun ----------
export const S05: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  // The view switches on "Jupiter isn't standing still": badge flips, Jupiter's motion appears.
  const switchAt = b[0] + 150;
  const sunView = pr(t, switchAt, 30);
  const ramp = 40;
  // Planet travel (px) since the switch: velocity eases in over `ramp` frames (a change of viewpoint, not of physics).
  const travel = (tt: number) => {
    const s = tt - switchAt;
    if (s <= 0) {
      return 0;
    }
    return s >= ramp ? PLANET_VEL.x * (s - ramp / 2) : (PLANET_VEL.x * s * s) / (2 * ramp);
  };
  const tp = b[1] + 12 + HALF; // closest approach
  // The animation freezes once the flyby is complete, so the comparison can be read.
  const ts = Math.min(t, tp + HALF);
  const caX = 720;
  const jx = caX + travel(ts) - travel(tp);
  const jup: V2 = { x: jx, y: TRACK_Y };
  const tau = ts - tp;
  const started = t >= tp - HALF;
  const tauC = Math.max(-HALF, Math.min(HALF, tau));

  // Sun-frame trail up to now (screen space: planet screen position at CA + planet-relative path).
  const caScreen: V2 = { x: caX, y: TRACK_Y };
  const trailPts = sunPath({ x: 0, y: 0 }, FLYBY, HALF, 200)
    .filter((_, i) => -HALF + (2 * HALF * i) / 200 <= tauC)
    .map((p) => scr(p, caScreen));
  const craftRel = FLYBY.rel(tauC).p;
  const craft = scr(craftRel, jup);
  const ghostCurve = polyline(relPath().map((p) => scr(p, jup)));
  const curveOpacity = started ? 0.9 * Math.min(pr(t, tp - HALF, 15), 1 - 0.7 * pr(t, b[2] + 30, 30)) : 0;

  // Speed gauges (live), ghost marks at the entry values.
  const bars = pr(t, tp - HALF, 15);
  const vRelNow = speedRelPlanet(tauC);
  const vSunNow = speedRelSun(tauC);
  const done = pr(t, tp + HALF, 20);

  // Entry and exit velocity arrows (relative to the Sun), after the flyby.
  const arrows = pr(t, Math.max(b[2], tp + HALF) + 10, 25);
  const p0 = scr(sunPath({ x: 0, y: 0 })[0], caScreen);
  const p1 = scr(sunPath({ x: 0, y: 0 })[160], caScreen);
  const AK = 40;
  const vin = vInSun();
  const vout = vOutSun();

  return (
    <Stage>
      {/* Jupiter's local path and its motion, only in the Sun's view */}
      <g opacity={sunView}>
        <line x1={0} y1={TRACK_Y} x2={W} y2={TRACK_Y} stroke={K.amber} strokeOpacity={0.28} strokeWidth={2} strokeDasharray="10 10" />
        <VectorArrow x={jx + PLANET_R + 14} y={TRACK_Y} dx={PLANET_VEL.x * AK} dy={0} color={K.amber} width={6} head="filled" fontFamily={F} />
        <T x={jx + PLANET_R + 14 + PLANET_VEL.x * AK + 16} y={TRACK_Y + 9} size={24} color={K.amber} weight={650}>
          Jupiter's motion
        </T>
      </g>

      {/* Before the switch: the flyby as Jupiter saw it (Scenes 3–4) */}
      <path d={ghostCurve} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="9 9" opacity={0.55 * win(t, 0, switchAt + 20, 20)} />

      {/* The planet-relative curve, carried along with Jupiter */}
      <path d={ghostCurve} fill="none" stroke={K.cyan} strokeWidth={3} strokeDasharray="9 9" opacity={curveOpacity} />
      <g opacity={curveOpacity * win(t, tp - HALF + 10, b[2] + 30)}>
        <T x={scr(relPath()[28], jup).x + 26} y={scr(relPath()[28], jup).y + 6} size={22} color={K.cyan} anchor="start" weight={600}>
          curve around Jupiter
        </T>
      </g>

      {/* The actual path relative to the Sun */}
      {trailPts.length > 1 ? <path d={polyline(trailPts)} fill="none" stroke={K.cyan} strokeWidth={5} strokeLinecap="round" /> : null}

      <Jupiter x={jx} y={TRACK_Y} r={PLANET_R} />
      {started ? <Craft x={craft.x} y={craft.y} /> : null}

      {/* Velocity relative to the Sun, entering and leaving */}
      <VectorArrow x={p0.x} y={p0.y} dx={vin.x * AK} dy={-vin.y * AK} color={K.white} width={7} head="double" draw={arrows} fontFamily={F} />
      <VectorArrow x={p1.x} y={p1.y} dx={vout.x * AK} dy={-vout.y * AK} color={K.white} width={7} head="double" draw={arrows} fontFamily={F} />
      <g opacity={arrows}>
        <T x={p0.x - 22} y={p0.y + 8} size={24} color={K.white} anchor="end" weight={650}>
          arriving
        </T>
        <T x={p1.x + vout.x * AK + 18} y={p1.y - vout.y * AK + 8} size={24} color={K.white} weight={650}>
          leaving
        </T>
      </g>

      {/* Gauges */}
      <g opacity={bars}>
        <SpeedBar
          x={1180}
          y={800}
          label="speed rel. Jupiter"
          kind="planet"
          max={560}
          value={vRelNow * BAR_K}
          ghost={speedRelPlanet(-HALF) * BAR_K}
          ghostLabel="arriving"
          note="same"
          noteOpacity={done * pr(t, b[2], 15)}
        />
        <SpeedBar
          x={1180}
          y={920}
          label="speed rel. Sun"
          kind="sun"
          max={560}
          value={vSunNow * BAR_K}
          ghost={speedRelSun(-HALF) * BAR_K}
          ghostLabel="arriving"
          note="faster"
          noteOpacity={done * pr(t, b[2] + 60, 15)}
        />
      </g>

      <ViewBadge sun={sunView} />
      <Tag x={W / 2} y={88} text="Same flyby · two measurements" size={30} color={K.ivory} anchor="middle" opacity={pr(t, b[3], 15)} />
    </Stage>
  );
};


// ---------- Scene 6: adding the arrows ----------
export const S06: React.FC<SceneProps> = ({ t, beats }) => {
  const b = beats;
  const k = 105; // px per (px/frame)
  const O: V2 = { x: 900, y: 770 };
  const amberTip: V2 = { x: O.x + PLANET_VEL.x * k, y: O.y };
  const drawAmber = pr(t, b[0] + 75, 25);
  const drawCyan = pr(t, b[0] + 140, 25);
  const drawWhite = pr(t, b[0] + 200, 25);
  const turn = pr(t, b[1] + 70, 95);
  const angle = lerp(FLYBY.inDeg, FLYBY.outDeg, turn);
  const rel = fromAngle(angle, V_INF);
  const cyanTip: V2 = { x: amberTip.x + rel.x * k, y: amberTip.y - rel.y * k };
  const before = add(PLANET_VEL, fromAngle(FLYBY.inDeg, V_INF));
  const beforeTip: V2 = { x: O.x + before.x * k, y: O.y - before.y * k };
  const now = add(PLANET_VEL, rel);
  const r = V_INF * k;
  // Arc swept by the cyan tip (constant length).
  const arcPts = Array.from({ length: 61 }, (_, i) => {
    const a = lerp(FLYBY.inDeg, angle, i / 60);
    const v = fromAngle(a, V_INF);
    return { x: amberTip.x + v.x * k, y: amberTip.y - v.y * k };
  });
  const showGhost = pr(t, b[1] + 60, 15);
  const sunLenBefore = len(before);
  const sunLenNow = len(now);

  // Context: the frozen Sun-frame flyby, small, top-left.
  const ctxO: V2 = { x: 330, y: 360 };
  const s = 0.42;
  const ctx = polyline(sunPath({ x: 0, y: 0 }).map((p) => scr(p, ctxO, s)));

  return (
    <Stage>
      <g opacity={0.75}>
        <path d={ctx} fill="none" stroke={K.cyan} strokeWidth={3.5} />
        <Jupiter x={ctxO.x} y={ctxO.y} r={PLANET_R * s * 1.1} />
        <T x={ctxO.x} y={ctxO.y + 230} size={22} color={K.muted} anchor="middle" weight={600}>
          the flyby, relative to the Sun
        </T>
      </g>

      <T x={W / 2 + 120} y={150} size={40} color={K.ivory} weight={700} anchor="middle" opacity={pr(t, b[0], 20)}>
        craft rel. Sun = Jupiter's velocity + craft rel. Jupiter
      </T>

      {/* Stage label: before / after */}
      <Tag x={O.x - 40} y={O.y + 120} text={turn < 0.5 ? "before the flyby" : "after the flyby"} size={26} color={K.muted} opacity={pr(t, b[0] + 200, 20)} />

      {/* Constant-length arc and the ghost of the "before" sum */}
      <path d={polyline(arcPts)} fill="none" stroke={K.cyan} strokeOpacity={0.5} strokeWidth={2.5} strokeDasharray="6 7" opacity={turn > 0 ? 1 : 0} />
      <circle cx={amberTip.x} cy={amberTip.y} r={r} fill="none" stroke={K.cyan} strokeOpacity={0.12} strokeWidth={2} opacity={pr(t, b[1] + 40, 20)} />
      <VectorArrow x={O.x} y={O.y} dx={beforeTip.x - O.x} dy={beforeTip.y - O.y} color={K.white} width={6} head="double" opacity={0.35 * showGhost} fontFamily={F} />

      {/* The three vectors */}
      <VectorArrow
        x={O.x}
        y={O.y}
        dx={PLANET_VEL.x * k}
        dy={0}
        color={K.amber}
        width={9}
        head="filled"
        draw={drawAmber}
        label="Jupiter's velocity"
        labelOffset={-40}
        labelAt={0.42}
        fontFamily={F}
      />
      <VectorArrow x={amberTip.x} y={amberTip.y} dx={rel.x * k} dy={-rel.y * k} color={K.cyan} width={9} head="open" draw={drawCyan} fontFamily={F} />
      <VectorArrow x={O.x} y={O.y} dx={now.x * k} dy={-now.y * k} color={K.white} width={10} head="double" draw={drawWhite} fontFamily={F} />

      {/* Labels that follow the arrows */}
      <g opacity={drawCyan}>
        <T x={cyanTip.x + (turn < 0.5 ? 26 : 22)} y={cyanTip.y + (turn < 0.5 ? 10 : 40)} size={26} color={K.cyan} weight={700}>
          craft rel. Jupiter
        </T>
      </g>
      <g opacity={drawWhite}>
        <T x={O.x + now.x * k * 0.5 - 20} y={O.y - now.y * k * 0.5 - 30} size={26} color={K.white} weight={700} anchor="middle">
          craft rel. Sun
        </T>
      </g>

      {/* "only this changed" */}
      <g opacity={win(t, b[1] + 70, b[2] + 40)}>
        <T x={amberTip.x + r + 30} y={amberTip.y - r * 0.55} size={28} color={K.cyan} weight={750}>
          same length, new direction
        </T>
        <T x={amberTip.x + r + 30} y={amberTip.y - r * 0.55 + 36} size={24} color={K.muted} weight={600}>
          only this arrow changed
        </T>
      </g>

      {/* Length comparison of the Sun-frame velocity */}
      <g opacity={pr(t, b[2], 20)}>
        <SpeedBar x={1040} y={960} label="speed rel. Sun" kind="sun" max={560} value={sunLenNow * BAR_K} ghost={sunLenBefore * BAR_K} ghostLabel="before" note="longer" noteOpacity={pr(t, b[2] + 50, 15)} />
      </g>

      <ViewBadge sun={1} />
    </Stage>
  );
};

