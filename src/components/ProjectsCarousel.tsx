import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
  images?: string[];
}

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const goTo = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-3xl px-10 sm:px-12">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none invisible" aria-hidden="true">
          <ProjectCard project={projects[current]} inCarousel />
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-x-0 top-0 w-full shadow-soft"
          >
            <ProjectCard project={projects[current]} inCarousel />
          </motion.div>
        </AnimatePresence>
      </div>

      {projects.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 shadow-md transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:-translate-x-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 shadow-md transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:translate-x-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${project.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
