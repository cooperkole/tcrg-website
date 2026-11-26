# TCRG website: progress

## Status
Current step: 12 done (timelines). v2 brief: docs/BRIEF-V2.md (v2 wins on conflicts). Next: Step 13 (QA).
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
- [x] Step 8: Closed early per Cooper (2026-11-26); its quality check goes at the end of the v2 steps
- [x] Step 9 (v2, 2026-11-26): Content fixes and de-emptying (bios hidden until present, designed monograms, recruiting status banner, wording, contact email, duplicate logos, role descriptions, group-photo slot, rebrand FAQ)
- [x] Step 10 (v2, 2026-11-26): Selected work (Climate A&R, Chemicals placeholder, Data Centers) + data-driven deck viewer
- [x] Step 11 (v2, 2026-11-26): Motion system (ClientRouter, GSAP + ScrollTrigger + SplitText, Lenis; reduced-motion fallback; Lighthouse mobile 94-97)
- [x] Step 12 (v2, 2026-11-26): Timelines (analyst week on Join, engagement process on Work, recruiting stepper on Join, origin on About; src/data/timelines.json)
- [ ] Step 13 (v2): QA (old Step 8 + reduced-motion, keyboard deck viewer, iOS Safari, CLS, confidentiality grep)

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
- Headshots (2026-11-26): 31 added from HEADSHOTS/ ("Rachel Ap.jpg" = Natali Apridonidze) (Cooper's upload, left untouched) into src/assets/headshots/ as slug-name files (JPGs resized to 1200px wide). All person cards now 4:5 (compact member cards were square)
- Photos (Step 5): 6 Commons images in use, all checked by eye; credits in CREDITS.md + on-site captions. Rejected: Post Office Square, Back Bay night (hotel sign), Tisch roof, skyline from Tufts

## Placeholders still open
- [ ] E-board and Senior Advisor bios (optional "bio" in team.json/advisors.json; no bio line renders while empty)
- [ ] Headshots missing (monogram shown): Anvitha Paruchuri, Vivaan Misra, Evan Waters, Will Moldenhauer, Henry Pan, Poorna Chakraborty, Jonathan Trinh.
- [ ] Mercer status + AUM source
- [ ] Clients given a heads-up that their logos are on the site
- [ ] Spring 2027 exact recruiting dates + status
- [ ] Coffee-chat Google Form URL (Join block hidden until set); application URL (src/data/recruiting.json links)
- [ ] Total projects completed (years X) (stats.json; hidden while TBD)
- [ ] Placements: no entrepreneurship entries, so intro names banking/consulting/investing only
- [ ] Chemicals scope text (placeholder until supplied)
- [ ] Group photo for About (team.json groupPhotos[0].photo; labeled placeholder tile shows until set)
- [ ] PDF download of sample deck? (default: no; none shipped. If added, strip metadata first: PDF Author field = a member's name)
- [ ] Testimonial (hidden until supplied)
- [ ] Official Tufts campus photos (ask Tufts Communications): only Ballou Hall (Commons, snowy phone shot) in use; Tisch roof + Boston-from-hilltop have no usable image

## Key files
- docs/BRIEF.md: full brief (verbatim) + Decisions section
- astro.config.mjs (site = custom domain), public/CNAME
- src/layouts/Base.astro (fonts, global.css, Header, Footer; prop heroOverlay = transparent fixed header over hero; <ClientRouter /> + head script adding html.motion-intro on first load only; body script lazy-imports src/scripts/motion.ts unless prefers-reduced-motion)
- src/styles/global.css: full design system (tokens at top: palette, type scale, spacing). Accent Tufts Blue only on dark bg (eyebrows, footer headings, focus ring)
- SEO (Step 6): Base.astro props title/description/noindex; emits canonical (trailing slash), OG + Twitter summary_large_image, favicon-32 + apple-touch-icon, theme-color, Organization JSON-LD on home only (adds email once site.json contact.email is set). 404 = noindex, no canonical. src/pages/sitemap.xml.ts hand-written (add new pages to PAGES). public/robots.txt. public/og-image.jpg + icons built by scripts/brand-icons.mjs (sharp; mark cropped from logo)
- public/brand/: tcrg-logo.png (master 3973x1581, same as Logos/), tcrg-logo-navy.png + tcrg-logo-ivory.png (640px, trimmed) built by scripts/brand-logos.mjs (sharp)
- src/pages: index, work, about, join, 404. Redirects /blank* in astro.config.mjs `redirects`
- src/components: Header (sticky, .is-scrolled bg, mobile toggle), Footer (links + e-list), PersonCard (headshot via import.meta.glob of src/assets/headshots, else monogram; TBD -> "Name TBD"), StatsBand (hides TBD), ClientRoster, ContactCta (placeholder text while email empty)
- .claude/launch.json: astro-preview on :4321 (run npm run build first)
- Motion (Step 11): src/scripts/motion.ts (separate ~55 KB gz chunk, never loaded with reduced motion). Per astro:page-load, torn down on astro:before-swap: Lenis (wheel only, touch native; prevented inside [data-deck]; stopped while html.deck-lock), hero scale + parallax, SplitText masked line reveal of hero h1 (first load only; later navigations morph via transition:name), staggered reveals (0.5s, start top 92%, clearProps), stats count-up (exact final text, visually-hidden real value), [data-statement] word fill, photo-band parallax, [data-hstrip] pinned horizontal scroll >=900px (native swipe below), magnetic .button (fine pointer). transition:name: site-logo (Header brand), page-title (every h1). Scripts that run once (Header, ClientRoster, DeckViewer) re-init on astro:page-load; DeckViewer global listeners use an AbortController. Hero LQIP: src/lib/lqip.ts (sharp, 32px pre-blurred WebP data URI; no CSS blur filter: it cost ~1.8s raster on mobile, perf 75 -> 96). GSAP 3.15 Standard no-charge license (all plugins free, incl. SplitText)
- Deck viewer (Step 10): src/data/decks.json (id, live, title, term, pages, source PDF in source/decks/, folder under public/, summary + sections for SR/SEO). scripts/build-deck.mjs <id> (needs `brew install poppler`) renders public/decks/<id>/{view 1600w, zoom 2800w, thumb 320w}/NN.webp (committed; CI cannot run it since the PDF is git-ignored). src/components/DeckViewer.astro (vanilla script; arrows/PageUp/Down/Home/End, +/-/0 zoom, ctrl-wheel/pinch zoom, plain wheel zooms only in full screen, drag pan, swipe, ?slide=N via replaceState, native fullscreen else .is-pseudo-fs overlay for iOS). case-studies.json "deck" links a card to it
- src/data/timelines.json (Step 12): analystWeek (phases with day positions 0=Tue..7=next Tue), engagement (subline + 5 steps; was site.json process), recruiting (steps + dates; was recruiting.json timeline), origin (3 entries). Components: Stepper.astro (recruiting, origin; rail via ::before/::after, --fill), WeekTrack.astro. Work page process markup inline (.process-pin)
- src/data/*.json: site (copy, services, contact, testimonials), team (eboard, members grouped projectLeads/researchLeads/analysts, founders, groupPhotos), advisors (intro + 5), clients (alphabetical, verify/anonymous flags), case-studies (+ sampleDeck.available=false), stats (TBD = hide), placements (path: banking/consulting/investing), recruiting (status upcoming, banner per status, timeline TBD)
- src/data/aum.ts: sourced AUM per client, aumLabel = "$700B+" (total 741.8 rounded down to $50B): Bain ~225 (Aug 2026), HarbourVest 167.9 (6/30/26), Cambridge Associates 326.7 regulatory AUM (Form ADV, 12/31/25), CF Private Equity 17.53 regulatory AUM (Form ADV, Oct 2026), CORE Industrial Partners 1.58 committed capital (site), Tufts 3.1 (5/2026)
- src/data/photos.ts (photo metadata: alt, author, license, focus) + src/assets/photos/ (2400px sources). PhotoBand (full-bleed figure + credit), PhotoCredit. Placement: home hero bostonDusk + customHouse band; work rowesWharf + lowerManhattan; about ballouHall; join beaconHill. CREDITS.md at root
- src/assets/headshots/, src/assets/clients/ (empty; README convention: photo field = file name there)
- .github/workflows/deploy.yml (withastro/action@v6 + deploy-pages@v5, on push to main). Build job env SITE_URL/BASE_PATH = github.io preview; delete when domain connects (DEPLOY.md step 4)
- Base path: astro.config.mjs reads SITE_URL/BASE_PATH (defaults = custom domain, '/'); redirect targets prefixed via to(). src/lib/paths.ts withBase()/stripBase(): ALL internal links/public assets must use withBase('/x')
- DEPLOY.md: domain cutover (Wix registrar + Wix DNS, no MX found 2026-11-25; verify TXT, A/AAAA, www CNAME cooperkole.github.io, HTTPS, rollback values)
- README.md (e-board guide; mentions src/assets/headshots/ and /blank redirects, which Steps 2-3 must create)

## Notes for the next session
- Step 12 done: analyst week is on Join only (original brief keeps the weekly cadence off investor pages; v2 allowed About or Join). Wording kept exactly; items split on the brief's semicolons. Week >=900px: Tue-Tue day track + 4 cards, pinned, scroll fills the line, phases light in turn (meetings hold ~0.6 day), loop "Back to Tuesday" lights at the end; <900px vertical stepper lit as it scrolls. Process >=1000px pinned with drawn connector, vertical below. Steppers draw in once on enter. Static HTML (no JS / reduced motion) = everything drawn and lit; motion adds .tl-anim. Reveals skip [data-tl]. Work process subline now timelines.json engagement.subline (site.deliverable still used on home). Recruiting timeline no longer repeats the banner text under its heading.
- Step 12 bug fix (from Step 11): gsap.matchMedia conditions callback never ran on touch phones (no condition matched), so phones got no reveals/count-up/parallax. Added `all: 'all'` condition. Step 13 should re-run Lighthouse mobile since phones now run motion.
- Step 12 tested in browser at 1400x900 and 375px (emulated touch): pin, fill, current phase, loop, steppers, ClientRouter navigation (no stray pin spacers), no console errors, no horizontal overflow. Not tested: real iOS Safari, reduced motion (code path only) -> Step 13.
- Step 11 done: Lighthouse mobile (local preview) home 96/100/100/100, work 94, about 96, join 97 (a11y/BP/SEO 100 everywhere). Home: new statement band (site.json statement), Custom House PhotoBand with overlay (site.json photoStatement; PhotoBand props eyebrow/text), placements strip shows ALL placements grouped Banking/Consulting/Investing with "featured" names first per group (supersedes the 9-name grid; placements.json featured still used for order). Copy of statement + overlay is mine: Cooper to approve. Text links: underline draws in on hover. Old .reveal/.placement-teaser CSS removed. Reduced-motion verified by code path only; full reduced-motion/keyboard/iOS pass is Step 13. Running Lighthouse (headless Chrome) twice coincided with macOS revoking the app's access to ~/Documents: avoid or run it last.
- Step 10 done: Climate A&R deck live on /work/#sample (all 61 slides; source copied from ~/Downloads/"[REDEACTED] 26S Climate A&R.pdf" to source/decks/REDEACTED_26S_Climate_AR.pdf). Images 30 MB total in repo (view ~165 KB/slide; only current +/-1 slides fetched). Home "Selected work" is now 3 linked cards (work-cards); Our Work cards + scope list, Chemicals shows placeholder text from case-studies.json. Old sampleDeck block/CSS removed (case-studies.json no longer has sampleDeck). Climate scope bullets taken from the deck's own sections. Tested in browser: keyboard, zoom, deep link, thumbnails, section links, mobile 375px, pseudo-fullscreen overlay; real iOS Safari + keyboard-only pass still due in Step 13. Hero blur-up done in Step 11.
- Step 9 done: contact email live (ContactCta = mailto button + visible address; JSON-LD picks it up). Hero h1 now "market due diligence"; hero subline rewritten (was a word-for-word repeat). Hero photo credit moved into flow (was absolute). Monogram = ink tile, hairline inset frame, Tufts Blue rule; hover on all person cards. Client marquee: one <ul> in HTML, script clones it (aria-hidden, alt="") and adds .is-scrolling; no JS/reduced motion = static wrapped row. About: rebrand FAQ (site.json faq, <details>), role line per member group (team.json roles), one group-photo slot. Join: TBD dates print nothing, GIM defined in step 1. Origin copy now says Fall 2023 start. Hero blur-up placeholder (v2 decisions) not done yet: do it in Step 10 or 11.
- Step 7 done: github.io preview works (base /tcrg-website). Cooper does the DNS steps in DEPLOY.md; Wix untouched. Final quality check (old Step 8, now last v2 step): run checks against the preview build (npm run build = custom-domain build; for preview: SITE_URL=https://cooperkole.github.io BASE_PATH=/tcrg-website npx astro build). Link checker must cover /tcrg-website/ prefix.
- Step 6 note: redirects now target /work/ /about/ /join/.
- Step 6: Contrast checked: all text pairs AA (Tufts Blue on ink 5.1:1). One h1, landmarks and img alts on every page. Nav links still use /work (one 301 hop on Pages; fine).
- Step 5 done: <Picture> AVIF/WebP, widths 640-1920, quality 55. Hero 1920w AVIF = 122 KB. Band images up to ~570 KB at 1920w (lazy); lower quality if Lighthouse flags it in Step 8. Hero eyebrow is now ivory (blue rule) for contrast over the photo.
- Design done in Step 4: hairline rules, numbered eyebrows/lists, 5/7 split grid, square buttons, header logo swaps navy/ivory via CSS. Stat label changed to "Combined AUM of clients served". Home h1 copy is mine (Cooper may revise). Group photos/testimonials hidden while empty.
- Logo is high-res, so no text wordmark needed. Logos/ folder at repo root is the original upload; public/brand/ is what the site uses.
- Pages source = GitHub Actions. Custom domain NOT set in repo settings yet (Step 7). Until then the github.io URL is a project path (/tcrg-website/), so root-relative assets look broken there; expected.
- Old site's sample deck: /_files/ugd/9d2749_8fb3b9e74d164b37bc27f29706a4521a.pdf (unredacted? Cooper supplies redacted version)
- Old site team/analyst names are Spring 2026 only; don't reuse
- Image candidates (historical): docs/IMAGE-CANDIDATES.md
