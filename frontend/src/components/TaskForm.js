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
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border border-purple-400/20 rounded-xl px-4 py-3 bg-purple-950/40 text-white placeholder-purple-300/50 outline-none transition-all duration-200 focus:border-purple-400/60 focus:bg-purple-900/40 focus:ring-2 focus:ring-purple-500/20"
      />

      <Button type="submit">Add</Button>
    </form>
  );
}