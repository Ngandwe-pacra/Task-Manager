
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 mx-4 rounded-2xl border border-blue-100 bg-white/90 px-6 py-4 shadow-lg shadow-blue-100/40 backdrop-blur-md sm:mx-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-blue-900 transition hover:text-blue-600"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-200">
            T
          </span>

          <span>
            Task<span className="text-blue-600">Flow</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/tasks"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Tasks
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
