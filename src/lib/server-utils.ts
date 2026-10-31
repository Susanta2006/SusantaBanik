/** Small helpers shared by the API routes. Server-side only. */

/**
 * Best-effort client IP. On Vercel, `x-vercel-forwarded-for` is set by the
 * platform and cannot be spoofed by the client, so it is checked first.
 * `cf-connecting-ip` is last because a client can send it on other hosts.
 */
export function extractIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("cf-connecting-ip") ||
    "unknown"
  );
}

type Entry = { hits: number[]; offences: number; bannedUntil: number };

export type Limits = {
  /** [maxHits, windowMs] pairs. A request is refused when any window is full. */
  windows: [number, number][];
  /** Repeated refusals within this many strikes trigger a temporary ban. */
  banThreshold: number;
  banMs: number;
};

/**
 * In-memory sliding-window limiter with temporary bans.
 *
 * State lives in one server instance, so on serverless hosts it is a
 * best-effort shield rather than a hard guarantee. For hard limits, put a
 * shared store (e.g. Redis) behind the same interface.
 */
export class RateLimiter {
  private store = new Map<string, Entry>();
  private longest: number;

  constructor(private limits: Limits) {
    this.longest = Math.max(...limits.windows.map(([, ms]) => ms));
  }

  check(key: string): { ok: true } | { ok: false; banned: boolean } {
    const now = Date.now();
    const entry = this.store.get(key) ?? {
      hits: [],
      offences: 0,
      bannedUntil: 0,
    };
    if (entry.bannedUntil > now) {
      this.store.set(key, entry);
      return { ok: false, banned: true };
    }
    entry.hits = entry.hits.filter((t) => now - t < this.longest);
    const full = this.limits.windows.some(
      ([max, ms]) => entry.hits.filter((t) => now - t < ms).length >= max,
    );
    if (full) {
      entry.offences += 1;
      if (entry.offences >= this.limits.banThreshold) {
        entry.bannedUntil = now + this.limits.banMs;
        entry.offences = 0;
      }
      this.store.set(key, entry);
      this.prune(now);
      return { ok: false, banned: entry.bannedUntil > now };
    }
    entry.hits.push(now);
    entry.offences = Math.max(0, entry.offences - 1);
    this.store.set(key, entry);
    this.prune(now);
    return { ok: true };
  }

  private prune(now: number) {
    if (this.store.size < 5_000) return;
    for (const [k, v] of this.store) {
      if (v.bannedUntil > now) continue;
      if (
        v.hits.length === 0 ||
        now - v.hits[v.hits.length - 1] > this.longest
      ) {
        this.store.delete(k);
      }
    }
  }
}

/** fetch with a hard timeout. Throws on timeout. */
export async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function json(
  body: unknown,
  status = 200,
  headers?: HeadersInit,
): Response {
  return Response.json(body, { status, headers });
}
