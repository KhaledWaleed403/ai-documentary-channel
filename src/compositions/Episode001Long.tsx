import React from "react";
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { episode001Long } from "../data/episode001Long";
import { episode001LongCues } from "../data/episode001LongAudio";
import { episode001LongNarration } from "../data/episode001LongNarration";
import { S1Magnetron, S1Pocket, S1Questions } from "../scenes/episode001Long/Scene1";
import { S2Biography, S2Concentrate, S2Egg, S2Patent, S2Popcorn, S2Testing } from "../scenes/episode001Long/Scene2";
import { S3Countertop, S3Giant, S3Homes, S3IdeaInside, S3Radarange } from "../scenes/episode001Long/Scene3";
import { S4Analogy, S4Field, S4Fill, S4Molecule, S4Myth, S4Real, S4Section } from "../scenes/episode001Long/Scene4";
import { S5Chocolate, S5Intro, S5NotPerfect, S5Pattern, S5Ride } from "../scenes/episode001Long/Scene5";
import { S6Betrayal, S6DishTest, S6FoodPlate, S6Frozen, S6Superheat } from "../scenes/episode001Long/Scene6";
import { S7Callback, S7Start, S7XRay } from "../scenes/episode001Long/Scene7";
import type { SceneProps } from "../scenes/episode001Long/shared";
import { fontFamily, palette } from "../styles/theme";

const SCENES: Record<string, React.FC<SceneProps>> = {
  "S1-01": S1Pocket,
  "S1-02": S1Magnetron,
  "S1-03": S1Questions,
  "S2-01": S2Biography,
  "S2-02": S2Testing,
  "S2-03": S2Popcorn,
  "S2-04": S2Egg,
  "S2-05": S2Concentrate,
  "S2-06": S2Patent,
  "S3-01": S3Radarange,
  "S3-02": S3Giant,
  "S3-03": S3Countertop,
  "S3-04": S3Homes,
  "S3-05": S3IdeaInside,
  "S4-01": S4Fill,
  "S4-02": S4Field,
  "S4-03": S4Molecule,
  "S4-04": S4Analogy,
  "S4-05": S4Real,
  "S4-06": S4Myth,
  "S4-07": S4Section,
  "S5-01": S5Intro,
  "S5-02": S5Pattern,
  "S5-03": S5Chocolate,
  "S5-04": S5Ride,
  "S5-05": S5NotPerfect,
  "S6-01": S6Betrayal,
  "S6-02": S6FoodPlate,
  "S6-03": S6DishTest,
  "S6-04": S6Frozen,
  "S6-05": S6Superheat,
  "S7-01": S7Start,
  "S7-02": S7XRay,
  "S7-03": S7Callback,
};

// Each shot keeps rendering this many frames past its end while the next one
// fades in on top, so cuts stay anchored to the storyboard's startFrame.
const CROSSFADE = 10;

export type Episode001LongProps = {
  narration: boolean;
  soundDesign: boolean;
  // Burn in shot ID and timecode for review.
  draft: boolean;
};

const FadeIn: React.FC<{ enabled: boolean; children: React.ReactNode }> = ({ enabled, children }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: enabled ? progress(frame, 0, CROSSFADE) : 1 }}>{children}</AbsoluteFill>;
};

const DraftOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { shots, fps } = episode001Long;
  const shot = shots.find((s) => frame >= s.startFrame && frame < s.endFrame) ?? shots[shots.length - 1];
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        padding: "8px 16px",
        borderRadius: 10,
        fontFamily,
        fontSize: 24,
        color: palette.warmIvory,
        backgroundColor: "rgba(17, 24, 39, 0.8)",
      }}
    >
      DRAFT · {shot.id} · {(frame / fps).toFixed(1)}s
    </div>
  );
};

export const Episode001Long: React.FC<Episode001LongProps> = ({ narration, soundDesign, draft }) => {
  const { shots } = episode001Long;
  return (
    <AbsoluteFill style={{ backgroundColor: palette.inkNavy }}>
      {shots.map((shot, i) => {
        const Scene = SCENES[shot.id];
        if (!Scene) {
          throw new Error(`No scene component for ${shot.id}`);
        }
        const duration = shot.endFrame - shot.startFrame;
        const isLast = i === shots.length - 1;
        return (
          <Sequence key={shot.id} name={`${shot.id} ${shot.name}`} from={shot.startFrame} durationInFrames={duration + (isLast ? 0 : CROSSFADE)} premountFor={30}>
            <FadeIn enabled={i > 0}>
              <Scene shot={shot} duration={duration} />
            </FadeIn>
          </Sequence>
        );
      })}
      {soundDesign
        ? episode001LongCues.map(({ id, ...cue }) => <AudioCue key={id} name={id} {...cue} />)
        : null}
      {narration
        ? episode001LongNarration.map(({ id, src, shot, offset, volume }) => (
            <AudioCue key={id} name={id} src={src} from={episode001Long.shots.find((s) => s.id === shot)!.startFrame + offset} volume={volume} />
          ))
        : null}
      {draft ? <DraftOverlay /> : null}
    </AbsoluteFill>
  );
};

export const Episode001LongComposition = () => (
  <>
    <Composition
      id="Episode001Long"
      component={Episode001Long}
      durationInFrames={episode001Long.durationInFrames}
      fps={episode001Long.fps}
      width={episode001Long.width}
      height={episode001Long.height}
      defaultProps={{ narration: true, soundDesign: true, draft: false }}
    />
    <Composition
      id="Episode001LongDraft"
      component={Episode001Long}
      durationInFrames={episode001Long.durationInFrames}
      fps={episode001Long.fps}
      width={episode001Long.width}
      height={episode001Long.height}
      defaultProps={{ narration: true, soundDesign: true, draft: true }}
    />
  </>
);
