import React from 'react';
import { TESTIMONIALS } from '../data/quranData';
import { Heart, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8FAF8] text-slate-800 relative">
      {/* Unique beautiful backdrop: Peaceful mosque light rays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80"
          alt="Testimonials Backdrop"
          className="w-full h-full object-cover object-center opacity-[0.05] filter grayscale brightness-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/40 to-[#F8FAF8]/80"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>Community Reverence</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold gold-gradient-text">
            Loved by Readers & Scholars
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2">
            Reflections from our global Muslim community on their Quranic digital journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 shadow-md flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-[#D4AF37]/15 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex gap-1 text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50" />
                <div>
                  <h4 className="font-bold text-xs text-[#B45309]">{t.name}</h4>
                  <p className="text-[10px] text-emerald-700 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
