import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="font-bold text-lg">TaskFlow</Link>
      <div className="flex gap-6">
        <Link href="/tasks">Tasks</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}