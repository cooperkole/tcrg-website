// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain is set in public/CNAME; `site` must match it.
export default defineConfig({
  site: 'https://www.tuftscapitalresearchgroup.com',
  output: 'static',
  trailingSlash: 'ignore',
});
