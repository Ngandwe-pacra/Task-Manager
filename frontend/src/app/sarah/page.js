export default function SarahPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Introduction */}
      <section className="text-center mb-16">
        <p className="text-sm text-purple-300 uppercase tracking-widest mb-3">
          About Me
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Meet Sarah
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          ICT Graduate • Master of Engineering in ICT Security Student
        </p>
      </section>

      {/* About */}
      <section className="border border-white/10 rounded-2xl bg-white/5 p-8 shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          About Me
        </h2>

        <p className="text-gray-300 leading-7">
          Sarah is an ICT graduate currently pursuing a Master of Engineering
          in ICT Security. She is passionate about technology and is
          continuously developing her skills in programming, web development,
          cybersecurity, networking, Go, and Python.
        </p>
      </section>

      {/* Currently Exploring */}
      <section>
        <h2 className="text-2xl font-semibold text-white text-center mb-8">
          Currently Exploring
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Programming
            </h3>
            <p className="text-sm text-gray-400">
              Building my programming skills and learning how code works.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Web Development
            </h3>
            <p className="text-sm text-gray-400">
              Creating modern and functional websites.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Cybersecurity
            </h3>
            <p className="text-sm text-gray-400">
              Exploring ways to protect systems, networks, and information.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Networking
            </h3>
            <p className="text-sm text-gray-400">
              Learning how devices and systems communicate with each other.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Go
            </h3>
            <p className="text-sm text-gray-400">
              Learning Go and developing practical programming experience.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-200">
            <h3 className="font-semibold text-white mb-2">
              Python
            </h3>
            <p className="text-sm text-gray-400">
              Exploring Python for programming and practical projects.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}