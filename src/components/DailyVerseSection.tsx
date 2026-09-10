import React, { useState } from 'react';
import { Sparkles, Copy, Check, Play, BookOpen } from 'lucide-react';
import { MakkahKaabaIcon } from './MakkahKaabaIcon';

interface DailyVerseSectionProps {
  onReadInFull: (surahNum: number) => void;
  onPlayAudio: (surahNum: number, ayahNum: number) => void;
}

export const DailyVerseSection: React.FC<DailyVerseSectionProps> = ({ onReadInFull, onPlayAudio }) => {
  const [copied, setCopied] = useState(false);

  const dailyVerse = {
    surahNumber: 94,
    surahName: 'Ash-Sharh',
    ayahNumber: 5,
    arabic: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا • إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    transliteration: 'Fa-inna ma\'al-\'usri yusra. Inna ma\'al-\'usri yusra.',
    translation: 'For indeed, with hardship [will come] ease. Indeed, with hardship [will come] ease.',
    reflection: 'Allah repeats this promise twice in succession to reassure human hearts that no trial lasts forever. Difficulty is immediately accompanied by divine relief.'
  };

  const handleCopy = () => {
    const text = `"${dailyVerse.arabic}"\n\n"${dailyVerse.translation}"\n- Surah ${dailyVerse.surahName} (${dailyVerse.surahNumber}:${dailyVerse.ayahNumber})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-[#F8FAF8] text-slate-800 overflow-hidden relative">
      {/* Unique beautiful backdrop: Quran with warm lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629f1d29718?auto=format&fit=crop&w=1600&q=80"
          alt="Daily Quran Verse Background"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Outer 4-Color Running Border Box with Orbiting Makkah Logo */}
        <div className="relative four-color-border-box shadow-md">
          
          {/* Running Makkah Kaaba Logos Orbiting along the 4 edges */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={34} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={34} />
          </div>

          <div className="four-color-border-inner p-8 sm:p-10 text-center relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Verse of the Day</span>
            </div>

            {/* Arabic Verse */}
            <div className="font-amiri text-3xl sm:text-4xl text-[#B45309] font-bold leading-relaxed mb-4" dir="rtl">
              {dailyVerse.arabic}
            </div>

            <p className="text-xs sm:text-sm text-emerald-700 italic mb-3">
              {dailyVerse.transliteration}
            </p>

            <p className="text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto mb-6 leading-relaxed">
              "{dailyVerse.translation}"
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto mb-8 text-xs text-slate-600 font-light">
              <strong className="text-[#B45309] font-bold block mb-1">Scholar Reflection:</strong>
              {dailyVerse.reflection}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onReadInFull(dailyVerse.surahNumber)}
                className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-xs hover:bg-[#d6b068] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Surah Ash-Sharh</span>
              </button>

              <button
                onClick={() => onPlayAudio(dailyVerse.surahNumber, dailyVerse.ayahNumber)}
                className="px-5 py-2.5 rounded-full bg-white text-emerald-800 border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/20 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 text-emerald-700" />
                <span>Listen Recitation</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-full bg-white text-slate-500 hover:text-emerald-700 border border-slate-200 shadow-sm"
                title="Copy Verse"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

