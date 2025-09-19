import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

export default function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const velocityHistoryRef = useRef([]);

  // Smooth motion values for fluid animations
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const springX = useSpring(smoothX, { stiffness: 400, damping: 35 });
  const springY = useSpring(smoothY, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth velocity calculation
  const calculateVelocity = useCallback((currentPos, lastPos, deltaTime) => {
    const distance = Math.sqrt(
      Math.pow(currentPos.x - lastPos.x, 2) + Math.pow(currentPos.y - lastPos.y, 2)
    );
    const velocity = deltaTime > 0 ? (distance / deltaTime) * 16.67 : 0;
    
    velocityHistoryRef.current.push(velocity);
    if (velocityHistoryRef.current.length > 3) {
      velocityHistoryRef.current.shift();
    }
    
    return velocityHistoryRef.current.reduce((a, b) => a + b, 0) / velocityHistoryRef.current.length;
  }, []);

  // Detect interactive elements
  const detectInteractiveElement = useCallback((e) => {
    const element = e.target;
    const isInteractive = element.matches('button, a, input, textarea, select, [role="button"], [tabindex], .cursor-pointer');
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    let timeout;
    let lastTime = Date.now();

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsMoving(true);

      smoothX.set(newPosition.x);
      smoothY.set(newPosition.y);

      const velocity = calculateVelocity(newPosition, lastPositionRef.current, deltaTime);
      setCurrentVelocity(velocity);

      detectInteractiveElement(e);

      lastPositionRef.current = newPosition;
      lastTime = currentTime;

      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 150);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (timeout) clearTimeout(timeout);
    };
  }, [isMounted, calculateVelocity, detectInteractiveElement, smoothX, smoothY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Main cursor with dynamic glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Core cursor */}
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(6, 182, 212, 1), rgba(6, 182, 212, 0.6))' 
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.9), rgba(6, 182, 212, 0.4))',
            boxShadow: isHovering 
              ? '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)' 
              : '0 0 12px rgba(6, 182, 212, 0.6)',
          }}
          animate={{
            scale: isClicking ? 1.8 : isHovering ? 1.4 : 1,
            opacity: isMoving ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* Hover ring for interactive elements */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/50"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 4, opacity: 0.7 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </AnimatePresence>

        {/* Velocity-based outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(6, 182, 212, 0.1) 100%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: Math.max(2, Math.min(currentVelocity * 0.3 + 2, 6)),
            opacity: Math.min(currentVelocity * 0.1, 0.6),
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </motion.div>

      {/* Ambient field that follows cursor */}
      <motion.div
        className="fixed pointer-events-none z-25"
        animate={{
          x: mousePosition.x - 60,
          y: mousePosition.y - 60,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 30,
        }}
      >
        <motion.div 
          className="w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(6, 182, 212, 0.06) 0%, 
              rgba(168, 85, 247, 0.04) 50%, 
              transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: isMoving ? 1.5 : 1,
            opacity: isMoving ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>

      {/* Click ripple effects */}
      <AnimatePresence>
        {isClicking && (
          <>
            {/* Primary ripple */}
            <motion.div
              className="fixed pointer-events-none z-40"
              style={{
                x: mousePosition.x - 40,
                y: mousePosition.y - 40,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="w-20 h-20 rounded-full border-2 border-cyan-400/60"
                style={{
                  filter: 'blur(1px)',
                }}
              />
            </motion.div>

            {/* Secondary ripple */}
            <motion.div
              className="fixed pointer-events-none z-39"
              style={{
                x: mousePosition.x - 30,
                y: mousePosition.y - 30,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              <div
                className="w-15 h-15 rounded-full border border-purple-400/40"
                style={{
                  filter: 'blur(0.5px)',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Subtle movement indicator */}
      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
        }}
      >
        <motion.div 
          className="w-12 h-12 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              transparent 60%, 
              rgba(6, 182, 212, 0.1) 80%, 
              transparent 100%)`,
            filter: "blur(4px)",
          }}
          animate={{
            scale: isMoving ? 1.2 : 0.8,
            opacity: isMoving ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </>
  );
}
