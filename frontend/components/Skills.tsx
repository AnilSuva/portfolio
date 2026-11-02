/* eslint-disable @next/next/no-img-element */
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative border-t border-zinc-900/50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
              <span className="text-emerald-500 font-mono text-sm">03.</span>
              Technical Skills
            </h2>
            <div className="w-12 h-[1px] bg-emerald-500/50 mb-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300"
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={skill.icon} 
                  alt={`${skill.name} logo`} 
                  className={cn(
                    "max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300",
                    skill.invertDark ? "dark:invert" : "" 
                  )}
                  style={skill.invertDark ? { filter: 'invert(1)' } : {}}
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-mono tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors text-center uppercase">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
