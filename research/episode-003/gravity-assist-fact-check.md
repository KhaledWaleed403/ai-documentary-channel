# Episode 003 — Gravity-Assist Fact-Check

Stage 2 fact-check of every scientific and mission claim in [topic-research-report.md](topic-research-report.md). All sources were accessed on **2026-10-31**. Quotations are short excerpts. Where a page could only be read through a summarising fetch, the quote marks the exact phrase the page returned.

**Status key**
- **Verified**: stated by a primary source (NASA, JPL, ESA, NASA data, peer-reviewed paper) and checked against it.
- **Partially verified**: the core is primary-sourced, but a number, a nuance or a wording isn't; or the value is our own derivation from primary data. The note says which.
- **Unverified**: no primary source found. Don't use it in narration.

"Safe wording" below is a constraint on the script, not final narration.

Primary sources used (short names):
- **NASA-BSF**: NASA Science, *Basics of Space Flight* Ch. 4-1 — https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/
- **NASA-Primer**: NASA Science, *A Gravity Assist Primer* (updated 2024-11-04) — https://science.nasa.gov/learn/basics-of-space-flight/primer/
- **NASA-PFS**: NASA Planetary Fact Sheet — https://nssdc.gsfc.nasa.gov/planetary/factsheet/
- **NASA-V1** / **NASA-V2**: NASA Science Voyager 1 and Voyager 2 mission pages — https://science.nasa.gov/mission/voyager/voyager-1/ · https://science.nasa.gov/mission/voyager/voyager-2/
- **NASA-Hist**: NASA, "45 Years Ago, Voyager 1 Begins Its Epic Journey…" — https://www.nasa.gov/technology/45-years-ago-voyager-1-begins-its-epic-journey-to-the-outer-planets-and-beyond
- **NASA-LD**: NASA Science, "Voyager 1: What Is a Light-Day" (updated 2026-10-15) — https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/
- **NASA-SVS**: NASA Goddard SVS 13017, "It's Surprisingly Hard to Go to the Sun" (2018, updated 2023) — https://svs.gsfc.nasa.gov/13017
- **NASA-PSP**: NASA Science, "NASA's Parker Solar Probe Makes History With Closest Pass to Sun" (2024-12-27) — https://science.nasa.gov/science-research/heliophysics/nasas-parker-solar-probe-makes-history-with-closest-pass-to-sun/
- **ESA-FS**: ESA, BepiColombo factsheet — https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/BepiColombo_factsheet
- **ESA-Upd**: ESA, "Latest updates: BepiColombo's arrival at Mercury" (latest entry 2026-10-06) — https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Latest_updates_BepiColombo_s_arrival_at_Mercury
- **ESA-MF3**: ESA, "BepiColombo braces for third Mercury flyby" (2023-06-14) — https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/BepiColombo_braces_for_third_Mercury_flyby
- **ESA-Jour**: ESA, "Journey to Mercury" — https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Journey_to_Mercury
- **Van Allen 2003**: J. A. Van Allen, "Gravitational assist in celestial mechanics — a tutorial", *Am. J. Phys.* 71, 448 (2003), doi:10.1119/1.1539102 — https://www.uv.es/jfgf/AJP00448.pdf. The PDF is a scanned image, so its text couldn't be extracted in this pass. It's the citation for the physics, but no quote from it is used.

---

