import { projects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-(--background)">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-(--foreground)">
            /Projects
          </h2>
          <div className="w-20 h-1 bg-(--accent) rounded-full mb-6"></div>
          <p className="text-(--text-secondary) font-light max-w-2xl text-lg">
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
