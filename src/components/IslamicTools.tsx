import React, { useState } from 'react';
import { ALLAH_NAMES, DAILY_DUAS } from '../data/quranData';
import { 
  Calculator, 
  RotateCcw, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Calendar, 
  Coins, 
  Bookmark, 
  Heart,
  ListFilter
} from 'lucide-react';
import { motion } from 'motion/react';

export const IslamicTools: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'tasbeeh' | 'names' | 'duas' | 'calendar' | 'zakat'>('tasbeeh');

  // Tasbeeh State
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [tasbeehTarget, setTasbeehTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState('سُبْحَانَ اللَّهِ (SubhanAllah)');

  // 99 Names Search State
  const [namesSearch, setNamesSearch] = useState('');

  // Duas Filter Category
  const [selectedDuaCat, setSelectedDuaCat] = useState<string>('All');

  // Zakat Calculator State
  const [cash, setCash] = useState<number>(0);
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);

  const goldPricePerGram = 75; // Approx $75/gram
  const silverPricePerGram = 0.95; // Approx $0.95/gram

  const totalAssets = cash + investments + (goldGrams * goldPricePerGram) + (silverGrams * silverPricePerGram);
  const netAssets = Math.max(0, totalAssets - debts);
  const nisabGoldValue = 85 * goldPricePerGram; // 85 grams gold Nisab (~ $6,375)
  const isEligibleForZakat = netAssets >= nisabGoldValue;
  const zakatPayable = isEligibleForZakat ? netAssets * 0.025 : 0;

  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);

  const handleCopyDua = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDuaId(id);
    setTimeout(() => setCopiedDuaId(null), 2000);
  };

  const filteredNames = ALLAH_NAMES.filter(n => 
    n.transliteration.toLowerCase().includes(namesSearch.toLowerCase()) ||
    n.enMeaning.toLowerCase().includes(namesSearch.toLowerCase()) ||
    n.nameArabic.includes(namesSearch)
  );

  const filteredDuas = selectedDuaCat === 'All' 
    ? DAILY_DUAS 
    : DAILY_DUAS.filter(d => d.category === selectedDuaCat);

  return (
    <section id="islamic-tools" className="py-16 bg-[#F8FAF8] text-slate-800 min-h-screen relative">
      {/* Unique beautiful backdrop: Warm Islamic architectural geometry */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80"
          alt="Islamic Tools Backdrop"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Islamic Treasury</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            Islamic Tools & Devotions
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Essential spiritual tools including Digital Tasbeeh, 99 Names of Allah, Daily Duas, Ramadan Calendar & Zakat Calculator.
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 max-w-3xl mx-auto mb-10 shadow-md">
          {[
            { id: 'tasbeeh', label: 'Tasbeeh Counter' },
            { id: 'names', label: '99 Names of Allah' },
            { id: 'duas', label: 'Daily Duas' },
            { id: 'calendar', label: 'Hijri & Ramadan' },
            { id: 'zakat', label: 'Zakat Calculator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-[#D4AF37] text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Digital Tasbeeh Counter */}
        {activeSubTab === 'tasbeeh' && (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-md text-center relative overflow-hidden">
            <h3 className="font-cinzel text-xl font-bold text-emerald-800 mb-4">
              Digital Tasbeeh Counter
            </h3>

            {/* Dhikr Selector */}
            <select
              value={selectedDhikr}
              onChange={(e) => setSelectedDhikr(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none mb-6 focus:border-emerald-500"
            >
              <option value="سُبْحَانَ اللَّهِ (SubhanAllah)">سُبْحَانَ اللَّهِ (SubhanAllah)</option>
              <option value="الْحَمْدُ لِلَّهِ (Alhamdulillah)">الْحَمْدُ لِلَّهِ (Alhamdulillah)</option>
              <option value="اللَّهُ أَكْبَرُ (Allahu Akbar)">اللَّهُ أَكْبَرُ (Allahu Akbar)</option>
              <option value="أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)">أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)</option>
              <option value="لاَ إِلَهَ إِلاَّ اللَّهُ (La ilaha illa Allah)">لاَ إِلَهَ إِلاَّ اللَّهُ (La ilaha illa Allah)</option>
            </select>

            {/* Main Interactive Tap Button */}
            <motion.div
              whileTap={{ scale: 0.92 }}
              onClick={() => setTasbeehCount(tasbeehCount + 1)}
              className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-emerald-500/5 via-emerald-500/10 to-[#D4AF37]/5 border-4 border-[#D4AF37]/50 p-4 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:border-[#D4AF37] transition-all mb-6"
            >
              <span className="font-mono text-5xl font-black gold-gradient-text tracking-wider">
                {tasbeehCount}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest mt-1">
                Target: {tasbeehTarget}
              </span>
            </motion.div>

            {/* Target Selectors & Reset */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                {[33, 99, 1000].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTasbeehTarget(t); setTasbeehCount(0); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      tasbeehTarget === t ? 'bg-[#D4AF37]/20 text-[#B45309] border-[#D4AF37]' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setTasbeehCount(0)}
                className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all flex items-center gap-1 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        )}

        {/* 2. 99 Names of Allah */}
        {activeSubTab === 'names' && (
          <div>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  placeholder="Search 99 Names by English, Meaning or Arabic..."
                  value={namesSearch}
                  onChange={(e) => setNamesSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredNames.map((item) => (
                <div
                  key={item.number}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all text-center group"
                >
                  <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold flex items-center justify-center mx-auto mb-2">
                    {item.number}
                  </span>
                  <span className="font-amiri text-3xl font-bold text-emerald-800 block mb-1 group-hover:scale-105 group-hover:text-[#B45309] transition-transform">
                    {item.nameArabic}
                  </span>
                  <h4 className="font-cinzel text-xs font-bold text-slate-800">{item.transliteration}</h4>
                  <p className="text-[11px] text-emerald-700 font-bold">{item.enMeaning}</p>
                  <p className="text-[10px] text-slate-500 mt-2 font-light line-clamp-2">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Daily Duas */}
        {activeSubTab === 'duas' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {['All', 'Morning & Evening', 'Guidance & Peace', 'Forgiveness', 'Protection & Healing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedDuaCat(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedDuaCat === cat 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' 
                      : 'bg-white text-slate-500 border-slate-200 hover:text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDuas.map((dua) => (
                <div key={dua.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{dua.category}</span>
                    <button
                      onClick={() => handleCopyDua(dua.id, `${dua.title}\n${dua.arabic}\n${dua.translation}`)}
                      className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      {copiedDuaId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">{dua.title}</h4>
                  <p className="font-amiri text-2xl text-right text-[#B45309] leading-relaxed" dir="rtl">{dua.arabic}</p>
                  <p className="text-xs text-emerald-700 italic">{dua.transliteration}</p>
                  <p className="text-xs text-slate-600 font-light">{dua.translation}</p>
                  <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{dua.reference}</span>
                    <span className="text-[#B45309] font-medium">{dua.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Hijri Calendar & Ramadan Countdown */}
        {activeSubTab === 'calendar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center shadow-md">
              <Calendar className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
              <h3 className="font-cinzel text-xl font-bold gold-gradient-text mb-2">Hijri Islamic Calendar</h3>
              <p className="text-2xl font-bold text-slate-800 mb-1">14 Safar 1448 AH</p>
              <p className="text-xs text-slate-500">Equivalent Gregorian: July 2026</p>

              <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-3">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Upcoming Holy Occasions</h4>
                <div className="p-3 rounded-xl bg-slate-50 text-xs flex justify-between">
                  <span>Ramadan 1448</span>
                  <span className="text-emerald-700 font-bold">~ Feb 2027</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-xs flex justify-between">
                  <span>Eid al-Fitr 1448</span>
                  <span className="text-[#B45309] font-bold">~ Mar 2027</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-white to-[#D4AF37]/5 border border-slate-200 text-center flex flex-col justify-between shadow-md">
              <div>
                <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
                <h3 className="font-cinzel text-2xl font-bold text-emerald-800 mb-2">Ramadan Countdown</h3>
                <div className="font-mono text-5xl font-black text-emerald-800 my-4">
                  210 Days
                </div>
                <p className="text-xs text-slate-600 font-light">
                  "The month of Ramadan in which was revealed the Quran, a guidance for the people." (2:185)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Zakat Calculator */}
        {activeSubTab === 'zakat' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
            <h3 className="font-cinzel text-2xl font-bold gold-gradient-text mb-6 text-center">
              Zakat Calculator (2.5%)
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Cash in Bank & Hand ($)</label>
                <input
                  type="number"
                  value={cash || ''}
                  onChange={(e) => setCash(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Gold Owned (Grams)</label>
                  <input
                    type="number"
                    value={goldGrams || ''}
                    onChange={(e) => setGoldGrams(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Silver Owned (Grams)</label>
                  <input
                    type="number"
                    value={silverGrams || ''}
                    onChange={(e) => setSilverGrams(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Investments & Stocks ($)</label>
                <input
                  type="number"
                  value={investments || ''}
                  onChange={(e) => setInvestments(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Liabilities / Debts Due ($)</label>
                <input
                  type="number"
                  value={debts || ''}
                  onChange={(e) => setDebts(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-emerald-100 text-center">
              <span className="text-xs text-slate-500 block mb-1">Total Net Wealth: ${netAssets.toLocaleString()}</span>
              <span className="text-xs text-emerald-700 block mb-3">Nisab Threshold: ~${nisabGoldValue.toLocaleString()}</span>
              <div className="font-cinzel text-3xl font-extrabold text-[#B45309]">
                Zakat Due: ${zakatPayable.toFixed(2)}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
