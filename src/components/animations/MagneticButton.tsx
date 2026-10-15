"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How far the button follows cursor (default 0.35)
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic pull and release
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: isTouchDevice ? 0 : springX,
        y: isTouchDevice ? 0 : springY,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
