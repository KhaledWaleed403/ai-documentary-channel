# Episode 003 — Verified Scientific Claims

The script-ready claim ledger for Episode 003 (gravity assists). It plays the role `claims.md` has in `docs/production-workflow.md`. Every factual line in a future script must cite a **C-number** from this file.

The evidence, quotes and reasoning behind each claim are in [gravity-assist-fact-check.md](gravity-assist-fact-check.md); its ID is in the last column. Source short names are defined at the top of that file. Checked 2026-10-31.

**Rules**
- Use only claims marked **Verified**. Claims marked **Partially verified** need the stated qualifier, word for word in meaning.
- Anything not listed here is not cleared for narration.
- Re-check C38 (BepiColombo arrival) after 21 Nov 2026 and C30 (Voyager light-day) after 18 Nov 2026, and update the tense.

## Physics of the flyby

| C# | Claim (the safe form) | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C01 | Relative to the planet, a spacecraft leaves a flyby at the same speed it arrived; gravity changes only its direction. | Verified | NASA-Primer | G01 |
| C02 | Relative to the Sun, the same flyby can leave the spacecraft faster or slower, because the planet is itself moving around the Sun. | Verified | NASA-BSF | G02 |
| C03 | The speed gained falling toward the planet is lost again climbing away; the net change comes from the planet's motion, not from the fall. | Verified | NASA-Primer, NASA-BSF | G03 |
| C04 | Passing behind a moving planet can add speed relative to the Sun; passing in front can remove it. | Verified | NASA-BSF (Voyager behind Jupiter; Galileo in front of Io) | G04 |
| C05 | Speed is how fast; velocity is how fast and in which direction. A flyby always changes velocity, even when, seen from the planet, the speed is unchanged. | Verified | NASA-Primer + definition | G06 |
| C06 | Anyone aboard would feel no acceleration during a gravity assist, only continuous free fall. | Verified | NASA-BSF | G05 |
| C07 | In NASA's train analogy, a ball thrown at 30 mph at a train doing 50 mph comes back at nearly 130 mph relative to the platform. The analogy uses a mechanical bounce, unlike gravity. | Verified | NASA-Primer | F02 |

## Energy and momentum

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C08 | The spacecraft's extra orbital energy is taken from the planet's orbital motion; no energy is created. | Verified | NASA-BSF, NASA-Primer | E01 |
| C09 | The planet slows by an amount far too small to measure, and its orbit doesn't noticeably change. | Verified | NASA-BSF | E02, E04 |
| C10 | Jupiter's mass is about 1.9 × 10²⁷ kg; a Voyager spacecraft weighed about 815 kg at launch. Jupiter is roughly two million billion billion (2 × 10²⁴) times heavier. | Partially verified (masses primary; the ratio is our arithmetic) | NASA-PFS; NASA Voyager FAQ | E03 |

## Braking with gravity

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C11 | A gravity assist can act as a brake, removing speed. | Verified | NASA-BSF; ESA-MF3 | S01 |
| C12 | Galileo flew past Jupiter's moon Io to lose energy relative to Jupiter, saving 90 kg of propellant for orbit insertion. | Verified | NASA-BSF | S02 |

## Reaching the Sun

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C13 | Earth orbits the Sun at about 29.8 km/s (about 67,000 mph), almost entirely sideways relative to the Sun, and so does anything launched from it. | Verified | NASA-PFS; NASA-SVS | R01 |
| C14 | To reach the Sun, a spacecraft must cancel most of that sideways motion; one aimed straight at the Sun misses. | Verified | NASA-SVS | R02 |
| C15 | Parker Solar Probe needed to shed about 53,000 mph of sideways motion. | Verified | NASA-SVS | R03 |
| C16 | NASA estimates reaching the Sun takes 55 times more energy than reaching Mars. | Verified (attribute to NASA) | NASA-SVS | R04 |
| C17 | Measured as the speed change needed from Earth's orbit, leaving the Solar System takes about 12 km/s; falling into the Sun takes about 30 km/s. | Partially verified (our derivation from C13; ignores Earth's gravity well). **Must state "measured in speed change."** | Derived from NASA-PFS | R05 |

