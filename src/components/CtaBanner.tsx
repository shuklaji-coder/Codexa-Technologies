"use client";

import { Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import BorderBeam from "./animations/BorderBeam";

interface CtaBannerProps {
  onOpenQuoteModal: () => void;
}

export default function CtaBanner({ onOpenQuoteModal }: CtaBannerProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-[#05050A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Massive Radiant Violet Nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-violet-600/30 via-[#8B6CFF]/20 to-purple-800/30 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Card Box with glowing borders and traveling BorderBeam */}
        <div className="rounded-3xl p-8 sm:p-14 md:p-16 bg-[#0B0B18]/95 border border-violet-500/40 shadow-[0_0_70px_rgba(108,76,245,0.35)] backdrop-blur-2xl relative overflow-hidden group">
          {/* Animated perimeter laser */}
          <BorderBeam size={280} duration={7} colorFrom="#8B6CFF" colorTo="#FFFFFF" />

          {/* Subtle logo silhouette in background */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
            <Image src="/logo.png" alt="Emblem" fill className="object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-white text-xs font-mono tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(108,76,245,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Taking New Projects for Q4 2026</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to Build Something{" "}
            <span className="text-silver-violet block sm:inline">
              Extraordinary?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1B5] max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing potential customers to slow, outdated websites and clunky apps. Partner with Codexa Technologies and ship an unstoppable digital product.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="violet-glow-btn btn-shimmer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading text-sm uppercase tracking-wider font-semibold text-white cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/919580849709?text=Hello%20Codexa%20Technologies,%20I%20am%20interested%20in%20building%20a%20project%20with%20your%20team."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-heading text-sm uppercase tracking-wider font-semibold text-white bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 hover:border-[#25D366] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-8 text-xs font-mono text-zinc-400">
            Average response time: under 15 minutes during business hours
          </div>
        </div>
      </div>
    </section>
  );
}
