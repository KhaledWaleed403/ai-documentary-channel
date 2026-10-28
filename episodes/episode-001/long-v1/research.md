# Episode 001 Long-Form — Research Brief

**Video:** How Does a Microwave Actually Heat Food? (long-form, 16:9) · **Script:** `script.md` (draft v2)
**Audit date:** 2026-10-28. Every source was re-read today.

This brief is the long-form's research notes: what we found, how the story uses it, and what is still uncertain. The traceable records follow the project's structure (CLAUDE.md, `docs/production-workflow.md` stages 1–2) in their own folder, separate from the Short:
- **Claims:** `research/episode-001/long-v1/claims.md`. Atomic claims `L##` with the narration they support, their sources and a status (`verified` / `simplified` / `derived` / `disputed` / `cut`), plus a disputed list `D01`–`D06`.
- **Sources:** `research/episode-001/long-v1/sources.md`. URL, type, read date and what each source supports, plus a list of sources that couldn't be reached or verified.
- **Script:** every scene in `script.md` lists its claim IDs paragraph by paragraph.

The Short's research (`research/episode-001/claims.md`, `sources.md`, `research-notes.md`) and its episode folder `episodes/episode-001/v2.3/` are not modified. Shared sources keep their `S##` IDs.

---

## 1. History: what we can stand behind
- **The man.** Percy Spencer (born 1894, Maine) left school at about 12, learned radio in the Navy and was largely self-taught (L02). At Raytheon he worked on magnetrons, the wave-producing tube at the heart of wartime radar. His production methods raised output to about 2,600 a day (L01, L19).
- **The moment.** While near an operating magnetron, he found a candy bar in his pocket had melted (L03). *What the bar was* can't be settled: retellings say chocolate, a PayDay or a peanut cluster (D01). *When* is "by October 1945" (the patent date); IEEE Spectrum's 1946 conflicts with the patent itself (D02).
- **The experiments.** Popcorn popped (four sources, L05) and an egg exploded (three sources, L06). The patent itself mentions hard-boiling an egg and cooking a potato, and describes concentrating the wave energy "within a restricted region of space" (L07). IEEE Spectrum describes this as a metal box. The colleague splattered by the egg appears in one source only, so it's cut.
- **A myth the patent corrects.** Heating food with radio-frequency energy had already been tried at much lower frequencies. Spencer's idea was waves of ~10 cm or less, "comparable to the average dimension of the foodstuff" (L09, from the primary patent).
- **The evolution.** The Radarange (c. 1946–47) was nearly six feet tall, weighed roughly 300–340 kg, was water-cooled, cost thousands of dollars and went to restaurants (L10–L13). In 1967 Amana sold a countertop home model for $495, "still steep", about 40 cm tall (L15). By 1997 about 90 % of US homes had one (L17).
- **Cut for weak or conflicting sourcing:** the price ratio between the two ovens (the Radarange price is $5,000 in two sources but $3,000 in an unverified Smithsonian record, D04); the 1955 home model (one readable source); the 1986 adoption figure (one source).

## 2. Science: the mechanism the script teaches
1. A magnetron makes microwaves (short radio waves, ~2,450 MHz), and the metal walls reflect them around the box (L20, L26).
2. Their electric field swings back and forth ~2.45 billion times a second (L21).
3. Water molecules are polar, so the field pushes and twists them (L22, L39).
4. They can't follow neatly. Collisions scramble the driven motion into random motion, and that random motion is heat. This is *dielectric heating*, not resonance; 2.45 GHz is a frequency allocated for ovens, not a special frequency of water (L23, L24).
5. Water isn't the only absorber (L25). The earlier line "fats and sugars do, too" relied on the unreachable USDA page and was replaced.
6. In thick food the waves reach only a few centimetres; the inside warms by conduction. Not inside-out (L27, D05).

**Analogy vs physics**
| Analogy shown | What it gets right | Where it breaks, and how the script signals it |
| --- | --- | --- |
| A crowded dance floor where the beat reverses billions of times a second | The field pushes on polar molecules; they can't follow; collisions turn organised pushing into random motion (L23) | Molecules don't "hear" anything or spin all the way round, and hydrogen bonding matters (S03). Narrated as "That's only a picture." Drawn in a framed, dashed "analogy" style; the physics view uses the precise molecule style. |
| Bright and dim patches as a fixed "map" | Overlapping reflections make stronger and weaker regions (L28) | The real pattern is 3-D and shifts as the food heats (S07). Translucent, labelled "simplified", and the narration says so in Scene 5 ¶5. |

## 3. Uneven heating and everyday surprises
- **Hot and cold spots:** standing waves in the cavity cause them, and the food itself reshapes the field (S07, re-verified via Europe PMC). The chocolate demo makes the spots visible, about 6 cm apart (P01, P06).
- **Turntable:** motion "helps mitigate" uneven heating (S07). With the turntable on, the hot spots move around the food (P01). It can't make heating perfect: the pattern is 3-D and changes, and the centre of the plate barely moves (geometry). Every food-safety source still says to stir or rotate (S06, P04, P05) (L28–L31).
- **Hot plate, cold bite:** the plate can heat from the food (S01). A dish that heats on its own in the cup-of-water test isn't microwave-safe (S06), and the reason is that it absorbs the energy itself (derived, L35). Standing time helps because food keeps cooking and its temperature rises several degrees after the oven stops (P05), as heat spreads inward (S01) (L38).
- **Frozen food:** ice absorbs poorly, thawed patches absorb more and heat faster, so some parts can cook while others stay frozen (L32). This comes from three university sources (Cornell release, Bucknell course page, Illinois Extension); no peer-reviewed paper could be opened (D06).
- **Superheated water:** can pass boiling point without bubbling and erupt when disturbed (S01, L36).
- **Not radioactive** (S01, L37).

## 4. Re-verification log (2026-10-28)
| Item | Result | Action |
| --- | --- | --- |
| USDA FSIS (S02) | DNS lookup refused on this network (3 attempts, WebFetch and curl); Wayback Machine blocked | **No longer cited.** Its claims are re-sourced to S01 (FDA), S06 (UNL), P04 (Virginia Tech) and P05 (Illinois Extension), which cites FSIS as its reference. "Fats and sugars absorb" had no other source and was replaced (L25). |
| Journal paper S07 (Yang et al. 2026) | The PMC page returned a CAPTCHA; full text read via Europe PMC's REST API | **Verified.** It supports hot/cold spots from standing waves, food disturbing the field, motion helping, and properties changing during heating. |
| Patent H01 | Re-read | It does *not* mention popcorn or a metal box, so those rest on H02–H06 and H03, with the box drawn as a generic chamber. |
| S01, S03, S05, S06, S10, H02–H06, P01–P03 | Re-read today | No change. |
| New today | P04 (Virginia Tech FST-324P), P05 (Illinois Extension, Feb 2025), P06 (Univ. of Arizona outreach) | Added as replacements and second sources. |

## 5. Still uncertain
1. **Candy bar identity** (D01). Narration says only "candy bar".
2. **Discovery year** (D02) and **Radarange year** (D03). The narration avoids exact dates except the patent's.
3. **Radarange weight and price** (D04). Covered by "about as much as four grown adults" and "thousands of dollars".
4. **Penetration depth** (D05). "A few centimeters", with no number on screen.
5. **Frozen-food evidence** (D06). Three university sources, but none peer-reviewed.
6. **Dish-absorption explanation** (L35). A sound inference from S01 and S06, but not stated outright by either.
7. **USDA FSIS** could be re-read from another network as an extra check. Nothing depends on it now.
