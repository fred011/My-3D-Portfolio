import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  MessageSquare,
  Globe,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    else if (formData.subject.trim().length < 3) newErrors.subject = "Subject must be at least 3 characters";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 5) newErrors.message = "Message must be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, publicKey);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "fmmphahle01@gmail.com", href: "mailto:fmmphahle01@gmail.com", color: "from-cyan-500 to-blue-600" },
    { icon: Phone, label: "Phone", value: "+27 (0) 671 464 628", href: "tel:+27671464628", color: "from-purple-500 to-violet-600" },
    { icon: MapPin, label: "Location", value: "Limpopo, South Africa", href: "#", color: "from-green-500 to-emerald-600" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/FerdinandMorena", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ferdinand-morena/", label: "LinkedIn" },
    { icon: SiWhatsapp, href: "https://wa.me/27671464628", label: "WhatsApp" },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
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
              Let's Connect
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" variants={itemVariants}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto" variants={itemVariants}>
            Ready to work together? Let's discuss your project and create something amazing.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Contact Form */}
          <motion.div
            className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
            variants={itemVariants}
          >
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">Send a Message</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Let's Build Something
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Together</span>
              </h3>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-green-400 flex-1">Message sent successfully! I'll get back to you soon.</span>
                  <button onClick={() => setSubmitStatus(null)} className="text-green-400 hover:text-green-300">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <span className="text-red-400 flex-1">Failed to send message. Please try again or contact me directly.</span>
                  <button onClick={() => setSubmitStatus(null)} className="text-red-400 hover:text-red-300">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all ${errors.name ? "border-red-400" : "border-white/20"}`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="mt-2 text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all ${errors.email ? "border-red-400" : "border-white/20"}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-2 text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all ${errors.subject ? "border-red-400" : "border-white/20"}`}
                  placeholder="Project Discussion"
                />
                {errors.subject && <p className="mt-2 text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none ${errors.message ? "border-red-400" : "border-white/20"}`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="mt-2 text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center gap-4 hover:border-cyan-500/20 transition-colors duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-sm">{info.label}</p>
                    <p className="text-white font-medium text-sm sm:text-lg truncate">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Connect on Social
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Available for Work</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Open to Opportunities</h4>
              <p className="text-white/70">
                I'm currently seeking internships, entry-level positions, and freelance opportunities
                to grow my skills and contribute to exciting projects!
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-6 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Ferdinand Mphahle Morena. Built with React and ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
