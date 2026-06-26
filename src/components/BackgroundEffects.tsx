import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />
      <div className="noise-overlay absolute inset-0 opacity-50" />

      <motion.div
        className="absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-brand-400/20 blur-[100px] dark:bg-brand-500/15"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-500/20 blur-[100px] dark:bg-accent-500/15"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-pink-400/15 blur-[90px] dark:bg-pink-500/10"
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
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
