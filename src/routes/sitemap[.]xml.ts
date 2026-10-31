import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "../data/site.ts";

/** Generated sitemap. Paths are joined without doubling slashes. */
/** lastmod: the date each page's content last changed. Update when the page changes. */
const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: "2026-10-31" },
  {
    path: "/projects",
    changefreq: "weekly",
    priority: "0.9",
    lastmod: "2026-10-31",
  },
  {
    path: "/research",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: "2026-10-31",
  },
  {
    path: "/privacy",
    changefreq: "yearly",
    priority: "0.3",
    lastmod: "2026-10-30",
  },
  {
    path: "/terms",
    changefreq: "yearly",
    priority: "0.3",
    lastmod: "2026-10-30",
  },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PAGES.map((e) => {
          const loc = e.path === "/" ? `${SITE.url}/` : `${SITE.url}${e.path}`;
          const image =
            e.path === "/"
              ? `\n    <image:image>\n      <image:loc>${SITE.url}/images/portrait-800.jpg</image:loc>\n      <image:title>${SITE.name}</image:title>\n    </image:image>`
              : "";
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${image}\n  </url>`;
        });
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
