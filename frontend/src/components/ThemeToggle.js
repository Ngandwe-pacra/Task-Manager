"use client";

import { Moon, Sun } from "@/components/Icons";

const STORAGE_KEY = "taskflow-theme";

/**
 * No React state at all. The theme lives in one class on <html>, and the
 * `light:` variant swaps the icons in CSS — which means there is nothing to
 * hydrate, nothing to get out of sync, and no flash on first paint.
 */
export default function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // A remembered theme is nice to have, not essential.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-[transform,color,background-color,border-color] duration-150 ease-snap hover:border-line-strong hover:text-fg active:scale-[0.94]"
    >
      {/* Both icons stay mounted and cross-fade in place. Swapping nodes
          would flash, and rotating them makes the change legible. */}
      <span className="relative grid size-5 place-items-center">
        <Sun className="absolute size-5 transition-[opacity,transform] duration-200 ease-snap light:-rotate-45 light:scale-75 light:opacity-0" />
        <Moon className="absolute size-5 rotate-45 scale-75 opacity-0 transition-[opacity,transform] duration-200 ease-snap light:rotate-0 light:scale-100 light:opacity-100" />
      </span>
    </button>
  );
}
