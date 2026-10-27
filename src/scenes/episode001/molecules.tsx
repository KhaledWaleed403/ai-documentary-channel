// Simplified water molecules tugged by a switching field (SH04, SH05).
// Not a simulation: molecules twist only part-way, lag, and fall out of sync.
import React from "react";
import { wobble } from "../../animations/timing";
import { fontFamily, palette } from "../../styles/theme";

// Visual period of one back-and-forth, hugely slowed down (real: ~2.45 GHz).
const FIELD_PERIOD = 60;

// Smoothed square wave in [-1, 1]: + means the pull points right.
export const fieldAt = (t: number) =>
  Math.tanh(3 * Math.sin((2 * Math.PI * t) / FIELD_PERIOD));

const COLS = [250, 540, 830];
const ROWS = [660, 870, 1080, 1290];
const ARROW_ROWS = [555, 765, 975, 1185, 1395];
const ARROW_COLS = [395, 685];
const BASE_ANGLES = [-20, 35, 160, 75, -110, 200, 15, -60, 120, 250, -150, 50];

const molecules = ROWS.flatMap((y, r) =>
  COLS.map((x, c) => {
    const i = r * COLS.length + c;
    return { x, y, base: BASE_ANGLES[i], lag: 3 + ((i * 5) % 9), seed: i + 1 };
  }),
);

// The molecule that carries the + / − labels.
const LABELLED = 4;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const WaterMolecule: React.FC<{
  x: number;
  y: number;
  // Direction the molecule's positive (hydrogen) side points, in degrees.
  angle: number;
  outline: string;
  labels?: { plus: string; minus: string; color: string };
}> = ({ x, y, angle, outline, labels }) => {
  const h1 = toRad(angle - 52);
  const h2 = toRad(angle + 52);
  const a = toRad(angle);
  const bond = 74;
  return (
    <g>
      {[h1, h2].map((h, i) => (
        <line
          key={`b${i}`}
          x1={x}
          y1={y}
          x2={x + Math.cos(h) * bond}
          y2={y + Math.sin(h) * bond}
          stroke={palette.mistBlue}
          strokeWidth={12}
        />
      ))}
      {[h1, h2].map((h, i) => (
        <circle
          key={`h${i}`}
          cx={x + Math.cos(h) * bond}
          cy={y + Math.sin(h) * bond}
          r={27}
          fill={palette.warmIvory}
          stroke={outline}
          strokeWidth={5}
        />
      ))}
      <circle cx={x} cy={y} r={47} fill={palette.mistBlue} stroke={outline} strokeWidth={5} />
      {labels ? (
        <g fontFamily={fontFamily} fontWeight={800} fontSize={64} fill={labels.color} textAnchor="middle">
          <text x={x + Math.cos(a) * 138} y={y + Math.sin(a) * 138 + 22}>
            {labels.plus}
          </text>
          <text x={x - Math.cos(a) * 92} y={y - Math.sin(a) * 92 + 22}>
            {labels.minus}
          </text>
        </g>
      ) : null}
    </g>
  );
};

export const MoleculeField: React.FC<{
  // Field time in frames (continuous across SH04 → SH05).
  t: number;
  // 0 = tidy tugging, 1 = fully random jiggling (bumping neighbours).
  jitter: number;
  // 0 → 1 entrance.
  appear: number;
  arrowOpacity: number;
  outline: string;
  labels?: { plus: string; minus: string; color: string };
}> = ({ t, jitter, appear, arrowOpacity, outline, labels }) => (
  <g>
    {ARROW_ROWS.flatMap((y) =>
      ARROW_COLS.map((x) => (
        <g
          key={`${x}-${y}`}
          transform={`translate(${x} ${y}) scale(${fieldAt(t)} 1)`}
          opacity={arrowOpacity}
        >
          <line x1={-70} y1={0} x2={50} y2={0} stroke={palette.signalTeal} strokeWidth={10} strokeLinecap="round" />
          <path d="M44 -24 L78 0 L44 24 Z" fill={palette.signalTeal} />
        </g>
      )),
    )}
    {molecules.map((m, i) => {
      const s = Math.min(1, appear * 1.4 - i * 0.03);
      if (s <= 0) return null;
      const angle = m.base + 30 * fieldAt(t - m.lag) + jitter * 70 * wobble(t * 1.6, m.seed);
      const x = m.x + jitter * 30 * wobble(t * 1.9, m.seed + 7);
      const y = m.y + jitter * 30 * wobble(t * 1.7, m.seed + 13);
      return (
        <g key={i} transform={`translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`}>
          <WaterMolecule
            x={x}
            y={y}
            angle={angle}
            outline={outline}
            labels={i === LABELLED ? labels : undefined}
          />
        </g>
      );
    })}
  </g>
);
