"use client";

import React from 'react';

const TopMarquee = () => {
  const items = [
    "KALA JADU TOR",
    "HAR MUSHKIL KA HAL",
    "ISTIKHARA ONLINE",
    "TAVEEZAT-E-QURANI",
    "ROOHANI ILAJ",
    "MANPASAND SHADI",
    "KAROBARI BANDISH",
    "AULAD KA MASLA",
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0A8B42] text-white py-2.5 z-[60] overflow-hidden whitespace-nowrap shadow-md">
      <div className="flex animate-marquee">
        {/* First set of items */}
        <div className="flex shrink-0 items-center justify-around gap-12 min-w-full">
          {items.map((item, index) => (
            <div key={`first-${index}`} className="flex items-center gap-12">
              <span className="text-[11px] md:text-sm font-bold tracking-[0.25em]">{item}</span>
              <span className="w-1.5 h-1.5 bg-white/40 rotate-45"></span>
            </div>
          ))}
        </div>
        {/* Second set of items (duplicated for seamless loop) */}
        <div className="flex shrink-0 items-center justify-around gap-12 min-w-full">
          {items.map((item, index) => (
            <div key={`second-${index}`} className="flex items-center gap-12">
              <span className="text-[11px] md:text-sm font-bold tracking-[0.25em]">{item}</span>
              <span className="w-1.5 h-1.5 bg-white/40 rotate-45"></span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll animation styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TopMarquee;
