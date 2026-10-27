import React from "react";
import { Audio, Sequence, interpolate } from "remotion";

type AudioCueProps = {
  src: string;
  // Absolute start frame in the parent timeline.
  from: number;
  // Required for loops and fade-outs; one-shots otherwise play to their end.
  durationInFrames?: number;
  volume: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
  name?: string;
  // Extra gain per frame (relative to the cue start), e.g. ducking under narration.
  gain?: (frame: number) => number;
};

// One sound placed on the timeline with frame-based fades.
export const AudioCue: React.FC<AudioCueProps> = ({
  src,
  from,
  durationInFrames,
  volume,
  fadeIn = 0,
  fadeOut = 0,
  loop = false,
  name,
  gain,
}) => {
  if (fadeOut > 0 && durationInFrames === undefined) {
    throw new Error(`AudioCue ${name ?? src}: fadeOut needs durationInFrames`);
  }
  const level = (f: number) => {
    const inGain = fadeIn > 0 ? interpolate(f, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }) : 1;
    const outGain =
      fadeOut > 0 && durationInFrames !== undefined
        ? interpolate(f, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 1;
    return volume * inGain * outGain * (gain ? gain(f) : 1);
  };
  return (
    <Sequence from={from} durationInFrames={durationInFrames} name={name} layout="none">
      <Audio src={src} loop={loop} volume={level} />
    </Sequence>
  );
};
