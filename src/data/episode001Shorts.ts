// Episode 001 Shorts batch (v1): four standalone vertical Shorts. Each Short's
// storyboard.json (episodes/episode-001/shorts/<Name>/v1/) is the source of truth
// for shot timing, beats and sound cues; its vo/manifest.json holds the approved
// Kokoro takes. Both are written by scripts/audio/build-ep001-shorts.py.
// captions.json (same folder) holds the burned-in caption cues, aligned to the
// takes by scripts/audio/build-ep001-captions.py. Renders only read these files.
// The original Short (episode001*.ts) and the long-form data are not touched.
import cbCaptions from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/captions.json";
import dsCaptions from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/captions.json";
import stCaptions from "../../episodes/episode-001/shorts/StandingTime/v2/captions.json";
import swCaptions from "../../episodes/episode-001/shorts/SuperheatedWater/v2/captions.json";
import cbBoard from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/storyboard.json";
import cbManifest from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/manifest.json";
import cb01 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb01-take01.wav";
import cb02 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb02-take01.wav";
import cb03 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb03-take01.wav";
import cb04 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb04-take01.wav";
import cb05 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb05-take01.wav";
import cb06 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/vo/cb06-take01.wav";
import cbDishSet from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-dish-set.wav";
import cbEgg from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-egg-burst.wav";
import cbOvenHum from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-oven-hum-loop.wav";
import cbPaper from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-paper-slide.wav";
import cbPocket from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-pocket-rustle.wav";
import cbPopcorn from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-popcorn-pops.wav";
import cbStamp from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-stamp.wav";
import cbBeep from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-start-beep.wav";
import cbTube from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-tube-hum.wav";
import cbReflect1 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-wave-reflect-1.wav";
import cbReflect2 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-wave-reflect-2.wav";
import cbReflect3 from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-wave-reflect-3.wav";
import cbWrapper from "../../episodes/episode-001/shorts/CandyBarDiscovery/v3/assets/audio/sfx/lf-wrapper-crinkle.wav";
import dsBoard from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/storyboard.json";
import dsManifest from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/manifest.json";
import ds01 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds01-take01.wav";
import ds02 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds02-take01.wav";
import ds03 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds03-take01.wav";
import ds04 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds04-take01.wav";
import ds05 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds05-take01.wav";
import ds06 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds06-take01.wav";
import ds07 from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/vo/ds07-take01.wav";
import dsClick from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-click.wav";
import dsDishSet from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-dish-set.wav";
import dsForkTap from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-fork-tap.wav";
import dsGlass from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-glass-clink.wav";
import dsMug from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-mug-tap.wav";
import dsOvenHum from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-oven-hum-loop.wav";
import dsStamp from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-stamp.wav";
import dsBeep from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-start-beep.wav";
import dsAbsorb from "../../episodes/episode-001/shorts/MicrowaveSafeDishes/v3/assets/audio/sfx/lf-wave-absorb.wav";
import stBoard from "../../episodes/episode-001/shorts/StandingTime/v2/storyboard.json";
import stManifest from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/manifest.json";
import st01 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st01-take01.wav";
import st02 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st02-take01.wav";
import st03 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st03-take01.wav";
import st04 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st04-take01.wav";
import st05 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st05-take01.wav";
import st06 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st06-take01.wav";
import st07 from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/vo/st07-take01.wav";
import stClick from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/sfx/lf-click.wav";
import stClock from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/sfx/lf-clock-ticks.wav";
import stForkTap from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/sfx/lf-fork-tap.wav";
import stBeep from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/sfx/lf-start-beep.wav";
import stAbsorb from "../../episodes/episode-001/shorts/StandingTime/v2/assets/audio/sfx/lf-wave-absorb.wav";
import swBoard from "../../episodes/episode-001/shorts/SuperheatedWater/v2/storyboard.json";
import swManifest from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/manifest.json";
import sw01 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw01-take01.wav";
import sw02 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw02-take01.wav";
import sw03 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw03-take01.wav";
import sw04 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw04-take01.wav";
import sw05 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw05-take01.wav";
import sw06 from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/vo/sw06-take01.wav";
import swClick from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/sfx/lf-click.wav";
import swMug from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/sfx/lf-mug-tap.wav";
import swOvenHum from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/sfx/lf-oven-hum-loop.wav";
import swSpoon from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/sfx/lf-spoon-stir.wav";
import swBurst from "../../episodes/episode-001/shorts/SuperheatedWater/v2/assets/audio/sfx/lf-water-burst.wav";

