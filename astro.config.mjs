// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain is set in public/CNAME; `site` must match it.
export default defineConfig({
  site: 'https://www.tuftscapitalresearchgroup.com',
  output: 'static',
  trailingSlash: 'ignore',
  // Old Wix addresses. Static build emits a small redirect page at each.
  redirects: {
    '/blank': '/work',
    '/blank-1': '/about',
    '/blank-2': '/join',
  },
});
