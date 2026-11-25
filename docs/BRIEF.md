Role and goal
You are building a new website for the Tufts Capital Research Group (TCRG) to replace the current Wix site at https://www.tuftscapitalresearchgroup.com. Create a GitHub repository, build the site, and set it up to deploy so the custom domain can be pointed at it later.
Positioning: TCRG is a student-run group at Tufts that produces bespoke, pro bono market due diligence for institutional investors, including billion-dollar private equity firms, endowments, and investment advisors. The site should read like a premium boutique research and advisory firm (think top-tier strategy consulting or PE firm websites): restrained, confident, and built on evidence. It should not read like a generic college club page. It must also stay honest: never call TCRG a "firm," never call it a paid service, and never claim credentials it doesn't have. Credibility comes from specifics (named clients, AUM, depth of deliverables, expert calls, placements), not adjectives. Do not use words like "elite," "world-class," or "premier."
Before writing code, read the current site yourself (all four pages: `/`, `/blank` = Our Work, `/blank-1` = About Us, `/blank-2` = Join). The facts below come from it plus internal context, and where the two disagree, these facts take priority.
Session protocol (applies to every step)
I'll clear the chat after each step to save tokens, so the repo itself has to carry all context between sessions. Follow these rules exactly:

* Two files are the source of truth:
   * `docs/BRIEF.md`: this full brief, saved verbatim. It doesn't change, except that you append my answers to the open items in a `## Decisions` section at the bottom.
   * `PROGRESS.md` (repo root): the running state of the build, in the format below.
* Do one step per session. At the start of a session, read `PROGRESS.md` first, then only the parts of `docs/BRIEF.md` that the current step needs. Don't re-read the whole repo; open only the files that step touches.
* End every step the same way: update `PROGRESS.md`, commit with a message like `Step 3: pages built`, push (once the remote exists), then tell me "Step N done, safe to clear" and stop. Don't start the next step.
* If a session gets cut off mid-step, the next session should use the git log and `PROGRESS.md` to work out what was finished, and resume from there rather than redoing work.
* Keep `PROGRESS.md` short (under ~150 lines). Record decisions and state, not narration. Move anything that's no longer needed to a `## Archive` section at the bottom, condensed to one line per step.

`PROGRESS.md` format:
markdown

```markdown
# TCRG website: progress

## Status
Current step: N (name). Next: Step N+1 (name).
Live URL: …   Repo: …

## Steps
- [x] Step 0: Plan approved (date)
- [ ] Step 1: Repo and stack
- … (one line per step in the brief, Steps 0–8)

## Decisions (approved by Cooper)
- Palette: …  Fonts: …  Stack choice: …
- Case-study client labels: …
- (each answered open item, one line)

## Placeholders still open
- [ ] Fall 2026 e-board names (src/data/team.json)
- …

## Key files
- Content: src/data/… (what each file controls)
- Styles/tokens: …

## Notes for the next session
- Anything unfinished, known bugs, or commands to run first (max 5 bullets)
```

Step 0: Setup and plan checkpoint (stop and wait for my approval)
First, save this entire prompt verbatim as `docs/BRIEF.md`, create `PROGRESS.md` in the format above, and run `git init`.
Then, before building, show me:

1. The sitemap and the section order on each page.
2. The design direction: palette hex values, the two typefaces, and 2–3 reference sites whose feel you're matching.
3. The image list: every stock photo you plan to use, with source URL, license, and what it shows.
4. Every point in "Open items" below that you need me to answer.

Once I answer, write my decisions into `docs/BRIEF.md` (under `## Decisions`) and into `PROGRESS.md`, commit, and stop. Step 1 starts in a fresh session.
Step 1: Repo and stack

