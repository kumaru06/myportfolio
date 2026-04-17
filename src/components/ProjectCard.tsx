import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tech: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-xl transition-default hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80"
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#"
          className="inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View Details
        </a>
        <a
          href="#"
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          Source Code
        </a>
      </div>
    </motion.article>
  );
}
