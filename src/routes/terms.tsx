import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/LegalPage.tsx";
import { SITE } from "../data/site.ts";
import { pageHead } from "../lib/seo.ts";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () =>
    pageHead({
      title: `Terms & Conditions — ${SITE.name}`,
      description: "Terms for using Susanta Banik’s portfolio website.",
      path: "/terms",
    }),
});

function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="30 October 2026"
      sections={[
        {
          heading: "1. About this site",
          body: `This website is the official portfolio of ${SITE.name} (the “Owner”). It is provided for information, education and showcase purposes.`,
        },
        {
          heading: "2. Acceptable use",
          body: "Use the site lawfully. Do not attempt to disrupt it, overload it, scrape it at abusive rates, or compromise its forms, the Jarvis assistant or any linked service.",
        },
        {
          heading: "3. Intellectual property",
          body: "Original content on this site — text, design, code samples, project descriptions, research summaries and branding — belongs to the Owner unless credited otherwise. Do not republish, resell or redistribute it without written permission.",
        },
        {
          heading: "4. Services and engagements",
          body: "Any freelance or consulting engagement requested through this site is subject to a separate written agreement. Sending a message does not create a contract.",
        },
        {
          heading: "5. Project information",
          body: "Project descriptions state each project’s status. Experimental and research projects are not warranted for any particular use. The Medical AI System is not a clinically validated diagnostic tool, and BloodSignal does not guarantee blood availability.",
        },
        {
          heading: "6. External links",
          body: "This site links to third-party platforms such as GitHub, ResearchGate, LinkedIn and YouTube. The Owner is not responsible for their content or practices.",
        },
        {
          heading: "7. Disclaimer",
          body: "The site is provided “as is”, without warranties of any kind. The Owner is not liable for damages arising from its use or from reliance on its content.",
        },
        {
          heading: "8. Contact",
          body: `Questions about these terms: ${SITE.email}.`,
        },
      ]}
    />
  );
}
