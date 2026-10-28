# Episode 001 Short · SuperheatedWater — Shot-by-shot visual and sound plan (v2)

Generated from `storyboard.json`, the source of truth. Its timing was measured from the narration takes by `scripts/audio/build-ep001-shorts.py`. Frames are at 30 fps. Scenes: `src/scenes/episode001Shorts/SuperheatedWater.tsx`. Sound cues sit at their storyboard frames, placed by `src/data/episode001Shorts.ts`.

**Reused:**
- Long-form drawings, imported read-only: `CandyBar`, `MagnetronBlock`, `Silhouette`, `Ripples`, `OvenFront`, `heatColor`.
- The original Short's `Thermometer`, imported read-only.
- Components: `SignalPath`, `AudioCue`.

Every composition is a new vertical layout, not a crop of a 16:9 shot.

**New:** the vertical stage and helpers in `src/scenes/episode001Shorts/shared.tsx`, and every scene in this Short.

**Sound effects:** all are byte copies of long-form assets (see `../../audio-generation.md`).

## SW01 · Hotter than boiling · 0.00–3.63 s (frames 0–109)
- **Narration** (f16–f99): Water can get hotter than boiling — and still not boil.
- **Visual:** A tall, plain glass cup of perfectly still water, centred. A thermometer beside it climbs past a gold '100 °C' line. The surface doesn't move; no bubbles. Small label 'no bubbles'.
- **On-screen text:** 100 °C · no bubbles
- **Beats:** `cup` f4; `rise` f28 (on "hotter"); `still` f68 (on "still")
- **Sound:** cup set: `lf-mug-tap.wav` at f12, vol 0.3
- **Claims:** L36, X14

## SW02 · Boiling needs a start · 3.63–9.57 s (frames 109–287)
- **Narration** (f118–f275): Boiling needs somewhere to start. Bubbles usually form around tiny impurities in the water.
- **Visual:** Magnified inset of ordinary boiling water: a few tiny specks drift, and bubbles grow on each speck, detach and rise. Label 'bubbles start at tiny impurities'. Conceptual scale, no numbers.
- **On-screen text:** bubbles start at tiny impurities
- **Beats:** `zoom` f109; `specks` f173 (on "Bubbles"); `grow` f219 (on "impurities")
- **Sound:** silence (narration only)
- **Claims:** X11

## SW03 · Clean cup, calm water · 9.57–16.40 s (frames 287–492)
- **Narration** (f295–f480): Heat plain water by itself in a very clean cup, and it can climb past boiling while looking completely calm.
- **Visual:** The cup inside a schematic microwave (side cutaway), teal waves passing into the water. The inset's specks are gone: 'no place to start'. The thermometer climbs past 100 °C while the surface stays mirror-flat.
- **On-screen text:** plain water · clean cup · past 100 °C · calm
- **Beats:** `oven` f287; `clean` f349 (on "clean"); `past` f398 (on "past"); `calm` f457 (on "calm")
- **Sound:** oven run: `lf-oven-hum-loop.wav` at f287, vol 0.13 (loop)
- **Claims:** L36, X11

## SW04 · The eruption · 16.40–25.63 s (frames 492–769)
- **Narration** (f500–f755): Then a small disturbance — picking up the cup, adding a spoonful of coffee — and bubbles burst out all at once. Boiling water can erupt from the cup.
- **Visual:** Out of the oven. A hand lifts the cup slightly, a spoon of coffee hovers — the surface trembles — then the water erupts upward in a burst of droplets, held as a freeze-frame. A warning chip: 'can scald'.
- **On-screen text:** can scald
- **Beats:** `lift` f540 (on "picking"); `spoon` f589 (on "spoonful"); `burst` f646 (on "burst"); `warn` f712 (on "erupt")
- **Sound:** cup lift: `lf-mug-tap.wav` at f540, vol 0.26; eruption: `lf-water-burst.wav` at f646, vol 0.46
- **Claims:** X12

## SW05 · How to avoid it · 25.63–34.50 s (frames 769–1035)
- **Narration** (f776–f1023): So don't heat water longer than the instructions recommend. And adding instant coffee or sugar before heating greatly reduces the risk.
- **Visual:** Two guide cards. '1 · don't overheat it / follow the recommended time' with a timer bar that stops at a 'stop here' mark. '2 · add coffee or sugar' then 'BEFORE heating' in gold, with a spoon tipping granules into a glass of cold water.
- **On-screen text:** 1 · don't overheat it · follow the recommended time · stop here · 2 · add coffee or sugar · BEFORE heating · cold water
- **Beats:** `card1` f785 (on "heat"); `card2` f890 (on "adding"); `before` f942 (on "before")
- **Sound:** card click 1: `lf-click.wav` at f785, vol 0.22; spoon stir: `lf-spoon-stir.wav` at f946, vol 0.24
- **Claims:** X13

## SW06 · Calm isn't cool · 34.50–41.33 s (frames 1035–1240)
- **Narration** (f1042–f1200): Calm doesn't always mean below boiling. That water may just be waiting for a reason to boil.
- **Visual:** Back to the still cup, centred, with a slow push in. The thermometer sits above the 100 °C line. Text 'calm ≠ below boiling'. Ends on the motionless surface.
- **On-screen text:** calm ≠ below boiling
- **Beats:** `text` f1038 (on "calm"); `waiting` f1141 (on "waiting")
- **Sound:** silence (narration only)
- **Claims:** X14
