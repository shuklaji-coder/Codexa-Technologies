"use client";

import { useState, useRef, ReactNode, useEffect } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices to ensure smooth touch scrolling
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isTouchDevice ? "none" : transform,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: isTouchDevice ? "flat" : "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare (only on desktop mouse hover) */}
      {glare && !isTouchDevice && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(168, 125, 255, 0.35) 0%, transparent 60%)`,
            opacity: glarePosition.opacity,
          }}
        />
      )}
    </div>
  );
}
