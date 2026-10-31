# Episode 003 Long-Form — Storyboard v1

**How Spacecraft Steal Speed From Planets** · 16:9 · target **about 6:10** · drafted 2026-10-31

**Revision 2026-10-31 (approved with corrections):**
- Scene 1: the dashed path is now a labelled hypothetical, unassisted branch, and the real trajectory is continuous through Jupiter.
- Scene 7: "almost imperceptible"; the mass ratio is removed.
- Scene 9: direction changes only at each encounter; one cumulative speed comparison; a favourable alignment, not a straight line.
- Scene 11: cumulative energy reduction from the first orbit to the final orbit, not seven identical brakes.

The narration draft is in `script.md`.

This is a visual plan only. No narration is written here; the "beat" lines describe what each scene must convey. C-numbers point to `research/episode-003/verified-scientific-claims.md`. Every on-screen fact must carry one.

## Rules that apply to every scene

- **Frame badge.** A small badge in the top-left corner always names the current view: `VIEW: JUPITER` or `VIEW: SUN`. It changes only during a frame switch. Every speed readout is labelled with its frame ("speed rel. Jupiter", "speed rel. Sun").
- **Speed vs velocity.** Speed is a horizontal bar gauge. Velocity is an arrow. In the planet frame the bar must stay level while the arrow turns. That contrast carries the whole film.
- **Colour plus shape, never colour alone:**
  - Spacecraft: cyan dot, solid cyan path, cyan arrow with an open head.
  - Planet and Sun: amber, with an amber arrow with a filled head.
  - Sun-frame resultant: white, with a double line.
  - Counterfactual or "would have" paths: dashed.
