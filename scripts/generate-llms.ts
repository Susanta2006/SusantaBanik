// Generates public/llms.txt from the data registries. Run: npm run generate:llms
import { SITE, BUSINESS, PROFILES, SERVICES } from "../src/data/site.ts";
import {
  PROJECTS,
  STATUS_LABEL,
  repositoryNote,
} from "../src/data/projects.ts";
import { PUBLICATIONS, doiUrl } from "../src/data/research.ts";
import { writeFileSync } from "node:fs";

const lines = [];
lines.push(`# ${SITE.name}`, "");
lines.push(
  `> ${SITE.roles.join(", ")}. ${SITE.founderTitle} of ${BUSINESS.name}, based in ${SITE.location}. "${SITE.tagline}"`,
  "",
);
lines.push(
  "This file is a concise, human-readable summary for language-model tools. It is not an indexing guarantee. Statuses below are deliberate: experimental and in-development work is not presented as finished or proven.",
  "",
);
lines.push(
  "## Pages",
  `- [Home](${SITE.url}/): overview, projects, founder section, contact`,
  `- [Projects](${SITE.url}/projects): every project with status and real links`,
  `- [Research](${SITE.url}/research): journal paper and preprint`,
  "",
);
lines.push("## Projects");
for (const p of PROJECTS) {
  const links = [
    p.demoUrl && `demo ${p.demoUrl}`,
    p.repositoryUrl && `repo ${p.repositoryUrl}`,
    p.publicationUrl && `paper ${p.publicationUrl}`,
    repositoryNote(p),
  ]
    .filter(Boolean)
    .join("; ");
  lines.push(
    `- **${p.name}** (${STATUS_LABEL[p.status]}): ${p.summary}${p.caution ? ` Caution: ${p.caution}` : ""}${links ? ` [${links}]` : ""}`,
  );
}
lines.push("", "## Research");
for (const p of PUBLICATIONS)
  lines.push(
    `- ${p.type}: "${p.title}", ${p.venue}${p.detail ? `, ${p.detail}` : `, ${p.year}`}. ${p.identifierLabel}: ${p.identifier}. ${p.doi ? doiUrl(p.doi) : p.url}`,
  );
lines.push(
  "",
  `## Business`,
  `- ${BUSINESS.name}: ${BUSINESS.legalDescription}`,
);
for (const s of SERVICES) lines.push(`- Service: ${s.title}`);
lines.push("", "## Profiles");
for (const p of PROFILES) lines.push(`- ${p.label}: ${p.href}`);
lines.push("", "## Contact", `- ${SITE.email}`, `- ${SITE.url}/#contact`, "");
writeFileSync(new URL("../public/llms.txt", import.meta.url), lines.join("\n"));
console.log("wrote public/llms.txt");
