"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/agencyData";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? testimonialsData.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === testimonialsData.length - 1 ? 0 : prevIdx + 1
    );
  };

  // Optional subtle auto slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-[#05050A] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#8B6CFF] text-xs font-mono tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Client Endorsements</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Trusted by Visionary Founders &{" "}
            <span className="text-silver-violet">Technical Leaders.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1B5] leading-relaxed">
            Here is how our engineering partnerships have helped companies scale their revenue and dominate their categories.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* Giant Background Quote Icon */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.03] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between"
              >
                {/* Star Rating & Project Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-[#8B6CFF] border border-violet-500/20">
                    Project: {current.projectType}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed mb-10">
                  “{current.content}”
                </blockquote>

                {/* Client Profile */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-violet-500/40 shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="font-heading text-lg font-bold text-white">
                      {current.name}
                    </h4>
                    <p className="text-xs text-[#8B6CFF] font-medium">
                      {current.role}
                    </p>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-violet-500 shadow-[0_0_10px_#8B6CFF]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-violet-500 hover:bg-white/10 text-white transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-violet-500 hover:bg-white/10 text-white transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
