// Episode 001 long-form narration: one approved Kokoro snippet per shot.
// Source of truth: episodes/episode-001/long-v1/assets/audio/vo/manifest.json
// (takes, approvals, offsets, measured loudness). Renders only read these files.
import manifest from "../../episodes/episode-001/long-v1/assets/audio/vo/manifest.json";
import s1_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s1-01-take01.wav";
import s1_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s1-02-take01.wav";
import s1_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s1-03-take01.wav";
import s2_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-01-take01.wav";
import s2_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-02-take01.wav";
import s2_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-03-take01.wav";
import s2_04 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-04-take01.wav";
import s2_05 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-05-take01.wav";
import s2_06 from "../../episodes/episode-001/long-v1/assets/audio/vo/s2-06-take01.wav";
import s3_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s3-01-take01.wav";
import s3_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s3-02-take01.wav";
import s3_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s3-03-take01.wav";
import s3_04 from "../../episodes/episode-001/long-v1/assets/audio/vo/s3-04-take01.wav";
import s3_05 from "../../episodes/episode-001/long-v1/assets/audio/vo/s3-05-take01.wav";
import s4_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-01-take01.wav";
import s4_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-02-take01.wav";
import s4_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-03-take01.wav";
import s4_04 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-04-take01.wav";
import s4_05 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-05-take01.wav";
import s4_06 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-06-take01.wav";
import s4_07 from "../../episodes/episode-001/long-v1/assets/audio/vo/s4-07-take01.wav";
import s5_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s5-01-take01.wav";
import s5_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s5-02-take01.wav";
import s5_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s5-03-take01.wav";
import s5_04 from "../../episodes/episode-001/long-v1/assets/audio/vo/s5-04-take01.wav";
import s5_05 from "../../episodes/episode-001/long-v1/assets/audio/vo/s5-05-take01.wav";
import s6_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s6-01-take01.wav";
import s6_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s6-02-take01.wav";
import s6_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s6-03-take01.wav";
import s6_04 from "../../episodes/episode-001/long-v1/assets/audio/vo/s6-04-take01.wav";
import s6_05 from "../../episodes/episode-001/long-v1/assets/audio/vo/s6-05-take01.wav";
import s7_01 from "../../episodes/episode-001/long-v1/assets/audio/vo/s7-01-take01.wav";
import s7_02 from "../../episodes/episode-001/long-v1/assets/audio/vo/s7-02-take01.wav";
import s7_03 from "../../episodes/episode-001/long-v1/assets/audio/vo/s7-03-take01.wav";
import { episode001Long } from "./episode001Long";

const files: Record<string, string> = {
  "s1-01-take01.wav": s1_01,
  "s1-02-take01.wav": s1_02,
  "s1-03-take01.wav": s1_03,
  "s2-01-take01.wav": s2_01,
  "s2-02-take01.wav": s2_02,
  "s2-03-take01.wav": s2_03,
  "s2-04-take01.wav": s2_04,
  "s2-05-take01.wav": s2_05,
  "s2-06-take01.wav": s2_06,
  "s3-01-take01.wav": s3_01,
  "s3-02-take01.wav": s3_02,
  "s3-03-take01.wav": s3_03,
  "s3-04-take01.wav": s3_04,
  "s3-05-take01.wav": s3_05,
  "s4-01-take01.wav": s4_01,
  "s4-02-take01.wav": s4_02,
  "s4-03-take01.wav": s4_03,
  "s4-04-take01.wav": s4_04,
  "s4-05-take01.wav": s4_05,
  "s4-06-take01.wav": s4_06,
  "s4-07-take01.wav": s4_07,
  "s5-01-take01.wav": s5_01,
  "s5-02-take01.wav": s5_02,
  "s5-03-take01.wav": s5_03,
  "s5-04-take01.wav": s5_04,
  "s5-05-take01.wav": s5_05,
  "s6-01-take01.wav": s6_01,
  "s6-02-take01.wav": s6_02,
  "s6-03-take01.wav": s6_03,
  "s6-04-take01.wav": s6_04,
  "s6-05-take01.wav": s6_05,
  "s7-01-take01.wav": s7_01,
  "s7-02-take01.wav": s7_02,
  "s7-03-take01.wav": s7_03,
};

export type LongNarrationCue = { id: string; src: string; shot: string; offset: number; volume: number };

// Per-snippet gain from the manifest: +5.5 dB, capped so each take's true peak
// stays at or below -1.5 dBTP before mastering (S4-03 has a hot plosive).
export const episode001LongNarration: LongNarrationCue[] = episode001Long.shots.map((shot) => {
  const snippet = manifest.snippets.find((s) => s.shot === shot.id);
  if (!snippet) {
    throw new Error(`Narration manifest has no snippet for ${shot.id}`);
  }
  if (snippet.text !== shot.narration) {
    throw new Error(`Narration text for ${shot.id} differs from storyboard.json`);
  }
  const src = snippet.approvedTake ? files[snippet.approvedTake] : undefined;
  if (!src) {
    throw new Error(`Approved take for ${shot.id} is missing or not imported`);
  }
  if (snippet.offsetFrames !== shot.offsetFrames) {
    throw new Error(`Narration offset for ${shot.id} differs from storyboard.json`);
  }
  return { id: `VO ${shot.id}`, src, shot: shot.id, offset: snippet.offsetFrames, volume: Math.pow(10, snippet.gainDb / 20) };
});
