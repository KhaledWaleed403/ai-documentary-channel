# Visual Plan v1 — *The Hidden Machines That Keep a Submarine Crew Alive*

Companion to [script-v1.md](script-v1.md). This is a planning document: no assets have been generated or rendered. Component names refer to `docs/component-inventory.md`.

## Look and rules

- **Palette:** near-black navy background. **Cyan** means systems working, air, signals and "solved". **Amber** means heat, CO₂, the primary loop and warnings. Neutral grey-blue is used for structure. One accent dominates per scene.
- **Typography:** clean technical labels with a thin leader line (`Callout`). Minimum on-screen text is about 28 px at 1080p, so labels stay legible on phones, and there are never more than 3 labels at once.
- **Honesty labels:** every cutaway, ruler or wave diagram that could be read literally carries **"Illustrative · not to scale"**. The hero boat is always tagged "Nuclear-powered (illustrative)". There are no class-specific shapes (hull, fin, propulsor) unless a figure is class-specific.
- **No decorative footage:** every shot shows the mechanism under discussion. There are no generic ocean B-roll or "cool sub" beauty passes; ocean texture is only ever a background gradient plus particles.
- **Motion:** `useCurrentFrame()` / `interpolate` / `spring` only (no CSS transitions). One idea changes per beat.

## Master assets (build once, reuse everywhere)

| Asset | Description | Used in | Reuse |
|---|---|---|---|
| **A1 · Master cutaway sub** (SVG, 16:9 side view) | Generic attack-sub silhouette with separable layers: outer fairing, inner pressure hull, compartments, air loop path, reactor compartment, a slot for each machine (scrubber, electrolyser, burner, filter, analyser, nav computer, antenna). Every layer is individually revealable. | Scenes 1–12 | All Shorts (vertical crop) |
| **A2 · Threat checklist HUD** | Seven rows (Pressure, Air, Contaminants, Position, Stealth, Contact, Power) with lock, active and solved states. Built on `StepDiagram`. | Scenes 2–12 | Shorts as a 1-row badge |
| **A3 · Gas gauge pair** | Vertical O₂ (cyan) and CO₂ (amber) gauges with independent tracks, plus an optional band shading. | Scenes 4, 5, 6 | Shorts 1, 4 |
| **A4 · Ocean column** | Vertical gradient water column with a surface line and particle drift; slots for a depth ruler (`ScaleIndicator`) and wave bands. | Scenes 3, 7, 9 | Shorts 2, 3, 5 |
| **A5 · Molecule set** | H₂O, O₂, H₂, CO₂ and CO glyphs in simple ball style, colour-coded and consistent everywhere. | Scenes 4–6 | Shorts 1, 4 |
| **A6 · Wave/ring generator** | `SignalPath`-based ring and wave family with per-family wavelength, decay and colour props. | Scenes 8, 9 | Shorts 3, 7 |
| **A7 · Loop diagram kit** | Closed-loop pipes with flowing particles, plus heat-exchanger and turbine blocks. | Scenes 4 (scrubber), 10 (reactor) | — |

**New components** to add to `docs/component-inventory.md` when built:
- `ThreatChecklist` (A2)
- `GasGauge` (A3)
- `WaveBand` / ring family (A6, if it ends up generalised beyond `SignalPath`)
- `LoopDiagram` (A7)

## Scene-by-scene

