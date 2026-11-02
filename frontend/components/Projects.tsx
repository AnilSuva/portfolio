import { projects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative border-t border-zinc-900/50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
            <span className="text-emerald-500 font-mono text-sm">02.</span>
            Selected Work
          </h2>
          <div className="w-12 h-[1px] bg-emerald-500/50 mb-8"></div>
          <p className="text-zinc-400 font-light max-w-2xl text-lg">
            A selection of my recent work, showcasing my skills in frontend and backend development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
