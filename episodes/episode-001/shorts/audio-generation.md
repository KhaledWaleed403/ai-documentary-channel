# Episode 001 Shorts batch (v1) — Audio Generation Log

Covers `CandyBarDiscovery`, `MicrowaveSafeDishes`, `StandingTime` and `SuperheatedWater`. Each Short keeps its own audio in `<ShortName>/v1/assets/audio/`.

## Narration
- **Engine and voice:** Kokoro-82M v1.0 via `kokoro-onnx`, run by `~/.luminexplain-kokoro/scripts/kokoro_snippet.py` in its own venv, outside the project. Voice `af_heart`, speed 1.0, `en-us`, `--sentence-pause 0.4 --clause-pause 0.3`, the same settings as the long-form and the original Short.
- **Builder:** `scripts/audio/build-ep001-shorts.py`.
  - Run it with the Kokoro venv's Python and `-I`, from the project root.
  - `--generate` creates `take01` for any snippet that has none. It never overwrites a take; the Kokoro script also refuses to.
  - Every run re-measures the approved takes and rewrites the timing in `storyboard.json`, plus `captions.srt`.
- **Takes:** 26 snippets in total, one per shot (CB01–CB06, DS01–DS07, ST01–ST07, SW01–SW06). Each is saved as `assets/audio/vo/<id>-take01.wav`: 24 kHz mono PCM16, generated 2026-10-28, status `approved`.
- **Text check:** each manifest `text` was copied from `storyboard.json`. `src/data/episode001Shorts.ts` throws if the text, offset or approved take ever differs.
- **Measured** (per take in the manifest):
  - Speech start and end, from a 10 ms RMS gate at −45 dBFS.
  - Integrated loudness: −24.99 to −26.31 LUFS.
  - True peak: −3.79 to −9.62 dBTP (from ffmpeg `loudnorm` analysis; Remotion's ffmpeg build has no `ebur128`).
  - SHA-256.
- **Gain in Remotion:** +5.5 dB, capped so each take's true peak stays at or below −1.5 dBTP (`gainDb`), the same rule as the long-form. Eight takes are capped: ST02 +2.3, SW05 +3.2, DS05 +4.1, DS07 +4.3, SW04 +4.4, ST04 +4.7, ST05 +5.0, DS06 +5.1. ST02 may sound slightly quieter than its neighbours.
- **Pronunciation:** checked only through Kokoro's phonemizer, not by ear:
  - "FDA" → /ˌɛfdˌiːˈeɪ/
  - "Raytheon" → /ˈɹeɪθɪən/
  - "magnetron" → /ˈmæɡnɪtɹˌɑːn/
  - "unlabeled" → /ʌnlˈeɪbəld/
  - "nineteen forty-five" read as words.
- **Timing:**
  - Shot length = `offsetFrames` (14 for the first shot, 30 for ST01 so the beep comes first, 6 otherwise) + the take's speech end + a visual tail (8–14 frames; 40–42 on each final shot).
  - Visual beats sit at the anchor word's estimated position in the take, with punctuation pauses weighted.

## Sound effects
- **No new sounds were downloaded or synthesized.** Every effect is a byte copy, hash-verified by the builder, of an existing long-form asset from `episodes/episode-001/long-v1/assets/audio/{sfx,foley}/`. The copies live in each Short's `assets/audio/sfx/` and keep their `lf-*` names. The long-form files were only read.
- **Licences:** the Foley sources are CC0 1.0 (Freesound); their authors and URLs are in `episodes/episode-001/long-v1/audio-credits.md`. The tonal effects (wave reflect/absorb, start beep, oven hum, tube hum, click, clock ticks) are original sounds from the project's own generators: `scripts/audio/generate-ep001-sfx-v2.mjs` (the original Short's set, which the long-form copied) and `scripts/audio/build-ep001-long-sfx.py`. Optional description credit, limited to the Foley actually used: "Foley sounds via Freesound (CC0): melle_teich, BluetoothBoy, buzzatsea, michaelperfect, davdud101, NoisyRedFox, semccab, eddies2000, 16HPanskaZavadovsky_Igor, Erbsland-Music, dynamique."
- **Deliberately not used:** the warm heat-swell/heat-chord motif (removed from the long-form in cut 3) and any music. A bubbling cue for SW02 was considered and dropped, because popcorn-derived pops would imply an action not shown.
- **Placement:** cues are listed per shot in each `storyboard.json` (`sound`). Each one is anchored to a visual beat, so it moves with retiming. The levels follow the long-form: 0.12–0.16 for loops and tonal cues under speech, 0.2–0.35 for Foley, and 0.46–0.5 for the two big transients (popcorn and egg in CB03, the eruption in SW04).

| File | Used in |
| --- | --- |
| `lf-pocket-rustle.wav`, `lf-wrapper-crinkle.wav` | CB01, CB02, CB06 |
| `lf-tube-hum.wav` | CB02 |
| `lf-dish-set.wav` | CB03, DS01, DS05, DS07 |
| `lf-popcorn-pops.wav`, `lf-egg-burst.wav` | CB03 |
| `lf-wave-reflect-1/2/3.wav` | CB04 |
| `lf-paper-slide.wav`, `lf-stamp.wav` | CB05; stamp also DS05 |
| `lf-oven-hum-loop.wav` | CB06, DS06, SW03 |
| `lf-start-beep.wav` | CB06, DS06, ST01 |
| `lf-click.wav` | DS02, DS03, ST06, ST07, SW05 |
| `lf-wave-absorb.wav` | DS03, ST02 |
| `lf-mug-tap.wav`, `lf-glass-clink.wav`, `lf-fork-tap.wav` | DS04 (tile taps); mug tap also SW01, SW04; fork tap also ST06 |
| `lf-clock-ticks.wav` | ST04 |
| `lf-water-burst.wav` | SW04 |
| `lf-spoon-stir.wav` | SW05 |

## Mastering
Each raw Remotion render is mastered into a separate `-master.mp4`: video stream copied, `loudnorm=I=-14:TP=-1.7:LRA=11`, AAC 320 kbps at 48 kHz (per `docs/production-workflow.md` stage 8). Measurements are in `README.md`.
