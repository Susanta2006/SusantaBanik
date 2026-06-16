/**
 * Lightweight client-side error reporting with privacy-safe breadcrumbs.
 *
 * - No PII: redacts query strings, form values, email/phone-looking tokens.
 * - No remote endpoint by default — logs structured records to the console
 *   and stashes the last N on window.__SB_ERRORS__ so they can be inspected
 *   from devtools without leaking anything off the device.
 * - Captures: window.onerror, unhandledrejection, route changes, fetch
 *   failures, and explicit `report()` calls.
 */

type Breadcrumb = {
  ts: number;
  kind: "nav" | "click" | "fetch" | "log" | "custom";
  message: string;
  meta?: Record<string, string | number | boolean | undefined>;
};

type ErrorRecord = {
  ts: number;
  message: string;
  stack?: string;
  url: string;
  breadcrumbs: Breadcrumb[];
};

const MAX_BREADCRUMBS = 25;
const MAX_ERRORS = 20;
const breadcrumbs: Breadcrumb[] = [];
const errors: ErrorRecord[] = [];
let installed = false;

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const PHONE_RE = /\+?\d[\d\s().-]{7,}\d/g;
const TOKEN_RE = /\b[A-Za-z0-9_-]{24,}\b/g;

function scrub(input: string): string {
  if (!input) return input;
  return input
    .replace(EMAIL_RE, "[email]")
    .replace(PHONE_RE, "[phone]")
    .replace(TOKEN_RE, "[token]")
    .slice(0, 500);
}

function scrubUrl(input: string): string {
  try {
    const u = new URL(input, typeof window !== "undefined" ? window.location.href : "http://x/");
    // Drop query + hash to avoid leaking anything user-typed.
    return `${u.origin}${u.pathname}`;
  } catch {
    return scrub(input);
  }
}

export function addBreadcrumb(crumb: Omit<Breadcrumb, "ts">) {
  breadcrumbs.push({ ...crumb, ts: Date.now(), message: scrub(crumb.message) });
  if (breadcrumbs.length > MAX_BREADCRUMBS) breadcrumbs.shift();
}

export function report(error: unknown, context?: string) {
  const err =
    error instanceof Error
      ? error
      : new Error(typeof error === "string" ? error : "Unknown error");
  const record: ErrorRecord = {
    ts: Date.now(),
    message: scrub(`${context ? `[${context}] ` : ""}${err.message}`),
    stack: err.stack ? scrub(err.stack) : undefined,
    url: typeof window !== "undefined" ? scrubUrl(window.location.href) : "",
    breadcrumbs: breadcrumbs.slice(),
  };
  errors.push(record);
  if (errors.length > MAX_ERRORS) errors.shift();
  // Console is the transport. Wrapped in a tag so it's easy to filter.
  console.error("[SB:error]", record);
  if (typeof window !== "undefined") {
    (window as unknown as { __SB_ERRORS__?: ErrorRecord[] }).__SB_ERRORS__ = errors;
  }
}

export function installErrorReporter() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (ev) => {
    report(ev.error ?? ev.message, "window.onerror");
  });
  window.addEventListener("unhandledrejection", (ev) => {
    report(ev.reason, "unhandledrejection");
  });

  // Route-change breadcrumbs (pushState/popstate).
  const push = history.pushState;
  history.pushState = function (...args: Parameters<typeof history.pushState>) {
    addBreadcrumb({ kind: "nav", message: scrubUrl(String(args[2] ?? window.location.href)) });
    return push.apply(this, args);
  };
  window.addEventListener("popstate", () => {
    addBreadcrumb({ kind: "nav", message: scrubUrl(window.location.href) });
  });

  // Click breadcrumbs (element tag + role/text, no values).
  window.addEventListener(
    "click",
    (ev) => {
      const t = ev.target as HTMLElement | null;
      if (!t) return;
      const tag = t.tagName?.toLowerCase() ?? "?";
      const label =
        t.getAttribute("aria-label") ||
        t.getAttribute("data-sb-id") ||
        (t.textContent?.trim().slice(0, 40) ?? "");
      addBreadcrumb({ kind: "click", message: `${tag}:${scrub(label)}` });
    },
    { capture: true, passive: true },
  );

  // Wrap fetch to record failures (status + scrubbed URL only).
  const origFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = typeof args[0] === "string" ? args[0] : (args[0] as Request).url;
    try {
      const res = await origFetch(...args);
      if (!res.ok) {
        addBreadcrumb({
          kind: "fetch",
          message: `${res.status} ${scrubUrl(url)}`,
          meta: { status: res.status },
        });
      }
      return res;
    } catch (err) {
      addBreadcrumb({ kind: "fetch", message: `fail ${scrubUrl(url)}` });
      throw err;
    }
  };
}
