import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AboutIcon,
  CertsIcon,
  ContactIcon,
  ExperienceIcon,
  ProjectsIcon,
  SkillsIcon,
} from './MobileNavIcons';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About', shortLabel: 'About', href: '#about', icon: AboutIcon },
  { label: 'Skills', shortLabel: 'Skills', href: '#skills', icon: SkillsIcon },
  { label: 'Projects', shortLabel: 'Work', href: '#projects', icon: ProjectsIcon },
  { label: 'Certifications', shortLabel: 'Certs', href: '#certifications', icon: CertsIcon },
  { label: 'Experience', shortLabel: 'Exp', href: '#experience', icon: ExperienceIcon },
  { label: 'GitHub', shortLabel: 'GitHub', href: '#github', icon: GitHubIcon },
  { label: 'Contact', shortLabel: 'Contact', href: '#contact', icon: ContactIcon },
];

const iconActive = 'text-black dark:text-white';
const iconInactive = 'text-neutral-400 dark:text-neutral-500';

function GitHubIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-[22px] w-[22px] shrink-0 ${active ? iconActive : iconInactive}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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

function NavLink({
  href,
  label,
  isActive,
  className,
  children,
}: {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 w-full max-w-[100vw] border-b transition-colors duration-200 md:border-neutral-200 dark:md:border-neutral-800 ${
          scrolled
            ? 'border-neutral-200 bg-white/95 dark:border-neutral-800 dark:bg-neutral-950/95'
            : 'border-transparent bg-white/90 dark:bg-neutral-950/90 md:bg-white/80 dark:md:bg-neutral-950/80'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-widest text-black dark:text-white">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-black text-xs font-extrabold text-white dark:bg-white dark:text-black md:h-9 md:w-9">
              M
            </span>
            <span className="hidden sm:inline">MAP</span>
          </a>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                    className={`rounded px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-black dark:text-white'
                        : 'text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto grid max-w-lg grid-cols-8 px-0.5 pt-1">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isActive={isActive}
                className={`flex min-h-[48px] min-w-0 touch-manipulation flex-col items-center justify-center gap-0.5 rounded px-0.5 py-1.5 transition-colors duration-200 active:bg-neutral-50 dark:active:bg-neutral-900 ${
                  isActive ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <Icon active={isActive} />
                <span className="w-full truncate text-center text-[8px] font-semibold leading-tight min-[360px]:text-[9px]">
                  {link.shortLabel}
                </span>
                {isActive && <span className="h-0.5 w-4 rounded-full bg-black dark:bg-white" />}
              </NavLink>
            );
          })}
          <ThemeToggle variant="dock" />
        </div>
      </nav>
    </>
  );
}
