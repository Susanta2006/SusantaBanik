/**
 * Grounding for Jarvis.
 *
 * Builds retrievable passages from the same registries that power the site
 * (`src/data/*`), scores them against a visitor's question, and can answer
 * directly from them when no language-model backend is available.
 *
 * Runs on the server (for the model prompt) and in the browser (for the
 * offline fallback), so it only uses plain TypeScript and relative imports.
 */
import {
  SITE,
  BUSINESS,
  PROFILES,
  SERVICES,
  EDUCATION,
  EXPERIENCE,
  EXTRA_LINKS,
} from "../../data/site.ts";
import { PROJECTS, STATUS_LABEL, repositoryNote } from "../../data/projects.ts";
import { PUBLICATIONS, doiUrl } from "../../data/research.ts";
import { ARCHIVE } from "../../data/archive.ts";

export type Chunk = {
  id: string;
  title: string;
  keywords: string[];
  text: string;
};

const NOT_ESTABLISHED =
  "The available portfolio data does not establish an answer to that.";

function projectChunk(p: (typeof PROJECTS)[number]): Chunk {
  const links: string[] = [];
  if (p.demoUrl) links.push(`Live demo: ${p.demoUrl}`);
  if (p.repositoryUrl) links.push(`Repository: ${p.repositoryUrl}`);
  if (p.documentationUrl) links.push(`Documentation: ${p.documentationUrl}`);
  if (p.publicationUrl) links.push(`Publication: ${p.publicationUrl}`);
  const note = repositoryNote(p);
  if (note) links.push(note);
  if (links.length === 0)
    links.push("No public links are listed for this project.");

  const parts = [
    `${p.name} — status: ${STATUS_LABEL[p.status]}.`,
    p.description,
    p.technologies?.length ? `Technologies: ${p.technologies.join(", ")}.` : "",
    p.tags?.length && !p.technologies?.length
      ? `Focus: ${p.tags.join(", ")}.`
      : "",
    p.context ? `${p.context}.` : "",
    p.caution ? `Caution: ${p.caution}` : "",
    links.join(" "),
  ];
  return {
    id: `project:${p.id}`,
    title: p.name,
    keywords: [
      p.id,
      p.name,
      p.category,
      STATUS_LABEL[p.status],
      ...(p.tags ?? []),
      ...(p.technologies ?? []),
    ],
    text: parts.filter(Boolean).join(" "),
  };
}

