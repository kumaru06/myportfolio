import { useRef, type MouseEvent, type ReactNode } from 'react';

interface TiltSurfaceProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}

export default function TiltSurface({ children, className = '', max = 8, glare = false }: TiltSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  const canTilt = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  };

  const move = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !canTilt()) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max * 1.15;

    el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div className={`tilt-stage ${className}`}>
      <div ref={ref} className="tilt-surface h-full" onMouseMove={move} onMouseLeave={leave}>
        {glare && <span className="tilt-glare" aria-hidden />}
        {children}
      </div>
    </div>
  );
}
