export interface ExperienceEntry {
  rev: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  current: boolean;
  description: string;
  achievements: string[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    rev: "REV 2024.1",
    title: "Web Developer Intern",
    company: "Erisn Africa",
    location: "Remote",
    duration: "2024 — Present",
    current: true,
    description:
      "Building full-stack web applications on the MERN stack for clients across multiple industries, from bursary administration systems to hospitality booking platforms.",
    achievements: [
      "Shipped multiple production applications end-to-end — design, build, and deploy",
      "Implemented secure authentication and session handling across several client systems",
      "Integrated third-party APIs and real-time features (Socket.io, payment and email providers)",
      "Delivered both custom MERN builds and WordPress sites depending on client needs",
    ],
    stack: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
      "WordPress",
      "Git",
    ],
  },
];
