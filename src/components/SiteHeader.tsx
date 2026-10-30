import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "../data/site.ts";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-lg font-extrabold ${className}`}
    >
      S<span className="text-accent">B</span>
    </span>
  );
}

/** "/#projects" → home with a hash; "/research" → a normal route. */
export function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("/#")) {
    return (
      <Link
        to="/"
        hash={href.slice(2)}
        className={className}
        onClick={onClick}
        activeOptions={{ exact: true, includeHash: true }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to={href as "/research"}
      className={className}
      onClick={onClick}
      activeProps={{ "aria-current": "page" }}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 font-bold"
          aria-label={`${SITE.name} — home`}
        >
          <Monogram />
          <span className="truncate">{SITE.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[.95rem] font-medium text-muted md:flex"
        >
          {NAV.filter((n) => n.label !== "Contact").map((n) => (
            <NavLink
              key={n.href}
              href={n.href}
              className="hover:text-fg aria-[current=page]:text-fg"
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="contact"
            className="btn btn-primary hidden min-h-10 px-4 py-2 text-sm md:inline-flex"
          >
            Contact
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X aria-hidden className="h-5 w-5" />
            ) : (
              <Menu aria-hidden className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-bg md:hidden"
        >
          <ul className="wrap flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 py-3 font-medium"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
