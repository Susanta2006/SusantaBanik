import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "../data/site.ts";

/** Generated sitemap. Paths are joined without doubling slashes. */
const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/research", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PAGES.map(
          (e) =>
            `  <url>\n    <loc>${SITE.url}${e.path === "/" ? "/" : e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
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
