"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Base "at rest" state — dimmed, desaturated, slightly zoomed.
      // Every element stays fully present here; scroll only refines it,
      // it never gates whether content is visible at all.
      gsap.set(scaleRef.current, { scale: 1.1, filter: "grayscale(0.3) brightness(0.85)" });
      gsap.set(scrimRef.current, { opacity: 0.3 });
      gsap.set(cornerRef.current, { opacity: 0 });
      gsap.set(headlineRef.current, { y: 24 });
      gsap.set(subRef.current, { y: 16, opacity: 0.6 });

      if (reducedMotion) {
        gsap.set(scaleRef.current, { scale: 1, filter: "grayscale(0) brightness(1)" });
        gsap.set(scrimRef.current, { opacity: 0.22 });
        gsap.set(cornerRef.current, { opacity: 1 });
        gsap.set(headlineRef.current, { y: 0 });
        gsap.set(subRef.current, { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(cornerRef.current, { opacity: 1, duration: 0.3 }, 0)
        .to(gridRef.current, { opacity: 0.08, duration: 1.2 }, 0)
        .to(
          scaleRef.current,
          { scale: 1, filter: "grayscale(0) brightness(1)", duration: 1.6, ease: "power2.out" },
          0,
        )
        .to(scrimRef.current, { opacity: 0.15, duration: 1.2, ease: "power2.out" }, 0.1)
        .to(headlineRef.current, { y: 0, duration: 1, ease: "power3.out" }, 0.1)
        .to(subRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.25)
        .to(parallaxRef.current, { yPercent: -10, duration: 2.4, ease: "none" }, 0)
        .to(scrimRef.current, { opacity: 0.55, duration: 0.6 }, 1.8)
        .to(cornerRef.current, { opacity: 0, duration: 0.4 }, 1.8);
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      <div ref={parallaxRef} className="absolute inset-0">
        <div ref={scaleRef} className="absolute inset-0">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10"
      />
      {/* Fixed, unanimated scrims — guarantee legible contrast for the nav and
          the headline block regardless of the mood scrim's animation. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink from-0% via-ink/85 via-45% to-transparent"
        aria-hidden="true"
      />
      <div ref={gridRef} className="bp-grid pointer-events-none absolute inset-0 opacity-0" />

      <div
        ref={cornerRef}
        className="pointer-events-none absolute inset-5 z-10 hidden md:inset-10 sm:block"
        aria-hidden="true"
      >
        <span className="bp-tag absolute left-0 top-0 text-blueprint-soft">FIG. 00 — THE STUDIO</span>
        <span className="bp-tag absolute right-0 top-0 text-blueprint-soft">LIMPOPO, SOUTH AFRICA</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-16 sm:px-8 md:px-12 md:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <span className="bp-tag mb-6 inline-block border border-blueprint/40 bg-ink/70 px-3 py-1.5 text-blueprint-soft backdrop-blur-sm">
            Software Engineer — Product Designer
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-lg font-semibold leading-[0.98] tracking-tight text-text text-balance"
          >
            I build products that feel inevitable.
          </h1>

          <div ref={subRef} className="mt-8 flex flex-col items-start gap-6">
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Ferdinand Mphahle Morena — a full-stack engineer who treats engineering, design,
              performance, and accessibility as one discipline, not four.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="border border-blueprint bg-blueprint px-6 py-3 bp-tag text-ink transition-colors hover:bg-blueprint-soft hover:border-blueprint-soft"
              >
                View the work
              </a>
              <a
                href="#contact"
                className="border border-text/30 px-6 py-3 bp-tag text-text transition-colors hover:border-blueprint hover:text-blueprint-soft"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 right-6 z-20 text-text/70 transition-colors hover:text-blueprint-soft md:bottom-10 md:right-12"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={20} strokeWidth={1.5} className="animate-bounce" />
      </a>
    </section>
  );
}
