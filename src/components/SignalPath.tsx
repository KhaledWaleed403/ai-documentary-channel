import React from "react";

export type Point = readonly [number, number];

// Polyline path, optionally with a sine wiggle along each segment so it reads
// as a wave. `phase` shifts the wiggle to make it appear to travel.
export const wavyPath = (
  points: readonly Point[],
  amplitude = 0,
  wavelength = 48,
  phase = 0,
) => {
  if (amplitude === 0) {
    return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  }
  const parts: string[] = [];
  let travelled = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    for (let s = 0; s <= len; s += 4) {
      // Taper the wiggle to zero at each corner so reflections stay sharp.
      const taper = Math.min(1, s / 24, (len - s) / 24);
      const off =
        amplitude *
        taper *
        Math.sin(((travelled + s) / wavelength) * Math.PI * 2 - phase);
      const x = x1 + ux * s - uy * off;
      const y = y1 + uy * s + ux * off;
      parts.push(`${parts.length === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    travelled += len;
  }
  return parts.join(" ");
};

type SignalPathProps = {
  points: readonly Point[];
  // 0 → 1: how far along the path the signal has travelled.
  progress: number;
  stroke: string;
  width?: number;
  amplitude?: number;
  wavelength?: number;
  phase?: number;
  // If set, only a moving segment of this fraction of the path is drawn.
  tail?: number;
  opacity?: number;
};

// A path that draws on (or sends a pulse along itself) to show flow of a
// signal, wave or energy.
export const SignalPath: React.FC<SignalPathProps> = ({
  points,
  progress,
  stroke,
  width = 6,
  amplitude = 0,
  wavelength = 48,
  phase = 0,
  tail,
  opacity = 1,
}) => {
  let dashArray: string;
  let dashOffset = 0;
  if (tail === undefined) {
    dashArray = `${progress} 2`;
  } else {
    const head = progress * (1 + tail);
    const start = Math.max(0, head - tail);
    dashArray = `${Math.max(0, Math.min(1, head) - start)} 2`;
    dashOffset = -start;
  }
  return (
    <path
      d={wavyPath(points, amplitude, wavelength, phase)}
      pathLength={1}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
      opacity={opacity}
    />
  );
};
