import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import devhubImage from "@/assets/devhub.png";
import campuscopilotImage from "@/assets/campus-copilot.jpg";
import { findCachedAnswer, rememberAnswer } from "@/lib/jarvis-cache";
import { addBreadcrumb, report } from "@/lib/error-reporter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Susanta Banik | AI/ML Engineer & Data Scientist",
    meta: [
      { property: "og:url", content: "https://susanta-banik.vercel.app/" },
      { name: "google-site-verification", content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE" },
      { name: "msvalidate.01", content: "CB17D87FD9ADFFBBC69CD726C50C8E99" },
      { name: "description", content: "Official portfolio of Susanta Banik: AI/ML Engineer, Data Scientist, Full Stack Developer, and Researcher at IIT Jodhpur and Techno College of Engineering Agartala." }
    ],
    links: [
      { rel: "canonical", href: "https://susanta-banik.vercel.app/" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            "@id": "#susanta-banik",
            name: "Susanta Banik",
            url: "https://susanta-banik.vercel.app/",
            description:
              "AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Dual-degree student pursuing B.S. in Applied AI & Data Science at IIT Jodhpur and B.Tech in AI & Data Science at Techno College of Engineering Agartala.",
            jobTitle: [
              "AI/ML Engineer",
              "Data Scientist",
              "Full Stack Developer",
              "Researcher",
            ],
            birthDate: "2006-10-20",
            knowsAbout: [
              "Artificial Intelligence",
              "Machine Learning",
              "Data Science",
              "Data Analytics",
              "Full Stack Development",
              "Python",
              "TensorFlow",
              "Web Development",
            ],
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "Indian Institute of Technology Jodhpur",
                url: "https://www.iitj.ac.in/",
              },
              {
                "@type": "CollegeOrUniversity",
                name: "Techno College of Engineering Agartala",
              },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Professional inquiries",
              url: "/#contact",
              availableLanguage: ["English", "Bengali", "Hindi"],
            },
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "AI / ML Solutions",
                  description:
                    "Custom ML models, LLM agents, RAG apps, forecasting and AI features inside existing products.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Full Stack Web Applications",
                  description:
                    "End-to-end websites and web apps — landing pages, dashboards, portals, e-commerce, internal tools.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Mobile-Ready PWA Development",
                  description:
                    "Responsive, installable PWAs and mobile-first builds that feel native on every device.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Data & Analytics",
                  description:
                    "Power BI dashboards, ETL pipelines and statistical reporting.",
                },
              },
            ],
            sameAs: [
              "https://www.linkedin.com/in/susanta-banik",
              "https://github.com/Susanta2006",
              "https://scholar.google.com/citations?user=CBZeE3wAAAAJ&hl=en",
              "https://x.com/SusantaBan21",
              "https://www.youtube.com/@CodeWithFun-life",
              "https://www.researchgate.net/profile/Susanta-Banik-4/research",
              "https://hackerrank.com/profile/susanta_company4/",
              "https://leetcode.com/u/Susanta_Banik/",
              "https://codewithfun-devhub.vercel.app/",
              "https://www.ijsr.net/getabstract.php?paperid=MR251206000138",
            ],
          },
        }),
      },
    ],
  }),
});

/* ---------------- Constants ---------------- */

const GITHUB_URL = "https://github.com/Susanta2006";
const RESEARCHGATE_URL =
  "https://www.researchgate.net/profile/Susanta-Banik-4/research";
const LINKEDIN_URL = "https://www.linkedin.com/in/susanta-banik";
const GOOGLE_SCHOLAR_URL ="https://scholar.google.com/citations?user=CBZeE3wAAAAJ&hl=en";
const TWITTER_URL = "https://x.com/SusantaBan21";
const YOUTUBE_URL = "https://www.youtube.com/@CodeWithFun-life";
const DEVHUB_URL = "https://codewithfun-devhub.vercel.app/";
const PAPER_URL =
  "https://www.ijsr.net/getabstract.php?paperid=MR251206000138";

/* ---------------- Data ---------------- */

const PROFILES = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "X / Twitter", href: TWITTER_URL },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Google Scholar", href: GOOGLE_SCHOLAR_URL },
  { label: "ResearchGate", href: RESEARCHGATE_URL },
  { label: "HackerRank", href: "https://hackerrank.com/profile/susanta_company4/" },
  { label: "LeetCode", href: "https://leetcode.com/u/Susanta_Banik/" },
];

