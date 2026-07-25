"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
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
          onClick={() => setOpen((v) => !v)}
          className="text-text md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-ink px-6 py-10 md:hidden">
          <ul className="flex flex-col gap-6">
            {sections.map(({ id, label }) => (
              <li key={id} className="bp-hairline pb-6">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-text"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
