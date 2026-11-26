// Builds the favicon set and the Open Graph share image in public/ from the logo.
// Run after scripts/brand-logos.mjs: node scripts/brand-icons.mjs
import sharp from 'sharp';

const INK = { r: 0x0e, g: 0x1a, b: 0x2b };
const IVORY = { r: 0xf7, g: 0xf4, b: 0xee };

// 1. The line mark alone (the wordmark is unreadable at favicon sizes):
//    take the trimmed navy logo and clear everything right of / below the "T".
const { data, info } = await sharp('public/brand/tcrg-logo-navy.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  if (x >= 198 && y >= 100) data[(y * info.width + x) * 4 + 3] = 0;
}
const mark = await sharp(data, { raw: info }).trim().png().toBuffer();

// Square icon: mark centred on ivory with a margin.
// At favicon size the thin strokes wash out, so `bold` darkens every stroke to
// navy and boosts its opacity after downscaling.
async function icon(size, pad, file, bold = false) {
  const inner = Math.round(size * (1 - 2 * pad));
  let m = await sharp(mark).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  if (bold) {
    const r = await sharp(m).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < r.data.length; i += 4) {
      r.data[i] = 0x00; r.data[i + 1] = 0x2e; r.data[i + 2] = 0x6d;
      r.data[i + 3] = Math.min(255, r.data[i + 3] * 2.6);
    }
    m = await sharp(r.data, { raw: r.info }).png().toBuffer();
  }
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...IVORY, alpha: 1 } } })
    .composite([{ input: m, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(file);
}
await icon(32, 0.04, 'public/favicon-32.png', true);
await icon(192, 0.1, 'public/icon-192.png');
await icon(512, 0.1, 'public/icon-512.png');
await icon(180, 0.12, 'public/apple-touch-icon.png'); // iOS rounds the corners itself

// 2. Open Graph image (1200x630): harbour-at-dusk photo under an ink wash,
//    ivory logo, Tufts Blue rule. Matches the home hero.
const W = 1200, H = 630;
const photo = await sharp('src/assets/photos/boston-skyline-harbor-dusk.jpg').resize(W, H, { fit: 'cover' }).toBuffer();
const wash = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0E1A2B" stop-opacity="0.92"/>
    <stop offset="0.6" stop-color="#0E1A2B" stop-opacity="0.78"/>
    <stop offset="1" stop-color="#0E1A2B" stop-opacity="0.55"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`);
const logo = await sharp('public/brand/tcrg-logo-ivory.png').resize({ width: 620 }).toBuffer();
const lm = await sharp(logo).metadata();
const logoTop = Math.round((H - lm.height) / 2) - 20;
const rule = Buffer.from(`<svg width="72" height="3" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="3" fill="#3E8EDE"/></svg>`);
await sharp(photo)
  .composite([
    { input: wash, top: 0, left: 0 },
    { input: logo, top: logoTop, left: 96 },
    { input: rule, top: logoTop + lm.height + 40, left: 96 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('icons + og-image written');
