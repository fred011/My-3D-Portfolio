import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        "Next.js",
        "Wordpress",
        "Git and Github",
      ],
      color: "from-cyan-500 to-blue-600",
      dotColor: "bg-cyan-500",
      icon: Briefcase,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.1, staggerChildren: 0.1 },
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
      id="experience"
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
          className="text-center mb-16 md:mb-20"
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
              Professional Journey
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Timeline Line — desktop only */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8 }}
            style={{ originY: 0 }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative mb-12 last:mb-0"
              variants={itemVariants}
            >
              {/* Timeline Dot — desktop only */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-xl`}>
                  <exp.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Card — full width on mobile, offset on desktop */}
              <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
                <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:border-cyan-500/20 transition-colors duration-300">
                  {/* Mobile icon + duration row */}
                  <div className="flex items-center gap-3 mb-4 md:hidden">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <exp.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">{exp.title}</p>
                      <p className="text-purple-400 text-sm font-semibold">{exp.company}</p>
                    </div>
                  </div>

                  {/* Desktop header */}
                  <div className={`hidden md:block mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-semibold text-purple-400 mb-1">
                      {exp.company}
                    </p>
                  </div>

                  {/* Duration & Location */}
                  <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white text-xs sm:text-sm`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-white/80 text-sm sm:text-base mb-5 leading-relaxed ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-5">
                    <h4 className={`text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <CheckCircle className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-white/70 text-sm ${index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}
                        >
                          <ArrowRight className={`w-3 h-3 text-cyan-400 mt-1 flex-shrink-0 ${index % 2 === 0 ? "md:rotate-180" : ""}`} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/10 rounded-lg text-white/80 text-xs border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Timeline End — desktop only */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/Ferdinand_Morena_CV.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Award className="w-5 h-5" />
            <span>Download Resume</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
