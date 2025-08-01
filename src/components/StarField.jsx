import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = [];
    const numStars = 50;

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x:
          Math.random() *
          (typeof window !== "undefined" ? window.innerWidth : 1920),
        y:
          Math.random() *
          (typeof window !== "undefined" ? window.innerHeight : 1080),
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Twinkling effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();

        // Move star
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.radius;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Only run if we're in the browser
    if (typeof window !== "undefined") {
      resizeCanvas();
      animate();
      window.addEventListener("resize", resizeCanvas);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeCanvas);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
