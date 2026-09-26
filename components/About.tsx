

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative border-t border-zinc-900/50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          <div className="w-full md:w-1/3">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
              <span className="text-emerald-500 font-mono text-sm">01.</span>
              About Me
            </h2>
            <div className="w-12 h-[1px] bg-emerald-500/50 mb-8"></div>
          </div>

          <div className="w-full md:w-2/3 relative">
            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
              <p>
                I&apos;m a full-stack developer who enjoys building things that genuinely interest me. I like learning by getting my hands dirty—whether that&apos;s building a feature, figuring out how something works, or breaking things and fixing them along the way.
              </p>
              <p>
                I work primarily with TypeScript, Next.js, React, PostgreSQL, MongoDB, Express, WebSockets, and Tailwind CSS.
              </p>
              <p>
                I usually learn new technologies through tutorials and then reinforce them by building something with them. That&apos;s how I learned concepts like cookies—rather than just learning the theory, I implemented them in a real project and figured things out along the way.
              </p>
            </div>
            
            {/* Minimalist Decoration */}
            <div className="absolute -left-6 top-2 bottom-2 w-[1px] bg-gradient-to-b from-emerald-500/20 via-zinc-800/50 to-transparent hidden md:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
