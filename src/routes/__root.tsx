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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
      { title: "Susanta Banik | AI/ML Engineer, Data Scientist & Full Stack Developer" },
      {
        name: "description",
        content:
          "Official website of Susanta Banik — AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Dual-degree student at IIT Jodhpur and Techno College of Engineering Agartala.",
      },
      { name: "author", content: "Susanta Banik" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "theme-color", content: "#1a1a1a" },
      // Search-engine ownership verification — replace `content` values once
      // codes are issued by Google Search Console and Bing Webmaster Tools.
      { name: "google-site-verification", content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE" },
      { name: "msvalidate.01", content: "CB17D87FD9ADFFBBC69CD726C50C8E99" },
      { property: "og:title", content: "Susanta Banik — AI/ML Engineer & Researcher" },
      {
        property: "og:description",
        content:
          "Official site of Susanta Banik. AI/ML, Data Science, Full Stack Development, research, and projects.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Susanta Banik" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Susanta Banik — AI/ML Engineer & Researcher" },
      {
        name: "twitter:description",
        content:
          "Official site of Susanta Banik. AI/ML, Data Science, Full Stack Development, research, and projects.",
      },
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "#website",
              name: "Susanta Banik",
              url: "/",
              inLanguage: "en",
              author: { "@id": "#susanta-banik" },
              publisher: { "@id": "#susanta-banik" },
            },
            {
              "@type": "Person",
              "@id": "#susanta-banik",
              name: "Susanta Banik",
              alternateName: ["Susanta", "Susanta Banik"],
              url: "/",
              birthDate: "2006-10-20",
              nationality: "Indian",
              gender: "Male",
              jobTitle: [
                "AI/ML Engineer",
                "Data Scientist",
                "Full Stack Developer",
                "Researcher",
              ],
              description:
                "AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Dual-degree student at IIT Jodhpur (B.S. Applied AI & Data Science) and Techno College of Engineering Agartala (B.Tech AI & Data Science). Founder of Code with Fun Dev Hub.",
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Data Science",
                "Data Analytics",
                "Full Stack Development",
                "Python",
                "TensorFlow",
                "LLM Agents",
                "Web Development",
              ],
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "Indian Institute of Technology Jodhpur",
                  url: "https://www.iitj.ac.in/",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "Techno College of Engineering Agartala",
                },
              ],
              worksFor: {
                "@type": "Organization",
                name: "Code with Fun Dev Hub",
                url: "https://codewithfun-devhub.vercel.app/",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Professional inquiries",
                url: "/#contact",
                availableLanguage: ["English", "Bengali", "Hindi"],
              },
              makesOffer: [
                { "@type": "Offer", name: "AI / ML Solutions Development" },
                { "@type": "Offer", name: "Full Stack Web Application Development" },
                { "@type": "Offer", name: "Mobile-Ready PWA Development" },
                { "@type": "Offer", name: "Data Analytics & Power BI Dashboards" },
              ],
              sameAs: [
                "https://www.linkedin.com/in/susanta-banik",
                "https://github.com/Susanta2006",
                "https://x.com/SusantaBan21",
                "https://www.youtube.com/@CodeWithFun-life",
                "https://www.researchgate.net/profile/Susanta-Banik-4/research",
                "https://hackerrank.com/profile/susanta_company4/",
                "https://leetcode.com/u/Susanta_Banik/",
                "https://codewithfun-devhub.vercel.app/",
                "https://www.ijsr.net/getabstract.php?paperid=MR251206000138",
              ],
            },
          ],
        }),
      },
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
        <HeadContent />
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
