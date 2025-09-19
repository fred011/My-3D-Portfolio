import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

export default function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [waterTrail, setWaterTrail] = useState([]);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  
  const trailRef = useRef([]);
  const animationFrameRef = useRef();
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const velocityHistoryRef = useRef([]);

  // Smooth motion values for fluid animations
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const springX = useSpring(smoothX, { stiffness: 300, damping: 30 });
  const springY = useSpring(smoothY, { stiffness: 300, damping: 30 });

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

  // Detect interactive elements with subtle feedback
  const detectInteractiveElement = useCallback((e) => {
    const element = e.target;
    const isInteractive = element.matches('button, a, input, textarea, select, [role="button"], [tabindex], .cursor-pointer');
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    let timeout;
    let lastTime = Date.now();
    const maxTrailLength = 20;

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

      // Create water flow trail points
      if (deltaTime > 8) { // Higher frequency for smoother water flow
        const flow = Math.min(velocity / 8, 3);
        const turbulence = velocity > 2 ? Math.random() * 0.3 : 0;

        const newPoint = {
          x: newPosition.x + (Math.random() - 0.5) * turbulence * 10,
          y: newPosition.y + (Math.random() - 0.5) * turbulence * 10,
          id: currentTime + Math.random(),
          velocity,
          flow,
          timestamp: currentTime,
          life: 1,
        };

        trailRef.current = [newPoint, ...trailRef.current.slice(0, maxTrailLength - 1)];
        setWaterTrail([...trailRef.current]);

        lastPositionRef.current = newPosition;
        lastTime = currentTime;
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 150);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Water flow physics update
    const updateWaterFlow = () => {
      const now = Date.now();
      
      trailRef.current = trailRef.current
        .map(point => ({
          ...point,
          life: point.life - 0.015,
          y: point.y + point.velocity * 0.02, // Slight gravity effect
        }))
        .filter(point => point.life > 0 && now - point.timestamp < 1500);
      
      setWaterTrail([...trailRef.current]);
      
      if (trailRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(updateWaterFlow);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    animationFrameRef.current = requestAnimationFrame(updateWaterFlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (timeout) clearTimeout(timeout);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMounted, calculateVelocity, detectInteractiveElement, smoothX, smoothY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Main cursor - subtle and elegant */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.9), rgba(6, 182, 212, 0.4))' 
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 0.3))',
            boxShadow: isHovering 
              ? '0 0 15px rgba(6, 182, 212, 0.6)' 
              : '0 0 8px rgba(6, 182, 212, 0.4)',
          }}
          animate={{
            scale: isClicking ? 1.5 : isHovering ? 1.3 : 1,
            opacity: isMoving ? 1 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />

        {/* Subtle hover ring for interactive elements */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/40"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 3, opacity: 0.6 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </motion.div>

      {/* Water flow trail */}
      <AnimatePresence>
        {waterTrail.map((point, index) => {
          const progress = index / Math.max(waterTrail.length - 1, 1);
          const size = Math.max(1, 20 - index * 0.8);
          const opacity = point.life * (0.6 - progress * 0.4);
          const flowIntensity = Math.min(point.flow, 2);
          
          return (
            <motion.div
              key={point.id}
              className="fixed pointer-events-none z-30"
              initial={{ 
                x: point.x - size/2, 
                y: point.y - size/2,
                scale: 0,
                opacity: 0,
              }}
              animate={{ 
                x: point.x - size/2, 
                y: point.y - size/2,
                scale: 1,
                opacity: opacity,
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              transition={{
                type: "spring",
                stiffness: 200 - index * 8,
                damping: 20 + index * 2,
                mass: 0.1 + index * 0.005,
              }}
            >
              {/* Water droplet effect */}
              <div
                className="rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(ellipse at 30% 30%, 
                    rgba(6, 182, 212, ${opacity * 0.8}) 0%, 
                    rgba(6, 182, 212, ${opacity * 0.6}) 30%, 
                    rgba(168, 85, 247, ${opacity * 0.4}) 60%, 
                    rgba(168, 85, 247, ${opacity * 0.2}) 100%)`,
                  filter: `blur(${Math.max(1, size * 0.15)}px)`,
                  transform: `scaleY(${1 + flowIntensity * 0.2})`,
                }}
              />
              
              {/* Water surface reflection */}
              <div
                className="absolute top-0 left-0 rounded-full"
                style={{
                  width: size * 0.6,
                  height: size * 0.6,
                  background: `radial-gradient(circle at 40% 30%, 
                    rgba(255, 255, 255, ${opacity * 0.3}) 0%, 
                    transparent 70%)`,
                  filter: 'blur(1px)',
                  transform: 'translate(20%, 20%)',
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Ambient water field - subtle background flow */}
      <motion.div
        className="fixed pointer-events-none z-20"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 25,
        }}
      >
        <motion.div 
          className="w-40 h-40 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(6, 182, 212, 0.08) 0%, 
              rgba(168, 85, 247, 0.06) 50%, 
              transparent 70%)`,
            filter: "blur(25px)",
          }}
          animate={{
            scale: isMoving ? 1.4 : 1,
            opacity: isMoving ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Water ripple effect on click */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-35"
            style={{
              x: mousePosition.x - 30,
              y: mousePosition.y - 30,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: 0.6 }}
            exit={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="w-15 h-15 rounded-full border-2 border-cyan-400/40"
              style={{
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secondary ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-34"
            style={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.4 }}
            exit={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="w-10 h-10 rounded-full border border-purple-400/30"
              style={{
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
