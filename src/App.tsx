import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "./sections/HeroSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { AboutSection } from "./sections/AboutSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";
import { ProjectsPage } from "./pages/ProjectsPage";
import { StylishMenu } from "./components/StylishMenu";
import { SpectraNoise } from "./components/SpectraNoise";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPath, setCurrentPath] = useState<"home" | "projects">("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // GSAP Scroll Velocity Skew effect (Subtle warping when scrolling fast)
  useEffect(() => {
    let clamp = gsap.utils.clamp(-12, 12); // subtle skew bounds
    let skewSetter = gsap.quickTo(".project-card, .marquee-item, img", "skewY");
    let proxy = { skew: 0 };

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -400);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [currentPath]); // Re-initialize when switching views

  const handleNavigate = (target: string | null) => {
    if (target === null) {
      setCurrentPath("projects");
      window.scrollTo({ top: 0 });
    } else {
      setCurrentPath("home");
      // Wait for exit transition, then scroll to target
      setTimeout(() => {
        if (target === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip flex flex-col">
      {/* Cinematic Spectra Noise background grain */}
      <SpectraNoise />

      {/* 1. Full-Screen Stylish Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <StylishMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            onNavigate={handleNavigate}
            currentPath={currentPath}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Page Render with Transition Animations */}
      <AnimatePresence mode="wait">
        {currentPath === "home" ? (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col"
          >
            <HeroSection onOpenMenu={() => setMenuOpen(true)} />
            <MarqueeSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection onViewAll={() => handleNavigate(null)} />
            <ContactSection />
          </motion.div>
        ) : (
          <motion.div
            key="projectspage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <ProjectsPage
              onBack={() => handleNavigate("home")}
              onOpenMenu={() => setMenuOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
