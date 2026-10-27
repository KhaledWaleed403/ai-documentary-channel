import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { lerp, mixColor, progress } from "../../animations/timing";
import { Callout } from "../../components/Callout";
import { palette } from "../../styles/theme";
import { SceneProps, Stage } from "./shared";

const C = { x: 540, y: 940 };
const FOOD_R = 250;
const STILL_UNTIL = 55;
const ROTATE_END = 175;
const TURNS = 1.3;
const STIR = { start: 158, length: 30, blend: 0.3 };

// Stronger/weaker wave areas on the oven floor (top-down). Illustrative only:
// irregular on purpose, no claim about real spacing.
const BLOBS = [
  { x: 400, y: 800, s: 85, a: 1 },
  { x: 700, y: 1070, s: 90, a: 1 },
  { x: 660, y: 770, s: 70, a: 0.75 },
  { x: 370, y: 1090, s: 75, a: 0.6 },
  { x: 250, y: 600, s: 100, a: 0.8 },
  { x: 850, y: 650, s: 100, a: 0.7 },
  { x: 820, y: 1280, s: 110, a: 0.8 },
  { x: 240, y: 1300, s: 100, a: 0.7 },
];

const strength = (x: number, y: number) =>
  0.06 +
  BLOBS.reduce(
    (sum, b) => sum + b.a * Math.exp(-((x - b.x) ** 2 + (y - b.y) ** 2) / (2 * b.s * b.s)),
    0,
  );

// Food sample points on a polar grid, in the plate's own frame.
const SAMPLES: { x: number; y: number }[] = [];
for (let r = 0; r <= FOOD_R; r += 22) {
  const n = r === 0 ? 1 : Math.round((2 * Math.PI * r) / 22);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    SAMPLES.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
  }
}

const angleAt = (f: number) =>
  interpolate(f, [STILL_UNTIL, ROTATE_END], [0, TURNS * Math.PI * 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

const worldPoint = (p: { x: number; y: number }, angle: number) => ({
  x: C.x + p.x * Math.cos(angle) - p.y * Math.sin(angle),
  y: C.y + p.x * Math.sin(angle) + p.y * Math.cos(angle),
});

// Hottest / coolest spots while the plate is still, for the callouts.
const stillPicks = (() => {
  let hot = SAMPLES[0];
  let cold = SAMPLES[0];
  for (const p of SAMPLES) {
    const r = Math.hypot(p.x, p.y);
    if (r < 90 || r > 220) continue;
    if (strength(C.x + p.x, C.y + p.y) > strength(C.x + hot.x, C.y + hot.y)) hot = p;
    if (strength(C.x + p.x, C.y + p.y) < strength(C.x + cold.x, C.y + cold.y)) cold = p;
  }
  return { hot: { x: C.x + hot.x, y: C.y + hot.y }, cold: { x: C.x + cold.x, y: C.y + cold.y } };
})();

const heatColor = (w: number) =>
  w < 0.7
    ? mixColor(palette.mistBlue, palette.energyOrange, w / 0.7)
    : mixColor(palette.energyOrange, palette.discoveryGold, (w - 0.7) / 0.3);

// SH06: stronger and weaker spots heat food unevenly; the turntable moves the
// food through them, which reduces (not removes) the unevenness.
export const Sh06Turntable: React.FC<SceneProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const [hotLabel, coldLabel] = shot.onScreenText;
  const angle = angleAt(frame);

  // Energy each food point has received so far (sampled every 3 frames).
  const heat = SAMPLES.map(() => 0);
  for (let f = 0; f <= frame; f += 3) {
    const a = angleAt(f);
    SAMPLES.forEach((p, i) => {
      const w = worldPoint(p, a);
      heat[i] += strength(w.x, w.y);
    });
  }
  const max = Math.max(...heat);
  const mean = heat.reduce((s, h) => s + h, 0) / heat.length;
  const stir = progress(frame, STIR.start, STIR.length);
  const overall = lerp(0.75, 1, progress(frame, 0, 190));

  const labels = progress(frame, 28, 14) * (1 - progress(frame, STILL_UNTIL + 20, 10));
  const spoonA = stir * Math.PI * 2;

  return (
    <Stage bg={palette.inkNavy}>
      <defs>
        {BLOBS.map((b, i) => (
          <radialGradient key={i} id={`sh06-blob-${i}`}>
            <stop offset="0" stopColor={palette.signalTeal} stopOpacity={0.6 * b.a} />
            <stop offset="1" stopColor={palette.signalTeal} stopOpacity={0} />
          </radialGradient>
        ))}
        <clipPath id="sh06-food">
          <circle cx={C.x} cy={C.y} r={FOOD_R} />
        </clipPath>
        <filter id="sh06-soften" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={9} />
        </filter>
      </defs>
      <rect x={110} y={510} width={860} height={860} rx={30} fill={palette.inkNavy} stroke={palette.warmIvory} strokeOpacity={0.45} strokeWidth={6} />
      {BLOBS.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.s * 2.2} fill={`url(#sh06-blob-${i})`} />
      ))}
      {/* Turntable and plate. */}
      <circle cx={C.x} cy={C.y} r={340} fill={palette.warmIvory} fillOpacity={0.06} stroke={palette.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
      <circle cx={C.x} cy={C.y} r={290} fill={palette.warmIvory} fillOpacity={0.14} stroke={palette.warmIvory} strokeOpacity={0.7} strokeWidth={4} />
      <g clipPath="url(#sh06-food)">
        <circle cx={C.x} cy={C.y} r={FOOD_R} fill={palette.mistBlue} />
        <g filter="url(#sh06-soften)">
          {SAMPLES.map((p, i) => {
            const w = worldPoint(p, angle);
            const relative = lerp(heat[i], mean, STIR.blend * stir) / max;
            return <circle key={i} cx={w.x} cy={w.y} r={17} fill={heatColor(relative * overall)} />;
          })}
        </g>
      </g>
      <circle cx={C.x} cy={C.y} r={FOOD_R} fill="none" stroke={palette.warmIvory} strokeWidth={4} />
      {/* Marker riding on the food so the rotation is easy to follow. */}
      {(() => {
        const m = worldPoint({ x: 205, y: 0 }, angle);
        return <circle cx={m.x} cy={m.y} r={16} fill="none" stroke={palette.inkNavy} strokeWidth={6} />;
      })()}
      {stir > 0 && stir < 1 ? (
        <g transform={`translate(${C.x + Math.cos(spoonA) * 90} ${C.y + Math.sin(spoonA) * 90}) rotate(-35)`}>
          <ellipse cx={0} cy={0} rx={34} ry={22} fill={palette.warmIvory} stroke={palette.inkNavy} strokeWidth={4} />
          <rect x={28} y={-7} width={190} height={14} rx={7} fill={palette.warmIvory} stroke={palette.inkNavy} strokeWidth={4} />
        </g>
      ) : null}
      <Callout x={stillPicks.hot.x} y={440} tx={stillPicks.hot.x} ty={stillPicks.hot.y} label={hotLabel} progress={labels} color={palette.warmIvory} />
      <Callout x={stillPicks.cold.x} y={1470} tx={stillPicks.cold.x} ty={stillPicks.cold.y} label={coldLabel} progress={labels} color={palette.warmIvory} />
    </Stage>
  );
};
