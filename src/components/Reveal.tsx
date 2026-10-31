import {
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Reveal-on-scroll with one IntersectionObserver per element and short CSS
 * transitions. Content is fully visible without JavaScript and under
 * prefers-reduced-motion (see .reveal in styles.css). Extra props (aria-*,
 * role) are passed through to the element.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={
        delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
