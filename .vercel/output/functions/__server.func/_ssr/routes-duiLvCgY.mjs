import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as campus_copilot_default } from "./campus-copilot-BOG8OdMb.mjs";
import { r as report, t as addBreadcrumb } from "./error-reporter-CmAk3SQT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-duiLvCgY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var devhub_default = "/assets/devhub-DwLdFg6p.png";
/**
* Local cache of the most recent successful Jarvis Q&A pairs.
*
* Used so the site still surfaces useful content when /api/chat is
* temporarily unavailable. Lives in localStorage; capped to a small,
* bounded size so it can't grow without limit.
*/
var KEY = "sb:jarvis:cache:v1";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((x) => !!x && typeof x.q === "string" && typeof x.a === "string");
	} catch {
		return [];
	}
}
function write(entries) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(entries.slice(-20)));
	} catch {}
}
function normalize(s) {
	return s.toLowerCase().replace(/\s+/g, " ").trim();
}
function rememberAnswer(question, answer) {
	const q = question.trim();
	const a = answer.trim();
	if (!q || !a) return;
	const entries = read().filter((e) => normalize(e.q) !== normalize(q));
	entries.push({
		q,
		a,
		ts: Date.now()
	});
	write(entries);
}
/**
* Return a cached answer whose question overlaps meaningfully with the
* incoming question. Exact match wins; otherwise we score by shared
* 4+ char tokens and return the best if it clears a minimum threshold.
*/
function findCachedAnswer(question) {
	const entries = read();
	if (entries.length === 0) return null;
	const qn = normalize(question);
	const exact = entries.find((e) => normalize(e.q) === qn);
	if (exact) return exact;
	const tokens = new Set(qn.split(" ").filter((t) => t.length >= 4));
	if (tokens.size === 0) return null;
	let best = null;
	for (const e of entries) {
		const ets = new Set(normalize(e.q).split(" ").filter((t) => t.length >= 4));
		let shared = 0;
		for (const t of tokens) if (ets.has(t)) shared += 1;
		const score = shared / Math.max(1, tokens.size);
		if (!best || score > best.score) best = {
			entry: e,
			score
		};
	}
	return best && best.score >= .5 ? best.entry : null;
}
var GITHUB_URL = "https://github.com/Susanta2006";
var RESEARCHGATE_URL = "https://www.researchgate.net/profile/Susanta-Banik-4/research";
var LINKEDIN_URL = "https://www.linkedin.com/in/susanta-banik";
var GOOGLE_SCHOLAR_URL = "https://scholar.google.com/citations?user=CBZeE3wAAAAJ&hl=en";
var TWITTER_URL = "https://x.com/SusantaBan21";
var YOUTUBE_URL = "https://www.youtube.com/@CodeWithFun-life";
var DEVHUB_URL = "https://codewithfun-devhub.vercel.app";
var PAPER_URL = "https://www.ijsr.net/getabstract.php?paperid=MR251206000138";
var PROFILES = [
	{
		label: "LinkedIn",
		href: LINKEDIN_URL
	},
	{
		label: "GitHub",
		href: GITHUB_URL
	},
	{
		label: "X / Twitter",
		href: TWITTER_URL
	},
	{
		label: "YouTube",
		href: YOUTUBE_URL
	},
	{
		label: "Google Scholar",
		href: GOOGLE_SCHOLAR_URL
	},
	{
		label: "ResearchGate",
		href: RESEARCHGATE_URL
	},
	{
		label: "HackerRank",
		href: "https://hackerrank.com/profile/susanta_company4"
	},
	{
		label: "LeetCode",
		href: "https://leetcode.com/u/Susanta_Banik"
	}
];
var EDUCATION = [{
	school: "Indian Institute of Technology, Jodhpur",
	degree: "B.S. in Applied AI & Data Science",
	note: "Recognized as IIT Jodhpur Alumnus"
}, {
	school: "Techno College of Engineering, Agartala",
	degree: "B.Tech in AI & Data Science"
}];
var INTERNSHIPS = [
	{
		role: "AI Intern",
		org: "IIT KGP via Skill Ladders"
	},
	{
		role: "AI/ML Engineer Intern",
		org: "kyma AI Innovations"
	},
	{
		role: "Full Stack Web Developer Intern",
		org: "Unified Mentors Pvt. Ltd"
	},
	{
		role: "Machine Learning Intern",
		org: "Cognifyz Technologies"
	},
	{
		role: "Machine Learning Intern",
		org: "Saiket Systems"
	},
	{
		role: "Data Analyst Intern",
		org: "Aspire Interns"
	}
];
var SKILLS = [
	{
		group: "AI / ML",
		items: [
			"TensorFlow (LSTM)",
			"Deep Learning",
			"Model Evaluation",
			"Prompt Engineering",
			"RAG Apps",
			"LLM Agents",
			"Data Preprocessing",
			"Scikit-learn",
			"Keras",
			"OpenAI API"
		]
	},
	{
		group: "Data Science & Analytics",
		items: [
			"Pandas",
			"NumPy",
			"Matplotlib",
			"Power BI",
			"Statistical Modeling",
			"Tableau"
		]
	},
	{
		group: "Programming Languages",
		items: [
			"Python",
			"Java",
			"JavaScript",
			"PHP",
			"C",
			"C++"
		]
	},
	{
		group: "Web Development",
		items: [
			"HTML",
			"CSS",
			"JavaScript",
			"PHP",
			"MySQL",
			"React",
			"Tailwind",
			"REST APIs",
			"PWA Development"
		]
	},
	{
		group: "Tools & Platforms",
		items: [
			"Git",
			"GitHub",
			"Power BI",
			"Linux",
			"VS Code",
			"Jupyter Notebooks",
			"Google Colab",
			"AWS",
			"Heroku",
			"Cloud Deployment"
		]
	}
];
var WEB_PROJECTS = [
	"Relational DBMS for School Administration",
	"Full-Stack E-Commerce Store with Payment Integration",
	"Online Exam Portal with Live Timer & Quiz Engine",
	"Real Estate Listing App with Location Filtering",
	"Restaurant Billing & Kitchen Management Dashboard",
	"Digital Panchayat — Rural Governance Web Portal",
	"Personal Portfolio & AGI Research Showcase Site",
	"Student-Teacher Appointment Scheduler",
	"Aegis — Real-Time SOS Location Tracker App",
	"Custom Computational Calculators Matrix",
	"Dynamic Greetings & CSS Animation Showcase Webpage"
];
var PYTHON_PROJECTS = [
	"age-calculator — core utility using date-interval calculation logic to parse exact time differences",
	"calculus-solver — mathematical parsing library engineered to compute derivatives and integrals via node trees",
	"weather-tool — automation script fetching real-time meteorological JSON payloads from external open APIs",
	"image-compressor — script using matrix factorization or image processing libraries to optimize file dimensions",
	"text-typer — automation utility leveraging OS-level keyboard events to simulate live user typing speed",
	"dictionary-qna — parsing tool querying structural JSON localized dictionaries for definition strings",
	"task-scheduler — script executing background date-time comparison logic to trigger local file processes",
	"indian-panchangam — astro-mathematical script computing planetary positions using localized traditional algorithms",
	"password-hasher — security script utilizing standard crypto modules to apply salts and hash input strings"
];
var AIML_PROJECTS = [
	"house-price-predictor — tabular regression model applying tree-based ensembles to project real estate valuations",
	"language-detector — text classifier implementing n-gram statistical models to evaluate and identify input string origins",
	"fraud-detector — anomaly detection pipeline using tabular isolation forests to flag skewed transactional records",
	"rating-predictor — NLP regression pipeline extracting word-frequency weights to project continuous numerical scores",
	"medical-data-analyzer — tabular analytics tool running normalization and correlation checks across diagnostic data frames",
	"restaurant-recommender — recommender engine applying matrix factorization or cosine similarity to rank target entries"
];
var AIDL_PROJECTS = [
	"cancer-cell-detector — computer vision network utilizing convolutional layers to classify anomalies in digital biopsy images",
	"language-translator — sequence-to-sequence translation pipeline using tokenization models and encoder-decoder mechanisms",
	"handwriting-classifier — computer vision model utilizing convolutional layers to run feature extraction on hand-drawn character arrays",
	"image-classifier — vision classification network training deep feature matrices to map input pixels to structural label classes",
	"speech-recognizer — acoustic processing pipeline using neural networks to decode continuous audio wave frequencies into text tokens",
	"lstm-quiz-game — text generation model leveraging Long Short-Term Memory recurrent layers to construct adaptive trivia layouts",
	"lstm-stock-forecaster — recurrent sequence network built in TensorFlow to track historical time-series pricing vectors",
	"archeo-ai — applied AI implementation leveraging OpenAI large language model endpoints and embedding vectors to spot historical anomalies",
	"jarvis-v9 — custom multi-engine Python cognitive architecture executing synthetic human AGI simulations through persistent memory streams"
];
var DATA_ANALYTICS_PROJECTS = [
	"sales-performance-dashboard — PowerBI dashboard utilizing advanced DAX modeling to track regional revenue trends and margins",
	"sales-report-dashboard — Tableau workbook to showcase sales over time, profit-loss, regional contributions, discounts, profits",
	"supply-chain-analytics — Tableau workbook implementing interactive ETL pipelines to isolate warehouse bottleneck metrics",
	"customer-churn-bi — PowerBI executive screen integrating cohort analysis and retention metrics from relational database feeds"
];
var CERTS = [
	{
		name: "Geodata Processing using Python and Machine Learning",
		issuer: "ISRO (Indian Space Research Organization)"
	},
	{
		name: "Application of AI/ML for Specific Crop Acreage Mapping",
		issuer: "ISRO (Indian Space Research Organization)"
	},
	{
		name: "A-Z Ethical Hacking Certificate",
		issuer: "IIT Patna"
	},
	{
		name: "JavaScript Specialist Certification",
		issuer: "HackerRank"
	},
	{
		name: "SQL (Advance)",
		issuer: "HackerRank"
	},
	{
		name: "Software Engineer Intern Certificate",
		issuer: "HackerRank"
	},
	{
		name: "AI Essentials Microsoft Azure Professional Certificate",
		issuer: "Microsoft"
	},
	{
		name: "Introduction to Generative AI",
		issuer: "Google Cloud Skills Boost"
	},
	{
		name: "Hadoop 101",
		issuer: "IBM"
	},
	{
		name: "TATA Gen AI Powered Data Analytics",
		issuer: "Forage"
	}
];
var SERVICES = [
	{
		title: "AI / ML Solutions",
		body: "Custom models, fine-tuning, LLM agents, forecasting pipelines, and AI features inside your existing product.",
		points: [
			"LLM & RAG apps",
			"Predictive models",
			"Computer vision",
			"Data pipelines"
		]
	},
	{
		title: "Full Stack Web Apps",
		body: "End-to-end websites and web apps — landing pages, dashboards, portals, e-commerce, internal tools.",
		points: [
			"React + Tailwind",
			"PHP / MySQL",
			"REST APIs",
			"Auth & dashboards"
		]
	},
	{
		title: "Mobile-Ready Apps",
		body: "Responsive, installable PWAs and mobile-first builds that feel native on every device.",
		points: [
			"PWA delivery",
			"Offline UX",
			"Push notifications",
			"App-store ready"
		]
	},
	{
		title: "Data & Analytics",
		body: "Power BI dashboards, ETL, statistical reports — turning raw data into decisions you can act on.",
		points: [
			"Power BI",
			"Pandas / NumPy",
			"Reporting",
			"Insight decks"
		]
	}
];
function calcAge(dob) {
	const d = new Date(dob);
	const now = /* @__PURE__ */ new Date();
	let age = now.getFullYear() - d.getFullYear();
	const m = now.getMonth() - d.getMonth();
	if (m < 0 || m === 0 && now.getDate() < d.getDate()) age--;
	return age;
}
function useGithubRepos() {
	const [repos, setRepos] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetch("https://api.github.com/users/Susanta2006/repos?per_page=100&sort=updated").then((r) => r.ok ? r.json() : Promise.reject()).then((data) => {
			if (cancelled) return;
			setRepos(data.filter((r) => !r.fork && !r.archived).sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 6));
		}).catch(() => !cancelled && setError(true));
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		repos,
		error
	};
}
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = (typeof window !== "undefined" && localStorage.getItem("theme")) ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.classList.toggle("dark", next === "dark");
		localStorage.setItem("theme", next);
	};
	return {
		theme,
		toggle
	};
}
function Index() {
	const age = (0, import_react.useMemo)(() => calcAge("2006-10-20"), []);
	const { repos, error } = useGithubRepos();
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
				theme,
				toggle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { age }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snapshot, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Education, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedProjects, {
					repos,
					error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Research, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certifications, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevHub, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusCopilot, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profiles, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWidget, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Monogram({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule font-display text-lg leading-none " + className,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "-mt-0.5",
			children: ["S", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "B"
			})]
		})
	});
}
function Nav({ theme, toggle }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [productsOpen, setProductsOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 backdrop-blur-md bg-background/80 rule-bottom",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose flex h-16 items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base sm:text-lg truncate",
						children: "Susanta Banik"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden md:flex items-center gap-6 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							className: "link-underline hover:text-foreground transition-colors",
							children: "About"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#services",
							className: "link-underline hover:text-foreground transition-colors",
							children: "Services"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projects",
							className: "link-underline hover:text-foreground transition-colors",
							children: "Projects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							onMouseEnter: () => setProductsOpen(true),
							onMouseLeave: () => setProductsOpen(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setProductsOpen((v) => !v),
								className: "link-underline hover:text-foreground transition-colors inline-flex items-center gap-1",
								"aria-haspopup": "menu",
								"aria-expanded": productsOpen,
								children: ["Products ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "▾"
								})]
							}), productsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "menu",
								className: "absolute right-0 top-full mt-2 w-72 rounded-lg border border-rule bg-background shadow-lg p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#devhub",
									onClick: () => setProductsOpen(false),
									className: "block rounded-md px-3 py-2 hover:bg-subtle transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-foreground",
										children: "Code with Fun Dev Hub"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Affordable online bookstore · Live"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#campuscopilot",
									onClick: () => setProductsOpen(false),
									className: "block rounded-md px-3 py-2 hover:bg-subtle transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-foreground",
										children: "CampusCopilot AI"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "AI study companion · In development"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/research",
							className: "link-underline hover:text-foreground transition-colors",
							children: "Research"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "link-underline hover:text-foreground transition-colors",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "hidden sm:inline-flex items-center rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition",
							children: "Hire me"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggle,
							"aria-label": "Toggle theme",
							className: "text-xs eyebrow hover:text-foreground transition-colors",
							children: theme === "dark" ? "Light" : "Dark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							"aria-expanded": mobileOpen,
							onClick: () => setMobileOpen((v) => !v),
							className: "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: mobileOpen ? "✕" : "☰"
							})
						})
					]
				})
			]
		}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-rule bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "container-prose py-4 flex flex-col gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#about",
						onClick: () => setMobileOpen(false),
						className: "py-1",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#services",
						onClick: () => setMobileOpen(false),
						className: "py-1",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/projects",
						onClick: () => setMobileOpen(false),
						className: "py-1",
						children: "Projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow pt-2",
						children: "Products"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#devhub",
						onClick: () => setMobileOpen(false),
						className: "py-1 pl-2",
						children: "Code with Fun Dev Hub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#campuscopilot",
						onClick: () => setMobileOpen(false),
						className: "py-1 pl-2",
						children: "CampusCopilot AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/research",
						onClick: () => setMobileOpen(false),
						className: "py-1",
						children: "Research"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						onClick: () => setMobileOpen(false),
						className: "py-1",
						children: "Contact"
					})
				]
			})
		})]
	});
}
function Hero({ age }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-130 w-275 rounded-full bg-primary/10 blur-3xl opacity-60"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose pt-20 pb-24 md:pt-32 md:pb-32 fade-in relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow mb-6",
					children: ["Official site · est. ", (/* @__PURE__ */ new Date()).getFullYear()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]",
					children: [
						"Susanta Banik.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground italic",
							children: "Building intelligence,"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary italic",
							children: "thoughtfully."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed",
					children: [
						"AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher. Currently pursuing a dual degree across ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground font-medium",
							children: "IIT Jodhpur"
						}),
						" and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground font-medium",
							children: "Techno College of Engineering, Agartala"
						}),
						" — turning real-world problems into shippable systems. Inventor of QNME-omega helps to train any size of dataset without melting RAM and CPU."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition",
							children: ["View Projects on GitHub", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform group-hover:translate-x-0.5",
								children: "↗"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: RESEARCHGATE_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group inline-flex items-center gap-2 rounded-md border border-rule px-5 py-2.5 text-sm font-medium hover:bg-secondary hover:border-primary/40 transition",
							children: ["Read Research on ResearchGate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform group-hover:translate-x-0.5",
								children: "↗"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition",
							children: "Get in touch →"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl",
					children: [
						["Age", `${age}`],
						["Degrees", "Dual"],
						["Projects", "20+"],
						["Certifications", "30+"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-display text-3xl md:text-4xl",
						children: v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "eyebrow mt-1",
						children: k
					})] }, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm",
					children: PROFILES.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: p.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "link-underline text-muted-foreground hover:text-foreground",
						children: [p.label, " ↗"]
					}, p.label))
				})
			]
		})]
	});
}
function SectionHeader({ eyebrow, title, kicker }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-12 md:mb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: eyebrow
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-rule" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-3xl md:text-5xl",
				children: title
			}),
			kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: kicker
			})
		]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28 grid md:grid-cols-12 gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "About"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-3xl md:text-4xl",
					children: "A builder, a student, a researcher."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-8 space-y-6 text-lg leading-relaxed text-foreground/90",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Hi, I'm ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Susanta Banik" }),
						". Born and raised in Agartala, Tripura, to my parents Mr. Sunil Banik and Mrs. Sukla Banik, my journey is rooted in a deep curiosity for computing and innovation. Today, I am an AI/ML Engineer, Researcher, Data Scientist, and Full Stack Developer dedicated to building complex systems that make a tangible, real-world impact."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"I am currently pursuing a rigorous dual-degree path: a B.S. in Applied AI & Data Science at the prestigious ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Indian Institute of Technology (IIT) Jodhpur" }),
						", alongside a B.Tech in AI & Data Science at ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Techno College of Engineering, Agartala" }),
						". These parallel tracks shape my core engineering philosophy: one grounds me in deep theoretical reasoning and mathematics, while the other drives me to build and ship robust software quickly."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"My passion lies at the bleeding edge of artificial intelligence. I am the inventor of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "QNME-omega" }),
						", a groundbreaking CPU-RAM Equalizer. This architecture was designed with a clear mission: to democratize AI by enabling the training of massive datasets on low-specification devices, breaking down hardware computing barriers for developers globally. My broader research in algorithm optimization and machine learning is actively published and recognized across platforms like Google Scholar, ResearchGate, and the International Journal of Science and Research (IJSR)."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Beyond theoretical research, my work sits exactly where machine learning meets real products. I bridge the gap between complex data models and user-facing applications, moving seamlessly between TensorFlow notebooks, Python microservices, Power BI dashboards, and full-stack web platforms. I have built over twenty end-to-end projects spanning fraud detection, time-series forecasting, natural language tools, and conversational AI agents, Base 1 AGI with human-like understanding." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"I also believe heavily in knowledge sharing and giving back to the tech community. I am the founder of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Campuscopilot" }),
						", an educational platform tailored specifically for higher-education students, and I run the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CodeWithFun" }),
						" ecosystem, which includes a growing YouTube channel",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "link-underline text-primary",
							href: YOUTUBE_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [
								"(",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "CodeWithFun-life" }),
								")"
							]
						}),
						" ",
						"—  youtube channel for students and developers and an affordable resource bookstore ",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "link-underline text-primary",
							href: DEVHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [
								"(",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "CodeWithFun-devhub" }),
								")"
							]
						}),
						" ",
						"— an affordable online bookstore for students and developers, with every book priced to be genuinely accessible. I also take on freelance work building apps, websites and AI tools for clients."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When I am not architecting machine learning pipelines or developing platforms, I am continuously sharpening my Data Structures and Algorithms (DSA) and problem-solving skills through competitive programming on platforms like LeetCode and HackerRank." })
				]
			})]
		})
	});
}
function Snapshot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "rule-top bg-subtle/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-prose py-16 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10",
			children: [
				["Dual-degree", "IIT Jodhpur + Techno Agartala"],
				["Internships", "4 completed"],
				["Projects", "20+ shipped"],
				["Certifications", "30+ earned"],
				["Publication", "2 indexed paper"],
				["Platforms", "GitHub · LeetCode · HackerRank · ResearchGate · Google Scholar"]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-xl md:text-2xl",
				children: v
			})] }, k))
		})
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Services",
					title: "Hire me to build.",
					kicker: "Available for freelance and contract work — apps, websites, AI tools, dashboards. Reach out through the form below or the floating chat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-2 gap-5",
					children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group relative rounded-xl border border-rule p-7 transition hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow text-primary opacity-0 group-hover:opacity-100 transition",
									children: "Available"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: s.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 flex flex-wrap gap-2",
								children: s.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground",
									children: p
								}, p))
							})
						]
					}, s.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						className: "inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition",
						children: "Start a project →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: LINKEDIN_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm font-medium hover:bg-secondary transition",
						children: "Connect on LinkedIn ↗"
					})]
				})
			]
		})
	});
}
function Education() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "education",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Education",
				title: "Two institutions. One trajectory."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: EDUCATION.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-rule p-8 hover:border-primary/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Degree"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-2xl",
							children: e.degree
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: e.school
						}),
						e.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-primary",
							children: e.note
						})
					]
				}, e.school))
			})]
		})
	});
}
function Experience() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experience",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Experience",
				title: "Internships.",
				kicker: "Hands-on work across machine learning, data, and full stack engineering."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-rule border-y border-rule",
				children: INTERNSHIPS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid md:grid-cols-12 gap-4 py-6 md:py-8 items-baseline hover:bg-subtle/40 transition px-2 -mx-2 rounded",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "md:col-span-4 font-display text-xl",
							children: i.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "md:col-span-6 text-muted-foreground",
							children: i.org
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "md:col-span-2 eyebrow md:text-right",
							children: "Intern"
						})
					]
				}, i.role + i.org))
			})]
		})
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "skills",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Skills",
				title: "Tools of the craft."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-rule p-6 hover:border-primary/40 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: s.group
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-wrap gap-2",
						children: s.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground",
							children: it
						}, it))
					})]
				}, s.group))
			})]
		})
	});
}
function FeaturedProjects({ repos, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Featured",
					title: "Live from GitHub.",
					kicker: "Pulled directly from github.com/Susanta2006, ranked by stars and recent activity."
				}),
				!repos && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					"aria-live": "polite",
					"aria-busy": "true",
					"aria-label": "Loading featured GitHub repositories",
					className: "grid md:grid-cols-2 gap-4 motion-reduce:**:animate-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Loading featured GitHub repositories…"
					}), Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "h-44 rounded-lg border border-rule bg-subtle relative overflow-hidden jarvis-shimmer"
					}, i))]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [
						"GitHub is rate-limited right now — visit",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline text-primary",
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "github.com/Susanta2006"
						}),
						" ",
						"for the live list."
					]
				}),
				repos && repos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-2 gap-4",
					children: repos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.html_url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group rounded-lg border border-rule p-6 hover:border-primary/50 hover:bg-subtle/40 hover:-translate-y-0.5 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl group-hover:text-primary transition",
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
									children: "View repo ↗"
								})]
							})
						]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-sm text-muted-foreground",
					children: [
						"See everything on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline text-foreground",
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "GitHub"
						}),
						"."
					]
				})
			]
		})
	});
}
function Archive() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "archive",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Archive",
				title: "The wider catalogue.",
				kicker: "A broader look at projects spanning web, AI/ML, and automation."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Web Development"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: WEB_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-2 text-sm hover:text-primary transition",
							children: p
						}, p))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Python"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: PYTHON_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-2 text-sm hover:text-primary transition",
							children: p
						}, p))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Machine Learning"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: AIML_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-2 text-sm hover:text-primary transition",
							children: p
						}, p))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Deep Learning"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: AIDL_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-2 text-sm hover:text-primary transition",
							children: p
						}, p))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Data AnaLytics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: DATA_ANALYTICS_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-2 text-sm hover:text-primary transition",
							children: p
						}, p))
					})] })
				]
			})]
		})
	});
}
function Research() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "research",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Research",
					title: "Published work."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-rule p-8 md:p-12 hover:border-primary/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Paper · IJSR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl md:text-4xl leading-tight",
							children: "Emergent Social Consciousness in a Minimalist Conversational Agent: A Case Study"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid sm:grid-cols-2 gap-6 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "eyebrow",
								children: "Paper ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-mono",
								children: "MR251206000138"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "eyebrow",
								children: "Author"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: "Susanta Banik"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: RESEARCHGATE_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition",
								children: "Read on ResearchGate ↗"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: PAPER_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center rounded-md border border-rule px-5 py-2.5 text-sm hover:bg-secondary transition",
								children: "View on IJSR ↗"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-rule p-8 md:p-12 hover:border-primary/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Pre-print · ResearchGate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl md:text-4xl leading-tight",
							children: "Jarvis-v9: A Continual-Learning Synthetic AGI Agent: with Emergent Social Intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid sm:grid-cols-2 gap-6 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "eyebrow",
								children: "Paper DOI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-mono",
								children: "10.13140/RG.2.2.12547.05921"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "eyebrow",
								children: "Author"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: "Susanta Banik"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: RESEARCHGATE_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition",
								children: "Read on ResearchGate ↗"
							})
						})
					]
				})
			]
		})
	});
}
function Certifications() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "certifications",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Certifications",
					title: "Verified credentials.",
					kicker: "A curated selection from 30+ certifications across AI, data, and cloud — full list on LinkedIn."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid md:grid-cols-3 gap-4",
					children: CERTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-rule p-6 hover:border-primary/40 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: c.issuer
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-xl",
							children: c.name
						})]
					}, c.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-sm text-muted-foreground",
					children: [
						"Full list:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "link-underline text-foreground",
							href: `${LINKEDIN_URL}/details/certifications/`,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "LinkedIn → Licenses & Certifications ↗"
						})
					]
				})
			]
		})
	});
}
function DevHub() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "devhub",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Products"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl md:text-5xl",
						children: "Code with Fun Dev Hub."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-primary font-medium",
						children: "An online bookstore with every book at a genuinely affordable price."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground max-w-xl",
						children: "Textbooks, technical books, reference titles, study material — all curated and priced so students and self-learners can actually afford to build a real library. Browse the storefront to see what's in stock today."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: DEVHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition",
							children: "Browse the bookstore ↗"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-rule p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: devhub_default,
							alt: "Code with Fun Dev Hub — curated coding resource centre for students and developers",
							className: "h-full w-full object-cover",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-6 border-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "AI Bookstore · Knowledge tools"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-6 border-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Stewardship"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "Designed & built by Susanta Banik"
						})
					]
				})
			})]
		})
	});
}
function CampusCopilot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "campuscopilot",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Upcoming",
				title: "CampusCopilot AI."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-12 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CampusCopilot is an upcoming AI-native educational platform built for the way students actually study — somewhere between a tutor, a study group, and a research assistant." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The first release focuses on three problems: making dense coursework approachable, helping students prepare for assessments with real feedback, and turning scattered notes into navigable knowledge." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It is currently in active development." })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-rule p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: campus_copilot_default,
								alt: "CampusCopilot AI — an upcoming AI-native educational platform built for the way students actually study",
								className: "h-full w-full object-cover",
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: "In development"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-6 border-rule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: "AI · EdTech · Knowledge tools"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-6 border-rule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Stewardship"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: "Designed & built by Susanta Banik"
							})
						]
					})
				})]
			})]
		})
	});
}
function Profiles() {
	const all = [
		...PROFILES,
		{
			label: "Code with Fun Dev Hub",
			href: DEVHUB_URL
		},
		{
			label: "Publication (IJSR)",
			href: PAPER_URL
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "profiles",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Verified",
				title: "Profiles & presence."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-rule border-y border-rule",
				children: all.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: p.href,
					target: "_blank",
					rel: "noopener noreferrer me",
					className: "grid md:grid-cols-12 gap-4 py-5 items-baseline group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "md:col-span-3 eyebrow",
							children: p.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "md:col-span-8 text-muted-foreground group-hover:text-foreground transition truncate",
							children: p.href.replace(/^https?:\/\//, "")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "md:col-span-1 md:text-right text-muted-foreground group-hover:text-primary transition",
							children: "↗"
						})
					]
				}) }, p.href))
			})]
		})
	});
}
function useContactForm() {
	const [state, setState] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	async function submit(form) {
		setState("sending");
		setMessage("");
		const fd = new FormData(form);
		if (String(fd.get("website") ?? "").trim().length > 0) {
			setState("ok");
			setMessage("Message sent! I'll reply to your email shortly.");
			form.reset();
			return;
		}
		const payload = {
			access_key: "85b50799-228a-4d46-8dec-63c72ca82d95",
			name: String(fd.get("name") ?? "").trim(),
			email: String(fd.get("email") ?? "").trim(),
			subject: String(fd.get("subject") ?? "New Portfolio Message").trim(),
			message: String(fd.get("message") ?? "").trim(),
			replyto: String(fd.get("email") ?? "").trim()
		};
		if (!payload.name || payload.message.length < 5) {
			setState("error");
			setMessage("Please provide a valid name and a longer message (at least 5 characters).");
			return;
		}
		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(payload)
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && data.success) {
				setState("ok");
				setMessage("Message sent! I'll reply to your email shortly.");
				form.reset();
			} else {
				setState("error");
				setMessage(data.message || "Could not complete submission.");
			}
		} catch {
			setState("error");
			setMessage("Network error. Please check your internet connection.");
		}
	}
	return {
		state,
		message,
		submit
	};
}
function ContactForm({ compact = false }) {
	const { state, message, submit } = useContactForm();
	const mountedAt = (0, import_react.useRef)(Date.now());
	function onSubmit(e) {
		e.preventDefault();
		if (Date.now() - mountedAt.current < 2e3) return;
		submit(e.currentTarget);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-3",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-[-9999px] h-0 w-0 overflow-hidden",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Don't fill this in", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					name: "website",
					tabIndex: -1,
					autoComplete: "off"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: compact ? "space-y-3" : "grid sm:grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "name",
					minLength: 2,
					maxLength: 120,
					autoComplete: "name",
					placeholder: "Your name",
					className: "w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					type: "email",
					name: "email",
					maxLength: 254,
					autoComplete: "email",
					placeholder: "Your email",
					className: "w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
				})]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "subject",
				maxLength: 200,
				placeholder: "Subject (optional)",
				className: "w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				required: true,
				name: "message",
				minLength: 5,
				maxLength: 4e3,
				rows: compact ? 4 : 6,
				placeholder: compact ? "Hi Susanta — I'd like to talk about…" : "Tell me about your project, idea or question…",
				className: "w-full rounded-md border border-rule bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition resize-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground leading-relaxed",
				children: "🔒 Your message is sent over HTTPS to a private server route and forwarded only to my personal inbox. Your email is used solely to reply — never stored, shared, or added to any list."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: state === "sending",
					className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-60",
					children: [state === "sending" ? "Sending…" : "Send message", state !== "sending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				}), message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs " + (state === "ok" ? "text-primary" : state === "error" ? "text-destructive" : "text-muted-foreground"),
					children: message
				})]
			})
		]
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-20 md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-6 font-display text-4xl md:text-6xl",
						children: [
							"Let's build something",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-primary",
								children: "worth building."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl mx-auto text-muted-foreground text-lg",
						children: "Whether it's a freelance project, a research collaboration, a request for a book, or just hello — drop a message below and I'll reply personally."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid lg:grid-cols-12 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 rounded-xl border border-rule p-6 md:p-8 bg-subtle/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Send a message"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Goes straight to my private inbox. I usually reply within 24 hours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+918119098684",
							className: "block rounded-lg border border-rule p-5 hover:border-primary/40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-sm",
								children: "+91 81190 98684"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: LINKEDIN_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block rounded-lg border border-rule p-5 hover:border-primary/40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "LinkedIn"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-sm",
								children: "in/susanta-banik"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: TWITTER_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block rounded-lg border border-rule p-5 hover:border-primary/40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "X / Twitter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-sm",
								children: "@SusantaBan21"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: GITHUB_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "block rounded-lg border border-rule p-5 hover:border-primary/40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "GitHub"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-sm",
								children: "github.com/Susanta2006"
							})]
						})
					]
				})]
			})]
		})
	});
}
function ChatWidget() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [lastFailed, setLastFailed] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi, I'm Jarvis — Susanta's personal assistant. Ask me about his work, projects, services, or how to get in touch."
	}]);
	const scrollRef = (0, import_react.useRef)(null);
	const prefersReducedMotion = (0, import_react.useMemo)(() => {
		if (typeof window === "undefined" || !window.matchMedia) return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: prefersReducedMotion ? "auto" : "smooth"
		});
	}, [
		messages,
		open,
		prefersReducedMotion
	]);
	/**
	* Try /api/chat with exponential backoff. Retries on network failure or
	* 5xx / 429. Returns the reply text, or throws after the last attempt.
	*/
	async function callJarvisWithBackoff(payload) {
		const delays = [
			400,
			1200,
			2800
		];
		let lastErr = null;
		for (let attempt = 0; attempt <= delays.length; attempt++) {
			const controller = new AbortController();
			const timeoutId = window.setTimeout(() => controller.abort(), 3e4);
			try {
				const res = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					signal: controller.signal,
					body: JSON.stringify({ messages: payload })
				});
				const data = await res.json().catch(() => ({}));
				if (res.ok && data.ok && data.reply) return data.reply;
				if (res.status < 500 && res.status !== 429) throw new Error(data.error ?? `Request failed (${res.status})`);
				lastErr = new Error(data.error ?? `Upstream ${res.status}`);
			} catch (err) {
				lastErr = err;
			} finally {
				window.clearTimeout(timeoutId);
			}
			if (attempt < delays.length) {
				const jitter = Math.floor(Math.random() * 200);
				await new Promise((r) => setTimeout(r, delays[attempt] + jitter));
			}
		}
		throw lastErr ?? /* @__PURE__ */ new Error("Jarvis unavailable");
	}
	async function runSend(text, history) {
		setSending(true);
		setLastFailed(null);
		addBreadcrumb({
			kind: "custom",
			message: "jarvis:send"
		});
		try {
			const reply = await callJarvisWithBackoff(history);
			rememberAnswer(text, reply);
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: reply
			}]);
		} catch (err) {
			report(err, "jarvis:chat");
			const cached = findCachedAnswer(text);
			if (cached) setMessages((prev) => [...prev, {
				role: "assistant",
				content: `${cached.a}\n\n— Saved answer (Jarvis is offline right now).`
			}]);
			else {
				setLastFailed(text);
				setMessages((prev) => [...prev, {
					role: "assistant",
					content: "Jarvis can't reach its brain right now. You can retry below, or use the contact form to message Susanta directly."
				}]);
			}
		} finally {
			setSending(false);
		}
	}
	async function send() {
		const text = input.trim();
		if (!text || sending) return;
		const next = [...messages, {
			role: "user",
			content: text
		}];
		setMessages(next);
		setInput("");
		await runSend(text, next);
	}
	async function retryLast() {
		if (!lastFailed || sending) return;
		await runSend(lastFailed, messages);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": open ? "Close Jarvis" : "Chat with Jarvis",
		onClick: () => setOpen((v) => !v),
		className: "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:opacity-90 transition",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Close" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✕" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			children: "🤖"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat with Jarvis" })] })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-label": "Chat with Jarvis",
		className: "fixed bottom-24 right-3 left-3 sm:left-auto sm:right-5 z-50 sm:w-100 max-w-[calc(100vw-1.5rem)] rounded-xl border border-rule bg-background shadow-2xl flex flex-col overflow-hidden fade-in",
		style: { maxHeight: "min(70vh, 560px)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 p-4 border-b border-rule",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "AI assistant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg",
						children: "Jarvis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Susanta Banik's personal AI"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto p-4 space-y-3 text-sm",
				"aria-busy": sending,
				children: [
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.role === "user" ? "ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-primary-foreground" : "mr-auto max-w-[90%] rounded-lg border border-rule bg-subtle/40 px-3 py-2 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap leading-relaxed",
							children: m.content
						})
					}, i)),
					sending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "status",
						"aria-live": "polite",
						"aria-atomic": "true",
						"aria-label": "Jarvis is thinking. Please wait.",
						className: "mr-auto max-w-[90%] rounded-lg border border-rule bg-subtle/40 px-3 py-2.5 space-y-2 overflow-hidden relative motion-reduce:[&_.jarvis-shimmer]:after:hidden motion-reduce:[&_.animate-bounce]:animate-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Jarvis is thinking. This usually takes a few seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-40 rounded bg-muted-foreground/25 jarvis-shimmer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-56 rounded bg-muted-foreground/20 jarvis-shimmer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-32 rounded bg-muted-foreground/20 jarvis-shimmer" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 pt-1",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground ml-1",
										children: "Jarvis is thinking…"
									})
								]
							})
						]
					}),
					!sending && lastFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "alert",
						className: "mr-auto max-w-[90%] rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Jarvis couldn't reach its brain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[12px] text-muted-foreground",
								children: "All retries failed. You can try again or use the contact form below."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: retryLast,
									className: "rounded-full bg-primary px-3 py-1 text-[12px] font-medium text-primary-foreground hover:opacity-90",
									children: "Try again"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contact",
									onClick: () => setOpen(false),
									className: "rounded-full border border-input bg-background px-3 py-1 text-[12px] font-medium text-foreground hover:bg-accent",
									children: "Open contact form"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				className: "border-t border-rule p-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					maxLength: 1e3,
					placeholder: "Ask Jarvis…",
					className: "flex-1 rounded-md border border-rule bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary transition"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: sending || !input.trim(),
					className: "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition",
					children: "Send"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pb-3 text-[10px] text-muted-foreground",
				children: "Jarvis is an AI assistant and may make mistakes. It will never share Susanta's private information — for hiring or sensitive matters, please use the contact form."
			})
		]
	})] });
}
function Footer() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "rule-top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-prose py-12 flex flex-col gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row gap-6 items-start md:items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-tight",
						children: "Susanta Banik"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "AI/ML Engineer · Data Scientist · Researcher · Freelance Developer"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
					children: PROFILES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: p.href,
						target: "_blank",
						rel: "noopener noreferrer me",
						className: "link-underline hover:text-foreground",
						children: p.label
					}, p.href))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col-reverse md:flex-row gap-4 items-start md:items-center justify-between border-t border-border/40 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Copyright © ",
						year,
						" Susanta Banik. All rights reserved. The name, content, code samples and original works on this site are the intellectual property of Susanta Banik unless otherwise credited."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "link-underline hover:text-foreground",
							children: "Terms & Conditions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "link-underline hover:text-foreground",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "link-underline hover:text-foreground",
							children: "Contact"
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { Index as component };
