import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Volume2, Sparkles, Compass, ArrowDown, Play, Flame } from 'lucide-react';
import { MakkahKaabaIcon } from './MakkahKaabaIcon';

interface HeroProps {
  onStartReading: () => void;
  onListenAudio: () => void;
  onViewPrayerTimes: () => void;
  quickSurahJump: (surahNumber: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartReading,
  onListenAudio,
  onViewPrayerTimes,
  quickSurahJump,
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F8FAF8] via-[#FFFFFF] to-[#F8FAF8]">
      
      {/* Background Image Overlay: Mosque Sunrise / Light Illumination */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2000&q=80"
          alt="Mosque Sunrise Background"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-100 scale-100 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/80 to-[#F8FAF8]/70"></div>
        <div className="absolute inset-0 islamic-pattern-bg opacity-20"></div>
      </div>

      {/* Floating Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Animated Bismillah Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <div className="relative group px-6 py-3 rounded-full bg-white/95 border border-[#D4AF37]/30 shadow-md backdrop-blur-md">
            <span className="font-amiri text-2xl sm:text-4xl tracking-wide font-bold gold-gradient-text drop-shadow-[0_1px_4px_rgba(180,83,9,0.15)]">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
            <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/5 blur-sm -z-10 group-hover:bg-[#D4AF37]/10 transition-all"></div>
          </div>
        </motion.div>

        {/* Floating 3D Golden Quran Emblem & Makkah Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 cursor-pointer animate-float"
          onClick={onStartReading}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-emerald-500/20 blur-2xl animate-pulse"></div>
          
          {/* Running Makkah Kaaba Logo Orbiting the Hero Emblem */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={30} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={30} />
          </div>

          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-white to-slate-50 border-2 border-[#D4AF37]/50 p-5 flex flex-col items-center justify-center shadow-[0_10px_35px_rgba(212,175,55,0.15)] group hover:border-[#D4AF37] transition-all overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MakkahKaabaIcon size={38} />
            </div>
            <span className="font-cinzel text-xs font-bold text-emerald-800 tracking-widest uppercase">
              HOLY QURAN
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">114 SURAHS • MAKKAH</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4"
        >
          Read, Listen & Reflect on the <br className="hidden sm:inline" />
          <span className="gold-gradient-text drop-shadow-sm">Holy Quran</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          A peaceful, modern digital experience to explore the eternal words of Allah with complete translations, word-by-word analysis, and studio-quality audio recitations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={onStartReading}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#0F766E] text-white font-bold text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span>Read Quran</span>
          </button>

          <button
            onClick={onListenAudio}
            className="px-7 py-3.5 rounded-full bg-white text-emerald-800 hover:text-emerald-900 border border-[#D4AF37]/50 hover:border-emerald-600 font-semibold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-[#B45309]" />
            <span>Listen Recitation</span>
          </button>

          <button
            onClick={onViewPrayerTimes}
            className="px-5 py-3.5 rounded-full bg-white text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-[#D4AF37]/50 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Prayer & Qibla</span>
          </button>
        </motion.div>

        {/* Quick Surah Shortcuts Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500"
        >
          <span className="text-[#B45309] font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#B45309]" /> Quick Explore:
          </span>
          <button onClick={() => quickSurahJump(1)} className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#B45309] border border-slate-200 hover:border-[#D4AF37]/50 shadow-sm transition-all">
            Al-Fatiha (1)
          </button>
          <button onClick={() => quickSurahJump(36)} className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#B45309] border border-slate-200 hover:border-[#D4AF37]/50 shadow-sm transition-all">
            Ya-Sin (36)
          </button>
          <button onClick={() => quickSurahJump(55)} className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#B45309] border border-slate-200 hover:border-[#D4AF37]/50 shadow-sm transition-all">
            Ar-Rahman (55)
          </button>
          <button onClick={() => quickSurahJump(67)} className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#B45309] border border-slate-200 hover:border-[#D4AF37]/50 shadow-sm transition-all">
            Al-Mulk (67)
          </button>
          <button onClick={() => quickSurahJump(112)} className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#B45309] border border-slate-200 hover:border-[#D4AF37]/50 shadow-sm transition-all">
            Al-Ikhlas (112)
          </button>
        </motion.div>

      </div>
    </div>
  );
};
