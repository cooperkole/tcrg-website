// Renders a deck PDF into slide images for the deck viewer (src/components/DeckViewer.astro).
// Needs poppler (`brew install poppler`) for pdftoppm, and sharp (already in node_modules).
//
// Run: node scripts/build-deck.mjs <deck-id>
//   e.g. node scripts/build-deck.mjs climate-ar
//
// Reads the deck's entry in src/data/decks.json ("source" = PDF in source/decks/, git-ignored;
// "folder" = output under public/). Writes, per slide NN (01, 02, ...):
//   <folder>/view/NN.webp   1600px wide (default view)
//   <folder>/zoom/NN.webp   2800px wide (loaded only when zooming)
//   <folder>/thumb/NN.webp   320px wide (thumbnail strip)
// The raw PDF is never copied to public/. Commit the generated images.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const id = process.argv[2];
const { decks } = JSON.parse(readFileSync('src/data/decks.json', 'utf8'));
const deck = decks.find((d) => d.id === id);
if (!deck) {
  console.error(`No deck "${id}" in src/data/decks.json. Known: ${decks.map((d) => d.id).join(', ')}`);
  process.exit(1);
}

const SIZES = { zoom: { w: 2800, q: 72 }, view: { w: 1600, q: 78 }, thumb: { w: 320, q: 70 } };
const out = join('public', deck.folder);
for (const k of Object.keys(SIZES)) {
  rmSync(join(out, k), { recursive: true, force: true });
  mkdirSync(join(out, k), { recursive: true });
}

// Render every page once at the zoom width; derive the smaller sizes from it.
const tmp = mkdtempSync(join(tmpdir(), 'deck-'));
execFileSync('pdftoppm', ['-png', '-scale-to-x', String(SIZES.zoom.w), '-scale-to-y', '-1', deck.source, join(tmp, 'p')]);
const pages = readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();
if (pages.length !== deck.pages) {
  console.error(`decks.json says ${deck.pages} pages, PDF rendered ${pages.length}. Fix "pages".`);
  process.exit(1);
}

let bytes = 0;
for (const [i, f] of pages.entries()) {
  const nn = String(i + 1).padStart(2, '0');
  for (const [k, { w, q }] of Object.entries(SIZES)) {
    const info = await sharp(join(tmp, f)).resize({ width: w }).webp({ quality: q, smartSubsample: true }).toFile(join(out, k, `${nn}.webp`));
    bytes += info.size;
  }
}
rmSync(tmp, { recursive: true, force: true });
console.log(`${deck.id}: ${pages.length} slides -> ${out} (${(bytes / 1e6).toFixed(1)} MB total)`);