const EDUCATION = [
  {
    school: "Indian Institute of Technology, Jodhpur",
    degree: "B.S. in Applied AI & Data Science",
    note: "Recognized as IIT Jodhpur Alumnus",
  },
  {
    school: "Techno College of Engineering, Agartala",
    degree: "B.Tech in AI & Data Science",
  },
];

const INTERNSHIPS = [
  { role: "AI Intern", org: "IIT KGP via Skill Ladders" },
  { role: "AI/ML Engineer Intern", org: "kayma AI Innovations" },
  { role: "Full Stack Web Developer Intern", org: "Unified Mentors Pvt. Ltd" },
  { role: "Machine Learning Intern", org: "Cognifyz Technologies" },
  { role: "Machine Learning Intern", org: "Saiket Systems" },
  { role: "Data Analyst Intern", org: "Aspire Interns" },
];

const SKILLS = [
  {
    group: "AI / ML",
    items: ["TensorFlow (LSTM)", "Deep Learning", "Model Evaluation", "Prompt Engineering", "RAG Apps", "LLM Agents", "Data Preprocessing", "Scikit-learn", "Keras", "OpenAI API"],
  },
  {
    group: "Data Science & Analytics",
    items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Statistical Modeling", "Tableau"],
  },
  {
    group: "Programming Languages",
    items: ["Python", "Java", "JavaScript", "PHP", "C", "C++"],
  },
  {
    group: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "React", "Tailwind", "REST APIs", "PWA Development",],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "GitHub", "Power BI", "Linux", "VS Code", "Jupyter Notebooks", "Google Colab", "AWS", "Heroku", "Cloud Deployment"],
  },
];

const WEB_PROJECTS = [
  "School DBMS",
  "Shopping Website",
  "Exam Portal",
  "House Listing Site",
  "Restaurant Management System",
  "Digital Panchayat",
  "Portfolio Website",
  "Student-Teacher Appointment System",
  "SOS System",
  "Custom Calculators",
  "Greetings Webpage",
];

const AIML_PROJECTS = [
  "Age Calculator",
  "Calculus Calculator",
  "Language Translator",
  "Language Detector",
  "Weather Detection Tool",
  "Image Compressor",
  "Quiz Game with LSTM",
  "Auto Text Typer",
  "Credit Card Fraud Detection",
  "Restaurant Rating Predictor",
  "Medical Data Analyzer",
  "Stock Market Predictor (TensorFlow LSTM)",
  "AI Jarvis — expressive, generative assistant",
];

const CERTS = [
  { name: "IBM — Hadoop", issuer: "IBM" },
  { name: "IBM — Spark", issuer: "IBM" },
  { name: "ISRO — Remote Sensing & AI", issuer: "ISRO" },
  { name: "Google Data Analytics", issuer: "Google / Coursera" },
  { name: "Machine Learning with Python", issuer: "IBM / Coursera" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI" },
  { name: "TensorFlow Developer Essentials", issuer: "Google" },
  { name: "SQL for Data Science", issuer: "UC Davis / Coursera" },
  { name: "Generative AI Fundamentals", issuer: "Microsoft" },
];

const SERVICES = [
  {
    title: "AI / ML Solutions",
    body:
      "Custom models, fine-tuning, LLM agents, forecasting pipelines, and AI features inside your existing product.",
    points: ["LLM & RAG apps", "Predictive models", "Computer vision", "Data pipelines"],
  },
  {
    title: "Full Stack Web Apps",
    body:
      "End-to-end websites and web apps — landing pages, dashboards, portals, e-commerce, internal tools.",
    points: ["React + Tailwind", "PHP / MySQL", "REST APIs", "Auth & dashboards"],
  },
  {
    title: "Mobile-Ready Apps",
    body:
      "Responsive, installable PWAs and mobile-first builds that feel native on every device.",
    points: ["PWA delivery", "Offline UX", "Push notifications", "App-store ready"],
  },
  {
    title: "Data & Analytics",
    body:
      "Power BI dashboards, ETL, statistical reports — turning raw data into decisions you can act on.",
    points: ["Power BI", "Pandas / NumPy", "Reporting", "Insight decks"],
  },
];

/* ---------------- Helpers ---------------- */

function calcAge(dob: string) {
  const d = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/Susanta2006/repos?per_page=100&sort=updated")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => {
        if (cancelled) return;
        const ranked = data
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
          )
          .slice(0, 6);
        setRepos(ranked);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);
  return { repos, error };
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const initial =
      stored ??
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}

/* ---------------- Page ---------------- */

