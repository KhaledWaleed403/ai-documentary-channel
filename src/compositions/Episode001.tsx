import React from "react";
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { episode001, shotDuration } from "../data/episode001";
import { episode001Cues, musicBed } from "../data/episode001Audio";
import { duckAt, episode001CuesV2 } from "../data/episode001AudioV2";
import { episode001Narration, narrationVolume } from "../data/episode001Narration";
import { Sh01ColdMeal } from "../scenes/episode001/Sh01ColdMeal";
import { Sh02Magnetron } from "../scenes/episode001/Sh02Magnetron";
import { Sh03Bouncing } from "../scenes/episode001/Sh03Bouncing";
import { Sh04Tug } from "../scenes/episode001/Sh04Tug";
import { Sh05Heat } from "../scenes/episode001/Sh05Heat";
import { Sh06Turntable } from "../scenes/episode001/Sh06Turntable";
import { Sh07Payoff } from "../scenes/episode001/Sh07Payoff";
import type { SceneProps } from "../scenes/episode001/shared";
import { fontFamily, palette } from "../styles/theme";

const SCENES: Record<string, React.FC<SceneProps>> = {
  SH01: Sh01ColdMeal,
  SH02: Sh02Magnetron,
  SH03: Sh03Bouncing,
  SH04: Sh04Tug,
  SH05: Sh05Heat,
  SH06: Sh06Turntable,
  SH07: Sh07Payoff,
};

// Each shot keeps rendering this many frames past its end while the next one
// fades in on top, so cuts stay anchored to the storyboard's startFrame.
const CROSSFADE = 8;

export type Episode001Props = {
  // Approved narration snippets from src/data/episode001Narration.ts.
  narration: boolean;
  // Burn in shot IDs, timecode and temporary narration captions for review.
  draft: boolean;
  // Sound effects; off gives the silent visual draft.
  soundDesign: boolean;
  // Music bed (only plays when soundDesign is on).
  music: boolean;
  // Effects set: "v1" (episode001Audio.ts) or "v2" (episode001AudioV2.ts).
  sfx: "v1" | "v2";
};

const FadeIn: React.FC<{ enabled: boolean; children: React.ReactNode }> = ({
  enabled,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: enabled ? progress(frame, 0, CROSSFADE) : 1 }}>
      {children}
    </AbsoluteFill>
  );
};

const DraftOverlay: React.FC<{ hasVoiceover: boolean }> = ({ hasVoiceover }) => {
  const frame = useCurrentFrame();
  const { shots, fps } = episode001;
  const shot =
    shots.find((s) => frame >= s.startFrame && frame < s.endFrame) ??
    shots[shots.length - 1];
  const box = {
    fontFamily,
    color: palette.warmIvory,
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 14,
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ ...box, position: "absolute", top: 40, left: 40, padding: "10px 18px", fontSize: 28, fontWeight: 600 }}>
        DRAFT{hasVoiceover ? "" : " · NO VOICEOVER"} · {shot.id} · {(frame / fps).toFixed(1)}s
      </div>
      <div
        style={{
          ...box,
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 110,
          padding: "18px 26px",
          fontSize: 36,
          lineHeight: 1.3,
          textAlign: "center",
          border: `2px dashed ${palette.mistBlue}`,
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.7, marginBottom: 6 }}>
          TEMP NARRATION CAPTION (not final)
        </div>
        {shot.narration}
      </div>
    </AbsoluteFill>
  );
};

const shotStart = (id: string) => {
  const shot = episode001.shots.find((s) => s.id === id);
  if (!shot) {
    throw new Error(`Audio cue refers to unknown shot ${id}`);
  }
  return shot.startFrame;
};

const SoundDesign: React.FC<{ music: boolean; sfx: "v1" | "v2" }> = ({ music, sfx }) => {
  return (
    <>
      {music ? (
        <AudioCue name="Music bed" src={musicBed.src} from={0} volume={musicBed.volume} />
      ) : null}
      {sfx === "v1"
        ? episode001Cues.map(({ id, shot, offset, ...cue }) => (
            <AudioCue key={id} name={id} from={shotStart(shot) + offset} {...cue} />
          ))
        : episode001CuesV2.map(({ id, shot, offset, duck, ...cue }) => {
            const from = shotStart(shot) + offset;
            return (
              <AudioCue key={id} name={id} from={from} gain={duck ? (f) => duckAt(from + f) : undefined} {...cue} />
            );
          })}
    </>
  );
};

const Narration: React.FC = () => {
  return (
    <>
      {episode001Narration.map(({ id, src, shot, offset }) => (
        <AudioCue key={id} name={id} src={src} from={shotStart(shot) + offset} volume={narrationVolume} />
      ))}
    </>
  );
};

export const Episode001: React.FC<Episode001Props> = ({ narration, draft, soundDesign, music, sfx }) => {
  const { shots } = episode001;
  return (
    <AbsoluteFill style={{ backgroundColor: palette.inkNavy }}>
      {shots.map((shot, i) => {
        const Scene = SCENES[shot.id];
        if (!Scene) {
          throw new Error(`No scene implemented for ${shot.id}`);
        }
        const duration = shotDuration(shot);
        const isLast = i === shots.length - 1;
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
      {soundDesign ? <SoundDesign music={music} sfx={sfx} /> : null}
      {narration ? <Narration /> : null}
      {draft ? <DraftOverlay hasVoiceover={narration} /> : null}
    </AbsoluteFill>
  );
};

export const Episode001Composition = () => {
  const common = {
    component: Episode001,
    durationInFrames: episode001.durationInFrames,
    fps: episode001.fps,
    width: episode001.width,
    height: episode001.height,
  };
  return (
    <>
      <Composition
        id="Episode001"
        {...common}
        defaultProps={{ narration: true, draft: true, soundDesign: true, music: true, sfx: "v1" as const }}
      />
      {/* Sound design V2 review: final picture, approved narration, V2 effects, no music. */}
      <Composition
        id="Episode001SoundV2"
        {...common}
        defaultProps={{ narration: true, draft: false, soundDesign: true, music: false, sfx: "v2" as const }}
      />
    </>
  );
};
