import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Briefcase,
  ChevronDown,
  CircleAlert,
  Droplets,
  FileText,
  FlaskConical,
  Github,
  GraduationCap,
  Globe,
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
      <span
        aria-hidden
        className={`h-2 w-2 shrink-0 rounded-full ${DOT[status]}`}
      />
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

/**
 * One project card. The summary is always visible. "Details" uses the native
 * <details> element; its content lives in a single wrapper that the browser
 * hides when the panel is closed (via content-visibility on the wrapper slot),
 * so closed text never paints outside the card.
 */
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
  const hasLinks = Boolean(
    p.demoUrl || p.repositoryUrl || p.publicationUrl || p.documentationUrl,
  );

  return (
    <article
      id={p.id}
      className="card flex h-full min-w-0 flex-col gap-4 p-4 sm:p-5"
    >
      <Cover project={p} />

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <StatusBadge status={p.status} />
        <span className="min-w-0 text-xs font-medium text-muted">
          {p.category}
        </span>
      </div>

      <div className="min-w-0">
        <H className="break-words text-xl leading-tight">{p.name}</H>
        <p className="mt-2 break-words text-[.95rem] leading-relaxed text-muted">
          {p.summary}
        </p>
      </div>

      {p.caution && (
        <p className="flex min-w-0 gap-2 text-sm leading-relaxed text-warn">
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="min-w-0 break-words">{p.caution}</span>
        </p>
      )}

      <details className="project-details group min-w-0 rounded-xl border border-line bg-surface-2/60 text-sm">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3.5 font-semibold">
          <span>Details</span>
          <ChevronDown
            aria-hidden
            className="h-4 w-4 shrink-0 transition-transform duration-150 group-open:rotate-180"
          />
        </summary>
        <div className="space-y-3 border-t border-line px-3.5 py-3 leading-relaxed text-muted">
          <p className="break-words">{p.description}</p>
          {p.highlights && (
            <ul className="list-disc space-y-1.5 pl-5">
              {p.highlights.map((h) => (
                <li key={h} className="break-words">
                  {h}
                </li>
              ))}
            </ul>
          )}
          {tech.length > 0 && (
            <ul
              className="flex flex-wrap gap-1.5"
              aria-label={p.technologies ? "Technologies" : "Topics"}
            >
              {tech.map((c) => (
                <li key={c} className="chip max-w-full break-words">
                  {c}
                </li>
              ))}
            </ul>
          )}
          {p.context && <p className="break-words">{p.context}.</p>}
          {p.sourceNote && <p className="break-words">{p.sourceNote}</p>}
        </div>
      </details>

      <div className="mt-auto flex min-w-0 flex-wrap items-center gap-2 border-t border-line pt-4">
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
        {!hasLinks && !note && (
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
