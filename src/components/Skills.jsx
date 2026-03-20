import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skills = [
    // Frontend
    { name: "React", color: "#61DAFB", category: "Frontend", level: 95 },
    { name: "Next.js", color: "#000000", category: "Frontend", level: 85 },
    { name: "Tailwind CSS", color: "#06B6D4", category: "Frontend", level: 92 },
    { name: "HTML5", color: "#E34F26", category: "Frontend", level: 96 },
    { name: "CSS3", color: "#1572B6", category: "Frontend", level: 94 },
    { name: "Bootstrap", color: "#7952B3", category: "Frontend", level: 88 },
    { name: "Sass/SCSS", color: "#CC6699", category: "Frontend", level: 82 },
    { name: "Framer Motion", color: "#0055FF", category: "Frontend", level: 85 },
    { name: "Redux", color: "#764ABC", category: "Frontend", level: 78 },
    { name: "Responsive Design", color: "#38BDF8", category: "Frontend", level: 95 },
    // Backend
    { name: "Node.js", color: "#339933", category: "Backend", level: 90 },
    { name: "Express.js", color: "#68D391", category: "Backend", level: 88 },
    { name: "MongoDB", color: "#47A248", category: "Backend", level: 85 },
    { name: "MySQL", color: "#4479A1", category: "Backend", level: 78 },
    { name: "REST APIs", color: "#FF6C37", category: "Backend", level: 90 },
    { name: "JWT Auth", color: "#D63AFF", category: "Backend", level: 85 },
    { name: "Socket.io", color: "#010101", category: "Backend", level: 80 },
    { name: "Mongoose", color: "#880000", category: "Backend", level: 85 },
    { name: "PHP", color: "#777BB4", category: "Backend", level: 72 },
    { name: "WordPress", color: "#21759B", category: "Backend", level: 80 },
    // Languages
    { name: "JavaScript", color: "#F7DF1E", category: "Languages", level: 95 },
    { name: "TypeScript", color: "#3178C6", category: "Languages", level: 80 },
    { name: "Python", color: "#3776AB", category: "Languages", level: 75 },
    { name: "JSON", color: "#292929", category: "Languages", level: 92 },
    { name: "Markdown", color: "#083FA1", category: "Languages", level: 90 },
    // Tools & DevOps
    { name: "Git", color: "#F05032", category: "Tools", level: 90 },
    { name: "GitHub", color: "#181717", category: "Tools", level: 88 },
    { name: "VS Code", color: "#007ACC", category: "Tools", level: 95 },
    { name: "Vite", color: "#646CFF", category: "Tools", level: 88 },
    { name: "npm/yarn", color: "#CB3837", category: "Tools", level: 90 },
    { name: "Vercel", color: "#000000", category: "Tools", level: 85 },
    { name: "Render", color: "#46E3B7", category: "Tools", level: 82 },
    { name: "Postman", color: "#FF6C37", category: "Tools", level: 88 },
    { name: "Figma", color: "#F24E1E", category: "Tools", level: 75 },
    { name: "Chrome DevTools", color: "#4285F4", category: "Tools", level: 90 },
  ];

  const categories = {
    Frontend: skills.filter((s) => s.category === "Frontend"),
    Backend: skills.filter((s) => s.category === "Backend"),
    Languages: skills.filter((s) => s.category === "Languages"),
    "Tools & DevOps": skills.filter((s) => s.category === "Tools"),
  };

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
      id="skills"
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
              Technical Expertise
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {Object.entries(categories).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-cyan-400">
                {category}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300 overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: skill.color,
                          boxShadow: `0 0 8px ${skill.color}40`,
                        }}
                      />
                      <span className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/10 rounded-full h-1 mt-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        }}
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                      />
                    </div>

                    <span className="absolute top-2 right-2 text-xs text-white/50 font-mono">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Currently Learning */}
          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            variants={itemVariants}
          >
            <h4 className="text-xl font-semibold text-white mb-4">
              Currently Learning
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                "GraphQL",
                "Docker",
                "Next.js App Router",
                "Jest & Testing",
                "Firebase",
                "AWS",
                "CI/CD Pipelines",
                "Prisma ORM",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium hover:bg-cyan-500/15 hover:border-cyan-500/40 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
