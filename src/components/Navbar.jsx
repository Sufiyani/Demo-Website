import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Share2, Camera, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/deals', label: 'Deals' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { openModal } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  return (
    <>
      {/* Top info bar */}
      <div className="bg-charcoal-950 border-b border-gold-500/15 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5 text-charcoal-400 text-xs">
            <a href="tel:+923001234567" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors duration-200">
              <Phone size={11} className="text-gold-500" />
              +92 300 123 4567
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-charcoal-500 hover:text-gold-400 transition-colors duration-200 hover:scale-110 transform">
              <Share2 size={13} />
            </a>
            <a href="#" aria-label="Instagram" className="text-charcoal-500 hover:text-gold-400 transition-colors duration-200 hover:scale-110 transform">
              <Camera size={13} />
            </a>
            <a href="https://wa.me/923001234567" aria-label="WhatsApp" className="text-charcoal-500 hover:text-gold-400 transition-colors duration-200 hover:scale-110 transform">
              <MessageCircle size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal-950/96 backdrop-blur-xl shadow-2xl shadow-black/60 border-b border-gold-500/10'
            : 'bg-charcoal-950 border-b border-charcoal-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {/* Emblem */}
            <div className="relative w-10 h-10 shrink-0">
              {/* Outer ring */}
              <div className="absolute inset-0 border border-gold-500/40 rotate-45 group-hover:rotate-[60deg] transition-transform duration-500" />
              {/* Inner fill */}
              <div className="absolute inset-[3px] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center">
                {/* Scissors SVG — more elegant than lucide */}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-charcoal-950 group-hover:rotate-12 transition-transform duration-300" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                </svg>
              </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <span className="font-display text-[22px] font-bold tracking-wide text-white group-hover:text-gold-300 transition-colors duration-300">
                Luxe
                <span className="text-gold-400 ml-1">Salon</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-charcoal-500 uppercase font-medium mt-0.5 group-hover:text-gold-600 transition-colors duration-300">
                Karachi · Est. 2014
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 block ${
                      isActive ? 'text-gold-400' : 'text-charcoal-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
                        animate={{ width: isActive ? '60%' : '0%' }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ display: 'block' }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              id="navbar-book-btn"
              onClick={() => openModal()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-charcoal-950 font-bold text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 hover:from-gold-400 hover:to-gold-600 transition-all duration-300 shadow-lg shadow-gold-900/30"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12"/>
              </svg>
              Book Appointment
            </motion.button>

            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-all duration-200"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-charcoal-900 z-50 flex flex-col shadow-2xl border-l border-gold-500/10"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold-500/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-charcoal-950" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-display text-base font-bold text-white">Luxe <span className="text-gold-400">Salon</span></span>
                    <p className="text-[9px] text-charcoal-500 tracking-widest uppercase">Karachi</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:bg-charcoal-800 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="flex flex-col gap-0.5">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-gold-500/8 text-gold-400 border-l-2 border-gold-500'
                              : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800 border-l-2 border-transparent'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-gold-500/15 space-y-3">
                <button
                  id="mobile-book-btn"
                  onClick={() => { openModal(); setDrawerOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-charcoal-950 font-bold text-xs tracking-widest uppercase py-3 hover:from-gold-400 hover:to-gold-600 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                  </svg>
                  Book Appointment
                </button>
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="text-charcoal-500 hover:text-gold-400 transition-colors"><Share2 size={16} /></a>
                  <a href="#" className="text-charcoal-500 hover:text-gold-400 transition-colors"><Camera size={16} /></a>
                  <a href="https://wa.me/923001234567" className="text-charcoal-500 hover:text-gold-400 transition-colors"><MessageCircle size={16} /></a>
                </div>
                <a href="tel:+923001234567" className="flex items-center justify-center gap-2 text-charcoal-500 text-xs hover:text-gold-400 transition-colors">
                  <Phone size={11} className="text-gold-600" />
                  +92 300 123 4567
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
