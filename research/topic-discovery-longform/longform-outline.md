# Preliminary Long-Form Outline — *The Hidden Machines That Keep a Submarine Crew Alive*

Target length about 9:30 (16:9). This is a structure only, not a script.

**Revised 2026-10-29 after the claim-verification pass.** Claim IDs in brackets refer to [claims.md](claims.md); use only the *Safe wording* recorded there. A change log is at the end of this file.

**Spine:** the hatch closes on a **nuclear-powered** submarine, and from that moment it is a sealed box. A "threat checklist" HUD (`StepDiagram`) ticks through the problems the crew must solve continuously. Each chapter defeats one problem and opens the next. The ending reveals that every solution runs on electricity made from one reactor's heat. Weapons, tactics and named-class specifics stay out.

**Viewer's starting misconception:** "Submarines just carry tanks of air." The real answer is that a nuclear sub *manufactures and cleans* its own air, and solves navigation and communication with no outside help.

**Framing rule:** say early (cold open or chapter 8) that this is a nuclear submarine and that many navies use diesel-electric boats that work differently [PWR-01].

| Time | Chapter | Question answered | Key discoveries (claim IDs) | Visual reveal | Reason to keep watching |
|---|---|---|---|---|---|
| 0:00–0:40 | **Cold open: the hatch closes** | What has to keep working for well over 100 people to live sealed inside steel for weeks or months? | A US Virginia-class boat carries 145 [CREW-01]. Once submerged, its air goes round a closed loop [CREW-03]. US ballistic-missile subs average about 77 days at sea per patrol [CREW-02, END-01]. | Hatch seals; camera falls away into black water; the cutaway sub (labelled "nuclear-powered") glows into view; the checklist appears with items locked. | "Air is the first problem, and it's actually two problems." |
| 0:40–1:40 | **1. The squeeze** | How does a hollow tube survive the ocean's pressure? | Pressure grows by about 1 atm every 10 m of seawater [PRES-01]. The pressure hull is a round steel tube braced by ring frames, designed so the shell can't buckle inward [PRES-02]. No operating depth is given (not published) [PRES-03]. | `ScaleIndicator` ruler with +1 atm ticks and no depth label on the sub; inward arrows all round a circular cross-section; frames light up. Optional "same steel, different shape" panel labelled *simplified* [PRES-04]. | Threat 1 is ticked off, but the crew is now breathing the same air over and over. |
| 1:40–2:50 | **2. Two air problems, not one** | Isn't air just about oxygen? | A sealed crew faces two separate problems: oxygen being used up, and CO₂ building up [CO2-01 safe wording, O2-06]. The crew's breath is the main CO₂ source [CO2-02]. Even under control, measured CO₂ on US subs averages several times outdoor levels [CO2-03]. Higher levels bring headaches, breathlessness and worse [CO2-04]. Amine scrubbers grab CO₂, release it when heated, and the CO₂ is pumped out [CO2-05]. | Two separate gauges, O₂ falling and CO₂ rising, with **no race between them**. Exhaled breath glows amber; air flows through the scrubber bed; a heat phase releases CO₂, which is compressed out of the boat. | "That cleans the air. But the oxygen still has to come from somewhere." |
| 2:50–3:50 | **3. Splitting water for air** | Where does new oxygen come from with no tanks? | Electrolysers split water into oxygen and hydrogen [O2-01]; don't specify seawater or purified water, because the sources conflict [O2-04]. On US subs, the hydrogen is discharged to the sea [O2-02]. Oxygen is held close to normal air, since too much raises fire risk [O2-05]. Chemical oxygen candles are a traditional backup [O2-03]. | A water molecule splits with the correct 2:1 ratio (two H₂ for every O₂); O₂ bubbles into the cabin while the H₂ is routed out through the hull; the O₂ gauge settles in a narrow green band. Feed comes from a generic internal water line. | "Oxygen and CO₂ are handled. But hundreds of other gases are building up too." |
| 3:50–4:40 | **4. The air's invisible cleaners** *(replaces the fresh-water chapter; water is on hold, see below)* | What else has to come out of the air? | A catalytic burner removes carbon monoxide and hydrogen; activated-charcoal filters soak up odours and vapours [ATM-01]. A central analyser samples the air constantly and alarms on drift [ATM-02]. The same system air-conditions the boat, designed for about 80°F and 50% humidity in the living spaces of a US attack sub [ATM-03]. *Optional 30–40 s insert:* fresh water distilled from seawater, framed as the method US Navy manuals describe for the first nuclear subs; no current capacity [H2O-01/02]. | The air loop gains two more units; a HUD with O₂, CO₂ and H₂O readouts (plus a temperature/humidity tile) draws on, and one value flashes and is corrected. Optional insert: a low-pressure evaporator → condenser → tank, with brine overboard, labelled "classic method". | "The air is solved. Now the crew is blind." |
| 4:40–6:00 | **5. Lost without GPS** | How do you know where you are with no satellites and no windows? | GPS is radio, and radio can't get through seawater [NAV-01]. An inertial system senses every turn and push and adds them up [NAV-03]. Small errors grow, so the sub has to check against something outside now and then [NAV-04], for example a GPS fix near the surface or matching the seafloor to a map [NAV-05]. Methods vary by navy and boat [NAV-06]. | GPS beams stop at the surface; gyro and accelerometer glyphs; a ghost track draws the path; a **schematic** error cone widens (no real drift rates); a fix snaps it back. | "Knowing where you are is useless if the whole ocean can hear you." |
| 6:00–7:00 | **6. Hiding in a sea of sound** | How does something longer than a football field stay hidden underwater? | The Virginia class is 377 ft long [SIZE-01]. Low-frequency sound can travel enormous distances underwater [SND-02]. Many subs wear rubbery hull tiles that soak up sonar pings and muffle their own noise [SND-03]. (Machinery mounts and crew noise discipline stay out until sourced [SND-04, SND-05].) | `SignalPath` rings: long low-frequency rings travel far, short ones fade fast; incoming pings are absorbed by hull tiles while outgoing noise is damped. The boat is quieter, **not** silent. | "If it's that well hidden, how does anyone send it orders?" |
| 7:00–8:00 | **7. A message through the sea** | How do you reach a hidden submarine? | Seawater soaks up radio, and the higher the frequency the faster [COM-01]. Very-low-frequency signals reach only tens of feet down, so the sub must get an antenna up near the surface to listen. That limits its depth and speed and makes it easier to spot [COM-02, COM-04]. The US ran an extremely-low-frequency system (about 76 Hz) that reached subs hundreds of feet down while moving, but it was one-way, slow, and shut down in 2004 [COM-05, COM-06, COM-09]. To reply, a sub comes near the surface and uses higher-data-rate systems such as satellite [COM-07]. | A giant shore antenna; VLF waves fade within a **shallow** band ("tens of feet", US Navy 2001); an antenna rises from the boat into that band; a short code arrives character by character (labelled stylised). Historical card: ELF waves reach deeper, "1989–2004". No exact depth numbers. | "Every machine we've seen needs electricity. So where does it all come from?" |
| 8:00–8:55 | **8. The hidden heart** | What powers it all? | In US naval reactors, water in a closed loop carries heat from the core to a separate steam system, and the two waters never mix [PWR-02]. The steam spins turbines that make electricity and help drive the boat (keep generic; propulsion differs by class) [PWR-02b]. That electricity runs the scrubbers, electrolysers, navigation and sonar [PWR-03]. The first nuclear sub's core lasted about 62,000 miles; today's cores are rated for over a million [PWR-05]. Many navies use diesel-electric boats instead [PWR-01]. | The reveal: **two separate loops** meet at the steam generator; steam spins a turbine; the turbo-generator lights a power bus that traces to every system lit so far. Schematic only, with no core internals. | "If air and power aren't the limit, what is?" |
| 8:55–9:30 | **Ending: the clock nobody can engineer away** | So what does limit how long they stay down? | Unlike surface warships, submarines are almost never resupplied at sea; every meal is loaded before departure [FOOD-01]. So for a nuclear sub, the limits aren't air or fuel. They're food stores, maintenance, the crew themselves, and whatever the mission needs [END-03]. US ballistic-missile subs average 77 days at sea, then 35 in port, and alternate two full crews [END-01]. | The checklist turns green for air, navigation, hiding, messages and power. The remaining gauges are "food stores" and "crew", plus a maintenance calendar. The sub rises at the end of the patrol. | The payoff: the most advanced machines on board solve everything except the ordinary human needs. Callback to the cold-open hatch. |

