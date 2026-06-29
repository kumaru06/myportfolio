export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 w-full border-t border-neutral-200 bg-white py-10 pb-24 md:py-12 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-black font-display text-xs font-extrabold text-white">
              M
            </span>
            <div>
              <p className="font-display text-sm font-bold text-black">Mark Andrey Perez</p>
              <p className="text-xs text-neutral-500">AI-Augmented Full-stack Developer</p>
            </div>
          </div>

          <p className="text-sm text-neutral-500">© {year} Mark Andrey Perez. All rights reserved.</p>

          <a
            href="#home"
            className="flex items-center gap-2 rounded border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-400 hover:text-black"
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
