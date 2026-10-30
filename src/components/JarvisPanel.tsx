import { RotateCw, Send, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { SITE } from "../data/site.ts";

type Msg = {
  role: "user" | "assistant";
  content: string;
  /** Honest note about where the answer came from. */
  notice?: string;
  /** Set when the server was unreachable; lets the visitor try the AI again. */
  retry?: string;
  error?: boolean;
};

const SUGGESTIONS = [
  "What is BloodSignal?",
  "Is the Medical AI System clinically validated?",
  "What is the status of QNME-omega?",
  "Which projects have public repositories?",
  "What services does Shristi AI Web Creations offer?",
  "How can I contact Susanta?",
];

const GREETING =
  "I’m Jarvis, the assistant for this portfolio. I answer from Susanta’s documented projects, research and services, and I’ll say so when the portfolio data doesn’t cover something.";

const URL_RE = /(https?:\/\/[^\s<>"')]+[^\s<>"').,;:!?])/g;

/** Plain text with safe, clickable https links. No HTML is ever injected. */
function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_RE).map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link break-all"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export default function JarvisPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<"ai" | "portfolio-data" | null>(null);
  const log = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const ctrl = new AbortController();
    fetch("/api/chat", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (d: { mode?: "ai" | "portfolio-data" } | null) =>
          d?.mode && setMode(d.mode),
      )
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    log.current?.scrollTo({
      top: log.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function ask(question: string, history: Msg[]) {
    setSending(true);
    const payload = history
      .filter((m) => !m.error)
      .slice(-12)
      .map(({ role, content }) => ({ role, content }));
    try {
      const ctrl = new AbortController();
      const timer = window.setTimeout(() => ctrl.abort(), 30_000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({ messages: payload }),
      });
      window.clearTimeout(timer);
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        notice?: string;
        mode?: "ai" | "portfolio-data";
        error?: string;
      };
      if (res.ok && data.ok && data.reply) {
        if (data.mode) setMode(data.mode);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply!, notice: data.notice },
        ]);
        return;
      }
      if (res.status === 429 || (res.status >= 400 && res.status < 500)) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error ?? "That request couldn’t be completed.",
            error: true,
          },
        ]);
        return;
      }
      throw new Error("server");
    } catch {
      // Server unreachable: answer from the portfolio data bundled with this page, and say so.
      const { localAnswer } = await import("../lib/jarvis/knowledge.ts");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: localAnswer(question).text,
          notice:
            "I couldn’t reach the server, so this answer comes straight from the portfolio data in your browser.",
          retry: question,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function send(text: string) {
    const q = text.trim();
    if (!q || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    void ask(q, next);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const onlyGreeting = messages.length === 1;

  return (
    <section
      id="jarvis-panel"
      role="dialog"
      aria-label="Jarvis, the portfolio assistant"
      className="fixed inset-x-3 bottom-20 z-50 flex max-h-[min(34rem,calc(100dvh-6rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/30 sm:inset-x-auto sm:right-6 sm:w-[24rem]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div>
          <h2 className="text-base">Jarvis</h2>
          <p className="text-xs text-muted">
            {mode === "ai"
              ? "Live AI, grounded in portfolio data"
              : mode === "portfolio-data"
                ? "Answers from portfolio data (no live AI connected)"
                : "Portfolio assistant"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-2"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
      </header>

      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={sending}
        className="flex-1 space-y-3 overflow-y-auto p-4 text-sm"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user" ? "ml-auto max-w-[88%]" : "mr-auto max-w-[94%]"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-accent-fg"
                  : m.error
                    ? "rounded-2xl rounded-bl-md border border-danger/50 px-3.5 py-2.5"
                    : "rounded-2xl rounded-bl-md border border-line bg-surface-2 px-3.5 py-2.5"
              }
            >
              <p className="whitespace-pre-wrap leading-relaxed">
                <Linkified text={m.content} />
              </p>
            </div>
            {m.notice && (
              <p className="mt-1 px-1 text-xs text-muted">{m.notice}</p>
            )}
            {m.retry && !sending && i === messages.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  const q = m.retry!;
                  setMessages((all) => all.slice(0, -1));
                  void ask(q, messages.slice(0, -1));
                }}
                className="mt-1 inline-flex min-h-9 items-center gap-1.5 px-1 text-xs font-semibold text-accent hover:underline"
              >
                <RotateCw aria-hidden className="h-3.5 w-3.5" /> Try the
                assistant again
              </button>
            )}
          </div>
        ))}

        {sending && (
          <div
            role="status"
            aria-label="Jarvis is thinking"
            className="mr-auto w-52 space-y-2 rounded-2xl border border-line bg-surface-2 p-3.5"
          >
            <div className="shimmer h-2 w-40 rounded" />
            <div className="shimmer h-2 w-28 rounded" />
          </div>
        )}

        {onlyGreeting && (
          <div>
            <p className="mb-2 text-xs font-semibold text-muted">Try asking</p>
            <ul className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-line bg-bg px-3 py-1.5 text-left text-xs font-medium hover:border-accent"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
        <label htmlFor="jarvis-input" className="sr-only">
          Ask Jarvis a question
        </label>
        <input
          id="jarvis-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          placeholder="Ask about projects, research, services…"
          className="field min-w-0 flex-1"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="btn btn-primary px-4 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send aria-hidden className="h-4 w-4" />
        </button>
      </form>
      <p className="px-4 pb-3 text-[11px] text-muted">
        AI can make mistakes. It doesn’t browse GitHub or other sites. For
        anything else, email {SITE.email}.
      </p>
    </section>
  );
}
