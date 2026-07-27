import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Volume2, Sparkles, Compass, ArrowDown, Play, Flame } from 'lucide-react';
import { MakkahKaabaIcon } from './MakkahKaabaIcon';

interface HeroProps {
  onStartReading: () => void;
  onListenAudio: () => void;
  onOpenAiAssistant: () => void;
  onViewPrayerTimes: () => void;
  quickSurahJump: (surahNumber: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartReading,
  onListenAudio,
  onOpenAiAssistant,
  onViewPrayerTimes,
  quickSurahJump,
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#080C0B] via-[#0E1714] to-[#080C0B]">
      
      {/* Background Image Overlay: Mosque Sunrise / Night Illumination */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2000&q=80"
          alt="Mosque Sunrise Background"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-90 mix-blend-luminosity scale-105 animate-float-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0B] via-[#080C0B]/85 to-[#080C0B]/90"></div>
        <div className="absolute inset-0 islamic-pattern-bg opacity-70"></div>
      </div>

      {/* Floating Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Animated Bismillah Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <div className="relative group px-6 py-3 rounded-full bg-[#0E1714]/90 border border-[#C5A059]/30 shadow-2xl backdrop-blur-md">
            <span className="font-amiri text-2xl sm:text-4xl tracking-wide font-bold gold-gradient-text drop-shadow-[0_2px_12px_rgba(197,160,89,0.4)]">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
            <div className="absolute -inset-1 rounded-full bg-[#C5A059]/10 blur-sm -z-10 group-hover:bg-[#C5A059]/20 transition-all"></div>
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
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C5A059]/30 to-emerald-500/30 blur-2xl animate-pulse"></div>
          
          {/* Running Makkah Kaaba Logo Orbiting the Hero Emblem */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={30} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={30} />
          </div>

          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#121d19] to-[#0A100E] border-2 border-[#C5A059]/60 p-5 flex flex-col items-center justify-center shadow-[0_15px_50px_rgba(197,160,89,0.3)] group hover:border-[#C5A059] transition-all overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MakkahKaabaIcon size={38} />
            </div>
            <span className="font-cinzel text-xs font-bold text-[#FFF1CB] tracking-widest uppercase">
              HOLY QURAN
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">114 SURAHS • MAKKAH</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight mb-4"
        >
          Read, Listen & Reflect on the <br className="hidden sm:inline" />
          <span className="gold-gradient-text drop-shadow-sm">Holy Quran</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          A peaceful, modern digital experience to explore the eternal words of Allah with complete translations, word-by-word analysis, audio recitations, and AI scholarship.
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
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] to-emerald-700 text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-[#C5A059]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-slate-950" />
            <span>Read Quran</span>
          </button>

          <button
            onClick={onListenAudio}
            className="px-7 py-3.5 rounded-full bg-[#0E1714] text-[#FFF1CB] hover:text-white border border-[#C5A059]/40 hover:border-[#C5A059] font-semibold text-sm shadow-md hover:bg-[#13201C] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-[#C5A059]" />
            <span>Listen Recitation</span>
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="px-6 py-3.5 rounded-full bg-[#0E1714] text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 hover:border-emerald-400 font-semibold text-sm shadow-md hover:bg-[#13201C] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Quran Assistant</span>
          </button>

          <button
            onClick={onViewPrayerTimes}
            className="px-5 py-3.5 rounded-full bg-[#0D1512] text-slate-300 hover:text-[#FFF1CB] border border-slate-800 hover:border-[#C5A059]/40 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>Prayer & Qibla</span>
          </button>
        </motion.div>

        {/* Quick Surah Shortcuts Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pt-6 border-t border-[#C5A059]/15 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400"
        >
          <span className="text-[#C5A059] font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#C5A059]" /> Quick Explore:
          </span>
          <button onClick={() => quickSurahJump(1)} className="px-3 py-1 rounded-full bg-[#0E1714] text-slate-200 hover:text-[#FFF1CB] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all">
            Al-Fatiha (1)
          </button>
          <button onClick={() => quickSurahJump(36)} className="px-3 py-1 rounded-full bg-[#0E1714] text-slate-200 hover:text-[#FFF1CB] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all">
            Ya-Sin (36)
          </button>
          <button onClick={() => quickSurahJump(55)} className="px-3 py-1 rounded-full bg-[#0E1714] text-slate-200 hover:text-[#FFF1CB] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all">
            Ar-Rahman (55)
          </button>
          <button onClick={() => quickSurahJump(67)} className="px-3 py-1 rounded-full bg-[#0E1714] text-slate-200 hover:text-[#FFF1CB] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all">
            Al-Mulk (67)
          </button>
          <button onClick={() => quickSurahJump(112)} className="px-3 py-1 rounded-full bg-[#0E1714] text-slate-200 hover:text-[#FFF1CB] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all">
            Al-Ikhlas (112)
          </button>
        </motion.div>

      </div>
    </div>
  );
};
