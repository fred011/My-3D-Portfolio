"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useGSAP(
    () => {
      const el = magneticRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.25);
        yTo(relY * 0.4);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef },
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "That email doesn't look right.";
    if (message.length < 10) nextErrors.message = "A few more details would help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        { from_name: name, from_email: email, message },
        { publicKey },
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative bg-ink px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <span className="bp-tag mb-8 block text-blueprint-soft">FIG. 10 — LET&apos;S BUILD</span>

        <h2 className="max-w-4xl font-display text-display-lg font-semibold leading-[1.02] tracking-tight text-text md:text-display-xl">
          Let&apos;s build something worth shipping.
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
          I&apos;m currently open to full-stack roles and select freelance projects. If you&apos;ve got a
          product that needs both engineering rigor and design care, I&apos;d like to hear about it.
        </p>

        <a
          ref={magneticRef}
          href="mailto:fmmphahle01@gmail.com"
          className="group mt-16 inline-flex items-center gap-4 border-b-2 border-ink-line pb-3 transition-colors hover:border-blueprint md:mt-24"
        >
          <span className="font-display text-3xl font-medium text-text transition-colors group-hover:text-blueprint-soft sm:text-5xl md:text-6xl lg:text-7xl">
            fmmphahle01@gmail.com
          </span>
          <ArrowUpRight
            size={40}
            strokeWidth={1.5}
            className="hidden flex-shrink-0 text-mist-500 transition-colors group-hover:text-blueprint-soft sm:block"
          />
        </a>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <span className="bp-tag mb-6 block text-mist-500">Direct</span>
            <ul className="flex flex-col gap-4 text-lg text-text-secondary">
              <li>
                <a href="tel:+27671464628" className="transition-colors hover:text-blueprint-soft">
                  +27 (0) 671 464 628
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27671464628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blueprint-soft"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-text-tertiary">Limpopo, South Africa — Remote</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <span className="bp-tag block text-mist-500">Or write it down</span>

            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mist-500">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full border border-ink-line bg-transparent px-4 py-3 text-text outline-none transition-colors focus:border-blueprint"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-signal">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mist-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full border border-ink-line bg-transparent px-4 py-3 text-text outline-none transition-colors focus:border-blueprint"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-signal">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-widest text-mist-500">
                Project
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-none border border-ink-line bg-transparent px-4 py-3 text-text outline-none transition-colors focus:border-blueprint"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-signal">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-blueprint bg-blueprint px-6 py-3 bp-tag text-ink transition-colors hover:bg-blueprint-soft hover:border-blueprint-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" && <Loader2 size={14} className="animate-spin" />}
              {status === "submitting" ? "Sending" : "Send it over"}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-blueprint-soft" role="status">
                <CheckCircle2 size={16} /> Got it — I&apos;ll reply within a day or two.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-signal" role="alert">
                <AlertCircle size={16} /> Something went wrong — email me directly instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
