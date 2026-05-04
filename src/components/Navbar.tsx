import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';

export default function Navbar() {
  const { pathname } = useLocation();
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
    { name: 'Advisors', href: '#agents' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-brand-espresso/92 backdrop-blur-xl py-3 border-b border-brand-bronze-dark/30 shadow-2xl' : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center gap-3">
        {/* Logo */}
        <motion.a
          href={anchorHref(pathname, '#hero')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-start group cursor-pointer outline-none focus:ring-1 focus:ring-gold pl-0 pr-2 min-w-0"
          aria-label="Elevate Properties Home"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.22em] sm:tracking-[0.25em] text-brand-ivory group-hover:text-brand-champagne transition-colors truncate max-w-[62vw] sm:max-w-none">E L E V A T E</span>
          <div className="w-full h-[1px] bg-brand-copper scale-x-75 group-hover:scale-x-100 transition-transform duration-500 mt-1" />
          <span className="text-[9px] tracking-[0.36em] text-brand-champagne mt-1 uppercase font-medium">Properties Malta</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          <div className="flex gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={anchorHref(pathname, link.href)}
                className="text-[11px] uppercase tracking-[0.14em] font-medium text-brand-sand hover:text-brand-champagne transition-all relative group outline-none focus:text-brand-champagne"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-copper transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-ivory w-12 h-12 flex items-center justify-center border border-brand-bronze-dark/35 outline-none focus:ring-1 focus:ring-gold" 
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
            className="fixed inset-0 top-0 bg-brand-espresso z-40 flex flex-col p-10 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <a
                href={anchorHref(pathname, '#hero')}
                className="flex flex-col items-start translate-x-[-8px] outline-none focus:ring-1 focus:ring-gold touch-manipulation"
                aria-label="Elevate Properties Home"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl font-serif tracking-[0.2em] text-brand-ivory">E L E V A T E</span>
                <span className="text-[10px] tracking-[0.3em] text-brand-champagne mt-1 uppercase">Properties Malta</span>
              </a>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-brand-ivory border border-brand-bronze-dark/35 p-3 outline-none focus:ring-1 focus:ring-gold"
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
                  href={anchorHref(pathname, link.href)}
                  className="text-3xl font-serif text-brand-ivory hover:text-brand-champagne transition-colors outline-none focus:text-brand-champagne"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-brand-bronze-dark/20">
              <p className="text-[10px] text-brand-metal uppercase tracking-widest mb-6 font-bold">Concierge Lines</p>
              <div className="space-y-5 mb-6">
                <div>
                  <p className="text-[9px] text-brand-champagne/85 uppercase tracking-widest mb-1">{siteConfig.contacts.primary.name}</p>
                  <a href={siteConfig.contacts.primary.phoneHref} className="block text-brand-ivory text-lg font-light touch-manipulation">
                    {siteConfig.contacts.primary.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-[9px] text-brand-metal uppercase tracking-widest mb-1">{siteConfig.contacts.secondary.name}</p>
                  <a href={siteConfig.contacts.secondary.phoneHref} className="block text-brand-ivory text-lg font-light touch-manipulation opacity-95">
                    {siteConfig.contacts.secondary.phoneDisplay}
                  </a>
                </div>
              </div>
              <a href={siteConfig.emailHref} className="block text-brand-sand text-base font-light mb-8 break-all touch-manipulation hover:text-brand-champagne transition-colors">
                {siteConfig.emailDisplay}
              </a>
              <a
                href={siteConfig.primaryWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-6 border border-brand-bronze-dark/40 bg-brand-panel/40 text-brand-champagne py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] touch-manipulation hover:bg-gold hover:text-charcoal transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp {siteConfig.contacts.primary.name.split(' ')[0]}
              </a>
              <a
                href={anchorHref(pathname, '#contact')}
                onClick={() => setIsOpen(false)}
                className="w-full epm-btn-primary py-6 flex items-center justify-center tracking-[0.2em] text-[10px] touch-manipulation"
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

