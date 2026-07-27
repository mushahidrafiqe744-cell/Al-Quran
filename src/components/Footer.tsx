import React, { useState } from 'react';
import { BookOpen, Heart, Mail, Shield, Globe, Github, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <footer className="bg-[#080C0B] text-slate-300 pt-16 pb-12 border-t border-[#C5A059]/20 relative">
      
      {/* Geometric Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-[#C5A059] to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center font-amiri text-2xl font-bold text-[#C5A059]">
                القرآن
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-wider gold-gradient-text block">
                  AL-QURAN
                </span>
                <span className="text-[10px] text-emerald-400 tracking-widest uppercase font-medium">
                  The Divine Guidance
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              A serene, modern digital platform designed for reading, listening to, and reflecting upon the Holy Quran with divine precision.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-4">
              Explore Quran
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('quran')} className="hover:text-[#FFF1CB] transition-colors">114 Surahs Directory</button></li>
              <li><button onClick={() => onNavigateTab('audio')} className="hover:text-[#FFF1CB] transition-colors">Qari Audio Recitations</button></li>
              <li><button onClick={() => onNavigateTab('prayer')} className="hover:text-[#FFF1CB] transition-colors">Prayer Timetable & Qibla</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-[#FFF1CB] transition-colors">Tasbeeh Counter & Zakat</button></li>
            </ul>
          </div>

          {/* AI & Features */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-4">
              Spiritual Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('ai')} className="hover:text-[#FFF1CB] transition-colors">AI Quran Scholar Assistant</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-[#FFF1CB] transition-colors">99 Names of Allah</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-[#FFF1CB] transition-colors">Daily Duas & Adhkar</button></li>
              <li><button onClick={() => onNavigateTab('gallery')} className="hover:text-[#FFF1CB] transition-colors">Islamic Art & Mosques</button></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-4">
              Connect & Trust
            </h4>
            <div className="space-y-3 text-xs">
              <button 
                onClick={() => setPrivacyOpen(true)}
                className="flex items-center gap-2 hover:text-[#FFF1CB] transition-colors"
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Privacy & Open Sacred Data</span>
              </button>
              <button 
                onClick={() => setContactOpen(true)}
                className="flex items-center gap-2 hover:text-[#FFF1CB] transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact & Feedback</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Al-Quran – The Divine Guidance. Dedicated for Sadaqah Jariyah.</p>
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <span>Built with reverence for the Ummah</span> <Heart className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {privacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-[#0E1714] border-2 border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-xs space-y-4 relative">
              <button onClick={() => setPrivacyOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-[#C5A059]">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-cinzel text-lg font-bold text-[#C5A059]">Privacy & Sacred Text Integrity</h3>
              <p className="text-slate-300 leading-relaxed font-light">
                This platform is built with strict commitment to privacy. We do not track personal identification data. All bookmarks and progress are stored locally on your device.
              </p>
              <p className="text-slate-300 leading-relaxed font-light">
                All Quranic texts and audio recitations are sourced from verified open scholarly repositories (Alquran Cloud & Quran.com).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-[#0E1714] border-2 border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full text-xs relative">
              <button onClick={() => setContactOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-[#C5A059]">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-cinzel text-lg font-bold text-[#C5A059] mb-2">Get In Touch</h3>
              <p className="text-slate-400 mb-4">Send us feedback or feature requests to improve this experience.</p>

              {contactSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center font-semibold">
                  JazakAllah Khair! Your message has been received.
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3">
                  <input type="text" placeholder="Your Name" required className="w-full bg-[#121d19] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                  <input type="email" placeholder="Your Email" required className="w-full bg-[#121d19] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none" />
                  <textarea placeholder="Your Message or Suggestion..." rows={3} required className="w-full bg-[#121d19] border border-slate-700 rounded-xl p-3 text-slate-100 outline-none"></textarea>
                  <button type="submit" className="w-full py-3 rounded-xl bg-[#C5A059] text-slate-950 font-bold hover:bg-[#FFF1CB]">
                    Send Feedback
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
};
