import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  FileText, 
  Award, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";
import { FadeIn } from "../components/FadeIn";

interface DocLink {
  label: string;
  url: string;
  type: "letter" | "certificate" | "report";
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: "Internship" | "Part-time" | "Seasonal" | "Full-time";
  duration: string;
  location: string;
  details: string[];
  skills: string[];
  docs?: DocLink[];
  gradient: string; // for the letter logo
  glowColor: string; // Tailwind glow class
  accentColor: string; // CSS color string for SVG icons
  avatarChar: string;
}

const experiencesData: ExperienceItem[] = [
  {
    id: "01",
    role: "Machine Learning Engineer",
    company: "FlyRank AI",
    type: "Internship",
    duration: "Jun 2026 - Present · 1 mo",
    location: "New York, United States (Remote)",
    details: [
      "Developing and optimizing state-of-the-art machine learning models for production scale applications.",
      "Researching and implementing advanced Generative AI architectures and fine-tuning Custom NLP pipelines.",
      "Designing highly scalable backends for model serving, ensuring minimal latency and real-time response handling.",
      "Collaborating closely with engineering teams to integrate intelligent APIs into core web platforms."
    ],
    skills: ["Python", "PyTorch", "Generative AI", "LLMs", "NLP", "Model Serving", "Hugging Face"],
    docs: [
      {
        label: "Internship Confirmation",
        url: "/flyrank_internship.pdf",
        type: "letter"
      }
    ],
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glowColor: "shadow-teal-500/20 border-teal-500/30",
    accentColor: "#0D9488",
    avatarChar: "Y"
  },
  {
    id: "02",
    role: "Co-Founder",
    company: "NovaStack",
    type: "Part-time",
    duration: "Feb 2026 - Present · 5 mos",
    location: "Lahore, Punjab, Pakistan (Remote)",
    details: [
      "**Founding Strategy**: Spearheading NovaStack's vision to provide high-quality IT consulting, scalable software architecture, and custom web services.",
      "**Product Engineering**: Leading full-stack development of secure, highly performant web applications using React, Node.js, and relational/non-relational databases.",
      "**Growth Automation**: Designing custom automated systems to optimize client workflows, cut overheads, and streamline project delivery.",
      "**Strategic Partnerships**: Managing client relations, product roadmaps, requirements gathering, and end-to-end deliverables."
    ],
    skills: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "Business Automation", "IT Consulting", "UI/UX"],
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    glowColor: "shadow-fuchsia-500/20 border-fuchsia-500/30",
    accentColor: "#D946EF",
    avatarChar: "N"
  },
  {
    id: "03",
    role: "Machine Learning Engineer",
    company: "Arch Technologies",
    type: "Internship",
    duration: "Jun 2026 - Present · 1 mo",
    location: "Lahore, Punjab, Pakistan (Remote)",
    details: [
      "Assisting in building machine learning pipelines under the mentorship of the Head of AI.",
      "Designing and implementing Convolutional Neural Networks (CNNs) for image classification and feature extraction.",
      "Participating in model tuning, evaluation, cross-validation, and performance metrics reporting.",
      "Refining modular Python modules and integrating them into centralized developer workflows."
    ],
    skills: ["Python", "Machine Learning", "Deep Learning", "CNNs", "Computer Vision", "Model Tuning"],
    docs: [
      {
        label: "Offer Letter",
        url: "/arch_tech_offer_letter.pdf",
        type: "letter"
      }
    ],
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    glowColor: "shadow-blue-500/20 border-blue-500/30",
    accentColor: "#3B82F6",
    avatarChar: "A"
  },
  {
    id: "04",
    role: "Machine Learning Engineer",
    company: "Optimus Automate",
    type: "Internship",
    duration: "Jun 2026 - Present · 1 mo",
    location: "Pakistan (Remote)",
    details: [
      "Successfully built and evaluated four foundational Machine Learning projects spanning core classification, regression, imbalanced learning, and NLP tasks.",
      "**Titanic Survival Prediction**: Engineered survival features (e.g., family size) and trained Random Forest classifiers achieving 82.2% CV accuracy.",
      "**House Price Prediction**: Implemented median imputation, IQR outlier clipping, SelectKBest features, and trained Gradient Boosting models (R² = 0.96).",
      "**Customer Churn Prediction**: Addressed 28% imbalanced datasets using SMOTE (Synthetic Minority Over-sampling Technique) to evaluate ensemble classifiers via ROC-AUC.",
      "**Sentiment Analysis**: Developed a natural language preprocessing pipeline (stemming, tokenization, TF-IDF bigrams) to classify product reviews using Naive Bayes and LinearSVC."
    ],
    skills: ["Python", "Scikit-Learn", "SMOTE", "NLP", "Gradient Boosting", "Naive Bayes", "Feature Engineering", "Pandas", "NumPy"],
    docs: [
      {
        label: "Offer Letter",
        url: "/optimus_automate_offer_letter.pdf",
        type: "letter"
      },
      {
        label: "Internship Report",
        url: "/optimus_automate_internship_report.docx",
        type: "report"
      }
    ],
    gradient: "from-rose-500 via-red-500 to-orange-500",
    glowColor: "shadow-red-500/20 border-red-500/30",
    accentColor: "#EF4444",
    avatarChar: "O"
  },
  {
    id: "05",
    role: "Artificial Intelligence Intern",
    company: "DecodeLabs",
    type: "Internship",
    duration: "May 2026 - Jun 2026 · 2 mos",
    location: "India (Remote)",
    details: [
      "Completed a structured 2-month AI development track focused on algorithm development and neural networks.",
      "**Rule-Based AI Chatbot**: Programmed a chatbot in Python utilizing string manipulation, tokenization, and pattern matching.",
      "**Data Classification**: Conducted exploratory data analysis (EDA), data cleaning, and classification on complex datasets.",
      "**Recommendation Logic**: Programmed content-based filtering algorithms using user behavior and cosine similarity scores.",
      "**Image & Text Recognition**: Trained and evaluated Artificial Neural Networks (ANNs) for handwritten digit recognition (MNIST), plotting training curves."
    ],
    skills: ["Python", "Machine Learning", "Neural Networks", "NLP", "Computer Vision", "EDA", "Image Recognition"],
    docs: [
      {
        label: "Completion Certificate",
        url: "/decodelabs_certificate.png",
        type: "certificate"
      },
      {
        label: "Letter of Recommendation",
        url: "/decodelabs_lor.jpg",
        type: "letter"
      }
    ],
    gradient: "from-teal-400 via-emerald-500 to-green-500",
    glowColor: "shadow-emerald-500/20 border-emerald-500/30",
    accentColor: "#10B981",
    avatarChar: "D"
  },
  {
    id: "06",
    role: "Deputy Head of Department",
    company: "SOFTEC",
    type: "Seasonal",
    duration: "Aug 2024 - Feb 2026 · 1 yr 7 mos",
    location: "Lahore, Punjab, Pakistan (On-site)",
    details: [
      "**Event Orchestration**: Successfully organized a nationwide cinematography competition in collaboration with SOFTEC, raising active community engagement.",
      "**Budgeting & Sponsorship**: Managed funding, awarding 20,000 PKR to the first place winner and 10,000 PKR to the runner-up to incentivize local talent.",
      "**Team Supervision**: Led a team of student volunteers, managed logistics, and distributed official completion certificates."
    ],
    skills: ["Team Leadership", "Event Coordination", "Public Relations", "Public Speaking", "Communication", "Cinematography"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    glowColor: "shadow-orange-500/20 border-orange-500/30",
    accentColor: "#F97316",
    avatarChar: "S"
  }
];

