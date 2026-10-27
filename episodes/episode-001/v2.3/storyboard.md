# Episode 001 — Storyboard

Short · 1080×1920 · 30 fps · 1230 frames (41 s). Machine-readable version: `storyboard.json`. Narration: `script.md`. Claim IDs: `research/episode-001/claims.md`.

**Colour roles:** teal = microwaves · orange = heating · gold = hot · mist blue = cold. Heat is shown only as colour and a thermometer icon, never as moving particles. Backgrounds alternate light/dark: ivory → navy → mist → navy → ivory → navy → ivory.

| Shot | Time (frames) | BG | Narration | What we see | Text | Transition out |
| --- | --- | --- | --- | --- | --- | --- |
| **SH01** Cold meal enters | 0–4 s (0–120) | Ivory | "Your microwave doesn't heat the air. So what's heating your food?" | Cold bowl slides into a flat front-on microwave; door shuts; thermometer icon in the oven air stays low | "So what's heating it?" | Push into side panel as it peels |
| **SH02** Cutaway: magnetron | 4–8.5 s (120–255) | Navy | "This part turns electricity into microwaves — a kind of radio wave." | Ghosted oven outline; neutral power line feeds a simple labelled magnetron box; teal wave travels down a short channel into the oven | "magnetron" | Follow the wave into the oven space |
| **SH03** Bouncing | 8.5–12.5 s (255–375) | Mist | "They bounce around the metal box and into your food." | Side view; teal waves bounce off the walls, cross the bowl, and fade gradually as they go into the soup | — | Zoom into soup, scale bar cm → nm |
| **SH04** The tug | 12.5–20.5 s (375–615) | Navy | "Water molecules have positive and negative ends. The waves tug them back and forth, billions of times a second." | Water molecules (one marked + / −) twist part-way as teal arrows switch direction; lagging and out of sync | "+ / −" | Twisting gets messy (continuous into SH05) |
| **SH05** Energy becomes heat | 20.5–29.5 s (615–885) | Ivory | "All that tugging and bumping turns the waves' energy into heat. The waves reach partway in — heat spreads the rest of the way." | Close-up continues as background warms navy → ivory; molecules knock into neighbors, motion turns random; thermometer rises. Cross-section: thick outer zone warms where waves fade out, then centre warms as heat spreads | "dielectric heating" (small) | Section tilts to top-down |
| **SH06** Hot spots & turntable | 29.5–36 s (885–1080) | Navy | "Some spots get stronger waves, so the turntable keeps food moving. Still — give it a stir." | Irregular brighter/dimmer wave areas; still plate heats in patches; turntable moves food through the areas; patches soften, some cooler spots remain; spoon icon stirs | "hot" / "cold" | Turntable stops; cut to door opening |
| **SH07** Payoff | 36–41 s (1080–1230) | Ivory | "Waves in, hot food out — and nothing radioactive left behind." | Hot bowl slides out with soft steam; teal wave icon → rising thermometer; oven fades away, slow push-in settles on the steaming bowl | "Waves in. Hot food out." | End on the steaming bowl (no end card) |

## Accuracy notes per shot
- **SH01:** The thermometer in the oven air stays low. Don't draw air particles, because "particles barely moving" would wrongly suggest air molecules stop moving (C01).
- **SH02:** The magnetron is named on screen only. The narration just says "this part". Show it as a simple box with no invented internals. The power line stays neutral, not gold, so electricity isn't mistaken for heat.
- **SH03:** Waves must fade *into* the soup, not bounce off or stop at its surface. That sets up "partway in" (C09).
- **SH04:** Keep the molecules simple. They twist part of the way, out of sync, with no neat full spins and no "resonance" pulse (C07, C08). The + and − labels mark the two ends of one molecule.
- **SH05:** Heat appears as colour across a thick outer zone, never as orange dots travelling between molecules. The centre warms later, so it reads as "partway in, then spreads" and not "surface only" or "inside out" (C09).
- **SH06:** The brighter and dimmer areas mostly stay in place while the food moves through them. The result is *more* even, never flat and uniform. The stir shows why the narration says "Still — give it a stir" (C11).
- **SH07:** The flame icon was replaced with a thermometer, because a flame would imply fire or burning. There's no brand end card. The Short ends on the steaming bowl about 1 s after the last line, and branding stays in the visual style and YouTube's own watermark.

## Components needed (see `docs/component-inventory.md`)
`TextReveal` (SH01, SH07) · `ComponentCutaway` (SH02) · `SignalPath` (SH02, SH03) · `Callout` (SH02, SH04, SH05, SH06) · `ScaleIndicator` (SH03→SH04) · `StepDiagram`-style progression (SH05).
Episode-specific (scenes, not reusable components): microwave body, water molecule, soup cross-section, turntable with wave-strength map, thermometer icon.

## Safe areas (9:16)
Keep text above the bottom ~20% and away from the right-edge UI column. Put the main action in the centre 1080×1300 band.
