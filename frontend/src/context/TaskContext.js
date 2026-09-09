"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import { PRIORITIES } from "@/data/tasks";
import * as store from "@/lib/taskStore";
import { percent } from "@/lib/utils";

/**
 * One source of truth for tasks, shared by /tasks and /dashboard.
 *
 * Before this existed the dashboard read the static seed file while the
 * tasks page kept its own useState, so ticking a task off never moved the
 * numbers. Now both read the same store — and it survives a refresh.
 *
 * The context exists so the derived stats are computed once per change
 * rather than once per consumer; the store underneath is plain JS.
 */

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { tasks, ready } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.done).length;

    const byPriority = Object.keys(PRIORITIES).map((key) => {
      const bucket = tasks.filter((task) => task.priority === key);
      return {
        key,
        label: PRIORITIES[key].label,
        total: bucket.length,
        done: bucket.filter((task) => task.done).length,
      };
    });

    const byCategory = [...new Set(tasks.map((task) => task.category))]
      .map((name) => {
        const bucket = tasks.filter((task) => task.category === name);
        return {
          name,
          total: bucket.length,
          done: bucket.filter((task) => task.done).length,
        };
      })
      .sort((a, b) => b.total - a.total);

    // Completions per day for the last week, oldest first.
    const days = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - offset);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      days.push({
        key: start.toISOString().slice(0, 10),
        label: start.toLocaleDateString("en-GB", { weekday: "short" }),
        isToday: offset === 0,
        count: tasks.filter((task) => {
          if (!task.completedAt) return false;
          const at = new Date(task.completedAt).getTime();
          return at >= start.getTime() && at < end.getTime();
        }).length,
      });
    }

    return {
      total,
      completed,
      active: total - completed,
      rate: percent(completed, total),
      highPriorityOpen: tasks.filter(
        (task) => !task.done && task.priority === "high"
      ).length,
      byPriority,
      byCategory,
      days,
      completedThisWeek: days.reduce((sum, day) => sum + day.count, 0),
      bestDay: days.reduce(
        (best, day) => (day.count > best.count ? day : best),
        days[0] ?? { count: 0 }
      ),
    };
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      ready,
      stats,
      addTask: store.addTask,
      toggleTask: store.toggleTask,
      updateTask: store.updateTask,
      deleteTask: store.deleteTask,
      restoreTask: store.restoreTask,
      clearCompleted: store.clearCompleted,
      restoreMany: store.restoreMany,
      resetTasks: store.resetTasks,
    }),
    [tasks, ready, stats]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside a <TaskProvider>.");
  }
  return context;
}
