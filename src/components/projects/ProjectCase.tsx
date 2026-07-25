"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { FlagshipProject } from "@/types/project";

export function ProjectCase({ project }: { project: FlagshipProject }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const imageFirst = project.layout === "image-left";

  useGSAP(
    () => {
      gsap.set(imageWrapRef.current, { clipPath: "inset(6% 6% 6% 6%)" });
      gsap.set(textRef.current?.children ?? [], { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(imageWrapRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
      }).to(
        textRef.current?.children ?? [],
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "<0.15",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="border-b border-ink-line py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className={cn(imageFirst ? "md:order-1" : "md:order-2")}>
            <div
              ref={imageWrapRef}
              className="relative aspect-[4/3] w-full overflow-hidden border border-ink-line bg-ink-raised"
            >
              <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-ink-line bg-ink-raised px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="h-1.5 w-1.5 rounded-full bg-blueprint-soft" />
                <span className="h-1.5 w-1.5 rounded-full bg-mist-500" />
              </div>
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top pt-8"
              />
            </div>
          </div>

          <div ref={textRef} className={cn(imageFirst ? "md:order-2" : "md:order-1")}>
            <span className="bp-tag mb-4 block text-blueprint-soft">
              FIG. {project.index} — {project.category.toUpperCase()}
            </span>

            <h3 className="mb-3 font-display text-display-sm font-semibold text-text md:text-display-md">
              {project.title}
            </h3>

            <p className="mb-8 text-lg leading-relaxed text-text-secondary">{project.tagline}</p>

            <p className="mb-8 leading-relaxed text-text-secondary">{project.overview}</p>

            <dl className="mb-8 grid gap-6 border-t border-ink-line pt-8 sm:grid-cols-1">
              <div>
                <dt className="bp-tag mb-2 text-mist-500">Process</dt>
                <dd className="leading-relaxed text-text-secondary">{project.process}</dd>
              </div>
              <div>
                <dt className="bp-tag mb-2 text-mist-500">Challenge</dt>
                <dd className="leading-relaxed text-text-secondary">{project.challenge}</dd>
              </div>
              <div>
                <dt className="bp-tag mb-2 text-mist-500">Solution</dt>
                <dd className="leading-relaxed text-text-secondary">{project.solution}</dd>
              </div>
            </dl>

            <ul className="mb-8 flex flex-col gap-2.5 border-t border-ink-line pt-8">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-text-secondary">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-signal" strokeWidth={1.75} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="border border-ink-line px-3 py-1.5 font-mono text-xs text-mist-400">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-blueprint bg-blueprint px-5 py-2.5 bp-tag text-ink transition-colors hover:bg-blueprint-soft hover:border-blueprint-soft"
                >
                  Live site
                  <ArrowUpRight size={14} strokeWidth={2} />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink-line px-5 py-2.5 bp-tag text-text transition-colors hover:border-blueprint hover:text-blueprint-soft"
                >
                  Source
                  <Github size={14} strokeWidth={1.75} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
