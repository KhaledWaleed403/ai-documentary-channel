# Production Workflow

Each stage has an output file and a gate that must pass before the next stage. Replace `NNN` with the episode number.

| # | Stage | Output | Gate |
| --- | --- | --- | --- |
| 1 | Research | `research/episode-NNN/sources.md`, `research-notes.md` | Core question defined; ≥ 2 credible sources per key topic |
| 2 | Fact-checking | `research/episode-NNN/claims.md` | Every claim has a source and status `verified`; disputed claims flagged or cut |
| 3 | Script | `episodes/episode-NNN/script.md` | Every factual line references a claim ID; read-aloud timing estimated |
| 4 | Storyboard | `episodes/episode-NNN/storyboard.json` | Every scene has narration, visual description, components and duration |
| 5 | Narration | Voiceover audio in `episodes/episode-NNN/assets/` | Final read recorded; scene timings updated from real audio |
| 6 | Animation | Compositions/scenes in `src/` | Plays in Studio; `npm run lint` passes; matches storyboard |
| 7 | Review | Notes in the episode folder | Accuracy, clarity, pacing, captions and accessibility checked |
| 8 | Publishing | Render in `renders/`, thumbnail in `thumbnails/`, shorts in `shorts/` | Title, description (with sources), captions, chapters uploaded |

## Stage notes
1. **Research** — Start from primary sources (standards, papers, manufacturer docs, textbooks). Log every source with URL and access date.
2. **Fact-checking** — Break notes into atomic claims (`C001`, `C002`, …). Mark simplifications explicitly.
3. **Script** — Hook in the first 15 s, then whole → parts → flow → why it matters. Write for the ear.
4. **Storyboard** — One idea per scene. Note which inventory components each scene uses; list any new components needed.
5. **Narration** — Record clean audio; export captions to `captions.srt` from the final audio.
6. **Animation** — Build new reusable components first (add to `docs/component-inventory.md`), then episode scenes.
7. **Review** — Watch at full size and phone size; re-check any claim changed since stage 2.
8. **Publishing** — Render only the final cut. After launch, log performance in `analytics/` and feed lessons back into the brief.
