import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { X, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

interface StylishMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string | null) => void; // null means go to All Projects page
  currentPath: string; // "home" or "projects"
}

const menuItems = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Experience", target: "experience" },
  { label: "Featured Work", target: "projects" },
  { label: "All Projects", target: "all-projects" },
  { label: "Contact", target: "contact" },
];

export const StylishMenu: React.FC<StylishMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPath,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: "-100%" },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // Custom easeOutExpo
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0] as const, // Custom easeInExpo
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const handleItemClick = (target: string) => {
    onClose();
    setTimeout(() => {
      if (target === "all-projects") {
        onNavigate(null);
      } else {
        onNavigate(target);
      }
    }, 400); // Wait for exit animation
  };

  if (!isOpen) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-50 bg-[#0C0C0C]/98 backdrop-blur-xl flex flex-col justify-between px-6 sm:px-12 md:px-24 py-8 select-none"
    >
      {/* Header inside Menu */}
      <div className="flex justify-between items-center w-full">
        <span className="text-[#D7E2EA] font-semibold tracking-wider text-sm md:text-lg uppercase">
          Usman Wajid
        </span>
        <button
          onClick={onClose}
          className="text-[#D7E2EA] hover:opacity-75 transition-opacity p-2 rounded-full border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/5"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 flex flex-col justify-center items-start my-12">
        <div className="space-y-4 md:space-y-6">
          {menuItems.map((item) => {
            const isAllProjects = item.target === "all-projects";
            const isActive =
              (currentPath === "projects" && isAllProjects) ||
              (currentPath === "home" && !isAllProjects && item.target === "home");

            return (
              <motion.div key={item.label} variants={itemVariants} className="overflow-hidden">
                <button
                  onClick={() => handleItemClick(item.target)}
                  className="group relative flex items-center gap-4 text-left font-black uppercase text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] leading-none tracking-tight text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-300"
                >
                  {/* Hover line indicator */}
                  <span
                    className={`absolute left-0 bottom-0 h-[4px] bg-gradient-to-r from-[#B600A8] to-[#7621B0] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  <span className={isActive ? "text-[#D7E2EA]" : ""}>
                    {item.label}
                  </span>
                  
                  {isAllProjects && (
                    <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 text-[#D7E2EA]/40 group-hover:text-[#D7E2EA] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer / Socials inside Menu */}
      <motion.div
        variants={itemVariants}
        className="w-full border-t border-[#D7E2EA]/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
          Get in touch -- its.usman.wajid@gmail.com
        </span>
        
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/usmanwajid09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/usmanwajid26"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:its.usman.wajid@gmail.com"
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};
