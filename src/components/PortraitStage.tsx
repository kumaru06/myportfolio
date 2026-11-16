import TiltSurface from './TiltSurface';

interface PortraitStageProps {
  src: string;
  name: string;
  resumeHref: string;
}

export default function PortraitStage({ src, name, resumeHref }: PortraitStageProps) {
  return (
    <TiltSurface className="mx-auto w-full max-w-[240px] md:max-w-[420px]" max={11} glare>
      <div className="portrait-stage">
        <div className="portrait-plate portrait-plate-back" />
        <div className="portrait-plate portrait-plate-mid" />
        <div className="portrait-frame">
          <img src={src} alt={name} draggable={false} className="h-full w-full select-none object-cover object-[center_18%]" />
          <div className="portrait-shade" />
        </div>
        <div className="portrait-float portrait-float-status">
          <span className="live-dot" />
          Available for work
        </div>
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download="Mark-Perez-Resume.pdf"
          className="portrait-float portrait-float-cv"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0 3.5-3.5M12 14 8.5 10.5M5 19h14" />
          </svg>
          Download CV
        </a>
        <div className="portrait-floor" />
      </div>
    </TiltSurface>
  );
}
