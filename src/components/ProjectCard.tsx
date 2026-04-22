import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
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

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
  images?: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const slides = project.images && project.images.length > 1 ? project.images : project.image ? [project.image] : [];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      {/* Image / Carousel area */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {slides.length > 0 ? (
          <>
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={current}
                src={slides[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Live badge */}
            {project.liveUrl && (
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Live
              </div>
            )}

            {/* Slide indicators */}
            {slides.length > 1 && (
              <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Title overlaid at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-bold leading-tight text-white drop-shadow-md">
                {project.title}
              </h3>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
            <svg className="h-16 w-16 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {!slides.length && (
          <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
        )}

        <p className={`text-sm leading-6 sm:leading-7 text-slate-600 dark:text-slate-300 ${!slides.length ? 'mt-3' : ''}`}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
          {project.tech.map((item) => {
            const icon = techIconMap[item.toLowerCase()];
            return (
              <span
                key={item}
                className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300"
              >
                {icon && <img src={icon} alt={item} className={`object-contain ${item.toLowerCase() === 'electron' ? 'h-5 w-5' : 'h-3.5 w-3.5'}`} />}
                {item}
              </span>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-300 dark:shadow-blue-900/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live
            </a>
          ) : (
            <span className="inline-flex w-full sm:w-auto justify-center cursor-not-allowed items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live
            </span>
          )}
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source Code
            </a>
          ) : (
            <span className="inline-flex w-full sm:w-auto justify-center cursor-not-allowed items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500">
              Source Code
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
