import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle, ArrowUpRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const ICON_MARK_TRANSPARENT = '/images/elevate-logos/04_icon_mark_quick_lets_transparent.png';

export default function Navbar() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
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

  const navLinks = elevatePreview
    ? [
        { name: 'Explore', href: '#properties' },
        { name: 'List', href: '#list-property' },
        { name: 'Consult', href: '#contact' },
      ]
    : [
        { name: 'Properties', href: '#properties' },
        { name: 'Services', href: '#services' },
        { name: 'List Property', href: '#list-property' },
        { name: 'Advisors', href: '#agents' },
        { name: 'About Us', href: '#about' },
        { name: 'Contact', href: '#contact' },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? `border-b border-white/[0.06] py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-[1.12] ${
              elevatePreview ? 'bg-[#030304]/82 border-[rgba(0,159,227,0.08)]' : 'bg-[#050608]/78'
            }`
          : `border-b border-white/[0.04] py-1.5 backdrop-blur-xl backdrop-saturate-[1.12] ${
              elevatePreview ? 'bg-[#030304]/42 border-[rgba(0,159,227,0.06)]' : 'bg-[#050608]/28'
            }`
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`mx-auto flex max-w-[88rem] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8 ${elevatePreview ? 'xl:px-10' : ''}`}
      >
        <motion.a
          href={anchorHref(pathname, '#hero')}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group flex min-w-0 shrink-0 items-center gap-2 rounded-sm py-0.5 pr-1 outline-none focus-visible:ring-1 focus-visible:ring-brand-copper/70 sm:gap-2.5"
          aria-label="Elevate by Zanzi Properties Malta, home"
        >
          <img
            src={ICON_MARK_TRANSPARENT}
            alt="Elevate Properties Malta icon"
            width={112}
            height={112}
            decoding="async"
            className="h-14 w-14 shrink-0 object-contain"
          />
          {!elevatePreview ? (
            <>
              <span
                className="h-14 w-px shrink-0 self-center bg-gradient-to-b from-[rgba(0,159,227,0.65)] via-[rgba(232,234,238,0.22)] to-[rgba(176,132,228,0.55)]"
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-col justify-center text-[6.5px] font-medium uppercase leading-snug tracking-[0.1em] text-[#eef1f6]/95 sm:text-[7px] sm:tracking-[0.11em] md:text-[7.5px] md:tracking-[0.12em]">
                <p className="whitespace-nowrap">Official franchise</p>
                <p className="mt-0.5 whitespace-nowrap">
                  <span className="text-[#009FE3]">ZANZI</span>
                  <span className="text-[#f4f6f9]"> & </span>
                  <span className="text-[#c9a8f0]">QUICK LETS</span>
                </p>
                <p className="mt-0.5 flex items-center gap-0.5 whitespace-nowrap text-[#d0d6df]">
                  <MapPin className="h-2.5 w-2.5 shrink-0 text-[#009FE3]" aria-hidden="true" />
                  Malta
                </p>
              </div>
            </>
          ) : null}
        </motion.a>

        {/* Desktop Nav */}
        <div
          className={`hidden min-w-0 flex-1 items-center justify-end md:flex ${elevatePreview ? 'gap-4 lg:gap-6' : 'gap-3 lg:gap-5'}`}
        >
          <nav
            className={`flex min-w-0 flex-nowrap items-center justify-end overflow-hidden ${elevatePreview ? 'gap-x-4 lg:gap-x-5' : 'gap-x-2.5 sm:gap-x-3 lg:gap-x-4'}`}
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={anchorHref(pathname, link.href)}
                className={`relative shrink-0 whitespace-nowrap font-sans text-[#c9ced6] transition-colors hover:text-[#f4f4f2] outline-none focus-visible:text-[#f4f4f2] group ${
                  elevatePreview
                    ? 'text-[10px] font-light tracking-[0.05em]'
                    : 'text-[8px] font-normal uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em] lg:text-[9px] lg:tracking-[0.22em]'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[rgba(0,159,227,0.75)] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href={anchorHref(pathname, '#contact')}
            className={`ml-2 inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-sm border px-2.5 py-1.5 transition-all duration-300 sm:ml-3 sm:gap-2 sm:px-3.5 ${
              elevatePreview
                ? 'border-white/[0.1] bg-black/22 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#f4f4f2] backdrop-blur-md hover:border-[rgba(0,159,227,0.38)] hover:bg-black/35 hover:text-white sm:text-[9px]'
                : 'border-white/[0.12] bg-black/26 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#f4f4f2] backdrop-blur-md hover:border-[rgba(0,159,227,0.45)] hover:bg-black/38 sm:text-[9px] sm:tracking-[0.16em]'
            }`}
          >
            Private Consultation
            <ArrowUpRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.09] text-[#f4f4f2] outline-none transition-colors hover:border-white/[0.14] md:hidden focus-visible:ring-1 focus-visible:ring-brand-copper/60 ${
            elevatePreview ? 'bg-[#0a0a0c]' : 'bg-black/25 backdrop-blur-md'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 top-0 z-40 flex flex-col overflow-y-auto border-t border-white/[0.06] bg-[#050608] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:p-10 md:hidden"
          >
            <div className="mb-10 flex items-center justify-between gap-3 sm:mb-16">
              <a
                href={anchorHref(pathname, '#hero')}
                className="flex min-w-0 flex-col items-start touch-manipulation outline-none focus:ring-1 focus:ring-brand-copper"
                aria-label="Elevate by Zanzi home"
                onClick={() => setIsOpen(false)}
              >
                <span className="truncate font-playfair text-xl uppercase tracking-[0.1em] text-brand-ivory sm:text-2xl">Elevate</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brand-silver">
                  by{' '}
                  <span className={elevatePreview ? 'font-semibold text-[#009FE3]/90' : 'text-brand-copper'}>ZANZI</span>
                </span>
                <span className="mt-1 text-[8px] uppercase tracking-[0.26em] text-brand-metal">Properties Malta</span>
                <span className="mt-2 text-[9px] uppercase tracking-[0.24em] text-brand-metal">Official Zanzi Franchise</span>
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="shrink-0 border border-white/[0.08] bg-black/30 p-2.5 text-[#f4f4f2] backdrop-blur-sm outline-none transition-colors hover:border-white/[0.14] focus-visible:ring-1 focus-visible:ring-brand-copper/60 sm:p-3"
                aria-label="Close menu"
              >
                <X className="h-7 w-7 sm:h-8 sm:w-8" />
              </button>
            </div>

            <nav className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={link.name}
                  href={anchorHref(pathname, link.href)}
                  className="font-playfair text-[1.7rem] leading-tight text-brand-ivory outline-none transition-colors hover:text-brand-champagne focus:text-brand-champagne sm:text-[2rem]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-8">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-brand-metal">Concierge Lines</p>
              <div className="mb-6 space-y-5">
                <div>
                  <p className="mb-1 text-[9px] uppercase tracking-widest text-brand-champagne/85">{siteConfig.contacts.primary.name}</p>
                  <a href={siteConfig.contacts.primary.phoneHref} className="block touch-manipulation text-lg font-light text-brand-ivory">
                    {siteConfig.contacts.primary.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-[9px] uppercase tracking-widest text-brand-metal">{siteConfig.contacts.secondary.name}</p>
                  <a
                    href={siteConfig.contacts.secondary.phoneHref}
                    className="block touch-manipulation text-lg font-light text-brand-ivory opacity-95"
                  >
                    {siteConfig.contacts.secondary.phoneDisplay}
                  </a>
                </div>
              </div>
              <a
                href={siteConfig.emailHref}
                className="mb-8 block break-all text-sm font-light text-brand-sand touch-manipulation transition-colors hover:text-brand-champagne sm:text-base"
              >
                {siteConfig.emailDisplay}
              </a>
              <a
                href={siteConfig.primaryWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex w-full touch-manipulation items-center justify-center gap-2 border border-brand-copper/30 bg-brand-copper/10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ivory transition-colors hover:bg-brand-copper/20"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp {siteConfig.contacts.primary.name.split(' ')[0]}
              </a>
              <a
                href={anchorHref(pathname, '#contact')}
                onClick={() => setIsOpen(false)}
                className="epm-btn-primary flex w-full touch-manipulation items-center justify-center py-4 text-[10px] tracking-[0.2em] sm:py-6"
              >
                Speak With an Advisor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