export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    title: "About Susanta Banik",
    keywords: [
      "who",
      "about",
      "susanta",
      "banik",
      "background",
      "bio",
      "biography",
      "introduce",
      "tagline",
      "location",
      "language",
      "languages",
      "based",
    ],
    text: `${SITE.name} is an ${SITE.roles.join(", ")} based in ${SITE.location}, and ${SITE.founderTitle} of ${BUSINESS.name}. ${SITE.intro} His tagline is "${SITE.tagline}" Languages: ${SITE.languages.join(", ")}.`,
  });

  chunks.push({
    id: "education",
    title: "Education",
    keywords: [
      "education",
      "degree",
      "study",
      "studying",
      "college",
      "university",
      "iit",
      "jodhpur",
      "techno",
      "student",
      "btech",
      "tech",
      "school",
      "learn",
    ],
    text: `Education (both in progress): ${EDUCATION.map((e) => `${e.degree}, ${e.institution}`).join("; ")}.`,
  });

  chunks.push({
    id: "experience",
    title: "Internships",
    keywords: [
      "experience",
      "intern",
      "internship",
      "internships",
      "work",
      "worked",
      "job",
      "employment",
      "career",
      "kyma",
      "cognifyz",
      "saiket",
      "unified",
      "aspire",
    ],
    text: `Internships listed on the portfolio: ${EXPERIENCE.map((e) => `${e.role} at ${e.org}`).join("; ")}. Dates and responsibilities are not recorded in the portfolio data.`,
  });

  chunks.push({
    id: "business",
    title: BUSINESS.name,
    keywords: [
      "shristi",
      "business",
      "company",
      "founder",
      "udyam",
      "startup",
      "enterprise",
      "proprietorship",
      "firm",
      "agency",
    ],
    text: `${SITE.name} is ${SITE.founderTitle} of ${BUSINESS.name}. ${BUSINESS.legalDescription} It is based in ${BUSINESS.location}. Focus: ${BUSINESS.focus.join("; ")}. Principles: ${BUSINESS.principles.map((x) => x.title).join("; ")}. Company page: ${BUSINESS.linkedin}. The portfolio data does not include client names, testimonials, revenue or company size.`,
  });

  chunks.push({
    id: "services",
    title: "Services",
    keywords: [
      "service",
      "services",
      "offer",
      "offers",
      "hire",
      "hiring",
      "build",
      "freelance",
      "client",
      "clients",
      "pricing",
      "price",
      "cost",
      "quote",
      "rates",
      "available",
      "availability",
    ],
    text: `Services offered through ${BUSINESS.name}: ${SERVICES.map((s) => `${s.title} — ${s.body}`).join(" ")} No pricing or guarantees are published; to discuss a project use the contact section (${SITE.url}/#contact) or email ${SITE.email}.`,
  });

  chunks.push({
    id: "contact",
    title: "Contact",
    keywords: [
      "contact",
      "email",
      "mail",
      "reach",
      "message",
      "talk",
      "connect",
      "collaborate",
      "collaboration",
      "hire",
      "phone",
      "call",
      "whatsapp",
    ],
    text: `Contact: use the form at ${SITE.url}/#contact or email ${SITE.email}. LinkedIn: ${PROFILES.find((p) => p.id === "linkedin")?.href}. A phone number is not shared through this assistant.`,
  });

  chunks.push({
    id: "links",
    title: "Professional profiles",
    keywords: [
      "link",
      "links",
      "profile",
      "profiles",
      "github",
      "linkedin",
      "twitter",
      "x",
      "youtube",
      "scholar",
      "researchgate",
      "leetcode",
      "hackerrank",
      "medium",
      "dev",
      "social",
      "portfolio",
      "website",
    ],
    text: `Professional profiles: ${PROFILES.map((p) => `${p.label}: ${p.href}`).join("; ")}. Portfolio: ${SITE.url}/. ResearchGate research tab: ${EXTRA_LINKS.researchgateResearchTab}.`,
  });

  const withRepo = PROJECTS.filter((p) => p.repositoryUrl);
  const unpublished = PROJECTS.filter(
    (p) => p.repositoryStatus === "unpublished",
  );
  chunks.push({
    id: "repositories",
    title: "Repositories and links",
    keywords: [
      "repo",
      "repos",
      "repository",
      "repositories",
      "github",
      "source",
      "code",
      "public",
      "published",
      "unpublished",
      "open",
      "opensource",
    ],
    text: `Projects with a listed public repository: ${withRepo.map((p) => `${p.name} (${p.repositoryUrl})`).join("; ") || "none"}. Projects whose repository is not yet published: ${unpublished.map((p) => p.name).join(", ") || "none"}. For other projects, no repository link is listed. All public repositories are at ${PROFILES[0].href}.`,
  });

  for (const p of PROJECTS) chunks.push(projectChunk(p));

  for (const pub of PUBLICATIONS) {
    chunks.push({
      id: `publication:${pub.id}`,
      title: pub.title,
      keywords: [
        "paper",
        "papers",
        "publication",
        "publications",
        "research",
        "published",
        "preprint",
        "journal",
        "ijsr",
        "doi",
        "scholar",
        "researchgate",
        "jarvis",
        pub.type,
      ],
      text: `${pub.type}: "${pub.title}" — ${pub.venue}, ${pub.detail ?? pub.year}. ${pub.identifierLabel}: ${pub.identifier}. ${pub.summary} Link: ${pub.doi ? doiUrl(pub.doi) : pub.url}.`,
    });
  }

  chunks.push({
    id: "archive",
    title: "Wider project catalogue",
    keywords: [
      "other",
      "more",
      "catalogue",
      "archive",
      "list",
      "all",
      "python",
      "machine",
      "learning",
      "deep",
      "dashboard",
      "dashboards",
      "tableau",
      "powerbi",
      "web",
      "projects",
      "built",
    ],
    text: `Smaller projects listed in the portfolio archive: ${ARCHIVE.map((g) => `${g.group}: ${g.items.map((i) => i.name).join(", ")}`).join(". ")}. These are listed in the portfolio; their descriptions have not been independently verified.`,
  });

  chunks.push({
    id: "assistant",
    title: "About this assistant",
    keywords: [
      "jarvis",
      "assistant",
      "chatbot",
      "bot",
      "you",
      "yourself",
      "ai",
      "model",
      "live",
    ],
    text: "Jarvis is the portfolio assistant. It answers from the portfolio's project registry and cannot browse GitHub or other sites. It is separate from Jarvis-v9, the research project.",
  });

  return chunks;
}

