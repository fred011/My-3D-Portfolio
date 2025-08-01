import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function SkillSphere({ position, text, color, size = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? size * 1.15 : size}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.1}
        />
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export default function Skills() {
  const skills = [
    { name: "React", color: "#61DAFB", category: "Frontend" },
    { name: "Node.js", color: "#339933", category: "Backend" },
    { name: "MongoDB", color: "#47A248", category: "Database" },
    { name: "Express", color: "#68D391", category: "Backend" },
    { name: "JavaScript", color: "#F7DF1E", category: "Language" },
    { name: "TypeScript", color: "#3178C6", category: "Language" },
    { name: "Tailwind", color: "#06B6D4", category: "Styling" },
    { name: "Python", color: "#3776AB", category: "Language" },
    { name: "Git", color: "#F05032", category: "Tools" },
    { name: "Docker", color: "#2496ED", category: "DevOps" },
    { name: "AWS", color: "#FF9900", category: "Cloud" },
  ];

  const skillSpheres = [
    { text: "React", position: [0, 2, 0], color: "#61DAFB", size: 1.4 },
    { text: "Node.js", position: [-3, 0, 1], color: "#339933", size: 1.3 },
    { text: "MongoDB", position: [3, 0, -1], color: "#47A248", size: 1.2 },
    { text: "Express", position: [0, -2, 2], color: "#68D391", size: 1.1 },
    { text: "JS", position: [-2, 1, -2], color: "#F7DF1E", size: 1.0 },
  ];

  const categories = {
    Frontend: skills.filter(
      (skill) =>
        skill.category === "Frontend" ||
        skill.category === "Framework" ||
        skill.category === "Styling"
    ),
    Backend: skills.filter(
      (skill) => skill.category === "Backend" || skill.category === "Database"
    ),
    Languages: skills.filter((skill) => skill.category === "Language"),
    "Tools & DevOps": skills.filter(
      (skill) =>
        skill.category === "Tools" ||
        skill.category === "DevOps" ||
        skill.category === "Cloud"
    ),
  };

  return (
    <section id="skills" className="py-10 md:py-16 px-2 sm:px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Skills and Technologies
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
            Technologies I work with to build modern web applications
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* 3D Skills Visualization */}
          <div className="w-full lg:w-1/2 flex-shrink-0 order-2 lg:order-1">
            <div className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[32rem]">
              <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[12, 12, 12]} intensity={1.5} />
                <pointLight position={[-12, -12, -12]} intensity={1.0} />
                <directionalLight position={[0, 0, 7]} intensity={0.7} />

                {skillSpheres.map((skill, index) => (
                  <SkillSphere
                    key={index}
                    position={skill.position.map((v) => v * 1.2)}
                    text={skill.text}
                    color={skill.color}
                    size={skill.size * 1.2}
                  />
                ))}

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.3}
                  enablePan={false}
                />
              </Canvas>
            </div>
          </div>

          {/* Skills Categories */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center lg:text-left">
              Technical Skills
            </h3>

            {Object.entries(categories).map(([category, categorySkills]) => (
              <div key={category} className="space-y-2 md:space-y-4">
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 mb-2">
                  {category}
                </h4>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={index}
                      className="group relative p-2 sm:p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full group-hover:scale-125 transition-transform duration-300 shadow-lg"
                          style={{
                            backgroundColor: skill.color,
                            boxShadow: `0 0 10px ${skill.color}40`,
                          }}
                        />
                        <h5 className="text-white font-medium text-xs sm:text-sm md:text-base group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </h5>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 md:mt-8 p-3 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">
                Currently Learning
              </h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  "GraphQL",
                  "Redux Toolkit",
                  "Socket.io",
                  "Jest",
                  "Firebase",
                  "Vercel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-white/90 text-xs sm:text-sm border border-white/20 hover:scale-105 transition-transform duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
