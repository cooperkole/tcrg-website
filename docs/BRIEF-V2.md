# TCRG website v2: upgrade brief (for Claude Code)

Applies on top of `docs/BRIEF.md` (the original build). Where this file conflicts with the original brief, this file wins. Same session protocol: one step per session, update `PROGRESS.md`, commit, push, say "Step N done, safe to clear," stop. Append this file to the repo as `docs/BRIEF-V2.md` and add Steps 9-13 to `PROGRESS.md`.

Live new site: https://cooperkole.github.io/tcrg-website/ (Astro, static, GitHub Pages)

## Why v2 exists (audit summary, 2026-11-26)

The new site already has more real content than the old Wix site (named clients, 5-step process, placements by category, RG Academy, Senior Advisors, roster, stats). It still feels empty because:

1. Placeholders read as missing content ("Bio coming soon" x10, initials for 7 members, 4x "Date TBD", coffee-chat form "soon", `[CONTACT EMAIL TBD]`).
2. Motion is only a fade-in-on-scroll (IntersectionObserver, ~30 hover transitions, 1 CSS animation, no animation library). Tall whitespace + slow fades = blank screens mid-scroll.
3. Every section has the same shape (eyebrow, heading, blurb, 3 columns). No interactive element, no page transitions.
4. Content the old site had that the new one lacks: the weekly analyst timeline, a sample deck, a group photo, role descriptions for Analyst / Research Lead / Project Lead.

## Decisions from Cooper (2026-11-26)

- "Timeline" = all three: the weekly analyst timeline (priority), the 5-step engagement process, and the recruiting timeline. Also add a short origin timeline.
- Motion rule changes: the original "minimal motion" line (Step 4) is replaced by the motion spec below. `prefers-reduced-motion` still must be respected.
- Selected work shows three recent projects (never current decks). New list: Climate Adaptation & Resilience, Chemicals, Data Centers. Remove Sports Media and Space Technology. Sectors only; the confidentiality rule (never pair a client with a sector) still applies unchanged.
- Chemicals stays a labeled placeholder (no scope text yet). Climate A&R blurb: approved (see Step 10 draft).
- Investor contact email: tuftscapitalresearchgroup@gmail.com (use `mailto:`; replaces `[CONTACT EMAIL TBD]` everywhere).
- Origin: the Tufts Investment Club PE/VC Research Group started in Fall 2023; it became the independently run TCRG in Spring 2026.
- One redacted sample deck is embedded: Climate A&R (Spring 2026, April 2026, 61 slides). File supplied by Cooper (`REDEACTED_26S_Climate_AR.pdf`); keep the source in `source/decks/` (git-ignored). Redaction is verified by Cooper; include all 61 slides, including slide 2 (team page, with its existing wording). No further redaction review needed.
- Member placements: the website's list is the single source of truth (placements change every semester; the deck's list is older and must not be reconciled against).
- Bios are being drafted by members. Until they arrive, hide a bio slot rather than printing "Bio coming soon."
- Client testimonial slot stays hidden until a real, approved quote is supplied.
- Hero skyline photo is fine; add a blur-up placeholder so it never shows as flat navy on slow loads.

## Step 9: Content fixes and de-emptying (no new motion yet)

- `team.json`: add optional `bio`; the About page renders a bio only if present and omits the "Bio coming soon" line entirely. Collapse sections that would render empty.
- Members without photos: keep monogram, but make it designed (consistent tile, hover state), not a gap.
- Join page: render the recruiting timeline from data with a `status` flag (`upcoming | open | closed`) driving a banner. Spring 2027 recruiting begins mid-January 2027. Show steps without date text until dates exist (do not print "Date TBD"). Define "GIM" (general interest meeting) on first use. Hide the coffee-chat block until its form URL exists.
- Fix wording: hero says "market research", rest says "market due diligence". Use "market due diligence" everywhere.
- Replace every `[CONTACT EMAIL TBD]` with the investor email above.
- Remove the 8 empty `<img>` tags (duplicate logo strip) and the duplicate client logo list; fix the photo credit colliding with the fixed nav.
- Add the old-site content that is missing: role descriptions (Analysts research weekly questions and build slides with RLs; Research Leads guide analyst work; Project Leads set overall direction and keep the client aligned), one group-photo slot (labeled placeholder), a short rebrand FAQ (TIC PE/VC RG became TCRG in Spring 2026, now independently run).

## Step 10: Selected work and the deck viewer

Selected work cards (home + Our Work): Climate Adaptation & Resilience, Chemicals, Data Centers. Copy rules:

- Data Centers: reuse existing approved text (value chain, "picks and shovels", core technologies, investment trends, case studies, forward-looking opportunities).
- Climate A&R (approved draft, tighten as needed): the global and U.S. climate adaptation and resilience investment landscape, and where private capital can enter.
- Chemicals: labeled placeholder; invent nothing.
- No client descriptors on any card.

