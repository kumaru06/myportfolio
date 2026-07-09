interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-200 text-sm font-bold text-black dark:border-neutral-700 dark:text-white sm:h-10 sm:w-10">
          {number}
        </span>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-black dark:text-white sm:mt-5 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm text-neutral-600 dark:text-neutral-400 sm:mt-3 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}
