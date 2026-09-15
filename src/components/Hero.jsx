import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Hero() {
  const { openModal } = useBooking();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=85')" }}
      />
      {/* Overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/80 to-charcoal-950/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

      {/* Decorative vertical line */}
      <div className="absolute left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent hidden xl:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          {/* Pre-heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Premium Men's Salon</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            Grooming That
            <br />
            <span className="gradient-text italic">Defines You</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-charcoal-300 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Experience Karachi's finest luxury grooming — precision haircuts, hot towel shaves, premium facials, and relaxing treatments, all in one exclusive space.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button
              id="hero-book-btn"
              onClick={() => openModal()}
              className="btn-gold text-sm px-8 py-4"
            >
              <Scissors size={16} />
              Book Appointment
            </button>
            <Link to="/services" id="hero-services-link" className="btn-outline text-sm px-8 py-4">
              View Services
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-8 mt-14 pt-8 border-t border-charcoal-800/50"
          >
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '10+', label: 'Years Experience' },
              { value: '15', label: 'Expert Stylists' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-gold-400">{stat.value}</div>
                <div className="text-charcoal-400 text-xs tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gold-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
