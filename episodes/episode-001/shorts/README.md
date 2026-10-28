# Episode 001 — Standalone Shorts batch

Four vertical Shorts built from the microwave long-form's research and assets. Each tells its own story with a new hook. None repeats the completed Short's explanation of how microwaves heat food, and none covers hot spots or turntables. The completed Short (`episodes/episode-001/v2.3/`) and the long-form (`long-v1/`) were not modified.

## The batch
| Short | Central question | Hook | Runtime | Master render |
| --- | --- | --- | --- | --- |
| **CandyBarDiscovery** (v3) | What invisible thing melted the candy bar, and what did its owner do next? | "A candy bar melted in an engineer's pocket — and whatever melted it was invisible." | 47.0 s | `renders/episode-001/Shorts/CandyBarDiscovery/v3/CandyBarDiscovery-v3-master.mp4` |
| **MicrowaveSafeDishes** (v3) | If the microwave heats the food, why is the plate scorching? | "If a microwave heats the food, why is the plate scorching?" | 48.9 s | `renders/episode-001/Shorts/MicrowaveSafeDishes/v3/MicrowaveSafeDishes-v3-master.mp4` |
| **StandingTime** (v2) | The microwave says it's done. Why isn't the food? | "The microwave beeps. It's done — but your food isn't." | 41.4 s | `renders/episode-001/Shorts/StandingTime/v2/StandingTime-v2-master.mp4` |
| **SuperheatedWater** (v2) | How can water be hotter than boiling and not boil? | "Water can get hotter than boiling — and still not boil." | 41.3 s | `renders/episode-001/Shorts/SuperheatedWater/v2/SuperheatedWater-v2-master.mp4` |

**Considered and not made:**
- *Frozen-food runaway heating:* its payoff ("one bite scalding, the next frozen") repeats the excluded uneven-heating story.
- *The 2.45 GHz "tuned to water" myth:* it needs the basic heating mechanism.
- *The Radarange's size:* too thin without the discovery story, which CandyBarDiscovery already tells.

**Current versions:** every Short now has burned-in captions and an `.srt` (see `captions.md`). The original HowMicrowavesWork Short has them too, as v2.4.
- CandyBarDiscovery v3: v2 hook plus captions.
- MicrowaveSafeDishes v3: v2 dish fix plus captions.
- StandingTime v2 and SuperheatedWater v2: captions.

Each version folder has a `changes.md`, and every earlier version's episode files and renders are kept. The `captions.srt` files in the uncaptioned v1/v2 folders are earlier estimates, superseded by the audio-aligned ones.

## Files per Short (`<ShortName>/<version>/`)
- `script.md`: concept, hook, arc, standalone and difference notes, full narration, and claims per shot.
- `shot-plan.md`: shot-by-shot visual, on-screen text, beat frames and sound cues.
- `storyboard.json`: the source of truth for timing, beats and cues, written by `scripts/audio/build-ep001-shorts.py`.
- `captions.json` / `captions.srt`: burned-in cues and the upload subtitle file, aligned to the takes (captioned versions). See `captions.md`.
- `assets/audio/vo/`: narration takes and `manifest.json`.
- `assets/audio/sfx/`: byte copies of the long-form effects this Short uses.

## Shared files
- **Batch:** `audio-generation.md` (narration, sound and mastering log, with sound credits).
- **Research:** `research/episode-001/shorts/claims.md`, `sources.md`.
- **Code:**
  - `src/compositions/Episode001Shorts.tsx`: compositions `E001Short<Name>` and `E001Short<Name>Draft`.
  - `src/data/episode001Shorts.ts`
  - `src/scenes/episode001Shorts/`

## Rendering
Render a revision with `npx remotion render E001Short<Name> renders/episode-001/Shorts/<Name>/vN/<Name>-vN.mp4 --port=3123`, then master it (see `audio-generation.md`). Each new version goes in a new `vN/` folder; a previous version is never overwritten. Render layout: `renders/episode-001/Shorts/<ShortName>/<version>/`. The original Short's renders moved there on 2026-10-28 as `Shorts/HowMicrowavesWork/{v0-draft, v1, v2, v2.1, v2.2, v2.3}/` (they were `renders/episode-001/<version>/`), and the path references in `episodes/episode-001/v2.3/sound-design-v2.md` were updated to match. Its episode files stay in `episodes/episode-001/v2.3/`. The long-form stays in `renders/episode-001/long-v1/`.

