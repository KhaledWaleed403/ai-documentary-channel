import React from "react";
import { useCurrentFrame } from "remotion";
import { easeOut, progress } from "../animations/timing";
import { fontFamily } from "../styles/theme";

export type CaptionCue = { start: number; end: number; lines: string[] };

type CaptionsProps = {
  cues: CaptionCue[];
  // Bottom edge of the caption block, in px from the top of the frame.
  bottom: number;
  color: string;
  // Translucent backing for contrast on any background.
  backing: string;
  fontSize?: number;
  // Words (lowercase, no punctuation) drawn in an accent colour.
  emphasis?: Record<string, string>;
  left?: number;
  right?: number;
};

const bare = (word: string) => word.toLowerCase().replace(/[^a-z0-9°'-]/g, "");

// Burned-in captions: one cue (one or two lines) at a time, with a short rise
// and fade so cue changes don't flash. Timing comes from the cue frames.
export const Captions: React.FC<CaptionsProps> = ({
  cues,
  bottom,
  color,
  backing,
  fontSize = 48,
  emphasis = {},
  left = 70,
  right = 150,
}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.start && frame < c.end);
  if (!cue) {
    return null;
  }
  const p = progress(frame, cue.start, 4, easeOut);
  return (
    <div
      style={{
        position: "absolute",
        left,
        right,
        top: 0,
        height: bottom,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 10}px)`,
          padding: `${fontSize * 0.22}px ${fontSize * 0.45}px`,
          borderRadius: fontSize * 0.4,
          backgroundColor: backing,
          fontFamily,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.22,
          textAlign: "center",
          color,
        }}
      >
        {cue.lines.map((line, i) => (
          <div key={i}>
            {line.split(" ").map((word, j) => (
              <span key={j} style={{ color: emphasis[bare(word)] ?? color }}>
                {j > 0 ? " " : ""}
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
