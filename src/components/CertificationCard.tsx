interface CertificationCardProps {
  title: string;
}

export default function CertificationCard({ title }: CertificationCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
        Recognized certification in a technology area that supports modern application development, infrastructure, and systems.
      </p>
    </div>
  );
}
