"use client";

import { useEffect, useRef, useState } from "react";

import { Plus } from "@/components/Icons";
import { CATEGORIES, PRIORITIES } from "@/data/tasks";
import { cn } from "@/lib/utils";

/**
 * The priority and category controls stay out of the way until the input is
 * in use. Adding a task is one field and one Enter press; the extra choices
 * are there when you want them, not in your face when you don’t.
 */
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const expanded = focused || title.length > 0;

  // "/" to jump to the input from anywhere, Escape to let go of it.
  useEffect(() => {
    function onKeyDown(event) {
      const tag = event.target.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && event.target === inputRef.current) {
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd({ title: trimmed, priority, category });
    setTitle("");
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border bg-surface p-2 transition-[border-color,box-shadow,background-color] duration-250 ease-snap",
        expanded
          ? "border-accent-line bg-surface-2 shadow-card"
          : "border-line hover:border-line-strong"
      )}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What needs doing?"
          aria-label="New task"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[0.95rem] text-fg placeholder:text-faint focus:outline-none"
        />

        {!expanded ? (
          <kbd className="mr-1 hidden rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.7rem] text-faint sm:block">
            /
          </kbd>
        ) : null}

        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-medium text-accent-fg transition-[transform,filter,opacity] duration-150 ease-snap hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
        >
          <Plus className="size-4" strokeWidth={2.25} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-250 ease-snap",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-wrap items-center gap-4 px-3 pb-1.5 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-faint">
                Priority
              </span>
              {Object.entries(PRIORITIES).map(([key, meta]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPriority(key)}
                  aria-pressed={priority === key}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition-[transform,background-color,color] duration-150 ease-snap active:scale-[0.95]",
                    priority === key
                      ? "bg-accent text-accent-fg"
                      : "text-muted hover:bg-surface-3 hover:text-fg"
                  )}
                >
                  {meta.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <label
                htmlFor="task-category"
                className="text-[0.7rem] uppercase tracking-[0.1em] text-faint"
              >
                List
              </label>
              <select
                id="task-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg border border-line bg-elev px-2 py-1 text-xs text-fg focus:outline-none"
              >
                {CATEGORIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
