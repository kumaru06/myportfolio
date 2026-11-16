import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import SectionHeader from './components/SectionHeader';
import ProjectsShowcase from './components/ProjectsShowcase';
import CertificationCard from './components/CertificationCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SkillBar from './components/SkillBar';
import GitHubContributions from './components/GitHubContributions';
import { HeroReveal, ScrollReveal, ScrollStagger, ScrollStaggerItem } from './components/ScrollReveal';
import profilePic from './assets/images/profile.png';
import resumePdf from './assets/images/resume/Perez-resume.pdf';
import cashPosDesk1 from './assets/images/cashpos/cashPOSdeskapp.png';
import cashPosDesk2 from './assets/images/cashpos/cashPOSdeskapp2.png';
import cashPosDesk3 from './assets/images/cashpos/cashPOSdeskapp3.png';
import cashPosWeb from './assets/images/cashpos/cashposweb.png';
import southdevImg from './assets/southdev.png';
import amaOjtImg from './assets/ama-ojtportal.png';
import certCCNA from './assets/images/certificationspdf/CCNAv7 Introduction to Networks.pdf';
import certDevNet from './assets/images/certificationspdf/DevNet Associate.pdf';
import certPacketTracer from './assets/images/certificationspdf/Getting Started with Cisco Packet Tracer.pdf';
import certNetSec from './assets/images/certificationspdf/Network Security.pdf';
import certCPA from './assets/images/certificationspdf/Partner CPA - Programming Essentials in C++.pdf';
import certCPP from './assets/images/certificationspdf/Partner CPP - Advanced Programming in C++.pdf';
import SocialIcon from './components/SocialIcon';
import PortraitStage from './components/PortraitStage';
import TiltSurface from './components/TiltSurface';
import iconHtml from './assets/images/programminglogo/front-end/HTML.svg';
import iconCss from './assets/images/programminglogo/front-end/CSS.svg';
import iconJs from './assets/images/programminglogo/front-end/JavaScript.svg';
import iconReact from './assets/images/programminglogo/front-end/React.svg';
import iconTs from './assets/images/programminglogo/front-end/TypeScript.svg';
import iconNode from './assets/images/programminglogo/back-end/Node.js.svg';
import iconPhp from './assets/images/programminglogo/back-end/PHP.svg';
import iconRest from './assets/images/programminglogo/back-end/REST API Design.svg';
import iconAuth from './assets/images/programminglogo/back-end/Authentication & Authorization.svg';
import iconDbDesign from './assets/images/programminglogo/back-end/Database Design & ORM.svg';
import iconDeploy from './assets/images/programminglogo/back-end/Deployment & Monitoring.svg';
import iconCpp from './assets/images/programminglogo/programming/Cplusplus.svg';
import iconAlgo from './assets/images/programminglogo/programming/Algorithms & Data Structures.svg';
import iconDbSql from './assets/images/programminglogo/programming/Databases & SQL.svg';
import iconDebug from './assets/images/programminglogo/programming/Debugging & Profiling.svg';
import iconDatabaseManagement from './assets/images/programminglogo/other/Database Management.svg';
import iconSDLC from './assets/images/programminglogo/other/SDLC.svg';
import iconSystemDesign from './assets/images/programminglogo/other/SystemDesign.svg';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = useMemo(
    () => [
      { label: 'HTML', category: 'Frontend', level: 90 },
      { label: 'CSS', category: 'Frontend', level: 88 },
      { label: 'JavaScript', category: 'Frontend', level: 86 },
      { label: 'React', category: 'Frontend', level: 80 },
      { label: 'TypeScript', category: 'Frontend', level: 74 },
      { label: 'PHP', category: 'Backend', level: 76 },
      { label: 'Node.js', category: 'Backend', level: 68 },
      { label: 'REST API Design', category: 'Backend', level: 86 },
      { label: 'Authentication & Authorization', category: 'Backend', level: 82 },
      { label: 'Database Design & ORM', category: 'Backend', level: 84 },
      { label: 'Deployment & Monitoring', category: 'Backend', level: 74 },
      { label: 'Advanced C++', category: 'Programming', level: 92 },
      { label: 'Algorithms & Data Structures', category: 'Programming', level: 88 },
      { label: 'Debugging & Profiling', category: 'Programming', level: 80 },
      { label: 'Databases & SQL', category: 'Programming', level: 84 },
      { label: 'Database Management', category: 'Other', level: 82 },
      { label: 'SDLC', category: 'Other', level: 84 },
      { label: 'System Design', category: 'Other', level: 78 },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        title: 'Online Management System for Southdev Home Depot',
        description:
          'A scalable web-based management system for Southdev Home Depot with modules for inventory control, sales workflows, and customer service—handling product tracking, order processing, and daily store operations from stock to checkout.',
        tech: ['PHP', 'SQL', 'JavaScript', 'CSS', 'HTML', 'JSON'],
        liveUrl: 'https://southdevhomedepotdavao.com',
        image: southdevImg,
        type: 'Web Application',
      },
      {
        title: 'CashPOS — Hybrid Offline POS (Electron + Laravel)',
        description:
          'A hybrid offline-first POS for cash-in/cash-out transactions—Electron desktop app with local SQLite, auto cloud sync every 10s to a Laravel admin panel, role-based access, sales reports, PDF/CSV export, and auto-updates via GitHub Releases.',
        tech: ['Electron', 'Node.js', 'JavaScript', 'Laravel', 'PHP', 'SQLite', 'MySQL'],
        liveUrl: 'https://adminpos.online',
        sourceUrl: 'https://github.com/kumaru06/gcashpos',
        image: cashPosDesk1,
        images: [cashPosDesk1, cashPosDesk2, cashPosDesk3, cashPosWeb],
        type: 'Desktop & Web Application',
      },
      {
        title: 'AMA Practicum Management System',
        description:
          'A web-based OJT practicum management system for AMA Computer College with role-based portals for students, coordinators, and industry partners—handling enrollment, deployment, attendance tracking, and documentation from start to finish.',
        tech: ['PHP', 'SQL', 'JavaScript', 'HTML', 'CSS'],
        liveUrl: 'https://ama-ojtportal.com/',
        image: amaOjtImg,
        type: 'Web Application',
      },
    ],
    [],
  );

  const certifications = useMemo(
    () => [
      { title: 'CCNAv7 Introduction to Networks', issuer: 'Cisco', pdfUrl: certCCNA, description: 'Covers fundamental networking concepts including IP addressing, routing protocols, network access, and troubleshooting in modern network environments.' },
      { title: 'DevNet Associate', issuer: 'Cisco', pdfUrl: certDevNet, description: 'Validates skills in software development and design using Cisco platforms, APIs, automation, and infrastructure programmability.' },
      { title: 'Getting Started with Cisco Packet Tracer', issuer: 'Cisco', pdfUrl: certPacketTracer, description: 'Demonstrates proficiency in using Cisco Packet Tracer to simulate, visualize, and troubleshoot network topologies and configurations.' },
      { title: 'Network Security', issuer: 'Cisco', pdfUrl: certNetSec, description: 'Covers core network security concepts including firewalls, VPNs, access control, threat mitigation, and secure network infrastructure design.' },
      { title: 'Programming Essentials in C++', issuer: 'Cisco / NetAcad', pdfUrl: certCPA, description: 'Establishes foundational knowledge of C++ programming including syntax, data types, control flow, functions, and object-oriented principles.' },
      { title: 'Advanced Programming in C++', issuer: 'Cisco / NetAcad', pdfUrl: certCPP, description: 'Covers advanced C++ topics such as templates, STL, memory management, polymorphism, and design patterns for building robust software systems.' },
    ],
    [],
  );

  const experiences = useMemo(
    () => [
      {
        role: 'Web Developer Intern',
        context: 'OJT · IT Department',
        org: 'AMA Computer College, Inc.',
        branch: 'Davao City Branch',
        address: '123 General Malvar Street, Poblacion District, Davao City',
        periodStart: 'Jun 17, 2026',
        periodEnd: 'Oct 7, 2026',
        hours: '514 hours',
        points: [
          'Completed 514 hours (513 hrs and 59 mins) of on-the-job training under the IT Department, focused on full-stack web application development.',
          'Engineered and deployed the AMA OJT Portal, a role-based multi-portal management system on a custom PHP 8 MVC architecture with front-controller routing and access control lists.',
          'Integrated Dompdf and PHPMailer for automated PDF document generation and email notifications, with secured database queries and responsive UI layouts.',
        ],
      },
    ],
    [],
  );

  const stats = [
    { value: '3+', label: 'Projects Built' },
    { value: '6', label: 'Certifications' },
    { value: '18+', label: 'Technologies' },
  ];

  function getSkillIcon(label: string) {
    const normalize = (s: string) => {
      let t = s.toLowerCase();
      t = t.replace(/c\+\+/g, 'cpp');
      t = t.replace(/c#/g, 'csharp');
      t = t.replace(/&/g, '');
      return t.replace(/[^a-z0-9]/g, '');
    };

    const map: Record<string, string> = {
      html: iconHtml, css: iconCss, javascript: iconJs, react: iconReact, typescript: iconTs,
      nodejs: iconNode, php: iconPhp, restapidesign: iconRest, authenticationauthorization: iconAuth,
      databasedesignorm: iconDbDesign, deploymentmonitoring: iconDeploy, advancedcpp: iconCpp,
      algorithmsdatastructures: iconAlgo, databasessql: iconDbSql, debuggingprofiling: iconDebug,
      databasemanagement: iconDatabaseManagement, sdlc: iconSDLC, systemdesign: iconSystemDesign,
    };

    const key = normalize(label);
    const src = map[key];
    if (!src) {
      return (
        <svg className="h-4 w-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
          <path d="M8 12h8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      );
    }
    return <img src={src} alt={label} className="h-4 w-4 object-contain" />;
  }

  const socialLinks = [
    { href: 'mailto:markandreyperez@gmail.com', icon: 'email' as const, label: 'Email', display: 'markandreyperez@gmail.com', external: false },
    { href: 'https://github.com/kumaru06', icon: 'github' as const, label: 'GitHub', display: 'Mark Perez', external: true },
    { href: 'https://www.linkedin.com/in/mark-perez-5a5346404/', icon: 'linkedin' as const, label: 'LinkedIn', display: 'Mark Perez', external: true },
    { href: 'https://web.facebook.com/errantknight01/', icon: 'facebook' as const, label: 'Facebook', display: 'Mark Andrey Perez', external: true },
  ];

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-transparent font-sans text-[var(--text-primary)]">
      <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-[var(--progress-track)] md:left-64">
        <div className="h-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-soft)] transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Sidebar />

      <div className="md:pl-64">
      <main className="relative mx-auto w-full max-w-6xl overflow-x-hidden px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[calc(4.25rem+env(safe-area-inset-top))] sm:px-6 md:pb-24 md:pt-14 lg:px-8">
        {/* HERO */}
        <section className="relative" id="home">
          <div className="hero-atmosphere" aria-hidden />
          <HeroReveal>
          <div className="relative z-[1] grid items-center gap-8 lg:min-h-[calc(100vh-8.5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div className="flex min-w-0 flex-col justify-center text-left">
              <p className="section-label">Hello, I'm</p>
              <h1 className="mt-3 font-display text-[clamp(2.6rem,12vw,3.4rem)] leading-[0.88] tracking-[-0.04em] text-[var(--text-primary)] lg:mt-4 lg:text-[clamp(3.15rem,5.1vw,5.45rem)]">
                <span className="block">Mark Andrey</span>
                <em className="italic text-[var(--accent)]">Perez</em>
              </h1>
              <p className="mt-5 max-w-md text-lg font-medium text-[var(--text-primary)] lg:mt-6 lg:text-xl">
                Software Developer
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)] lg:text-base lg:leading-8">
                Full-stack Software Developer building scalable, intelligent, and user‑friendly applications that make a real impact.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-start gap-3 lg:mt-8">
                <a href="#projects" className="btn-primary px-6 py-3">
                  View Projects
                </a>
                <a href="#contact" className="btn-secondary px-6 py-3">
                  Contact Me
                </a>
              </div>

              <div className="mt-6 grid w-full max-w-lg grid-cols-3 gap-2 lg:mt-8 lg:gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-tile text-center">
                    <p className="font-display text-2xl leading-none text-[var(--text-primary)] md:text-4xl">{stat.value}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-[var(--text-tertiary)] md:text-[11px] md:tracking-[0.14em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <PortraitStage src={profilePic} name="Mark Andrey Perez" resumeHref={resumePdf} />
            </div>
          </div>
          </HeroReveal>
        </section>

        {/* ABOUT */}
        <section className="mobile-section" id="about">
          <ScrollReveal>
          <SectionHeader
            number="01"
            title="About Me"
            subtitle="Passionate about building intelligent software that solves real problems."
          />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
          <div className="card w-full overflow-hidden p-5 sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="space-y-5 text-justify text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                <p>
                  I am an Full-Stack Software Developer who combines strong foundations in both front-end and back-end development with the power of modern artificial intelligence tools and workflows. I specialize in building user-friendly, dynamic, and scalable web applications using technologies such as HTML, CSS, JavaScript, PHP, React, TypeScript, and C++.
                </p>
                <p>
                  My experience includes developing systems like inventory management platforms, hotel booking systems, and mobile applications, where I apply software engineering principles, system design, and problem-solving skills to deliver efficient and reliable solutions.
                </p>
                <p>
                  Detail-oriented, adaptable, and driven to learn, I thrive in both collaborative and independent environments. My goal is to continually deliver intelligent, impactful solutions that push the boundaries of modern software development.                </p>
              </div>
              <div className="flex flex-col gap-3">
                {['React & TypeScript', 'PHP & Node.js', 'Full-stack Developer', 'System Design'].map((tag) => (
                  <div key={tag} className="chip px-4 py-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        {/* SKILLS */}
        <section className="mobile-section" id="skills">
          <ScrollReveal>
          <SectionHeader
            number="02"
            title="Skills & Expertise"
            subtitle="Technologies and competencies I've honed through projects and certifications."
          />
          </ScrollReveal>
          <ScrollStagger className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none md:grid md:snap-none md:grid-cols-2 md:overflow-visible">
            {['Frontend', 'Backend', 'Programming', 'Other'].map((group) => (
              <ScrollStaggerItem key={group} className="h-full w-[86%] shrink-0 snap-center md:w-auto md:shrink">
              <TiltSurface className="h-full" max={5.5}>
              <div className="card flex h-full flex-col p-6 sm:p-7">
                <div className="mb-6 inline-flex w-fit shrink-0 items-center self-start rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-1.5">
                  <span className="font-display text-2xl leading-none text-[var(--text-primary)]">{group}</span>
                </div>
                <div className="skill-scroll space-y-5">
                  {skills
                    .filter((skill) => skill.category === group)
                    .map((skill) => (
                      <SkillBar key={skill.label} label={skill.label} level={skill.level} icon={getSkillIcon(skill.label)} />
                    ))}
                </div>
              </div>
              </TiltSurface>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </section>

        {/* PROJECTS */}
        <section className="mobile-section" id="projects">
          <ScrollReveal>
          <SectionHeader
            number="03"
            title="Featured Projects"
            subtitle="Real-world applications I've designed and built from the ground up."
          />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
          <ProjectsShowcase projects={projects} />
          </ScrollReveal>
        </section>

        {/* CERTIFICATIONS */}
        <section className="mobile-section" id="certifications">
          <ScrollReveal>
          <SectionHeader
            number="04"
            title="Certifications"
            subtitle="Industry-recognized credentials from Cisco and NetAcad."
          />
          </ScrollReveal>
          <ScrollStagger className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <ScrollStaggerItem key={cert.title} className="h-full">
              <TiltSurface className="h-full" max={6}>
              <CertificationCard {...cert} />
              </TiltSurface>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </section>

        {/* EXPERIENCE */}
        <section className="mobile-section" id="experience">
          <ScrollReveal>
          <SectionHeader
            number="05"
            title="Experience"
            subtitle="On-the-job training and the system I shipped."
          />
          </ScrollReveal>
          <div className="space-y-5">
            {experiences.map((item) => (
              <ScrollReveal key={item.role} delay={0.06}>
                <article className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(17.5rem,280px)_1fr] lg:gap-10 lg:p-10">
                  <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                    <p className="whitespace-nowrap font-display text-[1.35rem] leading-none text-[var(--text-primary)] min-[400px]:text-[1.55rem] sm:text-[1.7rem]">
                      {item.periodStart}{' '}
                      <span className="italic text-[var(--accent)]">{item.periodEnd}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                        {item.hours}
                      </span>
                      <span className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                        {item.context}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-[var(--text-tertiary)]">{item.branch}</p>
                  </div>

                  <div>
                    <p className="section-label">{item.org}</p>
                    <h3 className="mt-2 font-display text-3xl leading-none text-[var(--text-primary)] md:text-5xl">{item.role}</h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">{item.address}</p>
                    <ul className="mt-6 space-y-4">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-7 text-[var(--text-secondary)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section className="mobile-section" id="github">
          <ScrollReveal>
          <SectionHeader
            number="06"
            title="GitHub"
            subtitle="My open-source activity and contributions over the past year."
          />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
          <GitHubContributions username="kumaru06" />
          </ScrollReveal>
        </section>

        {/* CONTACT */}
        <section className="mobile-section" id="contact">
          <ScrollReveal>
          <SectionHeader
            number="07"
            title="Get In Touch"
            subtitle="Have a project in mind? Let's talk."
          />
          </ScrollReveal>
          <ScrollStagger className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
            <ScrollStaggerItem className="order-2 lg:order-1">
            <div className="card w-full overflow-hidden p-5 sm:p-8 md:p-10">
              <h3 className="font-display text-3xl leading-[0.95] text-[var(--text-primary)] md:text-5xl">
                Let's build something effective together.
              </h3>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                Reach out by email or send a quick message using the form. I'm available for freelance opportunities and project collaborations.
              </p>
              <div className="mt-8 space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group chip p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)]">
                      <SocialIcon platform={link.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="section-label">{link.label}</p>
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{link.display}</p>
                    </div>
                    <svg
                      className="ml-auto h-4 w-4 text-[var(--text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            </ScrollStaggerItem>
            <ScrollStaggerItem className="order-1 lg:order-2">
            <ContactForm />
            </ScrollStaggerItem>
          </ScrollStagger>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
}

export default App;
