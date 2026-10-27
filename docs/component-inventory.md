# Component Inventory

Reusable building blocks. Update this file when a component is created or changed. Episode-specific drawings (microwave, bowl, molecules, etc.) live in `src/scenes/episodeNNN/`, not here.

Conventions: components live in `src/components/`, take data and style via props (no hardcoded episode content), are driven by `useCurrentFrame()`, and work at both 16:9 and 9:16. Timing helpers live in `src/animations/`, theme tokens in `src/styles/`.

| Component | Purpose | Status |
| --- | --- | --- |
| `SignalPath` | SVG path that draws on, or sends a pulse (`tail`) along itself; optional sine wiggle (`amplitude`, `phase`) so it reads as a wave. Also exports `wavyPath`. | done (ep. 001) |
| `ComponentCutaway` | Reveal a part's internals by peeling or fading its outer shell, with ghosted outline and callouts. | planned (ep. 001 used a scene-level ghost outline instead) |
| `StepDiagram` | Step-by-step diagram: highlight current step, dim past steps, draw connectors between steps. | planned |
| `TextReveal` | Centred headline with staggered word rise/fade; optional exit. | done (ep. 001) |
| `Callout` | SVG label with a leader line and dot pointing to a part of the scene. | done (ep. 001) |
| `Badge` | Pill label readable on light and dark backgrounds. | done (not used in ep. 001 final) |
| `AudioCue` | One sound on the timeline: `<Sequence>` + `<Audio>` with frame-based fade in/out, volume, loop and an optional per-frame `gain` (e.g. ducking under narration). | done (ep. 001) |
| `CameraFrame` | Wrapper for slow pan/zoom into regions of a scene. | planned |
| `ScaleIndicator` | Shows timescale or size scale for slowed-down or magnified processes. | planned |

## Animation helpers (`src/animations/`)
| Helper | Purpose | Status |
| --- | --- | --- |
| `timing.ts` | `progress` (clamped eased 0→1), `lerp`, `mixColor`, easing presets, deterministic `wobble`. | done (ep. 001) |
| Stagger helper | Offset start frames across a list of elements. | planned (inline in `TextReveal` for now) |

## Styles (`src/styles/`)
| Item | Purpose | Status |
| --- | --- | --- |
| `theme.ts` | Brand palette, font stack, stroke weights. | done (ep. 001) |
