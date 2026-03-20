import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingMessages = [
    "Initializing system",
    "Preparing interface",
    "Almost ready",
    "Welcome aboard",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2.5;
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * loadingMessages.length),
          loadingMessages.length - 1,
        );
        setLoadingText(loadingMessages[messageIndex]);

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center relative z-10 max-w-sm mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="mb-12">
          <motion.div
            className="w-20 h-20 mx-auto mb-8 relative"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              delay: 0.2,
            }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-lg animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/90 to-purple-600/90 rounded-2xl" />
            <div className="absolute inset-1 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rotate-45" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-thin text-white mb-3 tracking-wide">
            Ferdinand's
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1" />
            <p className="text-slate-400 text-sm uppercase tracking-[3px] font-light px-4">
              Portfolio
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1" />
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div
              className="w-12 h-12 border-2 border-slate-700/50 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"
              style={{
                animationDuration: "1.5s",
                animationDirection: "reverse",
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            className="text-slate-300 text-base font-light mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="relative h-1.5 bg-slate-800/60 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-10 font-mono tracking-wider opacity-60">
          Crafting digital experiences
        </p>
      </motion.div>
    </motion.div>
  );
}
