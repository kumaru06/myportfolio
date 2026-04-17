interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Section {number}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 sm:ml-8" />
    </div>
  );
}
