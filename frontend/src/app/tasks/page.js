"use client";

import { useState } from "react";
import { initialTasks } from "@/data/tasks";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(title) {
    const newTask = { id: Date.now(), title, done: false };
    setTasks([newTask, ...tasks]);
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>
      <TaskForm onAdd={addTask} />
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