## Voyager

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C18 | Voyager 2 launched on 20 Aug 1977; Voyager 1 on 5 Sep 1977. | Verified | NASA-V2, NASA-V1 | V01 |
| C19 | Voyager 1 passed Jupiter on 5 Mar 1979 and Saturn on 12 Nov 1980. | Verified | NASA-V1 | V02 |
| C20 | Voyager 2 passed Jupiter (9 Jul 1979), Saturn (Aug 1981), Uranus (24 Jan 1986) and Neptune (25 Aug 1989). | Verified | NASA-V2 | V03 |
| C21 | Jupiter's gravity redirected Voyager 1 toward Saturn; its close Titan flyby ruled out further planets. | Verified | NASA-Hist; NASA-V1 | V04 |
| C22 | Only Voyager 2 visited all four giant planets, with gravity assists at Jupiter, Saturn and Uranus. | Verified | NASA-V2; NASA-BSF | V05 |
| C23 | Without Jupiter, Voyager 2's orbit would have looped between about 1 AU (Earth's distance) and about 5 AU (Jupiter's distance). | Verified | NASA-BSF | V06 |
| C24 | Relative to the Sun, gravity assists more than doubled Voyager 2's speed. | Verified (wording; no number) | NASA-BSF | V07 |
| C25 | The route used a once-every-175-years alignment of the outer planets, next due in the late 1970s. | Verified | NASA-Hist | V09 |
| C26 | NASA cancelled the full "Grand Tour" program as too costly; Voyager was its scaled-down successor. (Give no cancellation year: NASA pages say 1971 and Jan 1972.) | Verified | NASA-Hist; NASA-V2 | V11 |
| C27 | JPL's Gary Flandro worked out the multi-planet route in the mid-1960s (paper published 1966). | Partially verified (attribution via secondary sources; open the paper first) | Flandro 1966; Caltech citation | V10 |
| C28 | Voyager 1 entered interstellar space, beyond the heliosphere, on 25 Aug 2012. | Verified | NASA-V1 | V12 |
| C29 | Voyager 2 entered interstellar space in 2018. | Verified (year only) | NASA-V2 | V12 |
| C30 | Voyager 1 reaches one light-day from Earth (25,902,068,356 km) on 18 Nov 2026 at 10:16:07 UTC, the first human-made object to do so. | Verified as a NASA projection (future event) | NASA-LD | V13 |

## Parker Solar Probe

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C31 | Parker used seven Venus gravity assists to bring its orbit closer to the Sun; the last was on 6 Nov 2024. | Verified | NASA-PSP; NASA-SVS | P01 |
| C32 | On 24 Dec 2024 Parker passed about 3.8 million miles (≈ 6.1 million km) from the Sun's surface at about 430,000 mph (≈ 690,000 km/h), faster than any human-made object. | Verified (the km conversions are ours) | NASA-PSP | P02 |
| C33 | Parker's record speed comes from falling close to the Sun after the Venus flybys removed sideways speed. | Verified (mechanism) | NASA-SVS; NASA-PSP | P03 |

## BepiColombo

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C34 | BepiColombo (ESA–JAXA) launched on 20 Oct 2018. | Verified | ESA-FS | B01 |
| C35 | It made nine flybys: Earth once, Venus twice, Mercury six times (10 Apr 2020 to 8 Jan 2025). | Verified | ESA-FS | B02 |
| C36 | To reach Mercury it has had to brake against the Sun's pull, using those flybys plus solar electric propulsion. | Verified | ESA-Jour; ESA-MF3 | B03 |
| C37 | ESA planned for the third Mercury flyby to reduce its speed relative to the Sun by 0.8 km/s and turn it by 2.6°. | Verified (planned value) | ESA-MF3 | B04 |
| C38 | Entering Mercury orbit is scheduled for 21 Nov 2026; the two orbiters separate on 9–10 Dec 2026; science begins April 2027. | Verified as a schedule. **Future tense only** until ESA confirms. | ESA-Upd; ESA-FS | B07 |
| C39 | ESA says entering Mercury orbit needs more energy than a mission to Pluto. | Verified (attribute to ESA) | ESA-FS; ESA-Jour | B05 |

## Added for the Episode 003 Shorts (2026-10-31)

| C# | Claim | Status | Source | Fact-check ID |
|---|---|---|---|---|
| C40 | Parker's 24 Dec 2024 pass was the closest any spacecraft has come to the Sun (a new record). | Verified | NASA-PSP: article title "Makes History With Closest Pass to Sun"; distance described as "a new record" | P02 |

## Not cleared (do not narrate)

- A number for Voyager 2's speed gain at Jupiter (V08: sources conflict).
- How BepiColombo's orbit insertion works (B09: no source).
- The original Dec 2025 BepiColombo arrival date (B08: secondary only).
- Voyager transmitter power, and the Oberth effect (out of scope).
- Any measured or narrated figure for how much a planet slows (E03 is an internal estimate only).