- **No numbers on the generic flyby.** Its gauges show lengths only, because the exact values depend on the flyby's geometry. Real numbers appear only in the mission scenes, and only from the claims list.
- **Scale:** flybys are shown in a zoomed inset circle against the solar-system map. Scale changes are spoken in narration, never shown as disclaimer tags.
- **Look:** near-black deep-space background (not Episode 002's navy), a faint star field, thin orbit lines. Cyan and amber accents.
- **Animation:** frame-driven only (`useCurrentFrame` / `interpolate` / `spring`). At most one camera move at a time.

---

## Act I — The puzzle (0:00–0:35)

### Scene 1 · A path that should have turned back · 0:00–0:25 (25 s)
- **Purpose:** the contradiction, in the first frame. The launch alone would not have carried Voyager 2 much beyond Jupiter's distance, yet it is now in interstellar space.
- **Viewer sees:**
  1. Top-down solar-system map. Sun at the centre, Earth's and Jupiter's orbits as thin rings.
  2. A single solid cyan path leaves Earth and climbs outward toward Jupiter's orbit.
  3. At the point where it would meet Jupiter, a **dashed ghost branch** splits off. It reaches roughly Jupiter's distance and curves back inward toward the Sun as one arc, not a repeating loop. Its label reads "hypothetical: no Jupiter flyby" (C23).
  4. The **solid** path stays continuous through Jupiter, bends there, and carries on past Saturn, Uranus and Neptune, off the edge of the frame (C20, C22).
  5. The dashed branch fades but stays faintly visible.
- **Camera:** opens tight on the inner system, then one slow pull-back as the path leaves.
- **Labels:** `1 AU`, `5 AU` ticks along the ghost branch (C23). "Voyager 2 · launched 1977" (C18). Small planet name tags appear as the path passes each one. The end tag reads "interstellar space, 2018" (C29).
- **2D Remotion:** yes. Ellipse from perihelion and aphelion, plus a hand-shaped outbound spline. Reuses `ScaleIndicator`.

### Scene 2 · The question · 0:25–0:35 (10 s)
- **Purpose:** state the episode's question: how does flying past a planet make you faster?
- **Viewer sees:** the map dims. The Jupiter bend from Scene 1 zooms into an inset circle and holds. Title card: **How Spacecraft Steal Speed From Planets**.
- **Camera:** a push-in to the bend, then hold.
- **Labels:** the title only.
- **2D Remotion:** yes (`TextReveal`, `CameraFrame`).

## Act II — The reference-frame reveal (0:35–3:00)

### Scene 3 · The flyby, seen from the planet · 0:35–1:05 (30 s)
- **Purpose:** in an ideal unpowered flyby, measured from the planet, the craft leaves at about the speed it arrived (C01). Gravity bends the path but gives no net speed.
- **Viewer sees:**
  1. A large amber Jupiter at the centre, holding still because this is its own view.
  2. The cyan dot enters from the lower left, curves around the planet on a symmetric hairpin (a computed hyperbola), and exits upper left.
  3. A speed bar under the planet rises on approach, peaks at closest approach, then falls back to exactly its starting length (C03).
  4. Ghost markers at entry and exit show the two bars side by side, equal.
- **Camera:** locked. Stillness is the point.
- **Labels:** badge `VIEW: JUPITER`. Bar label "speed rel. Jupiter". At the end, a callout between the two ghost bars reads "same".
- **2D Remotion:** yes. Needs the planned `OrbitPath` (hyperbola) component; the bar is a simple rect.

### Scene 4 · Same speed, new direction · 1:05–1:25 (20 s)
- **Purpose:** introduce speed vs velocity (C05). The bar didn't change, but the arrow did.
- **Viewer sees:**
  1. Replay of the hairpin at 3× speed, with a cyan velocity arrow attached to the dot.
  2. Freeze at exit. The entry arrow (ghosted) and the exit arrow slide to a common origin. They are the same length but point in different directions, and the angle between them sweeps in.
- **Camera:** a slight push toward the two arrows.
- **Labels:** "speed: how fast" next to the bar; "velocity: how fast **and which way**" next to the arrows; the turn angle marked with an arc.
- **2D Remotion:** yes. Needs the planned `VectorArrow`.

### Scene 5 · The switch: seen from the Sun · 1:25–2:00 (35 s)
- **Purpose:** the reveal. The same flyby, viewed from the Sun, gains speed because Jupiter is moving (C02).
- **Viewer sees:**
  1. The badge flips to `VIEW: SUN`.
  2. Jupiter, which was still, starts sliding steadily to the right along a thin amber orbit arc, with an amber arrow showing its orbital motion.
  3. The flyby replays. The craft's path, the same hairpin carried along by Jupiter, visibly unfolds into a long bent arc that leaves faster.
  4. The Sun-frame speed bar, now white and labelled "speed rel. Sun", ends **longer** than it started. The planet-frame bar from Scene 3 sits greyed beside it, still level.
- **Camera:** pulls back as the frame switches, then tracks nothing; the planet does the moving.
- **Transition:** blend the path from relative to absolute (path = planet position + relative path, blend 0→1) over about 2 s, so viewers see one curve become the other rather than a cut.
- **Labels:** "same flyby"; "Jupiter's motion"; the two bars labelled with their frames.
- **2D Remotion:** yes. This is the planned `FrameSwitch` (or a `CameraFrame` extension) plus `OrbitPath`. The key scene: budget the most review time here.

### Scene 6 · Adding the arrows · 2:00–2:35 (35 s)
- **Purpose:** show *why*. The craft's velocity measured from the Sun = Jupiter's velocity + the craft's velocity relative to Jupiter. The turn changed only the second arrow, and that changes the sum (C02, C04).
- **Viewer sees:**
  1. A clean diagram panel beside the frozen flyby.
  2. **Before:** amber Jupiter arrow, then a cyan relative arrow placed tip-to-tail, making a white resultant.
  3. **After:** the amber arrow stays identical. The cyan arrow, the same length, rotates to its exit direction. The white resultant redraws, visibly longer.
  4. A ghost of the "before" resultant stays for comparison.
- **Camera:** static, centred on the diagram.
- **Labels:** "Jupiter's velocity (rel. Sun)", "craft rel. Jupiter", "craft rel. Sun". The rotation is marked "only this changed".
- **2D Remotion:** yes (`VectorArrow`, tip-to-tail mode).

### Scene 7 · Who pays · 2:35–3:00 (25 s)
- **Purpose:** the energy is not created. The craft's gain in orbital energy comes from Jupiter's orbital motion, and Jupiter's change is almost imperceptible (C08, C09). This dismantles "free energy."
- **Viewer sees:**
  1. A balance-style two-pan graphic. The craft's energy bar rises and Jupiter's bar dips by a hair. A magnifier zooms toward Jupiter's bar and finds the change almost imperceptible.
  2. Jupiter's orbit arc carries on visibly unchanged.
- **Camera:** a magnifier zoom into Jupiter's bar, then pull out.
- **Labels:** "craft gains", "Jupiter gives up a little: almost imperceptible". **No mass-ratio graphic**, so it can't be read as quantitative proof.
- **2D Remotion:** yes.

## Act III — Aim decides everything (3:00–3:25)

### Scene 8 · Behind or in front · 3:00–3:25 (25 s)
- **Purpose:** the bend can subtract as well as add. Pass behind a moving planet to leave faster; pass in front to leave slower (C04, C11). This sets up Act V.
- **Viewer sees:**
  1. Split screen, both in `VIEW: SUN`, with the same Jupiter moving right.
  2. Left: the Scene 5 flyby, passing behind; the white bar ends longer.
  3. Right: a mirrored flyby, passing in front; the cyan arrow rotates the other way and the white bar ends **shorter**.
  4. A one-line tag below the right panel: "Galileo used this at Io and saved 90 kg of fuel" (C12).
- **Camera:** static split, with a short push onto the right panel at the end.
- **Labels:** "passes behind → faster rel. Sun"; "passes in front → slower rel. Sun". Shape cues: up and down chevrons beside each bar.
- **2D Remotion:** yes (reuses the Scene 5 and 6 components, mirrored).

## Act IV — Outward: Voyager (3:25–4:15)

### Scene 9 · The once-in-175-years line-up · 3:25–4:15 (50 s)
- **Purpose:**
  - Turn the mechanism into the grand tour. One craft, four giants, each flyby bending and boosting it (C22, C25).
  - Voyager 1 took a different road (C21).
  - Payoff: return to Scene 1's dashed ellipse.
- **Viewer sees:**
  1. A time-lapse of the outer planets on their orbits with a year counter. They drift into a **favourable arrangement**, spread around one side of the Sun so that each giant sits a little farther along the route than the one before. It is **not a straight line**. The counter stops on 1977 (C25).
  2. Voyager 2's path draws from Earth. At each planet an inset circle pops up showing only the **change of direction**: incoming and outgoing path segments, with the turn angle marked. **No per-planet speed bar.**
  3. Encounter tags appear in order: Jupiter 1979, Saturn 1981, Uranus 1986, Neptune 1989 (C20).
  4. Voyager 1's path draws thinner: Jupiter, then Saturn, then a tag "Titan" and the path turning away from the planets (C19, C21).
  5. After Neptune, **one cumulative** Sun-frame speed comparison appears: a launch bar beside an after-the-flybys bar, captioned "more than doubled" (C24, the total only; no number and no per-encounter steps).
  6. End: the dashed Scene 1 ghost branch reappears behind the real path, as before-and-after.
- **Camera:** wide map; insets pop in and out at each encounter. One slow pull-out at the end.
- **Labels:** year counter; "favourable alignment"; encounter tags; "speed rel. Sun: more than doubled" (cumulative, unnumbered); "Voyager 1 → Titan"; "hypothetical: no Jupiter flyby" on the dashed branch.
- **2D Remotion:** yes. Planet angular rates from NASA fact-sheet periods make the line-up physically right. The Voyager paths are hand-shaped splines through the encounter points, timed to the encounter dates.
- **Optional 3D (not recommended):** Voyager 1 rising out of the planets' plane after Titan. A 2D side-on inset does the same job.

## Act V — Inward: Parker Solar Probe (4:15–5:30)

### Scene 10 · Why the Sun is hard to reach · 4:15–4:45 (30 s)
- **Purpose:** the counterintuitive turn. Everything launched from Earth already moves sideways around the Sun at about 30 km/s, so a probe aimed at the Sun misses (C13, C14). To fall in, you must *lose* sideways speed.
- **Viewer sees:**
  1. The Sun and Earth on its orbit, with a long amber sideways arrow on Earth (C13).
  2. A probe launches "straight at the Sun" with a short inward arrow. Its real path (cyan) curves into an ellipse and swings past the Sun at a distance, missing. A dashed straight line shows where it was "aimed".
  3. The big sideways arrow then shrinks step by step while the ellipse's inner point creeps toward the Sun: "lose sideways speed to fall closer" (C14).
- **Camera:** static, Sun-centred.
- **Labels:** "Earth: ~30 km/s sideways (rel. Sun)" (C13), "aimed here" (dashed), "actually goes here".
- **Optional line** (only with its qualifier, C17): "measured in speed change: ~12 km/s to leave the Solar System, ~30 km/s to fall into the Sun". **Consider cutting it for pace.**
- **2D Remotion:** yes (`OrbitPath` ellipses, `VectorArrow`).

### Scene 11 · Seven Venus flybys · 4:45–5:15 (30 s)
- **Purpose:** Parker uses the Act III brake, passing Venus so that each flyby **removes** orbital energy relative to the Sun (C31, C15).
- **Viewer sees:**
  1. A Sun-centred view with Venus's orbit.
  2. Parker's **first** orbit (dashed, wide) and its **final** orbit (solid, tight). The inner point of the final orbit sits much closer to the Sun.
  3. A morph carries the first orbit into the final one over the scene. A timeline strip under the diagram carries seven small Venus ticks, the last at 6 Nov 2024 (C31). The ticks are spaced along the timeline only; they **don't** drive equal steps in the orbit.
  4. A single "orbital energy rel. Sun" bar falls across the whole morph to show the **cumulative** reduction. There are no per-flyby step-downs and no repeated identical brake insets.
- **Camera:** static, a slight push-in toward the final orbit's inner point.
- **Labels:** "first orbit", "final orbit"; "7 Venus flybys · last 6 Nov 2024"; "orbital energy rel. Sun ↓ (total)"; "needed to shed ~53,000 mph sideways" (C15).
- **Guardrail:** Venus never "boosts" or "slings" Parker. The only energy graphic goes **down**.
- **2D Remotion:** yes. A two-ellipse interpolation plus a timeline strip. The strip carries no launch year, because the launch date isn't in the claims list.

### Scene 12 · Fastest by slowing down · 5:15–5:30 (15 s)
- **Purpose:** the irony that resolves Act V. Having lost orbital energy, Parker falls deep toward the Sun, and *that* fall makes it the fastest human-made object (C32, C33).
- **Viewer sees:** the final tight ellipse. The cyan dot accelerates sharply along the inner arc, and a speed readout climbs to the record at closest approach, then eases as the dot swings back out.
- **Camera:** a quick push to the closest-approach point, hold, ease out.
- **Labels:** "24 Dec 2024"; "≈ 6.1 million km from the Sun's surface"; "≈ 690,000 km/h rel. Sun" (C32; NASA gives miles, the km values are our conversion); "fastest human-made object" (C32).
- **2D Remotion:** yes.

## Act VI — Close (5:30–6:10)

### Scene 13 · The whole picture · 5:30–5:55 (25 s)
- **Purpose:** the reusable model in three beats: change your view, borrow the planet's motion, aim decides add or subtract (C01, C02, C04, C08).
- **Viewer sees:** three tiles that build left to right, each a miniature of an earlier scene:
  1. Scene 5's frame switch, captioned "change the view".
  2. Scene 7's energy balance, captioned "borrow, don't create".
  3. Scene 8's split, captioned "behind = faster, in front = slower".
- **Camera:** static grid. Each tile animates once, then holds.
- **Labels:** the three captions only.
- **2D Remotion:** yes (reuses earlier scene compositions at small scale, `StepDiagram` layout).

### Scene 14 · Where it leaves us · 5:55–6:10 (15 s)
- **Purpose:** an emotional close, returning to Voyager.
- **Viewer sees:** a slow pull-out from the solar system to the star field. Voyager 1's path extends off-frame with a light-travel ring expanding from Earth toward it.
- **Camera:** one slow pull-out, then fade.
- **Labels:** "Voyager 1 · one light-day from Earth · 18 Nov 2026" (C30).
- **Tense:** if published **before** 18 Nov 2026, the line must be future tense ("reaches… on"). If it is published after, NASA confirmation must be re-checked first.
- **2D Remotion:** yes (`SignalPath` ring, used once).

---

## Timing summary

| Act | Scenes | Time |
|---|---|---|
| I · The puzzle | 1–2 | 0:35 |
| II · The reference-frame reveal | 3–7 | 2:25 |
| III · Aim decides everything | 8 | 0:25 |
| IV · Outward: Voyager | 9 | 0:50 |
| V · Inward: Parker | 10–12 | 1:15 |
| VI · Close | 13–14 | 0:40 |
| **Total** | 14 scenes | **≈ 6:10** |

Narration drives final timing (the workflow rule), so expect ±30 s once takes are recorded.

## Production practicality

- **Every scene is practical in 2D Remotion.**
- **Planned components** (not built; they need building at the animation stage and adding to `docs/component-inventory.md`):
  - `OrbitPath` (ellipse and hyperbola from parameters, body position by frame).
  - `VectorArrow` (labelled arrow, rotate, tip-to-tail add).
  - `FrameSwitch` (blend between planet-relative and Sun-relative paths, plus the frame badge).
- **Reused as they are:** `ScaleIndicator`, `TextReveal`, `CameraFrame`, `Callout`, `StepDiagram`, `SignalPath` (Scene 14 only), `Captions`, `timing.ts`.
- **Highest-risk scenes:** 5 and 6, where the reveal must read in one viewing. Prototype these first.
- **3D:** none required.

## Scope decisions

- **BepiColombo: left out of the long-form.** Parker already carries the inward example, and a third mission would slow Act V. Its orbit insertion (scheduled 21 Nov 2026) has also not happened yet. It stays available as a standalone Short (C34–C39, future tense only).
- **Cut for pace:** the train-and-ball analogy, Grand Tour programme history, Flandro, the Oberth effect, angular-momentum terminology, and any Voyager speed-gain number.

## Critical open items (only these)

1. **Scene 14 tense depends on the publish date** relative to 18 Nov 2026 (C30, a NASA projection).
2. **C17 (the "12 vs 30 km/s" comparison) is our own derivation** from NASA data. Keep it only with its qualifier, or cut it (it's flagged optional in Scene 10).
3. **Scene 12's km figures are conversions** of NASA's mile values. Write them into the claims list at script stage so the numbers trace.
