# Episode 001 Short · MicrowaveSafeDishes — Shot-by-shot visual and sound plan (v1)

Generated from `storyboard.json`, the source of truth. Its timing was measured from the narration takes by `scripts/audio/build-ep001-shorts.py`. Frames are at 30 fps. Scenes: `src/scenes/episode001Shorts/MicrowaveSafeDishes.tsx`. Sound cues sit at their storyboard frames, placed by `src/data/episode001Shorts.ts`.

**Reused:**
- Long-form drawings, imported read-only: `CandyBar`, `MagnetronBlock`, `Silhouette`, `Ripples`, `OvenFront`, `heatColor`.
- The original Short's `Thermometer`, imported read-only.
- Components: `SignalPath`, `AudioCue`.

Every composition is a new vertical layout, not a crop of a 16:9 shot.

**New:** the vertical stage and helpers in `src/scenes/episode001Shorts/shared.tsx`, and every scene in this Short.

**Sound effects:** all are byte copies of long-form assets (see `../../audio-generation.md`).

## DS01 · The scorching plate · 0.00–4.13 s (frames 0–124)
- **Narration** (f16–f114): If a microwave heats the food, why is the plate scorching?
- **Visual:** Navy counter. A plate of food slides in from the oven side and lands. A hand reaches for the rim and snaps back; the rim flushes orange. Big question text above.
- **On-screen text:** Why is the PLATE hot?
- **Beats:** `land` f10; `touch` f83 (on "plate"); `text` f85 (on "scorching")
- **Sound:** plate set: `lf-dish-set.wav` at f22, vol 0.34
- **Claims:** none

## DS02 · Reason 1: the food · 4.13–10.40 s (frames 124–312)
- **Narration** (f132–f302): Sometimes it's the food: hot food heats whatever it touches, even a dish the waves pass through.
- **Visual:** Card '1 · heat from the food'. Cross-section: teal waves pass straight through the plate (it doesn't glow) and into the food, which turns orange. Orange heat arrows then run down from the food into the plate, which warms only where the food touches it.
- **On-screen text:** 1 · heat from the food · waves pass through
- **Beats:** `card` f128; `food` f173 (on "hot"); `arrows` f213 (on "touches"); `through` f267 (on "pass")
- **Sound:** card click: `lf-click.wav` at f128, vol 0.22
- **Claims:** L33

## DS03 · Reason 2: the dish · 10.40–17.47 s (frames 312–524)
- **Narration** (f320–f512): But sometimes the dish itself absorbs the energy. Most ceramics barely do — some get very hot on their own.
- **Visual:** Card '2 · the dish absorbs energy'. Three empty ceramic dishes in a column-free row, no food. Teal waves wash over them. Two stay mist blue; on 'some' the third dish glows orange by itself, waves fading into it.
- **On-screen text:** 2 · the dish absorbs energy · most · some
- **Beats:** `card` f316; `waves` f361 (on "absorbs"); `most` f403 (on "Most"); `some` f450 (on "some")
- **Sound:** card click: `lf-click.wav` at f316, vol 0.22; absorb: `lf-wave-absorb.wav` at f450, vol 0.22
- **Claims:** L35, X01

## DS04 · The word doesn't settle it · 17.47–23.30 s (frames 524–699)
- **Narration** (f532–f687): So ceramic, glass or plastic doesn't settle it. How the dish was made — and what for — does.
- **Visual:** Three material tiles (ceramic, glass, plastic), each with a '?' instead of a tick. They slide up and a checklist draws on beneath: material · glaze · metal trim · intended use.
- **On-screen text:** ceramic ? · glass ? · plastic ? · material · glaze · metal trim · intended use
- **Beats:** `ceramic` f532 (on "ceramic"); `glass` f550 (on "glass"); `plastic` f562 (on "plastic"); `list` f603 (on "How"); `use` f648 (on "what")
- **Sound:** ceramic tap: `lf-mug-tap.wav` at f532, vol 0.3; glass tap: `lf-glass-clink.wav` at f550, vol 0.26; plastic tap: `lf-fork-tap.wav` at f562, vol 0.22
- **Claims:** X02

## DS05 · What the label means · 23.30–32.97 s (frames 699–989)
- **Narration** (f707–f977): That's what a microwave-safe label is for. On plastic, it means the container passed tests to FDA standards. Not melting isn't passing.
- **Visual:** A generic microwave-safe symbol (a box with three wavy lines) stamps onto a plastic container. Small caption 'tested to FDA standards'. Then a second, unlabelled tub sits beside it, intact: 'didn't melt ≠ passed'.
- **On-screen text:** microwave-safe · tested to FDA standards · didn't melt ≠ passed
- **Beats:** `stamp` f753 (on "label"); `tested` f853 (on "passed"); `tub` f916 (on "Not"); `neq` f947 (on "passing")
- **Sound:** label stamp: `lf-stamp.wav` at f759, vol 0.26; tub set: `lf-dish-set.wav` at f926, vol 0.2
- **Claims:** X03, X04

## DS06 · The water-cup check · 32.97–42.27 s (frames 989–1268)
- **Narration** (f997–f1254): No label? Heat the empty dish beside a cup of water for a minute. Dish hot? Keep it out. Dish cool? A good sign — not a guarantee.
- **Visual:** Inside a schematic oven box: an empty dish beside a glass cup of water. A one-minute bar fills while teal waves run. Then two outcome rows: 'dish hot → keep it out' (dish orange) and 'dish cool → good sign, not a guarantee' (dish mist blue, a soft dashed outline instead of a tick).
- **On-screen text:** unlabeled dish · 1 min · dish hot → keep it out · dish cool → good sign, not a guarantee
- **Beats:** `setup` f1025 (on "empty"); `timer` f1085 (on "minute"); `hot` f1114 (on "hot"); `cool` f1167 (on "cool"); `guarantee` f1220 (on "guarantee")
- **Sound:** start beep: `lf-start-beep.wav` at f1077, vol 0.3; test run: `lf-oven-hum-loop.wav` at f1085, vol 0.12 (loop)
- **Claims:** X05, X06

## DS07 · Hottest thing out · 42.27–48.90 s (frames 1268–1467)
- **Narration** (f1275–f1427): Check the label, follow the maker's instructions — and the food should be the hottest thing out.
- **Visual:** The plate of food from DS01 returns. Two small thermometers: the food's reads high (gold), the plate's lower (soft orange). Two checklist chips draw on: 'check the label' · 'follow the maker's instructions'. Hold on the steaming food.
- **On-screen text:** check the label · follow the maker's instructions · food: hottest
- **Beats:** `label` f1283 (on "label"); `maker` f1300 (on "follow"); `therm` f1386 (on "hottest")
- **Sound:** final set: `lf-dish-set.wav` at f1416, vol 0.2
- **Claims:** X07, X08
