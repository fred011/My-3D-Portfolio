import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code2, Database, Server, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const specialties = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Creating responsive and intuitive user interfaces with React and modern CSS frameworks.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Server,
      title: "Backend Development",
      description:
        "Building robust APIs and server-side applications with Node.js, Express, and RESTful services.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Designing efficient database schemas with MongoDB, MySQL, and implementing data optimization.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from frontend interfaces to backend infrastructure and deployment.",
      color: "from-pink-500 to-rose-600",
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.1,
        damping: 12,
      },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.4,
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="pt-20 pb-10 md:pt-25 md:pb-16 px-2 sm:px-4 relative"
      ref={sectionRef}
      style={{ opacity, position: "relative" }}
    >
      {/* Enhanced Cosmic background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y }}
      >
        <motion.div
          className="absolute top-10 left-4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-24 right-8 w-1 h-1 bg-purple-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-24 left-1/4 w-3 h-3 bg-pink-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About Me
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
                .animate-spin-slow {
                  animation: spin 8s linear infinite;
                }
                .animate-spin-reverse {
                  animation: spinReverse 10s linear infinite;
                }
                @keyframes spinReverse {
                  0% { transform: rotate(360deg);}
                  100% { transform: rotate(0deg);}
                }
              `}
            </style>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="space-y-5 sm:space-y-6"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={itemVariants}
            >
              Passionate Full-Stack Developer
            </motion.h3>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              Hi, I'm{" "}
              <motion.span
                className="text-cyan-400 font-semibold"
                whileHover={{ scale: 1.05, color: "#06b6d4" }}
              >
                Ferdinand Mphahle Morena
              </motion.span>
              , a dedicated MERN stack developer with over 3 years of experience
              creating scalable web applications. I'm passionate about writing
              clean, maintainable code and delivering exceptional user
              experiences.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              I believe in continuous learning and staying up-to-date with the
              latest technologies and best practices. When I'm not coding,
              you'll find me exploring new frameworks, contributing to
              open-source projects, or mentoring fellow developers.
            </motion.p>

            <motion.div
              className="glass-card p-3 sm:p-4 mt-2 md:p-6 rounded-xl md:rounded-2xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <motion.h4
                className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 mb-2 sm:mb-3"
                whileHover={{ color: "#06b6d4" }}
              >
                What I Do
              </motion.h4>
              <ul className="space-y-1 sm:space-y-2 text-white/80 text-xs sm:text-sm md:text-base">
                {[
                  "Build responsive web applications",
                  "Design scalable backend architectures",
                  "Optimize application performance",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5, color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full ${
                        index === 0
                          ? "bg-cyan-400"
                          : index === 1
                          ? "bg-purple-400"
                          : "bg-pink-400"
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 border-2 border-purple-400/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-6 border-2 border-pink-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-28 h-28 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
                  }}
                >
                  <img
                    src="/piccc.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm border border-cyan-500/20 cursor-pointer group glass-card"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${specialty.color} flex items-center justify-center mb-2 sm:mb-3 md:mb-4`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <specialty.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>

              <motion.h4
                className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                {specialty.title}
              </motion.h4>
              <motion.p
                className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed"
                whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {specialty.description}
              </motion.p>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl md:rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
