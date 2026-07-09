import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from './MobileNavIcons';

type ThemeToggleProps = {
  variant?: 'header' | 'dock';
};

const dockIconClass = 'h-[22px] w-[22px] shrink-0 text-neutral-400 dark:text-neutral-500';

export default function ThemeToggle({ variant = 'header' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDock = variant === 'dock';

  if (isDock) {
    return (
      <button
        type="button"
        onClick={(event) => toggleTheme(event)}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className="flex min-h-[48px] min-w-0 touch-manipulation flex-col items-center justify-center gap-0.5 rounded px-0.5 py-1.5 text-neutral-500 transition-colors duration-200 active:bg-neutral-50 dark:text-neutral-400 dark:active:bg-neutral-900"
      >
        {theme === 'light' ? (
          <MoonIcon className={dockIconClass} />
        ) : (
          <SunIcon className={dockIconClass} />
        )}
        <span className="w-full truncate text-center text-[8px] font-semibold leading-tight min-[360px]:text-[9px]">
          Theme
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => toggleTheme(event)}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded border border-neutral-200 bg-white text-black transition-colors duration-200 hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 sm:h-9 sm:w-9"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </button>
  );
}
