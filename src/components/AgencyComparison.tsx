"use client";

import { Check, X, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AgencyComparison() {
  const comparisonRows = [
    {
      feature: "Core Tech Architecture",
      other: "Bloated WordPress themes & fragile PHP plugins",
      codexa: "Next.js 14, React 19, Flutter & Tailwind CSS",
    },
    {
      feature: "Mobile Page Load Speed",
      other: "3.5s – 5.0s (High bounce rate & lost visitors)",
      codexa: "Sub-450ms (Lighthouse 95+ Core Web Vitals)",
    },
    {
      feature: "Code Ownership & IP",
      other: "Vendor lock-in or hostage proprietary builders",
      codexa: "100% Full GitHub repository handover & zero lock-in",
    },
    {
      feature: "Project Delivery Velocity",
      other: "Endless delays, scope creep & radio silence",
      codexa: "Strict 1-2 week agile sprints with weekly staging links",
    },
    {
      feature: "Design & Aesthetic Standard",
      other: "Generic cookie-cutter templates used by 1000s",
      codexa: "Custom Linear/Vercel-level dark luxury aesthetic",
    },
    {
      feature: "Communication Channel",
      other: "Slow email ticketing or junior sales middlemen",
      codexa: "Direct engineer WhatsApp & Slack access",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#07070E] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3.5 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>The Competitive Matrix</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-5">
            Typical Agency vs{" "}
            <span className="text-silver-violet">Codexa Technologies.</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2">
            See why ambitious startups choose our engineering studio over slow, template-driven freelancers and agencies.
          </p>
        </div>

        {/* Mobile View: High-Impact Stacked Cards (< md) */}
        <div className="block md:hidden space-y-3.5">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#090916] border border-white/[0.08] p-4 space-y-3 shadow-lg"
            >
              {/* Feature Pill */}
              <div className="font-heading text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span>{row.feature}</span>
                <span className="text-[10px] font-mono text-[#8B6CFF] bg-violet-500/10 px-2 py-0.5 rounded-full">
                  0{idx + 1}
                </span>
              </div>

              {/* Codexa Advantage Card */}
              <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/40 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
                <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono font-semibold text-[#8B6CFF]">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>CODEXA ADVANTAGE</span>
                </div>
                <p className="text-xs text-silver-light font-medium leading-relaxed pl-5">
                  {row.codexa}
                </p>
              </div>

              {/* Other Agencies Card */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-zinc-500">
                  <X className="w-3 h-3 text-red-400 shrink-0" />
                  <span>TYPICAL AGENCIES</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed pl-4">
                  {row.other}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Matrix Table (md+) */}
        <div className="hidden md:block rounded-3xl bg-[#090916] border border-white/[0.08] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-6 bg-white/[0.02] border-b border-white/[0.08] text-sm font-heading font-bold uppercase tracking-wider">
            <div className="col-span-4 text-zinc-400">Pillar</div>
            <div className="col-span-4 text-red-400/90 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span>Typical Agencies</span>
            </div>
            <div className="col-span-4 text-silver-violet flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B6CFF] animate-ping" />
              <span>Codexa Studio</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.06]">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-6 items-center text-sm hover:bg-white/[0.02] transition-colors"
              >
                {/* Feature Name */}
                <div className="col-span-4 font-medium text-white pr-2">
                  {row.feature}
                </div>

                {/* Other Agencies */}
                <div className="col-span-4 flex items-start gap-2 text-zinc-400 pr-2">
                  <div className="p-0.5 rounded-full bg-red-500/20 text-red-400 mt-0.5 shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span className="text-xs leading-snug">{row.other}</span>
                </div>

                {/* Codexa Technologies */}
                <div className="col-span-4 flex items-start gap-2 text-zinc-200 font-medium">
                  <div className="p-0.5 rounded-full bg-violet-500/20 text-[#8B6CFF] mt-0.5 shrink-0 shadow-[0_0_10px_rgba(108,76,245,0.4)]">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs leading-snug text-silver-light">
                    {row.codexa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
