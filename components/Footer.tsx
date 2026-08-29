import { personalInfo } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-(--border-color) bg-(--background)">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="#home" className="text-xl font-bold tracking-tighter">
            {personalInfo.name.split(" ").map((n) => n[0]).join("")}
            <span className="text-(--accent)">.</span>
          </Link>
          <p className="text-(--text-muted) text-sm">
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
                className="text-(--text-secondary) hover:text-(--foreground) transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        <Link 
          href="#home"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-(--surface) border border-(--border-color) text-(--text-secondary) hover:text-(--accent) hover:border-(--accent) transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </Link>
        
      </div>
    </footer>
  );
}
