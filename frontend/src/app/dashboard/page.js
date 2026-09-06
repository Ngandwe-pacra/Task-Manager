import { initialTasks } from "@/data/tasks";

export default function DashboardPage() {
  const total = initialTasks.length;
  const completed = initialTasks.filter((t) => t.done).length;
  const remaining = total - completed;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold mb-2">{total}</p>
          <p className="text-sm text-gray-400">Total</p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold mb-2">{completed}</p>
          <p className="text-sm text-gray-400">Completed</p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold mb-2">{remaining}</p>
          <p className="text-sm text-gray-400">Remaining</p>
        </div>
      </div>
    </div>
  );
}