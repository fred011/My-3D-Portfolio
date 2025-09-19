import { useState, useEffect, useRef, Suspense } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useInView,
  useScroll,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";
import {
  Sparkles,
  ChevronDown,
  Code2,
  Zap,
  Star,
  Heart,
  Rocket,
} from "lucide-react";

// Earth Canvas Component

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Scroll-based animations matching About section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.8]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.95]
  );

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 20);
        mouseY.set(y * 20);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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

  // Animation variants matching About section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.08,
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced animated background matching About section */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          style={{ x: smoothMouseX, y: smoothMouseY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          style={{ x: smoothMouseX, y: smoothMouseY }}
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

      <div className="max-w-4xl mx-auto relative z-10 ">
        <div className="flex items-center justify-center min-h-screen">
          {/* Content Centered */}
          <motion.div
            className="space-y-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Animated Greeting Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(6, 182, 212, 0.15)",
              }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">
                Welcome to my portfolio website
              </span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>

            {/* Main Title */}
            <motion.div variants={titleVariants}>
              <motion.h1
                className="text-xl md:text-2xl text-white/80 mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Hello, I'm
              </motion.h1>

              <motion.h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
                style={{
                  background:
                    "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Ferdinand
              </motion.h2>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  background:
                    "linear-gradient(270deg, #a78bfa, #06b6d4, #f472b6, #a78bfa)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                Mphahle Morena
              </motion.h3>
            </motion.div>

            {/* Animated Role Text */}
            <motion.div
              className="flex items-center justify-center gap-3"
              variants={itemVariants}
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent items-center justify-center via-cyan-400 to-transparent flex-1 max-w-[100px]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  className="text-xl sm:text-2xl md:text-3xl text-white font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[textIndex]}
                </motion.p>
              </AnimatePresence>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-[100px]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
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
              <motion.button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-cyan-400/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-cyan-400/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 cursor-pointer"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <motion.div
            className="relative w-7 h-12 border-2 border-cyan-400/50 rounded-full flex justify-center backdrop-blur-sm"
            whileHover={{
              borderColor: "rgba(6, 182, 212, 0.8)",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
            }}
          >
            <motion.div
              className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
              animate={{
                y: [0, 15, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.span
            className="text-cyan-400/80 text-sm font-medium tracking-wide flex items-center gap-1"
            whileHover={{ color: "rgba(6, 182, 212, 1)" }}
          >
            Scroll to explore
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