## 1. How a gravity assist changes velocity

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| G01 | Relative to the planet, the spacecraft leaves at the same speed it arrived; only its direction changes. | In the planet's frame the flyby is a hyperbolic orbit. Energy relative to the planet is conserved, so the speed far from the planet is the same on the way in and out. Gravity rotates the velocity. | NASA-Primer | flyby changes direction "but not its speed" relative to Jupiter (cyclist downhill and uphill analogy) | **Verified** | "Measured from the planet, it leaves exactly as fast as it arrived. Only its direction has changed." |
| G02 | Relative to the Sun, the spacecraft can leave faster than it arrived. | Sun-frame velocity = planet's orbital velocity + the craft's velocity relative to the planet. Rotating the relative velocity changes the vector sum, so the Sun-frame speed changes. | NASA-BSF | the craft keeps a gain "relative to the Sun" after the flyby | **Verified** | "Measured from the Sun, the same flyby can leave it moving faster, because the planet itself is moving." |
| G03 | The speed gain comes from adding the planet's motion. It is not from "falling" toward the planet. | The speed gained falling in is lost climbing out (G01). The net Sun-frame gain comes only from the change in direction of the relative velocity, combined with the planet's orbital velocity. | NASA-Primer; NASA-BSF | the craft slows on the way out "eventually reaching the same speed it had on its way in" (Primer); the gain is the planet's motion (BSF) | **Verified** | Never "it speeds up because it falls toward the planet." Say: "Falling in speeds it up, and climbing out slows it back down. The gain comes from the planet's motion." |
| G04 | The direction of the bend decides the result: passing behind the planet (relative to its motion) adds speed in the Sun frame; passing ahead of it removes speed. | The turn rotates the relative velocity toward the planet's direction of motion (trailing side) or against it (leading side). | NASA-BSF (Voyager timed to pass behind Jupiter; Galileo passed in front of Io and lost energy) | approaching "from behind the planet" (gain); Galileo in front of Io "decreased its energy" (loss) | **Verified** (shown by the two NASA examples) | "Pass behind a moving planet and you can leave faster. Pass in front and you leave slower." Attach a frame label to every speed readout. |
| G05 | A crew on board would feel no acceleration during a gravity assist. | The craft is in free fall throughout; every part is accelerated equally. | NASA-BSF | "no acceleration at all," only a continuous sense of falling | **Verified** | "If anyone were aboard, they'd feel nothing, just weightless falling the whole way." |
| G06 | Speed and velocity are different. A flyby always changes velocity (direction), even when it leaves speed unchanged. | Velocity is a vector. In the planet frame the magnitude is unchanged but the direction rotates. | Standard mechanics; NASA-Primer (direction changes, speed doesn't) | as G01 | **Verified** | Introduce the two words once: "speed is how fast; velocity is how fast *and* which way." |

## 2. Reference frames

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| F01 | The same flyby looks like a symmetric hairpin around the planet in the planet frame, and like a bent path with a speed change in the Sun frame. | The Sun-frame path = planet's path + the craft's path relative to the planet. | NASA-Primer (the platform observer vs the engineer in the train analogy) | the Sun "on the platform" sees a different speed from the engineer on the train | **Verified** (concept); the geometry is ours to compute | Label every number: "relative to Jupiter…", "relative to the Sun…". |
| F02 | Train-and-ball analogy: ball thrown at 30 mph at a 50 mph train rebounds at nearly 130 mph relative to the ground. | Elastic rebound in the train frame (80 in, 80 out), then add the train's 50. | NASA-Primer | ball rebounds "at nearly 80 MPH"; total "approaches 130 mph"; the analogy is mechanical, not gravitational | **Verified** (numbers and caveat) | Use only with the caveat on screen or in narration: "No bounce happens in space; gravity does the turning." Prefer a gravitational version (see the narrative recommendations). |

## 3. Energy and momentum: who pays

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| E01 | The extra Sun-frame energy comes from the planet's orbital motion. The planet gives up a tiny amount. No energy is created. | Craft and planet together conserve energy and momentum. What the craft gains, the planet loses. | NASA-BSF; NASA-Primer | momentum "transferred from the orbiting planet" (BSF); the craft decreases Jupiter's orbital momentum "by a tiny amount" (Primer) | **Verified** | "The speed isn't free. It's borrowed from the planet's own motion around the Sun." Never "free energy" or "energy from nothing." |
| E02 | The planet's change is too small to measure. | Momentum balance: Δv_planet ≈ (m_craft / M_planet) × Δv_craft. | NASA-BSF | Jupiter's loss is "too small to be measured" (gnat and freight-train comparison) | **Verified** (qualitative) | "Jupiter slows down, by an amount far too small to ever measure." |
| E03 | Order of magnitude: Voyager vs Jupiter, about 10⁻²¹ m/s. | ~815 kg (Voyager at launch, NASA FAQ/PDS) ÷ 1.898×10²⁷ kg (Jupiter, NASA-PFS) ≈ 4×10⁻²⁵; × a velocity change of order 10 km/s ≈ 4×10⁻²¹ m/s. | NASA-PFS (Jupiter 1,898×10²⁴ kg); NASA Voyager FAQ https://science.nasa.gov/mission/voyager/frequently-asked-questions/ (815 kg at launch) | — | **Partially verified**: masses are primary; the arithmetic and the "~10 km/s" input are our estimate (see M04) | Use only as a mass ratio ("Jupiter outweighs Voyager by about two million billion billion times", i.e. 2×10²⁴). Don't narrate a precise slowdown figure. |
| E04 | An individual flyby doesn't meaningfully change a planet's orbit. | Follows from E02 and E03. | NASA-BSF | as E02 | **Verified** | "Jupiter's orbit doesn't noticeably change." Never imply a planet is "pushed off course." |
| E05 | NASA explains the exchange as angular momentum. | NASA-BSF frames it as orbital angular momentum transfer. For the narration, "orbital energy and momentum" is equivalent and simpler. | NASA-BSF | "angular momentum is transferred" | **Verified** | Avoid "angular momentum" in narration unless it's defined. "Orbital motion" is accurate enough. |

## 4. Slowing down with gravity assists

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| S01 | Gravity assists can remove speed as well as add it. | Pass on the leading side (G04). | NASA-BSF; ESA-MF3 | Galileo flyby "decreased its energy" (BSF); BepiColombo flyby reduces velocity relative to the Sun (ESA) | **Verified** | "The same trick works in reverse: a flyby can act as a brake." |
| S02 | Galileo flew in front of Io and needed 90 kg less propellant to enter Jupiter orbit. | Energy loss relative to Jupiter before orbit insertion. | NASA-BSF | "90 kg" less propellant | **Verified** | "Galileo skimmed past Jupiter's moon Io to shed speed, and saved ninety kilograms of fuel." (Check whether the date and context of the pass matter to the script.) |

## 5. Why reaching the Sun is hard

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| R01 | Earth, and anything launched from it, moves at about 67,000 mph almost entirely sideways relative to the Sun. | Earth's mean orbital velocity is 29.8 km/s (≈ 66,700 mph). | NASA-SVS; NASA-PFS | "almost entirely sideways relative to the Sun" (SVS); 29.8 km/s (PFS) | **Verified** | "Everything launched from Earth is already moving sideways around the Sun at about thirty kilometres a second." |
| R02 | To fall into the Sun you must cancel that sideways motion; a probe aimed straight at the Sun just misses. | Angular momentum about the Sun: without removing tangential velocity, the orbit's perihelion stays far out. | NASA-SVS | "The only way to get to the Sun is to cancel that sideways motion" | **Verified** | as stated, attributed to the physics |
| R03 | Parker Solar Probe needed to drop about 53,000 mph of sideways motion. | Partial cancellation lowers perihelion to near the Sun. | NASA-SVS | "only needs to drop 53,000 miles per hour" | **Verified** (NASA 2018 mission-design figure) | "Parker had to shed about fifty-three thousand miles per hour of sideways speed." |
| R04 | Reaching the Sun takes 55 times more energy than reaching Mars. | NASA's comparison of launch energy. | NASA-SVS | "55 times more energy" than Mars | **Verified** (NASA-stated; their basis for the comparison isn't given) | Optional. If used, attribute it: "NASA estimates…" |
| R05 | "It's harder to reach the Sun than to leave the Solar System." | Escaping the Sun from Earth's orbit needs ≈ (√2 − 1) × 29.8 ≈ 12.3 km/s of extra heliocentric speed. Falling into the Sun needs ≈ 29.8 km/s removed. | Derived from NASA-PFS (29.8 km/s) | — | **Partially verified**: our derivation, which ignores Earth's own gravity well and assists. True in heliocentric velocity change. | Always state the measure: "Measured in the speed change a spacecraft needs, leaving the Solar System takes about twelve kilometres per second; falling into the Sun takes about thirty." Don't say "harder" without that qualifier. |

