/**
 * One place for every glyph in the app.
 *
 * All icons share a 24x24 box, `currentColor`, and a 1.75 stroke so they
 * sit on the same optical weight next to text. Inline SVG means no icon
 * font, no extra request, and no layout shift.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

function Svg({ children, className = "size-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      {children}
    </svg>
  );
}

export const Check = (p) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const Trash = (p) => (
  <Svg {...p}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" />
  </Svg>
);

export const Pencil = (p) => (
  <Svg {...p}>
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Svg>
);

export const Search = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const Sun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const Moon = (p) => (
  <Svg {...p}>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.8 6.8 0 0 0 9.8 9.8Z" />
  </Svg>
);

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const X = (p) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const Sparkles = (p) => (
  <Svg {...p}>
    <path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3Z" />
    <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
  </Svg>
);

export const Bolt = (p) => (
  <Svg {...p}>
    <path d="M13.5 2 5 13.5h5.5L9.5 22 19 10.5h-5.5L13.5 2Z" />
  </Svg>
);

export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" />
  </Svg>
);

export const TrendUp = (p) => (
  <Svg {...p}>
    <path d="M3 17l5.5-5.5 3.5 3.5L21 6" />
    <path d="M15 6h6v6" />
  </Svg>
);

export const Target = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </Svg>
);

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3.2 1.9" />
  </Svg>
);

export const Flame = (p) => (
  <Svg {...p}>
    <path d="M12 2.5c3.2 3.4 6 5.9 6 10a6 6 0 0 1-12 0c0-2 1-3.6 2.4-5.1.5 1.2 1.3 1.9 2.2 2.1-.6-2.6-.4-4.9 1.4-7Z" />
  </Svg>
);

export const Inbox = (p) => (
  <Svg {...p}>
    <path d="M3 13h5l1.5 2.5h5L16 13h5" />
    <path d="M4.5 5.5h15L21 13v5.5H3V13l1.5-7.5Z" />
  </Svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.8 7 8.2 5.8L20.2 7" />
  </Svg>
);

export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Svg>
);

export const Github = ({ className = "size-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
);

export const Linkedin = ({ className = "size-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.6 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.6-.6-2.7-2-2.7-1.14 0-1.8.77-2.1 1.5-.1.27-.13.64-.13 1.01V21h-4V9Z" />
  </svg>
);

export const Quote = ({ className = "size-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M9.5 5C6.4 6.6 4.6 9.4 4.6 12.9c0 3.4 1.9 5.6 4.4 5.6 2 0 3.6-1.5 3.6-3.5 0-1.9-1.4-3.3-3.2-3.3-.3 0-.6 0-.8.1.3-1.7 1.7-3.3 3.6-4.3L9.5 5Zm9 0c-3.1 1.6-4.9 4.4-4.9 7.9 0 3.4 1.9 5.6 4.4 5.6 2 0 3.6-1.5 3.6-3.5 0-1.9-1.4-3.3-3.2-3.3-.3 0-.6 0-.8.1.3-1.7 1.7-3.3 3.6-4.3L18.5 5Z" />
  </svg>
);

export const Code = (p) => (
  <Svg {...p}>
    <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.8 5.5l-3.6 13" />
  </Svg>
);

export const Undo = (p) => (
  <Svg {...p}>
    <path d="M3 8h11a5.5 5.5 0 0 1 0 11H8" />
    <path d="m7 4-4 4 4 4" />
  </Svg>
);

export const Filter = (p) => (
  <Svg {...p}>
    <path d="M3 6h18M6 12h12M10 18h4" />
  </Svg>
);

export const Heart = (p) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.7C19 15.6 12 20 12 20Z" />
  </Svg>
);

export const Book = (p) => (
  <Svg {...p}>
    <path d="M4 4.5h6a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h6v13h-6a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H4v-13ZM12 5.5v13" />
  </Svg>
);
