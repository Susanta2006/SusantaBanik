# Susanta Banik — AI Portfolio

Portfolio site for **Susanta Banik** — AI/ML engineer, full-stack developer, independent AI researcher, and founder of Shristi AI Web Creations™.
Tagline: **“Building Intelligence, thoughtfully.”**

Built on the existing stack (TanStack Start + React 19 + Tailwind CSS v4, deployed with Nitro's Vercel preset). The framework was kept; the design, data layer, Jarvis assistant, SEO and APIs were rebuilt.

## Quick start

```bash
npm install          # Node 20+ (tested on Node 22)
npm run dev          # http://localhost:3000 (Vite)
npm run build        # type-check + production build → .vercel/output
npm run preview      # serve the production build locally
npm test             # unit tests (registry + Jarvis grounding)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run generate:llms   # regenerate public/llms.txt from the data registries
```

Browser smoke tests (optional, Playwright is *not* a project dependency):

```bash
npm run build && npx vite preview --port 4173 &
NODE_PATH=$(npm root -g) node tests/e2e/smoke.cjs
```

## Deploy (Vercel)

1. Import the repo in Vercel. The Nitro `vercel` preset is already configured in `vite.config.ts`; no framework override needed.
2. Add the environment variables below (all optional; the site works without them and says so honestly).
3. Deploy. Then submit `https://susanta-banik.vercel.app/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Environment variables (see `.env.example`)

| Variable | Used by | Effect if missing |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | `/api/contact` | Form shows “not connected, please email …” — it never fakes success |
| `OPENROUTER_API_KEY`, `OPENROUTER_MODELS` | `/api/chat` | Jarvis answers directly from portfolio data and labels it |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | `/api/chat` | Same as above |
| `GITHUB_TOKEN` | `/api/github` | Optional; only raises GitHub's rate limit |

Never prefix these with `VITE_` — that would ship them to the browser. **Rotate the old Web3Forms key**: it was hard-coded in the previous source.

## Where to edit things

| To change… | Edit |
|---|---|
| Add / update a project | `src/data/projects.ts` (the carousel, /projects page, sitemap hints, JSON-LD, llms.txt and Jarvis all read it) |
| Publications | `src/data/research.ts` |
| Bio, links, services, education, skills, contact email | `src/data/site.ts` |
| Smaller archive projects | `src/data/archive.ts` |
| Colours / motion | `src/styles.css` (tokens at the top) |
| Jarvis behaviour | `src/lib/jarvis/prompt.ts`, `src/lib/jarvis/knowledge.ts` |

**Project rules:** set a URL only when it really exists. Use `repositoryStatus: "unpublished"` for work not yet on GitHub (QNME-omega, CampusCopilot) — never invent a link. The home carousel shows entries with `featured: true` (keep it to 4–5 live or public-source projects); everything else appears on `/projects`.

After editing data, run `npm test` and `npm run generate:llms`.

## Architecture

```
src/
  data/           site, projects, research, archive registries (single source of truth)
  lib/jarvis/     grounding: passages built from the registries, retrieval, prompt, offline answers
  lib/seo.ts      page head + JSON-LD (Person, Organization, WebSite, ScholarlyArticle)
  lib/theme.ts    pre-paint theme script (OS preference first, then saved choice)
  routes/         /, /projects, /research, /privacy, /terms, /sitemap.xml, /api/{chat,contact,github}
  components/     header, footer, hero/sections, carousel (native scroll-snap), Jarvis (lazy), forms
public/           robots.txt, llms.txt, manifest, favicon.ico (from the portrait), optimised images (AVIF/WebP/JPEG)
tests/            unit tests + e2e/smoke.cjs
docs/             AUDIT.md, TEST_REPORT.md
```

### Jarvis
Answers are grounded in passages generated from the same registries as the site. With a model key set, the server sends the question plus the most relevant passages to the model. With no key, or if the model fails, the server answers from the passages and shows a notice. If the server itself is unreachable, the browser answers from its bundled data. The chat panel is lazy-loaded on first open.

### Performance notes
Initial JS ≈ 139 KB gzip, CSS ≈ 7 KB gzip. Fonts load without blocking render. Analytics (Microsoft Clarity, carried over) loads after the page is idle. Hero portrait uses AVIF/WebP/JPEG with explicit dimensions and high fetch priority; all other images are lazy.

## Known limitations
See `docs/AUDIT.md` (decisions needing your confirmation) and `docs/TEST_REPORT.md` (what was and was not verified).
