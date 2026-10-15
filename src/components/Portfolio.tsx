"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Cpu,
  TrendingUp,
  Smartphone,
  Globe,
  Eye,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./animations/TiltCard";
import BorderBeam from "./animations/BorderBeam";
import TextScramble from "./animations/TextScramble";
import MagneticButton from "./animations/MagneticButton";
import { sounds } from "@/utils/soundEffects";

interface PortfolioProps {
  onSelectProject: (title: string) => void;
}

interface ProjectData {
  id: "chaloji" | "mits-sadhana" | "cafewala";
  name: string;
  shortName: string;
  icon: string;
  pillBadge: string;
  tagline: string;
  subHeader: string;
  videoSrc: string;
  browserUrl: string;
  liveUrl?: string;
  statusBadge: string;
  clientBadge: string;
  headline: string;
  description: string;
  glowGradient: string;
  capabilities: string[];
  techStack: string[];
  architectureDetails: { title: string; desc: string }[];
  impactStats: { stat: string; label: string; desc: string }[];
  metrics: {
    value: string;
    label: string;
    colorClass: string;
  }[];
  appLinks?: { label: string; url: string; badge: string }[];
  ctaTitle: string;
  whatsappMessage: string;
}

const projects: ProjectData[] = [
  {
    id: "chaloji",
    name: "ChaloJi Mobility",
    shortName: "ChaloJi",
    icon: "🚕",
    pillBadge: "Live Web & 2 Apps ↗",
    tagline: "Next-Gen Cab Booking & Smart Mobility Platform",
    subHeader:
      "A high-scale urban mobility and cab booking ecosystem with live GPS tracking, dual Android apps for riders and driver partners, zero surge pricing, outstation rides, and instant dispatch.",
    videoSrc: "/chaloji-demo.mp4",
    browserUrl: "https://chalojii.in",
    liveUrl: "https://chalojii.in/",
    statusBadge: "LIVE IN PRODUCTION",
    clientBadge: "Client: ChaloJi Mobility",
    headline: "Next-Gen Cab Booking & Smart Mobility Ecosystem",
    description:
      "Codexa Technologies engineered ChaloJi from the ground up—powering an end-to-end multi-tier mobility platform with dual Android apps (User Rider App + Driver Partner App), real-time live GPS tracking, zero surge pricing algorithms, and seamless outstation & wedding convoy bookings.",
    glowGradient: "from-emerald-500/25 via-teal-500/20 to-cyan-500/25",
    capabilities: [
      "Dual Mobile Apps (Rider App & Driver Partner App)",
      "Real-time GPS Tracking & Instant Dispatch Engine",
      "Zero-Surge Transparent Pricing Engine",
      "Outstation, Airport & Baraat Fleet Booking",
    ],
    techStack: [
      "Next.js 14",
      "React Native / Android",
      "Node.js",
      "MongoDB",
      "Socket.io / Live GPS",
      "Google Maps API",
      "Razorpay / UPI",
      "Cloud Architecture",
    ],
    architectureDetails: [
      {
        title: "Dual Native Android Ecosystem",
        desc: "Engineered separate Rider and Driver Partner applications with background geolocation and low-latency socket pings.",
      },
      {
        title: "Dynamic Fair-Price Algorithm",
        desc: "Custom zero-surge calculation engine ensuring fair earnings for drivers and transparent flat rates for passengers.",
      },
      {
        title: "Real-time Telemetry & Dispatch",
        desc: "Sub-2-second automated nearest-driver assignment with live vehicle position rendering on interactive maps.",
      },
    ],
    impactStats: [
      {
        stat: "1,420+",
        label: "Verified 5-Star Reviews",
        desc: "Consistently rated 4.9/5 by daily commuters and outstation riders.",
      },
      {
        stat: "0% Surge",
        label: "Fair Pricing Guarantee",
        desc: "Eliminated arbitrary surge charges, winning high consumer trust across UP.",
      },
      {
        stat: "100%",
        label: "Digital UPI Payouts",
        desc: "Instant automated daily settlement cycle directly to driver bank accounts.",
      },
    ],
    metrics: [
      {
        value: "1,420+",
        label: "5-Star Rides & Reviews",
        colorClass: "text-emerald-400",
      },
      {
        value: "0% Surge",
        label: "Fair & Transparent Pricing",
        colorClass: "text-cyan-400",
      },
    ],
    appLinks: [
      {
        label: "ChaloJi User App",
        url: "https://play.google.com/store/apps/details?id=com.rohan3543.chaloji",
        badge: "Play Store (Rider)",
      },
      {
        label: "ChaloJi Driver App",
        url: "https://play.google.com/store/apps/details?id=com.chaloji.driver",
        badge: "Play Store (Driver)",
      },
    ],
    ctaTitle: "ChaloJi - Smart Cab & Mobility Platform",
    whatsappMessage:
      "Hello Codexa Technologies, I saw your live work on ChaloJi (https://chalojii.in) and want to build a ride-booking or mobility platform.",
  },
  {
    id: "mits-sadhana",
    name: "MITS Sadhana",
    shortName: "MITS Sadhana",
    icon: "🕉️",
    pillBadge: "Live Production ↗",
    tagline: "Vedic Spiritual Ecosystem & Ritual Booking",
    subHeader:
      "Where modern software engineering meets sacred Vedic traditions. A complete sanctuary featuring verified Pandit bookings, doorstep sacred Samagri delivery, 24/7 AI Spiritual Mentorship, and personalized daily Sadhana.",
    videoSrc: "/mits-sadhana.mp4",
    browserUrl: "https://mitssadhana.in",
    liveUrl: "https://mitssadhana.in/",
    statusBadge: "LIVE IN PRODUCTION",
    clientBadge: "Client: MITS Sadhana",
    headline: "AI-Powered Vedic Spiritual Platform & Pandit Booking Engine",
    description:
      "Codexa Technologies engineered MITS Sadhana as an end-to-end spiritual technology sanctuary—bringing verified Pandit bookings for Havans & Poojas, doorstep sacred Samagri delivery kits, intelligent 24/7 Vedic AI mentorship, and seamless daily rituals with fast pan-India UPI payments.",
    glowGradient: "from-amber-500/25 via-purple-500/20 to-rose-500/25",
    capabilities: [
      "Online Pandit & Vedic Havan Booking",
      "Doorstep Sacred Samagri Delivery Kit",
      "24/7 AI Spiritual Guide & Shloka Insights",
      "Pan-India Razorpay / UPI Instant Checkout",
    ],
    techStack: [
      "React 19",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI Spiritual Mentor",
      "Razorpay / UPI",
      "Tailwind CSS",
      "Cloud CDN",
    ],
    architectureDetails: [
      {
        title: "24/7 Vedic AI Knowledge Engine",
        desc: "Custom intelligent conversational assistant providing authentic Vedic shloka explanations and ritual guidance.",
      },
      {
        title: "Verified Pandit Scheduling & Logistics",
        desc: "Automated booking calendar matching certified Purohits with devotee locations and specific auspicious muhurats.",
      },
      {
        title: "Sacred Kit E-Commerce & Delivery",
        desc: "Full checkout pipeline for pure Havan/Puja samagri with multi-tiered delivery tracking and UPI deep-linking.",
      },
    ],
    impactStats: [
      {
        stat: "10,000+",
        label: "Devotees Served Pan-India",
        desc: "Sacred Havans and daily sadhana sessions coordinated seamlessly.",
      },
      {
        stat: "99.98%",
        label: "Platform Reliability",
        desc: "Zero downtime during major auspicious festive peaks and holidays.",
      },
      {
        stat: "<800ms",
        label: "AI Mentor Response",
        desc: "Sub-second spiritual query resolution with contextual references.",
      },
    ],
    metrics: [
      {
        value: "10,000+",
        label: "Devotees & Rituals Coordinated",
        colorClass: "text-amber-400",
      },
      {
        value: "99.98%",
        label: "Platform Uptime & Sub-sec Speed",
        colorClass: "text-emerald-400",
      },
    ],
    ctaTitle: "MITS Sadhana - Vedic Spiritual Tech Platform",
    whatsappMessage:
      "Hello Codexa Technologies, I saw your live work on MITS Sadhana (https://mitssadhana.in) and want to build a high-performance web platform.",
  },
  {
    id: "cafewala",
    name: "Cafewala",
    shortName: "Cafewala",
    icon: "☕",
    pillBadge: "Startup Demo",
    tagline: "High-Speed Hospitality & Quick Commerce Engine",
    subHeader:
      "A high-speed, modern cafe digital ordering and brand experience platform engineered for seamless customer engagement, real-time sync, and rapid checkout.",
    videoSrc: "/cafewala-showcase.mp4",
    browserUrl: "production-build://cafewala.app",
    statusBadge: "LAUNCHED & OPERATING",
    clientBadge: "Client: Cafewala Startup",
    headline: "Next-Gen Hospitality & Cafe Commerce Engine",
    description:
      "Codexa Technologies architected and built Cafewala from the ground up—combining fluid 60fps micro-interactions, instant QR ordering, responsive mobile-first layouts, and rock-solid payment processing to give diners a magical ordering journey.",
    glowGradient: "from-violet-600/30 via-indigo-500/20 to-purple-600/30",
    capabilities: [
      "Interactive Visual Menu Experience",
      "Instant UPI & QR Contactless Flow",
      "Sub-second Load Times on 4G/5G",
      "Real-time Kitchen & Table Routing",
    ],
    techStack: [
      "Next.js 14",
      "React 19",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Razorpay / UPI",
      "Vercel Edge",
    ],
    architectureDetails: [
      {
        title: "60 FPS Fluid Ordering Experience",
        desc: "Ultra-optimized client state with zero layout shifts, dynamic customization modifiers, and instant cart updates.",
      },
      {
        title: "QR Table Routing & Kitchen KDS",
        desc: "Scan-to-order logic that routes specific dish tickets straight to the bar and kitchen displays without staff delay.",
      },
      {
        title: "Frictionless UPI Deep-Linking",
        desc: "One-tap payment via PhonePe, Google Pay, and Paytm directly from the browser without downloading an app.",
      },
    ],
    impactStats: [
      {
        stat: "3.4x",
        label: "Faster Table Turnaround",
        desc: "Reduced ordering and billing delays during peak weekend rushes.",
      },
      {
        stat: "99.98%",
        label: "Order Execution Reliability",
        desc: "Rock-solid uptime across busy restaurant service windows.",
      },
      {
        stat: "+38%",
        label: "Dessert & Add-on Upsells",
        desc: "High-resolution visual modifier cards drove significantly larger basket sizes.",
      },
    ],
    metrics: [
      {
        value: "3.4x",
        label: "Faster Table Ordering",
        colorClass: "text-silver-violet",
      },
      {
        value: "99.98%",
        label: "Platform Reliability",
        colorClass: "text-emerald-400",
      },
    ],
    ctaTitle: "Cafewala - Startup Web Platform",
    whatsappMessage:
      "Hello Codexa Technologies, I saw your work on Cafewala and want to build something similar.",
  },
];

