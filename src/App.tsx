import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import SectionHeader from './components/SectionHeader';
import ProjectsShowcase from './components/ProjectsShowcase';
import CertificationCard from './components/CertificationCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import SkillBar from './components/SkillBar';
import profilePic from './assets/images/profile.png';
import verifiedLogo from './assets/images/verifiedlogo/verified.jpeg';
import resumePdf from './assets/images/resume/Perez-resume.pdf';
import gcashDashboard from './assets/images/gcashposdashboard.png';
import gcashSales from './assets/images/gcashposdailysales.png';
import gcashMonthlySales from './assets/images/gcashposmonthlysales.png';
import gcashCustomer from './assets/images/customertransactions.png';
import southdevImg from './assets/southdev.png';
import amaOjtImg from './assets/ama-ojtportal.png';
import certCCNA from './assets/images/certificationspdf/CCNAv7 Introduction to Networks.pdf';
import certDevNet from './assets/images/certificationspdf/DevNet Associate.pdf';
import certPacketTracer from './assets/images/certificationspdf/Getting Started with Cisco Packet Tracer.pdf';
import certNetSec from './assets/images/certificationspdf/Network Security.pdf';
import certCPA from './assets/images/certificationspdf/Partner CPA - Programming Essentials in C++.pdf';
import certCPP from './assets/images/certificationspdf/Partner CPP - Advanced Programming in C++.pdf';
import emailIcon from './assets/images/logo/email.png';
import facebookIcon from './assets/images/logo/facebook.png';
import githubIcon from './assets/images/logo/github.png';
import linkedinIcon from './assets/images/logo/linkedin.png';
import iconHtml from './assets/images/programminglogo/front-end/HTML.png';
import iconCss from './assets/images/programminglogo/front-end/CSS.png';
import iconJs from './assets/images/programminglogo/front-end/JavaScript.png';
import iconReact from './assets/images/programminglogo/front-end/React.png';
import iconTs from './assets/images/programminglogo/front-end/TypeScript.png';
import iconNode from './assets/images/programminglogo/back-end/Node.js.png';
import iconPhp from './assets/images/programminglogo/back-end/PHP.png';
import iconRest from './assets/images/programminglogo/back-end/REST API Design.png';
import iconAuth from './assets/images/programminglogo/back-end/Authentication & Authorization.png';
import iconDbDesign from './assets/images/programminglogo/back-end/Database Design & ORM.png';
import iconDeploy from './assets/images/programminglogo/back-end/Deployment & Monitoring.png';
import iconCpp from './assets/images/programminglogo/programming/Advanced C++.png';
import iconAlgo from './assets/images/programminglogo/programming/Algorithms & Data Structures.png';
import iconDbSql from './assets/images/programminglogo/programming/Databases & SQL.png';
import iconDebug from './assets/images/programminglogo/programming/Debugging & Profiling.png';
import iconDatabaseManagement from './assets/images/programminglogo/other/Database Management.png';
import iconSDLC from './assets/images/programminglogo/other/SDLC.png';
import iconSystemDesign from './assets/images/programminglogo/other/SystemDesign.png';

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const skillGroupColors: Record<string, string> = {
  Frontend: 'from-brand-500/20 to-blue-400/10',
  Backend: 'from-accent-500/20 to-violet-400/10',
  Programming: 'from-pink-500/20 to-rose-400/10',
  Other: 'from-emerald-500/20 to-teal-400/10',
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
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
        title: 'GCash POS Transaction Record (Electron Based)',
        description:
          'A desktop POS application built with Electron for recording and managing GCash transactions—with dashboards for daily and monthly sales, customer records, and offline-capable logging for fast and reliable transaction tracking.',
        tech: ['Electron', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'SQL', 'JSON'],
        image: gcashDashboard,
        images: [gcashDashboard, gcashSales, gcashMonthlySales, gcashCustomer],
        type: 'Desktop Application',
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
        <svg className="h-4 w-4 text-brand-500" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
          <path d="M8 12h8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      );
    }
    return <img src={src} alt={label} className="h-4 w-4 object-contain" />;
  }

  const socialLinks = [
    { href: 'mailto:markandreyperez@gmail.com', icon: emailIcon, label: 'Email', display: 'markandreyperez@gmail.com', external: false },
    { href: 'https://github.com/kumaru06', icon: githubIcon, label: 'GitHub', display: 'Kuramu Doreyan', external: true },
    { href: 'https://www.linkedin.com/in/mark-perez-5a5346404/', icon: linkedinIcon, label: 'LinkedIn', display: 'Mark Perez', external: true },
    { href: 'https://web.facebook.com/errantknight01/', icon: facebookIcon, label: 'Facebook', display: 'Setsuna Kram', external: true },
  ];

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans text-slate-950 dark:text-slate-100">
      <BackgroundEffects />

      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-slate-200/50 dark:bg-slate-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 via-accent-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="relative mx-auto w-full max-w-6xl overflow-x-hidden px-3 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        {/* ── HERO ── */}
        <section className="relative">
          <motion.div
            className="glass-card gradient-border overflow-x-hidden overflow-y-visible p-5 sm:p-8 md:p-12 lg:p-14"
            initial="hidden"
            animate="visible"
            variants={heroStagger}
          >
            <div className="absolute inset-0 bg-hero-gradient opacity-60" />

            <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
              {/* Profile */}
              <motion.div variants={heroItem} className="flex w-full max-w-full flex-col items-center overflow-x-hidden overflow-y-visible lg:items-center">
                <div className="relative animate-float pt-3">
                  <div className="relative h-56 w-48 overflow-hidden rounded shadow-[0_20px_50px_-12px_rgba(51,150,255,0.35)] ring-2 ring-white/20 dark:ring-white/10 sm:h-64 sm:w-56 md:h-72 md:w-60">
                    <img
                      src={profilePic}
                      alt="Mark Andrey Perez"
                      className="h-full w-full rounded object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded bg-gradient-to-t from-slate-950/30 to-transparent" />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Available for work</span>
                </div>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Mark-Andrey-Perez-Resume.pdf"
                  className="mt-4 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded border border-slate-200/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-600 hover:shadow-glow active:scale-[0.98] dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:text-brand-400 sm:max-w-none"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </motion.div>

              {/* Intro */}
              <div className="flex min-w-0 flex-col justify-center overflow-hidden text-center sm:text-left">
                <motion.p variants={heroItem} className="section-label mb-3 sm:mb-4">
                  Hello, I'm
                </motion.p>
                <motion.h1
                  variants={heroItem}
                  className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="block sm:inline">Mark Andrey</span>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 whitespace-nowrap sm:mt-0 sm:gap-2 sm:pl-2 md:gap-2.5">
                    <span className="text-gradient leading-none">Perez</span>
                    <img
                      src={verifiedLogo}
                      alt="Verified"
                      className="h-[0.5em] w-[0.5em] min-h-[18px] min-w-[18px] max-h-6 max-w-6 shrink-0 translate-y-[0.05em] object-contain sm:max-h-7 sm:max-w-7 sm:translate-y-[0.06em] lg:max-h-8 lg:max-w-8"
                    />
                  </span>
                </motion.h1>
                <motion.p
                  variants={heroItem}
                  className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-300 sm:mt-4 sm:text-xl md:text-2xl"
                >
                  <span className="block sm:inline">AI-Augmented</span>{' '}
                  <span className="hidden text-slate-400 sm:inline dark:text-slate-500">|</span>{' '}
                  <span className="block sm:inline">Full-stack Developer</span>
                </motion.p>
                <motion.p
                  variants={heroItem}
                  className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:mx-0 sm:mt-6 sm:text-base sm:leading-8"
                >
                  Aspiring Full-Stack AI-Augmented Developer building scalable, intelligent, and user-friendly applications that make a real impact.
                </motion.p>

                <motion.div variants={heroItem} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <a href="#projects" className="btn-primary w-full justify-center sm:w-auto">
                    View Projects
                  </a>
                  <a href="#contact" className="btn-secondary w-full justify-center text-slate-800 dark:text-slate-100 sm:w-auto">
                    Contact Me
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div variants={heroItem} className="mt-8 grid grid-cols-3 gap-2 border-t border-slate-200/60 pt-6 sm:mt-10 sm:gap-4 sm:pt-8 dark:border-white/8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="min-w-0">
                      <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">{stat.value}</p>
                      <p className="mt-0.5 text-[10px] font-medium uppercase leading-tight tracking-wide text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs sm:tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="about"
        >
          <SectionHeader
            number="01"
            title="About Me"
            subtitle="Passionate about building intelligent software that solves real problems."
          />
          <div className="glass-card w-full overflow-hidden p-6 sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="space-y-5 text-justify leading-8 text-slate-600 dark:text-slate-400">
                <p>
                  I aspire to become an AI-Augmented Full-Stack Software Developer, combining strong foundations in both front-end and back-end development with the power of modern artificial intelligence tools and workflows. I specialize in building user-friendly, dynamic, and scalable web applications using technologies such as HTML, CSS, JavaScript, PHP, React, TypeScript, and C++.
                </p>
                <p>
                  My experience includes developing systems like inventory management platforms, hotel booking systems, and mobile applications, where I applied software engineering principles, system design, and problem-solving skills to deliver efficient and reliable solutions.
                </p>
                <p>
                  Detail-oriented, adaptable, and driven to learn, I thrive in both collaborative and independent environments. My goal is to grow professionally while building intelligent, impactful solutions that push the boundaries of modern software development.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {['React & TypeScript', 'PHP & Node.js', 'AI-Augmented Dev', 'System Design'].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-3 rounded border border-slate-200/60 bg-white/50 px-4 py-3 dark:border-white/8 dark:bg-slate-800/40"
                  >
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── SKILLS ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="skills"
        >
          <SectionHeader
            number="02"
            title="Skills & Expertise"
            subtitle="Technologies and competencies I've honed through projects and certifications."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {['Frontend', 'Backend', 'Programming', 'Other'].map((group, gi) => (
              <motion.div
                key={group}
                className="glass-card overflow-hidden p-6 sm:p-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
              >
                <div className={`mb-6 inline-flex items-center gap-2 rounded bg-gradient-to-r ${skillGroupColors[group]} px-4 py-1.5`}>
                  <span className="font-display text-sm font-bold text-slate-800 dark:text-white">{group}</span>
                </div>
                <div className="space-y-5">
                  {skills
                    .filter((skill) => skill.category === group)
                    .map((skill, si) => (
                      <SkillBar
                        key={skill.label}
                        label={skill.label}
                        level={skill.level}
                        icon={getSkillIcon(skill.label)}
                        delay={si * 0.05}
                      />
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── PROJECTS ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="projects"
        >
          <SectionHeader
            number="03"
            title="Featured Projects"
            subtitle="Real-world applications I've designed and built from the ground up."
          />
          <ProjectsShowcase projects={projects} />
        </motion.section>

        {/* ── CERTIFICATIONS ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="certifications"
        >
          <SectionHeader
            number="04"
            title="Certifications"
            subtitle="Industry-recognized credentials from Cisco and NetAcad."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <CertificationCard key={cert.title} {...cert} />
            ))}
          </div>
        </motion.section>

        {/* ── EXPERIENCE ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="experience"
        >
          <SectionHeader
            number="05"
            title="Experience"
            subtitle="Areas of focus and professional growth."
          />
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-500 via-accent-500 to-transparent sm:block" />
            <div className="space-y-6">
              {experiences.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="relative sm:pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="absolute left-4 top-6 hidden h-4 w-4 rounded-full border-2 border-brand-500 bg-white shadow-glow sm:block dark:bg-slate-950" />
                  <div className="glass-card w-full overflow-hidden p-6 sm:p-7">
                    <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-justify text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CONTACT ── */}
        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          id="contact"
        >
          <SectionHeader
            number="06"
            title="Get In Touch"
            subtitle="Have a project in mind? Let's talk."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="glass-card w-full overflow-hidden p-6 sm:p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                Let's build something{' '}
                <span className="text-gradient">effective</span> together.
              </h3>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                Reach out by email or send a quick message using the form. I'm available for freelance opportunities and project collaborations.
              </p>
              <div className="mt-8 space-y-3">
                {socialLinks.map((link) => {
                  const Tag = link.external ? 'a' : 'a';
                  return (
                    <Tag
                      key={link.label}
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 rounded border border-slate-200/60 bg-white/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:shadow-glow dark:border-white/8 dark:bg-slate-800/40 dark:hover:border-brand-500/30"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br from-brand-500/15 to-accent-500/15 ring-1 ring-brand-500/20 transition group-hover:from-brand-500/25 group-hover:to-accent-500/25">
                        <img src={link.icon} alt={link.label} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          {link.label}
                        </p>
                        <p className="text-sm font-semibold text-brand-600 transition group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300">
                          {link.display}
                        </p>
                      </div>
                      <svg
                        className="ml-auto h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Tag>
                  );
                })}
              </div>
            </div>
            <ContactForm />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