| Scene | Duration | Key visual (the mechanism shown) | Assets | Motion | Labels / honesty notes | Cost |
|---|---|---|---|---|---|---|
| 1 Hatch | 19 s | Hatch wheel seals; boat slides under; exhale particles start accumulating | Hatch close-up (new, simple SVG), A1, A5 (CO₂) | `CameraFrame` push-in; particle spawn | "145 crew — US Virginia-class" | Low |
| 2 Sealed world | 30 s | Closed air loop drawn through the hull; outside-air arrow blocked at the hull | A1, A2, `SignalPath` | Pull-back; loop draw-on; checklist build | "Nuclear-powered (illustrative)", "Closed-loop air while submerged", "Avg 77 days at sea — US SSBNs" | Low |
| 3 Squeeze | 42 s | Depth ruler with +1 atm per 10 m; arrows close on the hull; cross-section with inner pressure hull and ring frames | A4, `ScaleIndicator`, A1 cross-section (new layer), `ComponentCutaway` | Descent; arrows scale; ring frames light in sequence; 20° rotation | "+1 atm ≈ every 10 m (33 ft) — NOAA", "No real depth shown", "Illustrative · not to scale" | Medium (cross-section drawing) |
| 4 Two air problems | 84 s | (A) two independent gauges; (B) two-phase amine scrubber: absorb → heat → release → compress overboard; (C) measured band | A3, A5, A7 (scrubber variant), CO₂-pooling inset box | Parallel gauge motion; heat glow by `interpolate`; particle stick/release | "Two problems, two machines", "Amine scrubber (classic design)", "Measured avg 3,500–4,100 ppm · US nuclear subs · data reported 2003" | Medium |
| 5 Splitting water | 42 s | Electrolyser block: 2 H₂O → O₂ + 2 H₂; O₂ to cabin, H₂ out through the hull; O₂ gauge into green band; candle icon | A5, A3, A1 slot | Molecule split with correct 2:1 bubble counts; `Callout`s | "Hydrogen → sea (US subs)"; generic water feed (no "seawater"/"purified" label); no flame | Low-medium |
| 6 Cleaners | 41 s | Burner (CO + H₂ in, neutral out); charcoal filter capturing vapour; HUD tiles for O₂/CO₂/H₂/CO/H₂O + temp/RH | A1 slots, HUD tiles (new, simple), A5 | `ComponentCutaway` reveals; tiles tick on; **no alarm event** | "Design target ≈ 80°F (27°C) · 50% RH — US attack sub living spaces (NRC 2007)" | Low |
| 6b Fresh water (optional) | 20 s | Low-pressure evaporator → condenser → tank; brine overboard | New simple schematic | Vapour rise/condense | "Classic method — US Navy, 1955", "Present-day methods not shown" | Low (cut by default) |
| 7 No GPS | 62 s | Top-down nav: GPS beams dissolve at the surface; path built from gyro/accel glyphs; widening uncertainty cone; fix via near-surface GPS or seafloor match snaps the cone small | A4 (surface), nav map layer (new), `SignalPath` | Path draw; cone growth on a non-numeric curve; two fix examples | "Uncertainty grows (schematic, not to scale)", "Position fix (examples)" | Medium |
| 8 Sound | 51 s | Boat beside a football-field outline (approximate, field length not labelled); long-wave rings travel far, short ones fade; hull section: anechoic layer weakens the echo, decoupling layer damps outgoing vibration | A1 silhouette, A6, hull-section close-up (new) | Ring families with different decay; split screen | "377 ft — US Virginia-class", "Anechoic: weaker echo", "Decoupling: less radiated noise", "Illustrative" | Medium |
| 9 Contact | 60 s | Ocean column: VLF fades in a shallow band; antenna rises into the band; ELF historical card with deeper long waves; reply link to a satellite near the surface | A4, A6, A1 antenna slot, satellite icon | Frequency-dependent fade; character-by-character code (stylised); `TextReveal` card | "VLF: tens of feet (US Navy, 2001)", "ELF ≈ 76 Hz · hundreds of feet · one-way, slow · shut down 2004", "Illustrative · not to scale", **no numeric depths** | Medium |
| 10 Heart | 42 s | Reactor compartment schematic: amber primary loop → heat exchanger → cyan secondary loop/steam → turbine → power bus to every system | A7, A1, A2 (Power row) | Loop particle flow (primary never crosses); staggered bus fan-out | "Primary loop (sealed)", "Secondary loop → steam", "Schematic", "Core endurance ~62,000 mi → 1,000,000+ mi (NNSA)"; **no core internals** | Medium |
| 11 Clock | 39 s | All rows cyan; three gauges: food stores draining, maintenance calendar ring (77 → 35), crew Blue/Gold blocks; pier-loading inset | A2, A3 variant, calendar ring (new, simple), crate icons | Synchronized gauge motion | "Almost never resupplied at sea (NRC, 1996)", "US SSBNs: avg 77 days at sea / 35 in port · two crews" | Low |
| 12 Chain | 25 s | Sequential blink along the system chain; hatch from inside | A1, A2, hatch asset | Reverse camera move; fade to black | Title card | Low |

## Disproportionate-cost risks and mitigations

| Risk | Mitigation |
|---|---|
| Realistic water, caustics or ocean beauty shots | Never needed; gradient plus particles only (A4). |
| Detailed reactor or core internals | Out of scope; keep the A7 schematic (loops, exchanger, turbine). |
| Accurate class-specific hull geometry | The generic silhouette avoids it; class figures appear in labels only. |
| Animated crew figures | Use counters, icons and Blue/Gold blocks only. No character animation. |
| Seafloor-matching map (Scene 7) | A single contour line sliding over a reference contour; no terrain render. |

## Reuse into Shorts (9:16)

- Re-frame A1 vertically: crop the relevant compartment and keep the "Nuclear-powered (illustrative)" tag.
- Reuse the A3, A5, A6 and A7 diagrams at a larger scale, with only 1–2 labels per frame.
- Burned-in captions via the `Captions` component, plus a `.srt` file for each Short (channel rule).
- The checklist becomes a single-row badge (e.g. "AIR · solved") as a series identity cue.

## Production complexity

**Medium overall.** About 60% of screen time reuses A1–A7 plus existing components (`SignalPath`, `ComponentCutaway`, `StepDiagram`, `ScaleIndicator`, `Callout`, `CameraFrame`, `TextReveal`, `Captions`). New drawing work is concentrated in:
- the A1 master cutaway (largest single asset);
- the Scene 3 cross-section;
- the Scene 7 nav layer;
- the Scene 8 hull section.
