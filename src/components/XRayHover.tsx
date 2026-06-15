import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface XRayHoverProps {
  baseImage: string;
  revealImage: string;
  className?: string;
  altText?: string;
}

export const XRayHover: React.FC<XRayHoverProps> = ({
  baseImage,
  revealImage,
  className = "",
  altText = "Interactive Profile Image",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for local mouse coordinates relative to container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Convert coordinate values directly to percentage strings or pixel strings for CSS clip-path
  const clipPath = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `circle(${isHovered ? "110px" : "0px"} at ${x}px ${y}px)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden cursor-crosshair rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/15 shadow-2xl group ${className}`}
      style={{
        touchAction: "none",
      }}
    >
      {/* Base Image (Shown under normal conditions) */}
      <img
        src={baseImage}
        alt={altText}
        className="w-full h-auto object-cover select-none pointer-events-none transition-filter duration-500 group-hover:brightness-90"
        loading="lazy"
      />

      {/* Reveal Image (Shown under the X-Ray spotlight) */}
      <motion.div
        className="absolute inset-0 top-0 left-0 w-full h-full select-none pointer-events-none"
        style={{
          clipPath,
        }}
      >
        <img
          src={revealImage}
          alt={`${altText} Reveal`}
          className="w-full h-full object-cover filter saturate-150 contrast-125 brightness-110 scale-[1.01]"
        />
        
        {/* Futuristic grid overlay inside the X-Ray circle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(182,0,168,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(182,0,168,0.1)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none mix-blend-overlay" />
      </motion.div>

      {/* Interactive Floating Glow ring following mouse */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none rounded-full border border-dashed border-[#B600A8]/80 mix-blend-screen bg-[#B600A8]/10"
        style={{
          x: smoothX,
          y: smoothY,
          width: 220,
          height: 220,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Crosshair target details inside the ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#B600A8]" />
          <div className="w-10 h-[1px] bg-[#B600A8]/40 absolute" />
          <div className="h-10 w-[1px] bg-[#B600A8]/40 absolute" />
        </div>
      </motion.div>
    </div>
  );
};
