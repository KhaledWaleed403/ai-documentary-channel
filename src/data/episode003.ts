// Episode 003 — How a Spacecraft Steals Speed.
// Timing comes from scripts/audio/build-ep003-timeline.py (measured Kokoro takes),
// so picture, narration and captions share one clock. Throws if narration text,
// takes or timing drift apart.
import narration from "../../episodes/episode-003/long-v1/narration.json";
import timeline from "../../episodes/episode-003/long-v1/timeline.json";
import manifest from "../../episodes/episode-003/long-v1/assets/audio/vo/manifest.json";
import { ep3VoFiles } from "./episode003AudioFiles";

export type Ep3Shot = { id: string; scene: number; start: number; end: number; speechStart: number; speechEnd: number };
export type Ep3Scene = { scene: number; start: number; end: number; shots: Ep3Shot[] };
export type Ep3VoCue = { id: string; src: string; from: number; volume: number };

// One playback gain for every take (the lowest per-take gain in the manifest), so
// the takes, which share the same speech level, stay level with each other.
const gainDb = Math.min(...manifest.snippets.map((s) => s.gainDb));

const shots = timeline.shots as Ep3Shot[];

export const episode003Long = {
  fps: timeline.fps,
  width: timeline.width,
  height: timeline.height,
  durationInFrames: timeline.durationInFrames,
  scenes: timeline.scenes.map((sc) => ({ scene: sc.scene, start: sc.start, end: sc.end, shots: shots.filter((s) => s.scene === sc.scene) })) as Ep3Scene[],
  vo: narration.shots.map((shot): Ep3VoCue => {
    const t = shots.find((s) => s.id === shot.id);
    const s = manifest.snippets.find((x) => x.id === shot.id);
    const src = ep3VoFiles[shot.id];
    if (!t || !s || !src) {
      throw new Error(`Missing timeline, VO snippet or audio import for ${shot.id}`);
    }
    if (s.text !== shot.text) {
      throw new Error(`VO text for ${shot.id} differs from narration.json`);
    }
    return { id: shot.id, src, from: t.start, volume: Math.pow(10, gainDb / 20) };
  }),
};
