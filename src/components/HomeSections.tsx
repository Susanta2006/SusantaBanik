import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  ABOUT_SECTIONS,
  BIRTH_DATE,
  COMPANY_NARRATIVE,
  PERSONAL_FACTS,
} from "../data/about.ts";
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
import { featuredProjects } from "../data/projects.ts";
import { PUBLICATIONS } from "../data/research.ts";
import { ContactForm } from "./ContactForm.tsx";
import { ProjectViewer } from "./ProjectViewer.tsx";
import { Reveal } from "./Reveal.tsx";

/** Whole years between a date of birth and today. */
function ageFrom(dob: string): number {
  const d = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

const eyebrow = "text-sm font-semibold uppercase tracking-[.14em] text-accent";
const profileById = (id: string) => PROFILES.find((p) => p.id === id)!;

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

export function ProjectsSection() {
  const items = featuredProjects().map((project) => ({ project }));
  const gh = profileById("github");
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
            lead="Five projects with a live demo or a public repository. Move through them one at a time."
          />
        </Reveal>
        <Reveal delay={60}>
          <ProjectViewer items={items} headingLevel={3} />
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">More projects on GitHub</p>
              <p className="mt-1 text-muted">
                Machine learning and computer vision experiments, with every
                public repository listed on the profile.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={gh.href} {...ext} className="btn btn-primary">
                Open GitHub <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link to="/projects" className="btn btn-ghost">
                All projects
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderSection() {
  const li = profileById("shristi-linkedin");
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="section border-t border-line"
    >
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <p className={eyebrow}>Company</p>
          <h2 id="founder-title" className="mt-3 text-4xl md:text-5xl">
            {BUSINESS.name}
          </h2>
          <p className="mt-4 text-xl font-semibold text-fg">
            {BUSINESS.tagline}
          </p>

          <div className="mt-6 space-y-5 text-[1.08rem] leading-[1.75] text-muted">
            {COMPANY_NARRATIVE.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <dl className="mt-8 grid gap-x-8 gap-y-5 rounded-2xl border border-line bg-surface p-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Founder</dt>
              <dd className="mt-1 font-semibold">{SITE.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Designation</dt>
              <dd className="mt-1 font-semibold">{SITE.founderTitle}</dd>
            </div>
            <div>
              <dt className="text-muted">Business structure</dt>
              <dd className="mt-1 font-semibold">{BUSINESS.structure}</dd>
            </div>
            <div>
              <dt className="text-muted">Registration</dt>
              <dd className="mt-1 font-semibold">{BUSINESS.registration}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted">Udyam registration number</dt>
              <dd className="mt-1 font-mono text-[.95rem]">{BUSINESS.udyam}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted">Location</dt>
              <dd className="mt-1 flex items-center gap-2 font-semibold">
                <MapPin aria-hidden className="h-4 w-4 text-accent" />
                {BUSINESS.location}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={li.href} {...ext} className="btn btn-primary">
              <Linkedin aria-hidden className="h-4 w-4" /> Company page on
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link to="/" hash="contact" className="btn btn-ghost">
              Discuss a project
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="space-y-12">
          <div>
            <h3 className="text-2xl">What the business focuses on</h3>
            <ul className="mt-5 space-y-3 text-[1.02rem] leading-relaxed text-muted">
              {BUSINESS.focus.map((f) => (
                <li key={f} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl">Services</h3>
            <dl className="mt-5 space-y-5">
              {SERVICES.map((s) => (
                <div key={s.id}>
                  <dt className="font-semibold text-fg">{s.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{s.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-2xl">How the work is done</h3>
            <dl className="mt-5 space-y-5">
              {BUSINESS.principles.map((p) => (
                <div key={p.title}>
                  <dt className="font-semibold text-fg">{p.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-2xl">Contact the company</h3>
            <ul className="mt-5 space-y-3 font-semibold">
              <li>
                <a className="text-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a className="text-link" href={BUSINESS.website} {...ext}>
                  {BUSINESS.website
                    .replace(/^https:\/\//, "")
                    .replace(/\/$/, "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a className="text-link" href={li.href} {...ext}>
                  LinkedIn company page
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
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

/** Short heading + body block used throughout About. Content is always visible in the page HTML. */
function AboutBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`about-${id}`} className="scroll-mt-24">
      <h3 id={`about-${id}`} className="text-2xl md:text-[1.7rem]">
        {title}
      </h3>
      <div className="mt-4 space-y-4 text-[1.08rem] leading-[1.75] text-muted">
        {children}
      </div>
    </section>
  );
}

const KEY_FIGURES = [
  { value: `${EDUCATION.length}`, label: "degrees in progress" },
  { value: `${EXPERIENCE.length}`, label: "internships" },
  { value: `${PUBLICATIONS.length}`, label: "publications and preprints" },
  { value: `${CERTIFICATIONS.length}`, label: "selected certifications" },
];

export function AboutSection() {
  const linkedin = profileById("linkedin");
  const age = ageFrom(BIRTH_DATE);
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section border-t border-line"
    >
      <div className="wrap">
        <Reveal>
          <p className={eyebrow}>About</p>
          <h2 id="about-title" className="mt-3 text-4xl md:text-5xl">
            A builder, a student, a researcher.
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {KEY_FIGURES.map((f) => (
              <li
                key={f.label}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <p className="text-3xl font-bold text-fg">{f.value}</p>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {f.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <Reveal className="max-w-[68ch] space-y-14">
            {ABOUT_SECTIONS.map((sec) => (
              <AboutBlock key={sec.id} id={sec.id} title={sec.title}>
                {sec.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {sec.id === "education" && (
                  <ul className="mt-2 space-y-3 text-fg">
                    {EDUCATION.map((e) => (
                      <li
                        key={e.id}
                        className="rounded-xl border border-line bg-surface p-4"
                      >
                        <p className="font-semibold">{e.degree}</p>
                        <p className="mt-1 text-sm text-muted">
                          {e.institution} · {e.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.id === "research" && (
                  <ul className="mt-2 space-y-3 text-fg">
                    {PUBLICATIONS.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-xl border border-line bg-surface p-4"
                      >
                        <p className="font-semibold leading-snug">{p.title}</p>
                        <p className="mt-1 text-sm text-muted">
                          {p.type} · {p.venue}
                        </p>
                        <a
                          className="text-link mt-2 inline-block text-sm font-semibold"
                          href={p.url}
                          {...ext}
                        >
                          {p.urlLabel}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </AboutBlock>
            ))}

            <AboutBlock id="internships" title="Internships">
              <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                {EXPERIENCE.map((x) => (
                  <li key={x.id} className="flex flex-col gap-0.5 px-5 py-4">
                    <span className="font-semibold text-fg">{x.role}</span>
                    <span className="text-sm text-muted">{x.org}</span>
                  </li>
                ))}
              </ul>
            </AboutBlock>

            <AboutBlock id="skills" title="Skills">
              <div className="space-y-6">
                {SKILLS.map((g) => (
                  <div key={g.group}>
                    <p className="font-semibold text-fg">{g.group}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((i) => (
                        <li key={i} className="chip">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AboutBlock>

            <AboutBlock id="certifications" title="Selected certifications">
              <ul className="space-y-3">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="leading-snug">
                    <span className="font-semibold text-fg">{c.name}</span>
                    <span className="text-muted"> — {c.issuer}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                The full list is on{" "}
                <a
                  className="text-link font-semibold"
                  href={linkedin.href}
                  {...ext}
                  rel="noopener noreferrer me"
                >
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </AboutBlock>
          </Reveal>

          <Reveal delay={80}>
            <aside
              aria-label="Quick facts"
              className="space-y-6 lg:sticky lg:top-24 lg:self-start"
            >
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-lg">Quick facts</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted">Born</dt>
                    <dd className="mt-0.5 font-semibold text-fg">
                      20 October 2006
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Age</dt>
                    <dd className="mt-0.5 font-semibold text-fg">{age}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Hometown and base</dt>
                    <dd className="mt-0.5 font-semibold text-fg">
                      Agartala, Tripura, India
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Languages</dt>
                    <dd className="mt-0.5 font-semibold text-fg">
                      English, Hindi, Bengali
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Parents</dt>
                    <dd className="mt-0.5 font-semibold text-fg">
                      Mr. Sunil Banik and Mrs. Sukla Banik
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Roles</dt>
                    <dd className="mt-0.5 font-semibold text-fg">
                      AI/ML Engineer, Researcher, Data Scientist, Full Stack
                      Developer
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-lg">Find me online</h3>
                <ul className="mt-4 grid gap-2.5 text-sm">
                  {PROFILES.map((p) => (
                    <li key={p.id}>
                      <a
                        className="text-link font-semibold"
                        href={p.href}
                        {...ext}
                        rel="noopener noreferrer me"
                      >
                        {p.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={linkedin.href}
                {...ext}
                rel="noopener noreferrer me"
                className="btn btn-primary w-full"
              >
                <Linkedin aria-hidden className="h-4 w-4" /> Full profile on
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </aside>
          </Reveal>
        </div>
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
