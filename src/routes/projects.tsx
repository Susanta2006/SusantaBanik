import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import campusCopilotImg from "@/assets/campus-copilot.jpg";

const GITHUB_USER = "Susanta2006";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  updated_at: string;
};

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Susanta Banik | GitHub Portfolio" },
      {
        name: "description",
        content:
          "Open-source projects by Susanta Banik — AI/ML, data science and full stack work pulled live from github.com/Susanta2006.",
      },
      { property: "og:title", content: "Projects — Susanta Banik" },
      {
        property: "og:description",
        content:
          "Live portfolio of Susanta Banik's GitHub projects across AI, data science and full stack engineering.",
      },
      { property: "og:url", content: "/projects" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects by Susanta Banik",
          url: "/projects",
          about: {
            "@type": "Person",
            name: "Susanta Banik",
            sameAs: [GITHUB_URL],
          },
        }),
      },
    ],
  }),
});

function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => {
        if (cancelled) return;
        const ranked = data
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
          );
        setRepos(ranked);

        // Inject ItemList structured data once repos are loaded
        if (typeof document !== "undefined") {
          const existing = document.getElementById("projects-itemlist-ld");
          if (existing) existing.remove();
          const script = document.createElement("script");
          script.id = "projects-itemlist-ld";
          script.type = "application/ld+json";
          script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Open source projects by Susanta Banik",
            url: "/projects",
            numberOfItems: ranked.length,
            itemListElement: ranked.slice(0, 50).map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "SoftwareSourceCode",
                name: r.name,
                description: r.description ?? `${r.name} — open source project by Susanta Banik on GitHub.`,
                codeRepository: r.html_url,
                url: r.homepage || r.html_url,
                programmingLanguage: r.language ?? undefined,
                keywords: r.topics?.join(", "),
                dateModified: r.updated_at,
                author: { "@type": "Person", name: "Susanta Banik" },
              },
            })),
          });
          document.head.appendChild(script);
        }
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="rule-bottom">
        <div className="container-prose flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-lg">
            ← Susanta Banik
          </Link>
          <nav className="text-sm text-muted-foreground flex gap-6">
            <Link to="/projects" className="text-foreground">Projects</Link>
            <Link to="/research">Research</Link>
            <Link to="/" hash="contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="container-prose py-16 md:py-24">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl">Projects.</h1>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          A live mirror of <a className="link-underline text-foreground" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/{GITHUB_USER}</a> — every public, non-fork repository, ranked by stars and recent activity. Click any card to open the source on GitHub.
        </p>

        <section className="mt-12">
          <p className="eyebrow">Featured · In development</p>
          <div className="mt-4 rounded-xl border border-rule overflow-hidden bg-subtle/30">
            <div className="relative">
              <img
                src={campusCopilotImg}
                alt="CampusCopilot — AI Student OS for engineering and medical students. Preview of the landing page."
                loading="lazy"
                className="w-full h-auto block"
              />
              <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-foreground border border-rule">
                🚧 Under development
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl">CampusCopilot AI</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                An AI-powered Student OS for Engineering and Medical students — notes, summaries, presentations, viva prep and personalized study schedules in one place. Currently in active development.
              </p>
            </div>
          </div>
        </section>


        {!repos && !error && (
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-lg border border-rule animate-pulse bg-subtle" />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-12 text-muted-foreground">
            GitHub's public API is rate-limited right now — head over to{" "}
            <a className="link-underline text-primary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {GITHUB_URL}
            </a>{" "}
            for the full live list.
          </p>
        )}

        {repos && (
          <>
            <p className="mt-10 eyebrow">{repos.length} repositories</p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-rule p-6 hover:border-primary/50 hover:bg-subtle/40 hover:-translate-y-0.5 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl group-hover:text-primary transition">
                      {r.name}
                    </h2>
                    <span className="eyebrow shrink-0">★ {r.stargazers_count}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3 min-h-12">
                    {r.description ?? "No description provided."}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs">
                    <span className="eyebrow">{r.language ?? "—"}</span>
                    <span className="text-muted-foreground group-hover:text-primary transition">
                      View on GitHub ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        <div className="mt-16 rounded-xl border border-rule p-8 bg-subtle/30">
          <p className="eyebrow">More on GitHub</p>
          <p className="mt-3 text-muted-foreground">
            Forks, archived experiments, contributions and gists all live on{" "}
            <a className="link-underline text-foreground" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              github.com/{GITHUB_USER}
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
