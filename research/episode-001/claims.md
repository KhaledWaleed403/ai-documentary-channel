# Episode 001 — Claims

Status: `verified` (≥1 primary/university source read directly and checked against the wording) · `simplified` (true, but narration/visual deliberately simplifies) · `derived` (calculated from verified facts) · `unverified` (no source read directly) · `disputed` (sources disagree) · `cut` (not used).

Last audit: 2026-10-25 (script v3). Each source was rechecked against what it actually says, not against its label here.

## Claims used in the script

| ID | Claim | Narration it supports | Sources | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| C01 | The air inside a microwave oven stays at about room temperature; the oven doesn't heat food by heating the air. | SH01 "doesn't heat the air" | S02 | verified | S02: "the air in the oven is at room temperature". Hot food and steam can warm the air a little; the narration doesn't say the air stays cold. |
| C02 | A magnetron inside the oven turns electrical power into microwaves. | SH02 "this part turns electricity into microwaves" | S01, S02, S04 | verified | S02: magnetron "converts ordinary electric power from a wall socket into very short radio waves". The name appears on screen only. |
| C03 | Microwaves are a kind of radio wave (very short ones). | SH02 "a kind of radio wave" | S02 | verified | S02: "very short radio waves". |
| C04 | Microwaves reflect off the oven's metal interior. | SH03 "bounce around the metal box" | S01 | verified | S01: "reflect off the metal interior of the oven". |
| C05 | The waves push water molecules back and forth billions of times per second. | SH04 "back and forth, billions of times a second" | S02, S03 | derived | ~2,450 MHz = ~2.45 billion cycles per second (S02, S03). Each cycle is one back-and-forth. Avoid a precise count on screen. |
| C06 | A water molecule has a slightly positive end and a slightly negative end, so the waves' electric field exerts a turning force on it. | SH04 "positive and negative ends … tug them" | S10, S03 | verified | S10 (USGS): "positive on the side of the hydrogen, negative by the oxygen". S03: torques on water's dipole moments. *Fixed in v3:* S05 was cited before, but it doesn't describe the charge layout. |
| C07 | The waves' field does work on polar molecules, transferring energy to the food. Collisions with neighbouring molecules scramble that driven motion, and scrambled molecular motion is heat (dielectric heating). | SH05 "tugging and bumping turns the waves' energy into heat" | S01, S03, S05 | verified / simplified | S03: mechanism is "dielectric heating"; driven motion "quickly randomized by collisions". S05: collisions turn ordered motion into heat. S01: energy "is changed to heat as it is absorbed by food". "Tug" + "bump" is a simplified picture: S03 says the main effect isn't neat flipping of whole molecules. On screen, molecules twist only part-way and out of sync, never in neat full spins. |
| C08 | Microwave heating is not resonance; 2.45 GHz isn't a special frequency of water. | (avoided myth) | S03, S05 | verified | Never say "resonate". |
| C09 | In thicker food, microwaves reach only part of the way in; the centre heats as heat spreads (conducts) from the outer parts. Microwaves don't cook from the inside out. | SH03 "into your food"; SH05 "reach partway in — heat spreads the rest of the way" | S02, S01, S06 | verified | S02: penetrate "1 to 1½ inches … In thicker pieces of food, the microwaves don't reach the center. That area would cook by conduction". S01: not "inside out". S06 gives the same depth. Thin food can be reached all the way through, and the shot shows a thick bowl. Depth figure disputed (D02), so no number is given. |
| C10 | Waves bouncing inside the oven make some spots stronger than others, so food gets hot and cold spots. | SH06 "Some spots get stronger waves" | S07, S02, S06 | verified | S07: standing waves in the cavity "lead to uneven energy distribution", causing "cold and hot spots". S02/S06 confirm uneven cooking and cold spots. Only one directly read source (S07) names the cause. |
| C11 | Turntables are fitted because microwave cooking can be uneven. Keeping food moving improves evenness but doesn't remove cold spots, so stirring is still recommended. | SH06 "so the turntable keeps food moving. Still — give it a stir." | S06, S07, S02 | verified / simplified | S06: "Cooking can be uneven so many microwaves are available with a turntable." S07: "introducing motion during microwave heating can improve heating performance". S02: "Even if the microwave oven has a turntable, it's still helpful to stir". The visual of food passing through stronger and weaker areas is a simplification (D06). |
| C12 | Microwave energy becomes heat when absorbed and doesn't make food radioactive. | SH07 "nothing radioactive left behind" | S01 | verified | S01: energy "is changed to heat as it is absorbed by food, and does not make food 'radioactive'". |

