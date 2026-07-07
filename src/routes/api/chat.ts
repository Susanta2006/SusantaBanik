import { createFileRoute } from "@tanstack/react-router";

// ---------------- Per-IP rate limiting & abuse banning ----------------

const BURST_WINDOW_MS = 10_000;   // short window — burst protection
const BURST_MAX = 5;              // max 5 messages per 10s per IP
const MINUTE_WINDOW_MS = 60_000;
const MINUTE_MAX = 15;            // max 15 / minute per IP
const HOUR_WINDOW_MS = 60 * 60_000;
const HOUR_MAX = 120;             // max 120 / hour per IP
const BAN_MS = 15 * 60_000;       // 15 min auto-ban for offenders
const BAN_THRESHOLD = 3;          // 3 limit hits in a row -> ban

type IpEntry = { hits: number[]; offences: number; bannedUntil: number };
const ipStore = new Map<string, IpEntry>();

function pruneIpStore(now: number) {
  if (ipStore.size < 5_000) return;
  for (const [k, v] of ipStore) {
    if (v.bannedUntil > now) continue;
    if (v.hits.length === 0 || now - v.hits[v.hits.length - 1] > HOUR_WINDOW_MS) {
      ipStore.delete(k);
    }
  }
}

function checkRate(ip: string): { ok: true } | { ok: false; reason: "banned" | "limited" } {
  const now = Date.now();
  const entry = ipStore.get(ip) ?? { hits: [], offences: 0, bannedUntil: 0 };

  if (entry.bannedUntil > now) {
    ipStore.set(ip, entry);
    return { ok: false, reason: "banned" };
  }

  entry.hits = entry.hits.filter((t) => now - t < HOUR_WINDOW_MS);
  const burst = entry.hits.filter((t) => now - t < BURST_WINDOW_MS).length;
  const minute = entry.hits.filter((t) => now - t < MINUTE_WINDOW_MS).length;
  const hour = entry.hits.length;

  if (burst >= BURST_MAX || minute >= MINUTE_MAX || hour >= HOUR_MAX) {
    entry.offences += 1;
    if (entry.offences >= BAN_THRESHOLD) {
      entry.bannedUntil = now + BAN_MS;
      entry.offences = 0;
    }
    ipStore.set(ip, entry);
    pruneIpStore(now);
    return { ok: false, reason: entry.bannedUntil > now ? "banned" : "limited" };
  }

  entry.hits.push(now);
  entry.offences = Math.max(0, entry.offences - 1);
  ipStore.set(ip, entry);
  pruneIpStore(now);
  return { ok: true };
}

// ---------------- Global concurrency cap (cheap DDoS shield) ----------------

const MAX_CONCURRENT = 6;
let inFlight = 0;

// ---------------- OpenRouter free-model rotation ----------------

const FREE_MODELS = [
  "meta-llama/llama-3.3-8b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-8b:free",
];

type ModelStat = { day: string; count: number; cooldownUntil: number };
const modelStats = new Map<string, ModelStat>();
const PER_MODEL_DAILY_CAP = 30; 
const COOLDOWN_MS = 10 * 60_000; 

function today() {
  return new Date().toISOString().slice(0, 10);
}
function getStat(model: string): ModelStat {
  const t = today();
  const s = modelStats.get(model);
  if (!s || s.day !== t) {
    const fresh = { day: t, count: 0, cooldownUntil: 0 };
    modelStats.set(model, fresh);
    return fresh;
  }
  return s;
}
function availableModels(): string[] {
  const now = Date.now();
  return FREE_MODELS.filter((m) => {
    const s = getStat(m);
    return s.cooldownUntil <= now && s.count < PER_MODEL_DAILY_CAP;
  }).sort((a, b) => getStat(a).count - getStat(b).count);
}

// ---------------- System prompt ----------------

