import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Folder, Menu } from "lucide-react";
import { Parallax3D } from "../components/Parallax3D";

interface Project {
  title: string;
  category: "AI/ML" | "Web" | "Mobile" | "Systems/Games";
  desc: string;
  tech: string[];
  githubUrl: string;
}

const allProjects: Project[] = [
  {
    title: "Pneumonia-Detection",
    category: "AI/ML",
    desc: "Machine learning chest X-ray classifier to detect signs of pneumonia, applying image preprocessing in Python.",
    tech: ["Python", "TensorFlow", "OpenCV", "ML"],
    githubUrl: "https://github.com/usmanwajid09/Pneumonia-Detection",
  },
  {
    title: "Rule-Based-AI-Chatbot",
    category: "AI/ML",
    desc: "Intelligent customer support chatbot powered by predefined rule-based decision trees and NLP matching.",
    tech: ["Python", "NLP", "Regex"],
    githubUrl: "https://github.com/usmanwajid09/Rule-Based-AI-Chatbot",
  },
  {
    title: "Sentiment-Analysis-on-Reviews",
    category: "AI/ML",
    desc: "NLP classifier analyzing and rating customer sentiments on product reviews with TF-IDF and Naive Bayes.",
    tech: ["Python", "NLTK", "Scikit-Learn"],
    githubUrl: "https://github.com/usmanwajid09/Sentiment-Analysis-on-Product-Reviews",
  },
  {
    title: "Customer-Churn-Prediction",
    category: "AI/ML",
    desc: "Predictive classification model to forecast customer retention rates and churn risk factors in business datasets.",
    tech: ["Python", "Pandas", "XGBoost"],
    githubUrl: "https://github.com/usmanwajid09/Customer-Churn-Prediction",
  },
  {
    title: "House-Price-Prediction",
    category: "AI/ML",
    desc: "Regression analysis model estimating residential property market values using historical housing datasets.",
    tech: ["Python", "Scikit-Learn", "Matplotlib"],
    githubUrl: "https://github.com/usmanwajid09/House-Price-Prediction",
  },
  {
    title: "Titanic-Survival-Prediction",
    category: "AI/ML",
    desc: "Machine learning binary classifier predicting passenger survival likelihood based on demographic data.",
    tech: ["Python", "RandomForest", "Pandas"],
    githubUrl: "https://github.com/usmanwajid09/Titanic-Survival-Prediction",
  },
  {
    title: "Image-Text-Recognition",
    category: "AI/ML",
    desc: "Optical Character Recognition (OCR) system extracting text from scanned images and document snapshots.",
    tech: ["Python", "Tesseract", "OpenCV"],
    githubUrl: "https://github.com/usmanwajid09/Image-Text-Recognition",
  },
  {
    title: "AI-Recommendation-Logic",
    category: "AI/ML",
    desc: "AI-based recommendation system matching development requirements with optimized technical stack combinations.",
    tech: ["JavaScript", "Node.js", "Algorithms"],
    githubUrl: "https://github.com/usmanwajid09/AI-Recommendation-Logic-Tech-Stack-Recommender-",
  },
  {
    title: "Data-Classification-Using-AI",
    category: "AI/ML",
    desc: "Supervised machine learning algorithms classifying raw multi-dimensional datasets into categorical outputs.",
    tech: ["Python", "Scikit-Learn", "Data Science"],
    githubUrl: "https://github.com/usmanwajid09/Data-Classification-Using-AI",
  },
  {
    title: "Pseudo-coloring",
    category: "AI/ML",
    desc: "Digital Image Processing system applying color mapping and intensity slicing to enhance detail in grayscale medical imagery.",
    tech: ["Python", "MATLAB", "Image Processing"],
    githubUrl: "https://github.com/usmanwajid09/Pseudo-coloring",
  },
  {
    title: "TradeJournal",
    category: "Web",
    desc: "MERN stack trading tracker web app providing detailed logging, filtering, and performance analytics for stock traders.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/usmanwajid09/TradeJournal",
  },
  {
    title: "Virtual-Wardrobe",
    category: "Web",
    desc: "Full-stack wardrobe organizer app offering AI-based outfit combination recommendations based on database closet items.",
    tech: ["React", "Node.js", "SQL", "AI Logic"],
    githubUrl: "https://github.com/usmanwajid09/Virtual-Wardrobe",
  },
  {
    title: "AccountingFirm",
    category: "Web",
    desc: "Full-stack client portal and dashboard managing bookkeeping records, document uploads, and services for accounting firms.",
    tech: ["React", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/usmanwajid09/AccountingFirm",
  },
  {
    title: "Pak-Art-Gallery",
    category: "Web",
    desc: "Online e-commerce platform and gallery showcase designed for Pakistani artists to display and sell visual artwork.",
    tech: ["HTML", "CSS", "JavaScript", "SQL"],
    githubUrl: "https://github.com/usmanwajid09/Pak-Art-Gallery",
  },
  {
    title: "StyleIQ",
    category: "Web",
    desc: "Curated digital fashion hub and clothing catalog styling guide, showcasing seasonal design coordinates.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/usmanwajid09/StyleIQ",
  },
  {
    title: "Notify-Circle",
    category: "Mobile",
    desc: "Cross-platform mobile reminder scheduler using local device notifications and background tasks in Flutter.",
    tech: ["Flutter", "Dart", "SQLite", "Mobile"],
    githubUrl: "https://github.com/usmanwajid09/Notify-Circle",
  },
  {
    title: "PlaySmart",
    category: "Mobile",
    desc: "Interactive mobile application tailored to personal habit building, smart tasking, and calendar schedules.",
    tech: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/usmanwajid09/PlaySmart",
  },
  {
    title: "ASM-Racer",
    category: "Systems/Games",
    desc: "Low-level racing game built in 8086 Assembly, using hardware interrupts, memory addressing, and custom screen rendering.",
    tech: ["8086 Assembly", "BIOS Interrupts"],
    githubUrl: "https://github.com/usmanwajid09/ASM-Racer",
  },
  {
    title: "spaceshooter",
    category: "Systems/Games",
    desc: "Arcade space shooter game developed in C++ using STL, with real-time enemy AI behavior and collision detection.",
    tech: ["C++", "STL", "Console Game"],
    githubUrl: "https://github.com/usmanwajid09/spaceshooter",
  },
  {
    title: "Candy-Crush",
    category: "Systems/Games",
    desc: "Grid-based match-3 puzzle game clone built using C++ and SFML library for graphic rendering and match-detection logic.",
    tech: ["C++", "SFML", "Game Engine"],
    githubUrl: "https://github.com/usmanwajid09/Candy-Crush",
  },
];

interface ProjectsPageProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const categories = [
  { id: "all", label: "All Projects" },
  { id: "AI/ML", label: "AI & Machine Learning" },
  { id: "Web", label: "Web & Full-Stack" },
  { id: "Mobile", label: "Mobile Dev" },
  { id: "Systems/Games", label: "Systems & Games" },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onOpenMenu }) => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex flex-col w-full">
      {/* Navbar */}
      <nav className="w-full z-20 px-6 md:px-10 pt-6 md:pt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#D7E2EA] hover:opacity-70 font-semibold tracking-wider text-sm md:text-lg uppercase transition-opacity duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <button
          onClick={onOpenMenu}
          className="text-[#D7E2EA] hover:opacity-75 transition-opacity p-2 rounded-full border border-[#D7E2EA]/10 bg-[#D7E2EA]/5"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <div className="px-6 md:px-10 pt-16 pb-12 w-full max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center"
        >
          <h1 className="hero-heading font-black uppercase text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] leading-none tracking-tight mb-4">
            Projects Hub
          </h1>
          <p className="font-light uppercase tracking-widest text-[#D7E2EA]/60 text-xs sm:text-sm max-w-xl mx-auto">
            A comprehensive directory of all repositories, projects, and applications built by Usman Wajid.
          </p>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-10 mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider rounded-full border transition-all duration-200 ${
              filter === cat.id
                ? "bg-[#D7E2EA] text-[#0C0C0C] border-[#D7E2EA]"
                : "border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 text-[#D7E2EA]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card rounded-[30px] border border-[#D7E2EA]/10 bg-[#0C0C0C]/50 hover:border-[#D7E2EA]/30 transition-all duration-300 overflow-hidden group"
              >
                <Parallax3D className="p-6 flex flex-col justify-between h-full relative" maxTilt={8}>
                  {/* Background glow vector */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B600A8]/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-[#B600A8]/10 transition-colors duration-300" />

                  <div className="w-full">
                    {/* Top Row: Folder and Github */}
                    <div className="flex justify-between items-center mb-6">
                      <Folder className="w-8 h-8 text-[#D7E2EA]/20 group-hover:text-[#D7E2EA]/60 transition-colors" />
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors p-1 relative z-20"
                        title="Open GitHub Repository"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#BBCCD7] group-hover:to-white transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[#D7E2EA]/60 font-light text-xs sm:text-sm leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-md bg-[#D7E2EA]/5 text-[#D7E2EA]/75 font-medium border border-[#D7E2EA]/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Parallax3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="w-full text-center py-12 text-[#D7E2EA]/40 uppercase tracking-widest text-sm">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};
