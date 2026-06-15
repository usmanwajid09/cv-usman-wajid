import React from "react";
import { FadeIn } from "../components/FadeIn";
import { Mail, Github, Linkedin, Globe, Phone } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <footer
      id="contact"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-20 pb-12 overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-10 sm:mb-16">
          <h2 className="hero-heading font-black uppercase text-[3.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tight">
            Contact
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.1} y={20} className="text-center max-w-md mb-12">
          <p className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-xs sm:text-sm leading-relaxed">
            Interested in working together or want to discuss a project? Drop a message!
          </p>
        </FadeIn>

        {/* Contact info grid */}
        <FadeIn delay={0.2} y={30} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-20">
          
          {/* Email */}
          <a
            href="mailto:its.usman.wajid@gmail.com"
            className="flex flex-col items-center p-6 rounded-[30px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 bg-[#0C0C0C]/50 hover:bg-[#D7E2EA]/5 transition-all duration-300 group"
          >
            <Mail className="w-6 h-6 text-[#D7E2EA] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 mb-1">Email</span>
            <span className="text-sm font-medium tracking-wide">its.usman.wajid@gmail.com</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/usmanwajid09"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 rounded-[30px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 bg-[#0C0C0C]/50 hover:bg-[#D7E2EA]/5 transition-all duration-300 group"
          >
            <Github className="w-6 h-6 text-[#D7E2EA] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 mb-1">GitHub</span>
            <span className="text-sm font-medium tracking-wide">usmanwajid09</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/usmanwajid26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 rounded-[30px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 bg-[#0C0C0C]/50 hover:bg-[#D7E2EA]/5 transition-all duration-300 sm:col-span-2 md:col-span-1 group"
          >
            <Linkedin className="w-6 h-6 text-[#D7E2EA] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 mb-1">LinkedIn</span>
            <span className="text-sm font-medium tracking-wide">usmanwajid26</span>
          </a>

        </FadeIn>

        {/* Bottom bar */}
        <div className="w-full border-t border-[#D7E2EA]/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:items-start items-center gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]">
              Usman Wajid
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
              © {new Date().getFullYear()} -- Software Engineer
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/60">
            <a
              href="https://usmanwajid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              usmanwajid.com
            </a>
            <span className="text-[#D7E2EA]/10">|</span>
            <span className="flex items-center gap-1 select-all cursor-pointer hover:text-[#D7E2EA] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +92 339 6642924
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
