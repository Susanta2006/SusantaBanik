import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { PROFILES } from "../data/site.ts";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  updatedAt: string;
};
type State =
  | { kind: "loading" }
  | { kind: "ok"; repos: Repo[]; stale: boolean }
  | { kind: "error" };

const GITHUB = PROFILES.find((p) => p.id === "github")!.href;

/**
 * Live public repositories, fetched after the page has rendered. The page
 * never depends on this: if GitHub is slow, rate-limited or down, the visitor
 * simply gets a link to the profile.
 */
export function GithubRepos() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 10_000);
    fetch("/api/github", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d: { ok: boolean; repos?: Repo[]; stale?: boolean }) => {
        if (d.ok && d.repos)
          setState({ kind: "ok", repos: d.repos, stale: Boolean(d.stale) });
        else setState({ kind: "error" });
      })
      .catch(() => setState({ kind: "error" }))
      .finally(() => window.clearTimeout(timer));
    return () => ctrl.abort();
  }, []);

  if (state.kind === "loading") {
    return (
      <div
        role="status"
        aria-label="Loading GitHub repositories"
        className="grid gap-4 sm:grid-cols-2"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="shimmer h-36 rounded-2xl border border-line"
          />
        ))}
      </div>
    );
  }
  if (state.kind === "error") {
    return (
      <p className="text-muted">
        The live repository list isn’t available right now (GitHub may be
        rate-limiting requests). Browse everything on{" "}
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link font-semibold"
        >
          github.com/Susanta2006
        </a>
        .
      </p>
    );
  }
  if (state.repos.length === 0) {
    return <p className="text-muted">No public repositories were returned.</p>;
  }
  return (
    <>
      {state.stale && (
        <p className="mb-3 text-sm text-muted">
          Showing a recent saved copy because GitHub didn’t respond.
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2">
        {state.repos.map((r) => (
          <li key={r.id} className="panel flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg">{r.name}</h3>
              {r.stars > 0 && (
                <span className="chip" title="Stars on GitHub">
                  <Star aria-hidden className="h-3.5 w-3.5" /> {r.stars}
                  <span className="sr-only"> stars</span>
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-3 text-[.95rem] text-muted">
              {r.description ?? "No description provided."}
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
              <span className="text-muted">{r.language ?? ""}</span>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1 font-semibold text-accent hover:underline"
              >
                View repository <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> {r.name} (opens in a new tab)</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