## 6. Real missions: Voyager

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| V01 | Voyager 2 launched 20 Aug 1977; Voyager 1 on 5 Sep 1977. | — | NASA-V2; NASA-V1 | V2: Aug. 20, 1977, 14:29:44 UT. V1: Sept. 5, 1977, 12:56:01 UT | **Verified** | — |
| V02 | Voyager 1 closest approaches: Jupiter 5 Mar 1979 (≈280,000 km), Saturn 12 Nov 1980 (≈126,000 km). | — | NASA-V1 | as listed | **Verified** | — |
| V03 | Voyager 2 closest approaches: Jupiter 9 Jul 1979; Saturn 26 Aug 1981 (UT); Uranus 24 Jan 1986; Neptune 25 Aug 1989. | — | NASA-V2 | as listed. Saturn: the page's key-dates list says Aug 25, the detailed text says Aug 26 01:21 UT | **Verified** (Saturn date: use "August 1981" or "26 August UT") | — |
| V04 | Voyager 1 used Jupiter to redirect it toward Saturn. Its Saturn/Titan trajectory ruled out further planets. | — | NASA-Hist; NASA-V1 | Jupiter's gravity redirected it toward Saturn; "Because of the specific requirements for the Titan flyby" | **Verified** | "Voyager 1 traded the outer planets for a close look at Titan." |
| V05 | Only Voyager 2 visited all four giant planets, using gravity assists at each. | — | NASA-V2; NASA-BSF | 1974 plan to send it "to Uranus and then Neptune using gravity assist maneuvers" (V2); technique repeated at Saturn and Uranus (BSF) | **Verified** | — |
| V06 | Without Jupiter, Voyager 2's orbit would have stayed between about 1 AU and about 5 AU. | Its Type-II transfer ellipse had perihelion near Earth and aphelion near Jupiter. | NASA-BSF | perihelion ~1 AU, aphelion ~5 AU | **Verified** | "Without Jupiter, Voyager 2 would have looped between Earth's distance and Jupiter's, forever." |
| V07 | Gravity assists "more than doubled" Voyager 2's speed. | Cumulative Sun-frame gain across the encounters. | NASA-BSF | "more than doubled its speed with gravity assists" | **Verified** (wording only; no number, and NASA doesn't say which frame, though in context it's the Sun frame) | "Relative to the Sun, its flybys more than doubled its speed." Use no specific km/s value. |
| V08 | Voyager 2's speed gain at Jupiter was X km/s. | — | Planetary Society (~10 km/s); other figures unsourced | — | **Unverified**: sources conflict and no primary figure was found | **Cut.** Don't narrate a number. |
| V09 | The outer planets' alignment recurs once every 175 years; it next occurred in the late 1970s. | Synodic geometry of Jupiter–Saturn–Uranus–Neptune. | NASA-Hist | "once-every-175-year alignment of the outer planets" | **Verified** (NASA-stated; the "176 years" in popular sources is a rounding variant) | "an alignment that comes around only once every hundred and seventy-five years" |
| V10 | Gary Flandro (JPL, 1964–66) identified the alignment and the multi-planet trajectory. | — | Flandro, *Astronautica Acta* 12, 329–337 (1966) (citation only; full text not opened); Caltech alumni award citation https://www.alumni.caltech.edu/awardees/2018-5-27-gary-flandro-ms60-phd67 | — | **Partially verified**: the bibliography is confirmed; the attribution rests on secondary sources | Optional. If named: "a young JPL engineer, Gary Flandro, worked out the route in the mid-1960s." Open the 1966 paper first. |
| V11 | Voyager is the scaled-down successor to the cancelled "Grand Tour" program. | — | NASA-Hist; NASA-V2 | Grand Tour cancelled (1971 per NASA-Hist; "January 1972" per NASA-V2) | **Verified** (the cancellation year conflicts between NASA pages) | Don't give the cancellation year. "NASA cancelled the full Grand Tour as too expensive; Voyager was the cheaper version." |
| V12 | Voyager 1 entered interstellar space on 25 Aug 2012; Voyager 2 in Nov/Dec 2018. | — | NASA-V1; NASA-V2 | V1: Aug. 25, 2012. V2: key dates say Nov. 25, 2018; text says Dec. 10, 2018 | **Verified** (V1); **Partially verified** (V2 date conflicts) | V2: say "in 2018". |
| V13 | Voyager 1 reaches one light-day from Earth on 18 Nov 2026 at 10:16:07 UTC, 25,902,068,356 km away. | Light travel time = 24 h. | NASA-LD | Nov. 18, 2026, 5:16:07 a.m. EST; 25,902,068,356 km | **Verified** (NASA projection; the event is in the future) | "On the eighteenth of November 2026, Voyager 1 becomes the first human-made object a full light-day from Earth." A command and its reply then take about two days (our arithmetic). |

