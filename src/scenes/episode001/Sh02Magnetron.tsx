import React from "react";
import { useCurrentFrame } from "remotion";
import { lerp, progress } from "../../animations/timing";
import { Callout } from "../../components/Callout";
import { SignalPath } from "../../components/SignalPath";
import { palette } from "../../styles/theme";
import { BowlFront, SceneProps, Stage } from "./shared";

// Ghosted oven outline at scale 1.25 around (540, 900):
// body x 28..1052, y 575..1225; cavity x 77..777, y 625..1175.
const MAG = { x: 870, y: 710, w: 140, h: 180 };
const MAG_CX = MAG.x + MAG.w / 2;
const WAVE_Y = 800;

// SH02: cutaway — the magnetron turns electricity into microwaves.
export const Sh02Magnetron: React.FC<SceneProps> = ({ shot, duration }) => {
  const frame = useCurrentFrame();
  const outline = progress(frame, 0, 22);
  const box = progress(frame, 10, 14);
  const pan = progress(frame, duration - 24, 24);
  const ghost = { stroke: palette.warmIvory, strokeOpacity: 0.4, fill: "none", strokeWidth: 5 };
  const wave = (start: number) => (
    <SignalPath
      points={[
        [MAG_CX, WAVE_Y],
        [777, WAVE_Y],
        [380, WAVE_Y],
      ]}
      progress={progress(frame, start, 50)}
      tail={0.5}
      stroke={palette.signalTeal}
      width={8}
      amplitude={18}
      wavelength={56}
      phase={frame * 0.5}
    />
  );
  return (
    <Stage bg={palette.inkNavy}>
      <g transform={`translate(${lerp(0, 90, pan)} 0) scale(${lerp(1, 1.12, pan)})`}>
        <rect x={28} y={575} width={1024} height={650} rx={45} pathLength={1} strokeDasharray={`${outline} 2`} {...ghost} />
        <rect x={77} y={625} width={700} height={550} rx={25} pathLength={1} strokeDasharray={`${outline} 2`} {...ghost} />
        <rect x={77} y={625} width={700} height={550} rx={25} fill={palette.warmIvory} fillOpacity={0.05 * outline} />
        <BowlFront x={300} y={1060} w={260} soup="none" bowl="none" stroke={palette.warmIvory} opacity={0.35 * outline} />
        {/* Power feed: neutral colour, not gold, so it isn't read as heat. */}
        <line x1={MAG_CX} y1={1225} x2={MAG_CX} y2={MAG.y + MAG.h} stroke={palette.warmIvory} strokeOpacity={0.5} strokeWidth={6} />
        <SignalPath
          points={[
            [MAG_CX, 1225],
            [MAG_CX, MAG.y + MAG.h],
          ]}
          progress={progress(frame, 14, 30)}
          tail={0.35}
          stroke={palette.warmIvory}
          width={12}
        />
        {/* Short channel from the magnetron into the cavity wall. */}
        <path d={`M777 ${WAVE_Y - 34} L${MAG.x} ${WAVE_Y - 34} M777 ${WAVE_Y + 34} L${MAG.x} ${WAVE_Y + 34}`} stroke={palette.warmIvory} strokeOpacity={0.6 * box} strokeWidth={5} />
        <g opacity={box}>
          <rect x={MAG.x} y={MAG.y} width={MAG.w} height={MAG.h} rx={18} fill={palette.inkNavy} stroke={palette.warmIvory} strokeWidth={6} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={MAG.x + 24} x2={MAG.x + MAG.w - 24} y1={MAG.y + 45 + i * 30} y2={MAG.y + 45 + i * 30} stroke={palette.warmIvory} strokeOpacity={0.5} strokeWidth={4} />
          ))}
        </g>
        {wave(46)}
        {wave(70)}
        <Callout
          x={790}
          y={520}
          tx={MAG_CX - 10}
          ty={MAG.y - 6}
          label={shot.onScreenText[0]}
          progress={progress(frame, 28, 16) * (1 - progress(frame, duration - 36, 12))}
          color={palette.warmIvory}
          fontSize={60}
        />
      </g>
    </Stage>
  );
};
