export interface SkillCluster {
  id: string;
  index: string;
  name: string;
  statement: string;
  detail: string;
  items: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: "interface",
    index: "01",
    name: "Interface",
    statement: "Interfaces that respond before the user notices they're waiting.",
    detail:
      "Component architecture, type-safe state, and motion that earns its keep — built to feel instant on real networks, not just on localhost.",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "engine",
    index: "02",
    name: "Engine",
    statement: "Data modeled correctly once, instead of patched forever.",
    detail:
      "APIs and schemas designed for the shape data actually takes — relational where relationships matter, document-based where flexibility does.",
    items: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB"],
  },
  {
    id: "infrastructure",
    index: "03",
    name: "Infrastructure",
    statement: "Shipped somewhere real, not just running on localhost.",
    detail:
      "Deployment, environment configuration, and the unglamorous work of keeping a product reachable and fast for actual users.",
    items: ["AWS"],
  },
  {
    id: "reach",
    index: "04",
    name: "Reach",
    statement: "The right stack for the client, not the same stack for everyone.",
    detail:
      "A full custom MERN build when the product needs one; WordPress when the client needs to own their content without an engineer on call.",
    items: ["MERN", "WordPress"],
  },
];
