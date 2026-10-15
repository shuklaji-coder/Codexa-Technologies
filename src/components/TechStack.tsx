"use client";

import { techMarquee } from "@/data/agencyData";
import {
  Code,
  Cpu,
  Layers,
  Database,
  Server,
  Smartphone,
  PenTool,
  Boxes,
  Sparkles,
  Terminal,
  Cloud,
} from "lucide-react";

export default function TechStack() {
  const getTechIcon = (category: string) => {
    switch (category) {
      case "Framework":
      case "Frontend":
        return <Layers className="w-4 h-4 text-[#8B6CFF]" />;
      case "Backend":
      case "Database":
      case "Cache":
        return <Server className="w-4 h-4 text-[#8B6CFF]" />;
      case "Mobile":
        return <Smartphone className="w-4 h-4 text-[#8B6CFF]" />;
      case "Design":
        return <PenTool className="w-4 h-4 text-[#8B6CFF]" />;
      case "DevOps":
      case "Cloud":
      case "Hosting":
        return <Cloud className="w-4 h-4 text-[#8B6CFF]" />;
      default:
        return <Code className="w-4 h-4 text-[#8B6CFF]" />;
    }
  };

  // Double the list for infinite seamless marquee loop
  const marqueeItems = [...techMarquee, ...techMarquee];

  return (
    <section id="tech-stack" className="relative py-24 bg-[#05050A] overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Modern Technology Foundation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Powered by the World’s{" "}
            <span className="text-silver-violet">Most Advanced Tech Stack.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1B5]">
            Battle-tested frameworks and high-performance cloud engines ensuring 99.99% uptime, microsecond response times, and limitless scalability.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Track 1 (Leftwards) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] py-2">
          {marqueeItems.map((tech, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/50 hover:bg-white/[0.06] backdrop-blur-md transition-all group shrink-0"
            >
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 group-hover:scale-110 transition-transform">
                {getTechIcon(tech.category)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-sm font-semibold text-white group-hover:text-silver-light">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Marquee Track 2 (Rightwards) */}
      <div className="relative w-full overflow-hidden mt-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused] py-2">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`rev-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/40 hover:bg-white/[0.05] backdrop-blur-md transition-all group shrink-0"
            >
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 group-hover:scale-110 transition-transform">
                {getTechIcon(tech.category)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-sm font-semibold text-white group-hover:text-silver-light">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
