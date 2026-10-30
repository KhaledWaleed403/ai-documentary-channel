# Script v1 — *The Hidden Machines That Keep a Submarine Crew Alive*

Luminexplain long-form · 16:9 · draft v1 · 2026-10-29

**Controlling references:** [claims.md](claims.md) (v2 + ATM-04) and [research-gaps.md](research-gaps.md). Every factual line carries claim IDs. Lines marked **[no ID]** are framing or transitions; they're listed in the QC section at the end.

**Pacing assumption:** about 145 spoken words per minute (calm explainer pace), plus visual-only beats. Scene timings are derived from measured word counts.

**Running device:** a "threat checklist" HUD in the top-left corner. Its six rows unlock as chapters arrive and turn cyan when solved: **Pressure · Air · Contaminants · Position · Stealth · Contact**. A seventh row, **Power**, appears in Scene 9 as the thing every row depends on.

**Global label rules:**
- The hero boat is a generic attack-sub silhouette labelled **"Nuclear-powered (illustrative)"**.
- Figures for a specific class carry the label "US Virginia-class" or "US ballistic-missile subs".
- Cutaways, depth rulers and diagrams carry **"Illustrative · not to scale"** wherever geometry could be read literally.

---

## Scene 1 — The hatch closes · 0:00–0:19 (~19 s)

**Narration**
> Close the hatch on a hundred and forty-five people, dive, and from that moment every breath they take changes the air they have left. So what keeps them alive down there — for weeks, even months — without coming up?

**Viewer sees:** Black frame. A circular hatch rim catches an amber edge-light; the wheel turns and seals with a hard, final motion. Cut to a side cutaway of the boat sliding under a dark surface line; a soft cyan pulse traces the hull outline.

**Motion:** Tight push-in on the hatch (`CameraFrame`). On "every breath", tiny amber exhale particles appear in the hull and begin to accumulate. On "weeks, even months", a day counter flickers without stopping on a number.

**On-screen text:** "145 crew — US Virginia-class" (small, lower-left, on "hundred and forty-five").

**Claims:** CREW-01 (145, Virginia-class), CO2-02 (breath changes the air), CREW-02 ("weeks, even months").

---

## Scene 2 — A sealed world · 0:19–0:49 (~30 s)

**Narration**
> This is a nuclear-powered submarine. Many navies use diesel-electric boats, which work very differently — so everything here describes a nuclear one. Once it's submerged, its air goes round in a closed loop. Nothing comes in from outside. US ballistic-missile submarines spend, on average, seventy-seven days at sea per patrol. For all that time, the boat has to protect, clean and supply everyone inside.

**Viewer sees:** The full cutaway in cool blue-grey, labelled "Nuclear-powered (illustrative)". An air-flow loop draws through the compartments as a closed cyan circuit; an "outside air" arrow tries to enter and stops at the hull, marked ✕. The threat checklist fades in, all six rows locked.

**Motion:** Slow pull-back from the hatch to the full boat. `SignalPath` draws the closed air loop. The checklist builds row by row (`StepDiagram`).

**On-screen text:** "Closed-loop air while submerged" · "Avg. 77 days at sea — US ballistic-missile subs (US Navy)".

**Claims:** PWR-01, CREW-03, END-01. ("protect, clean and supply" is a framing summary of the chapters that follow — **[no ID]**.)

---

## Scene 3 — The squeeze · 0:49–1:31 (~42 s)

**Narration**
> The first threat presses in from outside. Every ten metres of seawater adds roughly another atmosphere of pressure — another full weight of air pushing on every surface. The part of the submarine that holds that back is the pressure hull: a round steel tube, braced by rings of steel frames. Engineers design it so the shell can't buckle inward or crumple. How deep real submarines can go isn't published — so the depths here are a scale, not a specification.

**Viewer sees:** The camera descends beside a vertical depth ruler (`ScaleIndicator`) with a tick every 10 m and a "+1 atm" counter. Pressure arrows close in on the hull. Cut to a cross-section: an outer fairing (dimmed) and the inner circular pressure hull (highlighted), with ring frames lighting up in sequence along a cutaway length of tube.

