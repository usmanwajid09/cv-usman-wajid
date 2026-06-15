import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Parallax3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum degrees of rotation
}

export const Parallax3D: React.FC<Parallax3DProps> = ({
  children,
  className = "",
  maxTilt = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions relative to the screen
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out mouse tracking
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Transform mouse position into rotation values
  // Since rotateX maps to vertical mouse position, we compute based on y
  // Since rotateY maps to horizontal mouse position, we compute based on x
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Transformed values for the shine/glare effect position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Compute normalized mouse coordinates between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ${className}`}
    >
      {/* Interactive Glare overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle 350px at ${gx} ${gy}, rgba(215, 226, 234, 0.15) 0%, transparent 80%)`
          ),
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* 3D depth wrapper for child contents */}
      <div 
        style={{ 
          transform: isHovered ? "translateZ(15px)" : "translateZ(0px)",
          transition: "transform 0.3s ease",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
