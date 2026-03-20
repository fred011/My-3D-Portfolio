import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Navigation from "./components/Navigation.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Services from "./components/Services.jsx";
import Experience from "./components/Experience.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          {(!isMounted || isLoading) ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div 
              key="main-content"
              className="min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ErrorBoundary>
                <Navigation />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Services />
                  <Experience />
                  <Projects />
                  <Contact />
                </main>
              </ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
