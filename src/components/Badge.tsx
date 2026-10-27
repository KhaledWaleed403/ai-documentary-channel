import React from "react";
import { fontFamily, palette } from "../styles/theme";

type BadgeProps = {
  text: string;
  top: number;
  opacity?: number;
};

// Small pill label, readable on light and dark backgrounds (e.g. the
// "Schematic · not to scale" disclaimer on conceptual visuals).
export const Badge: React.FC<BadgeProps> = ({ text, top, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      opacity,
    }}
  >
    <div
      style={{
        fontFamily,
        fontSize: 38,
        fontWeight: 600,
        letterSpacing: 1,
        color: palette.warmIvory,
        backgroundColor: "rgba(17, 24, 39, 0.82)",
        border: `2px solid ${palette.mistBlue}`,
        borderRadius: 999,
        padding: "12px 32px",
      }}
    >
      {text}
    </div>
  </div>
);
