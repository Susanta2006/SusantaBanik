import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { GlobalErrorBoundary } from "../lib/branded-error-fallback";
import { installErrorReporter } from "../lib/error-reporter";
import { FONT_URL, THEME_BOOT_SCRIPT } from "../lib/theme.ts";
import { SiteHeader } from "../components/SiteHeader.tsx";
import { SiteFooter } from "../components/SiteFooter.tsx";
import { JarvisLauncher } from "../components/Jarvis.tsx";
import { SITE } from "../data/site.ts";

function NotFoundComponent() {
  return (
    <div className="wrap section text-center">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        That page doesn’t exist or has moved. The projects, research and contact
        sections are all on the home page.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Go to the home page
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="wrap section text-center">
      <h1 className="text-2xl">This page hit a problem</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Something went wrong while loading it. Try again, or head back to the
        home page.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
        <a href="/" className="btn btn-ghost">
          Home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE.name },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      {
        name: "theme-color",
        content: "#f5f7fc",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#060b18",
        media: "(prefers-color-scheme: dark)",
      },
      // Search-console ownership verification, carried over from the previous site.
      {
        name: "google-site-verification",
        content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE",
      },
      { name: "msvalidate.01", content: "CB17D87FD9ADFFBBC69CD726C50C8E99" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "48x48",
        href: "/favicon.ico",
      },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script sets the theme class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <HeadContent />
        <noscript>
          <link rel="stylesheet" href={FONT_URL} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Microsoft Clarity analytics (carried over from the previous site). Loaded after the page is idle so it never delays rendering. */
function useDeferredAnalytics() {
  useEffect(() => {
    const id = "xlt1yxwkyt";
    const load = () => {
      if (document.getElementById("clarity-script")) return;
      const w = window as unknown as Record<string, unknown>;
      w.clarity =
        w.clarity ||
        function (...a: unknown[]) {
          ((w.clarity as { q?: unknown[] }).q =
            (w.clarity as { q?: unknown[] }).q || []).push(a);
        };
      const s = document.createElement("script");
      s.id = "clarity-script";
      s.async = true;
      s.src = `https://www.clarity.ms/tag/${id}`;
      document.head.appendChild(s);
    };
    const run = () =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(load, { timeout: 4000 })
        : setTimeout(load, 2000);
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }, []);
}

function RootComponent() {
  useEffect(() => {
    installErrorReporter();
  }, []);
  useDeferredAnalytics();

  return (
    <GlobalErrorBoundary>
      <>
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <Outlet />
        </main>
        <SiteFooter />
        <JarvisLauncher />
      </>
    </GlobalErrorBoundary>
  );
}
