// Builds web logo variants in public/brand/ from the master PNG.
// Run: node scripts/brand-logos.mjs
import sharp from 'sharp';
const SRC = 'public/brand/tcrg-logo.png';
const W = 640; // 2x a ~320px-wide header logo

const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer();
await sharp(trimmed).resize({ width: W }).png({ compressionLevel: 9, palette: true }).toFile('public/brand/tcrg-logo-navy.png');

// Light variant for dark backgrounds: every pixel becomes ivory; darker source
// pixels stay opaque and lighter ones (grey wordmark, faint strokes) fade, so the
// tonal steps of the mark survive on ink.
const { data, info } = await sharp(trimmed).resize({ width: W }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ivory = [0xf7, 0xf4, 0xee];
for (let i = 0; i < data.length; i += 4) {
  const L = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  const k = Math.min(1, Math.max(0.35, 1 - 0.6 * (L - 0.1) / 0.9));
  data[i] = ivory[0]; data[i + 1] = ivory[1]; data[i + 2] = ivory[2];
  data[i + 3] = Math.round(data[i + 3] * k);
}
await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile('public/brand/tcrg-logo-ivory.png');
const m = await sharp('public/brand/tcrg-logo-navy.png').metadata();
console.log('variants', m.width, 'x', m.height);
