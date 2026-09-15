import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Services from './pages/Services';
import Deals from './pages/Deals';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      {/* Global Booking Modal */}
      <BookingModal />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <AppLayout />
      </BookingProvider>
    </BrowserRouter>
  );
}
