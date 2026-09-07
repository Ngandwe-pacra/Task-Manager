import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center px-8 py-24 gap-6">
      <h1 className="text-4xl font-bold text-white">
        Stay on top of your tasks
      </h1>

      <p className="text-purple-200 max-w-md">
        TaskFlow is a simple way to track what you need to do, see what&apos;s
        done, and keep your team in sync.
      </p>

      <Button href="/tasks">Get Started</Button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl">
        <div className="border border-purple-400/20 rounded-2xl p-6 bg-purple-950/40 shadow-lg shadow-purple-950/20 hover:bg-purple-900/40 hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2 text-white">Simple</h3>
          <p className="text-sm text-purple-200">
            Add a task in seconds, no clutter.
          </p>
        </div>

        <div className="border border-purple-400/20 rounded-2xl p-6 bg-purple-950/40 shadow-lg shadow-purple-950/20 hover:bg-purple-900/40 hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2 text-white">Organized</h3>
          <p className="text-sm text-purple-200">
            See everything in one clear list.
          </p>
        </div>

        <div className="border border-purple-400/20 rounded-2xl p-6 bg-purple-950/40 shadow-lg shadow-purple-950/20 hover:bg-purple-900/40 hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2 text-white">Trackable</h3>
          <p className="text-sm text-purple-200">
            Check your progress on the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}