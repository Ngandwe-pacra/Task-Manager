export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.done ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="text-sm text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}