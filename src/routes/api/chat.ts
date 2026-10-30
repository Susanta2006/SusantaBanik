import { createFileRoute } from "@tanstack/react-router";
import { buildSystemPrompt } from "../../lib/jarvis/prompt.ts";
import { localAnswer } from "../../lib/jarvis/knowledge.ts";
import {
  RateLimiter,
  extractIp,
  fetchWithTimeout,
  json,
} from "../../lib/server-utils.ts";

/**
 * Jarvis chat endpoint.
 *
 * Answers are grounded in the portfolio registry (see src/lib/jarvis). If no
 * language-model backend is configured, or every backend fails, the endpoint
 * answers straight from the registry and says so in `notice` — it never
 * pretends a live model replied.
 *
 * Environment (all optional, server-side only — see .env.example):
 *   OPENROUTER_API_KEY, OPENROUTER_MODELS, GEMINI_API_KEY, GEMINI_MODEL
 */

const limiter = new RateLimiter({
  windows: [
    [5, 10_000],
    [15, 60_000],
    [120, 60 * 60_000],
  ],
  banThreshold: 3,
  banMs: 15 * 60_000,
});

// Cheap shield against floods: at most this many upstream calls at once.
const MAX_CONCURRENT = 6;
let inFlight = 0;

const DEFAULT_OPENROUTER_MODELS = [
  "meta-llama/llama-3.3-8b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-8b:free",
];

function openRouterModels(): string[] {
  const fromEnv = process.env.OPENROUTER_MODELS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_OPENROUTER_MODELS;
}

// Free models rotate and hit quotas, so track a daily count and a cool-down per model.
type ModelStat = { day: string; count: number; cooldownUntil: number };
const modelStats = new Map<string, ModelStat>();
const PER_MODEL_DAILY_CAP = 30;
const COOLDOWN_MS = 10 * 60_000;

function getStat(model: string): ModelStat {
  const day = new Date().toISOString().slice(0, 10);
  const s = modelStats.get(model);
  if (!s || s.day !== day) {
    const fresh = { day, count: 0, cooldownUntil: 0 };
    modelStats.set(model, fresh);
    return fresh;
  }
  return s;
}

function availableModels(): string[] {
  const now = Date.now();
  return openRouterModels()
    .filter((m) => {
      const s = getStat(m);
      return s.cooldownUntil <= now && s.count < PER_MODEL_DAILY_CAP;
    })
    .sort((a, b) => getStat(a).count - getStat(b).count);
}

type ChatMsg = { role: "user" | "assistant"; content: string };

/** Removes control characters (except tab, newline and carriage return) from visitor input. */
function stripControlChars(text: string): string {
  let out = "";
  for (const ch of text) {
    const c = ch.charCodeAt(0);
    if (c === 9 || c === 10 || c === 13 || (c >= 32 && c !== 127)) out += ch;
  }
  return out;
}

function sanitize(messages: unknown): ChatMsg[] | null {
  if (!Array.isArray(messages)) return null;
  const clean: ChatMsg[] = [];
  for (const m of messages.slice(-12)) {
    if (!m || typeof m !== "object") return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    )
      return null;
    const trimmed = stripControlChars(content).trim().slice(0, 1500);
    if (!trimmed) continue;
    clean.push({ role, content: trimmed });
  }
  if (clean.length === 0) return null;
  // Providers expect the conversation to end on the visitor's turn.
  if (clean[clean.length - 1].role !== "user") return null;
  return clean;
}

async function callOpenRouterModel(
  model: string,
  system: string,
  messages: ChatMsg[],
): Promise<{ text: string | null; status: number }> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return { text: null, status: 0 };
  try {
    const res = await fetchWithTimeout(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://susanta-banik.vercel.app/",
          "X-Title": "Jarvis",
        },
        body: JSON.stringify({
          model,
          max_tokens: 360,
          temperature: 0.4,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      },
      20_000,
    );
    if (!res.ok) return { text: null, status: res.status };
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return {
      text: data.choices?.[0]?.message?.content?.trim() || null,
      status: 200,
    };
  } catch {
    return { text: null, status: 0 };
  }
}

async function callOpenRouter(
  system: string,
  messages: ChatMsg[],
): Promise<string | null> {
  if (!process.env.OPENROUTER_API_KEY) return null;
  for (const model of availableModels()) {
    const stat = getStat(model);
    const { text, status } = await callOpenRouterModel(model, system, messages);
    if (text) {
      stat.count += 1;
      return text;
    }
    if (status === 429 || status === 402 || status === 503) {
      stat.cooldownUntil = Date.now() + COOLDOWN_MS;
    }
  }
  return null;
}

async function callGemini(
  system: string,
  messages: ChatMsg[],
): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        // Key goes in a header, not the URL, so it never appears in logs or referrers.
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          systemInstruction: { parts: [{ text: system }] },
          generationConfig: { maxOutputTokens: 400, temperature: 0.4 },
        }),
      },
      20_000,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}

function backendConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      /** Reports whether a live model is configured, so the UI can be transparent. */
      GET: async () =>
        json(
          { ok: true, mode: backendConfigured() ? "ai" : "portfolio-data" },
          200,
          {
            "Cache-Control": "no-store",
          },
        ),

      POST: async ({ request }) => {
        const limit = limiter.check(extractIp(request));
        if (!limit.ok) {
          return json(
            {
              ok: false,
              error: limit.banned
                ? "You've been temporarily blocked for sending too many messages. Please try again later."
                : "Too many messages. Please wait a moment before sending another.",
            },
            429,
          );
        }

        const lenHeader = request.headers.get("content-length");
        if (lenHeader && Number(lenHeader) > 32_000) {
          return json({ ok: false, error: "Message is too large." }, 413);
        }

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return json({ ok: false, error: "Invalid request." }, 400);
        }
        const messages = sanitize(body.messages);
        if (!messages)
          return json({ ok: false, error: "Invalid messages payload." }, 400);

        const question = messages[messages.length - 1].content;

        // No live model configured: answer from the registry and say so.
        if (!backendConfigured()) {
          return json({
            ok: true,
            mode: "portfolio-data",
            reply: localAnswer(question).text,
            notice:
              "A live AI model isn't connected, so this answer comes straight from the portfolio data.",
          });
        }

        if (inFlight >= MAX_CONCURRENT) {
          return json(
            {
              ok: false,
              error: "Jarvis is busy right now. Please try again in a moment.",
            },
            503,
          );
        }

        inFlight += 1;
        try {
          const system = buildSystemPrompt(question);
          const reply =
            (await callOpenRouter(system, messages)) ??
            (await callGemini(system, messages));
          if (reply) return json({ ok: true, mode: "ai", reply });

          // Configured but unavailable: fall back to registry answers, transparently.
          return json({
            ok: true,
            mode: "portfolio-data",
            reply: localAnswer(question).text,
            notice:
              "The AI service isn't responding right now, so this answer comes straight from the portfolio data.",
          });
        } finally {
          inFlight -= 1;
        }
      },
    },
  },
});
