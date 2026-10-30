import { SITE, BUSINESS, PROFILES, SERVICES } from "../data/site.ts";

export const PORTRAIT_PATH = "/images/portrait-800.jpg";
export const OG_IMAGE = "/images/og.jpg";

export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url}${path === "/" ? "" : path}`;
}

export const IDS = {
  person: `${SITE.url}/#person`,
  org: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
};

/** Escape "<" so JSON-LD can never close its own <script> tag. */
export function ldString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const personProfiles = PROFILES.filter(
  (p) => p.group !== "business" && p.id !== "devhub",
).map((p) => p.href);

export function personLd() {
  return {
    "@type": "Person",
    "@id": IDS.person,
    name: SITE.name,
    url: SITE.url,
    image: abs(PORTRAIT_PATH),
    email: `mailto:${SITE.email}`,
    jobTitle: SITE.founderTitle,
    description: SITE.metaDescription,
    worksFor: { "@id": IDS.org },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agartala",
      addressRegion: "Tripura",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Artificial intelligence",
      "Machine learning",
      "Large language model applications",
      "Retrieval-augmented generation",
      "Full-stack web development",
    ],
    knowsLanguage: [...SITE.languages],
    sameAs: personProfiles,
  };
}

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": IDS.org,
    name: BUSINESS.plainName,
    alternateName: BUSINESS.name,
    url: SITE.url,
    description: BUSINESS.legalDescription,
    founder: { "@id": IDS.person },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agartala",
      addressRegion: "Tripura",
      addressCountry: "IN",
    },
    email: SITE.email,
    sameAs: [BUSINESS.linkedin],
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en",
    publisher: { "@id": IDS.person },
  };
}

type HeadInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  jsonLd?: unknown;
  image?: string;
};

/** Standard per-page head: title, description, canonical, Open Graph, Twitter and optional JSON-LD. */
export function pageHead({
  title,
  description,
  path,
  type = "website",
  jsonLd,
  image = OG_IMAGE,
}: HeadInput) {
  const url = abs(path);
  const img = abs(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} — ${SITE.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: ldString(jsonLd) }]
      : [],
  };
}
