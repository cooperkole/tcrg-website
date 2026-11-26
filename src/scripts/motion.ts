// Motion system (Step 11). Loaded by Base.astro only when prefers-reduced-motion is
// not set, as a separate chunk, so reduced-motion visitors download none of it.
// Everything here is enhancement: the HTML is complete and readable without it.
//
// Per page (initial load and every ClientRouter navigation):
//   Lenis smooth wheel scrolling (touch stays native), driven by the GSAP ticker
//   hero: slow scale + parallax, masked line-by-line headline (first load only;
//         on later navigations the heading morphs via transition:name instead)
//   reveals: short staggered fades, triggered early
//   stats: count-up to the exact final value
//   statement band: words fill in as it scrolls through
//   photo bands: gentle parallax
//   placements strip: pinned horizontal scroll on wide screens
//   CTAs: magnetic buttons (fine pointers only)
// All of it is torn down on astro:before-swap.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const done = new WeakSet<HTMLElement>();
let teardown: (() => void) | null = null;

function init() {
  const body = document.body;
  if (done.has(body)) return;
  done.add(body);
  teardown?.();

  const root = document.documentElement;
  const intro = root.classList.contains('motion-intro');

  // ---- Smooth scroll ----
  const lenis = new Lenis({ autoRaf: false, prevent: (n) => !!n.closest?.('[data-deck]') });
  const raf = (t: number) => lenis.raf(t * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  // The deck viewer's iOS overlay locks the page; pause Lenis while it is open.
  let locked = false;
  const lockObs = new MutationObserver(() => {
    const l = root.classList.contains('deck-lock');
    if (l !== locked) { locked = l; if (l) lenis.stop(); else lenis.start(); }
  });
  lockObs.observe(root, { attributes: true, attributeFilter: ['class'] });

  const mm = gsap.matchMedia();
  const vh = window.innerHeight;
  const belowFold = (el: Element) => el.getBoundingClientRect().top > vh * 0.95;

  mm.add({ wide: '(min-width: 900px)', fine: '(hover: hover) and (pointer: fine)' }, (c) => {
    const { wide, fine } = c.conditions as { wide: boolean; fine: boolean };
    const undo: (() => void)[] = [];

    // ---- Hero ----
    const hero = document.querySelector<HTMLElement>('.hero');
    if (hero) {
      const media = hero.querySelector('.hero-media');
      const pic = hero.querySelector('.hero-media picture');
      if (pic) gsap.fromTo(pic, { scale: 1.08 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
      if (media) gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      if (intro) {
        const h1 = hero.querySelector<HTMLElement>('h1');
        const rest = hero.querySelectorAll('.eyebrow, .hero-sub');
        if (h1) {
          SplitText.create(h1, {
            type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'split-line',
            onSplit: (self) => {
              gsap.set(h1, { visibility: 'visible' });
              return gsap.from(self.lines, { yPercent: 105, duration: 0.9, stagger: 0.11, ease: 'power3.out', delay: 0.1 });
            },
          });
        }
        gsap.fromTo(rest, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.55, stagger: 0.12, clearProps: 'transform' });
      }
    }

    // ---- Stats count-up (exact final text; screen readers get the real value) ----
    document.querySelectorAll<HTMLElement>('.stat dd').forEach((dd) => {
      const final = (dd.dataset.final ??= dd.textContent?.trim() ?? '');
      const m = final.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!m || !belowFold(dd)) return;
      const [, pre, num, post] = m;
      const target = Number(num.replace(/,/g, ''));
      const shown = document.createElement('span');
      shown.setAttribute('aria-hidden', 'true');
      shown.textContent = `${pre}0${post}`;
      const real = document.createElement('span');
      real.className = 'visually-hidden';
      real.textContent = final;
      dd.replaceChildren(real, shown);
      const o = { v: 0 };
      gsap.to(o, {
        v: target, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: dd, start: 'top 90%', once: true },
        onUpdate: () => { shown.textContent = `${pre}${Math.round(o.v).toLocaleString('en-US')}${post}`; },
        onComplete: () => { shown.textContent = final; },
      });
      undo.push(() => dd.replaceChildren(final));
    });

    // ---- Statement band: words fill in as it passes ----
    document.querySelectorAll<HTMLElement>('[data-statement]').forEach((el) => {
      SplitText.create(el, {
        type: 'words', autoSplit: true,
        onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.16 }, {
          opacity: 1, stagger: 0.08, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: 0.6 },
        }),
      });
    });

    // ---- Photo bands: slow parallax inside the frame ----
    document.querySelectorAll<HTMLElement>('.photo-band').forEach((band) => {
      const img = band.querySelector('img');
      if (!img) return;
      gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // ---- Placements: pinned horizontal scroll on wide screens ----
    if (wide) {
      document.querySelectorAll<HTMLElement>('[data-hstrip]').forEach((strip) => {
        const track = strip.querySelector<HTMLElement>('.hstrip-track');
        const section = strip.closest<HTMLElement>('section');
        if (!track || !section) return;
        const dist = () => Math.max(0, track.scrollWidth - strip.clientWidth);
        if (dist() < 40) return;
        strip.classList.add('is-pinned');
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        undo.push(() => strip.classList.remove('is-pinned'));
      });
    }

    // ---- Reveals: short, staggered, early ----
    const groups = '.pillars, .people, .placements, .work-cards, .process, .process-mini, .placement-teaser, .ctas, .split, .faq, .timeline';
    document.querySelectorAll<HTMLElement>('main section:not(.hero):not(.statement-band) > .container').forEach((box) => {
      if (!belowFold(box)) return;
      const items: Element[] = [];
      for (const child of box.children) {
        if (child.matches(groups)) items.push(...child.children);
        else items.push(child);
      }
      reveal(items, box);
    });
    function reveal(items: ArrayLike<Element>, trigger: Element) {
      if (!items.length || !belowFold(trigger)) return;
      gsap.from(items, {
        autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        stagger: { each: 0.06, amount: Math.min(0.5, items.length * 0.06) },
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger, start: 'top 92%', once: true },
      });
    }

    // ---- Magnetic CTAs ----
    if (fine) {
      document.querySelectorAll<HTMLElement>('.button').forEach((b) => {
        const x = gsap.quickTo(b, 'x', { duration: 0.35, ease: 'power3.out' });
        const y = gsap.quickTo(b, 'y', { duration: 0.35, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = b.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.22);
          y((e.clientY - r.top - r.height / 2) * 0.3);
        };
        const leave = () => { x(0); y(0); };
        b.addEventListener('pointermove', move);
        b.addEventListener('pointerleave', leave);
        undo.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); gsap.set(b, { clearProps: 'transform' }); });
      });
    }
    return () => undo.forEach((f) => f());
  });
  // Hero text is hidden by CSS until now (see Base.astro); inline styles have taken over.
  root.classList.remove('motion-intro');

  // Images and fonts change layout after load; re-measure triggers once they settle.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);

  teardown = () => {
    mm.revert();
    lockObs.disconnect();
    gsap.ticker.remove(raf);
    lenis.destroy();
    window.removeEventListener('load', refresh);
    teardown = null;
  };
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => teardown?.());
// This chunk is imported lazily, usually after the first astro:page-load has fired.
if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init, { once: true });
