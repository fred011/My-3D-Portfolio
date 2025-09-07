import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import { motion, useSpring } from "framer-motion";
import { TextureLoader } from "three";
import * as THREE from "three";
import EarthCanvas from "./Earth";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlanetHovered, setIsPlanetHovered] = useState(false);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      const newX = (e.clientX / window.innerWidth) * 2 - 1;
      const newY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMousePosition({ x: newX, y: newY });
      x.set(newX * 20); // Subtle parallax effect
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x]);

  // Responsive canvas height
  const [canvasHeight, setCanvasHeight] = useState(320);

  useEffect(() => {
    function updateCanvasHeight() {
      if (window.innerWidth < 400) setCanvasHeight(180);
      else if (window.innerWidth < 640) setCanvasHeight(220);
      else if (window.innerWidth < 768) setCanvasHeight(280);
      else if (window.innerWidth < 1024) setCanvasHeight(340);
      else setCanvasHeight(500);
    }
    updateCanvasHeight();
    window.addEventListener("resize", updateCanvasHeight);
    return () => window.removeEventListener("resize", updateCanvasHeight);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating background elements */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* Main container */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 min-h-screen flex items-center">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center 
                  text-center lg:text-left justify-items-center lg:justify-items-start w-full"
        >
          {/* Content Side */}
          <motion.div
            className="space-y-6 md:space-y-8 order-2 lg:order-1 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ x }}
          >
            <motion.h1
              className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-cyan-400"
              variants={itemVariants}
              animate={{
                opacity: [0.5, 1, 0.5],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              Hello, I'm
            </motion.h1>

            <motion.h2
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent leading-tight"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              variants={titleVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              Ferdinand
            </motion.h2>

            <motion.h3
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent leading-tight"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #a78bfa, #06b6d4, #f472b6, #a78bfa)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
              variants={titleVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              Mphahle Morena
            </motion.h3>

            <motion.p
              className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 font-medium"
              variants={itemVariants}
              whileHover={{ color: "rgba(255, 255, 255, 1)" }}
            >
              Web Developer
            </motion.p>

            <motion.div
              className="glass-card p-4 md:p-6 rounded-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p className="text-sm xs:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Passionate about building modern web applications using the MERN
                stack. Currently learning and growing as a software developer,
                with expertise in{" "}
                <motion.span className="text-green-400 font-semibold">
                  MongoDB
                </motion.span>
                ,{" "}
                <motion.span className="text-yellow-400 font-semibold">
                  Express
                </motion.span>
                ,{" "}
                <motion.span className="text-cyan-400 font-semibold">
                  React
                </motion.span>{" "}
                and{" "}
                <motion.span className="text-purple-400 font-semibold">
                  Node.js
                </motion.span>
                .
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-4 justify-center lg:justify-start"
              variants={containerVariants}
            >
              <motion.a
                href="#projects"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg text-center relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">View My Work</span>
              </motion.a>

              <motion.a
                href="#contact"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-cyan-400/50 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg text-center relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 3D Earth Canvas */}
          <motion.div
            className="w-full flex items-center  justify-center order-1  lg:order-2"
            style={{ minHeight: canvasHeight, height: canvasHeight }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.5,
              duration: 0.8,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className=" h-full max-w-md max-h-md mx-auto flex items-center justify-center">
                <EarthCanvas />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 xs:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
          transition: { duration: 2, repeat: Infinity },
        }}
      >
        <motion.div className="flex flex-col items-center space-y-2">
          <motion.div className="w-4 h-7 xs:w-5 xs:h-8 md:w-6 md:h-10 border-2 border-cyan-400/50 rounded-full flex justify-center relative overflow-hidden glass-card">
            <motion.div
              className="w-0.5 xs:w-1 h-2 xs:h-2.5 md:h-3 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1],
                transition: { duration: 1.5, repeat: Infinity },
              }}
            />
          </motion.div>
          <motion.span className="text-cyan-400/70 text-xs xs:text-sm md:text-base">
            Scroll to explore
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </motion.section>
  );
}
