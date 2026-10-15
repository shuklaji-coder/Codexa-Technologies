"use client";

import { useState } from "react";
import { faqData, FaqItem } from "@/data/agencyData";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#07070E] border-y border-white/[0.05]">
      {/* Background glow spot */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked{" "}
            <span className="text-silver-violet">Questions.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1B5]">
            Everything you need to know about our development timelines, milestones, tech stacks, and guarantees.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#0E0E1B] border-violet-500/40 shadow-[0_4px_25px_rgba(108,76,245,0.15)]"
                    : "bg-white/[0.02] border-white/[0.07] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#8B6CFF] px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 shrink-0">
                      {item.category}
                    </span>
                    <span className="font-heading text-base sm:text-lg font-semibold text-white">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`p-2 rounded-full bg-white/[0.04] text-zinc-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-violet-600 text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm text-[#A1A1B5] leading-relaxed border-t border-white/[0.04]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
