import { motion } from 'framer-motion';

export default function FeatureCard({ number, icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="card-glass p-8 group hover:border-gold-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-5">
        {/* Number */}
        <div className="font-display text-4xl font-black text-gold-500/20 group-hover:text-gold-500/40 transition-colors leading-none shrink-0 mt-1">
          {number}
        </div>
        <div>
          {/* Icon */}
          <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
            <Icon size={22} className="text-gold-400" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
            {title}
          </h3>
          <p className="text-charcoal-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
