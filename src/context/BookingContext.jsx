import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // Booking modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  // "Build Your Own Package" cart state
  const [cart, setCart] = useState([]);

  const openModal = (service = '') => {
    setPrefilledService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPrefilledService('');
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) return prev; // prevent duplicates
      return [...prev, item];
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        prefilledService,
        openModal,
        closeModal,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
