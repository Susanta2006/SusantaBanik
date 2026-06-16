import { createFileRoute, Link } from "@tanstack/react-router";

const RESEARCHGATE_URL =
  "https://www.researchgate.net/profile/Susanta-Banik-4/research";
const PAPER_URL =
  "https://www.ijsr.net/getabstract.php?paperid=MR251206000138";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () => ({
    meta: [
      { title: "Research — Susanta Banik | Published Work & Papers" },
      {
        name: "description",
        content:
          "Research and published papers by Susanta Banik — including 'Emergent Social Consciousness in a Minimalist Conversational Agent' (IJSR).",
      },
      { property: "og:title", content: "Research — Susanta Banik" },
      {
        property: "og:description",
        content:
          "Published papers and research by Susanta Banik, mirrored from ResearchGate and IJSR.",
      },
      { property: "og:url", content: "/research" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          headline:
            "Emergent Social Consciousness in a Minimalist Conversational Agent: A Case Study",
          author: { "@type": "Person", name: "Susanta Banik" },
          identifier: "MR251206000138",
          publisher: {
            "@type": "Organization",
            name: "International Journal of Science and Research (IJSR)",
          },
          url: PAPER_URL,
          sameAs: [RESEARCHGATE_URL, PAPER_URL],
        }),
      },
    ],
  }),
});

function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="rule-bottom">
        <div className="container-prose flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-lg">
            ← Susanta Banik
          </Link>
          <nav className="text-sm text-muted-foreground flex gap-6">
            <Link to="/projects">Projects</Link>
            <Link to="/research" className="text-foreground">Research</Link>
            <Link to="/" hash="contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="container-prose py-16 md:py-24">
        <p className="eyebrow">Research</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl">Published work.</h1>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          A summary of peer-reviewed and indexed research, mirrored from{" "}
          <a className="link-underline text-foreground" href={RESEARCHGATE_URL} target="_blank" rel="noopener noreferrer">
            ResearchGate
          </a>. Each entry links to the original venue of publication.
        </p>

        <article className="mt-12 rounded-xl border border-rule p-8 md:p-12">
          <p className="eyebrow">Paper · IJSR · 2025</p>
          <h2 className="mt-4 font-display text-2xl md:text-4xl leading-tight">
            Emergent Social Consciousness in a Minimalist Conversational Agent: A Case Study
          </h2>
          <dl className="mt-8 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="eyebrow">Paper ID</dt>
              <dd className="mt-1 font-mono">MR251206000138</dd>
            </div>
            <div>
              <dt className="eyebrow">Author</dt>
              <dd className="mt-1">Susanta Banik</dd>
            </div>
            <div>
              <dt className="eyebrow">Journal</dt>
              <dd className="mt-1">IJSR</dd>
            </div>
          </dl>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            A case study examining how minimal conversational architectures can exhibit
            emergent social behaviour — exploring the boundary between programmed response
            and apparent social awareness in lightweight agents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESEARCHGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Read on ResearchGate ↗
            </a>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm hover:bg-secondary transition"
            >
              View on IJSR ↗
            </a>
          </div>
        </article>
        <article className="mt-12 rounded-xl border border-rule p-8 md:p-12">
          <p className="eyebrow">Pre-print · ResearchGate · 2026</p>
          <h2 className="mt-4 font-display text-2xl md:text-4xl leading-tight">
            Jarvis-v9: A Continual-Learning Synthetic AGI
          </h2>
          <dl className="mt-8 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="eyebrow">Paper DOI</dt>
              <dd className="mt-1 font-mono">10.13140/RG.2.2.12547.05921</dd>
            </div>
            <div>
              <dt className="eyebrow">Author</dt>
              <dd className="mt-1">Susanta Banik</dd>
            </div>
          </dl>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            A Continual-Learning Synthetic AGI with Biologically-Inspired Generative Architecture, Persistent Memory, and Nine Cognitive Engines
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESEARCHGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Read on ResearchGate ↗
            </a>
          </div>
        </article>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl">In progress.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Ongoing work spans applied AI agents, conversational systems and educational
            tooling. New preprints are first posted on ResearchGate.
          </p>
          <a
            href={RESEARCHGATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm hover:bg-secondary transition"
          >
            Follow on ResearchGate ↗
          </a>
        </section>
      </main>
    </div>
  );
}
