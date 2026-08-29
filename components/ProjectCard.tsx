import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectProps) {
  return (
    <div className="glass-panel group rounded-3xl overflow-hidden flex flex-col h-full hover:border-(--accent)/50 transition-all duration-500 hover:-translate-y-2">
      {/* Visual Header - replacing image placeholder with a gradient mesh effect to keep it lightweight and premium */}
      <div className="h-48 w-full relative overflow-hidden bg-(--surface-hover) border-b border-(--border-color)">
        <div className="absolute inset-0 bg-noise opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-(--accent) rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>

        {/* Abstract representation of a project */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-(--surface) border border-(--border-color)/50 shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <span className="font-bold text-xl text-(--accent)">{title.charAt(0)}</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-3 text-(--foreground) group-hover:text-(--accent) transition-colors">
          {title}
        </h3>

        <p className="text-(--text-secondary) font-light leading-relaxed mb-6 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs font-medium px-3 py-1 bg-(--surface-hover) border border-(--border-color) rounded-full text-(--text-secondary)"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-(--border-color)/50">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-(--text-secondary) hover:text-(--foreground) transition-colors"
              aria-label={`View ${title} source on GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-(--accent) hover:text-(--accent-hover) transition-colors ml-auto group/link"
              aria-label={`Visit ${title} live demo`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
