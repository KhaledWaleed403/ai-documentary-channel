// Episode 001 storyboard is the source of truth for shot order, timing and
// on-screen text. Retime shots by editing startFrame/endFrame there.
import storyboard from "../../episodes/episode-001/v2.3/storyboard.json";

export type Shot = (typeof storyboard.shots)[number];

export const episode001 = storyboard;

export const shotDuration = (shot: Shot) => shot.endFrame - shot.startFrame;
