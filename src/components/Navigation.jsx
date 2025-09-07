import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code,
  User,
  Briefcase,
  Mail,
  Rocket,
  Home,
} from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
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
      opacity: 0,
      maxHeight: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      maxHeight: "24rem",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
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
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer group"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 transition-all duration-300" />
            </motion.div>
            <motion.div
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
            >
              Fred.dev
            </motion.div>
            <style>
              {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
            </style>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            variants={navVariants}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={`nav-desktop-${item.name}-${index}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-white/80 hover:text-cyan-400 transition-all duration-300 gap-2 flex items-center space-x-2 group relative px-3 py-2 rounded-lg hover:bg-white/5"
                variants={itemVariants}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-sm lg:text-base font-medium">
                  {item.name}
                </span>
                <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
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
                animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Menu className="w-6 h-6" />
              </motion.div>
              <motion.div
                animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <X className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl rounded-xl mt-2 p-4 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="py-3 gap-2 px-3 text-white/80 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3 rounded-lg group"
                    variants={mobileItemVariants}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                    <span className="font-medium">{item.name}</span>
                    <div className="ml-auto w-2 h-2 bg-gradient-to-r from-cyan-400/60 to-purple-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
