import React, { useRef, useState, useEffect } from "react";

const row1Images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const row2Images = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  // Triple the arrays for seamless parallax effect
  const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
  const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate scroll offset relative to this section
      const sectionTop = rect.top + window.scrollY;
      const computedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(computedOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] w-full pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
    >
      {/* Row 1: moves RIGHT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{
            transform: `translate3d(${offset - 200}px, 0px, 0px)`,
            willChange: "transform",
          }}
        >
          {row1Tripled.map((url, index) => (
            <img
              key={`row1-${index}`}
              src={url}
              alt={`Work Gallery ${index + 1}`}
              className="marquee-item w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl object-cover select-none pointer-events-none"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Row 2: moves LEFT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          style={{
            transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
            willChange: "transform",
          }}
          className="flex gap-3 w-max -translate-x-1/3"
        >
          {row2Tripled.map((url, index) => (
            <img
              key={`row2-${index}`}
              src={url}
              alt={`Work Gallery Secondary ${index + 1}`}
              className="marquee-item w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl object-cover select-none pointer-events-none"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
