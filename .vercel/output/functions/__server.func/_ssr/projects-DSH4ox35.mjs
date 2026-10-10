import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GITHUB_USER, t as GITHUB_URL } from "./projects-hA7X9cIt.mjs";
import { t as campus_copilot_default } from "./campus-copilot-BOG8OdMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DSH4ox35.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const [repos, setRepos] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`).then((r) => r.ok ? r.json() : Promise.reject()).then((data) => {
			if (cancelled) return;
			const ranked = data.filter((r) => !r.fork && !r.archived).sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
			setRepos(ranked);
			if (typeof document !== "undefined") {
				const existing = document.getElementById("projects-itemlist-ld");
				if (existing) existing.remove();
				const script = document.createElement("script");
				script.id = "projects-itemlist-ld";
				script.type = "application/ld+json";
				script.text = JSON.stringify({
					"@context": "https://schema.org",
					"@type": "ItemList",
					name: "Open source projects by Susanta Banik",
					url: "/projects",
					numberOfItems: ranked.length,
					itemListElement: ranked.slice(0, 50).map((r, i) => ({
						"@type": "ListItem",
						position: i + 1,
						item: {
							"@type": "SoftwareSourceCode",
							name: r.name,
							description: r.description ?? `${r.name} — open source project by Susanta Banik on GitHub.`,
							codeRepository: r.html_url,
							url: r.homepage || r.html_url,
							programmingLanguage: r.language ?? void 0,
							keywords: r.topics?.join(", "),
							dateModified: r.updated_at,
							author: {
								"@type": "Person",
								name: "Susanta Banik"
							}
						}
					}))
				});
				document.head.appendChild(script);
			}
		}).catch(() => !cancelled && setError(true));
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "rule-bottom",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-prose flex h-16 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-lg",
					children: "← Susanta Banik"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "text-sm text-muted-foreground flex gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projects",
							className: "text-foreground",
							children: "Projects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/research",
							children: "Research"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "contact",
							children: "Contact"
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container-prose py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Portfolio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl md:text-6xl",
					children: "Projects."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 max-w-2xl text-muted-foreground text-lg",
					children: [
						"A live mirror of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "link-underline text-foreground",
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["github.com/", GITHUB_USER]
						}),
						" — every public, non-fork repository, ranked by stars and recent activity. Click any card to open the source on GitHub."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Featured · In development"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border border-rule overflow-hidden bg-subtle/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: campus_copilot_default,
								alt: "CampusCopilot — AI Student OS for engineering and medical students. Preview of the landing page.",
								loading: "lazy",
								className: "w-full h-auto block"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-3 left-3 inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-foreground border border-rule",
								children: "🚧 Under development"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "CampusCopilot AI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "An AI-powered Student OS for Engineering and Medical students — notes, summaries, presentations, viva prep and personalized study schedules in one place. Currently in active development."
							})]
						})]
					})]
				}),
				!repos && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid md:grid-cols-2 gap-4",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-44 rounded-lg border border-rule animate-pulse bg-subtle" }, i))
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-12 text-muted-foreground",
					children: [
						"GitHub's public API is rate-limited right now — head over to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline text-primary",
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: GITHUB_URL
						}),
						" ",
						"for the full live list."
					]
				}),
				repos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 eyebrow",
					children: [repos.length, " repositories"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid md:grid-cols-2 gap-4",
					children: repos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.html_url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group rounded-lg border border-rule p-6 hover:border-primary/50 hover:bg-subtle/40 hover:-translate-y-0.5 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl group-hover:text-primary transition",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "eyebrow shrink-0",
									children: ["★ ", r.stargazers_count]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground line-clamp-3 min-h-12",
								children: r.description ?? "No description provided."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: r.language ?? "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground group-hover:text-primary transition",
									children: "View on GitHub ↗"
								})]
							})
						]
					}, r.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 rounded-xl border border-rule p-8 bg-subtle/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "More on GitHub"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted-foreground",
						children: [
							"Forks, archived experiments, contributions and gists all live on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "link-underline text-foreground",
								href: GITHUB_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								children: ["github.com/", GITHUB_USER]
							}),
							"."
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProjectsPage as component };
