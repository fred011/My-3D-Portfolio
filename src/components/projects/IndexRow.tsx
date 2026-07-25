"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { IndexProject } from "@/types/project";

export function IndexRow({ project, number }: { project: IndexProject; number: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-ink-line py-6 md:grid-cols-[4rem_1fr_auto_auto]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-mono text-sm text-mist-600">{number}</span>

      <div>
        <h4 className="font-display text-xl font-medium text-text transition-colors group-hover:text-blueprint-soft md:text-2xl">
          {project.title}
        </h4>
        <p className="mt-1 hidden max-w-md text-sm leading-relaxed text-text-tertiary md:block">
          {project.description}
        </p>
      </div>

      <span className="hidden bp-tag text-mist-500 md:inline">{project.category}</span>

      <div className="flex items-center gap-3 justify-self-end">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code`}
            className="text-mist-500 transition-colors hover:text-blueprint-soft"
          >
            <Github size={16} strokeWidth={1.75} />
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
            className="text-mist-500 transition-colors hover:text-blueprint-soft"
          >
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        )}
      </div>

      <div
        className={`pointer-events-none absolute right-6 top-1/2 z-10 hidden w-40 -translate-y-1/2 overflow-hidden border border-ink-line bg-ink-raised shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 md:block ${
          hovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        }`}
        style={{ aspectRatio: "4/3" }}
      >
        <Image src={project.image} alt="" fill sizes="160px" className="object-cover object-top" />
      </div>
    </div>
  );
}
