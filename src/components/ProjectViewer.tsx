import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Briefcase,
  ChevronLeft,
  ChevronRight,
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
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  STATUS_LABEL,
  repositoryNote,
  type Project,
  type ProjectStatus,
} from "../data/projects.ts";

export type ViewerItem = { project: Project; group?: string };

const ICONS: Record<string, LucideIcon> = {
  bloodsignal: Droplets,
  "medical-ai": Stethoscope,
  "ai-tutor-rag": BookOpen,
  "qnme-omega": FlaskConical,
  "jarvis-v9": Brain,
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

const pad = (n: number) => String(n).padStart(2, "0");

function Cover({ project }: { project: Project }) {
  if (project.image) {
    const img = project.image;
    return (
      <picture className="block">
        <source type="image/avif" srcSet={`${img.base}.avif`} />
        <source type="image/webp" srcSet={`${img.base}.webp`} />
        <img
          src={`${img.base}.webp`}
          alt={img.alt}
          width={img.width}
          height={img.height}
          decoding="async"
          className="viewer-cover aspect-[16/10] w-full rounded-2xl border border-line object-cover object-top"
        />
      </picture>
    );
  }
  const Icon = ICONS[project.id] ?? CATEGORY_ICONS[project.category] ?? Globe;
  return (
    <div
      aria-hidden
      className="cover-fallback viewer-cover flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-line"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Icon className="h-10 w-10 text-accent" strokeWidth={1.4} />
        <span className="text-sm font-semibold text-muted">
          {project.category}
        </span>
      </div>
    </div>
  );
}

function Details({
  project: p,
  headingLevel,
}: {
  project: Project;
  headingLevel: 2 | 3;
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const note = repositoryNote(p);
  const tech = p.technologies ?? p.tags ?? [];
  const hasLinks = Boolean(
    p.demoUrl || p.repositoryUrl || p.publicationUrl || p.documentationUrl,
  );
  const linkBase =
    "inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors duration-150";
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="chip">
          <span
            aria-hidden
            className={`h-2 w-2 shrink-0 rounded-full ${DOT[p.status]}`}
          />
          {STATUS_LABEL[p.status]}
        </span>
        <span className="text-muted">{p.category}</span>
      </div>
      <div>
        <H className="break-words text-3xl leading-tight md:text-4xl">
          {p.name}
        </H>
        <p className="mt-3 break-words text-lg leading-relaxed text-fg">
          {p.summary}
        </p>
      </div>
      {p.caution && (
        <p className="flex gap-2 rounded-xl border border-warn/40 bg-warn/5 p-3.5 text-sm leading-relaxed text-warn">
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="min-w-0 break-words">{p.caution}</span>
        </p>
      )}
      <p className="break-words leading-relaxed text-muted">{p.description}</p>
      {p.highlights && (
        <ul className="space-y-2.5 text-[.95rem] text-muted">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span className="min-w-0 break-words">{h}</span>
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
      {p.context && <p className="text-sm text-muted">{p.context}.</p>}
      {p.sourceNote && <p className="text-sm text-muted">{p.sourceNote}</p>}

      <div className="mt-1 flex flex-wrap items-center gap-2.5 border-t border-line pt-5">
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} btn-primary`}
          >
            Live demo <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> of {p.name} (opens in a new tab)</span>
          </a>
        )}
        {p.repositoryUrl && (
          <a
            href={p.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} btn-ghost`}
          >
            <Github aria-hidden className="h-4 w-4" /> Source code
            <span className="sr-only"> for {p.name} (opens in a new tab)</span>
          </a>
        )}
        {p.publicationUrl && (
          <a
            href={p.publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} btn-ghost`}
          >
            <FileText aria-hidden className="h-4 w-4" /> Paper
            <span className="sr-only">
              {" "}
              about {p.name} (opens in a new tab)
            </span>
          </a>
        )}
        {p.documentationUrl && (
          <a
            href={p.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} btn-ghost`}
          >
            <BookOpen aria-hidden className="h-4 w-4" /> Documentation
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
    </div>
  );
}

/**
 * Shows one project at a time. Next and Previous move through the list and
 * loop at the ends. Dots jump to any project. Arrow keys work when the viewer
 * has focus, and a horizontal swipe changes project on touch screens.
 */
export function ProjectViewer({
  items,
  headingLevel = 2,
  startIndex = 0,
}: {
  items: ViewerItem[];
  headingLevel?: 2 | 3;
  startIndex?: number;
}) {
  const [index, setIndex] = useState(
    Math.min(startIndex, Math.max(items.length - 1, 0)),
  );
  const [dir, setDir] = useState<1 | -1>(1);
  const count = items.length;
  const titleId = useId();
  const drag = useRef<{ x: number; id: number } | null>(null);

  const go = useCallback(
    (next: number, direction: 1 | -1) => {
      if (count === 0) return;
      setDir(direction);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    // Keep the index valid if the list length changes.
    if (index >= count && count > 0) setIndex(count - 1);
  }, [count, index]);

  if (count === 0) return null;
  const current = items[index];
  const p = current.project;

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const progress = ((index + 1) / count) * 100;

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby={titleId}
      className="viewer"
      onKeyDown={onKey}
    >
      <p id={titleId} className="sr-only">
        Projects, one at a time
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-baseline gap-3 font-mono text-sm tabular-nums">
          <span className="text-2xl font-semibold text-fg">
            {pad(index + 1)}
          </span>
          <span className="text-muted">/ {pad(count)}</span>
          {current.group && (
            <span className="ml-2 font-sans text-sm text-muted">
              {current.group}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="viewer-nav"
            aria-label="Previous project"
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="viewer-nav"
            aria-label="Next project"
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="viewer-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Project {index + 1} of {count}: {p.name}
      </p>

      <div
        key={p.id}
        className="viewer-stage mt-8 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
        style={{ "--dir": dir } as React.CSSProperties}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
      >
        <div className="flex min-w-0 flex-col gap-6">
          <Cover project={p} />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-line bg-surface p-5 text-sm">
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-1 font-semibold">{STATUS_LABEL[p.status]}</dd>
            </div>
            <div>
              <dt className="text-muted">Category</dt>
              <dd className="mt-1 font-semibold">{p.category}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">
                {p.technologies ? "Stack" : "Topics"}
              </dt>
              <dd className="mt-1 font-semibold">
                {(p.technologies ?? p.tags ?? []).join(" · ") ||
                  "Not documented"}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Source</dt>
              <dd className="mt-1 font-semibold">
                {p.repositoryUrl
                  ? "Public repository on GitHub"
                  : (repositoryNote(p) ??
                    (p.visibility === "on-request"
                      ? "Available on request"
                      : "No public repository linked"))}
              </dd>
            </div>
          </dl>
        </div>
        <Details project={p} headingLevel={headingLevel} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <ol className="flex flex-wrap gap-2" aria-label="Choose a project">
          {items.map((it, i) => (
            <li key={it.project.id}>
              <button
                type="button"
                onClick={() => go(i, i >= index ? 1 : -1)}
                aria-label={`Show project ${i + 1}: ${it.project.name}`}
                aria-current={i === index ? "step" : undefined}
                className={`viewer-dot ${i === index ? "is-active" : ""}`}
              >
                <span aria-hidden>{pad(i + 1)}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={next} className="btn btn-primary">
          Next project <ArrowRight aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
