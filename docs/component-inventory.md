# Component Inventory

Planned reusable building blocks. **Status: none implemented yet.** Update this file when a component is created or changed.

Conventions: components live in `src/components/`, take data and style via props (no hardcoded episode content), are driven by `useCurrentFrame()`, and work at both 16:9 and 9:16. Timing helpers live in `src/animations/`, theme tokens in `src/styles/`.

| Component | Purpose | Status |
| --- | --- | --- |
| `SignalPath` | Draw a path and animate pulses/particles travelling along it to show flow of signal, energy or data. | planned |
| `ComponentCutaway` | Reveal a part's internals by peeling or fading its outer shell, with ghosted outline and callouts. | planned |
| `StepDiagram` | Step-by-step diagram: highlight current step, dim past steps, draw connectors between steps. | planned |
| `TextReveal` | Animated title/label/keyword reveal (word or line staggered). | planned |
| `Callout` | Label with leader line pointing to a part of the scene. | planned |
| `CameraFrame` | Wrapper for slow pan/zoom into regions of a scene. | planned |
| `ScaleIndicator` | Shows timescale or size scale for slowed-down or magnified processes. | planned |

## Animation helpers (`src/animations/`)
| Helper | Purpose | Status |
| --- | --- | --- |
| Timing/easing presets | Shared durations and easing curves so motion feels consistent. | planned |
| Stagger helper | Offset start frames across a list of elements. | planned |

## Styles (`src/styles/`)
| Item | Purpose | Status |
| --- | --- | --- |
| Theme tokens | Colour roles, stroke weights, type scale; overridable accent per episode. | planned |
