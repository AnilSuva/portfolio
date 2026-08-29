import { education } from "@/data/portfolio";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 relative bg-(--surface)/30 border-y border-(--border-color)">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-(--foreground)">
            /Education
          </h2>
          <div className="w-20 h-1 bg-(--accent) rounded-full "></div>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-(--accent)/50 transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                
                <div className="hidden md:flex shrink-0 w-16 h-16 rounded-2xl bg-(--surface) border border-(--border-color) items-center justify-center text-(--accent)">
                  <GraduationCap className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-(--foreground) mb-2 group-hover:text-(--accent) transition-colors">
                    {edu.degree}
                  </h3>
                  
                  <div className="text-lg font-medium text-(--text-secondary) mb-4">
                    {edu.school}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-sm text-(--text-muted) bg-(--surface) px-3 py-1.5 rounded-full border border-(--border-color)">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.startDate} — {edu.endDate}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-sm text-(--text-muted) bg-(--surface) px-3 py-1.5 rounded-full border border-(--border-color)">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-(--text-secondary) font-light leading-relaxed">
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
