/**
 * Project and product registry.
 *
 * To add a project, append an object to `PROJECTS`. The carousel, the
 * /projects page, the sitemap, structured data and Jarvis all read from here.
 *
 * Verified against the public GitHub profile, repository pages and READMEs on
 * 30 Oct 2026 (see `provenance` on each entry). Live URLs are the ones listed on
 * the repositories themselves; they could not be fetched from the build
 * sandbox, so liveness is not machine-checked.
 *
 * Rules that keep this file honest:
 *  - Only set a URL field when that URL really exists. Absent fields are
 *    never rendered as links.
 *  - `repositoryStatus: "unpublished"` is for work whose code has not been
 *    put on GitHub yet. Do not invent a repository URL for it.
 *  - Do not add statistics, stars, forks, commits or release information.
 */

export type ProjectStatus =
  | "live"
  | "in-development"
  | "research"
  | "experimental"
  | "hackathon"
  | "client"
  | "project";

export type ProjectCategory =
  "AI / ML" | "Research" | "Education" | "Healthcare" | "Web" | "Client work";

export type Visibility = "public" | "private" | "on-request";

export type Project = {
  id: string;
  name: string;
  /** One sentence for cards. */
  summary: string;
  /** Fuller, factual description for the projects page, SEO and Jarvis. */
  description: string;
  category: ProjectCategory;
  /** Real stack only. Leave empty when the stack is not documented. */
  technologies?: string[];
  /** Topics or focus areas, for work whose stack is not documented. */
  tags?: string[];
  status: ProjectStatus;
  featured: boolean;
  /** Path under /public. Provide `image` only when a real image exists. */
  image?: {
    /** Path without extension, e.g. "/images/projects/labbench". AVIF and WebP files must both exist. */
    base: string;
    width: number;
    height: number;
    alt: string;
  };
  demoUrl?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  publicationUrl?: string;
  /** Set to "unpublished" when no repository exists yet. */
  repositoryStatus?: "unpublished";
  visibility?: Visibility;
  /** ISO date (YYYY-MM-DD). Only set when known. */
  lastUpdated?: string;
  /** Two or three verified facts shown in the card's Details panel. */
  highlights?: string[];
  /** Short note on how the source may be used, e.g. view-only. */
  sourceNote?: string;
  /** Shown beneath the description when the project needs a caution. */
  caution?: string;
  /** Collaborators or context, e.g. a hackathon team. */
  context?: string;
  /** Where the facts in this entry came from — for maintainers, never rendered. */
  provenance: string;
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  research: "Ongoing research",
  experimental: "Experimental",
  hackathon: "Hackathon project",
  client: "Client product",
  project: "Portfolio project",
};

