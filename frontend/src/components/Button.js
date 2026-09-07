import Link from "next/link";

export default function Button({ href, children, ...props }) {
  const classes =
    "inline-block px-7 py-3.5 bg-gradient-to-r from-violet-400 to-purple-300 text-gray-900 rounded-xl font-semibold shadow-lg shadow-purple-900/20 hover:from-violet-300 hover:to-purple-200 hover:scale-105 transition-all duration-200";

  if (href) {
    return (
      <Link href={href} className={classes}>
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