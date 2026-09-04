import { initialTasks } from "@/data/tasks";

export default function DashboardPage() {
  const total = initialTasks.length;
  const completed = initialTasks.filter((t) => t.done).length;
  const remaining = total - completed;

  return (
    <div className="max-w-xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold">{completed}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold">{remaining}</p>
          <p className="text-sm text-gray-500">Remaining</p>
        </div>
      </div>
    </div>
  );
}