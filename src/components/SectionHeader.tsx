import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 font-display text-sm font-bold text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400 dark:ring-brand-500/30">
          {number}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-500/40 via-accent-500/20 to-transparent" />
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}
