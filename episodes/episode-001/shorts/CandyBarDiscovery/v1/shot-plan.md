# Episode 001 Short · CandyBarDiscovery — Shot-by-shot visual and sound plan (v1)

Generated from `storyboard.json`, the source of truth. Its timing was measured from the narration takes by `scripts/audio/build-ep001-shorts.py`. Frames are at 30 fps. Scenes: `src/scenes/episode001Shorts/CandyBarDiscovery.tsx`. Sound cues sit at their storyboard frames, placed by `src/data/episode001Shorts.ts`.

**Reused:**
- Long-form drawings, imported read-only: `CandyBar`, `MagnetronBlock`, `Silhouette`, `Ripples`, `OvenFront`, `heatColor`.
- The original Short's `Thermometer`, imported read-only.
- Components: `SignalPath`, `AudioCue`.

Every composition is a new vertical layout, not a crop of a 16:9 shot.

**New:** the vertical stage and helpers in `src/scenes/episode001Shorts/shared.tsx`, and every scene in this Short.

**Sound effects:** all are byte copies of long-form assets (see `../../audio-generation.md`).

## CB01 · A ruined snack · 0.00–3.37 s (frames 0–101)
- **Narration** (f16–f93): The microwave oven started with a ruined snack.
- **Visual:** Cold open, close on an illustrated lab-coat pocket (blueprint line art on navy). A plain wrapped bar peeks over the pocket edge and sags as it melts. Slow push in.
- **On-screen text:** 1940s
- **Beats:** `bar` f4; `sag` f61 (on "ruined")
- **Sound:** pocket rustle: `lf-pocket-rustle.wav` at f4, vol 0.3; wrapper sag: `lf-wrapper-crinkle.wav` at f61, vol 0.32
- **Claims:** X15

## CB02 · Beside the magnetron · 3.37–14.50 s (frames 101–435)
- **Narration** (f109–f425): In the mid-nineteen-forties, engineer Percy Spencer was working near a magnetron — the tube that makes radar's waves. Then he noticed the candy bar in his pocket had melted.
- **Visual:** Pull back to a full-height engineer silhouette (no likeness) in the lower half. Above him a glowing magnetron block, labelled, sends faint dashed teal ripples outward (conceptual). On 'melted' the small bar in his coat pocket warms to orange and droops.
- **On-screen text:** magnetron · Percy Spencer · Raytheon
- **Beats:** `name` f178 (on "Percy"); `glow` f228 (on "magnetron"); `melt` f398 (on "melted")
- **Sound:** tube hum: `lf-tube-hum.wav` at f228, vol 0.3; melt crinkle: `lf-wrapper-crinkle.wav` at f398, vol 0.24
- **Claims:** L01, L04, L03

## CB03 · Testing on purpose · 14.50–21.07 s (frames 435–632)
- **Narration** (f443–f618): So he tested food on purpose. Popcorn kernels by the magnetron popped. An egg exploded.
- **Visual:** Two stacked test cards, 'TEST 1' and 'TEST 2'. Top: kernels on a tray beside the magnetron; ripples reach them and they burst into white puffs on 'popped'. Bottom: an egg wobbles, then a bloodless cartoon burst freezes mid-air on 'exploded'.
- **On-screen text:** TEST 1 · popcorn · TEST 2 · egg
- **Beats:** `card1` f493 (on "Popcorn"); `pop` f556 (on "popped"); `card2` f572 (on "egg"); `burst` f595 (on "exploded")
- **Sound:** tray set: `lf-dish-set.wav` at f493, vol 0.24; popcorn: `lf-popcorn-pops.wav` at f556, vol 0.5; egg: `lf-egg-burst.wav` at f595, vol 0.48
- **Claims:** L05, L06

## CB04 · Concentrate it · 21.07–27.20 s (frames 632–816)
- **Narration** (f640–f804): Then the key step: he concentrated the waves in a small space. Food placed there heated fast.
- **Visual:** Top half: ripples spread out in open space and fade (label 'spread out'). Bottom half: the same waves enter a small generic chamber in cross-section, reflect inside and build up (label 'concentrated'). A food shape inside warms from mist blue to orange on 'heated fast'.
- **On-screen text:** spread out · concentrated
- **Beats:** `spread` f653 (on "key"); `chamber` f676 (on "concentrated"); `heat` f773 (on "heated")
- **Sound:** reflect 1: `lf-wave-reflect-1.wav` at f690, vol 0.18; reflect 2: `lf-wave-reflect-2.wav` at f700, vol 0.15; reflect 3: `lf-wave-reflect-3.wav` at f710, vol 0.15
- **Claims:** L07

## CB05 · The patent · 27.20–33.23 s (frames 816–997)
- **Narration** (f823–f983): In October, nineteen forty-five, Raytheon filed a patent for cooking with microwaves.
- **Visual:** An ivory patent page slides up into frame: an original schematic (a box, a magnetron block, a food shape), not a copy of the patent figure. A date stamp lands: 'Filed Oct. 8, 1945'.
- **On-screen text:** PATENT · Filed Oct. 8, 1945
- **Beats:** `page` f818; `stamp` f917 (on "patent")
- **Sound:** page slide: `lf-paper-slide.wav` at f818, vol 0.34; date stamp: `lf-stamp.wav` at f917, vol 0.3
- **Claims:** L08

## CB06 · Press Start · 33.23–45.83 s (frames 997–1375)
- **Narration** (f1005–f1333): Microwave ovens still work that way — a magnetron filling a metal box with waves. Every time you press Start, you're using the answer to the question a melted candy bar raised.
- **Visual:** A modern countertop microwave, front-on. Through the door, X-ray style: the magnetron glows and a soft teal lattice fills the box. A finger presses Start on 'Start'. On 'melted candy bar' the X-ray fades and the door glass dissolves into the pocket from CB01, with the sagging bar. Hold.
- **On-screen text:** melted snack → every kitchen
- **Beats:** `xray` f1073 (on "magnetron"); `press` f1188 (on "Start"); `pocket` f1273 (on "melted"); `line` f1333
- **Sound:** oven run: `lf-oven-hum-loop.wav` at f1073, vol 0.14 (loop); start beep: `lf-start-beep.wav` at f1192, vol 0.34; final crinkle: `lf-wrapper-crinkle.wav` at f1289, vol 0.26
- **Claims:** L40, X15, L03
