# Episode 001 — Sound Design V2

Status: **implemented and rendered (2026-10-28).** Nobody has listened to it yet: it was checked only by measurement.

- **Review file:** `renders/episode-001/v2/episode-001-sound-design-v2-master.mp4`. The raw Remotion render, before mastering, is `renders/episode-001/v2/episode-001-sound-design-v2.mp4`.
- **Compare with:** `renders/episode-001/v1/episode-001-kokoro-no-music-v2-master.mp4`, the V1 effects master, which is unchanged.
- **Cue config:** `src/data/episode001AudioV2.ts`. V1 stays in `src/data/episode001Audio.ts`.
- **Generator:** `scripts/audio/generate-ep001-sfx-v2.mjs`. It writes only `*-v2.wav` files.
- **Switch:** the `sfx: "v1" | "v2"` prop on `Episode001`. The default is `"v1"`, so existing renders are unchanged. A separate composition, `Episode001SoundV2`, has the V2 review props preset: narration on, draft off, music off, `sfx: "v2"`.

## Revision 2.3 (2026-10-28) — current
- **Finale:** the wave statement that opened the finale (38.07 s) is gone. The finale is now only the warm chord: `sfx/heat-finale-v2.wav`, from frame 1152 (38.4 s), as the view settles on the bowl. It's ducked under the last line and fades out by the last frame. The effects track is silent from 37.9 to 38.4 s.
- **Episode folder:** everything for Episode 001 moved into `episodes/episode-001/v2.3/`, matching `renders/episode-001/v2.3/`. The `src/` imports and both generators point there.

| File | Integrated | True peak | LRA |
| --- | --- | --- | --- |
| `renders/episode-001/v2.3/episode-001-sound-design-v2.3-master.mp4` | −14.26 LUFS | −1.61 dBTP | 2.6 LU |

The video is 1080×1920 at 30 fps, 1230 frames, with no clipped samples.

## Revision 2.2 (2026-10-28)
Same as 2.1, with the finale restored. `heat-reprise-v2.wav` plays from frame 1142 to the end, ducked under the last line, as the oven fades and the view settles on the bowl at centre frame. The wave-icon sound stays removed.

| File | Integrated | True peak | LRA |
| --- | --- | --- | --- |
| `renders/episode-001/v2.2/episode-001-sound-design-v2.2-master.mp4` | −14.28 LUFS | −1.61 dBTP | 2.6 LU |

The video is 1080×1920 at 30 fps, 1230 frames, with no clipped samples.

Renders are grouped by version under `renders/episode-001/`:
- `v0-draft/`
- `v1/` (Kokoro narration with the V1 effects)
- `v2/`
- `v2.1/`
- `v2.2/`

## Revision 2.1 (2026-10-28, after review)
The review feedback was that the effects were over the top. Two rules came out of it:
- The wave emission sound is enough.
- Most transitions don't get a sound. The only ending transition is the bowl sliding out to centre frame.

**Removed from the cue list:**
- the 3 reflection pings and 3 absorption dips in SH03;
- the cutaway thump;
- the zoom riser and arrival;
- the heat transition, the cross-section absorb and the heat spread;
- the spoon;
- the wave icon and heat reprise at the end.

**Kept:** bowl slide in, door latch, oven start-up and run, electric pulse, wave emit and echo, turntable, door open, and bowl slide out.

The removed files stay on disk and in the generator but aren't referenced by the cue config. The full V2 cue sheet below is kept as a record.

| File | Integrated | True peak | LRA |
| --- | --- | --- | --- |
| `renders/episode-001/v2.1/episode-001-sound-design-v2.1-master.mp4` | −14.31 LUFS | −1.61 dBTP | 2.6 LU |

The video is 1080×1920 at 30 fps, 1230 frames. Under speech, the remaining cues sit 7.5–15.7 dB below the voice.

## Source of this proposal
The brief referred to an existing Markdown audit / V2 proposal. **No such file was found** in the repo, on the Desktop, in Documents or Downloads, or in `~/.claude`. This document reconstructs the proposal from three things:
- the brief's requirements;
- the V1 plan in `audio-plan.md`;
- the `luminexplain-sound` rules.

Every timing comes from the scene code, not from estimates. If the original audit turns up, diff it against the cue sheet below.

