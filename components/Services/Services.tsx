import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Surah',
    subtitle: 'QURANI WAZAIF',
    image: '/surah image.jpg',
  },
  {
    title: 'Naqsh',
    subtitle: 'ROOHANI ASRAAR',
    image: '/naqsh image.jpg',
  },
  {
    title: 'Taveez',
    subtitle: 'HIFAZAT O BARKAT',
    image: '/taveez image.jpg',
  },
  {
    title: 'Istikhara',
    subtitle: 'MUBARAK RAHNUMAI',
    image: '/istikhara.jpg',
  }
];

export default function Services() {
  return (
    <section className="w-full py-28 bg-white relative font-outfit">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        {/* Header Section */}
        <h2 className="text-[#0A3D24] font-serif text-3xl sm:text-4xl md:text-[3.2rem] font-bold mb-4 text-center">
          Muntakhib Khidmaat
        </h2>
        
        {/* Decorative Line Under Header */}
        <div className="h-[2px] w-48 sm:w-64 md:w-96 mb-12 sm:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22C55E]/80 to-transparent"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative group rounded-[2rem] overflow-hidden aspect-[3/4.2] sm:aspect-[3/4.5] shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image using Next.js Image component */}
              <Image 
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-[800ms] group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021A0A] via-[#021A0A]/60 to-transparent/10 z-10"></div>

              {/* Arrow Icon at Bottom-Right */}
              <Link 
                href="/contact"
                className="absolute bottom-6 right-6 z-30 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full border border-white/20 group-hover:bg-[#22C55E] group-hover:border-[#22C55E] transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="text-white w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </Link>

              {/* Card Content (Positioned at Bottom) */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-center text-center z-20">
                <h3 className="text-white font-serif text-3xl md:text-[2rem] font-medium mb-1 drop-shadow-sm">
                  {service.title}
                </h3>
                <p className="text-[#9DE3BA] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
                  {service.subtitle}
                </p>
                {/* Small Green Line */}
                <div className="w-8 h-[2px] bg-[#22C55E] rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

