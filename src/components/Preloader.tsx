"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/utils/soundEffects";
import { Volume2, Sparkles, ShieldCheck, Cpu } from "lucide-react";

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
      window.dispatchEvent(new CustomEvent("codexa-enter"));
    }

    setTimeout(() => {
      setLoading(false);
    }, 220);
  };

  useEffect(() => {
    // Dynamic authentic progress counter that counts up to 100% over ~2.1 seconds
    const startTime = Date.now();
    const duration = 2100;

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
          rawProgress < 40
            ? rawProgress * 1.15
            : rawProgress < 75
            ? rawProgress * 0.95
            : rawProgress
        )
      );

      setProgress((prev) => Math.max(prev, eased));

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(handleDismiss, 200);
      }
    }, 35);

    // Keyboard trigger (Enter or Space)
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

  // Dynamic Terminal Diagnostic Message
  const getBootStatus = () => {
    if (progress < 18) return ">> [SYS_BOOT] INITIALIZING NEURAL CORE ARCHITECTURE...";
    if (progress < 42) return ">> [GPU_ACCEL] COMPILING 3D ROBOT COMPANION SHADERS...";
    if (progress < 68) return ">> [AUDIO_SYNC] SYNTHESIZING ALEXA NEURAL AI VOICE...";
    if (progress < 88) return ">> [CLIENT_STREAM] PRE-BUFFERING CHALOJI & MITS ASSETS...";
    if (progress < 99) return ">> [PIPELINE_OK] 60 FPS ULTRA-LUXURY INTERACTION LOCKED...";
    return ">> [STATUS_OK] PLATFORM READY • ENTERING CODEXA TECHNOLOGIES";
  };

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
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030308] text-white cursor-pointer select-none overflow-hidden h-[100dvh] w-full px-4 py-4 sm:px-8 sm:py-6"
          title="Tap anywhere to enter with Sound"
        >
          {/* 1. Cyber Grid Matrix Background */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

          {/* 2. Sweeping Cyber Laser Scanning Beam */}
          <motion.div
            animate={{
              y: ["-10vh", "110vh"],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.2,
              ease: "easeInOut",
            }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00f5ff]/60 via-[#8B6CFF]/80 to-transparent shadow-[0_0_20px_#8B6CFF] pointer-events-none z-10"
          />

          {/* 3. Central Ambient Multi-Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-violet-600/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

          {/* 4. Top Unified Cyber Status Bar (Never overlaps, 100% responsive) */}
          <div className="w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-wider relative z-20 shrink-0">
            {/* Top-Left: OS Diagnostic */}
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-[#8B6CFF] font-semibold">[ CODEXA // OS_v2.4 ]</span>
              <span className="text-zinc-600 hidden md:inline">• NEXT.JS 14</span>
            </div>

            {/* Top-Right: Audio & FPS status */}
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Volume2 className="w-3 h-3 text-[#8B6CFF] animate-pulse shrink-0" />
              <span>ALEXA VOICE: ARMED</span>
              <span className="text-zinc-500 hidden xs:inline">• 60 FPS</span>
            </div>
          </div>

          {/* 5. Center Core Presentation (Perfect optical center across all phones) */}
          <div className="relative flex flex-col items-center justify-center z-20 my-auto py-2 w-full max-w-sm mx-auto">
            {/* Holographic Logo Capsule with Orbital Rings */}
            <div className="relative flex items-center justify-center my-2 sm:my-3">
              {/* Outer Counter-Clockwise Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                className="absolute w-28 h-28 sm:w-40 sm:h-40 rounded-full border border-dashed border-violet-500/35 pointer-events-none"
              />

              {/* Middle Clockwise Neon Cyan Tick Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-cyan-400/30 border-t-cyan-400 pointer-events-none shadow-[0_0_20px_rgba(0,245,255,0.2)]"
              />

              {/* Inner Glowing Hex Accent */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute w-20 h-20 sm:w-32 sm:h-32 rounded-3xl bg-violet-600/25 blur-xl pointer-events-none"
              />

              {/* Logo Core Glass Box */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-20 h-20 sm:w-26 sm:h-26 rounded-2xl overflow-hidden border border-violet-500/50 shadow-[0_0_40px_rgba(108,76,245,0.7)] bg-[#0A0A16] relative p-1 group"
              >
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Codexa Technologies"
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </div>

            {/* Brand Title with High-Tech Metallic Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-2.5 sm:mt-4 text-center"
            >
              <h1 className="font-heading text-xl sm:text-3xl font-extrabold tracking-[0.22em] text-white">
                CODEXA
              </h1>
              <p className="font-heading text-[9px] sm:text-[11px] font-semibold tracking-[0.38em] text-[#8B6CFF] uppercase mt-0.5">
                TECHNOLOGIES
              </p>
            </motion.div>

            {/* Large Futuristic Monospace Digital Percentage */}
            <div className="mt-3.5 sm:mt-5 flex items-baseline justify-center gap-1 font-mono">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#8B6CFF]">%</span>
            </div>

            {/* Precision Laser Fill Progress Bar */}
            <div className="mt-2.5 sm:mt-3 w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/10 p-[1px]">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-violet-600 via-[#8B6CFF] to-[#00f5ff] rounded-full shadow-[0_0_15px_#00f5ff] transition-all duration-75"
              />
            </div>

            {/* Real-Time Cyber Boot Sequence Terminal Line */}
            <div className="mt-2 sm:mt-3 w-full text-center h-5 flex items-center justify-center">
              <span className="font-mono text-[8.5px] sm:text-[10px] tracking-wider text-zinc-400 truncate max-w-[270px] sm:max-w-md px-1">
                {getBootStatus()}
              </span>
            </div>

            {/* Interactive "Click to Enter" Action Pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-3.5 sm:mt-5"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0D0D1F] hover:bg-violet-950/80 border border-violet-500/40 hover:border-violet-400 shadow-[0_0_25px_rgba(108,76,245,0.35)] transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono text-[9.5px] sm:text-[11px] font-semibold text-white tracking-wider sm:tracking-widest uppercase">
                  ENTER WITH SOUND 🔊
                </span>
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00f5ff] group-hover:rotate-12 transition-transform shrink-0" />
              </button>
            </motion.div>
          </div>

          {/* 6. Bottom Security & Tap Guide (Clean single status footer) */}
          <div className="w-full flex flex-col items-center justify-center gap-1.5 font-mono relative z-20 shrink-0">
            <div className="flex items-center gap-2 text-[8px] sm:text-[9.5px] text-zinc-400 tracking-wider">
              <ShieldCheck className="w-3 h-3 text-[#8B6CFF] shrink-0" />
              <span>256-BIT ENCRYPTED</span>
              <span className="text-zinc-600">•</span>
              <Cpu className="w-3 h-3 text-[#00f5ff] shrink-0" />
              <span>INDIA HQ // WORLDWIDE CLIENTS</span>
            </div>

            {/* Tap/Click Helper */}
            <p className="text-[8px] sm:text-[9px] text-zinc-500 tracking-wider animate-pulse">
              [ TAP ANYWHERE TO ENTER ]
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
