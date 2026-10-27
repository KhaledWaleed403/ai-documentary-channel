import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeOut, progress } from "../../animations/timing";
import { TextReveal } from "../../components/TextReveal";
import { palette } from "../../styles/theme";
import { BowlFront, MicrowaveFront, SceneProps, Stage, Thermometer } from "./shared";

// SH01: a cold bowl goes in; the oven's air stays cool.
export const Sh01ColdMeal: React.FC<SceneProps> = ({ shot, duration }) => {
  const frame = useCurrentFrame();
  const slide = progress(frame, 6, 40, easeOut);
  const door = 1 - progress(frame, 50, 16);
  const push = progress(frame, duration - 28, 28);
  const scale = 1 + push * 0.5;
  return (
    <Stage
      bg={palette.warmIvory}
      overlay={
        <TextReveal
          text={shot.onScreenText[0]}
          start={40}
          top={400}
          fontSize={84}
          color={palette.inkNavy}
          exit={duration - 26}
        />
      }
    >
      <g transform={`translate(900 980) scale(${scale}) translate(-900 -980)`}>
        <MicrowaveFront
          id="sh01"
          x={540}
          y={980}
          doorOpen={door}
          interior={
            <Thermometer
              x={130}
              y={-110}
              h={150}
              level={0.18}
              outline={palette.warmIvory}
              fill={palette.mistBlue}
              empty={palette.inkNavy}
            />
          }
          between={
            <BowlFront
              x={interpolate(slide, [0, 1], [-900, -110])}
              y={110}
              w={250}
              soup={palette.mistBlue}
            />
          }
        />
      </g>
    </Stage>
  );
};