**Motion:** Arrows scale with the counter. Cross-section rotates 20° to show the ring frames' spacing. Arrows act on the full circumference evenly in the drawing, but the narration makes no "evenly" claim.

**On-screen text:** "+1 atm ≈ every 10 m (33 ft) of seawater — NOAA" · "Pressure hull (inner circle)" · "Illustrative · not to scale · no real depth shown".

**Claims:** PRES-01, PRES-02 (safe wording), PRES-03 (no depth). "Another full weight of air" restates 1 atm in plain words — PRES-01.

**Checklist:** Pressure → solved.

---

## Scene 4 — Two air problems · 1:31–2:55 (~84 s)

**Narration**
> That steel keeps the ocean out — and seals the crew in with their own air. And that air fails in two separate ways. Oxygen gets used up. And carbon dioxide builds up — the biggest source on board is the crew's own breath. Making more oxygen doesn't take carbon dioxide away, so the submarine needs a different machine for each problem.
>
> Carbon dioxide is heavier than air, and it can collect in enclosed spaces. At high enough concentrations it causes breathlessness and headaches, and at extreme levels, unconsciousness. So it's removed continuously. Air is pushed through a scrubber containing an amine — a chemical that grabs carbon dioxide. Heat the amine, and it lets the gas go, so the carbon dioxide can be pumped out of the boat and the scrubber can be used again.
>
> It's never removed completely. In data reported in 2003, carbon dioxide on US nuclear submarines averaged around three and a half to four thousand parts per million — several times the level in outdoor air — with Navy exposure guidance setting ceilings on how high it may rise.

**Viewer sees:**
- **Part A (two gauges):** Two independent vertical gauges side by side, **O₂** (cyan, falling slowly) and **CO₂** (amber, rising). There is no race between them and no "winner"; each has its own track.
- **Part B (scrubber):** A two-phase loop diagram. Phase 1: cabin air passes through an amine bed; amber CO₂ particles stick to it. Phase 2: the bed glows with heat; CO₂ releases, is compressed and exits through the hull.
- **Part C (measured level):** The CO₂ gauge settles in a raised-but-steady band.

**Motion:** Gauges animate in parallel (`timing.ts` progress). The scrubber diagram uses `SignalPath` for the air flow and a heat-glow interpolation for the release phase. On "heavier than air", a brief inset shows CO₂ particles settling into a low enclosed corner of an unventilated box (inset labelled "Illustrative").

**On-screen text:**
- "Oxygen used up ≠ CO₂ building up — two problems, two machines"
- "Amine scrubber (classic design)"
- "Measured avg: 3,500–4,100 ppm · US nuclear subs · data reported 2003 (NRC 2007)"
- "Outdoor air ≈ 400 ppm (older reference value)"

**Claims:** O2-06, CO2-01 (safe wording — no "first" sequence), CO2-02, CO2-07, CO2-04, CO2-05, CO2-03, CO2-08.

**Note for the editor:** don't show limit numbers (5,000 / 8,000 ppm) unless they're labelled "2007-era guidance" (CO2-08).

**Checklist:** Air → half-solved (the CO₂ half lights up).

---

## Scene 5 — Splitting water for air · 2:55–3:37 (~42 s)

**Narration**
> That handles carbon dioxide. The oxygen comes from water. An electrolyser runs an electric current through water and splits it into its two ingredients: oxygen and hydrogen. The oxygen goes into the air. The hydrogen is explosive in enough quantity, so on US submarines it's sent out of the boat, into the sea. Oxygen is held close to the level in normal air: too little dulls thinking, too much makes fires more dangerous. And there's a traditional chemical backup — oxygen candles, which release oxygen as they burn.

**Viewer sees:** A close-up electrolyser block fed by a generic internal water line (no seawater intake, no "purified" label). Water molecules enter, and the current splits them: for every two water molecules, one O₂ and two H₂. O₂ bubbles drift into the cabin air loop; H₂ is routed through a pipe out of the hull. The O₂ gauge from Scene 4 rises into a narrow green band. A small canister icon labelled "Oxygen candle — backup" glows briefly. There is no open flame in the cabin.

