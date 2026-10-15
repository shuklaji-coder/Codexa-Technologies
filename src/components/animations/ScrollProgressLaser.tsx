"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressLaser() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none origin-left overflow-hidden">
      {/* Background track subtle glow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Main Traveling Neon Laser Beam */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#6C4CF5] via-[#8B6CFF] to-white origin-left relative shadow-[0_0_12px_rgba(139,108,255,0.85)]"
        style={{ scaleX }}
      >
        {/* Glowing Comet Head at the Leading Edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_#FFFFFF,0_0_30px_#8B6CFF,0_0_45px_#6C4CF5] transform translate-x-1/2">
          <div className="absolute inset-0 rounded-full bg-[#8B6CFF] animate-ping opacity-75" />
        </div>
      </motion.div>
    </div>
  );
}
