export type PortfolioProject = {
  id: string; name: string; summary: string; category: string; technologies: string[];
  status: "Live" | "Research" | "In development" | "Client product" | "Experimental";
  image?: string; demoUrl?: string; repositoryUrl?: string; documentationUrl?: string; publicationUrl?: string;
  visibility: "public" | "private";
};

/** Central portfolio registry. Add verified links here; optional links are intentionally omitted. */
export const projects: PortfolioProject[] = [
  { id: "labbench", name: "LabBench", summary: "A browser-based coding environment for programming practice and data-science experiments. Check the live demo for current runtime and language support.", category: "Developer tools", technologies: ["Python", "Web IDE", "Education"], status: "Live", image: "/images/project-labbench.png", demoUrl: "https://labbench-woad.vercel.app/", visibility: "public" },
  { id: "bloodsignal", name: "BloodSignal", summary: "A Team Pragmatrix hackathon concept for helping people discover relevant blood banks using natural-language requests and location context. Availability must be confirmed directly with providers.", category: "Healthcare", technologies: ["AI agents", "Location", "Web app"], status: "Experimental", visibility: "public" },
  { id: "qnme-omega", name: "QNME-omega", summary: "Ongoing research into memory- and compute-conscious AI/ML workflows for resource-constrained hardware. Experimental; no universal performance claims are implied.", category: "AI research", technologies: ["Python", "Efficiency", "ML systems"], status: "Research", visibility: "public" },
  { id: "jarvis-v9", name: "Jarvis / Jarvis-v9", summary: "Independent conversational-agent research exploring modular components and persistent-memory concepts. Research directions are distinct from verified production capabilities.", category: "AI research", technologies: ["Agents", "Memory", "LLMs"], status: "Research", publicationUrl: "https://www.researchgate.net/profile/Susanta-Banik-4/research", visibility: "public" },
  { id: "ai-tutor-rag", name: "AI Tutor — Document Q&A", summary: "A retrieval-augmented question-answering concept for asking questions against supplied documents. Exact ingestion, embedding, and retrieval capabilities depend on the current implementation.", category: "Generative AI", technologies: ["RAG", "Embeddings", "LLMs"], status: "Experimental", visibility: "public" },
  { id: "campuscopilot", name: "CampusCopilot", summary: "An educational platform under development for higher-education study workflows. The project is not yet published to GitHub.", category: "Education", technologies: ["AI", "Student tools", "Web app"], status: "In development", image: "/images/project-campuscopilot.jpg", visibility: "public" },
  { id: "devhub", name: "CodeWithFun DevHub — Bookstore", summary: "An online bookstore and resource platform for developers and students. See the deployed product for its current catalogue and functionality.", category: "Digital product", technologies: ["Web development", "E-commerce"], status: "Live", image: "/images/project-devhub.png", demoUrl: "https://codewithfun-devhub.vercel.app/", visibility: "public" },
  { id: "boreal-basin", name: "Boreal Basin", summary: "Client product — details available on request.", category: "Client work", technologies: ["Product engineering"], status: "Client product", visibility: "private" },
  { id: "medical-ai", name: "Medical AI System", summary: "Experimental decision-support research exploring symptom-based models, uncertainty communication, evaluation, and robustness. This is not a clinically validated diagnostic tool.", category: "Healthcare AI", technologies: ["ML evaluation", "Uncertainty", "Research"], status: "Research", visibility: "public" },
];
