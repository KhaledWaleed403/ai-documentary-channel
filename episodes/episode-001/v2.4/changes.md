# HowMicrowavesWork (Episode 001 Short) v2.4 — Changes from v2.3

- **Captions:** burned-in captions added. Cues are in `captions.json` (this folder), aligned to the approved v2.3 narration takes; `captions.srt` is the upload file. See `../shorts/captions.md` for the method and style.
- **Layout:** the original Short's picture uses y up to about 1550 (thermometer, hot/cold labels, the final bowl). It's scaled to 0.86 about (540, 130) to make room for the captions. The margins show a heavily blurred, silent copy of the same frame, so the full-bleed backgrounds continue without a seam.
- **Unchanged:** everything else. Narration, sound (V2 effects, no music), storyboard and assets stay in `../v2.3/`, and `src/compositions/Episode001.tsx` is unchanged. The new composition is `E001ShortHowMicrowavesWorkCaptioned` (`src/compositions/Episode001Captioned.tsx`), which renders the approved `Episode001SoundV2` setup inside the caption layout.
- **Render:** `renders/episode-001/Shorts/HowMicrowavesWork/v2.4/`. The v2.3 render is untouched.
