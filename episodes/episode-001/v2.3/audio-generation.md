# Episode 001 — Audio Generation Log

All music and synthesized effects for Episode 001 are **original**, generated locally in code. Nothing was downloaded, sampled or licensed, so there are no third-party rights and no attribution is required.

## Method
- **Generator:** `scripts/audio/generate-ep001-audio.mjs`, plain Node.js using only the built-in modules `fs`, `path` and `url`. **No packages, no downloads.**
- **Run (from the project root):** `node scripts/audio/generate-ep001-audio.mjs`. It takes about 4 s and overwrites the files below.
- **Deterministic:** noise uses a fixed seed (1001), so every run produces identical files.
- **Synthesis:**
  - **Oscillators:** band-limited saw (polyBLEP), sine and triangle, plus soft FM bells.
  - **Shaping:** ADSR envelopes, RBJ biquad filters (low/high/band-pass) and a Freeverb-style stereo reverb.
  - **Space and polish:** a ping-pong delay, equal-power panning and gentle `tanh` saturation on the music.
  - **Clean-up:** a high-pass to remove DC and rumble, then peak normalization.
- **Tools available, checked 2026-10-27:** Node v24.19.0. There's no sox, standalone ffmpeg, FluidSynth, SuperCollider, Csound, numpy or scipy. Remotion's bundled `ffprobe` and `ffmpeg` were used only to verify the files.

## Output
Folder: `episodes/episode-001/v2.3/assets/audio/`. All files are WAV, PCM 24-bit, 48 kHz, stereo, as confirmed with `npx remotion ffprobe`.

| File | Cue | Length | Peak | Notes |
| --- | --- | --- | --- | --- |
| `music/ep001-music-bed.wav` | A1, A9, A15 | 41.5 s (silent from 41.000 s) | −6.0 dBFS | Integrated −17.7 LUFS. See the music notes below |
| `sfx/t1-electric-activation.wav` | A6 | 1.1 s | −9.0 dBFS | Soft 100 Hz buzz swell with a faint rising tone; no sparks |
| `sfx/t2-microwave-shimmer.wav` | A7 | 2.2 s | −9.0 dBFS | High sine cluster with tremolo, airy band-passed noise, slight upward glide, reverb |
| `sfx/s5-zoom-riser.wav` | A8 | 1.05 s | −9.0 dBFS | Band-pass noise sweeping 400 Hz → 4 kHz plus a gliding tone; ends with a 30 ms fade so it lands on the cut |
| `sfx/t3-heat-swell.wav` | A10 | 2.6 s | −9.0 dBFS | Warm low G pad and sub, in the same key as the music's bar at 25.0 s |
| `sfx/s4-oven-hum-loop.wav` | A5 | 6.0 s loop | −12.0 dBFS | 120/240/360 Hz hum plus low fan noise. Seamless: the seam step (0.0019) is close to the mean sample-to-sample step (0.0015) |
| `sfx/s6-turntable-motor-loop.wav` | A11 | 6.0 s loop | −12.0 dBFS | 85 Hz motor tone with harmonics, a 1.5 Hz wobble and a light mid whir. Seamless: seam step 0.0004 |
| `sfx/s3-start-beep.wav` | A4 (optional) | 0.3 s | −12.0 dBFS | Single soft 1760 Hz beep |

Every file is normalized below full scale (−6 to −12 dBFS peak) to leave headroom. Final levels are set in Remotion.