**Motion:** Molecule-split animation; keep the 2:1 ratio accurate in the bubble counts. `Callout` labels on the oxygen and hydrogen paths.

**On-screen text:** "2 H₂O → O₂ + 2 H₂" · "Hydrogen → sea (US subs)" · "Oxygen kept near normal air".

**Claims:** O2-01, O2-02 (US-2007), O2-04 (feed unspecified — a visual rule only), O2-05 (qualified, RN-hist — wording only, no numbers), O2-03 (qualified, "traditional"). The equation is standard chemistry — **[no ID]**.

**Checklist:** Air → solved.

---

## Scene 6 — The invisible cleaners · 3:37–4:18 (~41 s)

**Narration**
> Oxygen and carbon dioxide are only the biggest of the air's problems. Cooking, batteries, machinery and the crew themselves all release other gases. A catalytic burner removes carbon monoxide and hydrogen, and activated-charcoal filters soak up odours and vapours. A central analyser samples the air around the clock, tracking oxygen, carbon dioxide, hydrogen, carbon monoxide and water vapour. The same system air-conditions the boat: in the living spaces of a US attack submarine, it's designed for about eighty degrees Fahrenheit — twenty-seven Celsius — and fifty percent humidity.

**Viewer sees:** The air loop gains two more units in sequence: a burner block (CO and H₂ particles enter and leave as neutral) and a charcoal filter (grey vapour particles captured). A compact HUD panel draws on with readout tiles for O₂, CO₂, H₂, CO and H₂O, plus a temperature/humidity tile.

**Motion:** Units slot into the loop with `ComponentCutaway` reveals. HUD tiles tick to life one by one. **Don't** show an alarm event: alarms aren't in the verified wording.

**On-screen text:** "Catalytic burner: CO + H₂" · "Activated charcoal" · "Central atmosphere monitoring" · "Design target ≈ 80°F (27°C) · 50% RH — US attack sub living spaces (NRC 2007)".

**Claims:** ATM-04, ATM-01, ATM-02, ATM-03. 80°F → 27°C is a unit conversion — **[no ID]**.

**Checklist:** Contaminants → solved.

---

## Scene 6b — OPTIONAL insert: Fresh water · +0:20 (~20 s)

*Include only with the historical framing intact (research-gaps condition 3). Default for v1: **cut**.*

**Narration**
> Fresh water is made on board too. A US Navy manual from 1955 describes how submarines with nuclear steam plants did it: boil seawater at low pressure using steam, condense the vapour into fresh water, and pump the salty leftovers back overboard.

**Viewer sees:** A low-pressure evaporator → condenser → tank, with a brine line going overboard. Sepia-tinted manual-page frame in the corner labelled "US Navy manual, 1955".

**On-screen text:** "Classic method — US Navy, 1955" · "Present-day methods not shown".

**Claims:** H2O-01, H2O-02 (US-1955). No capacity figure.

---

## Scene 7 — Lost without GPS · 4:18–5:20 (~62 s)

**Narration**
> Now the air is under control — but the crew can't see where they're going. There are no windows, and no GPS. GPS works by radio, and seawater soaks up radio; its signals can't reach a submerged submarine. So the boat keeps track of itself. Gyroscopes sense every turn, accelerometers sense every push and pull, and a computer adds all of it up to work out where the boat has moved.
>
> The catch is that tiny errors add up too. Left alone, the estimate slowly drifts away from reality. So every so often the submarine checks its position against something outside — for example, coming up near the surface for a GPS fix, or matching the shape of the seafloor below to a map. The exact methods vary between navies and boats.

**Viewer sees:** A top-down navigation view. GPS beams descend from above and dissolve at the water surface. The boat's path draws step by step from gyro and accelerometer glyphs. A widening translucent cone around the estimated position marks the growing uncertainty. At "GPS fix", the boat rises toward the surface, a beam connects, and the cone snaps small. Alternative fix: a seafloor contour slides under a reference map, aligns, and the cone snaps small again.

