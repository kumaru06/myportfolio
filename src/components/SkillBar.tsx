import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SkillBarProps {
  label: string;
  level: number;
  icon: ReactNode;
  delay?: number;
}

export default function SkillBar({ label, level, icon, delay = 0 }: SkillBarProps) {
  return (
    <div className="group space-y-2.5">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-500/10 ring-1 ring-brand-500/20 transition group-hover:bg-brand-500/20">
            {icon}
          </span>
          <span>{label}</span>
        </div>
        <span className="font-display text-xs font-bold text-brand-600 dark:text-brand-400">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-slate-200/80 dark:bg-slate-800">
        <motion.div
          className="h-full rounded bg-gradient-to-r from-brand-500 to-accent-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
