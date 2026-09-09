import { cn } from "@/lib/utils";

/**
 * A stat tile: one number, one label, one glyph. No plot, so no hover layer.
 * The value wears an ink token and the icon carries the accent — a number
 * painted in a series colour is harder to read, not more informative.
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "accent",
  className,
}) {
  const tones = {
    accent: "bg-accent-soft text-accent",
    success: "bg-success-soft text-success",
    warn: "bg-warn-soft text-warn",
    danger: "bg-danger-soft text-danger",
    neutral: "bg-surface-3 text-muted",
  };

  return (
    <div
      className={cn(
        "hairline relative overflow-hidden rounded-2xl border border-line bg-surface p-5",
        "transition-[border-color,transform,box-shadow] duration-250 ease-snap",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-faint">
          {label}
        </p>
        {Icon ? (
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-xl",
              tones[tone]
            )}
          >
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>

      <p className="mt-4 font-mono text-3xl font-medium tabular-nums text-fg">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
