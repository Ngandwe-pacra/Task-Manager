import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import {
  ArrowRight,
  Bolt,
  Check,
  Layers,
  Quote,
  Sparkles,
  Target,
  TrendUp,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

const features = [
  {
    icon: Bolt,
    title: "Fast by default",
    body: "Add a task in one field and one keypress. Press / from anywhere to start typing — no clicking around for the input.",
  },
  {
    icon: Layers,
    title: "Organised without effort",
    body: "Priorities, lists, search and sort. Finished work sinks to the bottom on its own so the top of the list is always what matters.",
  },
  {
    icon: TrendUp,
    title: "Progress you can see",
    body: "The dashboard reads the same live list you edit — completion rate, weekly rhythm, and where the open work is piling up.",
  },
];

const steps = [
  {
    title: "Write it down",
    body: "Get it out of your head and into the list. Set a priority if it matters, skip it if it doesn’t.",
  },
  {
    title: "Work the top",
    body: "High-priority items carry a marker and open work stays above the fold. There is no deciding what’s next.",
  },
  {
    title: "Watch it move",
    body: "Tick things off and the dashboard updates instantly. Momentum is easier to keep when you can see it.",
  },
];

const metrics = [
  { value: "4", label: "Pages, all doing real work" },
  { value: "0", label: "Runtime dependencies added" },
  { value: "100%", label: "Keyboard reachable" },
  { value: "2", label: "Themes, one toggle" },
];

/* A still of the product, hand-built rather than screenshotted — it stays
   sharp on every display and re-themes with the rest of the page. */
function AppPreview() {
  const rows = [
    { title: "Wire the dashboard to real task state", priority: "high", done: false },
    { title: "Connect the API to MongoDB", priority: "high", done: false },
    { title: "Build the landing page", priority: "high", done: true },
    { title: "Design the landing page in Figma", priority: "medium", done: true },
    { title: "Call Mum", priority: "low", done: false },
  ];

  const tone = { high: "bg-danger", medium: "bg-warn", low: "bg-faint" };

  return (
    <div className="relative rounded-2xl border border-line bg-surface/90 p-2 shadow-float backdrop-blur-xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="flex gap-1.5">
          {["bg-danger/60", "bg-warn/60", "bg-success/60"].map((dot) => (
            <span key={dot} className={`size-2.5 rounded-full ${dot}`} />
          ))}
        </span>
        <span className="ml-2 rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[0.65rem] text-faint">
          taskflow.app/tasks
        </span>
      </div>

      <div className="rounded-xl border border-line bg-elev p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold">Tasks</p>
          <p className="font-mono text-xs tabular-nums text-faint">
            3 open · 2 done
          </p>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-2/5 rounded-full bg-linear-to-r from-accent-3 via-accent to-accent-2" />
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {rows.map((row) => (
            <li
              key={row.title}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5"
            >
              <span
                className={
                  row.done
                    ? "grid size-4 shrink-0 place-items-center rounded-[5px] bg-accent text-accent-fg"
                    : "size-4 shrink-0 rounded-[5px] border-2 border-line-strong"
                }
              >
                {row.done ? (
                  <Check className="size-2.5" strokeWidth={3.5} />
                ) : null}
              </span>
              <span
                className={`min-w-0 flex-1 truncate text-xs ${
                  row.done ? "text-faint line-through" : "text-fg"
                }`}
              >
                {row.title}
              </span>
              <span className={`size-1.5 shrink-0 rounded-full ${tone[row.priority]}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* ================= hero ================= */}
      <section className="bleed-top noise relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-fade" />

        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Link
                href="/bright"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-3.5 text-xs text-muted backdrop-blur-md transition-[border-color,color] duration-200 hover:border-accent-line hover:text-fg"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                  <Sparkles className="size-3" />
                  New
                </span>
                An intern training project by {profile.firstName}
                <ArrowRight className="size-3.5 transition-transform duration-200 ease-snap group-hover:translate-x-0.5" />
              </Link>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Stay on top of
                <br />
                <span className="text-gradient inline-block">your tasks</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                TaskFlow is a calm place to track what needs doing, see what’s
                finished, and keep a team pointed in the same direction. Fast,
                keyboard-friendly, and quiet about it.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href="/tasks" size="lg">
                  Get started
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="/dashboard" size="lg" variant="secondary">
                  See the dashboard
                </Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-5 text-xs text-faint">
                No sign-up. Your list lives in your browser.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300} className="mx-auto mt-16 max-w-2xl">
            <AppPreview />
          </Reveal>
        </div>
      </section>

      {/* ================= metrics ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl border border-line bg-surface/50 px-6 py-8 sm:grid-cols-4 sm:px-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <dt className="font-mono text-3xl font-medium tabular-nums text-fg">
                  {metric.value}
                </dt>
                <dd className="mx-auto mt-1.5 max-w-[9rem] text-xs leading-relaxed text-muted">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ================= features ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Why it feels different
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            The details you don’t notice until they’re missing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Nobody praises a good empty state or a focus ring on its own. Put
            enough of them together and the whole thing simply feels right.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <article className="hairline group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-300 ease-snap hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
                {/* Accent wash that only shows on hover — decoration, so it
                    stays cheap: one opacity transition, nothing else. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-accent-soft to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative grid size-11 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="relative mt-5 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                  {feature.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= how it works ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps, then get on with it
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              A task manager should disappear once it’s set up. This one asks
              for a title and gets out of the way.
            </p>
            <Button href="/tasks" variant="secondary" className="mt-8">
              Try it now
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>

          <ol className="relative flex flex-col gap-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <li className="flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-[border-color,background-color] duration-250 hover:border-line-strong hover:bg-surface-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-accent-line bg-accent-soft font-mono text-sm text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= quote ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Reveal>
          <figure className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-12">
            <div className="aurora aurora-sm opacity-60" />

            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <div className="relative size-24 overflow-hidden rounded-2xl border border-line-strong shadow-card">
                  <Image
                    src="/img/bright-avatar.jpg"
                    alt={`${profile.name}, ${profile.role} at ${profile.org}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Quote className="size-3.5" />
                </span>
              </div>

              <div>
                <blockquote className="font-display text-2xl leading-snug text-fg sm:text-[1.75rem]">
                  “{profile.quote}”
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-medium text-fg">{profile.name}</span>
                  <span className="text-faint">·</span>
                  <span className="text-muted">
                    {profile.role}, {profile.org}
                  </span>
                  <Link
                    href="/bright"
                    className="group inline-flex items-center gap-1 text-accent transition-colors hover:brightness-125"
                  >
                    Read more
                    <ArrowRight className="size-3.5 transition-transform duration-200 ease-snap group-hover:translate-x-0.5" />
                  </Link>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </section>

      {/* ================= cta ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-accent-line bg-surface px-6 py-16 text-center sm:px-12">
            <div className="aurora" />
            <div className="grid-fade" />

            <div className="relative">
              <span className="grid mx-auto size-12 place-items-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
                <Target className="size-6" />
              </span>
              <h2 className="mx-auto mt-6 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Your list is one click away
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-muted">
                Nothing to install, nothing to sign up for. Open it and start
                typing.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href="/tasks" size="lg">
                  Open TaskFlow
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="/bright" size="lg" variant="ghost">
                  Meet the maker
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
