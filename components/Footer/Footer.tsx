import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, Diamond } from 'lucide-react';

export default function Footer() {
  const exploreLinks = [
    { name: 'Home Page', href: '/' },
    { name: 'Surah Collection', href: '/surah' },
    { name: 'Naqsh O Taveez', href: '/naqsh' },
    { name: 'Online Istikhara', href: '/istikhara' }
  ];

  const servicesLinks = [
    { name: 'Shadi Mein Rukawat', href: '/services/shadi' },
    { name: 'Karobari Bandish', href: '/services/karobar' },
    { name: 'Nazar-e-Bad Ka Tor', href: '/services/nazar' },
    { name: 'Gharelu Na-Ittifaqi', href: '/services/gharelu' }
  ];

  return (
    <footer className="w-full bg-[#021A0A] relative pt-20 pb-10 overflow-hidden">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Logo & Vision (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Logo Box */}
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#042814] border border-[#0A3D24] shadow-xl mb-6 w-max">
              <div className="w-4 h-4 bg-[#22C55E] flex items-center justify-center rotate-45 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-white font-serif text-2xl font-bold tracking-widest">KAMAYABI</span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              Qurani rahnumai aur roohani elaj ke zariye hum aapki zindagi mein khushali aur barkat lane ke liye koshish karte hain.
            </p>

            {/* Social / Decorative Icons */}
            <div className="flex gap-4">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border border-[#0A3D24] bg-[#021A0A] hover:bg-[#042814] hover:border-[#22C55E]/50 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                >
                  <div className="w-2 h-2 bg-[#0A3D24] group-hover:bg-[#22C55E] transition-colors duration-300 rotate-45 shadow-sm group-hover:shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Explore (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
              <h3 className="text-[#22C55E] text-xs font-bold tracking-[0.2em] uppercase">Explore</h3>
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
            </div>
            
            <ul className="flex flex-col gap-4">
              {exploreLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
              <h3 className="text-[#22C55E] text-xs font-bold tracking-[0.2em] uppercase">Services</h3>
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
            </div>
            
            <ul className="flex flex-col gap-4">
              {servicesLinks.map((link, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D24]"></div>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
              <h3 className="text-[#22C55E] text-xs font-bold tracking-[0.2em] uppercase">Contact</h3>
              <div className="w-4 h-[1px] bg-[#22C55E]"></div>
            </div>
            
            {/* WhatsApp Box */}
            <div className="bg-[#042814] border border-[#0A3D24] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#05351a] hover:border-[#22C55E]/50 transition-all duration-300 mb-8 group shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-[#021A0A] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#22C55E] text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5">Contact Us</span>
                  <span className="text-white text-sm font-bold">WhatsApp Now</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>

            {/* Quote */}
            <div className="relative pl-6 hidden sm:block">
              <span className="absolute left-0 top-0 text-xl font-serif text-[#0A3D24]">"</span>
              <p className="text-[#22C55E]/40 text-xs font-bold leading-relaxed italic pr-4 tracking-wide">
                DUA WO HATHIYAR HAI JO MAUT KE ILAWA HAR CHEEZ KO TAAL SAKTI HAI.
              </p>
              <span className="absolute right-0 bottom-0 text-xl font-serif text-[#0A3D24]">"</span>
            </div>
          </div>

        </div>

        {/* Bottom Line & Copyright */}
        <div className="relative flex flex-col items-center pt-10">
          {/* Horizontal Line with Diamond */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#0A3D24]"></div>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#021A0A] px-4">
            <Diamond className="w-3 h-3 text-[#0A3D24] rotate-45" />
          </div>

          {/* Copyright Text */}
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 rounded-full border border-[#22C55E] flex items-center justify-center opacity-50">
               <div className="w-0.5 h-0.5 bg-[#22C55E] rounded-full"></div>
             </div>
             <p className="text-[10px] sm:text-xs text-[#22C55E] tracking-[0.2em] font-bold text-center">
               2026 KAMAYABI ROOHANI MARKAZ — KARACHI, PAKISTAN. ALL RIGHTS RESERVED.
             </p>
          </div>

          {/* Devotion Text */}
          <p className="text-[9px] text-[#0A3D24] tracking-[0.3em] uppercase font-bold">
            Crafted with faith & devotion
          </p>
        </div>

      </div>
    </footer>
  );
}
