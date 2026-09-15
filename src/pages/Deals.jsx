import { motion } from 'framer-motion';
import { Crown, Gem, Star, Check, Scissors } from 'lucide-react';
import DealCard from '../components/DealCard';
import { deals, specialOccasionPackages } from '../data/deals';
import { useBooking } from '../context/BookingContext';

const tierIcons = { crown: Crown, ring: Gem, star: Star };

export default function Deals() {
  const { openModal } = useBooking();

  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* Page header */}
      <section className="py-16 bg-charcoal-900/60 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900/50 to-red-800/30 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 mb-6 uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Up to 75% OFF — Limited Time Deals
          </motion.div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Deals & Packages</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-3">
            Unbeatable <span className="gradient-text">Offers</span>
          </h1>
          <p className="text-charcoal-400 max-w-lg">
            Bundle your favourite services and save big. From everyday essentials to special occasion packages — there's a deal for every occasion.
          </p>
        </div>
      </section>

      {/* Regular deals grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Popular <span className="gradient-text">Packages</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} delay={i * 0.07} highlight={deal.popular} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Occasion Packages */}
      <section className="py-16 bg-charcoal-900/40 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Premium Tier</span>
              <div className="w-10 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-3">
              Special Occasion <span className="gradient-text">Packages</span>
            </h2>
            <p className="text-charcoal-400 max-w-xl mx-auto text-sm">
              For your most important moments — complete grooming experiences curated for weddings, engagements, and special events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOccasionPackages.map((pkg, i) => {
              const IconComp = tierIcons[pkg.icon] || Star;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative border border-gold-500/30 bg-gradient-to-b from-charcoal-900 via-charcoal-900 to-charcoal-950 overflow-hidden group"
                >
                  {/* Top gold accent */}
                  <div className="h-1 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 w-full" />

                  <div className="p-7">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                      <IconComp size={22} className="text-gold-400" />
                    </div>

                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {pkg.title}
                      </h3>
                      <span className="text-xs font-bold bg-gold-500/10 border border-gold-500/30 text-gold-400 px-2 py-1 shrink-0 ml-2">
                        {pkg.badge}
                      </span>
                    </div>

                    <p className="text-charcoal-400 text-sm leading-relaxed mb-5">{pkg.description}</p>

                    <div className="flex items-end gap-3 mb-6">
                      <span className="font-display text-3xl font-black text-gold-400">Rs. {pkg.price.toLocaleString()}</span>
                      <span className="text-charcoal-500 line-through text-sm mb-1">Rs. {pkg.originalPrice.toLocaleString()}</span>
                    </div>

                    <ul className="space-y-2 mb-7">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-charcoal-300">
                          <Check size={13} className="text-gold-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      id={`special-book-${pkg.id}`}
                      onClick={() => openModal(pkg.title)}
                      className="btn-gold w-full justify-center text-sm"
                    >
                      <Scissors size={15} />
                      Book This Package
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
