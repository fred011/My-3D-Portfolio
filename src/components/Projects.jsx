import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Folder,
  Info,
  Users,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Silulo LMS",
    description:
      "A learning management system providing course creation, student enrollment, and progress tracking features for an educational institution.",
    image: "/silulo.png",
    technologies: ["WordPress", "Tutor LMS", "PHP", "MySQL", "CSS"],
    liveUrl: "https://silulocollege.erisngraduate.com/",
    githubUrl: "",
    category: "WordPress",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "SCDP",
    description:
      "A professional corporate website for SCDP, featuring a clean modern design, responsive layout, and informative sections to showcase the company's services and brand identity.",
    image: "/scdp.png",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://scdp.co.za/",
    githubUrl: "",
    category: "Frontend",
    color: "#06b6d4",
  },
  {
    id: 3,
    title: "Joe's Plumbing",
    description:
      "A professional service website for a plumbing business, featuring service listings, contact information, and a clean design that builds trust and drives customer inquiries.",
    image: "/joe.png",
    technologies: ["React", "CSS", "JavaScript", "Vercel"],
    liveUrl: "https://joe-s-plumbing.vercel.app/",
    githubUrl: "",
    category: "Frontend",
    color: "#fbbf24",
  },
  {
    id: 4,
    title: "GetThru",
    description:
      "A sleek and engaging frontend website for GetThru, designed to deliver a compelling user experience with modern UI patterns, smooth interactions, and a fully responsive layout.",
    image: "/gett.png",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://getthru.co.za/",
    githubUrl: "",
    category: "Frontend",
    color: "#34d399",
  },
  {
    id: 5,
    title: "TechnoRain",
    description:
      "A modern corporate website for TechnoRain, showcasing technology solutions and services with a professional design, intuitive navigation, and responsive layout across all devices.",
    image: "/techno.png",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://www.technorain.co.za/",
    githubUrl: "",
    category: "Frontend",
    color: "#a78bfa",
  },
  {
    id: 6,
    title: "Amantungwa",
    description:
      "A professional WordPress website for Amantungwa, featuring an elegant design that highlights the organization's mission, services, and community impact. Built with a user-friendly layout, responsive design, and easy content management.",
    image: "/aman.png",
    technologies: ["WordPress", "PHP", "MySQL", "CSS"],
    liveUrl: "https://amantungwa.co.za/",
    githubUrl: "",
    category: "WordPress",
    color: "#f97316",
  },
  {
    id: 7,
    title: "Coastal Beach Resort",
    description:
      "A modern and responsive web platform designed to showcase resort accommodations, services, and activities. Offers a smooth booking experience, stunning visuals, and an elegant interface that captures the serene beauty of coastal living.",
    image: "/cbr.png",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "https://www.coastalbeach.co.za/",
    githubUrl: "https://github.com/erisndev/Coastal-Beach-Resort",
    category: "Full Stack",
    color: "#06b6d4",
  },
  {
    id: 8,
    title: "KNM Bursary System",
    description:
      "A bursary management system featuring student applications, profile management, and a responsive dashboard interface for administrators.",
    image: "/knm.png",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "https://kn-m-bursary-management-system.vercel.app/",
    githubUrl: "https://github.com/erisndev/KnM-Bursary-Management-System",
    category: "Full Stack",
    color: "#34d399",
  },
  {
    id: 9,
    title: "Chat Application",
    description:
      "A real-time MERN stack chat application with user authentication, message notifications, and online status. Built with Socket.io for instant communication and an intuitive UI.",
    image: "/chat app.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT",
    ],
    liveUrl: "https://chat-app-xh2t.onrender.com",
    githubUrl: "https://github.com/FerdinandMorena/Chat-App",
    category: "Full Stack",
    color: "#a78bfa",
  },
  {
    id: 10,
    title: "X Clone",
    description:
      "A full-stack X clone featuring user authentication, real-time tweets, likes, retweets, comments, profile management, and a dynamic newsfeed.",
    image: "/x.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT",
    ],
    liveUrl: "https://twitter-clone-i8jj.onrender.com",
    githubUrl: "https://github.com/FerdinandMorena/twitter-clone",
    category: "Full Stack",
    color: "#f472b6",
  },
  {
    id: 11,
    title: "MERN Product Cart",
    description:
      "A full-stack e-commerce application featuring product listing, cart management, CRUD operations, and a responsive UI.",
    image: "/crud.png",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "https://mern-products-crud.onrender.com/",
    githubUrl: "https://github.com/FerdinandMorena/mern-products-crud-",
    category: "Full Stack",
    color: "#fbbf24",
  },
  {
    id: 12,
    title: "Weather App",
    description:
      "A responsive weather application built with vanilla JavaScript. Users can search for real-time weather conditions by city using the OpenWeatherMap API.",
    image: "/weather app.png",
    technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    liveUrl: "https://weather-app-six-phi-85.vercel.app/",
    githubUrl: "https://github.com/FerdinandMorena/Weather-App",
    category: "Frontend",
    color: "#f97316",
  },
];

const categories = ["All", "Full Stack", "Frontend", "WordPress"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.1, staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">
              Portfolio Showcase
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-white/60 max-w-2xl mx-auto text-base md:text-lg mb-6"
            variants={itemVariants}
          >
            A curated collection of projects showcasing my expertise in
            full-stack development, UI design, and modern web technologies.
          </motion.p>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="flex justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="grid grid-cols-2 sm:flex sm:items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto"
            variants={itemVariants}
          >
            {categories.map((category) => {
              const isActive = activeFilter === category;
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                      : "text-white/60 hover:text-white/90 border border-transparent"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52 bg-gradient-to-br from-slate-800 to-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${project.image ? "hidden" : "flex"} absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center`}
                  >
                    <div className="text-center">
                      <Folder className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-500 text-sm">{project.title}</p>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full border"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}15`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
                        title="View Source Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
                      title="View Live Site"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-1.5 rounded-lg text-white/40 hover:text-cyan-400 hover:bg-white/5 transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/5 rounded-lg text-white/60 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LayoutGrid className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <a
            href="https://github.com/FerdinandMorena?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
