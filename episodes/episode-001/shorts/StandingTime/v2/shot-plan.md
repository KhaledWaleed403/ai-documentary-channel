# Episode 001 Short · StandingTime — Shot-by-shot visual and sound plan (v2)

Generated from `storyboard.json`, the source of truth. Its timing was measured from the narration takes by `scripts/audio/build-ep001-shorts.py`. Frames are at 30 fps. Scenes: `src/scenes/episode001Shorts/StandingTime.tsx`. Sound cues sit at their storyboard frames, placed by `src/data/episode001Shorts.ts`.

**Reused:**
- Long-form drawings, imported read-only: `CandyBar`, `MagnetronBlock`, `Silhouette`, `Ripples`, `OvenFront`, `heatColor`.
- The original Short's `Thermometer`, imported read-only.
- Components: `SignalPath`, `AudioCue`.

Every composition is a new vertical layout, not a crop of a 16:9 shot.

**New:** the vertical stage and helpers in `src/scenes/episode001Shorts/shared.tsx`, and every scene in this Short.

**Sound effects:** all are byte copies of long-form assets (see `../../audio-generation.md`).

## ST01 · The beep · 0.00–4.40 s (frames 0–132)
- **Narration** (f32–f122): The microwave beeps. It's done — but your food isn't.
- **Visual:** A microwave front fills the upper frame; its display counts 0:03 → 0:00 and flashes 'END' before the first word. Below, a big plate of food with a probe thermometer whose reading is still climbing.
- **On-screen text:** 0:00 · done?
- **Beats:** `count` f0; `end` f24; `isnt` f100 (on "isn't")
- **Sound:** done beep: `lf-start-beep.wav` at f24, vol 0.4
- **Claims:** L38

## ST02 · Hot outside, cool middle · 4.40–12.50 s (frames 132–375)
- **Narration** (f139–f365): In thick food, the waves mostly heat the outer layers. When they stop, the outside is hot — the middle is still catching up.
- **Visual:** Cut into a large cross-section of a thick mound of food on a plate. Faint teal waves enter from the sides and fade within a thick outer band, which glows orange. On 'stop' the waves vanish. Labels: 'outside: hot' and 'middle: still cool' (mist blue core).
- **On-screen text:** outside: hot · middle: still cool
- **Beats:** `waves` f171 (on "waves"); `stop` f251 (on "stop"); `labels` f269 (on "outside"); `middle` f308 (on "middle")
- **Sound:** wave fade: `lf-wave-absorb.wav` at f171, vol 0.16
- **Claims:** L27

## ST03 · Heat flows inward · 12.50–18.57 s (frames 375–557)
- **Narration** (f383–f547): That heat keeps flowing inward, from the hot outside to the cooler center — no microwaves needed.
- **Visual:** Same cross-section, waves gone. Orange heat arrows creep from the outer band toward the centre, and the core begins to warm. A small wave icon with a cross: 'microwaves: off'.
- **On-screen text:** microwaves: off
- **Beats:** `arrows` f400 (on "flowing"); `off` f506 (on "microwaves")
- **Sound:** silence (narration only)
- **Claims:** X09, L27

## ST04 · Standing time · 18.57–25.67 s (frames 557–770)
- **Narration** (f565–f758): That's standing time. Food keeps cooking after the oven stops — its temperature can climb several more degrees.
- **Visual:** Title chip 'STANDING TIME' with a clock face whose hand sweeps. A probe thermometer in the food's centre rises a few notches while the timer display stays at 0:00: '+ several degrees'.
- **On-screen text:** STANDING TIME · + several °
- **Beats:** `chip` f570 (on "standing"); `clock` f611 (on "keeps"); `climb` f702 (on "climb")
- **Sound:** clock ticks: `lf-clock-ticks.wav` at f611, vol 0.26
- **Claims:** L38

## ST05 · Same heat, spreading · 25.67–29.83 s (frames 770–895)
- **Narration** (f778–f883): It's not extra heating. It's the same heat, spreading out.
- **Visual:** Two side-by-side columns: 'outside' and 'middle', each a vertical heat bar. The outside bar drops a little as the middle bar rises, linked by an arrow; a small 'no new energy' note under a crossed wave icon.
- **On-screen text:** same heat, spreading out · outside · middle
- **Beats:** `notMore` f781 (on "not"); `bars` f827 (on "same"); `giveUp` f851 (on "spreading"); `warms` f869 (on "out")
- **Sound:** silence (narration only)
- **Claims:** X09

## ST06 · Stand, then check · 29.83–35.50 s (frames 895–1065)
- **Narration** (f904–f1053): Food-safety guides say let it stand at least three minutes — then check it with a food thermometer.
- **Visual:** Two numbered guide cards: '1 · stand ≥ 3 min' with the clock completing three ticks, and '2 · check with a food thermometer' as a probe slides into the food's centre.
- **On-screen text:** 1 · stand ≥ 3 min · 2 · check with a food thermometer
- **Beats:** `card1` f939 (on "stand"); `card2` f994 (on "check"); `probe` f1019 (on "thermometer")
- **Sound:** card click: `lf-click.wav` at f939, vol 0.22; probe in: `lf-fork-tap.wav` at f1029, vol 0.28
- **Claims:** X10

## ST07 · Finish the job · 35.50–41.40 s (frames 1065–1242)
- **Narration** (f1073–f1202): The beep means the waves are done. Standing time lets the heat finish the job.
- **Visual:** Payoff: the microwave display reads 0:00 at the top with 'waves: done ✓'. Below, the food cross-section finishes evening out to orange as a second chip ticks on: 'heat: done ✓'. Hold.
- **On-screen text:** waves: done ✓ · heat: done ✓
- **Beats:** `waves` f1096 (on "waves"); `heat` f1161 (on "heat"); `done` f1202
- **Sound:** done tick: `lf-click.wav` at f1204, vol 0.24
- **Claims:** L38, X09
