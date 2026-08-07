import { useCallback, useEffect, useState } from 'react';
import iconElectron from '../assets/images/programminglogo/electron.svg';
import iconNodeJs from '../assets/images/programminglogo/back-end/Node.js.svg';
import iconJavaScript from '../assets/images/programminglogo/front-end/JavaScript.svg';
import iconHtml from '../assets/images/programminglogo/front-end/HTML.svg';
import iconCss from '../assets/images/programminglogo/front-end/CSS.svg';
import iconSql from '../assets/images/programminglogo/programming/Databases & SQL.svg';
import iconJson from '../assets/images/programminglogo/json.svg';
import iconPhp from '../assets/images/programminglogo/back-end/PHP.svg';
import iconReact from '../assets/images/programminglogo/front-end/React.svg';
import iconTs from '../assets/images/programminglogo/front-end/TypeScript.svg';
import iconLaravel from '../assets/images/programminglogo/back-end/Laravel.svg';
import iconSqlite from '../assets/images/programminglogo/back-end/SQLite.svg';
import iconMysql from '../assets/images/programminglogo/back-end/MySQL.svg';

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
  laravel: iconLaravel,
  sqlite: iconSqlite,
  mysql: iconMysql,
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
      <div className="relative overflow-hidden rounded border border-neutral-200 bg-neutral-900">
        <div className="flex items-center gap-3 border-b border-neutral-700 bg-neutral-800 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded bg-neutral-900 px-3 py-1.5">
            <svg className="h-3 w-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="truncate text-xs text-neutral-400">{displayUrl}</span>
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
          {slides.length > 0 ? (
            <>
              <img
                key={slides[current]}
                src={slides[current]}
                alt={`${title} screenshot ${current + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
              />

              {hasMultiple && (
                <>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-label={`Screenshot ${i + 1}`}
                        className={`h-1 rounded transition-all duration-200 ${
                          i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {current + 1} / {slides.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-neutral-800">
              <svg className="h-12 w-12 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
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
    if (title.includes('CashPOS') || title.includes('GCash')) return 'CashPOS';
    if (title.includes('AMA')) return 'AMA OJT Portal';
    return title.split(' ').slice(0, 3).join(' ');
  };

  return (
    <div
      className="relative w-full max-w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 flex w-full max-w-full flex-col gap-4 overflow-hidden sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1 scrollbar-none">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              className={`relative flex shrink-0 items-center gap-2.5 rounded border px-4 py-3 text-left transition-colors duration-200 ${
                i === active
                  ? 'border-black bg-neutral-50 dark:border-white dark:bg-neutral-900'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-neutral-600'
              }`}
            >
              <span className={`font-display text-xs font-bold ${i === active ? 'text-black dark:text-white' : 'text-neutral-400'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`whitespace-nowrap text-sm font-semibold ${i === active ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                {shortTitle(p.title)}
              </span>
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div key={active} className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-10">
          <BrowserMockup slides={slides} liveUrl={project.liveUrl} title={project.title} />

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-sm font-bold text-neutral-400">
                {String(active + 1).padStart(2, '0')}{' '}
                <span className="text-neutral-300 dark:text-neutral-600">/</span>{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
              {project.type && (
                <span className="rounded border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {project.type}
                </span>
              )}
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 rounded border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                  Live
                </span>
              )}
            </div>

            <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl">
              {project.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">{project.description}</p>

            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => {
                  const icon = techIconMap[item.toLowerCase()];
                  return (
                    <div
                      key={item}
                      title={item}
                      className="flex items-center gap-2 rounded border border-neutral-200 bg-white px-3 py-2 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
                    >
                      {icon ? (
                        <img
                          src={icon}
                          alt={item}
                          className={`object-contain ${item.toLowerCase() === 'electron' ? 'h-5 w-5' : 'h-4 w-4'}`}
                        />
                      ) : (
                        <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-100 text-[8px] font-bold text-black dark:bg-neutral-800 dark:text-white">
                          {item.slice(0, 2)}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-black dark:text-white">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

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
                <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500 sm:flex-none">
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
                <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 dark:border-neutral-700 dark:text-neutral-500 sm:flex-none">
                  Source Code
                </span>
              )}
            </div>
          </div>
        </div>

        {projects.length > 1 && (
          <div className="h-1 bg-neutral-100 dark:bg-neutral-800">
            <div className="h-full bg-black transition-[width] duration-75 dark:bg-white" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {projects.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
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
