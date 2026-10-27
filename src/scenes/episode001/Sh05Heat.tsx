import React from "react";
import { useCurrentFrame } from "remotion";
import { lerp, mixColor, progress } from "../../animations/timing";
import { Point, SignalPath } from "../../components/SignalPath";
import { fontFamily, palette } from "../../styles/theme";
import { MoleculeField } from "./molecules";
import { bowlSectionPath, SceneProps, Stage, Thermometer } from "./shared";

// Frame (local) where the close-up cuts to the soup cross-section.
const CUT = 135;
const CUT_FADE = 10;
// SH04 length, so the field keeps its rhythm across the shot change.
const FIELD_OFFSET = 240;

const SOUP_Y = 880;
const SOUP = bowlSectionPath(540, 840, 760, 480);
const BOWL = bowlSectionPath(540, 840, 800, 500);
const LAYERS = 16;
// Layers are shrunk copies of the soup shape around this point, scaled so
// each layer sits about the same distance in from the top surface, the sides
// and the bottom (the waves enter through all of them).
const CENTRE = { x: 540, y: 1100 };
const HALF_W = 380;
const HALF_H = 220;
// Outer fraction of depth that the waves reach directly.
const REACH = 0.38;

const heatColor = (w: number) =>
  w < 0.75
    ? mixColor(palette.mistBlue, palette.energyOrange, w / 0.75)
    : mixColor(palette.energyOrange, palette.discoveryGold, (w - 0.75) / 0.25);

// Warmth of a layer at depth d (0 = surface, 1 = centre) at local frame f.
// Outer zone warms directly where waves are absorbed; deeper layers warm
// later and less as heat spreads from warmer to cooler regions.
const warmth = (d: number, f: number) => {
  if (d <= REACH) {
    return progress(f, CUT + 12, 70) * (1 - 0.25 * (d / REACH));
  }
  const depthBeyond = (d - REACH) / (1 - REACH);
  return 0.72 * progress(f, CUT + 45 + depthBeyond * 50, 80) * (1 - 0.35 * depthBeyond);
};

// Incoming waves: from above (through the surface) and through the bowl sides.
// `enter` is the fraction along the line where it crosses into the soup; each
// line ends (fully faded) at about the inner edge of the directly heated zone.
const WAVES: { pts: readonly Point[]; enter: number }[] = [
  { pts: [[360, 640], [360, 965]], enter: 0.74 },
  { pts: [[540, 640], [540, 965]], enter: 0.74 },
  { pts: [[720, 640], [720, 965]], enter: 0.74 },
  { pts: [[20, 1050], [250, 1075]], enter: 0.63 },
  { pts: [[1060, 1050], [830, 1075]], enter: 0.63 },
];

// SH05: tugging and bumping turn the waves' energy into heat; the waves reach
// partway in and heat spreads the rest of the way.
export const Sh05Heat: React.FC<SceneProps> = ({ shot, duration }) => {
  const frame = useCurrentFrame();
  const [label] = shot.onScreenText;
  const bg = mixColor(palette.inkNavy, palette.warmIvory, progress(frame, 0, 30));
  const closeUp = 1 - progress(frame, CUT, CUT_FADE);
  const section = progress(frame, CUT, CUT_FADE);
  const tilt = progress(frame, duration - 20, 20);
  const waveIn = progress(frame, CUT + 4, 16) * (1 - progress(frame, duration - 40, 20));
  return (
    <Stage
      bg={bg}
      overlay={
        <div
          style={{
            position: "absolute",
            top: 410,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily,
            fontSize: 46,
            fontWeight: 600,
            fontStyle: "italic",
            color: palette.inkNavy,
            opacity: progress(frame, 35, 15) * closeUp,
          }}
        >
          {label}
        </div>
      }
    >
      <defs>
        <radialGradient id="sh05-warm" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor={palette.energyOrange} stopOpacity={0.5} />
          <stop offset="1" stopColor={palette.energyOrange} stopOpacity={0} />
        </radialGradient>
        <clipPath id="sh05-soup">
          <path d={SOUP} />
        </clipPath>
        <clipPath id="sh05-below-surface">
          <rect x={0} y={SOUP_Y} width={1080} height={1000} />
        </clipPath>
        {WAVES.map((w, i) => {
          const [[x1, y1], [x2, y2]] = w.pts;
          return (
            <linearGradient key={i} id={`sh05-wave-${i}`} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
              <stop offset={0} stopColor={palette.signalTeal} stopOpacity={1} />
              <stop offset={w.enter} stopColor={palette.signalTeal} stopOpacity={1} />
              <stop offset={1} stopColor={palette.signalTeal} stopOpacity={0} />
            </linearGradient>
          );
        })}
      </defs>

      {closeUp > 0 ? (
        <g opacity={closeUp}>
          {/* Heat shown only as a colour wash and a thermometer. */}
          <rect x={0} y={0} width={1080} height={1920} fill="url(#sh05-warm)" opacity={progress(frame, 20, 110)} />
          <MoleculeField
            t={frame + FIELD_OFFSET}
            jitter={lerp(0.45, 1, progress(frame, 0, 40))}
            appear={1}
            arrowOpacity={0.55}
            outline={palette.inkNavy}
          />
          <Thermometer
            x={540}
            y={1450}
            h={170}
            level={lerp(0.2, 0.8, progress(frame, 15, 115))}
            outline={palette.inkNavy}
            fill={palette.energyOrange}
            empty={palette.warmIvory}
          />
        </g>
      ) : null}

      {section > 0 ? (
        <g
          opacity={section}
          transform={`translate(0 ${lerp(0, 300, tilt)}) translate(540 1100) scale(1 ${lerp(1, 0.35, tilt)}) translate(-540 -1100)`}
        >
          <path d={BOWL} fill={palette.warmIvory} stroke={palette.inkNavy} strokeWidth={10} />
          <g clipPath="url(#sh05-soup)">
            <g clipPath="url(#sh05-below-surface)">
              {Array.from({ length: LAYERS }, (_, k) => {
                const d = k / (LAYERS - 1);
                const inset = d * 0.94 * HALF_H;
                return (
                  <path
                    key={k}
                    d={SOUP}
                    transform={`translate(${CENTRE.x} ${CENTRE.y}) scale(${1 - inset / HALF_W} ${1 - inset / HALF_H}) translate(${-CENTRE.x} ${-CENTRE.y})`}
                    fill={heatColor(warmth(d, frame))}
                  />
                );
              })}
            </g>
          </g>
          <line x1={150} x2={930} y1={SOUP_Y} y2={SOUP_Y} stroke={palette.inkNavy} strokeWidth={5} />
          <path d={BOWL} fill="none" stroke={palette.inkNavy} strokeWidth={10} />
          {WAVES.map((w, i) => (
            <SignalPath
              key={i}
              points={w.pts}
              progress={1}
              stroke={`url(#sh05-wave-${i})`}
              width={8}
              amplitude={12}
              wavelength={50}
              phase={frame * 0.35}
              opacity={waveIn}
            />
          ))}
        </g>
      ) : null}
    </Stage>
  );
};