* Stack: Astro (static output) with plain CSS or Tailwind (your choice, explain why in one line). No heavy JS frameworks. Target a Lighthouse score of at least 95 on performance, accessibility, best practices, and SEO.
* Keep all content in data files (`src/data/*.json` or `.ts`): team, advisors, clients, case studies, stats, placements, and recruiting dates. Non-technical club members must be able to update headshots, names, and clients each semester without touching layout code.
* Create the repo with `gh repo create tcrg-website --public --source=. --push`. It's public because GitHub Pages on a free plan requires a public repo. If my account is on a paid plan or I'd rather deploy on Vercel or Netlify, ask me whether to make it private.
* Deploy with GitHub Pages using GitHub Actions (Astro's official deploy workflow). Add `public/CNAME` containing `www.tuftscapitalresearchgroup.com`, and set `site` in `astro.config` to match.
* Write a `README.md` for future e-boards covering: how to run it locally, how to swap a headshot, how to add a client or a new semester's team, and how deployment works.

Step 2: Content (use these facts and invent nothing)
Identity

* Name: Tufts Capital Research Group (TCRG). Footer: "© 2026 Tufts Capital Research Group, Inc."
* Origin: started as the Tufts Investment Club's PE/VC Research Group and became TCRG, an independently run branch, in Spring 2026.
* Co-founders: Mathis Weber and Otto Laakso.
* What we do: client-tailored market due diligence on a vertical the client chooses. This is often a space being considered for an upcoming fund, or a thesis no one at the firm has had time to pursue.
* Deliverable: a 60+ page read-deck built on secondary research and expert interviews, delivered over a roughly 11-week semester-long engagement and ending in a final presentation to the client.
* Services (rewrite these more sharply; the current site misspells "Diligence"):
   1. Comprehensive diligence: value chain, technology, regulation, competitive landscape.
   2. Expert insights: calls with industry experts, going beyond secondary research.
   3. Investment recommendations: high-potential strategies, acquisition targets, and risk considerations.

Clients

* Current (Fall 2026): Bain Capital, plus a second engagement with an unnamed private fund. Show it as "a private investment fund."
* Past: HarbourVest Partners, Cambridge Associates, CF Private Equity, Core Industrial Partners, and the Tufts Investment Office (Tufts University's endowment).
* Mark `CF Private Equity` and `Core Industrial Partners` as [VERIFY EXACT NAME]. They've been referred to by other names internally, so confirm the correct firm (and its website) before displaying them.
* Client logos: don't fetch or display real client logos yet. Render each client as a clean typographic wordmark tile in the site's own type, and add a `logo` field in the data file for later. We plan to give clients a courtesy heads-up before using their logos.
* Combined client AUM stat: compute it only from figures each firm publicly reports (cite the source and date in a code comment next to each number). If you can't source a figure, leave that firm out of the total and tell me. Display the result as "Clients with combined AUM of $X+" and round it down.

Confidentiality rule (hard constraint)
We may disclose a client or an industry, but never which client worked on which industry. Our past investments can still be live.

* The client roster and the project/sector showcase must be separate sections with no mapping between them. Don't put a client name or logo next to a project, and don't order the two lists in parallel.
* The current site's case studies describe clients as "university endowment" (Space Technology), "industrials-focused private equity firm" (Data Centers), and "global investment firm with $72.9B AUM" (Sports Media). Next to a named client list, those descriptors let readers identify the client. On the new site, either drop the client descriptor from each case study or replace it with something generic like "Institutional investor." Flag this for me in Step 0. Don't decide it silently.

Selected work (from the current site; rewrite more sharply, without the client descriptors)

* Sports Media: investment opportunities across infrastructure, distributors, rights owners, and end platforms; recommended high-potential strategies in technology, real estate, franchises, and emerging startups.
* Space Technology: regulatory landscape and key players in satellite communications, commercial launch, and space tourism; a technology overview assessing investment risks and opportunities.
* Data Centers: the data center value chain and "picks and shovels" businesses; core technologies, investment trends, case studies, and forward-looking opportunities.
* Leave room for a "Sample work" block that links to a redacted deck PDF at `public/docs/tcrg-sample-deck.pdf` (I'll supply it). Until then, show a tasteful placeholder card with no broken links.

How an engagement works

* Team per project: 1–2 Project Leads, 2–3 Research Leads, 6–8 Analysts, plus one active Senior Advisor per client engagement.
* Present this as a clear process (Scoping → Research → Expert calls → Synthesis → Final presentation), not as a description of club meetings.
* Keep the internal weekly cadence (Tuesday/Friday meetings, Slack deadlines) off the client-facing pages. It belongs only on the Join page, and only briefly.

People

* Leadership: the current site shows Spring 2026 leadership, which is now outdated. Build the leadership section from `src/data/team.json` with placeholder entries. The confirmed Fall 2026 roles are: Fares Danial, President and Cooper Kolehmainen, Head of Operations. Every other role should be a placeholder (`"name": "TBD", "role": "…"`) for me to fill in.
* Senior Advisors: a new section with its own short explanation of the role (experienced investors who guide each engagement). Include placeholder cards only. One advisor's first name is Bruno; leave the full name as TBD.
* Members: grouped by role (Project Leads, Research Leads, Analysts) and generated from data. Use placeholder entries; I'll supply the Fall 2026 roster.
* Headshots: read from `public/images/team/{firstname-lastname}.jpg`. Until a photo exists, render a consistent monogram placeholder, not a broken image or stock face. All headshots should be cropped to the same aspect ratio and given the same subtle treatment (e.g. a light desaturation that clears on hover) so photos from different shoots look uniform.
* Group photo slots: add clearly labeled placeholders for "Fall 2026 new member class," "Leadership team," and "Final client presentation." These must look intentional (aspect-ratio boxes with a caption), not broken.
* Member placements ("Where our members have gone"): Morgan Stanley, Nomura, Greenhill, PJT/PWP ([VERIFY: the current site's logo file says "PWP" — confirm Perella Weinberg Partners]), Bain Capital, PwC, Bridgewater Associates, Société Générale, Guggenheim, McKinsey & Company, Bank of America, BCG, Oliver Wyman, Altman Solon, Bain & Company, Putnam, and EY-Parthenon. Show these as typographic wordmarks for now. Frame them around the range of paths members take (banking, consulting, investing, entrepreneurship), not as a trophy wall.

Testimonials

* Add one testimonial slot and leave it as a placeholder. We may get approval to quote client feedback, but don't write or paraphrase any quote. Hide the section entirely while it's empty.

Join page

* Open to all Tufts undergraduates, any major or class year. No prior finance experience is required, and there's a training curriculum covering the fundamentals.
* Application: a one-page resume plus short-answer prompts. Interviews are in person, invite-only, and mix behavioral and technical questions.
* Time commitment: 5–10 hours per week for analysts.
* Timeline: GIM & application opens → applications due → interviews → final offers. Make the dates data-driven placeholders with a status flag (`open` / `closed` / `upcoming`) that changes the page banner.
* E-list signup: https://docs.google.com/forms/d/e/1FAIpQLSey6Cb0i1mRCJGTiaYYVllnfREAbFApnHQbgssQky8n_SQumQ/viewform?usp=dialog

Contact and links

* Instagram: https://www.instagram.com/tuftscapitalresearchgroup/
* LinkedIn: https://www.linkedin.com/company/tufts-capital-research-group/
* Add a "For investors" call to action ("Scope a project with us") that links to a contact email placeholder: [CONTACT EMAIL TBD]. Don't build a form backend.

Step 3: Pages

1. Home: full-bleed hero (Boston architecture), a one-line positioning statement, and a short subline (pro bono market due diligence for institutional investors). Then a stats band (only verified numbers), the client roster, a three-pillar services block, a teaser for the engagement process, selected sectors, a teaser for member placements, and the two calls to action (for investors / for students).
2. Our Work: services, the engagement process, selected projects (sectors only), and the sample deck block.
3. About / Team: origin story, leadership, senior advisors, members, and placements.
4. Join: the recruiting content above.
5. A 404 page in the site's style.

Responsive navigation, sticky header with a subtle background on scroll, and a footer with the links above and the e-list button.
Step 4: Design

* Use the `frontend-design` skill if it's available to you.
* Feel: a boutique advisory firm. Plenty of whitespace, a strict grid, large architectural photography, and editorial typography. Motion should be minimal (gentle fades on scroll at most) and respect `prefers-reduced-motion`.
* Palette: a deep navy or ink base, off-white/ivory backgrounds, and one restrained accent drawn from Tufts blue (verify the official hex value from Tufts' brand guidelines). No gradients, glassmorphism, emoji, or stock icon sets.
* Type: a serif for display headings and a clean sans for body text, both from Google Fonts or Fontsource with licenses that allow web use. Self-host the fonts.
* Keep the existing TCRG logo: download it from the current site into `public/brand/`. If it's low resolution, tell me and use a clean text wordmark in the meantime.

Step 5: Photography

* I want architectural photos, mostly Boston, some New York, and some of Tufts: e.g. the Financial District, Back Bay, the Custom House Tower, Post Office Square, Beacon Hill, the Boston skyline from the harbor, Lower Manhattan, and the Tufts Medford campus (Ballou Hall, the Tisch Library roof, the Boston skyline from the Tufts hilltop).
* Use only images whose license allows commercial use on a website: Unsplash or Pexels, or Wikimedia Commons with the attribution its license requires. Record every image in `CREDITS.md` (source URL, photographer, license) and add attribution on the site wherever a license requires it.
* Check every image before using it: confirm it actually shows what its filename and alt text claim. Avoid images where people are the identifiable subject. Don't use any image showing another organization's logo or branding.
* Optimize with Astro's image pipeline (AVIF/WebP, responsive sizes) and keep the hero under ~300 KB.
* Write meaningful alt text for every image.
* If good, properly licensed Tufts photos are hard to find, use placeholders and tell me. I can request official photos from Tufts Communications.

Step 6: SEO and basics
Add a title and meta description for each page, Open Graph/Twitter cards (use a branded OG image you generate in the site's style), a favicon from the logo, `sitemap.xml`, `robots.txt`, and Organization JSON-LD. Use semantic HTML, a visible focus state, and WCAG AA contrast.
Step 7: Deploy and domain (instructions only; don't touch DNS)

* Get the GitHub Actions deploy working at the default `*.github.io` URL first and send me that link.
* Then write `DEPLOY.md` explaining how to point `tuftscapitalresearchgroup.com` at GitHub Pages. Check GitHub's current documentation for the exact apex A/AAAA records and the `www` CNAME target. Cover the case where the domain is registered through Wix (Wix DNS settings vs. transferring the domain out), and warn me to check whether any email runs on the domain before changing records. Include enabling "Enforce HTTPS" after the certificate is issued.
* Don't cancel or change anything on Wix.

Step 8: Quality check before you report back

* Build with no errors or warnings; no broken links (run a link checker); no console errors.
* Visually check every page at 375px, 768px, and 1440px by screenshotting them with a headless browser, and fix anything that looks off.
* Run Lighthouse on the home page and report the scores.
* Search the built site for anything that pairs a client with a sector (the confidentiality rule) and confirm none exists.
* Confirm that every number on the site is either sourced (in a code comment) or a labeled placeholder.

Open items (ask me in Step 0; don't guess)

1. The remaining Fall 2026 e-board names and roles, the senior advisors' full names and bios, and the Fall 2026 member roster.
2. The contact email for investors.
3. Whether to drop the client descriptors from the three case studies entirely or replace them with a generic label.
4. Spring 2027 recruiting dates and status.
5. Stats I'm comfortable publishing: projects completed to date, total members, and number of expert calls.
6. The correct names for CF Private Equity and Core Industrial Partners, and confirmation of PWP.

Final report
When you're done, give me: the repo URL, the live `github.io` URL, the Lighthouse scores, a list of every placeholder still on the site, the file I edit to change each kind of content, and the full list of image credits. Also update `PROGRESS.md` so it serves as the handoff doc for whoever maintains the site next.

## Decisions
Answers from Cooper, 2026-11-25 (Step 0).

1. People: all unknowns stay TBD for now. Fall 2026 e-board roles: President (Fares Danial), Head of Operations (Cooper Kolehmainen), Head of Research (TBD), Treasurer (TBD), Marketing (TBD). Five Senior Advisors, all TBD (one is "Bruno TBD"). Every staff card (e-board and advisors) gets a bio placeholder field. Add a Founders section (Mathis Weber, Otto Laakso, Co-Founders) below all current staffing, as on the old site. Member roster TBD.
2. Investor contact email: placeholder for now.
3. Case-study descriptors: drop them; don't map clients to projects. Do advertise the named clients we have worked with, in a separate client roster.
4. Spring 2027 recruiting starts mid-January 2027 (exact dates TBD). Add a "coffee chat" Google Form link (URL TBD) where prospective applicants can sign up to chat with a board member about the club.
5. Stats (Fall 2026): 4 Project Leads, 5 Research Leads, 20 Analysts; 2 current projects (Bain Capital + an unnamed fund); 17 expert calls this semester (as of 2026-11-25). Projects completed to date = 2 per semester for X years: X still TBD, so total projects is a placeholder.
6. Sample deck: keep a redacted sample deck that prospective clients and new members can browse (public/docs/tcrg-sample-deck.pdf, to be supplied).
7. Firm names: Guggenheim = Guggenheim Securities. CF Private Equity, Core Industrial Partners, and PJT/PWP still unconfirmed (keep [VERIFY]).
8. Two distinct lists: member placements (internships/jobs, aimed at students) and clients (aimed at investors). Keep them separate.
9. Combined AUM: include the Tufts endowment's value in the total.
10. Hosting: public repo on GitHub account cooperkole, GitHub Pages.
11. URLs: /work, /about, /join, with redirects from /blank, /blank-1, /blank-2.
12. Plan approved as proposed in Step 0: palette Ink #0E1A2B, Jumbo Blue #002E6D, Tufts Blue #3E8EDE (accent, large/dark-bg only), Ivory #F7F4EE, Candle White #F2EDE7, secondary text #5E5C57, hairline #D9D3C7; fonts Newsreader (display) + Inter (body); references centerview.com, hf.com, pwpartners.com; image list as proposed (Wikimedia Commons, verify visually in Step 5; request official Tufts photos).
