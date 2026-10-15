"use client";

import { processSteps } from "@/data/agencyData";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./animations/TiltCard";

export default function Process() {
  return (
    <section id="process" className="relative py-28 bg-[#07070E] border-y border-white/[0.05]">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Structured Delivery Methodology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Predictable, Transparent &{" "}
            <span className="text-silver-violet">Relentlessly Fast.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A1A1B5] leading-relaxed"
          >
            From initial strategy to cloud production, our 5-phase engineering protocol guarantees on-time delivery with zero surprises.
          </motion.p>
        </div>

        {/* Horizontal Timeline Bar on Desktop with Animated Laser Beam */}
        <div className="relative mb-8 hidden lg:block overflow-hidden py-4">
          {/* Track background */}
          <div className="absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-white/10" />

          {/* Traveling Animated Laser Beam */}
          <div className="absolute top-1/2 left-0 w-48 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#8B6CFF] to-white shadow-[0_0_15px_#8B6CFF] animate-laser" />

          <div className="flex justify-between items-center relative z-10 px-8">
            {processSteps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-[#0B0B14] border-2 border-violet-500 group-hover:border-violet-300 shadow-[0_0_20px_rgba(108,76,245,0.6)] group-hover:shadow-[0_0_30px_rgba(108,76,245,0.9)] flex items-center justify-center font-mono text-sm font-bold text-white transition-all">
                  {s.step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Cards Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full flex"
            >
              <TiltCard maxTilt={8} glare={true} className="w-full flex">
                <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between w-full h-full group hover:border-violet-500/50 relative overflow-hidden">
                  <div>
                    {/* Step & Duration Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-silver-violet">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-violet-500/10 text-[#8B6CFF] border border-violet-500/25">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mb-2.5 group-hover:text-silver-light">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-white/[0.06] space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                      Deliverables
                    </div>
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
