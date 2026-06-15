import React from "react";

export const SpectraNoise: React.FC = () => {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        style={{ opacity: 0.04 }}
      >
        <div 
          className="w-[300%] h-[300%] absolute -top-[100%] -left-[100%] bg-repeat animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Inject custom tailwind animation keyframes for the grain noise */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform:translate(0, 0); }
          10% { transform:translate(-5%, -10%); }
          20% { transform:translate(-15%, 5%); }
          30% { transform:translate(7%, -25%); }
          40% { transform:translate(-5%, 25%); }
          50% { transform:translate(-15%, 10%); }
          60% { transform:translate(15%, 0%); }
          70% { transform:translate(0%, 15%); }
          80% { transform:translate(3%, 35%); }
          90% { transform:translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </>
  );
};
