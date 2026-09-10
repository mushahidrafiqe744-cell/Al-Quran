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
    <footer className="bg-white text-slate-600 pt-16 pb-12 border-t border-slate-100 relative overflow-hidden">
      {/* Unique beautiful backdrop: Deep starry sky mosque silhouette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=80"
          alt="Footer Backdrop"
          className="w-full h-full object-cover object-center opacity-[0.03] filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/90"></div>
      </div>
      
      {/* Geometric Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-[#D4AF37] to-emerald-600 z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-amiri text-2xl font-bold text-emerald-800">
                القرآن
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-wider gold-gradient-text block">
                  AL-QURAN
                </span>
                <span className="text-[10px] text-emerald-700 tracking-widest uppercase font-bold">
                  The Divine Guidance
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              A serene, modern digital platform designed for reading, listening to, and reflecting upon the Holy Quran with divine precision.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
              Explore Quran
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('quran')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">114 Surahs Directory</button></li>
              <li><button onClick={() => onNavigateTab('audio')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Qari Audio Recitations</button></li>
              <li><button onClick={() => onNavigateTab('prayer')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Prayer Timetable & Qibla</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Tasbeeh Counter & Zakat</button></li>
            </ul>
          </div>

          {/* AI & Features */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
              Spiritual Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('quran')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Daily Quran Verses</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">99 Names of Allah</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Daily Duas & Adhkar</button></li>
              <li><button onClick={() => onNavigateTab('gallery')} className="text-slate-500 hover:text-[#B45309] font-medium transition-colors">Islamic Art & Mosques</button></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
              Connect & Trust
            </h4>
            <div className="space-y-3 text-xs">
              <button 
                onClick={() => setPrivacyOpen(true)}
                className="flex items-center gap-2 text-slate-500 hover:text-[#B45309] font-medium transition-colors"
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Privacy & Open Sacred Data</span>
              </button>
              <button 
                onClick={() => setContactOpen(true)}
                className="flex items-center gap-2 text-slate-500 hover:text-[#B45309] font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Contact & Feedback</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Al-Quran – The Divine Guidance. Dedicated for Sadaqah Jariyah.</p>
          <div className="flex items-center gap-1 text-emerald-800 font-semibold">
            <span>Built with reverence for the Ummah</span> <Heart className="w-3.5 h-3.5 fill-current text-[#B45309]" />
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
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-xs space-y-4 relative shadow-2xl">
              <button onClick={() => setPrivacyOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-emerald-700">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-cinzel text-lg font-bold text-emerald-800">Privacy & Sacred Text Integrity</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                This platform is built with strict commitment to privacy. We do not track personal identification data. All bookmarks and progress are stored locally on your device.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
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
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-xs relative shadow-2xl">
              <button onClick={() => setContactOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-emerald-700">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-cinzel text-lg font-bold text-emerald-800 mb-2">Get In Touch</h3>
              <p className="text-slate-500 mb-4">Send us feedback or feature requests to improve this experience.</p>

              {contactSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-semibold">
                  JazakAllah Khair! Your message has been received.
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3">
                  <input type="text" placeholder="Your Name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                  <input type="email" placeholder="Your Email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                  <textarea placeholder="Your Message or Suggestion..." rows={3} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"></textarea>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-all">
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
