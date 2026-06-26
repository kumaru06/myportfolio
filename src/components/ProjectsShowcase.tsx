import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import iconElectron from '../assets/images/programminglogo/electron.png';
import iconNodeJs from '../assets/images/programminglogo/back-end/Node.js.png';
import iconJavaScript from '../assets/images/programminglogo/front-end/JavaScript.png';
import iconHtml from '../assets/images/programminglogo/front-end/HTML.png';
import iconCss from '../assets/images/programminglogo/front-end/CSS.png';
import iconSql from '../assets/images/programminglogo/other/Database Management.png';
import iconJson from '../assets/images/programminglogo/json.png';
import iconPhp from '../assets/images/programminglogo/back-end/PHP.png';
import iconReact from '../assets/images/programminglogo/front-end/React.png';
import iconTs from '../assets/images/programminglogo/front-end/TypeScript.png';

const techIconMap: Record<string, string> = {
  electron: iconElectron,
  'node.js': iconNodeJs,
  javascript: iconJavaScript,
  html: iconHtml,
  css: iconCss,
  sql: iconSql,
  json: iconJson,
  php: iconPhp,
  react: iconReact,
  typescript: iconTs,
};

export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
  images?: string[];
  type?: string;
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

const AUTO_ADVANCE_MS = 7000;
const SLIDE_MS = 3500;

function BrowserMockup({
  slides,
  liveUrl,
  title,
}: {
  slides: string[];
  liveUrl?: string;
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = slides.length > 1;

  useEffect(() => {
    setCurrent(0);
  }, [slides]);

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, [hasMultiple, slides]);

  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'localhost:3000';

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-brand-500/20 via-accent-500/15 to-pink-500/10 blur-2xl sm:-inset-4" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-2xl dark:border-white/10">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-slate-800/90 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-900/80 px-3 py-1.5">
            <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="truncate text-xs text-slate-400">{displayUrl}</span>
          </div>
        </div>

        {/* Screenshot area */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
          {slides.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[current]}
                  src={slides[current]}
                  alt={`${title} screenshot ${current + 1}`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>

              {hasMultiple && (
                <>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-label={`Screenshot ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {current + 1} / {slides.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <svg className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const project = projects[active];
  const slides =
    project?.images && project.images.length > 1
      ? project.images
      : project?.image
        ? [project.image]
        : [];

  const goTo = useCallback(
    (index: number) => {
      setActive((index + projects.length) % projects.length);
      setProgress(0);
    },
    [projects.length],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (projects.length <= 1 || paused) return;

    const tick = 50;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (tick / AUTO_ADVANCE_MS) * 100;
        if (next >= 100) {
          goTo(active + 1);
          return 0;
        }
        return next;
      });
    }, tick);

    return () => clearInterval(interval);
  }, [active, paused, projects.length, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  if (!project) return null;

  const shortTitle = (title: string) => {
    if (title.includes('Southdev')) return 'Southdev Home Depot';
    if (title.includes('GCash')) return 'GCash POS';
    if (title.includes('AMA')) return 'AMA OJT Portal';
    return title.split(' ').slice(0, 3).join(' ');
  };

  return (
    <div
      className="relative w-full max-w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Project tabs */}
      <div className="mb-6 flex w-full max-w-full flex-col gap-4 overflow-hidden sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1 scrollbar-none">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                i === active
                  ? 'border-brand-500/40 bg-brand-500/10 shadow-glow dark:border-brand-500/30 dark:bg-brand-500/15'
                  : 'border-slate-200/80 bg-white/60 hover:border-slate-300 dark:border-white/8 dark:bg-slate-900/50 dark:hover:border-white/15'
              }`}
            >
              <span
                className={`font-display text-xs font-bold ${
                  i === active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`whitespace-nowrap text-sm font-semibold ${
                  i === active ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {shortTitle(p.title)}
              </span>
              {i === active && (
                <motion.span
                  layoutId="project-tab-dot"
                  className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main showcase card */}
      <div className="glass-card overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-10"
          >
            {/* Left — browser preview */}
            <BrowserMockup slides={slides} liveUrl={project.liveUrl} title={project.title} />

            {/* Right — project details */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-sm font-bold text-slate-400">
                  {String(active + 1).padStart(2, '0')}{' '}
                  <span className="text-slate-300 dark:text-slate-600">/</span>{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
                {project.type && (
                  <span className="rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300">
                    {project.type}
                  </span>
                )}
                {project.liveUrl && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-slate-950 dark:text-white sm:text-3xl">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                {project.description}
              </p>

              {/* Tech stack — icon grid */}
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => {
                    const icon = techIconMap[item.toLowerCase()];
                    return (
                      <div
                        key={item}
                        title={item}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 transition hover:border-brand-400/50 hover:shadow-sm dark:border-white/8 dark:bg-slate-800/60 dark:hover:border-brand-500/30"
                      >
                        {icon ? (
                          <img
                            src={icon}
                            alt={item}
                            className={`object-contain ${item.toLowerCase() === 'electron' ? 'h-5 w-5' : 'h-4 w-4'}`}
                          />
                        ) : (
                          <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-500/20 text-[8px] font-bold text-brand-600">
                            {item.slice(0, 2)}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center gap-2 sm:flex-none"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Site
                  </a>
                ) : (
                  <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500 sm:flex-none">
                    View Live Site
                  </span>
                )}
                {project.sourceUrl ? (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 justify-center gap-2 sm:flex-none"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                ) : (
                  <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-slate-200/80 px-6 py-3 text-sm font-semibold text-slate-400 dark:border-white/10 dark:text-slate-500 sm:flex-none">
                    Source Code
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Auto-advance progress bar */}
        {projects.length > 1 && (
          <div className="h-1 bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}
      </div>

      {/* Mobile nav arrows */}
      {projects.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-slate-900/80"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-slate-900/80"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
