import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, ShoppingBag, Trash2, Scissors } from 'lucide-react';
import { serviceCategories, filterTabs } from '../data/services';
import { useBooking } from '../context/BookingContext';

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [openCategory, setOpenCategory] = useState(null);
  const { openModal, cart, addToCart, removeFromCart, clearCart, cartTotal } = useBooking();

  const filtered = activeFilter === 'All'
    ? serviceCategories
    : serviceCategories.filter((c) => c.filter === activeFilter);

  const inCart = (name) => cart.some((i) => i.name === name);

  return (
    <main className="min-h-screen bg-charcoal-950 pt-8">
      {/* Page header */}
      <section className="py-16 bg-charcoal-900/60 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">Our Menu</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-3">
            Services & <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-charcoal-400 max-w-lg">
            Explore our full range of premium grooming services. Add individual services to build your own custom package.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8 flex-col lg:flex-row">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                id={`filter-${tab.toLowerCase()}`}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 text-sm font-medium transition-all ${
                  activeFilter === tab
                    ? 'bg-gold-500 text-charcoal-950'
                    : 'border border-charcoal-700 text-charcoal-400 hover:border-gold-500/50 hover:text-gold-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion categories */}
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border border-charcoal-800 hover:border-gold-500/20 transition-colors"
                >
                  {/* Category header — using div+role to avoid button-in-button nesting */}
                  <div
                    id={`category-${cat.id}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                    onKeyDown={(e) => e.key === 'Enter' && setOpenCategory(openCategory === cat.id ? null : cat.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-2xl font-black text-gold-500/30 group-hover:text-gold-500/60 transition-colors">
                        {cat.number}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-charcoal-500 text-xs">{cat.items.length} services</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        id={`book-category-${cat.id}`}
                        onClick={(e) => { e.stopPropagation(); openModal(cat.title); }}
                        className="hidden sm:flex items-center gap-1.5 text-xs text-gold-400 border border-gold-500/30 px-3 py-1.5 hover:bg-gold-500/10 transition-colors"
                      >
                        <Scissors size={11} />
                        Book This
                      </button>
                      <ChevronDown
                        size={18}
                        className={`text-charcoal-400 transition-transform duration-300 ${openCategory === cat.id ? 'rotate-180 text-gold-400' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Accordion body */}
                  <AnimatePresence>
                    {openCategory === cat.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-charcoal-800"
                      >
                        <div className="px-6 py-4 space-y-1">
                          {cat.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between py-2.5 border-b border-charcoal-800/50 last:border-0 group/item"
                            >
                              <span className="text-charcoal-300 text-sm group-hover/item:text-white transition-colors">
                                {item.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-gold-400 font-semibold text-sm">
                                  Rs. {item.price.toLocaleString()}
                                </span>
                                <button
                                  id={`add-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                                  onClick={() => inCart(item.name) ? removeFromCart(item.name) : addToCart(item)}
                                  className={`w-7 h-7 flex items-center justify-center border transition-all ${
                                    inCart(item.name)
                                      ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                                      : 'border-charcoal-700 text-charcoal-400 hover:border-gold-500/50 hover:text-gold-400'
                                  }`}
                                  title={inCart(item.name) ? 'Remove from package' : 'Add to package'}
                                >
                                  {inCart(item.name) ? <Minus size={12} /> : <Plus size={12} />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* "Build Your Package" side panel */}
        <div className="lg:w-72 shrink-0">
          <div className="sticky top-24">
            <div className="border border-gold-500/20 bg-charcoal-900/50">
              <div className="px-5 py-4 border-b border-gold-500/10 flex items-center gap-2">
                <ShoppingBag size={16} className="text-gold-500" />
                <h3 className="font-display text-base font-bold text-white">Build Your Package</h3>
                {cart.length > 0 && (
                  <span className="ml-auto w-5 h-5 bg-gold-500 text-charcoal-950 text-xs font-bold flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="px-5 py-8 text-center text-charcoal-500 text-sm">
                  <ShoppingBag size={28} className="mx-auto mb-3 text-charcoal-700" />
                  <p>Tap the <span className="text-gold-500">+</span> button on any service to add it here.</p>
                </div>
              ) : (
                <div className="px-5 py-4">
                  <ul className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <li key={item.name} className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-300 flex-1 pr-2 truncate">{item.name}</span>
                        <span className="text-gold-400 shrink-0">Rs. {item.price.toLocaleString()}</span>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="ml-2 text-charcoal-600 hover:text-red-400 transition-colors shrink-0"
                        >
                          <Minus size={13} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gold-500/10 pt-3 mb-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-charcoal-300 text-sm">Total</span>
                      <span className="text-gold-400">Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    id="package-book-btn"
                    onClick={() => openModal(`Custom Package (${cart.length} services)`)}
                    className="btn-gold w-full justify-center text-xs py-3 mb-2"
                  >
                    <Scissors size={13} />
                    Book This Package
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full flex items-center justify-center gap-1 text-charcoal-500 text-xs hover:text-red-400 transition-colors py-1"
                  >
                    <Trash2 size={12} /> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
