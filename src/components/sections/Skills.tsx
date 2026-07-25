"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { skillClusters } from "@/data/skills";
import { cn } from "@/lib/utils";

function InterfaceViz() {
  return (
    <div className="relative h-56 w-full max-w-xs sm:h-64 sm:max-w-sm">
      <div className="absolute left-0 top-6 h-40 w-52 border border-ink-line bg-ink-raised sm:h-48 sm:w-64" />
      <div className="absolute left-8 top-0 h-40 w-52 border border-blueprint/50 bg-ink-raised sm:h-48 sm:w-64" />
      <div className="absolute left-16 top-10 flex h-40 w-52 flex-col gap-3 border border-blueprint bg-ink p-5 shadow-[0_20px_60px_-15px_rgba(61,90,251,0.35)] sm:h-48 sm:w-64">
        <span className="h-2 w-2/3 bg-blueprint-soft" />
        <span className="h-2 w-1/2 bg-mist-600" />
        <span className="mt-auto h-8 w-20 border border-signal" />
      </div>
    </div>
  );
}

function EngineViz() {
  const nodes = [
    { x: 20, y: 30 },
    { x: 90, y: 15 },
    { x: 150, y: 45 },
    { x: 60, y: 90 },
    { x: 140, y: 100 },
    { x: 200, y: 60 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 5],
    [4, 5],
    [1, 5],
  ];
  return (
    <svg viewBox="0 0 220 130" className="h-56 w-full max-w-xs sm:h-64 sm:max-w-sm" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-ink-line)"
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 2 === 0 ? 6 : 4}
          fill={i === 0 ? "var(--color-signal)" : i % 3 === 0 ? "var(--color-blueprint-soft)" : "var(--color-mist-600)"}
        />
      ))}
    </svg>
  );
}

function InfrastructureViz() {
  const bars = [90, 60, 100, 40, 75];
  return (
    <div className="flex h-56 w-full max-w-xs flex-col justify-center gap-2 sm:h-64 sm:max-w-sm">
      {bars.map((w, i) => (
        <div key={i} className="flex items-center gap-3 border border-ink-line bg-ink-raised px-3 py-2.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i === 1 ? "bg-signal" : "bg-blueprint-soft",
            )}
          />
          <span className="h-1.5 bg-ink-line" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  );
}

function ReachViz() {
  return (
    <div className="relative flex h-56 w-full max-w-xs items-center justify-center sm:h-64 sm:max-w-sm">
      <div className="absolute -translate-x-10 -rotate-6 border border-blueprint bg-ink-raised px-8 py-10">
        <span className="bp-tag text-blueprint-soft">MERN</span>
      </div>
      <div className="absolute translate-x-10 rotate-6 border border-paper-line bg-paper px-8 py-10">
        <span className="bp-tag text-text-inverse-secondary">WordPress</span>
      </div>
    </div>
  );
}

const visuals = [InterfaceViz, EngineViz, InfrastructureViz, ReachViz];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-skill-panel]", trackRef.current);
      const total = panels.length;
      const track = trackRef.current;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerWidth * (total - 1)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.min(total - 1, Math.round(self.progress * (total - 1))));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-x-6 top-6 z-10 flex items-center justify-between md:inset-x-12 md:top-10">
        <span className="bp-tag text-blueprint-soft">FIG. 05 — THE TOOLKIT</span>
        <div className="flex items-center gap-2">
          {skillClusters.map((cluster, i) => (
            <span
              key={cluster.id}
              className={cn(
                "h-[3px] w-8 transition-colors duration-300 md:w-12",
                i === active ? "bg-signal" : "bg-ink-line",
              )}
            />
          ))}
        </div>
      </div>

      <div ref={trackRef} className="flex h-full" style={{ width: `${skillClusters.length * 100}%` }}>
        {skillClusters.map((cluster, i) => {
          const Viz = visuals[i];
          const textFirst = i % 2 === 0;
          return (
            <div
              key={cluster.id}
              data-skill-panel
              className="flex h-full w-screen flex-shrink-0 items-center px-6 md:px-16 lg:px-24"
            >
              <div
                className={cn(
                  "grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16",
                )}
              >
                <div className={cn(textFirst ? "md:order-1" : "md:order-2")}>
                  <span className="bp-tag mb-4 block text-mist-500">{cluster.index} / 04</span>
                  <h3 className="mb-6 font-display text-display-sm font-semibold text-text md:text-display-md">
                    {cluster.name}
                  </h3>
                  <p className="mb-4 max-w-md text-xl font-medium leading-snug text-text">
                    {cluster.statement}
                  </p>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-text-secondary">
                    {cluster.detail}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cluster.items.map((item) => (
                      <span
                        key={item}
                        className="border border-ink-line px-3 py-1.5 font-mono text-xs text-mist-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={cn("flex justify-center", textFirst ? "md:order-2" : "md:order-1")}>
                  <Viz />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
