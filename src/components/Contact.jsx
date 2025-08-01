import { useState } from "react";
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

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS integration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "fmmphahle01@gmail.com",
      href: "mailto:fmmphahle01@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+27 (0) 671 464 628",
      href: "tel:+27671464628",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Limpopo, South Africa",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/fred011",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ferdinand-morena/",
      label: "LinkedIn",
    },
    {
      icon: SiWhatsapp,
      href: "https://wa.me/27671464628",
      label: "Whatsapp",
    },
  ];

  return (
    <section id="contact" className="py-10 md:py-16 px-2 sm:px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent transition-all duration-500"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #06b6d4, #a78bfa, #f472b6, #06b6d4)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Get In Touch
          </h2>
          <div className="w-16 xs:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-5 md:mb-8 rounded-full"></div>
          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>
          <p className="text-base xs:text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Ready to work together? Let's discuss your project and create
            something amazing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 xs:p-6 md:p-8 border border-white/10 w-full lg:w-1/2">
            <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-white mb-6">
              Send Me a Message
            </h3>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-green-400 text-sm md:text-base">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-red-400 text-sm md:text-base">
                    Failed to send message. Please try again or contact me
                    directly.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Name & Email Grid */}
              <div className="flex flex-col md:flex-row gap-5 mb-4">
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className="block text-white/80 mb-2 font-medium text-sm md:text-base"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm md:text-base ${
                      errors.name
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/50"
                        : "border-white/20 focus:border-cyan-400"
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-red-400 text-xs md:text-sm flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <label
                    htmlFor="email"
                    className="block text-white/80 mb-2 font-medium text-sm md:text-base"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm md:text-base ${
                      errors.email
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/50"
                        : "border-white/20 focus:border-cyan-400"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-400 text-xs md:text-sm flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Input */}
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-white/80 mb-2 font-medium text-sm md:text-base"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm md:text-base ${
                    errors.subject
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/50"
                      : "border-white/20 focus:border-cyan-400"
                  }`}
                  placeholder="Project Discussion"
                />
                {errors.subject && (
                  <p className="mt-2 text-red-400 text-xs md:text-sm flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-white/80 mb-2 font-medium text-sm md:text-base"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 resize-none text-sm md:text-base ${
                    errors.message
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/50"
                      : "border-white/20 focus:border-cyan-400"
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-2 text-red-400 text-xs md:text-sm flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col space-y-6 md:space-y-8">
            <div>
              <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                Let's Connect
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology and
                development. Feel free to reach out!
              </p>
            </div>

            {/* Responsive Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex gap-2 items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{info.label}</p>
                    <p className="text-white font-medium text-base break-all">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-6 md:pt-8">
              <h4 className="text-base xs:text-lg md:text-xl font-semibold text-white mb-4">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-2 space-x-0 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 xs:p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl md:rounded-2xl border border-white/10">
              <h4 className="text-base xs:text-lg font-semibold text-white mb-2">
                Open to Opportunities
              </h4>
              <p className="text-white/70 text-sm">
                I'm currently seeking internships, entry-level positions, and
                freelance or contract opportunities to grow my skills and
                contribute to exciting projects!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 text-center">
        <p className="text-white/60 text-xs xs:text-sm">
          © {new Date().getFullYear()} Ferdinand Mphahle Morena. Built with
          React, Three.js, and passion for code.
        </p>
      </div>
      {/* Extra responsive tweaks */}
      <style>
        {`
          @media (max-width: 1023px) {
            #contact .flex-col.lg\\:flex-row {
              flex-direction: column !important;
            }
          }
          @media (max-width: 640px) {
            #contact .w-12.h-12 {
              width: 2.5rem !important;
              height: 2.5rem !important;
            }
            #contact .text-3xl {
              font-size: 1.75rem !important;
            }
            #contact .md\\:text-2xl {
              font-size: 1.25rem !important;
            }
            #contact .md\\:text-lg {
              font-size: 1rem !important;
            }
            #contact .md\\:mb-6 {
              margin-bottom: 1rem !important;
            }
            #contact .md\\:mb-8 {
              margin-bottom: 1.5rem !important;
            }
            #contact .md\\:pt-8 {
              padding-top: 1.5rem !important;
            }
            #contact .md\\:rounded-2xl {
              border-radius: 1rem !important;
            }
          }
        `}
      </style>
    </section>
  );
}
