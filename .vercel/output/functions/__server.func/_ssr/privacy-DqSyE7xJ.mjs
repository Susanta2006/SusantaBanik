import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DqSyE7xJ.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-prose py-20 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-muted-foreground link-underline",
				children: "← Back to home"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl mt-6 mb-2",
				children: "Privacy Policy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground mb-8",
				children: ["Last updated: ", (/* @__PURE__ */ new Date()).getFullYear()]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 text-foreground/90 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "1. Who we are"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This site is operated by Susanta Banik as a personal portfolio. We collect the minimum information needed to answer messages you send." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "2. Contact form"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you submit the contact form, your name, email address and message are forwarded to a private inbox via a transactional email relay. Your email is used only to reply to you. We do not sell, share, or add it to any marketing list." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "3. Jarvis chat"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Messages you type into the Jarvis assistant are sent to AI providers to generate a reply. Conversations are not stored on this server and are not used to identify you. Please do not share sensitive personal information in chat." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "4. Cookies & analytics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This site does not set marketing cookies. Hosting providers may keep short-lived access logs (IP, user-agent, timestamp) for security and abuse-prevention purposes only." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "5. Your rights"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You may request deletion of any message you have sent by writing to the same inbox you contacted. We will action reasonable requests promptly." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl mb-2",
						children: "6. Updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This policy may change as the site evolves. The “last updated” date above will always reflect the current version." })] })
				]
			})
		]
	});
}
//#endregion
export { PrivacyPage as component };
