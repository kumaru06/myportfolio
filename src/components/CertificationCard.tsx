import { motion } from 'framer-motion';

interface CertificationCardProps {
  title: string;
  issuer?: string;
  pdfUrl?: string;
  description?: string;
}

export default function CertificationCard({ title, issuer, pdfUrl, description }: CertificationCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl transition-all duration-500 [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-brand-300/50 [@media(hover:hover)]:hover:shadow-glow dark:border-white/8 dark:bg-slate-900/60 dark:[@media(hover:hover)]:hover:border-brand-500/30"
      whileHover={{ transition: { duration: 0.3 } }}
    >
      <div className="relative flex-1">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-gradient-to-br from-brand-500/15 to-accent-500/15 ring-1 ring-brand-500/20">
          <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
          </svg>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
        {issuer && (
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {issuer}
          </p>
        )}
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {description ??
            'Recognized certification demonstrating proficiency in a key technology area supporting modern application development and infrastructure.'}
        </p>
      </div>

      {pdfUrl && (
        <div className="relative mt-6 flex flex-wrap gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 outline-none transition hover:border-brand-400 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1.5 rounded bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2 text-xs font-semibold text-white shadow-md outline-none transition [@media(hover:hover)]:hover:shadow-glow focus-visible:ring-2 focus-visible:ring-brand-500/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
        </div>
      )}
    </motion.div>
  );
}
