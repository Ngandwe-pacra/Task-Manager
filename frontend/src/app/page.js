
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Decorative background elements */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-20">
        {/* Small badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Organize. Track. Accomplish.
        </div>

        {/* Main heading */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-blue-950 sm:text-6xl">
          Stay on top of your{" "}
          <span className="text-blue-600">tasks.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          TaskFlow gives you a simple and powerful way to organize your work,
          track your progress, and keep everything moving in the right
          direction.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/tasks">Get Started</Button>

          <a
            href="/dashboard"
            className="rounded-xl border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            View Dashboard
          </a>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Simple */}
          <div className="group rounded-2xl border border-blue-100 bg-white/90 p-7 text-left shadow-lg shadow-blue-100/40 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-xl font-bold">01</span>
            </div>

            <h3 className="text-lg font-bold text-blue-950">
              Simple
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add a task in seconds and focus on getting things done without
              unnecessary clutter.
            </p>
          </div>

          {/* Organized */}
          <div className="group rounded-2xl border border-blue-100 bg-white/90 p-7 text-left shadow-lg shadow-blue-100/40 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-xl font-bold">02</span>
            </div>

            <h3 className="text-lg font-bold text-blue-950">
              Organized
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your tasks organized in one clear and easy-to-understand
              workspace.
            </p>
          </div>

          {/* Trackable */}
          <div className="group rounded-2xl border border-blue-100 bg-white/90 p-7 text-left shadow-lg shadow-blue-100/40 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-xl font-bold">03</span>
            </div>

            <h3 className="text-lg font-bold text-blue-950">
              Trackable
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Monitor your progress and see exactly how much you've
              accomplished.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
