import React, { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Check if cursor is within padding distance of the element's edge
      const isWithinX = clientX >= rect.left - padding && clientX <= rect.right + padding;
      const isWithinY = clientY >= rect.top - padding && clientY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        const dx = clientX - centerX;
        const dy = clientY - centerY;

        // Apply strength factor
        const tx = dx / strength;
        const ty = dy / strength;

        setTransform(`translate3d(${tx}px, ${ty}px, 0px)`);
        setTransition(activeTransition);
      } else {
        setTransform("translate3d(0px, 0px, 0px)");
        setTransition(inactiveTransition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform,
        transition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
