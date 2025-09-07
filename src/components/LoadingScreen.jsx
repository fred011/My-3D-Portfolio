import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const [isMounted, setIsMounted] = useState(false);

  const loadingMessages = [
    "Initializing",
    "Loading assets",
    "Preparing interface",
    "Finalizing details",
    "Welcome",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;

        // Update loading message based on progress
        if (newProgress >= 20 && newProgress < 40) {
          setLoadingText(loadingMessages[1]);
        } else if (newProgress >= 40 && newProgress < 60) {
          setLoadingText(loadingMessages[2]);
        } else if (newProgress >= 60 && newProgress < 80) {
          setLoadingText(loadingMessages[3]);
        } else if (newProgress >= 80) {
          setLoadingText(loadingMessages[4]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [isMounted]);

  if (!isMounted) return null;

  // Enhanced Animation variants
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

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <motion.div 
        className="text-center relative z-10 max-w-md mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Logo/Icon */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 relative"
            variants={logoVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.4)",
                  "0 0 20px rgba(6, 182, 212, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl font-light text-white mb-2"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Ferdinand's
          </motion.h1>
          <motion.p 
            className="text-slate-400 text-sm uppercase tracking-wider font-medium"
            variants={itemVariants}
            whileHover={{ color: "rgba(6, 182, 212, 0.8)" }}
          >
            Portfolio
          </motion.p>
        </motion.div>

        {/* Enhanced Loading indicator */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.div 
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div className="w-8 h-8 relative">
              <motion.div 
                className="absolute inset-0 border-2 border-slate-700 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-cyan-500 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p 
              key={loadingText}
              className="text-slate-300 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
            >
              {loadingText}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Progress bar */}
        <motion.div className="w-full max-w-xs mx-auto" variants={itemVariants}>
          <motion.div 
            className="h-1 bg-slate-700 rounded-full overflow-hidden mb-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-between items-center"
            variants={itemVariants}
          >
            <motion.span 
              className="text-xs text-slate-500 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.span>
            <motion.div 
              className="flex space-x-1"
              variants={containerVariants}
            >
              {[...Array(3)].map((_, i) => (
              <motion.div
              key={`loading-dot-${i}`}
              className="w-1 h-1 bg-slate-500 rounded-full"
              animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              }}
              transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3
              }}
              />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced loading text */}
        <motion.p 
          className="text-xs text-slate-600 mt-8 font-mono"
          variants={itemVariants}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ color: "rgba(148, 163, 184, 0.8)" }}
        >
          Loading experience...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
