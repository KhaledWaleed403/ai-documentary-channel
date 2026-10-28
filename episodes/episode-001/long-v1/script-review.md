# Episode 001 Long-Form — Script Review

**Script:** `script.md` v2.1 (approved 2026-10-28) · **Research brief:** `research.md` · **Claims / sources:** `research/episode-001/long-v1/claims.md`, `sources.md`
**Status:** script approved 2026-10-28 (v2 plus the Scene 6 polish below = v2.1). Storyboard drafted for review (`storyboard.md`, `storyboard.json`, `shot-asset-breakdown.md`). No narration, sound, animation or render has been made.

## 1. What changed from v1
| Request | Change |
| --- | --- |
| 1 · Price comparison | Removed "about a tenth of the original price". The Radarange price is $5,000 in two sources but $3,000 in another account (D04), so no ratio is claimed. The contrast is now restaurant against home, plus size: "it cost thousands of dollars — so it went to restaurants, not homes" → "Twenty years later … a countertop model arrived for home kitchens. Four hundred and ninety-five dollars — still pricey, but no longer a restaurant machine." Both figures are verified on their own ($495: IEEE and Smithsonian Magazine). The Scene 3 visual no longer shows a price for the giant or a shrinking price bar. |
| 2 · Speed-of-light aside | Removed from narration, visuals and on-screen text. The time went to the turntable: a new paragraph follows one spoonful of soup through strong and weak spots, with a step-graph visual (Scene 5 ¶4). The scene got 2 s shorter overall. |
| 3 · Source re-verification | Journal paper S07: **verified** via Europe PMC's full text. USDA FSIS (S02): still unreachable (DNS refused, Wayback blocked), so it's **no longer cited**, and each of its claims was re-sourced to pages read today: FDA, UNL Extension, Virginia Tech FST-324P, Illinois Extension. Claims that couldn't be re-sourced or rested on a single source were revised or cut. The details follow. |
| 4 · Claim traceability | Created `research/episode-001/long-v1/claims.md` and `sources.md` in the project's required format. Claims carry IDs, the narration they support, sources and status; a disputed list and a cut list follow. The script now lists claim IDs **by paragraph** in every scene, and Scene 4's beat table has a Claims column. A check confirmed every ID the script uses resolves to a row in `claims.md`, and every source ID in `claims.md` resolves in `sources.md`. The Short's files are unchanged. |
| 5 · Consistency | `research.md` is now the research brief that points to the claim and source files, with no duplicated tables. All three episode files use the same IDs, statuses and runtime. |

### Narration edits made because of re-verification
| Line (v1 → v2) | Why |
| --- | --- |
| "It exploded — reportedly, all over a colleague." → "It exploded." | The colleague is in one source only (APS). |
| "He fed the energy into a metal box. Trapped inside, it built up…" → "Instead of letting the energy spread out, he concentrated it into a small space. Food placed there heated fast." | The patent (primary) says "concentrating … within a restricted region of space". The metal box is in IEEE only, so the visual is now a generic chamber. |
| "weighed more than four grown adults" → "about as much as four grown adults" | The weight is 300 kg in one figure and 340 kg in another. "About as much as four" holds for both; "more than four" doesn't at 300 kg. |
| "A home version came out in the fifties. Hardly anyone bought it." → cut | One readable source (IEEE); the Smithsonian record returned HTTP 403. |
| "Most food is full of water." → "Most of the food we heat contains plenty of water." | Softer generalization, backed by FDA and Virginia Tech. |
| "Fats and sugars do, too." → "Other molecules in food absorb some, too." | The only source was USDA (unreachable). A search result also suggests fats absorb weakly. Baird (WTAMU) supports the general statement. |
| "A little standing time lets the heat finish spreading." → "A few minutes of standing time lets the heat keep spreading inward." | Illinois Extension: food keeps cooking and rises several degrees; rest at least 3 minutes. |
| "flips billions of times" (Scene 7) → "swings back and forth billions of times" | Matches Scene 4's per-cycle wording. |
| Visual: "slowed ~1,000,000,000×" → "slowed ~2,500,000,000×" | One cycle per second shown on screen, versus 2.45 billion per second in reality. |
| On screen: 1986 adoption figure removed | One source only. |

## 2. Runtime estimate
Rate: **2.81 words/s**, measured from the Short's approved `af_heart` takes (104 words in 36.95 s of speech; manifest only read).

| Scene | Words | Speech | + visual beats | ≈ Scene length | Timecode |
| --- | --- | --- | --- | --- | --- |
| 1 · The melted pocket | 91 | 32 s | title card ~4 s | 37 s | 0:00–0:37 |
| 2 · Popcorn, an egg and a box | 141 | 50 s | pops and patch hold ~4 s | 54 s | 0:37–1:31 |
| 3 · Restaurant giant to countertop | 125 | 45 s | scale and calendar beats ~5 s | 50 s | 1:31–2:21 |
| 4 · Press Start | 299 | 106 s | slow-mo and analogy handoff ~8 s | 114 s | 2:21–4:15 |
| 5 · The candy bar returns | 164 | 58 s | melt hold and spoonful ride ~10 s | 68 s | 4:15–5:23 |
| 6 · Hot plate, cold bite | 218 | 78 s | split-screen test and eruption ~6 s | 84 s | 5:23–6:47 |
| 7 · Payoff | 101 | 36 s | end card ~6 s | 42 s | 6:47–7:29 |
| **Total** | **1,139** (v1: 1,145) | **6:45** | **~0:43** | **≈ 7:29** | |

