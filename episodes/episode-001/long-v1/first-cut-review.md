# Episode 001 Long-Form — First Cut Review

**Date:** 2026-10-28

## Files
- **Deliverable (mastered):** `renders/episode-001/long-v1/episode-001-long-first-cut-master.mp4`
- **Raw Remotion render:** `renders/episode-001/long-v1/episode-001-long-first-cut.mp4`
- **Composition:** `Episode001Long`. `Episode001LongDraft` is the same cut with the shot ID and timecode burned in.

## Export check
Both files were checked with `ffprobe`. The master also decoded fully with no errors.

| Property | Value |
| --- | --- |
| Video | H.264, 1920×1080, 30 fps, 12,979 frames |
| Runtime | 7:12.6 |
| Audio | AAC, 48 kHz stereo, 320 kbps |
| Size | ~106 MB |
| Loudness (master) | −14.30 LUFS integrated, −1.62 dBTP true peak, LRA 3.9 LU. Measured with `loudnorm` per `docs/production-workflow.md` stage 8; `TP=-1.7` was used because `-1.5` landed at −1.45 dBTP. |
| Loudness (raw) | −20.1 LUFS, −4.3 dBTP. No clipping. |

## Validation
- **Missing assets:** the render completed with exit code 0. All 34 narration takes and all 56 sound cues resolve at bundle time; `episode001LongNarration.ts` and `episode001LongAudio.ts` throw on any missing file, text mismatch or out-of-range cue.
- **Narration text:**
  - Each manifest `text` matches `storyboard.json` (checked at build time) and `script.md` v2.1 (checked when the storyboard was generated).
  - The approved narration wasn't changed.
- **Sync:** shot lengths come from each take's measured speech end, and each snippet starts 6 frames after its shot (36 frames for S1-01). Visual beats and sound cues are pinned to storyboard frames. This was checked by construction and in still frames; **nobody has listened to it yet**.
- **Continuity:** a frame from late in every shot (34 total) was reviewed after the second render. These issues were found and fixed:
  - title underline overlapping the title;
  - magnetron counter only reaching 152;
  - jagged wave ends;
  - the balance overlapping the silhouette;
  - a duplicate "slowed" label;
  - the eruption droplets reading as brown;
  - the patent header and stamp being oversized;
  - the S3-03 silhouette overlapping the countertop.
- **Scientific accuracy:** the storyboard's accuracy checks hold in the render.
  - Molecules twist only part of the way, never full spins; the propeller spin appears only crossed out.
  - Heat is shown only as colour or a thermometer.
  - The cross-section has a thick outer heating band and the centre warms later.
  - The turntable result stays mottled, and cooler spots remain until the stir.
  - The dance-floor analogy appears only inside its framed "analogy" style.
  - "simplified" and "animated demo · spacing varies by oven" labels are on screen.
  - The "resonance" myth is shown only to be stamped NO.
- **Short untouched:** `git status` shows no changes under `episodes/episode-001/v2.3/`, the Short's research files, `src/scenes/episode001/`, the Short's `src/data` files or `Episode001.tsx`. The Short's audio was only read and byte-copied.

## Known issues (first cut)
1. **Not reviewed by ear.** Narration pronunciation was checked only through Kokoro's phonemes; "Radarange" and "Raytheon" look right on paper. Sound levels were set by measurement.
2. **S4-03 narration** gets +1.6 dB instead of +5.5 dB because of a hot plosive, so it may sound slightly quieter than the lines around it.
3. **Patent stamp (S2-06)** still overhangs the right edge of the schematic page. It's legible and cosmetic.
4. **End card** has a placeholder text slot for the Short link; there is no clickable element.
5. **Runtime** is 7:12.6, 16 s under the 7:29 estimate, because the takes read faster than estimated. It's within the 6–8 min brief, and nothing was padded.
6. **Foley sources** are 128 kbps Freesound HQ previews. That's fine at these low levels, but check by ear.
7. **Patent figure:** the storyboard planned to trace the patent's own drawing. The cut uses an original schematic instead (see `shot-asset-breakdown.md`).

---

## Cut 2: changes from review notes (2026-10-28)
Files: `renders/episode-001/long-v1/episode-001-long-cut2.mp4` (raw) and `episode-001-long-cut2-master.mp4` (mastered). The first-cut files are kept for comparison. The narration and timing haven't changed (12,979 frames, 7:12.6).

| Note | Change |
| --- | --- |
| 00:17 | Removed the wave sound (S1-02); the tube hum stays. Removed the "waves shown conceptually · not to scale" caption. |
| 00:33 | Removed the wave sound under the title underline (S1-03). |
| 01:11 | Removed the "generic chamber · schematic" caption (S2-05). |
| 02:24 | Removed the "waves: schematic" caption (S4-01). |
| 02:44 | Removed the "slowed ~2,500,000,000×" indicator (S4-02). |
| 02:52 | Removed the cm → nm scale indicator (S4-03). |
| 03:12 | Removed the "analogy" tag (S4-04). The dashed analogy frame and the line "That's only a picture" still mark it as an analogy. |
| 03:42 | Removed the warm heat-swell sound under the thermometer (S4-05). |
| 04:18 / 04:25 | The wave inset (S5-02) and the spoonful graph (S5-04) now sit beside the oven floor instead of over it. Inside the inset, the label sits above the wave drawings. |
| 06:56 | The warm heat chord now plays **only at the finale** (S7-02). Its other uses are removed: the S2-05 chamber swell, S4-05, the S4-07 heat spread, the four S5-04 heat blips and the S6-04 runaway steps. |
| 07:10 | Removed "Watch the Short: the 40-second version" from the end card; the title remains. |

**Accuracy note:** removing the on-screen "slowed", scale and "analogy" labels means those cues now rely on the narration ("billions of times a second", "Here's a picture that helps … That's only a picture") and on the dashed analogy frame. The "simplified" and "animated demo · spacing varies by oven" labels in Scene 5 are kept, since they weren't flagged.

## Cut 3: changes from review notes (2026-10-28)
Files: `renders/episode-001/long-v1/episode-001-long-cut3.mp4` (raw) and `episode-001-long-cut3-master.mp4` (mastered). The narration and timing haven't changed.

| Note | Change |
| --- | --- |
| Pocket (S1-01, S7-03) | The candy bar is narrower (it now fits the pocket's width) and stays tucked in the pocket, peeking over the edge as it sags. The hand lets go and fades out once the bar is up, so it no longer covers the bar. The S7-03 callback uses the same pose. |
| 04:37 | Removed the "animated demo · spacing varies by oven" caption (S5-03). |
| 06:56 | Removed the finale heat chord. The warm heat motif no longer appears anywhere; the episode ends on the done beep, the wrapper crinkle and then silence. |
