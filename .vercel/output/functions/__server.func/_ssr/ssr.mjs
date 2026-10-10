//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Susanta Banik — temporarily unavailable</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#0f0f10" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, "Inter", sans-serif;
        background: radial-gradient(1200px 600px at 50% -10%, #1a1a1d 0%, #0f0f10 60%, #0a0a0b 100%);
        color: #f5f0e6;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem 1.25rem;
      }
      .card { max-width: 30rem; width: 100%; text-align: center; }
      .logo {
        width: 64px; height: 64px; border-radius: 16px;
        background: #0f0f10; border: 1px solid #2a2a2d;
        display: grid; place-items: center; margin: 0 auto 1.5rem;
        font-family: ui-serif, "Instrument Serif", Georgia, serif;
        font-size: 30px; font-weight: 600; letter-spacing: -1px;
        color: #f5f0e6;
      }
      .brand { font-family: ui-serif, "Instrument Serif", Georgia, serif; font-size: 1.15rem; opacity: .75; margin: 0 0 .25rem; }
      h1 { font-size: 1.5rem; margin: 0 0 .75rem; font-weight: 500; }
      p { color: #b8b3a7; margin: 0 0 1.75rem; }
      .actions { display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; }
      a { padding: .65rem 1.1rem; border-radius: 999px; font-size: .9rem; text-decoration: none; border: 1px solid #2a2a2d; color: #f5f0e6; transition: background .15s ease; }
      a.primary { background: #f5f0e6; color: #0f0f10; border-color: #f5f0e6; }
      a.primary:hover { background: #fff; }
      a.secondary:hover { background: #1a1a1d; }
      footer { margin-top: 2rem; font-size: .8rem; color: #6b675e; }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="logo" aria-hidden="true">SB</div>
      <p class="brand">Susanta Banik</p>
      <h1>This page is taking a moment</h1>
      <p>Something briefly went wrong. The site is fine — please try again.</p>
      <div class="actions">
        <a class="primary" href="/">Reload home</a>
        <a class="secondary" href="/#contact">Contact Susanta</a>
      </div>
      <footer>© Susanta Banik</footer>
    </main>
  </body>
</html>`;
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-DA9wq-lK.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
function brandedErrorResponse() {
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
	let payload;
	try {
		payload = JSON.parse(body);
	} catch {
		return false;
	}
	if (!payload || Array.isArray(payload) || typeof payload !== "object") return false;
	const fields = payload;
	const expectedKeys = new Set([
		"message",
		"status",
		"unhandled"
	]);
	if (!Object.keys(fields).every((key) => expectedKeys.has(key))) return false;
	return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isCatastrophicSsrErrorBody(body, response.status)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return brandedErrorResponse();
}
function applySecurityHeaders(response) {
	const headers = new Headers(response.headers);
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("X-Frame-Options", "SAMEORIGIN");
	headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
	headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
	headers.set("X-XSS-Protection", "0");
	headers.delete("server");
	headers.delete("x-powered-by");
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
var server_default = { async fetch(request, env, ctx) {
	try {
		return applySecurityHeaders(await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx)));
	} catch (error) {
		console.error(error);
		return applySecurityHeaders(brandedErrorResponse());
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
