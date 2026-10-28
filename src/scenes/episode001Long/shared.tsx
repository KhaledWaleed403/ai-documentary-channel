// Shared stage, timing helpers and drawings for the Episode 001 long-form
// (16:9, 1920×1080). Visual proxies: teal = waves/field, orange = heating,
// gold = hot/highlight, mist blue = cold, ivory = 1940s paper layers.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { lerp, mixColor, progress, wobble } from "../../animations/timing";
import type { LongShot } from "../../data/episode001Long";
import { fontFamily, palette } from "../../styles/theme";

export const W = 1920;
export const H = 1080;
export const C = palette;
// Supporting tones for the navy stage.
export const INK_2 = "#1B2638";
export const INK_3 = "#24324A";
export const LINE = "#3A4B66";

export type SceneProps = {
  shot: LongShot;
  duration: number;
};

// Local timing for a shot: frame, the frame of each storyboard visual beat,
// and the narration window, all relative to the shot's first frame.
export const useShotTime = (shot: LongShot) => {
  const f = useCurrentFrame();
  const beat = (i: number) => {
    const b = shot.visualTimeline[i];
    if (!b) {
      throw new Error(`${shot.id} has no visual beat #${i}`);
    }
    return b.frame - shot.startFrame;
  };
  return {
    f,
    beat,
    speech: shot.speechStartFrame - shot.startFrame,
    speechEnd: shot.speechEndFrame - shot.startFrame,
    length: shot.endFrame - shot.startFrame,
  };
};

export const Stage: React.FC<{
  children: React.ReactNode;
  overlay?: React.ReactNode;
  grid?: boolean;
  bg?: string;
}> = ({ children, overlay, grid = false, bg = C.inkNavy }) => (
  <AbsoluteFill style={{ backgroundColor: bg }}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor="#1A2436" stopOpacity={1} />
          <stop offset="100%" stopColor={bg} stopOpacity={1} />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0 L0 0 0 60" fill="none" stroke={C.warmIvory} strokeOpacity={0.045} strokeWidth={2} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#vignette)" />
      {grid ? <rect width={W} height={H} fill="url(#grid)" /> : null}
      {children}
    </svg>
    {overlay}
  </AbsoluteFill>
);

export const Txt: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  opacity?: number;
  italic?: boolean;
}> = ({ x, y, children, size = 44, color = C.warmIvory, anchor = "middle", weight = 600, opacity = 1, italic = false }) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontSize={size}
    fontFamily={fontFamily}
    fontWeight={weight}
    textAnchor={anchor}
    opacity={opacity}
    fontStyle={italic ? "italic" : undefined}
  >
    {children}
  </text>
);

// Pill tag drawn in SVG (e.g. "analogy", "simplified").
export const Tag: React.FC<{ x: number; y: number; text: string; opacity?: number; color?: string; size?: number }> = ({
  x,
  y,
  text,
  opacity = 1,
  color = C.mistBlue,
  size = 30,
}) => {
  const w = text.length * size * 0.56 + 44;
  return (
    <g opacity={opacity}>
      <rect x={x - w / 2} y={y - size * 0.95} width={w} height={size * 1.45} rx={size * 0.72} fill="rgba(17,24,39,0.85)" stroke={color} strokeWidth={3} />
      <Txt x={x} y={y + size * 0.05} size={size} color={color} weight={600}>
        {text}
      </Txt>
    </g>
  );
};

// Rubber-stamp style verdict ("NO") that slams in.
export const Stamp: React.FC<{ x: number; y: number; text: string; p: number; color?: string; rotate?: number }> = ({
  x,
  y,
  text,
  p,
  color = C.energyOrange,
  rotate = -8,
}) => {
  const s = lerp(1.6, 1, p);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} opacity={p}>
      <rect x={-text.length * 34 - 30} y={-62} width={text.length * 68 + 60} height={96} rx={10} fill="none" stroke={color} strokeWidth={8} />
      <Txt x={0} y={14} size={72} color={color} weight={800}>
        {text}
      </Txt>
    </g>
  );
};

