import * as React from "react";

const AUTO_RELOAD_SECONDS = 15;
const DEFAULT_SKELETON_TIMEOUT_MS = 12_000;

/**
 * Branded SB recovery screen used by:
 *  - Router defaultErrorComponent (post-dispatch render errors)
 *  - <GlobalErrorBoundary /> (anything that escapes route boundaries)
 *  - <SkeletonWithTimeout /> when loading exceeds its budget
 *  - window.onerror / unhandledrejection swap-in (catastrophic client crashes)
 *
 * Dependency-free beyond React + Tailwind tokens so it can render even when
 * feature code is broken. Includes a Retry button and an auto-reload
 * countdown so a stuck visitor recovers without interaction.
 */
export function BrandedErrorFallback({
  onRetry,
  autoReload = true,
  title = "This page is taking a moment",
  message = "Something briefly went wrong. The site is fine — please try again.",
}: {
  onRetry?: () => void;
  autoReload?: boolean;
  title?: string;
  message?: string;
}) {
  const [secondsLeft, setSecondsLeft] = React.useState(AUTO_RELOAD_SECONDS);

  const handleRetry = React.useCallback(() => {
    if (onRetry) onRetry();
    else if (typeof window !== "undefined") window.location.reload();
  }, [onRetry]);

  React.useEffect(() => {
    if (!autoReload || typeof window === "undefined") return;
    const tick = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    const reload = window.setTimeout(() => {
      handleRetry();
    }, AUTO_RELOAD_SECONDS * 1000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(reload);
    };
  }, [autoReload, handleRetry]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <div className="max-w-md text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card font-serif text-3xl"
        >
          SB
        </div>
        <p className="mb-1 font-serif text-base text-muted-foreground">Susanta Banik</p>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
        {autoReload && secondsLeft > 0 ? (
          <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
            Auto-reloading in {secondsLeft}s…
          </p>
        ) : null}
      </div>
    </div>
  );
}

type BoundaryState = { hasError: boolean };

/**
 * Last-resort React boundary wrapping the router output. Route-level
 * boundaries handle most cases; this catches anything that escapes them
 * (provider crashes, event-handler re-renders that throw, etc.).
 */
export class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <BrandedErrorFallback onRetry={this.handleReset} />;
    }
    return this.props.children;
  }
}

/**
 * Renders `skeleton` for up to `timeoutMs`; if `isLoading` is still true after
 * the budget, swaps to the branded recovery screen. Pair with any
 * skeleton/Suspense fallback for critical content that must never spin
 * forever (e.g. a stalled fetch on a flaky network).
 */
export function SkeletonWithTimeout({
  isLoading,
  skeleton,
  children,
  onRetry,
  timeoutMs = DEFAULT_SKELETON_TIMEOUT_MS,
}: {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  onRetry?: () => void;
  timeoutMs?: number;
}) {
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      setTimedOut(false);
      return;
    }
    if (typeof window === "undefined") return;
    const id = window.setTimeout(() => setTimedOut(true), timeoutMs);
    return () => window.clearTimeout(id);
  }, [isLoading, timeoutMs]);

  if (!isLoading) return <>{children}</>;
  if (timedOut) {
    return (
      <BrandedErrorFallback
        onRetry={
          onRetry
            ? () => {
                setTimedOut(false);
                onRetry();
              }
            : undefined
        }
        title="Still loading…"
        message="This is taking longer than expected. We'll try again for you."
      />
    );
  }
  return <>{skeleton}</>;
}
