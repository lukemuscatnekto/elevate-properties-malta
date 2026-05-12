import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const ICON_MARK_TRANSPARENT = '/images/elevate-logos/04_icon_mark_quick_lets_transparent.png';
const DRAWER_EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_NAV_DRAWER_ID = 'mobile-nav-drawer';

export default function Navbar() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Body scroll lock while the mobile drawer is open. Preserves any prior overflow value. */
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /** Escape key closes the drawer (and only attaches while open). */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

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
          transition={{ duration: 0.7, ease: DRAWER_EASE }}
          className="group flex min-w-0 shrink-0 items-center gap-2 rounded-sm py-0.5 pr-1 outline-none focus-visible:ring-1 focus-visible:ring-brand-copper/70 sm:gap-2.5"
          aria-label="Elevate Properties Malta, home"
        >
          <img
            src={ICON_MARK_TRANSPARENT}
            alt="Elevate Properties Malta icon"
            width={112}
            height={112}
            decoding="async"
            className="h-9 w-9 shrink-0 object-contain md:h-14 md:w-14"
          />

          {/* Mobile-only compact brand stack: ELEVATE / by ZANZI & QUICK LETS */}
          <span className="flex min-w-0 flex-col leading-none md:hidden">
            <span className="font-playfair text-[0.95rem] uppercase tracking-[0.16em] text-[#f4f4f2]">
              Elevate
            </span>
            <span className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.18em] text-[#aab2bf]">
              by <span className="text-[#009FE3]">ZANZI</span>
              <span className="text-[#cfd5de]"> &amp; </span>
              <span className="text-[#c9a8f0]">QUICK LETS</span>
            </span>
          </span>

          {/* Desktop divider + 3-line lockup (preserved exactly) */}
          {!elevatePreview ? (
            <>
              <span
                className="hidden h-14 w-px shrink-0 self-center bg-gradient-to-b from-[rgba(0,159,227,0.65)] via-[rgba(232,234,238,0.22)] to-[rgba(176,132,228,0.55)] md:inline-block"
                aria-hidden="true"
              />
              <div className="hidden min-w-0 flex-col justify-center text-[7px] font-medium uppercase leading-snug tracking-[0.11em] text-[#eef1f6]/95 md:flex md:text-[7.5px] md:tracking-[0.12em]">
                <p className="whitespace-nowrap">Official franchise</p>
                <p className="mt-0.5 whitespace-nowrap">
                  <span className="text-[#009FE3]">ZANZI</span>
                  <span className="text-[#f4f6f9]"> &amp; </span>
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

        {/* Desktop Nav (visually identical to before) */}
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

        {/* Mobile Toggle — single refined hamburger */}
        <button
          type="button"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border text-[#dbe1ea] outline-none transition-colors hover:text-[#f4f4f2] md:hidden focus-visible:ring-1 focus-visible:ring-brand-copper/60 ${
            elevatePreview
              ? 'border-white/[0.08] bg-[#0a0a0c]/80 hover:border-[rgba(0,159,227,0.4)]'
              : 'border-white/[0.08] bg-[#0a0c10]/55 backdrop-blur-md hover:border-[rgba(0,159,227,0.4)]'
          }`}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls={MOBILE_NAV_DRAWER_ID}
          aria-label="Open menu"
        >
          <Menu className="h-[1.15rem] w-[1.15rem] text-[#009FE3]" strokeWidth={1.4} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: DRAWER_EASE }}
              onClick={closeDrawer}
              className="fixed inset-0 z-[59] bg-[#03050a]/95 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="mobile-nav-drawer"
              id={MOBILE_NAV_DRAWER_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: DRAWER_EASE }}
              className="fixed inset-y-0 right-0 z-[60] flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#050608] text-[#e8eaee] md:hidden"
            >
              {/* Subtle matte glow — low-alpha radial blue + purple, no heavy blur */}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_50%_at_82%_14%,rgba(0,159,227,0.10),transparent_62%),radial-gradient(ellipse_60%_42%_at_18%_92%,rgba(176,132,228,0.07),transparent_64%)]"
                aria-hidden="true"
              />
              {/* Top + bottom hairlines */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" aria-hidden="true" />

              {/* Drawer header: icon + brand stack + close */}
              <div className="relative flex items-center justify-between gap-3 px-5 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:px-7">
                <a
                  href={anchorHref(pathname, '#hero')}
                  onClick={closeDrawer}
                  className="flex min-w-0 items-center gap-2 rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-brand-copper/60"
                  aria-label="Elevate Properties Malta home"
                >
                  <img
                    src={ICON_MARK_TRANSPARENT}
                    alt=""
                    width={80}
                    height={80}
                    decoding="async"
                    className="h-9 w-9 shrink-0 object-contain"
                  />
                  <span className="flex min-w-0 flex-col leading-none">
                    <span className="font-playfair text-[0.95rem] uppercase tracking-[0.16em] text-[#f4f4f2]">
                      Elevate
                    </span>
                    <span className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.18em] text-[#aab2bf]">
                      by <span className="text-[#009FE3]">ZANZI</span>
                      <span className="text-[#cfd5de]"> &amp; </span>
                      <span className="text-[#c9a8f0]">QUICK LETS</span>
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/[0.08] bg-[#0a0c10]/55 text-[#dbe1ea] outline-none transition-colors hover:border-[rgba(0,159,227,0.4)] hover:text-[#f4f4f2] focus-visible:ring-1 focus-visible:ring-brand-copper/60"
                  aria-label="Close menu"
                >
                  <X className="h-[1.15rem] w-[1.15rem] text-[#009FE3]" strokeWidth={1.4} aria-hidden="true" />
                </button>
              </div>

              {/* Menu links — Playfair, generous, separator hairlines */}
              <nav aria-label="Mobile primary" className="relative mt-2 flex flex-col px-5 sm:px-7">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={anchorHref(pathname, link.href)}
                    onClick={closeDrawer}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.045, duration: 0.42, ease: DRAWER_EASE }}
                    className="group flex min-h-[52px] items-center justify-between border-b border-white/[0.05] py-3 font-playfair text-[1.6rem] leading-tight text-[#f4f4f2] outline-none transition-colors hover:text-[#009FE3] focus-visible:text-[#009FE3] sm:text-[1.85rem]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-[#5d6675] transition-colors group-hover:text-[#009FE3] group-focus-visible:text-[#009FE3]"
                      aria-hidden="true"
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTAs + franchise footer */}
              <div className="relative mt-auto flex flex-col gap-2.5 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-7">
                <a
                  href={anchorHref(pathname, '#contact')}
                  onClick={closeDrawer}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm border border-[rgba(0,159,227,0.35)] bg-[#07090c]/60 px-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4f4f2] outline-none transition-colors hover:border-[rgba(0,159,227,0.55)] hover:bg-[#0a0d12]/70 focus-visible:ring-1 focus-visible:ring-brand-copper/60"
                >
                  Private Consultation
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#009FE3]" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.contacts.primary.phoneHref}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm border border-white/[0.08] bg-[#0a0d12]/55 px-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#eef1f6] outline-none transition-colors hover:border-[rgba(0,159,227,0.32)] hover:bg-[#0c1018]/65 focus-visible:ring-1 focus-visible:ring-brand-copper/60"
                >
                  <Phone className="h-3.5 w-3.5 text-[#009FE3]" aria-hidden="true" />
                  Speak to an Advisor
                </a>
                <a
                  href={siteConfig.primaryWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-[40px] w-full items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.22em] text-[#aab2bf] outline-none transition-colors hover:text-[#e8eaee] focus-visible:text-[#e8eaee]"
                >
                  <MessageCircle className="h-3 w-3 text-[#009FE3]/80" aria-hidden="true" />
                  WhatsApp {siteConfig.contacts.primary.name.split(' ')[0]}
                </a>
                <p className="mt-4 border-t border-white/[0.06] pt-4 text-center text-[8px] font-medium uppercase tracking-[0.22em] text-[#8e96a3]">
                  Official Franchise · <span className="text-[#009FE3]">ZANZI</span>
                  <span className="text-[#aab2bf]"> &amp; </span>
                  <span className="text-[#c9a8f0]">QUICK LETS</span>
                  <span className="text-[#8e96a3]"> · Malta</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
