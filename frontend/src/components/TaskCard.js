
export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-white/90 px-4 py-3 shadow-md shadow-blue-100/30 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/50">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 cursor-pointer accent-blue-600"
        />

        <span
          className={
            task.done
              ? "text-gray-400 line-through"
              : "font-medium text-blue-950"
          }
        >
          {task.title}
        </span>
      </label>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
}
