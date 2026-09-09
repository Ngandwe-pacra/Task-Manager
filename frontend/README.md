# TaskFlow

A small task manager built as a teaching project — real patterns, no framework soup.
Next.js App Router, React 19, Tailwind CSS v4. No runtime dependencies beyond those.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Pages

| Route        | What it does                                                          |
| ------------ | --------------------------------------------------------------------- |
| `/`          | Landing page. Server-rendered; only the scroll reveals are client-side. |
| `/tasks`     | The app. Add, rename, complete, delete, filter, search, sort, undo.    |
| `/dashboard` | Live stats over the same list — completion rate, weekly rhythm, breakdowns. |
| `/bright`    | About the maker.                                                      |

## Layout

```
src/
├── app/
│   ├── globals.css        design tokens, base layer, keyframes, composites
│   ├── layout.js          fonts, theme bootstrap, providers, chrome
│   └── */page.js          one file per route
├── components/            presentational; none of them own app state
├── context/TaskContext.js reads the store, derives the stats once
├── data/
│   ├── tasks.js           seed list + category/priority definitions
│   └── profile.js         every word on /bright
└── lib/
    ├── taskStore.js       the task store (plain JS, no React)
    └── utils.js           cn, timeAgo, percent, makeId
```

## Five decisions worth understanding

**1. Colour lives in exactly one place.** `globals.css` defines tokens (`--surface`,
`--fg`, `--accent`…) and Tailwind's `@theme inline` maps them to utilities, so
`bg-surface` re-themes itself when a `.light` class flips the variables. There are no
`dark:` prefixes anywhere in the app and no hex codes in any component.

**2. One store, two pages.** `/tasks` and `/dashboard` read the same
`lib/taskStore.js`. It's a plain module with `useSyncExternalStore`, not `useState`
plus an effect — the server has no `localStorage`, so the first client render has to
match the server's empty list and only then swap in real data. An external store says
that honestly: `getServerSnapshot` is what the server rendered, `getSnapshot` is the
truth on the client, and React reconciles the two.

**3. Destructive actions are undoable, not confirmed.** Deleting a task returns the
task *and its index*, so the toast can put it back exactly where it was. An undo beats
an "are you sure?" — it doesn't interrupt the 99% of the time you meant it.

**4. Animations name their properties and their easing.** Never `transition: all`;
never `ease-in` on a UI element; never entering from `scale(0)`. Exits are faster than
entrances, pressable things scale to `0.97`, and everything is switched off under
`prefers-reduced-motion`.

**5. Empty and loading states are designed, not afterthoughts.** Every list has a
skeleton, and three different empty states depending on *why* it's empty — no tasks at
all, nothing matching the search, or genuinely all done.

## Editing content

- Text on `/bright` → `src/data/profile.js`
- The starter task list → `src/data/tasks.js`
- Colours, spacing, easing → the token block at the top of `src/app/globals.css`

Images in `public/img/` are pre-rotated and compressed; `public/*.jpeg` are the
originals.
