/**
 * About content, grouped into short sections for readers and crawlers.
 *
 * Wording follows the original site. Edits, all recorded in docs/AUDIT.md:
 * the unverifiable project count ("twenty end-to-end projects") and the
 * "Base 1 AGI" phrase are removed, and "groundbreaking" is dropped from the
 * QNME-omega line. Long paragraphs are split at sentence boundaries only.
 */

export type AboutSection = { id: string; title: string; paragraphs: string[] };

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    id: "who",
    title: "Who I am",
    paragraphs: [
      "I’m Susanta Banik. Born and raised in Agartala, Tripura, to my parents Mr. Sunil Banik and Mrs. Sukla Banik, my journey is rooted in a deep curiosity for computing and innovation.",
      "Today I am an AI/ML Engineer, Researcher, Data Scientist and Full Stack Developer, dedicated to building complex systems that make a tangible, real-world impact.",
    ],
  },
  {
    id: "education",
    title: "Education",
    paragraphs: [
      "I am currently pursuing a dual-degree path: a B.S. in Applied AI & Data Science at the Indian Institute of Technology (IIT) Jodhpur, alongside a B.Tech in AI & Data Science at Techno College of Engineering, Agartala.",
    ],
  },
  {
    id: "thinking",
    title: "How I think about engineering",
    paragraphs: [
      "These parallel tracks shape my engineering philosophy. One grounds me in theoretical reasoning and mathematics; the other pushes me to build and ship robust software quickly.",
    ],
  },
  {
    id: "research",
    title: "Research",
    paragraphs: [
      "My passion lies at the frontier of artificial intelligence.",
      "I am the inventor of QNME-omega, an experimental architecture with a clear aim: to make it possible to train large datasets on low-specification devices, lowering the hardware barrier for developers.",
      "My broader research in algorithm optimisation and machine learning is recognised across Google Scholar, ResearchGate and the International Journal of Science and Research (IJSR).",
    ],
  },
  {
    id: "build",
    title: "What I build",
    paragraphs: [
      "My work sits where machine learning meets real products. I bridge complex data models and user-facing applications, moving between TensorFlow notebooks, Python microservices, Power BI dashboards and full-stack web platforms.",
      "My projects span fraud detection, time-series forecasting, natural language tools and conversational AI agents.",
    ],
  },
  {
    id: "community",
    title: "Giving back and working with clients",
    paragraphs: [
      "I believe in knowledge sharing and giving back to the tech community.",
      "I am the founder of CampusCopilot, an educational platform for higher-education students, and I run the CodeWithFun ecosystem: a YouTube channel for students and developers, and an affordable online bookstore where every book is priced to be genuinely accessible.",
      "I also take on freelance work, building apps, websites and AI tools for clients through Shristi AI Web Creations™.",
    ],
  },
  {
    id: "problem-solving",
    title: "Problem solving",
    paragraphs: [
      "When I am not building machine learning pipelines or platforms, I keep sharpening my Data Structures and Algorithms (DSA) and problem-solving skills through competitive programming on LeetCode and HackerRank.",
    ],
  },
];

/** Date of birth as shown on the original site. Age is calculated from it at render time. */
export const BIRTH_DATE = "2006-10-20";

/** Personal facts shown beside the narrative. */
export const PERSONAL_FACTS = [
  { label: "Born", value: "20 October 2006" },
  { label: "Hometown", value: "Agartala, Tripura, India" },
  { label: "Based in", value: "Agartala, Tripura, India" },
  { label: "Languages", value: "English, Hindi, Bengali" },
  { label: "Parents", value: "Mr. Sunil Banik and Mrs. Sukla Banik" },
] as const;

/** Company narrative. Everything here comes from the registration and business data already on the site. */
export const COMPANY_NARRATIVE: string[] = [
  "Shristi AI Web Creations™ is the software and AI services business I run as Founder & Principal AI Engineer. It is a sole proprietorship, registered as a Udyam Micro Enterprise, based in Agartala, Tripura.",
  "The work covers custom software development, AI/ML solutions, LLM applications and pipelines, retrieval-augmented generation, agentic AI workflows, full-stack web applications, and software and digital product engineering.",
];
