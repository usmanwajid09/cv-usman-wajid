import React from "react";
import { FadeIn } from "../components/FadeIn";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Software Engineering",
    description: "Designing and building robust, scalable software architectures using Object-Oriented Programming, Data Structures, Algorithms, and clean code practices.",
  },
  {
    id: "02",
    title: "AI & Machine Learning",
    description: "Developing intelligent solutions ranging from machine learning models for classification (such as chest X-ray diagnosis) to modern LLM integrations and automated systems.",
  },
  {
    id: "03",
    title: "Full-Stack Web Dev",
    description: "Building responsive, modern web applications using the MERN stack (MongoDB, Express, React, Node.js) and designing optimized relational databases (SQL).",
  },
  {
    id: "04",
    title: "Mobile App Development",
    description: "Crafting cross-platform mobile experiences with Flutter and Dart, focused on seamless local storage, responsive UI, notifications, and polished animations.",
  },
  {
    id: "05",
    title: "UI/UX & Graphic Design",
    description: "Creating premium user-centric interfaces and brand layouts based on Human-Computer Interaction fundamentals to establish cohesive, visually striking product designs.",
  },
  {
    id: "06",
    title: "Computer Networks & Systems",
    description: "Designing network architectures in Cisco Packet Tracer and implementing low-level performance systems, from 8086 Assembly Racer games to Digital Image Processing.",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Services Section Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2 className="font-black uppercase text-center text-[#0C0C0C] text-[3.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tight">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {servicesData.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.1}
              y={30}
              className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 flex flex-row items-center gap-6 sm:gap-10 md:gap-14"
            >
              {/* Left Side: Massive Number */}
              <div className="font-black text-[#0C0C0C] text-[2.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8.5rem] leading-none select-none tracking-tight min-w-[70px] sm:min-w-[140px] md:min-w-[180px]">
                {service.id}
              </div>

              {/* Right Side: Title + Description */}
              <div className="flex flex-col justify-center flex-1">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[1.1rem] sm:text-[1.5rem] md:text-[1.8rem] lg:text-[2.1rem] leading-tight tracking-wide mb-2">
                  {service.title}
                </h3>
                <p className="font-light text-[#0C0C0C]/60 text-[0.8rem] sm:text-[0.95rem] md:text-[1.1rem] lg:text-[1.25rem] leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
