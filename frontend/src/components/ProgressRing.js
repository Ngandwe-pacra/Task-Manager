import { cn } from "@/lib/utils";

/**
 * A single headline number with a ring around it — a hero stat, not a chart.
 * One series, so there is nothing to legend: the label under it says what
 * it is. The ring animates by transitioning stroke-dashoffset, which the
 * compositor handles without a re-layout.
 */
export default function ProgressRing({
  value = 0,
  size = 168,
  thickness = 10,
  label = "complete",
  className,
}) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${safe} percent ${label}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-3)" />
            <stop offset="55%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {/* Track stays recessive — it is context, not data. */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - safe / 100)}
          style={{
            transition:
              "stroke-dashoffset 900ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-medium tabular-nums text-fg">
          {safe}
          <span className="text-xl text-faint">%</span>
        </span>
        <span className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          {label}
        </span>
      </div>
    </div>
  );
}
