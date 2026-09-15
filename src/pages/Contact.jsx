import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Share2, Camera, MessageCircle, CheckCircle, Send } from 'lucide-react';

// mock data, replace with API later
const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Shop 12, Block 6, P.E.C.H.S, Karachi, Sindh – 75400, Pakistan' },
  { icon: Phone, label: 'Phone', value: '+92 300 123 4567', href: 'tel:+923001234567' },
  { icon: Mail, label: 'Email', value: 'hello@luxesalon.pk', href: 'mailto:hello@luxesalon.pk' },
];

const hours = [
  { day: 'Monday – Friday', time: '10:00 AM – 8:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 6:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.message.trim()) errs.message = 'Please enter a message';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // No real submission — static confirmation only
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <section className="py-16 bg-charcoal-900/60 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Get In Touch</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-3">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-charcoal-400 max-w-lg">
            Have questions or want to know more? Send us a message and we'll get back to you within a few hours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={32} className="text-charcoal-950" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-charcoal-400 text-sm leading-relaxed mb-5">
                Thank you for reaching out, <span className="text-gold-400 font-semibold">{form.name}</span>! We'll get back to you shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                className="btn-outline text-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })); }}
                    className={`w-full bg-charcoal-800 border ${errors.name ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">Phone *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((er) => ({ ...er, phone: '' })); }}
                    className={`w-full bg-charcoal-800 border ${errors.phone ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com (optional)"
                  value={form.email}
                  onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: '' })); }}
                  className={`w-full bg-charcoal-800 border ${errors.email ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">Message *</label>
                <textarea
                  id="contact-message"
                  placeholder="What can we help you with?"
                  value={form.message}
                  onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: '' })); }}
                  rows={5}
                  className={`w-full bg-charcoal-800 border ${errors.message ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-gold text-sm disabled:opacity-70"
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="block w-4 h-4 border-2 border-charcoal-900 border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Info cards */}
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4 card-glass p-4">
                <div className="w-10 h-10 bg-gold-500/10 flex items-center justify-center shrink-0">
                  <info.icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-500 uppercase tracking-widest mb-0.5">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-charcoal-200 text-sm hover:text-gold-400 transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-charcoal-200 text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="card-glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-gold-500" />
              <h3 className="font-semibold text-white text-sm uppercase tracking-widest">Opening Hours</h3>
            </div>
            <ul className="space-y-2">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-charcoal-400">{h.day}</span>
                  <span className="text-gold-400 font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-charcoal-500 uppercase tracking-widest mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[
                { Icon: Share2, label: 'Facebook', href: '#' },
                { Icon: Camera, label: 'Instagram', href: '#' },
                { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919876543210' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-2 px-4 py-2.5 border border-charcoal-700 text-charcoal-400 text-sm hover:text-gold-400 hover:border-gold-500/50 transition-all"
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden border border-gold-500/10">
            <iframe
              title="Luxe Salon Map — Karachi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231922.3752845523!2d66.99310485!3d24.860735549999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694600000000!5m2!1sen!2s"
              width="100%"
              height="220"
              style={{ border: 0, filter: 'grayscale(80%) brightness(1.05) contrast(0.9) sepia(5%)' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
