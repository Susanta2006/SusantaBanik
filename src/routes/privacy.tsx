import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/LegalPage.tsx";
import { SITE } from "../data/site.ts";
import { pageHead } from "../lib/seo.ts";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () =>
    pageHead({
      title: `Privacy Policy — ${SITE.name}`,
      description:
        "How this portfolio handles contact messages, the Jarvis assistant, analytics and hosting logs.",
      path: "/privacy",
    }),
});

function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="30 October 2026"
      sections={[
        {
          heading: "1. Who runs this site",
          body: `This site is operated by ${SITE.name} as a personal portfolio and the website of Shristi AI Web Creations™. Only the information needed to answer your messages is collected.`,
        },
        {
          heading: "2. Contact form",
          body: "Your name, email address, subject and message are sent from this site’s server to Web3Forms, a form-delivery service, which forwards them to a private inbox. Your email address is used only to reply to you. It is not sold, shared or added to a mailing list.",
        },
        {
          heading: "3. Jarvis assistant",
          body: "Questions you type into Jarvis are processed by this site’s server and, when a live AI model is connected, sent to the AI provider that generates the reply (currently OpenRouter or Google Gemini, depending on configuration). This site does not store conversations. Please do not enter sensitive personal information.",
        },
        {
          heading: "4. Analytics and cookies",
          body: "This site uses Microsoft Clarity to understand how pages are used (for example clicks and scrolling). Clarity may set cookies and record anonymised interaction data. It loads after the page has finished loading. Your light or dark theme choice is saved in your browser’s local storage. No advertising cookies are used.",
        },
        {
          heading: "5. Hosting logs",
          body: "The hosting provider may keep short-lived access logs (IP address, browser, time) for security and abuse prevention.",
        },
        {
          heading: "6. Your choices",
          body: `To ask for a message you sent to be deleted, email ${SITE.email}. Reasonable requests will be actioned promptly.`,
        },
        {
          heading: "7. Changes",
          body: "This policy may change as the site changes. The date above shows the current version.",
        },
      ]}
    />
  );
}