// Generic engineer silhouette in a lab coat (no likeness).
export const Silhouette: React.FC<{ x: number; y: number; s?: number; opacity?: number }> = ({ x, y, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <circle cx={0} cy={-300} r={52} fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={4} />
    <path
      d="M-70 -236 Q0 -260 70 -236 L110 -60 L96 160 L40 160 L22 -20 L-22 -20 L-40 160 L-96 160 L-110 -60 Z"
      fill={INK_3}
      stroke={C.warmIvory}
      strokeOpacity={0.6}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M0 -236 L-18 -120 M0 -236 L18 -120" stroke={C.warmIvory} strokeOpacity={0.35} strokeWidth={3} />
    <rect x={30} y={-120} width={58} height={44} rx={6} fill="none" stroke={C.warmIvory} strokeOpacity={0.45} strokeWidth={3} />
  </g>
);

// Plain wrapped candy bar; sag 0..1 droops the ends (melting), no brand.
export const CandyBar: React.FC<{ x: number; y: number; w?: number; sag?: number; rotate?: number; opacity?: number }> = ({
  x,
  y,
  w = 260,
  sag = 0,
  rotate = 0,
  opacity = 1,
}) => {
  const h = w * 0.28;
  const d = sag * h * 0.9;
  const body = `M${-w / 2} ${-h / 2 + d} Q0 ${-h / 2 - d * 0.35} ${w / 2} ${-h / 2 + d} L${w / 2} ${h / 2 + d} Q0 ${h / 2 - d * 0.35} ${-w / 2} ${h / 2 + d} Z`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={opacity}>
      <path d={body} fill="#C9B79A" stroke={C.warmIvory} strokeWidth={4} strokeLinejoin="round" />
      <path d={`M${-w * 0.2} ${-h / 2 + d * 0.3} L${-w * 0.2} ${h / 2 + d * 0.3} M${w * 0.2} ${-h / 2 + d * 0.3} L${w * 0.2} ${h / 2 + d * 0.3}`} stroke="#A8936F" strokeWidth={4} />
      {[-1, 1].map((side) => (
        <path
          key={side}
          d={`M${(side * w) / 2} ${-h / 2 + d} l${side * 18} 8 l${-side * 8} 10 l${side * 8} 10 l${-side * 8} 10 l${side * 8} 10 L${(side * w) / 2} ${h / 2 + d}`}
          fill="#C9B79A"
          stroke={C.warmIvory}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
};

// Magnetron drawn as a labelled schematic block: no invented internals.
export const MagnetronBlock: React.FC<{ x: number; y: number; w?: number; h?: number; glow?: number; label?: boolean }> = ({
  x,
  y,
  w = 220,
  h = 150,
  glow = 0,
  label = true,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 10} y={-h / 2 - 10} width={w + 20} height={h + 20} rx={22} fill={C.signalTeal} opacity={glow * 0.35} filter="url(#soft)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={INK_3} stroke={mixColor(LINE, C.signalTeal, glow)} strokeWidth={6} />
    {[-0.3, 0, 0.3].map((k) => (
      <path key={k} d={`M${k * w - 14} ${-h / 2 + 18} L${k * w - 14} ${h / 2 - 18} M${k * w + 14} ${-h / 2 + 18} L${k * w + 14} ${h / 2 - 18}`} stroke={LINE} strokeWidth={4} />
    ))}
    {label ? (
      <Txt x={0} y={h / 2 + 56} size={36} color={C.mistBlue}>
        magnetron
      </Txt>
    ) : null}
  </g>
);

// Expanding dashed ripples: conceptual "invisible waves" (not the real field shape).
export const Ripples: React.FC<{
  x: number;
  y: number;
  t: number;
  maxR?: number;
  count?: number;
  speed?: number;
  opacity?: number;
  dashed?: boolean;
  clip?: string;
}> = ({ x, y, t, maxR = 700, count = 5, speed = 6, opacity = 1, dashed = true, clip }) => (
  <g opacity={opacity} clipPath={clip}>
    {Array.from({ length: count }).map((_, i) => {
      const r = (t * speed + (i * maxR) / count) % maxR;
      const fade = 1 - r / maxR;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={Math.max(1, r)}
          fill="none"
          stroke={C.signalTeal}
          strokeWidth={5}
          strokeDasharray={dashed ? "18 16" : undefined}
          opacity={fade * Math.min(1, t / 20)}
        />
      );
    })}
  </g>
);

// V-shaped water molecule; angle in degrees (0 = hydrogens pointing right).
export const Molecule: React.FC<{ x: number; y: number; angle: number; s?: number; labels?: number; color?: string }> = ({
  x,
  y,
  angle,
  s = 1,
  labels = 0,
  color = C.mistBlue,
}) => {
  const hx = Math.cos((52 * Math.PI) / 180) * 70;
  const hy = Math.sin((52 * Math.PI) / 180) * 70;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
      <path d={`M0 0 L${hx} ${-hy} M0 0 L${hx} ${hy}`} stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={8} />
      <circle cx={0} cy={0} r={40} fill={color} stroke={C.inkNavy} strokeWidth={4} />
      <circle cx={hx} cy={-hy} r={24} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
      <circle cx={hx} cy={hy} r={24} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
      {labels > 0 ? (
        <g opacity={labels}>
          <g transform={`rotate(${-angle})`}>
            <Txt x={0} y={14} size={48} color={C.inkNavy} weight={800}>
              −
            </Txt>
          </g>
          <g transform={`translate(${hx + 44} 0) rotate(${-angle})`}>
            <Txt x={0} y={16} size={48} color={C.discoveryGold} weight={800}>
              +
            </Txt>
          </g>
        </g>
      ) : null}
    </g>
  );
};

// A row of field arrows whose length/direction follow `field` in [-1, 1].
export const FieldArrows: React.FC<{ x0: number; x1: number; y: number; n?: number; field: number; opacity?: number; len?: number }> = ({
  x0,
  x1,
  y,
  n = 7,
  field,
  opacity = 1,
  len = 90,
}) => (
  <g opacity={opacity}>
    {Array.from({ length: n }).map((_, i) => {
      const x = lerp(x0, x1, n === 1 ? 0.5 : i / (n - 1));
      const L = len * field;
      const head = Math.sign(L) * Math.min(26, Math.abs(L));
      return (
        <path
          key={i}
          d={`M${x - L / 2} ${y} L${x + L / 2} ${y} M${x + L / 2} ${y} L${x + L / 2 - head} ${y - 16} M${x + L / 2} ${y} L${x + L / 2 - head} ${y + 16}`}
          stroke={C.signalTeal}
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
      );
    })}
  </g>
);

// Modern countertop oven, front-on, centred at (x, y); w is the body width.
export const OvenFront: React.FC<{ x: number; y: number; w?: number; inside?: React.ReactNode; glass?: number; timer?: string }> = ({
  x,
  y,
  w = 900,
  inside,
  glass = 0.85,
  timer,
}) => {
  const h = w * 0.56;
  const winW = w * 0.62;
  const winH = h * 0.66;
  const wx = -w / 2 + w * 0.07;
  const wy = -winH / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id="ovenWindow">
          <rect x={wx} y={wy} width={winW} height={winH} rx={18} />
        </clipPath>
      </defs>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={6} />
      <rect x={wx} y={wy} width={winW} height={winH} rx={18} fill="#0B111C" />
      <g clipPath="url(#ovenWindow)">{inside}</g>
      <rect x={wx} y={wy} width={winW} height={winH} rx={18} fill={INK_2} opacity={glass * 0.35} stroke={LINE} strokeWidth={5} />
      <rect x={w * 0.24} y={-h / 2 + h * 0.12} width={w * 0.18} height={h * 0.16} rx={10} fill="#0B111C" stroke={LINE} strokeWidth={4} />
      {timer ? (
        <Txt x={w * 0.33} y={-h / 2 + h * 0.24} size={w * 0.05} color={C.signalTeal} weight={700}>
          {timer}
        </Txt>
      ) : null}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={w * 0.25 + (i % 3) * w * 0.055} y={-h / 2 + h * 0.36 + Math.floor(i / 3) * h * 0.1} width={w * 0.04} height={h * 0.065} rx={6} fill={LINE} />
      ))}
      <rect x={w * 0.25} y={-h / 2 + h * 0.7} width={w * 0.15} height={h * 0.09} rx={8} fill={LINE} stroke={C.signalTeal} strokeOpacity={0.6} strokeWidth={3} />
    </g>
  );
};

