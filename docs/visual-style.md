# Visual Style

The visual language is "living technical diagram": clean schematic shapes that move to reveal how a system works. Calm, precise, readable.

## Core devices
### Moving systems
- Show the whole system first, then let activity flow through it (particles, pulses, highlighted paths).
- Motion means something: direction = flow, speed = rate, brightness = intensity. Idle elements stay still.
- Loop a process 1–2 times so the viewer can follow it, then move on.

### Cutaways
- Peel, slice or fade an outer shell to reveal internals; keep the outline visible as a ghost for context.
- Zoom into a part, explain it, zoom back out to show where it sits in the whole.
- Label parts as they become relevant, not all at once.

### Step-by-step diagrams
- Reveal steps in order; the current step is highlighted, past steps dim, future steps hidden.
- Number steps when order matters; use connectors/arrows that draw on to show causality.
- Keep the same layout across steps so only the changing part moves.

### Invisible processes
- Give invisible things a consistent visual proxy per episode (e.g. dots for electrons, waves for signals, glow for heat) and state the metaphor once.
- Use slow-motion or time-lapse framing and show a timescale/scale indicator when it is not obvious.
- Distinguish "real" geometry from "conceptual" representation (e.g. dashed or translucent for conceptual).

## Look
- **Background:** dark, low-saturation base for long-form; one accent colour per episode plus a neutral palette.
- **Colour roles** (defined as tokens in `src/styles/`): background, surface, line, text, muted text, accent, highlight, warning. Never encode meaning by colour alone — pair with shape, label or motion.
- **Line work:** consistent stroke weights (thin for structure, thicker for active paths).
- **Typography:** one sans-serif family; large, few words on screen. Text supports narration; it never duplicates full sentences.
- **Safe areas:** keep text inside a 5% margin (16:9) and avoid the bottom ~20% and right edge UI zone in 9:16 shorts.

## Motion
- Animate from `useCurrentFrame()` with `interpolate`/`spring`; ease in-out for movement, gentle springs for appearance.
- Typical durations at 30 fps: appear 10–15 frames, move 20–40 frames, hold ≥ 1 s after a reveal.
- Camera moves (pan/zoom) are slow and purposeful; at most one at a time.

## Variety without sameness
Reuse primitives but vary per episode: accent colour, background texture, composition (centred vs. side-by-side vs. full-bleed), pacing, and the visual proxy for the invisible process.
