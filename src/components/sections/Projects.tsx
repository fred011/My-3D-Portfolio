import { flagshipProjects, indexProjects } from "@/data/projects";
import { ProjectCase } from "@/components/projects/ProjectCase";
import { IndexRow } from "@/components/projects/IndexRow";

export function Projects() {
  return (
    <section id="projects" className="relative bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12 md:pt-32">
        <span className="bp-tag mb-6 block text-blueprint-soft">FIG. 06 — CASE STUDIES</span>
        <h2 className="max-w-3xl font-display text-display-lg font-semibold leading-[1.02] tracking-tight text-text">
          Five products, shipped end to end.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          Each one live, each one built alone — from the first schema decision to the deployed URL.
        </p>
      </div>

      <div className="mt-16 md:mt-20">
        {flagshipProjects.map((project) => (
          <ProjectCase key={project.id} project={project} />
        ))}
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <span className="bp-tag mb-4 block text-mist-500">FIG. 11 — MORE WORK</span>
        <h3 className="mb-10 font-display text-display-sm font-semibold text-text">
          Eight more, in brief.
        </h3>
        <div className="border-t border-ink-line">
          {indexProjects.map((project, i) => (
            <IndexRow key={project.id} project={project} number={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}
