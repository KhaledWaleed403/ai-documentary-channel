// Episode 001 long-form storyboard (episodes/episode-001/long-v1/storyboard.json)
// is the source of truth for shot order, timing, visual beats and on-screen text.
// Shot timing was set from the measured narration takes.
import storyboard from "../../episodes/episode-001/long-v1/storyboard.json";

export type LongShot = (typeof storyboard.shots)[number];

export const episode001Long = storyboard;

export const longShot = (id: string): LongShot => {
  const shot = storyboard.shots.find((s) => s.id === id);
  if (!shot) {
    throw new Error(`Unknown long-form shot ${id}`);
  }
  return shot;
};