## Why viewers keep watching

- An open checklist that is still unsolved.
- Each solution leads to the next problem.
- An early surprise: air is *two* problems, needing two different machines.
- A late unifying reveal: everything runs on electricity from one reactor's heat.

## Notes

- No weapons, torpedoes or tactics anywhere.
- Use a generic attack-sub silhouette labelled "nuclear-powered". Use the 145 / 377 ft figures only with a "US Virginia-class" label; otherwise say "well over 100" / "longer than a football field".
- No operating depths, drift rates, exact VLF/ELF depth figures or patrol maximums on screen. Qualitative "tens of feet" / "hundreds of feet" attributed to the US Navy is OK. Every on-screen number must come from a **[read]** source in claims.md.

## Change log (2026-10-29 fact-check)

| Change | Affected section | Claim(s) |
|---|---|---|
| Removed "CO₂ becomes dangerous long before oxygen runs out"; reframed as two separate air problems with two machines | Ch. 2 (renamed) | CO2-01 rejected |
| Removed "pressure that would flatten a car" | Ch. 1 | PRES-03 rejected |
| Fresh-water chapter **on hold**; replaced by trace-contaminant removal and monitoring (fully sourced). Dropped the "same water feeds crew, oxygen and reactor" payoff | Ch. 4 | H2O-01/02 unverified; H2O-03 rejected |
| Replaced "sound travels 4× faster in water" with "low-frequency sound travels very far" | Ch. 6 | SND-01 irrelevant; SND-02 verified |
| Dropped isolation mounts and noise discipline until sourced | Ch. 6 | SND-04, SND-05 unverified |
| VLF changed from "tens of metres" to "a short way in"; added the surface-reply limit; ELF framed as historical (to 2004) | Ch. 7 | COM-02, COM-06, COM-07 qualified |
| Reactor shown as two separate loops; added the diesel-electric caveat; life-of-ship core limited to newest US attack subs | Ch. 8 | PWR-01, PWR-02, PWR-04 |
| Ending changed from "food is the only limit" to food, maintenance, crew and mission | Ending | END-02 rejected; END-03 qualified |
| Crew and patrol figures attributed to specific US classes | Cold open | CREW-01, CREW-02, END-01 |
| Hydrogen disposal softened to "removed safely (classic designs: overboard)"; electrolyser feed shown as purified water | Ch. 3 | O2-02, O2-04 qualified |

