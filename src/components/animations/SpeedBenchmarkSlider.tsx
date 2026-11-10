"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Gauge, Zap, AlertTriangle, CheckCircle2, Sparkles, Layers, ShieldCheck, Flame } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export default function SpeedBenchmarkSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 sm:my-16 select-none">
      {/* Header Info */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Benchmark</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Drag to Compare:{" "}
          <span className="text-silver-violet">WordPress vs Techlifa Edge.</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#A1A1B5] max-w-xl mx-auto">
          Slide left & right to see why traditional agency websites bleed customers while Techlifa digital platforms dominate.
        </p>
      </div>

      {/* Main Split Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          try {
            sounds.playClick();
          } catch {}
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          try {
            sounds.playClick();
          } catch {}
          handleMove(e.touches[0].clientX);
        }}
        className="relative h-[480px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] cursor-ew-resize bg-[#070712]"
      >
        {/* ================= RIGHT SIDE: TECHLIFA (BACKGROUND LAYER) ================= */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c22] via-[#090918] to-[#04040a] p-6 sm:p-10 flex flex-col justify-between">
          {/* Top Badge Right */}
          <div className="flex items-center justify-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TECHLIFA EDGE (NEXT.JS 14)</span>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl ml-auto text-right sm:text-center mt-auto mb-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400">
                340ms
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-300 mt-1">
                ⚡ Sub-Second Load
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#00F5FF]">
                99 / 100
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-300 mt-1">
                Lighthouse Score
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                60 FPS
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-300 mt-1">
                Buttery Smooth
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 shadow-[0_0_15px_rgba(108,76,245,0.2)]">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#8B6CFF]">
                +240%
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-300 mt-1">
                Lead Conversion
              </div>
            </div>
          </div>

          {/* Right Bottom Footer */}
          <div className="flex items-center justify-end gap-3 text-xs text-zinc-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Full GitHub Handover • Zero Vendor Lock-in</span>
          </div>
        </div>

        {/* ================= LEFT SIDE: TYPICAL AGENCY (CLIPPED OVERLAY) ================= */}
        <div
          className="absolute inset-0 bg-[#0F0A0E] p-6 sm:p-10 flex flex-col justify-between border-r border-red-500/40 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Top Badge Left */}
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 font-mono text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>TYPICAL AGENCY (WORDPRESS / PHP)</span>
            </div>
          </div>

          {/* Left Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl text-left sm:text-center mt-auto mb-auto min-w-[320px] sm:min-w-[580px]">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-red-400">
                4.8s
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-1">
                High Bounce Delay
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-400">
                42 / 100
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-1">
                Lighthouse Warning
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-400">
                38 Plugins
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-1">
                Bloated & Fragile
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-red-400">
                -58%
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-1">
                Lost Inbound Traffic
              </div>
            </div>
          </div>

          {/* Left Bottom Footer */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono whitespace-nowrap">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Proprietary Builder Lock-in • Endless Radio Silence</span>
          </div>
        </div>

        {/* ================= DRAGGABLE SLIDER DIVIDER BAR ================= */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B6CFF] via-[#00F5FF] to-[#8B6CFF] shadow-[0_0_20px_#00F5FF] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Thumb Capsule */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0D0D1F] border-2 border-[#00F5FF] shadow-[0_0_25px_rgba(0,245,255,0.7)] flex items-center justify-center text-white pointer-events-auto transform hover:scale-110 active:scale-95 transition-transform">
            <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-tighter text-[#00F5FF]">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

