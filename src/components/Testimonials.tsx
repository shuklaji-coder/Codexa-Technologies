"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/agencyData";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/utils/soundEffects";
import BorderBeam from "@/components/animations/BorderBeam";

interface TestimonialsProps {
  onOpenQuoteModal?: () => void;
}

export default function Testimonials({ onOpenQuoteModal }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Video Player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(16);
  const [showControls, setShowControls] = useState(false);

  // Carousel navigation
  const prev = () => {
    try {
      sounds.playClick();
    } catch {}
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? testimonialsData.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    try {
      sounds.playClick();
    } catch {}
    setCurrentIndex((prevIdx) =>
      prevIdx === testimonialsData.length - 1 ? 0 : prevIdx + 1
    );
  };

  // Subtle auto slide every 8 seconds for text testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIdx) =>
        prevIdx === testimonialsData.length - 1 ? 0 : prevIdx + 1
      );
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  // Video playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    try {
      sounds.playClick();
    } catch {}

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback with mute if autoplay policy restricts
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
        }
      });
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    try {
      sounds.playClick();
    } catch {}
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-[#05050A] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient neon glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3.5 sm:mb-4 shadow-[0_0_20px_rgba(108,76,245,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Client Endorsements & Reviews</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-5">
            Trusted by Visionary Founders &{" "}
            <span className="text-silver-violet">Technical Leaders.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2">
            Watch real client video feedback and explore endorsements from startups and enterprises scaled by Techlifa Technologies.
          </p>
        </div>

        {/* Dual Grid: Featured Video Review (Left) + Written Carousel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ==================== 1. FEATURED VIDEO REVIEW CARD (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative flex flex-col justify-between overflow-hidden group h-full">
              <BorderBeam size={280} duration={12} colorFrom="#8B6CFF" colorTo="#00F5FF" />

              <div>
                {/* Video Card Header Pill */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span>CLIENT VIDEO REVIEW</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                    <Video className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span className="text-zinc-300">Live Recording</span>
                  </div>
                </div>

                {/* Video Player Container */}
                <div
                  ref={videoContainerRef}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                  onClick={togglePlay}
                  className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer group/video aspect-[9/13] sm:aspect-[9/12] md:aspect-[4/3] lg:aspect-[9/13] max-h-[460px] w-full flex items-center justify-center select-none"
                >
                  {/* HTML5 Video Element */}
                  <video
                    ref={videoRef}
                    src="/client-review.mp4"
                    playsInline
                    preload="metadata"
                    loop
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark subtle overlay when paused for contrast */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity" />
                  )}

                  {/* Big Center Play / Pause Floating Button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                      isPlaying && !showControls ? "opacity-0 scale-90" : "opacity-100 scale-100"
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-[0_0_35px_rgba(108,76,245,0.7)] border border-violet-400/50 backdrop-blur-md group-hover/video:scale-110 transition-transform">
                      {isPlaying ? (
                        <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                      ) : (
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Top-Right Floating Unmute Action Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-black/80 hover:bg-violet-950/80 border border-white/20 hover:border-violet-400 text-white text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all cursor-pointer"
                    title={isMuted ? "Click to unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-zinc-200">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span className="text-emerald-300">Sound ON</span>
                      </>
                    )}
                  </button>

                  {/* Bottom Video Control Bar Overlay */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
                      showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Scrubber Progress Bar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={duration || 16}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#8B6CFF]"
                      />
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="hover:text-white transition-colors"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="hover:text-white transition-colors"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                        <span className="text-[10px] text-zinc-400">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="hover:text-white transition-colors"
                        aria-label="Toggle Fullscreen"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Review Details & Trust Badge */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs font-mono font-bold text-white ml-1.5">5.0 / 5.0</span>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Client</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-3">
                  &ldquo;Direct feedback from our partner on client engineering, agile development sprints, and delivering an unstoppable product with Techlifa Technologies.&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>100% Authentic Review</span>
                  </span>
                  <span className="text-[#8B6CFF]">Client Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== 2. WRITTEN TESTIMONIALS CAROUSEL (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="glass-card rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-full flex flex-col justify-between">
              {/* Giant Background Quote Watermark */}
              <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-20 h-20 sm:w-28 sm:h-28 text-white/[0.03] pointer-events-none" />

              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col justify-between"
                  >
                    {/* Star Rating & Project Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>

                      <span className="text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-[#8B6CFF] border border-violet-500/20">
                        Project: {current.projectType}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="font-heading text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed mb-8 sm:mb-10">
                      &ldquo;{current.content}&rdquo;
                    </blockquote>

                    {/* Client Profile */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-violet-500/40 shrink-0">
                        <Image
                          src={current.avatar}
                          alt={current.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col">
                        <h4 className="font-heading text-base sm:text-lg font-bold text-white">
                          {current.name}
                        </h4>
                        <p className="text-xs text-[#8B6CFF] font-medium">
                          {current.role}
                        </p>
                        <p className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-0.5">
                          {current.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls & Micro Proof Highlights */}
              <div className="pt-8 mt-6 border-t border-white/[0.06]">
                <div className="flex items-center justify-between px-1">
                  {/* Slide Indicator Dots */}
                  <div className="flex items-center gap-2">
                    {testimonialsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          try {
                            sounds.playClick();
                          } catch {}
                          setCurrentIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? "w-8 bg-violet-500 shadow-[0_0_10px_#8B6CFF]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={prev}
                      className="p-2.5 sm:p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-violet-500 hover:bg-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="p-2.5 sm:p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-violet-500 hover:bg-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* 3 Quick Proof Highlights */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-white/[0.06] text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="font-heading font-bold text-white text-xs sm:text-sm">100%</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mt-0.5">Code Handover</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="font-heading font-bold text-emerald-400 text-xs sm:text-sm">&lt;450ms</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mt-0.5">Page Load Speed</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="font-heading font-bold text-[#8B6CFF] text-xs sm:text-sm">5.0 ★</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mt-0.5">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
