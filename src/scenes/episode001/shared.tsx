// Episode-specific drawings (microwave, bowl, thermometer). All SVG, drawn in
// the 1080×1920 frame's coordinate space.
import React from "react";
import { AbsoluteFill } from "remotion";
import type { Shot } from "../../data/episode001";
import { palette } from "../../styles/theme";

export const W = 1080;
export const H = 1920;

export type SceneProps = {
  shot: Shot;
  // Nominal shot length in frames; scenes may be rendered a few frames longer
  // while the next shot fades in, and should simply hold their final state.
  duration: number;
};

export const Stage: React.FC<{
  bg: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}> = ({ bg, children, overlay }) => (
  <AbsoluteFill style={{ backgroundColor: bg }}>
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      style={{ position: "absolute", inset: 0 }}
    >
      {children}
    </svg>
    {overlay}
  </AbsoluteFill>
);

// Front-on microwave. Coordinates of children are relative to its centre.
// Cooking window spans x -370..190, y -220..220.
export const MicrowaveFront: React.FC<{
  id: string;
  x: number;
  y: number;
  scale?: number;
  // 0 = closed, 1 = fully open.
  doorOpen: number;
  // Drawn inside the window, clipped to it.
  interior?: React.ReactNode;
  // Drawn above the window but below the door, not clipped.
  between?: React.ReactNode;
}> = ({ id, x, y, scale = 1, doorOpen, interior, between }) => {
  const clipId = `${id}-window`;
  const doorScale = 1 - doorOpen * 0.93;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={-370} y={-220} width={560} height={440} rx={20} />
        </clipPath>
      </defs>
      <rect
        x={-410}
        y={-260}
        width={820}
        height={520}
        rx={36}
        fill={palette.mistBlue}
        stroke={palette.inkNavy}
        strokeWidth={8}
      />
      <rect x={-370} y={-220} width={560} height={440} rx={20} fill={palette.inkNavy} />
      <g clipPath={`url(#${clipId})`}>{interior}</g>
      {between}
      {/* Door hinged on the left edge. */}
      <g transform={`translate(-392 0) scale(${doorScale} 1) translate(392 0)`}>
        <rect
          x={-392}
          y={-242}
          width={604}
          height={484}
          rx={24}
          fill={palette.mistBlue}
          fillOpacity={0.18}
          stroke={palette.inkNavy}
          strokeWidth={7}
        />
        <line x1={170} y1={-150} x2={170} y2={150} stroke={palette.inkNavy} strokeWidth={10} strokeLinecap="round" />
      </g>
      {[-130, -60, 10].map((cy) => (
        <circle key={cy} cx={300} cy={cy} r={16} fill={palette.inkNavy} />
      ))}
      <rect x={250} y={90} width={100} height={36} rx={18} fill={palette.inkNavy} />
    </g>
  );
};

// Bowl seen from the front; (x, y) is the centre of the rim.
export const BowlFront: React.FC<{
  x: number;
  y: number;
  w: number;
  soup: string;
  bowl?: string;
  stroke?: string;
  opacity?: number;
}> = ({ x, y, w, soup, bowl = palette.warmIvory, stroke = palette.inkNavy, opacity = 1 }) => {
  const h = w * 0.4;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <path
        d={`M${-w / 2} 0 Q${-w / 2} ${h} ${-w * 0.18} ${h} L${w * 0.18} ${h} Q${w / 2} ${h} ${w / 2} 0 Z`}
        fill={bowl}
        stroke={stroke}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.11} fill={soup} stroke={stroke} strokeWidth={6} />
    </g>
  );
};

// Bowl cross-section outline (cx = centre, rimY = rim height).
export const bowlSectionPath = (cx: number, rimY: number, w: number, depth: number) => {
  const l = cx - w / 2;
  const r = cx + w / 2;
  return `M${l} ${rimY} C${l} ${rimY + depth * 0.9} ${cx - w * 0.25} ${rimY + depth} ${cx} ${rimY + depth} C${cx + w * 0.25} ${rimY + depth} ${r} ${rimY + depth * 0.9} ${r} ${rimY} Z`;
};

export const Thermometer: React.FC<{
  x: number;
  // Centre of the tube.
  y: number;
  h: number;
  level: number;
  outline: string;
  fill: string;
  empty: string;
}> = ({ x, y, h, level, outline, fill, empty }) => {
  const tubeW = h * 0.16;
  const bulbR = h * 0.15;
  const top = y - h / 2;
  const bulbY = y + h / 2;
  const tubeLen = h - bulbR * 0.6;
  const fillH = tubeLen * Math.max(0.05, Math.min(1, level));
  return (
    <g>
      <rect x={x - tubeW / 2} y={top} width={tubeW} height={h} rx={tubeW / 2} fill={empty} stroke={outline} strokeWidth={5} />
      <circle cx={x} cy={bulbY} r={bulbR} fill={fill} stroke={outline} strokeWidth={5} />
      <rect
        x={x - tubeW / 2 + 7}
        y={bulbY - fillH}
        width={tubeW - 14}
        height={fillH}
        rx={(tubeW - 14) / 2}
        fill={fill}
      />
    </g>
  );
};
