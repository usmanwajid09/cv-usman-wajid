import React, { useState } from "react";
import { FadeIn } from "../components/FadeIn";
import { Mail, Github, Linkedin, Globe, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "Full-Stack Web Development",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const services = [
    "AI & Machine Learning",
    "Full-Stack Web Development",
    "Mobile App Development",
    "Low-level Systems",
    "Game Development",
    "Other Consultancy",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setStatus("submitting");
    try {
      const response = await fetch("https://formsubmit.co/ajax/its.usman.wajid@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Service: formState.service,
          Message: formState.message,
          _subject: `New Portfolio Inquiry [${formState.service}] from ${formState.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", service: "Full-Stack Web Development", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-24 pb-12 overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-10 sm:mb-16">
          <h2 className="hero-heading font-black uppercase text-[3.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tight">
            Contact
          </h2>
        </FadeIn>

        {/* Split Grid Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16 w-full items-stretch mb-20">
          
          {/* Left Column: Details & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <FadeIn delay={0.1} y={20}>
              <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B600A8]">
                  Get In Touch
                </span>
                <h3 className="text-[#D7E2EA] font-extrabold uppercase text-xl sm:text-2xl md:text-3xl tracking-wide">
                  Let&apos;s build something incredible.
                </h3>
                <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base leading-relaxed">
                  Have an interesting project proposal, code challenge, or full-time opportunity? Fill out the form or reach out directly.
                </p>
              </div>
            </FadeIn>

            {/* Visual Quick Contact Links */}
            <FadeIn delay={0.2} y={30} className="flex flex-col gap-4">
              {/* direct email card */}
              <a
                href="mailto:its.usman.wajid@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/2 hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B600A8]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#B600A8]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/40">Direct Email</span>
                  <span className="text-sm font-medium tracking-wide text-[#D7E2EA]">its.usman.wajid@gmail.com</span>
                </div>
              </a>

              {/* github card */}
              <a
                href="https://github.com/usmanwajid09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/2 hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D7E2EA]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5 text-[#D7E2EA]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/40">GitHub</span>
                  <span className="text-sm font-medium tracking-wide text-[#D7E2EA]">usmanwajid09</span>
                </div>
              </a>

              {/* linkedin card */}
              <a
                href="https://linkedin.com/in/usmanwajid26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/2 hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D7E2EA]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5 text-[#D7E2EA]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/40">LinkedIn</span>
                  <span className="text-sm font-medium tracking-wide text-[#D7E2EA]">usmanwajid26</span>
                </div>
              </a>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form (6 cols) */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.2} y={35} className="h-full">
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-6 sm:p-8 rounded-[35px] border border-[#D7E2EA]/10 bg-[#0C0C0C]/80 shadow-2xl relative overflow-hidden"
              >
                {/* FormSubmit Honeypot (protect from spam) */}
                <input type="text" name="_honey" style={{ display: "none" }} />
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                    className="px-5 py-3.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold pl-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    placeholder="Enter your email address"
                    className="px-5 py-3.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all"
                  />
                </div>

                {/* Select Service */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold pl-1">
                    Select Service
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] text-[#D7E2EA] text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] appearance-none cursor-pointer transition-all"
                    >
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-[#0C0C0C] text-[#D7E2EA]">
                          {service}
                        </option>
                      ))}
                    </select>
                    {/* custom arrow indicator */}
                    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#D7E2EA]/40">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold pl-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    placeholder="Describe your project, timeline, or query details..."
                    className="px-5 py-3.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] text-[#D7E2EA] placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] resize-none transition-all"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 px-6 rounded-2xl bg-[#D7E2EA] text-[#0C0C0C] hover:bg-[#B600A8] hover:text-white font-semibold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0C0C0C] border-t-transparent rounded-full animate-spin" />
                      <span>Sending Query...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Feedback overlays */}
                {status === "success" && (
                  <div className="absolute inset-0 bg-[#0C0C0C]/95 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                    <h4 className="text-white font-extrabold uppercase text-lg sm:text-xl mb-2 tracking-wide">
                      Message Sent!
                    </h4>
                    <p className="text-[#D7E2EA]/75 text-xs sm:text-sm max-w-sm leading-relaxed">
                      Thank you for reaching out. Your query has been delivered directly to Usman's inbox. I'll get back to you shortly!
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="absolute inset-x-0 bottom-4 mx-6 p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 flex items-center gap-3 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>Failed to send. Please try again or email directly to its.usman.wajid@gmail.com</span>
                  </div>
                )}
              </form>
            </FadeIn>
          </div>

        </div>

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