// Bowl of soup seen from the side (cross-section style or plain).
export const SoupBowl: React.FC<{ x: number; y: number; w: number; soup: string; opacity?: number }> = ({ x, y, w, soup, opacity = 1 }) => {
  const h = w * 0.42;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <path d={`M${-w / 2} 0 Q${-w / 2} ${h} ${-w * 0.18} ${h} L${w * 0.18} ${h} Q${w / 2} ${h} ${w / 2} 0 Z`} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={5} />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.1} fill={soup} stroke={C.inkNavy} strokeWidth={5} />
    </g>
  );
};

// Heat colour ramp: 0 = cold (mist blue), 0.6 = heating (orange), 1 = hot (gold).
export const heatColor = (h: number) =>
  h < 0.6 ? mixColor(C.mistBlue, C.energyOrange, Math.max(0, h) / 0.6) : mixColor(C.energyOrange, C.discoveryGold, Math.min(1, (h - 0.6) / 0.4));

// Partial, out-of-sync twist of molecule i at frame t following field phase.
export const twist = (t: number, i: number, amount: number) => {
  const lag = 0.35 + 0.25 * Math.sin(i * 1.7);
  return amount * 38 * Math.sin(t * 0.18 - lag * 3 + i * 0.6) + 10 * wobble(t, i);
};

export { progress, lerp, mixColor, wobble };
