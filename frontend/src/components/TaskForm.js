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
      className="flex gap-3 mb-8"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10"
      />

      <Button type="submit">Add</Button>
    </form>
  );
}