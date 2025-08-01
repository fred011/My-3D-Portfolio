import { useState } from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default function Experience() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "Erisn Africa",
      location: "Johannesburg, South Africa",
      period: "2024 - Present",
      type: "Internship",
      description:
        "Currently gaining hands-on experience in full-stack development using the MERN stack. Working on real-world projects while learning industry best practices and modern development workflows.",
      achievements: [
        "Learning to build responsive web applications with React and Node.js",
        "Collaborating with senior developers on client projects",
        "Participating in code reviews and agile development processes",
        "Contributing to database design and API development",
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "Git",
      ],
      companyUrl: "https://erisnafrica.com/",
      current: true,
    },
    {
      id: 2,
      title: "Computer Science Student",
      company: "University of Limpopo",
      location: "Limpopo, South Africa",
      period: "2020 - 2023",
      type: "Education",
      description:
        "Pursuing Bachelor's degree in Computer Science with focus on software development, algorithms, and data structures. Maintaining strong academic performance while building practical programming skills.",
      achievements: [
        "Completed coursework in Data Structures and Algorithms",
        "Built multiple projects using various programming languages",
      ],
      technologies: ["Java", "Python", "C++", "SQL", "HTML", "CSS"],
      companyUrl: "https://www.ul.ac.za",
      current: false,
    },
  ];

  return (
    <section
      id="experience"
      className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-2 sm:left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-4 sm:right-10 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 sm:left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Experience and Education
          </h2>

          <div className="w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>

          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>

          <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-3xl mx-auto">
            My journey in software development and the experiences that shaped
            my skills
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"></div>

          {/* Timeline items */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-stretch`}
                onMouseEnter={() => setHoveredItem(exp.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Timeline dot */}
                <div className="absolute left-3 sm:left-6 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-2 md:border-4 border-black z-10">
                  {exp.current && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 mt-6 md:mt-0 ml-0 sm:ml-4 md:ml-0 pr-2 pl-2 sm:pr-4 sm:pl-4 md:pr-0 md:pl-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div
                    className={`relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-6 border border-white/10 transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
                      hoveredItem === exp.id
                        ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-400/40 shadow-2xl shadow-cyan-500/20"
                        : "hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Header */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                          {exp.current && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium animate-pulse">
                              Current
                            </span>
                          )}
                          <span
                            className={`px-2 md:px-3 ml-2 py-1 rounded-full text-xs font-medium ${
                              exp.type === "Internship"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : exp.type === "Education"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 space-x-2 mb-2">
                        {exp.type === "Education" ? (
                          <GraduationCap className="w-4 h-4 text-cyan-400" />
                        ) : null}
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base md:text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 group"
                        >
                          <span>{exp.company}</span>
                          {exp.companyUrl !== "#" && (
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </a>
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:space-x-4 text-white/60 text-xs sm:text-sm">
                        <div className="flex items-center space-x-1 mb-1 gap-1 sm:mb-0">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-white/80 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base break-words"
                      style={{
                        wordBreak: "break-word",
                        paddingLeft: "0.25rem",
                        paddingRight: "0.25rem",
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center space-x-2 text-xs sm:text-sm md:text-base">
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                        <span>
                          Key{" "}
                          {exp.type === "Education"
                            ? "Achievements"
                            : "Responsibilities"}
                        </span>
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-white/70 gap-2 text-xs md:text-sm flex items-start space-x-2"
                          >
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-xs md:text-sm">
                        Technologies{" "}
                        {exp.type === "Education" ? "Learned" : "Used"}
                      </h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-md text-white/90 text-xs border border-white/20 hover:scale-105 transition-transform duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    {hoveredItem === exp.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg sm:rounded-xl md:rounded-2xl animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-10 md:mt-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-cyan-500/20 backdrop-blur-sm">
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Ready to Start My Career
            </h3>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
              As a passionate software developer intern, I'm eager to contribute
              to innovative projects and continue learning from experienced
              professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#contact"
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
              >
                Get In Touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-2 border-cyan-400/50 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive fix for mobile: add horizontal padding */}
      <style>
        {`
          @media (max-width: 640px) {
            #experience .rounded-lg, 
            #experience .sm\\:rounded-xl, 
            #experience .md\\:rounded-2xl {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            #experience .p-3 {
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
            }
          }
        `}
      </style>
    </section>
  );
}
