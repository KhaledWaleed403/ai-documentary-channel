# Candidate Pool — Long-Form Topic Discovery

Research date: 2026-10-29. Started from scratch (no reuse of earlier rankings, the dam-to-outlet idea, or the microwave episode).

## Method and tools actually used

- **YouTube public pages via the in-app browser.** Search result pages with YouTube's own upload-date filters (this month / this year) and sort-by-views, plus channel `/videos` tabs and individual watch pages. Numbers were read from the page data YouTube serves (`ytInitialData` / `ytInitialPlayerResponse`): title, channel, views, relative age, exact publish date (watch pages only), duration, subscriber count.
- **Web search** for primary-source checks on whether the leading topic can be fact-checked.
- **Not used:** vidIQ (per instructions), paid tools, Google Trends (no free, scriptable access gave meaningful numbers in this session, so **search volume and search growth are unavailable** for every candidate below).
- **Limits.** View counts are snapshots taken on 2026-10-29. Exact publish dates were pulled only for key videos; elsewhere the age is YouTube's relative label ("3w ago"). No view-velocity history or daily views exist in public pages, so velocity is **estimated** as views divided by age, and labelled as an estimate wherever it appears. Search results are personalised and US-located, so they are a sample, not a census.

## Screening criteria

1. **Pass:** a specific, explainable mechanism with at least one long-form video (>3 min) above its channel's norm in roughly the last 90 days.
2. **Hold:** some evidence, but it is only Shorts, only big brands, older than 90 days, or a single anomaly.
3. **Reject:** no recent breakout found, off-brand (weapons, politics, finance), news-dependent, or unworkable for animation.

## Pool (34 candidates)

| # | Candidate | Category | Screening result | Reason |
|---|---|---|---|---|
| 1 | How a submarine keeps its crew alive (air, water, pressure, navigation, silence, comms) | Engineering / hidden systems | **Pass → finalist** | 4+ independent channels broke out on submarine mechanisms in the last 90 days, two of them small (see competitor-evidence). |
| 2 | How general anaesthesia switches off consciousness | Body / brain | **Pass → finalist** | 5+ independent creators, including a 2.5K-sub doctor at 536K and 273K views. |
| 3 | What happens inside an AI chip when you ask a question | Invisible digital systems | **Pass** | A 9.6K-sub channel (Silicon Up Close) has 4 videos at 147K–919K. Generic CPU/GPU explainers are saturated. |
| 4 | Digestion: the full journey of a meal | Body | **Pass** | Two independent 3D-anatomy channels: 764K and 332K in ≤1 month. |
| 5 | Why we dream / why we forget dreams | Brain | **Pass** | Many recent winners (4.0M, 2.1M, 569K), but mostly talk/essay formats; the mechanism is uncertain. |
| 6 | Undersea internet cables / fiber optics | Infrastructure | **Pass (risky)** | Veritasium 13.9M and Business Insider 5.1M, but demand is entangled with a live news story (Strait of Hormuz cable threats). |
| 7 | How a painkiller "knows" where it hurts | Body / pharmacology | **Pass** | 7.8M in ~3 weeks on a 362K-sub channel, but at 2:08 it is closer to Short behaviour. |
| 8 | Hidden engineering of household water-pressure regulators | Household systems | **Pass** | Practical Engineering 1.9M. Only one big-brand data point. |
| 9 | How tap-to-pay works | Everyday digital | **Pass** | Branch Education 738K (big brand). History of Simple Things 48K is near its baseline. |
| 10 | How a plane works / how wings lift | Transport | **Pass** | Exploded Works (2.2K subs) 259K. Several 37–72K examples; lift is heavily covered. |
| 11 | Road-safety engineering (guardrails, rumble strips, breakaway poles) | Infrastructure | Hold | Mildly Elsewhere (26.8K subs) 205K. Single example; the follow-up did 3.5K in 12 h. |
| 12 | How an automatic transmission / torque converter works | Machines | Hold | Sleek Learning (691 subs) 85K and 57K. Strong outlier but narrow car-enthusiast appeal. |
| 13 | How a CPU works | Digital | Reject | Saturated: dozens of near-identical 2026 explainers at under 1K views. The winners use a specific frame, which is #3. |
| 14 | How chips are made (sand to silicon) | Industry | Reject | Dominated by Veritasium (64.7M, 9 mo) and Business Insider. Recent small entrants get under 1K. |
| 15 | How phone cameras got so good | Everyday tech | Hold | Silicon Up Close 234K; only one creator. |
| 16 | How GPS knows where you are | Everyday digital | Reject | Recent examples weak (History of Simple Things 4.4K, below its norm). |
| 17 | How the electricity grid / house wiring works | Infrastructure | Hold | ResCom 172K (3:38, 3 mo); Practical Engineering outlets 1.5M. No small-channel long-form pattern. |
| 18 | How water treatment works | Infrastructure | Reject | No recent video ≥20K found. |
| 19 | How sewage systems work | Infrastructure | Reject | No recent video ≥20K found. |
| 20 | How a refrigerator works | Household | Reject | No recent video ≥20K found. |
| 21 | How lightning works | Nature | Reject | No recent video ≥20K found. |
| 22 | Noise-cancelling headphones | Everyday tech | Reject | Only an Apple product video; no explainer breakouts. |
| 23 | How an MRI sees inside you | Medical tech | Hold | 1.06M, but it is a Hindi-language video. No English pattern found. |
| 24 | What happens to your body without sleep | Body | Hold | Timebound 84K; mostly Shorts and listicles. |
| 25 | How a stroke damages the brain | Body | Hold | Demystifying Science 1.1M (4:07). Medical-advice sensitivity is high. |
| 26 | Consciousness experiments | Brain | Hold | New Scientist 858K (big brand). Abstract and hard to animate as a mechanism. Folded into #2. |
| 27 | How one-day shipping works | Logistics | Hold | Beyond Sky 155K, which is below its own aviation baseline. |
| 28 | How radar / stealth works | Defense tech | Reject | Second Order Science radar jamming 411K is 6 months old. Off-brand (weapons). |
| 29 | How torpedoes work | Weapons | Reject | AiTelly 343K, but weapons content is off-brand and riskier for monetisation. |
| 30 | How bitcoin mining works | Finance tech | Reject | 204K, but finance-adjacent and off-brand. |
| 31 | How a nuclear reactor works | Energy | Hold | Recent evidence only appears inside the submarine cluster. Folded into #1 as one chapter. |
| 32 | How elevators work | Household / buildings | Reject | Recent examples only at ~100 views. |
| 33 | How AI image generation works | Digital | Hold | Silicon Up Close 19K, below that channel's norm. |
| 34 | Pancreas / liver / organ explainers | Body | Reject | Xavork 142K / 17K. Organ-by-organ anatomy is a catalogue with no central mystery. |

## Narrowing summary

- 34 → 12 pass/hold → **10 ranked** (topic-ranking.md) → **2 finalists** (submarine life support, anaesthesia) → **1 recommendation** (submarine life support).
- Main reasons for rejection: no recent evidence (water, sewage, fridge, lightning, elevators), saturation by near-identical explainers (CPU, chipmaking, generic "how submarines stay underwater" Shorts), or off-brand subjects (weapons, finance).
