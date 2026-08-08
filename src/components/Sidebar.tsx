import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AboutIcon,
  CertsIcon,
  CloseIcon,
  ContactIcon,
  ExperienceIcon,
  GitHubIcon,
  MenuIcon,
  ProjectsIcon,
  SkillsIcon,
} from './NavIcons';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About', href: '#about', icon: AboutIcon },
  { label: 'Skills', href: '#skills', icon: SkillsIcon },
  { label: 'Projects', href: '#projects', icon: ProjectsIcon },
  { label: 'Certifications', href: '#certifications', icon: CertsIcon },
  { label: 'Experience', href: '#experience', icon: ExperienceIcon },
  { label: 'GitHub', href: '#github', icon: GitHubIcon },
  { label: 'Contact', href: '#contact', icon: ContactIcon },
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('');
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const offset = window.innerWidth < 768 ? 100 : 120;
        const sections = links.map((l) => l.href.slice(1));

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= offset) {
            setActiveSection(sections[i]);
            break;
          }
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onNavigate}
      className="flex min-w-0 items-center gap-2.5 text-xl font-bold tracking-widest text-black dark:text-white"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-black text-sm font-extrabold text-white dark:bg-white dark:text-black">
        M
      </span>
      <span>MAP</span>
    </a>
  );
}

function NavList({ activeSection, onNavigate }: { activeSection: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Main navigation">
      {links.map((link) => {
        const isActive = activeSection === link.href.slice(1);
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex items-center gap-3.5 rounded px-3 py-3 text-base font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-black dark:bg-white" />
            )}
            <Icon active={isActive} />
            <span className="truncate">{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const activeSection = useActiveSection();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:flex">
        <div className="flex h-20 shrink-0 items-center border-b border-neutral-200 px-5 dark:border-neutral-800">
          <Brand />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none p-3">
          <NavList activeSection={activeSection} />
        </div>
        <div className="shrink-0 border-t border-neutral-200 p-3 dark:border-neutral-800">
          <ThemeToggle />
        </div>
      </aside>

      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Brand />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded border border-neutral-200 text-black transition-colors duration-200 active:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:active:bg-neutral-900"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        onClick={closeDrawer}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!drawerOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[82vw] flex-col border-r border-neutral-200 bg-white transition-[transform,visibility] duration-300 ease-out dark:border-neutral-800 dark:bg-neutral-950 md:hidden ${
          drawerOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
          <Brand onNavigate={closeDrawer} />
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
            tabIndex={drawerOpen ? 0 : -1}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded border border-neutral-200 text-black transition-colors duration-200 active:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:active:bg-neutral-900"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none p-3">
          <NavList activeSection={activeSection} onNavigate={closeDrawer} />
        </div>
        <div className="shrink-0 border-t border-neutral-200 p-3 dark:border-neutral-800">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
