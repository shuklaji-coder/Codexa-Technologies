"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterNumberProps {
  value: string;
  className?: string;
}

export default function CounterNumber({ value, className = "" }: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Check if value is numeric or has suffixes like 50+, 100%, 5+, 24/7
    if (value === "24/7") {
      setDisplayValue("24/7");
      return;
    }

    const numericMatch = value.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[0], 10);
    const suffix = value.replace(/\d+/, "");

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // EaseOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * targetNumber);

      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
