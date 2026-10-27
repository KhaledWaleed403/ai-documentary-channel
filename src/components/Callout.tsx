import React from "react";
import { fontFamily } from "../styles/theme";

type CalloutProps = {
  // Label anchor position.
  x: number;
  y: number;
  // Point the leader line touches.
  tx: number;
  ty: number;
  label: string;
  // 0 → 1 appearance.
  progress: number;
  color: string;
  fontSize?: number;
  anchor?: "start" | "middle" | "end";
};

// SVG label with a leader line pointing at part of a scene.
export const Callout: React.FC<CalloutProps> = ({
  x,
  y,
  tx,
  ty,
  label,
  progress,
  color,
  fontSize = 52,
  anchor = "middle",
}) => {
  // Leader starts just below/above the text so it never crosses the label.
  const ly = ty > y ? y + fontSize * 0.35 : y - fontSize * 1.05;
  return (
    <g opacity={Math.min(1, progress * 1.5)}>
      <path
        d={`M${x} ${ly} L${tx} ${ty}`}
        pathLength={1}
        stroke={color}
        strokeWidth={4}
        strokeDasharray={`${progress} 2`}
        fill="none"
      />
      <circle cx={tx} cy={ty} r={9 * progress} fill={color} />
      <text
        x={x}
        y={y}
        fill={color}
        fontSize={fontSize}
        fontWeight={600}
        fontFamily={fontFamily}
        textAnchor={anchor}
      >
        {label}
      </text>
    </g>
  );
};
