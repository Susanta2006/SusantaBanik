/**
 * Central site registry — identity, business, links and background.
 *
 * Everything the site and the Jarvis assistant say about Susanta comes from
 * the files in `src/data/`. Edit them here; no component needs to change.
 *
 * This module has no imports on purpose so it can also run under plain Node
 * (see `tests/`).
 */

export const SITE = {
  url: "https://susanta-banik.vercel.app",
  name: "Susanta Banik",
  /** Exact wording, capitalisation and punctuation are part of the brand. */
  tagline: "Building Intelligence, thoughtfully.",
  email: "susanta.company4@gmail.com",
  location: "Agartala, Tripura, India",
  languages: ["English", "Hindi", "Bengali"],
  /** Titles used in the hero and metadata. */
  roles: [
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Independent AI Researcher",
  ],
  founderTitle: "Founder & Principal AI Engineer",
  intro:
    "I design, build and test practical AI and web software — from retrieval-augmented apps and learning tools to full-stack products — and publish independent research on memory-conscious AI.",
  metaDescription:
    "Susanta Banik — AI/ML engineer, full-stack developer and independent AI researcher. Founder of Shristi AI Web Creations™. Projects, research and services.",
  /**
   * Public phone number from the previous site. Hidden by default: it is not
   * needed now that the form and email are available. Set `showPhone` to true
   * to show it again on the contact section.
   */
  phone: "+91 81190 98684",
  showPhone: false,
} as const;

export const BUSINESS = {
  name: "Shristi AI Web Creations™",
  plainName: "Shristi AI Web Creations",
  /** Never describe this as a private limited company. */
  legalDescription:
    "A Udyam-registered sole-proprietorship micro enterprise providing software development, AI/ML solutions, web applications and related digital engineering services.",
  location: "Agartala, Tripura, India",
  linkedin: "https://www.linkedin.com/company/shristi-ai-web-creations/",
  website: "https://susanta-banik.vercel.app/",
  focus: [
    "Practical software engineering",
    "AI/ML solutions and LLM applications",
    "Web development",
    "Digital products",
  ],
  principles: [
    {
      title: "Problem first",
      body: "Start from the problem the user has, then choose the smallest technology that solves it.",
    },
    {
      title: "Maintainable by default",
      body: "Readable code, documented set-up and honest status notes, so the next person can pick the work up.",
    },
    {
      title: "Responsible experimentation",
      body: "AI features are tested, scoped and labelled for what they are — experimental work is not sold as proven.",
    },
    {
      title: "Full-stack delivery",
      body: "Interface, API, data and deployment handled together by one engineer.",
    },
  ],
} as const;

export type ProfileGroup =
  "code" | "research" | "social" | "content" | "business";

export type ProfileLink = {
  id: string;
  label: string;
  href: string;
  group: ProfileGroup;
  /** Short handle shown next to the label. */
  handle?: string;
  /** Show in the footer link row. */
  footer?: boolean;
  /** Show in the hero link row. */
  hero?: boolean;
};

/**
 * Professional profiles. URLs are exactly as supplied — none are rewritten.
 * The Google Scholar identifier is intentionally preserved.
 */
export const PROFILES: ProfileLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Susanta2006",
    group: "code",
    handle: "Susanta2006",
    footer: true,
    hero: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/susanta-banik",
    group: "social",
    handle: "in/susanta-banik",
    footer: true,
    hero: true,
  },
  {
    id: "scholar",
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=CBZeE3wAAAAJ&hl=en",
    group: "research",
    footer: true,
    hero: true,
  },
  {
    id: "researchgate",
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Susanta-Banik-4",
    group: "research",
    footer: true,
  },
  {
    id: "dev",
    label: "DEV Community",
    href: "https://dev.to/susantabanik",
    group: "content",
    handle: "susantabanik",
  },
  {
    id: "medium",
    label: "Medium",
    href: "https://medium.com/@b24bs2374",
    group: "content",
    handle: "@b24bs2374",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/SusantaBan21",
    group: "social",
    handle: "@SusantaBan21",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@CodeWithFun-life",
    group: "content",
    handle: "@CodeWithFun-life",
  },
  {
    id: "hackerrank",
    label: "HackerRank",
    href: "https://hackerrank.com/profile/susanta_company4",
    group: "code",
    handle: "susanta_company4",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/Susanta_Banik/",
    group: "code",
    handle: "Susanta_Banik",
  },
  {
    id: "devhub",
    label: "CodeWithFun Dev Hub",
    href: "https://codewithfun-devhub.vercel.app/",
    group: "content",
  },
  {
    id: "shristi-linkedin",
    label: "Shristi AI Web Creations on LinkedIn",
    href: "https://www.linkedin.com/company/shristi-ai-web-creations/",
    group: "business",
  },
];

