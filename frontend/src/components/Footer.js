import Link from "next/link";

import { Github, Heart, Linkedin, Mail } from "@/components/Icons";
import { Logo } from "@/components/Navbar";
import { profile } from "@/data/profile";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Tasks", href: "/tasks" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Bright", href: "/bright" },
      { label: "Get in touch", href: `mailto:${profile.email}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-elev">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-line to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A small, fast task manager built as a teaching project — real
            patterns, no framework soup.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              {column.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-150 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex gap-2 md:flex-col">
          {[
            { Icon: Github, href: profile.github, label: "GitHub" },
            { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="grid size-9 place-items-center rounded-xl border border-line bg-surface text-muted transition-[transform,color,border-color] duration-150 ease-snap hover:border-line-strong hover:text-fg active:scale-[0.94]"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-line px-5 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} TaskFlow · Built for the intern team.</p>
        <p className="inline-flex items-center gap-1.5">
          Made with
          <Heart className="size-3.5 text-danger" />
          in Lusaka by
          <Link
            href="/bright"
            className="font-medium text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg"
          >
            {profile.name}
          </Link>
        </p>
      </div>
    </footer>
  );
}