**Motion:** The path draws with `SignalPath`. Cone growth uses a schematic easing curve, deliberately non-numeric.

**On-screen text:** "Inertial navigation: measure motion, add it up" · "Uncertainty grows (schematic, not to scale)" · "Position fix (examples)".

**Claims:** NAV-01, NAV-03, NAV-04, NAV-05 (examples, qualified), NAV-06. "No windows" is self-evident framing — **[no ID]**.

**Checklist:** Position → solved.

---

## Scene 8 — Hiding in a sea of sound · 5:20–6:11 (~51 s)

**Narration**
> Knowing where you are only matters if no one else knows. A US Virginia-class submarine is three hundred and seventy-seven feet long — about the length of a football field — and it has to hide in water that carries sound remarkably well. Low-frequency sound loses very little energy to absorption, so low rumbles can be detected a long way off; higher-pitched sounds fade much sooner. Many submarines are wrapped in special coatings. Some soak up incoming sonar pings, so less sound echoes back. Others muffle the noise the boat itself makes. None of this makes a submarine silent. It makes it harder to hear — and harder to find.

**Viewer sees:**
- **Size beat:** The boat silhouette beside a football-field outline of similar length (approximate comparison; only the 377 ft figure is labelled).
- **Sound beat:** Long-wavelength amber rings travel far across the frame; short-wavelength rings fade quickly near the source.
- **Coating beat:** A hull-section close-up showing two layers. An incoming cyan ping hits an outer coating and returns weaker. Inside, a machinery vibration pulse is damped before it radiates out.

**Motion:** `SignalPath` ring families with different decay rates (illustrative). Split-screen for the two coating functions.

**On-screen text:** "377 ft — US Virginia-class (US Navy)" · "≈ a football field (approx.)" · "Anechoic coating: weaker echo" · "Decoupling coating: less radiated noise" · "Illustrative".

**Claims:** SIZE-01, SND-02, SND-03. "About the length of a football field" is an approved approximate analogy — **[no ID]**, no figure shown for the field.

**Checklist:** Stealth → solved.

---

## Scene 9 — A message through the sea · 6:11–7:11 (~60 s)

**Narration**
> Staying hidden creates the next problem: how do you reach a submarine you can't find? Seawater soaks up radio, and the higher the frequency, the faster it disappears. Very-low-frequency radio does get in — but, according to the US Navy, only tens of feet. To listen, a submarine has to get an antenna up near the surface, which limits how deep and how fast it can go, and makes it easier to spot.
>
> The US also ran an extremely-low-frequency system, at about seventy-six hertz. It could reach submarines hundreds of feet down, even while they were moving — but only one way, and slowly. It was shut down in 2004. To reply, a submarine has to come near the surface and use higher-capacity links, such as satellite.

**Viewer sees:**
- **VLF beat:** A vertical ocean cross-section. A shore antenna emits waves of decreasing frequency (labelled VLF, then ELF later). VLF waves fade inside a **shallow cyan band** at the top. The boat below sends an antenna up into that band; its depth gauge shows "shallower" (no numbers).
- **ELF beat:** A historical card. Very long amber waves reach deeper into the column while the boat moves; a short code arrives one character at a time, labelled "stylised".
- **Reply beat:** The boat rises near the surface; an upward link connects to a satellite icon.

**Motion:** Frequency-dependent fade (illustrative). Card transitions with `TextReveal`.

**On-screen text:** "VLF: tens of feet (US Navy, 2001)" · "ELF ≈ 76 Hz: hundreds of feet · one-way, slow · shut down 2004" · "Replies: near the surface (e.g. satellite)" · "Illustrative · not to scale".

**Claims:** COM-01, COM-02, COM-04, COM-06, COM-09, COM-05, COM-07.

**Checklist:** Contact → solved.

---

## Scene 10 — The hidden heart · 7:11–7:53 (~42 s)

