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
      { title: 'Software Developer', description: 'Hands-on experience designing and building full-stack web applications using modern technologies such as HTML, CSS, JavaScript, PHP, React, and TypeScript, with a focus on clean architecture and user-centric design.' },
      { title: 'Advanced Programming in C++', description: 'In-depth coursework and practical training covering advanced C++ concepts including templates, the Standard Template Library (STL), memory management, object-oriented design, and performance optimization.' },
      { title: 'AI Machine Learning', description: 'Foundational knowledge and applied experience in artificial intelligence and machine learning, including model training, data preprocessing, and integrating AI-driven tools into modern software development workflows.' },
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
        <svg className="h-4 w-4 text-black dark:text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white font-sans text-black dark:bg-neutral-950 dark:text-white">
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-neutral-100 dark:bg-neutral-800 md:left-64">
        <div className="h-full bg-black transition-[width] duration-150 ease-out dark:bg-white" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Sidebar />

      <div className="md:pl-64">
      <main className="relative mx-auto w-full max-w-6xl overflow-x-hidden px-4 pb-16 pt-[calc(4.5rem+env(safe-area-inset-top))] sm:px-6 md:pb-20 md:pt-16 lg:px-8">
        {/* HERO */}
        <section className="relative" id="home">
          <HeroReveal>
          <div className="card overflow-x-hidden p-4 sm:p-8 md:p-12 lg:p-14">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
              <div className="flex w-full flex-col items-center">
                <div className="relative aspect-square w-40 overflow-hidden rounded border border-neutral-200 dark:border-neutral-700 sm:w-48 md:w-56 lg:w-60">
                  <img
                    src={profilePic}
                    alt="Mark Andrey Perez"
                    draggable={false}
                    className="h-full w-full select-none object-cover object-center"
                  />
                </div>
                <div className="mt-5 flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-4 py-1.5 dark:border-neutral-700 dark:bg-neutral-900">
                  <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
                  <span className="text-xs font-semibold text-black dark:text-white">Available for work</span>
                </div>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Mark-Andrey-Perez-Resume.pdf"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold text-black transition-colors duration-200 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>

              <div className="flex min-w-0 flex-col justify-center text-center sm:text-left">
                <p className="section-label mb-3">Hello, I'm</p>
                <h1 className="text-[1.65rem] font-bold leading-tight text-black dark:text-white min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Mark Andrey Perez
                </h1>
                <p className="mt-3 text-base font-medium text-neutral-600 dark:text-neutral-400 sm:text-xl md:text-2xl">
                  AI-Augmented | Software Developer
                </p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:mx-0 sm:mt-6 sm:text-base sm:leading-8">
                  Full-stack AI-Augmented Developer building scalable, intelligent, and user-friendly applications that make a real impact.
                </p>

                <div className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-start">
                  <a href="#projects" className="btn-primary w-auto min-w-[9.5rem] justify-center px-5 py-2.5 sm:min-w-0 sm:px-6 sm:py-3">
                    View Projects
                  </a>
                  <a href="#contact" className="btn-secondary w-auto min-w-[9.5rem] justify-center px-5 py-2.5 sm:min-w-0 sm:px-6 sm:py-3">
                    Contact Me
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-3 border-t border-neutral-200 pt-5 dark:border-neutral-800 sm:mt-10 sm:pt-8">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`flex min-w-0 flex-col items-center px-1 text-center sm:px-4 ${
                        index > 0 ? 'border-l border-neutral-200 dark:border-neutral-800' : ''
                      }`}
                    >
                      <p className="text-xl font-bold text-black dark:text-white sm:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-[9px] font-medium uppercase leading-tight tracking-wide text-neutral-500 dark:text-neutral-400 sm:text-xs sm:tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
              <div className="space-y-5 text-justify text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base sm:leading-8">
                <p>
                  I am an AI-Augmented Full-Stack Software Developer who combines strong foundations in both front-end and back-end development with the power of modern artificial intelligence tools and workflows. I specialize in building user-friendly, dynamic, and scalable web applications using technologies such as HTML, CSS, JavaScript, PHP, React, TypeScript, and C++.
                </p>
                <p>
                  My experience includes developing systems like inventory management platforms, hotel booking systems, and mobile applications, where I apply software engineering principles, system design, and problem-solving skills to deliver efficient and reliable solutions.
                </p>
                <p>
                  Detail-oriented, adaptable, and driven to learn, I thrive in both collaborative and independent environments. My goal is to continually deliver intelligent, impactful solutions that push the boundaries of modern software development.                </p>
              </div>
              <div className="flex flex-col gap-3">
                {['React & TypeScript', 'PHP & Node.js', 'AI-Augmented Dev', 'System Design'].map((tag) => (
                  <div key={tag} className="flex items-center gap-3 rounded border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-black dark:bg-white" />
                    <span className="text-sm font-semibold text-black dark:text-white">{tag}</span>
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
          <ScrollStagger className="grid gap-5 sm:grid-cols-2">
            {['Frontend', 'Backend', 'Programming', 'Other'].map((group) => (
              <ScrollStaggerItem key={group} className="h-full">
              <div className="card flex h-[380px] flex-col overflow-hidden p-6 sm:h-[420px] sm:p-7">
                <div className="mb-6 inline-flex w-fit shrink-0 self-start items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-4 py-1.5 dark:border-neutral-700 dark:bg-neutral-900">
                  <span className="font-display text-sm font-bold text-black dark:text-white">{group}</span>
                </div>
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto scrollbar-none">
                  {skills
                    .filter((skill) => skill.category === group)
                    .map((skill) => (
                      <SkillBar key={skill.label} label={skill.label} level={skill.level} icon={getSkillIcon(skill.label)} />
                    ))}
                </div>
              </div>
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
              <ScrollStaggerItem key={cert.title}>
              <CertificationCard {...cert} />
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
            subtitle="Areas of focus and professional growth."
          />
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-neutral-200 dark:bg-neutral-800 sm:block" />
            <ScrollStagger className="space-y-6">
              {experiences.map((item) => (
                <ScrollStaggerItem key={item.title}>
                <div className="relative sm:pl-16">
                  <div className="absolute left-4 top-6 hidden h-4 w-4 rounded-full border-2 border-black bg-white dark:border-white dark:bg-neutral-950 sm:block" />
                  <div className="card w-full overflow-hidden p-6 sm:p-7">
                    <h3 className="font-display text-xl font-bold text-black dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-justify text-neutral-600 dark:text-neutral-400">{item.description}</p>
                  </div>
                </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
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
          <ScrollStagger className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <ScrollStaggerItem>
            <div className="card w-full overflow-hidden p-6 sm:p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold text-black dark:text-white">
                Let's build something effective together.
              </h3>
              <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
                Reach out by email or send a quick message using the form. I'm available for freelance opportunities and project collaborations.
              </p>
              <div className="mt-8 space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded border border-neutral-200 bg-white p-4 transition-colors duration-200 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50 text-black dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">
                      <SocialIcon platform={link.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{link.label}</p>
                      <p className="truncate text-sm font-semibold text-black dark:text-white">{link.display}</p>
                    </div>
                    <svg
                      className="ml-auto h-4 w-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white"
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
            <ScrollStaggerItem>
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
