import Link from "next/link";

export default function Button({ href, children, ...props }) {
  const classes =
    "inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 transition";

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