import { Suspense, useEffect, useState } from "react";
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

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <StarField />
      <MouseTracker />

      {/* Main Content */}
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
