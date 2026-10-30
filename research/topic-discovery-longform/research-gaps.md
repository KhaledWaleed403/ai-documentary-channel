# Research Gaps — Submarine Long-Form

Status after the v2 gap-resolution pass (2026-10-29). Claim IDs refer to [claims.md](claims.md).

## Outcome of the 10 gaps from v1

| # | Gap | Result | Status now |
|---|---|---|---|
| 1 | CO₂ thresholds in the NRC report | Read directly from the OpenBook text: pp. 47, 60 (Table 3-3), 61, plus the EEGL/CEGL definitions in Ch. 1. The measured averages (3,500 / 4,100 ppm) and the guidance ceilings (5,000 / 7,000 / 8,000 ppm for 90 days; 25,000–40,000 ppm emergency) are now separated. | **Resolved** (CO2-03, -04, -08) |
| 2 | VLF/ELF depth limits | US Navy ELF fact sheet (2001) [read]: VLF ~20 kHz reaches "tens of feet"; ELF ~76 Hz reaches "hundreds of feet" at operational speed; ELF is one-way and slow. A 1993 peer-reviewed paper [read] gives VLF 8–10 m. Consistent. | **Resolved** (COM-02, -04, -05, -07, -09) |
| 3 | Fresh-water production | US Navy NavPers 16170 (rev. 1955) [read]: nuclear-steam-plant subs used a low-pressure, two-effect steam distiller (Soloshell), with brine pumped overboard; non-nuclear subs used electric vapour-compression distillers. **No source found for current classes.** | **Partly resolved** (H2O-01/02 qualified) |
| 4 | Hull mechanics | A peer-reviewed abstract describes the hull as a ring-stiffened cylinder under external pressure, designed against yielding and buckling (via fetch). DTIC report blocked. "Hoop stress" / "evenly" wording dropped. | **Qualified**; safe wording adopted (PRES-02) |
| 5 | Archived reactor page | Could not be opened (certificate failure; archive.org blocked). Replaced by the Naval Nuclear Propulsion Program's NT-26-2 (May 2026) [read]: closed reactor loop → isolated secondary steam system. The turbine detail remains search-only. | **Resolved** for the two loops (PWR-02); turbines qualified (PWR-02b) |
| 6 | Hydrogen disposal | NRC 2007 [read]: "The hydrogen that is generated in the process is discharged to the sea." Current Collins PEM units: no statement. | **Resolved for US-2007** (O2-02); current units unconfirmed |
| 7 | Humidity and temperature | NRC 2007 [read]: forward compartment designed to 80°F / 50% RH; engine room below 100°F. | **Resolved** (ATM-03) |
| 8 | Coatings and isolation mounts | Coatings: Audoly 2012 abstract [read] (anechoic → target strength; decoupling → radiated noise). Mounts: only ship-general or search-only sources. | Coatings **resolved** (SND-03); mounts **omit** (SND-04) |
| 9 | 1996 NRC waste chapter | Read from page scans (pp. 41–43): weighted cans and the TDU; overboard discharge pumped or blown; disposal affects detectability; **subs almost never resupplied at sea**. | **Resolved** (WASTE-01–03, FOOD-01 new) |
| 10 | Royal Navy patrol record | Press and specialist sites only; no MoD or Royal Navy page found. | **Omit** (END-04) |

## Remaining unresolved or weak claims

| Claim | Why it matters | Recommendation |
|---|---|---|
| **H2O-01/02** — current fresh-water method and capacity | It's the only life-support system shown with a historical-only source. Viewers may assume 1955 practice is current. | **Qualify.** Use only as the optional Ch. 4 insert with explicit historical framing, or **omit**. Verify later if a NAVSEA or Naval Engineers Journal source turns up. |
| **O2-04** — electrolyser feed water (seawater vs purified) | NRC 2007 says "seawater"; the RN paper says demineralised water. Showing the wrong feed would misrepresent the engineering. | **Qualify.** Say "splits water" and show a generic internal water line. |
| **O2-02 (current units)** — hydrogen handling on today's PEM electrolysers | The US-2007 description may predate current equipment. | **Qualify.** "On US subs, the hydrogen is sent into the sea", attributed. Don't claim universality. |
| **PRES-02** — hull mechanics (abstract [via fetch] only) | It underpins Ch. 1 and Short 5. | **Qualify.** Use the safe wording only (round tube, ring frames, designed against buckling). No "hoop stress", no depth, no failure animation. |
| **PWR-02b** — steam drives propulsion turbines and turbo-generators | Detailed turbine depiction; the source page wasn't opened, and Columbia uses electric drive. | **Qualify.** Generic "steam spins turbines that make electricity and help drive the boat". |
| **PWR-04** — life-of-ship reactors | Secondary/analytical source. | **Omit** in favour of PWR-05 (NNSA, read). |
| **COM-06** — 2004 ELF shutdown date | The Navy press release was seen only via search; the date comes from a secondary source [read]. | **Qualify** ("until 2004"), or omit the date. |
| **COM-08** — airborne relay (TACAMO) | Navy fact file seen via search only. | **Omit** (optional detail). |
| **NAV-05** — position-fix methods | DARPA [via fetch]; bathymetric fix only via a patent [via search]. | **Qualify** as examples ("for example…"); no technical detail. |
| **SND-04** — machinery isolation mounts | No submarine-specific source inspected. | **Omit.** |
| **SND-05** — crew noise discipline | No source. | **Omit.** |
| **O2-03 / O2-05 / CO2-06** — candles, O₂ band, soda lime | RN historical source only. | **Qualify** ("a traditional backup") or omit. Keep the O₂ meter qualitative. |
| **END-04** — 200+ day Royal Navy patrols | No official source. | **Omit.** |
| **CO2-08 (current values)** — limits the Navy adopted after 2007 | The 2007 report shows "current" and "proposed" values only. | **Qualify** ("as reviewed in 2007"), or don't show limits. |

## Verdict

**SCRIPT-READY, conditionally.** Every chapter of the revised outline (cold open through ending) and Shorts #1, #2, #3, #4, #5, #7 and #8 can be scripted from VERIFIED or QUALIFIED claims using the *Safe wording* in claims.md. No remaining gap sits on the spine of the story.

**Conditions, which are not blockers:**
1. Use only the claims.md *Safe wording*. Every on-screen number must come from a **[read]** source.
2. Leave out the claims marked **Omit** above (SND-04, SND-05, END-04, PWR-04, COM-08).
3. The fresh-water insert (Ch. 4 optional) and Short #6 are **not** script-ready as current-practice claims. Use the historical framing, or cut them.
4. Present the CO₂ limit values (if shown at all) as 2007-era guidance, and the measured CO₂ averages as 2003 US data.
