# Episode 001 Long-Form — Shot & Asset Breakdown

Companion to `storyboard.md` / `storyboard.json` (draft, 2026-10-28). This file lists everything production would need, split into **reuse** (exists today) and **create** (new). **Nothing here has been produced yet.**

## Ground rules for reuse
- **Short files are read-only.** Any Short audio asset reused here is *copied* at production time into `episodes/episode-001/long-v1/assets/audio/` under a new `lf-` filename, then logged in a new `long-v1/audio-generation.md` and `long-v1/audio-credits.md`. Nothing in `episodes/episode-001/v2.3/`, `src/scenes/episode001/` or `src/data/episode001*.ts` is edited, moved or renamed.
- **Short scene code** (`src/scenes/episode001/*.tsx`) may be *imported* read-only where a helper is size-agnostic. If a helper needs changing for 16:9, it gets a new long-form version instead of an edit.
- **Where production code will live.** CLAUDE.md requires compositions, scenes and data under `src/`, so production would later add `src/compositions/Episode001Long.tsx`, `src/scenes/episode001Long/` and `src/data/episode001Long*.ts`, and register the composition in `src/Root.tsx`. That's outside `long-v1/` and **needs your approval**, together with any new reusable components (to be added to `docs/component-inventory.md` as CLAUDE.md requires).

## 1. Visual assets

### Reuse as-is (exists today)
| Asset | Where | Used in |
| --- | --- | --- |
| Palette tokens and colour roles | `src/styles/theme.ts` | all |
| Easing, `progress`, `lerp`, `mixColor`, `wobble` | `src/animations/timing.ts` | all |
| `SignalPath` (waves, ripples, underline) | `src/components/SignalPath.tsx` | S1-02, S1-03, S2-03, S2-05, S2-06, S4-01, S4-02, S4-07, S5-02, S6-03 |
| `Callout` (labels and leader lines) | `src/components/Callout.tsx` | S1-02, S2-05, S2-06, S3-02, S4-01, S4-03, S4-05, S4-07, S5-02–S5-05, S6-02, S6-04 |
| `TextReveal` (title, end card, single lines) | `src/components/TextReveal.tsx` | S1-03, S3-01, S7-02, S7-03 |
| `Badge` (tags such as 'analogy', 'simplified', 'rare — but real') | `src/components/Badge.tsx` | S2-01, S3-02–S3-04, S4-02, S4-04, S4-06, S5-02, S6-02, S6-03, S6-05 |
| `AudioCue` (sound placement, ducking) | `src/components/AudioCue.tsx` | all sound cues (production) |
| `MoleculeField` + `fieldAt()` (partial, out-of-sync twisting; jitter 0 → 1) | `src/scenes/episode001/molecules.tsx` (import, read-only) | S4-03, S4-05, S6-04 (liquid patch), S7-02 inset |
| `Thermometer` | `src/scenes/episode001/shared.tsx` (import) | S4-05, S6-01, S6-02, S6-05 |
| `BowlFront`, `bowlSectionPath` | `src/scenes/episode001/shared.tsx` (import) | S4-01, S4-07 |

### Adapt (exists in the Short, but 9:16-specific; rebuild for 16:9 using the Short as reference)
| Asset | Reference | Long-form use |
| --- | --- | --- |
| Front-on microwave `MicrowaveFront` | `shared.tsx` (portrait layout) | S3-05, S7-01–S7-03 (kitchen oven) |
| Oven cutaway with ghost outline | `Sh02Magnetron.tsx`, `Sh03Bouncing.tsx` | S4-01, S7-02 |
| Thick-band cross-section heating | `Sh05Heat.tsx` | S4-07, S6-02 |
| Turntable and bright/dim map | `Sh06Turntable.tsx` | S5-01–S5-05 |

### New reusable components (already planned in `docs/component-inventory.md`)
| Component | Purpose | Used in |
| --- | --- | --- |
| `CameraFrame` | Slow push, pull, tilt and pan wrapper (one move at a time) | S1-01, S3-01, S3-05, S5-01, S5-05, S7-01–S7-03 |
| `ComponentCutaway` | Ghost-outline cutaway reveal and X-ray layering | S3-05, S4-01, S7-02 |
| `ScaleIndicator` | 'cm → nm' and 'slowed ~2,500,000,000×' indicators | S4-02, S4-03 |
| `StepDiagram` | Biography timeline; the step-graph in the spoonful ride | S2-01, S5-04 |

