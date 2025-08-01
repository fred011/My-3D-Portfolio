import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Chat Application",
      description:
        "A real-time MERN stack chat application with user authentication message notifications, and online status. Built with Socket.io for instant communication and an intuitive UI for seamless chatting experience.",
      image: "/chat app.png?height=300&width=500&text=Chat+Application",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
      ],
      liveUrl: "https://chat-app-xh2t.onrender.com",
      githubUrl: "https://github.com/fred011/Chat-App",
      featured: true,
    },
    {
      id: 2,
      title: "Twitter Clone",
      description:
        "A full-stack Twitter clone built with the MERN stack, featuring user authentication, real-time tweets, likes, retweets, comments, profile management, and a dynamic newsfeed. Includes responsive UI and WebSocket-powered updates.",
      image: "/x.png?height=300&width=500&text=Twitter+Clone",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
      ],
      liveUrl: "https://twitter-clone-i8jj.onrender.com",
      githubUrl: "https://github.com/fred011/twitter-clone",
      featured: true,
    },
    {
      id: 3,
      title: "Weather App",
      description:
        "A responsive weather application built with vanilla JavaScript. Users can search for real-time weather conditions by city, with  detailed temperature, humidity, and wind data fetched from a weather API.",
      image: "/weather.png?height=300&width=500&text=Weather+App",
      technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
      liveUrl: "https://weather-app-six-phi-85.vercel.app/",
      githubUrl: "https://github.com/fred011/Weather-App",
      featured: false,
    },

    {
      id: 4,
      title: "MERN Product Cart",
      description:
        "A full-stack MERN e-commerce application featuring product listing, cart management, CRUD operations, and responsive UI. Users can add, edit, delete, and manage products in real-time with persistent storage and seamless user experience.",
      image: "/crud.png?height=300&width=500&text=Product+Cart+App",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      liveUrl: "https://mern-products-crud.onrender.com/",
      githubUrl: "https://github.com/fred011/mern-products-crud-",
      featured: false,
    },
  ];

  // Reusable action buttons for project cards
  const ProjectActionButtons = ({ liveUrl, githubUrl, showEye }) => (
    <div
      className={`
        absolute gap-2 inset-0 flex items-center justify-center space-x-4
        md:opacity-0 md:group-hover:opacity-100
        transition-opacity duration-300
      `}
    >
      {showEye && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <Eye className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      )}
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
      >
        <Github className="w-4 h-4 md:w-5 md:h-5" />
      </a>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
      >
        <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
      </a>
    </div>
  );

  return (
    <section id="projects" className="py-10 md:py-16 px-2 sm:px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Featured Projects
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-5 md:mb-8 rounded-full"></div>
          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in
            full-stack development, UI/UX design, and modern web technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-16">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay: always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Action buttons: always visible on mobile, hover on desktop */}
                  <ProjectActionButtons
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    showEye={true}
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-white/90 text-xs sm:text-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-28 sm:h-36 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay: always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Action buttons: always visible on mobile, hover on desktop */}
                  <ProjectActionButtons
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    showEye={false}
                  />
                </div>

                <div className="p-2 sm:p-3 md:p-4">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-6 md:mt-12">
          <a
            href="https://github.com/fred011?tab=repositories"
            className="inline-flex gap-1 items-center space-x-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
