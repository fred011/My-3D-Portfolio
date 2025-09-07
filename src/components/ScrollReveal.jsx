import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  distance = 30,
  className = "",
  once = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: direction === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;