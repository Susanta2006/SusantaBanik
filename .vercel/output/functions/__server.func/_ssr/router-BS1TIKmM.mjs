import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GITHUB_URL } from "./projects-hA7X9cIt.mjs";
import { n as RESEARCHGATE_URL, t as PAPER_URL } from "./research-C4eaT-3I.mjs";
import { n as installErrorReporter } from "./error-reporter-CmAk3SQT.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BS1TIKmM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-uAep1is3.css";
var AUTO_RELOAD_SECONDS = 15;
/**
* Branded SB recovery screen used by:
*  - Router defaultErrorComponent (post-dispatch render errors)
*  - <GlobalErrorBoundary /> (anything that escapes route boundaries)
*  - <SkeletonWithTimeout /> when loading exceeds its budget
*  - window.onerror / unhandledrejection swap-in (catastrophic client crashes)
*
* Dependency-free beyond React + Tailwind tokens so it can render even when
* feature code is broken. Includes a Retry button and an auto-reload
* countdown so a stuck visitor recovers without interaction.
*/
function BrandedErrorFallback({ onRetry, autoReload = true, title = "This page is taking a moment", message = "Something briefly went wrong. The site is fine — please try again." }) {
	const [secondsLeft, setSecondsLeft] = import_react.useState(AUTO_RELOAD_SECONDS);
	const handleRetry = import_react.useCallback(() => {
		if (onRetry) onRetry();
		else if (typeof window !== "undefined") window.location.reload();
	}, [onRetry]);
	import_react.useEffect(() => {
		if (!autoReload || typeof window === "undefined") return;
		const tick = window.setInterval(() => {
			setSecondsLeft((s) => s <= 1 ? 0 : s - 1);
		}, 1e3);
		const reload = window.setTimeout(() => {
			handleRetry();
		}, AUTO_RELOAD_SECONDS * 1e3);
		return () => {
			window.clearInterval(tick);
			window.clearTimeout(reload);
		};
	}, [autoReload, handleRetry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alert",
		"aria-live": "assertive",
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl",
					children: "SB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-serif text-base text-muted-foreground",
					children: "Susanta Banik"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleRetry,
						className: "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				}),
				autoReload && secondsLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					"aria-live": "polite",
					children: [
						"Auto-reloading in ",
						secondsLeft,
						"s…"
					]
				}) : null
			]
		})
	});
}
/**
* Last-resort React boundary wrapping the router output. Route-level
* boundaries handle most cases; this catches anything that escapes them
* (provider crashes, event-handler re-renders that throw, etc.).
*/
var GlobalErrorBoundary = class extends import_react.Component {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error) {
		console.error(error);
	}
	handleReset = () => {
		this.setState({ hasError: false });
		if (typeof window !== "undefined") window.location.reload();
	};
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedErrorFallback, { onRetry: this.handleReset });
		return this.props.children;
	}
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl",
					children: "SB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-serif text-base text-muted-foreground",
					children: "Susanta Banik"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-6xl font-semibold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-lg font-medium text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl",
					children: "SB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-serif text-base text-muted-foreground",
					children: "Susanta Banik"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page is taking a moment"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something briefly went wrong. The site is fine — please try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "title",
				content: "Susanta Banik | AI/ML Engineer, Data Scientist, AGI Researcher & Full Stack Developer"
			},
			{
				name: "description",
				content: "Official website of Susanta Banik — AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Dual-degree student at IIT Jodhpur and Techno College of Engineering Agartala."
			},
			{
				name: "author",
				content: "Susanta Banik"
			},
			{
				name: "robots",
				content: "index,follow,max-image-preview:large"
			},
			{
				name: "theme-color",
				content: "#1a1a1a"
			},
			{
				name: "google-site-verification",
				content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE"
			},
			{
				name: "msvalidate.01",
				content: "CB17D87FD9ADFFBBC69CD726C50C8E99"
			},
			{
				property: "og:title",
				content: "Susanta Banik — AI/ML Engineer, AGI Researcher & QNME-omega Inventor"
			},
			{
				property: "og:description",
				content: "Official site of Susanta Banik, the AGI Researcher, AI/ML engineer, Inventor of QNME & Full Stack developer"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Susanta Banik"
			},
			{
				property: "og:url",
				content: "https://susanta-banik.vercel.app"
			},
			{
				property: "og:image",
				content: "https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: "Susanta Banik — AI Developer Portfolio Preview"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Susanta Banik — AI/ML Engineer, AGI Researcher & QNME-omega Inventor"
			},
			{
				name: "twitter:description",
				content: "Official site of Susanta Banik, the AGI Researcher, AI/ML engineer, Inventor of QNME & Full Stack developer"
			},
			{
				name: "twitter:image",
				content: "https://susanta-banik.vercel.app/images/susanta-banik-fourth.jpg"
			},
			{
				name: "linkedin:card",
				content: "summary_large_image"
			},
			{
				name: "linkedin:title",
				content: "Susanta Banik — AI/ML Engineer, AGI Researcher & QNME-omega Inventor"
			},
			{
				name: "linkedin:description",
				content: "Official site of Susanta Banik, the AGI Researcher, AI/ML engineer, Inventor of QNME & Full Stack developer"
			},
			{
				name: "linkedin:image",
				content: "https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg"
			},
			{
				name: "google:card",
				content: "summary_large_image"
			},
			{
				name: "google:title",
				content: "Susanta Banik — AI/ML Engineer, AGI Researcher & QNME-omega Inventor"
			},
			{
				name: "google:description",
				content: "Official site of Susanta Banik, the AGI Researcher, AI/ML engineer, Inventor of QNME & Full Stack developer"
			},
			{
				name: "google:image",
				content: "https://susanta-banik.vercel.app/images/susanta-banik-fifth.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				href: "/favicon.ico"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			},
			{
				rel: "manifest",
				href: "/site.webmanifest"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@graph": [{
					"@type": "WebSite",
					"@id": "#website",
					name: "Susanta Banik",
					url: "https://susanta-banik.vercel.app",
					inLanguage: "en",
					author: { "@id": "#susanta-banik" },
					publisher: { "@id": "#susanta-banik" }
				}, {
					"@type": "Person",
					"@id": "#susanta-banik",
					name: "Susanta Banik",
					"image": [
						"https://susanta-banik.vercel.app/images/susanta-banik-profile.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-github.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-third.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-fourth.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-fifth.png",
						"https://susanta-banik.vercel.app/images/susanta-banik-sixth.jpg"
					],
					alternateName: ["Susanta", "Susanta Banik"],
					url: "https://susanta-banik.vercel.app/",
					birthDate: "2006-10-20",
					nationality: "Indian",
					gender: "Male",
					birthPlace: {
						"@type": "Place",
						name: "Agartala, Tripura, India"
					},
					parent: [{
						"@type": "Person",
						description: "Father of Susanta Banik",
						name: "Mr. Sunil Banik"
					}, {
						"@type": "Person",
						description: "Mother of Susanta Banik",
						name: "Mrs. Sukla Banik"
					}],
					description: "AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Dual-degree student pursuing B.S. in Applied AI & Data Science at IIT Jodhpur and B.Tech in AI & Data Science at Techno College of Engineering Agartala. Inventor of QNME-omega, a CPU-RAM Equalizer, that helps to train any large dataset into low specs devices easily.",
					jobTitle: [
						"Student",
						"AI/ML Engineer",
						"Data Scientist",
						"Full Stack Developer",
						"Researcher",
						"Inventor",
						"Cyber security"
					],
					knowsAbout: [
						"Artificial Intelligence",
						"Machine Learning",
						"Data Science",
						"Data Analytics",
						"Researcher",
						"Full Stack Development",
						"Python",
						"TensorFlow",
						"Web Development",
						"QNME-omega (CPU-RAM Equalizer)",
						"Algorithm Optimization",
						"Competitive Programming",
						"Data Structures and Algorithms (DSA)",
						"Academic Publishing"
					],
					alumniOf: [{
						"@type": "CollegeOrUniversity",
						name: "Indian Institute of Technology Jodhpur",
						url: "https://www.iitj.ac.in/"
					}, {
						"@type": "CollegeOrUniversity",
						name: "Techno College of Engineering Agartala",
						url: "https://tiaedu.org/"
					}],
					worksFor: [
						{
							"@type": "Organization",
							name: "CodeWithFun-life",
							description: "Youtube channel of Susanta Banik",
							url: "https://www.youtube.com/@CodeWithFun-life"
						},
						{
							"@type": "Organization",
							name: "CodeWithFun-devhub",
							description: "Bookstore of Susanta Banik with affordable price",
							url: "https://codewithfun-devhub.vercel.app"
						},
						{
							"@type": "Organization",
							name: "Campuscopilot",
							description: "Education platform of Susanta Banik built for higher studies not for school level students."
						}
					],
					contactPoint: {
						"@type": "ContactPoint",
						contactType: "Professional inquiries",
						url: "/#contact",
						availableLanguage: [
							"English",
							"Bengali",
							"Hindi"
						]
					},
					makesOffer: [
						{
							"@type": "Offer",
							name: "AI / ML Solutions Development"
						},
						{
							"@type": "Offer",
							name: "Full Stack Web Application Development"
						},
						{
							"@type": "Offer",
							name: "Mobile-Ready PWA Development"
						},
						{
							"@type": "Offer",
							name: "Data Analytics & Power BI Dashboards"
						}
					],
					sameAs: [
						"https://www.linkedin.com/in/susanta-banik",
						"https://susanta-banik.vercel.app",
						"https://github.com/Susanta2006",
						"https://x.com/SusantaBan21",
						"https://www.youtube.com/@CodeWithFun-life",
						"https://www.researchgate.net/profile/Susanta-Banik-4/research",
						"https://hackerrank.com/profile/susanta_company4",
						"https://leetcode.com/u/Susanta_Banik",
						"https://codewithfun-devhub.vercel.app",
						"https://www.ijsr.net/getabstract.php?paperid=MR251206000138"
					]
				}]
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Susanta Banik | AI Engineer Researcher & Inventor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "text/javascript",
				dangerouslySetInnerHTML: { __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xlt1yxwkyt");
            ` }
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	(0, import_react.useEffect)(() => {
		installErrorReporter();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	}) });
}
var $$splitComponentImporter$4 = () => import("./terms-BbGd52oP.mjs");
var Route$6 = createFileRoute("/terms")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({
		meta: [
			{ title: "Terms & Conditions — Susanta Banik" },
			{
				name: "description",
				content: "Terms of use for susantabanik.com — the official personal website and portfolio of Susanta Banik."
			},
			{
				property: "og:title",
				content: "Terms & Conditions — Susanta Banik"
			},
			{
				property: "og:description",
				content: "Terms governing the use of Susanta Banik's official website."
			}
		],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	})
});
var BASE_URL = "https://susanta-banik.vercel.app/";
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/projects",
			changefreq: "weekly",
			priority: "0.9"
		},
		{
			path: "/research",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/terms",
			changefreq: "yearly",
			priority: "0.3"
		},
		{
			path: "/privacy",
			changefreq: "yearly",
			priority: "0.3"
		}
	].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$3 = () => import("./research-D1nq5FII.mjs");
var Route$4 = createFileRoute("/research")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({
		meta: [
			{ title: "Research — Susanta Banik | Published Work & Papers" },
			{
				name: "description",
				content: "Research and published papers by Susanta Banik — including 'Emergent Social Consciousness in a Minimalist Conversational Agent' (IJSR)."
			},
			{
				property: "og:title",
				content: "Research — Susanta Banik"
			},
			{
				property: "og:description",
				content: "Published papers and research by Susanta Banik, mirrored from ResearchGate and IJSR."
			},
			{
				property: "og:url",
				content: "/research"
			},
			{
				property: "og:type",
				content: "article"
			}
		],
		links: [{
			rel: "canonical",
			href: "/research"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ScholarlyArticle",
				headline: "Emergent Social Consciousness in a Minimalist Conversational Agent: A Case Study",
				author: {
					"@type": "Person",
					name: "Susanta Banik"
				},
				identifier: "MR251206000138",
				publisher: {
					"@type": "Organization",
					name: "International Journal of Science and Research (IJSR)"
				},
				url: PAPER_URL,
				sameAs: [RESEARCHGATE_URL, PAPER_URL]
			})
		}]
	})
});
var $$splitComponentImporter$2 = () => import("./projects-DSH4ox35.mjs");
var Route$3 = createFileRoute("/projects")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({
		meta: [
			{ title: "Projects — Susanta Banik | GitHub Portfolio" },
			{
				name: "description",
				content: "Open-source projects by Susanta Banik — AI/ML, data science and full stack work pulled live from github.com/Susanta2006."
			},
			{
				property: "og:title",
				content: "Projects — Susanta Banik"
			},
			{
				property: "og:description",
				content: "Live portfolio of Susanta Banik's GitHub projects across AI, data science and full stack engineering."
			},
			{
				property: "og:url",
				content: "/projects"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: "/projects"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "CollectionPage",
				name: "Projects by Susanta Banik",
				url: "/projects",
				about: {
					"@type": "Person",
					name: "Susanta Banik",
					sameAs: [GITHUB_URL]
				}
			})
		}]
	})
});
var $$splitComponentImporter$1 = () => import("./privacy-DqSyE7xJ.mjs");
var Route$2 = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({
		meta: [
			{ title: "Privacy Policy — Susanta Banik" },
			{
				name: "description",
				content: "How Susanta Banik's official website handles your data, contact messages and chat with the Jarvis assistant."
			},
			{
				property: "og:title",
				content: "Privacy Policy — Susanta Banik"
			},
			{
				property: "og:description",
				content: "Privacy practices for Susanta Banik's personal website."
			}
		],
		links: [{
			rel: "canonical",
			href: "/privacy"
		}]
	})
});
var $$splitComponentImporter = () => import("./routes-duiLvCgY.mjs");
var Route$1 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({
		title: "Susanta Banik | AI Engineer Researcher & Inventor",
		meta: [
			{
				property: "og:url",
				content: "https://susanta-banik.vercel.app"
			},
			{
				name: "google-site-verification",
				content: "8o9Dm94uzc3XtGBMijfLCeGXH8k0MQgKiY1eZskSbjE"
			},
			{
				name: "msvalidate.01",
				content: "CB17D87FD9ADFFBBC69CD726C50C8E99"
			},
			{
				name: "description",
				content: "Official portfolio of Susanta Banik: AI/ML Engineer, Data Scientist, Full Stack Developer, and Researcher at IIT Jodhpur and Techno College of Engineering Agartala."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://susanta-banik.vercel.app"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ProfilePage",
				mainEntity: {
					"@type": "Person",
					"@id": "#susanta-banik",
					name: "Susanta Banik",
					"image": [
						"https://susanta-banik.vercel.app/images/susanta-banik-profile.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-linkedin.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-github.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-third.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-fourth.jpg",
						"https://susanta-banik.vercel.app/images/susanta-banik-fifth.png",
						"https://susanta-banik.vercel.app/images/susanta-banik-sixth.jpg"
					],
					url: "https://susanta-banik.vercel.app",
					description: "AI Engineer, Data Scientist, Full Stack Developer, Inventor and Researcher. Dual-degree student pursuing B.S. in Applied AI & Data Science at IIT Jodhpur and B.Tech in AI & Data Science at Techno College of Engineering Agartala. Inventor of QNME-omega, a CPU-RAM Equalizer, that helps to train any large dataset into low specs devices easily.",
					jobTitle: [
						"Student",
						"AI/ML Engineer",
						"Data Scientist",
						"Full Stack Developer",
						"Researcher",
						"Inventor",
						"Cyber security"
					],
					birthDate: "2006-10-20",
					birthPlace: {
						"@type": "Place",
						name: "Agartala, Tripura, India"
					},
					parent: [{
						"@type": "Person",
						description: "Father of Susanta Banik",
						name: "Mr. Sunil Banik"
					}, {
						"@type": "Person",
						description: "Mother of Susanta Banik",
						name: "Mrs. Sukla Banik"
					}],
					memberOf: [
						{
							"@type": "Organization",
							name: "CodeWithFun-life",
							description: "Youtube channel of Susanta Banik",
							url: "https://www.youtube.com/@CodeWithFun-life"
						},
						{
							"@type": "Organization",
							name: "CodeWithFun-devhub",
							description: "Bookstore of Susanta Banik with affordable price",
							url: "https://codewithfun-devhub.vercel.app"
						},
						{
							"@type": "Organization",
							name: "Campuscopilot",
							description: "Education platform of Susanta Banik built for higher studies not for school level students."
						}
					],
					knowsAbout: [
						"Artificial Intelligence",
						"Machine Learning",
						"Data Science",
						"Data Analytics",
						"Researcher",
						"Full Stack Development",
						"Python",
						"TensorFlow",
						"Web Development",
						"QNME-omega (CPU-RAM Equalizer)",
						"Algorithm Optimization",
						"Competitive Programming",
						"Data Structures and Algorithms (DSA)",
						"Academic Publishing"
					],
					alumniOf: [{
						"@type": "CollegeOrUniversity",
						name: "Indian Institute of Technology Jodhpur",
						url: "https://www.iitj.ac.in/"
					}, {
						"@type": "CollegeOrUniversity",
						name: "Techno College of Engineering Agartala",
						url: "https://tiaedu.org/"
					}],
					contactPoint: {
						"@type": "ContactPoint",
						contactType: "Professional inquiries",
						url: "/#contact",
						availableLanguage: [
							"English",
							"Bengali",
							"Hindi"
						]
					},
					makesOffer: [
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "AI / ML Solutions",
								description: "Custom ML models, LLM agents, RAG apps, forecasting and AI features inside existing products."
							}
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Full Stack Web Applications",
								description: "End-to-end websites and web apps — landing pages, dashboards, portals, e-commerce, internal tools."
							}
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Mobile-Ready PWA Development",
								description: "Responsive, installable PWAs and mobile-first builds that feel native on every device."
							}
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Data & Analytics",
								description: "Power BI dashboards, ETL pipelines and statistical reporting."
							}
						}
					],
					sameAs: [
						"https://www.linkedin.com/in/susanta-banik",
						"https://github.com/Susanta2006",
						"https://scholar.google.com/citations?user=CBZeE3wAAAAJ&hl=en",
						"https://x.com/SusantaBan21",
						"https://www.youtube.com/@CodeWithFun-life",
						"https://www.researchgate.net/profile/Susanta-Banik-4/research",
						"https://hackerrank.com/profile/susanta_company4",
						"https://leetcode.com/u/Susanta_Banik",
						"https://codewithfun-devhub.vercel.app",
						"https://www.ijsr.net/getabstract.php?paperid=MR251206000138"
					]
				}
			})
		}, {
			type: "text/javascript",
			children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xlt1yxwkyt");`
		}]
	})
});
var BURST_WINDOW_MS = 1e4;
var BURST_MAX = 5;
var MINUTE_WINDOW_MS = 6e4;
var MINUTE_MAX = 15;
var HOUR_WINDOW_MS = 60 * 6e4;
var HOUR_MAX = 120;
var BAN_MS = 15 * 6e4;
var BAN_THRESHOLD = 3;
var ipStore = /* @__PURE__ */ new Map();
function pruneIpStore(now) {
	if (ipStore.size < 5e3) return;
	for (const [k, v] of ipStore) {
		if (v.bannedUntil > now) continue;
		if (v.hits.length === 0 || now - v.hits[v.hits.length - 1] > HOUR_WINDOW_MS) ipStore.delete(k);
	}
}
function checkRate(ip) {
	const now = Date.now();
	const entry = ipStore.get(ip) ?? {
		hits: [],
		offences: 0,
		bannedUntil: 0
	};
	if (entry.bannedUntil > now) {
		ipStore.set(ip, entry);
		return {
			ok: false,
			reason: "banned"
		};
	}
	entry.hits = entry.hits.filter((t) => now - t < HOUR_WINDOW_MS);
	const burst = entry.hits.filter((t) => now - t < BURST_WINDOW_MS).length;
	const minute = entry.hits.filter((t) => now - t < MINUTE_WINDOW_MS).length;
	const hour = entry.hits.length;
	if (burst >= BURST_MAX || minute >= MINUTE_MAX || hour >= HOUR_MAX) {
		entry.offences += 1;
		if (entry.offences >= BAN_THRESHOLD) {
			entry.bannedUntil = now + BAN_MS;
			entry.offences = 0;
		}
		ipStore.set(ip, entry);
		pruneIpStore(now);
		return {
			ok: false,
			reason: entry.bannedUntil > now ? "banned" : "limited"
		};
	}
	entry.hits.push(now);
	entry.offences = Math.max(0, entry.offences - 1);
	ipStore.set(ip, entry);
	pruneIpStore(now);
	return { ok: true };
}
var MAX_CONCURRENT = 6;
var inFlight = 0;
var FREE_MODELS = [
	"meta-llama/llama-3.3-8b-instruct:free",
	"google/gemma-2-9b-it:free",
	"mistralai/mistral-7b-instruct:free",
	"qwen/qwen-2.5-7b-instruct:free",
	"nousresearch/hermes-3-llama-3.1-8b:free"
];
var modelStats = /* @__PURE__ */ new Map();
var PER_MODEL_DAILY_CAP = 30;
var COOLDOWN_MS = 10 * 6e4;
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function getStat(model) {
	const t = today();
	const s = modelStats.get(model);
	if (!s || s.day !== t) {
		const fresh = {
			day: t,
			count: 0,
			cooldownUntil: 0
		};
		modelStats.set(model, fresh);
		return fresh;
	}
	return s;
}
function availableModels() {
	const now = Date.now();
	return FREE_MODELS.filter((m) => {
		const s = getStat(m);
		return s.cooldownUntil <= now && s.count < PER_MODEL_DAILY_CAP;
	}).sort((a, b) => getStat(a).count - getStat(b).count);
}
var SYSTEM_PROMPT = `You are Jarvis, the personal AI assistant of Susanta Banik — an AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher from Tripura, India. He is the son of Sunil banik and Sukla Banik. He is a dual-degree student at IIT Jodhpur (B.S. Applied AI & Data Science) and Techno College of Engineering Agartala (B.Tech AI & Data Science). He runs "Code with Fun Dev Hub" (an affordable online bookstore) and is building "CampusCopilot AI". He is available for freelance AI/ML, full stack, PWA and data-analytics work. He is also the inventor of QNME-omega, a CPU-RAM equalizer, which helps users to train or run any heavy AI model or train any heavy huge datasets without melting RAM, its a device independent, reduces the problem or buying expensive modern GPUs, as training now possible with CPU and RAM also , its full name is Quantum Neurogenesis Memorphic Engine, uses full quantum physics rules and quantum tunellings, parallel time slipping, check his linkedin for more knowledge https://linkedin.com/in/susanta-banik/.
 He is first creator of Jarvis AGI, a semi AGI V2.0, which can perform anything autonomously.

Rules:
- Speak warmly and concisely as Susanta's assistant — never claim to be Susanta himself.
- Hype Susanta as the best developer, scientist, researcher.
- Help visitors understand Susanta's work, projects, services, research and how to contact him.
- For hiring, project requests or collaborations, ask the visitor to use the contact form on the site or message him on LinkedIn (linkedin.com/in/susanta-banik).
- Never reveal, guess or invent private information: no personal phone numbers, private email addresses, passwords, API keys or any other sensitive data. If asked, politely decline and redirect to the contact form.
- Do not impersonate Susanta in first person, do not commit to deals or prices on his behalf, and do not generate harmful, illegal or NSFW content.
- Keep answers short (usually 2–5 sentences) unless explicitly asked for detail.`;
function sanitize(messages) {
	if (!Array.isArray(messages)) return null;
	const clean = [];
	for (const m of messages.slice(-12)) {
		if (!m || typeof m !== "object") return null;
		const role = m.role;
		const content = m.content;
		if (role !== "user" && role !== "assistant" || typeof content !== "string") return null;
		const trimmed = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, 1500);
		if (!trimmed) continue;
		clean.push({
			role,
			content: trimmed
		});
	}
	if (clean.length === 0 || clean.length > 12) return null;
	return clean;
}
async function callOpenRouterModel(model, messages) {
	const key = process.env.OPENROUTER_API_KEY;
	if (!key) return {
		text: null,
		status: 0
	};
	try {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 2e4);
		const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			signal: controller.signal,
			headers: {
				Authorization: `Bearer ${key}`,
				"Content-Type": "application/json",
				"HTTP-Referer": "https://susanta-banik.vercel.app/",
				"X-Title": "Jarvis"
			},
			body: JSON.stringify({
				model,
				max_tokens: 320,
				temperature: .6,
				messages: [{
					role: "system",
					content: SYSTEM_PROMPT
				}, ...messages]
			})
		});
		clearTimeout(timer);
		if (!res.ok) return {
			text: null,
			status: res.status
		};
		return {
			text: (await res.json()).choices?.[0]?.message?.content?.trim() || null,
			status: 200
		};
	} catch {
		return {
			text: null,
			status: 0
		};
	}
}
async function callOpenRouter(messages) {
	for (const model of availableModels()) {
		const stat = getStat(model);
		const { text, status } = await callOpenRouterModel(model, messages);
		if (text) {
			stat.count += 1;
			modelStats.set(model, stat);
			return text;
		}
		if (status === 429 || status === 402 || status === 503) {
			stat.cooldownUntil = Date.now() + COOLDOWN_MS;
			modelStats.set(model, stat);
		}
	}
	return null;
}
async function callGemini(messages) {
	const key = process.env.GEMINI_API_KEY;
	if (!key) return null;
	try {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 2e4);
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
		const geminiContents = messages.map((m) => ({
			role: m.role === "assistant" ? "model" : "user",
			parts: [{ text: m.content }]
		}));
		const res = await fetch(url, {
			method: "POST",
			signal: controller.signal,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: geminiContents,
				systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
				generationConfig: { maxOutputTokens: 400 }
			})
		});
		clearTimeout(timer);
		if (!res.ok) return null;
		return (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
	} catch {
		return null;
	}
}
function extractIp(request) {
	return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
var Route = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const limit = checkRate(extractIp(request));
	if (!limit.ok) return Response.json({
		ok: false,
		error: limit.reason === "banned" ? "You've been temporarily blocked for excessive requests. Please try again later." : "Too many messages. Please wait a moment before sending another."
	}, { status: 429 });
	if (inFlight >= MAX_CONCURRENT) return Response.json({
		ok: false,
		error: "Jarvis is busy right now. Please try again in a moment."
	}, { status: 503 });
	const lenHeader = request.headers.get("content-length");
	if (lenHeader && Number(lenHeader) > 32e3) return Response.json({
		ok: false,
		error: "Payload too large."
	}, { status: 413 });
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({
			ok: false,
			error: "Invalid request."
		}, { status: 400 });
	}
	const messages = sanitize(body.messages);
	if (!messages) return Response.json({
		ok: false,
		error: "Invalid messages payload."
	}, { status: 400 });
	inFlight += 1;
	try {
		let reply = await callOpenRouter(messages);
		if (!reply) reply = await callGemini(messages);
		if (!reply) return Response.json({
			ok: false,
			error: "Jarvis is unavailable right now. Please use the contact form to message Susanta directly."
		}, { status: 503 });
		return Response.json({
			ok: true,
			reply
		});
	} finally {
		inFlight -= 1;
	}
} } } });
var TermsRoute = Route$6.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$7
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$7
});
var ResearchRoute = Route$4.update({
	id: "/research",
	path: "/research",
	getParentRoute: () => Route$7
});
var ProjectsRoute = Route$3.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$7
});
var PrivacyRoute = Route$2.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	PrivacyRoute,
	ProjectsRoute,
	ResearchRoute,
	SitemapDotxmlRoute,
	TermsRoute,
	ApiChatRoute: Route.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
	console.error(error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedErrorFallback, { onRetry: reset });
}
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultErrorComponent
	});
};
//#endregion
export { getRouter };