export type ShortBeat = { id: string; frame: number };
export type ShortSound = {
  id: string;
  file: string;
  frame: number;
  endFrame?: number;
  volume: number;
  durationInFrames?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};
export type ShortShot = {
  id: string;
  name: string;
  narration: string;
  offsetFrames: number;
  startFrame: number;
  endFrame: number;
  speechStartFrame: number;
  speechEndFrame: number;
  beats: ShortBeat[];
  sound: ShortSound[];
};
export type ShortBoard = {
  short: string;
  title: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  shots: ShortShot[];
};
type Manifest = {
  snippets: {
    id: string;
    shot: string;
    text: string;
    approvedTake: string | null;
    offsetFrames: number;
    gainDb: number;
  }[];
};

export type ShortCue = {
  id: string;
  src: string;
  from: number;
  volume: number;
  durationInFrames?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

export type ShortCaption = {
  start: number;
  end: number;
  text: string;
  lines: string[];
};

export type ShortData = {
  board: ShortBoard;
  narration: ShortCue[];
  sfx: ShortCue[];
  captions: ShortCaption[];
};

const build = (
  rawBoard: unknown,
  rawManifest: unknown,
  rawCaptions: { cues: ShortCaption[] },
  takes: Record<string, string>,
  sounds: Record<string, string>,
): ShortData => {
  const board = rawBoard as ShortBoard;
  const manifest = rawManifest as Manifest;
  if (
    board.width !== 1080 ||
    board.height !== 1920 ||
    board.fps !== 30 ||
    !board.durationInFrames
  ) {
    throw new Error(
      `${board.short}: expected a timed 1080×1920 / 30 fps storyboard`,
    );
  }
  const narration = board.shots.map((shot) => {
    const snippet = manifest.snippets.find((s) => s.shot === shot.id);
    if (!snippet) {
      throw new Error(
        `${board.short}: narration manifest has no snippet for ${shot.id}`,
      );
    }
    if (snippet.text !== shot.narration) {
      throw new Error(
        `${board.short}: narration text for ${shot.id} differs from storyboard.json`,
      );
    }
    const src = snippet.approvedTake ? takes[snippet.approvedTake] : undefined;
    if (!src) {
      throw new Error(
        `${board.short}: approved take for ${shot.id} is missing or not imported`,
      );
    }
    if (snippet.offsetFrames !== shot.offsetFrames) {
      throw new Error(
        `${board.short}: narration offset for ${shot.id} differs from storyboard.json`,
      );
    }
    return {
      id: `VO ${shot.id}`,
      src,
      from: shot.startFrame + snippet.offsetFrames,
      volume: Math.pow(10, snippet.gainDb / 20),
    };
  });
  const sfx = board.shots.flatMap((shot) =>
    shot.sound.map(({ id, file, frame, endFrame, ...cue }) => {
      const src = sounds[file];
      if (!src) {
        throw new Error(
          `${board.short}: sound file ${file} (${shot.id} "${id}") is not imported`,
        );
      }
      const durationInFrames =
        endFrame !== undefined ? endFrame - frame : cue.durationInFrames;
      if (
        frame < 0 ||
        frame >= board.durationInFrames ||
        (durationInFrames !== undefined && durationInFrames <= 0)
      ) {
        throw new Error(
          `${board.short}: cue "${id}" falls outside the timeline`,
        );
      }
      return {
        ...cue,
        id: `${shot.id} ${id}`,
        src,
        from: frame,
        durationInFrames,
      };
    }),
  );
  const captions = rawCaptions.cues;
  captions.forEach((c, i) => {
    if (
      c.end <= c.start ||
      c.end > board.durationInFrames ||
      (i > 0 && c.start < captions[i - 1].end) ||
      c.lines.length > 2
    ) {
      throw new Error(
        `${board.short}: caption cue ${i + 1} is out of order, too long or outside the timeline`,
      );
    }
  });
  return { board, narration, sfx, captions };
};

export const episode001Shorts = {
  CandyBarDiscovery: build(
    cbBoard,
    cbManifest,
    cbCaptions,
    {
      "cb01-take01.wav": cb01,
      "cb02-take01.wav": cb02,
      "cb03-take01.wav": cb03,
      "cb04-take01.wav": cb04,
      "cb05-take01.wav": cb05,
      "cb06-take01.wav": cb06,
    },
    {
      "lf-dish-set.wav": cbDishSet,
      "lf-egg-burst.wav": cbEgg,
      "lf-oven-hum-loop.wav": cbOvenHum,
      "lf-paper-slide.wav": cbPaper,
      "lf-pocket-rustle.wav": cbPocket,
      "lf-popcorn-pops.wav": cbPopcorn,
      "lf-stamp.wav": cbStamp,
      "lf-start-beep.wav": cbBeep,
      "lf-tube-hum.wav": cbTube,
      "lf-wave-reflect-1.wav": cbReflect1,
      "lf-wave-reflect-2.wav": cbReflect2,
      "lf-wave-reflect-3.wav": cbReflect3,
      "lf-wrapper-crinkle.wav": cbWrapper,
    },
  ),
  MicrowaveSafeDishes: build(
    dsBoard,
    dsManifest,
    dsCaptions,
    {
      "ds01-take01.wav": ds01,
      "ds02-take01.wav": ds02,
      "ds03-take01.wav": ds03,
      "ds04-take01.wav": ds04,
      "ds05-take01.wav": ds05,
      "ds06-take01.wav": ds06,
      "ds07-take01.wav": ds07,
    },
    {
      "lf-click.wav": dsClick,
      "lf-dish-set.wav": dsDishSet,
      "lf-fork-tap.wav": dsForkTap,
      "lf-glass-clink.wav": dsGlass,
      "lf-mug-tap.wav": dsMug,
      "lf-oven-hum-loop.wav": dsOvenHum,
      "lf-stamp.wav": dsStamp,
      "lf-start-beep.wav": dsBeep,
      "lf-wave-absorb.wav": dsAbsorb,
    },
  ),
  StandingTime: build(
    stBoard,
    stManifest,
    stCaptions,
    {
      "st01-take01.wav": st01,
      "st02-take01.wav": st02,
      "st03-take01.wav": st03,
      "st04-take01.wav": st04,
      "st05-take01.wav": st05,
      "st06-take01.wav": st06,
      "st07-take01.wav": st07,
    },
    {
      "lf-click.wav": stClick,
      "lf-clock-ticks.wav": stClock,
      "lf-fork-tap.wav": stForkTap,
      "lf-start-beep.wav": stBeep,
      "lf-wave-absorb.wav": stAbsorb,
    },
  ),
  SuperheatedWater: build(
    swBoard,
    swManifest,
    swCaptions,
    {
      "sw01-take01.wav": sw01,
      "sw02-take01.wav": sw02,
      "sw03-take01.wav": sw03,
      "sw04-take01.wav": sw04,
      "sw05-take01.wav": sw05,
      "sw06-take01.wav": sw06,
    },
    {
      "lf-click.wav": swClick,
      "lf-mug-tap.wav": swMug,
      "lf-oven-hum-loop.wav": swOvenHum,
      "lf-spoon-stir.wav": swSpoon,
      "lf-water-burst.wav": swBurst,
    },
  ),
};

export type ShortName = keyof typeof episode001Shorts;