### New episode-specific art (to create)
| Scene | Items |
| --- | --- |
| 1 | Lab-coat pocket and hand (blueprint line art); plain wrapped candy bar with sag states; engineer silhouette (no likeness); bench-scale magnetron block; radar-dish, microwave and split-plate icons; title card (16:9) |
| 2 | Three vignette icons (school door, radio key, books); conveyor of magnetron blocks and counter; lab bench; kernels and popped puffs; egg with wobble and burst states; generic shielded chamber cross-section; food shape; **patent figure line art** (see §3); wavelength ruler; potato outline |
| 3 | Generic 1940s tall cabinet oven (no brand); human and adult silhouettes; balance; cooling pipes with flow texture; restaurant awning; house icon (×10); calendar strip; generic 1967 countertop oven; toaster outline; price tag; modern countertop oven (front and cutaway) |
| 4 | Field-arrow row (16:9); dashed 'analogy' frame style; crowd of round figures with collision motion; ghost propeller with ✕; tuning-fork icon; radio-dial band strip; generic molecule outlines; 'Inside-out? NO' stamp |
| 5 | Top-down oven floor; interference inset; irregular translucent map; plain chocolate bar with melt-patch states; ruler; tracked-spoonful gold ring; step trace graph; 3-D layered map; centre and rim pins |
| 6 | Plate-of-food table setting; probe thermometer; hand; food-on-plate cross-section; standing-time clock; split-screen dish test (two dishes, glass cup, timer); ice lattice and thawed-patch states; loop arrow; clean cup with calm and eruption states |
| 7 | X-ray layer compositing over the kitchen oven; end card (16:9) with a link slot for the Short |

## 2. Audio assets (sound effects only; no music)

### Reuse: copy from the Short at production time (new `lf-` names)
| Short file (read-only) | Long-form copy | Shots |
| --- | --- | --- |
| `sfx/wave-emit-v2.wav` | `sfx/lf-wave-emit.wav` | S1-02, S1-03, S4-01, S7-02 |
| `sfx/wave-reflect-1/2/3-v2.wav` | `sfx/lf-wave-reflect-1/2/3.wav` | S2-05, S4-01 |
| `sfx/wave-absorb-a-v2.wav` | `sfx/lf-wave-absorb.wav` | S4-07 |
| `sfx/heat-transition-v2.wav` | `sfx/lf-heat-swell.wav` (+ a trimmed `lf-heat-swell-short.wav`) | S2-05, S4-05 |
| `sfx/heat-spread-v2.wav` | `sfx/lf-heat-spread.wav` | S4-07 |
| `sfx/heat-finale-v2.wav` | `sfx/lf-heat-finale.wav` | S7-02 |
| `sfx/oven-startup-run-v2.wav` | `sfx/lf-oven-run.wav` | S4-01, S4-02 (fade), S6-03, S7-01 |
| `sfx/turntable-motor-v2.wav` | `sfx/lf-turntable.wav` | S5-04, S5-05 |
| `sfx/s3-start-beep.wav` (unused in the Short) | `sfx/lf-start-beep.wav` | S4-01, S6-03, S7-03 |
| `foley/spoon-stir-v2.wav` (CC0, dynamique) | `foley/lf-spoon-stir.wav` | S5-05 |

The reused Foley carries its CC0 credit into `long-v1/audio-credits.md`. The synthesized sounds are original and logged in `long-v1/audio-generation.md`.

