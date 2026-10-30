import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  BookOpen,
} from "lucide-react";
import {
  BUSINESS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILES,
  SERVICES,
  SITE,
  SKILLS,
} from "../data/site.ts";
import { PROJECTS, STATUS_LABEL, featuredProjects } from "../data/projects.ts";
import { PUBLICATIONS } from "../data/research.ts";
import { ContactForm } from "./ContactForm.tsx";
import { ProjectCarousel } from "./ProjectCarousel.tsx";
import { Reveal } from "./Reveal.tsx";

function Heading({
  title,
  lead,
  id,
}: {
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="text-3xl md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-3 text-lg text-muted">{lead}</p>}
    </div>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Hero() {
  const links = PROFILES.filter((p) => p.hero);
  const Icon = (id: string) =>
    id === "github" ? Github : id === "linkedin" ? Linkedin : BookOpen;
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-bg relative overflow-hidden"
    >
      <div className="wrap grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="text-lg font-semibold text-muted">{SITE.name}</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Roles">
            {SITE.roles.map((r) => (
              <li key={r} className="chip">
                {r}
              </li>
            ))}
          </ul>
          <h1 id="hero-title" className="mt-6 text-5xl sm:text-6xl lg:text-7xl">
            Building Intelligence,{" "}
            <span className="text-accent">thoughtfully.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{SITE.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" hash="projects" className="btn btn-primary">
              Explore projects <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link to="/" hash="about" className="btn btn-ghost">
              More about my work
            </Link>
          </div>
          <ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Professional profiles"
          >
            {links.map((p) => {
              const I = Icon(p.id);
              return (
                <li key={p.id}>
                  <a
                    href={p.href}
                    {...ext}
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-muted hover:text-fg"
                  >
                    <I aria-hidden className="h-4 w-4" /> {p.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem]">
          <div className="portrait-glow" aria-hidden />
          <picture>
            <source
              type="image/avif"
              srcSet="/images/portrait-480.avif 480w, /images/portrait-800.avif 800w, /images/portrait-1100.avif 1100w"
              sizes="(min-width:1024px) 26rem, 80vw"
            />
            <source
              type="image/webp"
              srcSet="/images/portrait-480.webp 480w, /images/portrait-800.webp 800w, /images/portrait-1100.webp 1100w"
              sizes="(min-width:1024px) 26rem, 80vw"
            />
            <img
              src="/images/portrait-800.jpg"
              srcSet="/images/portrait-480.jpg 480w, /images/portrait-800.jpg 800w, /images/portrait-1100.jpg 1100w"
              sizes="(min-width:1024px) 26rem, 80vw"
              width={800}
              height={847}
              alt="Portrait of Susanta Banik"
              fetchPriority="high"
              decoding="async"
              className="relative aspect-square w-full rounded-full border-4 border-accent/70 object-cover object-top"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

function MoreOnGithub() {
  const gh = PROFILES.find((p) => p.id === "github")!;
  return (
    <div className="card flex h-full flex-col justify-between gap-8 p-6">
      <div>
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"
        >
          <Github className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl">More on GitHub</h3>
        <p className="mt-2 text-[.95rem] text-muted">
          Machine learning, computer vision, automation and Power BI projects.
          The full list of public repositories lives on GitHub.
        </p>
      </div>
      <a href={gh.href} {...ext} className="btn btn-primary self-start">
        Open GitHub <ArrowUpRight aria-hidden className="h-4 w-4" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

export function ProjectsSection() {
  const inProgress = PROJECTS.filter((p) => !p.featured && p.id !== "fsmn");
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section border-t border-line"
    >
      <div className="wrap">
        <Reveal>
          <Heading
            id="projects-title"
            title="Selected projects"
            lead="Live products and public repositories you can open today."
          />
        </Reveal>
        <Reveal>
          <ProjectCarousel
            projects={featuredProjects()}
            trailing={<MoreOnGithub />}
          />
        </Reveal>
        <Reveal className="mt-6 rounded-2xl border border-dashed border-line p-5">
          <p className="text-sm font-semibold">Research and work in progress</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {inProgress.map((p) => (
              <li key={p.id}>
                <Link
                  to="/projects"
                  hash={p.id}
                  className="chip hover:border-accent hover:text-fg"
                >
                  {p.name}{" "}
                  <span className="font-normal opacity-80">
                    · {STATUS_LABEL[p.status]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-4">
          <Link
            to="/projects"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline"
          >
            All projects with status and links{" "}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="section border-t border-line bg-surface/50"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-semibold text-accent">
            {SITE.founderTitle}
          </p>
          <h2 id="founder-title" className="mt-2 text-3xl md:text-4xl">
            {BUSINESS.name}
          </h2>
          <p className="mt-5 text-lg text-muted">{BUSINESS.legalDescription}</p>
          <p className="mt-4 text-muted">
            The work centres on practical software engineering: AI/ML solutions,
            LLM applications, web development and digital products — built to
            solve a real problem and to be maintainable afterwards.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <MapPin aria-hidden className="h-4 w-4" /> {BUSINESS.location}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" hash="contact" className="btn btn-primary">
              Start a conversation
            </Link>
            <a href={BUSINESS.linkedin} {...ext} className="btn btn-ghost">
              Company on LinkedIn{" "}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <div className="grid gap-8">
          <Reveal delay={60}>
            <h3 className="mb-4 text-xl">How I work</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {BUSINESS.principles.map((p) => (
                <li key={p.title} className="panel p-5">
                  <p className="font-bold">{p.title}</p>
                  <p className="mt-1.5 text-[.95rem] text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="mb-4 text-xl">What I can build</h3>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {SERVICES.map((s) => (
                <li key={s.id} className="p-5">
                  <p className="font-bold">{s.title}</p>
                  <p className="mt-1 text-[.95rem] text-muted">{s.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ResearchPreview() {
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="section border-t border-line"
    >
      <div className="wrap">
        <Reveal>
          <Heading
            id="research-title"
            title="Research"
            lead="Independent work on conversational agents and memory-conscious AI. One journal paper and one preprint."
          />
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-2">
          {PUBLICATIONS.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 80}
              className="panel flex flex-col p-6"
            >
              <p className="text-sm font-semibold text-accent">
                {p.type} · {p.year}
              </p>
              <h3 className="mt-2 text-lg leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">
                {p.venue}
                {p.detail ? `, ${p.detail}` : ""}
              </p>
              <a
                href={p.url}
                {...ext}
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 font-semibold text-accent hover:underline"
              >
                {p.urlLabel} <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-6">
          <Link
            to="/research"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline"
          >
            Abstracts, identifiers and profiles{" "}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSection() {
  const linkedin = PROFILES.find((p) => p.id === "linkedin")!;
  const prose = "space-y-4 text-[1.05rem] leading-relaxed text-muted";
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section border-t border-line bg-surface/50"
    >
      <div className="wrap">
        <Reveal>
          <Heading
            id="about-title"
            title="About me"
            lead="A little more about the person and the work behind the projects."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <h3 className="mb-3 text-xl text-fg">Who I am</h3>
            <div className={prose}>
              <p>
                I’m Susanta Banik, an AI/ML engineer and full-stack developer
                from Agartala, Tripura. I’m studying B.Tech in AI and Data
                Science at Techno College of Engineering Agartala and the online
                B.S. in Applied AI and Data Science at IIT Jodhpur, and I build
                and ship software alongside my degrees. I’m the founder of
                Shristi AI Web Creations™, through which I take on software and
                AI work.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">What I build</h3>
            <div className={prose}>
              <p>
                I like problems with a real user attached. LabBench is a
                zero-setup coding workspace for students who lack a laptop or
                are locked out of lab PCs. BloodSignal, built with Shreya
                Bhattacharjee as Team Pragmatrix, helps families find blood
                banks while being strict about what is known and what still
                needs a phone call. CodeWithFun Dev Hub is an affordable
                bookstore for developers and students. On the machine-learning
                side there are public projects in fraud detection and computer
                vision, and CampusCopilot, a study platform for higher-education
                and competitive-exam students, is in development.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">How I work</h3>
            <div className={prose}>
              <p>
                I start from the problem, choose the smallest technology that
                solves it, and write down honestly where each project stands. If
                a number is unknown, I say it is unknown. That habit comes from
                BloodSignal, where treating missing stock as zero could mislead
                someone in an emergency, and it is why every project here
                carries a status label.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">Research</h3>
            <div className={prose}>
              <p>
                My independent research is on conversational agents and
                memory-conscious AI. A case study on the Jarvis agent is
                published in the International Journal of Science and Research,
                and the Jarvis-v9 preprint is on ResearchGate. QNME-omega, an
                engine for training and running models on modest hardware, is
                still experimental, with no published results yet.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">Beyond the code</h3>
            <div className={prose}>
              <p>
                I run CodeWithFun, a YouTube channel and bookstore for students,
                write about what I learn on DEV Community and Medium, and
                practise problem solving on LeetCode and HackerRank.
              </p>
            </div>

            <h3 className="mb-3 mt-10 text-xl text-fg">Education</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {EDUCATION.map((e) => (
                <li key={e.id} className="panel flex gap-3 p-4">
                  <GraduationCap
                    aria-hidden
                    className="mt-1 h-5 w-5 shrink-0 text-accent"
                  />
                  <div>
                    <p className="font-bold leading-snug">{e.degree}</p>
                    <p className="text-sm text-muted">
                      {e.institution} · {e.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-9 text-xl text-fg">Internships</h3>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {EXPERIENCE.map((x) => (
                <li
                  key={x.id}
                  className="flex flex-col px-4 py-3 sm:flex-row sm:justify-between"
                >
                  <span className="font-semibold">{x.role}</span>
                  <span className="text-muted">{x.org}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mb-4 text-xl">Skills and tools</h3>
            <div className="grid gap-4">
              {SKILLS.map((g) => (
                <div key={g.group} className="panel p-4">
                  <p className="mb-2 text-sm font-bold">{g.group}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {g.items.map((i) => (
                      <li key={i} className="chip">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <details className="panel mt-6 p-4">
              <summary className="cursor-pointer font-bold">
                Selected certifications
              </summary>
              <ul className="mt-3 space-y-2 text-sm">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}</span>{" "}
                    <span className="text-muted">— {c.issuer}</span>
                  </li>
                ))}
              </ul>
            </details>
          </Reveal>
        </div>

        {/* The LinkedIn link sits below the full About text. */}
        <Reveal className="mt-14">
          <div className="card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl">Read my full professional profile</h3>
              <p className="mt-1 text-muted">
                Experience, certifications, recommendations and updates are on
                LinkedIn.
              </p>
            </div>
            <a
              href={linkedin.href}
              {...ext}
              rel="noopener noreferrer me"
              className="btn btn-primary shrink-0"
            >
              <Linkedin aria-hidden className="h-4 w-4" /> View LinkedIn profile
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section border-t border-line"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <Heading
            id="contact-title"
            title="Let’s talk"
            lead="Tell me what you want to build or research. I reply to the email address you give."
          />
          <div className="panel p-5 sm:p-6">
            <ContactForm />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="mb-4 text-xl">Direct</h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-11 items-center gap-3 font-semibold hover:text-accent"
              >
                <Mail aria-hidden className="h-5 w-5 text-accent" />{" "}
                {SITE.email}
              </a>
            </li>
            {SITE.showPhone && (
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-3 font-semibold hover:text-accent"
                >
                  <Phone aria-hidden className="h-5 w-5 text-accent" />{" "}
                  {SITE.phone}
                </a>
              </li>
            )}
          </ul>
          <h3 className="mb-3 mt-8 text-xl">Profiles</h3>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {PROFILES.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  {...ext}
                  rel="noopener noreferrer me"
                  className="flex min-h-11 flex-col justify-center border-b border-line py-1 hover:text-accent"
                >
                  <span className="font-semibold">
                    {p.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  {p.handle && (
                    <span className="text-xs text-muted">{p.handle}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
