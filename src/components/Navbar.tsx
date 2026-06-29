import { useEffect, useRef, useState, type ReactNode } from 'react';

const links = [
  { label: 'About', shortLabel: 'About', href: '#about', icon: AboutIcon },
  { label: 'Skills', shortLabel: 'Skills', href: '#skills', icon: SkillsIcon },
  { label: 'Projects', shortLabel: 'Work', href: '#projects', icon: ProjectsIcon },
  { label: 'Certifications', shortLabel: 'Certs', href: '#certifications', icon: CertsIcon },
  { label: 'Experience', shortLabel: 'Exp', href: '#experience', icon: ExperienceIcon },
  { label: 'Contact', shortLabel: 'Contact', href: '#contact', icon: ContactIcon },
];

function AboutIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
    </svg>
  );
}

function SkillsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 5L4 12L8 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5L20 12L16 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4L10 20" strokeLinecap="round" />
    </svg>
  );
}

function ProjectsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="1" />
      <path d="M3 9h18" strokeLinecap="round" />
    </svg>
  );
}

function CertsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="9" r="4" />
      <path d="M8.5 13L7 19l5-2.5L17 19l-1.5-6" strokeLinejoin="round" />
    </svg>
  );
}

function ExperienceIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="4" y="7" width="16" height="12" rx="1" />
      <path d="M9 7V5a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  );
}

function ContactIcon({ active }: { active: boolean }) {
  return (
    <svg className={`h-5 w-5 ${active ? 'text-black' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" strokeLinejoin="round" />
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
        className={`fixed inset-x-0 top-0 z-40 w-full max-w-[100vw] border-b transition-colors duration-200 md:border-neutral-200 ${
          scrolled ? 'border-neutral-200 bg-white/95' : 'border-transparent bg-white/90 md:bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-widest text-black">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-black text-xs font-extrabold text-white md:h-9 md:w-9">
              M
            </span>
            <span className="hidden sm:inline">MAP</span>
          </a>

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
                    isActive ? 'text-black' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-sm md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto grid max-w-lg grid-cols-6 px-1 pt-1">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isActive={isActive}
                className={`flex min-w-0 flex-col items-center gap-0.5 rounded px-0.5 py-2 transition-colors duration-200 active:bg-neutral-50 ${
                  isActive ? 'text-black' : 'text-neutral-500'
                }`}
              >
                <Icon active={isActive} />
                <span className="w-full truncate text-center text-[9px] font-semibold leading-tight">
                  {link.shortLabel}
                </span>
                {isActive && <span className="h-0.5 w-4 rounded-full bg-black" />}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
