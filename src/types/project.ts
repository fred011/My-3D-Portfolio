export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface FlagshipProject {
  id: string;
  index: string;
  title: string;
  tagline: string;
  overview: string;
  process: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  category: "Full Stack" | "Frontend" | "WordPress";
  image: string;
  links: ProjectLinks;
  layout: "image-left" | "image-right";
}

export interface IndexProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: "Full Stack" | "Frontend" | "WordPress";
  image: string;
  links: ProjectLinks;
}