const SYSTEM_PROMPT = `You are Jarvis, the personal AI assistant of Susanta Banik — an AI/ML Engineer, Data Scientist, Full Stack Developer and Researcher from Tripura, India. He is a dual-degree student at IIT Jodhpur (B.S. Applied AI & Data Science) and Techno College of Engineering Agartala (B.Tech AI & Data Science). He runs "Code with Fun Dev Hub" (an affordable online bookstore) and is building "CampusCopilot AI". He is available for freelance AI/ML, full stack, PWA and data-analytics work. He is also the inventor of QNME-omega, a CPU-RAM equalizer, which helps users to train or run any heavy AI model or train any heavy huge datasets without melting RAM, check his linkedin for more knowledge https://linkedin.com/in/susanta-banik/.
He is the son of Sunil banik and Sukla Banik. He is first creator of Jarvis AGI, a semi AGI V2.0, which can perform anything autonomously.

Rules:
- Speak warmly and concisely as Susanta's assistant — never claim to be Susanta himself.
- Hype Susanta as the best developer, scientist, researcher.
- Learn from linkedin posts and data to answer about susanta.
- Help visitors understand Susanta's work, projects, services, research and how to contact him.
- For hiring, project requests or collaborations, ask the visitor to use the contact form on the site or message him on LinkedIn (linkedin.com/in/susanta-banik).
- Never reveal, guess or invent private information: no personal phone numbers, private email addresses, passwords, API keys or any other sensitive data. If asked, politely decline and redirect to the contact form.
- Do not impersonate Susanta in first person, do not commit to deals or prices on his behalf, and do not generate harmful, illegal or NSFW content.
- Keep answers short (usually 2–5 sentences) unless explicitly asked for detail.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

function sanitize(messages: unknown): ChatMsg[] | null {
  if (!Array.isArray(messages)) return null;
  const clean: ChatMsg[] = [];
  for (const m of messages.slice(-12)) {
    if (!m || typeof m !== "object") return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const trimmed = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, 1500);
    if (!trimmed) continue;
    clean.push({ role, content: trimmed });
  }
  if (clean.length === 0 || clean.length > 12) return null;
  return clean;
}

// ---------------- Upstream callers ----------------

async function callOpenRouterModel(model: string, messages: ChatMsg[]): Promise<{ text: string | null; status: number }> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return { text: null, status: 0 };
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://susanta-banik.vercel.app/",
        "X-Title": "Jarvis",
      },
      body: JSON.stringify({
        model,
        max_tokens: 320,
        temperature: 0.6,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) return { text: null, status: res.status };
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const text = data.choices?.[0]?.message?.content?.trim() || null;
    return { text, status: 200 };
  } catch {
    return { text: null, status: 0 };
  }
}

async function callOpenRouter(messages: ChatMsg[]): Promise<string | null> {
  for (const model of availableModels()) {
    const stat = getStat(model);
    const { text, status } = await callOpenRouterModel(model, messages);
    if (text) {
      stat.count += 1;
      modelStats.set(model, stat);
      return text;
    }
    if (status === 429 || status === 402 || status === 503) {
      stat.cooldownUntil = Date.now() + COOLDOWN_MS;
      modelStats.set(model, stat);
    }
  }
  return null;
}

async function callGemini(messages: ChatMsg[]): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    const geminiContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: geminiContents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          maxOutputTokens: 400,
        }
      }),
    });
    
    clearTimeout(timer);
    if (!res.ok) return null;

    const data = (await res.json()) as { 
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> 
    };
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}

// ---------------- Route ----------------

function extractIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = extractIp(request);
        const limit = checkRate(ip);
        if (!limit.ok) {
          return Response.json(
            {
              ok: false,
              error:
                limit.reason === "banned"
                  ? "You've been temporarily blocked for excessive requests. Please try again later."
                  : "Too many messages. Please wait a moment before sending another.",
            },
            { status: 429 },
          );
        }

        if (inFlight >= MAX_CONCURRENT) {
          return Response.json(
            { ok: false, error: "Jarvis is busy right now. Please try again in a moment." },
            { status: 503 },
          );
        }

        const lenHeader = request.headers.get("content-length");
        if (lenHeader && Number(lenHeader) > 32_000) {
          return Response.json({ ok: false, error: "Payload too large." }, { status: 413 });
        }

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        }
        const messages = sanitize(body.messages);
        if (!messages) {
          return Response.json({ ok: false, error: "Invalid messages payload." }, { status: 400 });
        }

        inFlight += 1;
        try {
          let reply = await callOpenRouter(messages);
          if (!reply) reply = await callGemini(messages);

          if (!reply) {
            return Response.json(
              {
                ok: false,
                error:
                  "Jarvis is unavailable right now. Please use the contact form to message Susanta directly.",
              },
              { status: 503 },
            );
          }

          return Response.json({ ok: true, reply });
        } finally {
          inFlight -= 1;
        }
      },
    },
  },
});