## What changed from V1
| V1 | V2 |
| --- | --- |
| Foley moments (bowl, door, spoon) silent, waiting for recordings | CC0 Foley recordings, cut and shaped to the motion |
| Oven: 6 s loop of a 120 Hz hum at a very low level | Relay click, then transformer hum with audible harmonics (240–600 Hz), then a fan spinning up (blade flutter 6 → 40 Hz, band 250 → 700 Hz). A continuous run, ducked under speech |
| One generic shimmer (1–4 kHz partials) for the waves | A single **wave motif** in D (440–880 Hz), with variations for emit, reflect, absorb and heat |
| No reflection or absorption sounds | 3 reflection pings at the exact bounce frames, plus 3 absorption "dips" where each ray enters the soup |
| Turntable: constant hum loop with a fade | Motor engage click, whir and rumble that follow the plate's easeInOut speed curve, and a soft stop click |
| Riser into the zoom | Riser built from the motif climbing an octave, wobble speeding up, ending on the cut, plus a soft low arrival |
| Single heat swell | Wave motif bends down into a warm D chord (energy → heat); slow heat-spread swell that peaks in the narration gap; closing reprise |
| Start beep | Dropped. Nothing on screen shows a keypad |

## Sonic identity
- **Wave motif:** a clean sine with a little 2nd and 3rd harmonic, a gentle glide and a slight 6 Hz wobble that echoes the drawn wave's wiggle. Key of D. Variations:
  - **Emit:** glides A4 → D5 and pans right → left with the wave's travel.
  - **Reflect:** fast attack, faint inharmonic (×2.76) metallic edge, 0.14 s ring. Pitches E5, F#5, A5 rise across the bounces.
  - **Absorb:** the motif drops an octave while a low-pass closes (3.5 kHz → 450 Hz), so it darkens into the food.
  - **Heat:** the motif bends down into a warm detuned-saw D chord with a light tanh warmth. It's reprised at the end.
- **Mechanism clicks:** short and dry: a contact tick, a 9 ms bounce and a small body. They're built into the oven start, the power relay and the turntable start and stop.
- **Foley:** real recordings for the physical events: the bowl slide, door latch, door release and spoon.

## Cue sheet (absolute frames, 30 fps)
Narration windows come from the approved takes' measured speech start and end:
- **Speech:** 2–101, 128–248, 263–338, 383–589, 623–834, 893–1060, 1088–1212.
- **Gaps:** 101–128, 248–263, 338–383, 589–623, 834–893, 1060–1088, 1212–1230.

| Frame | Visual (scene code) | Sound | File | Vol | Notes |
| --- | --- | --- | --- | --- | --- |
| 6–46 | Bowl slides in (easeOut) | Ceramic slide; level follows the bowl's speed | `foley/bowl-slide-in-v2.wav` | 0.32 | File starts at frame 5 |
| 64 | Door reaches closed (50–66) | Latch | `foley/door-close-v2.wav` | 0.4 | Onset measured at 63.0 before the fix, then moved to 64 |
| 70–375 | Oven running (SH01 → SH03) | Relay, hum and fan spin-up, then run | `sfx/oven-startup-run-v2.wav` | 0.6, ducked | Fades over the last 30 frames (SH03 zoom) |
| 120 | Cut into the cutaway (gap) | Low thump with a short air tail | `sfx/cutaway-thump-v2.wav` | 0.5 | |
| 134–164 | Power pulse travels up the feed | Relay and a buzz that brightens with the travel | `sfx/electric-pulse-v2.wav` | 0.35 | No sparks or zaps |
| 166 | First wave leaves the magnetron | Wave motif: emit | `sfx/wave-emit-v2.wav` | 0.18 | Pans with the wave |
| 190 | Second wave | Emit echo, a fifth lower | `sfx/wave-emit-echo-v2.wav` | 0.1 | |
| 283 / 286.75 / 295.5 | Ray bounces off a wall | Reflect pings 1–3 | `sfx/wave-reflect-{1,2,3}-v2.wav` | 0.18 / 0.15 / 0.15 | Cues placed on frames 283 / 287 / 295 |
| 301 / 313 / 325 | Ray enters the soup | Absorb a / b / a | `sfx/wave-absorb-{a,b}-v2.wav` | 0.2 / 0.17 / 0.15 | |
| 342–375 | Zoom into the soup (gap) | Motif riser, ends on the cut | `sfx/zoom-riser-v2.wav` | 0.45 | |
| 375 | Molecular close-up appears | Soft low arrival | `sfx/zoom-arrival-v2.wav` | 0.35 | |
| 383–589 | SH04 molecules | **Intentionally silent** (narration only) | — | — | |
| 606–700 | Background warms, molecules jostle (615+) | Energy → heat transition | `sfx/heat-transition-v2.wav` | 0.25 | Starts in the gap |
| 660–750 | Thermometer rises | **Intentionally silent** | — | — | |
| 754 | Waves enter the cross-section | Soft absorb | `sfx/wave-absorb-b-v2.wav` | 0.18 | |
| 752–900 | Heat spreads through the layers | Slow swell, peaks around 842 (gap) | `sfx/heat-spread-v2.wav` | 0.4, ducked | |
| 885–935 | SH06 opens, callouts | **Intentionally silent** | — | — | |
| 939–1060 | Turntable: start, speed peak at 1000, stop | Engage click, then whir and rumble on the speed curve, then stop click | `sfx/turntable-motor-v2.wav` | 0.28 | File starts at 935 |
| 1045 / 1063 | Spoon circles (1043–1073) | Two soft spoon contacts and a scrape | `foley/spoon-stir-v2.wav` | 0.5 | |
| 1081 | Door releases (1080–1098) | Door open | `foley/door-open-v2.wav` | 0.5 | In the gap |
| 1096–1132 | Bowl slides out | Softer slide, different part of the take | `foley/bowl-slide-out-v2.wav` | 0.3 | |
| 1110 | Wave icon draws | Quiet motif statement | `sfx/wave-icon-v2.wav` | 0.15 | |
| 1142–1230 | Wave icon becomes a thermometer, then settle | Heat reprise; resolves and fades by the last frame | `sfx/heat-reprise-v2.wav` | 0.45, ducked | |