## 7. Real missions: Parker Solar Probe

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| P01 | Parker used seven Venus gravity assists to bring its orbit closer to the Sun; the last was on 6 Nov 2024. | Each Venus flyby removes Sun-frame orbital energy and lowers perihelion. | NASA-PSP; NASA-SVS | seven Venus flybys; the last on November 6, 2024 | **Verified** | "Seven passes of Venus, each one taking away a little more of its sideways speed." |
| P02 | Closest approach: 24 Dec 2024, about 3.8 million miles from the solar surface, about 430,000 mph. | — | NASA-PSP | Dec. 24, 2024; ~3.8 million miles; ~430,000 mph, "faster than any human-made object" | **Verified** | "On Christmas Eve 2024 it passed about six million kilometres from the Sun's surface, at about seven hundred thousand kilometres an hour." Convert from NASA's miles at script stage and note the conversion; NASA-SVS gives 3.83 million miles. |
| P03 | Parker's record speed comes from falling toward the Sun, not from Venus "adding speed". | Venus flybys remove energy; the high speed at perihelion comes from falling deep into the Sun's gravity well. | NASA-SVS; NASA-PSP | Venus flybys used to bring the probe closer | **Verified** (mechanism follows from R02/S01) | Make the irony clear: "It became the fastest spacecraft ever by first slowing down." |

