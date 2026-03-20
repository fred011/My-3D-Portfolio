import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Globe,
  Smartphone,
  ShoppingCart,
  Gauge,
  PaintBucket,
  Code2,
  Server,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Website Development",
    description:
      "Fully responsive, hand-crafted websites built with modern frameworks like React, Next.js, and Tailwind CSS — tailored to your brand and goals.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    color: "#06b6d4",
  },
  {
    icon: Smartphone,
    title: "Responsive Web Apps",
    description:
      "Progressive web applications that deliver native-like experiences across all devices with offline support and blazing-fast performance.",
    tags: ["PWA", "Mobile-First", "Cross-Platform"],
    color: "#a78bfa",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Scalable online stores with secure payment integration, inventory management, and conversion-optimized checkout flows.",
    tags: ["Stripe", "Shopify", "Payment APIs"],
    color: "#f472b6",
  },
  {
    icon: PaintBucket,
    title: "UI/UX Design & Prototyping",
    description:
      "Pixel-perfect interfaces with intuitive user experiences, interactive prototypes, and design systems that scale with your product.",
    tags: ["Figma", "Design Systems", "Accessibility"],
    color: "#fbbf24",
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description:
      "Robust server-side solutions with RESTful APIs, database architecture, authentication, and real-time data handling.",
    tags: ["Node.js", "Express", "MongoDB"],
    color: "#34d399",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Speed audits, Core Web Vitals improvements, lazy loading, code splitting, and caching strategies to maximize your site's performance.",
    tags: ["Lighthouse", "SEO", "Core Web Vitals"],
    color: "#f97316",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.1, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.08,
      },
    }),
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167, 139, 250, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167, 139, 250, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="inline-flex items-center gap-2 mb-4" variants={itemVariants}>
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">
              What I Offer
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" variants={itemVariants}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Services
            </span>
          </motion.h2>

          <motion.p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg" variants={itemVariants}>
            From concept to deployment — I deliver end-to-end web development
            solutions that help businesses grow and stand out online.
          </motion.p>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-300"
                variants={cardVariants}
                custom={index}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}08, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full border"
                      style={{
                        color: service.color,
                        borderColor: `${service.color}30`,
                        backgroundColor: `${service.color}10`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Learn more link */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative z-10 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: service.color }}
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Corner decoration */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: service.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10"
            variants={itemVariants}
          >
            <Code2 className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Have a project in mind?
            </h3>
            <p className="text-white/60 max-w-md mx-auto mb-6">
              Let's collaborate and turn your vision into a high-quality,
              production-ready web experience.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
