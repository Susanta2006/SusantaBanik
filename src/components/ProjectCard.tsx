import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Brain,
  ChevronDown,
  CircleAlert,
  Droplets,
  FileText,
  FlaskConical,
  Github,
  Globe,
  GraduationCap,
  ScanFace,
  ShieldAlert,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import {
  STATUS_LABEL,
  repositoryNote,
  type Project,
  type ProjectStatus,
} from "../data/projects.ts";

const ICONS: Record<string, LucideIcon> = {
  bloodsignal: Droplets,
  "medical-ai": Stethoscope,
  "ai-tutor-rag": BookOpen,
  "qnme-omega": FlaskConical,
  "jarvis-v9": Brain,
  fsmn: Brain,
  "boreal-basin": Briefcase,
  campuscopilot: GraduationCap,
  "fraud-detection": ShieldAlert,
  "emotion-detect": ScanFace,
};
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "AI / ML": Brain,
  Research: FlaskConical,
  Education: GraduationCap,
  Healthcare: Stethoscope,
  Web: Globe,
  "Client work": Briefcase,
};

const DOT: Record<ProjectStatus, string> = {
  live: "bg-ok",
  "in-development": "bg-warn",
  research: "bg-cyan",
  experimental: "bg-cyan",
  hackathon: "bg-accent",
  client: "bg-muted",
  project: "bg-muted",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="chip">
      <span aria-hidden className={`h-2 w-2 rounded-full ${DOT[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function Cover({ project }: { project: Project }) {
  const img = project.image;
  if (img) {
    return (
      <picture>
        <source type="image/avif" srcSet={`${img.base}.avif`} />
        <source type="image/webp" srcSet={`${img.base}.webp`} />
        <img
          src={`${img.base}.webp`}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full rounded-xl border border-line object-cover object-top"
        />
      </picture>
    );
  }
  const Icon = ICONS[project.id] ?? CATEGORY_ICONS[project.category] ?? Globe;
  return (
    <div
      aria-hidden
      className="flex aspect-[16/9] w-full items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent-soft to-surface-2"
    >
      <Icon className="h-11 w-11 text-accent" strokeWidth={1.5} />
    </div>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const primary = "btn btn-primary min-h-10 px-4 py-2 text-sm";
const ghost = "btn btn-ghost min-h-10 px-4 py-2 text-sm";

/** One project, as a card. The summary is always visible; "Details" reveals the fuller, verified description. */
export function ProjectCard({
  project: p,
  headingLevel = 3,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const note = repositoryNote(p);
  const tech = p.technologies ?? p.tags ?? [];
  return (
    <article id={p.id} className="card flex h-full flex-col gap-4 p-4">
      <Cover project={p} />
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={p.status} />
        <span className="text-xs font-medium text-muted">{p.category}</span>
      </div>
      <div>
        <H className="text-xl">{p.name}</H>
        <p className="mt-2 text-[.95rem] text-muted">{p.summary}</p>
      </div>

      {p.caution && (
        <p className="flex gap-2 text-sm text-warn">
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{p.caution}</span>
        </p>
      )}

      <details className="group rounded-xl border border-line bg-surface-2/60 px-3.5 py-2.5 text-sm">
        <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-2 font-semibold">
          Details
          <ChevronDown
            aria-hidden
            className="h-4 w-4 transition-transform duration-150 group-open:rotate-180"
          />
        </summary>
        <div className="mt-2 space-y-3 pb-1 text-muted">
          <p>{p.description}</p>
          {p.highlights && (
            <ul className="list-disc space-y-1 pl-5">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {tech.length > 0 && (
            <ul
              className="flex flex-wrap gap-1.5"
              aria-label={p.technologies ? "Technologies" : "Topics"}
            >
              {tech.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          )}
          {p.context && <p>{p.context}.</p>}
          {p.sourceNote && <p>{p.sourceNote}</p>}
        </div>
      </details>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-4">
        {p.demoUrl && (
          <a href={p.demoUrl} {...ext} className={primary}>
            Live demo <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> of {p.name} (opens in a new tab)</span>
          </a>
        )}
        {p.repositoryUrl && (
          <a
            href={p.repositoryUrl}
            {...ext}
            className={p.demoUrl ? ghost : primary}
          >
            <Github aria-hidden className="h-4 w-4" /> Source
            <span className="sr-only">
              {" "}
              code for {p.name} (opens in a new tab)
            </span>
          </a>
        )}
        {p.publicationUrl && (
          <a href={p.publicationUrl} {...ext} className={ghost}>
            <FileText aria-hidden className="h-4 w-4" /> Paper
            <span className="sr-only">
              {" "}
              about {p.name} (opens in a new tab)
            </span>
          </a>
        )}
        {p.documentationUrl && (
          <a href={p.documentationUrl} {...ext} className={ghost}>
            <BookOpen aria-hidden className="h-4 w-4" /> Docs
            <span className="sr-only"> for {p.name} (opens in a new tab)</span>
          </a>
        )}
        {note && <span className="text-sm text-muted">{note}</span>}
        {!p.demoUrl &&
          !p.repositoryUrl &&
          !p.publicationUrl &&
          !p.documentationUrl &&
          !note && (
            <span className="text-sm text-muted">
              {p.visibility === "on-request"
                ? "Details on request"
                : "No public links yet"}
            </span>
          )}
      </div>
    </article>
  );
}