## 8. Real missions: BepiColombo

| ID | Proposed claim | Scientific explanation | Source / URL | Supporting passage | Status | Safe wording |
|---|---|---|---|---|---|---|
| B01 | Launched 20 Oct 2018 (local 19/20 Oct). | — | ESA-FS | 20 October 2018 | **Verified** | — |
| B02 | Nine flybys: Earth (10 Apr 2020), Venus (15 Oct 2020, 11 Aug 2021), Mercury (1 Oct 2021, 23 Jun 2022, 19 Jun 2023, 4 Sep 2024, 1 Dec 2024, 8 Jan 2025). | — | ESA-FS | as listed | **Verified** | "one pass of Earth, two of Venus, six of Mercury" |
| B03 | BepiColombo has to brake against the Sun's pull to reach Mercury, and uses flybys **and** solar electric propulsion to do it. | Same physics as R02; the ion engines supplement the flybys. | ESA-Jour; ESA-MF3 | had to "brake against the gravitational pull of the Sun" (Jour); "To be captured by Mercury, we need to slow down" (MF3) | **Verified** | Never "nine flybys alone." Say: "nine flybys and years of gentle ion-engine thrust." |
| B04 | Example: the third Mercury flyby reduced its speed relative to the Sun by 0.8 km/s and turned it by 2.6°. | — | ESA-MF3 | "by 0.8 km/s"; "by 2.6 degrees" | **Verified** (a pre-flyby planned value from June 2023) | "One flyby alone took about eight hundred metres per second off its speed relative to the Sun." Frame it as planned or expected. |
| B05 | Getting into Mercury orbit needs more energy than a mission to Pluto. | — | ESA-FS; ESA-Jour | "even more energy is needed than sending a mission to Pluto" | **Verified** (ESA-stated) | Attribute it: "ESA says…" |
| B06 | The Mercury Transfer Module separated on 3 Sep 2026; a trajectory correction on 24 Sep 2026 gave 11.4 m/s. | — | ESA-Upd | "successful separation"; "a precise push of 11.4 m/s" | **Verified** | Optional detail. |
| B07 | Mercury orbit insertion is scheduled for 21 Nov 2026; MPO and Mio separate on 9–10 Dec 2026; science begins April 2027. | — | ESA-Upd; ESA-FS | "will enter orbit around Mercury on 21 November 2026"; separation "9–10 December 2026"; science "April 2027" | **Verified as a schedule** | **It hasn't happened.** Until ESA confirms it, script it as "is due to," never "entered." An EPSC abstract's 26 Nov date is superseded by ESA. |
| B08 | Arrival was delayed from Dec 2025 to Nov 2026 by a thruster problem found in 2024. | — | ESA-Upd (references the 2024 thruster issue; new trajectory began at the fourth Mercury flyby per ESA) | — | **Partially verified**: ESA confirms the new trajectory and the arrival date; the original December 2025 date comes from older ESA material and secondary coverage | Optional. Leave it out unless needed. |
| B09 | The method of Mercury orbit insertion (chemical burn vs gravitational capture). | — | none found in ESA-Upd | — | **Unverified** | Don't describe the capture method. |

