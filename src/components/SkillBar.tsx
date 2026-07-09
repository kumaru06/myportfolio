import type { ReactNode } from 'react';

interface SkillBarProps {
  label: string;
  level: number;
  icon: ReactNode;
}

export default function SkillBar({ label, level, icon }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2.5 text-black dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
            {icon}
          </span>
          <span>{label}</span>
        </div>
        <span className="font-display text-xs font-bold text-neutral-500 dark:text-neutral-400">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
        <div
          className="h-full rounded bg-black transition-[width] duration-700 ease-out dark:bg-white"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
