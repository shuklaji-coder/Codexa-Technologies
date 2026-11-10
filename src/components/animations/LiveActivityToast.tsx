"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timeAgo: string;
  badge: string;
  badgeColor: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "act-0",
    icon: "📡",
    title: "LogixFleet IoT Telemetry Live",
    description: "60 FPS Flutter & backend telemetry app running with zero crashes in production.",
    timeAgo: "2m ago",
    badge: "MOBILE & IOT",
    badgeColor: "bg-cyan-500/10 text-[#00F5FF] border-cyan-500/30",
  },
  {
    id: "act-1",
    icon: "🚀",
    title: "Shipped to Google Play Store",
    description: "ChaloJi Driver Partner App v2.4 live in production with zero-surge GPS telemetry.",
    timeAgo: "2m ago",
    badge: "MOBILE APP",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "act-2",
    icon: "🕉️",
    title: "Vedic AI Mentorship Live",
    description: "MITS Sadhana spiritual sanctuary deployed with pan-India UPI payments.",
    timeAgo: "8m ago",
    badge: "WEB & AI",
    badgeColor: "bg-purple-500/10 text-[#8B6CFF] border-purple-500/30",
  },
  {
    id: "act-3",
    icon: "☕",
    title: "Cafewala QR Engine Deployed",
    description: "Sub-second contactless ordering & kitchen KDS router live in production.",
    timeAgo: "14m ago",
    badge: "ECOMMERCE",
    badgeColor: "bg-cyan-500/10 text-[#00F5FF] border-cyan-500/30",
  },
  {
    id: "act-4",
    icon: "⚡",
    title: "Core Web Vitals 99/100",
    description: "Lighthouse verified sub-380ms Largest Contentful Paint across all mobile tests.",
    timeAgo: "22m ago",
    badge: "PERFORMANCE",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "act-5",
    icon: "⭐",
    title: "5.0 ★ Client Review Verified",
    description: "Founding team verified 100% full GitHub repository handover with zero lock-in.",
    timeAgo: "35m ago",
    badge: "TRUST VERIFIED",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
];

export default function LiveActivityToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast 5 seconds after page load
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    // Auto rotate every 16 seconds
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 900);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  const current = ACTIVITIES[currentIndex];

  if (dismissed) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-30 max-w-[320px] sm:max-w-sm pointer-events-auto select-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#090915]/95 border border-violet-500/30 hover:border-violet-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden group"
          >
            {/* Top Glowing Laser Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8B6CFF] via-[#00F5FF] to-transparent" />

            <div className="flex items-start gap-3">
              {/* Icon Box */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-lg shrink-0 shadow-[0_0_15px_rgba(108,76,245,0.25)]">
                {current.icon}
              </div>

              {/* Text Body */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {current.timeAgo}
                  </span>
                </div>

                <h4 className="font-heading text-xs sm:text-[13px] font-bold text-white truncate mb-0.5">
                  {current.title}
                </h4>

                <p className="text-[11px] text-[#A1A1B5] leading-relaxed line-clamp-2">
                  {current.description}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  try {
                    sounds.playClick();
                  } catch {}
                  setIsVisible(false);
                  setDismissed(true);
                }}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

