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

  const words = text.split(" ");
  const totalChars = text.length;

  let globalCharIndex = 0;

  return (
    <span ref={containerRef} className={`${className} inline-block`}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        const wordElement = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const charIdx = globalCharIndex++;
              const start = charIdx / totalChars;
              const end = Math.min(1, (charIdx + 1) / totalChars);
              return (
                <Character key={charIndex} progress={scrollYProgress} range={[start, end]}>
                  {char}
                </Character>
              );
            })}
            {wordIndex < words.length - 1 && (
              <Character 
                key={`space-${wordIndex}`} 
                progress={scrollYProgress} 
                range={[globalCharIndex / totalChars, Math.min(1, (globalCharIndex + 1) / totalChars)]}
              >
                {" "}
              </Character>
            )}
          </span>
        );

        if (wordIndex < words.length - 1) {
          globalCharIndex++; // increment for space character
        }

        return wordElement;
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
