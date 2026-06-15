import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Cpu, Brain, Globe, Smartphone, Database, Gamepad2 } from "lucide-react";

interface SkillCard {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  description: string;
  tech: string[];
  color: string;
}

const skills: SkillCard[] = [
  {
    title: "Low-level Systems",
    icon: Cpu,
    description: "Low-level driver implementation, memory management, and hardware programming.",
    tech: ["8086 Assembly", "C++", "C", "Hardware Interrupts"],
    color: "#B600A8",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    description: "Deep learning models, computer vision image classification, and natural language processing.",
    tech: ["Python", "TensorFlow", "OpenCV", "Scikit-Learn"],
    color: "#7621B0",
  },
  {
    title: "Web Engineering",
    icon: Globe,
    description: "High-performance full-stack web applications and robust client portals.",
    tech: ["React", "TypeScript", "Node.js", "Express"],
    color: "#BBCCD7",
  },
  {
    title: "Mobile App Dev",
    icon: Smartphone,
    description: "Cross-platform mobile applications with local scheduling and background tasks.",
    tech: ["Flutter", "Dart", "SQLite", "Local Notifications"],
    color: "#646973",
  },
  {
    title: "Database Architecture",
    icon: Database,
    description: "Relational and non-relational database design, query optimization, and structured schemas.",
    tech: ["PostgreSQL", "SQL Server", "MongoDB", "Redis"],
    color: "#B600A8",
  },
  {
    title: "Algorithms & Games",
    icon: Gamepad2,
    description: "Real-time game loops, collision systems, and optimized data structure practices.",
    tech: ["C++", "SFML", "OOP", "DSA Design"],
    color: "#7621B0",
  },
];

