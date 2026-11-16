import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './NavIcons';

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        type="button"
        onClick={(event) => toggleTheme(event)}
        aria-label="Dark mode"
        aria-pressed={isDark}
        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-[var(--line)] bg-[var(--chip)] text-[var(--text-primary)] transition duration-300 active:bg-[var(--nav-hover)]"
      >
        {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={(event) => toggleTheme(event)}
      aria-label="Dark mode"
      className="flex w-full touch-manipulation items-center gap-3.5 rounded-2xl px-3 py-3 text-[15px] font-medium text-[var(--text-tertiary)] transition duration-300 hover:bg-[var(--nav-hover)] hover:text-[var(--text-primary)]"
    >
      {isDark ? <MoonIcon className="h-5 w-5 shrink-0" /> : <SunIcon className="h-5 w-5 shrink-0" />}
      <span className="truncate">Dark mode</span>
      <span
        aria-hidden
        className={`ml-auto flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
          isDark ? 'bg-[var(--accent)]' : 'bg-[var(--progress-track)]'
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-[var(--surface)] shadow transition-transform duration-200 ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}
