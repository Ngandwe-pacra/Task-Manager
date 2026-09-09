"use client";

import { useMemo, useState } from "react";

import { Inbox, Search, Sparkles, Trash, X } from "@/components/Icons";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { toast } from "@/components/Toaster";
import { useTasks } from "@/context/TaskContext";
import { PRIORITIES } from "@/data/tasks";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

const SORTS = [
  { key: "newest", label: "Newest first" },
  { key: "oldest", label: "Oldest first" },
  { key: "priority", label: "Priority" },
  { key: "alpha", label: "A–Z" },
];

function Skeleton() {
  return (
    <ul className="flex flex-col gap-2.5" aria-hidden="true">
      {[0, 1, 2, 3].map((row) => (
        <li
          key={row}
          className="relative h-[74px] overflow-hidden rounded-xl border border-line bg-surface"
        >
          <span className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-surface-3 to-transparent" />
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ icon: Icon, title, body, children }) {
  return (
    <div className="animate-scale-in flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface/40 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted">{body}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

export default function TasksPage() {
  const {
    tasks,
    ready,
    stats,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    restoreTask,
    clearCompleted,
    restoreMany,
  } = useTasks();

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      if (filter === "active" && task.done) return false;
      if (filter === "done" && !task.done) return false;
      if (!needle) return true;
      return (
        task.title.toLowerCase().includes(needle) ||
        task.category.toLowerCase().includes(needle)
      );
    });

    const byNewest = (a, b) =>
      new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0);

    const comparators = {
      newest: byNewest,
      oldest: (a, b) => -byNewest(a, b),
      priority: (a, b) =>
        PRIORITIES[a.priority].order - PRIORITIES[b.priority].order ||
        byNewest(a, b),
      alpha: (a, b) => a.title.localeCompare(b.title),
    };

    // Whatever the sort, finished work sinks to the bottom.
    return [...filtered].sort(
      (a, b) => Number(a.done) - Number(b.done) || comparators[sort](a, b)
    );
  }, [tasks, filter, sort, query]);

  function handleAdd(input) {
    addTask(input);
    toast.success("Task added", { description: input.title });
  }

  function handleToggle(id) {
    const next = toggleTask(id);
    if (next?.done) {
      toast.success("Nice — one down", { description: next.title });
    }
  }

  function handleDelete(id) {
    const { removed, index } = deleteTask(id);
    if (!removed) return;

    toast({
      title: "Task deleted",
      description: removed.title,
      action: { label: "Undo", onClick: () => restoreTask(removed, index) },
    });
  }

  function handleClearCompleted() {
    const removed = clearCompleted();
    if (!removed.length) return;

    toast({
      title: `Cleared ${removed.length} completed`,
      action: { label: "Undo", onClick: () => restoreMany(removed) },
    });
  }

  const activeIndex = FILTERS.findIndex((item) => item.key === filter);
  const counts = {
    all: stats.total,
    active: stats.active,
    done: stats.completed,
  };

  return (
    <div className="bleed-top relative overflow-x-clip">
      <div className="aurora aurora-sm" />

      <div className="relative mx-auto max-w-3xl px-5 pb-8 pt-14 sm:px-8 sm:pt-20">
        {/* ---------- header ---------- */}
        <header>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Tasks
              </h1>
              <p className="mt-2 text-sm text-muted">
                {ready ? (
                  stats.total === 0 ? (
                    "Nothing here yet — add your first task below."
                  ) : (
                    <>
                      <span className="font-mono text-fg tabular-nums">
                        {stats.active}
                      </span>{" "}
                      open ·{" "}
                      <span className="font-mono tabular-nums">
                        {stats.completed}
                      </span>{" "}
                      done
                      {stats.highPriorityOpen > 0 ? (
                        <>
                          {" · "}
                          <span className="text-danger">
                            {stats.highPriorityOpen} high priority
                          </span>
                        </>
                      ) : null}
                    </>
                  )
                ) : (
                  "Loading your list…"
                )}
              </p>
            </div>

            {ready && stats.total > 0 ? (
              <div className="text-right">
                <p className="font-mono text-2xl tabular-nums text-fg">
                  {stats.rate}%
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-faint">
                  complete
                </p>
              </div>
            ) : null}
          </div>

          {ready && stats.total > 0 ? (
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-linear-to-r from-accent-3 via-accent to-accent-2 transition-[width] duration-500 ease-snap"
                style={{ width: `${stats.rate}%` }}
              />
            </div>
          ) : null}
        </header>

        {/* ---------- add ---------- */}
        <div className="mt-8">
          <TaskForm onAdd={handleAdd} />
        </div>

        {/* ---------- controls ---------- */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Three equal-width options, so the indicator can slide by whole
              multiples of its own width — no measuring, no layout thrash. */}
          <div className="relative flex w-full rounded-xl border border-line bg-surface p-1 sm:w-auto">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-lg bg-surface-3 transition-transform duration-250 ease-snap"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                aria-pressed={filter === item.key}
                className={cn(
                  "relative flex-1 rounded-lg px-4 py-1.5 text-sm transition-colors duration-200 sm:flex-none",
                  filter === item.key
                    ? "text-fg"
                    : "text-muted hover:text-fg"
                )}
              >
                {item.label}
                {ready ? (
                  <span className="ml-1.5 font-mono text-[0.7rem] tabular-nums text-faint">
                    {counts[item.key]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="group relative min-w-0 flex-1 sm:flex-none">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-faint transition-colors group-focus-within:text-accent" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search tasks"
                className="h-9 w-full rounded-xl border border-line bg-surface pl-8 pr-8 text-sm text-fg placeholder:text-faint transition-colors duration-150 focus:border-accent-line focus:outline-none sm:w-40"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-faint transition-colors hover:text-fg"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort tasks"
              className="h-9 rounded-xl border border-line bg-surface px-2.5 text-sm text-muted transition-colors duration-150 hover:text-fg focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            {ready && stats.completed > 0 ? (
              <button
                type="button"
                onClick={handleClearCompleted}
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-faint transition-[transform,color,border-color] duration-150 ease-snap hover:border-danger/40 hover:text-danger active:scale-[0.94]"
                aria-label="Clear completed tasks"
                title="Clear completed"
              >
                <Trash className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* ---------- list ---------- */}
        <div className="mt-5">
          {!ready ? (
            <Skeleton />
          ) : visible.length > 0 ? (
            <ul className="flex flex-col gap-2.5">
              {visible.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onRename={(id, title) => updateTask(id, { title })}
                />
              ))}
            </ul>
          ) : stats.total === 0 ? (
            <EmptyState
              icon={Inbox}
              title="A clean slate"
              body="Add your first task above. Press / from anywhere to jump straight to the input."
            />
          ) : query ? (
            <EmptyState
              icon={Search}
              title="No matches"
              body={`Nothing matches “${query.trim()}”. Try a different word, or clear the search.`}
            >
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm text-fg transition-[transform,background-color] duration-150 ease-snap hover:bg-surface-3 active:scale-[0.97]"
              >
                Clear search
              </button>
            </EmptyState>
          ) : filter === "active" ? (
            <EmptyState
              icon={Sparkles}
              title="Everything’s done"
              body="Not a single open task. Enjoy it — it never lasts long."
            />
          ) : (
            <EmptyState
              icon={Inbox}
              title="Nothing completed yet"
              body="Tick something off and it will show up here."
            />
          )}
        </div>

        {/* ---------- keyboard hints ---------- */}
        <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.7rem]">
              /
            </kbd>
            new task
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.7rem]">
              double-click
            </kbd>
            rename
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.7rem]">
              esc
            </kbd>
            cancel
          </span>
        </p>
      </div>
    </div>
  );
}