export const CircularCardDeck: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const springRotation = useSpring(rotation, {
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  });

  // Radii for circular positioning
  const radiusX = 320; // horizontal radius
  const radiusY = 80;  // vertical radius (for 3D tilting/oval perspective)

  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - (360 / skills.length));
    }, 4500); // cycle card every 4.5 seconds

    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Track the active index based on current rotation
  useEffect(() => {
    // Normalize rotation to find which card index is closest to front (0 degrees)
    const normalized = Math.round(-rotation / (360 / skills.length)) % skills.length;
    const active = normalized < 0 ? normalized + skills.length : normalized;
    setActiveIndex(active);
  }, [rotation]);

  const handleDrag = (_event: any, info: PanInfo) => {
    setIsAutoSpinning(false);
    // Map drag distance along X to rotation angle change
    const deltaRotation = (info.delta.x / 4);
    setRotation((prev) => prev + deltaRotation);
  };

  const handleDragEnd = () => {
    // Snap to the nearest card increment
    const cardStep = 360 / skills.length;
    const snapped = Math.round(rotation / cardStep) * cardStep;
    setRotation(snapped);
    // Resume auto-spinning after a short delay
    setTimeout(() => {
      setIsAutoSpinning(true);
    }, 8000);
  };

  const handleCardClick = (index: number) => {
    setIsAutoSpinning(false);
    
    // Calculate shortest angular distance to bring card to front (active)
    const cardStep = 360 / skills.length;
    const targetRot = -index * cardStep;
    
    // Find closest rotation offset to current
    const currentRot = rotation;
    const diff = ((targetRot - currentRot) % 360);
    let shortestDiff = diff;
    if (diff > 180) shortestDiff -= 360;
    if (diff < -180) shortestDiff += 360;
    
    setRotation(currentRot + shortestDiff);
    
    setTimeout(() => {
      setIsAutoSpinning(true);
    }, 8000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden py-10 select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsAutoSpinning(false)}
      onMouseLeave={() => setIsAutoSpinning(true)}
    >
      {/* Blueprint background lines matching Usman's brand */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(215,226,234,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(215,226,234,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Rotating 3D Ellipse Guide */}
      <div 
        className="absolute w-[640px] h-[160px] rounded-full border border-[#D7E2EA]/5 transform rotateX-60 pointer-events-none"
        style={{ transform: "rotateX(75deg)" }}
      />

      {/* Drag interaction handler over the whole area */}
      <motion.div
        drag="x"
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-20"
      />

      {/* Deck Render */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
        {skills.map((skill, index) => {
          const cardStep = 360 / skills.length;
          const cardBaseAngle = index * cardStep;

          return (
            <CircularCard
              key={skill.title}
              skill={skill}
              index={index}
              baseAngle={cardBaseAngle}
              springRotation={springRotation}
              radiusX={radiusX}
              radiusY={radiusY}
              isActive={activeIndex === index}
              onClick={() => handleCardClick(index)}
            />
          );
        })}
      </div>

      {/* Active capability detail overlay at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center max-w-md w-full px-6 z-30 pointer-events-none">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0C0C0C]/80 backdrop-blur-md border border-[#D7E2EA]/10 p-4 rounded-2xl shadow-xl"
        >
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">Core Capability</span>
          <h4 className="text-white font-bold uppercase text-lg mt-1 tracking-wide" style={{ color: skills[activeIndex].color }}>
            {skills[activeIndex].title}
          </h4>
          <p className="text-[#D7E2EA]/75 text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
            {skills[activeIndex].description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

interface CircularCardProps {
  skill: SkillCard;
  index: number;
  baseAngle: number;
  springRotation: any;
  radiusX: number;
  radiusY: number;
  isActive: boolean;
  onClick: () => void;
}

const CircularCard: React.FC<CircularCardProps> = ({
  skill,
  baseAngle,
  springRotation,
  radiusX,
  radiusY,
  isActive,
  onClick,
}) => {
  const Icon = skill.icon;
  const [styleValues, setStyleValues] = useState({ x: 0, y: 0, zIndex: 0, scale: 0.8, rotateY: 0, opacity: 0.5 });

  useEffect(() => {
    return springRotation.on("change", (latestRotation: number) => {
      // Calculate current angle in radians
      const angleRad = ((baseAngle + latestRotation) * Math.PI) / 180;

      // Positions on the oval path
      const cx = radiusX * Math.sin(angleRad);
      const cy = radiusY * Math.cos(angleRad); // cy goes from -radiusY (back) to +radiusY (front)

      // Perspective values
      // Map cy from [-radiusY, radiusY] to scale [0.65, 1.05]
      const t = (cy + radiusY) / (2 * radiusY); // 0 at back, 1 at front
      const scale = 0.65 + t * 0.4;
      const opacity = 0.3 + t * 0.7;
      
      // Rotate cards to face center/viewer
      const rotateY = -cx / 10; 

      setStyleValues({
        x: cx,
        y: cy * 0.2, // squeeze vertical display slightly for flat 3D skew
        zIndex: Math.round((cy + radiusY) * 10), // higher z-index at front
        scale,
        rotateY,
        opacity,
      });
    });
  }, [baseAngle, springRotation, radiusX, radiusY]);

  return (
    <motion.div
      onClick={onClick}
      style={{
        x: styleValues.x,
        y: styleValues.y,
        zIndex: styleValues.zIndex,
        scale: styleValues.scale,
        opacity: styleValues.opacity,
        rotateY: `${styleValues.rotateY}deg`,
        transformStyle: "preserve-3d",
      }}
      className={`absolute w-[200px] sm:w-[240px] h-[260px] sm:h-[300px] rounded-[30px] p-6 flex flex-col justify-between border-2 cursor-pointer transition-all duration-300 ${
        isActive 
          ? "bg-[#0C0C0C] border-white shadow-[0_0_25px_rgba(255,255,255,0.15)]" 
          : "bg-[#0C0C0C]/90 border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/5"
      }`}
    >
      {/* Top: Card Header & Glow */}
      <div className="relative">
        <div 
          className="absolute -top-10 -left-10 w-24 h-24 rounded-full filter blur-[40px] pointer-events-none opacity-40"
          style={{ backgroundColor: skill.color }}
        />
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
        >
          <Icon className="w-6 h-6" style={{ color: skill.color }} />
        </div>
        
        <h3 className="text-white font-semibold uppercase text-sm sm:text-base tracking-wider leading-snug">
          {skill.title}
        </h3>
      </div>

      {/* Bottom: Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {skill.tech.slice(0, 3).map((t) => (
          <span 
            key={t}
            className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-[#D7E2EA]/5 text-[#D7E2EA]/60 border border-[#D7E2EA]/5"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
