"use client";

import Link from "next/link";

import {
  ArrowRight,
  Bolt,
  Check,
  Flame,
  Inbox,
  Layers,
  Target,
  TrendUp,
} from "@/components/Icons";
import ProgressRing from "@/components/ProgressRing";
import StatCard from "@/components/StatCard";
import { useTasks } from "@/context/TaskContext";
import { cn, percent, timeAgo } from "@/lib/utils";

/* Priority uses the reserved status colours, and always ships the label
   beside the swatch — never colour alone. */
const priorityTone = {
  high: { solid: "bg-danger", soft: "bg-danger-soft" },
  medium: { solid: "bg-warn", soft: "bg-warn-soft" },
  low: { solid: "bg-faint", soft: "bg-surface-3" },
};

function Panel({ title, subtitle, action, children, className }) {
  return (
    <section
      className={cn(
        "hairline relative overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-fg">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Completions per day, last 7 days. One series, so the title is the legend. */
function WeekChart({ days }) {
  const peak = Math.max(1, ...days.map((day) => day.count));
  const anyData = days.some((day) => day.count > 0);

  return (
    <div>
      <div className="relative flex h-40 items-end gap-1.5">
        {/* Recessive gridlines sit behind the marks and carry no emphasis. */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="h-px w-full bg-line" />
          ))}
        </div>

        {days.map((day) => {
          const height = anyData ? (day.count / peak) * 100 : 0;
          return (
            <div
              key={day.key}
              className="group relative flex h-full flex-1 flex-col justify-end"
            >
              {/* Hover layer: the value on demand beats a label on every bar. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-full z-10 mb-2 flex justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                <span className="whitespace-nowrap rounded-lg border border-line bg-surface-3 px-2 py-1 font-mono text-[0.68rem] text-fg shadow-card">
                  {day.count} · {day.label}
                </span>
              </div>

              <div
                // 4px rounded top, anchored to the baseline. A 2px floor
                // stays visible at zero so the day still reads as present.
                className={cn(
                  "w-full rounded-t-[4px] transition-[height,background-color] duration-500 ease-snap",
                  day.count > 0
                    ? "bg-accent group-hover:bg-accent-3"
                    : "bg-surface-3"
                )}
                style={{ height: `max(2px, ${height}%)` }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex gap-1.5">
        {days.map((day) => (
          <span
            key={day.key}
            className={cn(
              "flex-1 text-center font-mono text-[0.68rem]",
              day.isToday ? "font-medium text-fg" : "text-faint"
            )}
          >
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Horizontal magnitude bars. One hue throughout — these are amounts of the
    same thing, not competing identities, so a second colour would only lie. */
function CategoryBars({ items }) {
  const peak = Math.max(1, ...items.map((item) => item.total));

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.name}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate font-medium text-fg">{item.name}</span>
            <span className="shrink-0 font-mono tabular-nums text-faint">
              {item.done}/{item.total}
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            {/* Total as a recessive fill, completed as the emphasised one,
                separated by 2px of surface so the two never blur together. */}
            <div
              className="h-full rounded-full bg-accent-soft transition-[width] duration-700 ease-snap"
              style={{ width: `${(item.total / peak) * 100}%` }}
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-700 ease-snap"
                style={{ width: `${percent(item.done, item.total)}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
      {[0, 1, 2, 3].map((tile) => (
        <div
          key={tile}
          className="relative h-[132px] overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <span className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-surface-2 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { tasks, ready, stats, resetTasks } = useTasks();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const recent = [...tasks]
    .filter((task) => task.completedAt || task.createdAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? b.createdAt) -
        new Date(a.completedAt ?? a.createdAt)
    )
    .slice(0, 6);

  return (
    <div className="bleed-top relative overflow-x-clip">
      <div className="aurora aurora-sm" />

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8 sm:pt-20">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              {today}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetTasks}
              className="rounded-xl border border-line bg-surface px-3.5 py-2 text-xs text-muted transition-[transform,color,border-color] duration-150 ease-snap hover:border-line-strong hover:text-fg active:scale-[0.97]"
            >
              Reset demo data
            </button>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-medium text-accent-fg shadow-brand transition-[transform,filter] duration-150 ease-snap hover:brightness-110 active:scale-[0.97]"
            >
              Open tasks
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </header>

        {!ready ? (
          <div className="mt-10">
            <Skeleton />
          </div>
        ) : stats.total === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface/40 px-6 py-20 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Inbox className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Nothing to measure</h2>
            <p className="mt-1.5 max-w-sm text-sm text-muted">
              The dashboard reads from your real task list. Add a few tasks and
              the numbers here will follow along.
            </p>
            <Link
              href="/tasks"
              className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-[transform,filter] duration-150 ease-snap hover:brightness-110 active:scale-[0.97]"
            >
              Add your first task
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* ---------- tiles ---------- */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={Layers}
                label="Total tasks"
                value={stats.total}
                hint={`across ${stats.byCategory.length} ${
                  stats.byCategory.length === 1 ? "list" : "lists"
                }`}
                tone="neutral"
              />
              <StatCard
                icon={Check}
                label="Completed"
                value={stats.completed}
                hint={`${stats.completedThisWeek} in the last 7 days`}
                tone="success"
              />
              <StatCard
                icon={Bolt}
                label="Still open"
                value={stats.active}
                hint={
                  stats.highPriorityOpen > 0
                    ? `${stats.highPriorityOpen} high priority`
                    : "nothing urgent"
                }
                tone={stats.highPriorityOpen > 0 ? "danger" : "neutral"}
              />
              <StatCard
                icon={TrendUp}
                label="Completion"
                value={`${stats.rate}%`}
                hint={
                  stats.rate >= 60 ? "ahead of the curve" : "keep chipping away"
                }
                tone="accent"
              />
            </div>

            {/* ---------- ring + week ---------- */}
            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <Panel
                title="Overall progress"
                subtitle={`${stats.completed} of ${stats.total} tasks done`}
              >
                <div className="flex flex-col items-center gap-6 py-2">
                  <ProgressRing value={stats.rate} />

                  <dl className="grid w-full grid-cols-2 gap-3">
                    {[
                      { label: "Best day", value: `${stats.bestDay?.count ?? 0} done`, meta: stats.bestDay?.label },
                      { label: "This week", value: `${stats.completedThisWeek} done`, meta: "last 7 days" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-line bg-surface-2 px-3 py-2.5"
                      >
                        <dt className="text-[0.68rem] uppercase tracking-[0.1em] text-faint">
                          {item.label}
                        </dt>
                        <dd className="mt-1 font-mono text-sm tabular-nums text-fg">
                          {item.value}
                        </dd>
                        <dd className="text-[0.68rem] text-faint">{item.meta}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Panel>

              <Panel
                title="Tasks completed per day"
                subtitle="Last 7 days · hover a bar for the count"
                action={
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-success-soft px-2 py-1 text-[0.68rem] font-medium text-success">
                    <Flame className="size-3.5" />
                    {stats.completedThisWeek} this week
                  </span>
                }
              >
                <WeekChart days={stats.days} />
              </Panel>
            </div>

            {/* ---------- breakdowns ---------- */}
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Panel title="By priority" subtitle="How the open work is weighted">
                <ul className="flex flex-col gap-4">
                  {stats.byPriority.map((bucket) => {
                    const peak = Math.max(
                      1,
                      ...stats.byPriority.map((item) => item.total)
                    );
                    const tone = priorityTone[bucket.key];

                    return (
                      <li key={bucket.key}>
                        <div className="flex items-baseline justify-between gap-3 text-xs">
                          <span className="inline-flex items-center gap-2 font-medium text-fg">
                            <span
                              className={cn("size-2 rounded-full", tone.solid)}
                            />
                            {bucket.label}
                          </span>
                          <span className="font-mono tabular-nums text-faint">
                            {bucket.done}/{bucket.total}
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                          <div
                            className={cn(
                              "h-full rounded-full transition-[width] duration-700 ease-snap",
                              tone.soft
                            )}
                            style={{ width: `${(bucket.total / peak) * 100}%` }}
                          >
                            <div
                              className={cn(
                                "h-full rounded-full transition-[width] duration-700 ease-snap",
                                tone.solid
                              )}
                              style={{
                                width: `${percent(bucket.done, bucket.total)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Panel>

              <Panel title="By list" subtitle="Completed against total">
                <CategoryBars items={stats.byCategory} />
              </Panel>

              <Panel
                title="Recent activity"
                subtitle="Newest first"
                action={<Target className="size-4 text-faint" />}
              >
                <ul className="flex flex-col gap-3">
                  {recent.map((task) => (
                    <li key={task.id} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-1 grid size-4 shrink-0 place-items-center rounded-full",
                          task.done
                            ? "bg-success-soft text-success"
                            : "border border-line-strong"
                        )}
                      >
                        {task.done ? (
                          <Check className="size-2.5" strokeWidth={3} />
                        ) : null}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "truncate text-xs",
                            task.done ? "text-muted" : "text-fg"
                          )}
                        >
                          {task.title}
                        </p>
                        <p className="font-mono text-[0.68rem] text-faint">
                          {task.done && task.completedAt
                            ? `completed ${timeAgo(task.completedAt)}`
                            : `added ${timeAgo(task.createdAt)}`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
