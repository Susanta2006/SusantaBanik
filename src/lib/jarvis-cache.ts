
/**
 * Jarvis Q&A local cache.
 *
 * Features:
 * - Exact normalized-question matching.
 * - Conservative fuzzy matching.
 * - Automatic TTL expiration.
 * - Bounded entry count and storage size.
 * - Input validation and malformed-data recovery.
 * - Avoids caching sensitive and time-sensitive questions.
 * - Preserves rememberAnswer() and findCachedAnswer().
 *
 * Note: localStorage is not encrypted or suitable for secrets.
 */

const KEY = "sb:jarvis:cache:v1";

const MAX_ENTRIES = 20;
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_QUESTION_LENGTH = 500;
const MAX_ANSWER_LENGTH = 6_000;
const MAX_STORAGE_CHARS = 120_000;
const MIN_SIMILARITY = 0.68;

export type CachedAnswer = {
  q: string;
  a: string;
  ts: number;
};

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been",
  "but", "by", "can", "could", "did", "do", "does",
  "for", "from", "had", "has", "have", "how", "i",
  "in", "is", "it", "its", "me", "my", "of", "on",
  "or", "our", "please", "should", "so", "tell", "that",
  "the", "their", "them", "there", "this", "to", "was",
  "we", "what", "when", "where", "which", "who", "why",
  "will", "with", "would", "you", "your", "about",
  "explain", "describe", "give", "show",
]);

// Avoid reusing answers that may depend on changing conditions.
const TIME_SENSITIVE =
  /\b(today|right now|currently|current|latest|recent|this week|this month|tonight|tomorrow|yesterday|weather|forecast|price|pricing|availability|available now|open now|live status|real[- ]time|stock price|exchange rate|deadline|schedule)\b/i;

// Avoid storing questions likely to contain credentials or private data.
const SENSITIVE =
  /\b(password|passcode|api[- ]?key|secret key|access token|refresh token|private key|credentials|confidential|home address|phone number|bank account)\b/i;

function canUseStorage(): boolean {
  return typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined";
}

function normalize(question: string): string {
  return question
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function canonicalize(question: string): string {
  return normalize(question)
    .split(" ")
    .filter((token) => token && !STOP_WORDS.has(token))
    .join(" ");
}

function tokens(question: string): Set<string> {
  return new Set(
    canonicalize(question)
      .split(" ")
      .filter((token) => token.length >= 3),
  );
}

function isCacheableQuestion(question: string): boolean {
  return (
    question.length > 0 &&
    question.length <= MAX_QUESTION_LENGTH &&
    !TIME_SENSITIVE.test(question) &&
    !SENSITIVE.test(question)
  );
}

function isValidEntry(value: unknown): value is CachedAnswer {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<CachedAnswer>;

  return (
    typeof entry.q === "string" &&
    entry.q.trim().length > 0 &&
    entry.q.length <= MAX_QUESTION_LENGTH &&
    typeof entry.a === "string" &&
    entry.a.trim().length > 0 &&
    entry.a.length <= MAX_ANSWER_LENGTH &&
    typeof entry.ts === "number" &&
    Number.isFinite(entry.ts) &&
    entry.ts > 0
  );
}

function read(): CachedAnswer[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const now = Date.now();

    return parsed
      .filter(isValidEntry)
      .filter((entry) =>
        now - entry.ts >= 0 &&
        now - entry.ts < TTL_MS &&
        isCacheableQuestion(entry.q),
      )
      .slice(-MAX_ENTRIES);
  } catch {
    return [];
  }
}

function write(entries: CachedAnswer[]): void {
  if (!canUseStorage()) return;

  try {
    let bounded = entries
      .filter(isValidEntry)
      .filter((entry) => Date.now() - entry.ts < TTL_MS)
      .slice(-MAX_ENTRIES);

    // Keep the newest entries within the storage budget.
    while (
      bounded.length > 0 &&
      JSON.stringify(bounded).length > MAX_STORAGE_CHARS
    ) {
      bounded.shift();
    }

    if (bounded.length === 0) {
      window.localStorage.removeItem(KEY);
      return;
    }

    window.localStorage.setItem(KEY, JSON.stringify(bounded));
  } catch {
    // Storage may be blocked or full. Caching must never break chat.
  }
}

/**
 * Save a successful Q&A response.
 * Call only after the API has returned a usable answer.
 */
export function rememberAnswer(
  question: string,
  answer: string,
): void {
  const q = question.trim();
  const a = answer.trim();

  if (
    !isCacheableQuestion(q) ||
    !a ||
    a.length > MAX_ANSWER_LENGTH
  ) {
    return;
  }

  const key = canonicalize(q);
  if (!key) return;

  const entries = read().filter(
    (entry) => canonicalize(entry.q) !== key,
  );

  entries.push({
    q,
    a,
    ts: Date.now(),
  });

  write(entries);
}

/**
 * Find a safe cached answer.
 * Exact canonical matches win. Fuzzy matches must pass a
 * conservative similarity threshold.
 */
export function findCachedAnswer(
  question: string,
): CachedAnswer | null {
  const q = question.trim();

  if (!isCacheableQuestion(q)) return null;

  const queryKey = canonicalize(q);
  if (!queryKey) return null;

  const entries = read();

  // Exact match after normalization and stop-word removal.
  const exact = entries
    .filter((entry) => canonicalize(entry.q) === queryKey)
    .sort((a, b) => b.ts - a.ts)[0];

  if (exact) return exact;

  const queryTokens = tokens(q);

  // Avoid guessing from a single keyword such as "Jarvis".
  if (queryTokens.size < 2) return null;

  let best: CachedAnswer | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    const entryTokens = tokens(entry.q);

    if (entryTokens.size < 2) continue;

    let shared = 0;

    for (const token of queryTokens) {
      if (entryTokens.has(token)) shared++;
    }

    // Sørensen-Dice coefficient: 0 = no overlap, 1 = exact set overlap.
    const score =
      (2 * shared) / (queryTokens.size + entryTokens.size);

    // Prefer the most recent entry when scores tie.
    if (
      score >= MIN_SIMILARITY &&
      (
        score > bestScore ||
        (score === bestScore && entry.ts > (best?.ts ?? 0))
      )
    ) {
      best = entry;
      bestScore = score;
    }
  }

  return best;
}

/**
 * Optional: clear the local Jarvis cache.
 */
export function clearJarvisCache(): void {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Ignore storage restrictions.
  }
}
