import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect } from "react";
import appCss from "../styles.css?url";
import { GlobalErrorBoundary } from "../lib/branded-error-fallback";
import { installErrorReporter } from "../lib/error-reporter";
import { ErrorComponentProps } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl"
        >
          SB
        </div>
        <p className="mb-1 font-serif text-base text-muted-foreground">Susanta Banik</p>
        <h1 className="text-6xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 text-lg font-medium text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl"
        >
          SB
        </div>
        <p className="mb-1 font-serif text-base text-muted-foreground">Susanta Banik</p>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page is taking a moment
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something briefly went wrong. The site is fine — please try again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "title", content: "Susanta Banik | AI Engineer, Researcher & Founder" },
      {
        name: "description",
        content:
          "Portfolio of Susanta Banik — AI/ML engineer, full-stack developer, independent researcher, and founder of Shristi AI Web Creations™.",
      },
      { name: "author", content: "Susanta Banik" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "theme-color", content: "#1a1a1a" },
      // Search-engine ownership verification — replace `content` values once
      // codes are issued by Google Search Console and Bing Webmaster Tools.
      { name: "google-site-verification", content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE" },
      { name: "msvalidate.01", content: "CB17D87FD9ADFFBBC69CD726C50C8E99" },
      { property: "og:title", content: "Susanta Banik — Building Intelligence, thoughtfully." },
      {
        property: "og:description",
        content:
          "AI/ML engineering, full-stack development, independent research, and practical digital products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Susanta Banik" },
      { property: "og:url", content: "https://susanta-banik.vercel.app" },

      // 🌟 OpenGraph Profile Image Properties (LinkedIn uses this)
      { property: "og:image", content: "https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Susanta Banik — AI Developer Portfolio Preview" },
      
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Susanta Banik — Building Intelligence, thoughtfully." },
      {
        name: "twitter:description",
        content:
          "AI/ML engineering, full-stack development, independent research, and practical digital products.",
      },
      { name: "twitter:image", content: "https://susanta-banik.vercel.app/images/susanta-banik-fourth.jpg" },
      
      { name: "linkedin:card", content: "summary_large_image" },
      { name: "linkedin:title", content: "Susanta Banik — Building Intelligence, thoughtfully." },
      {
        name: "linkedin:description",
        content:
          "AI/ML engineering, full-stack development, independent research, and practical digital products.",
      },
      { name: "linkedin:image", content: "https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg" },

      
      { name: "google:card", content: "summary_large_image" },
      { name: "google:title", content: "Susanta Banik — Building Intelligence, thoughtfully." },
      {
        name: "google:description",
        content:
          "AI/ML engineering, full-stack development, independent research, and practical digital products.",
      },
      { name: "google:image", content: "https://susanta-banik.vercel.app/images/susanta-banik-fifth.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
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
    <html lang="en">
      <head>
        <title>Susanta Banik — Building Intelligence, thoughtfully.</title>
        <HeadContent />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xlt1yxwkyt");
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    installErrorReporter();
  }, []);

  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
