import { ContactButton } from "../components/ContactButton";
import { FadeIn } from "../components/FadeIn";
import { AnimatedText } from "../components/AnimatedText";
import { MovingSkills } from "../components/MovingSkills";

export const AboutSection: React.FC = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bioText = "I'm Usman Wajid, a developer focused on building efficient and complex systems. My expertise spans low-level code in Assembly and C++ to modern web stacks using React, Node.js, and AI Integration. My goal is to deliver robust solutions that are technically sound and logically driven. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      
      {/* Absolute floating 3D images in corners */}
      
      {/* Top-left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D Asset"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Geometric 3D Asset"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Top-right: Lego icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D Asset"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Group 3D Asset"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Content wrapper with relative layout for Z-index above icons on mobile */}
      <div className="flex flex-col items-center justify-center z-20 w-full max-w-5xl">
        
        {/* Title Heading */}
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20 text-center w-full">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[3.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]">
            About me
          </h2>
        </FadeIn>

        {/* Centered Bio Layout (Profile Image Removed) */}
        <div className="flex flex-col items-center text-center max-w-3xl w-full px-4 sm:px-8">
          
          <div className="w-full text-[#D7E2EA] font-medium leading-relaxed text-base sm:text-lg md:text-xl lg:text-[1.35rem] mb-10 md:mb-12">
            <AnimatedText text={bioText} />
          </div>

          <FadeIn delay={0.25} y={20} className="flex flex-col sm:flex-row items-center gap-4">
            <ContactButton onClick={handleContactClick} />
            <a
              href="/Usman_wajid.pdf"
              download="Usman_wajid.pdf"
              className="px-8 py-3.5 rounded-full border-2 border-[#D7E2EA]/20 text-[#D7E2EA] font-semibold uppercase tracking-widest text-xs sm:text-sm bg-[#D7E2EA]/5 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-300 transform hover:scale-[1.03]"
            >
              Download CV
            </a>
          </FadeIn>

        </div>

        {/* Continuous Moving Skill Marquees */}
        <FadeIn delay={0.3} y={40} className="w-full mt-24 sm:mt-32 border-t border-[#D7E2EA]/10 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-[#D7E2EA] font-extrabold uppercase tracking-widest text-lg sm:text-xl md:text-2xl">
              Skills &amp; Expertise
            </h3>
            <p className="text-[#D7E2EA]/55 font-light text-xs sm:text-sm uppercase tracking-wider mt-2">
              Continually scrolling technologies &amp; capabilities
            </p>
          </div>
          <MovingSkills />
        </FadeIn>

      </div>
    </section>
  );
};