Gaps between snippets add roughly 10–15 s, so the expected final runtime is **7:20–7:45**. That's inside the 6–8 min target. (`docs/project-brief.md` says long explainers run 8–15 min; this video follows your 6–8 min brief.)

## 3. Does it still flow as one story?
Read straight through after the edits:
- **Historical opening (Scenes 1–3).** Mystery → curiosity → experiments → the decisive move (concentrating the energy) → the patent's "short waves" idea → giant restaurant machine → home countertop → nine in ten homes. Cutting the 1950s model and the price ratio removed a detour. "Twenty years later" now jumps straight from restaurant to home, which reads more cleanly. The hand-off line "The machine shrank. The idea inside it stayed the same" is unchanged.
- **Simplified mechanism (Scene 4).** Still one continuous demonstration: field → lopsided molecule → analogy → "That's only a picture" → heat → myths → not inside-out. The changed myth line ("Other molecules in food absorb some, too") is shorter and no longer claims something we can't source.
- **Turntable and uneven heating (Scene 5).** Better than v1. Without the speed-of-light detour, the chocolate demo leads straight into "That's what the turntable is for", and the spoonful's ride makes the averaging concrete before "but not perfectly". The candy-bar callback lands without interruption.
- **Practical details (Scene 6).** Unchanged in structure. Each beat answers part of "hot plate, cold bite". The standing-time line is now more precise.
- **Payoff (Scene 7).** Recaps the same chain (radar tube → waves → swinging field → crowded molecules → heat → pattern → turntable) and closes on the melted candy bar. Every element it names was set up earlier.

**Resolved (v2.1):** Scene 6 opened with "Which leads to…" right after Scene 5's "Which brings us to…". As approved, it now reads "And then there's the classic microwave betrayal." The word count is unchanged (1,139).

**Storyboard timing note:** the storyboard adds a 6-frame lead-in before every snippet (as the Short does) and a longer 36-frame cold open. That comes to about 8 s across 34 snippets, which this estimate didn't count. After tightening visual tails, the storyboard estimate is **7:31.5** (13,545 frames), 2.5 s over the 7:29 target and within the 7:20–7:45 range. No scene was padded.

## 4. Important fact-checks (current wording)
| Point | Script wording | Basis |
| --- | --- | --- |
| Candy bar (L03, D01) | "candy bar" only | Identity disputed; plain, unbranded wrapper |
| Discovery date (L04, D02) | "Sometime in the mid-nineteen-forties"; patent "October, nineteen forty-five" | Patent filing date is primary (H01) |
| Concentrating the energy (L07) | "concentrated it into a small space" | Patent (H01) + IEEE (H03) |
| Radarange (L10–L13, D03–D04) | "a couple of years later", "nearly six feet", "about as much as four grown adults", "thousands of dollars", "restaurants, not homes" | Holds under every source's figures |
| 1967 model (L15, L41) | "Twenty years later … four hundred and ninety-five dollars — still pricey" | IEEE + Smithsonian Magazine; "twenty years" derived from 1946/47 → 1967 |
| Field rate (L21) | "swings back and forth about two and a half billion times every second" | 2,450 MHz = cycles per second |
| Mechanism (L23) | Analogy, then "only a picture", partial twists, collisions → heat | HyperPhysics, Baird |
| Not resonance (L24) | "not a magic frequency … set aside for ovens" | Baird (quoting Schmitt) |
| Penetration (L27, D05) | "within the first few centimeters" | FDA, UNL, Virginia Tech; HyperPhysics gives less, so no number |
| Turntable (L28–L31) | "averages out — but not perfectly"; "center … barely moves" | Journal paper S07, OpenLearn, extension sources; centre point is geometry |
| Dish test (L34–L35) | "If the dish is hot, it isn't microwave-safe" | UNL Extension; "absorbs the energy itself" is derived |
| Frozen food (L32, D06) | thawed patch "soaks up far more energy" | Cornell, Bucknell, Illinois Extension (not peer-reviewed) |
| Superheated water (L36) | "rare surprise … can erupt" | FDA; "rare" is editorial |

## 5. Remaining uncertainties
1. **Candy bar identity and exact discovery year** (D01, D02). These can't be resolved from available sources; the script is worded to avoid both.
2. **Radarange year, weight and price** (D03, D04). Covered by the hedged wording; no single figure is relied on.
3. **Frozen-food runaway** (D06). Three university sources agree, but the peer-reviewed review couldn't be opened. It's acceptable for a general audience as worded; a peer-reviewed source would make it stronger.
4. **Dish absorption** (L35). A sound inference, but not a direct quote from any source.
5. **USDA FSIS** wasn't reachable from this network. Nothing depends on it now; re-reading it elsewhere would be an extra check, not a requirement.
6. **Pronunciation** to check when narration starts: "Radarange", "Raytheon".
7. **Folder naming:** `long-v1` is used under both `episodes/episode-001/` and `research/episode-001/`, and renders would go to `renders/episode-001/long-v1/`.

## 6. Not done (by design)
No storyboard, narration, sound effects, music, animation or render. Nothing in `episodes/episode-001/v2.3/`, the Short's files in `research/episode-001/`, `src/` or `renders/` was modified.
