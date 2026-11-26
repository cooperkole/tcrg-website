// Build-time low-quality image placeholder (blur-up). Returns a tiny WebP as a data
// URI (a few hundred bytes) so the hero never paints as a flat navy block on slow loads.
import sharp from 'sharp';
import path from 'node:path';

const cache = new Map<string, string>();

/** file = name inside src/assets/photos/ */
export async function lqip(file: string): Promise<string> {
  const hit = cache.get(file);
  if (hit) return hit;
  const buf = await sharp(path.join(process.cwd(), 'src/assets/photos', file))
    .resize(32)
    .blur(1.2)
    .webp({ quality: 50 })
    .toBuffer();
  const uri = `data:image/webp;base64,${buf.toString('base64')}`;
  cache.set(file, uri);
  return uri;
}