## Supporting facts (not narrated)

| ID | Claim | Sources | Status | Notes |
| --- | --- | --- | --- | --- |
| C13 | Home ovens operate at about 2,450 MHz (2.45 GHz). | S02, S03 | verified | S05: real output is broadband, ~2.40–2.50 GHz. |
| C14 | Wavelength in air is ~12 cm. | S02 (approx.), calculation | derived | c / 2.45 GHz ≈ 12.2 cm. S02 says "around 4 inches" (~10 cm), which is rough. |
| C15 | Magnetron: hot cathode emits electrons, magnetic field curves their path, electrons excite resonant cavities, output is channelled into the oven. | S04, S08, S09 | verified | Shown only as a simple labelled box, with no internals drawn. |
| C16 | Water, fats and sugars (and other molecule types) absorb microwave energy, not only water. | S02, S05, S06 | verified | Narration uses water as the example. |
| C17 | Ideal hot-spot spacing is ~half a wavelength (~6 cm). | calculation only | derived / unverified | Real patterns are 3-D and irregular and depend on the food (S07). Don't show exact spacing. |

## Disputed / flagged

| ID | Issue | Detail | Handling |
| --- | --- | --- | --- |
| D01 | FSIS says molecules "vibrate 2.5 million times per second" (S02, standing-time section). | Contradicts S02's own 2450 MHz figure (~2.45 *billion*/s). Likely a typo. | Use "billions"; don't cite that sentence. |
| D02 | Penetration depth. | S02/S06: 1–1½ in (2.5–3.8 cm) in food. S03 (via Chaplin): ~1.4 cm in 25 °C water. Depends on food, temperature and definition. | Narration says "partway in"; no number on screen. |
| D03 | Mechanism wording. | S09/S02 say water "spins"/"vibrates"; S03 says the main effect isn't simple flipping of whole molecules; S05 describes rotation + collisions. | "Tug" and "bump" in narration; molecules twist only part-way and out of sync on screen. |
| D04 | FSIS says standing time happens because molecules "continue to generate heat as they come to a standstill" (S02). | Physically doubtful; S02 itself explains centre heating by conduction. | Not used. |
| D05 | Where water's absorption peak lies. | Search summaries gave ~20 GHz, tens of GHz, or >1 THz. Not resolved. | Not needed; just avoid "resonance" (C08). |
| D06 | How exactly a turntable helps. | Verified sources say turntables exist because heating is uneven and that motion improves evenness (S06, S07). The specific picture of food passing through fixed strong and weak areas comes only from search summaries of patents (not read directly). S07 also notes the food itself changes the wave pattern, so the areas aren't truly fixed. | Narration only says the turntable "keeps food moving". The visual shows the areas *mostly* staying put, as a simplification. |

## Myths avoided
- "Microwaves resonate with water molecules" → C08.
- "Microwaves cook from the inside out" → C09. Also avoided: "only the surface heats". Waves fade *into* the food (SH03, SH05).
- "The turntable makes heating perfectly even" → C11 ("Still — give it a stir").
- "Microwaved food becomes radioactive" → C12.
- Molecules moving in perfect sync, or heat shown as particles hopping between molecules → C07. Molecules twist part-way and out of sync; heat shown only as colour and a thermometer.