export default function Portfolio({ onSelectProject }: PortfolioProps) {
  const [activeId, setActiveId] = useState<"chaloji" | "mits-sadhana" | "cafewala">("chaloji");
  const [activeDetailTab, setActiveDetailTab] = useState<"features" | "architecture" | "impact">("features");
  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const showcaseContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Auto-play when active project changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [activeId]);

  // Keyboard shortcut listener (Space to pause/play, M to mute, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && ["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName)) return;

      const workEl = document.getElementById("work");
      if (!workEl) return;
      const rect = workEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!inView) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    sounds.playClick();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    sounds.playClick();
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
    sounds.playClick();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percentage * duration;
    setCurrentTime(percentage * duration);
    sounds.playClick();
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const switchToProject = (id: "chaloji" | "mits-sadhana" | "cafewala") => {
    setActiveId(id);
    sounds.playClick();
    if (showcaseContainerRef.current) {
      showcaseContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const cleanDomain = activeProject.liveUrl
    ? activeProject.liveUrl.replace("https://", "").replace(/\/$/, "")
    : "";

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="work" className="relative py-20 sm:py-28 bg-[#05050A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-violet-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[#8B6CFF] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 sm:mb-4 shadow-[0_0_20px_rgba(108,76,245,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6CFF]" />
            <span>Interactive Client Showcase</span>
          </motion.div>

          <motion.h2
            key={activeProject.id + "-title"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-5"
          >
            <TextScramble text="Engineered by Codexa:" />{" "}
            <span className="text-silver-violet">{activeProject.name}</span>
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeProject.id + "-sub"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm sm:text-lg text-[#A1A1B5] leading-relaxed max-w-2xl px-2"
            >
              {activeProject.subHeader}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Project Switcher Dock */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0B0B18]/90 border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(108,76,245,0.25)]">
            {projects.map((project) => {
              const isActive = activeProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => switchToProject(project.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-[0_0_25px_rgba(108,76,245,0.6)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="text-base sm:text-lg">{project.icon}</span>
                  <span className="tracking-wide font-medium">{project.shortName}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white border border-white/30"
                        : "bg-white/[0.06] text-zinc-400"
                    }`}
                  >
                    {project.pillBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flagship Video Showcase Container */}
        <div ref={showcaseContainerRef} className="max-w-5xl mx-auto relative">
          {/* Dynamic Ambient Ambilight Glow behind card matching project accent */}
          <div
            className={`absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r ${activeProject.glowGradient} blur-3xl opacity-60 transition-all duration-700 pointer-events-none`}
          />

          <TiltCard maxTilt={3} glare={true} className="w-full relative z-10">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A16] border border-violet-500/40 shadow-[0_0_70px_rgba(108,76,245,0.35)] backdrop-blur-2xl">
              {/* Traveling BorderBeam Laser */}
              <BorderBeam size={260} duration={6} colorFrom="#8B6CFF" colorTo="#FFFFFF" />

              {/* Browser Window Chrome Top Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#0D0D1C] border-b border-white/[0.08]">
                {/* Traffic Light Dots & URL */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />

                  {activeProject.liveUrl ? (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="text-xs font-mono text-violet-300 hover:text-white transition-colors ml-2 hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/[0.05] hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/40 group"
                      title="Open Live Website"
                    >
                      <span>{activeProject.browserUrl}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8B6CFF]" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline">
                      {activeProject.browserUrl}
                    </span>
                  )}
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                    {activeProject.statusBadge}
                  </span>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-violet-200 hover:text-white px-2 py-0.5 rounded bg-violet-600/30 hover:bg-violet-600/50 border border-violet-400/40 transition-colors ml-1 shadow-[0_0_10px_rgba(108,76,245,0.4)]"
                    >
                      <span>VISIT LIVE</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {/* Video Playback Controls in Top Right */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1 sm:p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                    aria-label="Toggle playback"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1 sm:p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    aria-label="Toggle audio"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1 sm:p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen (F)"
                    aria-label="Fullscreen view"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Video Player Display */}
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group">
                <video
                  ref={videoRef}
                  key={activeProject.videoSrc}
                  src={activeProject.videoSrc}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full h-full object-contain bg-black cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Overlay Floating Play Button when paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(108,76,245,0.8)] hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />
                    </div>
                  </div>
                )}

                {/* Video Scrubber & Time Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 sm:p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div
                    onClick={handleSeek}
                    className="w-full h-1.5 sm:h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
                    title="Click to seek"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#8B6CFF] to-cyan-400 rounded-full relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#8B6CFF]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-300 pt-1.5 px-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </span>
                    <span className="text-zinc-400 hidden sm:inline">
                      ⌨️ Space: Pause • M: Mute • F: Fullscreen
                    </span>
                  </div>
                </div>
              </div>

              {/* Case Study Meta Breakdown */}
              <div className="p-5 sm:p-8 lg:p-10 bg-[#0B0B18] border-t border-white/[0.08]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column: Product Info & Deliverables */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold bg-violet-500/20 text-[#8B6CFF] border border-violet-500/30">
                        {activeProject.clientBadge}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        {activeProject.statusBadge}
                      </span>
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold bg-violet-600/30 text-violet-200 border border-violet-400/40 hover:bg-violet-600/50 transition-colors inline-flex items-center gap-1"
                        >
                          <span>{cleanDomain}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {activeProject.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
                      {activeProject.description}
                    </p>

                    {/* Interactive Sub-Tabs for Case Study Exploration */}
                    <div className="pt-2 border-t border-white/[0.08]">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-3.5 overflow-x-auto pb-1">
                        <button
                          onClick={() => {
                            setActiveDetailTab("features");
                            sounds.playClick();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                            activeDetailTab === "features"
                              ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(108,76,245,0.4)]"
                              : "bg-white/[0.04] text-zinc-400 hover:text-white"
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-[#8B6CFF]" />
                          <span>Core Features</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveDetailTab("architecture");
                            sounds.playClick();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                            activeDetailTab === "architecture"
                              ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(108,76,245,0.4)]"
                              : "bg-white/[0.04] text-zinc-400 hover:text-white"
                          }`}
                        >
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Tech Architecture</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveDetailTab("impact");
                            sounds.playClick();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                            activeDetailTab === "impact"
                              ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(108,76,245,0.4)]"
                              : "bg-white/[0.04] text-zinc-400 hover:text-white"
                          }`}
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Client ROI & Impact</span>
                        </button>
                      </div>

                      {/* Tab 1: Core Capabilities */}
                      {activeDetailTab === "features" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                          {activeProject.capabilities.map((cap, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6CFF] shrink-0" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tab 2: Architecture Details */}
                      {activeDetailTab === "architecture" && (
                        <div className="space-y-2.5 animate-fade-in">
                          {activeProject.architectureDetails.map((item, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs"
                            >
                              <div className="font-semibold text-white font-heading mb-0.5">
                                {item.title}
                              </div>
                              <div className="text-zinc-400 leading-relaxed text-[11px]">
                                {item.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tab 3: Impact Stats */}
                      {activeDetailTab === "impact" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 animate-fade-in">
                          {activeProject.impactStats.map((item, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
                            >
                              <div className="font-heading font-bold text-lg text-silver-violet mb-0.5">
                                {item.stat}
                              </div>
                              <div className="text-[11px] font-semibold text-white mb-0.5">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-zinc-400 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* App Links (for projects with Android / iOS mobile apps like ChaloJi) */}
                    {activeProject.appLinks && activeProject.appLinks.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3 text-emerald-400" />
                          <span>Google Play Store Mobile Ecosystem</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.appLinks.map((app, idx) => (
                            <a
                              key={idx}
                              href={app.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => sounds.playClick()}
                              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors group cursor-pointer"
                            >
                              <span>{app.label}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                                {app.badge}
                              </span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Technology Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {activeProject.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key Stats & CTA */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-5 lg:border-l lg:border-white/[0.08] lg:pl-8 pt-2 lg:pt-0">
                    {/* Metrics Box */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {activeProject.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
                        >
                          <div
                            className={`font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 ${metric.colorClass}`}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Block */}
                    <div className="space-y-2.5 sm:space-y-3">
                      {activeProject.liveUrl && (
                        <MagneticButton strength={0.2} className="w-full">
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick()}
                            className="w-full violet-glow-btn btn-shimmer py-3.5 sm:py-4 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer text-center block shadow-[0_0_25px_rgba(108,76,245,0.4)]"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Visit Live Website ({cleanDomain})</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </MagneticButton>
                      )}

                      <MagneticButton strength={0.15} className="w-full">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onSelectProject(activeProject.ctaTitle);
                          }}
                          className={`w-full py-3.5 sm:py-4 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            activeProject.liveUrl
                              ? "bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-violet-500/50 text-white"
                              : "violet-glow-btn btn-shimmer text-white shadow-[0_0_25px_rgba(108,76,245,0.4)]"
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Build Your Platform With Codexa</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </MagneticButton>

                      <a
                        href={`https://wa.me/919580849709?text=${encodeURIComponent(
                          activeProject.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="w-full py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-violet-500/40 text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-all text-center block"
                      >
                        Discuss on WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* All 3 Flagship Projects at a Glance Bento Grid */}
        <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8B6CFF] mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Production Portfolio Catalog</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                All Client Builds at a Glance
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-mono max-w-xs">
              Click any project card to jump straight into its interactive video showcase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {projects.map((project) => {
              const isCurrent = activeProject.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => switchToProject(project.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-[#0E0E22] border-2 border-violet-500 shadow-[0_0_35px_rgba(108,76,245,0.4)]"
                      : "bg-[#0A0A16]/80 hover:bg-[#0E0E22]/90 border border-white/[0.08] hover:border-violet-500/40"
                  }`}
                >
                  <div>
                    {/* Header: Icon & Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {project.icon}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{project.statusBadge}</span>
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white group-hover:text-silver-violet transition-colors mb-1.5">
                      {project.name}
                    </h4>

                    <p className="text-xs text-[#A1A1B5] leading-relaxed mb-4 line-clamp-3">
                      {project.subHeader}
                    </p>

                    {/* Tech Tags preview */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-500">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span
                      className={`font-heading font-semibold flex items-center gap-1.5 ${
                        isCurrent ? "text-violet-300" : "text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isCurrent ? "Playing in Cinema" : "Watch Demo"}</span>
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                        }}
                        className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
