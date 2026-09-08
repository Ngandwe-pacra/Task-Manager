
import { initialTasks } from "@/data/tasks";

export default function DashboardPage() {
  const total = initialTasks.length;
  const completed = initialTasks.filter((t) => t.done).length;
  const remaining = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold mb-6 text-blue-950">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="border border-blue-100 rounded-xl p-4 text-center bg-white/90 shadow-lg shadow-blue-100/40 backdrop-blur">
            <p className="text-3xl font-bold text-blue-600">{total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>

          <div className="border border-blue-100 rounded-xl p-4 text-center bg-white/90 shadow-lg shadow-blue-100/40 backdrop-blur">
            <p className="text-3xl font-bold text-blue-600">{completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>

          <div className="border border-blue-100 rounded-xl p-4 text-center bg-white/90 shadow-lg shadow-blue-100/40 backdrop-blur">
            <p className="text-3xl font-bold text-blue-600">{remaining}</p>
            <p className="text-sm text-gray-500">Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
