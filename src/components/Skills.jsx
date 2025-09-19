import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls, Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Sparkles, Code2, Database, Server, Globe } from "lucide-react";

function SkillSphere({ position, text, color, size = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? size * 1.15 : size}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.1}
        />
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax effects (from About section)
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95]);

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

  const skills = [
    { name: "React", color: "#61DAFB", category: "Frontend", level: 95 },
    { name: "Tailwind", color: "#06B6D4", category: "Frontend", level: 92 },
    { name: "HTML/CSS", color: "#E34F26", category: "Frontend", level: 96 },
    { name: "Node.js", color: "#339933", category: "Backend", level: 90 },
    { name: "Express", color: "#68D391", category: "Backend", level: 88 },
    { name: "MongoDB", color: "#47A248", category: "Backend", level: 85 },
    { name: "JavaScript", color: "#F7DF1E", category: "Languages", level: 95 },
    { name: "TypeScript", color: "#3178C6", category: "Languages", level: 80 },
    { name: "Python", color: "#3776AB", category: "Languages", level: 75 },
    { name: "Git", color: "#F05032", category: "Tools", level: 90 },
    { name: "GitHub", color: "#181717", category: "Tools", level: 88 },
    { name: "VS Code", color: "#007ACC", category: "Tools", level: 95 },
  ];

  const skillSpheres = [
    { text: "React", position: [0, 2, 0], color: "#61DAFB", size: 1.4 },
    { text: "Node.js", position: [-3, 0, 1], color: "#339933", size: 1.3 },
    { text: "MongoDB", position: [3, 0, -1], color: "#47A248", size: 1.2 },
    { text: "Express", position: [0, -2, 2], color: "#68D391", size: 1.1 },
    { text: "JS", position: [-2, 1, -2], color: "#F7DF1E", size: 1.0 },
  ];

  const categories = {
    Frontend: skills.filter((skill) => skill.category === "Frontend"),
    Backend: skills.filter((skill) => skill.category === "Backend"),
    Languages: skills.filter((skill) => skill.category === "Languages"),
    "Tools & DevOps": skills.filter((skill) => skill.category === "Tools"),
  };

  // Enhanced animation variants (from About section)
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
      filter: "blur(10px)"
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

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.section
      id="skills"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
      style={{ opacity, scale }}
    >
      {/* Enhanced animated background (from About section) */}
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
        {/* Section Header (from About section style) */}
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
              Technical Expertise
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={titleVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 3D Skills Visualization */}
          <motion.div
            className="w-full lg:w-1/2 flex-shrink-0"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            <motion.div
              className="relative w-full h-[400px] lg:h-[500px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Canvas
                camera={{ position: [0, 0, 10], fov: 70 }}
                gl={{ alpha: true }}
              >
                <ambientLight intensity={0.7} />
                <pointLight position={[12, 12, 12]} intensity={1.5} />
                <pointLight position={[-12, -12, -12]} intensity={1.0} />
                <directionalLight position={[0, 0, 7]} intensity={0.7} />

                {skillSpheres.map((skill, index) => (
                  <SkillSphere
                    key={index}
                    position={skill.position.map((v) => v * 1.2)}
                    text={skill.text}
                    color={skill.color}
                    size={skill.size * 1.2}
                  />
                ))}

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.3}
                  enablePan={false}
                />
              </Canvas>
            </motion.div>
          </motion.div>

          {/* Skills Categories */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            variants={containerVariants}
          >
            {Object.entries(categories).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                className="space-y-4"
                variants={itemVariants}
              >
                <motion.h3
                  className="text-xl md:text-2xl font-semibold text-cyan-400"
                  whileHover={{ x: 10, color: "#06b6d4" }}
                >
                  {category}
                </motion.h3>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  variants={containerVariants}
                >
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer overflow-hidden"
                      variants={cardVariants}
                      custom={index}
                      whileHover="hover"
                    >
                      {/* Skill content */}
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: skill.color,
                            boxShadow: `0 0 10px ${skill.color}60`,
                          }}
                          whileHover={{
                            scale: 1.2,
                            boxShadow: `0 0 20px ${skill.color}80`,
                          }}
                        />
                        <span className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
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
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        />
                      </div>

                      {/* Level indicator */}
                      <motion.span
                        className="absolute top-2 right-2 text-xs text-white/60 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {skill.level}%
                      </motion.span>

                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* Currently Learning Section */}
            <motion.div
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(6, 182, 212, 0.3)" }}
            >
              <motion.h4
                className="text-xl font-semibold text-white mb-4"
                whileHover={{ color: "#06b6d4" }}
              >
                Currently Learning
              </motion.h4>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
              >
                {["GraphQL", "Redux Toolkit", "Socket.io", "Jest", "Firebase", "AWS"].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium"
                    variants={cardVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(6, 182, 212, 0.15)",
                      borderColor: "rgba(6, 182, 212, 0.5)",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}