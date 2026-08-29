/* eslint-disable @next/next/no-img-element */
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-(--foreground)">
              /Technical <span className="text-(--accent)">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-(--accent) rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="glass-panel group flex flex-col items-center justify-center p-6 rounded-2xl hover:border-(--accent)/40 hover:bg-(--surface-hover) transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={skill.icon} 
                  alt={`${skill.name} logo`} 
                  className={cn(
                    "max-w-full max-h-full object-contain",
                    skill.invertDark ? "dark:invert" : "" 
                  )}
                  style={skill.invertDark ? { filter: 'invert(1) brightness(1.5)' } : {}}
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-medium text-(--text-secondary) group-hover:text-(--foreground) transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
