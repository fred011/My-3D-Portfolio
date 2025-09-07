import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  };

  const timelineItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      scale: 0.8
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.2,
        duration: 0.8
      }
    })
  };

  const experiences = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "Erisn Africa",
      location: "Johannesburg, South Africa",
      period: "2024 - Present",
      type: "Internship",
      description:
        "Currently gaining hands-on experience in full-stack development using the MERN stack. Working on real-world projects while learning industry best practices and modern development workflows.",
      achievements: [
        "Learning to build responsive web applications with React and Node.js",
        "Collaborating with senior developers on client projects",
        "Participating in code reviews and agile development processes",
        "Contributing to database design and API development",
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "Git",
      ],
      companyUrl: "https://erisnafrica.com/",
      current: true,
    },
    {
      id: 2,
      title: "Computer Science Student",
      company: "University of Limpopo",
      location: "Limpopo, South Africa",
      period: "2020 - 2023",
      type: "Education",
      description:
        "Pursuing Bachelor's degree in Computer Science with focus on software development, algorithms, and data structures. Maintaining strong academic performance while building practical programming skills.",
      achievements: [
        "Completed coursework in Data Structures and Algorithms",
        "Built multiple projects using various programming languages",
      ],
      technologies: ["Java", "Python", "C++", "SQL", "HTML", "CSS"],
      companyUrl: "https://www.ul.ac.za",
      current: false,
    },
  ];

  return (
    <motion.section
      id="experience"
      className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 relative"
      ref={sectionRef}
      style={{ opacity, position: "relative" }}
    >
      {/* Enhanced Background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y }}
      >
        <motion.div 
          className="absolute top-1/4 left-2 sm:left-4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-3/4 right-4 sm:right-10 w-1 h-1 bg-purple-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 sm:left-1/3 w-3 h-3 bg-pink-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8 sm:mb-10 md:mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Experience & Education
            </motion.h2>

            <motion.div 
              className="w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"
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
              className="text-sm sm:text-base md:text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              My journey in software development and the experiences that shaped my skills
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div 
            className="absolute left-3 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ originY: 0 }}
          />

          {/* Enhanced Timeline items */}
          <motion.div 
            className="space-y-8 sm:space-y-10 md:space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-stretch`}
                variants={timelineItemVariants}
                custom={index}
                onMouseEnter={() => setHoveredItem(exp.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Enhanced Timeline dot */}
                <motion.div 
                  className="absolute left-3 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-2 md:border-4 border-black z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {exp.current && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Enhanced Content card */}
                <div
                  className={`w-full md:w-5/12 mt-6 md:mt-0 ml-0 sm:ml-4 md:ml-0 pr-2 pl-2 sm:pr-4 sm:pl-4 md:pr-0 md:pl-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <motion.div
                    className="relative glass-card rounded-2xl p-3 sm:p-5 md:p-6 cursor-pointer"
                    whileHover={{ 
                      scale: 1.03,
                      y: -5,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    {/* Header */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                        <motion.h3 
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {exp.title}
                        </motion.h3>
                        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                          {exp.current && (
                            <motion.span 
                              className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium"
                              animate={{
                                opacity: [0.7, 1, 0.7],
                                transition: { duration: 2, repeat: Infinity }
                              }}
                            >
                              Current
                            </motion.span>
                          )}
                          <motion.span
                            className={`px-2 md:px-3 ml-2 py-1 rounded-full text-xs font-medium ${
                              exp.type === "Internship"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : exp.type === "Education"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {exp.type}
                          </motion.span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 space-x-2 mb-2">
                        {exp.type === "Education" && (
                          <motion.div
                            whileHover={{ rotate: 15 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <GraduationCap className="w-4 h-4 text-cyan-400" />
                          </motion.div>
                        )}
                        <motion.a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base md:text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 group"
                          whileHover={{ x: 5 }}
                        >
                          <span>{exp.company}</span>
                          {exp.companyUrl !== "#" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                            </motion.div>
                          )}
                        </motion.a>
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:space-x-4 text-white/60 text-xs sm:text-sm">
                        <motion.div 
                          className="flex items-center space-x-1 mb-1 gap-1 sm:mb-0"
                          whileHover={{ x: 3 }}
                        >
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.period}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-1"
                          whileHover={{ x: 3 }}
                        >
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.location}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-white/80 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base break-words"
                      style={{
                        wordBreak: "break-word",
                        paddingLeft: "0.25rem",
                        paddingRight: "0.25rem",
                      }}
                      whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {exp.description}
                    </motion.p>

                    {/* Achievements */}
                    <div className="mb-3 sm:mb-4">
                      <motion.h4 
                        className="text-white font-semibold mb-2 flex items-center space-x-2 text-xs sm:text-sm md:text-base"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                        </motion.div>
                        <span>
                          Key {exp.type === "Education" ? "Achievements" : "Responsibilities"}
                        </span>
                      </motion.h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="text-white/70 gap-2 text-xs md:text-sm flex items-start space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + idx * 0.1 + 1 }}
                            whileHover={{ x: 5, color: "rgba(255, 255, 255, 0.9)" }}
                          >
                            <motion.div 
                              className="w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: idx * 0.2 
                              }}
                            />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <motion.h4 
                        className="text-white font-semibold mb-2 text-xs md:text-sm"
                        whileHover={{ color: "#06b6d4" }}
                      >
                        Technologies {exp.type === "Education" ? "Learned" : "Used"}
                      </motion.h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-md text-white/90 text-xs border border-white/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 + techIndex * 0.05 + 1.2 }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(6, 182, 212, 0.3)"
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Call to action */}
        <motion.div 
          className="text-center mt-8 sm:mt-10 md:mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div 
            className="glass-card rounded-2xl p-4 sm:p-6 md:p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.h3 
              className="text-base sm:text-lg md:text-2xl font-bold text-white mb-3 sm:mb-4"
              whileHover={{ color: "#06b6d4" }}
            >
              Ready to Start My Career
            </motion.h3>
            <motion.p 
              className="text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base"
              whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
            >
              As a passionate software developer intern, I'm eager to contribute
              to innovative projects and continue learning from experienced professionals.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-2 border-cyan-400/50 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(6, 182, 212, 1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
