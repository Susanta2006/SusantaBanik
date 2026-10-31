import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { BUSINESS, PROFILES, SITE } from "../data/site.ts";
import { Monogram } from "./SiteHeader.tsx";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const row = PROFILES.filter((p) => p.footer);
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram />
            <div>
              <p className="font-bold leading-tight">{SITE.name}</p>
              <p className="text-sm text-muted">{SITE.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted">
            {SITE.founderTitle}, {BUSINESS.name}. {SITE.location}.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Mail aria-hidden className="h-4 w-4" /> {SITE.email}
          </a>
        </div>

        <nav aria-label="Professional profiles">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {row.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex min-h-8 items-center gap-2 text-muted hover:text-fg"
                >
                  {p.id === "github" && (
                    <Github aria-hidden className="h-4 w-4" />
                  )}
                  {p.id === "linkedin" && (
                    <Linkedin aria-hidden className="h-4 w-4" />
                  )}
                  {p.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/"
                hash="contact"
                className="inline-flex min-h-8 items-center text-muted hover:text-fg"
              >
                All profiles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 pb-24 pt-5 text-xs sm:pb-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/privacy" className="hover:text-fg">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-fg">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
