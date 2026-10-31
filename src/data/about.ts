/**
 * About and company narrative.
 *
 * Wording follows the original site. Three sentences were changed, all noted
 * in docs/AUDIT.md: the project count ("twenty end-to-end projects") and the
 * "Base 1 AGI" phrase were removed because they cannot be verified or conflict
 * with the research claims rules, and "groundbreaking" was dropped from the
 * QNME-omega description.
 */

export const ABOUT_NARRATIVE: string[] = [
  "I’m Susanta Banik. Born and raised in Agartala, Tripura, to my parents Mr. Sunil Banik and Mrs. Sukla Banik, my journey is rooted in a deep curiosity for computing and innovation.",
  "Today I am an AI/ML Engineer, Researcher, Data Scientist and Full Stack Developer, dedicated to building complex systems that make a tangible, real-world impact.",
  "I am currently pursuing a dual-degree path: a B.S. in Applied AI & Data Science at the Indian Institute of Technology (IIT) Jodhpur, alongside a B.Tech in AI & Data Science at Techno College of Engineering, Agartala.",
  "These parallel tracks shape my engineering philosophy. One grounds me in theoretical reasoning and mathematics; the other pushes me to build and ship robust software quickly.",
  "My passion lies at the frontier of artificial intelligence. I am the inventor of QNME-omega, an experimental architecture with a clear aim: to make it possible to train large datasets on low-specification devices, lowering the hardware barrier for developers.",
  "My broader research in algorithm optimisation and machine learning is recognised across Google Scholar, ResearchGate and the International Journal of Science and Research (IJSR).",
  "My work sits where machine learning meets real products. I bridge complex data models and user-facing applications, moving between TensorFlow notebooks, Python microservices, Power BI dashboards and full-stack web platforms.",
  "My projects span fraud detection, time-series forecasting, natural language tools and conversational AI agents.",
  "I believe in knowledge sharing and giving back to the tech community. I am the founder of CampusCopilot, an educational platform for higher-education students, and I run the CodeWithFun ecosystem: a YouTube channel for students and developers, and an affordable online bookstore where every book is priced to be genuinely accessible.",
  "I also take on freelance work, building apps, websites and AI tools for clients through Shristi AI Web Creations™.",
  "When I am not building machine learning pipelines or platforms, I keep sharpening my Data Structures and Algorithms (DSA) and problem-solving skills through competitive programming on LeetCode and HackerRank.",
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
