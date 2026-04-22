interface CertificationCardProps {
  title: string;
  issuer?: string;
  pdfUrl?: string;
  description?: string;
}

export default function CertificationCard({ title, issuer, pdfUrl, description }: CertificationCardProps) {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        {issuer && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">{issuer}</p>
        )}
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {description ?? 'Recognized certification demonstrating proficiency in a key technology area supporting modern application development and infrastructure.'}
        </p>
      </div>
      {pdfUrl && (
        <div className="mt-5 flex gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Certificate
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
        </div>
      )}
    </div>
  );
}
