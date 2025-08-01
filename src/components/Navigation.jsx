import { useState, useEffect } from "react";
import { Menu, X, Code, User, Briefcase, Mail, Rocket } from "lucide-react";

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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 group-hover:animate-spin transition-all duration-300" />
            <div
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 4s ease infinite",
              }}
            >
              Fred.dev
            </div>
            <style>
              {`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-white/80 hover:text-cyan-400 transition-all duration-300 gap-2 flex items-center space-x-2 group relative px-3 py-2 rounded-lg hover:bg-white/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-sm lg:text-base font-medium">
                  {item.name}
                </span>
                <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 relative z-60"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-xl rounded-xl mt-2 p-4 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className=" py-3 px-3 text-white/80 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3 rounded-lg group"
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `all 0.3s ease-out ${index * 50}ms`,
                }}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                <span className="font-medium">{item.name}</span>
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
