// Episode 001 long-form sound effects (no music). Each cue is pinned to a
// sound entry in storyboard.json (shot + index), so retiming the storyboard
// moves the cues with it. Files: episodes/episode-001/long-v1/assets/audio/,
// built by scripts/audio/build-ep001-long-sfx.py; credits in long-v1/audio-credits.md.
import calendarFlip from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-calendar-flip.wav";
import dishSet from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-dish-set.wav";
import eggBurst from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-egg-burst.wav";
import forkTap from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-fork-tap.wav";
import glassClink from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-glass-clink.wav";
import iceCrackle from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-ice-crackle.wav";
import mugTap from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-mug-tap.wav";
import paperSlide from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-paper-slide.wav";
import pocketRustle from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-pocket-rustle.wav";
import popcorn from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-popcorn-pops.wav";
import spoonStir from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-spoon-stir.wav";
import stamp from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-stamp.wav";
import waterBurst from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-water-burst.wav";
import waterTrickle from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-water-trickle.wav";
import wrapperCrinkle from "../../episodes/episode-001/long-v1/assets/audio/foley/lf-wrapper-crinkle.wav";
import click from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-click.wav";
import clockTicks from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-clock-ticks.wav";
import conveyorTicks from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-conveyor-ticks.wav";
import crowdBumps from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-crowd-bumps.wav";
import fieldSwing from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-field-swing.wav";
import heavyThud from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-heavy-thud.wav";
import interference from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-interference.wav";
import lightThud from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-light-thud.wav";
import ovenHumLoop from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-oven-hum-loop.wav";
import ovenStartup from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-oven-startup.wav";
import startBeep from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-start-beep.wav";
import tubeHum from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-tube-hum.wav";
import turntableLoop from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-turntable-loop.wav";
import turntable from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-turntable.wav";
import waveAbsorb from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-wave-absorb.wav";
import waveEmit from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-wave-emit.wav";
import reflect1 from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-wave-reflect-1.wav";
import reflect2 from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-wave-reflect-2.wav";
import reflect3 from "../../episodes/episode-001/long-v1/assets/audio/sfx/lf-wave-reflect-3.wav";
import { episode001Long, longShot } from "./episode001Long";

