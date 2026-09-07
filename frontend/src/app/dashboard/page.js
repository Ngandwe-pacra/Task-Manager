import { initialTasks } from "@/data/tasks";

export default function DashboardPage() {
  const total = initialTasks.length;
  const completed = initialTasks.filter((t) => t.done).length;
  const remaining = total - completed;

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-sm text-purple-300 uppercase tracking-widest mb-3">
          Overview
        </p>

        <h1 className="text-4xl font-bold text-white mb-3">
          Dashboard
        </h1>

        <p className="text-gray-400">
          Keep track of your task progress at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border border-white/10 rounded-2xl p-7 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold text-purple-300 mb-2">
            {total}
          </p>

          <p className="text-sm text-gray-400">
            Total Tasks
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-7 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold text-purple-300 mb-2">
            {completed}
          </p>

          <p className="text-sm text-gray-400">
            Completed
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-7 bg-white/5 shadow-lg text-center transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
          <p className="text-4xl font-bold text-purple-300 mb-2">
            {remaining}
          </p>

          <p className="text-sm text-gray-400">
            Remaining
          </p>
        </div>
      </div>
    </div>
  );
}