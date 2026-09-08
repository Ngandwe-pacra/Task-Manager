
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-950">
            About Me
          </h1>

          <p className="mt-3 text-gray-600">
            A little about my professional background and interests.
          </p>
        </div>

        {/* Professional Profile Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-blue-100 bg-white/90 p-8 shadow-lg shadow-blue-100/40 backdrop-blur">

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-blue-100 shadow-xl shadow-blue-200/50 ring-4 ring-blue-50">

                <Image
                  src="/images/profile.jpeg"
                  alt="Ng'andwe Chishimba"
                  fill
                  sizes="192px"
                  className="object-cover"
                />

              </div>
            </div>

            {/* Name and Profession */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-950">
                Ng&apos;andwe Chishimba
              </h2>

              <p className="mt-2 text-lg font-medium text-blue-700">
                Computer Science Graduate
              </p>
            </div>

            {/* Professional Summary */}
            <div className="mt-6 text-center">
              <p className="leading-7 text-gray-600">
                I am a Computer Science graduate with a strong interest in
                information technology, technical support, networking, and
                infrastructure. I enjoy solving technical problems, supporting
                users, and building practical technology solutions that make
                everyday work more efficient.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                My practical experience has allowed me to work with computer
                systems, networks, technical support, and software projects. I
                am particularly interested in continuing to develop my skills
                across IT infrastructure, networking, and software development.
              </p>
            </div>

          </div>
        </div>

        {/* Professional Areas */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="rounded-2xl border border-blue-100 bg-white/90 p-6 text-center shadow-lg shadow-blue-100/30 backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              💻
            </div>

            <h3 className="font-bold text-blue-950">
              IT Support
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Troubleshooting technical issues, supporting users, and
              maintaining computer systems.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white/90 p-6 text-center shadow-lg shadow-blue-100/30 backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              🌐
            </div>

            <h3 className="font-bold text-blue-950">
              Networking
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Developing practical knowledge in network configuration,
              troubleshooting, and infrastructure.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white/90 p-6 text-center shadow-lg shadow-blue-100/30 backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              🚀
            </div>

            <h3 className="font-bold text-blue-950">
              Technology
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Building software projects and continuously learning new
              technologies and technical skills.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
