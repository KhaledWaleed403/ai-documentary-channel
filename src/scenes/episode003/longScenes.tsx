// Episode 003 long-form scene registry (16:9). Scene components receive local
// frames `t`, the scene length and the local start/end frames of its narration lines.
import type React from "react";
import { S03, S04, S07, S08 } from "./flybyScenes";
import { S05, S06, type SceneProps } from "./frameScenes";
import { S01, S02, S09, S10, S11, S12, S13, S14 } from "./missionScenes";

export const LONG_SCENES: Record<number, React.FC<SceneProps>> = {
  1: S01,
  2: S02,
  3: S03,
  4: S04,
  5: S05,
  6: S06,
  7: S07,
  8: S08,
  9: S09,
  10: S10,
  11: S11,
  12: S12,
  13: S13,
  14: S14,
};
