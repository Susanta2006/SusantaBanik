/**
 * Local cache of the most recent successful Jarvis Q&A pairs.
 *
 * Used so the site still surfaces useful content when /api/chat is
 * temporarily unavailable. Lives in localStorage; capped to a small,
 * bounded size so it can't grow without limit.
 */

const KEY = "sb:jarvis:cache:v1";
const MAX_ENTRIES = 20;

export type CachedAnswer = { q: string; a: string; ts: number };

function read(): CachedAnswer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CachedAnswer =>
        !!x &&
        typeof (x as CachedAnswer).q === "string" &&
        typeof (x as CachedAnswer).a === "string",
    );
  } catch {
    return [];
  }
}

function write(entries: CachedAnswer[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    /* quota / private mode — ignore */
  }
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function rememberAnswer(question: string, answer: string) {
  const q = question.trim();
  const a = answer.trim();
  if (!q || !a) return;
  const entries = read().filter((e) => normalize(e.q) !== normalize(q));
  entries.push({ q, a, ts: Date.now() });
  write(entries);
}

/**
 * Return a cached answer whose question overlaps meaningfully with the
 * incoming question. Exact match wins; otherwise we score by shared
 * 4+ char tokens and return the best if it clears a minimum threshold.
 */
export function findCachedAnswer(question: string): CachedAnswer | null {
  const entries = read();
  if (entries.length === 0) return null;
  const qn = normalize(question);
  const exact = entries.find((e) => normalize(e.q) === qn);
  if (exact) return exact;

  const tokens = new Set(qn.split(" ").filter((t) => t.length >= 4));
  if (tokens.size === 0) return null;

  let best: { entry: CachedAnswer; score: number } | null = null;
  for (const e of entries) {
    const ets = new Set(normalize(e.q).split(" ").filter((t) => t.length >= 4));
    let shared = 0;
    for (const t of tokens) if (ets.has(t)) shared += 1;
    const score = shared / Math.max(1, tokens.size);
    if (!best || score > best.score) best = { entry: e, score };
  }
  return best && best.score >= 0.5 ? best.entry : null;
}
