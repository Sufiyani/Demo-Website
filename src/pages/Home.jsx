import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Clock, Leaf, Smile, ArrowRight, Scissors, Camera } from 'lucide-react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { serviceCategories } from '../data/services';
import { galleryImages } from '../data/gallery';
import { useBooking } from '../context/BookingContext';

const features = [
  {
    number: '01',
    icon: Award,
    title: 'Expert Stylists',
    description: 'Our team of internationally trained stylists bring years of expertise to every appointment, ensuring a flawless result every time.',
  },
  {
    number: '02',
    icon: Leaf,
    title: 'Premium Products',
    description: 'We use only the finest salon-grade products — from international hair care brands to organic skin treatments — for lasting results.',
  },
  {
    number: '03',
    icon: Smile,
    title: 'Relaxing Ambience',
    description: 'Step into a world of luxury. Our salon is designed to make you feel calm, comfortable, and thoroughly pampered from arrival to exit.',
  },
  {
    number: '04',
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Open 7 days a week with extended hours on weekends — because your schedule matters. Walk-ins welcome, appointments preferred.',
  },
];

const featuredServices = serviceCategories.slice(0, 4);
const galleryStrip = galleryImages.slice(0, 6);

export default function Home() {
  const { openModal } = useBooking();

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Why Choose Us */}
      <section className="py-24 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Why Choose Us</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-3">
              The Luxe <span className="gradient-text">Difference</span>
            </h2>
            <p className="text-charcoal-400 leading-relaxed">
              We don't just cut hair — we craft experiences. Here's what sets us apart from every other salon in the city.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.number} {...f} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Services</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-white">
                What We <span className="gradient-text">Offer</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="flex items-center gap-2 text-gold-400 text-sm font-semibold hover:gap-3 transition-all whitespace-nowrap"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((cat, i) => (
              <ServiceCard key={cat.id} category={cat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Membership / Promo Banner */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/85" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <span className="inline-block border border-gold-500/40 text-gold-400 text-xs font-bold px-4 py-1.5 tracking-[0.3em] uppercase mb-5">
            Members Get More
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Membership <span className="gradient-text">Flat 10% Off</span>
            <br />Every Single Visit
          </h2>
          <p className="text-charcoal-300 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Join the Luxe Salon membership and enjoy exclusive discounts, priority bookings, and complimentary add-ons — month after month.
          </p>
          <button
            id="membership-cta-btn"
            onClick={() => openModal('Membership Enquiry')}
            className="btn-gold px-10 py-4 text-sm"
          >
            <Scissors size={16} />
            Get Membership
          </button>
        </motion.div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Gallery Strip — Featured Layout */}
      <section className="py-20 bg-charcoal-950 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Work</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Crafted with <span className="gradient-text">Precision</span>
              </h2>
              <p className="text-charcoal-500 text-sm mt-1.5">
                Follow us <span className="text-gold-500 font-medium">@luxesalon</span> for daily grooming inspiration.
              </p>
            </div>
            <Link
              to="/gallery"
              className="group shrink-0 inline-flex items-center gap-2 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-gold-500/8 hover:border-gold-500 transition-all duration-300"
            >
              View Full Gallery
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Grid: 1 featured large + 4 small + 1 wide */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 grid-rows-2 gap-2" style={{ height: 'clamp(340px, 50vw, 500px)' }}>

            {/* Featured — col-span-2 row-span-2 */}
            {galleryStrip[0] && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={galleryStrip[0].thumb}
                  alt={galleryStrip[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-gold-500 text-charcoal-950 text-[9px] font-black px-2.5 py-1 uppercase tracking-widest">Featured</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gold-400 text-[9px] font-bold tracking-widest uppercase mb-1">{galleryStrip[0].category}</p>
                  <p className="text-white font-display text-lg font-bold leading-snug">{galleryStrip[0].title}</p>
                </div>
              </motion.div>
            )}

            {/* 4 small tiles */}
            {galleryStrip.slice(1, 5).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i + 1) * 0.07 }}
                className="relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/60 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-gold-400 text-[8px] font-bold tracking-widest uppercase leading-none mb-0.5">{img.category}</p>
                  <p className="text-white text-[10px] font-semibold leading-tight truncate">{img.title}</p>
                </div>
              </motion.div>
            ))}

            {/* Wide bottom-right tile — col-span-2 */}
            {galleryStrip[5] && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="col-span-2 relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={galleryStrip[5].thumb}
                  alt={galleryStrip[5].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/55 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="border border-gold-500/60 text-gold-400 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5">
                    {galleryStrip[5].category}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
