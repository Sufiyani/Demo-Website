import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Share2, Camera, MessageCircle, Clock, ArrowRight, Scissors } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Deals & Packages', to: '/deals' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  { label: 'Haircut & Shave', to: '/services' },
  { label: 'Hair Color', to: '/services' },
  { label: 'Skin Facials', to: '/services' },
  { label: 'Massage Services', to: '/services' },
  { label: 'Manicure & Pedicure', to: '/services' },
  { label: 'Waxing & Threading', to: '/services' },
];

const hours = [
  { day: 'Mon – Fri', time: '10:00 AM – 8:00 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 9:00 PM', open: true },
  { day: 'Sunday', time: '11:00 AM – 6:00 PM', open: true },
];

const socials = [
  { href: '#', label: 'Facebook', Icon: Share2 },
  { href: '#', label: 'Instagram', Icon: Camera },
  { href: 'https://wa.me/923001234567', label: 'WhatsApp', Icon: MessageCircle },
];

export default function Footer() {
  const { openModal } = useBooking();

  return (
    <footer className="bg-charcoal-950 relative overflow-hidden">

      {/* ─── Top decorative line ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-40" />

      {/* ─── CTA Strip ─── */}
      <div className="relative bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 border-b border-gold-500/10 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <p className="text-xs text-gold-500 tracking-[0.3em] uppercase font-semibold mb-1">Ready to look your best?</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Book Your Appointment <span className="gradient-text">Today</span>
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal()}
            className="shrink-0 flex items-center gap-2.5 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-charcoal-950 font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 shadow-lg shadow-gold-900/20"
          >
            <Scissors size={16} />
            Book Now
          </motion.button>
        </div>
      </div>

      {/* ─── Main footer body ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-10">

          {/* Brand column — wider */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link to="/" className="group inline-flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 shrink-0">
                <div className="absolute inset-0 border border-gold-500/40 rotate-45 group-hover:rotate-[60deg] transition-transform duration-500" />
                <div className="absolute inset-[3px] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-charcoal-950" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300 leading-none">
                  Luxe <span className="text-gold-400">Salon</span>
                </p>
                <p className="text-[9px] tracking-[0.25em] text-charcoal-500 uppercase mt-0.5">Karachi · Est. 2014</p>
              </div>
            </Link>

            <p className="text-charcoal-400 text-sm leading-relaxed mb-6 max-w-xs">
              Karachi's premier destination for luxury men's grooming — where precision craftsmanship meets a truly relaxing experience.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mb-6">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group/social w-9 h-9 border border-charcoal-800 flex items-center justify-center text-charcoal-500 hover:text-gold-400 hover:border-gold-500/60 hover:bg-gold-500/5 transition-all duration-250"
                >
                  <Icon size={14} className="group-hover/social:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>

            {/* Contact pills */}
            <div className="space-y-2.5">
              <a href="tel:+923001234567" className="flex items-center gap-3 text-sm text-charcoal-400 hover:text-gold-400 transition-colors duration-200 group/c">
                <div className="w-7 h-7 border border-charcoal-800 flex items-center justify-center group-hover/c:border-gold-500/50 transition-colors">
                  <Phone size={12} className="text-gold-600" />
                </div>
                +92 300 123 4567
              </a>
              <a href="mailto:hello@luxesalon.pk" className="flex items-center gap-3 text-sm text-charcoal-400 hover:text-gold-400 transition-colors duration-200 group/c">
                <div className="w-7 h-7 border border-charcoal-800 flex items-center justify-center group-hover/c:border-gold-500/50 transition-colors">
                  <Mail size={12} className="text-gold-600" />
                </div>
                hello@luxesalon.pk
              </a>
              <div className="flex items-start gap-3 text-sm text-charcoal-400">
                <div className="w-7 h-7 border border-charcoal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={12} className="text-gold-600" />
                </div>
                <span>Shop 12, Block 6, P.E.C.H.S,<br />Karachi, Sindh – 75400</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-500" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group/link flex items-center gap-1.5 text-charcoal-500 text-sm hover:text-gold-400 transition-all duration-200"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200 text-gold-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-500" />
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group/link flex items-center gap-1.5 text-charcoal-500 text-sm hover:text-gold-400 transition-all duration-200"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200 text-gold-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Map */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-500" />
              Opening Hours
            </h4>

            <div className="space-y-0 mb-6 border border-charcoal-800 divide-y divide-charcoal-800/60">
              {hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between px-4 py-2.5 hover:bg-charcoal-900/50 transition-colors duration-150">
                  <div className="flex items-center gap-2">
                    <Clock size={11} className="text-gold-600 shrink-0" />
                    <span className="text-charcoal-400 text-xs">{h.day}</span>
                  </div>
                  <span className="text-gold-400 text-xs font-semibold tabular-nums">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="relative overflow-hidden border border-charcoal-800 group/map">
              <iframe
                title="Luxe Salon Location — Karachi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231922.3752845523!2d66.99310485!3d24.860735549999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694600000000!5m2!1sen!2s"
                width="100%"
                height="160"
                style={{ border: 0, filter: 'grayscale(80%) brightness(1.05) contrast(0.9) sepia(5%)', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
              />
              {/* Map overlay label */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-charcoal-950/95 to-transparent flex items-center gap-2">
                <MapPin size={11} className="text-gold-500 shrink-0" />
                <span className="text-charcoal-300 text-xs">P.E.C.H.S, Karachi, Pakistan</span>
                <a
                  href="https://maps.google.com/?q=Karachi,Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-gold-500 text-[10px] hover:text-gold-300 transition-colors flex items-center gap-1"
                >
                  Get Directions <ArrowRight size={9} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="border-t border-charcoal-900 mt-2">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-charcoal-600 text-xs">
            © {new Date().getFullYear()} <span className="text-charcoal-500">Luxe Salon</span>, Karachi. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-charcoal-700 text-xs">
            <span className="w-1 h-1 bg-gold-700 rounded-full" />
            <span>Demo prototype — placeholder content only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
