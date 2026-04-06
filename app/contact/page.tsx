"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Phone, User, MessageSquare, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] selection:bg-[#22C55E]/20">
      <Navbar />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0A8B42]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0A3D24]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content & Branding */}
        <div className="flex flex-col items-start">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[#0A3D24]/60 hover:text-[#0A3D24] transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase">Wapis Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0A8B42]/20 bg-[#0A8B42]/5 mb-8">
            <Sparkles size={14} className="text-[#0A8B42]" />
            <span className="text-[#0A8B42] text-[10px] font-bold tracking-[0.3em] uppercase">Rabta Form</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-[#0A3D24] leading-tight mb-8">
            Apne <span className="text-[#22C55E] italic">Masail</span> Ka <br />
            Hal Payein
          </h1>

          <p className="text-[#384A61] text-lg md:text-xl max-w-md leading-relaxed mb-12">
            Quran-e-Pak ki roshni mein har mushkil ka hal mumkin hai. Hamare maheen apka khususi mushwara aur rehnumai karenge.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#22C55E]">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">WhatsApp</p>
                <p className="text-[#0A3D24] font-bold text-lg">+92 300 1234567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="relative">
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-[#0A8B42]/10 rounded-[3rem] pointer-events-none hidden md:block"></div>
          
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-[#0A3D24]/10 p-8 md:p-12 border border-white">
            <h3 className="font-serif text-3xl text-[#0A3D24] mb-8 font-bold">Zaroori Maloomat</h3>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#0A3D24] tracking-widest uppercase ml-1">Pura Naam</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22C55E] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Apna naam likhein..." 
                    className="w-full bg-[#f9fafb] border-2 border-transparent p-5 pl-14 rounded-2xl outline-none focus:border-[#22C55E]/30 focus:bg-white transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#0A3D24] tracking-widest uppercase ml-1">WhatsApp Number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22C55E] transition-colors" size={20} />
                  <input 
                    type="tel" 
                    placeholder="03xx xxxxxxx" 
                    className="w-full bg-[#f9fafb] border-2 border-transparent p-5 pl-14 rounded-2xl outline-none focus:border-[#22C55E]/30 focus:bg-white transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#0A3D24] tracking-widest uppercase ml-1">Aapka Masla / Sawal</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-5 top-6 text-gray-400 group-focus-within:text-[#22C55E] transition-colors" size={20} />
                  <textarea 
                    rows={5}
                    placeholder="Apna masla wazahat se likhein..." 
                    className="w-full bg-[#f9fafb] border-2 border-transparent p-5 pl-14 rounded-2xl outline-none focus:border-[#22C55E]/30 focus:bg-white transition-all text-sm font-medium resize-none shadow-sm"
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#0A3D24] hover:bg-[#0A8B42] text-white py-5 rounded-2xl font-bold tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-[#0A3D24]/20 hover:shadow-[#0A8B42]/30 group"
              >
                MASLA SUBMIT KAREIN 
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