### Create: Foley (CC0 preferred; licence checked on the original page, per `luminexplain-sound`)
| Sound | Shots |
| --- | --- |
| Lab-coat fabric rustle | S1-01 |
| Soft candy-wrapper crinkle (no crisp foil): the recurring candy-bar sound | S1-01, S5-03, S7-03 |
| Small ceramic dish set on a wooden bench | S2-02 |
| Individual popcorn pops | S2-03 |
| Short, soft egg/wet burst (nothing gory) | S2-04 |
| Paper sheet sliding on a desk | S2-06 |
| Rubber stamp on paper | S2-06, S4-06 |
| Heavy appliance set down | S3-01 |
| Thin water flow in a pipe (very low) | S3-02 |
| Calendar pages flipping | S3-03 |
| Small appliance set on a countertop | S3-03 |
| Glass turntable plate lifted / small clink | S5-03 |
| Wrapper sliding on a smooth surface | S5-03 |
| Fork tap on a ceramic plate | S6-01 |
| Soft ice crackle | S6-04 |
| Spoon tap on a ceramic mug | S6-05 |
| Short water burst/splash | S6-05 |

### Create: synthesized, from a new long-form generator, keeping the Short's motifs (key of D)
| Sound | Shots |
| --- | --- |
| Radar-era tube hum (240–600 Hz harmonics, phone-safe) | S1-02 |
| Mechanism clicks (conveyor ticks, balance click, turntable stop click) | S2-01, S3-02, S5-05 |
| Sustained wave-motif tone with slow pan following the field swing (no rhythm, no melody) | S4-02 |
| Soft, irregular muted bumps (analogy collisions; deliberately non-rhythmic) | S4-04 |
| Interference pair: two motif tones that reinforce, then cancel | S5-02 |
| Short heat-motif blips (spoonful crossing bright patches) | S5-04 |
| Dry time-lapse clock tick | S6-02 |
| Stepped, escalating heat motif (frozen-food runaway) | S6-04 |

The generator itself would be a new script, never an edit to the Short's `scripts/audio/generate-ep001-sfx-v2.mjs`. Where it lives (`scripts/audio/` per current practice, or `long-v1/`) is your call at production time.

**Cue count:** 51 cues in 7½ min, about one every 9 s, with several shots intentionally silent (S3-04, S3-05, S4-03, S5-01). After the Short's v2.1 review ("over the top"), the candidates to drop first if a preview feels busy are the S1-02 hum, S2-01 ticks, S3-02 water trickle, S4-04 bumps and S6-02 clock ticks.

## 3. External source assets
| Asset | Source | Status |
| --- | --- | --- |
| Patent drawing, US 2,495,429 (1950; US patents are public domain) | Google Patents / USPTO image of the patent's figure | **Not downloaded.** Downloading needs your go-ahead (filename, source, size) before production. It will be traced as line art, not shown as a scan. |
| Archival photos of Spencer or the Radarange | — | **Not planned.** Illustration only; no likeness of Spencer is drawn. |

## 4. Narration (later, not now)
34 snippets, one per shot (`S1-01` … `S7-03`), Kokoro-82M `af_heart`, the same settings as the Short. Takes would go to `long-v1/assets/audio/vo/` with their own `manifest.json`. The `narration` text in `storyboard.json` is copied verbatim from `script.md` and must stay identical to the takes' text.

---

## Production status (first cut, 2026-10-28)
- **Narration:** 34 Kokoro `af_heart` takes generated, measured and recorded in `assets/audio/vo/manifest.json`. Shots are retimed to them: **12,979 frames = 7:12.6**.
- **Sound effects:** all built by `scripts/audio/build-ep001-long-sfx.py`:
  - 14 byte-copied from the Short;
  - 14 cut from CC0 Freesound recordings (licence checked on each sound's page; see `audio-credits.md`);
  - 12 synthesized (see `audio-generation.md`).
  - No music.
- **Patent figure:** **not used.** The storyboard planned to trace the patent's own drawing. Instead, Scene 2 shows an **original patent-style schematic**, labelled "U.S. Patent 2,495,429 · schematic illustration", with the filing date. This avoided a download whose source and image provenance I hadn't verified, and nothing in the narration depends on the original figure's look.
- **Visuals:** all original SVG drawn in code under `src/scenes/episode001Long/`. There are no bitmap assets, archival photos or likenesses.
- **Reusable components built:** `CameraFrame`, `ComponentCutaway`, `ScaleIndicator`, `StepDiagram` (see `docs/component-inventory.md`).
- **Composition:** `Episode001Long` (final) and `Episode001LongDraft` (shot ID and timecode burned in), registered in `src/Root.tsx`.
