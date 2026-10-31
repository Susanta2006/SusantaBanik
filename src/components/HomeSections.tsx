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
          <h1
            id="hero-title"
            className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            {SITE.name}
          </h1>
          <p className="mt-4 text-xl font-semibold text-fg sm:text-2xl lg:text-3xl">
            Building Intelligence,{" "}
            <span className="text-accent">thoughtfully.</span>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Roles">
            {SITE.roles.map((r) => (
              <li key={r} className="chip">
                {r}
              </li>
            ))}
          </ul>
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
      <div className="wrap">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Company
          </p>
          <h2 id="founder-title" className="mt-2 text-3xl md:text-4xl">
            {BUSINESS.name}
          </h2>
          <p className="mt-3 text-lg font-semibold text-fg">
            {BUSINESS.tagline}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="text-[1.05rem] leading-relaxed text-muted">
              {BUSINESS.name} is the software and AI services business I run as{" "}
              {SITE.founderTitle}. It takes on custom software development,
              AI/ML solutions, LLM applications and pipelines,
              retrieval-augmented generation (RAG) systems, agentic AI
              workflows, full-stack web applications, and software and digital
              product engineering.
            </p>

            <dl className="mt-8 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-muted">Founder</dt>
                <dd className="mt-1 font-semibold">{SITE.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Designation</dt>
                <dd className="mt-1 font-semibold">{SITE.founderTitle}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Business structure</dt>
                <dd className="mt-1 font-semibold">{BUSINESS.structure}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Registration</dt>
                <dd className="mt-1 font-semibold">{BUSINESS.registration}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-muted">
                  Udyam registration number
                </dt>
                <dd className="mt-1 font-mono text-[.95rem] tracking-normal">
                  {BUSINESS.udyam}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-muted">Location</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold">
                  <MapPin aria-hidden className="h-4 w-4 text-accent" />
                  {BUSINESS.location}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={BUSINESS.linkedin} {...ext} className="btn btn-primary">
                Company page on LinkedIn
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link to="/" hash="contact" className="btn btn-ghost">
                Discuss a project
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
              Personal profile and public work are on the home page; this block
              describes the business only.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="text-xl">Focus</h3>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
              {BUSINESS.focus.map((f) => (
                <li key={f} className="px-5 py-3.5 text-[.95rem]">
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-9 text-xl">How the work is done</h3>
            <ul className="grid gap-4">
              {BUSINESS.principles.map((p) => (
                <li key={p.title} className="panel p-5">
                  <p className="font-bold">{p.title}</p>
                  <p className="mt-1.5 text-[.95rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
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
            title="About"
            lead="How I approach engineering, research and the trade-offs I care about."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <h3 className="mb-3 text-xl text-fg">Engineering approach</h3>
            <div className={prose}>
              <p>
                I start from the problem a person actually has and work
                backwards to the smallest system that solves it. That usually
                means a clear data model, an interface someone can use without
                instructions, and documentation that lets the next engineer take
                over. I would rather ship something modest that is honest about
                its limits than something impressive that nobody can maintain.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">Practical AI systems</h3>
            <div className={prose}>
              <p>
                I am most interested in AI that does a job inside a real
                workflow: retrieving the right source, explaining a result, or
                asking for help when it is uncertain. That is why I treat
                evaluation, failure cases and missing data as part of the design
                rather than an afterthought.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">Research philosophy</h3>
            <div className={prose}>
              <p>
                My research asks what conversational and learning systems can do
                with limited memory and compute, and what they should not be
                trusted to claim. I publish what I can support and label
                everything else as in progress.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">
              Resource-efficient computing
            </h3>
            <div className={prose}>
              <p>
                Many useful tools are built for people on modest phones, shared
                lab machines and slow connections. I think about memory use,
                startup cost and offline behaviour early, because those limits
                decide who can actually use the software.
              </p>
            </div>

            <h3 className="mb-3 mt-9 text-xl text-fg">How the work is split</h3>
            <div className={prose}>
              <p>
                Independent development and research happen alongside
                client-oriented work through Shristi AI Web Creations™. The
                personal portfolio covers my own projects and studies; the
                company covers services and commissioned work.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="mb-3 text-xl text-fg">Education</h3>
            <ul className="grid gap-3">
              {EDUCATION.map((e) => (
                <li key={e.id} className="panel flex gap-3 p-4">
                  <GraduationCap
                    aria-hidden
                    className="mt-1 h-5 w-5 shrink-0 text-accent"
                  />
                  <div className="min-w-0">
                    <p className="font-bold leading-snug">{e.degree}</p>
                    <p className="mt-1 text-sm text-muted">{e.institution}</p>
                    <p className="mt-1 text-sm font-semibold text-accent">
                      {e.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-9 text-xl text-fg">Internships</h3>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {EXPERIENCE.map((x) => (
                <li key={x.id} className="flex flex-col gap-0.5 px-4 py-3">
                  <span className="font-semibold">{x.role}</span>
                  <span className="text-sm text-muted">{x.org}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <h3 className="mb-3 text-xl text-fg">Skills</h3>
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

        <Reveal className="mt-14">
          <div className="card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl">Personal professional profile</h3>
              <p className="mt-1 text-muted">
                Experience, certifications and updates are on LinkedIn.
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
