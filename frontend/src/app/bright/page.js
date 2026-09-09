import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import {
  ArrowRight,
  Book,
  Code,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Quote,
  Sparkles,
  Target,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

export const metadata = {
  title: profile.name,
  description: `${profile.role} at ${profile.org} in ${profile.location}. ${profile.tagline}`,
};

function SectionHeading({ eyebrow, title, body, className }) {
  return (
    <Reveal className={className}>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

export default function BrightPage() {
  const socials = [
    { Icon: Github, href: profile.github, label: "GitHub" },
    { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <div className="relative">
      {/* ================= hero ================= */}
      <section className="bleed-top noise relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-fade" />

        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            {/* ---------- copy ---------- */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur-md">
                  {profile.available ? (
                    <span className="relative flex size-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative size-2 rounded-full bg-success" />
                    </span>
                  ) : null}
                  {profile.availableLabel}
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-6 font-display text-[3.2rem] leading-[0.95] tracking-tight sm:text-7xl">
                  {profile.firstName}
                  <span className="text-gradient"> Musongo</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5 font-medium text-fg">
                    <Code className="size-4 text-accent" />
                    {profile.role}
                  </span>
                  <span className="text-faint">·</span>
                  <span title={profile.orgFull}>{profile.org}</span>
                  <span className="text-faint">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-faint" />
                    {profile.location}
                  </span>
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-7 max-w-xl font-display text-2xl leading-snug text-fg sm:text-[1.7rem]">
                  {profile.tagline}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href={`mailto:${profile.email}`} size="lg">
                    <Mail className="size-4" />
                    Get in touch
                  </Button>

                  <div className="flex gap-2">
                    {socials.slice(0, 2).map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="grid size-12 place-items-center rounded-xl border border-line bg-surface text-muted transition-[transform,color,border-color] duration-150 ease-snap hover:border-line-strong hover:text-fg active:scale-[0.95]"
                      >
                        <Icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---------- portrait ---------- */}
            <Reveal delay={200}>
              <div className="relative mx-auto w-full max-w-sm">
                {/* Offset frame behind the photo: cheap depth, no shadow spam. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] border border-accent-line"
                />
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-line-strong bg-surface-2 shadow-float">
                  <Image
                    src="/img/bright-portrait.jpg"
                    alt={`${profile.name}, ${profile.role} at ${profile.org}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 384px"
                    className="object-cover object-[center_12%]"
                  />
                  {/* Gradient scrim so the caption never fights the photo. */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {profile.name}
                      </p>
                      <p className="font-mono text-[0.7rem] text-white/70">
                        {profile.timezone}
                      </p>
                    </div>
                    <span className="grid size-8 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                      <Sparkles className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- quick facts ---------- */}
          <Reveal delay={280} className="mt-16">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {profile.quickFacts.map((fact) => (
                <div key={fact.label} className="bg-surface px-5 py-5">
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-fg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ================= about ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeading eyebrow="About" title="The short version" />

          <Reveal delay={80}>
            <div className="flex flex-col gap-5">
              {profile.intro.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-fg"
                      : "text-base leading-relaxed text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= stack ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="What I reach for"
          body="Not a badge collection — this is genuinely what I use week to week."
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {profile.stack.map((group, index) => (
            <Reveal key={group.group} delay={index * 80}>
              <div className="hairline relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-sm font-semibold text-fg">{group.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-muted transition-[color,border-color,transform] duration-150 ease-snap hover:-translate-y-0.5 hover:border-accent-line hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= principles ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="How I work"
          title="Four things I keep coming back to"
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {profile.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 70}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 ease-snap hover:-translate-y-1 hover:border-line-strong">
                <span className="font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-fg">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= journey ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="How I got here"
          className="max-w-2xl"
        />

        <ol className="relative mt-12 max-w-3xl">
          {/* One continuous rail behind the markers, faded at both ends. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[15px] top-2 w-px bg-linear-to-b from-transparent via-line-strong to-transparent"
          />

          {profile.journey.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 80}>
              <li className="relative flex gap-6 pb-10 pl-0">
                <span className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface">
                  <span
                    className={
                      index === profile.journey.length - 1
                        ? "size-2 rounded-full bg-faint"
                        : "size-2 rounded-full bg-accent"
                    }
                  />
                </span>

                <div className="pt-0.5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
                    {entry.stage}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-fg">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ================= currently ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="hairline relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                <Book className="size-4" />
              </span>
              <h2 className="text-lg font-semibold">Currently</h2>
            </div>

            <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {profile.currently.map((item) => (
                <div
                  key={item.label}
                  className="border-t border-line pt-4 first:border-t-0 first:pt-0 sm:border-t sm:pt-4 sm:first:border-t sm:first:pt-4"
                >
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ================= mother ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="aurora aurora-sm opacity-70" />

            <div className="relative grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="relative aspect-4/5 lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={profile.mother.photo}
                  alt={profile.mother.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-[center_30%]"
                />
                {/* Fade the photo into the panel instead of butting a hard
                    edge against the copy — different direction per breakpoint. */}
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-surface/35 lg:via-55% lg:to-surface" />

                <span className="absolute bottom-4 left-4 rounded-lg bg-black/40 px-2.5 py-1 font-mono text-[0.68rem] text-white/85 backdrop-blur-md">
                  {profile.mother.caption}
                </span>
              </div>

              <div className="relative flex flex-col justify-center p-8 sm:p-12">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-danger">
                  <Heart className="size-4" />
                </span>

                <h2 className="mt-6 font-display text-3xl leading-tight text-fg sm:text-4xl">
                  {profile.mother.heading}
                </h2>

                <div className="mt-6 flex flex-col gap-4">
                  {profile.mother.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="text-base leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <p className="mt-8 inline-flex items-center gap-2 text-xs text-faint">
                  <Quote className="size-3.5" />
                  Yes, “Call Mum” really is on the list.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= note to interns ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="For the team"
          title={profile.internNote.heading}
          body={profile.internNote.body}
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {profile.internNote.points.map((point, index) => (
            <Reveal key={point.title} delay={index * 70}>
              <article className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-6 transition-[border-color,background-color] duration-250 hover:border-line-strong hover:bg-surface-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-soft font-mono text-sm text-accent">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= contact ================= */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-accent-line bg-surface px-6 py-16 text-center sm:px-12">
            <div className="aurora" />
            <div className="grid-fade" />

            <div className="relative">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
                <Target className="size-6" />
              </span>

              <h2 className="mx-auto mt-6 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Building something? Say hello.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-muted">
                Always happy to talk shop — Next.js, databases, or how to get an
                intern team shipping properly.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={`mailto:${profile.email}`} size="lg">
                  <Mail className="size-4" />
                  {profile.email}
                </Button>
                <Button href="/tasks" size="lg" variant="ghost">
                  Back to the app
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              <div className="mt-10 flex justify-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-[transform,color,border-color] duration-150 ease-snap hover:border-line-strong hover:text-fg active:scale-[0.95]"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* A quiet footnote for whoever opens the source. */}
      <p className="mx-auto max-w-6xl px-5 pb-4 text-center text-xs text-faint sm:px-8">
        Every word on this page lives in{" "}
        <Link
          href="/bright"
          className="font-mono text-muted underline decoration-line-strong underline-offset-2"
        >
          src/data/profile.js
        </Link>{" "}
        — the page itself is only layout.
      </p>
    </div>
  );
}
