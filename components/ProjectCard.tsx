import { ExternalLink, ArrowUpRight } from "lucide-react";
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
    <div className="group relative flex flex-col h-full bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300 rounded-xl overflow-hidden">
      
      {/* Top Bar (Browser/Window aesthetic) */}
      <div className="h-10 w-full border-b border-zinc-800/80 bg-zinc-950/50 flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors delay-75"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors delay-150"></div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          )}
        </div>

        <p className="text-zinc-400 font-light leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-[11px] uppercase tracking-wider font-mono px-2.5 py-1 bg-zinc-950/50 border border-zinc-800 text-zinc-400 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-5 border-t border-zinc-800/80">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              aria-label={`View ${title} source on GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors ml-auto group/link"
              aria-label={`Visit ${title} live demo`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
