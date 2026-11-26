# TCRG website: progress

## Status
Current step: 7 done. Next: Step 8 (Quality check and final report).
Live URL: https://cooperkole.github.io/tcrg-website/ (preview; custom domain not connected, see DEPLOY.md)   Repo: https://github.com/cooperkole/tcrg-website (public)

## Steps
- [x] Step 0: Plan approved (2026-11-25)
- [x] Step 1: Repo and stack (2026-11-25)
- [x] Step 2: Content (2026-11-25)
- [x] Step 3: Pages (2026-11-25)
- [x] Step 4: Design (2026-11-25)
- [x] Step 5: Photography (2026-11-25)
- [x] Step 6: SEO and basics (2026-11-25)
- [x] Step 7: Deploy and domain (2026-11-25)
- [ ] Step 8: Quality check and final report

## Decisions (approved by Cooper)
- Palette: Ink #0E1A2B, Jumbo Blue #002E6D (links), Tufts Blue #3E8EDE (accent, large text/dark bg only; source brand.tufts.edu/guidelines/color), Ivory #F7F4EE, Candle White #F2EDE7, text-2 #5E5C57, hairline #D9D3C7
- Fonts: Newsreader (display) + Inter (body), self-hosted via Fontsource. Stack: Astro 7 static + plain CSS (tokens in src/styles/global.css; site is small and plain CSS keeps markup readable for future e-boards)
- Refs: centerview.com, hf.com, pwpartners.com
- URLs: /work, /about, /join; redirect pages at /blank, /blank-1, /blank-2
- Hosting: public repo on cooperkole, GitHub Pages via Actions
- Case studies: no client descriptors at all; client roster is a separate section, never mapped to sectors
- Clients (for investors) and member placements (for students) are two separate lists
- E-board (2026-11-26): Fares Danial (President), Luka Souza (Head of Research; staffing sheet says VP, Cooper said Head of Research), Cooper Kolehmainen (Head of Operations). Treasurer + Marketing removed from site. E-board also serves as Senior Advisors. Bios still placeholders
- Senior Advisors (2026-11-26): upperclassmen with 3+ projects; Monish Aswani + Henry Pan = RG Academy Heads; Poorna Chakraborty, Jonathan Trinh, Max Nielsen. RG Academy block on About. Bruno dropped
- Founders section (Mathis Weber, Otto Laakso) goes below all current staffing on About
- Stats (Fall 2026, updated 2026-11-26): 4 PLs, 4 RLs, 20 Analysts (one group, no separate new class; each member card shows "Joined <semester>" from team.json joined); "Active projects" 2; "Expert calls as of <visitor's today>" 17 (date set client-side in StatsBand); "Cumulative AUM of clients served"; total projects = 2/semester x X years (X TBD)
- Member project codes (P3TR / Bain Cap) stored in team.json "project" but NOT rendered (no client-to-people mapping)
- Clients: home shows a right-to-left logo marquee (ClientRoster.astro; official SVG logos from each client's site in src/assets/clients/, fetched 2026-11-26, grayscale, sized by aspect ratio; anonymous fund as footnote). Mercer added 2026-11-26, status assumed past; not in AUM total (no public figure found)
- Guggenheim placement = Guggenheim Securities
- Placements: Citibank, Deutsche Bank, Jefferies added 2026-11-26. Home page shows placements.json "featured" (9, Cooper's order): Bain Capital, Warburg Pincus, Bridgewater, Bain & Company, Morgan Stanley, McKinsey, Jefferies, Citibank, Putnam
- Logo bar order: Mercer first, Bain Capital in Mercer's old slot (clients.json array order)
- Client names confirmed by Cooper 2026-11-25: CF Private Equity (cfprivateequity.com), CORE Industrial Partners (coreipfund.com); PWP = Perella Weinberg Partners; Warburg Pincus added to placements
- Combined AUM includes Tufts endowment value; unnamed fund excluded
- Recruiting: Spring 2027 starts mid-January 2027; add coffee-chat Google Form CTA on Join
- Photos (Step 5): 6 Commons images in use, all checked by eye; credits in CREDITS.md + on-site captions. Rejected: Post Office Square, Back Bay night (hotel sign), Tisch roof, skyline from Tufts

## Placeholders still open
- [ ] E-board and Senior Advisor bios; headshots
- [ ] Mercer status + AUM source
- [ ] Clients given a heads-up that their logos are on the site
- [ ] Investor contact email (src/data/site.json contact.email)
- [ ] Spring 2027 exact recruiting dates + status
- [ ] Coffee-chat Google Form URL; application URL (src/data/recruiting.json links)
- [ ] Total projects completed (years X) (stats.json; hidden while TBD)
- [ ] Placements: no entrepreneurship entries, so intro names banking/consulting/investing only
- [ ] Redacted sample deck PDF (public/docs/tcrg-sample-deck.pdf)
- [ ] Testimonial (hidden until supplied)
- [ ] Official Tufts campus photos (ask Tufts Communications): only Ballou Hall (Commons, snowy phone shot) in use; Tisch roof + Boston-from-hilltop have no usable image

## Key files
- docs/BRIEF.md: full brief (verbatim) + Decisions section
- astro.config.mjs (site = custom domain), public/CNAME
- src/layouts/Base.astro (fonts, global.css, Header, Footer; prop heroOverlay = transparent fixed header over hero; inline reveal-on-scroll script, skipped for prefers-reduced-motion)
- src/styles/global.css: full design system (tokens at top: palette, type scale, spacing). Accent Tufts Blue only on dark bg (eyebrows, footer headings, focus ring)
- SEO (Step 6): Base.astro props title/description/noindex; emits canonical (trailing slash), OG + Twitter summary_large_image, favicon-32 + apple-touch-icon, theme-color, Organization JSON-LD on home only (adds email once site.json contact.email is set). 404 = noindex, no canonical. src/pages/sitemap.xml.ts hand-written (add new pages to PAGES). public/robots.txt. public/og-image.jpg + icons built by scripts/brand-icons.mjs (sharp; mark cropped from logo)
- public/brand/: tcrg-logo.png (master 3973x1581, same as Logos/), tcrg-logo-navy.png + tcrg-logo-ivory.png (640px, trimmed) built by scripts/brand-logos.mjs (sharp)
- src/pages: index, work, about, join, 404. Redirects /blank* in astro.config.mjs `redirects`
- src/components: Header (sticky, .is-scrolled bg, mobile toggle), Footer (links + e-list), PersonCard (headshot via import.meta.glob of src/assets/headshots, else monogram; TBD -> "Name TBD"), StatsBand (hides TBD), ClientRoster, ContactCta (placeholder text while email empty)
- .claude/launch.json: astro-preview on :4321 (run npm run build first)
- src/data/*.json: site (copy, services, process, contact, testimonials), team (eboard, members grouped projectLeads/researchLeads/analysts, founders, groupPhotos), advisors (intro + 5), clients (alphabetical, verify/anonymous flags), case-studies (+ sampleDeck.available=false), stats (TBD = hide), placements (path: banking/consulting/investing), recruiting (status upcoming, banner per status, timeline TBD)
- src/data/aum.ts: sourced AUM per client, aumLabel = "$700B+" (total 741.8 rounded down to $50B): Bain ~225 (Aug 2026), HarbourVest 167.9 (6/30/26), Cambridge Associates 326.7 regulatory AUM (Form ADV, 12/31/25), CF Private Equity 17.53 regulatory AUM (Form ADV, Oct 2026), CORE Industrial Partners 1.58 committed capital (site), Tufts 3.1 (5/2026)
- src/data/photos.ts (photo metadata: alt, author, license, focus) + src/assets/photos/ (2400px sources). PhotoBand (full-bleed figure + credit), PhotoCredit. Placement: home hero bostonDusk + customHouse band; work rowesWharf + lowerManhattan; about ballouHall; join beaconHill. CREDITS.md at root
- src/assets/headshots/, src/assets/clients/ (empty; README convention: photo field = file name there)
- .github/workflows/deploy.yml (withastro/action@v6 + deploy-pages@v5, on push to main). Build job env SITE_URL/BASE_PATH = github.io preview; delete when domain connects (DEPLOY.md step 4)
- Base path: astro.config.mjs reads SITE_URL/BASE_PATH (defaults = custom domain, '/'); redirect targets prefixed via to(). src/lib/paths.ts withBase()/stripBase(): ALL internal links/public assets must use withBase('/x')
- DEPLOY.md: domain cutover (Wix registrar + Wix DNS, no MX found 2026-11-25; verify TXT, A/AAAA, www CNAME cooperkole.github.io, HTTPS, rollback values)
- README.md (e-board guide; mentions src/assets/headshots/ and /blank redirects, which Steps 2-3 must create)

## Notes for the next session
- Step 7 done: github.io preview works (base /tcrg-website). Cooper does the DNS steps in DEPLOY.md; Wix untouched. Step 8: run checks against the preview build (npm run build = custom-domain build; for preview: SITE_URL=https://cooperkole.github.io BASE_PATH=/tcrg-website npx astro build). Link checker must cover /tcrg-website/ prefix.
- Step 6 note: redirects now target /work/ /about/ /join/.
- Step 6: Contrast checked: all text pairs AA (Tufts Blue on ink 5.1:1). One h1, landmarks and img alts on every page. Nav links still use /work (one 301 hop on Pages; fine).
- Step 5 done: <Picture> AVIF/WebP, widths 640-1920, quality 55. Hero 1920w AVIF = 122 KB. Band images up to ~570 KB at 1920w (lazy); lower quality if Lighthouse flags it in Step 8. Hero eyebrow is now ivory (blue rule) for contrast over the photo.
- Design done in Step 4: hairline rules, numbered eyebrows/lists, 5/7 split grid, square buttons, header logo swaps navy/ivory via CSS. Stat label changed to "Combined AUM of clients served". Home h1 copy is mine (Cooper may revise). Group photos/testimonials hidden while empty.
- Logo is high-res, so no text wordmark needed. Logos/ folder at repo root is the original upload; public/brand/ is what the site uses.
- Pages source = GitHub Actions. Custom domain NOT set in repo settings yet (Step 7). Until then the github.io URL is a project path (/tcrg-website/), so root-relative assets look broken there; expected.
- Old site's sample deck: /_files/ugd/9d2749_8fb3b9e74d164b37bc27f29706a4521a.pdf (unredacted? Cooper supplies redacted version)
- Old site team/analyst names are Spring 2026 only; don't reuse
- Image candidates (historical): docs/IMAGE-CANDIDATES.md
