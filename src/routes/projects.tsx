import { createFileRoute } from "@tanstack/react-router";
import { GithubRepos } from "../components/GithubRepos.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { ARCHIVE } from "../data/archive.ts";
import { PROJECTS } from "../data/projects.ts";
import { SITE } from "../data/site.ts";
import { IDS, abs, pageHead } from "../lib/seo.ts";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () =>
    pageHead({
      title: `Projects and products — ${SITE.name}`,
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
            url: `${abs("/projects")}#${p.id}`,
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
          Every entry states its status. Links appear only where a demo,
          repository or paper actually exists. Work whose repository hasn’t been
          published is labelled as such.
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} headingLevel={2} />
            <p className="mt-3 px-1 text-sm text-muted">{p.description}</p>
          </li>
        ))}
      </ul>

      <section aria-labelledby="gh-title" className="mt-20">
        <h2 id="gh-title" className="text-3xl">
          Public repositories on GitHub
        </h2>
        <p className="mb-6 mt-2 max-w-2xl text-muted">
          Fetched live from GitHub after the page loads and cached for up to 30
          minutes. Non-fork, non-archived repositories only.
        </p>
        <GithubRepos />
      </section>

      <section aria-labelledby="archive-title" className="mt-20">
        <h2 id="archive-title" className="text-3xl">
          The wider catalogue
        </h2>
        <p className="mb-6 mt-2 max-w-2xl text-muted">
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