Deck viewer (flagship feature of Our Work)

- Build-time script converts the PDF to page images (e.g. `pdftoppm` then WebP): a ~1600px-wide view size and a ~2800px-wide zoom size per slide. The source is 959.76 x 540 pt (16:9), text-dense, so zoom is mandatory; 1600px alone is unreadable.
- Viewer features: previous/next, keyboard arrows, page counter, thumbnail strip, fullscreen, wheel/pinch/double-click zoom with pan, deep link `?slide=N`, lazy-load adjacent slides only, swipe on mobile, focus-visible controls, `aria-label` per slide ("Climate A&R deck, slide N of 61"), and a text summary beside it for screen readers and SEO.
- Do NOT embed the PDF in an `<iframe>` (iOS Safari shows only page 1). Do not ship the raw PDF to `public/` unless Cooper asks for a download button. If a download is added, strip metadata first (the file's Author field contains a member's name).
- The viewer is data-driven (`src/data/decks.json`: title, term, page count, image folder) so future decks drop in. Only one deck is live now.

## Step 11: Motion system (replace "minimal motion")

Stack: Astro `ClientRouter` (view transitions), GSAP + ScrollTrigger, Lenis smooth scroll. (Verify GSAP's current license terms at build time; its plugins became free in 2025.) No heavy framework, no WebGL gimmicks, no gradients/glassmorphism/emoji. Everything gated by `prefers-reduced-motion` with a static fallback, and Lighthouse stays >= 90 on mobile.

- Page transitions: crossfade between pages; logo and page heading persist via `transition:name`.
- Hero: blur-up LQIP then sharp image, slow scale/parallax, masked line-by-line headline reveal (split lines, not letters). First paint must never be a flat navy block.
- Stats band: count-up on enter (final value exact; no motion for reduced-motion). Keep the dated "as of" note.
- Reveal pacing: shorten fades (~400-600 ms), stagger children, trigger earlier so no blank screens mid-scroll.
- Section variety (break the 3-column template): one oversized statement band; placements as a horizontal-scroll strip grouped Banking / Consulting / Investing; one full-bleed image section with overlaid text; underline/magnetic hover on CTAs.

## Step 12: Timelines (priority)

1. "A week as an analyst" (About or Join; NOT on the investor-facing Work page per the original brief). Content is fixed, use exactly this:
   - Tuesday evening, Meeting #1 (in person): teach-ins and research discussion; tasks assigned for the coming week; prior week's slides due 6 p.m. via Slack to Research Leads.
   - Tuesday to Friday, independent research: form a hypothesis and answer the assigned question; informal RL check-ins; prepare questions for Friday.
   - Friday afternoon, Meeting #2 (in person): discuss findings, brainstorm slide structure, get analysis help; RLs submit final versions of the prior week's slides.
   - Friday to Tuesday, slide creation: build slides, resolve issues with RLs, send draft updates, complete earlier edits.
   - Summary line: 5-10 hours per week. Design: a scroll-linked 7-day track (Tue to Tue) with a progress line that fills as the user scrolls; each phase lights up and shows its card; loop arrow back to Tuesday. Mobile: vertical stepper.
2. Engagement process (Work page): pinned scroll section, five steps (Scoping, Research, Expert calls, Synthesis, Final presentation) with a drawn connector line. Do NOT map steps to specific week numbers unless Cooper supplies them. Subline: 60+ page read-deck, roughly 11-week semester, closes with a client presentation.
3. Recruiting timeline (Join): animated stepper (GIM and application opens, applications due, interviews, final offers) with the data-driven status banner from Step 9.
4. Origin timeline (About): Fall 2023, Tufts Investment Club PE/VC Research Group founded; Spring 2026, becomes the independently run Tufts Capital Research Group; Fall 2026, current semester. Add no other dates.

All timelines are data-driven (`src/data/timelines.json`).

## Step 13: QA

Same as original Step 8, plus: reduced-motion pass, keyboard-only pass of the deck viewer, iOS Safari check (viewer and Lenis), no layout shift from the reveals, and the confidentiality grep (no client next to a sector anywhere, including alt text and the viewer's text summary).

## Open items for Cooper

1. Chemicals scope text (placeholder until supplied).
2. Spring 2027 recruiting dates, when set.
3. Member bios and headshots as they arrive (`team.json` + `public/images/team/`).
4. A group photo for the About page.
5. Whether to offer a PDF download of the sample deck (default: no).

## Resume prompt (Steps 9-13)

```
Continue the TCRG website build in this repo. Read PROGRESS.md first, then only the
sections of docs/BRIEF.md and docs/BRIEF-V2.md needed for the next unchecked step
(v2 wins on conflicts). Do that one step only, following the session protocol:
update PROGRESS.md, commit, push, tell me "Step N done, safe to clear," and stop.
```
