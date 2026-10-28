// Shared vertical stage (1080×1920) for the Episode 001 Shorts batch. Same
// visual proxies as the long-form: teal = waves, orange = heating, gold = hot,
// mist blue = cold, ivory = 1940s paper. Drawings are reused read-only from the
// long-form (`episode001Long/shared`) and the original Short (`Thermometer`).
// Safe area: on-screen text stays within y 160–1480 and x 70–930 (Shorts UI
// covers the bottom ~20% and the right edge).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { ShortShot } from "../../data/episode001Shorts";
import { fontFamily, palette } from "../../styles/theme";

export const W = 1080;
export const H = 1920;
export const C = palette;
export const INK_2 = "#1B2638";
export const INK_3 = "#24324A";
export const LINE = "#3A4B66";

export type ShortSceneProps = {
  shot: ShortShot;
  duration: number;
};

// Local timing for a shot: frame, named beat frames (relative to the shot's
// first frame) and the narration window.
export const useShotTime = (shot: ShortShot) => {
  const f = useCurrentFrame();
  const beat = (id: string) => {
    const b = shot.beats.find((x) => x.id === id);
    if (!b) {
      throw new Error(`${shot.id} has no beat "${id}"`);
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

export const VStage: React.FC<{
  children: React.ReactNode;
  overlay?: React.ReactNode;
  grid?: boolean;
  bg?: string;
}> = ({ children, overlay, grid = true, bg = C.inkNavy }) => (
  <AbsoluteFill style={{ backgroundColor: bg }}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="vignette" cx="50%" cy="42%" r="70%">
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

// Mobile-sized SVG text (default 56 px; nothing below 40 px on screen).
export const T: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  opacity?: number;
}> = ({ x, y, children, size = 56, color = C.warmIvory, anchor = "middle", weight = 700, opacity = 1 }) => (
  <text x={x} y={y} fill={color} fontSize={size} fontFamily={fontFamily} fontWeight={weight} textAnchor={anchor} opacity={opacity}>
    {children}
  </text>
);

// Rounded caption chip. Width is estimated from the text length.
export const Chip: React.FC<{ x: number; y: number; text: string; p: number; color?: string; size?: number; fill?: string }> = ({
  x,
  y,
  text,
  p,
  color = C.mistBlue,
  size = 46,
  fill = "rgba(17,24,39,0.9)",
}) => {
  const w = text.length * size * 0.55 + 70;
  return (
    <g opacity={p} transform={`translate(${x} ${y + (1 - p) * 24})`}>
      <rect x={-w / 2} y={-size * 1.0} width={w} height={size * 1.6} rx={size * 0.8} fill={fill} stroke={color} strokeWidth={4} />
      <T x={0} y={size * 0.12} size={size} color={color}>
        {text}
      </T>
    </g>
  );
};

// Headline card: a numbered or plain title bar at the top of the frame.
export const Headline: React.FC<{ text: string; p: number; y?: number; color?: string; size?: number }> = ({
  text,
  p,
  y = 300,
  color = C.warmIvory,
  size = 64,
}) => (
  <g opacity={p} transform={`translate(0 ${(1 - p) * 30})`}>
    <T x={W / 2} y={y} size={size} color={color} weight={800}>
      {text}
    </T>
  </g>
);

// Tick / cross badges.
export const Tick: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 40 }) => (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}>
    <circle r={r} fill={C.signalTeal} />
    <path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.38} L${r * 0.5} ${-r * 0.35}`} stroke={C.inkNavy} strokeWidth={r * 0.22} fill="none" strokeLinecap="round" />
  </g>
);

export const Cross: React.FC<{ x: number; y: number; p: number; r?: number; color?: string }> = ({ x, y, p, r = 40, color = C.energyOrange }) => (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}>
    <circle r={r} fill={color} />
    <path d={`M${-r * 0.38} ${-r * 0.38} L${r * 0.38} ${r * 0.38} M${r * 0.38} ${-r * 0.38} L${-r * 0.38} ${r * 0.38}`} stroke={C.inkNavy} strokeWidth={r * 0.22} strokeLinecap="round" />
  </g>
);

// Small "wave" icon (three wavy lines); crossed out when `off` > 0.
export const WaveIcon: React.FC<{ x: number; y: number; s?: number; off?: number; opacity?: number }> = ({ x, y, s = 1, off = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    {[-28, 0, 28].map((dy) => (
      <path key={dy} d={`M-60 ${dy} q15 -16 30 0 t30 0 t30 0 t30 0`} fill="none" stroke={C.signalTeal} strokeWidth={8} strokeLinecap="round" />
    ))}
    <path d="M-72 -56 L72 56" stroke={C.energyOrange} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${off} 2`} />
  </g>
);

// Simple analogue clock; `t` advances the hand (frames).
export const Clock: React.FC<{ x: number; y: number; r?: number; t: number; opacity?: number }> = ({ x, y, r = 80, t, opacity = 1 }) => {
  const a = (t * 6 * Math.PI) / 180;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <circle r={r} fill={INK_3} stroke={C.warmIvory} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => {
        const b = (i * 30 * Math.PI) / 180;
        return <path key={i} d={`M${Math.sin(b) * r * 0.78} ${-Math.cos(b) * r * 0.78} L${Math.sin(b) * r * 0.9} ${-Math.cos(b) * r * 0.9}`} stroke={LINE} strokeWidth={4} />;
      })}
      <path d={`M0 0 L${r * 0.68 * Math.sin(a)} ${-r * 0.68 * Math.cos(a)}`} stroke={C.discoveryGold} strokeWidth={8} strokeLinecap="round" />
      <circle r={8} fill={C.discoveryGold} />
    </g>
  );
};
