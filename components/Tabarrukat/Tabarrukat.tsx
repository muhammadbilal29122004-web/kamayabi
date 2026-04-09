import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const topItems = [
  {
    title: 'Loh Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/appendent surah.jpg',
    href: '/loh',
  },
  {
    title: 'Cara Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/bengals surah.jpg',
    href: '/cara',
  }
];

const bottomItems = [
  // {
  //   title: 'Ring Gemestone',
  //   subtitle: 'PREMIUM COLLECTION',
  //   image: '/ring gemestone.jpg',
  // },
  {
    title: 'Ring Surah',
    subtitle: 'PREMIUM COLLECTION',
    image: '/ring surah.jpg',
    href: '/ring',
  },
  {
    title: 'Stone',
    subtitle: 'PREMIUM COLLECTION',
    image: '/stone.jpg',
    href: '/stone',
  }
];

const GlassCard = ({
  title,
  subtitle,
  image,
  href,
  isTop,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  isTop: boolean;
}) => (
  <Link
    href={href}
    className={`relative group block rounded-[2rem] overflow-hidden ${
      isTop ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-square md:aspect-[4/4.5]'
    } shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
  >
    <Image 
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
      sizes={isTop ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#06120b]/85 via-[#06120b]/35 to-transparent"></div>

    <div className="absolute bottom-0 inset-x-0 p-6 md:p-7 z-10">
      <div className="rounded-2xl border border-white/20 bg-black/20 px-5 py-4 shadow-lg">
        <div className="flex flex-col">
          <h3 className="text-white font-serif text-2xl md:text-[1.7rem] font-bold leading-tight mb-1">
            {title}
          </h3>
          <p className="text-[#8ef0bb] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase">
            {subtitle}
          </p>
          <div className="w-10 h-[2px] bg-[#22C55E] rounded-full mt-3"></div>
        </div>
      </div>
    </div>
  </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bottomItems.map((item, index) => (
              <GlassCard key={index} {...item} isTop={false} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