## Mix
- **Narration:** untouched (`narrationVolume` 1.88, approved takes, same offsets).
- **Ducking:** `duck: true` beds pass through `duckAt()` in `episode001AudioV2.ts`:
  - gain 1 in narration gaps and 0.5 (−6 dB) under speech;
  - 6-frame linear ramps;
  - applies to the oven run, the heat spread and the heat reprise.

  One-shots don't use it; each has a fixed level for its spot, so short transients don't pump.
- **Measured from stems** (VO-only and SFX-only audio renders):
  - Under speech, effects sit **7.5–12.5 dB below the voice** (max 100 ms RMS per cue window), with peaks ≤ −12 dBFS before mastering.
  - In gaps, effects come up to the voice's level.
  - SH04 effects measure −25 dB relative to the voice (only the arrival tail).
  - The middle of SH05 measures −46 dB.
- **Spectrum:** 2–4 kHz energy is < 3 % of each synthesized cue. The door latches and the spoon have more (8–27 %), but they're short Foley transients, and the door open sits in a gap.
- **Sync check:** onsets detected in the SFX stem fall within ±20 ms of the scene frames for the cutaway, all reflections and absorptions, the turntable engage, the door open and the first spoon contact. The arrival bloom is +40 ms (soft attack). Clicks buried inside the oven and power beds can't be measured on their own.
- **Mastering** follows `docs/production-workflow.md`:
  - `loudnorm I=-14 TP=-1.7 LRA=11`, video stream copied.
  - TP is −1.7 rather than −1.5, because a −1.5 pass measured −1.47 dBTP after AAC.
  - The narration peaks set the headroom (−4.2 dBTP raw), so loudnorm ran in its dynamic mode, the same as the V1 master. The bundled ffmpeg has no limiter.

## Measurements (final files)
| File | Integrated | True peak | LRA | Video |
| --- | --- | --- | --- | --- |
| `episode-001-sound-design-v2-master.mp4` | **−14.35 LUFS** | **−1.60 dBTP** | 2.3 LU | 1080×1920, 30 fps, 1230 frames, 41.0 s |
| `episode-001-kokoro-no-music-v2-master.mp4` (V1) | −14.31 LUFS | −1.50 dBTP | 2.5 LU | same |

The master has no clipped samples. Its audio differs from the V1 render (difference signal −29 dB RMS).

## Deviations and known issues
- **The original audit file wasn't found;** see "Source of this proposal" above.
- **No listening pass has been done.** Everything above is measured. Listen at these points:
  - 0–3 s: bowl and latch;
  - 2.3–4 s: oven start;
  - 4–8 s: power and waves;
  - 9.4–11 s: reflections and absorption;
  - 11.4–12.8 s: zoom;
  - 20–23 s: heat transition;
  - 25–29.5 s: heat spread;
  - 31.3–36 s: turntable and spoon;
  - 36–37.8 s: door and bowl out;
  - 38–41 s: ending.
- **Foley quality:** the Foley files are Freesound HQ MP3 previews (originals need a login). The bowl slide is a *plate* sliding on a table, reshaped to the bowl's motion. The spoon take has a hiss floor that was low-passed at 5.2 kHz and expanded down. If any of these read as wrong by ear, record replacements (see `audio-generation.md`).
- **Start beep dropped:** no keypad is shown on screen.
- **Ending:** the reprise starts under the last line and resolves as the line ends (1212). Only 0.6 s of gap remains, so it fades rather than landing a full chord after the line.
- **Openverse search was unreachable** (API timed out), so Foley was found on freesound.org directly and each licence was checked on its sound page.
