# TCRG website: progress

## Status
Current step: 13 done (QA). All v2 steps complete; site is in maintenance. v2 brief: docs/BRIEF-V2.md (v2 wins on conflicts). Next: Cooper's open items below + domain cutover (DEPLOY.md).
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
- [x] Step 13 (v2, 2026-11-26): QA (builds, links, confidentiality, numbers, 375/768/1440, reduced motion, keyboard deck viewer, CLS, Lighthouse). iOS Safari NOT tested (no Xcode/device)

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
- [ ] Group 1 + Group 2 project-group photos for About (put files in src/assets/group-photos/, set team.json groupPhotos[].photo; labeled placeholders show until set)
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
- Motion (Step 11): src/scripts/motion.ts (separate ~55 KB gz chunk, never loaded with reduced motion). Per astro:page-load, torn down on astro:before-swap: Lenis (wheel only, touch native; prevented inside [data-deck]; stopped while html.deck-lock), hero scale + parallax, SplitText masked line reveal of hero h1 (first load only; later navigations morph via transition:name); plain fade instead when splitting would change the line count (splitChangesLines, avoids CLS), staggered reveals (0.5s, start top 92%, clearProps), stats count-up (exact final text, visually-hidden real value), [data-statement] word fill, photo-band parallax, [data-hstrip] pinned horizontal scroll >=900px (native swipe below), magnetic .button (fine pointer). transition:name: site-logo (Header brand), page-title (every h1). Scripts that run once (Header, ClientRoster, DeckViewer) re-init on astro:page-load; DeckViewer global listeners use an AbortController. Hero LQIP: src/lib/lqip.ts (sharp, 32px pre-blurred WebP data URI; no CSS blur filter: it cost ~1.8s raster on mobile, perf 75 -> 96). GSAP 3.15 Standard no-charge license (all plugins free, incl. SplitText)
- Deck viewer (Step 10): src/data/decks.json (id, live, title, term, pages, source PDF in source/decks/, folder under public/, summary + sections for SR/SEO). scripts/build-deck.mjs <id> (needs `brew install poppler`) renders public/decks/<id>/{view 1600w, zoom 2800w, thumb 320w}/NN.webp (committed; CI cannot run it since the PDF is git-ignored). src/components/DeckViewer.astro (vanilla script; arrows/PageUp/Down/Home/End, +/-/0 zoom, ctrl-wheel/pinch zoom, plain wheel zooms only in full screen, drag pan, swipe, ?slide=N via replaceState, thumbnails = one Tab stop (roving tabindex), native fullscreen else (or if refused) .is-pseudo-fs overlay). case-studies.json "deck" links a card to it
- src/data/timelines.json (Step 12): analystWeek (phases with day positions 0=Tue..7=next Tue), engagement (subline + 5 steps; was site.json process), recruiting (steps + dates; was recruiting.json timeline), origin (3 entries). Components: Stepper.astro (recruiting, origin; rail via ::before/::after, --fill), WeekTrack.astro. Work page process markup inline (.process-pin)
- src/data/*.json: site (copy, services, contact, testimonials), team (eboard, members grouped projectLeads/researchLeads/analysts, founders, groupPhotos), advisors (intro + 5), clients (alphabetical, verify/anonymous flags), case-studies (+ sampleDeck.available=false), stats (TBD = hide), placements (path: banking/consulting/investing), recruiting (status upcoming, banner per status, timeline TBD)
- src/data/aum.ts: sourced AUM per client, aumLabel = "$700B+" (total 741.8 rounded down to $50B): Bain ~225 (Aug 2026), HarbourVest 167.9 (6/30/26), Cambridge Associates 326.7 regulatory AUM (Form ADV, 12/31/25), CF Private Equity 17.53 regulatory AUM (Form ADV, Oct 2026), CORE Industrial Partners 1.58 committed capital (site), Tufts 3.1 (5/2026)
- src/data/photos.ts (photo metadata: alt, author, license, focus) + src/assets/photos/ (2400px sources). PhotoBand (full-bleed figure + credit), PhotoCredit. Placement: home hero bostonDusk + customHouse band; work rowesWharf + lowerManhattan; about ballouHall; join beaconHill. CREDITS.md at root
- src/assets/headshots/, src/assets/clients/ (empty; README convention: photo field = file name there)
- .github/workflows/deploy.yml (withastro/action@v6 + deploy-pages@v5, on push to main). Build job env SITE_URL/BASE_PATH = github.io preview; delete when domain connects (DEPLOY.md step 4)
- Base path: astro.config.mjs reads SITE_URL/BASE_PATH (defaults = custom domain, '/'); redirect targets prefixed via to(). src/lib/paths.ts withBase()/stripBase(): ALL internal links/public assets must use withBase('/x')
- DEPLOY.md: domain cutover (Wix registrar + Wix DNS, no MX found 2026-11-25; verify TXT, A/AAAA, www CNAME cooperkole.github.io, HTTPS, rollback values)
- README.md (e-board guide; mentions src/assets/headshots/ and /blank redirects, which Steps 2-3 must create)

## Edit guide (which file changes what)
- Copy, services, contact email, FAQ, testimonials: src/data/site.json
- People: src/data/team.json (e-board, members, founders, group photo), src/data/advisors.json; headshots in src/assets/headshots/ (file name in "photo")
- Clients + logos: src/data/clients.json + src/assets/clients/; AUM figures (with sources): src/data/aum.ts
- Stats: src/data/stats.json ("TBD" hides a stat). Placements: src/data/placements.json
- Projects: src/data/case-studies.json; sample decks: src/data/decks.json + scripts/build-deck.mjs
- Recruiting status/links: src/data/recruiting.json; timelines (week, process, recruiting, origin): src/data/timelines.json
- Photos: src/data/photos.ts + src/assets/photos/ + CREDITS.md (6 Commons images; credits listed there and on-site)

## Step 13 QA results (2026-11-26)
- Builds (custom domain + github.io preview): 0 warnings/errors. Links: 0 broken internal (both builds, incl. #anchors, srcset); Commons/CC/Instagram/Google Form return 200; LinkedIn blocks bots (not verifiable)
- Confidentiality: no client within 300 chars of any sector in text/alt/aria/meta on any page; deck title slide "Prepared for" is redacted; deck slide WebPs carry no metadata; decks.json/case-studies.json name no client
- Numbers: every figure traces to the brief/Decisions, stats.json or aum.ts (sourced); TBD stats hidden
- Lighthouse mobile (local preview): home 96/100/100/100, work 96, about 97, join 97 (a11y/BP/SEO 100, CLS 0 all pages). Home desktop 100/100/100/100
- Viewports 375/768/1440 checked by eye (375 in the browser pane; headless Chrome can't go below ~500px, so its 375 shots look clipped: not a site bug)
- Fixed in Step 13: placements strip snapped 20px past the gutter on load (scroll-padding-inline); "Join the e-list" wrapped at 768 (.button nowrap); deck thumbnails were 61 Tab stops (now roving tabindex: one stop, arrows/Home/End inside); full screen did nothing when the browser refuses native full screen (now falls back to the overlay); reveals used autoAlpha (visibility:hidden hid unrevealed headings/text from screen readers; now opacity only); statement band had aria-label on <p> (SplitText aria:'none') and dimmed words at 0.16 (now 0.47 = 3:1); unlit timeline steps faded to opacity .32 (failed contrast; now gray title + hairline marker/border); fonts preloaded (swap shifted the hero); hero line-split added a line at some phone widths (e.g. 412px) and shifted the hero: motion.ts splitChangesLines() measures first and uses a plain fade when it would; footer logo given explicit width
- Reduced motion: checked with Chrome --force-prefers-reduced-motion at 768/1440: all content visible and static, timelines drawn and lit, motion chunk not imported (Base.astro gate)
- Deck viewer keyboard: Tab into stage, arrows/PageUp/PageDown/Home/End, +/-/0 zoom, Tab through controls, thumbnails, Escape closes overlay with focus back on the stage, ?slide=N updates. Native full screen not testable in the app's browser pane (request never settles there)
- Not tested: real iOS Safari (viewer pinch/pseudo full screen, Lenis off on touch). Test on an iPhone after the domain is live, or install Xcode for the Simulator

## Step 14: Cooper's v3 feedback (2026-11-26)
- Photo credits removed site-wide (photographers consented to no credit; CREDITS.md kept as the record). PhotoBand now fades into neighbouring sections (mask + gradient between --band-above/--band-below; props fade both|top|none, size default|short|thin, above/below ivory|alt)
- Home: new hero copy; statement "actionable insights"; anonymous-client footnote removed; "How it works" brackets steps 02-04 as repeating weekly (timelines.engagement.repeatsWeekly; Work shows a Weekly tag); Expert insights band shorter, fades from top; "Where members go" = the 9 featured placements, static (no pinned horizontal scroll)
- Work: senior advisors 2-3; "Three recent projects."; deck summary: "About this deck" is sticky beside the section list (>=900px)
- About: FAQ removed (site.json faq deleted); Ballou band thin; two group-photo slots (Group 1/2) side by side
- Join: week-track labels in two rows (meetings above, stretches below) so they never overlap; current phase = raised white card + blue top bar, current label = blue pill
- Max Nielsen headshot replaced (HEADSHOTS/New Max N-2.jpg)

## Archive
- Steps 0-7 (2026-11-25): plan, Astro 7 repo, content, pages, design system, Commons photography, SEO (canonical/OG/JSON-LD/sitemap), GitHub Pages deploy (preview at /tcrg-website/). Cooper does DNS per DEPLOY.md; Wix untouched
- Step 8: folded into Step 13
- Step 9: contact email live, monograms, recruiting banner, rebrand FAQ, role lines, group-photo slot
- Step 10: Climate A&R deck (61 slides, 30 MB WebP in public/decks/climate-ar), 3 work cards, Chemicals placeholder
- Step 11: ClientRouter + GSAP (Standard no-charge license, SplitText free) + Lenis; hero LQIP via src/lib/lqip.ts (no CSS blur: cost 1.8s raster on mobile). Statement + photo-overlay copy is Claude's: Cooper to approve. Running Lighthouse once coincided with macOS revoking ~/Documents access: run it last
- Step 12: analyst week on Join only; process pinned >=1000px; matchMedia `all` condition so phones get motion
- Old site sample deck path /_files/ugd/9d2749_8fb3b9e74d164b37bc27f29706a4521a.pdf (possibly unredacted: don't reuse). Old site names are Spring 2026 only: don't reuse. Image candidates: docs/IMAGE-CANDIDATES.md
