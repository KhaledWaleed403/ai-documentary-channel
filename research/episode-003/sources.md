# Episode 003 — Sources (topic-discovery stage)

> **Updated 2026-10-31.** The Finalist A rows below were superseded by the primary-source fact-check in [gravity-assist-fact-check.md](gravity-assist-fact-check.md):
> - A5 (175-year alignment, from NASA's history article), A6 (Parker, NASA SVS and NASA Science), A7 (BepiColombo, ESA factsheet and the ESA arrival-updates page) and A8 (Voyager light-day, NASA Science) are now **verified**.
> - A9 (Voyager 2 speed gain) stays **conflicting** and is cut.

Accessed 2026-10-31. These sources back the topic recommendation. This is **not** the fact-check: atomic claims (`C001…`) with a `verified` status go into `claims.md` at stage 2 (see `docs/production-workflow.md`). Status here means the following:
- **confirmed**: read on a primary or authoritative page in this pass.
- **reported**: consistent across secondary sources; confirm against the primary source before scripting.
- **conflicting**: sources disagree; resolve before use.

## Finalist A — Gravity assists (recommended)

| # | Point | Source | Status |
|---|---|---|---|
| A1 | A flyby transfers orbital momentum from the planet to the spacecraft. Relative to the planet, the craft leaves at the same speed it arrived, with its direction bent. Relative to the Sun, it keeps a gain. The planet's loss is "too small to be measured" (NASA compares it to a gnat meeting a freight train). | NASA Science, *Basics of Space Flight*, Ch. 4-1 "Gravity Assists": https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/ | confirmed |
| A2 | Without Jupiter, Voyager 2's orbit would have stayed between about 1 AU and 5 AU. Gravity assists "more than doubled its speed" across the outer planets. | same | confirmed |
| A3 | A flyby can also slow a spacecraft. Galileo passed in front of Io and needed 90 kg less propellant for Jupiter orbit insertion. | same | confirmed |
| A4 | A crew aboard would feel no acceleration during a gravity assist, only a continuous sense of falling. | same | confirmed |
| A5 | Voyager used a once-every-175-year alignment of the outer planets. Gary Flandro (JPL) noticed it in the 1960s. Some popular sources say 176; use 175 with JPL. | JPL Grand Tour poster: https://voyager.jpl.nasa.gov/downloads/posters/pdf/grand_tour.pdf; NASA, "45 Years Ago, Voyager 1 Begins…": https://www.nasa.gov/technology/45-years-ago-voyager-1-begins-its-epic-journey-to-the-outer-planets-and-beyond | reported (JPL poster via search summary; open the PDF before scripting) |
| A6 | Reaching the Sun means cancelling Earth's sideways speed of about 67,000 mph. Parker Solar Probe has to shed about 53,000 mph and uses seven Venus flybys. Going to the Sun takes 55× the energy of going to Mars. | NASA Goddard SVS, "It's Surprisingly Hard to Go to the Sun": https://svs.gsfc.nasa.gov/13017 | reported (NASA page via search summary; open before scripting) |
| A7 | BepiColombo's route used one Earth, two Venus and six Mercury flybys. Mercury orbit insertion is planned for late November 2026: most sources say 21 Nov, one EPSC 2026 abstract says 26 Nov. It was delayed from December 2025 by thruster issues. | Space.com: https://space.com/bepicolombo-thruster-issues-mercury-arrival-delay-2026; EPSC 2026 abstract: https://meetingorganizer.copernicus.org/EPSC2026/EPSC2026-343.html; ESA video "BepiColombo begins its final approach to Mercury": https://www.youtube.com/watch?v=H2TN8ZWnL6s | reported. **Check ESA's own mission page for the final date.** The event hasn't happened yet, so don't script its outcome. |
| A8 | Voyager 1 reaches one light-day from Earth at 10:16 UTC on 18 Nov 2026, about 25.9 billion km (173 AU) out. NASA announced the date on 17 June 2026. | IFLScience: https://iflscience.com/its-official-voyager-1-will-cross-the-1-light-day-threshold-on-november-18-2026-82733; EarthSky: https://earthsky.org/space/voyager-1-1-light-day-from-earth-november-17-18-2026/ | reported (find NASA's own release before scripting) |
| A9 | The size of Voyager 2's speed gain at Jupiter (figures range from ~5 to ~15 km/s). | Planetary Society: https://www.planetary.org/articles/20130926-gravity-assist; others unsourced | **conflicting**. Use NASA's "more than doubled its speed" (A2) unless a JPL mission report gives a figure. |

## Finalist B — GPS and relativity

| # | Point | Source | Status |
|---|---|---|---|
| B1 | GPS satellite clocks orbit about 20,000 km up at about 14,000 km/h. Special relativity slows them by about 7 µs/day, general relativity speeds them up by about 45 µs/day, and the net is about +38 µs/day. | R. Pogge, Ohio State, "Real-World Relativity: The GPS Navigation System": https://www.astronomy.ohio-state.edu/pogge.1/Ast162/Unit5/gps.html | confirmed (university teaching page) |
| B2 | Left uncorrected, errors would build up at about 10 km a day. | same | confirmed as *stated*. **Handle with care:** the receiver solves for its own clock offset, so the "10 km a day" figure is a simplification that physicists dispute. Script it as "the timing error grows by the distance light travels in 38 µs, about 11 km, every day". |
| B3 | The primary reference is N. Ashby, "Relativity in the Global Positioning System", *Living Reviews in Relativity* 6, 1 (2003), doi:10.12942/lrr-2003-1. The factory offset to 10.22999999543 MHz is widely cited from it. | https://doaj.org/article/a78541e32b664e9781f49736f651fb21 | reported. Couldn't extract the full text in this pass; read §§ on frequency offset before scripting. |

## Finalist C — Noise-cancelling headphones

| # | Point | Source | Status |
|---|---|---|---|
| C1 | Active noise control works at low frequencies. Above about 1–1.5 kHz the "zone of quiet" around the error microphone shrinks to a fraction of a wavelength (about 1.4 cm across at 2.5 kHz), so passive isolation does the rest. | Brunel University, ICSV13 (2006) paper: https://bura.brunel.ac.uk/bitstream/2438/2415/1/12_ICSV13_2006.pdf | reported (via search summary; read the paper) |
| C2 | "Speech sits mostly above the effective ANC band" | inference only | **unsourced**. Needs a psychoacoustics or headphone-engineering source. |

## Voyager / Deep Space Network (fourth-ranked; feeds Shorts in Finalist A)

| # | Point | Source | Status |
|---|---|---|---|
| D1 | The power a 70 m DSN dish receives from Voyager is on the order of 10⁻¹⁸ W. | JPL Education "Pi in the Sky" handout: https://www.jpl.nasa.gov/edu/pdfs/piday2015_voyager_handout.pdf | reported (it's a classroom estimate) |
| D2 | Voyager's transmitter power: JPL Education says 12.5 W; other sources say 22–23 W. | same, plus secondary sources | **conflicting** |

## YouTube evidence
See [competitor-evidence.md](competitor-evidence.md). Our own channel data is in [`analytics/2026-10-31-channel-snapshot.md`](../../analytics/2026-10-31-channel-snapshot.md).