**Narration**
> Every machine so far — the scrubbers, the electrolyser, the analysers, the navigation computers, the sonar — runs on electricity. On this submarine, that comes from a nuclear reactor. Water in a sealed loop carries heat from the reactor core to a separate system that makes steam; the two waters never mix. That steam spins turbines that make electricity and help drive the boat. The first nuclear submarine core lasted about sixty-two thousand miles. Today's submarine cores are rated for more than a million.

**Viewer sees:** The full cutaway again. A seventh checklist row, **Power**, appears beneath the others. The reactor compartment opens schematically: **two separate loops**, a primary loop (amber, closed) passing heat across a heat exchanger to a secondary loop (cyan) that turns to steam, then to a turbine block. A power bus lights from the turbine-generator and traces to every system seen so far (scrubber, electrolyser, analyser, nav computer, sonar), each glowing in turn.

**Motion:** `SignalPath` for both loops; the primary-loop particles never cross into the secondary. The power bus fans out with a stagger. No core internals.

**On-screen text:** "Primary loop (sealed)" · "Secondary loop → steam" · "Schematic" · "Core endurance: ~62,000 mi (first sub core) → 1,000,000+ mi today (NNSA)".

**Claims:** PWR-03, PWR-02, PWR-02b (generic, qualified), PWR-05. (PWR-01 was given in Scene 2.)

---

## Scene 11 — The clock they can't engineer away · 7:53–8:32 (~39 s)

**Narration**
> So if the air, the course, the silence and the power can all be managed, what brings a nuclear submarine home? Unlike surface warships, submarines are almost never resupplied at sea. Everything the crew will eat is loaded before they leave. Crews and machines need time ashore too: US ballistic-missile submarines average seventy-seven days at sea, then thirty-five in port for maintenance, with two full crews taking turns. Food, maintenance, the people aboard and the mission itself — those set the clock.

**Viewer sees:** All six original checklist rows plus Power are cyan. Three new gauges appear beneath them: **Food stores** (draining), **Maintenance** (a calendar ring filling), **Crew** (two alternating crew blocks, labelled Blue / Gold). Brief inset: crates loaded at a pier before departure.

**Motion:** Gauges animate together. The calendar ring completes at "77" and rolls into "35".

**On-screen text:** "Almost never resupplied at sea (NRC, 1996)" · "US ballistic-missile subs: avg 77 days at sea / 35 in port · two crews (US Navy)".

**Claims:** FOOD-01, END-01, END-03.

---

## Scene 12 — The chain · 8:32–8:57 (~25 s)

**Narration**
> Outside, the ocean never changes. Inside, every breath, every course and every message depends on a chain of hidden machines — each solving a problem the last one left behind, and all of them running on one source of heat.

**Viewer sees:** Pull back from the glowing cutaway as each system blinks in sequence along the chain (hull → scrubber → electrolyser → cleaners → navigation → coatings → antenna → reactor). Final shot: the hatch from Scene 1, seen from inside, sealed.

**Motion:** Reverse of Scene 1's push-in. Fade to black on the reactor glow.

**On-screen text:** Title card: *The Hidden Machines That Keep a Submarine Crew Alive*.

**Claims:** Summary of PWR-03 (one power source) — no new facts. "Each solving a problem the last one left behind" is narrative framing — **[no ID]**.

---

## Runtime

| Version | Narration words (measured) | Spoken time at 145 wpm | Estimated runtime incl. visual beats |
|---|---|---|---|
| Core (Scenes 1–12) | 1,119 | ≈7:43 | **≈8:57** |
| With optional Scene 6b | 1,161 | ≈8:00 | ≈9:17 |

Visual-only beats total about 75 s (title, transitions, diagram holds). The runtime lands inside the 8–10 minute target without padding. If the animatic runs short, lengthen the diagram holds in Scenes 4, 7 and 10 rather than adding narration.

---

## Fact-check QC (v1)

### Line-to-claim audit

Every factual narration sentence maps to at least one claim ID marked VERIFIED, or QUALIFIED with its *Safe wording* used.

