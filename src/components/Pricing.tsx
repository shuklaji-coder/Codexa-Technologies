"use client";

import { pricingPlans, PricingPlan } from "@/data/agencyData";
import { Check, Sparkles, Clock, RefreshCw, ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./animations/TiltCard";
import BorderBeam from "./animations/BorderBeam";
import TextScramble from "./animations/TextScramble";
import { sounds } from "@/utils/soundEffects";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-[#07070E] border-y border-white/[0.05]">
      {/* Background Central Glow for Popular Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[400px] sm:h-[550px] bg-violet-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 sm:mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Transparent Investment</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-5"
          >
            <TextScramble text="Transparent Pricing." />{" "}
            <span className="text-silver-violet">Zero Hidden Overhead.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2"
          >
            Enterprise-grade quality at clear, milestone-backed pricing. All website packages include clean hand-off code, responsive design, and SEO optimization.
          </motion.p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPlans.map((plan: PricingPlan, idx: number) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full flex"
              >
                <TiltCard maxTilt={isPopular ? 6 : 8} glare={true} className="w-full flex">
                  <div
                    className={`relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isPopular
                        ? "bg-[#0E0E1F] border-2 border-violet-500 shadow-[0_0_45px_rgba(108,76,245,0.4)] lg:-translate-y-3 z-10 mt-3 lg:mt-0"
                        : "glass-card hover:border-violet-500/40"
                    }`}
                  >
                    {/* Animated Border Beam on Middle Card */}
                    {isPopular && (
                      <BorderBeam size={220} duration={5} colorFrom="#8B6CFF" colorTo="#FFFFFF" />
                    )}

                    {/* Popular Pill */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 via-[#8B6CFF] to-violet-600 text-white shadow-[0_0_20px_rgba(108,76,245,0.85)] animate-pulse">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Title & Tagline */}
                      <div className="mb-5 sm:mb-6">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1.5">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-[#A1A1B5] min-h-[30px] leading-relaxed">
                          {plan.tagline}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/[0.08]">
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                            {plan.price}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">
                            + 18% GST
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#8B6CFF] block mt-1">
                          Fixed milestone pricing • No surprise invoices
                        </span>
                      </div>

                      {/* Turnaround & Revisions Pills */}
                      <div className="grid grid-cols-2 gap-2 mb-6 sm:mb-8">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2 text-xs">
                          <Clock className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0" />
                          <div>
                            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Timeline</div>
                            <div className="font-medium text-white text-[10px] sm:text-[11px]">{plan.deliveryTime}</div>
                          </div>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2 text-xs">
                          <RefreshCw className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0" />
                          <div>
                            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Revisions</div>
                            <div className="font-medium text-white text-[10px] sm:text-[11px]">{plan.revisions}</div>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                          Package Inclusions:
                        </span>
                        {plan.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <div className="p-0.5 rounded-full bg-violet-500/20 text-[#8B6CFF] mt-0.5 shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="leading-snug text-[11px] sm:text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plan CTA Button with Sounds */}
                    <button
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => {
                        sounds.playClick();
                        onSelectPlan(`${plan.name} (${plan.price})`);
                      }}
                      className={`w-full py-3.5 sm:py-4 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all ${
                        isPopular
                          ? "violet-glow-btn btn-shimmer text-white shadow-[0_0_25px_rgba(108,76,245,0.7)]"
                          : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-violet-500/40"
                      }`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Apps & Enterprise Quote Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-14 max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-violet-950/40 via-purple-950/25 to-black border border-violet-500/35 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
            <div className="p-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-[#8B6CFF] shrink-0">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                Apps and custom web apps: get a custom quote.
              </h4>
              <p className="text-xs text-[#A1A1B5] mt-0.5">
                Building an iOS/Android app, multi-tenant SaaS dashboard, or complex backend system? We scope your exact requirements in 24 hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan("Custom App / SaaS Web Application")}
            className="w-full sm:w-auto violet-glow-btn px-6 py-3 rounded-xl font-heading text-xs font-semibold uppercase tracking-wider text-white shrink-0 cursor-pointer whitespace-nowrap"
          >
            Request Custom Scope
          </button>
        </motion.div>
      </div>
    </section>
  );
}
