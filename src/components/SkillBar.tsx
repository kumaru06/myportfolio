import type { ReactNode } from 'react';

interface SkillBarProps {
  label: string;
  level: number;
  icon: ReactNode;
}

export default function SkillBar({ label, level, icon }: SkillBarProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3 text-sm font-medium">
        <div className="flex min-w-0 items-center gap-2.5 text-[var(--text-primary)]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip)] shadow-[inset_0_1px_0_var(--sheen)]">
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </div>
        <span className="font-display text-lg leading-none text-[var(--accent)]">{level}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--progress-track)]">
        <div
          className="meter-fill h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
