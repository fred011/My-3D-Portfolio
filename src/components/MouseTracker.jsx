import { useEffect, useState } from "react";

export default function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    let timeout;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      {/* Cosmic cursor trail */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transition: "all 0.1s ease-out",
        }}
      >
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 ${
            isMoving ? "scale-150 opacity-80" : "scale-100 opacity-40"
          } transition-all duration-300`}
        />
      </div>

      {/* Cosmic glow effect */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
          transition: "all 0.3s ease-out",
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-radial from-purple-500/20 via-cyan-500/10 to-transparent animate-pulse" />
      </div>
    </>
  );
}
