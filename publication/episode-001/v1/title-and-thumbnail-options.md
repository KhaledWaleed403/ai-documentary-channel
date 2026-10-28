# Episode 001 Long-Form — Title and Thumbnail Options

**Video:** `renders/episode-001/Long/v3/episode-001-long-cut3-master.mp4` (cut 3, 7:12, 1920×1080). The on-screen title card in the video reads **"How does a microwave actually heat food?"**.

**What the video actually covers (by runtime):**
- **History (0:00–2:19, about 32%):** the melted candy bar; Spencer's popcorn and egg tests; concentrating the waves in a small space; the October 1945 patent; the Radarange; the 1967 $495 countertop model; about nine in ten US homes by the late 1990s.
- **Mechanism (2:19–4:12, about 26%):** the magnetron fills a metal box with waves; the electric field swings about 2.5 billion times a second; lopsided water molecules are shoved back and forth; the dance-floor analogy; collisions turn the shove into heat; two myths (no "water frequency"; not inside-out).
- **Everyday consequences (4:12–6:32, about 32%):** hot and cold spots and the chocolate demo; the turntable; stirring; standing time; the dish test; frozen food; superheated water.
- **Recap (6:32–7:12):** the closing recap and the candy-bar callback.

So the video is mainly **"how it heats food"**, with the discovery story as its frame.

## Title candidates

| # | Title | Chars | Angle | Trade-off |
| --- | --- | --- | --- | --- |
| 1 ★ | **How a Microwave Actually Heats Food — and the Melted Candy Bar Behind It** | 72 | Leads with the main promise, which is also the video's own on-screen question. The candy bar adds a concrete, true story hook. | The longest option. If a surface truncates it, the cut falls in the second half, and the first half still says what the video is. |
| 2 | How Microwaves Work — And the Accidental Discovery Behind Them *(working title)* | 62 | Broad "how it works" plus the origin story. | "Accidental discovery" overstates what the video tells: it stresses that Spencer then tested on purpose and concentrated the energy. "How Microwaves Work" also reads as being about the radiation in general, not the oven. |
| 3 | How Does a Microwave Actually Heat Food? | 40 | Exact match with the video's title card; short and clear. | Accurate, but plain. It drops the history, about a third of the video, and gives no story hook. |
| 4 | A Melted Candy Bar, a Radar Tube, and the Science of Your Microwave | 67 | Story-first curiosity. | Weighted toward history; "science of your microwave" is vague about what you'll learn. |
| 5 | Why Microwaves Heat Unevenly — and How They Heat Food at All | 60 | Practical frustration as the hook. | Promises an uneven-heating video, but that's only about a third of it; under-sells the history. |

**Recommended: #1.**
- **Accurate:** every element is in the video and in the verified claims (L03, L20–L23). It names no candy brand (the brand is disputed, D01).
- **Clear:** the first 35 characters answer what the video is.
- **Curious:** the second half adds a hook the video pays off in its first 30 seconds and again at the end.
- **Consistent:** it matches the on-screen title card ("actually heat food"), so the title doesn't promise something the video frames differently.

## Thumbnail concepts

All three use the episode's own visual language: ink navy, teal waves, orange/gold heat, mist-blue cold, schematic line art. They show no real person's likeness, no fabricated photographs and no brands.

### A ★ — "2.45 billion times a second" (recommended; produced)
- **Core visual:** the long-form's front-on countertop oven (the Scene 7 drawing). Its window is X-rayed to show bright teal standing waves and a bowl of soup whose surface has a gold hot spot and a mist-blue cold spot. A dashed leader runs from the hot spot to a large teal-ringed magnifier on the right, showing four crowded, out-of-sync water molecules (orange/gold) under a row of field arrows.
- **Focal point:** the glowing magnifier, with the gold number top-left as the second read.
- **Text:** **2.45 BILLION** (gold, very bold) / **TIMES A SECOND** (ivory). Two lines, 4 words.
- **Colour, lighting, type:**
  - Dark navy base with glowing teal for the waves; heat carried by orange/gold and the cold spot by mist blue.
  - Shape carries meaning too: arrows and molecules, a magnifier and a bowl.
  - Type is the channel's Segoe UI stack, weight 800/700.
- **Mobile readability:** checked at 246×138 px. The number, oven, waves and magnifier all still read. Text sits top-left, away from the bottom-right duration badge.
- **How it complements the title:** the title promises "how it heats food" plus the candy-bar story. The thumbnail adds a surprising, specific number and shows the mechanism (waves → molecules → heat), so it doesn't repeat the title's words or the candy bar.
- **Why it's accurate:**
  - 2.45 GHz is the nominal oven frequency (L21: 2,450 MHz = 2.45 × 10⁹ cycles/s; S03, P04), and the video shows "2.45 GHz" on screen.
  - I used "2.45" rather than "2.5", because the narration says "*about* two and a half billion" and the thumbnail has no room for "about".
  - The hot and cold spots reflect Scene 5; the out-of-sync, partly turned molecules reflect Scene 4e.
- **Delivered** (in `thumbnails/episode-001/Long/v1/`): `thumbnail-3840x2160.jpg` (421 KB, under the 2 MB mobile-upload limit) and `thumbnail-3840x2160.png` (2.2 MB, desktop upload only). Source composition: `src/compositions/Episode001LongThumbnail.tsx` (Remotion still `E001LongThumbnail`, rendered with `--scale=2`).

### B — "The melted pocket"
- **Core visual:** the Scene 1 lab-coat pocket, close up, with the sagging plain-wrapped candy bar peeking out. To the right, a glowing magnetron block, with dashed teal ripples crossing to the pocket.
- **Focal point:** the drooping bar.
- **Text:** "WHAT MELTED IT?" (ivory, with "MELTED" in orange).
- **Colour and type:** a warmer frame, with an ivory paper-grain overlay for the 1940s feel; teal ripples are the only cool element.
- **Mobile readability:** good. It's one object plus a question, but the ripples get thin at small sizes, so draw them thicker than in the video.
- **How it relates to the title:** it largely repeats title #1's candy bar. It pairs better with title #3, which has no story hook.
- **Accuracy:**
  - It must show a generic silhouette or pocket only, never a portrait of Spencer, and no candy brand.
  - The question form is fair, since the video answers it.
  - Risk: viewers may expect a history-only video.

### C — "Hot plate, cold bite"
- **Core visual:** a cross-section of a plate of food. The rim is orange/gold with a steam wisp, the centre is mist blue, and two small thermometers read hot and cold. A faint teal wave pattern sits behind it.
- **Focal point:** the hot rim against the cold centre.
- **Text:** "WHY IS THE MIDDLE COLD?"
- **Colour and type:** a strong warm/cool split; very readable.
- **Mobile readability:** excellent.
- **How it relates to the title:** it complements titles #1 and #3 with a relatable everyday problem.
- **Accuracy:**
  - It's true to Scenes 5–6, but over-weights the practical third and may draw viewers who want a quick fix.
  - Thermometer readings must stay unnumbered (the video gives no specific temperatures there).

**Why A over B and C:**
- It represents the core of the video (the mechanism), not one segment.
- It doesn't duplicate the recommended title.
- It's built from the actual episode drawings, so it matches what viewers see when they click.
- B is the strongest alternative if you choose title #3.
