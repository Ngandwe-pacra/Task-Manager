/** Join class names, dropping anything falsy. Keeps JSX conditionals tidy. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Clamp a number into a range. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** "3h ago", "2d ago" — short relative time, no dependency required. */
export function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 45) return "just now";

  const steps = [
    ["m", 60],
    ["h", 60],
    ["d", 24],
  ];

  let value = seconds / 60;
  let unit = "m";
  for (let i = 0; i < steps.length - 1; i += 1) {
    if (value < steps[i + 1][1]) break;
    value /= steps[i + 1][1];
    unit = steps[i + 1][0];
  }

  if (unit === "d" && value >= 7) {
    return `${Math.round(value / 7)}w ago`;
  }
  return `${Math.max(1, Math.round(value))}${unit} ago`;
}

/** Percentage as a whole number, safe when the denominator is 0. */
export function percent(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}

/** Collision-resistant enough for client-side list keys. */
export function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
