# Episode 001 Long-Form — Audio Generation Log

## Narration
- **Engine:** Kokoro-82M v1.0 via `kokoro-onnx`, run by `~/.luminexplain-kokoro/scripts/kokoro_snippet.py` in its own venv (`~/.luminexplain-kokoro/.venv`), outside the project.
- **Settings:** `af_heart`, speed 1.0, `en-us`, `--sentence-pause 0.4 --clause-pause 0.3` (the same as the Short).
- **Output:** 34 snippets, one per storyboard shot (`S1-01` … `S7-03`), saved as `assets/audio/vo/<id>-take01.wav` (24 kHz mono PCM16). Each take's text was read from `assets/audio/vo/manifest.json`, whose `text` matches `storyboard.json` and `script.md` v2.1 verbatim. `src/data/episode001LongNarration.ts` throws if they ever differ.
- **Measured (2026-10-28):** 401.2 s of audio in total. Integrated loudness is −24.8 to −26.2 LUFS; true peaks are −3.1 to −8.8 dBTP. Speech start/end, LUFS, true peak and SHA-256 are recorded per take in the manifest.
- **Gain in Remotion:** +5.5 dB per snippet, capped so the true peak stays ≤ −1.5 dBTP (`gainDb` in the manifest). Ten snippets are capped; S4-03 (a hot plosive, −3.1 dBTP) gets only +1.6 dB. Final loudness comes from mastering (see below).
- **Status:** first-cut takes, marked approved for the first cut. **Nobody has listened to them yet.** Pronunciation was checked only from Kokoro's phonemes: "Radarange" → /ˈɹeɪdəɹˌeɪndʒ/, "Raytheon" → /ˈɹeɪθiən/, "magnetron" → /ˈmæɡnɪtɹɑːn/.

## Sound effects
- **Builder:** `scripts/audio/build-ep001-long-sfx.py`. Run it with the Kokoro venv's Python (numpy + soundfile), using `-I` from the project root. It's deterministic (seed 2001) and writes only to `episodes/episode-001/long-v1/assets/audio/`. It decodes the MP3 sources with Remotion's bundled ffmpeg.
- **Copies from the Short (read-only, byte copies):** wave emit, reflect ×3, absorb, heat swell, heat spread, heat finale, oven start-up, oven hum loop, turntable, turntable loop, start beep, spoon stir. They're saved as `sfx/lf-*.wav` / `foley/lf-spoon-stir.wav`. The Short's own files were not touched.
- **Foley (CC0, Freesound):** see `audio-credits.md`. Cuts, fades and peak normalization are done in the builder.
- **Synthesized (original, key of D):**

| File | Sound | Used in |
| --- | --- | --- |
| `sfx/lf-tube-hum.wav` | 120 Hz family with 240–600 Hz harmonics (phone-safe), slow swell | S1-02 |
| `sfx/lf-click.wav` | dry mechanism click | S3-02 balance, S5-05 turntable stop |
| `sfx/lf-conveyor-ticks.wav` | six accelerating ticks | S2-01 |
| `sfx/lf-clock-ticks.wav` | four dry ticks | S6-02 |
| `sfx/lf-heavy-thud.wav`, `sfx/lf-light-thud.wav` | appliance set-downs (pitched body + knock) | S3-01, S3-03 |
| `sfx/lf-field-swing.wav` | sustained wave-motif tone panning L/R at 1 Hz (no rhythm, no melody) | S4-02 |
| `sfx/lf-crowd-bumps.wav` | soft, muted, randomly timed bumps (non-rhythmic) | S4-04 |
| `sfx/lf-interference.wav` | two motif tones: in phase, then drifting to opposite phase so they cancel | S5-02 |
| `sfx/lf-heat-blip.wav` | tiny warm D chord pluck | S5-04 |
| `sfx/lf-heat-steps.wav` | three rising heat blips (runaway) | S6-04 |
| `sfx/lf-heat-swell-short.wav` | first 1.6 s of the Short's heat swell, faded | S2-05 |

- **No music** anywhere.
- **Cue placement:** `src/data/episode001LongAudio.ts`. Each cue is pinned to a `sound` entry in `storyboard.json` (shot + index), so retiming moves the cues with it.

## Mastering
The raw Remotion render is mastered to −14 LUFS / −1.5 dBTP with `loudnorm`, following `docs/production-workflow.md` stage 8. Measurements are in `first-cut-review.md`.
