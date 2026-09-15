import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ category, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group card-glass overflow-hidden hover:border-gold-500/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.parentNode.style.background = '#222222';
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="font-display text-2xl font-black text-gold-500/50">
            {category.number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
          {category.title}
        </h3>
        <p className="text-charcoal-400 text-sm leading-relaxed mb-4">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-charcoal-500">
            From <span className="text-gold-400 font-semibold">Rs. {Math.min(...category.items.map(i => i.price)).toLocaleString()}</span>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-1 text-gold-400 text-xs font-semibold hover:gap-2 transition-all"
          >
            Learn More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
