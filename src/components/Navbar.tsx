import React, { useState, useEffect } from 'react';
import { 
  Home,
  BookOpen, 
  Compass, 
  Sparkles, 
  Moon, 
  Sun, 
  Volume2, 
  Bookmark, 
  Menu, 
  X, 
  Search, 
  Sliders, 
  Calculator,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarksCount: number;
  openBookmarksModal: () => void;
  isAudioPlaying: boolean;
  toggleAudioBar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  openBookmarksModal,
  isAudioPlaying,
  toggleAudioBar,
  searchTerm,
  setSearchTerm
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quran', label: 'Quran Reader', icon: BookOpen },
    { id: 'audio', label: 'Audio Recitations', icon: Volume2 },
    { id: 'prayer', label: 'Prayer & Qibla', icon: Compass },
    { id: 'tools', label: 'Islamic Tools', icon: Calculator },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'gallery', label: 'Gallery', icon: Grid },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[#080C0B]/90 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xl' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Calligraphy Emblem */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A059]/20 to-emerald-950/40 border border-[#C5A059]/40 flex items-center justify-center shadow-lg group-hover:border-[#C5A059] transition-all">
              <span className="font-amiri text-2xl font-bold text-[#C5A059]">القرآن</span>
              <div className="absolute -inset-0.5 rounded-xl bg-[#C5A059]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider gold-gradient-text block leading-none">
                AL-QURAN
              </span>
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase font-medium">
                The Divine Guidance
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0D1512]/80 p-1.5 rounded-full border border-[#C5A059]/20 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                    isActive 
                      ? 'text-[#FFF1CB] bg-gradient-to-r from-emerald-950/80 to-[#C5A059]/20 border border-[#C5A059]/40 shadow-md' 
                      : 'text-slate-300 hover:text-amber-200 hover:bg-[#121c19]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full bg-[#C5A059]/30 text-[#FFF1CB] border border-[#C5A059]/50">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-full bg-[#C5A059]/10 pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center bg-[#0F1815] border border-[#C5A059]/30 rounded-full px-3 py-1.5 text-xs text-slate-200 shadow-inner"
                >
                  <Search className="w-3.5 h-3.5 text-[#C5A059] mr-2" />
                  <input
                    type="text"
                    placeholder="Search Surah or Ayah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none w-32 sm:w-48 text-xs text-slate-100 placeholder-slate-400"
                    autoFocus
                  />
                  <X 
                    className="w-3.5 h-3.5 text-slate-400 hover:text-[#C5A059] cursor-pointer ml-1" 
                    onClick={() => { setSearchOpen(false); setSearchTerm(''); }}
                  />
                </motion.div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-full bg-[#0D1512] text-slate-300 hover:text-[#C5A059] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all"
                  title="Search Surah or Ayah"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bookmarks Counter Button */}
            <button
              onClick={openBookmarksModal}
              className="relative p-2.5 rounded-full bg-[#0D1512] text-slate-300 hover:text-[#C5A059] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all"
              title="Saved Bookmarks"
            >
              <Bookmark className="w-4 h-4 text-[#C5A059]" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudioBar}
              className={`p-2.5 rounded-full border transition-all ${
                isAudioPlaying 
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#FFF1CB] animate-pulse' 
                  : 'bg-[#0D1512] border-[#C5A059]/20 text-slate-300 hover:text-[#C5A059]'
              }`}
              title="Quran Audio Player"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-[#0D1512] text-slate-300 border border-[#C5A059]/20"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A059]" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A100E] border-b border-[#C5A059]/20 px-4 pt-3 pb-6 mt-3 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#C5A059]/20 text-[#FFF1CB] border border-[#C5A059]/40' 
                        : 'bg-[#121c19] text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#C5A059]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
