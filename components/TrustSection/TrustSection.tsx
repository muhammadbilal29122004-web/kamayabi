import React from 'react';
import Image from 'next/image';
import { Lock, BookOpen, Sparkles } from 'lucide-react';

const trustPoints = [
  {
    icon: Lock,
    title: "Mukammal Raazdaari",
    desc: "Aapki tamam maloomat aur masail hifazat se rakhe jate hain."
  },
  {
    icon: BookOpen,
    title: "Qurani Tariqa",
    desc: "Koi ghalat rasta nahi, sirf quran-o-pak ke mubarak asraar."
  },
  {
    icon: Sparkles,
    title: "Mustaqil Asar",
    desc: "Aise amaliyat jo waqti nahi balki hamesha ke liye asar chorte hain."
  }
];

export default function TrustSection() {
  return (
    <section className="w-full py-24 bg-[#021811] relative overflow-hidden">
      
      {/* Subtle dotted background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #22C55E 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Text and Cards */}
        <div className="flex flex-col space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full border border-green-500/30 bg-green-500/10">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#22c55e] uppercase">
                Trust & Legacy
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Hum Par Aitmaad<br />
              <span className="text-[#22c55e]">Kyun Karein?</span>
            </h2>
            
            <p className="text-gray-300 text-[15px] md:text-base leading-relaxed max-w-lg">
              Kamayabi Roohani Markaz hamesha Quran-e-Pak aur Sunnat ki roshni mein rehnumai karta hai, jahan har maslay ka mukammal shari'i aur roohani hal mojood hai.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {trustPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-full lg:max-w-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-transparent border border-[#22c55e]/20 mr-4">
                    <Icon className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-[17px] font-medium mb-1">
                      {point.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 leading-snug">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Image and Overlay */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-2xl">
            {/* Background Image */}
            <Image 
              src="/praying_man.png" 
              alt="Praying Man" 
              fill
              className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
            />
            
            {/* Decorative Corner (Top Right) */}
            <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#22c55e]/80 z-20 pointer-events-none"></div>

            {/* Bottom Info Box */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-gradient-to-t from-[#0a1510] to-[#0a1510]/80 backdrop-blur-md border border-white/5 p-6 flex flex-col items-center justify-center text-center z-20">
              <Sparkles className="w-4 h-4 text-[#22c55e] mb-3" />
              <h4 className="text-white font-serif text-[1.6rem] font-medium mb-3">Rab ka Fazal</h4>
              <p className="text-[9px] md:text-[10px] text-gray-300 font-bold tracking-[0.2em] uppercase leading-loose">
                Har mushkil aasaan hai, jab roohaniyat<br />
                se jura har amal ho
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
