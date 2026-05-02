import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import ListProperty from './components/ListProperty';
import AboutServices from './components/AboutServices';
import TrustAndProcess from './components/TrustAndProcess';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <AnimatePresence>
      <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black scroll-smooth overflow-x-hidden font-sans">
        <Navbar />

        <main className="space-y-0">
          <Hero />
          <FeaturedProperties />
          <AboutServices />
          <TrustAndProcess />
          <ContactForm />
          <ListProperty />
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
}
