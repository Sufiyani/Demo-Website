import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages, galleryFilters } from '../data/gallery';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <section className="py-16 bg-charcoal-900/60 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Work</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-3">
            The <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-charcoal-400 max-w-lg">
            A showcase of our finest work — from precision haircuts to stunning transformations. Click any image to view in full.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {galleryFilters.map((f) => (
            <button
              key={f}
              id={`gallery-filter-${f.toLowerCase()}`}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === f
                  ? 'bg-gold-500 text-charcoal-950'
                  : 'border border-charcoal-700 text-charcoal-400 hover:border-gold-500/50 hover:text-gold-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="break-inside-avoid mb-3 group cursor-pointer relative overflow-hidden"
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-charcoal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">{img.title}</p>
                  <p className="text-gold-400 text-xs">{img.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <p className="text-white font-semibold">{lightboxImg.title}</p>
                <p className="text-gold-400 text-sm">{lightboxImg.category}</p>
              </div>
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxImg(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-charcoal-900/80 flex items-center justify-center text-white hover:text-gold-400 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
