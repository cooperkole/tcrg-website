// Prefix internal links with the deploy base path. Base is '/' on the custom
// domain and '/tcrg-website/' on the temporary github.io preview (see DEPLOY.md).
// Always write internal links as withBase('/work'), never a bare '/work'.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (p: string) => (p.startsWith('/') ? `${BASE}${p}` : p);

// Page path without the base, e.g. '/tcrg-website/work/' -> '/work/'.
export const stripBase = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);
