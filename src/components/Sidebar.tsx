import { useEffect, useRef, useState } from 'react';
import { AboutIcon, CertsIcon, ContactIcon, ExperienceIcon, GitHubIcon, ProjectsIcon, SkillsIcon } from './NavIcons';
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

        let current = '';
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= offset) {
            current = sections[i];
            break;
          }
        }
        setActiveSection(current);

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
      className="flex min-w-0 items-center gap-3 text-[var(--text-primary)]"
    >
      <span className="brand-mark">M</span>
      <span className="font-display text-[1.55rem] leading-none tracking-[0.22em]">MAP</span>
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
            className={`relative flex items-center gap-3.5 rounded-2xl px-3 py-3 text-[15px] font-medium transition duration-300 ${
              isActive
                ? 'bg-[var(--nav-active)] text-[var(--text-primary)] shadow-[0_10px_24px_-16px_var(--card-shadow)]'
                : 'text-[var(--text-tertiary)] hover:bg-[var(--nav-hover)] hover:text-[var(--text-primary)]'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
            )}
            <Icon active={isActive} />
            <span className="truncate">{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

const dock = [
  {
    label: 'Home',
    href: '#home',
    icon: AboutIcon,
    isOn: (section: string) => section === '' || section === 'about',
  },
  {
    label: 'Work',
    href: '#projects',
    icon: ProjectsIcon,
    isOn: (section: string) => section === 'projects' || section === 'experience',
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: SkillsIcon,
    isOn: (section: string) => section === 'skills' || section === 'certifications' || section === 'github',
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: ContactIcon,
    isOn: (section: string) => section === 'contact',
  },
];

export default function Sidebar() {
  const activeSection = useActiveSection();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[var(--line)] bg-[var(--sidebar)] shadow-[12px_0_40px_-32px_var(--card-shadow)] backdrop-blur-xl md:flex">
        <div className="flex h-24 shrink-0 items-center border-b border-[var(--line)] px-5">
          <Brand />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none p-3">
          <NavList activeSection={activeSection} />
        </div>
        <div className="shrink-0 border-t border-[var(--line)] p-3">
          <ThemeToggle />
        </div>
      </aside>

      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-[var(--sidebar)] backdrop-blur-xl md:hidden"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Brand />
          <ThemeToggle compact />
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--sidebar)] backdrop-blur-xl md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-4">
          {dock.map((item) => {
            const isActive = item.isOn(activeSection);
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
                }`}
              >
                <Icon active={isActive} className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