## 9. Claims corrected or withdrawn from the research report

| Report claim | Problem | Correction |
|---|---|---|
| "Both Voyagers used the grand-tour alignment" (implicit in §4 and Short S5) | Only Voyager 2 flew past all four giants. Voyager 1 left the plane after Titan. | Say Voyager 2 used the alignment fully; Voyager 1 used Jupiter and Saturn. |
| Short S3: "harder to reach the Sun than to leave the Solar System" | It's only true when measured as the speed change needed (R05). Unqualified, it reads as a vague superlative. | Always state the measure. |
| Short S4: "nine flybys to brake" | ESA: flybys **plus** solar electric propulsion; flybys also steer. | "Nine flybys and ion engines". |
| "Jupiter paid for Voyager's trip" | Fine in spirit, but Jupiter "paid" only the gain from the Jupiter flyby. Saturn, Uranus and Neptune contributed for Voyager 2. | "The planets paid, Jupiter most of all." Or limit the claim to the Jupiter flyby. |
| A Voyager 2 Jupiter speed figure | Conflicting sources. | Cut (V08). |
| Voyager transmitter power (12.5 W vs 22–23 W) | Not needed for this episode. | Out of scope; unresolved. |
| Cold open "the Voyagers are leaving the Solar System" | Ambiguous: they've left the heliosphere, but not the Sun's gravitational domain (the Oort cloud lies beyond). | "now in interstellar space, beyond the Sun's bubble of solar wind". Source: NASA-V1 ("exit the heliosphere"). |

## 10. Misconception guardrails (apply to the script and the visuals)

1. **No "free energy" and no "energy from nothing."** Every speed gain is paired with "borrowed from the planet's orbital motion" (E01).
2. **No "it speeds up because it falls toward the planet."** Falling in and climbing out cancel in the planet frame (G03).
3. **Speed ≠ velocity.** Define both once. In planet-frame scenes, show the speed readout unchanged while the arrow rotates (G06).
4. **Every speed number carries its frame.** On-screen readouts say "rel. Jupiter" or "rel. Sun" (F01).
5. **Planets don't move off course.** Use "far too small to measure" and the mass ratio, never a dramatic slowdown (E02–E04).
6. **The train analogy is mechanical.** If used, say so. Gravity has no bounce and no contact (F02).
7. **Future events stay future.** BepiColombo's insertion and Voyager 1's light-day milestone are scheduled, not done (B07, V13).
8. **No Oberth effect** unless it gets its own explanation. It's a different mechanism (a powered burn deep in a gravity well), and mixing it in is a common error.
