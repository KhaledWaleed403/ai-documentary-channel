// Shared look for Episode 003 (gravity assists). Near-black deep space, a faint
// star field, cyan = spacecraft, amber = planets / Sun and their motion,
// white double line = velocity relative to the Sun. Dashed = hypothetical.
import React from "react";
import { AbsoluteFill } from "remotion";
import { easeInOut, progress } from "../../animations/timing";
import { fontFamily, palette } from "../../styles/theme";

export const W = 1920;
export const H = 1080;

export const K = {
  bg: "#02040A",
  bg2: "#070B16",
  line: "#253248",
  muted: "#8C9BB3",
  dim: "#4E5D76",
  ivory: palette.warmIvory,
  white: "#F7F5EE",
  cyan: "#3FD3E3",
  cyanDim: "#1C7A86",
  amber: "#F2A64A",
  amberDim: "#7E5523",
  sun: "#FFD27A",
} as const;

export const F = fontFamily;

export const pr = (t: number, start: number, dur: number, ease = easeInOut) => progress(t, start, dur, ease);

// Opacity window: fades in at `a`, out at `b` (local frames).
export const win = (t: number, a: number, b: number, f = 12) => Math.min(pr(t, a, f), 1 - pr(t, b - f, f));

const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 220 }, (_, i) => ({
  x: rnd(i * 3 + 1) * W,
  y: rnd(i * 3 + 2) * H,
  r: 0.6 + rnd(i * 3 + 3) * 1.6,
  o: 0.15 + rnd(i * 7 + 5) * 0.45,
}));

export const Defs: React.FC = () => (
  <defs>
    <radialGradient id="e3vig" cx="50%" cy="48%" r="75%">
      <stop offset="0%" stopColor="#080D1A" />
      <stop offset="100%" stopColor={K.bg} />
    </radialGradient>
    <radialGradient id="e3jup" cx="38%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#F8C27A" />
      <stop offset="60%" stopColor="#D98A3A" />
      <stop offset="100%" stopColor="#7A4A1C" />
    </radialGradient>
    <radialGradient id="e3sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFF3C8" />
      <stop offset="45%" stopColor={K.sun} />
      <stop offset="100%" stopColor="#F2A64A" stopOpacity={0} />
    </radialGradient>
    <filter id="e3glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="6" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// Full-frame SVG stage: vignette, stars (optionally drifting for camera moves).
// `w`/`h` default to the 16:9 frame; the Shorts pass 1080 × 1920.
export const Stage: React.FC<{ children: React.ReactNode; overlay?: React.ReactNode; starShift?: number; w?: number; h?: number }> = ({
  children,
  overlay,
  starShift = 0,
  w = W,
  h = H,
}) => (
  <AbsoluteFill style={{ backgroundColor: K.bg }}>
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ position: "absolute", inset: 0 }}>
      <Defs />
      <rect width={w} height={h} fill="url(#e3vig)" />
      <g>
        {STARS.map((s, i) => (
          <circle key={i} cx={(((((s.x - starShift * (0.3 + s.r * 0.2)) % W) + W) % W) * w) / W} cy={(s.y * h) / H} r={s.r} fill={K.ivory} opacity={s.o} />
        ))}
      </g>
      {children}
    </svg>
    {overlay}
  </AbsoluteFill>
);

export const T: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  spacing?: number;
  children: React.ReactNode;
}> = ({ x, y, size = 30, color = K.ivory, weight = 600, anchor = "start", opacity = 1, spacing = 0, children }) => (
  <text x={x} y={y} fontFamily={F} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} opacity={opacity} letterSpacing={spacing}>
    {children}
  </text>
);

// Framed label plate.
export const Tag: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; opacity?: number; anchor?: "start" | "middle" | "end"; dashed?: boolean }> = ({
  x,
  y,
  text,
  size = 26,
  color = K.muted,
  opacity = 1,
  anchor = "start",
  dashed = false,
}) => {
  const w = text.length * size * 0.53 + size * 1.2;
  const left = anchor === "start" ? x : anchor === "middle" ? x - w / 2 : x - w;
  return (
    <g opacity={opacity}>
      <rect
        x={left}
        y={y - size * 1.05}
        width={w}
        height={size * 1.55}
        rx={size * 0.35}
        fill={K.bg}
        fillOpacity={0.8}
        stroke={color}
        strokeOpacity={0.6}
        strokeWidth={2}
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <T x={left + w / 2} y={y} size={size} color={color} weight={600} anchor="middle">
        {text}
      </T>
    </g>
  );
};

