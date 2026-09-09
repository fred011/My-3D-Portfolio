"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { experience } from "@/data/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const entryRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      entryRefs.current.forEach((entry) => {
        if (!entry) return;
        const items = entry.querySelectorAll("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bp-grid-paper relative bg-paper px-6 py-24 md:px-12 md:py-32"
    >
      <div className="bp-hairline-paper absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1600px]">
        <span className="bp-tag mb-6 block text-blueprint-dim">
          FIG. 09 — REVISION LOG
        </span>
        <h2 className="mb-16 max-w-3xl font-display text-display-lg font-semibold leading-[1.02] tracking-tight text-text-inverse md:mb-24">
          A selection of roles and places that have shaped my work.
        </h2>

        <div className="border-t border-paper-line">
          {experience.map((entry, i) => (
            <div
              key={entry.rev}
              ref={(el) => {
                entryRefs.current[i] = el;
              }}
              className="grid gap-6 border-b border-paper-line py-12 md:grid-cols-[220px_1fr] md:gap-16 md:py-16"
            >
              <div data-reveal>
                <span className="bp-tag mb-3 block text-text-inverse-tertiary">
                  {entry.rev}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${entry.current ? "bg-signal" : "bg-mist-400"}`}
                  />
                  <span className="text-sm text-text-inverse-secondary">
                    {entry.current ? "Current" : "Completed"}
                  </span>
                </div>
                <p className="mt-4 font-mono text-sm text-text-inverse-tertiary">
                  {entry.duration}
                </p>
                <p className="mt-1 font-mono text-sm text-text-inverse-tertiary">
                  {entry.location}
                </p>
              </div>

              <div>
                <div data-reveal>
                  <h3 className="font-display text-2xl font-semibold text-text-inverse md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-lg text-blueprint-dim">
                    {entry.company}
                  </p>
                </div>

                <p
                  data-reveal
                  className="mt-6 max-w-2xl leading-relaxed text-text-inverse-secondary"
                >
                  {entry.description}
                </p>

                <ul className="mt-8 flex flex-col gap-3">
                  {entry.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      data-reveal
                      className="flex items-start gap-3 text-text-inverse-secondary"
                    >
                      <span className="mt-2.5 h-1 w-4 flex-shrink-0 bg-blueprint" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div data-reveal className="mt-8 flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-paper-line px-3 py-1.5 font-mono text-xs text-text-inverse-tertiary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
