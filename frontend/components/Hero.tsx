import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { ArrowRight, Mail, Code2, Terminal, Database } from "lucide-react";

export default function Hero() {
  return (
    <div 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[800px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-start max-w-5xl mx-auto w-full">
        {/* Step 1: Who I am */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-emerald-500/50"></div>
          <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase">
            Hi, my name is {personalInfo.name}
          </span>
        </div>

        {/* Step 2: What I do */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white leading-[1.1]">
          I engineer robust <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">
            digital experiences.
          </span>
        </h1>
        
        {/* Step 3: What I build / Positioning */}
        <h2 className="text-xl md:text-2xl text-zinc-300 font-medium mb-6 max-w-3xl leading-snug">
          Full-Stack Developer building modern web applications.
        </h2>

        <p className="text-lg text-zinc-400 max-w-2xl font-light mb-12 leading-relaxed">
          I work across the entire stack—designing responsive frontends, architecting scalable backends, designing databases, integrating APIs, managing authentication, and handling deployments.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <Link 
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors duration-300"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-lg font-medium border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </Link>
        </div>

        {/* Tech Stack Mini Display */}
        <div className="mt-24 pt-8 border-t border-zinc-900/50 w-full flex flex-col md:flex-row items-center justify-between gap-6">
           <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Core Capabilities</span>
           <div className="flex flex-wrap items-center justify-center gap-8">
             <div className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors duration-300 cursor-default">
               <Terminal className="w-4 h-4" /> <span className="text-sm font-medium">Frontend</span>
             </div>
             <div className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors duration-300 cursor-default">
               <Code2 className="w-4 h-4" /> <span className="text-sm font-medium">Backend</span>
             </div>
             <div className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors duration-300 cursor-default">
               <Database className="w-4 h-4" /> <span className="text-sm font-medium">Database</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
