# TCRG website: progress

## Status
Current step: 2 done. Next: Step 3 (Pages).
Live URL: not live yet (custom domain pending Step 7)   Repo: https://github.com/cooperkole/tcrg-website (public)

## Steps
- [x] Step 0: Plan approved (2026-11-25)
- [x] Step 1: Repo and stack (2026-11-25)
- [x] Step 2: Content (2026-11-25)
- [ ] Step 3: Pages
- [ ] Step 4: Design
- [ ] Step 5: Photography
- [ ] Step 6: SEO and basics
- [ ] Step 7: Deploy and domain
- [ ] Step 8: Quality check and final report

## Decisions (approved by Cooper)
- Palette: Ink #0E1A2B, Jumbo Blue #002E6D (links), Tufts Blue #3E8EDE (accent, large text/dark bg only; source brand.tufts.edu/guidelines/color), Ivory #F7F4EE, Candle White #F2EDE7, text-2 #5E5C57, hairline #D9D3C7
- Fonts: Newsreader (display) + Inter (body), self-hosted via Fontsource. Stack: Astro 7 static + plain CSS (tokens in src/styles/global.css; site is small and plain CSS keeps markup readable for future e-boards)
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
- Client names confirmed by Cooper 2026-11-25: CF Private Equity (cfprivateequity.com), CORE Industrial Partners (coreipfund.com); PWP = Perella Weinberg Partners; Warburg Pincus added to placements
- Combined AUM includes Tufts endowment value; unnamed fund excluded
- Recruiting: Spring 2027 starts mid-January 2027; add coffee-chat Google Form CTA on Join
- Image list: Wikimedia Commons candidates in Step 0 proposal (see BRIEF Decisions #12); verify each visually in Step 5

## Placeholders still open
- [ ] E-board: Head of Research, Treasurer, Marketing names; all bios (src/data/team.json)
- [ ] 5 Senior Advisors' names and bios (src/data/advisors.json)
- [ ] Fall 2026 member roster (src/data/team.json)
- [ ] Investor contact email (src/data/site.json contact.email)
- [ ] Spring 2027 exact recruiting dates + status
- [ ] Coffee-chat Google Form URL; application URL (src/data/recruiting.json links)
- [ ] Total projects completed (years X) (stats.json; hidden while TBD)
- [ ] Placements: no entrepreneurship entries, so intro names banking/consulting/investing only
- [ ] Redacted sample deck PDF (public/docs/tcrg-sample-deck.pdf)
- [ ] Testimonial (hidden until supplied)
- [ ] Official Tufts campus photos (ask Tufts Communications)

## Key files
- docs/BRIEF.md: full brief (verbatim) + Decisions section
- astro.config.mjs (site = custom domain), public/CNAME
- src/layouts/Base.astro (fonts + global.css), src/pages/index.astro (placeholder)
- src/data/*.json: site (copy, services, process, contact, testimonials), team (eboard, members grouped projectLeads/researchLeads/analysts, founders, groupPhotos), advisors (intro + 5), clients (alphabetical, verify/anonymous flags), case-studies (+ sampleDeck.available=false), stats (TBD = hide), placements (path: banking/consulting/investing), recruiting (status upcoming, banner per status, timeline TBD)
- src/data/aum.ts: sourced AUM per client, aumLabel = "$700B+" (total 741.8 rounded down to $50B): Bain ~225 (Aug 2026), HarbourVest 167.9 (6/30/26), Cambridge Associates 326.7 regulatory AUM (Form ADV, 12/31/25), CF Private Equity 17.53 regulatory AUM (Form ADV, Oct 2026), CORE Industrial Partners 1.58 committed capital (site), Tufts 3.1 (5/2026)
- src/assets/headshots/, src/assets/clients/ (empty; README convention: photo field = file name there)
- .github/workflows/deploy.yml (withastro/action@v6 + deploy-pages@v5, on push to main)
- README.md (e-board guide; mentions src/assets/headshots/ and /blank redirects, which Steps 2-3 must create)

## Notes for the next session
- Step 3: none of the data is wired into pages yet. Hide entries with name/value "TBD" only where noted (stats, testimonials, empty links); TBD people still render as placeholder cards with monograms.
- Headshots live in src/assets/headshots/ per README (brief said public/images/team/; README convention kept so Astro can optimize/crop uniformly).
- Pages source = GitHub Actions. Custom domain NOT set in repo settings yet (Step 7). Until then the github.io URL is a project path (/tcrg-website/), so root-relative assets look broken there; expected.
- Logo (high-res PNG 3973x1581): https://static.wixstatic.com/media/9d2749_d6d43482ce2f4ccca8900e85c36fe1af~mv2.png (download in Step 4)
- Old site's sample deck: /_files/ugd/9d2749_8fb3b9e74d164b37bc27f29706a4521a.pdf (unredacted? Cooper supplies redacted version)
- Old site team/analyst names are Spring 2026 only; don't reuse
- Image candidates: docs/IMAGE-CANDIDATES.md
