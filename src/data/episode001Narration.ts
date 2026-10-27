// Episode 001 narration: one approved snippet per shot. Source of truth is
// episodes/episode-001/v2.3/assets/audio/vo/manifest.json (takes, approvals, offsets).
// Renders only read these files; TTS never runs during a render.
import manifest from "../../episodes/episode-001/v2.3/assets/audio/vo/manifest.json";
import sh01 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh01-take09.wav";
import sh02 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh02-take03.wav";
import sh03 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh03-take02.wav";
import sh04 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh04-take02.wav";
import sh05 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh05-take02.wav";
import sh06 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh06-take02.wav";
import sh07 from "../../episodes/episode-001/v2.3/assets/audio/vo/sh07-take02.wav";
import { episode001 } from "./episode001";

// Approved take files imported above, keyed by manifest filename. Approving a
// different take means importing it here too, or the check below throws.
const files: Record<string, string> = {
  "sh01-take09.wav": sh01,
  "sh02-take03.wav": sh02,
  "sh03-take02.wav": sh03,
  "sh04-take02.wav": sh04,
  "sh05-take02.wav": sh05,
  "sh06-take02.wav": sh06,
  "sh07-take02.wav": sh07,
};

// Kokoro snippets measure about -25.7 LUFS with true peaks up to -6.7 dBTP.
// +5.5 dB keeps every peak below -1 dBTP.
export const narrationVolume = 1.88;

export type NarrationCue = { id: string; src: string; shot: string; offset: number };

export const episode001Narration: NarrationCue[] = episode001.shots.map((shot) => {
  const snippet = manifest.snippets.find((s) => s.shot === shot.id);
  if (!snippet) {
    throw new Error(`Narration manifest has no snippet for ${shot.id}`);
  }
  if (snippet.text !== shot.narration) {
    throw new Error(
      `Narration text for ${shot.id} differs from storyboard.json: "${snippet.text}" vs "${shot.narration}"`,
    );
  }
  if (!snippet.approvedTake) {
    throw new Error(`Narration ${shot.id} has no approved take`);
  }
  const src = files[snippet.approvedTake];
  if (!src) {
    throw new Error(`Approved take ${snippet.approvedTake} for ${shot.id} isn't imported in episode001Narration.ts`);
  }
  return { id: `VO ${shot.id}`, src, shot: shot.id, offset: snippet.offsetFrames };
});
