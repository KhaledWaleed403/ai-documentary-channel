# Episode 003 Shorts — Production Report (v1)

Rendered 2026-10-31. 1080 × 1920, 30 fps, H.264 + AAC. Masters normalised to −14 LUFS with true peak ≤ −1.5 dBTP. **Nobody has watched or listened to them yet, and nothing has been uploaded.**

| # | Short | Title (burned in) | Length | Master | Captions | Narration |
|---|---|---|---|---|---|---|
| 1 | `GravityAssistSpeed` | How Can a Planet Speed Up a Spacecraft? | 38.3 s | `renders/episode-003/Shorts/GravityAssistSpeed/v1/GravityAssistSpeed-v1-master.mp4` (−14.4 LUFS, −1.69 dBTP) | burned in + `GravityAssistSpeed-v1.srt` | `episodes/episode-003/shorts/GravityAssistSpeed/GravityAssistSpeed-narration.wav` |
| 2 | `ReachingTheSun` | How Do You Reach the Sun When Earth Is Moving So Fast? | 39.2 s | `renders/episode-003/Shorts/ReachingTheSun/v1/ReachingTheSun-v1-master.mp4` (−14.5 LUFS, −1.69 dBTP) | burned in + `ReachingTheSun-v1.srt` | `episodes/episode-003/shorts/ReachingTheSun/ReachingTheSun-narration.wav` |
| 3 | `VoyagerAlignment` | Why Did Voyager Need a Rare Planetary Alignment? | 41.4 s | `renders/episode-003/Shorts/VoyagerAlignment/v1/VoyagerAlignment-v1-master.mp4` (−14.5 LUFS, −1.69 dBTP) | burned in + `VoyagerAlignment-v1.srt` | `episodes/episode-003/shorts/VoyagerAlignment/VoyagerAlignment-narration.wav` |

Upload the `-master.mp4` files. Each folder also keeps the raw render (`*-v1.mp4`).

## Sources of truth

| Item | File |
|---|---|
| Scripts, with claim tags | `episodes/episode-003/shorts/scripts.md` |
| Narration lines | `episodes/episode-003/shorts/narration.json` |
| Takes and measurements | `episodes/episode-003/shorts/assets/audio/vo/` (`t1-1-take01.wav` …, `manifest.json`) |
| Timing and captions | `episodes/episode-003/shorts/timeline.json`; `shorts/<ShortName>/captions.json`, `captions.srt` |
| Code | `src/compositions/Episode003Shorts.tsx` (`Ep003Short-<ShortName>`), `src/scenes/episode003/shortScenes.tsx`, `src/data/episode003Shorts.ts` |
| Scripts used | `scripts/audio/generate-ep003-vo.py` (long-form and Shorts takes), `scripts/audio/build-ep003-timeline.py` (timing and captions) |

## What each Short shows

1. **GravityAssistSpeed.**
   - Opens on a Sun-frame flyby already in motion, with a "speed rel. Sun" bar growing.
   - The planet's view follows: a "speed rel. Jupiter" bar returns to its arrival mark, and the arriving and leaving arrows have the same length but different directions.
   - Then the Sun's view again: the planet-relative curve is carried along by Jupiter (dashed), the Jupiter-relative bar ends level, and the Sun-relative bar ends longer.
   - Closes on "borrowed from Jupiter's orbit · almost imperceptible change".
2. **ReachingTheSun.**
   - Opens with a probe swinging past the Sun instead of falling in.
   - Earth carries a ~30 km/s sideways arrow. An "aimed here" line runs to the Sun, but the actual path misses it.
   - Parker's first orbit morphs into its final orbit inside Venus's orbit. One cumulative "orbital energy rel. Sun" bar falls, and there are seven Venus ticks. Venus is never shown adding speed.
   - Ends on the dive and "24 Dec 2024 · closest any spacecraft has come to the Sun".
3. **VoyagerAlignment.**
   - Opens on a time-lapse of the giant planets at their true relative orbital rates, with a year counter running to 1977.
   - The planets settle into a favourable arrangement, labelled "not a straight line". Voyager 2's path bends past each giant, with encounter years.
   - Ends on one cumulative speed comparison, "more than doubled", with no numbers.

## Claims

Every factual line cites a C-number from `research/episode-003/verified-scientific-claims.md`. One claim was added for Short 2:
- **C40:** Parker's 24 Dec 2024 pass was the closest any spacecraft has come to the Sun. Source: NASA Science, "NASA's Parker Solar Probe Makes History With Closest Pass to Sun" ("a new record"). It was already cited in the fact-check (P02) but wasn't in the ledger.

No other new numbers. The on-screen "~53,000 mph", "~30 km/s", "7 Venus flybys", "24 Dec 2024", the encounter years and "~once every 175 years" are C15, C13, C31, C32, C20 and C25.

## Checks done

- **Audio:** 17 takes. Speech level is consistent with the long-form takes, with no clipping. Every take plays at one shared gain.
- **Pronunciation:** checked from Kokoro's phonemes, not by ear. "Voyager 2" with no possessive was fine. "Io" doesn't occur in the Shorts.
- **Captions:**
  - The same proportional timing within each take as Episode 002.
  - 28 characters × 2 lines at 50 px, white on a navy backing, block bottom at y 1520.
  - Line breaks were fixed so no cue ends on a weak word ("the", "if", "and"…) and no cue has a one-word last line.
- **Frames:** sampled frames from every Short are checked for layout. Diagrams sit between y ≈ 400 and 1330; titles sit at y 170–370.

## Unresolved

1. **No human listen yet.** Pacing, tone and pronunciation have only been checked by measurement and phonemes.
2. **Short 3 runs 41.4 s,** slightly over the 25–40 s target. To shorten it, trim line 1's "One trip."
3. **Pointing viewers to the full episode.** The Shorts stand alone (no "watch the full episode" line), following the Episode 002 Shorts convention. Use YouTube's "Related video" link to the long-form once it's uploaded.
4. **No thumbnails or covers, and no publication packages** (`thumbnails/episode-003/`, `publication/episode-003/`) yet.
5. **Short 1:** in the final seconds the start of the Sun-frame path runs close to the "borrowed from Jupiter's orbit" note on small screens. It reads, but it could be nudged in a v2.

## v2 (2026-10-31): new hooks

The on-screen titles are rewritten as a "How to…" set. Title size goes from 58 to 74 and the line breaks are balanced. Narration, visuals and captions are the same as v1.

| Short | Title | Length | Upload |
|---|---|---|---|
| `GravityAssistSpeed` | How to Steal Speed From a Planet | 38.3 s | `renders/episode-003/Shorts/GravityAssistSpeed/v2/GravityAssistSpeed-v2-master.mp4` (−14.4 LUFS, −1.7 dBTP) |
| `ReachingTheSun` | How to Fall Into the Sun | 39.3 s | `renders/episode-003/Shorts/ReachingTheSun/v2/ReachingTheSun-v2-master.mp4` (−14.5 LUFS, −1.7 dBTP) |
| `VoyagerAlignment` | How to Fly to Uranus | 41.4 s | `renders/episode-003/Shorts/VoyagerAlignment/v2/VoyagerAlignment-v2-master.mp4` (−14.5 LUFS, −1.7 dBTP) |