## Music notes
- **Structure:** D major, 96 BPM, one chord per 2.5 s bar (Dmaj9, Bm11, Gmaj9, A add9). Bar lines fall on the edit: **bar 10 = 25.0 s**, the cut to the heating cross-section, and **bar 16 = 40.0 s**, the resolution.
- **Layers:** a soft detuned-saw pad, a restrained muted-pluck pulse, and an FM-bell motif (A4 D5 E5 A5 … F#5). There's no percussion and no vocals.
- **Arrangement:**
  - The motif starts at **0.0 s** as the hook, at full level only that first time.
  - It repeats softer at 10, 20 and 30 s.
  - The pulse thins to quarter notes during SH04 (12.5–20 s); that section measures about 3 dB lower.
  - From 25 s the filter opens slightly and a low sub enters, a gentle lift of about 3 dB.
  - At 40.0 s a D tonic bell sounds over the final chord, which fades to silence exactly at 41.000 s, the last video frame.
- **Measured loudness per section:**

  | Section | RMS |
  | --- | --- |
  | 0–12.5 s | about −19 dB |
  | 12.5–20.5 s | about −22 dB |
  | 20.5–25 s | about −18 dB |
  | 25–40 s | about −19 dB |
  | 40–41 s | about −17 dB |

  The hook bar peaks around −14 dB RMS.

## Not generated: recorded Foley to be supplied
The user will record these. Put them in `episodes/episode-001/v2.3/assets/audio/foley/`:

| Cue | Sound | Suggested file |
| --- | --- | --- |
| A2, A14 | Ceramic bowl sliding on a smooth surface (one take can serve both) | `foley/s1-bowl-slide.wav` |
| A3 | Microwave door closing / latch | `foley/s2-door-close.wav` |
| A12 | Spoon stirring in a ceramic bowl (~1 s) | `foley/s7-spoon-stir.wav` |
| A13 | Microwave door opening | `foley/s8-door-open.wav` |

Recording tips: a quiet room, phone held 20–40 cm away, a few takes of each with about 1 s of silence before and after. Avoid clipping by keeping the meter clearly below the top. WAV is preferred; high-quality M4A/MP3 also works.

## Limitations
- **Nobody has listened to these files yet.** The generation was verified only by measurement (format, length, peaks, loudness, loop seams, energy per section), not by ear. A listening pass is required.
- **Timbre:** this is clean synthesis. It's suitable for a restrained ambient bed, but simpler than a professionally produced track.
- **Ducking and final timing** still depend on the recorded voiceover.

## Sound design V2 (2026-10-28)
The full spec, cue sheet and mix notes are in `sound-design-v2.md`. V1 files above are unchanged.

- **Generator:** `scripts/audio/generate-ep001-sfx-v2.mjs`. Plain Node.js, no packages, fixed seed 2002.
- **Run:** `node scripts/audio/generate-ep001-sfx-v2.mjs`. It takes about 10 s.
- **Decoding:** Foley sources are decoded with Remotion's bundled ffmpeg (`npx remotion ffmpeg`).
- **Overwrites:** it writes only `*-v2.wav` files. Renders never run it.

### Synthesized (original, no third-party rights)
All files are in `sfx/`.

| File | What |
| --- | --- |
| `oven-startup-run-v2.wav` | 10.6 s. A relay click, then a transformer hum (120 Hz with harmonics to 600 Hz) and a fan spinning up, then a steady run |
| `cutaway-thump-v2.wav` | Low pitch-drop thump (140 → 55 Hz) with harmonics and a short air tail |
| `electric-pulse-v2.wav` | Relay, then a 100 Hz buzz whose band-pass rises 260 → 1360 Hz over 30 frames, then a quick settle |
| `wave-emit-v2.wav`, `wave-emit-echo-v2.wav`, `wave-icon-v2.wav` | Wave motif: emit (A4 → D5, panned with the wave) and a softer echo and icon version |
| `wave-reflect-{1,2,3}-v2.wav` | Reflection pings at E5, F#5 and A5 with a faint ×2.76 partial |
| `wave-absorb-{a,b}-v2.wav` | Motif dropping an octave under a closing low-pass |
| `zoom-riser-v2.wav`, `zoom-arrival-v2.wav` | Motif riser over 1.1 s, ending on the cut, and a soft low arrival bloom |
| `heat-transition-v2.wav`, `heat-spread-v2.wav`, `heat-reprise-v2.wav` | Wave motif bending into a warm D chord, a slow heat-spread swell, and the closing reprise |
| `turntable-motor-v2.wav` | Engage click, whir and rumble following the SH06 easeInOut-cubic speed curve, then a stop click |
| `heat-finale-v2.wav` | Revision 2.3 finale: the reprise's warm D chord and sub without the opening wave statement, 2.6 s |

### Sourced Foley (CC0, licence checked on each sound's page on 2026-10-28)
- **Originals:** kept unmodified in `foley/source/`. These are Freesound HQ MP3 previews.
- **Processed files:** in `foley/`. Each is trimmed, high- and low-passed, faded and peak-normalized to −6 dBFS.
- **Licence:** CC0 1.0 (`http://creativecommons.org/publicdomain/zero/1.0/`). No attribution is required. Courtesy credits are in `audio-credits.md`.

| File | Source (title · author · URL) | Edits |
| --- | --- | --- |
| `foley/bowl-slide-in-v2.wav` | "plate on table.wav" · labailey · https://freesound.org/people/labailey/sounds/79037/ | Uses 1.60–3.22 s (steady slide, no set-down hits). Amplitude follows the bowl's easeOut speed over frames 6–46. HP 140 Hz, LP 5.5 kHz |
| `foley/bowl-slide-out-v2.wav` | same source | Uses 3.00–4.48 s, speed-shaped to the 36-frame slide out |
| `foley/door-close-v2.wav` | "Kitchen microwave door being pushed closed (Take A)" · ani_music · https://freesound.org/people/ani_music/sounds/632468/ | Onset aligned 8 ms into the file. HP 70 Hz, LP 8 kHz |
| `foley/door-open-v2.wav` | "Kitchen microwave door being pulled open (Take B)" · ani_music · https://freesound.org/people/ani_music/sounds/632470/ | Onset aligned. HP 70 Hz, LP 8 kHz |
| `foley/spoon-stir-v2.wav` | "stirring bowl.wav" · dynamique · https://freesound.org/people/dynamique/sounds/554557/ | Uses 10.00–11.40 s (two contacts). HP 150 Hz, LP 5.2 kHz (×2) to remove the hiss floor, downward expander below −40 dB |

The recordings above replace the planned user-recorded Foley for V2. The V1 plan's `foley/s1-…`/`s2-…` slots are still free if better recordings are made later.
