"use client";

import { ArrowRight, Code, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Robot3DCanvas from "./animations/Robot3DCanvas";
import CyberHorizon3D from "./animations/CyberHorizon3D";
import MagneticButton from "./animations/MagneticButton";
import { sounds } from "@/utils/soundEffects";

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 flex flex-col justify-center overflow-hidden bg-[#05050A]">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Floating Violet Glow Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[450px] sm:w-[750px] h-[350px] sm:h-[550px] bg-violet-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -left-32 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-violet-700/15 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 -right-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-violet-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* 3D Horizon Tron Grid Floor */}
      <CyberHorizon3D />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Studio Badge & Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4 sm:mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(108,76,245,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B6CFF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6C4CF5]"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase text-silver">
                  High-End Web & App Studio
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Q4 Bookings Open • 2 Slots Left</span>
              </div>
            </motion.div>

            {/* Massive Punchy Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-4 sm:mb-6 max-w-xl lg:max-w-none"
            >
              We Build Digital Products That Make Brands{" "}
              <span className="text-silver-violet inline-block">
                Unstoppable.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-lg text-[#A1A1B5] font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8 px-1 sm:px-0"
            >
              Premium websites, web applications, and mobile apps crafted with speed, design, and code that scales.
              Silicon Valley polish engineered with Next.js, React & Flutter.
            </motion.p>

            {/* Action Buttons with Magnetic Cursor Physics & Sound */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6 sm:mb-8 max-w-md sm:max-w-none"
            >
              <MagneticButton strength={0.25} className="w-full sm:w-auto">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenQuoteModal();
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className="violet-glow-btn btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-heading text-xs sm:text-sm uppercase tracking-wider font-semibold text-white cursor-pointer group shadow-[0_0_25px_rgba(108,76,245,0.4)]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25} className="w-full sm:w-auto">
                <a
                  href="#work"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-heading text-xs sm:text-sm uppercase tracking-wider font-semibold text-silver hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(108,76,245,0.2)] transition-all duration-300 cursor-pointer text-center"
                >
                  <span>Explore Client Work</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Small Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-4 sm:pt-5 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3.5 sm:gap-x-4 text-[10px] sm:text-xs text-[#A1A1B5]"
            >
              <div className="flex items-center gap-1.5 text-white font-medium">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <span>5.0 Top Rated</span>
              </div>
              <span className="text-white/20 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#8B6CFF]" />
                <span className="text-silver">50+ Shipped</span>
              </div>
              <span className="text-white/20 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#8B6CFF]" />
                <span className="text-silver">100% Satisfaction</span>
              </div>
              <span className="text-white/20 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Code className="w-3 h-3 text-[#8B6CFF]" />
                <span className="text-silver">2-Week Sprints</span>
              </div>
            </motion.div>
          </div>

          {/* Unified Right Column: 3D Robot Companion (Desktop Side-by-Side & Mobile Companion) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center mt-6 lg:mt-0 relative w-full">
            <div className="absolute inset-0 bg-violet-600/25 rounded-3xl blur-3xl transform scale-90 pointer-events-none" />
            <div className="relative w-full flex items-center justify-center">
              <Robot3DCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
