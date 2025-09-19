import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

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

  const specialties = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Creating responsive and intuitive user interfaces with React and modern CSS frameworks.",
      color: "from-cyan-500 to-blue-600",
      shadowColor: "rgba(6, 182, 212, 0.5)",
      delay: 0,
    },
    {
      icon: Server,
      title: "Backend Development",
      description:
        "Building robust APIs and server-side applications with Node.js and Express.",
      color: "from-purple-500 to-violet-600",
      shadowColor: "rgba(168, 85, 247, 0.5)",
      delay: 0.1,
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Designing efficient database schemas with MongoDB and MySQL.",
      color: "from-green-500 to-emerald-600",
      shadowColor: "rgba(34, 197, 94, 0.5)",
      delay: 0.2,
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from frontend to backend infrastructure.",
      color: "from-pink-500 to-rose-600",
      shadowColor: "rgba(236, 72, 153, 0.5)",
      delay: 0.3,
    },
  ];

  // Enhanced animation variants
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.85,
      rotateY: -10,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
        duration: 0.8,
      },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const profileImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.4,
        duration: 1.2,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced animated background */}
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
              Get To Know Me
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={titleVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
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
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(6, 182, 212, 0.15)",
              }}
            >
              <Heart className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                Passionate Developer
              </span>
            </motion.div>

            <motion.h3
              className="text-3xl md:text-4xl font-bold text-white"
              variants={itemVariants}
            >
              Building Digital Experiences with
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Purpose
              </span>
            </motion.h3>

            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              Hi, I'm{" "}
              <span className="text-cyan-400 font-semibold">
                Ferdinand Mphahle Morena
              </span>
              , a full-stack developer specializing in the MERN stack. With over
              2 years of experience, I transform ideas into scalable,
              user-centric web applications.
            </motion.p>

            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              My journey in tech is driven by curiosity and a commitment to
              excellence. I believe in writing clean, maintainable code and
              creating solutions that make a real impact.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-8"
              variants={itemVariants}
            >
              {[
                { number: "2+", label: "Years Experience", icon: Zap },
                { number: "5+", label: "Projects Completed", icon: Star },
                { number: "100%", label: "Client Satisfaction", icon: Heart },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    borderColor: "rgba(6, 182, 212, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Work Together
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={profileImageVariants}
          >
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96"
              animate={floatingAnimation}
            >
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0 border-2 border-cyan-400/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-purple-400/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 border-2 border-pink-400/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile image container */}
              <motion.div
                className="absolute inset-12 rounded-full overflow-hidden border-4 border-white/10"
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(6, 182, 212, 0.5)",
                  boxShadow: "0 0 50px rgba(6, 182, 212, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/piccc.jpg"
                  alt="Ferdinand Mphahle Morena"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-full"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                MERN Stack
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold rounded-full"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                Full Stack
              </motion.div>
            </motion.div>
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
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer overflow-hidden"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0`}
                animate={{
                  opacity: hoveredCard === index ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <motion.div
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${specialty.color} flex items-center justify-center mb-4`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: `0 10px 30px ${specialty.shadowColor}`,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <specialty.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <motion.h4
                className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                {specialty.title}
              </motion.h4>
              <motion.p
                className="text-white/70 text-sm leading-relaxed"
                whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {specialty.description}
              </motion.p>

              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: hoveredCard === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating particles on hover */}
              {hoveredCard === index && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`hover-particle-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{
                        x: Math.random() * 100,
                        y: 100,
                        opacity: 0,
                      }}
                      animate={{
                        y: -20,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
