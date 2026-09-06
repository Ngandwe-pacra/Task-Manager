import Link from "next/link";

export default function Button({ href, children, ...props }) {
  const classes =
  "inline-block px-7 py-3.5 bg-white text-black rounded-xl font-semibold shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-200";

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