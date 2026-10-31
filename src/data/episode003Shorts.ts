// Episode 003 Shorts (9:16). Timing and captions come from
// scripts/audio/build-ep003-timeline.py (measured Kokoro takes). Throws if
// narration text, takes or timing drift apart.
import narration from "../../episodes/episode-003/shorts/narration.json";
import timeline from "../../episodes/episode-003/shorts/timeline.json";
import manifest from "../../episodes/episode-003/shorts/assets/audio/vo/manifest.json";
import capGravity from "../../episodes/episode-003/shorts/GravityAssistSpeed/captions.json";
import capSun from "../../episodes/episode-003/shorts/ReachingTheSun/captions.json";
import capVoyager from "../../episodes/episode-003/shorts/VoyagerAlignment/captions.json";
import type { CaptionCue } from "../components/Captions";
import { ep3ShortsVoFiles } from "./episode003AudioFiles";

export type Ep3ShortName = "GravityAssistSpeed" | "ReachingTheSun" | "VoyagerAlignment";

const captions: Record<Ep3ShortName, { cues: CaptionCue[] }> = {
  GravityAssistSpeed: capGravity,
  ReachingTheSun: capSun,
  VoyagerAlignment: capVoyager,
};

// One playback gain for every take (the lowest per-take gain), so lines stay level.
const gainDb = Math.min(...manifest.snippets.map((s) => s.gainDb));

export type Ep3Short = {
  name: Ep3ShortName;
  number: number;
  title: string;
  durationInFrames: number;
  beats: number[];
  vo: { id: string; src: string; from: number; volume: number }[];
  captions: CaptionCue[];
};

export const episode003Shorts: Ep3Short[] = timeline.shorts.map((t) => {
  const n = narration.shorts.find((s) => s.name === t.name);
  if (!n) {
    throw new Error(`No narration for ${t.name}`);
  }
  const name = t.name as Ep3ShortName;
  return {
    name,
    number: t.number,
    title: t.title,
    durationInFrames: t.durationInFrames,
    beats: t.lines.map((l) => l.start),
    vo: n.lines.map((line) => {
      const lt = t.lines.find((l) => l.id === line.id);
      const s = manifest.snippets.find((x) => x.id === line.id);
      const src = ep3ShortsVoFiles[line.id];
      if (!lt || !s || !src) {
        throw new Error(`Missing timeline, VO snippet or audio import for ${line.id}`);
      }
      if (s.text !== line.text) {
        throw new Error(`VO text for ${line.id} differs from narration.json`);
      }
      return { id: line.id, src, from: lt.start, volume: Math.pow(10, gainDb / 20) };
    }),
    captions: captions[name].cues,
  };
});
