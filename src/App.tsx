import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import SectionHeader from './components/SectionHeader';
import ProjectCard from './components/ProjectCard';
import CertificationCard from './components/CertificationCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import profilePic from './assets/images/profile.png';
import gcashDashboard from './assets/images/gcashposdashboard.png';
import gcashSales from './assets/images/gcashposdailysales.png';
import gcashMonthlySales from './assets/images/gcashposmonthlysales.png';
import gcashCustomer from './assets/images/customertransactions.png';
import southdevImg from './assets/southdev.png';
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
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
          'A scalable management system designed for inventory control, sales workflows, and streamlined customer service.',
        tech: ['PHP', 'SQL', 'JavaScript', 'CSS', 'HTML', 'JSON'],
        liveUrl: 'https://southdev-home-depot.infinityfreeapp.com/',
        image: southdevImg,
      },
      {
        title: 'GCash POS Transaction Record (Electron Based)',
        description:
          'A desktop POS application built with Electron for recording and managing GCash transactions, providing a fast and offline-capable transaction logging experience.',
        tech: ['Electron', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'SQL', 'JSON'],
        image: gcashDashboard,
        images: [gcashDashboard, gcashSales, gcashMonthlySales, gcashCustomer],
      },
    ],
    [],
  );

  const certifications = useMemo(
    () => [
      {
        title: 'CCNAv7 Introduction to Networks',
        issuer: 'Cisco',
        pdfUrl: certCCNA,
        description: 'Covers fundamental networking concepts including IP addressing, routing protocols, network access, and troubleshooting in modern network environments.',
      },
      {
        title: 'DevNet Associate',
        issuer: 'Cisco',
        pdfUrl: certDevNet,
        description: 'Validates skills in software development and design using Cisco platforms, APIs, automation, and infrastructure programmability.',
      },
      {
        title: 'Getting Started with Cisco Packet Tracer',
        issuer: 'Cisco',
        pdfUrl: certPacketTracer,
        description: 'Demonstrates proficiency in using Cisco Packet Tracer to simulate, visualize, and troubleshoot network topologies and configurations.',
      },
      {
        title: 'Network Security',
        issuer: 'Cisco',
        pdfUrl: certNetSec,
        description: 'Covers core network security concepts including firewalls, VPNs, access control, threat mitigation, and secure network infrastructure design.',
      },
      {
        title: 'Programming Essentials in C++',
        issuer: 'Cisco / NetAcad',
        pdfUrl: certCPA,
        description: 'Establishes foundational knowledge of C++ programming including syntax, data types, control flow, functions, and object-oriented principles.',
      },
      {
        title: 'Advanced Programming in C++',
        issuer: 'Cisco / NetAcad',
        pdfUrl: certCPP,
        description: 'Covers advanced C++ topics such as templates, STL, memory management, polymorphism, and design patterns for building robust software systems.',
      },
    ],
    [],
  );

  const experiences = useMemo(
    () => ['Software Developer', 'Advanced Programming in C++', 'AI Machine Learning'], [],
  );

  function getSkillIcon(label: string) {
    const normalize = (s: string) => {
      let t = s.toLowerCase();
      // normalize common language tokens
      t = t.replace(/c\+\+/g, 'cpp');
      t = t.replace(/c#/g, 'csharp');
      // remove ampersands and other punctuation so filenames with & match
      t = t.replace(/&/g, '');
      // remove any remaining non-alphanumeric
      return t.replace(/[^a-z0-9]/g, '');
    };

    const map: Record<string, string> = {
      html: iconHtml,
      css: iconCss,
      javascript: iconJs,
      react: iconReact,
      typescript: iconTs,
      nodejs: iconNode,
      php: iconPhp,
      restapidesign: iconRest,
      authenticationauthorization: iconAuth,
      databasedesignorm: iconDbDesign,
      deploymentmonitoring: iconDeploy,
      advancedcpp: iconCpp,
      algorithmsdatastructures: iconAlgo,
      databasessql: iconDbSql,
      debuggingprofiling: iconDebug,
      databasemanagement: iconDatabaseManagement,
      sdlc: iconSDLC,
      systemdesign: iconSystemDesign,
    };

    const key = normalize(label);
    const src = map[key];
    if (!src) {
      // fallback: show a small generic SVG and warn in console to help debugging
      // eslint-disable-next-line no-console
      console.warn(`[getSkillIcon] icon not found for key=", key, "label=", label`);
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth={1.5} />
          <path d="M8 12h8" stroke="#CBD5E1" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      );
    }

    return <img src={src} alt={label} className="h-4 w-4 object-contain" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-blue-600 transition-all duration-200" style={{ width: `${scrollProgress}%` }} />
      </div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ duration: 0.7 }}
            className="grid gap-10 lg:grid-cols-[320px_1fr]"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-72 w-64 overflow-hidden rounded-3xl border-4 border-slate-200 shadow-lg dark:border-slate-700">
                <img 
                    src={profilePic} 
                    alt="Mark Andrey Perez" 
                    className="h-full w-full object-cover" 
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent dark:from-slate-950/20" />
              </div>
              <div className="mt-6 hidden text-center lg:block">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Profile</p>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Hello I'm
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Mark Andrey Perez
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-700 dark:text-slate-300">
                AI | Software Developer
              </p>
              <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                Aspiring Full-Stack Software Developer building scalable and user-friendly applications.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.1 }}
          id="about"
        >
          <SectionHeader number="01" title="About" />
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="space-y-5 text-slate-700 dark:text-slate-300">
              <p>
                I aspire to become a Full-Stack Software Developer possessing a solid background in front-end as well as back-end software development. My background is building user-friendly and dynamic web applications with modern web technologies like HTML, CSS, JavaScript, PHP, React, Advance C++, TypeScript.js, and frameworks as well as server-side applications and database management. My projects have involved coming up with systems such as the management of inventory systems, hotel booking systems and mobile phone applications where my knowledge in software development principles, system design as well as problem solving skills came in.
              </p>
              <p>
                I love to build effective, scalable and responsive applications that enhance customer experience and help in streamlining business operations. I constantly improve my tech skills by researching on new tools, frameworks and best practices in software development. Having a good knowledge of the Software Development Life Cycle (SDLC) I can work on the projects related to planning and design up to implementation and maintenance.
              </p>
              <p>
                I also can be characterized as a detail oriented, flexible and dedicated learner and this enables me to cope up with the challenges and play a part in teamwork based or individual development projects. I would like to develop professionally and create new innovative solutions that will have a significant impact.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.15 }}
          id="skills"
        >
          <SectionHeader number="02" title="Skills" />
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {['Frontend', 'Backend', 'Programming', 'Other'].map((group) => (
              <div key={group} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
                <h3 className="mb-5 text-lg font-semibold text-slate-950 dark:text-white">{group}</h3>
                <div className="space-y-4">
                  {skills.filter((skill) => skill.category === group).map((skill) => (
                    <div key={skill.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          {getSkillIcon(skill.label)}
                          <span>{skill.label}</span>
                        </div>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.2 }}
          id="projects"
        >
          <SectionHeader number="03" title="Projects" />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.25 }}
          id="certifications"
        >
          <SectionHeader number="04" title="Certifications" />
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <CertificationCard key={cert.title} title={cert.title} issuer={cert.issuer} pdfUrl={cert.pdfUrl} description={cert.description} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.3 }}
          id="experience"
        >
          <SectionHeader number="05" title="Experience" />
          <div className="grid gap-4 sm:grid-cols-3">
            {experiences.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
              >
                <h3 className="text-lg font-semibold">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Practical experience and coursework demonstrating a strong foundation in software development,
                  advanced programming, and AI technologies.
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 0.7, delay: 0.35 }}
          id="contact"
        >
          <SectionHeader number="06" title="Contact" />
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Let's build something effective together.</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Reach out by email or send a quick message using the form. I am available for freelance opportunities and project collaborations.
              </p>
              <div className="mt-8 space-y-2">
                <div className="group flex items-start gap-3 rounded-lg border border-transparent bg-slate-50 p-3 transition-all hover:border-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900/30">
                    <img src={emailIcon} alt="Email" className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">markandreyperez@gmail.com</p>
                  </div>
                </div>
                <a href="https://github.com/kumaru06" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-lg border border-transparent bg-slate-50 p-3 transition-all hover:border-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-900/5 transition-all group-hover:bg-slate-900/10 dark:bg-slate-400/10 dark:group-hover:bg-slate-400/20">
                    <img src={githubIcon} alt="GitHub" className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">GitHub</p>
                    <p className="text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Kuramu Doreyan
                    </p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/mark-perez-5a5346404/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-lg border border-transparent bg-slate-50 p-3 transition-all hover:border-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 transition-all group-hover:bg-blue-100 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                    <img src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">LinkedIn</p>
                    <p className="text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Mark Perez
                    </p>
                  </div>
                </a>
                <a href="https://web.facebook.com/errantknight01/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-lg border border-transparent bg-slate-50 p-3 transition-all hover:border-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 transition-all group-hover:bg-blue-100 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                   <img src={facebookIcon} alt="Facebook" className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Facebook</p>
                    <p className="text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Setsuna Kram
                    </p>
                  </div>
                </a>
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
