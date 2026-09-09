/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT ME
 * ─────────────────────────────────────────────────────────────
 * Everything on /bright is driven from this one file, so the page
 * itself stays pure layout. Change a string here and the page follows.
 *
 * Placeholders you probably want to replace before showing anyone:
 *   · github / linkedin  — currently guessed handles
 *   · email              — currently the shared service desk address
 */

export const profile = {
  name: "Bright Musongo",
  firstName: "Bright",
  role: "Software Developer",
  org: "PACRA",
  orgFull: "Patents and Companies Registration Agency",
  location: "Lusaka, Zambia",
  timezone: "CAT · UTC+2",

  email: "servicedesk@pacra.org.zm",
  github: "https://github.com/brightmusongo",
  linkedin: "https://www.linkedin.com/in/brightmusongo",

  available: true,
  availableLabel: "Open to collaborating",

  tagline: "I build the boring parts properly so the interesting parts can work.",

  intro: [
    "I’m a software developer at PACRA in Lusaka, where most of my week is spent somewhere between the systems people depend on and the interfaces they actually see. I like that gap. It’s where the real work lives.",
    "This task manager started as a teaching project for our intern team — a place to practise the fundamentals on something small enough to hold in your head and real enough to care about. Then I got carried away with the details, which is roughly how everything I build goes.",
    "Outside of an editor I’m usually reading, arguing about football, or on the phone to my mother, who is still the most persistent project manager I have ever worked with.",
  ],

  // Little numbers that say something. Keep them honest and few.
  quickFacts: [
    { label: "Based in", value: "Lusaka" },
    { label: "Works at", value: "PACRA" },
    { label: "Writes mostly", value: "JavaScript" },
    { label: "Coffee or tea", value: "Tea, strongly" },
  ],

  stack: [
    {
      group: "Building things",
      items: ["JavaScript", "React", "Next.js", "Tailwind CSS", "HTML & CSS"],
    },
    {
      group: "Behind the scenes",
      items: ["Node.js", "REST APIs", "MongoDB", "SQL", "Git & GitHub"],
    },
    {
      group: "Getting it shipped",
      items: ["Vercel", "Linux", "Postman", "Figma", "VS Code"],
    },
  ],

  // Deliberately no years — stages read better and never go stale.
  journey: [
    {
      stage: "Where it started",
      title: "Curiosity, and a slow laptop",
      body: "Broke a lot of things to find out how they worked. Learned more from the breaking than from any tutorial, which is still true.",
    },
    {
      stage: "Finding the craft",
      title: "From ‘it works’ to ‘it feels right’",
      body: "Discovered that the difference between software people tolerate and software people like is almost entirely in the details nobody asks for.",
    },
    {
      stage: "Today",
      title: "Software Developer at PACRA",
      body: "Working on internal systems and the interfaces around them, and mentoring the intern team as they find their own footing.",
    },
    {
      stage: "Next",
      title: "Deeper into the backend",
      body: "More time with databases, queues, and the unglamorous infrastructure that makes a product feel instant.",
    },
  ],

  principles: [
    {
      title: "Boring code, interesting product",
      body: "Clever code is a debt somebody else pays. I’d rather the surprise be in what the product does, not in how it’s written.",
    },
    {
      title: "The details are the product",
      body: "A focus ring, a loading state, an empty screen that explains itself — nobody praises these individually, and everybody feels them together.",
    },
    {
      title: "Ship it, then look again tomorrow",
      body: "You cannot see your own work clearly on the day you make it. Fresh eyes catch what pride hides.",
    },
    {
      title: "Explain it to the newest person",
      body: "If I can’t make an intern understand why a decision was made, I probably don’t understand it either.",
    },
  ],

  currently: [
    { label: "Learning", value: "Database design and query performance" },
    { label: "Building", value: "This, and a few internal tools at work" },
    { label: "Reading", value: "Anything on how good software gets made" },
    { label: "Mentoring", value: "The 2026 intern cohort" },
  ],

  // Shown on the landing page as well as /bright.
  quote:
    "Write the code as if the person maintaining it is the intern you’re about to hand it to. Often, it is.",

  mother: {
    photo: "/img/bright-mother.jpg",
    alt: "Bright’s mother, photographed at home in Lusaka",
    heading: "The first person who believed it would work",
    body: [
      "Every developer has an origin story, and mine is not a computer — it’s her. She backed a plan she couldn’t fully picture, asked how it was going every single week, and never once suggested I do something more sensible.",
      "She is the reason ‘Call Mum’ is a permanent item on my task list, and the only one I never mind seeing come back.",
    ],
    caption: "Mum · Lusaka",
  },

  // The interns are the audience for this branch, so speak to them directly.
  internNote: {
    heading: "If you’re an intern reading this",
    body: "You are going to be tempted to measure yourself against how fast other people seem to move. Don’t. Measure yourself against last month’s version of you.",
    points: [
      {
        title: "Read more code than you write",
        body: "Open this repo and follow one feature end to end. That single habit will outpace any course.",
      },
      {
        title: "Ask the question early",
        body: "Two hours stuck is learning. Two days stuck is a decision you made. Ask on the first day.",
      },
      {
        title: "Finish something small",
        body: "One tiny, polished, genuinely-done thing teaches you more than five half-built ambitious ones.",
      },
      {
        title: "Care about the last 10%",
        body: "Anyone can get a feature to ‘works on my machine’. The last 10% is the whole job.",
      },
    ],
  },
};
