# Component Inventory

Reusable building blocks. Update this file when a component is created or changed. Episode-specific drawings (microwave, bowl, molecules, etc.) live in `src/scenes/episodeNNN/`, not here.

Episode 001 long-form drawings (16:9) live in `src/scenes/episode001Long/shared.tsx`; it also imports the Short's `Thermometer` and `bowlSectionPath` read-only.

The Episode 001 Shorts batch (9:16; `CandyBarDiscovery`, `MicrowaveSafeDishes`, `StandingTime`, `SuperheatedWater`) uses a vertical stage and small helpers in `src/scenes/episode001Shorts/shared.tsx`: `VStage`, `T`, `Chip`, `Tick`/`Cross`, `WaveIcon` and `Clock`. It reuses the long-form drawings and the Short's `Thermometer` read-only. These helpers stay episode-specific until another episode needs them.

Episode 002 (submarine life support, long-form 16:9 plus seven 9:16 Shorts) keeps its drawings in `src/scenes/episode002/`. Each panel draws in its own local box and takes 0→1 progress props, so the same diagram serves both aspect ratios.
- `kit.tsx` holds the look and shared primitives: dark navy `Stage`, `T`, `Tag`, `Fact`, `Lead`, the `Checklist` threat HUD and `checkRows`, a generic `SubCutaway` with machine slots, air loop and power bus, `Gauge` and the `Mol` molecule glyphs.
- `panels.tsx` holds the mechanism diagrams: `Hatch`, `DepthRuler`, `HullSection`, `FramedTube`, `Scrubber`, `Electrolyser`, `Cleaners`, `AirHud`, `GpsSurface`, `NavMap`, `InertialGlyphs`, `SoundRings`, `CoatingSection`, `LengthCompare`, `CommsColumn`, `ReactorLoops` and `ClockPanel`.
- They stay episode-specific. `Checklist` and `Gauge` are candidates to promote to `src/components/` if a later episode needs them.

Conventions: components live in `src/components/`, take data and style via props (no hardcoded episode content), are driven by `useCurrentFrame()`, and work at both 16:9 and 9:16. Timing helpers live in `src/animations/`, theme tokens in `src/styles/`.

| Component | Purpose | Status |
| --- | --- | --- |
| `SignalPath` | SVG path that draws on, or sends a pulse (`tail`) along itself; optional sine wiggle (`amplitude`, `phase`) so it reads as a wave. Also exports `wavyPath`. | done (ep. 001) |
| `ComponentCutaway` | Reveal a part's internals by fading its outer shell (`reveal` 0 → 1) while a ghost outline stays on top; stackable for X-ray build-ups. SVG group. | done (ep. 001 long-form; the Short used a scene-level ghost outline) |
| `StepDiagram` | Step-by-step row: connectors draw on, the current step is highlighted, past steps dim, future steps stay hidden; optional icon per step. SVG group. | done (ep. 001 long-form) |
| `TextReveal` | Centred headline with staggered word rise/fade; optional exit. | done (ep. 001) |
| `Callout` | SVG label with a leader line and dot pointing to a part of the scene. | done (ep. 001) |
| `Badge` | Pill label readable on light and dark backgrounds. | done (not used in ep. 001 final) |
| `AudioCue` | One sound on the timeline: `<Sequence>` + `<Audio>` with frame-based fade in/out, volume, loop and an optional per-frame `gain` (e.g. ducking under narration). | done (ep. 001) |
| `Captions` | Burned-in Short captions: one cue (one or two lines) at a time from frame-timed cues, on a translucent backing, with optional accent-coloured words; the block's bottom edge is set by the caller to stay out of platform UI. HTML overlay. | done (ep. 001 Shorts) |
| `CameraFrame` | Full-frame wrapper for one slow camera move (zoom about an origin, pan, tilt), driven by the caller's frame math. | done (ep. 001 long-form) |
| `ScaleIndicator` | Ruler with a unit label that steps through a list (e.g. cm → nm) plus an optional caption (e.g. "slowed ~2,500,000,000×"). HTML overlay. | done (ep. 001 long-form) |

## Animation helpers (`src/animations/`)
| Helper | Purpose | Status |
| --- | --- | --- |
| `timing.ts` | `progress` (clamped eased 0→1), `lerp`, `mixColor`, easing presets, deterministic `wobble`. | done (ep. 001) |
| Stagger helper | Offset start frames across a list of elements. | planned (inline in `TextReveal` for now) |

## Styles (`src/styles/`)
| Item | Purpose | Status |
| --- | --- | --- |
| `theme.ts` | Brand palette, font stack, stroke weights. | done (ep. 001) |
