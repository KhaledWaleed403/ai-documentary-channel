# Episode 002 — Production Notes (long-v1 + shorts v1)

*The Hidden Machines That Keep a Submarine Crew Alive*. First rendered version, 2026-10-29.

## Sources of truth

| Item | File |
|---|---|
| Approved long-form script | `research/topic-discovery-longform/script-v1.md` (football-field wording applied 2026-10-29) |
| Approved Shorts scripts | `research/topic-discovery-longform/shorts-scripts-v1.md` |
| Fact base | `research/topic-discovery-longform/claims.md`, `research-gaps.md` |
| Narration text split into shots | `long-v1/narration.json`, `shorts/narration.json` (verified to match the approved scripts word for word) |
| Takes + measurements | `long-v1/assets/audio/vo/manifest.json`, `shorts/assets/audio/vo/manifest.json` |
| Timing (frames) | `long-v1/timeline.json`, `shorts/timeline.json` |
| Captions | `long-v1/captions.srt` (long-form: `.srt` only), `shorts/<ShortName>/captions.json` + `.srt` (burned in) |

## Narration

- **Engine:** Kokoro-82M v1.0 (`kokoro-onnx`), voice `af_heart`, speed 1.0, `en-us`. Sentence pause 0.4 and clause pause 0.3, the same as Episode 001.
- **Generator:** `scripts/audio/generate-ep002-vo.py`, run with the Kokoro venv's Python, `-I`, from the project root. It never overwrites an existing take.
- **Spoken text vs display text:**
  - Spoken text is derived automatically: "US" becomes "U.S." (otherwise Kokoro reads "us"), and the numerals 76, 77 and 35 are spelled out.
  - Display and caption text stay exactly as approved.
- **Takes:** 39 long-form takes (≈ 425 s of audio) and 33 Shorts takes.
- **Gain:** +5.5 dB per take, capped at a −1.5 dBFS sample peak.
- **Status:** first-cut takes. **Nobody has listened to them yet.** Pronunciation of "amine", "electrolyser" and "Virginia-class" should be checked on the first listen.

## Timing and captions

- `scripts/audio/build-ep002-timeline.py` lays shots end to end using the measured take lengths.
  - Long-form: 24-frame lead, 18-frame scene lead, 10-frame gap within a scene, 36-frame scene tail, 150-frame end hold.
  - Shorts: 6-frame lead, 5-frame gap, 45-frame end hold.
- Caption cues are word-wrapped (long-form 42 characters × 2 lines; Shorts 28 × 2) and timed **in proportion to characters** inside each take's measured speech window. They are not snapped to measured pauses, unlike Episode 001's captions script, so cue boundaries can lead or lag speech by a fraction of a second.

## Code

| What | Where |
|---|---|
| Compositions | `src/compositions/Episode002Long.tsx` (`Episode002Long`, `Episode002LongDraft`), `src/compositions/Episode002Shorts.tsx` (`Ep002Short-<ShortName>`) |
| Data | `src/data/episode002.ts` (throws if narration text, takes or timing drift apart), `src/data/episode002AudioFiles.ts` (audio import map) |
| Scenes | `src/scenes/episode002/kit.tsx`, `panels.tsx`, `longScenes.tsx`, `shortScenes.tsx` |

Some panels have layout props added for the Shorts (`clip`, `vlfX`/`elfX`, `ts`, `subs`). Their defaults reproduce the long-form v1 layout exactly.

## Sound

- Narration only: no music and no sound effects in v1.
- The `luminexplain-sound` workflow has not been run for Episode 002.

## Renders

| Output | Path |
|---|---|
| Long-form | `renders/episode-002/Long/v1/Episode002Long-v1.mp4` (raw), `…-master.mp4` (−14 LUFS / −1.5 dBTP), plus `.srt` |
| Shorts | `renders/episode-002/Shorts/<ShortName>/v1/<ShortName>-v1.mp4` (raw), `…-master.mp4`, plus `.srt` |

Rerender commands are in the final report and below:

```
npx remotion render Episode002Long renders/episode-002/Long/v2/Episode002Long-v2.mp4 --port=3123
npx remotion render Ep002Short-SubmarineNoGPS renders/episode-002/Shorts/SubmarineNoGPS/v2/SubmarineNoGPS-v2.mp4 --port=3123
```

Per the channel rules, a new version always gets a new folder.

## Shorts v2 (2026-10-30): standalone Shorts

Each Short now stands alone for YouTube, Instagram Reels and TikTok.

- **No end card.** The "FULL VIDEO" title card is removed; the Short's own title stays up from start to finish. The title now sits at y 170–370, below the TikTok and Reels header bars.
- **New closing lines.** The seven closing lines no longer say "…in our full submarine video". Each restates that Short's own payoff, using only facts already in the Short, with no new claims. Script: `research/topic-discovery-longform/shorts-scripts-v2.md`.
- **New takes.** The changed lines were regenerated as `take02` (the `"take": 2` field in `shorts/narration.json`). All other lines reuse their v1 takes.
- **v1 data is kept** as `shorts/narration-v1.json`, `timeline-v1.json`, `assets/audio/vo/manifest-v1.json` and `<ShortName>/captions-v1.{json,srt}`. The v1 renders are untouched.
- **Safe zones.** Captions end at y 1520 and leave a 150 px right margin, clear of the TikTok/Reels caption, username and right-hand button column.
- **Renders:** `renders/episode-002/Shorts/<ShortName>/v2/` holds the raw render, `-master` and `.srt`. The same master file can be uploaded to all three platforms.

## Long v2 + Shorts v3 (2026-10-30): no disclaimer tags, plain "US"

- **Disclaimer tags removed.** Every "Illustrative", "not to scale", "schematic" and "no real depth shown" tag or label is gone from the long-form and Shorts scene code. The cutaway tag now reads "Nuclear-powered", and the scrubber tag reads "Amine scrubber · classic design". Channel rule: no such tags in any video again.
- **"US" pronunciation.** The VO script used to respell "US" as "U.S." for Kokoro, which made it pause after each letter. Kokoro's phonemizer already reads a plain "US" as "you-ESS", so the respelling is gone. The 8 long-form lines and 6 Shorts lines that contain "US" were re-voiced as new takes (`"take"` field in each `narration.json`).
- **Earlier data is kept:** long `*-v1.json/.srt` and Shorts `*-v2.json/.srt`.
- **Renders:** `renders/episode-002/Long/v2/` and `renders/episode-002/Shorts/<ShortName>/v3/`. The long-form is now 7:43.7.
