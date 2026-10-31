import { createRouter, ErrorComponentProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { BrandedErrorFallback } from "./lib/branded-error-fallback";

// Option 1: Use ErrorComponentProps directly
function DefaultErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  return <BrandedErrorFallback onRetry={reset} />;
}

// Alternatively, if you prefer explicit inline typing:
// function DefaultErrorComponent({ error, reset }: { error: unknown; reset: () => void }) { ... }

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};
