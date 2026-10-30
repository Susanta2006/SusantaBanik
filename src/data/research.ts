/**
 * Research registry — journal papers and preprints.
 * Add an entry here and it appears on /research, in structured data and in Jarvis.
 */

export type Publication = {
  id: string;
  type: "Journal paper" | "Preprint";
  title: string;
  venue: string;
  year: number;
  /** Month/volume details exactly as published. */
  detail?: string;
  identifierLabel: string;
  identifier: string;
  summary: string;
  url: string;
  urlLabel: string;
  /** Additional places the work is listed. */
  alsoOn?: { label: string; href: string }[];
  /** DOI, when one exists. */
  doi?: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    id: "ijsr-emergent-social",
    type: "Journal paper",
    title:
      "Emergent Social Consciousness in a Minimalist Conversational Agent: A Case Study on Jarvis — Observations from a Custom-Built Artificial Intelligence System",
    venue: "International Journal of Science and Research (IJSR)",
    year: 2025,
    detail: "Vol. 14, Issue 12, December 2025, pp. 480–482",
    identifierLabel: "Paper ID",
    identifier: "MR251206000138",
    doi: "10.21275/MR251206000138",
    summary:
      "A case study of how a minimal conversational architecture can show social-seeming behaviour, examining the boundary between programmed responses and apparent social awareness in lightweight agents.",
    url: "https://www.ijsr.net/getabstract.php?paperid=MR251206000138",
    urlLabel: "View on IJSR",
    alsoOn: [
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/profile/Susanta-Banik-4/research",
      },
    ],
  },
  {
    id: "jarvis-v9-preprint",
    type: "Preprint",
    title:
      "Jarvis-v9: A Continual-Learning Synthetic AGI with Biologically-Inspired Generative Architecture, Persistent Memory, and Nine Cognitive Engines",
    venue: "ResearchGate",
    year: 2026,
    identifierLabel: "DOI",
    identifier: "10.13140/RG.2.2.12547.05921",
    doi: "10.13140/RG.2.2.12547.05921",
    summary:
      "A preprint describing a continual-learning agent with persistent memory and nine cognitive engines. It has not been peer reviewed.",
    url: "https://www.researchgate.net/profile/Susanta-Banik-4/research",
    urlLabel: "Read on ResearchGate",
  },
];

/** The IJSR DOI is published with the dx.doi.org resolver; both resolve to the same record. */
export function doiUrl(doi: string): string {
  return doi.startsWith("10.21275/")
    ? `https://dx.doi.org/${doi}`
    : `https://doi.org/${doi}`;
}
