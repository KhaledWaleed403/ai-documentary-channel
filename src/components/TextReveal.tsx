import React from "react";
import { useCurrentFrame } from "remotion";
import { easeOut, progress } from "../animations/timing";
import { fontFamily } from "../styles/theme";

type TextRevealProps = {
  text: string;
  // Local frame at which the first word starts to appear.
  start: number;
  top: number;
  color: string;
  fontSize?: number;
  fontWeight?: number;
  // Frames between words.
  stagger?: number;
  // Local frame at which the whole line fades out (optional).
  exit?: number;
};

// Centred headline whose words rise and fade in one after another.
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  start,
  top,
  color,
  fontSize = 80,
  fontWeight = 700,
  stagger = 4,
  exit,
}) => {
  const frame = useCurrentFrame();
  const out = exit === undefined ? 1 : 1 - progress(frame, exit, 10);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 60,
        right: 60,
        textAlign: "center",
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight: 1.15,
        color,
        opacity: out,
      }}
    >
      {text.split(" ").map((word, i) => {
        const p = progress(frame, start + i * stagger, 14, easeOut);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 28}px)`,
              marginRight: "0.25em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