## Validation (2026-10-28)
| Check | CandyBarDiscovery | MicrowaveSafeDishes | StandingTime | SuperheatedWater |
| --- | --- | --- | --- | --- |
| Video | H.264 1080×1920, 30 fps, 1375 frames | 1080×1920, 30 fps, 1467 fr | 1080×1920, 30 fps, 1242 fr | 1080×1920, 30 fps, 1240 fr |
| Audio | AAC 48 kHz stereo | same | same | same |
| Raw loudness | −20.0 LUFS, −4.6 dBTP | −20.4 LUFS, −4.5 dBTP | −20.7 LUFS, −4.5 dBTP | −20.8 LUFS, −4.5 dBTP |
| Master loudness | −14.4 LUFS, −1.68 dBTP | −14.7 LUFS, −1.69 dBTP | −14.3 LUFS, −1.69 dBTP | −14.8 LUFS, −1.67 dBTP |
| Full decode (master) | 1375/1375 frames, 0 errors | 1467/1467, 0 | 1242/1242, 0 | 1240/1240, 0 |

- **Clipping:** none. Raw true peaks are about −4.5 dBTP, and masters stay under −1.5 dBTP.
- **Sync:**
  - Shot timing comes from each take's measured speech window.
  - Visual beats and sound cues are anchored to word positions in the take, so they hold by construction.
  - Beat frames were checked in contact sheets of the renders. Popcorn pops on "popped", the egg bursts on "exploded", the stamp lands on "patent", the dish glows on "some", the eruption bursts on "burst", and so on.
- **Framing:** two frames per shot (mid-narration and shot end) and one frame after every beat were reviewed as small contact-sheet stills from half-scale preview renders. These were stills, not full playback. On-screen text is 40–110 px and sits within y 160–1480, clear of the Shorts UI at the bottom and right. The issues found in the first preview were fixed before the v1 render: a hidden melted bar, a stray glow, a floating finger, a label overlapping the thermometer, and a hand drawn out of frame.
- **Accuracy and traceability:**
  - Every claim ID in the four storyboards resolves in `research/episode-001/shorts/claims.md`; reused `L##` IDs also resolve in `long-v1`.
  - Every source cited by those claims resolves in `research/episode-001/shorts/sources.md` or `long-v1/sources.md` (checked by script).
  - The guardrails are in each `script.md`.
- **Lint:** `npm run lint` (ESLint + tsc) passes.
- **Existing work:** `git status` shows no changes to the completed Short, the long-form or their renders. Only `src/Root.tsx` (two lines registering the new compositions) and `docs/component-inventory.md` (one paragraph) were edited.

## Remaining issues
1. **Nothing has been reviewed by ear.** That covers narration pronunciation (checked only via phonemes), cue levels (set by measurement) and the Foley, which comes from 128 kbps previews. Listen especially to:
   - CB03 at 0:18–0:20 (popcorn and egg under speech)
   - SW04 at 0:21 (eruption)
   - ST02 at 0:04–0:12, whose narration has only +2.3 dB gain because of a hot peak
2. **Runtimes run 41–49 s,** a little over the 25–45 s guide. MicrowaveSafeDishes (48.9 s) needs its two causes, the label and the home-check caveat to be accurate, so nothing was cut that would weaken the safety message.
3. **Mastering:** single-pass `loudnorm` lands at −14.3 to −14.8 LUFS rather than exactly −14. Use a two-pass loudnorm if the exact target matters.
4. **Captions** are sentence-level estimates from the takes, not forced alignment. Spot-check them before uploading.
5. **The X03 label meaning** rests on Harvard Health's report of FDA practice. The FDA's own regulation page wasn't read, so the narration limits the claim to plastic.

## v2 validation (2026-10-28)
| Check | CandyBarDiscovery v2 | MicrowaveSafeDishes v2 |
| --- | --- | --- |
| Video | H.264 1080×1920, 30 fps, 1411 frames | 1080×1920, 30 fps, 1467 frames |
| Master loudness | −14.25 LUFS, −1.61 dBTP | −14.69 LUFS, −1.69 dBTP |
| Raw loudness | −20.1 LUFS, −4.55 dBTP | −20.4 LUFS, −4.49 dBTP |
| Full decode (master) | 1411/1411 frames | 1467/1467 frames |

- **Frames checked:** CandyBarDiscovery v2's new hook (CB01–CB02) and MicrowaveSafeDishes v2 at 0:33–0:42 (DS06), reviewed as preview stills. The new claim X16 resolves, and `npm run lint` passes.
- **Not reviewed by ear:** the new CB01–CB03 narration takes.
