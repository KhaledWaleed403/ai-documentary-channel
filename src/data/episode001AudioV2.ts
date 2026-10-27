// Episode 001 sound design V2 (no music). Spec and cue sheet:
// episodes/episode-001/v2.3/sound-design-v2.md. Files come from
// scripts/audio/generate-ep001-sfx-v2.mjs; renders only read them.
// V1 stays in episode001Audio.ts; the composition's `sfx` prop picks one.
// Offsets are frames from the shot start, synced to the scene code's own
// timings (noted per cue as absolute frames).
import manifest from "../../episodes/episode-001/v2.3/assets/audio/vo/manifest.json";
import bowlIn from "../../episodes/episode-001/v2.3/assets/audio/foley/bowl-slide-in-v2.wav";
import bowlOut from "../../episodes/episode-001/v2.3/assets/audio/foley/bowl-slide-out-v2.wav";
import doorClose from "../../episodes/episode-001/v2.3/assets/audio/foley/door-close-v2.wav";
import doorOpen from "../../episodes/episode-001/v2.3/assets/audio/foley/door-open-v2.wav";
import electric from "../../episodes/episode-001/v2.3/assets/audio/sfx/electric-pulse-v2.wav";
import heatFinale from "../../episodes/episode-001/v2.3/assets/audio/sfx/heat-finale-v2.wav";
import ovenRun from "../../episodes/episode-001/v2.3/assets/audio/sfx/oven-startup-run-v2.wav";
import turntable from "../../episodes/episode-001/v2.3/assets/audio/sfx/turntable-motor-v2.wav";
import waveEcho from "../../episodes/episode-001/v2.3/assets/audio/sfx/wave-emit-echo-v2.wav";
import waveEmit from "../../episodes/episode-001/v2.3/assets/audio/sfx/wave-emit-v2.wav";
import type { AudioCueData } from "./episode001Audio";
import { episode001 } from "./episode001";

// V1's cue shape, plus `duck` for beds that dip under narration.
export type AudioCueDataV2 = AudioCueData & { duck?: boolean };

// Beds marked `duck` drop to this gain while narration is speaking.
const DUCK = 0.5;
const DUCK_RAMP = 6;

// Narration windows (absolute frames) from the approved takes' measured
// speech start/end in the vo manifest.
export const speechWindows: [number, number][] = manifest.snippets.map((snippet) => {
  const shot = episode001.shots.find((s) => s.id === snippet.shot);
  const take = snippet.takes.find((t) => t.file === snippet.approvedTake);
  if (!shot || take?.speechStartSeconds === undefined || take.speechEndSeconds === undefined) {
    throw new Error(`No shot or measured approved take for narration ${snippet.shot}`);
  }
  const start = shot.startFrame + snippet.offsetFrames;
  return [start + take.speechStartSeconds * episode001.fps, start + take.speechEndSeconds * episode001.fps];
});

// Smooth sidechain-style gain: 1 in narration gaps, DUCK under speech.
export const duckAt = (frame: number) => {
  let speaking = 0;
  for (const [start, end] of speechWindows) {
    const into = Math.min(1, Math.max(0, (frame - (start - DUCK_RAMP)) / DUCK_RAMP));
    const out = Math.min(1, Math.max(0, (end + DUCK_RAMP - frame) / DUCK_RAMP));
    speaking = Math.max(speaking, Math.min(into, out));
  }
  return 1 - (1 - DUCK) * speaking;
};

// Revision 2 (2026-10-28, review feedback): sparse on purpose. Wave pings,
// spoon, transition sounds and the ending wave icon are gone; the finale
// (bowl settling at centre frame) was restored in 2.2, wave-free since 2.3. Unused V2 files
// stay on disk (see sound-design-v2.md).
export const episode001CuesV2: AudioCueDataV2[] = [
  // SH01 — bowl slides in (6–46, file starts 1 frame early), door latches (64).
  { id: "V2 bowl slide in", src: bowlIn, shot: "SH01", offset: 5, volume: 0.32 },
  { id: "V2 door close", src: doorClose, shot: "SH01", offset: 64, volume: 0.4 },
  // Oven starts once the door is shut: relay click, hum + fan spin-up, running bed
  // through SH02/SH03, fading out across the SH03 zoom.
  { id: "V2 oven start-up + run", src: ovenRun, shot: "SH01", offset: 70, durationInFrames: 305, volume: 0.6, fadeOut: 30, duck: true },
  // SH02 — power pulse travels up the feed (134–164), first wave leaves the
  // magnetron (166), second wave (190).
  { id: "V2 electric pulse", src: electric, shot: "SH02", offset: 14, volume: 0.35 },
  { id: "V2 wave emit", src: waveEmit, shot: "SH02", offset: 46, volume: 0.18 },
  { id: "V2 wave emit echo", src: waveEcho, shot: "SH02", offset: 70, volume: 0.1 },
  // SH06 — turntable: engage click 939, speed curve 940–1060, stop 1060.
  { id: "V2 turntable motor", src: turntable, shot: "SH06", offset: 50, volume: 0.28 },
  // SH07 — door releases (1080–1098), bowl slides out to centre frame (1096–1132).
  { id: "V2 door open", src: doorOpen, shot: "SH07", offset: 1, volume: 0.5 },
  { id: "V2 bowl slide out", src: bowlOut, shot: "SH07", offset: 15, volume: 0.3 },
  // Finale: as the oven fades and the view settles on the bowl (1152+), a warm
  // chord resolves and fades by the last frame. No wave sound (revision 2.3).
  { id: "V2 finale", src: heatFinale, shot: "SH07", offset: 72, durationInFrames: 78, volume: 0.45, duck: true },
];
