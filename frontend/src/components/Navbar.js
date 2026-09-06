import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <Link
        href="/"
        className="font-bold text-lg text-white hover:text-gray-300 transition-colors duration-200"
      >
        TaskFlow
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/tasks"
          className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Tasks
        </Link>

        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}