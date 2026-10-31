import { createFileRoute } from "@tanstack/react-router";
import { GithubRepos } from "../components/GithubRepos.tsx";
import {
  ProjectViewer,
  type ViewerItem,
} from "../components/ProjectViewer.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { ARCHIVE } from "../data/archive.ts";
import { PROJECTS, type Project } from "../data/projects.ts";
import { SITE } from "../data/site.ts";
import { IDS, abs, pageHead } from "../lib/seo.ts";

/**
 * Each project is placed in exactly one group, by its existing `id`. Projects
 * with no verified facts to show (Boreal Basin, FSMN) stay off the grid and are
 * covered in the archive notes. The test below fails if a project is missing or
 * appears twice.
 */
const GROUP_IDS: Record<string, string[]> = {
  products: ["labbench", "bloodsignal", "codewithfun-devhub"],
  ml: ["fraud-detection", "emotion-detect", "ai-tutor-rag"],
  "education-health": ["campuscopilot", "medical-ai"],
  research: ["qnme-omega", "jarvis-v9"],
};

const pick = (ids: string[]): Project[] =>
  ids
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

const PROJECT_GROUPS: {
  id: string;
  title: string;
  lead: string;
  projects: Project[];
}[] = [
  {
    id: "products",
    title: "Products and applications",
    lead: "Applications with a live demo or a public source repository.",
    projects: pick(GROUP_IDS.products),
  },
  {
    id: "ml",
    title: "Machine learning and data science",
    lead: "Models and experiments, each with its source on GitHub or its scope stated.",
    projects: pick(GROUP_IDS.ml),
  },
  {
    id: "education-health",
    title: "Education and healthcare",
    lead: "Learning tools and experimental decision-support work. Health work is not clinically validated.",
    projects: pick(GROUP_IDS["education-health"]),
  },
  {
    id: "research",
    title: "Research and in-development work",
    lead: "Investigations and products still in progress. Experimental, not production-ready.",
    projects: pick(GROUP_IDS.research),
  },
];

const VIEWER_ITEMS: ViewerItem[] = PROJECT_GROUPS.flatMap((g) =>
  g.projects.map((project) => ({ project, group: g.title })),
);

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () =>
    pageHead({
      title: `AI, ML and full-stack projects — ${SITE.name}`,
      description:
        "AI/ML, research and full-stack projects by Susanta Banik, each with its real status: live, in development, experimental research or client work.",
      path: "/projects",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Projects by ${SITE.name}`,
        url: abs("/projects"),
        about: { "@id": IDS.person },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: PROJECTS.length,
          itemListElement: PROJECTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            description: p.summary,
          })),
        },
      },
    }),
});

function ProjectsPage() {
  return (
    <div className="wrap section">
      <Reveal>
        <h1 className="text-4xl md:text-5xl">Projects and products</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Move through the work one project at a time. Each one states its
          status, and links appear only where a demo, repository or paper
          actually exists.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <ProjectViewer items={VIEWER_ITEMS} headingLevel={2} />
      </Reveal>

      <section aria-labelledby="gh-title" className="mt-24">
        <h2 id="gh-title" className="text-3xl">
          Public repositories on GitHub
        </h2>
        <p className="mb-8 mt-2 max-w-2xl text-muted">
          Loaded live from GitHub and cached for up to 30 minutes. Non-fork,
          non-archived repositories only.
        </p>
        <GithubRepos />
      </section>

      <section aria-labelledby="archive-title" className="mt-24">
        <h2 id="archive-title" className="text-3xl">
          The wider catalogue
        </h2>
        <p className="mb-8 mt-2 max-w-2xl text-muted">
          Smaller projects across web, Python, machine learning, deep learning
          and analytics. Descriptions are carried over from the previous site.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {ARCHIVE.map((g) => (
            <details key={g.group} className="panel p-5">
              <summary className="cursor-pointer font-bold">
                {g.group}{" "}
                <span className="font-normal text-muted">
                  ({g.items.length})
                </span>
              </summary>
              <ul className="mt-3 divide-y divide-line">
                {g.items.map((i) => (
                  <li key={i.name} className="py-2.5 text-sm">
                    <span className="font-semibold">{i.name}</span>
                    {i.note && (
                      <span className="block text-muted">{i.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
