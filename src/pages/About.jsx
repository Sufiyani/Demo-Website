import { motion } from 'framer-motion';
import { Camera, Share2 } from 'lucide-react';
import { team } from '../data/team';

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '15', label: 'Expert Stylists' },
  { value: '8', label: 'Service Categories' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <section className="py-16 bg-charcoal-900/60 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Story</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-3">
            About <span className="gradient-text">Luxe Salon</span>
          </h1>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Mission</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-5">
              Crafting Confidence,<br />
              <span className="gradient-text">One Cut at a Time</span>
            </h2>
            <div className="space-y-4 text-charcoal-400 text-sm leading-relaxed">
              <p>
                Luxe Salon was born from a simple belief: every man deserves to feel exceptional. Founded in 2014 in Karachi, we set out to create a grooming experience that combines the precision of a master barber with the luxury of a high-end spa.
              </p>
              <p>
                Over a decade later, we've become Karachi's most trusted name in premium men's grooming — serving hundreds of loyal clients from DHA, Clifton, and beyond who walk in for a haircut and leave with renewed confidence.
              </p>
              <p>
                Our philosophy is straightforward: use the best products, employ the most skilled stylists, and make every client feel like the only client. No shortcuts, no compromises — just exceptional grooming, every time.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=85"
                alt="Luxe Salon interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal-900/40 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl sm:text-5xl font-black text-gold-400 mb-2">{stat.value}</div>
                <div className="text-charcoal-400 text-sm tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">The Artisans</span>
              <div className="w-10 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-4xl font-bold text-white">
              Meet Our <span className="gradient-text">Experts</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group text-center"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-5">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=222&color=d4a843&size=400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <p className="text-charcoal-300 text-xs leading-relaxed mb-3">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      <a href={member.socials.instagram} className="w-8 h-8 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-colors">
                        <Camera size={13} />
                      </a>
                      <a href={member.socials.facebook} className="w-8 h-8 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 transition-colors">
                        <Share2 size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-gold-500 pl-4 text-left">
                  <h3 className="font-display text-lg font-bold text-white mb-0.5">{member.name}</h3>
                  <p className="text-gold-400 text-xs font-semibold mb-1">{member.role}</p>
                  <p className="text-charcoal-500 text-xs">{member.experience} Years Experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
