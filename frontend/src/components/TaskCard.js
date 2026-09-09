"use client";

import { useEffect, useRef, useState } from "react";

import { Check, Pencil, Trash } from "@/components/Icons";
import { cn, timeAgo } from "@/lib/utils";

const priorityStyles = {
  high: { dot: "bg-danger", text: "text-danger", chip: "bg-danger-soft" },
  medium: { dot: "bg-warn", text: "text-warn", chip: "bg-warn-soft" },
  low: { dot: "bg-faint", text: "text-faint", chip: "bg-surface-3" },
};

export default function TaskCard({
  task,
  index = 0,
  onToggle,
  onDelete,
  onRename,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef(null);

  // The effect only moves focus. The draft is seeded by whoever starts the
  // edit, so there is no state to synchronise on mount.
  useEffect(() => {
    if (!editing) return;
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, [editing]);

  function startEditing() {
    setDraft(task.title);
    setEditing(true);
  }

  function commit() {
    const next = draft.trim();
    if (next && next !== task.title) onRename(task.id, next);
    setEditing(false);
  }

  const priority = priorityStyles[task.priority] ?? priorityStyles.medium;

  return (
    <li
      // Stagger the entrance, but cap it — a long list shouldn't take a
      // second to finish arriving.
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      className={cn(
        "group animate-fade-up relative flex items-start gap-3.5 rounded-xl border border-line bg-surface p-3.5",
        "transition-[border-color,background-color,box-shadow,transform] duration-200 ease-snap",
        "hover:border-line-strong hover:bg-surface-2",
        task.done && "bg-surface/60"
      )}
    >
      {/* A thin accent bar on the left, only for open high-priority work. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-3 left-0 w-0.5 rounded-full transition-opacity duration-300",
          task.priority === "high" && !task.done
            ? "bg-danger opacity-70"
            : "opacity-0"
        )}
      />

      <label className="relative mt-0.5 grid size-5 shrink-0 cursor-pointer place-items-center">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "size-5 rounded-[7px] border-2 border-line-strong",
            "transition-[background-color,border-color,transform] duration-200 ease-snap",
            "peer-hover:border-accent/70 peer-checked:border-accent peer-checked:bg-accent",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
            "peer-active:scale-[0.88]"
          )}
        />
        <Check
          strokeWidth={3}
          className="pointer-events-none absolute size-3.5 text-accent-fg transition-[opacity,transform] duration-200 ease-snap"
          style={{
            opacity: task.done ? 1 : 0,
            transform: task.done ? "scale(1)" : "scale(0.5)",
          }}
        />
      </label>

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === "Enter") commit();
              if (event.key === "Escape") setEditing(false);
            }}
            className="w-full rounded-lg border border-accent-line bg-elev px-2 py-1 text-[0.95rem] text-fg outline-none"
          />
        ) : (
          <button
            type="button"
            onDoubleClick={startEditing}
            onClick={() => onToggle(task.id)}
            className="block w-full cursor-pointer text-left"
          >
            {/* Strikethrough as an animated background, because
                text-decoration cannot be transitioned. */}
            <span
              className={cn(
                "text-[0.95rem] leading-snug",
                task.done ? "text-faint" : "text-fg"
              )}
              style={{
                backgroundImage: "linear-gradient(currentColor, currentColor)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 58%",
                backgroundSize: task.done ? "100% 1.5px" : "0% 1.5px",
                transition:
                  "background-size 340ms cubic-bezier(0.23,1,0.32,1), color 300ms ease",
              }}
            >
              {task.title}
            </span>
          </button>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem]">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-medium",
              priority.chip,
              priority.text
            )}
          >
            <span className={cn("size-1.5 rounded-full", priority.dot)} />
            {task.priority}
          </span>

          <span className="text-faint">{task.category}</span>

          {task.createdAt ? (
            <>
              <span className="text-faint/50">·</span>
              <span className="font-mono text-faint">
                {task.done && task.completedAt
                  ? `done ${timeAgo(task.completedAt)}`
                  : timeAgo(task.createdAt)}
              </span>
            </>
          ) : null}
        </div>
      </div>

      {/* Actions stay hidden until hover on a mouse, and are always visible
          on touch — where there is no hover to reveal them. */}
      <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <button
          type="button"
          onClick={startEditing}
          aria-label={`Rename "${task.title}"`}
          className="grid size-8 place-items-center rounded-lg text-faint transition-[transform,color,background-color] duration-150 ease-snap hover:bg-surface-3 hover:text-fg active:scale-[0.9]"
        >
          <Pencil className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
          className="grid size-8 place-items-center rounded-lg text-faint transition-[transform,color,background-color] duration-150 ease-snap hover:bg-danger-soft hover:text-danger active:scale-[0.9]"
        >
          <Trash className="size-4" />
        </button>
      </div>
    </li>
  );
}
