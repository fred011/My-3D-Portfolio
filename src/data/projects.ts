import type { FlagshipProject, IndexProject } from "@/types/project";

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "cvlens",
    index: "01",
    title: "CVLens",
    tagline: "Turning a blank resume review into confident, actionable feedback.",
    overview:
      "A full-stack AI-powered CV analyzer. Users upload a resume and get instant, structured feedback on content, formatting, and ATS-readiness — no account, no wait.",
    process:
      "Built the feedback loop around Puter.js for in-browser AI inference, which meant the whole tool could ship as a fast static app with no dedicated backend. State for the upload → analyze → results flow is managed with Zustand to keep each step predictable.",
    challenge:
      "Resume parsing produces messy, inconsistent text — broken dates, orphaned bullets, table fragments — and generic AI feedback ('add more detail') isn't useful to someone trying to fix a real document.",
    solution:
      "Structured the analysis pipeline to isolate resume sections before scoring them, then rendered feedback section-by-section instead of one long response, so every note is tied to the exact part of the CV it's about.",
    outcomes: [
      "Ships as a fully static app — no backend, no server costs",
      "Section-by-section feedback instead of a wall of AI text",
      "Live and in active use",
    ],
    stack: ["React", "Tailwind CSS", "Zustand", "Puter.js"],
    category: "Full Stack",
    image: "/cvlens.png",
    links: {
      live: "https://cvlens-ai-cv-analyzer.vercel.app/",
      github: "https://github.com/FerdinandMorena/ai-cv-analyzer",
    },
    layout: "image-right",
  },
  {
    id: "chat-app",
    index: "02",
    title: "Chat Application",
    tagline: "Real-time conversation, built on sockets and trust.",
    overview:
      "A MERN real-time chat application with authentication, instant messaging, and live online-status — the kind of infrastructure that has to feel invisible when it works.",
    process:
      "Built the messaging layer on Socket.io from the start rather than retrofitting real-time onto a REST app, so presence and delivery state are first-class instead of bolted on.",
    challenge:
      "Auth state and socket identity have to agree, or messages route to a stale connection — especially across reconnects on flaky networks.",
    solution:
      "Tied socket authentication to the same JWT issued at login and re-established socket identity automatically on reconnect, so presence and delivery stay accurate through network drops.",
    outcomes: [
      "Live messaging with authenticated, persistent sessions",
      "Real-time presence tracked via Socket.io",
      "Deployed and reachable in production",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    category: "Full Stack",
    image: "/chat-app.png",
    links: {
      live: "https://chat-app-xh2t.onrender.com",
      github: "https://github.com/FerdinandMorena/Chat-App",
    },
    layout: "image-left",
  },
  {
    id: "knm-bursary",
    index: "03",
    title: "KNM Bursary System",
    tagline: "Turning a paper-based bursary process into a system administrators trust.",
    overview:
      "A bursary management system covering student applications, profile management, and a responsive admin dashboard for reviewers.",
    process:
      "Modeled the application lifecycle — submitted, under review, approved, declined — as explicit states rather than free-text status fields, so the dashboard could filter and report on it reliably.",
    challenge:
      "Non-technical reviewers needed to work through large volumes of applications without losing track of what had been actioned, on a system with no dedicated QA support.",
    solution:
      "Built a dashboard around clear status filtering and profile views, prioritizing the information a reviewer actually needs over decorative UI.",
    outcomes: [
      "End-to-end application lifecycle from submission to decision",
      "Dashboard built for non-technical reviewers",
      "Live in production",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    image: "/knm.png",
    links: {
      live: "https://kn-m-bursary-management-system.vercel.app/",
      github: "https://github.com/erisndev/KnM-Bursary-Management-System",
    },
    layout: "image-right",
  },
  {
    id: "coastal-beach-resort",
    index: "04",
    title: "Coastal Beach Resort",
    tagline: "A booking experience that carries the calm of the place it's selling.",
    overview:
      "A resort platform showcasing accommodations, services, and activities, with a full booking flow layered into an editorial-style marketing site.",
    process:
      "Treated imagery as the primary content — large, unhurried visuals with restrained UI chrome — since the product being sold is an experience, not a spec sheet.",
    challenge:
      "Booking flows are naturally form-heavy, which fights against the relaxed, editorial feel the site needed to sell.",
    solution:
      "Broke the booking flow into short, single-purpose steps and kept spacing, imagery, and motion consistent with the marketing pages, so the transactional part never feels like a separate, colder product.",
    outcomes: [
      "Full booking flow integrated into an editorial marketing site",
      "Fully responsive across accommodations, services, and booking",
      "Live in production",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    image: "/cbr.png",
    links: {
      live: "https://www.coastalbeach.co.za/",
      github: "https://github.com/erisndev/Coastal-Beach-Resort",
    },
    layout: "image-left",
  },
  {
    id: "silulo-lms",
    index: "05",
    title: "Silulo LMS",
    tagline: "Course delivery infrastructure for a real institution, not a demo.",
    overview:
      "A learning management system for an educational institution — course creation, student enrollment, and progress tracking, run by staff who aren't developers.",
    process:
      "Built on WordPress and Tutor LMS rather than a custom stack, because the institution needed to manage courses and content long after launch without engineering support.",
    challenge:
      "Balancing a flexible, non-technical content workflow against a design that didn't read as a stock WordPress theme.",
    solution:
      "Customized the theme and course templates at the PHP and CSS level so the institution keeps full editorial control without the site looking like generic WordPress.",
    outcomes: [
      "In production use by a real educational institution",
      "Course creation and tracking fully self-service for staff",
      "Live in production",
    ],
    stack: ["WordPress", "Tutor LMS", "PHP", "MySQL", "CSS"],
    category: "WordPress",
    image: "/silulo.png",
    links: {
      live: "https://silulocollege.erisngraduate.com/",
    },
    layout: "image-right",
  },
];

export const indexProjects: IndexProject[] = [
  {
    id: "x-clone",
    title: "X Clone",
    description:
      "A full-stack X (Twitter) clone with authentication, real-time posts, likes, retweets, comments, and a dynamic feed.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    category: "Full Stack",
    image: "/x.png",
    links: {
      live: "https://twitter-clone-i8jj.onrender.com",
      github: "https://github.com/FerdinandMorena/twitter-clone",
    },
  },
  {
    id: "mern-cart",
    title: "MERN Product Cart",
    description:
      "A full-stack e-commerce app with product listings, cart management, and full CRUD operations behind a responsive UI.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    category: "Full Stack",
    image: "/crud.png",
    links: {
      live: "https://mern-products-crud.onrender.com/",
      github: "https://github.com/FerdinandMorena/mern-products-crud-",
    },
  },
  {
    id: "scdp",
    title: "SCDP",
    description:
      "A corporate website with a clean, modern layout and responsive design that showcases services and brand identity.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    category: "Frontend",
    image: "/scdp.png",
    links: { live: "https://scdp.co.za/" },
  },
  {
    id: "joes-plumbing",
    title: "Joe's Plumbing",
    description:
      "A service-business website with clear listings and contact paths, built to earn trust and drive inquiries.",
    stack: ["React", "CSS", "JavaScript"],
    category: "Frontend",
    image: "/joe.png",
    links: { live: "https://joe-s-plumbing.vercel.app/" },
  },
  {
    id: "getthru",
    title: "GetThru",
    description:
      "A sleek frontend build focused on modern UI patterns, smooth interaction, and full responsiveness.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    category: "Frontend",
    image: "/gett.png",
    links: { live: "https://getthru.co.za/" },
  },
  {
    id: "technorain",
    title: "TechnoRain",
    description:
      "A corporate technology-services site with professional design and intuitive navigation across devices.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    category: "Frontend",
    image: "/techno.png",
    links: { live: "https://www.technorain.co.za/" },
  },
  {
    id: "amantungwa",
    title: "Amantungwa",
    description:
      "A WordPress site highlighting an organization's mission and community impact with easy, ongoing content management.",
    stack: ["WordPress", "PHP", "MySQL", "CSS"],
    category: "WordPress",
    image: "/aman.png",
    links: { live: "https://amantungwa.co.za/" },
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "A responsive vanilla-JS weather app with live city search against the OpenWeatherMap API.",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    category: "Frontend",
    image: "/weather-app.png",
    links: {
      live: "https://weather-app-six-phi-85.vercel.app/",
      github: "https://github.com/FerdinandMorena/Weather-App",
    },
  },
];
