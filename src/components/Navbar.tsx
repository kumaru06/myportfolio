import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function MoonIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={`${className} text-brand-600 dark:text-brand-400`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={`${className} text-brand-600 dark:text-brand-400`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = links.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 w-full max-w-[100vw] overflow-hidden transition-all duration-500 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-2xl dark:border-white/5 dark:bg-slate-950/70'
          : 'bg-transparent'
      }`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a
          href="#about"
          className="group flex min-w-0 items-center gap-2 font-display text-lg font-bold tracking-widest"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-xs font-extrabold text-white shadow-glow transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
            M
          </span>
          <span className="hidden text-slate-800 dark:text-white sm:inline">MAP</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-500/10 dark:bg-brand-500/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-brand-500/10 ring-1 ring-brand-500/20 transition-all hover:border-brand-300 hover:bg-brand-500/15 hover:shadow-glow active:scale-95 dark:border-white/10 dark:bg-brand-500/15 dark:ring-brand-500/30 dark:hover:border-brand-500/40 sm:h-10 sm:w-10"
          >
            <motion.span
              key={darkMode ? 'dark' : 'light'}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {darkMode ? <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </motion.span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm transition hover:border-brand-300 active:scale-95 dark:border-white/10 dark:bg-slate-900/80 sm:h-10 sm:w-10 md:hidden"
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 dark:bg-slate-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 dark:bg-slate-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 dark:bg-slate-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200/60 bg-white/90 backdrop-blur-2xl dark:border-white/5 dark:bg-slate-950/90 md:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