| Scene | Lines checked | Result |
|---|---|---|
| 1 | 145 crew; breath changes the air; weeks/months | ✔ CREW-01, CO2-02, CREW-02 |
| 2 | Nuclear vs diesel-electric; closed-loop air; 77 days | ✔ PWR-01, CREW-03, END-01 |
| 3 | +1 atm per 10 m; ring-framed tube; depth not published | ✔ PRES-01, PRES-02 (qualified wording), PRES-03 |
| 4 | Two separate problems; breath as CO₂ source; heavier than air; effects; amine cycle; 3,500–4,100 ppm (2003); guidance ceilings | ✔ O2-06, CO2-01 safe, CO2-02, -07, -04, -05, -03, -08 |
| 5 | Electrolysis; hydrogen to sea (US); O₂ near normal; candles | ✔ O2-01, O2-02, O2-05 (qualified), O2-03 (qualified) |
| 6 | Contaminant sources; burner; charcoal; CAMS gases; 80°F / 50% RH | ✔ ATM-04, ATM-01, ATM-02, ATM-03 |
| 6b | 1955 manual; low-pressure steam distillation; brine overboard | ✔ H2O-01/02 (historical framing) — optional |
| 7 | GPS can't reach; INS; drift; fix examples; methods vary | ✔ NAV-01, -03, -04, -05, -06 |
| 8 | 377 ft; low-frequency sound travels far; coatings | ✔ SIZE-01, SND-02, SND-03 |
| 9 | Attenuation rises with frequency; VLF tens of feet; antenna near surface; ELF 76 Hz, hundreds of feet, one-way, slow; 2004; satellite replies | ✔ COM-01, -02, -04, -09, -05, -06 (qualified), -07 |
| 10 | Everything runs on electricity; two loops; turbines; 62,000 → 1M+ miles | ✔ PWR-03 (qualified), PWR-02, PWR-02b (qualified), PWR-05 |
| 11 | Almost never resupplied; 77 / 35 days; two crews; limits | ✔ FOOD-01, END-01, END-03 |

### Lines without a claim ID (flagged)

| Scene | Line | Why it's acceptable or what to do |
|---|---|---|
| 2 | "the boat has to protect, clean and supply everyone inside" | Framing summary of later chapters; no new fact. |
| 5 | "2 H₂O → O₂ + 2 H₂" | Standard chemistry. Could be added to claims.md as a reference fact. |
| 6 | "twenty-seven Celsius" | Unit conversion of ATM-03's 80°F. |
| 7 | "There are no windows" | Self-evident framing. Low risk. |
| 8 | "about the length of a football field" | Approved approximate analogy (2026-10-29); no field length is stated or displayed. |
| 12 | "each solving a problem the last one left behind" | Narrative device; the chapter sequence is editorial, not a technical dependency chain. |

### Dates and units kept explicit

- CO₂ averages: "data reported in 2003", in ppm.
- Climate design target: °F with °C conversion, and % relative humidity.
- VLF and ELF: "US Navy", with 2001 on screen; "shut down in 2004".
- Fresh water: "1955" (optional scene only).
- Patrol figures: "on average" and "US ballistic-missile submarines".

### Rejected claims confirmed absent

- No "CO₂ kills first" (CO2-01).
- No car or crush analogy, and no depth (PRES-03).
- No "GPS stops a few cm down" (NAV-02).
- No "100 m" messaging (COM-03).
- No three-way water pipe (H2O-03).
- No "only food" (END-02).
- No 4× sound speed (SND-01).
- No mounts or noise discipline (SND-04/05).
- No Royal Navy record (END-04).
- No life-of-ship claim (PWR-04).
- No weapons, tactics or operating depths.

### Remaining factual blockers

**None for the core script.** These are soft risks:
1. ~~Football-field comparison~~ — resolved: approximate wording approved.
2. Scene 6b is optional and historical. Default is cut.
3. PRES-02 and PWR-02b rest on qualified sources. The narration uses their safe wording only; don't add detail in revisions.
