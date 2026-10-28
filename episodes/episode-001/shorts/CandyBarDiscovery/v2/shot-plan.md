# Episode 001 Short · CandyBarDiscovery — Shot-by-shot visual and sound plan (v2)

Generated from `storyboard.json`, the source of truth. Its timing was measured from the narration takes by `scripts/audio/build-ep001-shorts.py`. Frames are at 30 fps. Scenes: `src/scenes/episode001Shorts/CandyBarDiscovery.tsx`. Sound cues sit at their storyboard frames, placed by `src/data/episode001Shorts.ts`.

**Reused:**
- Long-form drawings, imported read-only: `CandyBar`, `MagnetronBlock`, `Silhouette`, `Ripples`, `OvenFront`, `heatColor`.
- The original Short's `Thermometer`, imported read-only.
- Components: `SignalPath`, `AudioCue`.

Every composition is a new vertical layout, not a crop of a 16:9 shot.

**New:** the vertical stage and helpers in `src/scenes/episode001Shorts/shared.tsx`, and every scene in this Short.

**Sound effects:** all are byte copies of long-form assets (see `../../audio-generation.md`).

## CB01 · The invisible culprit · 0.00–5.67 s (frames 0–170)
- **Narration** (f16–f162): A candy bar melted in an engineer's pocket — and whatever melted it was invisible.
- **Visual:** Cold open, close on an illustrated lab-coat pocket (blueprint line art on navy). A plain wrapped bar peeks over the pocket edge and sags as it melts. On 'invisible', faint dashed teal ripples drift across the frame from off-screen, with no visible source. Slow push in.
- **On-screen text:** 1940s · ?
- **Beats:** `bar` f4; `sag` f31 (on "melted"); `unseen` f131 (on "invisible")
- **Sound:** pocket rustle: `lf-pocket-rustle.wav` at f4, vol 0.3; wrapper sag: `lf-wrapper-crinkle.wav` at f31, vol 0.32; unseen hum: `lf-tube-hum.wav` at f131, vol 0.18
- **Claims:** L03, X16

## CB02 · The source revealed · 5.67–14.30 s (frames 170–429)
- **Narration** (f178–f419): It was the mid-nineteen-forties. Percy Spencer had been standing beside a magnetron — the tube that sends out radar's invisible waves.
- **Visual:** Pull back from the pocket: the engineer silhouette (no likeness) stands beside a bench where a magnetron block glows, labelled, sending faint dashed teal ripples (conceptual) across to the soft bar in his pocket. The ripples from CB01 now have a source. Chip 'invisible waves'.
- **On-screen text:** Percy Spencer · Raytheon · magnetron · invisible waves
- **Beats:** `name` f240 (on "Percy"); `glow` f302 (on "magnetron"); `melt` f378 (on "invisible")
- **Sound:** tube hum: `lf-tube-hum.wav` at f302, vol 0.3
- **Claims:** L04, L01, L03, X16

## CB03 · Testing on purpose · 14.30–22.27 s (frames 429–668)
- **Narration** (f437–f654): Instead of shrugging it off, he tested food on purpose. Popcorn kernels by the magnetron popped. An egg exploded.
- **Visual:** Two stacked test cards, 'TEST 1' and 'TEST 2'. Top: kernels on a tray beside the magnetron; ripples reach them and they burst into white puffs on 'popped'. Bottom: an egg wobbles, then a bloodless cartoon burst freezes mid-air on 'exploded'.
- **On-screen text:** TEST 1 · popcorn · TEST 2 · egg
- **Beats:** `card1` f533 (on "Popcorn"); `pop` f594 (on "popped"); `card2` f610 (on "egg"); `burst` f632 (on "exploded")
- **Sound:** tray set: `lf-dish-set.wav` at f533, vol 0.24; popcorn: `lf-popcorn-pops.wav` at f594, vol 0.5; egg: `lf-egg-burst.wav` at f632, vol 0.48
- **Claims:** L05, L06

## CB04 · Concentrate it · 22.27–28.40 s (frames 668–852)
- **Narration** (f676–f840): Then the key step: he concentrated the waves in a small space. Food placed there heated fast.
- **Visual:** Top half: ripples spread out in open space and fade (label 'spread out'). Bottom half: the same waves enter a small generic chamber in cross-section, reflect inside and build up (label 'concentrated'). A food shape inside warms from mist blue to orange on 'heated fast'.
- **On-screen text:** spread out · concentrated
- **Beats:** `spread` f689 (on "key"); `chamber` f712 (on "concentrated"); `heat` f809 (on "heated")
- **Sound:** reflect 1: `lf-wave-reflect-1.wav` at f726, vol 0.18; reflect 2: `lf-wave-reflect-2.wav` at f736, vol 0.15; reflect 3: `lf-wave-reflect-3.wav` at f746, vol 0.15
- **Claims:** L07

## CB05 · The patent · 28.40–34.43 s (frames 852–1033)
- **Narration** (f859–f1019): In October, nineteen forty-five, Raytheon filed a patent for cooking with microwaves.
- **Visual:** An ivory patent page slides up into frame: an original schematic (a box, a magnetron block, a food shape), not a copy of the patent figure. A date stamp lands: 'Filed Oct. 8, 1945'.
- **On-screen text:** PATENT · Filed Oct. 8, 1945
- **Beats:** `page` f854; `stamp` f953 (on "patent")
- **Sound:** page slide: `lf-paper-slide.wav` at f854, vol 0.34; date stamp: `lf-stamp.wav` at f953, vol 0.3
- **Claims:** L08

## CB06 · Press Start · 34.43–47.03 s (frames 1033–1411)
- **Narration** (f1041–f1369): Microwave ovens still work that way — a magnetron filling a metal box with waves. Every time you press Start, you're using the answer to the question a melted candy bar raised.
- **Visual:** A modern countertop microwave, front-on. Through the door, X-ray style: the magnetron glows and a soft teal lattice fills the box. A finger presses Start on 'Start'. On 'melted candy bar' the X-ray fades and the door glass dissolves into the pocket from CB01, with the sagging bar. Hold.
- **On-screen text:** melted snack → every kitchen
- **Beats:** `xray` f1109 (on "magnetron"); `press` f1224 (on "Start"); `pocket` f1309 (on "melted"); `line` f1369
- **Sound:** oven run: `lf-oven-hum-loop.wav` at f1109, vol 0.14 (loop); start beep: `lf-start-beep.wav` at f1228, vol 0.34; final crinkle: `lf-wrapper-crinkle.wav` at f1325, vol 0.26
- **Claims:** L40, X15, L03
