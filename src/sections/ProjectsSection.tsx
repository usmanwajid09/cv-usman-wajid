import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { FadeIn } from "../components/FadeIn";
import { Parallax3D } from "../components/Parallax3D";

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  githubUrl: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "01",
    category: "MERN Stack Web App",
    title: "TradeJournal",
    githubUrl: "https://github.com/usmanwajid09/TradeJournal",
    col1Img1: "/tradejournal_tradingview.png",
    col1Img2: "/tradejournal_market_symbols.png",
    col2Img: "/tradejournal_candlestick.png",
  },
  {
    id: "02",
    category: "Full-Stack Client Portal",
    title: "AccountingFirm",
    githubUrl: "https://github.com/usmanwajid09/AccountingFirm",
    col1Img1: "/accounting_cash_counting.png",
    col1Img2: "/accounting_portal.png",
    col2Img: "/accounting_workspace.png",
  },
  {
    id: "03",
    category: "Node.js & React & SQL",
    title: "Virtual Wardrobe",
    githubUrl: "https://github.com/usmanwajid09/Virtual-Wardrobe",
    col1Img1: "/wardrobe_closet.png",
    col1Img2: "/wardrobe_app_real.png",
    col2Img: "/wardrobe_flatlay.png",
  },
  {
    id: "04",
    category: "AI & Machine Learning",
    title: "Pneumonia Detection AI",
    githubUrl: "https://github.com/usmanwajid09/Pneumonia-Detection",
    col1Img1: "/pneumonia_doctor.png",
    col1Img2: "/pneumonia_patient_xray.png",
    col2Img: "/pneumonia_lab.png",
  },
  {
    id: "05",
    category: "Flutter Reminder App",
    title: "NotifyCircle",
    githubUrl: "https://github.com/usmanwajid09/NotifyCircle",
    col1Img1: "/notify_bubble.png",
    col1Img2: "/notify_list.png",
    col2Img: "/notify_mockup.png",
  },
];

interface ProjectsSectionProps {
  onViewAll: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onViewAll }) => {
  // Show 4 primary projects on home page
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-24 pb-20 px-5 sm:px-8 md:px-10 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-24 md:mb-32">
          <h2 className="hero-heading font-black uppercase text-center text-[3.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tight">
            Project
          </h2>
        </FadeIn>

        {/* Sticky Cards Stacking Track */}
        <div className="flex flex-col gap-[15vh]">
          {featuredProjects.map((project, index) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCards={featuredProjects.length}
              />
            );
          })}
        </div>

        {/* View All Projects Action Button */}
        <div className="flex justify-center mt-24">
          <FadeIn delay={0.2} y={20}>
            <button
              onClick={onViewAll}
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-semibold uppercase tracking-widest px-10 py-4 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Projects
            </button>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll tracking for the scaling down effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Target scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  
  // Custom sticky top offset: index * 28px
  const stickyTopOffset = 96 + index * 28; // 96px is roughly top-24 (md is top-32/128px)

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] w-full flex items-start justify-center"
      style={{
        top: `${stickyTopOffset}px`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] shadow-2xl overflow-hidden group"
      >
        <Parallax3D className="w-full h-full p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8" maxTilt={6}>
          {/* Top Row: Number, Category, Project Name, and Live Project Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D7E2EA]/10 pb-4 md:pb-6">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Massive Number watermark */}
              <span className="font-black text-[#D7E2EA]/10 text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] leading-none select-none">
                {project.id}
              </span>
              <div className="flex flex-col">
                <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
                  {project.category}
                </span>
                <h3 className="text-[#D7E2EA] font-semibold uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide">
                  {project.title}
                </h3>
              </div>
            </div>
            <LiveProjectButton href={project.githubUrl} />
          </div>

          {/* Bottom Row: Two-Column Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 flex-1 items-stretch">
            {/* Left Column (40% width / 4 cols) - 2 Stacked Images */}
            <div className="md:col-span-4 flex flex-col justify-between gap-4">
              <img
                src={project.col1Img1}
                alt={`${project.title} Visual 1`}
                className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10"
                style={{
                  height: "clamp(130px, 16vw, 230px)",
                }}
                loading="lazy"
              />
              <img
                src={project.col1Img2}
                alt={`${project.title} Visual 2`}
                className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10"
                style={{
                  height: "clamp(160px, 22vw, 340px)",
                }}
                loading="lazy"
              />
            </div>

            {/* Right Column (60% width / 6 cols) - 1 Tall Image */}
            <div className="md:col-span-6 flex items-stretch">
              <img
                src={project.col2Img}
                alt={`${project.title} Main Visual`}
                className="w-full min-h-[200px] md:min-h-0 object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10"
                loading="lazy"
              />
            </div>
          </div>
        </Parallax3D>
      </motion.div>
    </div>
  );
};
