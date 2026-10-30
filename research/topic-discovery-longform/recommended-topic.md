# Recommended Topic

## A. Decision

**Topic:** How a submarine keeps 100+ people alive while sealed underwater for months. The story is told as a chain of things that would kill the crew (crushing pressure, their own exhaled CO₂, running out of oxygen and water, getting lost without GPS, being heard, being cut off) and the hidden machine that defeats each one.

**Working title:** *The Hidden Machines That Keep a Submarine Crew Alive*

**Alternatives:**
1. *How Do Submarines Stay Underwater for Months?* (matches the search phrase; that phrase is crowded, so use it in the description, or as a title only if CTR on the primary title is weak)
2. *7 Ways the Deep Ocean Tries to Kill a Submarine Crew*

Run the final title and thumbnail through the `yt-package` skill before publishing.

**Central promise:** "By the end, you'll understand how a nuclear submarine scrubs and remakes its own air, finds its way with no GPS, stays hidden, and hears from home, all powered by one hidden reactor." Revised after the fact-check: the fresh-water claim is unverified (see `claims.md`), and the story is now explicitly about a **nuclear** boat.

**Why it beats the runner-up (anaesthesia):**
- **Stronger repeatability.** Three unrelated channels (2K–93K subscribers) clearly broke out on submarine mechanisms in roughly the last 90 days, and a fourth (History of Simple Things, 1.04M) probably did. This was corrected from "four" in the 2026-10-29 verification pass. One small channel's three submarine videos are its three best recent uploads. For anaesthesia, the biggest small-channel wins depend on a doctor's on-camera authority, and the mystery hook is already owned by TED-Ed (19.7M) and This. (1.8M).
- **Better fit for Luminexplain's look.** Dark deep-water environments, cyan sonar rings and amber reactor glow are physical mechanisms the brand already draws (`SignalPath`, `ComponentCutaway`). Anaesthesia's core is receptor-level and partly unknown science, which is more abstract to animate and heavier on caveats.
- **More Shorts.** Each "threat" is a self-contained puzzle with its own answer: 7–8 Shorts compared with about 5 for anaesthesia.

**Main risks:**
1. **Crowded framing.** "How submarines stay underwater for months" is saturated with low-effort AI videos that get under 7K views. If our packaging looks like theirs, we inherit their results. The threat-by-threat framing, and the early reveal that making oxygen and removing CO₂ are two separate machines, are how we avoid that. (The original "CO₂ kills first" hook was rejected in fact-checking.)
2. **A direct competitor exists.** Exploded Works (Oct 2026) already covers air, water and the reactor in a 3D cutaway, and IMD Aviation's crew-life video has 4M views. We differentiate by structure (stakes and escalation, not a vessel tour), by excluding weapons, and by the reveal that every system runs on electricity made from one reactor's heat.
3. **Classified details.** Exact depths, speeds and patrol lengths are classified or vary by class. The script must stay with public, citable figures and say "more than" or "classified" where needed.
4. **No guarantee.** None of this evidence predicts virality. It shows that the audience currently rewards submarine-mechanism videos, including on small channels.

## B. Evidence summary (details in competitor-evidence.md)

**Facts (read from public YouTube pages, 2026-10-29):**
- [How Subs Navigate Without GPS for 6 Months](https://www.youtube.com/watch?v=rr6AdH7Lhf4): Second Order Science, 26.7K subs, 2026-08-07, 20:41, 1,200,314 views.
- [How the Navy Hears Subs 3,000 Miles Away](https://www.youtube.com/watch?v=sP85wUcg6_A): same channel, 2026-07-29, 18:09, 406,119 views.
- [How Nuclear Submarines Survive 1,000 PSI](https://www.youtube.com/watch?v=GhQAxio_4_o): same channel, 2026-10-01, 23:15, 113,852 views. The channel's non-submarine uploads from the same period are at 6K–29K.
- [Inside the Typhoon-Class Submarine](https://www.youtube.com/watch?v=ChYxhrn2g_Q): SYG DESIGNWORKS, 93.4K subs, 2026-08-30, 22:51, 2,139,744 views.
- [How a Nuclear Submarine Works (3D Animation)](https://www.youtube.com/watch?v=wyjefTFIwqg): Exploded Works, 2.19K subs, 2026-10-06, 10:22, 155,982 views.
- [How Do Submarines Communicate Underwater?](https://www.youtube.com/watch?v=iW0uXsYUYiY): History of Simple Things, 2026-09-09, 8:10, 136,060 views.
- Submarine Shorts from the last 3 days at 192,759 and 103,841 views (creator baselines unavailable).

**Estimates:** the outlier multiples (≈4×–100×) and per-day velocities in competitor-evidence.md are views divided by channel baselines or by age. YouTube does not publish these.

**Interpretation:** the demand is for *how-is-this-even-possible* submarine engineering, not for submarines in general. Videos framed around one impossible-sounding problem beat generic "how a submarine works" titles.

**Evidence against:**
- Generic submarine Shorts mostly get under 7K views.
- Generic search ranking is held by older giants (Wendover 11.0M, "Learn from the base" 8.0M, Insider 2.55M).
- Several recent small-channel winners are defence-focused channels whose audience may lean military rather than general curiosity.
- No free search-volume data was available, so search demand is **unknown**.

## C. Long-form structure

See [longform-outline.md](longform-outline.md): 9 chapters, about 9:30 total.

## D. Shorts plan

See [shorts-opportunities.md](shorts-opportunities.md): 8 Shorts. Produce these three first:
1. *The Other Gas a Submarine Has to Fight* (CO₂ — retitled; the "kills first" claim was rejected)
2. *How a Submarine Knows Where It Is With No GPS*
3. *How Do You Send a Message to a Hidden Submarine?* (retitled; the "100 m down" figure was rejected)

## E. Production decision

**Complexity: medium.**

- **Essential scenes:** a side-view cutaway submarine at depth (one master SVG, reused in every chapter); a pressure-on-hull scene; a CO₂ → amine scrubber loop; electrolysis (water → O₂ + 2 H₂, with the hydrogen safely removed); a fresh-water scene (on hold until sourced); an inertial-navigation scene (gyros and accelerometers, with the drift error growing over time); sound radiating into water and being absorbed by hull coatings; a VLF wave from a shore antenna to the trailing wire; the reactor → steam → turbine/generator hub, with every system lighting up from it.
- **Reusable from Episode 001:** `SignalPath` (sonar pings, VLF waves, pipes, heat flow), `ComponentCutaway` (hull reveal), `Callout`, `StepDiagram` (the threat checklist), `ScaleIndicator` (depth and pressure ruler), `CameraFrame`, `TextReveal`, `Captions`, `timing.ts`. A recurring "threat meter" HUD could become a new reusable component.
- **Possible cost traps:**
  - Detailed reactor internals: keep it schematic, as heat → steam → turbine.
  - Realistic water and caustics: use a gradient plus a few particle layers.
  - Animating many crew figures: show the crew as count markers or silhouettes, never animated characters.
  - Accurate ship-class details: use a generic, unnamed attack-sub silhouette.
- **Explicitly out of scope:** weapons, torpedoes and tactics. They are off-brand, and Exploded Works and SYG already cover them.
- **Research workload:** the claim-verification pass is in [claims.md](claims.md), which lists 57 technical claims and 16 performance claims with their status. After the v2 gap-resolution pass, [research-gaps.md](research-gaps.md) rates the outline **script-ready, conditionally**. The only weak area is current fresh-water practice: the primary source dates from 1955.
