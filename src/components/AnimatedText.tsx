import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <span ref={containerRef} className={`${className} inline-block`}>
      {chars.map((char, index) => {
        // Calculate the range of scroll progress where this character reveals
        const start = index / totalChars;
        const end = Math.min(1, (index + 1) / totalChars);
        return (
          <Character key={index} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Character>
        );
      })}
    </span>
  );
};

interface CharacterProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  
  return (
    <span className="relative inline-block whitespace-pre">
      {/* Invisible placeholder for layout spacing */}
      <span className="opacity-0 pointer-events-none">{children}</span>
      {/* Absolute positioned animated span that transitions from opacity 0.2 to 1 */}
      <motion.span style={{ opacity }} className="absolute top-0 left-0 select-none">
        {children}
      </motion.span>
    </span>
  );
};
