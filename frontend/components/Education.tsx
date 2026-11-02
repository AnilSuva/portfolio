import { education } from "@/data/portfolio";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 relative border-t border-zinc-900/50">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
            <span className="text-emerald-500 font-mono text-sm">04.</span>
            Education
          </h2>
          <div className="w-12 h-[1px] bg-emerald-500/50 mb-8"></div>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="group relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-zinc-800"></div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start relative z-10">
                
                <div className="hidden md:flex shrink-0 w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors duration-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <div className="flex-1 bg-zinc-900/20 border border-zinc-800/60 p-6 md:p-8 rounded-xl hover:border-zinc-700 transition-colors duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {edu.degree}
                  </h3>
                  
                  <div className="text-lg font-medium text-zinc-400 mb-6">
                    {edu.school}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.startDate} — {edu.endDate}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 font-light leading-relaxed">
                    {edu.description}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
