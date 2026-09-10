import React, { useState, useMemo } from 'react';
import { Surah, Bookmark, ReadingHistory } from '../types';
import { ALL_SURAHS } from '../data/quranData';
import { Search, Filter, BookOpen, Clock, Star, LayoutGrid, List, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { MakkahKaabaIcon, MadinahMosqueIcon } from './MakkahKaabaIcon';

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
    <section id="surah-list" className="py-12 bg-[#F8FAF8] text-slate-800 min-h-screen relative">
      {/* Unique beautiful backdrop: Madinah Masjid an-Nabawi */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80"
          alt="Madinah Background"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Master Section Wrapper with 4-Color Running Border & Orbiting Makkah Logo */}
        <div className="relative four-color-border-box shadow-md overflow-hidden">
          
          {/* Running Makkah Kaaba Logos Orbiting along the 4 edges */}
          <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
            <MakkahKaabaIcon size={34} />
          </div>
          <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
            <MakkahKaabaIcon size={34} />
          </div>

          <div className="four-color-border-inner p-5 sm:p-8">
 
            {/* Header Title & 4-Color Indicator */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#B45309]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="ml-1 text-[11px] text-[#B45309]">Divine Aura Frame</span>
                  </span>
                </div>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                  The Complete 114 Surahs
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Select any Surah to begin reading with word-by-word translations, audio recitations & Tafsir.
                </p>
              </div>

              {/* Last Read Quick Resume Widget */}
              {readingHistory && (
                <div 
                  onClick={() => onSelectSurah(readingHistory.surahNumber)}
                  className="p-3.5 rounded-2xl bg-white border border-emerald-500/20 hover:border-emerald-500/40 shadow-sm cursor-pointer flex items-center gap-4 transition-all hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                      Resume Reading
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      Surah {readingHistory.surahName} ({readingHistory.surahNumber}): Ayah {readingHistory.ayahNumber}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Filters & Search Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                <input
                  type="text"
                  placeholder="Search by Surah Name, Number, or Meaning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-xs text-slate-800 placeholder-slate-400 transition-all"
                />
              </div>

              {/* Revelation & Juz Selectors */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                
                {/* Revelation Pill Buttons */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {(['All', 'Meccan', 'Medinan'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setRevelationFilter(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        revelationFilter === type
                          ? 'bg-white text-emerald-800 border border-slate-200/80 shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-800'
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
                  className="bg-slate-100 text-xs text-slate-700 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-emerald-500"
                >
                  <option value="All">All 30 Juz</option>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Juz {i + 1}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 ml-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
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
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
                <p className="text-slate-600 font-medium">No Surahs found matching your search.</p>
                <button
                  onClick={() => { setSearchTerm(''); setRevelationFilter('All'); setSelectedJuz('All'); }}
                  className="mt-3 text-xs text-[#B45309] hover:underline font-bold"
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
                      className="four-color-card-glow four-color-card-glow-hover cursor-pointer shadow-sm"
                    >
                      <div className="p-5 rounded-[calc(1rem-2px)] bg-white hover:bg-emerald-50/25 border border-slate-100 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                        {/* Glowing background hint */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4AF37]/10 transition-all"></div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            {/* Surah Number Star Emblem */}
                            <div className="relative w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs shadow-inner group-hover:scale-105 transition-transform">
                              <span>{surah.number}</span>
                            </div>

                            {/* Revelation Tag & Audio Trigger */}
                            <div className="flex items-center gap-2">
                              {isBookmarked && (
                                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                              )}
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1 ${
                                surah.revelationType === 'Meccan' 
                                  ? 'bg-amber-50 text-[#B45309] border-amber-200/60' 
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
                              }`}>
                                {surah.revelationType === 'Meccan' ? (
                                  <MakkahKaabaIcon size={16} />
                                ) : (
                                  <MadinahMosqueIcon size={16} />
                                )}
                                <span>{surah.revelationType}</span>
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPlaySurahAudio(surah.number);
                                }}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                                title="Listen to Surah Audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Surah Names */}
                          <div className="flex items-baseline justify-between mt-2">
                            <div>
                              <h3 className="font-bold text-base text-slate-800 group-hover:text-emerald-800 transition-colors">
                                {surah.englishName}
                              </h3>
                              <p className="text-xs text-slate-500 font-light mt-0.5">
                                {surah.englishNameTranslation}
                              </p>
                            </div>

                            {/* Arabic Calligraphy Name */}
                            <span className="font-amiri text-2xl font-bold text-emerald-800 group-hover:scale-110 group-hover:text-[#B45309] transition-transform">
                              {surah.name}
                            </span>
                          </div>
                        </div>

                        {/* Footer Stats */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
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
                    className="four-color-card-glow four-color-card-glow-hover cursor-pointer shadow-sm"
                  >
                    <div className="p-4 rounded-[calc(1rem-2px)] bg-white hover:bg-emerald-50/25 border border-slate-100 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                          {surah.number}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{surah.englishName}</h4>
                          <p className="text-xs text-slate-500">{surah.englishNameTranslation} • {surah.numberOfAyahs} Verses</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-amiri text-xl font-bold text-emerald-800">{surah.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlaySurahAudio(surah.number);
                          }}
                          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
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
