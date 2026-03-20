import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const roles = [
    "Web Developer",
    "MERN Stack Developer",
    "Problem Solver",
    "Creative Thinker",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-15 px-4 sm:px-6 lg:px-8 overflow-hidden"
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="space-y-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
              <span className="text-cyan-400 font-medium tracking-wider uppercase text-xs sm:text-sm">
                Welcome to my portfolio
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-lg sm:text-xl md:text-2xl text-white/80 mb-3 sm:mb-4">
                Hello, I'm
              </h1>

              <h2
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                Ferdinand
              </h2>

              <h3
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
              >
                Mphahle Morena
              </h3>
            </motion.div>

            {/* Animated Role Text */}
            <motion.div
              className="flex items-center justify-center gap-2 sm:gap-3"
              variants={itemVariants}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-[60px] sm:max-w-[100px]" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  className="text-xl sm:text-2xl md:text-3xl text-white font-medium"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {roles[textIndex]}
                </motion.p>
              </AnimatePresence>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-[100px]" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              Passionate about building modern web applications using the{" "}
              <span className="text-cyan-400 font-semibold">MERN stack</span>.
              Currently learning and growing as a software developer, with
              expertise in{" "}
              <span className="text-green-400 font-semibold">MongoDB</span>,{" "}
              <span className="text-yellow-400 font-semibold">Express</span>,{" "}
              <span className="text-cyan-400 font-semibold">React</span>, and{" "}
              <span className="text-purple-400 font-semibold">Node.js</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                View My Work →
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-cyan-400/30 text-white font-semibold rounded-xl hover:bg-cyan-400/10 transition-all hover:scale-105 active:scale-95"
              >
                Get In Touch
                <Sparkles className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div
          className="flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative w-7 h-12 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
              animate={{ y: [0, 15, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-cyan-400/80 text-sm font-medium tracking-wide flex items-center gap-1">
            Scroll to explore
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
