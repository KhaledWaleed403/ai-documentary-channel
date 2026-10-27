import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeOut, lerp, progress } from "../../animations/timing";
import { SignalPath } from "../../components/SignalPath";
import { TextReveal } from "../../components/TextReveal";
import { palette } from "../../styles/theme";
import { BowlFront, MicrowaveFront, SceneProps, Stage, Thermometer } from "./shared";

// Where the bowl comes to rest, in frame coordinates (microwave centre + offset).
const MW = { x: 540, y: 980 };
const REST = { x: 0, y: 300 };

// SH07: the hot bowl slides out with steam while the last line plays; the
// oven recedes and the shot settles on the steaming bowl.
export const Sh07Payoff: React.FC<SceneProps> = ({ shot, duration }) => {
  const frame = useCurrentFrame();
  const [headline] = shot.onScreenText;
  const door = progress(frame, 0, 18);
  const out = progress(frame, 16, 36, easeOut);
  const iconSwap = progress(frame, 62, 20);
  // Oven fades away and the view closes in on the bowl, finishing ~0.5 s
  // before the cut so the last frames are a calm hold on the steaming bowl.
  const settle = progress(frame, 72, duration - 87);
  const bowlX = interpolate(out, [0, 1], [-110, REST.x]);
  const bowlY = interpolate(out, [0, 1], [110, REST.y]);
  // Slow push-in centred on the resting bowl, so the bowl itself stays put.
  const push = lerp(1, 1.2, settle);
  const pivot = { x: MW.x + REST.x, y: MW.y + REST.y };
  return (
    <Stage
      bg={palette.warmIvory}
      overlay={<TextReveal text={headline} start={22} top={330} fontSize={78} color={palette.inkNavy} />}
    >
      {/* Wave icon turns into a thermometer that keeps rising: energy in, heat out. */}
      <g transform="translate(540 600)">
        <g opacity={1 - iconSwap}>
          <SignalPath
            points={[
              [-90, 0],
              [90, 0],
            ]}
            progress={progress(frame, 30, 16)}
            stroke={palette.signalTeal}
            width={9}
            amplitude={22}
            wavelength={60}
          />
        </g>
        <g opacity={iconSwap}>
          <Thermometer
            x={0}
            y={-6}
            h={130}
            level={lerp(0.45, 0.9, progress(frame, 70, 50))}
            outline={palette.inkNavy}
            fill={palette.energyOrange}
            empty={palette.warmIvory}
          />
        </g>
      </g>
      <g transform={`translate(${pivot.x} ${pivot.y}) scale(${push}) translate(${-pivot.x} ${-pivot.y})`}>
        <g opacity={1 - settle}>
          <MicrowaveFront id="sh07" x={MW.x} y={MW.y} doorOpen={door} interior={null} />
        </g>
        <g transform={`translate(${MW.x} ${MW.y})`}>
          <g transform={`translate(${bowlX} ${bowlY}) scale(${1 + out * 0.3}) translate(${-bowlX} ${-bowlY})`}>
            {[-50, 0, 50].map((dx, i) => {
              const rise = (frame * 1.4 + i * 30) % 90;
              return (
                <path
                  key={dx}
                  d={`M${bowlX + dx} ${bowlY - 30 - rise} q 18 -30 0 -60 q -18 -30 0 -60`}
                  fill="none"
                  stroke={palette.discoveryGold}
                  strokeWidth={8}
                  strokeLinecap="round"
                  opacity={out * (1 - rise / 90)}
                />
              );
            })}
            <BowlFront x={bowlX} y={bowlY} w={250} soup={palette.energyOrange} />
          </g>
        </g>
      </g>
    </Stage>
  );
};
