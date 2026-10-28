# Episode 001 Long-Form — Storyboard

Long-form · 1920×1080 · 30 fps · **12979 frames (7:12.6)** · approved 2026-10-28, retimed to the generated narration the same day.
Source of truth for narration: `script.md` v2.1 (approved). Narration blocks below are copied verbatim, one script paragraph per shot. Each shot is one Kokoro snippet. Machine-readable version: `storyboard.json`. Asset and cue breakdown: `shot-asset-breakdown.md`. Claim IDs: `research/episode-001/long-v1/claims.md`.

## How to read this
- **Timing** comes from the measured narration takes (`assets/audio/vo/manifest.json`). Each shot = lead-in (`offsetFrames`, 6 frames unless noted) + the take's measured speech end + the approved visual tail. Nothing is padded to hit a number.
- **Frames** are absolute (30 fps). Times are `m:ss.s`. Timed visual and sound items use absolute frames too.
- **Sound:** sound effects only. **No music** (not approved). Narration-relative levels follow the `luminexplain-sound` rules: effects under speech sit 10–18 dB below the voice and out of 2–4 kHz, prominent cues go in narration gaps, and most transitions are silent (the Short's v2.1 lesson). 'Reuse' means a read-only copy of a Short asset into `long-v1/assets/audio/` under a new `lf-` name. The Short's files are never moved or edited.
- **Colour roles:** teal = waves/electric field · orange = heating · gold = hot / highlight · mist blue = cold · ivory = 1940s paper layers only. Backgrounds are ink navy throughout. Heat is shown only as colour and a thermometer, never as particles.

## Scene overview

| Scene | Frames | Time | Length | Target | Shots |
| --- | --- | --- | --- | --- | --- |
| 1 · The melted pocket | 0–1001 | 0:00.0–0:33.4 | 33.4 s | 37 s | S1-01…S1-03 (3) |
| 2 · Popcorn, an egg and a box | 1001–2723 | 0:33.4–1:30.8 | 57.4 s | 54 s | S2-01…S2-06 (6) |
| 3 · From restaurant giant to countertop | 2723–4193 | 1:30.8–2:19.8 | 49.0 s | 50 s | S3-01…S3-05 (5) |
| 4 · Press Start | 4193–7561 | 2:19.8–4:12.0 | 112.3 s | 114 s | S4-01…S4-07 (7) |
| 5 · The candy bar returns | 7561–9486 | 4:12.0–5:16.2 | 64.2 s | 68 s | S5-01…S5-05 (5) |
| 6 · Hot plate, cold bite | 9486–11777 | 5:16.2–6:32.6 | 76.4 s | 84 s | S6-01…S6-05 (5) |
| 7 · Payoff | 11777–12979 | 6:32.6–7:12.6 | 40.1 s | 42 s | S7-01…S7-03 (3) |
| **Total** | 0–12979 | | **7:12.6** | 7:29 | 34 |

---

## Scene 1 · The melted pocket · 0:00.0–0:33.4 (33.4 s)

**Purpose:** Hook: the mystery, then the three questions the film answers.

**Scientific accuracy — risks and how the visuals avoid them**
- Magnetron drawn as a labelled schematic block with no invented internals.
- Ripples from the magnetron are dashed and labelled conceptual: they mean 'invisible waves', not the real field shape or range.
- The wrapper is plain, with no brand and no chocolate visible (D01).
- The melting stays undramatic: a soft sag, no smoke or glow on the body. This avoids implying a dangerous beam or burning.

### S1-01 · The pocket
**Frames 0–294** (0:00.0–0:09.8, 9.8 s) · speech 36–288 (22 words, take `s1-01-take01.wav`, speech ends at 8.41 s) · lead-in 36 f · tail 0.2 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Sometime in the mid-nineteen-forties, an engineer named Percy Spencer reached into his pocket and found a mess. His candy bar had melted.

**Camera:** Slow push-in (scale 1.0 → 1.12) on the pocket, over the whole shot.  
**Visual:** Cold open from black (fade 0 → 1 over 0.8 s). Blueprint line art of a lab-coat pocket with a faint ivory paper grain. A hand lifts out a plain wrapped bar that sags softly, its ends drooping as it clears the pocket.

| Frame | Visual beat |
| --- | --- |
| 0 (0:00.0) | Fade up from black on the pocket |
| 96 (0:03.2) | Hand enters frame |
| 246 (0:08.2) | The bar clears the pocket and sags on 'melted' |

**On-screen text:** —  
**Transition out:** Hard cut on the sag to the wider shot (match on the bar's position).  
**Components:** CameraFrame (new)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 9 (0:00.3) | Soft cloth rustle as the hand moves in the pocket | new | Foley, CC0: lab-coat fabric rustle | starts before speech, continues under it at −14 dB |
| 249 (0:08.3) | Faint soft-wrapper crinkle as the bar sags | new | Foley, CC0: soft candy-wrapper crinkle (no crisp foil) | on the visual sag, −12 dB |

**Assets:** reuse — theme.ts palette; timing.ts easing · new — Pocket and hand line art; Plain wrapped candy bar with sag states  
**Claims:** L01, L03, L04

### S1-02 · Next to a magnetron
**Frames 294–584** (0:09.8–0:19.5, 9.7 s) · speech 300–572 (28 words, take `s1-02-take01.wav`, speech ends at 9.05 s) · lead-in 6 f · tail 0.4 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> That wouldn't be strange — except for where he'd been standing. Right next to a magnetron: the heart of a radar set, the part that makes invisible waves.

**Camera:** Locked wide shot. A slow pull-back (scale 1.12 → 1.0) in the first 1.5 s reveals the bench.  
**Visual:** The engineer's silhouette stands beside a bench-sized tube-and-magnet assembly drawn as a glowing schematic block labelled 'magnetron'. Dashed teal ripples spread outward from the block, fading with distance, and pass the silhouette's pocket.

| Frame | Visual beat |
| --- | --- |
| 294 (0:09.8) | Pull back from the pocket to the silhouette |
| 372 (0:12.4) | The magnetron block glows on |
| 402 (0:13.4) | Dashed ripples begin, slow and continuous |

**On-screen text:** "magnetron"  
**Transition out:** The ripples continue under the question icons (no cut).  
**Components:** Callout, SignalPath (dashed variant)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 372 (0:12.4) | Low electrical hum fades in with the glow (a radar-era tube, not an oven) | new | Synth: low hum with audible 240–600 Hz harmonics (phone-safe), from the long-form generator | under narration, −15 dB, fades out by shot end |
| 402 (0:13.4) | Wave motif: emit, soft, panning with the ripple | reuse | sfx/wave-emit-v2.wav → long-v1 sfx/lf-wave-emit.wav | −14 dB under narration |

**Assets:** reuse — SignalPath; Callout · new — Engineer silhouette (no likeness); Magnetron schematic block (bench-scale)  
**Claims:** L01, L03

### S1-03 · Three questions + title
**Frames 584–1001** (0:19.5–0:33.4, 13.9 s) · speech 590–923 (41 words, take `s1-03-take01.wav`, speech ends at 11.11 s) · lead-in 6 f · tail 2.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> So how does a melted snack in a radar lab turn into the box on your kitchen counter? What actually happens when you press Start? And why does your food come out scalding in one spot and cold in the next?

**Camera:** Locked. On the title, a gentle 2 % push-in.  
**Visual:** Three small icons draw on in sequence, one per question: a radar dish → a kitchen microwave → a split plate (half orange, half mist blue). In the tail the icons fade and the title card rises. The teal ripple from S1-02 becomes the title's underline.

| Frame | Visual beat |
| --- | --- |
| 590 (0:19.7) | Radar dish icon draws on |
| 698 (0:23.3) | Microwave icon draws on |
| 788 (0:26.3) | Split-plate icon draws on |
| 929 (0:31.0) | Icons fade; title rises with TextReveal |
| 953 (0:31.8) | Ripple settles into the underline |

**On-screen text:** "How does a microwave actually heat food?"  
**Transition out:** Title fades to navy; cut to the history line (S2-01).  
**Components:** TextReveal, SignalPath

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 953 (0:31.8) | Wave motif: a single soft emit as the ripple becomes the underline (the title signature) | reuse | sfx/wave-emit-v2.wav (same copy as S1-02) | in the narration gap, −10 dB; tail faded by end |

**Assets:** reuse — TextReveal; SignalPath · new — Radar dish, microwave and split-plate icons; Title card layout (16:9)  
**Claims:** none (no factual statement)

---

## Scene 2 · Popcorn, an egg and a box · 0:33.4–1:30.8 (57.4 s)

**Purpose:** From accident to invention: curiosity, experiments, the decisive move, the patent's 'short waves' idea.

**Scientific accuracy — risks and how the visuals avoid them**
- Concentrating the energy is shown as a generic shielded chamber, not a reconstruction of a specific apparatus (L07: the metal box rests on IEEE alone).
- The egg explodes as a stylised freeze-frame with no bystander (L06; the colleague detail was cut).
- The wavelength ruler is to scale: ~10 cm against a potato-sized outline, and the earlier long waves are clearly much longer (L09).
- The 2,600/day counter is stated as wartime production output, not as microwave-oven numbers (L19).

### S2-01 · Who Spencer was
**Frames 1001–1473** (0:33.4–0:49.1, 15.7 s) · speech 1007–1461 (39 words, take `s2-01-take01.wav`, speech ends at 15.13 s) · lead-in 6 f · tail 0.4 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Spencer wasn't a typical scientist. He left school at about twelve, learned radio in the Navy, and taught himself most of the rest. During the war, his production methods helped Raytheon build radar magnetrons by the thousands every day.

**Camera:** Slow lateral pan left → right along the timeline line.  
**Visual:** A horizontal line with three vignettes that light in turn: a schoolhouse door ('about twelve'), a ship's radio key (Navy), a stack of books (self-taught). Then a conveyor of identical glowing magnetron blocks speeds up, with a counter ticking to '2,600 / day'.

| Frame | Visual beat |
| --- | --- |
| 1007 (0:33.6) | Line draws on |
| 1067 (0:35.6) | Schoolhouse vignette |
| 1127 (0:37.6) | Radio-key vignette |
| 1187 (0:39.6) | Books vignette |
| 1262 (0:42.1) | Conveyor and counter (runs to the end) |

**On-screen text:** "2,600 magnetrons / day"  
**Transition out:** The conveyor stops; one magnetron block slides forward into the lab bench (S2-02).  
**Components:** StepDiagram (new), Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 1262 (0:42.1) | Soft mechanism ticks keeping time with the conveyor, accelerating, about 6 ticks | new | Synth: mechanism clicks from the long-form generator | under narration, −15 dB |

**Assets:** reuse — Badge; timing.ts · new — Three vignette icons; Conveyor of magnetron blocks; Counter  
**Claims:** L02, L19

### S2-02 · He started testing
**Frames 1473–1612** (0:49.1–0:53.7, 4.6 s) · speech 1479–1603 (13 words, take `s2-02-take01.wav`, speech ends at 4.12 s) · lead-in 6 f · tail 0.3 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> So when his candy bar melted, he didn't just shrug. He started testing.

**Camera:** Locked medium shot of the lab bench.  
**Visual:** The bench: the magnetron block at left, the silhouette's hand placing a small dish at centre. The soft bar from Scene 1 sits on the bench edge as a continuity prop.

| Frame | Visual beat |
| --- | --- |
| 1485 (0:49.5) | Hand sets down the dish |

**On-screen text:** —  
**Transition out:** Continuous: same bench in S2-03.  
**Components:** —

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 1491 (0:49.7) | Small ceramic dish set down on the bench | new | Foley, CC0: small dish on a wooden bench | under narration, −14 dB |

**Assets:** reuse — none · new — Lab bench set  
**Claims:** L03

### S2-03 · Popcorn
**Frames 1612–1752** (0:53.7–0:58.4, 4.7 s) · speech 1618–1722 (10 words, take `s2-03-take01.wav`, speech ends at 3.47 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> He set some popcorn kernels near the magnetron. They popped.

**Camera:** Locked, with a slight 3 % push-in on the kernels.  
**Visual:** Kernels in the dish. Dashed teal ripples reach them, and after a beat they pop into white puffs, staggered, timed to land on and just after 'popped'.

| Frame | Visual beat |
| --- | --- |
| 1627 (0:54.2) | Ripples reach the kernels |
| 1713 (0:57.1) | First pop |
| 1725 (0:57.5) | Staggered pops continue through the tail |

**On-screen text:** —  
**Transition out:** Cut on the last pop.  
**Components:** SignalPath

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 1713 (0:57.1) | Popcorn pops (4–6, staggered with the visual pops) | new | Foley, CC0: individual popcorn pops (not a bag in a microwave) | first pop lands on 'popped', the rest follow after the line, −8 dB peak |

**Assets:** reuse — SignalPath · new — Kernel and popped-puff sprites  
**Claims:** L05

### S2-04 · The egg
**Frames 1752–1844** (0:58.4–1:01.5, 3.1 s) · speech 1758–1820 (6 words, take `s2-04-take01.wav`, speech ends at 2.07 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> He tried an egg. It exploded.

**Camera:** Locked. On the burst, a 2-frame scale bump (1.0 → 1.02 → 1.0).  
**Visual:** An egg wobbles in the dish (two small wobbles under 'He tried an egg'). On 'exploded' it bursts into a stylised cartoon splatter that freezes mid-air. Playful and bloodless, with no bystander.

| Frame | Visual beat |
| --- | --- |
| 1764 (0:58.8) | First wobble |
| 1782 (0:59.4) | Second wobble |
| 1814 (1:00.5) | Burst, then freeze-frame |

**On-screen text:** —  
**Transition out:** The freeze-frame dissolves into the concentrating shot.  
**Components:** —

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 1814 (1:00.5) | A soft, muffled 'pop' with a short wet tail | new | Foley, CC0: egg/wet burst, short; nothing gory | on the visual burst, −8 dB peak |

**Assets:** reuse — none · new — Egg with wobble and burst states  
**Claims:** L06

### S2-05 · Concentrating the energy
**Frames 1844–2145** (1:01.5–1:11.5, 10.0 s) · speech 1850–2115 (26 words, take `s2-05-take01.wav`, speech ends at 8.83 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Then came the step that mattered most. Instead of letting the energy spread out, he concentrated it into a small space. Food placed there heated fast.

**Camera:** Locked side-by-side composition: open space at left, chamber at right.  
**Visual:** Left: ripples leave the magnetron into open space and fade with distance. Right: the same ripples are funnelled into a small chamber in cross-section (a generic enclosure), reflect off its walls and build into a brighter teal fill. A food shape inside turns orange on 'heated fast'.

| Frame | Visual beat |
| --- | --- |
| 1850 (1:01.7) | Left: ripples spread and fade |
| 1940 (1:04.7) | Right: ripples funnel into the chamber |
| 1976 (1:05.9) | Reflections fill the chamber |
| 2091 (1:09.7) | Food shape warms orange |

**On-screen text:** "spread out" · "concentrated"  
**Transition out:** The chamber's outline flattens into the patent page's frame (S2-06).  
**Components:** SignalPath, Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 1976 (1:05.9) | Wave motif: reflect pings, 3 rising, on the first three wall bounces | reuse | sfx/wave-reflect-1/2/3-v2.wav → lf-wave-reflect-1/2/3.wav | under narration, −14 dB |
| 2115 (1:10.5) | Energy → heat motif: short warm swell as the food turns orange | reuse | sfx/heat-transition-v2.wav → lf-heat-swell-short.wav (trimmed copy) | in the gap, −10 dB |

**Assets:** reuse — SignalPath; Callout · new — Generic shielded chamber cross-section; Food shape  
**Claims:** L07

### S2-06 · The patent and short waves
**Frames 2145–2723** (1:11.5–1:30.8, 19.3 s) · speech 2151–2699 (47 words, take `s2-06-take01.wav`, speech ends at 18.28 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> In October, nineteen forty-five, Raytheon filed a patent for cooking food with microwaves. People had tried heating food with radio energy before, but with much longer waves. Spencer's idea was to go short — waves about ten centimeters long, close to the size of the food itself.

**Camera:** Locked. The patent page slides in from the right; then a slow 1.0 → 1.06 push-in on the ruler.  
**Visual:** An ivory patent page traced as line art from the public-domain figure of US 2,495,429, stamped 'Filed Oct. 8, 1945'. Below, a wavelength ruler: a long wave labelled 'earlier: much longer waves' spans the frame. Then a short ~10 cm wave lies beside a potato-sized outline.

| Frame | Visual beat |
| --- | --- |
| 2151 (1:11.7) | Patent page slides in |
| 2211 (1:13.7) | Filing date stamps on |
| 2316 (1:17.2) | Long wave draws across the frame |
| 2421 (1:20.7) | Short ~10 cm wave and potato outline |

**On-screen text:** "Patent filed Oct. 8, 1945" · "earlier: much longer waves" · "~10 cm"  
**Transition out:** The patent page folds down into the side of the tall first oven (match on shape) → S3-01.  
**Components:** SignalPath, Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 2151 (1:11.7) | Paper slide as the page enters | new | Foley, CC0: single sheet of paper sliding on a desk | under narration, −14 dB |
| 2211 (1:13.7) | Soft rubber-stamp thud on the date | new | Foley, CC0: rubber stamp on paper (same file reused in S4-06) | under narration, −12 dB |

**Assets:** reuse — SignalPath; Callout · new — Patent figure line art (trace from the public-domain US 2,495,429 drawing; source image still to be downloaded); Wavelength ruler; Potato outline  
**Claims:** L08, L09

---

## Scene 3 · From restaurant giant to countertop · 1:30.8–2:19.8 (49.0 s)

**Purpose:** The evolution through a few vivid comparisons: size, weight, restaurant against home.

**Scientific accuracy — risks and how the visuals avoid them**
- No price shown for the Radarange and no price ratio (L16 cut; D04).
- The cabinets are generic silhouettes, not copies of real Raytheon or Amana products.
- The four-adults balance is a scale comparison (L12, derived, for 300–340 kg). The balance settles level 'about' even, not with an exact readout.
- The adoption graphic shows only the verified late-1990s figure (L17). The 1986 figure is cut.
- The shared outline ('the idea inside') is magnetron + metal box only (L40). No claim of identical design.

### S3-01 · The Radarange
**Frames 2723–2914** (1:30.8–1:37.1, 6.4 s) · speech 2729–2896 (17 words, take `s3-01-take01.wav`, speech ends at 5.58 s) · lead-in 6 f · tail 0.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> A couple of years later, the first microwave oven went on sale. It was called the Radarange.

**Camera:** Low-angle reveal: tilt up from the base of the cabinet to its top (the only tilt in the film).  
**Visual:** The patent page folds into the side of a tall generic cabinet oven on a navy stage with a subtle floor line. A small ivory title card reads 'Radarange · c. 1947'.

| Frame | Visual beat |
| --- | --- |
| 2729 (1:31.0) | Fold transition completes |
| 2765 (1:32.2) | Tilt up |
| 2878 (1:35.9) | Title card |

**On-screen text:** "Radarange · c. 1947"  
**Transition out:** The tilt ends locked on the line-up composition (S3-02).  
**Components:** TextReveal, CameraFrame (new)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 2735 (1:31.2) | Heavy cabinet settling, a low wooden/metal thud with audible upper harmonics | new | Foley, CC0: heavy appliance set down | under narration, −12 dB |

**Assets:** reuse — TextReveal · new — Generic tall cabinet oven (1940s styling, no brand)  
**Claims:** L10

### S3-02 · Six feet, four adults, water, restaurants
**Frames 2914–3336** (1:37.1–1:51.2, 14.1 s) · speech 2920–3306 (39 words, take `s3-02-take01.wav`, speech ends at 12.86 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> It stood nearly six feet tall, and weighed about as much as four grown adults. Its magnetron needed water piped in to keep it cool. And it cost thousands of dollars — so it went to restaurants, not homes.

**Camera:** Locked line-up composition (fixed for all of Scene 3).  
**Visual:** A human silhouette stands beside the cabinet; a height bar draws to '≈ 1.8 m'. Four adult silhouettes step onto a balance opposite it, and it tips to about level. Thin teal pipes on the cabinet's side carry a flowing water texture. A restaurant awning fades in behind it, while a small house icon beside it stays dark.

| Frame | Visual beat |
| --- | --- |
| 2920 (1:37.3) | Height bar |
| 2992 (1:39.7) | Four adults step on; balance levels |
| 3076 (1:42.5) | Water flow in the pipes |
| 3160 (1:45.3) | Awning on; house icon stays dark |

**On-screen text:** "≈ 1.8 m"  
**Transition out:** A calendar strip slides in at the top (S3-03).  
**Components:** Callout, Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 3022 (1:40.7) | Balance beam settling: one dry mechanical click | new | Synth: mechanism click | under narration, −14 dB |
| 3076 (1:42.5) | A faint trickle of water in the pipes | new | Foley, CC0: thin water flow in a pipe, very low | under narration, −18 dB, 2 s |

**Assets:** reuse — Callout; Badge · new — Human and adult silhouettes; Balance; Cooling pipes with flow texture; Restaurant awning; House icon  
**Claims:** L11, L12, L13, L10

### S3-03 · 1967: a countertop for home kitchens
**Frames 3336–3796** (1:51.2–2:06.5, 15.3 s) · speech 3342–3760 (36 words, take `s3-03-take01.wav`, speech ends at 13.94 s) · lead-in 6 f · tail 1.2 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Twenty years later, in nineteen sixty-seven, a countertop model arrived for home kitchens. Four hundred and ninety-five dollars — still pricey, but no longer a restaurant machine. And small enough to sit next to a toaster.

**Camera:** Locked line-up.  
**Visual:** A calendar strip flicks forward to 1967 ('twenty years'). A countertop box drops in beside the giant at true relative scale (~40 cm vs ~180 cm), next to a toaster outline. Its tag swings in with '$495', and the house icon lights up warm. The giant has no price and there's no ratio.

| Frame | Visual beat |
| --- | --- |
| 3342 (1:51.4) | Calendar flicks |
| 3426 (1:54.2) | Countertop box drops in |
| 3474 (1:55.8) | '$495' tag |
| 3552 (1:58.4) | House icon lights |
| 3718 (2:03.9) | Toaster outline draws beside it |

**On-screen text:** "1967 · $495"  
**Transition out:** The house icon duplicates into a row of ten (S3-04).  
**Components:** Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 3342 (1:51.4) | Paper calendar flick (a few leaves) | new | Foley, CC0: calendar pages flipping | under narration, −14 dB |
| 3429 (1:54.3) | Light countertop set-down, smaller than the S3-01 thud | new | Foley, CC0: small appliance on countertop | under narration, −12 dB |

**Assets:** reuse — Badge · new — 1967 countertop oven (generic); Toaster outline; Calendar strip; Price tag  
**Claims:** L41, L15

### S3-04 · Nine in ten homes
**Frames 3796–4015** (2:06.5–2:13.8, 7.3 s) · speech 3802–3991 (19 words, take `s3-04-take01.wav`, speech ends at 6.3 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Even then, it took a while. But by the late nineties, about nine in ten American homes had one.

**Camera:** Locked.  
**Visual:** A row of ten house icons. Nine fill with warm light one after another under 'late 1990s', and one stays dark.

| Frame | Visual beat |
| --- | --- |
| 3838 (2:07.9) | Houses light in sequence over about 2.5 s |

**On-screen text:** "US homes, late 1990s: ~9 in 10"  
**Transition out:** The houses fade; the line-up remains (S3-05).  
**Components:** Badge

**Sound:** intentionally silent (narration only).

**Assets:** reuse — House icon (from S3-02) · new — none  
**Claims:** L17

### S3-05 · The idea inside
**Frames 4015–4193** (2:13.8–2:19.8, 5.9 s) · speech 4021–4163 (14 words, take `s3-05-take01.wav`, speech ends at 4.73 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> The machine shrank. The idea inside it stayed the same. So let's look inside.

**Camera:** On 'let's look inside', push in through the modern oven's ghost outline (scale 1 → 3, ease-in-out) into Scene 4.  
**Visual:** Every oven in the line-up fades to a ghost, leaving one shared outline: a metal box with one magnetron block. A modern countertop oven materialises in that outline.

| Frame | Visual beat |
| --- | --- |
| 4021 (2:14.0) | Ovens ghost; shared outline remains |
| 4099 (2:16.6) | Modern oven materialises |
| 4145 (2:18.2) | Push-in begins |

**On-screen text:** —  
**Transition out:** The push-in passes through the door into the cutaway (S4-01).  
**Components:** CameraFrame (new), ComponentCutaway (new)

**Sound:** intentionally silent (narration only).

**Assets:** reuse — MicrowaveFront (src/scenes/episode001/shared.tsx) as reference; rebuilt for 16:9 · new — Modern countertop oven (16:9 front and cutaway)  
**Claims:** L40

---

## Scene 4 · Press Start · 2:19.8–4:12.0 (112.3 s)

**Purpose:** The hidden mechanism in one demonstration: analogy → honest physics → myths → where the heat goes.

**Scientific accuracy — risks and how the visuals avoid them**
- Waves are shown as teal paths and a soft lattice inside a ghosted cavity. They're never drawn as particles or 'beams' hitting the food.
- The field swing is slowed with an explicit indicator ('slowed ~2,500,000,000×'), so viewers know the real speed is far beyond the screen.
- Molecules twist only part of the way, lag behind the field and stay out of sync. A propeller-spin version appears only crossed out (L23).
- The dance-floor analogy lives in its own dashed, framed 'analogy' style and never shares a frame with physics shots. The narration says 'That's only a picture.'
- Heat is colour and a thermometer only, never particles passing heat along between molecules.
- No 'resonance' pulse, tuning-fork glow or 'water frequency' graphic. The tuning fork appears only to be stamped 'No' (L24).
- The 'other molecules absorb' beat uses generic, unlabelled outlines. No fats or sugars are named (L43 cut).
- The cross-section shows a thick, soft outer heating band with a later, slower warming of the centre: not inside-out, and not a thin surface skin. No depth number (L27, D05).

### S4-01 · 4a · Waves fill the box
**Frames 4193–4610** (2:19.8–2:33.7, 13.9 s) · speech 4199–4580 (37 words, take `s4-01-take01.wav`, speech ends at 12.71 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Press Start, and a magnetron — a descendant of Spencer's radar tube — turns electricity into microwaves. They're a kind of radio wave. The metal walls bounce them around until the whole box is full of them.

**Camera:** Locked cutaway, slightly off-axis (3/4 side view).  
**Visual:** Modern oven cutaway with a ghosted ivory outline. A finger presses Start and the magnetron block glows (a label only, no internals). Teal paths leave it through a short channel, reflect off the walls and multiply until the cavity holds a soft teal lattice. A cold (mist-blue) bowl of soup sits on the turntable.

| Frame | Visual beat |
| --- | --- |
| 4193 (2:19.8) | The finger presses Start (in the lead-in) |
| 4217 (2:20.6) | Magnetron glows |
| 4295 (2:23.2) | First teal path leaves |
| 4379 (2:26.0) | Reflections multiply |
| 4565 (2:32.2) | Lattice fills the cavity |

**On-screen text:** "magnetron"  
**Transition out:** Freeze the lattice, then zoom to one wave segment (S4-02).  
**Components:** ComponentCutaway (new), SignalPath, Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 4193 (2:19.8) | Start button press, then the start beep | reuse | sfx/s3-start-beep.wav → lf-start-beep.wav (unused in the Short; a keypad is visible here) | in the lead-in before speech, −10 dB |
| 4199 (2:20.0) | Oven start-up (relay, hum, fan) into a continuous run | reuse | sfx/oven-startup-run-v2.wav → lf-oven-run.wav | ducked to −16 dB under narration |
| 4295 (2:23.2) | Wave motif: emit | reuse | lf-wave-emit.wav | −14 dB |
| 4379 (2:26.0) | Two reflect pings on visible bounces | reuse | lf-wave-reflect-1/2.wav | −15 dB |

**Assets:** reuse — SignalPath; Callout; BowlFront / bowlSectionPath (shared.tsx) for the bowl; MicrowaveFront as reference · new — 16:9 oven cutaway (cavity, channel, turntable)  
**Claims:** L40, L20, L26

### S4-02 · 4b · The swinging field
**Frames 4610–5049** (2:33.7–2:48.3, 14.6 s) · speech 4616–5019 (40 words, take `s4-02-take01.wav`, speech ends at 13.44 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> A microwave is a ripple of electric and magnetic fields. The part that matters here is the electric field. It pushes on electric charges — and it swings back and forth about two and a half billion times every second.

**Camera:** Zoom from the cavity into one wave segment (scale 1 → 4 over 1.2 s), then locked.  
**Visual:** The wave freezes. A row of teal arrows (the electric field) swings one way and back at ~1 cycle/s. A faint perpendicular ghost marks the magnetic field, then dims away. A slow-motion badge reads 'slowed ~2,500,000,000×'.

| Frame | Visual beat |
| --- | --- |
| 4616 (2:33.9) | Freeze and zoom |
| 4694 (2:36.5) | Magnetic-field ghost appears, then dims |
| 4766 (2:38.9) | Arrows begin swinging |
| 4856 (2:41.9) | Slow-motion badge |

**On-screen text:** "electric field" · "slowed ~2,500,000,000×"  
**Transition out:** Scale indicator ticks 'cm → nm' as we zoom to one molecule (S4-03).  
**Components:** SignalPath, Badge, ScaleIndicator (new)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 4616 (2:33.9) | The oven run ducks to silence with the freeze (time stopped) | reuse | lf-oven-run.wav, fade out over 0.4 s | silence under narration |
| 4766 (2:38.9) | Slow wave-motif tone that pans gently left/right with the arrows' swing (no rhythm, no melody) | new | Synth: sustained wave-motif variant with slow pan, long-form generator | −18 dB under narration |

**Assets:** reuse — fieldAt() swing timing from molecules.tsx as reference; Badge · new — Field-arrow row (16:9)  
**Claims:** L20, L21

### S4-03 · 4c · The lopsided molecule
**Frames 5049–5537** (2:48.3–3:04.6, 16.3 s) · speech 5055–5519 (43 words, take `s4-03-take01.wav`, speech ends at 15.47 s) · lead-in 6 f · tail 0.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Most of the food we heat contains plenty of water. And a water molecule is lopsided. The oxygen end is slightly negative, the hydrogen side slightly positive. So every time the field flips, it shoves the molecule one way — then the other.

**Camera:** Locked close-up, centred.  
**Visual:** A scale indicator ticks 'cm → nm'. A single V-shaped water molecule, '−' on the oxygen and '+' on the hydrogens. The field arrows (the same row, now above it) flip, and the molecule twists part of the way toward them, then back. It lags each flip and never completes a turn.

| Frame | Visual beat |
| --- | --- |
| 5049 (2:48.3) | Scale indicator cm → nm |
| 5145 (2:51.5) | Molecule draws on |
| 5220 (2:54.0) | ± labels |
| 5325 (2:57.5) | Partial twists begin |

**On-screen text:** "−" · "+"  
**Transition out:** Hard cut into the framed analogy (S4-04).  
**Components:** ScaleIndicator (new), Callout

**Sound:** intentionally silent (narration only).

**Assets:** reuse — Water molecule drawing and MoleculeField (molecules.tsx), imported read-only · new — none  
**Claims:** L39, L22

### S4-04 · 4d · Analogy: the dance floor
**Frames 5537–6073** (3:04.6–3:22.4, 17.9 s) · speech 5543–6043 (50 words, take `s4-04-take01.wav`, speech ends at 16.67 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Here's a picture that helps. Imagine a packed dance floor, where the beat reverses billions of times a second. Everyone tries to turn with it. Nobody can — it's far too crowded. So they bump into their neighbors, who bump into theirs, until the whole floor is a jostling mess.

**Camera:** Locked top-down view inside a rounded frame inset at 80 % of the screen.  
**Visual:** ANALOGY FRAME: rounded dashed border, an 'analogy' tag, sketchy line style. A crowded floor of simple round figures. A teal beat-bar flashes left/right. The figures start to turn, collide and ricochet, and the jostling spreads outward until it's random. The floor's tint warms from mist blue to orange.

| Frame | Visual beat |
| --- | --- |
| 5543 (3:04.8) | Frame and tag draw on |
| 5633 (3:07.8) | Beat-bar flashing |
| 5738 (3:11.3) | Figures attempt turns and collide |
| 5828 (3:14.3) | Jostling spreads; tint warms |

**On-screen text:** "analogy"  
**Transition out:** The frame shrinks away to a point, back to the molecule style (S4-05).  
**Components:** Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 5738 (3:11.3) | Soft felt-like bumps as figures collide: sparse at first, then a dense, irregular patter (deliberately non-rhythmic, so it doesn't read as music) | new | Synth: soft muted bumps, randomised timing | −18 dB under narration |

**Assets:** reuse — Badge · new — Analogy frame style; Crowd of round figures with collision motion  
**Claims:** L23

### S4-05 · 4e · The real thing
**Frames 6073–6718** (3:22.4–3:43.9, 21.5 s) · speech 6079–6670 (53 words, take `s4-05-take01.wav`, speech ends at 19.69 s) · lead-in 6 f · tail 1.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> That's only a picture. Real molecules don't spin like tiny propellers. They're jammed together, and they barely manage part of a turn before the field reverses. But the key idea holds. The field keeps shoving, and collisions scatter that shove into random jiggling. And random jiggling of molecules — that's what heat is.

**Camera:** Locked close-up of the molecule cluster.  
**Visual:** Back to the precise style. A dense cluster of water molecules, with hydrogen-bond links drawn faintly. On 'tiny propellers', a ghosted propeller-spin version appears and is crossed out with '✕'. Each real molecule twists a little, out of sync with its neighbours. The ordered back-and-forth dissolves into random jiggling; the cluster shifts from mist blue to orange while a thermometer rises. A small label reads 'dielectric heating'.

| Frame | Visual beat |
| --- | --- |
| 6079 (3:22.6) | Cluster appears |
| 6127 (3:24.2) | Ghost propeller, crossed out |
| 6229 (3:27.6) | Partial, lagging twists |
| 6409 (3:33.6) | Jiggling becomes random |
| 6610 (3:40.3) | Colour warms; thermometer rises; label |

**On-screen text:** "✕" · "dielectric heating"  
**Transition out:** Cut to the myth card (S4-06).  
**Components:** Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 6670 (3:42.3) | Energy → heat motif: warm swell as the cluster turns orange (wave motif bends down into a warm chord) | reuse | sfx/heat-transition-v2.wav → lf-heat-swell.wav | in the gap, −10 dB |

**Assets:** reuse — MoleculeField (jitter 0 → 1), imported read-only; Thermometer (shared.tsx) · new — Ghost propeller animation  
**Claims:** L23

### S4-06 · 4f · Myth check
**Frames 6718–7137** (3:43.9–3:57.9, 14.0 s) · speech 6724–7113 (38 words, take `s4-06-take01.wav`, speech ends at 12.96 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> A quick myth check. This isn't a magic frequency that water is tuned to. It's simply a frequency set aside for ovens. And water isn't the only thing soaking it up. Other molecules in food absorb some, too.

**Camera:** Locked card layout.  
**Visual:** Myth card: a tuning-fork icon labelled 'tuned to water?' is stamped NO. A radio-dial strip shows a small band marked 'ovens · 2.45 GHz' among other marked bands. Then a few other, unlabelled molecule outlines glow faintly beside the water molecule.

| Frame | Visual beat |
| --- | --- |
| 6724 (3:44.1) | Myth card |
| 6784 (3:46.1) | NO stamp |
| 6844 (3:48.1) | Dial strip with the oven band |
| 6949 (3:51.6) | Other molecule outlines glow |

**On-screen text:** "tuned to water?" · "NO" · "ovens · 2.45 GHz"  
**Transition out:** Cut back to the bowl, now in cross-section (S4-07).  
**Components:** Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 6784 (3:46.1) | Rubber-stamp thud on NO | new | same Foley file as S2-06 stamp | under narration, −12 dB |

**Assets:** reuse — Badge · new — Tuning-fork icon; Radio-dial band strip; Generic molecule outlines  
**Claims:** L24, L25

### S4-07 · 4g · Not inside-out
**Frames 7137–7561** (3:57.9–4:12.0, 14.1 s) · speech 7143–7525 (38 words, take `s4-07-take01.wav`, speech ends at 12.75 s) · lead-in 6 f · tail 1.2 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> One more: microwaves don't cook from the inside out. In a thick bowl of soup, they fade out within the first few centimeters. The middle warms the old-fashioned way — heat spreading in from the hotter outer layers.

**Camera:** Locked cross-section of the bowl.  
**Visual:** Bowl in cross-section. Teal waves enter from several sides and fade gradually inside a thick outer band, which glows orange. Then, more slowly, orange creeps toward the mist-blue centre. 'Inside-out?' is stamped NO. No depth number is shown.

| Frame | Visual beat |
| --- | --- |
| 7143 (3:58.1) | 'Inside-out?' and NO stamp |
| 7245 (4:01.5) | Waves enter and fade in a thick band |
| 7323 (4:04.1) | Band warms orange |
| 7450 (4:08.3) | Heat creeps inward to the centre (continues into the tail) |

**On-screen text:** "Inside-out?" · "NO"  
**Transition out:** The cross-section tilts flat into a top-down view of the oven floor (S5-01).  
**Components:** SignalPath, Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 7245 (4:01.5) | Wave motif: absorb (darkens into the food) | reuse | sfx/wave-absorb-a-v2.wav → lf-wave-absorb.wav | −15 dB under narration |
| 7525 (4:10.8) | Slow heat-spread swell as the centre warms | reuse | sfx/heat-spread-v2.wav → lf-heat-spread.wav | in the gap, −12 dB |

**Assets:** reuse — bowlSectionPath (shared.tsx); Short's SH05 cross-section approach as reference · new — none  
**Claims:** L27

---

## Scene 5 · The candy bar returns · 4:12.0–5:16.2 (64.2 s)

**Purpose:** Why the food rotates, and why that can't make heating perfect. The candy-bar callback makes the hot spots visible.

**Scientific accuracy — risks and how the visuals avoid them**
- The interference map is translucent and labelled 'simplified'. The real pattern is 3-D and shifts (L28).
- Melt spacing is shown as '≈ 6 cm' (approximate; varies by oven) (L29).
- The chocolate demo is animated and never presented as Spencer's pocket or as real footage.
- The spoonful's ride shows warming *in steps*, and the final map is 'more even', never flat or uniform (L30).
- The centre pin shows that the axis barely moves, with no claim about whether the centre is hot or cold (L31).
- Some cooler spots remain until the stir. Stirring is shown as advice, not as perfect mixing.

### S5-01 · Which brings us to the turntable
**Frames 7561–7633** (4:12.0–4:14.4, 2.4 s) · speech 7567–7615 (6 words, take `s5-01-take01.wav`, speech ends at 1.59 s) · lead-in 6 f · tail 0.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Which brings us to the turntable.

**Camera:** Tilt from section to top-down (3-D flip over 1 s), then locked.  
**Visual:** The oven floor seen from above, with the turntable at centre and the soup bowl lifted out of frame.

| Frame | Visual beat |
| --- | --- |
| 7561 (4:12.0) | Tilt to top-down |

**On-screen text:** —  
**Transition out:** Continuous.  
**Components:** CameraFrame (new)

**Sound:** intentionally silent (narration only).

**Assets:** reuse — Short's SH06 turntable drawing as reference · new — Top-down oven floor and turntable (16:9)  
**Claims:** none (no factual statement)

### S5-02 · Strong and weak spots
**Frames 7633–8049** (4:14.4–4:28.3, 13.9 s) · speech 7639–8013 (37 words, take `s5-02-take01.wav`, speech ends at 12.48 s) · lead-in 6 f · tail 1.2 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Remember the waves bouncing off the walls? Where they overlap, some spots add up and get stronger. Others cancel out and get weaker. The result is a pattern of hot and cold spots that mostly stays put.

**Camera:** Locked top-down.  
**Visual:** Two teal wave trains cross the floor. Where crests meet, the overlap brightens; where crest meets trough, it dims. A tiny inset shows the two waves adding and cancelling. The pattern builds into an irregular, translucent map of bright and dim patches labelled 'simplified'.

| Frame | Visual beat |
| --- | --- |
| 7639 (4:14.6) | Two wave trains cross |
| 7729 (4:17.6) | Inset: add and cancel |
| 7834 (4:21.1) | Map builds |
| 7983 (4:26.1) | 'simplified' tag |

**On-screen text:** "stronger" · "weaker" · "simplified"  
**Transition out:** Continuous: the map stays for the chocolate demo.  
**Components:** SignalPath, Callout, Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 7729 (4:17.6) | Two wave-motif tones: in the 'add' inset they reinforce (brighter, louder); in the 'cancel' inset the tone dips away (sound mirrors the physics) | new | Synth: wave-motif interference pair, long-form generator | −15 dB under narration |

**Assets:** reuse — SignalPath; Callout; Badge · new — Interference inset; Bright/dim map (irregular, translucent)  
**Claims:** L28

### S5-03 · The candy bar returns: chocolate demo
**Frames 8049–8485** (4:28.3–4:42.8, 14.5 s) · speech 8055–8425 (38 words, take `s5-03-take01.wav`, speech ends at 12.35 s) · lead-in 6 f · tail 2.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> You can see it with — fittingly — a bar of chocolate. Take out the turntable, put in a plain chocolate bar, and heat it briefly. It doesn't melt evenly. It melts in patches, a few centimeters apart.

**Camera:** Slow 1.0 → 1.08 push-in on the bar during the melt.  
**Visual:** The turntable lifts out. A plain, unbranded chocolate bar slides onto the map. It melts in glossy patches over the bright spots and stays matte elsewhere. A ruler draws between two patches: '≈ 6 cm'. Hold on the melted bar for a beat, the visual rhyme with Scene 1's pocket.

| Frame | Visual beat |
| --- | --- |
| 8127 (4:30.9) | Turntable lifts out |
| 8193 (4:33.1) | Bar slides on |
| 8271 (4:35.7) | Patches melt (staggered) |
| 8401 (4:40.0) | Ruler '≈ 6 cm' |
| 8437 (4:41.2) | Hold |

**On-screen text:** "≈ 6 cm"  
**Transition out:** The turntable drops back in, carrying a bowl (S5-04).  
**Components:** Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 8127 (4:30.9) | Glass turntable plate lifted out: a soft glass clink | new | Foley, CC0: glass plate lifted / small clink | under narration, −14 dB |
| 8193 (4:33.1) | Bar slid onto the oven floor (dry paper/wrapper slide) | new | Foley, CC0: wrapper slide on a smooth surface | −14 dB |
| 8431 (4:41.0) | Soft wrapper crinkle: the audio callback to Scene 1's pocket | new | same Foley file as S1-01 crinkle | in the gap, −12 dB |

**Assets:** reuse — Callout; Candy-bar wrapper style from S1-01 · new — Plain chocolate bar with melt-patch states; Ruler  
**Claims:** L29

### S5-04 · One spoonful's ride
**Frames 8485–9030** (4:42.8–5:01.0, 18.2 s) · speech 8491–8958 (45 words, take `s5-04-take01.wav`, speech ends at 15.57 s) · lead-in 6 f · tail 2.4 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> That's what the turntable is for. Picture one spoonful of soup riding around the plate. It drifts into a strong spot and heats up, slides through a weak one, then into another strong one — again and again. Turn after turn, the heating averages out.

**Camera:** Locked top-down, with a small trace-graph inset at top right.  
**Visual:** The turntable drops back in with the bowl. One spoonful-sized region is ringed in gold and tracked as the plate turns. Over bright patches it pulses warmer (orange); over dim ones it holds. The inset graph climbs in steps: up, flat, up, flat. In the tail, the whole bowl's patchy heat map softens toward a more even (still mottled) orange.

| Frame | Visual beat |
| --- | --- |
| 8485 (4:42.8) | Turntable and bowl drop in |
| 8539 (4:44.6) | Gold ring around one spoonful |
| 8581 (4:46.0) | Rotation starts; ride through patches |
| 8611 (4:47.0) | Step graph builds |
| 8958 (4:58.6) | Map softens (still mottled) |

**On-screen text:** —  
**Transition out:** Continuous into S5-05 (rotation keeps going).  
**Components:** Callout, StepDiagram-style graph (new)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 8485 (4:42.8) | Turntable motor engages, whirs and runs | reuse | sfx/turntable-motor-v2.wav → lf-turntable.wav | engages in the lead-in, then −16 dB under narration |
| 8581 (4:46.0) | Tiny heat-motif blips each time the ringed spoonful crosses a bright patch (3–4, synced) | new | Synth: short heat-motif blip, long-form generator | −17 dB |

**Assets:** reuse — Turntable from S5-01; Callout · new — Tracked-spoonful ring; Step trace graph  
**Claims:** L30

### S5-05 · But not perfectly
**Frames 9030–9486** (5:01.0–5:16.2, 15.2 s) · speech 9036–9438 (38 words, take `s5-05-take01.wav`, speech ends at 13.4 s) · lead-in 6 f · tail 1.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Averages out — but not perfectly. The real pattern is three-dimensional, and it shifts as the food heats. And the very center of the plate barely moves at all. That's why food-safety guides still say: stir halfway through.

**Camera:** Tilt the map into 3-D layers (ease-in-out 1.2 s), then back to top-down for the stir.  
**Visual:** The map separates into stacked 3-D layers that wobble slightly as the food warms. A pin at the turntable's centre traces nothing, while a pin at the rim traces a big circle. A few mist-blue cooler spots remain in the food. A spoon gives one stir and the bowl settles.

| Frame | Visual beat |
| --- | --- |
| 9036 (5:01.2) | Tilt into layers; slight wobble |
| 9192 (5:06.4) | Centre pin vs rim pin |
| 9276 (5:09.2) | Cooler spots highlighted |
| 9408 (5:13.6) | Spoon stirs |

**On-screen text:** —  
**Transition out:** The stir swirls into a steaming plate on a table (S6-01).  
**Components:** CameraFrame (new), Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 9396 (5:13.2) | Turntable slows and stops: motor fades, soft stop click | reuse | lf-turntable.wav tail + synth stop click | −16 dB |
| 9408 (5:13.6) | Spoon stirs | reuse | foley/spoon-stir-v2.wav → lf-spoon-stir.wav | on the visual stir, −12 dB |

**Assets:** reuse — Spoon icon (from the Short's SH06, as reference) · new — 3-D layered map  
**Claims:** L28, L31, L30

---

## Scene 6 · Hot plate, cold bite · 5:16.2–6:32.6 (76.4 s)

**Purpose:** Everyday surprises with useful payoffs: plate vs food, the dish test, frozen food, superheated water.

**Scientific accuracy — risks and how the visuals avoid them**
- Heat arrows go from hot food into the plate and the cold centre, so the plate is shown warming from the food (L33).
- In the dish test, waves pass through the safe dish. The unsafe dish glows *on its own* (L35 derived; captioned only as 'not microwave-safe', never naming a material).
- Ice is a rigid lattice and thawed water is loose molecules. Runaway is shown as a loop arrow, and the frozen region stays frozen (L32, simplified).
- Superheated water is labelled 'rare — but real'. The eruption is short and not gory, and isn't shown as the normal outcome (L36).
- Standing time is shown as heat still spreading inward, not as molecules 'continuing to generate heat' (L38).

### S6-01 · The classic microwave betrayal
**Frames 9486–9691** (5:16.2–5:23.0, 6.8 s) · speech 9492–9667 (20 words, take `s6-01-take01.wav`, speech ends at 5.84 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> And then there's the classic microwave betrayal. A plate too hot to touch — and a bite that's still cold.

**Camera:** Locked medium close-up of a plate on a table.  
**Visual:** A steaming plate of food. A fork lifts a bite, and a probe thermometer in it reads cold (mist blue). A hand reaches for the plate's rim, which glows orange, and recoils. A short comic beat.

| Frame | Visual beat |
| --- | --- |
| 9492 (5:16.4) | Fork lifts a bite; thermometer cold |
| 9622 (5:20.7) | Hand touches the rim and recoils |

**On-screen text:** —  
**Transition out:** Cut to the cross-section of food on the plate (S6-02).  
**Components:** —

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 9498 (5:16.6) | Fork tap on a ceramic plate | new | Foley, CC0: fork on plate | under narration, −14 dB |

**Assets:** reuse — Thermometer style (shared.tsx) · new — Plate of food (table setting); Probe thermometer; Hand  
**Claims:** L33, L27

### S6-02 · The food heats the plate
**Frames 9691–10127** (5:23.0–5:37.6, 14.5 s) · speech 9697–10103 (41 words, take `s6-02-take01.wav`, speech ends at 13.52 s) · lead-in 6 f · tail 0.8 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Part of that is the food. The outside heats first, the middle waits for heat to creep inward, and the plate, pressed against the hot outside, soaks up plenty. A few minutes of standing time lets the heat keep spreading inward.

**Camera:** Locked cross-section.  
**Visual:** Cross-section of food on a plate. The outer food glows orange, and heat arrows flow from it both into the cold centre and down into the plate, which warms. A 'standing time' clock ticks off a few minutes (time-lapse) while the centre catches up.

| Frame | Visual beat |
| --- | --- |
| 9697 (5:23.2) | Outer food orange |
| 9775 (5:25.8) | Arrows into the centre and the plate |
| 9853 (5:28.4) | Plate warms |
| 9952 (5:31.7) | Standing-time clock; centre catches up |

**On-screen text:** "standing time"  
**Transition out:** Wipe to the split-screen dish test (S6-03).  
**Components:** Callout, Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 9952 (5:31.7) | Soft clock ticks, 4, at a time-lapse rate | new | Synth: dry tick, long-form generator | −16 dB under narration |

**Assets:** reuse — Thermometer; Callout; Badge · new — Food-on-plate cross-section  
**Claims:** L27, L33, L38

### S6-03 · The dish test
**Frames 10127–10761** (5:37.6–5:58.7, 21.1 s) · speech 10133–10731 (63 words, take `s6-03-take01.wav`, speech ends at 19.94 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Part of it can be the dish. Some dishes let microwaves pass straight through, and only get warm from the food. Others absorb the energy themselves. Here's a simple test. Put the empty dish in next to a cup of water, and run it for one minute. Hot water and a cool dish? It's fine. If the dish is hot, it isn't microwave-safe.

**Camera:** Locked split screen.  
**Visual:** Left and right: each an empty dish beside a glass cup of water inside an oven outline, with a one-minute timer spanning both. Left: teal waves pass straight through the dish (it stays mist blue) and into the water, which turns orange, then a tick. Right: the dish itself glows orange, with a 'not microwave-safe' tag.

| Frame | Visual beat |
| --- | --- |
| 10133 (5:37.8) | Two dishes come in |
| 10313 (5:43.8) | Cup of water placed; the timer starts |
| 10463 (5:48.8) | Left: water warms, dish stays cool, tick |
| 10568 (5:52.3) | Right: dish glows, tag |

**On-screen text:** "1 min" · "microwave-safe?" · "not microwave-safe"  
**Transition out:** Cut to the frozen block (S6-04).  
**Components:** Badge, SignalPath

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 10313 (5:43.8) | Oven run, quiet | reuse | lf-oven-run.wav | −18 dB under narration |
| 10731 (5:57.7) | End-of-cycle beep as the timer reaches 1:00 | reuse | lf-start-beep.wav (or a new 3-beep done tone) | in the gap, −10 dB |

**Assets:** reuse — Badge; SignalPath · new — Split-screen dish test layout; Two dishes and a glass cup  
**Claims:** L33, L35, L34

### S6-04 · Frozen food runaway
**Frames 10761–11384** (5:58.7–6:19.5, 20.8 s) · speech 10767–11354 (60 words, take `s6-04-take01.wav`, speech ends at 19.56 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Frozen food has its own trick. Ice is bad at absorbing microwaves — its molecules are locked in place. But once one patch thaws into liquid water, it soaks up far more energy than the ice around it. So it heats faster, and faster still — which is how one bite can be scalding while the next is frozen solid.

**Camera:** Slow 1.0 → 1.1 push-in on the thawing patch.  
**Visual:** An ice-blue block drawn as a rigid lattice. Teal waves mostly slide through with little glow. One patch turns to liquid (loose, moving molecules) and lights up orange, then brighter, then brighter still, while the rest stays icy. A loop arrow: 'thawed → absorbs more → heats faster'.

| Frame | Visual beat |
| --- | --- |
| 10767 (5:58.9) | Rigid ice lattice; waves pass with little glow |
| 10902 (6:03.4) | One patch thaws |
| 11007 (6:06.9) | The patch brightens in two steps |
| 11082 (6:09.4) | Loop arrow |
| 11339 (6:18.0) | Contrast: scalding patch next to an icy region |

**On-screen text:** "thawed → absorbs more → heats faster"  
**Transition out:** Cut to the clean cup (S6-05).  
**Components:** Callout

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 10902 (6:03.4) | Faint ice crackle as the patch thaws | new | Foley, CC0: ice cracking softly | −16 dB under narration |
| 11007 (6:06.9) | Heat motif rising in two steps (escalating with the brightening) | new | Synth: stepped heat-motif variant | −16 dB |

**Assets:** reuse — MoleculeField style for loose liquid molecules · new — Ice lattice and thawed-patch states; Loop arrow  
**Claims:** L32

### S6-05 · Superheated water
**Frames 11384–11777** (6:19.5–6:32.6, 13.1 s) · speech 11390–11717 (34 words, take `s6-05-take01.wav`, speech ends at 10.89 s) · lead-in 6 f · tail 2.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> And one rare surprise. Plain water, heated alone in a very clean cup, can get hotter than boiling without a single bubble. Then a small bump — and it can erupt all at once.

**Camera:** Locked. On the eruption, a freeze-frame.  
**Visual:** A very clean cup of perfectly calm water. The thermometer above reads past '100 °C' with no bubbles. A spoon taps it and it erupts in a burst, held as a freeze-frame. Small text: 'rare — but real'. In the tail, the steam drifts up and becomes faint teal ripples.

| Frame | Visual beat |
| --- | --- |
| 11390 (6:19.7) | Calm cup; thermometer rises past 100 °C |
| 11681 (6:29.4) | Spoon taps |
| 11690 (6:29.7) | Eruption, then freeze |
| 11735 (6:31.2) | 'rare — but real' |
| 11741 (6:31.4) | Steam becomes teal ripples |

**On-screen text:** "100 °C" · "rare — but real"  
**Transition out:** Steam → ripples carries into the kitchen microwave (S7-01).  
**Components:** Badge

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 11681 (6:29.4) | Spoon tap on a ceramic cup | new | Foley, CC0: spoon tap on mug | −12 dB |
| 11690 (6:29.7) | Short, sharp water burst that cuts to near-silence on the freeze | new | Foley, CC0: short water splash/burst | on the visual, −8 dB peak, fade 0.3 s |

**Assets:** reuse — Thermometer; Badge · new — Clean cup with calm-water and eruption states  
**Claims:** L36

---

## Scene 7 · Payoff · 6:32.6–7:12.6 (40.1 s)

**Purpose:** Recombine everything into one image to remember, and close the candy-bar loop.

**Scientific accuracy — risks and how the visuals avoid them**
- The X-ray layers reuse each scene's established proxies, so no new metaphor is introduced at the end.
- The hot/cold map stays slightly uneven even while turning.
- 'Nothing … radioactive' plays as the layers fade, with no radiation symbols.

### S7-01 · Next time you press Start
**Frames 11777–11899** (6:32.6–6:36.6, 4.1 s) · speech 11783–11881 (12 words, take `s7-01-take01.wav`, speech ends at 3.26 s) · lead-in 6 f · tail 0.6 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> So the next time you press Start, picture what's really going on.

**Camera:** Begins the film's final continuous move: a slow push-in on the kitchen microwave (1.0 → 1.15 across all of Scene 7).  
**Visual:** An ordinary kitchen microwave, front-on, door closed, on a dark counter. The teal ripples from S6-05 settle into its door glass.

| Frame | Visual beat |
| --- | --- |
| 11777 (6:32.6) | Ripples settle into the door |

**On-screen text:** —  
**Transition out:** Continuous move.  
**Components:** CameraFrame (new)

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 11789 (6:33.0) | Oven run fades up softly | reuse | lf-oven-run.wav | −18 dB under narration |

**Assets:** reuse — Modern oven (from S3-05/S4) · new — none  
**Claims:** none (no factual statement)

### S7-02 · The whole picture, X-ray
**Frames 11899–12510** (6:36.6–6:57.0, 20.4 s) · speech 11905–12480 (58 words, take `s7-02-take01.wav`, speech ends at 19.17 s) · lead-in 6 f · tail 1.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> A descendant of a wartime radar tube fills a metal box with invisible waves. Their electric field swings back and forth billions of times a second, shoving at water molecules too crowded to keep up. That jostling becomes heat, spot by spot and layer by layer, while the plate carries your dinner through a pattern you can't see.

**Camera:** Continuous push-in.  
**Visual:** As each clause plays, a layer appears through the door like an X-ray: the magnetron glow → the teal lattice → (circular inset) jostling molecules turning orange → the faint, still-uneven hot/cold map on the turning plate. A single line appears on 'jostling becomes heat': 'Waves → molecules → heat'.

| Frame | Visual beat |
| --- | --- |
| 11905 (6:36.8) | Magnetron glow |
| 11995 (6:39.8) | Teal lattice |
| 12091 (6:43.0) | Molecule inset |
| 12190 (6:46.3) | 'Waves → molecules → heat' |
| 12265 (6:48.8) | Uneven map on the turning plate |

**On-screen text:** "Waves → molecules → heat"  
**Transition out:** The layers hold, then fade at the start of S7-03.  
**Components:** ComponentCutaway (new), TextReveal

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 11995 (6:39.8) | Wave motif: emit, faint | reuse | lf-wave-emit.wav | −16 dB |
| 12480 (6:56.0) | Energy → heat motif: closing reprise (warm chord) as the X-ray completes | reuse | sfx/heat-finale-v2.wav → lf-heat-finale.wav | in the gap, −10 dB; tail ducked under S7-03 |

**Assets:** reuse — Scene 4–5 layers; MoleculeField inset · new — X-ray layer compositing  
**Claims:** L40, L20, L26, L21, L23, L28, L30

### S7-03 · A melted candy bar, and why
**Frames 12510–12979** (6:57.0–7:12.6, 15.6 s) · speech 12516–12859 (31 words, take `s7-03-take01.wav`, speech ends at 11.44 s) · lead-in 6 f · tail 4.0 s

**Narration** (verbatim; starts at the speech frame, ends before the tail):
> Nothing in your food turns radioactive. It's just waves, water, and a very crowded dance floor — all because one engineer found a melted candy bar, and wanted to know why.

**Camera:** Push-in completes; a slow dissolve to the Scene 1 pocket, then locked on the end card.  
**Visual:** The layers fade and the oven's timer shows 0:00 (in the lead-in). On 'a melted candy bar', a slow dissolve brings back the illustrated pocket from Scene 1 and the soft bar. Tail: end card with the title and a slot linking to the Short.

| Frame | Visual beat |
| --- | --- |
| 12510 (6:57.0) | Timer reaches 0:00 (before speech); layers fade |
| 12744 (7:04.8) | Dissolve to the pocket and bar |
| 12877 (7:09.2) | End card |

**On-screen text:** "end card: title + Short link slot"  
**Transition out:** Fade to black.  
**Components:** TextReveal

| Frame | Sound | Source | Asset | Mix / relation to narration |
| --- | --- | --- | --- | --- |
| 12510 (6:57.0) | Done beep as the timer hits 0:00 (before the line, not under it) | reuse | lf-start-beep.wav | in the lead-in, −12 dB |
| 12744 (7:04.8) | Soft wrapper crinkle on the dissolve (the S1-01 callback) | new | same Foley file as S1-01 | −14 dB under narration |
| 12877 (7:09.2) | End card: silence. No music, no sting | new | — | — |

**Assets:** reuse — Pocket and bar art from S1-01; TextReveal · new — End card (16:9)  
**Claims:** L37, L23, L03

---

## Production notes and risks (updated after narration, 2026-10-28)

### Timing
- **Measured runtime: 7:12.6** (12,979 frames), from the 34 Kokoro takes. That's 16 s under the 7:29 estimate. The takes read faster than estimated, mostly in Scenes 1 and 6. Nothing was padded. The storyboard's visual tails are unchanged.
- **Scene lengths (measured):**

  | Scene | Length | Estimate |
  | --- | --- | --- |
  | 1 | 33.4 s | 37 s |
  | 2 | 57.4 s | 54 s |
  | 3 | 49.0 s | 50 s |
  | 4 | 112.3 s | 114 s |
  | 5 | 64.2 s | 68 s |
  | 6 | 76.4 s | 84 s |
  | 7 | 40.1 s | 42 s |

- **Tight shots:** S2-04 (egg, about 3 s) and S5-01 (about 2.4 s) are still tight. Both work in the first cut.

### Changes from the approved storyboard (production decisions)
- **Patent figure (S2-06):** this is an **original patent-style schematic**, not a trace of the patent's own drawing. That avoided downloading an image whose source I hadn't verified. The page is captioned "schematic illustration", and the filing date is shown as a stamp.
- **S1-02:** the bar sits in the silhouette's coat pocket.
- **S3-03:** the human silhouette is removed so it doesn't overlap the countertop.
- **S4-02:** the field speed is labelled with the `ScaleIndicator` ("real time → slow motion", "slowed ~2,500,000,000×").
- **S4-06:** the other molecules are generic hexagon outlines. No fats or sugars are named.
- **Sound:** the Foley is real CC0 recordings where they existed (14 files). Mechanism clicks, thuds and ticks are synthesized. No music.

### Scientific / visual checks
These were reviewed in still frames from the render:
- **Molecules:** they twist only part of the way and out of sync. The propeller spin appears only crossed out.
- **Heat:** shown as colour only.
- **Cross-section:** a thick outer heating band, with the centre warming later.
- **Turntable result:** mottled and ring-shaped after rotation, never a flat fill, and cooler spots remain until the stir.
- **Analogy:** the dance floor appears only inside its dashed "analogy" frame.
- **Labels:** "simplified" and "animated demo · spacing varies by oven" are on screen.

### Open items
- Nobody has listened to the narration and sound effects yet.
- S4-03's narration gets a smaller gain than the other snippets because of a hot plosive, so it may sound slightly quieter.
- The end card has a placeholder slot for the Short link.
