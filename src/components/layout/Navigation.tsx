"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className={cn("bp-hairline", scrolled ? "opacity-100" : "opacity-0", "transition-opacity duration-300")} />
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-12">
          <a href="#hero" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-text">
            <span className="bp-tag text-blueprint">FM</span>
            <span className="hidden sm:inline">Ferdinand Morena</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "bp-tag transition-colors hover:text-text",
                    active === id ? "text-signal" : "text-mist-400",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden items-center gap-2 border border-ink-line px-4 py-2 bp-tag text-text transition-colors hover:border-blueprint hover:text-blueprint-soft md:inline-flex"
          >
            Start a project
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-ink-line text-text transition-colors hover:border-blueprint hover:text-blueprint-soft md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink md:hidden"
        >
          <div className="bp-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

          <div className="relative flex items-center justify-between border-b border-ink-line px-6 py-4">
            <span className="bp-tag text-blueprint-soft">Index</span>
            <span className="bp-tag text-mist-500">{String(sections.length).padStart(2, "0")} sections</span>
          </div>

          <ul className="relative flex flex-1 flex-col px-6">
            {sections.map(({ id, label }, i) => (
              <li
                key={id}
                className="bp-menu-item border-b border-ink-line"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between py-5 font-display text-3xl tracking-tight transition-colors hover:text-blueprint-soft",
                    active === id ? "text-signal" : "text-text",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="bp-tag text-blueprint-soft">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="-translate-x-1 text-mist-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div
            className="bp-menu-item relative border-t border-ink-line px-6 py-6"
            style={{ animationDelay: `${80 + sections.length * 60}ms` }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mb-5 flex items-center justify-center gap-2 border border-blueprint bg-blueprint px-6 py-4 bp-tag text-ink transition-colors hover:bg-blueprint-soft hover:border-blueprint-soft"
            >
              Start a project
            </a>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href="mailto:fmmphahle01@gmail.com"
                className="bp-tag text-mist-500 transition-colors hover:text-blueprint-soft"
              >
                fmmphahle01@gmail.com
              </a>
              <span className="bp-tag text-mist-500">Limpopo, South Africa</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
