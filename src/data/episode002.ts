// Episode 002 — The Hidden Machines That Keep a Submarine Crew Alive.
// Timing comes from scripts/audio/build-ep002-timeline.py (measured Kokoro takes),
// so picture, narration and captions share one clock. Throws if narration text,
// takes or timing drift apart.
import longNarration from "../../episodes/episode-002/long-v1/narration.json";
import longTimeline from "../../episodes/episode-002/long-v1/timeline.json";
import longManifest from "../../episodes/episode-002/long-v1/assets/audio/vo/manifest.json";
import shortsNarration from "../../episodes/episode-002/shorts/narration.json";
import shortsTimeline from "../../episodes/episode-002/shorts/timeline.json";
import shortsManifest from "../../episodes/episode-002/shorts/assets/audio/vo/manifest.json";
import capOtherGas from "../../episodes/episode-002/shorts/SubmarineOtherGas/captions.json";
import capNoGps from "../../episodes/episode-002/shorts/SubmarineNoGPS/captions.json";
import capMessages from "../../episodes/episode-002/shorts/SubmarineMessages/captions.json";
import capOxygen from "../../episodes/episode-002/shorts/SubmarineOxygen/captions.json";
import capHull from "../../episodes/episode-002/shorts/SubmarinePressureHull/captions.json";
import capStealth from "../../episodes/episode-002/shorts/SubmarineStealth/captions.json";
import capLimits from "../../episodes/episode-002/shorts/SubmarineEnduranceLimits/captions.json";
import type { CaptionCue } from "../components/Captions";
import { longVoFiles, shortsVoFiles } from "./episode002AudioFiles";

export type Ep2Shot = {
  id: string;
  start: number;
  end: number;
  speechStart: number;
  speechEnd: number;
};

export type Ep2Scene = { scene: number; start: number; end: number; shots: Ep2Shot[] };

export type VoCue = { id: string; src: string; from: number; volume: number };

type Snippet = { id: string; text: string; approvedTake: string; gainDb: number };

const checkTake = (snippets: Snippet[], files: Record<string, string>, id: string, text: string) => {
  const s = snippets.find((x) => x.id === id);
  if (!s) {
    throw new Error(`No VO snippet for ${id}`);
  }
  if (s.text !== text) {
    throw new Error(`VO text for ${id} differs from narration.json`);
  }
  const src = files[id];
  if (!src) {
    throw new Error(`VO take for ${id} is not imported`);
  }
  return { src, volume: Math.pow(10, s.gainDb / 20) };
};

const longShots = longTimeline.shots as (Ep2Shot & { scene: number })[];

export const episode002Long = {
  fps: longTimeline.fps,
  width: longTimeline.width,
  height: longTimeline.height,
  durationInFrames: longTimeline.durationInFrames,
  scenes: longTimeline.scenes.map((sc) => ({
    scene: sc.scene,
    start: sc.start,
    end: sc.end,
    shots: longShots.filter((s) => s.scene === sc.scene),
  })) as Ep2Scene[],
  vo: longNarration.shots.map((shot): VoCue => {
    const t = longShots.find((s) => s.id === shot.id);
    if (!t) {
      throw new Error(`No timeline entry for ${shot.id}`);
    }
    return { id: shot.id, from: t.start, ...checkTake(longManifest.snippets, longVoFiles, shot.id, shot.text) };
  }),
};

export type ShortName =
  | "SubmarineOtherGas"
  | "SubmarineNoGPS"
  | "SubmarineMessages"
  | "SubmarineOxygen"
  | "SubmarinePressureHull"
  | "SubmarineStealth"
  | "SubmarineEnduranceLimits";

const shortCaptions: Record<ShortName, { cues: CaptionCue[] }> = {
  SubmarineOtherGas: capOtherGas,
  SubmarineNoGPS: capNoGps,
  SubmarineMessages: capMessages,
  SubmarineOxygen: capOxygen,
  SubmarinePressureHull: capHull,
  SubmarineStealth: capStealth,
  SubmarineEnduranceLimits: capLimits,
};

export type Ep2Short = {
  name: ShortName;
  number: number;
  title: string;
  durationInFrames: number;
  lines: Ep2Shot[];
  vo: VoCue[];
  captions: CaptionCue[];
};

export const episode002Shorts: Ep2Short[] = shortsTimeline.shorts.map((t) => {
  const n = shortsNarration.shorts.find((s) => s.name === t.name);
  if (!n) {
    throw new Error(`No narration for ${t.name}`);
  }
  const name = t.name as ShortName;
  return {
    name,
    number: t.number,
    title: t.title,
    durationInFrames: t.durationInFrames,
    lines: t.lines,
    vo: n.lines.map((line) => {
      const lt = t.lines.find((l) => l.id === line.id);
      if (!lt) {
        throw new Error(`No timeline entry for ${line.id}`);
      }
      return { id: line.id, from: lt.start, ...checkTake(shortsManifest.snippets, shortsVoFiles, line.id, line.text) };
    }),
    captions: shortCaptions[name].cues,
  };
});
