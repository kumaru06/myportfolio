export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 w-full overflow-hidden border-t border-slate-200/60 bg-white/50 py-12 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 font-display text-xs font-extrabold text-white">
              M
            </span>
            <div>
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Mark Andrey Perez
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI-Augmented Full-stack Developer
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {year} Mark Andrey Perez. Crafted with passion.
          </p>

          <a
            href="#about"
            className="group flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
          >
            Back to top
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
