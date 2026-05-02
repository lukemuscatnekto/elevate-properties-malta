import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Buy', href: '#properties' },
    { name: 'Sell', href: '#list-property' },
    { name: 'Rent', href: '#contact' },
    { name: 'Invest', href: '#contact' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/88 backdrop-blur-xl py-3 border-b border-gold/20 shadow-2xl' : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center gap-3">
        {/* Logo */}
        <motion.a
          href="#hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-start group cursor-pointer outline-none focus:ring-1 focus:ring-gold pl-0 pr-2 min-w-0"
          aria-label="Elevate Properties Home"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.22em] sm:tracking-[0.25em] text-white group-hover:text-gold transition-colors truncate max-w-[62vw] sm:max-w-none">E L E V A T E</span>
          <div className="w-full h-[1px] bg-gold scale-x-75 group-hover:scale-x-100 transition-transform duration-500 mt-1" />
          <span className="text-[9px] tracking-[0.36em] text-gold mt-1 uppercase font-medium">Properties Malta</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          <div className="flex gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[11px] uppercase tracking-[0.14em] font-medium text-white/80 hover:text-gold transition-all relative group outline-none focus:text-gold"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white w-12 h-12 flex items-center justify-center border border-white/10 outline-none focus:ring-1 focus:ring-gold" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 top-0 bg-black z-40 flex flex-col p-10 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col items-start translate-x-[-8px]">
                <span className="text-xl font-serif tracking-[0.2em] text-white">E L E V A T E</span>
                <span className="text-[10px] tracking-[0.3em] text-gold mt-1 uppercase">Properties Malta</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white border border-white/10 p-3 outline-none focus:ring-1 focus:ring-gold"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <nav className="flex flex-col gap-8 mb-12">
              {navLinks.map((link, idx) => (
                <motion.a 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={link.name} 
                  href={link.href}
                  className="text-3xl font-serif text-white hover:text-gold transition-colors outline-none focus:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 font-bold">Contact Concierge</p>
              <div className="space-y-4 mb-10">
                <a href={siteConfig.phoneHref} className="block text-white text-lg font-light touch-manipulation">
                  {siteConfig.phoneDisplay}
                </a>
                <a href={siteConfig.emailHref} className="block text-white text-lg font-light break-all hyphens-auto touch-manipulation">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full bg-gold text-black py-6 flex items-center justify-center font-bold uppercase tracking-[0.2em] text-[10px]"
              >
                Book a Private Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