type CueSpec = {
  id: string;
  shot: string;
  // Index into the shot's `sound` list in storyboard.json.
  index: number;
  src: string;
  volume: number;
  // Frames added to the storyboard frame (e.g. staggered repeats).
  offset?: number;
  durationInFrames?: number;
  // Run until this shot's end (+ extra frames) instead of a fixed duration.
  untilEndOf?: string;
  extra?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

// Levels: narration sits near -20 LUFS before mastering; cues under speech are
// set roughly 12-18 dB below it, cues in narration gaps a little higher.
const specs: CueSpec[] = [
  { id: "pocket rustle", shot: "S1-01", index: 0, src: pocketRustle, volume: 0.3, fadeOut: 10, durationInFrames: 66 },
  { id: "wrapper sag", shot: "S1-01", index: 1, src: wrapperCrinkle, volume: 0.3 },
  { id: "tube hum", shot: "S1-02", index: 0, src: tubeHum, volume: 0.32, untilEndOf: "S1-02", fadeIn: 20, fadeOut: 30 },
  { id: "conveyor", shot: "S2-01", index: 0, src: conveyorTicks, volume: 0.3 },
  { id: "dish set", shot: "S2-02", index: 0, src: dishSet, volume: 0.28 },
  { id: "popcorn", shot: "S2-03", index: 0, src: popcorn, volume: 0.5 },
  { id: "egg", shot: "S2-04", index: 0, src: eggBurst, volume: 0.5 },
  { id: "reflect 1", shot: "S2-05", index: 0, src: reflect1, volume: 0.2 },
  { id: "reflect 2", shot: "S2-05", index: 0, src: reflect2, volume: 0.17, offset: 9 },
  { id: "reflect 3", shot: "S2-05", index: 0, src: reflect3, volume: 0.17, offset: 18 },
  { id: "patent slide", shot: "S2-06", index: 0, src: paperSlide, volume: 0.35 },
  { id: "patent stamp", shot: "S2-06", index: 1, src: stamp, volume: 0.32 },
  { id: "radarange thud", shot: "S3-01", index: 0, src: heavyThud, volume: 0.42 },
  { id: "balance click", shot: "S3-02", index: 0, src: click, volume: 0.3 },
  { id: "cooling water", shot: "S3-02", index: 1, src: waterTrickle, volume: 0.22 },
  { id: "calendar", shot: "S3-03", index: 0, src: calendarFlip, volume: 0.32 },
  { id: "countertop set", shot: "S3-03", index: 1, src: lightThud, volume: 0.35 },
  { id: "start beep", shot: "S4-01", index: 0, src: startBeep, volume: 0.35, offset: 4 },
  { id: "oven startup", shot: "S4-01", index: 1, src: ovenStartup, volume: 0.28, durationInFrames: 316, fadeOut: 12 },
  { id: "oven run", shot: "S4-01", index: 1, src: ovenHumLoop, volume: 0.2, offset: 300, untilEndOf: "S4-01", extra: 12, loop: true, fadeIn: 16, fadeOut: 12 },
  { id: "first emit", shot: "S4-01", index: 2, src: waveEmit, volume: 0.2 },
  { id: "cavity reflect 1", shot: "S4-01", index: 3, src: reflect1, volume: 0.17 },
  { id: "cavity reflect 2", shot: "S4-01", index: 3, src: reflect2, volume: 0.15, offset: 12 },
  { id: "field swing", shot: "S4-02", index: 1, src: fieldSwing, volume: 0.4 },
  { id: "crowd bumps", shot: "S4-04", index: 0, src: crowdBumps, volume: 0.35 },
  { id: "myth stamp", shot: "S4-06", index: 0, src: stamp, volume: 0.32 },
  { id: "absorb", shot: "S4-07", index: 0, src: waveAbsorb, volume: 0.24 },
  { id: "interference", shot: "S5-02", index: 0, src: interference, volume: 0.3 },
  { id: "plate lift", shot: "S5-03", index: 0, src: glassClink, volume: 0.3 },
  { id: "bar slide", shot: "S5-03", index: 1, src: paperSlide, volume: 0.28 },
  { id: "callback crinkle", shot: "S5-03", index: 2, src: wrapperCrinkle, volume: 0.4 },
  { id: "turntable engage", shot: "S5-04", index: 0, src: turntable, volume: 0.28, durationInFrames: 130, fadeOut: 20 },
  { id: "turntable run", shot: "S5-04", index: 0, src: turntableLoop, volume: 0.22, offset: 110, untilEndOf: "S5-05", extra: -40, loop: true, fadeIn: 20, fadeOut: 30 },
  { id: "turntable stop", shot: "S5-05", index: 0, src: click, volume: 0.28, offset: 12 },
  { id: "stir", shot: "S5-05", index: 1, src: spoonStir, volume: 0.45 },
  { id: "fork tap", shot: "S6-01", index: 0, src: forkTap, volume: 0.32 },
  { id: "standing clock", shot: "S6-02", index: 0, src: clockTicks, volume: 0.3 },
  { id: "dish test oven", shot: "S6-03", index: 0, src: ovenHumLoop, volume: 0.14, untilEndOf: "S6-03", extra: -30, loop: true, fadeIn: 20, fadeOut: 20 },
  { id: "dish test beep", shot: "S6-03", index: 1, src: startBeep, volume: 0.45 },
  { id: "ice crackle", shot: "S6-04", index: 0, src: iceCrackle, volume: 0.32 },
  { id: "mug tap", shot: "S6-05", index: 0, src: mugTap, volume: 0.4 },
  { id: "eruption", shot: "S6-05", index: 1, src: waterBurst, volume: 0.48 },
  { id: "kitchen oven", shot: "S7-01", index: 0, src: ovenHumLoop, volume: 0.12, untilEndOf: "S7-02", extra: 10, loop: true, fadeIn: 30, fadeOut: 30 },
  { id: "x-ray emit", shot: "S7-02", index: 0, src: waveEmit, volume: 0.17 },
  { id: "done beep", shot: "S7-03", index: 0, src: startBeep, volume: 0.32 },
  { id: "final crinkle", shot: "S7-03", index: 1, src: wrapperCrinkle, volume: 0.28 },
];

export type LongCue = {
  id: string;
  src: string;
  from: number;
  volume: number;
  durationInFrames?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

export const episode001LongCues: LongCue[] = specs.map(({ id, shot, index, offset = 0, untilEndOf, extra = 0, ...cue }) => {
  const entry = longShot(shot).sound[index];
  if (!entry) {
    throw new Error(`Cue "${id}": ${shot} has no storyboard sound #${index}`);
  }
  const from = entry.frame + offset;
  const durationInFrames = untilEndOf ? longShot(untilEndOf).endFrame + extra - from : cue.durationInFrames;
  if (from < 0 || from >= episode001Long.durationInFrames || (durationInFrames !== undefined && durationInFrames <= 0)) {
    throw new Error(`Cue "${id}" falls outside the timeline`);
  }
  return { id, ...cue, from, durationInFrames };
});
