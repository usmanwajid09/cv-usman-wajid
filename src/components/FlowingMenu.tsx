import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MenuItem {
  label: string;
  target: string;
  isActive: boolean;
  motto: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
  onItemClick: (target: string) => void;
}

export const FlowingMenu: React.FC<FlowingMenuProps> = ({ items, onItemClick }) => {
  return (
    <div className="w-full flex flex-col items-stretch divide-y divide-[#D7E2EA]/10 border-y border-[#D7E2EA]/10">
      {items.map((item) => (
        <FlowingMenuItem 
          key={item.label} 
          item={item} 
          onClick={() => onItemClick(item.target)} 
        />
      ))}
    </div>
  );
};

interface FlowingMenuItemProps {
  item: MenuItem;
  onClick: () => void;
}

const FlowingMenuItem: React.FC<FlowingMenuItemProps> = ({ item, onClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position within the row container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring settings for organic physics lag
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative w-full py-8 md:py-10 px-4 flex items-center justify-between cursor-pointer overflow-hidden group select-none transition-colors duration-300 hover:bg-[#D7E2EA]/2"
    >
      {/* 1. Main Static Text Content (Z-indexed above marquee) */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 pointer-events-none">
        <span className="font-black uppercase text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-none tracking-tighter text-[#D7E2EA]/40 group-hover:text-white transition-colors duration-300">
          {item.label}
        </span>
        <span className="hidden md:inline text-xs uppercase tracking-widest text-[#D7E2EA]/20 group-hover:text-[#D7E2EA]/65 transition-colors duration-300 font-medium">
          {item.motto}
        </span>
      </div>

      {/* 2. Floating Flowing Marquee Element (Following Mouse coordinates) */}
      <motion.div
        className="absolute pointer-events-none z-0 rounded-2xl overflow-hidden bg-gradient-to-r from-[#B600A8]/85 to-[#7621B0]/85 border border-white/20 shadow-2xl flex items-center h-[90px] sm:h-[110px]"
        style={{
          x: springX,
          y: springY,
          width: "clamp(240px, 35vw, 450px)",
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {/* Double scrolling text track to make the infinite loop seamless */}
        <div className="flex w-[200%] shrink-0 select-none animate-marquee py-2 items-center">
          <div className="flex justify-around w-1/2 text-white font-black uppercase tracking-widest text-lg sm:text-2xl">
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
          </div>
          <div className="flex justify-around w-1/2 text-white font-black uppercase tracking-widest text-lg sm:text-2xl">
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
            <span>{item.label} &bull;&nbsp;</span>
          </div>
        </div>
      </motion.div>

      {/* Glow highlight vector on the right side of the row */}
      <div className="relative z-10 text-[#D7E2EA]/20 group-hover:text-[#D7E2EA] transition-all duration-300 transform group-hover:translate-x-2 pointer-events-none">
        <svg 
          className="w-8 h-8 sm:w-10 sm:h-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M17 8l4 4m0 0l-4 4m4-4H3" 
          />
        </svg>
      </div>

      {/* Injecting CSS keyframe for sliding loop animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