export const ExperienceSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("01");

  const activeExp = experiencesData.find((exp) => exp.id === activeId) || experiencesData[0];

  const getDocIcon = (type: "letter" | "certificate" | "report") => {
    switch (type) {
      case "letter":
        return <ShieldCheck className="w-4 h-4 mr-1.5" />;
      case "certificate":
        return <Award className="w-4 h-4 mr-1.5" />;
      case "report":
        return <FileText className="w-4 h-4 mr-1.5" />;
    }
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-28 pb-24 px-5 sm:px-8 md:px-10 z-10 overflow-hidden"
    >
      {/* Ambient backgrounds */}
      <div className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] bg-[#B600A8]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 md:mb-24">
          <h2 className="hero-heading font-black uppercase text-[3rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9.5rem] leading-none tracking-tight">
            Experience
          </h2>
          <p className="text-[#D7E2EA]/50 font-light text-sm sm:text-base uppercase tracking-widest mt-4">
            Interactive Dashboard -- Click a company to inspect work details
          </p>
        </FadeIn>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Tab selection panel */}
          <div className="md:col-span-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-3 md:gap-4 border-b border-[#D7E2EA]/10 md:border-b-0 scrollbar-none snap-x select-none">
            {experiencesData.map((exp) => {
              const isActive = exp.id === activeId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={`snap-center shrink-0 w-[240px] md:w-full text-left p-5 rounded-[24px] border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? "bg-[#121212] border-white/10"
                      : "bg-[#121212]/30 border-white/5 hover:bg-[#121212]/50 hover:border-white/10"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 4px 25px ${exp.accentColor}08` : "none"
                  }}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#B600A8] to-[#00F0FF] rounded-r-full"
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                      {exp.avatarChar}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className={`font-bold text-sm tracking-wide transition-colors ${isActive ? "text-white" : "text-[#D7E2EA]/70 group-hover:text-white"}`}>
                        {exp.company}
                      </h3>
                      <p className="text-[11px] text-[#D7E2EA]/45 font-medium truncate mt-0.5 uppercase tracking-wider">
                        {exp.role}
                      </p>
                      <p className="text-[10px] text-[#D7E2EA]/35 font-light mt-0.5">
                        {exp.duration.split("·")[0].trim()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Tab details panel with custom Framer Motion animations */}
          <div className="md:col-span-8 min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, x: 20, y: 5 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -5 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`w-full rounded-[35px] border border-[#D7E2EA]/10 bg-[#121212]/40 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-2xl relative transition-all duration-500 ${activeExp.glowColor}`}
              >
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-[#D7E2EA]/10 pb-6 mb-6">
                  <div>
                    <h3 className="text-white font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-wide flex flex-wrap items-center gap-3">
                      {activeExp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[#D7E2EA] font-semibold text-base sm:text-lg">
                        {activeExp.company}
                      </span>
                      <span className="text-[10px] sm:text-xs font-light text-[#D7E2EA]/50 uppercase tracking-widest px-2.5 py-0.5 border border-[#D7E2EA]/10 rounded-full bg-[#D7E2EA]/5">
                        {activeExp.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs sm:text-sm text-[#D7E2EA]/60 font-light shrink-0">
                    <span className="flex items-center gap-1.5 mb-1.5">
                      <Calendar className="w-4 h-4" />
                      {activeExp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {activeExp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets List */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/40 mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 text-[#B600A8] mr-1.5" />
                    Key Accomplishments
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {activeExp.details.map((detail, dIdx) => (
                      <li 
                        key={dIdx} 
                        className="text-sm sm:text-base text-[#D7E2EA]/85 leading-relaxed font-light pl-6 relative"
                      >
                        {/* Custom glowing bullet node */}
                        <span 
                          className="absolute left-0 top-[9px] w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeExp.accentColor }}
                        />
                        <span dangerouslySetInnerHTML={{ __html: detail }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/40 mb-3">
                    Technologies &amp; Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/5 bg-white/5 text-[#D7E2EA]/85 hover:border-white/10 hover:text-white hover:bg-white/10 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                {activeExp.docs && activeExp.docs.length > 0 && (
                  <div className="border-t border-[#D7E2EA]/10 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/40 mb-3.5">
                      Verified Credentials
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {activeExp.docs.map((doc, dIdx) => (
                        <a
                          key={dIdx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-[#D7E2EA]/70 hover:text-white font-semibold bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/15 border border-[#D7E2EA]/10 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-[1.03]"
                        >
                          {getDocIcon(doc.type)}
                          {doc.label}
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Floating Download CV Callout for smaller screens */}
        <FadeIn delay={0.2} y={20} className="mt-14 flex md:hidden justify-center w-full">
          <a
            href="/Usman_wajid.pdf"
            download="Usman_wajid.pdf"
            className="w-full text-center py-4 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] font-semibold uppercase tracking-widest text-xs bg-[#D7E2EA]/5"
          >
            Download Full Resume
          </a>
        </FadeIn>

      </div>
    </section>
  );
};
