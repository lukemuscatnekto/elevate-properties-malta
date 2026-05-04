import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import ListProperty from './components/ListProperty';
import AboutServices from './components/AboutServices';
import TrustAndProcess from './components/TrustAndProcess';
import Agents from './components/Agents';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { AnimatePresence } from 'motion/react';
import type { HeroSearchCriteria } from './types/heroSearch';

export default function App() {
  const [heroSearchCriteria, setHeroSearchCriteria] = useState<HeroSearchCriteria | null>(null);

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal scroll-smooth overflow-x-hidden font-sans">
        <Navbar />

        <main className="space-y-0">
          <Hero onSearch={setHeroSearchCriteria} />
          <FeaturedProperties heroSearchCriteria={heroSearchCriteria} />
          <AboutServices />
          <TrustAndProcess />
          <Agents />
          <ContactForm />
          <ListProperty />
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
}
