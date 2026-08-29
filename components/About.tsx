import { personalInfo } from "@/data/portfolio";
import { User, Code2, Cpu } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          <div className="w-full md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-(--foreground)">
              /About <span className="text-(--accent)">Me</span>
            </h2>
            <div className="w-20 h-1 bg-(--accent) rounded-full mb-8"></div>
          </div>

          <div className="w-full md:w-2/3 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            {/* Decorative background element inside the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-(--accent) opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700"></div>

            <h3 className="text-2xl font-semibold mb-6">Hello, I&apos;m {personalInfo.name}</h3>

            <div className="space-y-4 text-(--text-secondary) leading-relaxed text-lg font-light">
              <p>
                I'm a full-stack developer who enjoys building things that genuinely interest me. I like learning by getting my hands dirty—whether that's building a feature, figuring out how something works, or breaking things and fixing them along the way.
              </p>
              <p>
                I work primarily with TypeScript, Next.js, React, PostgreSQL, MongoDB, Express, WebSockets, and Tailwind CSS.
              </p>
              <p>
                I usually learn new technologies through tutorials and then reinforce them by building something with them. That's how I learned concepts like cookies—rather than just learning the theory, I implemented them in a real project and figured things out along the way.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
