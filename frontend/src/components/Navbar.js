import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-gray-800">


      <Link 
      href="/" 
      className="font-bold bg-blue-500 text-lg px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-400"
      >
        TaskFlow
        </Link>



      <div className="flex gap-6">
        <Link 
        href="/tasks"
         className="px-3 py-2 rounded-lg bg-blue-400 transition-colors duration-200 hover:bg-blue-300 "
        >
          Tasks
          </Link>


        <Link
        href="/dashboard"
        className="px-3 py-2 rounded-lg bg-blue-400 transition-colors duration-200 hover:bg-blue-300"
        >
          Dashboard
          </Link>
        </div>


    </nav>
  );
}