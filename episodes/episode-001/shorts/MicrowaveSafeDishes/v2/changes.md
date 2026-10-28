# MicrowaveSafeDishes v2 — Changes from v1

**Review note (2026-10-28):** at 0:40 (DS06, the water-cup check) the dish stuck out below the bottom of the oven box.

**Fix (in `src/scenes/episode001Shorts/MicrowaveSafeDishes.tsx`, `DS06WaterCup`):**
- The oven box is now 60 px taller (y 340–960).
- The empty dish is smaller (240 px wide, base at y 890), and the cup of water was lowered to sit on the same floor. Both are fully inside the box.
- The two outcome rows and "not a guarantee" moved down 60 px to make room; the lowest text sits at y 1420, inside the safe area.

**Unchanged:** narration, timing, storyboard and sound. They're still the v1 files in `../v1/` (`storyboard.json`, `assets/audio/vo/`, `captions.srt`, `script.md`, `shot-plan.md`).

**Render:** `renders/episode-001/Shorts/MicrowaveSafeDishes/v2/` (49.0 s, same as v1). The v1 render is kept in `../v1/`.
