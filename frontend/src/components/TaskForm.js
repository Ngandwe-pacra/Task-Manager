
"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 rounded-xl border border-blue-100 bg-white/90 p-2 shadow-lg shadow-blue-100/40 backdrop-blur"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border border-transparent bg-blue-50/50 px-3 py-2 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />

      <Button type="submit">Add</Button>
    </form>
  );
}