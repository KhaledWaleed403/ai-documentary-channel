# Episode 001 — Captions and subtitles

Every Episode 001 video now ships with captions, as of 2026-10-28.

- **Shorts:** captions are burned in, and a separate `.srt` is provided as well.
- **Long-form:** gets an `.srt` only; its picture stays clean.

Earlier renders were not touched. Each captioned Short is a new version.

| Video | Version | Burned-in | Caption source | `.srt` delivered next to the render |
| --- | --- | --- | --- | --- |
| HowMicrowavesWork (original Short) | v2.4 | yes | `episodes/episode-001/v2.4/captions.json` | `renders/episode-001/Shorts/HowMicrowavesWork/v2.4/episode-001-captions-v2.4.srt` |
| CandyBarDiscovery | v3 | yes | `CandyBarDiscovery/v3/captions.json` | `renders/…/CandyBarDiscovery/v3/CandyBarDiscovery-v3.srt` |
| MicrowaveSafeDishes | v3 | yes | `MicrowaveSafeDishes/v3/captions.json` | `renders/…/MicrowaveSafeDishes/v3/MicrowaveSafeDishes-v3.srt` |
| StandingTime | v2 | yes | `StandingTime/v2/captions.json` | `renders/…/StandingTime/v2/StandingTime-v2.srt` |
| SuperheatedWater | v2 | yes | `SuperheatedWater/v2/captions.json` | `renders/…/SuperheatedWater/v2/SuperheatedWater-v2.srt` |
| Long-form (cut 3) | v3 (assets: long-v1) | no (clean picture) | `episodes/episode-001/long-v1/captions.json` | `renders/episode-001/Long/v3/episode-001-long-cut3.srt` (also `episodes/episode-001/long-v1/captions.srt`) |

## How the timing is made
The script is `scripts/audio/build-ep001-captions.py`. Run it with the Kokoro venv's Python and `-I`; targets look like `short:<Name>:<version>`, `original:v2.4` and `long`. It never guesses from a script: it reads the approved narration takes that the render plays.

1. **Speech window and pauses.** Each take is a separate Kokoro snippet placed at a known frame (shot start + `offsetFrames`). The script measures the take's speech window and the silent gaps inside it (10 ms RMS gate, −45 dBFS). Kokoro pauses at every punctuation mark: 0.4 s at sentence ends, 0.3 s at clauses.
2. **Phrase boundaries.** The narration is split into phrases at punctuation, and each phrase boundary is snapped to the matching measured gap. 208 of the 218 boundaries across all six videos snapped. The other 10 fall back to a weighted character estimate:
   - Shorts: one each in DS04, DS06, ST01 and SH05.
   - Long-form: S2-06, S4-04, S4-06, S5-03 (two) and S6-03.
3. **Splitting into cues.** Long phrases are split into caption-sized cues, timed by their share of the phrase. The rules:
   - never end a cue or line on "the", "a", "to", "and" and similar words;
   - keep pairs like "back and forth" together;
   - balance two lines.
4. **Cue timing.** A cue appears 2 frames before its first word and holds until the next cue, or 8 frames past the last word when there's a pause. The minimum is 0.8 s on Shorts and 1.0 s on the long-form.

**Display text** is the narration word for word, with spoken numbers written as numerals for reading: "mid-1940s", "1945", "1967", "$495", "about 2.5 billion times", "about 10 centimeters", "about 12".

**Limits:** Shorts allow up to about 30 characters per line and two lines per cue. The long-form allows 42 characters per line and two lines.

## Burned-in style (Shorts)
- **Component:** `src/components/Captions.tsx`. Captions are white, bold, 48 px, on a navy backing at 72% opacity with rounded corners. Each cue rises and fades in over 4 frames.
- **Accent words:** a few words per Short, teal for waves and amber for heat:
  - CandyBarDiscovery: invisible, magnetron, waves, melted
  - MicrowaveSafeDishes: scorching, hot, microwave-safe, guarantee
  - StandingTime: standing, heat, microwaves, waves
  - SuperheatedWater: boiling, boil, calm, before
  - HowMicrowavesWork: microwaves, waves, heat, hot
- **Safe area:** the caption block's bottom edge sits at y 1520, just above the bottom 20% where the Shorts UI is. The text is centred between x 70 and x 930, clear of the right-hand button column.
- **Making room:** so captions never cover the picture, the scene layer is scaled toward the top, about (540, 130):
  - CandyBarDiscovery, MicrowaveSafeDishes, StandingTime and SuperheatedWater: scaled to 0.88, with soft edges fading into the navy background.
  - HowMicrowavesWork: scaled to 0.86, because its picture reaches y ≈ 1550. Its full-bleed ivory, mist-blue and navy backgrounds continue into the margins through a heavily blurred, silent copy of the same frame. `Episode001.tsx` itself is unchanged; the wrapper is `src/compositions/Episode001Captioned.tsx`.
- **Visual changes in this version:** MicrowaveSafeDishes v3 drops the last chip ("food: the hottest thing out"). It sat in the caption band and only repeated the narration, which the caption now carries.

## Validation
- **Spelling and wording:** I proofread every cue against the approved narration (and the storyboard text it's checked against). The only differences are the numeral display forms listed above. The em dashes and the names Percy Spencer, Raytheon, magnetron and FDA are checked.
- **Structure:** `src/data/episode001Shorts.ts` rejects any cue that overlaps the next, runs outside the timeline or has more than two lines.
- **Layout:** every cue of every captioned Short was checked in contact-sheet stills (each cue's midpoint, half-scale preview) for line breaks, overlap with the picture and the safe area. Overlaps found and fixed before the final render:
  - the original Short's thermometer, hot/cold labels and final bowl;
  - MicrowaveSafeDishes' closing chip.
- **Sync:** checked by construction against the measured pauses. Nobody has watched the full renders with sound yet; please spot-check a few cue changes by ear.

## Publishing
- Upload each `.srt` as the video's English subtitles.
- On Shorts with burned-in captions, keep YouTube's automatic captions off (or don't publish auto-captions as a default track), so the platform's captions never sit on top of the burned-in ones.
- Don't rely on auto-generated captions; the `.srt` is the reference.
