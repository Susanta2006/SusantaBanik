//#region node_modules/.nitro/vite/services/ssr/assets/error-reporter-CmAk3SQT.js
var MAX_BREADCRUMBS = 25;
var MAX_ERRORS = 20;
var breadcrumbs = [];
var errors = [];
var installed = false;
var EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
var PHONE_RE = /\+?\d[\d\s().-]{7,}\d/g;
var TOKEN_RE = /\b[A-Za-z0-9_-]{24,}\b/g;
function scrub(input) {
	if (!input) return input;
	return input.replace(EMAIL_RE, "[email]").replace(PHONE_RE, "[phone]").replace(TOKEN_RE, "[token]").slice(0, 500);
}
function scrubUrl(input) {
	try {
		const u = new URL(input, typeof window !== "undefined" ? window.location.href : "http://x/");
		return `${u.origin}${u.pathname}`;
	} catch {
		return scrub(input);
	}
}
function addBreadcrumb(crumb) {
	breadcrumbs.push({
		...crumb,
		ts: Date.now(),
		message: scrub(crumb.message)
	});
	if (breadcrumbs.length > MAX_BREADCRUMBS) breadcrumbs.shift();
}
function report(error, context) {
	const err = error instanceof Error ? error : new Error(typeof error === "string" ? error : "Unknown error");
	const record = {
		ts: Date.now(),
		message: scrub(`${context ? `[${context}] ` : ""}${err.message}`),
		stack: err.stack ? scrub(err.stack) : void 0,
		url: typeof window !== "undefined" ? scrubUrl(window.location.href) : "",
		breadcrumbs: breadcrumbs.slice()
	};
	errors.push(record);
	if (errors.length > MAX_ERRORS) errors.shift();
	console.error("[SB:error]", record);
	if (typeof window !== "undefined") window.__SB_ERRORS__ = errors;
}
function installErrorReporter() {
	if (installed || typeof window === "undefined") return;
	installed = true;
	window.addEventListener("error", (ev) => {
		report(ev.error ?? ev.message, "window.onerror");
	});
	window.addEventListener("unhandledrejection", (ev) => {
		report(ev.reason, "unhandledrejection");
	});
	const push = history.pushState;
	history.pushState = function(...args) {
		addBreadcrumb({
			kind: "nav",
			message: scrubUrl(String(args[2] ?? window.location.href))
		});
		return push.apply(this, args);
	};
	window.addEventListener("popstate", () => {
		addBreadcrumb({
			kind: "nav",
			message: scrubUrl(window.location.href)
		});
	});
	window.addEventListener("click", (ev) => {
		const t = ev.target;
		if (!t) return;
		addBreadcrumb({
			kind: "click",
			message: `${t.tagName?.toLowerCase() ?? "?"}:${scrub(t.getAttribute("aria-label") || t.getAttribute("data-sb-id") || (t.textContent?.trim().slice(0, 40) ?? ""))}`
		});
	}, {
		capture: true,
		passive: true
	});
	const origFetch = window.fetch;
	window.fetch = async (...args) => {
		const url = typeof args[0] === "string" ? args[0] : args[0].url;
		try {
			const res = await origFetch(...args);
			if (!res.ok) addBreadcrumb({
				kind: "fetch",
				message: `${res.status} ${scrubUrl(url)}`,
				meta: { status: res.status }
			});
			return res;
		} catch (err) {
			addBreadcrumb({
				kind: "fetch",
				message: `fail ${scrubUrl(url)}`
			});
			throw err;
		}
	};
}
//#endregion
export { installErrorReporter as n, report as r, addBreadcrumb as t };
