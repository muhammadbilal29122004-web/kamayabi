import React from 'react';
import Link from 'next/link';

// Inline SVGs for consistent icons across the app
const IconForm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="10" y1="14" x2="14" y2="14"></line></svg>
);

const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const IconTime = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18" rx="1"></rect><rect x="10" y="8" width="4" height="13" rx="1"></rect><rect x="2" y="13" width="4" height="8" rx="1"></rect></svg>
);

const offersList = [
  {
    num: '01',
    icon: <IconForm />,
    category: 'FORM / REGISTRATION',
    title: 'Lucky Stone Form',
    priceText: '1,250 Rs',
    color: '#0A8B42',
    shapeBg: 'bg-[#0A8B42]/5',
  },
  {
    num: '02',
    icon: <IconChat />,
    category: 'CONSULTATION',
    title: 'Special Guideline',
    priceText: 'Consult Now',
    color: '#0A3D24',
    shapeBg: 'bg-[#0A3D24]/5',
  },
  {
    num: '03',
    icon: <IconTime />,
    category: 'SESSION',
    title: 'Appointment',
    priceText: '30 Mins Walk-in',
    color: '#0A8B42',
    shapeBg: 'bg-[#0A8B42]/5',
  },
  {
    num: '04',
    icon: <IconChart />,
    category: 'NUMEROLOGY REPORT',
    title: 'Zaicha Form',
    priceText: '5,550 Rs',
    color: '#0A3D24',
    shapeBg: 'bg-[#0A3D24]/5',
  }
];

export default function Offers() {
  return (
    <section className="w-full py-32 relative overflow-hidden bg-[#FAFAFA]">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0A8B42]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0A3D24]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 z-0"></div>
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0A8B42 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-5 lg:sticky lg:top-32">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-3 border border-[#0A8B42]/20 bg-white shadow-sm px-4 sm:px-5 py-2 rounded-full mb-6 md:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A8B42] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A8B42]"></span>
            </span>
            <span className="text-[#0A8B42] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">SPECIAL OFFERS</span>
          </div>
          
          <h2 className="font-serif text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] leading-[1] mb-6 md:mb-8">
            <span className="text-[#0A3D24] font-medium block">Khususi</span>
            <span className="text-[#0A8B42] font-bold block italic">Peshkash</span>
          </h2>
          
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#0A8B42] to-transparent rounded-full mb-8 md:mb-10 lg:ml-0"></div>
          
          <p className="text-[#475569] text-base sm:text-lg leading-relaxed mb-10 md:mb-12 max-w-sm sm:max-w-md">
            Humari khusoosi khidmaat aapki roohani aur dunyawi pareshaniyon ka mukammal aur mustaqil hal paish karti hain. Aaj hi rabta karein.
          </p>
          
          <Link 
            href="/contact"
            className="group relative py-3.5 sm:py-4 px-8 sm:px-10 overflow-hidden rounded-full bg-[#0A3D24] text-white transition-all shadow-xl hover:shadow-[#0A3D24]/30 inline-block text-center"
          >
            <span className="relative z-10 font-bold text-[10px] sm:text-[11px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em]">SAB OFFERS DEKHEIN</span>
            <div className="absolute inset-0 bg-[#0A8B42] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
          </Link>
        </div>

        {/* Right Column (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-7">
          {offersList.map((offer, i) => (
             <div 
               key={i} 
               className="group relative bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-start transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(10,139,66,0.15)] hover:-translate-y-2 overflow-hidden"
             >
               {/* Animated Background Shape */}
               <div className={`absolute -top-10 -right-10 w-40 h-40 ${offer.shapeBg} rounded-full transition-transform duration-700 group-hover:scale-150`}></div>
               
               {/* Huge Background Number */}
               <div className="absolute -bottom-10 right-4 text-[12rem] font-black text-gray-50/50 group-hover:text-gray-100/50 transition-colors duration-500 select-none">
                 {offer.num}
               </div>

               {/* Icon Header */}
               <div 
                 className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                 style={{ backgroundColor: offer.color, color: 'white' }}
               >
                 {offer.icon}
               </div>

               {/* Content */}
               <div className="relative z-10 mt-auto">
                 <p className="text-[#0A8B42] text-[10px] font-bold tracking-[0.2em] mb-4 uppercase opacity-80">
                   {offer.category}
                 </p>
                 
                 <h3 className="font-serif text-3xl text-[#0A3D24] mb-8 font-semibold leading-tight group-hover:text-[#0A8B42] transition-colors">
                   {offer.title}
                 </h3>
                 
                 <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">Starting Price</span>
                      <span className="text-[#0A3D24] text-xl font-bold">{offer.priceText}</span>
                    </div>
                    
                    <Link 
                      href="/contact"
                      className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-[#0A8B42] group-hover:border-[#0A8B42] group-hover:text-white transition-all duration-300 pointer-events-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
