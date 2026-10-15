"use client";

import { whyChooseUsData, statsData } from "@/data/agencyData";
import {
  Zap,
  Layers,
  Smartphone,
  TrendingUp,
  BadgePercent,
  Headphones,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import CounterNumber from "./animations/CounterNumber";
import TiltCard from "./animations/TiltCard";
import TextScramble from "./animations/TextScramble";

export default function WhyUs() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "Zap":
        return <Zap className="w-5 h-5 text-[#8B6CFF]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#8B6CFF]" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-[#8B6CFF]" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-[#8B6CFF]" />;
      case "BadgePercent":
        return <BadgePercent className="w-5 h-5 text-[#8B6CFF]" />;
      case "Headphones":
        return <Headphones className="w-5 h-5 text-[#8B6CFF]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8B6CFF]" />;
    }
  };

  return (
    <section id="why-us" className="relative py-28 bg-[#07070E] border-y border-white/[0.05]">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>The Codexa Advantage</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            <TextScramble text="Why High-Growth Brands" />{" "}
            <span className="text-silver-violet">Choose Us Over Other Agencies.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A1A1B5] leading-relaxed"
          >
            Most agencies deliver clunky WordPress themes with slow load times and endless delays. We engineer high-velocity digital products designed to scale seamlessly from Day 1.
          </motion.p>
        </div>

        {/* Animated Rolling Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard maxTilt={6} glare={true}>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex flex-col items-center text-center hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(108,76,245,0.25)] transition-all group">
                  <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-silver-violet mb-2 group-hover:scale-110 transition-transform">
                    <CounterNumber value={stat.value} />
                  </div>
                  <div className="font-heading text-sm sm:text-base font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#A1A1B5] font-mono">
                    {stat.helper}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* 6 Core Pillars Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <TiltCard maxTilt={7} glare={true} className="h-full">
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-violet-500/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-start h-full group">
                  <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/25 group-hover:border-violet-500/60 group-hover:scale-110 transition-all mb-5">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-silver-light">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#A1A1B5] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
