import React from "react";
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { Captions } from "../components/Captions";
import { ShortName, episode001Shorts } from "../data/episode001Shorts";
import { candyBarScenes } from "../scenes/episode001Shorts/CandyBarDiscovery";
import { dishesScenes } from "../scenes/episode001Shorts/MicrowaveSafeDishes";
import type { ShortSceneProps } from "../scenes/episode001Shorts/shared";
import { standingTimeScenes } from "../scenes/episode001Shorts/StandingTime";
import { superheatedScenes } from "../scenes/episode001Shorts/SuperheatedWater";
import { fontFamily, palette } from "../styles/theme";

const SCENES: Record<ShortName, Record<string, React.FC<ShortSceneProps>>> = {
  CandyBarDiscovery: candyBarScenes,
  MicrowaveSafeDishes: dishesScenes,
  StandingTime: standingTimeScenes,
  SuperheatedWater: superheatedScenes,
};

// Each shot keeps rendering this many frames past its end while the next one
// fades in on top, so cuts stay anchored to the storyboard's startFrame.
const CROSSFADE = 8;

export type Episode001ShortProps = {
  short: ShortName;
  narration: boolean;
  soundDesign: boolean;
  // Burn in shot ID and timecode for review.
  draft: boolean;
  // Burned-in captions; the scene layer shrinks toward the top to make room.
  captions: boolean;
};

// Caption-safe layout: the scene layer is scaled about (540, 130), which puts
// its lowest on-screen text (y ≈ 1490) at y ≈ 1330, above the caption block
// (bottom edge 1520, clear of the Shorts UI in the bottom 20% and on the right).
const SCENE_SCALE = 0.88;
const CAPTION_BOTTOM = 1520;
const CAPTION_COLOR = "#FFFFFF";
const CAPTION_BACKING = "rgba(17, 24, 39, 0.72)";

// Restrained accent words per Short: teal = waves, amber = heat.
const EMPHASIS: Record<ShortName, Record<string, string>> = {
  CandyBarDiscovery: {
    invisible: palette.signalTeal,
    magnetron: palette.signalTeal,
    waves: palette.signalTeal,
    melted: palette.discoveryGold,
  },
  MicrowaveSafeDishes: {
    scorching: palette.discoveryGold,
    hot: palette.discoveryGold,
    "microwave-safe": palette.signalTeal,
    guarantee: palette.discoveryGold,
  },
  StandingTime: {
    standing: palette.discoveryGold,
    heat: palette.discoveryGold,
    microwaves: palette.signalTeal,
    waves: palette.signalTeal,
  },
  SuperheatedWater: {
    boiling: palette.discoveryGold,
    boil: palette.discoveryGold,
    calm: palette.signalTeal,
    before: palette.discoveryGold,
  },
};

const SceneLayer: React.FC<{
  captions: boolean;
  children: React.ReactNode;
}> = ({ captions, children }) =>
  captions ? (
    <AbsoluteFill
      style={{
        transformOrigin: "540px 130px",
        transform: `scale(${SCENE_SCALE})`,
        // Soft edges so full-width elements (counters, panels) fade out instead of ending in a seam.
        maskImage:
          "linear-gradient(to bottom, #000 82%, transparent 100%), linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      {children}
    </AbsoluteFill>
  ) : (
    <>{children}</>
  );

const FadeIn: React.FC<{ enabled: boolean; children: React.ReactNode }> = ({
  enabled,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ opacity: enabled ? progress(frame, 0, CROSSFADE) : 1 }}
    >
      {children}
    </AbsoluteFill>
  );
};

const DraftOverlay: React.FC<{ short: ShortName }> = ({ short }) => {
  const frame = useCurrentFrame();
  const { shots } = episode001Shorts[short].board;
  const shot =
    shots.find((s) => frame >= s.startFrame && frame < s.endFrame) ??
    shots[shots.length - 1];
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 40,
        padding: "10px 18px",
        borderRadius: 14,
        fontFamily,
        fontSize: 28,
        fontWeight: 600,
        color: palette.warmIvory,
        backgroundColor: "rgba(17, 24, 39, 0.8)",
      }}
    >
      DRAFT · {shot.id} · {(frame / 30).toFixed(1)}s
    </div>
  );
};

export const Episode001Short: React.FC<Episode001ShortProps> = ({
  short,
  narration,
  soundDesign,
  draft,
  captions,
}) => {
  const { board, narration: vo, sfx, captions: cues } = episode001Shorts[short];
  return (
    <AbsoluteFill style={{ backgroundColor: palette.inkNavy }}>
      <SceneLayer captions={captions}>
        {board.shots.map((shot, i) => {
          const Scene = SCENES[short][shot.id];
          if (!Scene) {
            throw new Error(`${short}: no scene component for ${shot.id}`);
          }
          const duration = shot.endFrame - shot.startFrame;
          const isLast = i === board.shots.length - 1;
          return (
            <Sequence
              key={shot.id}
              name={`${shot.id} ${shot.name}`}
              from={shot.startFrame}
              durationInFrames={duration + (isLast ? 0 : CROSSFADE)}
              premountFor={30}
            >
              <FadeIn enabled={i > 0}>
                <Scene shot={shot} duration={duration} />
              </FadeIn>
            </Sequence>
          );
        })}
      </SceneLayer>
      {captions ? (
        <Captions
          cues={cues}
          bottom={CAPTION_BOTTOM}
          color={CAPTION_COLOR}
          backing={CAPTION_BACKING}
          emphasis={EMPHASIS[short]}
        />
      ) : null}
      {soundDesign
        ? sfx.map(({ id, ...cue }) => <AudioCue key={id} name={id} {...cue} />)
        : null}
      {narration
        ? vo.map(({ id, ...cue }) => <AudioCue key={id} name={id} {...cue} />)
        : null}
      {draft ? <DraftOverlay short={short} /> : null}
    </AbsoluteFill>
  );
};

// One composition per Short: E001Short<Name> (final) and E001Short<Name>Draft.
export const Episode001ShortsCompositions = () => (
  <>
    {(Object.keys(episode001Shorts) as ShortName[]).flatMap((short) => {
      const { board } = episode001Shorts[short];
      const common = {
        component: Episode001Short,
        durationInFrames: board.durationInFrames,
        fps: board.fps,
        width: board.width,
        height: board.height,
      };
      return [
        <Composition
          key={short}
          id={`E001Short${short}`}
          {...common}
          defaultProps={{
            short,
            narration: true,
            soundDesign: true,
            draft: false,
            captions: true,
          }}
        />,
        <Composition
          key={`${short}Draft`}
          id={`E001Short${short}Draft`}
          {...common}
          defaultProps={{
            short,
            narration: true,
            soundDesign: true,
            draft: true,
            captions: true,
          }}
        />,
      ];
    })}
  </>
);
