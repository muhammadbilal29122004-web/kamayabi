import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/home page hero vedio.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for blending and text readability */}
      <div className="absolute inset-0 bg-white/30 z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#fdfdfd] via-[#fdfdfd]/90 to-transparent z-0"></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-32 sm:mt-40 md:mt-48">
        {/* Bismillah Tag */}
        <div className="mb-6 md:mb-8 px-5 md:px-10 py-2 md:py-2.5 rounded-full border border-[#0A8B42]/30 bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-[#0A8B42] text-[9px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase pl-1">
            Bismillah hir rahman nir raheem
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] text-[#0A3D24] leading-none mb-2 drop-shadow-sm">
          Kamayabi
        </h1>

        {/* Subtitle with lines */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 w-full max-w-lg">
          <div className="h-[1px] flex-1 bg-[#0A3D24]/40"></div>
          <h2 className="font-bold text-[#0A3D24] tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm md:text-2xl pt-1 whitespace-nowrap">
            ROOHANI MARKAZ
          </h2>
          <div className="h-[1px] flex-1 bg-[#0A3D24]/40"></div>
        </div>

        {/* Paragraph */}
        <p className="max-w-2xl text-[#384A61] text-sm sm:text-base md:text-xl font-medium leading-relaxed mb-12 md:mb-16">
          Quran-e-Kareem ki barkat aur kamil hifazat ke zariye apni<br className="hidden sm:block" />
          zindagi mein asaniyaan paida karein. Har pareshani ka<br className="hidden sm:block" />
          mukammal shari'i hal yahan mojud hai.
        </p>

        {/* Scroll Indicator - Hidden on very small screens to save space */}
        <div className="hidden sm:flex flex-col items-center gap-3 mb-8">
          <span className="text-[10px] text-[#5f7468] tracking-[0.2em] font-semibold">SCROLL</span>
          <div className="h-4 w-[1px] bg-[#5f7468]"></div>
        </div>

        {/* CTA Button */}
        <Link 
          href="/contact"
          className="bg-[#0A4328] hover:bg-[#0A8B42] text-white font-bold text-[11px] sm:text-xs md:text-sm tracking-[0.15em] px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 shadow-[0_4px_14px_0_rgba(10,67,40,0.39)] hover:shadow-[0_6px_20px_0_rgba(10,139,66,0.4)] hover:scale-105 rounded-tr-[30px] sm:rounded-tr-[40px] rounded-tl-none rounded-bl-none rounded-br-none cursor-pointer inline-block"
        >
          KAAM SHURU KAREIN
        </Link>
      </div>
    </div>
  );
}