const STOP = new Set(
  "a an and are as at be but by can could do does for from has have how i if in is it its me my of on or our so tell that the their them there these they this to was we what when where which who why will with would you your about any some".split(
    " ",
  ),
);

export function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t));
}

let cache: Chunk[] | null = null;
function chunks(): Chunk[] {
  return (cache ??= buildChunks());
}

export type Scored = { chunk: Chunk; score: number };

/** Words that appear in almost every passage; they only count when nothing more specific was asked. */
const SUBJECT = new Set(["susanta", "banik", "ai"]);

export function score(query: string): Scored[] {
  const all = tokens(query);
  const specific = all.filter((t) => !SUBJECT.has(t));
  const q = specific.length > 0 ? specific : all;
  if (q.length === 0) return [];
  return chunks()
    .map((chunk) => {
      const title = new Set(tokens(chunk.title));
      const kw = new Set(chunk.keywords.flatMap((k) => tokens(k)));
      const body = new Set(tokens(chunk.text));
      let s = 0;
      for (const t of q) {
        if (title.has(t)) s += 4;
        if (kw.has(t)) s += 3;
        else if (body.has(t)) s += 1;
      }
      // A project named in the question should always win over generic passages.
      if (chunk.id.startsWith("project:") && q.some((t) => title.has(t)))
        s += 4;
      return { chunk, score: s };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function retrieve(query: string, k = 4): Chunk[] {
  return score(query)
    .slice(0, k)
    .map((x) => x.chunk);
}

/** One line per project — always included so the model knows what exists. */
export function registryIndex(): string {
  return PROJECTS.map((p) => {
    const repo = p.repositoryUrl
      ? "public repository listed"
      : p.repositoryStatus === "unpublished"
        ? "repository not yet published"
        : "no repository listed";
    return `- ${p.name}: ${STATUS_LABEL[p.status]}; ${repo}.`;
  }).join("\n");
}

export type LocalAnswer = { text: string; matched: boolean };

/**
 * Answer straight from the registry. Used when no language-model backend is
 * configured or reachable. It never invents anything: it returns the stored
 * passages, or says the data does not establish an answer.
 */
export function localAnswer(query: string): LocalAnswer {
  const ranked = score(query);
  const best = ranked[0];
  if (!best || best.score < 3) {
    return {
      matched: false,
      text: `${NOT_ESTABLISHED} You can ask about the projects, research, services or how to get in touch — or use the contact section at ${SITE.url}/#contact.`,
    };
  }
  const picked = [best.chunk];
  const second = ranked[1];
  if (
    second &&
    second.score >= best.score * 0.8 &&
    second.chunk.id.startsWith("project:") ===
      best.chunk.id.startsWith("project:")
  ) {
    picked.push(second.chunk);
  }
  return { matched: true, text: picked.map((c) => c.text).join("\n\n") };
}
