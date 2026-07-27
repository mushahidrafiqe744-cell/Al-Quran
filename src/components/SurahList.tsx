import React, { useState, useMemo } from 'react';
import { Surah, Bookmark, ReadingHistory } from '../types';
import { ALL_SURAHS } from '../data/quranData';
import { Search, Filter, BookOpen, Clock, Star, LayoutGrid, List, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { MakkahKaabaIcon } from './MakkahKaabaIcon';

interface SurahListProps {
  onSelectSurah: (surahNumber: number) => void;
  onPlaySurahAudio: (surahNumber: number) => void;
  bookmarks: Bookmark[];
  readingHistory?: ReadingHistory | null;
  globalSearchTerm?: string;
}

export const SurahList: React.FC<SurahListProps> = ({
  onSelectSurah,
  onPlaySurahAudio,
  bookmarks,
  readingHistory,
  globalSearchTerm = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [revelationFilter, setRevelationFilter] = useState<'All' | 'Meccan' | 'Medinan'>('All');
  const [selectedJuz, setSelectedJuz] = useState<number | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSurahs = useMemo(() => {
    return ALL_SURAHS.filter((surah) => {
      const term = (searchTerm || globalSearchTerm).toLowerCase().trim();
      const matchesTerm = 
        !term ||
        surah.englishName.toLowerCase().includes(term) ||
        surah.englishNameTranslation.toLowerCase().includes(term) ||
        surah.name.includes(term) ||
        surah.number.toString() === term;

      const matchesRevelation = revelationFilter === 'All' || surah.revelationType === revelationFilter;
      const matchesJuz = selectedJuz === 'All' || surah.juz === selectedJuz;

      return matchesTerm && matchesRevelation && matchesJuz;
    });
  }, [searchTerm, globalSearchTerm, revelationFilter, selectedJuz]);

  const bookmarkedSurahNumbers = useMemo(() => {
    return new Set(bookmarks.map(b => b.surahNumber));
  }, [bookmarks]);

  return (
    <section id="surah-list" className="py-12 bg-[#080C0B] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Master Section Wrapper with 4-Color Running Border & Orbiting Makkah Logo */}
        <div className="relative four-color-border-box shadow-2xl overflow-hidden">
          
          {/* Running Makkah Kaaba Logos Orbiting along the 4 edges */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={34} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={34} />
          </div>

          <div className="four-color-border-inner p-5 sm:p-8">

            {/* Header Title & 4-Color Indicator */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#C5A059]/20 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C0B] border border-[#C5A059]/30 text-[#FFF1CB]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="ml-1 text-[11px] text-[#C5A059]">4-Color Aura Frame</span>
                  </span>
                </div>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                  The Complete 114 Surahs
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Select any Surah to begin reading with word-by-word translations, audio recitations & Tafsir.
                </p>
              </div>

              {/* Last Read Quick Resume Widget */}
              {readingHistory && (
                <div 
                  onClick={() => onSelectSurah(readingHistory.surahNumber)}
                  className="p-3.5 rounded-2xl bg-[#080C0B] border border-emerald-500/30 hover:border-emerald-400 cursor-pointer shadow-lg flex items-center gap-4 transition-all hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
                    <Clock className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      Resume Reading
                    </span>
                    <span className="text-sm font-bold text-[#FFF1CB]">
                      Surah {readingHistory.surahName} ({readingHistory.surahNumber}): Ayah {readingHistory.ayahNumber}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Filters & Search Controls */}
            <div className="bg-[#080C0B] p-4 rounded-2xl border border-[#C5A059]/20 shadow-xl mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                <input
                  type="text"
                  placeholder="Search by Surah Name, Number, or Meaning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E1714] border border-[#C5A059]/20 focus:border-[#C5A059] outline-none text-xs text-slate-100 placeholder-slate-400 transition-all"
                />
              </div>

              {/* Revelation & Juz Selectors */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                
                {/* Revelation Pill Buttons */}
                <div className="flex bg-[#0E1714] p-1 rounded-xl border border-[#C5A059]/20">
                  {(['All', 'Meccan', 'Medinan'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setRevelationFilter(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        revelationFilter === type
                          ? 'bg-[#C5A059]/20 text-[#FFF1CB] border border-[#C5A059]/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Juz Filter Dropdown */}
                <select
                  value={selectedJuz}
                  onChange={(e) => setSelectedJuz(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                  className="bg-[#0E1714] text-xs text-slate-300 border border-[#C5A059]/20 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-[#C5A059]"
                >
                  <option value="All">All 30 Juz</option>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Juz {i + 1}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-[#0E1714] p-1 rounded-xl border border-[#C5A059]/20 ml-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-[#C5A059]/20 text-[#FFF1CB]' : 'text-slate-400'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-[#C5A059]/20 text-[#FFF1CB]' : 'text-slate-400'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Surahs Display Grid / List */}
            {filteredSurahs.length === 0 ? (
              <div className="text-center py-16 bg-[#080C0B]/80 rounded-2xl border border-[#C5A059]/10">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3 animate-bounce" />
                <p className="text-slate-300 font-medium">No Surahs found matching your search.</p>
                <button
                  onClick={() => { setSearchTerm(''); setRevelationFilter('All'); setSelectedJuz('All'); }}
                  className="mt-3 text-xs text-[#C5A059] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredSurahs.map((surah) => {
                  const isBookmarked = bookmarkedSurahNumbers.has(surah.number);
                  return (
                    <motion.div
                      key={surah.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => onSelectSurah(surah.number)}
                      className="four-color-card-glow four-color-card-glow-hover cursor-pointer"
                    >
                      <div className="p-5 rounded-[calc(1rem-2px)] bg-[#080C0B] hover:bg-[#0C1411] transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                        {/* Glowing background hint */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-bl-full pointer-events-none group-hover:bg-[#C5A059]/15 transition-all"></div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            {/* Surah Number Star Emblem */}
                            <div className="relative w-10 h-10 rounded-xl bg-[#121d19] border border-[#C5A059]/40 flex items-center justify-center font-bold text-[#C5A059] text-xs shadow-inner group-hover:scale-105 transition-transform">
                              <span>{surah.number}</span>
                            </div>

                            {/* Revelation Tag & Audio Trigger */}
                            <div className="flex items-center gap-2">
                              {isBookmarked && (
                                <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                              )}
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                surah.revelationType === 'Meccan' 
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' 
                                  : 'bg-[#C5A059]/20 text-[#FFF1CB] border-[#C5A059]/40'
                              }`}>
                                {surah.revelationType}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPlaySurahAudio(surah.number);
                                }}
                                className="p-1.5 rounded-lg bg-[#121d19] text-slate-300 hover:text-[#C5A059] hover:bg-[#C5A059]/20 transition-all"
                                title="Listen to Surah Audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Surah Names */}
                          <div className="flex items-baseline justify-between mt-2">
                            <div>
                              <h3 className="font-bold text-base text-slate-100 group-hover:text-[#C5A059] transition-colors">
                                {surah.englishName}
                              </h3>
                              <p className="text-xs text-slate-400 font-light mt-0.5">
                                {surah.englishNameTranslation}
                              </p>
                            </div>

                            {/* Arabic Calligraphy Name */}
                            <span className="font-amiri text-2xl font-bold text-[#C5A059] group-hover:scale-110 transition-transform">
                              {surah.name}
                            </span>
                          </div>
                        </div>

                        {/* Footer Stats */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{surah.numberOfAyahs} Verses</span>
                          <span>Juz {surah.juz}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => onSelectSurah(surah.number)}
                    className="four-color-card-glow four-color-card-glow-hover cursor-pointer"
                  >
                    <div className="p-4 rounded-[calc(1rem-2px)] bg-[#080C0B] hover:bg-[#0C1411] flex items-center justify-between transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#121d19] border border-[#C5A059]/30 flex items-center justify-center font-bold text-[#C5A059] text-xs">
                          {surah.number}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-100">{surah.englishName}</h4>
                          <p className="text-xs text-slate-400">{surah.englishNameTranslation} • {surah.numberOfAyahs} Verses</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-amiri text-xl font-bold text-[#C5A059]">{surah.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlaySurahAudio(surah.number);
                          }}
                          className="p-2 rounded-lg bg-[#121d19] text-[#C5A059] hover:bg-[#C5A059]/20"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
