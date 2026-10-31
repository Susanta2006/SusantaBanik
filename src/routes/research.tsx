import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal.tsx";
import { PUBLICATIONS, doiUrl } from "../data/research.ts";
import { PROFILES, SITE } from "../data/site.ts";
import { IDS, abs, pageHead } from "../lib/seo.ts";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () =>
    pageHead({
      title: `Research — ${SITE.name}`,
      description:
        "Research by Susanta Banik on conversational agents and memory-conscious AI: a journal paper in IJSR and a Jarvis-v9 preprint.",
      path: "/research",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": PUBLICATIONS.map((p) => ({
          "@type": "ScholarlyArticle",
          headline: p.title,
          author: { "@id": IDS.person },
          datePublished: String(p.year),
          identifier: p.identifier,
          url: p.url,
          isPartOf: { "@type": "Periodical", name: p.venue },
          sameAs: [
            p.url,
            ...(p.doi ? [doiUrl(p.doi)] : []),
            ...(p.alsoOn?.map((a) => a.href) ?? []),
          ],
          mainEntityOfPage: abs("/research"),
        })),
      },
    }),
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent hover:underline";

function ResearchPage() {
  const profiles = PROFILES.filter((p) => p.group === "research");
  const published = PUBLICATIONS.filter((p) => p.type === "Journal paper");
  const preprints = PUBLICATIONS.filter((p) => p.type === "Preprint");
  return (
    <div className="wrap section">
      <Reveal>
        <h1 className="text-4xl md:text-5xl">Research</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          What I have investigated, documented and published. Built projects are
          on the Projects page.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="text-2xl">Published research</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Peer-reviewed or journal-published work.
        </p>
        <ul className="mt-6 grid gap-6">
          {published.map((p) => (
            <PubCard key={p.id} p={p} />
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-2xl">Preprints and manuscripts</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Shared before peer review. Not peer reviewed; findings may change.
        </p>
        <ul className="mt-6 grid gap-6">
          {preprints.map((p) => (
            <PubCard key={p.id} p={p} />
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-2xl">Independent research directions</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Ongoing questions without a published result yet.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          <li className="panel p-6">
            <p className="text-sm font-semibold text-cyan">In progress</p>
            <h3 className="mt-2 text-lg">
              Memory-conscious and compute-conscious AI
            </h3>
            <p className="mt-2 text-muted">
              Experimental architecture (QNME-omega) for AI/ML workflows on
              resource-constrained hardware. No benchmark results are published.
            </p>
          </li>
          <li className="panel p-6">
            <p className="text-sm font-semibold text-cyan">In progress</p>
            <h3 className="mt-2 text-lg">
              Conversational agents with persistent memory
            </h3>
            <p className="mt-2 text-muted">
              Follow-up work to the Jarvis case study and preprint, examining
              modular architecture and what memory changes in agent behaviour.
            </p>
          </li>
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-2xl">Follow the work</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Preprints are posted on ResearchGate first.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6">
          {profiles.map((p) => (
            <li key={p.id}>
              <a
                href={p.href}
                {...ext}
                rel="noopener noreferrer me"
                className={link}
              >
                {p.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function PubCard({ p }: { p: (typeof PUBLICATIONS)[number] }) {
  return (
    <li className="panel p-6 md:p-8">
      <p className="text-sm font-semibold text-accent">
        {p.type} · {p.year}
      </p>
      <h3 className="mt-2 text-2xl leading-snug md:text-[1.7rem]">{p.title}</h3>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-muted">Venue</dt>
          <dd className="mt-1">
            {p.venue}
            {p.detail ? `, ${p.detail}` : ""}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">{p.identifierLabel}</dt>
          <dd className="mt-1 break-all">{p.identifier}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">Author</dt>
          <dd className="mt-1">{SITE.name}</dd>
        </div>
      </dl>
      <p className="mt-5 max-w-3xl text-muted">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-x-6">
        <a href={p.url} {...ext} className={link}>
          {p.urlLabel} <ArrowUpRight aria-hidden className="h-4 w-4" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {p.doi && (
          <a href={doiUrl(p.doi)} {...ext} className={link}>
            DOI link <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {p.alsoOn?.map((a) => (
          <a key={a.href} href={a.href} {...ext} className={link}>
            Also on {a.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </li>
  );
}
