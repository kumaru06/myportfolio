import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { playThemeTransition } from '../utils/themeTransition';

export type Theme = 'light' | 'dark';

type ThemeTogglePoint = {
  clientX?: number;
  clientY?: number;
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: ThemeTogglePoint) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function getViewportSize() {
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isAnimating = useRef(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (isAnimating.current) return;
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = (event?: ThemeTogglePoint) => {
    if (isAnimating.current) return;

    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const x = event?.clientX ?? getViewportSize().width / 2;
    const y = event?.clientY ?? getViewportSize().height / 2;

    isAnimating.current = true;

    void playThemeTransition(x, y, next, () => {
      flushSync(() => {
        applyTheme(next);
        setTheme(next);
      });
      localStorage.setItem('theme', next);
    }).finally(() => {
      isAnimating.current = false;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
