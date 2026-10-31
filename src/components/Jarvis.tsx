import { Bot } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";

/**
 * Launcher for the Jarvis portfolio assistant. Only this small button ships
 * with the page; the chat panel is fetched the first time it is opened, so
 * the assistant never blocks first render.
 */
const JarvisPanel = lazy(() => import("./JarvisPanel.tsx"));

export function JarvisLauncher() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="jarvis-panel"
        className="fixed bottom-4 right-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-[.95rem] font-semibold text-accent-fg shadow-lg shadow-black/20 hover:brightness-110 sm:bottom-6 sm:right-6"
      >
        <Bot aria-hidden className="h-5 w-5" />
        {open ? "Close Jarvis" : "Ask Jarvis"}
      </button>
      {open && (
        <Suspense
          fallback={
            <div
              role="status"
              className="fixed bottom-20 right-4 z-50 rounded-2xl border border-line bg-surface p-4 text-sm text-muted shadow-xl sm:right-6"
            >
              Loading assistant…
            </div>
          }
        >
          <JarvisPanel
            onClose={() => {
              setOpen(false);
              button.current?.focus();
            }}
          />
        </Suspense>
      )}
    </>
  );
}
