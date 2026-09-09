"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Check, Undo, X } from "@/components/Icons";
import { cn } from "@/lib/utils";

/**
 * A tiny toast system with Sonner-shaped ergonomics.
 *
 * Mount <Toaster /> once in the layout, then call `toast()` from anywhere —
 * no hook, no context, no provider to thread through. The whole point is
 * that adding feedback to an interaction costs one line.
 */

let listeners = [];
let counter = 0;

function emit(payload) {
  listeners.forEach((listener) => listener(payload));
}

export function toast(input) {
  const options = typeof input === "string" ? { title: input } : input;
  counter += 1;
  emit({ id: counter, duration: 4000, variant: "default", ...options });
  return counter;
}

toast.success = (title, options) =>
  toast({ ...options, title, variant: "success" });
toast.error = (title, options) => toast({ ...options, title, variant: "error" });

const variantRing = {
  default: "text-accent",
  success: "text-success",
  error: "text-danger",
};

function ToastItem({ data, onDismiss }) {
  const [mounted, setMounted] = useState(false);

  const remaining = useRef(data.duration);
  const startedAt = useRef(0);
  const timer = useRef(null);

  // A frame's delay so the browser paints the "before" state first;
  // without it there is nothing to transition from.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const pause = useCallback(() => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
    remaining.current -= Date.now() - startedAt.current;
  }, []);

  const resume = useCallback(() => {
    if (timer.current || !Number.isFinite(remaining.current)) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(
      () => onDismiss(data.id),
      Math.max(remaining.current, 0)
    );
  }, [data.id, onDismiss]);

  useEffect(() => {
    resume();

    // Nobody wants to come back to a tab and find their toasts already gone.
    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pause, resume]);

  const visible = mounted && !data.leaving;

  return (
    <li
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      style={{
        transitionProperty: "transform, opacity",
        // Exits are quicker than entrances: the user already decided.
        transitionDuration: data.leaving ? "180ms" : "320ms",
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        transform: visible
          ? "translate3d(0, 0, 0) scale(1)"
          : "translate3d(0, 110%, 0) scale(0.97)",
        opacity: visible ? 1 : 0,
      }}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-line bg-surface-2/95 p-3.5 shadow-float backdrop-blur-xl"
    >
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-3",
          variantRing[data.variant] ?? variantRing.default
        )}
      >
        {data.variant === "error" ? (
          <X className="size-3.5" />
        ) : (
          <Check className="size-3.5" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-fg">{data.title}</p>
        {data.description ? (
          <p className="mt-0.5 text-xs text-muted">{data.description}</p>
        ) : null}
      </div>

      {data.action ? (
        <button
          type="button"
          onClick={() => {
            data.action.onClick();
            onDismiss(data.id);
          }}
          className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-lg bg-surface-3 px-2.5 py-1.5 text-xs font-medium text-fg transition-[transform,background-color] duration-150 ease-snap hover:bg-line-strong active:scale-[0.96]"
        >
          <Undo className="size-3.5" />
          {data.action.label}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onDismiss(data.id)}
          aria-label="Dismiss"
          className="mt-0.5 shrink-0 rounded-lg p-1 text-faint transition-[transform,color] duration-150 ease-snap hover:text-fg active:scale-[0.94]"
        >
          <X className="size-4" />
        </button>
      )}
    </li>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    // Two steps: flag it so CSS can animate out, then unmount.
    setToasts((current) =>
      current.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 200);
  }, []);

  useEffect(() => {
    const listener = (payload) => {
      // Cap the stack so a loop of events can't paper over the app.
      setToasts((current) => [...current.slice(-2), payload]);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <ol
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-90 mx-auto flex max-w-sm flex-col gap-2 sm:left-auto sm:right-6 sm:mx-0"
    >
      {toasts.map((item) => (
        <ToastItem key={item.id} data={item} onDismiss={dismiss} />
      ))}
    </ol>
  );
}
