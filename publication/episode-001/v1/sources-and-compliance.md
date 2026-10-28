# Episode 001 Long-Form — Platform Sources and Compliance Review

YouTube Help pages were read on 2026-10-28. YouTube changes these pages, so re-check anything marked as a requirement if you publish much later. This is a content review, not legal advice, and it doesn't guarantee approval, monetization or freedom from copyright claims.

## 1. Official YouTube sources

**M** = mandatory policy or hard limit · **R** = YouTube recommendation · **I** = information about how a feature works.

| Topic | Source (YouTube Help) | What it establishes | Type |
| --- | --- | --- | --- |
| Title, description, settings | [Edit video settings](https://support.google.com/youtube/answer/57404) | Title ≤ 100 characters; description ≤ 5,000 characters; no invalid characters. Language and caption certification, category, licence and distribution (embedding, notify subscribers), comments, recording date and location. | M (limits), I |
| Upload flow | [Upload YouTube videos](https://support.google.com/youtube/answer/57407) | You must state whether the video is made for kids (COPPA) and disclose altered or synthetic content that seems real. The Checks step searches for copyrighted content and runs in the background; results "aren't final". Visibility is Private, Unlisted, Public or Scheduled. | M, I |
| Custom thumbnails | [Add video thumbnails](https://support.google.com/youtube/answer/72431) | **Requirement:** custom thumbnails need a verified account, and must follow the Community Guidelines. **Specs:** JPG or PNG; 2 MB max on mobile, 50 MB on desktop; minimum width 640 px; 16:9 recommended for videos. **Recommendation:** the page currently gives 3840×2160 as the video thumbnail resolution. | M (verification, policy, file limits), R (resolution, ratio) |
| Tags | [Add tags to your video](https://support.google.com/youtube/answer/146402) | Tags play "a minimal role" in discovery; the title, thumbnail and description matter more. Tags mainly help with misspellings. Excessive tags in the description break the spam policy. | I, M (no tag stuffing) |
| Hashtags | [Use hashtags for YouTube](https://support.google.com/youtube/answer/6390658) | Up to 3 description hashtags show by the title. With more than 60 hashtags, all are ignored. Hashtags must relate directly to the content, with no over-tagging. | M (relevance, over-tagging), I |
| Made for kids | [Determine if your content is made for kids](https://support.google.com/youtube/answer/9528076) | Made for kids means child-directed under FTC/COPPA guidance. The factors are subject matter, intended and actual audience, child actors or characters, child-directed language and activities. Educational or "family friendly" content isn't automatically made for kids. Setting the audience is your legal responsibility. | M |
| Altered or synthetic content | [Disclosing use of altered or synthetic content](https://support.google.com/youtube/answer/14328491) | **Must disclose:** realistic altered or synthetic content (a real person saying or doing things they didn't, altered real footage or places, realistic scenes that didn't happen, AI music as the main focus). **No disclosure needed:** unrealistic content, AI animation in a fully animated video, production help (scripts, titles, thumbnails, infographics) and minor edits. Disclosure alone doesn't limit reach or monetization. Consistent non-disclosure can lead to penalties. | M |
| Chapters | [Video chapters](https://support.google.com/youtube/answer/9884579) | The first timestamp must be 00:00; at least 3 timestamps in ascending order; each chapter at least 10 s. Manual timestamps override automatic chapters. | M (format), I |
| Subtitles | [Add subtitles and captions](https://support.google.com/youtube/answer/2734796) · [Supported subtitle files](https://support.google.com/youtube/answer/2734698) | Upload in Studio: Subtitles → Add language → Upload file → With or Without timing. `.srt` is supported; it must be plain UTF-8, with basic formatting only and no styling. | M (format), I |
| End screens | [Add end screens](https://support.google.com/youtube/answer/6388789) | The video must be at least 25 s; end screens use the last 5–20 s; up to 4 elements on 16:9. Not available on made-for-kids videos. Link elements are for Partner Program members only. Leave room at the end. | M (limits), R (layout) |
| Cards | [Add cards](https://support.google.com/youtube/answer/6140493) | Up to 5 cards. Not available on made-for-kids videos. Link cards are for Partner Program members only. | M (limits), I |
| Paid promotion | [Paid product placements and endorsements](https://support.google.com/youtube/answer/154235) | Tick the paid-promotion box if the video features branded content, sponsorships, endorsements or other commercial relationships. | M (if any apply) |
| Monetization policies | [YouTube channel monetization policies](https://support.google.com/youtube/answer/1311392) | **Inauthentic content** (renamed 15 July 2025) excludes mass-produced, generic, repetitive or templated content without value. Reusing a format is fine if each video is substantively different. **Reused content** must add meaningful original value. **AI** is allowed as a tool if the result shows creative vision; AI content from generic templates isn't. These rules apply to the channel as a whole. | M (for YPP) |
| Mid-roll ads | [Manage mid-roll ad breaks](https://support.google.com/youtube/answer/6175006) | Mid-rolls are available only on monetized videos of 8 minutes or longer. | I |
| Spam and deceptive practices | [Spam, deceptive practices & scams policies](https://support.google.com/youtube/answer/2801973) | Bans misleading titles, thumbnails or descriptions that promise content the video doesn't deliver (malicious clickbait) and metadata designed to take advantage of viewers. | M |
| Content ID | [How Content ID works](https://support.google.com/youtube/answer/2797370) | Uploads are scanned automatically against rights-holders' reference files. A match creates a claim (block, monetize or track, possibly per country). Claims can be disputed, and claimants who repeatedly make wrong claims can lose access. | I |
| Ad suitability and monetization icons (secondary) | Search summary of [Monetization icon guide](https://support.google.com/youtube/answer/9208564) and [Appeals for limited ads](https://support.google.com/youtube/answer/7083671) | For YPP members only: ad-suitability results and icons, and human-review appeals. Only search summaries were read, not the pages themselves; check them in Studio if relevant. | I |

**Non-YouTube source:**
- [Kokoro-82M model card](https://huggingface.co/hexgrad/Kokoro-82M), Hugging Face: Apache-2.0 weights; production use welcomed. The model was "trained exclusively on permissive/non-copyrighted audio data", including two CC BY datasets (Koniwa, SIWIS). The card doesn't state a separate licence for the voices.

**Recommendations I treat as optional, not requirements:**
- title length beyond the 100-character limit;
- front-loading keywords;
- thumbnail text size;
- number of tags;
- pinned comments;
- end-screen layout choices;
- publishing time.

## 2. Content-specific review

### Copyright and Content ID

**Assessment: low risk. There are no third-party video clips, photographs, music or fonts.**

| Material | Origin and licence | Risk |
| --- | --- | --- |
| All visuals | Original SVG drawings coded in this project (`src/scenes/episode001Long/`) | None known |
| Patent page (Scene 2) | A schematic redrawn after the figure of US 2,495,429 (1945/1950). US patents are public domain. | None known |
| Narration | Kokoro-82M `af_heart`, generated locally, Apache-2.0 weights | Low. The voice isn't an imitation of a real person. |
| Synthesized sound effects | Original, generated by `scripts/audio/build-ep001-long-sfx.py` | None known |
| Foley | 14 Freesound sounds, each checked as CC0 1.0 on its own page (`episodes/episode-001/long-v1/audio-credits.md`) | Low. CC0 needs no permission. A third party could still have registered the same recording with Content ID by mistake; if so, dispute it with the Freesound page. |
| Music | None | — |
| Fonts | System font stack (Segoe UI) rendered into the picture | Normal use of an installed system font in rendered video |

**Limitation:** I can't run Content ID. YouTube's Checks step is the only real test, and YouTube says its results aren't final.

### Factual accuracy

Every narrated claim traces to `research/episode-001/long-v1/claims.md` (`L##`, verified, simplified or derived, with sources read on 2026-10-28). Hedges carry the points that are disputed:
- "Sometime in the mid-1940s" covers the 1945 vs 1946 discovery date (H01 vs H03).
- "A couple of years later" covers the Radarange's 1946 vs 1947 date (D03).
- "Candy bar" is used without a brand, since the brand is disputed (D01).

**Concerns flagged:**
1. **The dish test's pass condition (S6-03, about 5:48):** the narration says "Hot water and a cool dish? It's fine." The source (S06) supports the *fail* condition: a hot dish isn't microwave-safe. A cool dish is only a good sign. Plastics that pass may still not be meant for microwave use, and the FDA-tested label is what counts (Shorts research X05–X06, K02).
   - **Mitigation:** the description and pinned comment add the caveat. The approved narration is unchanged, as briefed.
   - **If you re-cut later:** change the line to match the Shorts wording.
2. **The 2.5 billion figure:** the narration says "about two and a half billion" times a second (2.45 GHz nominal; L21). That's fine as a rounded, hedged figure. The thumbnail uses the exact **2.45 billion**, because it has no room for "about".
3. **Labels removed in cut 2:** cut 2 removed the "slowed ~2,500,000,000×", cm → nm scale and "analogy" labels at review. The analogy is still framed in the narration ("Here's a picture that helps… That's only a picture") and by its dashed frame, so viewers aren't misled.
4. **Never checked by ear:** the narration and Foley have never been reviewed by listening (`audio-generation.md`). A mispronunciation wouldn't be a policy problem, but it would be a quality and accuracy one.

### Altered or synthetic content disclosure

**Recommendation: No.**
- **Visuals:** the video is fully schematic animation with no photorealistic scenes or footage. Spencer appears only as a generic silhouette and a pocket; no likeness is drawn.
- **Narration:** a synthetic voice, but not a real person's voice, and it doesn't make any real person appear to say anything.
- **Why that's outside the policy:** the policy's triggers are about realism, and it explicitly exempts "AI animation within a fully animated video".
- **Transparency anyway:** the description states the voice is synthetic.

**Residual uncertainty:** YouTube's page doesn't directly address a non-cloned, synthetic narrator voice. If YouTube's guidance changes, or you prefer extra caution, selecting "Yes" is allowed, and YouTube says disclosure alone doesn't limit reach or monetization.

### Misleading metadata

- **Title:** the recommended title promises only what the video delivers: the mechanism, plus the candy-bar story told in its first 30 s and at the end.
- **Working title:** I didn't recommend it, because "accidental discovery" undersells the deliberate testing the video emphasizes. It isn't a policy violation, just less accurate.
- **Thumbnail:** shows the episode's own drawings and a sourced number.
- **Tags and hashtags:** all relevant; no stuffing.

### Repetitive, mass-produced, reused or AI-assisted content (monetization)

- **This video, assessed alone:** low concern.
  - It's an original, researched script with cited sources.
  - The animation was designed for this episode, with a story arc, an analogy, myth corrections and practical consequences.
  - That is substantive educational value, not a template, slideshow or reading of others' material.
- **Channel-level watch-outs:**
  - YPP review looks at the whole channel.
  - The five Shorts reuse this episode's research and some of its sound effects. Each has its own script and visuals, which is the transformative reuse the policy allows.
  - Keep future episodes substantively different (new topics, new visual proxies), as the project brief already intends.
  - Avoid uploading many near-identical cut-downs.
  - A synthetic narrator is allowed as a production tool, but the policy rejects AI content made "with generic or unoriginal templates". The protection is the original research and animation, so keep it visible: the sources in the description, and the on-screen mechanism.
- **Length:** 7:12 is under the 8-minute mid-roll threshold. That's not a compliance issue, just a monetization fact.

### Audience (COPPA)

**Not made for kids.** The intended audience is curious adults and students, roughly 16+ (`docs/project-brief.md`). The language and vocabulary aren't child-directed, and there are no child characters, songs, games or toys. Educational subject matter alone doesn't make content made for kids. This is your legal responsibility; confirm it.

## 3. Unresolved items, in priority order

1. **Listen to the full master before publishing.** The narration and Foley have never been checked by ear.
2. **Check these account facts in Studio:**
   - whether the channel is verified (needed for custom thumbnails);
   - whether the channel is in the YouTube Partner Program (affects ads, Link cards and end-screen links);
   - your licence preference;
   - caption certification;
   - that there's no sponsorship.
3. **Upload the package's `captions.srt`, not the earlier one.** The earlier `renders/episode-001/Long/v3/episode-001-long-cut3.srt` has a timing fault (a 0.47 s cue at 6:50).
   - **Possible follow-up:** fix the caption script's phrase snapping, so a sub-0.1 s dip can't count as a pause. That needs a new caption version.
   - **The Shorts' captions** were built by the same script. I scanned all five `.srt` files: none has a cue shorter than 0.8 s. Two cues run fast but are plausible for the speech: HowMicrowavesWork v2.4 cue 11 at 24.7 characters/s, and MicrowaveSafeDishes v3 cue 18 at 23.6 characters/s.
4. **The dish-test wording:** covered by the description and pinned comment. Fully fixing it would need a new narration take and a re-cut, which this task excludes.
5. **Copyright check:** wait for the Checks result. Content ID can't be predicted locally.
