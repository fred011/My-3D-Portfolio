import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Navigation from "./components/Navigation.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import StarField from "./components/StarField.jsx";
import MouseTracker from "./components/MouseTracker.jsx";
import Experience from "./components/Experience.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Simulate loading time for assets and components
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds to match your timer

    return () => clearTimeout(loadingTimer);
  }, []);

  // Show loading screen during initial load
  if (!isMounted || isLoading) {
    return <LoadingScreen />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div 
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative overflow-hidden"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {/* Background Effects */}
          <ErrorBoundary>
            <StarField />
            <MouseTracker />
          </ErrorBoundary>

          {/* Main Content */}
          <ErrorBoundary>
            <Navigation />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </motion.main>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}
