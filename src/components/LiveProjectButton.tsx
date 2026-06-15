import React from "react";
import { motion } from "framer-motion";

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href, onClick }) => {
  const content = (
    <span className="block px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-center">
      Live Project
    </span>
  );

  const buttonProps = {
    whileHover: { scale: 1.03, backgroundColor: "rgba(215, 226, 234, 0.1)" },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
    className: "inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 select-none",
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...buttonProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...buttonProps}>
      {content}
    </motion.button>
  );
};