**v2 changes (gap-resolution pass):**

| Change | Affected section | Claim(s) |
|---|---|---|
| Electrolyser feed no longer specified (sources conflict); hydrogen "discharged to the sea" now sourced for US subs | Ch. 3 | O2-02 verified (US-2007), O2-04 conflict |
| Added the air-conditioning design target (80°F / 50% RH); fresh water reinstated as an **optional**, historically framed insert | Ch. 4 | ATM-03 verified; H2O-01/02 qualified (US-1955 primary) |
| VLF now "tens of feet" (US Navy 2001); ELF "hundreds of feet" and historical; reply via satellite near the surface; "antenna near the surface" replaces "trailing wire or buoy" | Ch. 7 | COM-02, -04, -07, -09 verified |
| Two-loop wording from the NNPP primary report; turbines kept generic; life-of-ship claim replaced by the NNSA core-endurance figure | Ch. 8 | PWR-02 verified; PWR-02b qualified; PWR-05 new |
| Added "almost never resupplied at sea" | Ending | FOOD-01 new |

Don't reinstate the reactor-water link (H2O-03).

---

## Appendix: runner-up finalist outline (anaesthesia), for the record

Not fact-checked in this pass.

1. **Cold open (0:00–0:40):** "Millions of people are switched off every year, and science still argues about exactly how." **[verify statistic]**
2. **Asleep is the wrong word (0:40–1:50):** anaesthesia is not sleep; it combines unconsciousness, amnesia, immobility and blocked pain.
3. **The key that fits many locks (1:50–3:10):** the drugs act on receptors such as GABA-A, increasing inhibitory signalling.
4. **The brain doesn't turn off (3:10–4:30):** the brain stays active but its regions stop talking to each other (connectivity breaks down).
5. **The team watching you (4:30–5:40):** MAC values and BIS monitoring.
6. **Awareness: the rare failure (5:40–6:40):** requires careful, non-alarming sourcing.
7. **What anaesthesia teaches about consciousness (6:40–8:00):** the big open question.

**Why it lost:** the hook is already owned by TED-Ed and This.; the visuals are abstract; the medical caveats would take a lot of runtime.
