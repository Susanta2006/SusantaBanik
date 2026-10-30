import { createFileRoute } from "@tanstack/react-router";
import { contactSchema, fieldErrors } from "../../lib/contact-schema.ts";
import { SITE } from "../../data/site.ts";
import {
  RateLimiter,
  extractIp,
  fetchWithTimeout,
  json,
} from "../../lib/server-utils.ts";

/**
 * Contact form relay.
 *
 * The browser posts here; this route validates the message and forwards it to
 * Web3Forms using a key that stays on the server (WEB3FORMS_ACCESS_KEY).
 * It only reports success when Web3Forms confirms delivery. If the key is not
 * configured it says so and points to the email address instead.
 */

const limiter = new RateLimiter({
  windows: [
    [2, 60_000],
    [6, 60 * 60_000],
  ],
  banThreshold: 4,
  banMs: 30 * 60_000,
});

const MIN_FILL_MS = 2_000;

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const lenHeader = request.headers.get("content-length");
        if (lenHeader && Number(lenHeader) > 16_000) {
          return json({ ok: false, error: "Message is too large." }, 413);
        }

        let raw: Record<string, unknown>;
        try {
          raw = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ ok: false, error: "Invalid request." }, 400);
        }

        // Spam traps: a filled honeypot or an instant submit gets a quiet "success" and is dropped.
        const honeypot =
          typeof raw.website === "string" ? raw.website.trim() : "";
        const elapsed =
          typeof raw.elapsedMs === "number" ? raw.elapsedMs : Infinity;
        if (honeypot || elapsed < MIN_FILL_MS) return json({ ok: true });

        const limit = limiter.check(extractIp(request));
        if (!limit.ok) {
          return json(
            {
              ok: false,
              error:
                "Too many messages from this connection. Please try again later, or email me directly.",
            },
            429,
          );
        }

        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
          return json(
            {
              ok: false,
              error: "Please check the highlighted fields.",
              fields: fieldErrors(parsed.error),
            },
            422,
          );
        }

        const key = process.env.WEB3FORMS_ACCESS_KEY;
        if (!key) {
          return json(
            {
              ok: false,
              code: "not_configured",
              error: `The contact form isn't connected on this deployment yet. Please email ${SITE.email} instead.`,
            },
            503,
          );
        }

        const { name, email, subject, message } = parsed.data;
        // Strip line breaks so a visitor cannot inject extra email headers.
        const cleanSubject = (subject || `New message from ${name}`)
          .replace(/[\r\n]+/g, " ")
          .slice(0, 200);

        try {
          const res = await fetchWithTimeout(
            "https://api.web3forms.com/submit",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_key: key,
                name,
                email,
                replyto: email,
                subject: cleanSubject,
                message,
                from_name: "Portfolio contact form",
              }),
            },
            10_000,
          );
          const data = (await res.json().catch(() => ({}))) as {
            success?: boolean;
          };
          if (res.ok && data.success) return json({ ok: true });
          return json(
            {
              ok: false,
              error: `The message could not be delivered. Please email ${SITE.email} instead.`,
            },
            502,
          );
        } catch {
          return json(
            {
              ok: false,
              error: `The message could not be delivered. Please email ${SITE.email} instead.`,
            },
            502,
          );
        }
      },
    },
  },
});
