import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import EarthCanvas from "./Earth";

function RotatingPlanet({ mousePosition, isHovered }) {
  const meshRef = useRef();
  const cloudsRef = useRef();

  // Load textures with error handling
  const planetTexture = useLoader(TextureLoader, "/textures/planet.png");
  const cloudsTexture = useLoader(TextureLoader, "/textures/clouds.png");

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += isHovered ? 0.02 : 0.01;

      // Mouse interaction
      meshRef.current.rotation.x = mousePosition.y * 0.2;
      meshRef.current.rotation.z = mousePosition.x * 0.1;

      // Floating animation
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y += isHovered ? 0.025 : 0.015;
      cloudsRef.current.rotation.x = mousePosition.y * 0.15;
      cloudsRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Planet */}
        <mesh ref={meshRef} scale={isHovered ? 1.8 : 1.6}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Clouds */}
        <mesh ref={cloudsRef} scale={isHovered ? 1.85 : 1.65}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={cloudsTexture}
            transparent
            opacity={0.4}
            roughness={0.9}
            metalness={0}
            alphaTest={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function PlanetFallback() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4338ca" roughness={0.8} metalness={0.2} />
      </mesh>
    </Float>
  );
}

function CosmicParticles() {
  const particlesRef = useRef();
  const particleCount = 500;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.8);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.6} />
    </points>
  );
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlanetHovered, setIsPlanetHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Responsive canvas height
  // Use a ref and effect to set canvas height based on window size
  const [canvasHeight, setCanvasHeight] = useState(320);

  useEffect(() => {
    function updateCanvasHeight() {
      if (window.innerWidth < 400) setCanvasHeight(180);
      else if (window.innerWidth < 640) setCanvasHeight(220);
      else if (window.innerWidth < 768) setCanvasHeight(280);
      else if (window.innerWidth < 1024) setCanvasHeight(340);
      else setCanvasHeight(500);
    }
    updateCanvasHeight();
    window.addEventListener("resize", updateCanvasHeight);
    return () => window.removeEventListener("resize", updateCanvasHeight);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 md:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-cyan-400 animate-pulse">
                Hello, I'm
              </h1>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Ferdinand
              </h2>
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                Mphahle Morena
              </h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 font-medium">
                Full Stack Developer
              </p>
              <p className="text-sm xs:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Passionate about building modern web applications using the MERN
                stack. Currently learning and growing as a software developer,
                with expertise in{" "}
                <span className="text-green-400 font-semibold">MongoDB</span>,{" "}
                <span className="text-yellow-400 font-semibold">Express</span>,{" "}
                <span className="text-cyan-400 font-semibold">React</span>, and{" "}
                <span className="text-purple-400 font-semibold">Node.js</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 text-center"
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-cyan-400/50 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div
            className="w-full flex items-center justify-center order-1 lg:order-2"
            style={{ minHeight: canvasHeight, height: canvasHeight }}
          >
            <EarthCanvas />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 xs:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-4 h-7 xs:w-5 xs:h-8 md:w-6 md:h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-0.5 xs:w-1 h-2 xs:h-2.5 md:h-3 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-cyan-400/70 text-xs xs:text-sm md:text-base">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
