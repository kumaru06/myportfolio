const iconActive = 'text-black dark:text-white';
const iconInactive = 'text-neutral-400 dark:text-neutral-500';

function iconClass(active: boolean) {
  return `h-[22px] w-[22px] shrink-0 ${active ? iconActive : iconInactive}`;
}

export function AboutIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20.5c.6-3.1 3.1-5.5 6.5-5.5s5.9 2.4 6.5 5.5" />
    </svg>
  );
}

export function SkillsIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}

export function ProjectsIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.25" />
      <rect x="14" y="3" width="7" height="7" rx="1.25" />
      <rect x="3" y="14" width="7" height="7" rx="1.25" />
      <rect x="14" y="14" width="7" height="7" rx="1.25" />
    </svg>
  );
}

export function CertsIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M8.25 12.5 7 20l5-2.25L17 20l-1.25-7.5" />
    </svg>
  );
}

export function ExperienceIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
      <rect x="4" y="7" width="16" height="13" rx="1.5" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function ContactIcon({ active }: { active: boolean }) {
  return (
    <svg className={iconClass(active)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3 7.5 9 6.5 9-6.5" />
    </svg>
  );
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z" />
    </svg>
  );
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3.75" />
      <path d="M12 2.75v2.25M12 19v2.25M4.56 4.56l1.59 1.59M17.85 17.85l1.59 1.59M2.75 12h2.25M19 12h2.25M4.56 19.44l1.59-1.59M17.85 6.15l1.59-1.59" />
    </svg>
  );
}
