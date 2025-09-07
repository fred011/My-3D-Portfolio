import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { name: "React", color: "#61DAFB", category: "Frontend", level: 95 },
    { name: "Node.js", color: "#339933", category: "Backend", level: 90 },
    { name: "MongoDB", color: "#47A248", category: "Database", level: 85 },
    { name: "Express", color: "#68D391", category: "Backend", level: 88 },
    { name: "JavaScript", color: "#F7DF1E", category: "Language", level: 95 },
    { name: "TypeScript", color: "#3178C6", category: "Language", level: 80 },
    { name: "Tailwind", color: "#06B6D4", category: "Styling", level: 92 },
    { name: "Python", color: "#3776AB", category: "Language", level: 75 },
    { name: "Git", color: "#F05032", category: "Tools", level: 90 },
    { name: "Docker", color: "#2496ED", category: "DevOps", level: 70 },
    { name: "AWS", color: "#FF9900", category: "Cloud", level: 65 },
  ];

  const skillSpheres = [
    { text: "React", position: [0, 2, 0], color: "#61DAFB", size: 1.4 },
    { text: "Node.js", position: [-3, 0, 1], color: "#339933", size: 1.3 },
    { text: "MongoDB", position: [3, 0, -1], color: "#47A248", size: 1.2 },
    { text: "Express", position: [0, -2, 2], color: "#68D391", size: 1.1 },
    { text: "JS", position: [-2, 1, -2], color: "#F7DF1E", size: 1.0 },
  ];

  const categories = {
    Frontend: skills.filter(
      (skill) =>
        skill.category === "Frontend" ||
        skill.category === "Framework" ||
        skill.category === "Styling"
    ),
    Backend: skills.filter(
      (skill) => skill.category === "Backend" || skill.category === "Database"
    ),
    Languages: skills.filter((skill) => skill.category === "Language"),
    "Tools & DevOps": skills.filter(
      (skill) =>
        skill.category === "Tools" ||
        skill.category === "DevOps" ||
        skill.category === "Cloud"
    ),
  };

  // Enhanced Animation variants (matching Contact component)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -90
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.05,
        duration: 0.8,
        damping: 12
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  const canvasVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        damping: 12
      }
    }
  };

  const skillsListVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.4,
        damping: 12
      }
    }
  };

  return (
    <motion.section 
      id="skills" 
      className="py-10 md:py-16 px-2 sm:px-4 relative"
      ref={sectionRef}
      style={{ opacity, position: "relative" }}
    >
      {/* Floating background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-3 h-3 bg-cyan-400/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-2 h-2 bg-purple-400/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-4 h-4 bg-pink-400/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Skills & Technologies
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
              `}
            </style>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Technologies I work with to build modern web applications
            </motion.p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced 3D Skills Visualization */}
          <motion.div 
            className="w-full lg:w-1/2 flex-shrink-0 order-2 lg:order-1"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[32rem] glass-card p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
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
              
              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Skills Categories */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 md:space-y-8 order-1 lg:order-2"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center lg:text-left"
              variants={itemVariants}
            >
              Technical Expertise
            </motion.h3>

            <AnimatePresence>
              {Object.entries(categories).map(([category, categorySkills], categoryIndex) => (
                <motion.div 
                  key={category} 
                  className="space-y-2 md:space-y-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: categoryIndex * 0.2 + 0.5 }}
                >
                  <motion.h4 
                    className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 mb-2"
                    whileHover={{ x: 10, color: "#06b6d4" }}
                  >
                    {category}
                  </motion.h4>
                  
                  <motion.div 
                    className="grid grid-cols-1 gap-3"
                    variants={containerVariants}
                  >
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="group relative p-3 sm:p-4 glass-card cursor-pointer overflow-hidden"
                        variants={skillCardVariants}
                        custom={index}
                        whileHover="hover"
                        layout
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-4 h-4 rounded-full shadow-lg"
                              style={{
                                backgroundColor: skill.color,
                                boxShadow: `0 0 15px ${skill.color}60`,
                              }}
                              whileHover={{ 
                                scale: 1.3,
                                boxShadow: `0 0 25px ${skill.color}80`
                              }}
                            />
                            <motion.h5 
                              className="text-white font-medium text-sm md:text-base group-hover:text-cyan-400 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {skill.name}
                            </motion.h5>
                          </div>
                          <motion.span 
                            className="text-xs text-white/60 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        
                        {/* Skill Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                            }}
                            variants={progressBarVariants}
                            custom={skill.level}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                          />
                        </div>

                        {/* Hover effect overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Currently Learning Section */}
            <motion.div 
              className="mt-4 md:mt-8 p-4 sm:p-6 glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h4 
                className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 md:mb-4"
                whileHover={{ color: "#06b6d4" }}
              >
                Currently Learning
              </motion.h4>
              
              <motion.div 
                className="flex flex-wrap gap-2 md:gap-3"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {[
                  "GraphQL", "Redux Toolkit", "Socket.io", 
                  "Jest", "Firebase", "Vercel"
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-white/90 text-xs sm:text-sm border border-white/20 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(6, 182, 212, 0.2)",
                      borderColor: "rgba(6, 182, 212, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    custom={index}
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
