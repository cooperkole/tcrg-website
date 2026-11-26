// Hand-written sitemap: five pages don't need an integration. Add new pages here.
// Redirect pages (/blank*) and 404 are deliberately left out.
import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';

const PAGES = ['/', '/work/', '/about/', '/join/']; // trailing slash = the URL GitHub Pages serves

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map((p) => `  <url><loc>${new URL(withBase(p), site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
