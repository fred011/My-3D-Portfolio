"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const beats = [
  {
    index: "01",
    title: "Craft",
    body: "I don't consider a feature finished when it works. I consider it finished when the transition doesn't jank, the empty state isn't blank, and the error message doesn't blame the user.",
  },
  {
    index: "02",
    title: "Purpose",
    body: "Every project I've shipped — a bursary system, a resort's booking flow, a CV analyzer — solved something a real person was stuck on. I'd rather build one thing that matters than ten that don't.",
  },
  {
    index: "03",
    title: "Balance",
    body: "I don't hand design off to engineering, or engineering off to design. A slow interface is a design failure. An inaccessible one is an engineering failure. I own both.",
  },
  {
    index: "04",
    title: "Growth",
    body: "The stack I'm best at today isn't the one I started with, and it won't be the one I'm best at in five years. I'd rather stay a beginner at something than stop being curious.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      beatRefs.current.forEach((beat, i) => {
        if (!beat) return;
        const content = beat.querySelector("[data-beat-content]");
        gsap.set(content, { opacity: 0, y: 32 });

        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: beat,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play none none reverse",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef} className="relative bg-ink">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <div className="relative hidden md:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center px-10 lg:px-16">
            <span className="bp-tag mb-6 block text-blueprint-soft">
              FIG. {beats[active].index} — HOW I BUILD
            </span>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-ink-line">
              <Image
                src="/portrait.jpg"
                alt="Portrait of Ferdinand Mphahle Morena"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 border border-blueprint/20" />
            </div>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-mono text-4xl text-blueprint-soft">{beats[active].index}</span>
              <span className="bp-tag text-mist-500">/ 04</span>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-10 lg:px-16">
          <div className="border-b border-ink-line py-16 md:hidden">
            <span className="bp-tag mb-6 block text-blueprint-soft">FIG. 00 — HOW I BUILD</span>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink-line">
              <Image
                src="/portrait.jpg"
                alt="Portrait of Ferdinand Mphahle Morena"
                fill
                sizes="100vw"
                className="object-cover grayscale"
              />
            </div>
          </div>

          {beats.map((beat, i) => (
            <div
              key={beat.index}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center border-b border-ink-line py-16 last:border-b-0 md:min-h-screen"
            >
              <div data-beat-content>
                <span className="bp-tag mb-4 block text-mist-500">{beat.index}</span>
                <h3 className="mb-5 font-display text-display-sm font-semibold text-text">
                  {beat.title}
                </h3>
                <p className="max-w-xl text-lg leading-relaxed text-text-secondary">{beat.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
