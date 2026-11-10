"use client";

import { useEffect, useState } from "react";

interface Meteor {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function MeteorShower({ count = 18 }: { count?: number }) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    // Generate randomized meteors across the viewport
    const generated: Meteor[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 80) - 10, // -10% to 70%
      left: Math.floor(Math.random() * 95) + 5, // 5% to 100%
      delay: Math.floor(Math.random() * 8) + Math.random() * 2, // 0 to 10s
      duration: Math.floor(Math.random() * 3) + 2.5, // 2.5 to 5.5s
      size: Math.floor(Math.random() * 120) + 140, // tail length 140px to 260px
    }));
    setMeteors(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-[1.5px] rounded-full opacity-0 pointer-events-none animate-meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            width: `${meteor.size}px`,
            background:
              meteor.id % 2 === 0
                ? "linear-gradient(to right, rgba(139, 108, 255, 0.95), rgba(108, 76, 245, 0.4), transparent)"
                : "linear-gradient(to right, rgba(0, 245, 255, 0.95), rgba(139, 108, 255, 0.4), transparent)",
            boxShadow:
              meteor.id % 2 === 0
                ? "0 0 12px 1px rgba(139, 108, 255, 0.8)"
                : "0 0 12px 1px rgba(0, 245, 255, 0.8)",
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
            animationIterationCount: "infinite",
            transform: "rotate(215deg) translateX(0)",
          }}
        >
          {/* Glowing head of meteor */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: meteor.id % 2 === 0 ? "#C4B5FD" : "#E0F2FE",
              boxShadow:
                meteor.id % 2 === 0
                  ? "0 0 15px 3px #8B6CFF"
                  : "0 0 15px 3px #00F5FF",
            }}
          />
        </span>
      ))}

      <style jsx>{`
        @keyframes meteor {
          0% {
            opacity: 0;
            transform: rotate(215deg) translateX(0);
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(215deg) translateX(-900px);
          }
        }
        .animate-meteor {
          animation-name: meteor;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}

