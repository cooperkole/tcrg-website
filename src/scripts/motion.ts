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
//   timelines ([data-tl]): analyst week + engagement process pin and fill with
//         scroll on wide screens, light step by step on narrow; steppers draw in
//   CTAs: magnetic buttons (fine pointers only)
// All of it is torn down on astro:before-swap.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const done = new WeakSet<HTMLElement>();

// Number of rendered lines in el, from the y positions of its text boxes.
function lineCount(el: HTMLElement): number {
  const r = document.createRange();
  r.selectNodeContents(el);
  return new Set([...r.getClientRects()].filter((b) => b.width > 0).map((b) => Math.round(b.top))).size;
}

// True if wrapping each word in its own element (as SplitText does) would change
// how many lines el wraps to. Measured on an offscreen clone, so nothing shifts.
function splitChangesLines(el: HTMLElement): boolean {
  const words = (el.textContent ?? '').trim().split(/\s+/);
  const clone = el.cloneNode(false) as HTMLElement;
  clone.removeAttribute('data-astro-transition-scope');
  clone.style.cssText = `position:absolute;left:0;top:0;width:${el.clientWidth}px;visibility:hidden;pointer-events:none`;
  clone.innerHTML = words.map((w) => `<div style="display:inline-block">${w.replace(/</g, '&lt;')}</div>`).join(' ');
  el.parentElement!.appendChild(clone);
  const split = new Set([...clone.children].map((d) => (d as HTMLElement).offsetTop)).size;
  clone.remove();
  return split !== lineCount(el);
}
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

  // `all` keeps the callback running on touch phones, where no other condition matches
  // (gsap.matchMedia only runs a conditions callback when at least one matches).
  mm.add({ all: 'all', wide: '(min-width: 900px)', rail: '(min-width: 1000px)', fine: '(hover: hover) and (pointer: fine)' }, (c) => {
    const { wide, rail, fine } = c.conditions as { wide: boolean; rail: boolean; fine: boolean };
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
        // Wrapping words in elements (needed for the line split) changes text shaping
        // slightly; at some widths a line that just fits stops fitting, the split h1
        // gains a line and the hero shifts (CLS). Then use a plain fade instead.
        if (h1 && splitChangesLines(h1)) {
          gsap.set(h1, { visibility: 'visible' });
          gsap.from(h1, { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.1, clearProps: 'opacity,transform' });
        } else if (h1) {
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
      // aria 'none': the words stay real text (aria-label is not allowed on <p>).
      // Start at 0.47 so even unfilled words keep 3:1 contrast (large text).
      SplitText.create(el, {
        type: 'words', autoSplit: true, aria: 'none',
        onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.47 }, {
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

    // ---- Timelines (Step 12) ----
    // Steps are lit and rails drawn in the static HTML; .tl-anim switches on the
    // dimmed start state, and every path below lights them again.
    const header = () => document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
    const pinStart = (el: HTMLElement) => () => (el.offsetHeight + header() < window.innerHeight ? 'center center' : `top ${header()}px`);
    const animated: HTMLElement[] = [];
    const arm = (el: HTMLElement) => { el.classList.add('tl-anim'); animated.push(el); };
    // Scrubbed: one tween drives --fill on the rail; onUpdate lights steps whose
    // threshold (0..1 of progress) has been reached; the latest is "current".
    function scrubPinned(pinEl: HTMLElement, fillEl: HTMLElement, steps: HTMLElement[][], at: number[], length: number, extra?: (p: number) => void) {
      arm(pinEl);
      const set = (p: number) => {
        let cur = -1;
        at.forEach((t, i) => { const on = p >= t; if (on) cur = i; steps[i].forEach((n) => n.classList.toggle('is-lit', on)); });
        steps.forEach((g, i) => g.forEach((n) => n.classList.toggle('is-current', i === cur)));
        extra?.(p);
      };
      set(0);
      gsap.fromTo(fillEl, { '--fill': 0 }, {
        '--fill': 1, ease: 'none',
        scrollTrigger: {
          trigger: pinEl, start: pinStart(pinEl), end: () => `+=${window.innerHeight * length}`,
          pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (st) => set(st.progress),
        },
      });
    }
    // Narrow: the vertical rail fills as the list passes; each step lights on its own.
    function scrubVertical(list: HTMLElement) {
      if (!belowFold(list)) return;
      arm(list);
      gsap.fromTo(list, { '--fill': 0 }, { '--fill': 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 72%', end: 'bottom 72%', scrub: 0.4 } });
      list.querySelectorAll<HTMLElement>(':scope > .tl-item').forEach((li) => {
        ScrollTrigger.create({ trigger: li, start: 'top 74%', end: 'max', toggleClass: { targets: li, className: 'is-lit' } });
      });
    }

    // Analyst week: 0..1 progress maps onto Tue (0) .. next Tue (7); the
    // last stretch of scroll lights the loop back to Tuesday.
    document.querySelectorAll<HTMLElement>('[data-tl="week"]').forEach((week) => {
      const cards = week.querySelector<HTMLElement>('.week-cards');
      if (!cards) return;
      if (!wide) { scrubVertical(cards); return; }
      const fill = week.querySelector<HTMLElement>('.week-line .tl-fill');
      const marks = [...week.querySelectorAll<HTMLElement>('.week-mark')];
      const items = [...cards.querySelectorAll<HTMLElement>(':scope > .tl-item')];
      const loop = week.querySelector<HTMLElement>('.week-loop');
      if (!fill || marks.length !== items.length) return;
      const span = 7.6; // days of scroll: 7 for the week, the rest for the loop
      // point phases (meetings) hold the spotlight for ~0.6 day before the stretch that follows
      const data = (() => { try { return JSON.parse(week.dataset.phases ?? '[]') as { from: number; to: number }[]; } catch { return []; } })();
      const at = items.map((_, i) => {
        const p = data[i]; const prev = data[i - 1];
        const day = p ? (prev && prev.from === prev.to && p.from === prev.from ? p.from + 0.6 : p.from) : i * 2;
        return day / span;
      });
      const groups = items.map((it, i) => [it, marks[i]]);
      // The fill tween runs over the whole scrub; scale its 0..1 so it reaches the end on Tuesday.
      fill.style.setProperty('--fill', '0');
      scrubPinned(week, week, groups, at, 1.8, (p) => {
        fill.style.setProperty('--fill', String(Math.min(1, (p * span) / 7)));
        loop?.classList.toggle('is-lit', p * span >= 7.15);
      });
      undo.push(() => fill.style.removeProperty('--fill'));
    });

    // Engagement process: pinned with a drawn connector on wide screens.
    document.querySelectorAll<HTMLElement>('[data-tl="process"]').forEach((pinEl) => {
      const list = pinEl.querySelector<HTMLElement>('.process');
      if (!list) return;
      if (!rail) { scrubVertical(list); return; }
      const items = [...list.querySelectorAll<HTMLElement>(':scope > .tl-item')];
      const n = items.length;
      scrubPinned(pinEl, list, items.map((it) => [it]), items.map((_, i) => (i / n) * 0.92), 1.3);
    });

    // Steppers (recruiting, origin): rail draws, steps light in sequence, once.
    document.querySelectorAll<HTMLElement>('[data-tl="stepper"]').forEach((list) => {
      if (!belowFold(list)) return;
      arm(list);
      const items = [...list.querySelectorAll<HTMLElement>(':scope > .tl-item')];
      const d = 1.1;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(list, { '--fill': 0 }, { '--fill': 1, duration: d, ease: 'power2.inOut' }, 0);
      items.forEach((li, i) => tl.call(() => li.classList.add('is-lit'), [], items.length > 1 ? (i / (items.length - 1)) * d : 0));
      ScrollTrigger.create({ trigger: list, start: 'top 85%', once: true, onEnter: () => tl.play() });
    });
    undo.push(() => animated.forEach((el) => {
      el.classList.remove('tl-anim');
      el.querySelectorAll('.is-lit, .is-current').forEach((n) => n.classList.remove('is-lit', 'is-current'));
      el.style.removeProperty('--fill');
    }));

    // ---- Reveals: short, staggered, early ----
    const groups = '.pillars, .people, .placements, .work-cards, .process-mini, .placement-teaser, .ctas, .split, .faq';
    document.querySelectorAll<HTMLElement>('main section:not(.hero):not(.statement-band) > .container').forEach((box) => {
      if (!belowFold(box)) return;
      const items: Element[] = [];
      for (const child of box.children) {
        if (child.matches('[data-tl]')) continue; // timelines animate themselves
        if (child.matches(groups)) items.push(...child.children);
        else items.push(child);
      }
      reveal(items, box);
    });
    function reveal(items: ArrayLike<Element>, trigger: Element) {
      if (!items.length || !belowFold(trigger)) return;
      // opacity, not autoAlpha: visibility:hidden would drop not-yet-revealed
      // content from the accessibility tree (screen readers, heading navigation).
      gsap.from(items, {
        opacity: 0, y: 18, duration: 0.5, ease: 'power2.out',
        stagger: { each: 0.06, amount: Math.min(0.5, items.length * 0.06) },
        clearProps: 'transform,opacity',
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
