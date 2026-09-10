import React from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2, Music } from 'lucide-react';
import { ALL_SURAHS } from '../data/quranData';
import { Reciter } from '../types';

interface StickyAudioBarProps {
  currentSurahNumber: number;
  currentAyahNumber: number;
  reciter: Reciter;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onCloseBar: () => void;
  onOpenFullPlayer: () => void;
}

export const StickyAudioBar: React.FC<StickyAudioBarProps> = ({
  currentSurahNumber,
  currentAyahNumber,
  reciter,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onCloseBar,
  onOpenFullPlayer
}) => {
  const currentSurah = ALL_SURAHS.find(s => s.number === currentSurahNumber) || ALL_SURAHS[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-xl z-50 bg-white/95 backdrop-blur-xl border-2 border-[#D4AF37]/50 rounded-2xl p-3 sm:p-4 shadow-lg flex items-center justify-between gap-4 animate-float">
      
      {/* Clickable Info to open full Audio Suite */}
      <div 
        onClick={onOpenFullPlayer}
        className="flex items-center gap-3 cursor-pointer group flex-1 overflow-hidden"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-emerald-800 font-amiri font-bold text-lg group-hover:scale-105 transition-transform flex-shrink-0">
          {currentSurah.name}
        </div>
        <div className="overflow-hidden">
          <span className="font-cinzel text-xs font-bold text-[#B45309] block truncate group-hover:text-emerald-800">
            Surah {currentSurah.englishName} ({currentSurah.number}:{currentAyahNumber || 1})
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block truncate">
            {reciter.name}
          </span>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onPrevTrack}
          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-800 hover:bg-emerald-50 transition-all"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={onTogglePlay}
          className="p-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-[#D4AF37] text-slate-950 font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={onNextTrack}
          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-800 hover:bg-emerald-50 transition-all"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={onCloseBar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-[#D4AF37] ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
