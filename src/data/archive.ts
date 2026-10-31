/**
 * The wider catalogue of smaller projects, carried over from the previous site.
 * Descriptions are the previous site's wording and have not been re-verified
 * against source code; Jarvis treats them as "listed in the portfolio archive".
 */

export type ArchiveGroup = {
  group: string;
  items: { name: string; note: string }[];
};

function split(entry: string): { name: string; note: string } {
  const i = entry.indexOf(" — ");
  return i === -1
    ? { name: entry, note: "" }
    : { name: entry.slice(0, i), note: entry.slice(i + 3) };
}

const raw: [string, string[]][] = [
  [
    "Web development",
    [
      "Progressive Web App & Real-Time Code Execution IDE with multi-language compilation support",
      "Relational DBMS for School Administration",
      "Full-Stack E-Commerce Store with Payment Integration",
      "Online Exam Portal with Live Timer & Quiz Engine",
      "Real Estate Listing App with Location Filtering",
      "Restaurant Billing & Kitchen Management Dashboard",
      "Digital Panchayat — Rural Governance Web Portal",
      "Personal Portfolio & AGI Research Showcase Site",
      "Student-Teacher Appointment Scheduler",
      "Dynamic Greetings & CSS Animation Showcase Webpage",
    ],
  ],
  [
    "Python",
    [
      "age-calculator — core utility using date-interval calculation logic to parse exact time differences",
      "calculus-solver — mathematical parsing library engineered to compute derivatives and integrals via node trees",
      "weather-tool — automation script fetching real-time meteorological JSON payloads from external open APIs",
      "image-compressor — script using matrix factorization or image processing libraries to optimize file dimensions",
      "text-typer — automation utility leveraging OS-level keyboard events to simulate live user typing speed",
      "dictionary-qna — parsing tool querying structural JSON localized dictionaries for definition strings",
      "task-scheduler — script executing background date-time comparison logic to trigger local file processes",
      "indian-panchangam — astro-mathematical script computing planetary positions using localized traditional algorithms",
      "password-hasher — security script utilizing standard crypto modules to apply salts and hash input strings",
    ],
  ],
  [
    "Machine learning",
    [
      "house-price-predictor — tabular regression model applying tree-based ensembles to project real estate valuations",
      "language-detector — text classifier implementing n-gram statistical models to evaluate and identify input string origins",
      "fraud-detector — anomaly detection pipeline using tabular isolation forests to flag skewed transactional records",
      "rating-predictor — NLP regression pipeline extracting word-frequency weights to project continuous numerical scores",
      "medical-data-analyzer — tabular analytics tool running normalization and correlation checks across diagnostic data frames",
      "restaurant-recommender — recommender engine applying matrix factorization or cosine similarity to rank target entries",
    ],
  ],
  [
    "Deep learning",
    [
      "cancer-cell-detector — computer vision network utilizing convolutional layers to classify anomalies in digital biopsy images",
      "language-translator — sequence-to-sequence translation pipeline using tokenization models and encoder-decoder mechanisms",
      "handwriting-classifier — computer vision model utilizing convolutional layers to run feature extraction on hand-drawn character arrays",
      "image-classifier — vision classification network training deep feature matrices to map input pixels to structural label classes",
      "speech-recognizer — acoustic processing pipeline using neural networks to decode continuous audio wave frequencies into text tokens",
      "lstm-quiz-game — text generation model leveraging Long Short-Term Memory recurrent layers to construct adaptive trivia layouts",
      "lstm-stock-forecaster — recurrent sequence network built in TensorFlow to track historical time-series pricing vectors",
      "archeo-ai — applied AI implementation leveraging OpenAI large language model endpoints and embedding vectors to spot historical anomalies",
      "jarvis-v9 — custom multi-engine Python cognitive architecture executing synthetic human AGI simulations through persistent memory streams",
    ],
  ],
  [
    "Data analytics",
    [
      "sales-performance-dashboard — PowerBI dashboard utilizing advanced DAX modeling to track regional revenue trends and margins",
      "sales-report-dashboard — Tableau workbook to showcase sales over time, profit-loss, regional contributions, discounts, profits",
      "supply-chain-analytics — Tableau workbook implementing interactive ETL pipelines to isolate warehouse bottleneck metrics",
      "customer-churn-bi — PowerBI executive screen integrating cohort analysis and retention metrics from relational database feeds",
    ],
  ],
];

export const ARCHIVE: ArchiveGroup[] = raw.map(([group, items]) => ({
  group,
  items: items.map(split),
}));