export const PROJECTS: Project[] = [
  {
    id: "labbench",
    name: "LabBench",
    summary:
      "A browser-based coding environment with AI-assisted teaching, designed for mobile-first learning.",
    description:
      "LabBench is a browser-based coding environment and Progressive Web App for learning to program. It provides an editor, file explorer, terminal and live preview in one workspace, with AI-assisted hints that aim to explain why code fails rather than supply the answer. The mobile-first design is meant to make practice possible on a phone or a shared machine, without a local development setup.",
    category: "Education",
    technologies: ["TypeScript", "Monaco Editor", "Supabase", "PWA"],
    highlights: [
      "Editor, file explorer, terminal and live preview in one workspace",
      "AI-assisted hints focused on why code fails",
      "Progressive Web App, usable from the browser with no local setup",
    ],
    status: "live",
    featured: true,
    image: {
      base: "/images/projects/labbench",
      width: 1000,
      height: 545,
      alt: "LabBench workspace with file explorer, editor and terminal",
    },
    demoUrl: "https://labbench-woad.vercel.app/",
    repositoryUrl: "https://github.com/Susanta2006/labbench",
    sourceNote:
      "Source is public for review; the software is proprietary, all rights reserved.",
    visibility: "public",
    provenance:
      "GitHub repository page and README (public repo; live URL listed under About). Liveness of the Vercel URL not machine-checked.",
  },
  {
    id: "bloodsignal",
    name: "BloodSignal",
    summary:
      "An evidence-first blood-availability discovery concept from a hackathon with Team Pragmatrix. It separates what is known from what is stale or unknown.",
    description:
      "BloodSignal is a blood-availability discovery concept built as a hackathon project with Team Pragmatrix. Its design is evidence-first: facility directory records are kept separate from inventory evidence, and unknown, stale or unavailable information is shown as such rather than as zero stock. The intended workflow covers natural-language requests, prescription inputs, location matching and source-freshness checks. Not every part of that workflow is deployed; confirm current availability with the facility directly.",
    category: "Healthcare",
    technologies: [
      "React",
      "TypeScript",
      "TanStack Start",
      "Python",
      "FastAPI",
    ],
    highlights: [
      "Missing inventory is shown as unknown, never as zero stock",
      "Typed requests, optional voice input and prescription-assisted fields, reviewed before searching",
      "Call-to-confirm and map links; distance is labelled straight-line",
    ],
    status: "hackathon",
    featured: true,
    demoUrl: "https://bloodsignal.vercel.app/",
    repositoryUrl: "https://github.com/Susanta2006/BloodSignal",
    visibility: "public",
    context: "Team Pragmatrix · Ziro Hackathon",
    caution:
      "An information tool only. Availability is not guaranteed or real-time, so always confirm with the facility. It is not medical advice.",
    provenance:
      "GitHub repository page and README (public, MIT licence file present; live URL listed under About). The README states the live source was verified with mocked responses and not tested against every catalogue selection.",
  },
  {
    id: "codewithfun-devhub",
    name: "CodeWithFun Dev Hub",
    summary:
      "An online bookstore for developers and students, with technical books and study material at affordable prices.",
    description:
      "CodeWithFun Dev Hub is an online bookstore for developers and students offering textbooks, technical books and study material at affordable prices. It was designed, built and maintained by Susanta Banik alongside the CodeWithFun YouTube channel.",
    category: "Web",
    status: "live",
    featured: true,
    image: {
      base: "/images/projects/devhub",
      width: 1000,
      height: 588,
      alt: "CodeWithFun Dev Hub storefront",
    },
    demoUrl: "https://codewithfun-devhub.vercel.app/",
    visibility: "public",
    provenance:
      "Previous site copy and the supplied profile list. No repository was identified on the public GitHub profile; liveness not machine-checked.",
  },
  {
    id: "fraud-detection",
    name: "Fraud Detection",
    summary:
      "A TensorFlow/Keras deep neural network that classifies transactions as normal or fraudulent.",
    description:
      "A binary classification model built with TensorFlow and Keras that identifies whether a transaction is normal or fraudulent, demonstrating how to build and train a deep neural network for the task.",
    category: "AI / ML",
    technologies: ["Python", "TensorFlow", "Keras"],
    status: "project",
    featured: true,
    repositoryUrl: "https://github.com/Susanta2006/Fraud-Detection",
    visibility: "public",
    provenance:
      "Pinned repository on the public GitHub profile (description and language). Not run or reviewed in this audit.",
  },
  {
    id: "emotion-detect",
    name: "Emotion Detect",
    summary:
      "A computer-vision tool that estimates a face's emotion using OpenCV, DeepFace and TensorFlow.",
    description:
      "Emotion Detector is a computer-vision tool built with OpenCV, the DeepFace library and TensorFlow that estimates a person's emotion from a face. Other attributes it reports, such as age, are estimates and may not be accurate.",
    category: "AI / ML",
    technologies: ["Python", "OpenCV", "DeepFace", "TensorFlow"],
    status: "project",
    featured: true,
    repositoryUrl: "https://github.com/Susanta2006/emotion-detect",
    visibility: "public",
    caution: "Outputs are model estimates, not facts about a person.",
    provenance:
      "Pinned repository on the public GitHub profile (description and language). Not run or reviewed in this audit.",
  },
  {
    id: "jarvis-v9",
    name: "Jarvis-v9",
    summary:
      "Independent research on a modular conversational agent with persistent memory, published as a journal case study and a preprint.",
    description:
      "Jarvis is an independent research project on a modular conversational agent that uses persistent-memory concepts. A case study is published in IJSR (Vol. 14, Issue 12, December 2025), and the Jarvis-v9 preprint, which describes nine cognitive engines, is on ResearchGate and has not been peer reviewed. The papers describe the architecture and observed behaviour; they do not establish general intelligence. This is separate from the Jarvis assistant on this website, which is a chat assistant backed by a language-model API and grounded in this portfolio's data.",
    category: "Research",
    tags: [
      "Conversational agents",
      "Persistent memory",
      "Modular architecture",
    ],
    status: "research",
    featured: false,
    publicationUrl:
      "https://www.ijsr.net/getabstract.php?paperid=MR251206000138",
    provenance:
      "IJSR listing and the GitHub profile README. No source repository identified, so none is shown.",
  },
  {
    id: "qnme-omega",
    name: "QNME-omega",
    summary:
      "Ongoing research into memory- and compute-conscious AI/ML workflows for resource-constrained hardware.",
    description:
      "QNME-omega is an experimental architecture investigating memory-conscious and compute-conscious AI/ML workflows for resource-constrained hardware. It is ongoing research. It is not presented as a proven or universal AI architecture, and no benchmark results, speed improvements or memory savings are claimed until they are published.",
    category: "Research",
    tags: [
      "Memory-conscious AI",
      "Resource-constrained hardware",
      "Experimental architecture",
    ],
    status: "research",
    featured: false,
    repositoryStatus: "unpublished",
    visibility: "private",
    caution: "Research in progress. No published benchmarks yet.",
    provenance:
      "Brief and the GitHub profile README. No repository exists on the public profile, so none is linked. The acronym is expanded differently across materials and is deliberately not expanded here.",
  },
  {
    id: "campuscopilot",
    name: "CampusCopilot",
    summary:
      "An AI-powered study platform for higher-education and competitive-exam students, in active development.",
    description:
      "CampusCopilot is an AI-oriented educational platform under active development, aimed at higher-education students and competitive-exam preparation such as GATE and NEET PG. Work so far covers study-support features, previous-year-question practice and curated video playlists. It has not launched publicly.",
    category: "Education",
    technologies: [
      "React",
      "TypeScript",
      "TanStack",
      "Supabase",
      "Tailwind CSS",
    ],
    status: "in-development",
    featured: false,
    image: {
      base: "/images/projects/campuscopilot",
      width: 1000,
      height: 535,
      alt: "Preview of the CampusCopilot landing page",
    },
    repositoryStatus: "unpublished",
    visibility: "private",
    provenance:
      "Brief (not yet on GitHub), previous site copy and the owner's development notes. Not in the 29 public repositories. The previous README linked it to a placeholder URL, which was dropped.",
  },
  {
    id: "medical-ai",
    name: "Medical AI System",
    summary:
      "An experimental decision-support project exploring symptom-based models and how to communicate their uncertainty.",
    description:
      "An experimental decision-support project exploring symptom-based models. The work examines how to communicate model uncertainty, how to handle inputs the model does not match, how to evaluate performance and robustness, and how a human reviewer should stay in the loop. It is a learning and research project and has not been validated for clinical use.",
    category: "Healthcare",
    tags: [
      "Symptom-based models",
      "Uncertainty communication",
      "Model evaluation",
      "Robustness checks",
    ],
    status: "experimental",
    featured: false,
    caution:
      "Not a clinically validated diagnostic tool. It must not be used to diagnose or treat any condition.",
    provenance:
      "Brief. No source code, demo or repository was supplied, so no links are shown.",
  },
  {
    id: "ai-tutor-rag",
    name: "AI Tutor — Document Q&A",
    summary:
      "A retrieval-augmented generation app for asking questions about your own documents.",
    description:
      "A retrieval-augmented generation (RAG) application for conversational question answering over documents. The pipeline covers document processing, embeddings, retrieval and answer generation. Implementation details have not been confirmed against source code.",
    category: "AI / ML",
    tags: ["RAG", "Embeddings", "Document processing", "Conversational Q&A"],
    status: "project",
    featured: false,
    provenance:
      "Brief. No matching repository was identified among the pinned public repositories, so no links are shown. Add the repository URL here when confirmed.",
  },
  {
    id: "boreal-basin",
    name: "Boreal Basin",
    summary: "Client product — details available on request.",
    description: "Client product. Details are available on request.",
    category: "Client work",
    status: "client",
    featured: false,
    visibility: "on-request",
    provenance:
      "Brief only. Boreal Basin appears nowhere in the supplied code or public profiles, so its purpose and features could not be verified and none are described.",
  },
  {
    id: "fsmn",
    name: "FSMN",
    summary:
      "An experimental neural architecture based on spiking-neuron dynamics and local learning.",
    description:
      "FSMN (Forward-Spiking Memorphic Network) is an experimental neural architecture involving spiking-neuron dynamics, local learning and alternative learning mechanisms. It is early-stage research.",
    category: "Research",
    tags: ["Spiking neurons", "Local learning"],
    status: "research",
    featured: false,
    provenance:
      "Appeared only in the previous Jarvis context, not on the previous site or GitHub. Remove if it should not be public.",
  },
];

/** Projects shown in the home carousel, in display order. */
export function featuredProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/** The text shown in place of a repository link when none exists yet. */
export function repositoryNote(p: Project): string | undefined {
  if (p.repositoryUrl) return undefined;
  if (p.repositoryStatus === "unpublished")
    return "Repository not yet published";
  return undefined;
}
