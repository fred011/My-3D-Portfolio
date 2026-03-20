import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "skills",
      "services",
      "experience",
      "projects",
      "contact",
    ];
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10"
            : "bg-transparent"
        }`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="flex items-center cursor-pointer group"
              variants={itemVariants}
            >
              <motion.img
                src="/logo.png"
                alt="FM Designs"
                className="h-18 sm:h-22 w-auto object-contain rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              variants={navVariants}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.a
                    key={`nav-desktop-${item.name}-${index}`}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`transition-all duration-300 flex items-center group relative px-3 py-2 rounded-lg ${
                      isActive
                        ? "text-cyan-400 bg-white/5"
                        : "text-white/80 hover:text-cyan-400 hover:bg-white/5"
                    }`}
                    variants={itemVariants}
                  >
                    <span className="text-sm lg:text-base font-medium">
                      {item.name}
                    </span>
                    <div
                      className={`absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-transform duration-300 origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Mobile Navigation Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 relative z-60"
              aria-label="Toggle navigation menu"
              variants={itemVariants}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={{
                    rotate: isOpen ? 180 : 0,
                    opacity: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: isOpen ? 0 : -180,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <X className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu - Full Screen Sidebar (Outside Navbar) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-l border-purple-500/30 shadow-2xl shadow-purple-500/20 z-[70] md:hidden flex flex-col"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Sidebar Header */}
              <div className="flex-shrink-0 border-b border-purple-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="FM Designs"
                    className="h-10 w-auto object-contain rounded-xl"
                  />
                  <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-cyan-400 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Navigation Items — scrollable area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`flex items-center gap-3 py-3 px-4 transition-all duration-300 rounded-xl group relative overflow-hidden ${
                        isActive
                          ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                          : "text-white/80 hover:text-cyan-400 hover:bg-white/5 border border-transparent"
                      }`}
                      variants={mobileItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 relative z-10" />
                      )}

                      {/* Text */}
                      <span className="relative z-10 font-medium text-base">
                        {item.name}
                      </span>

                      {/* Arrow indicator */}
                      <div
                        className={`ml-auto relative z-10 transition-opacity duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="w-2 h-2 border-t-2 border-r-2 border-cyan-400 rotate-45" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Sidebar Footer — always pinned at bottom */}
              <div className="flex-shrink-0 p-5 border-t border-purple-500/20 bg-slate-950/80">
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-3">
                    Let's build something amazing
                  </p>
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
