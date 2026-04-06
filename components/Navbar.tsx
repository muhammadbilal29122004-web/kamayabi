"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SURAH', href: '/surah' },
    { name: 'NAQSH', href: '/naqsh' },
    { name: 'TAVEEZ', href: '/taveez' },
    { name: 'ISTIKHARA', href: '/istikhara' },
    { name: 'LOH', href: '/loh' },
    { name: 'CARA', href: '/cara' },
    { name: 'RING', href: '/ring' },
    { name: 'STONE', href: '/stone' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1300px] px-4">
      <nav className="flex items-center justify-between bg-white rounded-full py-2 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 relative">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-[#00B359] rounded-[3px] rotate-45 transform origin-center shadow-sm flex-shrink-0"></div>
          <span className="font-serif text-[#0E3E26] font-bold text-xl md:text-2xl tracking-[0.15em] pt-0.5">KAMAYABI</span>
        </div>

        {/* Links Section (Desktop) */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-4 xl:gap-6 font-bold text-[10px] xl:text-[11px] tracking-[0.15em]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors duration-200 ${
                  isActive 
                    ? "text-[#00B359]" 
                    : "text-[#384A61] hover:text-[#00B359]"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-2">
          {/* RAABTA Button (Desktop) */}
          <button className="bg-[#111827] hover:bg-[#00B359] text-white font-bold text-[13px] tracking-[0.15em] px-8 py-3.5 rounded-full transition-all duration-300 hidden md:block shadow-lg hover:shadow-[#00B359]/20 transform hover:-translate-y-0.5">
            RAABTA
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-full bg-gray-50 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-0.5 bg-[#0E3E26] transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-[#0E3E26] transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-[#0E3E26] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 lg:hidden transform transition-all duration-300 origin-top ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="grid grid-cols-2 gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-center font-bold text-[11px] tracking-[0.2em] transition-all ${
                    isActive 
                      ? "bg-[#00B359]/10 text-[#00B359]" 
                      : "bg-gray-50 text-[#384A61] hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
          <button className="w-full mt-6 bg-[#111827] text-white font-bold text-xs tracking-[0.2em] py-4 rounded-xl shadow-lg">
            RAABTA KRAIN
          </button>
        </div>
      </nav>
    </div>
  );
}
