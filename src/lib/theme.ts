/**
 * Theme handling.
 *
 * The inline script below runs before first paint (see __root.tsx), so the
 * correct theme is applied without a flash. It reads the saved choice, and on
 * the first visit follows the operating system preference.
 */
export const THEME_KEY = "theme";

export const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap";

/** Also adds the font stylesheet from script, so it never blocks first paint (text shows in the system font, then swaps). */
export const THEME_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.classList.toggle("dark",t==="dark");d.style.colorScheme=t}catch(e){}try{var l=document.createElement("link");l.rel="stylesheet";l.href="${FONT_URL}";document.head.appendChild(l)}catch(e){}})();`;

export function toggleTheme(): "light" | "dark" {
  const root = document.documentElement;
  const next = root.classList.contains("dark") ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* private mode: the choice just won't persist */
  }
  return next;
}
