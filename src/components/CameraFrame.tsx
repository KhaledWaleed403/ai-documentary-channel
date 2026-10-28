import React from "react";
import { AbsoluteFill } from "remotion";

type CameraFrameProps = {
  // Zoom factor (1 = framed as drawn).
  scale?: number;
  // Point of the frame (in px) that stays fixed while zooming.
  originX: number;
  originY: number;
  // Extra pan in px, applied after the zoom.
  panX?: number;
  panY?: number;
  // Tilt of the whole frame in degrees (used sparingly).
  rotate?: number;
  children: React.ReactNode;
};

// Wraps a full-frame layer in a slow camera move. The caller drives scale/pan
// from useCurrentFrame() so moves stay frame-accurate; keep to one move at a time.
export const CameraFrame: React.FC<CameraFrameProps> = ({
  scale = 1,
  originX,
  originY,
  panX = 0,
  panY = 0,
  rotate = 0,
  children,
}) => (
  <AbsoluteFill
    style={{
      transformOrigin: `${originX}px ${originY}px`,
      transform: `translate(${panX}px, ${panY}px) scale(${scale}) rotate(${rotate}deg)`,
    }}
  >
    {children}
  </AbsoluteFill>
);
