import React, { useState, useEffect, useRef } from 'react';
import { Ayah, Surah, Reciter, Bookmark } from '../types';
import { ALL_SURAHS, RECITERS } from '../data/quranData';
import { fetchSurahAyahs } from '../services/quranApi';
import { 
  Play, 
  Pause, 
  Volume2, 
  Bookmark as BookmarkIcon, 
  Share2, 
  Copy, 
  BookOpen, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Info, 
  X, 
  Check, 
  Eye, 
  Repeat, 
  ListOrdered,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MakkahKaabaIcon } from './MakkahKaabaIcon';

interface QuranReaderProps {
  surahNumber: number;
  onSelectSurah: (num: number) => void;
  bookmarks: Bookmark[];
  onToggleBookmark: (surahNumber: number, ayahNumber: number) => void;
  activePlayingAyah: { surah: number; ayah: number } | null;
  onPlayAyahAudio: (surahNumber: number, ayahNumber: number, audioUrl?: string) => void;
  onAskAiAboutVerse: (surahName: string, surahNum: number, ayahNum: number, textEn: string) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  surahNumber,
  onSelectSurah,
  bookmarks,
  onToggleBookmark,
  activePlayingAyah,
  onPlayAyahAudio,
  onAskAiAboutVerse
}) => {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  
  // Settings
  const [fontSize, setFontSize] = useState<number>(28);
  const [fontFamily, setFontFamily] = useState<'font-amiri' | 'font-scheherazade' | 'font-naskh'>('font-amiri');
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [showTajweed, setShowTajweed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [mushafViewMode, setMushafViewMode] = useState(false); // Continuous page mode

  // View Modes & Pagination
  const [viewMode, setViewMode] = useState<'mushaf' | 'list'>('mushaf'); // Default to Mushaf Page-by-Page view
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [versesPerPage, setVersesPerPage] = useState<number>(6); // Verses per Quran page

  // Modals & Drawers
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<Ayah | null>(null);
  const [shareAyah, setShareAyah] = useState<Ayah | null>(null);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const currentSurah = ALL_SURAHS.find(s => s.number === surahNumber) || ALL_SURAHS[0];
  const activeAyahRef = useRef<HTMLDivElement | null>(null);

  // Total pages calculation for current surah
  const totalPages = Math.max(1, Math.ceil(ayahs.length / versesPerPage));

  // Reset page to 1 on surah change
  useEffect(() => {
    setCurrentPage(1);
  }, [surahNumber]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchSurahAyahs(surahNumber, selectedReciter.identifier)
      .then(data => {
        if (isMounted) {
          setAyahs(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Reader error:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [surahNumber, selectedReciter]);

  // Sync current page with active playing Ayah
  useEffect(() => {
    if (activePlayingAyah && activePlayingAyah.surah === surahNumber) {
      const playingIndex = ayahs.findIndex(a => a.numberInSurah === activePlayingAyah.ayah);
      if (playingIndex !== -1) {
        const requiredPage = Math.floor(playingIndex / versesPerPage) + 1;
        if (requiredPage !== currentPage) {
          setCurrentPage(requiredPage);
        }
        setTimeout(() => {
          if (activeAyahRef.current) {
            activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [activePlayingAyah, surahNumber, ayahs, versesPerPage]);

  // Keyboard Left / Right arrow navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // Next page in RTL or LTR
        if (currentPage < totalPages) setCurrentPage(p => p + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentPage > 1) setCurrentPage(p => p - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `"${ayah.textArabic}"\n\nTranslation: ${ayah.translationEn}\n\n- Surah ${currentSurah.englishName} (${currentSurah.number}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahNum(ayah.numberInSurah);
    setTimeout(() => setCopiedAyahNum(null), 2000);
  };

  const isAyahBookmarked = (num: number) => {
    return bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === num);
  };

  return (
    <div id="quran-reader" className="min-h-screen bg-[#080C0B] text-slate-100 pt-20 pb-24 relative">
      {/* Unique beautiful backdrop: Clean sacred Quran pages */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80"
          alt="Quran Pages Backdrop"
          className="w-full h-full object-cover object-center opacity-15 filter brightness-[45%] contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0B] via-[#080C0B]/85 to-[#080C0B]/90"></div>
      </div>

      <div className="relative z-10">
      
      {/* Top Reader Toolbar */}
      <div className="sticky top-16 z-40 bg-[#0A100E]/90 backdrop-blur-md border-b border-[#C5A059]/20 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          
          {/* Surah Navigation Switcher */}
          <div className="flex items-center gap-2">
            <button
              disabled={surahNumber <= 1}
              onClick={() => onSelectSurah(surahNumber - 1)}
              className="p-2 rounded-xl bg-[#0E1714] border border-[#C5A059]/20 text-slate-300 hover:text-[#C5A059] hover:border-[#C5A059]/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={surahNumber}
              onChange={(e) => onSelectSurah(Number(e.target.value))}
              className="bg-[#0E1714] text-[#C5A059] font-bold text-xs sm:text-sm border border-[#C5A059]/30 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-[#C5A059]"
            >
              {ALL_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.englishName} ({s.name})
                </option>
              ))}
            </select>

            <button
              disabled={surahNumber >= 114}
              onClick={() => onSelectSurah(surahNumber + 1)}
              className="p-2 rounded-xl bg-[#0E1714] border border-[#C5A059]/20 text-slate-300 hover:text-[#C5A059] hover:border-[#C5A059]/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Next Surah"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Toggle & Page Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Mushaf Page vs Continuous List Switcher */}
            <div className="flex bg-[#0E1714] p-1 rounded-xl border border-[#C5A059]/30">
              <button
                onClick={() => setViewMode('mushaf')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'mushaf'
                    ? 'bg-[#C5A059] text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-[#C5A059]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Mushaf Page</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#C5A059] text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-[#C5A059]'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Full Surah</span>
              </button>
            </div>

            {/* Word-By-Word Toggle Button */}
            <button
              onClick={() => setShowWordByWord(!showWordByWord)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showWordByWord 
                  ? 'bg-[#C5A059]/20 text-[#FFF1CB] border-[#C5A059]' 
                  : 'bg-[#0E1714] text-slate-400 border-[#C5A059]/20 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Word-By-Word</span>
            </button>

            {/* Tajweed Colors Toggle Button */}
            <button
              onClick={() => setShowTajweed(!showTajweed)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showTajweed 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' 
                  : 'bg-[#0E1714] text-slate-400 border-[#C5A059]/20 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Tajweed</span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-xl bg-[#0E1714] text-slate-300 hover:text-[#C5A059] border border-[#C5A059]/20"
              title="Display & Font Settings"
            >
              <Sliders className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>

        </div>
      </div>

      {/* Settings Modal Drawer */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#0f1a28] border-b border-amber-500/30 p-6 shadow-2xl relative z-30"
          >
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Font Size Adjuster */}
              <div>
                <label className="text-amber-300 font-bold mb-2 block">Arabic Font Size ({fontSize}px)</label>
                <input
                  type="range"
                  min="20"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Font Family Selector */}
              <div>
                <label className="text-amber-300 font-bold mb-2 block">Arabic Font Style</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFontFamily('font-amiri')}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-amiri ${
                      fontFamily === 'font-amiri' ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-[#14202e] text-slate-400 border-slate-700'
                    }`}
                  >
                    Amiri
                  </button>
                  <button
                    onClick={() => setFontFamily('font-scheherazade')}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-scheherazade ${
                      fontFamily === 'font-scheherazade' ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-[#14202e] text-slate-400 border-slate-700'
                    }`}
                  >
                    Scheherazade
                  </button>
                  <button
                    onClick={() => setFontFamily('font-naskh')}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-naskh ${
                      fontFamily === 'font-naskh' ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-[#14202e] text-slate-400 border-slate-700'
                    }`}
                  >
                    Naskh
                  </button>
                </div>
              </div>

              {/* Reciter Selector */}
              <div>
                <label className="text-amber-300 font-bold mb-2 block">Audio Reciter</label>
                <select
                  value={selectedReciter.id}
                  onChange={(e) => {
                    const r = RECITERS.find(x => x.id === e.target.value);
                    if (r) setSelectedReciter(r);
                  }}
                  className="w-full bg-[#14202e] text-slate-200 border border-amber-500/30 rounded-lg p-2 outline-none"
                >
                  {RECITERS.map((r) => (
                    <option key={r.id} value={r.id}>{r.name} ({r.arabicName})</option>
                  ))}
                </select>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Navigation Controller Bar (In Mushaf View) */}
      {viewMode === 'mushaf' && !loading && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6 flex items-center justify-between bg-[#0A100E] p-3 rounded-2xl border border-[#C5A059]/30 shadow-lg">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 rounded-xl bg-[#0E1714] border border-[#C5A059]/30 text-xs font-bold text-[#FFF1CB] hover:bg-[#C5A059]/20 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          {/* Page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Page</span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="bg-[#080C0B] text-[#C5A059] font-bold text-xs border border-[#C5A059]/40 rounded-xl px-3 py-1.5 outline-none cursor-pointer"
            >
              {Array.from({ length: totalPages }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1} of {totalPages}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 rounded-xl bg-[#0E1714] border border-[#C5A059]/30 text-xs font-bold text-[#FFF1CB] hover:bg-[#C5A059]/20 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Area: Mushaf Page vs Full List */}
      {viewMode === 'mushaf' ? (
        /* ---------------- MUSHAF PAGE-BY-PAGE BOOK VIEW ---------------- */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6">
          <div className="relative four-color-border-box shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Running Makkah Kaaba Logos Orbiting along the Mushaf Page Frame */}
            <div className="makkah-runner-item" style={{ animationDelay: '0s' }}>
              <MakkahKaabaIcon size={34} />
            </div>
            <div className="makkah-runner-item" style={{ animationDelay: '-4s' }}>
              <MakkahKaabaIcon size={34} />
            </div>

            <div className="four-color-border-inner p-6 sm:p-10 relative overflow-hidden min-h-[600px] flex flex-col justify-between">
              
              {/* Decorative Mushaf Frame Borders & Ornaments */}
              <div className="absolute inset-3 border-2 border-[#C5A059]/30 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-5 border border-[#C5A059]/15 rounded-xl pointer-events-none"></div>

              {/* Page Header Info Banner */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-double border-[#C5A059]/40 text-xs font-bold text-[#C5A059] relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>Surah {currentSurah.englishName} ({currentSurah.number})</span>
                </div>
                <div className="font-amiri text-lg text-[#FFF1CB]">
                  {currentSurah.name}
                </div>
                <div className="flex items-center gap-2">
                  <span>Juz {currentSurah.juz}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]"></span>
                </div>
              </div>

              {/* Page 1 Special Header & Bismillah */}
              {currentPage === 1 && (
                <div className="text-center py-4 mb-6 border-b border-[#C5A059]/20 relative z-10">
                  <span className="font-amiri text-4xl sm:text-5xl font-bold gold-gradient-text block mb-2">
                    {currentSurah.name}
                  </span>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-4">
                    {currentSurah.englishName} • {currentSurah.revelationType} • {currentSurah.numberOfAyahs} Verses
                  </p>
                  {surahNumber !== 9 && (
                    <div className="py-2">
                      <span className="font-amiri text-2xl sm:text-3xl text-[#C5A059]">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Paginated Verses Body */}
              {loading ? (
                <div className="text-center py-24 my-auto">
                  <BookOpen className="w-12 h-12 text-[#C5A059] mx-auto mb-4 animate-spin" />
                  <p className="text-slate-300 font-medium">Opening Mushaf Page {currentPage}...</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${surahNumber}-page-${currentPage}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 relative z-10"
                  >
                    {ayahs
                      .slice((currentPage - 1) * versesPerPage, currentPage * versesPerPage)
                      .map((ayah) => {
                        const isPlaying = activePlayingAyah?.surah === surahNumber && activePlayingAyah?.ayah === ayah.numberInSurah;
                        const bookmarked = isAyahBookmarked(ayah.numberInSurah);

                        return (
                          <div
                            key={ayah.numberInSurah}
                            ref={isPlaying ? activeAyahRef : null}
                            className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 border ${
                              isPlaying 
                                ? 'bg-[#121d19] border-[#C5A059] shadow-[0_0_25px_rgba(197,160,89,0.3)] ring-1 ring-[#C5A059]' 
                                : 'bg-[#080C0B]/90 border-[#C5A059]/20 hover:border-[#C5A059]/40'
                            }`}
                          >
                            {/* Verse Header */}
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-[#121d19] border border-[#C5A059]/40 flex items-center justify-center font-bold text-[#C5A059] text-xs">
                                  {surahNumber}:{ayah.numberInSurah}
                                </div>

                                <button
                                  onClick={() => onPlayAyahAudio(surahNumber, ayah.numberInSurah, ayah.audioUrl)}
                                  className={`p-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold ${
                                    isPlaying 
                                      ? 'bg-[#C5A059] text-slate-950 font-bold shadow-md' 
                                      : 'bg-[#121d19] text-[#C5A059] hover:bg-[#C5A059]/20'
                                  }`}
                                >
                                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                  <span>{isPlaying ? 'Playing' : 'Play'}</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onAskAiAboutVerse(currentSurah.englishName, currentSurah.number, ayah.numberInSurah, ayah.translationEn)}
                                  className="p-1.5 px-2.5 rounded-lg bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/30 text-xs flex items-center gap-1"
                                >
                                  <Sparkles className="w-3 h-3 text-emerald-400" />
                                  <span className="hidden sm:inline">Ask AI</span>
                                </button>
                                <button
                                  onClick={() => setActiveTafsirAyah(ayah)}
                                  className="p-1.5 rounded-lg bg-[#121d19] text-amber-300 border border-slate-800 hover:border-[#C5A059]/40 text-xs"
                                  title="Tafsir"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleCopyAyah(ayah)}
                                  className="p-1.5 rounded-lg bg-[#121d19] text-slate-300 border border-slate-800 hover:text-amber-300 text-xs"
                                  title="Copy"
                                >
                                  {copiedAyahNum === ayah.numberInSurah ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => onToggleBookmark(surahNumber, ayah.numberInSurah)}
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    bookmarked ? 'bg-amber-500/30 text-amber-300 border-amber-400' : 'bg-[#121d19] text-slate-400 border-slate-800'
                                  }`}
                                >
                                  <BookmarkIcon className="w-3.5 h-3.5 fill-current" />
                                </button>
                              </div>
                            </div>

                            {/* Arabic Verse Text */}
                            <div 
                              className={`text-right leading-[2.3] tracking-wide text-slate-100 ${fontFamily} mb-4`}
                              style={{ fontSize: `${fontSize}px` }}
                              dir="rtl"
                            >
                              {showTajweed ? (
                                <span className="tajweed-container">{ayah.textArabic}</span>
                              ) : (
                                <span>{ayah.textArabic}</span>
                              )}
                            </div>

                            {/* Word-By-Word Breakdown */}
                            {showWordByWord && ayah.words && ayah.words.length > 0 && (
                              <div className="my-4 p-3 rounded-xl bg-[#121d19] border border-amber-500/20 overflow-x-auto">
                                <div className="flex flex-row-reverse flex-wrap gap-2.5">
                                  {ayah.words.map((w, wIdx) => (
                                    <div key={wIdx} className="p-2 rounded-lg bg-[#080C0B] border border-amber-500/10 text-center min-w-[65px]">
                                      <span className="font-amiri text-base text-[#FFF1CB] font-bold block" dir="rtl">
                                        {w.arabic}
                                      </span>
                                      <span className="text-[10px] text-emerald-400 block font-medium">
                                        {w.translation}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Transliteration */}
                            {showTransliteration && ayah.transliterationEn && (
                              <p className="text-xs text-emerald-300/90 font-medium italic mb-1.5">
                                {ayah.transliterationEn}
                              </p>
                            )}

                            {/* Translation */}
                            {showTranslation && (
                              <p className="text-sm text-slate-200 font-light leading-relaxed">
                                {ayah.translationEn}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Page Footer Medallion & Turning Controls */}
              <div className="mt-8 pt-6 border-t-2 border-double border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#080C0B] border border-[#C5A059]/30 text-xs font-bold text-[#FFF1CB] hover:bg-[#C5A059]/20 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                {/* Page Number Emblem */}
                <div className="px-5 py-1.5 rounded-full bg-[#080C0B] border border-[#C5A059]/50 font-cinzel text-xs font-extrabold gold-gradient-text flex items-center gap-2 shadow-inner">
                  <span>صفحة</span>
                  <span>Page {currentPage} of {totalPages}</span>
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#080C0B] border border-[#C5A059]/30 text-xs font-bold text-[#FFF1CB] hover:bg-[#C5A059]/20 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* ---------------- FULL CONTINUOUS SURAH LIST VIEW ---------------- */
        <>
          {/* Surah Header Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0E1714] via-[#121d19] to-[#0A100E] border-2 border-[#C5A059]/30 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none"></div>

              <span className="font-amiri text-5xl sm:text-6xl font-bold gold-gradient-text block mb-3">
                {currentSurah.name}
              </span>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-100">
                {currentSurah.englishName}
              </h1>
              <p className="text-[#FFF1CB]/80 text-sm font-medium mt-1">
                "{currentSurah.englishNameTranslation}" • {currentSurah.numberOfAyahs} Verses • {currentSurah.revelationType}
              </p>

              {surahNumber !== 9 && (
                <div className="mt-6 pt-6 border-t border-[#C5A059]/20">
                  <span className="font-amiri text-2xl sm:text-3xl text-[#C5A059] tracking-wider">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Verses List */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            {loading ? (
              <div className="text-center py-20">
                <BookOpen className="w-12 h-12 text-[#C5A059] mx-auto mb-4 animate-spin" />
                <p className="text-slate-300 font-medium">Loading Sacred Verses...</p>
              </div>
            ) : (
              ayahs.map((ayah) => {
                const isPlaying = activePlayingAyah?.surah === surahNumber && activePlayingAyah?.ayah === ayah.numberInSurah;
                const bookmarked = isAyahBookmarked(ayah.numberInSurah);

                return (
                  <motion.div
                    key={ayah.numberInSurah}
                    ref={isPlaying ? activeAyahRef : null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 border ${
                      isPlaying 
                        ? 'bg-[#121d19] border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]' 
                        : 'bg-[#0E1714] border-[#C5A059]/15 hover:border-[#C5A059]/35'
                    }`}
                  >
                    {/* Verse Header Row */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-[#080C0B] border border-[#C5A059]/40 flex items-center justify-center font-bold text-[#C5A059] text-xs shadow-inner">
                          {surahNumber}:{ayah.numberInSurah}
                        </div>

                        <button
                          onClick={() => onPlayAyahAudio(surahNumber, ayah.numberInSurah, ayah.audioUrl)}
                          className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold ${
                            isPlaying 
                              ? 'bg-[#C5A059] text-slate-950 font-bold shadow-md' 
                              : 'bg-[#080C0B] text-[#C5A059] hover:bg-[#C5A059]/20'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{isPlaying ? 'Playing' : 'Listen'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => onAskAiAboutVerse(currentSurah.englishName, currentSurah.number, ayah.numberInSurah, ayah.translationEn)}
                          className="p-2 rounded-xl bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/30 text-xs font-medium flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden md:inline">Ask AI</span>
                        </button>

                        <button
                          onClick={() => setActiveTafsirAyah(ayah)}
                          className="p-2 rounded-xl bg-[#162536] text-slate-300 hover:text-amber-300 border border-slate-700 text-xs"
                        >
                          <Info className="w-3.5 h-3.5 text-amber-400" />
                        </button>

                        <button
                          onClick={() => handleCopyAyah(ayah)}
                          className="p-2 rounded-xl bg-[#162536] text-slate-300 hover:text-amber-300 border border-slate-700"
                        >
                          {copiedAyahNum === ayah.numberInSurah ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => onToggleBookmark(surahNumber, ayah.numberInSurah)}
                          className={`p-2 rounded-xl border transition-all ${
                            bookmarked 
                              ? 'bg-amber-500/30 text-amber-300 border-amber-400' 
                              : 'bg-[#162536] text-slate-400 border-slate-700 hover:text-amber-300'
                          }`}
                        >
                          <BookmarkIcon className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Main Arabic Verse Text */}
                    <div 
                      className={`text-right leading-[2.2] tracking-wide text-slate-100 ${fontFamily} mb-6`}
                      style={{ fontSize: `${fontSize}px` }}
                      dir="rtl"
                    >
                      {showTajweed ? (
                        <span className="tajweed-container">{ayah.textArabic}</span>
                      ) : (
                        <span>{ayah.textArabic}</span>
                      )}
                    </div>

                    {/* Word-By-Word Breakdown */}
                    {showWordByWord && ayah.words && ayah.words.length > 0 && (
                      <div className="my-6 p-4 rounded-xl bg-[#132030] border border-amber-500/20 overflow-x-auto">
                        <div className="flex flex-row-reverse flex-wrap gap-3">
                          {ayah.words.map((w, wIdx) => (
                            <div key={wIdx} className="p-2.5 rounded-lg bg-[#182738] border border-amber-500/10 text-center min-w-[70px]">
                              <span className="font-amiri text-lg text-[#FFF1CB] font-bold block mb-1" dir="rtl">
                                {w.arabic}
                              </span>
                              <span className="text-[10px] text-emerald-400 block font-medium">
                                {w.translation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Transliteration */}
                    {showTransliteration && ayah.transliterationEn && (
                      <p className="text-xs sm:text-sm text-emerald-300/90 font-medium italic mb-2">
                        {ayah.transliterationEn}
                      </p>
                    )}

                    {/* English Translation */}
                    {showTranslation && (
                      <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                        {ayah.translationEn}
                      </p>
                    )}

                  </motion.div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Tafsir Modal */}
      <AnimatePresence>
        {activeTafsirAyah && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0f1a28] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                onClick={() => setActiveTafsirAyah(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#18283a] text-slate-400 hover:text-amber-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Classical Tafsir Reflection</span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-amber-300 mb-4">
                Surah {currentSurah.englishName} ({currentSurah.number}:{activeTafsirAyah.numberInSurah})
              </h3>

              <div className="p-4 rounded-xl bg-[#142232] border border-amber-500/20 text-right font-amiri text-xl text-amber-200 mb-4" dir="rtl">
                {activeTafsirAyah.textArabic}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {activeTafsirAyah.tafsirShort || 'This verse reminds believers of Allah\'s divine wisdom, justice, and mercy. classical scholars emphasize that reflecting upon this revelation softens the human heart, brings clarity during times of hardship, and provides guidance for daily righteous living.'}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTafsirAyah(null)}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Close Tafsir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
};
