# Episode 001 — Narration Snippets

Approved script: `script.md` v4 (2026-10-27). One snippet per storyboard shot; each is generated, reviewed and approved on its own. The approved snippet files are the authoritative narration for the render; no continuous full-length voiceover is made.

Machine-readable manifest: `assets/audio/vo/manifest.json` (text, shot, takes, measured durations, status). Its `text` must match the shot's `narration` in `storyboard.json` exactly.

## Generation
- **Engine:** Kokoro-82M v1.0 via `kokoro-onnx` (weights Apache-2.0, no attribution required; CPU, 24 kHz mono), run by `~/.luminexplain-kokoro/scripts/kokoro_snippet.py` in its own Python environment outside the project. Earlier KittenTTS and PocketTTS takes are kept but not selected.
- **Voice:** `af_heart`, speed 1.0, `en-us`, for every snippet, with `--sentence-pause 0.4 --clause-pause 0.3` for a more deliberate read. Kokoro has no emotion or style control; speed and these pauses are the only delivery settings kokoro-onnx exposes.
- **Placement:** each snippet starts `offsetFrames` after its shot's cut (0 for SH01, 6 for the rest). Narration plays at +5.5 dB in Remotion (`narrationVolume`), which keeps every peak below −1 dBTP.
- **Takes:** saved as `assets/audio/vo/shNN-takeNN.wav` and never overwritten. A snippet changes only by approving a different take in the manifest.
- **Overlong takes:** if a take exceeds its max length, retime the shot in `storyboard.json` rather than speeding up or trimming the audio.

## Snippets
Target length assumes a natural ~2.8 words/s. Each snippet starts shortly after its shot's cut.

| ID | Shot window | Text | Words | Target (max) | Delivery / pronunciation |
| --- | --- | --- | --- | --- | --- |
| SH01 | 0.0–4.0 s | Your microwave doesn't heat the air. So what's heating your food? | 11 | 3.5 s (3.7) | Starts ~0.2 s in. Keep the contractions; light rising question |
| SH02 | 4.0–8.5 s | This part turns electricity into microwaves — a kind of radio wave. | 11 | 3.8 s (4.2) | Short pause at the dash |
| SH03 | 8.5–12.5 s | They bounce around the metal box and into your food. | 10 | 3.3 s (3.7) | "They" continues from SH02 |
| SH04 | 12.5–20.5 s | Water molecules have positive and negative ends. The waves tug them back and forth, billions of times a second. | 19 | 6.8 s (7.6) | No exaggerated stress on "billions" |
| SH05 | 20.5–29.5 s | All that tugging and bumping turns the waves' energy into heat. The waves reach partway in — heat spreads the rest of the way. | 23 | 8.2 s (8.6) | Pause at the dash |
| SH06 | 29.5–36.0 s | Some spots get stronger waves, so the turntable keeps food moving. Still — give it a stir. | 16 | 5.7 s (6.2) | Beat after "Still" |
| SH07 | 36.0–41.0 s | Waves in, hot food out — and nothing radioactive left behind. | 10 | 3.4 s (3.7) | Must end by 40.0 s. Rhythm: "Waves in, / hot food out —" |
