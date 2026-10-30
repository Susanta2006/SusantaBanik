import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects.ts";
import { ProjectCard } from "./ProjectCard.tsx";
import { Reveal } from "./Reveal.tsx";

/**
 * Horizontal project carousel built on native scrolling and scroll-snap, so
 * touch, trackpad and wheel scrolling work without any library. Arrow buttons
 * and the Left/Right keys move one card at a time. Cards are plain <li>
 * elements rendered on the server, so they are crawlable.
 */
export function ProjectCarousel({
  projects,
  trailing,
}: {
  projects: Project[];
  trailing?: React.ReactNode;
}) {
  const total = projects.length + (trailing ? 1 : 0);
  const rail = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(total > 1);
  const [position, setPosition] = useState(1);

  const step = useCallback(() => {
    const el = rail.current;
    const card = el?.querySelector("li");
    if (!el || !card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    return (card as HTMLElement).offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const s = step() || 1;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    setPosition(Math.min(total, Math.round(el.scrollLeft / s) + 1));
  }, [total, step]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.current?.scrollBy({
      left: dir * step(),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-fg hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line";

  return (
    <section aria-roledescription="carousel" aria-label="Projects and products">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {position} of {total}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous projects"
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next projects"
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ul
        ref={rail}
        className="rail"
        tabIndex={0}
        aria-label="Project cards. Use the left and right arrow keys to scroll."
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
      >
        {projects.map((p, i) => (
          <Reveal
            as="li"
            key={p.id}
            delay={Math.min(i, 3) * 45}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}: ${p.name}`}
          >
            <ProjectCard project={p} />
          </Reveal>
        ))}
        {trailing && (
          <Reveal
            as="li"
            delay={Math.min(projects.length, 3) * 45}
            aria-roledescription="slide"
            aria-label={`${total} of ${total}: more on GitHub`}
          >
            {trailing}
          </Reveal>
        )}
      </ul>
    </section>
  );
}
