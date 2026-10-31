import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../lib/theme.ts";

/** Both icons render; CSS shows the right one, so there is no hydration mismatch. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-fg hover:border-accent"
    >
      <Sun aria-hidden className="hidden h-5 w-5 dark:block" />
      <Moon aria-hidden className="h-5 w-5 dark:hidden" />
    </button>
  );
}