function Index() {
  const age = useMemo(() => calcAge("2006-10-20"), []);
  const { repos, error } = useGithubRepos();
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero age={age} />
        <About />
        <Snapshot />
        <Services />
        <Education />
        <Experience />
        <Skills />
        <FeaturedProjects repos={repos} error={error} />
        <Archive />
        <Research />
        <Certifications />
        <DevHub />
        {/* Library section removed */}
        <CampusCopilot />
        <Profiles />
        <Contact />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule font-display text-lg leading-none " +
        className
      }
      aria-hidden
    >
      <span className="-mt-0.5">
        S<span className="text-primary">B</span>
      </span>
    </span>
  );
}

function Nav({ theme, toggle }: { theme: string; toggle: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 rule-bottom">
      <div className="container-prose flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 min-w-0">
          <Monogram />
          <span className="font-display text-base sm:text-lg truncate">Susanta Banik</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="link-underline hover:text-foreground transition-colors">About</a>
          <a href="#services" className="link-underline hover:text-foreground transition-colors">Services</a>
          <Link to="/projects" className="link-underline hover:text-foreground transition-colors">Projects</Link>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="link-underline hover:text-foreground transition-colors inline-flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={productsOpen}
            >
              Products <span className="text-xs">▾</span>
            </button>
            {productsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-rule bg-background shadow-lg p-2"
              >
                <a
                  href="#devhub"
                  onClick={() => setProductsOpen(false)}
                  className="block rounded-md px-3 py-2 hover:bg-subtle transition"
                >
                  <p className="font-display text-foreground">Code with Fun Dev Hub</p>
                  <p className="text-xs text-muted-foreground">Affordable online bookstore · Live</p>
                </a>
                <a
                  href="#campuscopilot"
                  onClick={() => setProductsOpen(false)}
                  className="block rounded-md px-3 py-2 hover:bg-subtle transition"
                >
                  <p className="font-display text-foreground">CampusCopilot AI</p>
                  <p className="text-xs text-muted-foreground">AI study companion · In development</p>
                </a>
              </div>
            )}
          </div>
          <Link to="/research" className="link-underline hover:text-foreground transition-colors">Research</Link>
          <a href="#contact" className="link-underline hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Hire me
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="text-xs eyebrow hover:text-foreground transition-colors"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule text-foreground"
          >
            <span aria-hidden>{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-rule bg-background">
          <nav className="container-prose py-4 flex flex-col gap-3 text-sm">
            <a href="#about" onClick={() => setMobileOpen(false)} className="py-1">About</a>
            <a href="#services" onClick={() => setMobileOpen(false)} className="py-1">Services</a>
            <Link to="/projects" onClick={() => setMobileOpen(false)} className="py-1">Projects</Link>
            <p className="eyebrow pt-2">Products</p>
            <a href="#devhub" onClick={() => setMobileOpen(false)} className="py-1 pl-2">Code with Fun Dev Hub</a>
            <a href="#campuscopilot" onClick={() => setMobileOpen(false)} className="py-1 pl-2">CampusCopilot AI</a>
            <Link to="/research" onClick={() => setMobileOpen(false)} className="py-1">Research</Link>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="py-1">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ age }: { age: number }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-130 w-275 rounded-full bg-primary/10 blur-3xl opacity-60"
      />
      <div className="container-prose pt-20 pb-24 md:pt-32 md:pb-32 fade-in relative">
        <p className="eyebrow mb-6">Official site · est. {new Date().getFullYear()}</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
          Susanta Banik.
          <br />
          <span className="text-muted-foreground italic">Building intelligence,</span>{" "}
          <span className="text-primary italic">thoughtfully.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher.
          Currently pursuing a dual degree across <strong className="text-foreground font-medium">IIT Jodhpur</strong> and{" "}
          <strong className="text-foreground font-medium">Techno College of Engineering, Agartala</strong> —
          turning real-world problems into shippable systems.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            View Projects on GitHub
            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
          <a
            href={RESEARCHGATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-rule px-5 py-2.5 text-sm font-medium hover:bg-secondary hover:border-primary/40 transition"
          >
            Read Research on ResearchGate
            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Get in touch →
          </a>
        </div>
        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
          {[
            ["Age", `${age}`],
            ["Degrees", "Dual"],
            ["Projects", "20+"],
            ["Certifications", "30+"],
          ].map(([k, v]) => (
            <div key={k}>
              <dd className="font-display text-3xl md:text-4xl">{v}</dd>
              <dt className="eyebrow mt-1">{k}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {PROFILES.slice(0, 4).map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-muted-foreground hover:text-foreground"
            >
              {p.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-rule" />
      </div>
      <h2 className="mt-4 font-display text-3xl md:text-5xl">{title}</h2>
      {kicker && <p className="mt-3 max-w-2xl text-muted-foreground">{kicker}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="rule-top">
      <div className="container-prose py-20 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="eyebrow">About</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            A builder, a student, a researcher.
          </h2>
        </div>
        <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            Hi, I'm Susanta Banik — an AI/ML Engineer, Data Scientist and Full
            Stack Developer pursuing a dual degree across IIT Jodhpur's Applied
            AI &amp; Data Science programme and a B.Tech in AI &amp; Data
            Science at Techno College of Engineering, Agartala. The two tracks
            have shaped how I think: one teaches me to reason deeply, the other
            to ship quickly.
          </p>
          <p>
            My work sits where machine learning meets real products. I move
            between TensorFlow notebooks, Python services, Power BI dashboards
            and full stack web applications — comfortable rebuilding the
            pipeline end-to-end when a problem deserves it. I've built more than
            twenty projects spanning fraud detection, time-series forecasting,
            language tools, conversational agents and complete web platforms.
          </p>
          <p>
            Alongside academic work I run{" "}
            <a
              className="link-underline text-primary"
              href={DEVHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code with Fun Dev Hub
            </a>{" "}
            — an affordable online bookstore for students and developers, with
            every book priced to be genuinely accessible. I also take on
            freelance work building apps, websites and AI tools for clients.
          </p>
        </div>
      </div>
    </section>
  );
}

function Snapshot() {
  const items = [
    ["Dual-degree", "IIT Jodhpur + Techno Agartala"],
    ["Internships", "4 completed"],
    ["Projects", "20+ shipped"],
    ["Certifications", "30+ earned"],
    ["Publication", "2 indexed paper"],
    ["Platforms", "GitHub · LeetCode · HackerRank · ResearchGate · Google Scholar"],
  ];
  return (
    <section className="rule-top bg-subtle/50">
      <div className="container-prose py-16 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
        {items.map(([k, v]) => (
          <div key={k}>
            <p className="eyebrow">{k}</p>
            <p className="mt-2 font-display text-xl md:text-2xl">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader
          eyebrow="Services"
          title="Hire me to build."
          kicker="Available for freelance and contract work — apps, websites, AI tools, dashboards. Reach out through the form below or the floating chat."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-xl border border-rule p-7 transition hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <span className="eyebrow text-primary opacity-0 group-hover:opacity-100 transition">
                  Available
                </span>
              </div>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Start a project →
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
          >
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader eyebrow="Education" title="Two institutions. One trajectory." />
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((e) => (
            <article
              key={e.school}
              className="rounded-lg border border-rule p-8 hover:border-primary/40 transition"
            >
              <p className="eyebrow">Degree</p>
              <h3 className="mt-3 font-display text-2xl">{e.degree}</h3>
              <p className="mt-4 text-muted-foreground">{e.school}</p>
              {e.note && <p className="mt-2 text-sm text-primary">{e.note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader
          eyebrow="Experience"
          title="Internships."
          kicker="Hands-on work across machine learning, data, and full stack engineering."
        />
        <ol className="divide-y divide-rule border-y border-rule">
          {INTERNSHIPS.map((i) => (
            <li
              key={i.role + i.org}
              className="grid md:grid-cols-12 gap-4 py-6 md:py-8 items-baseline hover:bg-subtle/40 transition px-2 -mx-2 rounded"
            >
              <p className="md:col-span-4 font-display text-xl">{i.role}</p>
              <p className="md:col-span-6 text-muted-foreground">{i.org}</p>
              <p className="md:col-span-2 eyebrow md:text-right">Intern</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader eyebrow="Skills" title="Tools of the craft." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((s) => (
            <div key={s.group} className="rounded-lg border border-rule p-6 hover:border-primary/40 transition">
              <p className="eyebrow">{s.group}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ repos, error }: { repos: Repo[] | null; error: boolean }) {
  return (
    <section id="projects" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader
          eyebrow="Featured"
          title="Live from GitHub."
          kicker="Pulled directly from github.com/Susanta2006, ranked by stars and recent activity."
        />
        {!repos && !error && (
          <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading featured GitHub repositories"
            className="grid md:grid-cols-2 gap-4 motion-reduce:**:animate-none"
          >
            <span className="sr-only">Loading featured GitHub repositories…</span>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="h-44 rounded-lg border border-rule bg-subtle relative overflow-hidden jarvis-shimmer"
              />
            ))}
          </div>
        )}
        {error && (
          <p className="text-muted-foreground">
            GitHub is rate-limited right now — visit{" "}
            <a
              className="link-underline text-primary"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Susanta2006
            </a>{" "}
            for the live list.
          </p>
        )}
        {repos && repos.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {repos.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-rule p-6 hover:border-primary/50 hover:bg-subtle/40 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl group-hover:text-primary transition">
                    {r.name}
                  </h3>
                  <span className="eyebrow shrink-0">★ {r.stargazers_count}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 min-h-12">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <span className="eyebrow">{r.language ?? "—"}</span>
                  <span className="text-muted-foreground group-hover:text-primary transition">View repo ↗</span>
                </div>
              </a>
            ))}
          </div>
        )}
        <p className="mt-8 text-sm text-muted-foreground">
          See everything on{" "}
          <a
            className="link-underline text-foreground"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section id="archive" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader
          eyebrow="Archive"
          title="The wider catalogue."
          kicker="A broader look at projects spanning web, AI/ML, and automation."
        />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow mb-4">Web Development</p>
            <ul className="space-y-2">
              {WEB_PROJECTS.map((p) => (
                <li key={p} className="border-b border-rule py-2 text-sm hover:text-primary transition">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">AI / ML &amp; Python</p>
            <ul className="space-y-2">
              {AIML_PROJECTS.map((p) => (
                <li key={p} className="border-b border-rule py-2 text-sm hover:text-primary transition">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader eyebrow="Research" title="Published work." />
        <article className="rounded-lg border border-rule p-8 md:p-12 hover:border-primary/40 transition">
          <p className="eyebrow">Paper · IJSR</p>
          <h3 className="mt-4 font-display text-2xl md:text-4xl leading-tight">
            Emergent Social Consciousness in a Minimalist Conversational Agent:
            A Case Study
          </h3>
          <dl className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="eyebrow">Paper ID</dt>
              <dd className="mt-1 font-mono">MR251206000138</dd>
            </div>
            <div>
              <dt className="eyebrow">Author</dt>
              <dd className="mt-1">Susanta Banik</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESEARCHGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Read on ResearchGate ↗
            </a>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm hover:bg-secondary transition"
            >
              View on IJSR ↗
            </a>
          </div>
        </article>
        <article className="rounded-lg border border-rule p-8 md:p-12 hover:border-primary/40 transition">
          <p className="eyebrow">Pre-print · ResearchGate</p>
          <h3 className="mt-4 font-display text-2xl md:text-4xl leading-tight">
            Jarvis-v9: A Continual-Learning Synthetic AGI Agent: with Emergent Social Intelligence
          </h3>
          <dl className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="eyebrow">Paper DOI</dt>
              <dd className="mt-1 font-mono">10.13140/RG.2.2.12547.05921</dd>
            </div>
            <div>
              <dt className="eyebrow">Author</dt>
              <dd className="mt-1">Susanta Banik</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESEARCHGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Read on ResearchGate ↗
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader
          eyebrow="Certifications"
          title="Verified credentials."
          kicker="A curated selection from 30+ certifications across AI, data, and cloud — full list on LinkedIn."
        />
        <ul className="grid md:grid-cols-3 gap-4">
          {CERTS.map((c) => (
            <li
              key={c.name}
              className="rounded-lg border border-rule p-6 hover:border-primary/40 transition"
            >
              <p className="eyebrow">{c.issuer}</p>
              <p className="mt-3 font-display text-xl">{c.name}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Full list:{" "}
          <a
            className="link-underline text-foreground"
            href={`${LINKEDIN_URL}/details/certifications/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn → Licenses & Certifications ↗
          </a>
        </p>
      </div>
    </section>
  );
}

function DevHub() {
  return (
    <section id="devhub" className="rule-top">
      <div className="container-prose py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="eyebrow">Products</p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">
            Code with Fun Dev Hub.
          </h2>
          <p className="mt-3 text-primary font-medium">
            An online bookstore with every book at a genuinely affordable price.
          </p>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Textbooks, technical books, reference titles, study material — all
            curated and priced so students and self-learners can actually afford
            to build a real library. Browse the storefront to see what's in
            stock today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DEVHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Browse the bookstore ↗
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="rounded-xl border border-rule p-8">
            <img
              src={devhubImage}
              alt="Code with Fun Dev Hub — curated coding resource centre for students and developers"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <p className="eyebrow">Status</p>
              <p className="mt-2 font-display text-2xl">Active</p>
              <hr className="my-6 border-rule" />
              <p className="eyebrow">Category</p>
              <p className="mt-2">AI Bookstore · Knowledge tools</p>
              <hr className="my-6 border-rule" />
              <p className="eyebrow">Stewardship</p>
              <p className="mt-2">Designed &amp; built by Susanta Banik</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function CampusCopilot() {
  return (
    <section id="campuscopilot" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader eyebrow="Upcoming" title="CampusCopilot AI." />
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              CampusCopilot is an upcoming AI-native educational platform built
              for the way students actually study — somewhere between a tutor, a
              study group, and a research assistant.
            </p>
            <p>
              The first release focuses on three problems: making dense
              coursework approachable, helping students prepare for assessments
              with real feedback, and turning scattered notes into navigable
              knowledge.
            </p>
            <p>It is currently in active development.</p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-xl border border-rule p-8">
              <img
              src={campuscopilotImage}
              alt="CampusCopilot AI — an upcoming AI-native educational platform built for the way students actually study"
              className="h-full w-full object-cover"
              loading="lazy"
              />
              <p className="eyebrow">Status</p>
              <p className="mt-2 font-display text-2xl">In development</p>
              <hr className="my-6 border-rule" />
              <p className="eyebrow">Category</p>
              <p className="mt-2">AI · EdTech · Knowledge tools</p>
              <hr className="my-6 border-rule" />
              <p className="eyebrow">Stewardship</p>
              <p className="mt-2">Designed &amp; built by Susanta Banik</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  const all = [
    ...PROFILES,
    { label: "Code with Fun Dev Hub", href: DEVHUB_URL },
    { label: "Publication (IJSR)", href: PAPER_URL },
  ];
  return (
    <section id="profiles" className="rule-top">
      <div className="container-prose py-20 md:py-28">
        <SectionHeader eyebrow="Verified" title="Profiles & presence." />
        <ul className="divide-y divide-rule border-y border-rule">
          {all.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="grid md:grid-cols-12 gap-4 py-5 items-baseline group"
              >
                <span className="md:col-span-3 eyebrow">{p.label}</span>
                <span className="md:col-span-8 text-muted-foreground group-hover:text-foreground transition truncate">
                  {p.href.replace(/^https?:\/\//, "")}
                </span>
                <span className="md:col-span-1 md:text-right text-muted-foreground group-hover:text-primary transition">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Contact form (server-relayed) ---------------- */

type SendState = "idle" | "sending" | "ok" | "error";

function useContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(form: HTMLFormElement) {
    setState("sending");
    setMessage("");

    const fd = new FormData(form);
    
    // 1. Honeypot check for automated spambots
    const websiteHoneypot = String(fd.get("website") ?? "").trim();
    if (websiteHoneypot.length > 0) {
      setState("ok");
      setMessage("Message sent! I'll reply to your email shortly.");
      form.reset();
      return;
    }

    // 2. Map Payload directly to the Web3Forms API structure
    const payload = {
      // ⚠️ Paste your real key string here. Do not leave the placeholder!
      access_key:"85b50799-228a-4d46-8dec-63c72ca82d95", 
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      subject: String(fd.get("subject") ?? "New Portfolio Message").trim(),
      message: String(fd.get("message") ?? "").trim(),
      replyto: String(fd.get("email") ?? "").trim(),
    };

    // 3. Client Side Input Field Validation
    if (!payload.name || payload.message.length < 5) {
      setState("error");
      setMessage("Please provide a valid name and a longer message (at least 5 characters).");
      return;
    }

    try {
      // 4. Secure Submission Directly to Web3Forms (Bypasses local /api paths)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setState("ok");
        setMessage("Message sent! I'll reply to your email shortly.");
        form.reset();
      } else {
        setState("error");
        setMessage(data.message || "Could not complete submission.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please check your internet connection.");
    }
  }

  return { state, message, submit };
}

function ContactForm({ compact = false }: { compact?: boolean }) {
  const { state, message, submit } = useContactForm();
  const mountedAt = useRef<number>(Date.now());

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Time-based spam check — humans take >2s to fill a form
    if (Date.now() - mountedAt.current < 2000) {
      return;
    }
    submit(e.currentTarget);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      {/* honeypot — bots fill this, humans don't */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Don't fill this in
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className={compact ? "space-y-3" : "grid sm:grid-cols-2 gap-3"}>
        <input
          required
          name="name"
          minLength={2}
          maxLength={120}
          autoComplete="name"
          placeholder="Your name"
          className="w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
        />
        <input
          required
          type="email"
          name="email"
          maxLength={254}
          autoComplete="email"
          placeholder="Your email"
          className="w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
        />
      </div>
      {!compact && (
        <input
          name="subject"
          maxLength={200}
          placeholder="Subject (optional)"
          className="w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
        />
      )}
      <textarea
        required
        name="message"
        minLength={5}
        maxLength={4000}
        rows={compact ? 4 : 6}
        placeholder={
          compact
            ? "Hi Susanta — I'd like to talk about…"
            : "Tell me about your project, idea or question…"
        }
        className="w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition resize-none"
      />
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        🔒 Your message is sent over HTTPS to a private server route and forwarded
        only to my personal inbox. Your email is used solely to reply — never
        stored, shared, or added to any list.
      </p>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          {state !== "sending" && <span>→</span>}
        </button>
        {message && (
          <p
            className={
              "text-xs " +
              (state === "ok"
                ? "text-primary"
                : state === "error"
                ? "text-destructive"
                : "text-muted-foreground")
            }
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="rule-top">
      <div className="container-prose py-20 md:py-32">
        <div className="text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">
            Let's build something{" "}
            <span className="italic text-primary">worth building.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-lg">
            Whether it's a freelance project, a research collaboration, a
            request for a book, or just hello — drop a message below and I'll
            reply personally.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 rounded-xl border border-rule p-6 md:p-8 bg-subtle/30">
            <p className="eyebrow">Send a message</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Goes straight to my private inbox. I usually reply within 24 hours.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <a
              href="tel:+918119098684"
              className="block rounded-lg border border-rule p-5 hover:border-primary/40 transition"
            >
              <p className="eyebrow">Phone</p>
              <p className="mt-2 font-mono text-sm">+91 81190 98684</p>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-rule p-5 hover:border-primary/40 transition"
            >
              <p className="eyebrow">LinkedIn</p>
              <p className="mt-2 font-mono text-sm">in/susanta-banik</p>
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-rule p-5 hover:border-primary/40 transition"
            >
              <p className="eyebrow">X / Twitter</p>
              <p className="mt-2 font-mono text-sm">@SusantaBan21</p>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-rule p-5 hover:border-primary/40 transition"
            >
              <p className="eyebrow">GitHub</p>
              <p className="mt-2 font-mono text-sm">github.com/Susanta2006</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Jarvis — floating AI assistant ---------------- */

type JarvisMsg = { role: "user" | "assistant"; content: string };

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const [messages, setMessages] = useState<JarvisMsg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Jarvis — Susanta's personal assistant. Ask me about his work, projects, services, or how to get in touch.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [messages, open, prefersReducedMotion]);

  /**
   * Try /api/chat with exponential backoff. Retries on network failure or
   * 5xx / 429. Returns the reply text, or throws after the last attempt.
   */
  async function callJarvisWithBackoff(payload: JarvisMsg[]): Promise<string> {
    const delays = [400, 1200, 2800]; // attempts: 1 + 3 retries
    let lastErr: unknown = null;
    for (let attempt = 0; attempt <= delays.length; attempt++) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 30_000);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ messages: payload }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          reply?: string;
          error?: string;
        };
        if (res.ok && data.ok && data.reply) return data.reply;
        // 4xx (except 429) → don't retry, surface upstream error message.
        if (res.status < 500 && res.status !== 429) {
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }
        lastErr = new Error(data.error ?? `Upstream ${res.status}`);
      } catch (err) {
        lastErr = err;
      } finally {
        window.clearTimeout(timeoutId);
      }
      if (attempt < delays.length) {
        const jitter = Math.floor(Math.random() * 200);
        await new Promise((r) => setTimeout(r, delays[attempt] + jitter));
      }
    }
    throw lastErr ?? new Error("Jarvis unavailable");
  }

  async function runSend(text: string, history: JarvisMsg[]) {
    setSending(true);
    setLastFailed(null);
    addBreadcrumb({ kind: "custom", message: "jarvis:send" });
    try {
      const reply = await callJarvisWithBackoff(history);
      rememberAnswer(text, reply);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      report(err, "jarvis:chat");
      const cached = findCachedAnswer(text);
      if (cached) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `${cached.a}\n\n— Saved answer (Jarvis is offline right now).`,
          },
        ]);
      } else {
        setLastFailed(text);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Jarvis can't reach its brain right now. You can retry below, or use the contact form to message Susanta directly.",
          },
        ]);
      }
    } finally {
      setSending(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    const next: JarvisMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    await runSend(text, next);
  }

  async function retryLast() {
    if (!lastFailed || sending) return;
    // Re-run with the existing conversation; the failed user turn is still
    // in `messages` from the original send().
    await runSend(lastFailed, messages);
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close Jarvis" : "Chat with Jarvis"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:opacity-90 transition"
      >
        {open ? (
          <>
            <span>Close</span>
            <span>✕</span>
          </>
        ) : (
          <>
            <span aria-hidden>🤖</span>
            <span>Chat with Jarvis</span>
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Jarvis"
          className="fixed bottom-24 right-3 left-3 sm:left-auto sm:right-5 z-50 sm:w-100 max-w-[calc(100vw-1.5rem)] rounded-xl border border-rule bg-background shadow-2xl flex flex-col overflow-hidden fade-in"
          style={{ maxHeight: "min(70vh, 560px)" }}
        >
          <div className="flex items-start justify-between gap-3 p-4 border-b border-rule">
            <div>
              <p className="eyebrow">AI assistant</p>
              <p className="mt-1 font-display text-lg">Jarvis</p>
              <p className="text-[11px] text-muted-foreground">Susanta Banik's personal AI</p>
            </div>
            <Monogram />
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 text-sm"
            aria-busy={sending}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                    : "mr-auto max-w-[90%] rounded-lg border border-rule bg-subtle/40 px-3 py-2 text-foreground"
                }
              >
                <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
              </div>
            ))}
            {sending && (
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                aria-label="Jarvis is thinking. Please wait."
                className="mr-auto max-w-[90%] rounded-lg border border-rule bg-subtle/40 px-3 py-2.5 space-y-2 overflow-hidden relative motion-reduce:[&_.jarvis-shimmer]:after:hidden motion-reduce:[&_.animate-bounce]:animate-none"
              >
                <span className="sr-only">Jarvis is thinking. This usually takes a few seconds.</span>
                <div className="space-y-1.5" aria-hidden="true">
                  <div className="h-2 w-40 rounded bg-muted-foreground/25 jarvis-shimmer" />
                  <div className="h-2 w-56 rounded bg-muted-foreground/20 jarvis-shimmer" />
                  <div className="h-2 w-32 rounded bg-muted-foreground/20 jarvis-shimmer" />
                </div>
                <div className="flex items-center gap-1.5 pt-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                  <p className="text-[10px] text-muted-foreground ml-1">Jarvis is thinking…</p>
                </div>
              </div>
            )}
            {!sending && lastFailed && (
              <div
                role="alert"
                className="mr-auto max-w-[90%] rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2.5"
              >
                <p className="font-medium text-foreground">Jarvis couldn't reach its brain</p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  All retries failed. You can try again or use the contact form below.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={retryLast}
                    className="rounded-full bg-primary px-3 py-1 text-[12px] font-medium text-primary-foreground hover:opacity-90"
                  >
                    Try again
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-input bg-background px-3 py-1 text-[12px] font-medium text-foreground hover:bg-accent"
                  >
                    Open contact form
                  </a>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-rule p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask Jarvis…"
              className="flex-1 rounded-md border border-rule bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              Send
            </button>
          </form>
          <p className="px-3 pb-3 text-[10px] text-muted-foreground">
            Jarvis is an AI assistant and may make mistakes. It will never share Susanta's private
            information — for hiring or sensitive matters, please use the contact form.
          </p>
        </div>
      )}
    </>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="rule-top">
      <div className="container-prose py-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <Monogram />
            <div>
              <p className="font-display text-lg leading-tight">Susanta Banik</p>
              <p className="text-xs text-muted-foreground">
                AI/ML Engineer · Data Scientist · Researcher · Freelance Developer
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {PROFILES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="link-underline hover:text-foreground"
              >
                {p.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-4 items-start md:items-center justify-between border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground">
            Copyright © {year} Susanta Banik. All rights reserved. The name,
            content, code samples and original works on this site are the
            intellectual property of Susanta Banik unless otherwise credited.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link to="/terms" className="link-underline hover:text-foreground">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="link-underline hover:text-foreground">
              Privacy Policy
            </Link>
            <a href="#contact" className="link-underline hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
