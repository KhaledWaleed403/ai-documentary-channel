# Episode 003 Long-Form — Timing Report (v1 render)

Measured from the approved Kokoro takes (`assets/audio/vo/manifest.json`, speech start to end per take) and `timeline.json` (built by `scripts/audio/build-ep003-timeline.py`). 30 fps. The storyboard slots are the planning targets; the render follows the measured audio.

| Scene | Lines | Measured speech | Scene length | In the episode | Storyboard slot |
|---|---|---|---|---|---|
| 1 · A path that should have turned back | 4 | 21.7 s | 26.7 s | 0.0–26.7 s | 25 s |
| 2 · The question | 1 | 5.5 s | 7.8 s | 26.7–34.5 s | 10 s |
| 3 · The flyby, seen from the planet | 4 | 21.6 s | 27.4 s | 34.5–61.9 s | 30 s |
| 4 · Same speed, new direction | 3 | 14.7 s | 18.8 s | 61.9–80.6 s | 20 s |
| 5 · The switch: seen from the Sun | 4 | 25.6 s | 32.4 s | 80.6–113.0 s | 35 s |
| 6 · Adding the arrows | 3 | 24.9 s | 31.8 s | 113.0–144.9 s | 35 s |
| 7 · Who pays | 4 | 20.6 s | 25.5 s | 144.9–170.3 s | 25 s |
| 8 · Behind or in front | 4 | 19.0 s | 23.8 s | 170.3–194.1 s | 25 s |
| 9 · A favourable alignment | 5 | 44.3 s | 52.0 s | 194.1–246.1 s | 50 s |
| 10 · Why the Sun is hard to reach | 3 | 20.6 s | 24.6 s | 246.1–270.6 s | 30 s |
| 11 · Seven Venus flybys | 3 | 21.5 s | 27.4 s | 270.6–298.1 s | 30 s |
| 12 · Fastest by slowing down | 2 | 15.8 s | 18.9 s | 298.1–317.0 s | 15 s |
| 13 · The whole picture | 3 | 23.1 s | 27.1 s | 317.0–344.1 s | 25 s |
| 14 · Where it leaves us | 2 | 10.1 s | 17.1 s | 344.1–361.2 s | 15 s |
| **Total** | **45** | **288.9 s** | **361.2 s (6:01)** | | **370 s** |

Pacing: 24-frame lead, 18-frame scene lead, 10-frame gap between lines, 36-frame scene tail, 150-frame end hold (Episode 002 values), plus extra visual holds after Scenes 3 (1 s), 5 (2 s), 6 (3 s), 9 (2 s) and 11 (2 s) so the frame switch, the vector sum and the mission diagrams can land after the narration.

Audio: 45 takes, Kokoro-82M `af_heart`, speed 1.0. Speech level −23.0 to −23.9 dBFS RMS on every take, no clipped samples, no internal pause longer than 0.75 s. Every take plays at one gain (the lowest per-take gain in the manifest) so the takes stay level with each other. Re-voiced as take 2: S08-4 ("Io" was read "EE-oh"), S09-2 and S09-5 (the possessive in "Voyager 2's" was dropped).

## Render (v1, 2026-10-31)

- Raw: `renders/episode-003/Long/v1/Episode003Long-v1.mp4` (1920×1080, 30 fps, 361.2 s).
- **Upload this one:** `renders/episode-003/Long/v1/Episode003Long-v1-master.mp4`, mastered to −14.3 LUFS, −1.65 dBTP.
- Subtitles: `renders/episode-003/Long/v1/Episode003Long-v1.srt` (87 cues; same as `captions.srt` here).
- Combined narration: `assets/audio/narration-full.wav`.
- Checked: every scene reviewed from stills, crossfade frames sampled, lint clean. Not yet watched end to end by a human.

## Render v2 (2026-10-31): review fixes

- **0:18 pause:** Kokoro voiced "Instead," as its own clause (0.33 s gap, odd intonation). Re-voiced S01-3 as take 2, spoken without the comma; the caption text keeps it.
- **Dead air between scenes:** scene tail is down from 36 to 12 frames and scene lead from 18 to 6, and every extra visual hold has been removed. Each scene change now has about 1.1 s of silence (it was 1.8–4.8 s). Each scene's animation still finishes before its narration ends; the Scene 6 end frame was checked.
- **Title card:** "How a Spacecraft Steals Speed".
- Length: 335.3 s (5:35), down from 361.2 s. `timeline.json` / `captions.*` in this folder are now the v2 versions; v1's subtitles survive in `renders/episode-003/Long/v1/`.
- **Upload this one:** `renders/episode-003/Long/v2/Episode003Long-v2-master.mp4` (−14.3 LUFS, −1.5 dBTP), subtitles `Episode003Long-v2.srt`.
- `assets/audio/narration-full.wav` is still the v1 mix.
