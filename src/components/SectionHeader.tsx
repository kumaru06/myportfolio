interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="relative mb-5 md:mb-12">
      <p className="section-label">Section {number}</p>
      <h2 className="mt-2 font-display text-3xl leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)] md:mt-3 md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)] md:mt-4 md:text-base md:leading-7">{subtitle}</p>
      )}
    </div>
  );
}
