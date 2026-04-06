import React from 'react';

const steps = [
  {
    num: "01",
    title: "Rabita Karein",
    desc: "Hamare diye gaye number ya form ke zariye apna roohani masla tafseel se batayein."
  },
  {
    num: "02",
    title: "Roohani Jaiza",
    desc: "Aapke maslay ki roshni mein istikhara aur zaicha ke mutabiq behtareen hal nikala jayega."
  },
  {
    num: "03",
    title: "Mubarak Hal",
    desc: "Taveez, Naqsh ya Qurani wazaif aapko faraaham kiye jayenge taa ke apko fori sakoon mile."
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full py-28 bg-white relative">
      
      {/* Decorative Dotted Divider at Top (Optional) */}
      <div className="absolute top-0 left-0 right-0 h-16 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #22C55E 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Header Section */}
        <h2 className="text-[#0A3D24] font-serif text-3xl sm:text-4xl md:text-[3.2rem] font-bold mb-4 text-center">
          Kaam Ka Tariqa
        </h2>
        
        {/* Decorative Line Under Header */}
        <div className="h-[2px] w-48 sm:w-64 md:w-96 mb-12 sm:mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22C55E]/80 to-transparent"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-5xl">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              
              {/* Circle container */}
              <div className="w-[4.5rem] h-[4.5rem] rounded-full border border-[#c6f0d7] bg-[#f2fdf7] flex items-center justify-center mb-6 shadow-sm">
                <span className="text-xl md:text-2xl font-bold text-[#0A3D24]">{step.num}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-[1.35rem] text-[#1a2e44] font-serif mb-4 font-medium">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
