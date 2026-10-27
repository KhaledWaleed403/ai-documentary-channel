import React from "react";
import { useCurrentFrame } from "remotion";
import { lerp, progress } from "../../animations/timing";
import { Point, SignalPath } from "../../components/SignalPath";
import { fontFamily, palette } from "../../styles/theme";
import { bowlSectionPath, SceneProps, Stage } from "./shared";

const SOUP_Y = 1112;
const BOWL = bowlSectionPath(540, 1080, 460, 240);
const SOUP = bowlSectionPath(540, 1080, 436, 228);

// Reflection paths from the inlet on the right wall, each ending where it
// enters the soup. Angles of incidence equal angles of reflection.
const RAYS: readonly Point[][] = [
  [
    [970, 700],
    [110, 940],
    [719, SOUP_Y],
  ],
  [
    [970, 700],
    [640, 520],
    [110, 809],
    [662, SOUP_Y],
  ],
  [
    [970, 700],
    [560, SOUP_Y],
  ],
];

// How far the fading part of each ray continues into the soup.
const INTO = 130;
const ZOOM_TARGET = { x: 600, y: 1150 };
const SCALE_LABELS = ["1 cm", "1 mm", "1 µm", "1 nm"];

// SH03: waves bounce off the metal walls and go into the food.
export const Sh03Bouncing: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const zoom = progress(frame, duration - 30, 30);
  const s = lerp(1, 3.6, zoom);
  const scaleIn = progress(frame, duration - 34, 8);
  const zoomTransform = `translate(${lerp(ZOOM_TARGET.x, 540, zoom)} ${lerp(ZOOM_TARGET.y, 960, zoom)}) scale(${s}) translate(${-ZOOM_TARGET.x} ${-ZOOM_TARGET.y})`;
  return (
    <Stage
      bg={palette.mistBlue}
      overlay={
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: scaleIn,
            fontFamily,
            fontSize: 44,
            fontWeight: 600,
            color: palette.inkNavy,
          }}
        >
          <div style={{ width: 200, height: 10, backgroundColor: palette.inkNavy, borderRadius: 5 }} />
          {SCALE_LABELS[Math.min(3, Math.floor(zoom * 4))]}
        </div>
      }
    >
      <defs>
        <clipPath id="sh03-soup">
          <path d={SOUP} />
        </clipPath>
        {RAYS.map((ray, i) => {
          const [ex, ey] = ray[ray.length - 1];
          const [px, py] = ray[ray.length - 2];
          const len = Math.hypot(ex - px, ey - py);
          return (
            <linearGradient
              key={i}
              id={`sh03-fade-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={ex}
              y1={ey}
              x2={ex + ((ex - px) / len) * INTO}
              y2={ey + ((ey - py) / len) * INTO}
            >
              <stop offset="0" stopColor={palette.signalTeal} stopOpacity={1} />
              <stop offset="1" stopColor={palette.signalTeal} stopOpacity={0} />
            </linearGradient>
          );
        })}
      </defs>
      <g transform={zoomTransform}>
        <rect x={110} y={520} width={860} height={820} fill={palette.warmIvory} stroke={palette.inkNavy} strokeWidth={14} />
        <rect x={970} y={676} width={70} height={48} fill={palette.inkNavy} />
        <path d={BOWL} fill={palette.warmIvory} stroke={palette.inkNavy} strokeWidth={8} />
        <g clipPath="url(#sh03-soup)">
          <rect x={0} y={SOUP_Y} width={1080} height={400} fill={palette.mistBlue} />
          <line x1={0} x2={1080} y1={SOUP_Y} y2={SOUP_Y} stroke={palette.inkNavy} strokeWidth={4} />
          {RAYS.map((ray, i) => {
            const [ex, ey] = ray[ray.length - 1];
            const [px, py] = ray[ray.length - 2];
            const len = Math.hypot(ex - px, ey - py);
            return (
              <line
                key={i}
                x1={ex}
                y1={ey}
                x2={ex + ((ex - px) / len) * INTO}
                y2={ey + ((ey - py) / len) * INTO}
                stroke={`url(#sh03-fade-${i})`}
                strokeWidth={8}
                strokeLinecap="round"
                opacity={progress(frame, 44 + i * 12, 14)}
              />
            );
          })}
        </g>
        {RAYS.map((ray, i) => (
          <SignalPath
            key={i}
            points={ray}
            progress={progress(frame, 6 + i * 12, 40)}
            stroke={palette.signalTeal}
            width={7}
            amplitude={10}
            wavelength={44}
            opacity={1 - zoom * 0.85}
          />
        ))}
      </g>
    </Stage>
  );
};
