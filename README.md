# Tufts Capital Research Group website

The public site for TCRG, built with [Astro](https://astro.build) and published on GitHub Pages at
https://www.tuftscapitalresearchgroup.com.

You don't need to know how to code to update the site each semester. Almost everything that
changes (names, headshots, clients, stats, recruiting dates) lives in plain data files in
`src/data/`. You edit those files and never touch the page layouts.

## Run it on your computer

1. Install [Node.js](https://nodejs.org) version 22 or newer.
2. In a terminal, from this folder:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:4321. The page reloads as you save files.

To check the finished build before publishing, run `npm run build`, then `npm run preview`.

## Where the content lives

| File | What it holds |
| --- | --- |
| `src/data/site.json` | Site-wide copy: tagline, services, process, contact links, testimonials |
| `src/data/team.json` | E-board, member roster (by role), founders, group photos |
| `src/data/advisors.json` | Senior Advisors |
| `src/data/clients.json` | Client roster (for investors) |
| `src/data/case-studies.json` | Case studies and the sample-deck card |
| `src/data/stats.json` | Headline numbers (projects, expert calls, team size) |
| `src/data/aum.ts` | Cumulative client AUM: one sourced figure per client; the total is computed |
| `src/data/placements.json` | Where members have interned or work (for students) |
| `src/data/recruiting.json` | Recruiting dates, status, application and coffee-chat links |

Clients and member placements are two separate lists on purpose. Don't merge them, and don't
link a client to a specific case study.

JSON is strict: keep the quotes and commas exactly as you find them. If the build fails after an
edit, a missing comma or quote is the usual cause.

## Swap a headshot

1. Save the photo as a square JPG or WebP, at least 600 x 600 px, named after the person, for
   example `jane-doe.jpg`.
2. Put it in `src/assets/headshots/`.
3. In `src/data/team.json` (or `advisors.json`), set that person's `photo` field to the file name,
   for example `"photo": "jane-doe.jpg"`.
4. Delete the old photo file if nobody uses it anymore.

## Add a client

Open `src/data/clients.json` and add an entry to the `clients` list, copying the shape of an
existing one (name, and website if there is one). If the client provided a logo, put it in
`src/assets/clients/` and reference its file name.

## Set up a new semester's team

1. In `src/data/team.json`, change `semester` (for example `"Spring 2027"`).
2. Replace the `eboard` and `members` lists with the new people. Every e-board card has a `bio`
   field; leave it as `""` if there's no bio yet.
3. Update the numbers in `src/data/stats.json` and the dates in `src/data/recruiting.json`.
4. Leave `founders` alone.

## How publishing works

Every push to the `main` branch on GitHub runs the workflow in `.github/workflows/deploy.yml`.
It builds the site and publishes it to GitHub Pages, usually within two minutes. You can watch it
under the repository's **Actions** tab; a red X means the build failed (usually a JSON typo), and
the live site stays on the previous version until it's fixed.

The custom domain is set in `public/CNAME` and in `site` in `astro.config.mjs`. Change both
together, or neither.

The old Wix addresses (`/blank`, `/blank-1`, `/blank-2`) redirect to `/work`, `/about` and
`/join`.
