"use client";

import { useState } from "react";
import { initialTasks } from "@/data/tasks";
import TaskCard from "@/components/TaskCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}