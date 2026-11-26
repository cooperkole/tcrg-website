# TCRG website: progress

## Status
Current step: 0 done (plan approved). Next: Step 1 (Repo and stack).
Live URL: not deployed yet   Repo: local only (remote created in Step 1 under cooperkole, public)

## Steps
- [x] Step 0: Plan approved (2026-11-25)
- [ ] Step 1: Repo and stack
- [ ] Step 2: Content
- [ ] Step 3: Pages
- [ ] Step 4: Design
- [ ] Step 5: Photography
- [ ] Step 6: SEO and basics
- [ ] Step 7: Deploy and domain
- [ ] Step 8: Quality check and final report

## Decisions (approved by Cooper)
- Palette: Ink #0E1A2B, Jumbo Blue #002E6D (links), Tufts Blue #3E8EDE (accent, large text/dark bg only; source brand.tufts.edu/guidelines/color), Ivory #F7F4EE, Candle White #F2EDE7, text-2 #5E5C57, hairline #D9D3C7
- Fonts: Newsreader (display) + Inter (body), self-hosted via Fontsource. Stack: Astro static (CSS choice made in Step 1)
- Refs: centerview.com, hf.com, pwpartners.com
- URLs: /work, /about, /join; redirect pages at /blank, /blank-1, /blank-2
- Hosting: public repo on cooperkole, GitHub Pages via Actions
- Case studies: no client descriptors at all; client roster is a separate section, never mapped to sectors
- Clients (for investors) and member placements (for students) are two separate lists
- E-board roles: President = Fares Danial; Head of Operations = Cooper Kolehmainen; Head of Research, Treasurer, Marketing = TBD. Every staff card has a bio field (placeholder)
- Senior Advisors: 5 cards, all TBD (one "Bruno TBD"), each with bio placeholder
- Founders section (Mathis Weber, Otto Laakso) goes below all current staffing on About
- Stats (Fall 2026): 4 PLs, 5 RLs, 20 Analysts; 2 current projects; 17 expert calls this semester as of 2026-11-25; total projects = 2/semester x X years (X TBD)
- Guggenheim placement = Guggenheim Securities
- Combined AUM includes Tufts endowment value; unnamed fund excluded
- Recruiting: Spring 2027 starts mid-January 2027; add coffee-chat Google Form CTA on Join
- Image list: Wikimedia Commons candidates in Step 0 proposal (see BRIEF Decisions #12); verify each visually in Step 5

## Placeholders still open
- [ ] E-board: Head of Research, Treasurer, Marketing names; all bios (src/data/team.json)
- [ ] 5 Senior Advisors' names and bios (src/data/advisors.json)
- [ ] Fall 2026 member roster (src/data/team.json)
- [ ] Investor contact email
- [ ] Spring 2027 exact recruiting dates + status
- [ ] Coffee-chat Google Form URL
- [ ] Total projects completed (years X)
- [ ] [VERIFY] CF Private Equity, Core Industrial Partners exact names/sites; PJT/PWP (PJT Partners, Perella Weinberg, or both)
- [ ] Redacted sample deck PDF (public/docs/tcrg-sample-deck.pdf)
- [ ] Testimonial (hidden until supplied)
- [ ] Official Tufts campus photos (ask Tufts Communications)

## Key files
- docs/BRIEF.md: full brief (verbatim) + Decisions section
- (site files created from Step 1)

## Notes for the next session
- Logo (high-res PNG 3973x1581): https://static.wixstatic.com/media/9d2749_d6d43482ce2f4ccca8900e85c36fe1af~mv2.png (download in Step 4)
- Old site's sample deck: /_files/ugd/9d2749_8fb3b9e74d164b37bc27f29706a4521a.pdf (unredacted? Cooper supplies redacted version)
- Old site team/analyst names are Spring 2026 only; don't reuse
- Image candidates: docs/IMAGE-CANDIDATES.md
