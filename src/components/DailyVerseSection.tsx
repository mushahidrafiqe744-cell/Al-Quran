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
    <section className="py-16 bg-[#080C0B] text-slate-100 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Outer 4-Color Running Border Box with Orbiting Makkah Logo */}
        <div className="relative four-color-border-box shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          {/* Running Makkah Kaaba Logos Orbiting along the 4 edges */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={34} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={34} />
          </div>

          <div className="four-color-border-inner p-8 sm:p-10 text-center relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#FFF1CB] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Verse of the Day</span>
            </div>

            {/* Arabic Verse */}
            <div className="font-amiri text-3xl sm:text-4xl text-[#C5A059] font-bold leading-relaxed mb-4" dir="rtl">
              {dailyVerse.arabic}
            </div>

            <p className="text-xs sm:text-sm text-emerald-300 italic mb-3">
              {dailyVerse.transliteration}
            </p>

            <p className="text-base sm:text-lg text-slate-100 font-light max-w-2xl mx-auto mb-6 leading-relaxed">
              "{dailyVerse.translation}"
            </p>

            <div className="p-4 rounded-2xl bg-[#080C0B] border border-[#C5A059]/20 max-w-xl mx-auto mb-8 text-xs text-slate-300 font-light">
              <strong className="text-[#C5A059] font-bold block mb-1">Scholar Reflection:</strong>
              {dailyVerse.reflection}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onReadInFull(dailyVerse.surahNumber)}
                className="px-6 py-2.5 rounded-full bg-[#C5A059] text-slate-950 font-bold text-xs hover:bg-[#d6b068] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Surah Ash-Sharh</span>
              </button>

              <button
                onClick={() => onPlayAudio(dailyVerse.surahNumber, dailyVerse.ayahNumber)}
                className="px-5 py-2.5 rounded-full bg-[#121d19] text-[#FFF1CB] border border-[#C5A059]/40 text-xs font-semibold hover:bg-[#C5A059]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#C5A059]" />
                <span>Listen Recitation</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-full bg-[#121d19] text-slate-300 hover:text-[#C5A059] border border-slate-700"
                title="Copy Verse"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

