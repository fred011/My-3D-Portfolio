import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  cascade = false,
  className = "",
  once = true,
  amount = 0.3,
  scale = false,
  rotate = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  // Define animation variants based on direction
  const getVariants = () => {
    const baseHidden = {
      opacity: 0,
      ...(scale && { scale: 0.8 }),
      ...(rotate && { rotate: -10 }),
    };

    const baseVisible = {
      opacity: 1,
      ...(scale && { scale: 1 }),
      ...(rotate && { rotate: 0 }),
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseHidden, y: 50 },
          visible: { ...baseVisible, y: 0 },
        };
      case "down":
        return {
          hidden: { ...baseHidden, y: -50 },
          visible: { ...baseVisible, y: 0 },
        };
      case "left":
        return {
          hidden: { ...baseHidden, x: -50 },
          visible: { ...baseVisible, x: 0 },
        };
      case "right":
        return {
          hidden: { ...baseHidden, x: 50 },
          visible: { ...baseVisible, x: 0 },
        };
      case "fade":
        return {
          hidden: baseHidden,
          visible: baseVisible,
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      case "flip":
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 },
        };
      case "slide-rotate":
        return {
          hidden: { opacity: 0, x: -100, rotate: -45 },
          visible: { opacity: 1, x: 0, rotate: 0 },
        };
      default:
        return {
          hidden: baseHidden,
          visible: baseVisible,
        };
    }
  };

  const variants = getVariants();

  const transition = {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth animation
    ...(cascade && {
      staggerChildren: 0.1,
      delayChildren: delay,
    }),
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={transition}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

// Export additional animation utilities
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { opacity: 1, rotate: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default ScrollReveal;