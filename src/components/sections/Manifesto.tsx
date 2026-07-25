"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const lines = lineRefs.current.filter(Boolean);
      gsap.set(lines, { opacity: 0, y: 24 });

      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bp-grid-paper relative bg-paper px-6 py-28 md:py-36">
      <div className="bp-hairline-paper absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-4xl text-center">
        <span className="bp-tag mb-8 block text-blueprint-dim">FIG. 01 — A WORKING PHILOSOPHY</span>
        <p className="font-display text-display-md font-medium leading-tight tracking-tight text-text-inverse">
          <span ref={(el) => { lineRefs.current[0] = el; }} className="block">
            Craft isn&apos;t a phase after the code works.
          </span>
          <span ref={(el) => { lineRefs.current[1] = el; }} className="block text-text-inverse-tertiary">
            It&apos;s the reason the code works.
          </span>
        </p>
      </div>
      <div className="bp-hairline-paper absolute inset-x-0 bottom-0" />
    </section>
  );
}
