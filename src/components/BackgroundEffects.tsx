import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />
      <div className="noise-overlay absolute inset-0 opacity-50" />

      <motion.div
        className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-brand-400/20 blur-[80px] sm:-left-32 sm:h-[480px] sm:w-[480px] sm:blur-[100px] dark:bg-brand-500/15"
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-12 top-1/3 h-56 w-56 rounded-full bg-accent-500/20 blur-[80px] sm:-right-24 sm:h-[400px] sm:w-[400px] sm:blur-[100px] dark:bg-accent-500/15"
        animate={{ x: [0, -15, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-pink-400/15 blur-[70px] sm:left-1/3 sm:h-[350px] sm:w-[350px] sm:blur-[90px] dark:bg-pink-500/10"
        animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(51,150,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(51,150,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}
