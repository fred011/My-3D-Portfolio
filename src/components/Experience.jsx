import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Code2,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const experiences = [
    {
      id: 1,
      title: "Web Developer Intern",
      company: "Erisn Africa",
      location: "Remote",
      duration: "2024 - Present",
      description:
        "Building modern web applications using MERN stack for various clients worldwide. Focusing on scalable solutions and exceptional user experiences.",
      achievements: [
        "Developed 5+ responsive web applications",
        "Improved client website performance by 40%",
        "Implemented secure authentication systems",
        "Integrated third-party APIs and payment gateways",
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Tailwind CSS",
        "TypeScript",
      ],
      color: "from-cyan-500 to-blue-600",
      dotColor: "bg-cyan-500",
      icon: Briefcase,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced animated background */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            y,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            variants={titleVariants}
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">
              Professional Journey
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={titleVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Central Timeline Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
            variants={timelineVariants}
            style={{ originY: 0 }}
          />

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex items-start mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              variants={cardVariants}
            >
              {/* Timeline Dot with Pulse */}
              <motion.div
                className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <motion.div
                  className={`w-6 h-6 ${exp.dotColor} rounded-full border-4 border-white shadow-lg`}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(6, 182, 212, 0.4)",
                      "0 0 0 20px rgba(6, 182, 212, 0)",
                      "0 0 0 0 rgba(6, 182, 212, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                {/* Icon in center of dot */}
                <motion.div
                  className={`absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-xl`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <exp.icon className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>

              {/* Content Card */}
              <motion.div
                className={`ml-20 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <motion.div
                  className="relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden group"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(6, 182, 212, 0.3)",
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {/* Card Header */}
                  <div
                    className={`mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}
                  >
                    <motion.div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white text-sm mb-3`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {exp.title}
                    </h3>

                    <p className="text-lg font-semibold text-purple-400 mb-1">
                      {exp.company}
                    </p>

                    <div
                      className={`flex items-center gap-2 text-white/60 text-sm ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-white/80 mb-6 leading-relaxed ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4
                      className={`text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className={`flex items-start gap-2 text-white/70 text-sm ${
                            index % 2 === 0
                              ? "md:flex-row-reverse md:text-right"
                              : ""
                          }`}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? 20 : -20,
                          }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <ArrowRight
                            className={`w-3 h-3 text-cyan-400 mt-1 flex-shrink-0 ${
                              index % 2 === 0 ? "rotate-180" : ""
                            }`}
                          />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 text-xs border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + i * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover Gradient Overlay */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                </motion.div>
              </motion.div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}

          {/* Timeline End Marker */}
          <motion.div
            className="absolute left-8 md:left-1/2 transform -translate-x-1/2 bottom-0"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="/Ferdinand_Morena_CV.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Award className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download Resume</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
