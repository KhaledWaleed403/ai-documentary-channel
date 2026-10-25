# CLAUDE.md

YouTube explainer channel built with Remotion 4 (React + TypeScript). Explains invisible processes through animated systems, cutaways and step-by-step diagrams.

## Commands
- `npm run dev` — Remotion Studio (or `npx remotion studio --no-open`)
- `npm run lint` — ESLint + `tsc`; run after code changes
- Do not render videos unless asked. Render output goes to `renders/`, never into `src/`.

## Layout
- `src/index.ts` → `src/Root.tsx` is the only entry point; `remotion.config.ts` is the only config. Don't duplicate either.
- `src/compositions/` registered `<Composition>`s (one per episode/short) · `src/scenes/` episode-specific scenes · `src/components/` reusable visual components · `src/animations/` timing/easing helpers · `src/data/` typed episode data · `src/styles/` theme tokens.
- `docs/` specs (read the relevant one before working): `project-brief.md`, `visual-style.md`, `component-inventory.md`, `production-workflow.md`.
- `research/episode-NNN/` sources, claims, notes · `episodes/episode-NNN/` script, storyboard, captions, assets.
- `shorts/`, `thumbnails/`, `renders/`, `analytics/` — production outputs.

## Rules
- Every factual claim in a script must trace to `research/.../claims.md` with a verified source.
- Animate only with `useCurrentFrame()` / `interpolate` / `spring`; no CSS transitions or timers.
- Components take data + style props; reuse primitives but vary palette, framing and pacing per episode.
- Add a component to `docs/component-inventory.md` when you create it.
- No new dependencies or abstractions without a clear need.
- Inspect files before overwriting them.
