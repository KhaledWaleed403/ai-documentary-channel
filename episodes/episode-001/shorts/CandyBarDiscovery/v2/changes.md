# CandyBarDiscovery v2 — Changes from v1

**Review note (2026-10-28):** the v1 hook ("The microwave oven started with a ruined snack.") was weak. The video opened by stating facts, while the other Shorts open on an intriguing statement and build from it.

| Shot | v1 | v2 |
| --- | --- | --- |
| CB01 | "The microwave oven started with a ruined snack." | "A candy bar melted in an engineer's pocket — and whatever melted it was invisible." Dashed teal ripples drift in from off-screen with no visible source, and a gold "?" appears. |
| CB02 | "In the mid-nineteen-forties, engineer Percy Spencer was working near a magnetron — the tube that makes radar's waves. Then he noticed the candy bar in his pocket had melted." | "It was the mid-nineteen-forties. Percy Spencer had been standing beside a magnetron — the tube that sends out radar's invisible waves." The pull-back reveals the source of the ripples, and the closing chip now reads "invisible waves" (it was "melted"). |
| CB03 | "So he tested food on purpose. …" | "Instead of shrugging it off, he tested food on purpose. …" |
| CB04–CB06 | unchanged | Unchanged text. The takes are byte copies of the v1 takes. |

- **Structure:** a mystery (melted, cause invisible) → the culprit revealed (the magnetron's waves) → the tests → the patent → the payoff ("the answer to the question a melted candy bar raised").
- **Claims:** the new claim X16 is in `research/episode-001/shorts/claims.md`. CB01 now cites L03 and X16; CB02 cites L04, L01, L03 and X16. X15 ("started with") is no longer used in CB01.
- **Narration:** new Kokoro `af_heart` takes for CB01–CB03 in `assets/audio/vo/` (same settings as v1). Runtime: 47.0 s (v1: 45.8 s).
- **Render:** `renders/episode-001/Shorts/CandyBarDiscovery/v2/`.
- **v1:** kept unchanged in `../v1/` (episode files) and in `renders/…/CandyBarDiscovery/v1/`. The `E001ShortCandyBarDiscovery` composition now reads v2.
