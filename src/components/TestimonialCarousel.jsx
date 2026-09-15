import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-charcoal-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Testimonials</span>
            <div className="w-10 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-4xl font-bold text-white">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((t, i) =>
              i === current ? (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="card-glass p-8 sm:p-10 text-center"
                >
                  <Quote size={36} className="text-gold-500/30 mx-auto mb-4" />

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-charcoal-300 text-base sm:text-lg leading-relaxed italic mb-8">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500/40">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=d4a843&color=0a0a0a&size=56`; }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-gold-500 text-xs">{t.service}</div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              id="testimonial-prev-btn"
              onClick={prev}
              className="w-10 h-10 border border-gold-500/30 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-gold-500' : 'w-1.5 bg-charcoal-700'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              id="testimonial-next-btn"
              onClick={next}
              className="w-10 h-10 border border-gold-500/30 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
