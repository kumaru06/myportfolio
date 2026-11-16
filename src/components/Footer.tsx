export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 w-full border-t border-[var(--line)] py-10 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:py-12 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="brand-mark">M</span>
            <div>
              <p className="font-display text-2xl leading-none text-[var(--text-primary)]">Mark Andrey Perez</p>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">Full-stack Software Developer</p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-tertiary)]">© {year} Mark Andrey Perez. All rights reserved.</p>

          <a
            href="#home"
            className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--chip)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
          >
            Back to top
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
