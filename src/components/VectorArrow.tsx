import React from "react";

type VectorArrowProps = {
  // Tail position (SVG user units).
  x: number;
  y: number;
  // Vector components in SVG units (y grows downward, as in SVG).
  dx: number;
  dy: number;
  color: string;
  width?: number;
  // "open" = chevron head, "filled" = solid triangle head, "double" = two parallel shafts + filled head.
  head?: "open" | "filled" | "double";
  // 0 → 1 draw-on from the tail.
  draw?: number;
  opacity?: number;
  dashed?: boolean;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  // Label offset perpendicular to the arrow, in units (positive = left of travel direction on screen).
  labelOffset?: number;
  // Label position along the shaft, 0 (tail) → 1 (tip).
  labelAt?: number;
  fontFamily?: string;
};

// A velocity (or any) vector drawn as an arrow, with optional draw-on and label.
// Head style and line style carry meaning alongside colour.
export const VectorArrow: React.FC<VectorArrowProps> = ({
  x,
  y,
  dx,
  dy,
  color,
  width = 6,
  head = "filled",
  draw = 1,
  opacity = 1,
  dashed = false,
  label,
  labelColor,
  labelSize = 26,
  labelOffset = 34,
  labelAt = 0.5,
  fontFamily,
}) => {
  const len = Math.hypot(dx, dy);
  if (len < 1e-6 || draw <= 0) {
    return null;
  }
  const ux = dx / len;
  const uy = dy / len;
  const shown = len * draw;
  const hl = Math.min(width * 4.2, shown * 0.45);
  const hw = hl * 0.62;
  const tipX = x + ux * shown;
  const tipY = y + uy * shown;
  const baseX = tipX - ux * hl;
  const baseY = tipY - uy * hl;
  // Perpendicular (left of travel on screen).
  const px = uy;
  const py = -ux;
  const shaft =
    head === "double" ? (
      <>
        {[-1, 1].map((s) => (
          <line
            key={s}
            x1={x + px * s * width * 0.55}
            y1={y + py * s * width * 0.55}
            x2={baseX + px * s * width * 0.55}
            y2={baseY + py * s * width * 0.55}
            stroke={color}
            strokeWidth={width * 0.5}
            strokeLinecap="round"
          />
        ))}
      </>
    ) : (
      <line
        x1={x}
        y1={y}
        x2={head === "open" ? tipX - ux * width * 0.6 : baseX}
        y2={head === "open" ? tipY - uy * width * 0.6 : baseY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? `${width * 2.4} ${width * 1.8}` : undefined}
      />
    );
  const headPath =
    head === "open" ? (
      <path
        d={`M${baseX + px * hw} ${baseY + py * hw} L${tipX} ${tipY} L${baseX - px * hw} ${baseY - py * hw}`}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path d={`M${baseX + px * hw} ${baseY + py * hw} L${tipX} ${tipY} L${baseX - px * hw} ${baseY - py * hw} Z`} fill={color} />
    );
  const lx = x + ux * shown * labelAt + px * labelOffset;
  const ly = y + uy * shown * labelAt + py * labelOffset;
  return (
    <g opacity={opacity}>
      {shaft}
      {headPath}
      {label ? (
        <text x={lx} y={ly + labelSize * 0.35} fontFamily={fontFamily} fontSize={labelSize} fontWeight={650} fill={labelColor ?? color} textAnchor="middle">
          {label}
        </text>
      ) : null}
    </g>
  );
};
