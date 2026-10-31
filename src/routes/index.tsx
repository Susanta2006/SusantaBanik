import { createFileRoute } from "@tanstack/react-router";
import {
  AboutSection,
  ContactSection,
  FounderSection,
  Hero,
  ProjectsSection,
  ResearchPreview,
} from "../components/HomeSections.tsx";
import { SITE } from "../data/site.ts";
import {
  IDS,
  organizationLd,
  pageHead,
  personLd,
  websiteLd,
} from "../lib/seo.ts";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead({
      title: `${SITE.name} — AI/ML Engineer & AI Researcher`,
      description: SITE.metaDescription,
      path: "/",
      type: "profile",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          websiteLd(),
          {
            "@type": "ProfilePage",
            "@id": `${SITE.url}/#profile`,
            url: SITE.url,
            name: `${SITE.name} — portfolio`,
            mainEntity: { "@id": IDS.person },
            isPartOf: { "@id": IDS.website },
          },
          personLd(),
          organizationLd(),
        ],
      },
    }),
});

function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <FounderSection />
      <ResearchPreview />
      <AboutSection />
      <ContactSection />
    </>
  );
}
