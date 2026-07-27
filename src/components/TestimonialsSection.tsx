import React from 'react';
import { TESTIMONIALS } from '../data/quranData';
import { Heart, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#080C0B] text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>Community Reverence</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold gold-gradient-text">
            Loved by Readers & Scholars
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Reflections from our global Muslim community on their Quranic digital journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0E1714] border border-[#C5A059]/20 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-[#C5A059]/10 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex gap-1 text-[#C5A059]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/50" />
                <div>
                  <h4 className="font-bold text-xs text-[#C5A059]">{t.name}</h4>
                  <p className="text-[10px] text-emerald-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