// Reference-frame badge, top-left. `which` cross-fades between the two views.
export const ViewBadge: React.FC<{ sun: number; opacity?: number; x?: number; y?: number }> = ({ sun, opacity = 1, x = 56, y = 44 }) => (
  <g opacity={opacity} transform={`translate(${x - 56} ${y - 44})`}>
    <rect x={56} y={44} width={330} height={56} rx={12} fill={K.bg} fillOpacity={0.85} stroke={K.line} strokeWidth={2} />
    <T x={78} y={82} size={22} color={K.muted} weight={700} spacing={3}>
      VIEW:
    </T>
    <g opacity={1 - sun}>
      <T x={168} y={83} size={28} color={K.amber} weight={750} spacing={2}>
        JUPITER
      </T>
    </g>
    <g opacity={sun}>
      <T x={168} y={83} size={28} color={K.white} weight={750} spacing={2}>
        SUN
      </T>
    </g>
  </g>
);

// Banded Jupiter disc.
export const Jupiter: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({ x, y, r, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={r * 1.5} fill={K.amber} opacity={0.08} />
    <circle cx={x} cy={y} r={r} fill="url(#e3jup)" />
    {[-0.45, -0.15, 0.2, 0.5].map((b, i) => (
      <ellipse key={i} cx={x} cy={y + b * r} rx={r * Math.sqrt(1 - b * b) * 0.98} ry={r * 0.07} fill="#8A4F1E" opacity={0.35} />
    ))}
  </g>
);

export const Planet: React.FC<{ x: number; y: number; r: number; color?: string; opacity?: number }> = ({ x, y, r, color = K.amber, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={r * 1.8} fill={color} opacity={0.1} />
    <circle cx={x} cy={y} r={r} fill={color} />
  </g>
);

export const Sun: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({ x, y, r, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={r * 3} fill="url(#e3sun)" opacity={0.55} />
    <circle cx={x} cy={y} r={r} fill={K.sun} />
  </g>
);

// The spacecraft: a glowing cyan dot.
export const Craft: React.FC<{ x: number; y: number; r?: number; opacity?: number }> = ({ x, y, r = 9, opacity = 1 }) => (
  <g opacity={opacity} filter="url(#e3glow)">
    <circle cx={x} cy={y} r={r} fill={K.cyan} />
    <circle cx={x} cy={y} r={r * 0.45} fill={K.white} />
  </g>
);

// Horizontal speed gauge. `value` and `ghost` are in px of bar length; `kind` sets the line style.
export const SpeedBar: React.FC<{
  x: number;
  y: number;
  label: string;
  value: number;
  ghost?: number;
  ghostLabel?: string;
  kind: "planet" | "sun";
  opacity?: number;
  max?: number;
  note?: string;
  noteOpacity?: number;
}> = ({ x, y, label, value, ghost, ghostLabel, kind, opacity = 1, max = 520, note, noteOpacity = 1 }) => {
  const c = kind === "sun" ? K.white : K.cyan;
  return (
    <g opacity={opacity}>
      <T x={x} y={y - 22} size={24} color={kind === "sun" ? K.white : K.cyan} weight={700}>
        {label}
      </T>
      <rect x={x} y={y - 4} width={max} height={30} rx={6} fill={K.bg2} stroke={K.line} strokeWidth={2} />
      {kind === "sun" ? (
        <>
          <rect x={x} y={y + 1} width={Math.min(max, Math.max(0, value))} height={8} rx={3} fill={c} />
          <rect x={x} y={y + 13} width={Math.min(max, Math.max(0, value))} height={8} rx={3} fill={c} />
        </>
      ) : (
        <rect x={x} y={y + 1} width={Math.min(max, Math.max(0, value))} height={20} rx={4} fill={c} />
      )}
      {ghost !== undefined ? (
        <g>
          <line x1={x + ghost} y1={y - 12} x2={x + ghost} y2={y + 34} stroke={K.muted} strokeWidth={3} strokeDasharray="5 4" />
          {ghostLabel ? (
            <T x={x + ghost} y={y + 60} size={20} color={K.muted} anchor="middle" weight={600}>
              {ghostLabel}
            </T>
          ) : null}
        </g>
      ) : null}
      {note ? (
        <T x={x + max + 18} y={y + 20} size={26} color={c} weight={750} opacity={noteOpacity}>
          {note}
        </T>
      ) : null}
    </g>
  );
};

// Inset circle used to show a zoomed flyby against a solar-system map.
export const Inset: React.FC<{ x: number; y: number; r: number; opacity?: number; children: React.ReactNode; id: string }> = ({ x, y, r, opacity = 1, children, id }) => (
  <g opacity={opacity}>
    <defs>
      <clipPath id={id}>
        <circle cx={x} cy={y} r={r} />
      </clipPath>
    </defs>
    <circle cx={x} cy={y} r={r} fill={K.bg} fillOpacity={0.92} />
    <g clipPath={`url(#${id})`}>{children}</g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={K.muted} strokeOpacity={0.6} strokeWidth={2.5} />
  </g>
);
