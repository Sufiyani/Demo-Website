import { motion } from 'framer-motion';
import { Check, Scissors, Zap } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function DealCard({ deal, delay = 0, highlight = false }) {
  const { openModal } = useBooking();
  const discount = Math.round((1 - deal.price / deal.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative flex flex-col group transition-all duration-300 ${
        highlight || deal.popular
          ? 'border border-gold-500/50 bg-gradient-to-b from-charcoal-900 to-charcoal-950'
          : 'card-glass hover:border-gold-500/30'
      }`}
    >
      {/* Popular badge */}
      {(highlight || deal.popular) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-700 text-charcoal-950 text-xs font-bold px-4 py-1 tracking-wider uppercase">
          Most Popular
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">
              {deal.title}
            </h3>
            <p className="text-charcoal-400 text-xs leading-relaxed">{deal.description}</p>
          </div>
          {deal.badge && (
            <span className="shrink-0 ml-3 bg-red-900/40 border border-red-500/30 text-red-400 text-xs font-bold px-2 py-1">
              {deal.badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end gap-3 mb-5">
          <span className="font-display text-3xl font-black text-gold-400">Rs. {deal.price.toLocaleString()}</span>
          <span className="text-charcoal-500 line-through text-sm mb-1">Rs. {deal.originalPrice.toLocaleString()}</span>
        </div>

        {/* Includes list */}
        <ul className="space-y-2 mb-6 flex-1">
          {deal.includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-charcoal-300">
              <Check size={13} className="text-gold-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          id={`deal-book-${deal.id}`}
          onClick={() => openModal(deal.title)}
          className={`w-full py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            highlight || deal.popular
              ? 'btn-gold'
              : 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500'
          }`}
        >
          <Scissors size={14} />
          Book This Deal
        </button>
      </div>
    </motion.div>
  );
}
