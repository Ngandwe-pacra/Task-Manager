export const CATEGORIES = ["Engineering", "Design", "Ops", "Personal"];

export const PRIORITIES = {
  high: { label: "High", order: 0 },
  medium: { label: "Medium", order: 1 },
  low: { label: "Low", order: 2 },
};

/**
 * Seed data. This is what a first-time visitor sees; once they touch
 * anything, their own list is persisted to localStorage instead.
 *
 * `createdAt` is stored as a fixed offset in hours rather than a real
 * date so the server and the client render the same markup — a
 * `new Date()` here would produce a hydration mismatch.
 */
export const initialTasks = [
  {
    id: "seed-1",
    title: "Set up the dev environment",
    done: true,
    priority: "high",
    category: "Engineering",
    hoursAgo: 132,
    completedHoursAgo: 128,
  },
  {
    id: "seed-2",
    title: "Sketch the design tokens — colour, type, spacing",
    done: true,
    priority: "medium",
    category: "Design",
    hoursAgo: 130,
    completedHoursAgo: 124,
  },
  {
    id: "seed-3",
    title: "Design the landing page in Figma",
    done: true,
    priority: "medium",
    category: "Design",
    hoursAgo: 118,
    completedHoursAgo: 100,
  },
  {
    id: "seed-4",
    title: "Build the navbar and footer",
    done: true,
    priority: "medium",
    category: "Engineering",
    hoursAgo: 110,
    completedHoursAgo: 98,
  },
  {
    id: "seed-5",
    title: "Build the landing page",
    done: true,
    priority: "high",
    category: "Engineering",
    hoursAgo: 96,
    completedHoursAgo: 52,
  },
  {
    id: "seed-6",
    title: "Add the light and dark themes",
    done: true,
    priority: "low",
    category: "Design",
    hoursAgo: 72,
    completedHoursAgo: 51,
  },
  {
    id: "seed-7",
    title: "Fix the mobile navigation panel",
    done: true,
    priority: "low",
    category: "Engineering",
    hoursAgo: 68,
    completedHoursAgo: 50,
  },
  {
    id: "seed-8",
    title: "Review pull requests from the intern team",
    done: true,
    priority: "medium",
    category: "Ops",
    hoursAgo: 40,
    completedHoursAgo: 28,
  },
  {
    id: "seed-9",
    title: "Write up the sprint notes",
    done: true,
    priority: "low",
    category: "Ops",
    hoursAgo: 30,
    completedHoursAgo: 5,
  },
  {
    id: "seed-10",
    title: "Wire the dashboard to real task state",
    done: false,
    priority: "high",
    category: "Engineering",
    hoursAgo: 20,
  },
  {
    id: "seed-11",
    title: "Connect the API to MongoDB",
    done: false,
    priority: "high",
    category: "Engineering",
    hoursAgo: 12,
  },
  {
    id: "seed-12",
    title: "Write the README so a new intern can start in 5 minutes",
    done: false,
    priority: "medium",
    category: "Ops",
    hoursAgo: 8,
  },
  {
    id: "seed-13",
    title: "Add keyboard shortcuts to the task list",
    done: false,
    priority: "low",
    category: "Engineering",
    hoursAgo: 6,
  },
  {
    id: "seed-14",
    title: "Call Mum",
    done: false,
    priority: "low",
    category: "Personal",
    hoursAgo: 2,
  },
];

const HOUR = 60 * 60 * 1000;

/** Turn the relative seed offsets into real ISO timestamps on the client. */
export function hydrateSeed(tasks = initialTasks) {
  const now = Date.now();
  return tasks.map(({ hoursAgo, completedHoursAgo, ...task }) => ({
    ...task,
    createdAt: new Date(now - (hoursAgo ?? 0) * HOUR).toISOString(),
    completedAt:
      completedHoursAgo != null
        ? new Date(now - completedHoursAgo * HOUR).toISOString()
        : null,
  }));
}
