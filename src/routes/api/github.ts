import { createFileRoute } from "@tanstack/react-router";
import { fetchWithTimeout, json } from "../../lib/server-utils.ts";

/**
 * Cached proxy for the public GitHub API.
 *
 * Pages never wait on this: the browser requests it after first paint, and the
 * UI shows a plain link to GitHub if it fails. Responses are cached for 30
 * minutes in memory and at the CDN. A stale copy is served if GitHub is
 * unreachable or rate-limited. Nothing is invented — only fields GitHub
 * returns are passed on. GITHUB_TOKEN is optional and only raises the rate limit.
 */

const USER = "Susanta2006";
const TTL_MS = 30 * 60_000;

export type RepoSummary = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
};

let cache: { at: number; repos: RepoSummary[] } | null = null;

type GhRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

async function load(): Promise<RepoSummary[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "susanta-banik-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetchWithTimeout(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
    { headers },
    6_000,
  );
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const data = (await res.json()) as GhRepo[];
  return data
    .filter((r) => !r.fork && !r.archived)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.updated_at) - Date.parse(a.updated_at),
    )
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count,
      language: r.language,
      topics: r.topics ?? [],
      updatedAt: r.updated_at,
    }));
}

export const Route = createFileRoute("/api/github")({
  server: {
    handlers: {
      GET: async () => {
        const now = Date.now();
        if (cache && now - cache.at < TTL_MS) {
          return json({ ok: true, stale: false, repos: cache.repos }, 200, {
            "Cache-Control":
              "public, s-maxage=1800, stale-while-revalidate=86400",
          });
        }
        try {
          const repos = await load();
          cache = { at: now, repos };
          return json({ ok: true, stale: false, repos }, 200, {
            "Cache-Control":
              "public, s-maxage=1800, stale-while-revalidate=86400",
          });
        } catch {
          if (cache) {
            return json({ ok: true, stale: true, repos: cache.repos }, 200, {
              "Cache-Control": "public, s-maxage=60",
            });
          }
          return json(
            { ok: false, error: "GitHub is unavailable right now." },
            502,
            { "Cache-Control": "no-store" },
          );
        }
      },
    },
  },
});
