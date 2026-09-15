import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Scissors, CheckCircle, Calendar, Clock, User, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { serviceCategories } from '../data/services';

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
];

const serviceOptions = [
  'General Consultation',
  ...serviceCategories.map((c) => c.title),
  'Wedding Package',
  'Engagement Package',
  'Special Event Package',
];

export default function BookingModal() {
  const { isModalOpen, closeModal, prefilledService } = useBooking();
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', service: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prefilledService) {
      setForm((f) => ({ ...f, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim() || !/^\+?[\d\s-]{8,}$/.test(form.phone)) errs.phone = 'Valid phone number required';
    if (!form.date) errs.date = 'Please select a date';
    if (!form.time) errs.time = 'Please select a time';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate async submission — no real backend call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', date: '', time: '', service: '', notes: '' });
      setErrors({});
    }, 300);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-charcoal-900 border border-gold-500/20 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-charcoal-950 to-charcoal-900 border-b border-gold-500/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center">
                  <Scissors size={16} className="text-charcoal-950 rotate-12" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Book Appointment</h2>
                  <p className="text-charcoal-400 text-xs">We'll confirm your slot within 2 hours</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-charcoal-400 hover:text-gold-400 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle size={32} className="text-charcoal-950" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      You're All Set!
                    </h3>
                    <p className="text-charcoal-300 text-sm leading-relaxed mb-1">
                      Thank you, <span className="text-gold-400 font-semibold">{form.name}</span>!
                    </p>
                    <p className="text-charcoal-400 text-sm leading-relaxed mb-6">
                      We'll confirm your appointment shortly via call or WhatsApp. See you soon! ✨
                    </p>
                    <button onClick={handleClose} className="btn-gold mx-auto">
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                        <User size={11} className="inline mr-1 text-gold-500" />Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })); }}
                        className={`w-full bg-charcoal-800 border ${errors.name ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                        <Phone size={11} className="inline mr-1 text-gold-500" />Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((er) => ({ ...er, phone: '' })); }}
                        className={`w-full bg-charcoal-800 border ${errors.phone ? 'border-red-500' : 'border-charcoal-700'} text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                          <Calendar size={11} className="inline mr-1 text-gold-500" />Date *
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          min={minDate}
                          value={form.date}
                          onChange={(e) => { setForm((f) => ({ ...f, date: e.target.value })); setErrors((er) => ({ ...er, date: '' })); }}
                          className={`w-full bg-charcoal-800 border ${errors.date ? 'border-red-500' : 'border-charcoal-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors`}
                          style={{ colorScheme: 'dark' }}
                        />
                        {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                          <Clock size={11} className="inline mr-1 text-gold-500" />Time *
                        </label>
                        <div className="relative">
                          <select
                            id="booking-time"
                            value={form.time}
                            onChange={(e) => { setForm((f) => ({ ...f, time: e.target.value })); setErrors((er) => ({ ...er, time: '' })); }}
                            className={`w-full bg-charcoal-800 border ${errors.time ? 'border-red-500' : 'border-charcoal-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors appearance-none`}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
                        </div>
                        {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                        <Scissors size={11} className="inline mr-1 text-gold-500" />Service / Deal
                      </label>
                      <div className="relative">
                        <select
                          id="booking-service"
                          value={form.service}
                          onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                          className="w-full bg-charcoal-800 border border-charcoal-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                        >
                          <option value="">Select a service (optional)</option>
                          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-widest mb-1.5">
                        <MessageSquare size={11} className="inline mr-1 text-gold-500" />Additional Notes
                      </label>
                      <textarea
                        id="booking-notes"
                        placeholder="Any specific requirements or preferences..."
                        value={form.notes}
                        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        rows={3}
                        className="w-full bg-charcoal-800 border border-charcoal-700 text-white placeholder-charcoal-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      id="booking-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full justify-center mt-2 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                            className="block w-4 h-4 border-2 border-charcoal-900 border-t-transparent rounded-full"
                          />
                          Confirming...
                        </span>
                      ) : (
                        <>
                          <Scissors size={15} />
                          Confirm Appointment
                        </>
                      )}
                    </button>
                    <p className="text-charcoal-500 text-xs text-center mt-2">
                      No payment required. We'll call to confirm your slot.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
