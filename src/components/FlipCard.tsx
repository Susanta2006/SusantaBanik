import { ArrowLeft, Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

type Face = {
  eyebrow?: string;
  title: string;
  detail?: string;
};

/**
 * A card that flips between a summary face and a detail face. Both faces
 * occupy the same grid cell, so the card is always as tall as the taller
 * face and nothing shifts when it flips. The hidden face is made inert, so
 * keyboard and screen-reader users only reach the face that is showing.
 */
export function FlipCard({
  front,
  back,
  backLabel = "Back",
  index,
}: {
  front: Face;
  back: ReactNode;
  backLabel?: string;
  index?: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  const frontId = `${id}-front`;
  const backId = `${id}-back`;

  return (
    <div className="flip" data-flipped={flipped || undefined}>
      <div className="flip-inner">
        <section
          id={frontId}
          className="flip-face flip-front card"
          aria-labelledby={`${frontId}-title`}
          inert={flipped}
        >
          <div className="flex h-full flex-col justify-between gap-6 p-6">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-accent">
                {index !== undefined && (
                  <span className="tabular-nums text-muted">
                    {String(index).padStart(2, "0")}
                  </span>
                )}
                {front.eyebrow}
              </p>
              <h3 id={`${frontId}-title`} className="mt-3 text-xl leading-snug">
                {front.title}
              </h3>
              {front.detail && (
                <p className="mt-3 text-[.95rem] leading-relaxed text-muted">
                  {front.detail}
                </p>
              )}
            </div>
            <button
              type="button"
              className="flip-toggle"
              aria-expanded={flipped}
              aria-controls={backId}
              onClick={() => setFlipped(true)}
            >
              <Plus aria-hidden className="h-4 w-4" />
              Show details
            </button>
          </div>
        </section>

        <section
          id={backId}
          className="flip-face flip-back card"
          aria-labelledby={`${frontId}-title`}
          inert={!flipped}
        >
          <div className="flex h-full flex-col gap-5 p-6">
            <div className="min-h-0 flex-1 text-[.95rem] leading-relaxed text-muted">
              {back}
            </div>
            <button
              type="button"
              className="flip-toggle self-start"
              aria-expanded={flipped}
              aria-controls={frontId}
              onClick={() => setFlipped(false)}
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              {backLabel}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
