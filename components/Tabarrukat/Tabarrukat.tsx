import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const topItems = [
  {
    title: 'Appendent Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/appendent surah.jpg',
  },
  {
    title: 'Bengals Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/bengals surah.jpg',
  }
];

const bottomItems = [
  {
    title: 'Ring Gemestone',
    subtitle: 'PREMIUM COLLECTION',
    image: '/ring gemestone.jpg',
  },
  {
    title: 'Ring Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/ring surah.jpg',
  },
  {
    title: 'Stone',
    subtitle: 'PREMIUM COLLECTION',
    image: '/stone.jpg',
  }
];

// Helper component for the glass card
const GlassCard = ({ title, subtitle, image, isTop }: { title: string, subtitle: string, image: string, isTop: boolean }) => (
  <div className={`relative group rounded-[2rem] overflow-hidden ${isTop ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-square md:aspect-[4/4.5]'} shadow-lg hover:shadow-2xl transition-all duration-300`}>
    <Image 
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
      sizes={isTop ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
    />
    
    {/* Very subtle gradient to ensure white text always has contrast if needed, though glass handles most of it */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-80"></div>

    {/* Inset Glassmorphism details box */}
    <div className="absolute bottom-4 inset-x-4 md:bottom-6 md:inset-x-6 z-10 transition-transform duration-300 group-hover:-translate-y-2">
      <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-4 md:p-5 flex items-center justify-between shadow-xl">
        <div className="flex flex-col">
          <h3 className="text-white font-serif text-lg md:text-xl font-bold mb-1 drop-shadow-sm">
            {title}
          </h3>
          <p className="text-[#86e2af] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase drop-shadow-sm">
            {subtitle}
          </p>
        </div>
        
        {/* Arrow Button */}
        <Link 
          href="/contact"
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#00B359]/80 group-hover:border-[#00B359] group-hover:shadow-[0_0_15px_rgba(0,179,89,0.5)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default function Tabarrukat() {
  return (
    <section className="w-full py-28 relative">
      {/* Background with faint dot pattern */}
      <div className="absolute inset-0 bg-[#fdfdfd] z-[-2]"></div>
      <div 
        className="absolute inset-0 z-[-1] opacity-50"
        style={{
          backgroundImage: 'radial-gradient(#ccebda 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[#0A3D24] font-serif text-4xl md:text-[3.2rem] font-bold mb-4">
            Mubarak Tabarrukat
          </h2>
          
          {/* Decorative Line */}
          <div className="h-[2px] w-48 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22C55E]/80 to-transparent"></div>
          </div>

          <p className="text-[#384A61] text-sm md:text-base font-medium max-w-2xl px-4">
            Roohani faiz aur hifazat ke liye khas tayar karda mubarak surah, gems aur rings.
          </p>
        </div>

        {/* Content Grids */}
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
          
          {/* Top Row: 2 Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topItems.map((item, index) => (
              <GlassCard key={index} {...item} isTop={true} />
            ))}
          </div>

          {/* Bottom Row: 3 Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bottomItems.map((item, index) => (
              <GlassCard key={index} {...item} isTop={false} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
