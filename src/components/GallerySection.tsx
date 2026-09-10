import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/quranData';
import { GalleryItem } from '../types';
import { Grid, Eye, MapPin, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Mosque', 'Calligraphy', 'Manuscript', 'Nature'];

  const filteredItems = selectedFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-16 bg-[#F8FAF8] text-slate-800 min-h-screen relative">
      {/* Unique beautiful backdrop: Reflective water courtyard and arches */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80"
          alt="Islamic Art Gallery Backdrop"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Grid className="w-4 h-4 text-emerald-600" />
            <span>Islamic Aesthetics</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            Islamic Art & Sanctuary Gallery
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Explore breathtaking photography of sacred architecture, illuminated Uthmani calligraphy, and nature.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFilter === cat
                  ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-emerald-800 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-100 cursor-pointer shadow-md h-72"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#FFF1CB] text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {item.category}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="text-xs text-sky-300 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3 h-3 text-sky-400" /> {item.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-[#D4AF37] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] overflow-hidden">
                <img src={activeItem.imageUrl} alt={activeItem.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest block mb-1">{activeItem.category}</span>
                <h3 className="font-cinzel text-2xl font-bold text-emerald-800 mb-2">{activeItem.title}</h3>
                <p className="text-xs text-slate-600 font-light mb-4">{activeItem.description}</p>
                {activeItem.location && (
                  <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {activeItem.location}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
