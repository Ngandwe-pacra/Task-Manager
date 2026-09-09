import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Every pressable thing in the app. Pass `href` for a link, omit it for a
 * button — the caller shouldn't have to think about which element it needs.
 *
 * The `active:scale-[0.97]` is the important part: it is what makes a click
 * feel like the interface heard you.
 */

const variants = {
  primary:
    "bg-accent text-accent-fg shadow-brand hover:brightness-110 focus-visible:outline-accent",
  secondary:
    "bg-surface-2 text-fg border border-line hover:bg-surface-3 hover:border-line-strong",
  ghost: "text-muted hover:text-fg hover:bg-surface-2",
  danger:
    "bg-danger-soft text-danger border border-transparent hover:border-danger/40",
};

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-[0.95rem]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const classes = cn(
    "relative inline-flex select-none items-center justify-center rounded-xl font-medium",
    // Name the properties: `transition-all` would animate layout too.
    "transition-[transform,background-color,border-color,color,filter,box-shadow]",
    "duration-150 ease-snap active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
