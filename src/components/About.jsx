import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Globe,
  Sparkles,
  Star,
  Zap,
  Heart,
} from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        "Building robust APIs and server-side applications with Node.js and Express.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Designing efficient database schemas with MongoDB and MySQL.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from frontend to backend infrastructure.",
      color: "from-pink-500 to-rose-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.1, staggerChildren: 0.08 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <section
      id="about"
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
          <motion.div className="inline-flex items-center gap-2 mb-4" variants={itemVariants}>
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">
              Get To Know Me
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" variants={itemVariants}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <motion.div className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
              variants={itemVariants}
            >
              <Heart className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                Passionate Developer
              </span>
            </motion.div>

            <motion.h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" variants={itemVariants}>
              Building Digital Experiences with
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}Purpose
              </span>
            </motion.h3>

            <motion.p className="text-base sm:text-lg text-white/80 leading-relaxed" variants={itemVariants}>
              Hi, I'm{" "}
              <span className="text-cyan-400 font-semibold">Ferdinand Mphahle Morena</span>,
              a full-stack developer specializing in the MERN stack. With over 2 years of experience,
              I transform ideas into scalable, user-centric web applications.
            </motion.p>

            <motion.p className="text-base sm:text-lg text-white/80 leading-relaxed" variants={itemVariants}>
              My journey in tech is driven by curiosity and a commitment to excellence.
              I believe in writing clean, maintainable code and creating solutions that make a real impact.
            </motion.p>

            {/* Stats Cards */}
            <motion.div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8" variants={itemVariants}>
              {[
                { number: "2+", label: "Years Experience", icon: Zap },
                { number: "5+", label: "Projects Completed", icon: Star },
                { number: "100%", label: "Client Satisfaction", icon: Heart },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-colors duration-300"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                Let's Work Together →
              </button>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Rotating rings — CSS only */}
              <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 border-2 border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 border-2 border-pink-400/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />

              {/* Profile image */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-white/10 hover:border-cyan-400/40 transition-colors duration-500">
                <img
                  src="/piccc.jpg"
                  alt="Ferdinand Mphahle Morena"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-full animate-bounce" style={{ animationDuration: '3s' }}>
                MERN Stack
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                Full Stack
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Specialties Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-500/20 transition-colors duration-300"
              variants={cardVariants}
              custom={index}
            >
              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${specialty.color} flex items-center justify-center mb-4`}>
                <specialty.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {specialty.title}
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {specialty.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