/**
 * URLs that exist in the supplied materials but are secondary to the profiles
 * above. Kept so nothing is lost; shown only where they add value.
 */
export const EXTRA_LINKS = {
  /** Used by the previous site for every "read on ResearchGate" button. */
  researchgateResearchTab:
    "https://www.researchgate.net/profile/Susanta-Banik-4/research",
  /** Supplied separately; the profile slug differs from the one above. Needs the owner's confirmation. */
  researchgateAlternateResearch:
    "https://www.researchgate.net/profile/Susanta-Banik/research",
} as const;

export function profile(id: string): ProfileLink {
  const found = PROFILES.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown profile id: ${id}`);
  return found;
}

export const SERVICES = [
  {
    id: "ai-ml",
    title: "AI/ML and LLM applications",
    body: "Retrieval-augmented generation, LLM-backed assistants, predictive models and AI features added to existing products.",
  },
  {
    id: "web-apps",
    title: "Full-stack web applications",
    body: "Websites, dashboards, portals and internal tools — interface, API and database built together.",
  },
  {
    id: "pwa",
    title: "Progressive web apps",
    body: "Responsive, installable web apps that work well on phones and low-spec devices.",
  },
  {
    id: "data",
    title: "Data and analytics",
    body: "Dashboards in Power BI and Tableau, data cleaning and reporting.",
  },
] as const;

export const EDUCATION = [
  {
    id: "iitj",
    degree: "B.S. in Applied AI and Data Science (online programme)",
    institution: "Indian Institute of Technology Jodhpur",
    status: "In progress",
  },
  {
    id: "tcea",
    degree: "B.Tech in AI and Data Science",
    institution: "Techno College of Engineering Agartala",
    status: "In progress",
  },
] as const;

/** Internships exactly as listed on the previous site. */
export const EXPERIENCE = [
  { id: "kyma", role: "AI/ML Engineer Intern", org: "Kyma AI Innovations" },
  {
    id: "unified",
    role: "Full-Stack Web Developer Intern",
    org: "Unified Mentors Pvt. Ltd",
  },
  {
    id: "cognifyz",
    role: "Machine Learning Intern",
    org: "Cognifyz Technologies",
  },
  { id: "saiket", role: "Machine Learning Intern", org: "Saiket Systems" },
  { id: "aspire", role: "Data Analyst Intern", org: "Aspire Interns" },
] as const;

export const SKILLS = [
  {
    group: "AI and ML",
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Deep learning",
      "Model evaluation",
      "RAG",
      "LLM agents",
      "Prompt engineering",
    ],
  },
  {
    group: "Data",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Power BI",
      "Tableau",
      "Statistical modelling",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "PHP"],
  },
  {
    group: "Web",
    items: ["React", "Tailwind CSS", "REST APIs", "MySQL", "PWA"],
  },
  {
    group: "Tools",
    items: [
      "Git",
      "GitHub",
      "Linux",
      "Jupyter",
      "Google Colab",
      "AWS",
      "Heroku",
    ],
  },
] as const;

/** A selection from the previous site's list; the full list stays on LinkedIn. */
export const CERTIFICATIONS = [
  {
    name: "Geodata Processing using Python and Machine Learning",
    issuer: "ISRO",
  },
  {
    name: "Application of AI/ML for Specific Crop Acreage Mapping",
    issuer: "ISRO",
  },
  { name: "A-Z Ethical Hacking", issuer: "IIT Patna" },
  { name: "JavaScript Specialist", issuer: "HackerRank" },
  { name: "SQL (Advanced)", issuer: "HackerRank" },
  { name: "Software Engineer Intern", issuer: "HackerRank" },
  {
    name: "AI Essentials, Microsoft Azure Professional Certificate",
    issuer: "Microsoft",
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Google Cloud Skills Boost",
  },
  { name: "Hadoop 101", issuer: "IBM" },
  { name: "TATA Gen AI Powered Data Analytics", issuer: "Forage" },
] as const;

export const NAV = [
  { label: "Projects", href: "/#projects" },
  { label: "Founder", href: "/#founder" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
