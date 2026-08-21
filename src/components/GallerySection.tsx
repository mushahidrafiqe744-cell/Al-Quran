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
    <section id="gallery" className="py-16 bg-[#080C0B] text-slate-100 min-h-screen relative">
      {/* Unique beautiful backdrop: Reflective water courtyard and arches */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80"
          alt="Islamic Art Gallery Backdrop"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-[40%] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0B] via-[#080C0B]/60 to-[#080C0B]/85"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#FFF1CB] text-xs font-bold uppercase tracking-widest mb-3">
            <Grid className="w-4 h-4 text-emerald-400" />
            <span>Islamic Aesthetics</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            Islamic Art & Sanctuary Gallery
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
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
                  ? 'bg-[#C5A059] text-slate-950 shadow-md'
                  : 'bg-[#0E1714] text-slate-400 border border-slate-800 hover:text-[#FFF1CB]'
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
              className="group relative rounded-3xl overflow-hidden bg-[#0E1714] border border-[#C5A059]/20 cursor-pointer shadow-xl h-72"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C0B] via-[#080C0B]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/30 border border-[#C5A059]/40 text-[#FFF1CB] text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {item.category}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-slate-100 group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3 h-3" /> {item.location}
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-[#0E1714] border-2 border-[#C5A059]/40 rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-[#C5A059]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] overflow-hidden">
                <img src={activeItem.imageUrl} alt={activeItem.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-1">{activeItem.category}</span>
                <h3 className="font-cinzel text-2xl font-bold text-slate-100 mb-2">{activeItem.title}</h3>
                <p className="text-xs text-slate-300 font-light mb-4">{activeItem.description}</p>
                {activeItem.location && (
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {activeItem.location}
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
