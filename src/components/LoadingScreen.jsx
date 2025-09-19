import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const [isMounted, setIsMounted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = [
    "Initializing system",
    "Loading creative assets",
    "Preparing interface",
    "Optimizing experience",
    "Almost ready",
    "Welcome aboard",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.2;

        // Update message index based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * loadingMessages.length),
          loadingMessages.length - 1
        );

        if (messageIndex !== currentMessageIndex) {
          setCurrentMessageIndex(messageIndex);
          setLoadingText(loadingMessages[messageIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [isMounted, currentMessageIndex, loadingMessages]);

  if (!isMounted) return null;

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

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  const logoVariants = {
    hidden: {
      scale: 0,
      rotate: -90,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 12,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orb */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.05, 0.15, 0.08, 0.05],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary orb */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.2, 1, 0.8],
            opacity: [0.08, 0.2, 0.12, 0.08],
            x: [0, -25, 15, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Tertiary orb */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-400/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1.3, 1],
            opacity: [0.03, 0.12, 0.06, 0.03],
            rotate: [0, 120, 240, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center relative z-10 max-w-sm mx-auto px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <motion.div
            className="w-20 h-20 mx-auto mb-8 relative group cursor-pointer"
            variants={logoVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Main container */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/90 to-purple-600/90 rounded-2xl backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)",
                  "0 0 30px rgba(139, 92, 246, 0.4), 0 0 50px rgba(6, 182, 212, 0.3)",
                  "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Inner content */}
            <motion.div
              className="absolute inset-1 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-xl flex items-center justify-center backdrop-blur-sm"
              whileHover={{
                background:
                  "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))",
              }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {/* Central diamond */}
                <motion.div
                  className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rotate-45"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                      "0 0 10px rgba(6, 182, 212, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Orbiting dots */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: [8, 8, 8],
                      y: [-0.5, -0.5, -0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "linear",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-5xl font-thin text-white mb-3 tracking-wide"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              Ferdinand's
            </motion.h1>
            <motion.div className="flex items-center justify-center space-x-2 mb-1">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.p
                className="text-slate-300 text-sm uppercase tracking-[3px] font-light px-4"
                animate={{
                  color: [
                    "rgba(203, 213, 225, 0.7)",
                    "rgba(6, 182, 212, 0.8)",
                    "rgba(203, 213, 225, 0.7)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Portfolio
              </motion.p>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading Section */}
        <motion.div className="mb-10" variants={itemVariants}>
          {/* Spinner */}
          <motion.div className="flex items-center justify-center mb-6">
            <motion.div className="relative">
              {/* Outer ring */}
              <motion.div
                className="w-12 h-12 border-2 border-slate-700/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner active ring */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Center dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingText}
              className="text-slate-200 text-base font-light mb-8 min-h-[1.5rem]"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {loadingText}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Progress Section */}
        <motion.div className="w-full max-w-xs mx-auto" variants={itemVariants}>
          {/* Progress Bar */}
          <motion.div
            className="relative h-1.5 bg-slate-800/60 rounded-full overflow-hidden mb-4 backdrop-blur-sm"
            whileHover={{ scale: 1.02, height: "0.5rem" }}
            transition={{ duration: 0.2 }}
          >
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Progress fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />

              {/* Pulse effect */}
              <motion.div
                className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white/20 to-transparent rounded-r-full"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Progress Info */}
          <motion.div
            className="flex justify-between items-center text-xs"
            variants={itemVariants}
          >
            <motion.span
              className="text-slate-400 font-mono tabular-nums"
              animate={{
                color:
                  progress > 90
                    ? "rgba(6, 182, 212, 0.8)"
                    : "rgba(148, 163, 184, 0.7)",
              }}
            >
              {Math.round(progress)}%
            </motion.span>

            <motion.div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`progress-dot-${i}`}
                  className="w-1 h-1 bg-slate-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                    backgroundColor: [
                      "rgba(100, 116, 139, 0.7)",
                      "rgba(6, 182, 212, 0.8)",
                      "rgba(100, 116, 139, 0.7)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className="text-xs text-slate-500 mt-12 font-mono tracking-wider"
          variants={itemVariants}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Crafting digital experiences
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
