import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { ArrowRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <div 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6"
    >
      <div></div>
      <div className="flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-(--foreground) uppercase">
          {personalInfo.name.split(" ")[0]}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-br from-(--accent) to-cyan-400">
            {personalInfo.name.split(" ")[1]}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-(--text-secondary) max-w-2xl font-light mb-10 leading-relaxed">
          I build things for the web. <br className="hidden md:block" />
          Full-Stack Developer
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="#projects"
            className="group flex items-center gap-2 bg-(--foreground) text-(--background) px-8 py-4 rounded-full font-medium hover:bg-(--accent) hover:text-white transition-all duration-300"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="#contact"
            className="flex items-center gap-2 bg-(--surface) border border-(--border-color) text-(--foreground) px-8 py-4 rounded-full font-medium hover:bg-(--surface-hover) transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-(--text-secondary)" />
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
