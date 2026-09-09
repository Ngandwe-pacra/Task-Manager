"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Check, Menu, Plus, X } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { useTasks } from "@/context/TaskContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tasks", label: "Tasks" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/bright", label: "Bright" },
];

export function Logo({ className }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center rounded-[10px] bg-linear-to-br from-accent-3 via-accent to-accent-2 text-white shadow-brand">
        <Check className="size-[18px]" strokeWidth={2.5} />
      </span>
      <span className="text-[0.98rem] font-semibold tracking-tight">
        TaskFlow
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { stats, ready } = useTasks();

  const [scrolled, setScrolled] = useState(false);

  // The mobile panel is stored as "which route was it opened on", so a
  // navigation closes it by derivation. Resetting it from an effect would
  // mean a setState during render-commit for no reason.
  const [openedOn, setOpenedOn] = useState(null);
  const menuOpen = openedOn === pathname;
  const setMenuOpen = (open) => setOpenedOn(open ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && setOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-snap",
        scrolled
          ? "border-line bg-bg/72 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="rounded-xl transition-transform duration-150 ease-snap active:scale-[0.97]"
        >
          <Logo />
        </Link>

        {/* ---------- desktop ---------- */}
        <div className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-md md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-[color,background-color] duration-200 ease-snap",
                  active
                    ? "bg-surface-3 text-fg"
                    : "text-muted hover:text-fg"
                )}
              >
                {link.label}
                {link.href === "/tasks" && ready && stats.active > 0 ? (
                  <span className="ml-1.5 font-mono text-[0.68rem] text-accent">
                    {stats.active}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/tasks"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-accent px-3.5 text-sm font-medium text-accent-fg shadow-brand transition-[transform,filter] duration-150 ease-snap hover:brightness-110 active:scale-[0.97]"
          >
            <Plus className="size-4" strokeWidth={2.25} />
            New task
          </Link>
        </div>

        {/* ---------- mobile ---------- */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-[transform,color] duration-150 ease-snap active:scale-[0.94]"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Grid-rows trick: animates to the panel's natural height without
          hard-coding a pixel value, and `hidden` never blocks it. */}
      <div
        className={cn(
          "grid overflow-hidden border-line bg-bg/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 ease-drawer md:hidden",
          menuOpen
            ? "grid-rows-[1fr] border-t opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-surface-2 text-fg"
                      : "text-muted hover:bg-surface-2 hover:text-fg"
                  )}
                >
                  {link.label}
                  {link.href === "/tasks" && ready ? (
                    <span className="font-mono text-xs text-faint">
                      {stats.active} open
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
