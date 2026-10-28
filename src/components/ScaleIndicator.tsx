import React from "react";
import { fontFamily, palette } from "../styles/theme";

type ScaleIndicatorProps = {
  // Labels the indicator steps through, e.g. ["cm", "mm", "µm", "nm"].
  steps: string[];
  // 0 → 1: position along the steps (fractional values blend two labels).
  progress: number;
  // Optional fixed caption, e.g. "slowed ~2,500,000,000×".
  caption?: string;
  x: number;
  y: number;
  opacity?: number;
  color?: string;
};

// Scale/timescale readout for magnified or slowed-down views: a short ruler
// whose unit label steps down as the camera zooms in.
export const ScaleIndicator: React.FC<ScaleIndicatorProps> = ({
  steps,
  progress,
  caption,
  x,
  y,
  opacity = 1,
  color = palette.warmIvory,
}) => {
  const pos = Math.max(0, Math.min(1, progress)) * (steps.length - 1);
  const i = Math.floor(pos);
  const frac = pos - i;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity, fontFamily, color }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width={160} height={28}>
          <path d="M4 6 V22 M156 6 V22 M4 14 H156" stroke={color} strokeWidth={4} fill="none" />
        </svg>
        <div style={{ position: "relative", width: 110, height: 44, fontSize: 38, fontWeight: 600 }}>
          <span style={{ position: "absolute", left: 0, opacity: 1 - frac }}>{steps[i]}</span>
          {i + 1 < steps.length ? (
            <span style={{ position: "absolute", left: 0, opacity: frac }}>{steps[i + 1]}</span>
          ) : null}
        </div>
      </div>
      {caption ? <div style={{ fontSize: 30, opacity: 0.85, marginTop: 6 }}>{caption}</div> : null}
    </div>
  );
};
