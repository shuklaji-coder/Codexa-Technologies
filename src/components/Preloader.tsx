"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/utils/soundEffects";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const dismissedRef = useRef(false);

  const handleDismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setProgress(100);

    try {
      sounds.playSuccess();
    } catch {}

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("techlifa-enter"));
    }

    setTimeout(() => {
      setLoading(false);
    }, 240);
  };

  useEffect(() => {
    // Dynamic authentic progress counter over ~2.2 seconds
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      if (dismissedRef.current) {
        clearInterval(interval);
        return;
      }

      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      const eased = Math.min(
        100,
        Math.floor(
          rawProgress < 30
            ? rawProgress * 1.2
            : rawProgress < 75
            ? rawProgress * 0.96
            : rawProgress
        )
      );

      setProgress((prev) => Math.max(prev, eased));

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(handleDismiss, 220);
      }
    }, 32);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Cyber Telemetry Boot Text
  const getBootTelemetry = () => {
    if (progress < 18) return ">> [SYS_INIT] BOOTING TECHLIFA QUANTUM RUNTIME...";
    if (progress < 38) return ">> [GPU_ACCEL] COMPILING 60 FPS SHADER MATRICES...";
    if (progress < 62) return ">> [REPO_SYNC] LINKING 50+ PRODUCTION CLIENT DEPLOYS...";
    if (progress < 85) return ">> [AUDIT_PASS] CORE WEB VITALS 99/100 VERIFIED...";
    if (progress < 99) return ">> [ARMED] INITIALIZING 3D CYBERNETIC INTERFACE...";
    return ">> [READY] PLATFORM ARMED • ENTERING TECHLIFA STUDIO";
  };

  // 16-Segment Reactor Grid Power Status
  const totalSegments = 16;
  const activeSegments = Math.round((progress / 100) * totalSegments);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          onClick={handleDismiss}
          onTouchEnd={handleDismiss}
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030308] text-white cursor-pointer select-none overflow-hidden h-[100dvh] w-full max-w-[100vw] px-4 py-4 sm:px-8 sm:py-6"
          style={{ touchAction: "manipulation" }}
          title="Tap anywhere to enter"
        >
          {/* ================= 1. BACKGROUND ATMOSPHERE & CYBER GRID ================= */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

          {/* Sweeping Laser Scanner Beam */}
          <motion.div
            animate={{
              y: ["-10vh", "110vh"],
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.4,
              ease: "easeInOut",
            }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] via-[#8B6CFF] to-transparent shadow-[0_0_25px_#00F5FF,0_0_40px_#8B6CFF] pointer-events-none z-10"
          />

          {/* Central Deep Radial Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-violet-600/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

          {/* 4 HUD Sci-Fi Framing Corner Brackets */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-[9px] sm:text-[10px] text-zinc-500 flex items-center gap-1.5 pointer-events-none select-none">
            <span className="text-[#8B6CFF]">┌</span>
            <span className="text-zinc-400">NODE:</span>
            <span className="text-zinc-200">IN_DELHI_01</span>
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-[9px] sm:text-[10px] text-zinc-500 flex items-center gap-1.5 pointer-events-none select-none">
            <span className="text-zinc-400">LATENCY:</span>
            <span className="text-emerald-400">12ms</span>
            <span className="text-[#8B6CFF]">┐</span>
          </div>

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-mono text-[9px] sm:text-[10px] text-zinc-500 hidden sm:flex items-center gap-1.5 pointer-events-none select-none">
            <span className="text-[#8B6CFF]">└</span>
            <span className="text-zinc-400">ARCH:</span>
            <span className="text-zinc-300">NEXT.JS 14 // VERCEL EDGE</span>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 font-mono text-[9px] sm:text-[10px] text-zinc-500 hidden sm:flex items-center gap-1.5 pointer-events-none select-none">
            <span className="text-zinc-400">FPS:</span>
            <span className="text-[#00F5FF]">60.0 LOCKED</span>
            <span className="text-[#8B6CFF]">┘</span>
          </div>

          {/* ================= 2. TOP HUD STATUS STRIP ================= */}
          <div className="w-full max-w-full flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-zinc-400 tracking-wider relative z-20 shrink-0 px-2 sm:px-6 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-widest">TECHLIFA</span>
                <span className="text-[#8B6CFF] font-semibold">// OS v2.4</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[9px] sm:text-[10px]">
                <Activity className="w-3 h-3 text-[#00F5FF] animate-pulse" />
                <span className="hidden xs:inline">SYSTEM STATUS:</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-400 hidden sm:flex">
                <Sparkles className="w-3 h-3 text-[#8B6CFF]" />
                <span className="text-[10px]">VERIFIED 60 FPS</span>
              </div>
            </div>
          </div>

          {/* ================= 3. CENTER CORE PRESENTATION ================= */}
          <div className="relative flex flex-col items-center justify-center z-20 my-auto py-2 w-full max-w-sm sm:max-w-md mx-auto text-center px-2">
            {/* Holographic Radar Ring Container */}
            <div className="relative flex items-center justify-center my-3 sm:my-4">
              {/* Outer Counter-Clockwise Dotted Radar Circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-violet-500/30 pointer-events-none"
              />

              {/* Middle Clockwise Neon Cyan Tick Ring with Compass Notches */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute w-30 h-30 sm:w-40 sm:h-40 rounded-full border border-cyan-500/35 border-t-cyan-400 border-r-transparent pointer-events-none shadow-[0_0_20px_rgba(0,245,255,0.25)]"
              />

              {/* Inner Pulsing Hologram Glow */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.85, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-violet-600/30 blur-2xl pointer-events-none"
              />

              {/* Central Logo Box with Cyber Glass Border */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-20 h-20 sm:w-26 sm:h-26 rounded-2xl overflow-hidden border-2 border-violet-500/60 shadow-[0_0_40px_rgba(108,76,245,0.8)] bg-[#0B0B18] relative p-1.5 group"
              >
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-black/40">
                  <Image
                    src="/logo.png"
                    alt="Techlifa Technologies"
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </div>

            {/* Brand Title with High-Tech Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-1 text-center"
            >
              <h1 className="font-heading text-2xl sm:text-4xl font-black tracking-[0.22em] text-white flex items-center justify-center gap-2">
                <span>TECHLIFA</span>
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="font-heading text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#8B6CFF] uppercase">
                  TECHNOLOGIES
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-[#00F5FF] border border-cyan-500/30 font-semibold tracking-wider">
                  STUDIO
                </span>
              </div>
            </motion.div>

            {/* Digital Percentage Readout */}
            <div className="mt-4 flex items-baseline justify-center gap-1 font-mono">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#00F5FF]">%</span>
            </div>

            {/* 16-Segment Cyber Power Reactor Cells */}
            <div className="mt-3 flex items-center justify-center gap-1 sm:gap-1.5 w-full max-w-[280px] sm:max-w-xs">
              {Array.from({ length: totalSegments }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 sm:h-2.5 flex-1 rounded-sm transition-all duration-150 ${
                    i < activeSegments
                      ? i % 2 === 0
                        ? "bg-[#00F5FF] shadow-[0_0_10px_#00F5FF]"
                        : "bg-[#8B6CFF] shadow-[0_0_10px_#8B6CFF]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Continuous Precision Laser Fill Line */}
            <div className="mt-2 w-full max-w-[280px] sm:max-w-xs h-1 bg-white/10 rounded-full overflow-hidden relative border border-white/10 p-[0.5px]">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-violet-600 via-[#8B6CFF] to-[#00F5FF] rounded-full shadow-[0_0_15px_#00F5FF] transition-all duration-75"
              />
            </div>

            {/* Real-Time Cyber Boot Sequence Terminal Line */}
            <div className="mt-3 w-full text-center h-6 flex items-center justify-center">
              <span className="font-mono text-[9px] sm:text-[10.5px] tracking-wider text-zinc-300 truncate max-w-[280px] sm:max-w-md px-1 flex items-center justify-center gap-1.5">
                <Terminal className="w-3 h-3 text-[#8B6CFF] shrink-0" />
                <span className="text-zinc-300">{getBootTelemetry()}</span>
              </span>
            </div>

            {/* Interactive "Click to Enter" Action Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-4"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-violet-950/80 via-[#0E0E24] to-cyan-950/80 hover:from-violet-900/90 hover:to-cyan-900/90 border border-violet-500/50 hover:border-[#00F5FF] shadow-[0_0_30px_rgba(108,76,245,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-heading text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                  ENTER STUDIO
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#00F5FF] group-hover:rotate-45 transition-transform shrink-0" />
              </button>
            </motion.div>
          </div>

          {/* ================= 4. BOTTOM TELEMETRY STRIP ================= */}
          <div className="w-full max-w-full flex flex-col items-center justify-center gap-1.5 font-mono relative z-20 shrink-0 px-2 text-center pb-1">
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[9px] sm:text-[10px] text-zinc-400 tracking-wider">
              <div className="flex items-center gap-1 text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0" />
                <span>ENTERPRISE GRADE ARCHITECTURE</span>
              </div>
              <span className="text-zinc-600 hidden xs:inline">•</span>
              <div className="flex items-center gap-1 text-zinc-300">
                <Zap className="w-3.5 h-3.5 text-[#00F5FF] shrink-0" />
                <span>TOP 1% ENGINEERING</span>
              </div>
            </div>

            <p className="text-[8.5px] sm:text-[9.5px] text-zinc-500 tracking-widest uppercase animate-pulse">
              [ TAP ANYWHERE OR PRESS ENTER TO ENTER ]
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
