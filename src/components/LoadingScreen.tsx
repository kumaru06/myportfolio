import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  '> Initializing portfolio_v2.exe...',
  '> Loading modules: [react, ts, tailwind]',
  '> Compiling skills database...',
  '> Mounting project assets...',
  '> Establishing secure connection...',
  '> Access granted. Welcome.',
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/|\\';

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame >= text.length * 3) {
          setDisplayed(text);
          setDone(true);
          clearInterval(interval);
          return;
        }
        const revealed = Math.floor(frame / 3);
        const scrambled = text
          .split('')
          .map((char, i) => {
            if (i < revealed) return char;
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        setDisplayed(scrambled);
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={done ? 'text-green-400' : 'text-green-300/70'}>
      {displayed}
    </span>
  );
}

interface LoadingScreenProps {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Reveal lines one by one
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= LINES.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 520);

    // Progress bar
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Trigger exit after all lines are shown
    const exitTimeout = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 600);
    }, LINES.length * 520 + 400);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progInterval);
      clearTimeout(exitTimeout);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,70,0.015)_2px,rgba(0,255,70,0.015)_4px)]" />

          <div className="w-full max-w-lg font-mono">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl font-bold tracking-widest text-green-400">M A P</span>
              <span className="animate-pulse text-xs text-green-500/60">█</span>
            </div>

            {/* Terminal lines */}
            <div className="space-y-1.5 text-sm">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ScrambleText text={line} delay={0} />
                  {i === visibleLines - 1 && (
                    <span className="mt-0.5 animate-pulse text-green-400">▌</span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="mb-1.5 flex justify-between text-xs text-green-600">
                <span>LOADING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs text-slate-600">
              portfolio.markandreyperez — build {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
