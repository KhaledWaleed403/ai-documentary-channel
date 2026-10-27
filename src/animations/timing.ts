import { Easing, interpolate, interpolateColors } from "remotion";

export const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// 0 → 1 over [start, start + duration], clamped on both sides.
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = easeInOut,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const mixColor = (from: string, to: string, t: number) =>
  interpolateColors(t, [0, 1], [from, to]);

// Deterministic smooth wobble in roughly [-1, 1]; seed separates elements.
export const wobble = (t: number, seed: number) =>
  Math.sin(t * 0.21 + seed * 1.7) * 0.6 + Math.sin(t * 0.53 + seed * 4.1) * 0.4;
