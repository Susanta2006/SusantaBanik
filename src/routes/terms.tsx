import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Susanta Banik" },
      {
        name: "description",
        content:
          "Terms of use for susantabanik.com — the official personal website and portfolio of Susanta Banik.",
      },
      { property: "og:title", content: "Terms & Conditions — Susanta Banik" },
      {
        property: "og:description",
        content: "Terms governing the use of Susanta Banik's official website.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <main className="container-prose py-20 max-w-3xl">
      <Link to="/" className="text-sm text-muted-foreground link-underline">
        ← Back to home
      </Link>
      <h1 className="font-display text-4xl mt-6 mb-2">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: {new Date().getFullYear()}
      </p>
      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl mb-2">1. About this site</h2>
          <p>
            This website is the official personal and professional portfolio of
            Susanta Banik (the &ldquo;Owner&rdquo;). It is provided for
            informational, educational, professional and showcase purposes.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">2. Acceptable use</h2>
          <p>
            You agree to use this website lawfully and not to attempt to disrupt,
            reverse-engineer, scrape at abusive rates, overload, or otherwise
            compromise the site, its forms, the embedded Jarvis assistant, or
            any linked service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">3. Intellectual property</h2>
          <p>
            All original content — including text, design, code samples, project
            descriptions, research summaries and branding — belongs to Susanta
            Banik unless otherwise credited. You may not republish, resell or
            redistribute this content without prior written permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">4. Services & engagements</h2>
          <p>
            Any freelance or consulting engagement requested through the contact
            form is subject to a separate written agreement. Submitting a
            message does not create a binding contract.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">5. External links</h2>
          <p>
            This site links to third-party platforms (GitHub, ResearchGate,
            LinkedIn, YouTube, X, Code with Fun Dev Hub, etc.). The Owner is
            not responsible for the content or practices of those sites.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">6. Disclaimer</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; without warranties of any
            kind. The Owner is not liable for any damages resulting from the use
            of this site or reliance on its content.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">7. Contact</h2>
          <p>
            For questions about these terms, please use the contact form on the
            homepage.
          </p>
        </section>
      </div>
    </main>
  );
}
