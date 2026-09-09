import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { TaskProvider } from "@/context/TaskContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata = {
  title: {
    default: "TaskFlow — stay on top of your work",
    template: "%s · TaskFlow",
  },
  description:
    "A calm, fast task manager built with Next.js and Tailwind CSS by the PACRA intern team.",
  openGraph: {
    title: "TaskFlow — stay on top of your work",
    description:
      "A calm, fast task manager built with Next.js and Tailwind CSS by the PACRA intern team.",
    type: "website",
  },
};

export const viewport = {
  // Exporting `viewport` replaces Next's default wholesale, so these two
  // have to be repeated — without them there is no
  // `width=device-width, initial-scale=1` meta tag and every phone renders
  // a zoomed-out ~500px desktop layout.
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080c" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
};

/* Runs before the browser paints, so someone who chose light mode never
   sees a dark flash. Kept as a raw string on purpose: React must not defer
   it, or the wrong theme lands on screen first.

   Dark is the deliberate default rather than a system-preference follow —
   the dark treatment *is* the design, and light is the opt-out. */
const themeInit = `
(function () {
  try {
    if (localStorage.getItem("taskflow-theme") === "light") {
      document.documentElement.classList.add("light");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />


        {/* Scroll-revealed sections start transparent. If JS never runs,
            show them rather than an empty page. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>

        <TaskProvider>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <Toaster />
        </TaskProvider>
      </body>
    </html>
  );
}
