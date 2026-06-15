import React from "react";

const row1Skills = [
  "8086 Assembly", 
  "C++", 
  "Python", 
  "TensorFlow", 
  "React", 
  "TypeScript", 
  "Node.js", 
  "Express", 
  "PostgreSQL", 
  "SQL Server"
];

const row2Skills = [
  "Machine Learning", 
  "Computer Vision", 
  "NLP", 
  "System Architecture", 
  "Data Structures", 
  "OOP", 
  "Flutter", 
  "Dart", 
  "MongoDB", 
  "Git"
];

export const MovingSkills: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4 relative z-10 py-6 max-w-6xl mx-auto overflow-hidden">
      {/* Left-scrolling row */}
      <MarqueeRow items={row1Skills} direction="left" speed={24} />
      
      {/* Right-scrolling row */}
      <MarqueeRow items={row2Skills} direction="right" speed={28} />
      
      {/* Fade out edges on desktop for a premium layout feel */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0C0C0C] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0C0C0C] to-transparent pointer-events-none z-20" />

      {/* Inject CSS Keyframes for infinite scroll */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed, 20s) linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed, 20s) linear infinite;
        }
        /* Pause scroll on hover */
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed }) => {
  // Double list elements for seamless looping
  const doubledItems = [...items, ...items];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="w-full flex overflow-hidden py-1">
      <div
        className={`marquee-track flex gap-4 shrink-0 ${animationClass}`}
        style={{
          // Pass speed custom property
          ["--speed" as any]: `${speed}s`,
          width: "max-content",
        }}
      >
        {doubledItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C]/90 text-[#D7E2EA] font-semibold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all duration-300 hover:border-[#B600A8]/40 hover:bg-[#B600A8]/5 hover:scale-[1.03]"
          >
            {/* Glowing brand dot indicator */}
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
