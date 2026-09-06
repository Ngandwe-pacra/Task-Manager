export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border rounded-xl px-5 py-4 bg-white/5 shadow-sm transition-all duration-200 hover:bg-white/10 hover:shadow-md ${
        task.done ? "border-white/5" : "border-white/10"
      }`}
    >
      <label className="flex items-center gap-3 cursor-pointer min-w-0">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-white cursor-pointer"
        />

        <span
          className={`truncate ${
            task.done
              ? "line-through text-gray-500"
              : "text-white"
          }`}
        >
          {task.title}
        </span>
      </label>

      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 text-sm text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
      >
        Delete
      </button>
    </div>
  );
}