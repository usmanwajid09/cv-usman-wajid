import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  FileText, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
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
  categories: ("ml" | "web" | "leadership")[];
  details: string[];
  skills: string[];
  docs?: DocLink[];
  gradient: string; // for the letter logo
  glowColor: string; // Tailwind glow class (e.g. shadow-purple-500/10)
  accentColor: string; // CSS color string for SVG icons, timeline dots
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
    categories: ["ml", "web"],
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
    categories: ["web", "leadership"],
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
    categories: ["ml"],
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
    categories: ["ml"],
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
    categories: ["ml"],
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
    categories: ["leadership"],
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
  const [filter, setFilter] = useState<"all" | "ml" | "web" | "leadership">("all");

  const filteredExperiences = experiencesData.filter(
    (exp) => filter === "all" || exp.categories.includes(filter)
  );

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
      {/* Visual background ambient aura */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-[#B600A8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 md:mb-24">
          <h2 className="hero-heading font-black uppercase text-[3rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9.5rem] leading-none tracking-tight">
            Experience
          </h2>
          <p className="text-[#D7E2EA]/50 font-light text-sm sm:text-base uppercase tracking-widest mt-4">
            A chronological timeline of my internships and leadership
          </p>
        </FadeIn>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          
          {/* Left Column - Sticky Filter Controller */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit z-20 flex flex-col gap-8">
            <div className="bg-[#121212]/50 border border-[#D7E2EA]/10 rounded-[30px] p-6 md:p-8 backdrop-blur-md">
              <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl uppercase tracking-wider mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-[#B600A8] mr-2" />
                Filter Path
              </h3>
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Toggle categories to filter my timeline based on specific domain expertise and career achievements.
              </p>

              {/* Filter Buttons */}
              <div className="flex flex-col gap-3">
                {[
                  { id: "all", label: "All Journeys" },
                  { id: "ml", label: "Machine Learning & AI" },
                  { id: "web", label: "Web Dev & Core SE" },
                  { id: "leadership", label: "Leadership & Society" }
                ].map((tab) => {
                  const isActive = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id as any)}
                      className={`relative w-full text-left px-5 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                        isActive
                          ? "bg-[#D7E2EA] text-[#0C0C0C] shadow-lg scale-[1.02]"
                          : "bg-[#D7E2EA]/5 text-[#D7E2EA]/60 border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/20"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resume Callout Widget */}
            <div className="hidden lg:flex bg-[#B600A8]/5 border border-[#B600A8]/20 rounded-[30px] p-6 backdrop-blur-md flex-col gap-3">
              <h4 className="text-[#D7E2EA] font-semibold text-sm uppercase tracking-wider">Looking for a PDF copy?</h4>
              <p className="text-[#D7E2EA]/60 text-xs leading-relaxed font-light">
                Download my complete resume for a printer-friendly version of these credentials.
              </p>
              <a
                href="/Usman_wajid.pdf"
                download="Usman_wajid.pdf"
                className="w-fit flex items-center gap-1.5 px-4 py-2 mt-2 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA] text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                Download Resume <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column - Timeline Cards */}
          <div className="lg:col-span-8 relative">
            
            {/* Timeline Line */}
            <div className="absolute left-6 sm:left-10 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#B600A8]/30 via-[#00F0FF]/30 to-[#D7E2EA]/5 pointer-events-none" />

            {/* Experience Cards Loop */}
            <div className="flex flex-col gap-10 md:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredExperiences.map((exp) => {
                  return (
                    <motion.div
                      key={exp.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative pl-14 sm:pl-20 group"
                    >
                      {/* Timeline Node Icon Indicator */}
                      <div 
                        className="absolute left-[14px] sm:left-[30px] top-4 w-5 h-5 rounded-full border-4 border-[#0C0C0C] z-10 transition-all duration-300 group-hover:scale-130 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ 
                          backgroundColor: exp.accentColor,
                          boxShadow: `0 0 12px ${exp.accentColor}40`
                        }}
                      />

                      {/* Glassmorphic Experience Card */}
                      <div className={`w-full rounded-[35px] border border-[#D7E2EA]/10 bg-[#121212]/40 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:${exp.glowColor} group-hover:bg-[#121212]/60`}>
                        
                        {/* Header Details */}
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-[#D7E2EA]/10 pb-5 mb-5">
                          
                          {/* Company Letter Logo & Title */}
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center font-black text-xl text-white shadow-lg`}>
                              {exp.avatarChar}
                            </div>
                            <div>
                              <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl tracking-wide group-hover:text-white transition-colors">
                                {exp.role}
                              </h3>
                              <p className="text-[#D7E2EA]/85 text-sm sm:text-base font-medium">
                                {exp.company} <span className="text-xs font-light text-[#D7E2EA]/50 ml-1.5 uppercase tracking-widest px-2 py-0.5 border border-[#D7E2EA]/10 rounded-full bg-[#D7E2EA]/5">{exp.type}</span>
                              </p>
                            </div>
                          </div>

                          {/* Date & Location */}
                          <div className="flex flex-col sm:items-end text-xs sm:text-sm text-[#D7E2EA]/60 font-light">
                            <span className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                          </div>

                        </div>

                        {/* Bullet Details */}
                        <ul className="flex flex-col gap-3 mb-6">
                          {exp.details.map((detail, dIdx) => (
                            <li 
                              key={dIdx} 
                              className="text-xs sm:text-sm text-[#D7E2EA]/75 leading-relaxed font-light"
                              dangerouslySetInnerHTML={{ __html: detail }}
                            />
                          ))}
                        </ul>

                        {/* Skills pill list */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {exp.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[#D7E2EA]/80 group-hover:border-white/10 group-hover:text-white group-hover:bg-white/10 transition-all"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Verified Documents Links */}
                        {exp.docs && exp.docs.length > 0 && (
                          <div className="border-t border-[#D7E2EA]/10 pt-4 flex flex-wrap gap-3">
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/40 w-full mb-1">
                              Verified Documents:
                            </span>
                            {exp.docs.map((doc, dIdx) => (
                              <a
                                key={dIdx}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-xs text-[#D7E2EA]/70 hover:text-white font-medium bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/15 border border-[#D7E2EA]/10 px-3.5 py-1.5 rounded-full transition-all duration-300 transform hover:scale-[1.03]"
                              >
                                {getDocIcon(doc.type)}
                                {doc.label}
                                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
                              </a>
                            ))}
                          </div>
                        )}

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
