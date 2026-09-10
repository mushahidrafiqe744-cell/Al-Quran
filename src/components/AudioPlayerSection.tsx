import React, { useState } from 'react';
import { ALL_SURAHS, RECITERS } from '../data/quranData';
import { Reciter, Surah } from '../types';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  List, 
  Disc, 
  Sparkles,
  Sliders,
  Music
} from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerSectionProps {
  currentSurahNumber: number;
  onSelectSurah: (num: number) => void;
  selectedReciter: Reciter;
  onChangeReciter: (r: Reciter) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangePlaybackSpeed: (speed: number) => void;
  isLooping: boolean;
  onToggleLoop: () => void;
}

export const AudioPlayerSection: React.FC<AudioPlayerSectionProps> = ({
  currentSurahNumber,
  onSelectSurah,
  selectedReciter,
  onChangeReciter,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangePlaybackSpeed,
  isLooping,
  onToggleLoop,
}) => {
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentSurah = ALL_SURAHS.find(s => s.number === currentSurahNumber) || ALL_SURAHS[0];

  return (
    <section id="audio-suite" className="py-16 bg-[#F8FAF8] text-slate-800 min-h-screen flex items-center justify-center relative">
      {/* Unique beautiful backdrop: Detailed golden Mosque Dome ceiling */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=80"
          alt="Audio Sanctuary Backdrop"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Spiritual Sanctuary</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            Quran Recitations Studio
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Listen to soul-stirring recitations by world-renowned Qaris with high-fidelity audio controls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Vinyl / Digital Turntable Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col items-center">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Rotating Album Art Disk */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-emerald-500/10 via-slate-100 to-[#D4AF37]/10 p-2 shadow-sm mb-6">
              <div className={`w-full h-full rounded-full bg-slate-900 border-4 border-[#D4AF37]/40 flex flex-col items-center justify-center text-center p-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '20s' }}>
                <span className="font-amiri text-4xl text-[#D4AF37] font-bold mb-1">
                  {currentSurah.name}
                </span>
                <span className="font-cinzel text-xs font-bold text-[#FFF1CB] uppercase tracking-widest">
                  SURAH {currentSurah.number}
                </span>
              </div>
              <div className="absolute inset-0 rounded-full border border-slate-200/50 pointer-events-none"></div>
            </div>

            {/* Track Metadata */}
            <div className="text-center mb-6">
              <h3 className="font-cinzel text-2xl font-bold text-slate-800 mb-1">
                {currentSurah.englishName}
              </h3>
              <p className="text-[#B45309] text-xs font-semibold">
                "{currentSurah.englishNameTranslation}" • {currentSurah.numberOfAyahs} Verses
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Reciter: {selectedReciter.name} ({selectedReciter.arabicName})
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="w-full flex items-center justify-center gap-4 sm:gap-6 my-4">
              
              {/* Loop Toggle */}
              <button
                onClick={onToggleLoop}
                className={`p-3 rounded-full border transition-all ${
                  isLooping ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
                }`}
                title="Loop Mode"
              >
                <Repeat className="w-4 h-4" />
              </button>

              {/* Prev Surah */}
              <button
                disabled={currentSurahNumber <= 1}
                onClick={() => onSelectSurah(currentSurahNumber - 1)}
                className="p-3 rounded-full bg-slate-50 border border-slate-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 transition-all"
                title="Previous Surah"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Big Play / Pause Button */}
              <button
                onClick={onTogglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-[#D4AF37] text-slate-950 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-glow"
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>

              {/* Next Surah */}
              <button
                disabled={currentSurahNumber >= 114}
                onClick={() => onSelectSurah(currentSurahNumber + 1)}
                className="p-3 rounded-full bg-slate-50 border border-slate-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 transition-all"
                title="Next Surah"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Speed Controller */}
              <button
                onClick={() => {
                  const speeds = [0.75, 1, 1.25, 1.5];
                  const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                  onChangePlaybackSpeed(speeds[nextIdx]);
                }}
                className="px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-emerald-850 text-xs font-bold hover:border-emerald-500 transition-all"
                title="Playback Speed"
              >
                {playbackSpeed}x
              </button>

            </div>

          </div>

          {/* Right Reciter Selector & Surahs Playlist */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Reciter Card Selector */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
              <h4 className="font-cinzel text-sm font-bold text-emerald-850 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Music className="w-4 h-4 text-emerald-600" />
                <span>Select Qari / Reciter</span>
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {RECITERS.map((reciter) => {
                  const isSelected = selectedReciter.id === reciter.id;
                  return (
                    <div
                      key={reciter.id}
                      onClick={() => onChangeReciter(reciter)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-emerald-50 border-[#D4AF37] text-emerald-800' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">{reciter.name}</span>
                        <span className="font-amiri text-xs text-[#B45309]">{reciter.arabicName}</span>
                      </div>
                      {isSelected && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Surah Playlist */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
              <h4 className="font-cinzel text-sm font-bold text-emerald-850 uppercase tracking-wider mb-4 flex items-center gap-2">
                <List className="w-4 h-4 text-emerald-600" />
                <span>Surah Playlist</span>
              </h4>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-2">
                {ALL_SURAHS.map((s) => {
                  const isCurrent = s.number === currentSurahNumber;
                  return (
                    <button
                      key={s.number}
                      onClick={() => onSelectSurah(s.number)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                        isCurrent 
                          ? 'bg-emerald-50 text-emerald-800 font-bold border-[#D4AF37] shadow-sm' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/40'
                      }`}
                    >
                      <span>{s.number}. {s.englishName}</span>
                      <span className="font-amiri text-sm text-[#B45309]">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
