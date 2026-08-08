import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './NavIcons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={(event) => toggleTheme(event)}
      aria-label="Dark mode"
      className="flex w-full touch-manipulation items-center gap-3.5 rounded px-3 py-3 text-base font-medium text-neutral-500 transition-colors duration-200 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white"
    >
      {isDark ? (
        <MoonIcon className="h-5 w-5 shrink-0" />
      ) : (
        <SunIcon className="h-5 w-5 shrink-0" />
      )}
      <span className="truncate">Dark mode</span>
      <span
        aria-hidden
        className={`ml-auto flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
          isDark ? 'bg-white' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full transition-transform duration-200 ${
            isDark ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white'
          }`}
        />
      </span>
    </button>
  );
}
