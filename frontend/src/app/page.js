import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center px-8 py-24 gap-6">
      <h1 className="text-4xl font-bold">Stay on top of your tasks</h1>

      <p className="text-gray-600 max-w-md">
        TaskFlow is a simple way to track what you need to do, see what&apos;s
        done, and keep your team in sync.
      </p>

      <Button href="/tasks">Get Started</Button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl">
        
        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg hover:bg-white/10 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Simple</h3>
          <p className="text-sm text-gray-400">
            Add a task in seconds, no clutter.
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg hover:bg-white/10 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Organized</h3>
          <p className="text-sm text-gray-400">
            See everything in one clear list.
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-white/5 shadow-lg hover:bg-white/10 transition-all duration-200 hover:-translate-y-1">
          <h3 className="font-semibold mb-2">Trackable</h3>
          <p className="text-sm text-gray-400">
            Check your progress on the dashboard.
          </p>
        </div>

      </div>
    </div>
  );
}