"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnce?: boolean;
  speed?: number; // duration per step in ms (default 30)
  scrambleDuration?: number; // total duration in ms
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01010101XYZ_";

export default function TextScramble({
  text,
  className = "",
  triggerOnce = true,
  speed = 30,
  scrambleDuration = 700,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: triggerOnce, margin: "-30px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || (triggerOnce && hasAnimated.current)) return;
    hasAnimated.current = true;

    const chars = text.split("");
    const length = chars.length;
    let iteration = 0;
    const totalIterations = Math.max(10, Math.floor(scrambleDuration / speed));

    const interval = setInterval(() => {
      setDisplayText(() =>
        chars
          .map((char, index) => {
            if (char === " ") return " ";
            const progress = iteration / totalIterations;
            if (index / length < progress) {
              return char;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed, scrambleDuration, triggerOnce]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
}
