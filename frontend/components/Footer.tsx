import { personalInfo } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-zinc-900/80 bg-zinc-950">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="#home" className="text-xl font-bold tracking-tighter text-zinc-100">
            {personalInfo.name.split(" ").map((n) => n[0]).join("")}
            <span className="text-emerald-500">.</span>
          </Link>
          <p className="text-zinc-500 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {personalInfo.socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.name}`}
                className="text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        <Link 
          href="#home"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </Link>
        
      </div>
    </footer>
  );
}
