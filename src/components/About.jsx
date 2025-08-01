import { useState, useRef } from "react";
import { Code2, Database, Server, Globe } from "lucide-react";

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const specialties = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Creating responsive and intuitive user interfaces with React and modern CSS frameworks.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Server,
      title: "Backend Development",
      description:
        "Building robust APIs and server-side applications with Node.js, Express, and RESTful services.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Designing efficient database schemas with MongoDB, MySQL, and implementing data optimization.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from frontend interfaces to backend infrastructure and deployment.",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <section
      id="about"
      className="py-10 md:py-16 px-2 sm:px-4 relative"
      ref={sectionRef}
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-24 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            About Me
          </h2>

          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-5 md:mb-8 rounded-full"></div>

          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-spin-slow {
                animation: spin 8s linear infinite;
              }
              .animate-spin-reverse {
                animation: spinReverse 10s linear infinite;
              }
              @keyframes spinReverse {
                0% { transform: rotate(360deg);}
                100% { transform: rotate(0deg);}
              }
            `}
          </style>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 md:mb-16">
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Passionate Full-Stack Developer
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              Hi, I'm{" "}
              <span className="text-cyan-400 font-semibold">
                Ferdinand Mphahle Morena
              </span>
              , a dedicated MERN stack developer with over 3 years of experience
              creating scalable web applications. I'm passionate about writing
              clean, maintainable code and delivering exceptional user
              experiences.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
              I believe in continuous learning and staying up-to-date with the
              latest technologies and best practices. When I'm not coding,
              you'll find me exploring new frameworks, contributing to
              open-source projects, or mentoring fellow developers.
            </p>

            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-3 sm:p-4 mt-2 md:p-6 rounded-xl md:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 mb-2 sm:mb-3">
                What I Do
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-white/80 text-xs sm:text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Build responsive web applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Design scalable backend architectures</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Optimize application performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto relative">
              <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-3 border-2 border-purple-400/30 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-6 border-2 border-pink-400/30 rounded-full animate-spin-slow"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/piccc.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-card-index={index}
              className={`relative p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm border border-cyan-500/20 transition-all duration-500 hover:scale-105 cursor-pointer group ${
                hoveredCard === index
                  ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-400/40"
                  : "bg-black/20"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${specialty.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2 sm:mb-3 md:mb-4`}
              >
                <specialty.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>

              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">
                {specialty.title}
              </h4>
              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
                {specialty.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
