// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain is set in public/CNAME; the default `site` must match it.
// SITE_URL / BASE_PATH override it only for the temporary github.io preview
// (set in .github/workflows/deploy.yml; remove them there once the domain is live, see DEPLOY.md).
const base = process.env.BASE_PATH || '/';
const to = (p) => `${base.replace(/\/$/, '')}${p}`; // redirect targets don't get the base automatically

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.tuftscapitalresearchgroup.com',
  base,
  output: 'static',
  trailingSlash: 'ignore',
  // Old Wix addresses. Static build emits a small redirect page at each.
  redirects: {
    '/blank': to('/work/'),
    '/blank-1': to('/about/'),
    '/blank-2': to('/join/'),
  },
});
