import React from "react";
import { fontFamily, palette } from "../styles/theme";

type Step = {
  label: string;
  // Optional SVG drawn above the node, in coordinates relative to the node.
  icon?: React.ReactNode;
};

type StepDiagramProps = {
  steps: Step[];
  // Appearance progress (0 → 1) of each step; the last step with progress > 0
  // is "current" and highlighted, earlier ones dim.
  reveal: number[];
  x: number;
  y: number;
  spacing: number;
  accent?: string;
  color?: string;
};

// Step-by-step row: connectors draw on, the current step is highlighted, past
// steps dim and future steps stay hidden. SVG; place inside an <svg>.
export const StepDiagram: React.FC<StepDiagramProps> = ({
  steps,
  reveal,
  x,
  y,
  spacing,
  accent = palette.signalTeal,
  color = palette.warmIvory,
}) => {
  const current = reveal.reduce((c, p, i) => (p > 0 ? i : c), -1);
  return (
    <g>
      {steps.map((step, i) => {
        const p = reveal[i] ?? 0;
        const cx = x + i * spacing;
        const isCurrent = i === current;
        const dim = i < current ? 0.45 : 1;
        return (
          <g key={step.label} opacity={p * dim}>
            {i > 0 ? (
              <path
                d={`M${cx - spacing + 40} ${y} L${cx - 40} ${y}`}
                pathLength={1}
                strokeDasharray={`${p} 2`}
                stroke={color}
                strokeWidth={4}
                fill="none"
              />
            ) : null}
            <circle cx={cx} cy={y} r={isCurrent ? 22 : 16} fill={isCurrent ? accent : "none"} stroke={isCurrent ? accent : color} strokeWidth={5} />
            {step.icon ? <g transform={`translate(${cx} ${y - 130})`}>{step.icon}</g> : null}
            <text x={cx} y={y + 74} fill={color} fontFamily={fontFamily} fontSize={40} fontWeight={600} textAnchor="middle">
              {step.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
