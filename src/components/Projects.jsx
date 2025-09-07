import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      id: 1,
      title: "Chat Application",
      description:
        "A real-time MERN stack chat application with user authentication message notifications, and online status. Built with Socket.io for instant communication and an intuitive UI for seamless chatting experience.",
      image: "/chat app.png?height=300&width=500&text=Chat+Application",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
      ],
      liveUrl: "https://chat-app-xh2t.onrender.com",
      githubUrl: "https://github.com/fred011/Chat-App",
      featured: true,
    },
    {
      id: 2,
      title: "Twitter Clone",
      description:
        "A full-stack Twitter clone built with the MERN stack, featuring user authentication, real-time tweets, likes, retweets, comments, profile management, and a dynamic newsfeed. Includes responsive UI and WebSocket-powered updates.",
      image: "/x.png?height=300&width=500&text=Twitter+Clone",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
      ],
      liveUrl: "https://twitter-clone-i8jj.onrender.com",
      githubUrl: "https://github.com/fred011/twitter-clone",
      featured: true,
    },
    {
      id: 3,
      title: "Weather App",
      description:
        "A responsive weather application built with vanilla JavaScript. Users can search for real-time weather conditions by city, with  detailed temperature, humidity, and wind data fetched from a weather API.",
      image: "/weather.png?height=300&width=500&text=Weather+App",
      technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
      liveUrl: "https://weather-app-six-phi-85.vercel.app/",
      githubUrl: "https://github.com/fred011/Weather-App",
      featured: false,
    },
    {
      id: 4,
      title: "MERN Product Cart",
      description:
        "A full-stack MERN e-commerce application featuring product listing, cart management, CRUD operations, and responsive UI. Users can add, edit, delete, and manage products in real-time with persistent storage and seamless user experience.",
      image: "/crud.png?height=300&width=500&text=Product+Cart+App",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      liveUrl: "https://mern-products-crud.onrender.com/",
      githubUrl: "https://github.com/fred011/mern-products-crud-",
      featured: false,
    },
  ];

  // Enhanced Animation variants (matching Contact component)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const projectCardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -15,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.1,
        duration: 0.8,
        damping: 12,
      },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Enhanced action buttons with animations
  const ProjectActionButtons = ({ liveUrl, githubUrl, showEye }) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center space-x-4"
      variants={overlayVariants}
      initial="hidden"
      whileHover="visible"
    >
      <AnimatePresence>
        {showEye && (
          <motion.a
            key="eye"
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-full text-white"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-5 h-5" />
          </motion.a>
        )}
        <motion.a
          key="github"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass-card rounded-full text-white"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          key="live"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass-card rounded-full text-white"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink className="w-5 h-5" />
        </motion.a>
      </AnimatePresence>
    </motion.div>
  );

  return (
    <motion.section
      id="projects"
      className="py-10 md:py-16 px-2 sm:px-4 relative"
      ref={sectionRef}
      style={{ opacity, position: "relative" }}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y }}
      >
        <motion.div
          className="absolute top-32 right-16 w-4 h-4 bg-cyan-400/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400/30 rounded-full"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink-400/25 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Featured Projects
            </motion.h2>

            <motion.div
              className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-5 md:mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <style>
              {`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Here are some of my recent projects that showcase my skills in
              full-stack development, UI/UX design, and modern web technologies.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Enhanced Featured Projects */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
                variants={projectCardVariants}
                custom={index}
                whileHover="hover"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                layout
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 md:h-64 object-cover"
                    variants={imageVariants}
                  />

                  {/* Enhanced overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Enhanced action buttons */}
                  <ProjectActionButtons
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    showEye={true}
                  />
                </div>

                <motion.div
                  className="p-3 sm:p-4 md:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-white/70 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base"
                    whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-white/90 text-xs sm:text-sm border border-white/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 + 0.5 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(6, 182, 212, 0.3)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
        </motion.div>

        {/* Enhanced Other Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects
            .filter((project) => !project.featured)
            .map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative glass-card rounded-xl overflow-hidden cursor-pointer"
                variants={projectCardVariants}
                custom={index + 2}
                whileHover="hover"
                layout
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-28 sm:h-36 md:h-48 object-cover"
                    variants={imageVariants}
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <ProjectActionButtons
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    showEye={false}
                  />
                </div>

                <motion.div
                  className="p-2 sm:p-3 md:p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h3
                    className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed"
                    whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {project.description}
                  </motion.p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 + 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span
                        className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        +{project.technologies.length - 3}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div
          className="text-center mt-6 md:mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/fred011?tab=repositories"
            className="inline-flex gap-2 items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base md:text-lg relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0"
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Github className="w-5 h-5" />
            </motion.div>
            <span className="relative z-10">View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
