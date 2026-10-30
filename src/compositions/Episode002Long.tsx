import React from "react";
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { episode002Long } from "../data/episode002";
import { LONG_SCENES } from "../scenes/episode002/longScenes";
import { K } from "../scenes/episode002/kit";
import { fontFamily } from "../styles/theme";

// Each scene keeps rendering this many frames past its end while the next
// fades in on top, so scene starts stay pinned to the narration timeline.
const CROSSFADE = 12;

export type Episode002LongProps = { narration: boolean; draft: boolean };

const SceneLayer: React.FC<{ index: number; fade: boolean }> = ({ index, fade }) => {
  const frame = useCurrentFrame();
  const sc = episode002Long.scenes[index];
  const Scene = LONG_SCENES[sc.scene];
  if (!Scene) {
    throw new Error(`No scene component for scene ${sc.scene}`);
  }
  const beats = sc.shots.map((s) => s.start - sc.start);
  const ends = sc.shots.map((s) => s.end - sc.start);
  return (
    <AbsoluteFill style={{ opacity: fade ? progress(frame, 0, CROSSFADE) : 1 }}>
      <Scene t={frame} dur={sc.end - sc.start} beats={beats} ends={ends} />
    </AbsoluteFill>
  );
};

const DraftOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = episode002Long.scenes.find((s) => frame >= s.start && frame < s.end) ?? episode002Long.scenes[episode002Long.scenes.length - 1];
  return (
    <div style={{ position: "absolute", top: 20, right: 24, padding: "6px 14px", borderRadius: 10, fontFamily, fontSize: 22, color: K.ivory, backgroundColor: "rgba(5, 11, 22, 0.8)" }}>
      DRAFT · scene {sc.scene} · {(frame / episode002Long.fps).toFixed(1)}s
    </div>
  );
};

export const Episode002Long: React.FC<Episode002LongProps> = ({ narration, draft }) => {
  const { scenes, vo } = episode002Long;
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      {scenes.map((sc, i) => {
        const isLast = i === scenes.length - 1;
        return (
          <Sequence key={sc.scene} name={`Scene ${sc.scene}`} from={sc.start} durationInFrames={sc.end - sc.start + (isLast ? 0 : CROSSFADE)} premountFor={30}>
            <SceneLayer index={i} fade={i > 0} />
          </Sequence>
        );
      })}
      {narration ? vo.map((c) => <AudioCue key={c.id} name={`VO ${c.id}`} src={c.src} from={c.from} volume={c.volume} />) : null}
      {draft ? <DraftOverlay /> : null}
    </AbsoluteFill>
  );
};

export const Episode002LongComposition = () => (
  <>
    <Composition
      id="Episode002Long"
      component={Episode002Long}
      durationInFrames={episode002Long.durationInFrames}
      fps={episode002Long.fps}
      width={episode002Long.width}
      height={episode002Long.height}
      defaultProps={{ narration: true, draft: false }}
    />
    <Composition
      id="Episode002LongDraft"
      component={Episode002Long}
      durationInFrames={episode002Long.durationInFrames}
      fps={episode002Long.fps}
      width={episode002Long.width}
      height={episode002Long.height}
      defaultProps={{ narration: true, draft: true }}
    />
  </>
);
