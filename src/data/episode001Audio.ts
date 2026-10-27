// Episode 001 sound design. Cue sheet: episodes/episode-001/v2.3/audio-plan.md.
// Cues are anchored to a shot + frame offset so they follow storyboard retiming.
import music from "../../episodes/episode-001/v2.3/assets/audio/music/ep001-music-bed.wav";
import beep from "../../episodes/episode-001/v2.3/assets/audio/sfx/s3-start-beep.wav";
import ovenHum from "../../episodes/episode-001/v2.3/assets/audio/sfx/s4-oven-hum-loop.wav";
import riser from "../../episodes/episode-001/v2.3/assets/audio/sfx/s5-zoom-riser.wav";
import motorHum from "../../episodes/episode-001/v2.3/assets/audio/sfx/s6-turntable-motor-loop.wav";
import electric from "../../episodes/episode-001/v2.3/assets/audio/sfx/t1-electric-activation.wav";
import shimmer from "../../episodes/episode-001/v2.3/assets/audio/sfx/t2-microwave-shimmer.wav";
import heatSwell from "../../episodes/episode-001/v2.3/assets/audio/sfx/t3-heat-swell.wav";

export type AudioCueData = {
  id: string;
  src: string;
  shot: string;
  offset: number;
  durationInFrames?: number;
  volume: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

// Starts on frame 0; the file's own ending resolves at 40 s and is silent by 41 s.
export const musicBed = { src: music, volume: 1 };

// Not listed yet: Foley the user is recording (A2/A14 bowl slide, A3 door
// close, A12 spoon stir, A13 door open). Those moments are silent for now.
export const episode001Cues: AudioCueData[] = [
  { id: "A4 start beep", src: beep, shot: "SH01", offset: 70, volume: 0.4 },
  { id: "A5 oven hum", src: ovenHum, shot: "SH01", offset: 70, durationInFrames: 305, volume: 0.35, fadeIn: 10, fadeOut: 30, loop: true },
  { id: "A6 electric swell", src: electric, shot: "SH02", offset: 14, volume: 0.5 },
  { id: "A7 microwave shimmer", src: shimmer, shot: "SH02", offset: 46, volume: 0.5 },
  // 1.05 s riser ends on the SH04 cut.
  { id: "A8 zoom riser", src: riser, shot: "SH03", offset: 89, volume: 0.45 },
  { id: "A10 heat swell", src: heatSwell, shot: "SH05", offset: 125, volume: 0.5 },
  { id: "A11 turntable motor", src: motorHum, shot: "SH06", offset: 50, durationInFrames: 130, volume: 0.35, fadeIn: 20, fadeOut: 20, loop: true },
];
