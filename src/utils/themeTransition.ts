import type { Theme } from '../context/ThemeContext';

const DURATION_MS = 500;
const EASING = 'cubic-bezier(0.32, 0.08, 0.24, 1)';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getViewportSize() {
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
}

function getRevealRadius(x: number, y: number) {
  const { width, height } = getViewportSize();
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

function crossfade(apply: () => void): Promise<void> {
  const root = document.documentElement;
  root.classList.add('theme-anim');
  apply();

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('theme-anim');
      resolve();
    }, DURATION_MS + 20);
  });
}

function setVtCoords(root: HTMLElement, x: number, y: number, radius: number) {
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${radius}px`);
}

function clearVtCoords(root: HTMLElement) {
  root.style.removeProperty('--vt-x');
  root.style.removeProperty('--vt-y');
  root.style.removeProperty('--vt-r');
}

function circularReveal(
  x: number,
  y: number,
  targetTheme: Theme,
  apply: () => void,
): Promise<void> {
  const root = document.documentElement;
  const radius = getRevealRadius(x, y);
  const reverse = targetTheme === 'light';
  const vtMode = reverse ? 'collapse' : 'expand';
  setVtCoords(root, x, y, radius);
  root.dataset.themeVt = vtMode;
  root.classList.add('theme-switching');
  const startViewTransition = document.startViewTransition?.bind(document);

  if (!startViewTransition) {
    return crossfade(apply);
  }

  return new Promise((resolve) => {
    const transition = startViewTransition(() => {
      apply();
    });

    transition.ready
      .then(() => {
        if (reverse) {
          root.animate(
            {
              clipPath: [
                `circle(${radius}px at ${x}px ${y}px)`,
                `circle(0px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION_MS,
              easing: EASING,
              fill: 'forwards',
              pseudoElement: '::view-transition-old(root)',
            },
          );
        } else {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION_MS,
              easing: EASING,
              fill: 'both',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        }
      })
      .catch(() => {
        delete root.dataset.themeVt;
        clearVtCoords(root);
        root.classList.remove('theme-switching');
        root.classList.remove('theme-anim');
      });

    transition.finished
      .then(() => {
        delete root.dataset.themeVt;
        clearVtCoords(root);
        root.classList.remove('theme-switching');
        resolve();
      })
      .catch(() => {
        delete root.dataset.themeVt;
        clearVtCoords(root);
        root.classList.remove('theme-switching');
        resolve();
      });
  });
}

export function playThemeTransition(
  x: number,
  y: number,
  targetTheme: Theme,
  apply: () => void,
): Promise<void> {
  if (prefersReducedMotion()) {
    apply();
    return Promise.resolve();
  }

  return circularReveal(x, y, targetTheme, apply);
}

export function getThemeTransitionDuration() {
  return prefersReducedMotion() ? 0 : DURATION_MS;
}
