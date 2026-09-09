import { hydrateSeed } from "@/data/tasks";
import { makeId } from "@/lib/utils";

/**
 * Tasks live in a plain module store outside React, and components read it
 * through `useSyncExternalStore`.
 *
 * Why not `useState` + an effect that loads localStorage? Because the server
 * has no localStorage, so the first client render must match the server's
 * empty list and only then swap in the real data. Doing that with an effect
 * means a setState during mount — a cascading render React now warns about.
 * An external store expresses the same thing honestly: `getServerSnapshot`
 * is what the server rendered, `getSnapshot` is the truth on the client, and
 * React reconciles the two itself.
 */

const STORAGE_KEY = "taskflow-tasks-v1";

/* Frozen and reused: React compares snapshots by identity, so returning a
   fresh object from getSnapshot would loop forever. */
const SERVER_SNAPSHOT = Object.freeze({ tasks: [], ready: false });

let snapshot = SERVER_SNAPSHOT;
let listeners = new Set();
let loaded = false;

function read() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Private browsing, blocked storage, corrupt JSON — start from seed.
  }
  return hydrateSeed();
}

function write(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Persistence is a convenience, never a requirement.
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  snapshot = { tasks: read(), ready: true };
}

function commit(tasks) {
  snapshot = { tasks, ready: true };
  write(tasks);
  listeners.forEach((listener) => listener());
}

/* ---------- the useSyncExternalStore contract ---------- */

export function subscribe(listener) {
  ensureLoaded();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  ensureLoaded();
  return snapshot;
}

export function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

/* ---------- mutations ----------
   Module-level functions, so their identity is stable for free — no
   useCallback, and nothing to thread through a dependency array. */

export function addTask(input) {
  const task = {
    id: makeId(),
    title: input.title,
    done: false,
    priority: input.priority ?? "medium",
    category: input.category ?? "Engineering",
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  commit([task, ...snapshot.tasks]);
  return task;
}

export function toggleTask(id) {
  let next = null;
  commit(
    snapshot.tasks.map((task) => {
      if (task.id !== id) return task;
      next = {
        ...task,
        done: !task.done,
        completedAt: task.done ? null : new Date().toISOString(),
      };
      return next;
    })
  );
  return next;
}

export function updateTask(id, patch) {
  commit(
    snapshot.tasks.map((task) =>
      task.id === id ? { ...task, ...patch } : task
    )
  );
}

/** Returns the removed task and its position, so a toast can undo it. */
export function deleteTask(id) {
  const index = snapshot.tasks.findIndex((task) => task.id === id);
  if (index === -1) return { removed: null, index: -1 };

  const removed = snapshot.tasks[index];
  commit(snapshot.tasks.filter((task) => task.id !== id));
  return { removed, index };
}

export function restoreTask(task, index) {
  if (!task) return;
  const next = [...snapshot.tasks];
  next.splice(Math.min(Math.max(index, 0), next.length), 0, task);
  commit(next);
}

export function clearCompleted() {
  const removed = snapshot.tasks.filter((task) => task.done);
  if (removed.length) commit(snapshot.tasks.filter((task) => !task.done));
  return removed;
}

export function restoreMany(tasks) {
  if (!tasks?.length) return;
  commit([...snapshot.tasks, ...tasks]);
}

export function resetTasks() {
  commit(hydrateSeed());
}
