import React from "react";
import { ContactButton } from "../components/ContactButton";
import { FadeIn } from "../components/FadeIn";
import { Menu } from "lucide-react";

interface HeroSectionProps {
  onOpenMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMenu }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C] w-full select-none">
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#B600A8]/5 to-transparent filter blur-3xl pointer-events-none" />

      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full z-20">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {/* Logo or name */}
          <span className="text-[#D7E2EA] font-semibold tracking-wider text-sm md:text-lg uppercase">
            Usman Wajid
          </span>
          
          {/* Actions: Download CV + Menu */}
          <div className="flex items-center gap-3">
            <a
              href="/Usman_Wajid_CV.pdf"
              download="Usman_Wajid_CV.pdf"
              className="text-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] font-semibold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 transition-all duration-300 shadow-md"
            >
              Download CV
            </a>
            
            <button
              onClick={onOpenMenu}
              className="text-[#D7E2EA] hover:opacity-75 transition-opacity p-2 rounded-full border border-[#D7E2EA]/10 bg-[#D7E2EA]/5 flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </FadeIn>

      {/* 2. Centered Hero Heading */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6 md:px-10 z-10 text-center">
        <div className="overflow-hidden w-full py-4">
          <FadeIn delay={0.15} y={40} duration={0.8} as="div" className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[10vw] sm:text-[11vw] md:text-[12vw] lg:text-[13vw] mt-6 sm:mt-4 md:-mt-5">
              Hi, i&apos;m usman
            </h1>
          </FadeIn>
        </div>
        
        {/* Subtle developer tag / sub-heading */}
        <FadeIn delay={0.25} y={20} as="div" className="mt-4">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-[#D7E2EA]/40">
            Software Engineer &amp; AI Developer
          </span>
        </FadeIn>
      </div>

      {/* 3. Bottom bar */}
      <div className="w-full z-10 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end">
        {/* Left text */}
        <FadeIn delay={0.35} y={20} as="div" className="max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[480px]">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem]">
            specializing in low-level system architecture and modern full-stack development to build high-performance software
          </p>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20} as="div">
          <ContactButton onClick={() => scrollToSection("contact")} />
        </FadeIn>
      </div>

    </section>
  );
};
