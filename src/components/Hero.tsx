import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Home, Euro, Bed, ChevronRight, Search } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import type { HeroSearchCriteria } from '../types/heroSearch';
import HeroSearchDropdown from './ui/HeroSearchDropdown';
import {
  HERO_LOCATION_OPTIONS,
  HERO_PROPERTY_TYPE_OPTIONS,
  HERO_BUDGET_OPTIONS,
  HERO_BEDROOMS_OPTIONS,
} from '../data/heroSearchFieldOptions';

const defaultCriteria: HeroSearchCriteria = {
  location: 'any',
  propertyType: 'any',
  budget: 'any',
  bedrooms: 'any',
};

type HeroProps = {
  onSearch: (criteria: HeroSearchCriteria) => void;
};

type OpenHeroDropdown = 'location' | 'type' | 'budget' | 'bedrooms';

export default function Hero({ onSearch }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [criteria, setCriteria] = useState<HeroSearchCriteria>(defaultCriteria);
  const [openDropdown, setOpenDropdown] = useState<OpenHeroDropdown | null>(null);

  const update = useCallback(<K extends keyof HeroSearchCriteria>(key: K, value: HeroSearchCriteria[K]) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSearch = useCallback(() => {
    setOpenDropdown(null);
    onSearch({ ...criteria });
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [criteria, onSearch]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen min-h-[100dvh] flex-col overflow-x-clip border-b border-brand-bronze-dark/25"
      aria-label="Hero — Elevate Properties Malta"
    >
      {/* ── Parallax background ─────────────────────────────── */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden">
        {/* Villa image */}
        <div
          className="absolute inset-0 w-full h-[115%] bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/new-hero.png'), linear-gradient(135deg,#1a1208 0%,#110F0C 100%)",
            backgroundPosition: 'center 38%',
          }}
          role="img"
          aria-label="Luxury Malta villa exterior at night with illuminated pool"
        />

        {/* Left-side text-readability gradient — lighter so villa stays visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(11,11,13,0.78) 0%, rgba(11,11,13,0.45) 40%, rgba(11,11,13,0.10) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Very subtle top vignette for navbar legibility */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,11,13,0.55) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom fade — only enough for the search bar to sit on */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 sm:h-48 lg:h-44"
          style={{
            background: 'linear-gradient(to top, rgba(11,11,13,0.88) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero text content ────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex min-h-0 w-full flex-1 items-center px-4 pb-4 pt-20 sm:px-8 sm:pb-5 lg:pb-5"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-y-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 lg:col-span-7 lg:max-w-none xl:pr-2"
          >
            <div className="w-full max-w-[580px] md:pl-1 lg:max-w-[520px]">
              <h1 className="mb-2 font-playfair text-[clamp(2.72rem,5.6vw,5rem)] leading-[0.88] tracking-tight text-brand-ivory drop-shadow-2xl sm:mb-2.5">
                ELEVATE YOUR
                <br />
                <span className="text-brand-copper">LIFESTYLE</span>
              </h1>

              <p className="mb-3 max-w-[420px] font-light leading-snug tracking-normal text-brand-sand text-[0.9375rem] md:mb-3.5 md:text-[0.995rem]">
                From first homes to standout residences and investment opportunities — carefully guided across Malta.
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <motion.a
                  href="#properties"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="epm-btn-primary group px-7 py-2.5 sm:px-8 sm:py-3"
                >
                  View Properties
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </motion.a>
              </div>

              <div className="mt-1.5 flex items-center gap-3 sm:mt-2">
                <div className="h-px w-6 bg-gold/50" aria-hidden="true" />
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-brand-metal">Est. 2026</span>
              </div>
            </div>
          </motion.div>

          <aside
            aria-labelledby="hero-quick-access-heading"
            className="hidden lg:block mx-auto w-full max-w-md border border-brand-bronze-dark/45 bg-brand-panel/72 p-5 shadow-[0_12px_40px_rgba(17,15,12,0.55)] ring-1 ring-brand-bronze-dark/20 backdrop-blur-xl sm:p-5 lg:col-span-5 lg:mx-0 lg:max-w-none lg:self-stretch"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.38em] text-brand-champagne">Quick access</p>
            <h2
              id="hero-quick-access-heading"
              className="mb-4 font-playfair text-lg leading-snug text-brand-ivory sm:text-xl"
            >
              Start where it suits you.
            </h2>
            <nav className="flex flex-col gap-1" aria-label="Quick access links">
              <a
                href="#properties"
                className="group flex min-h-[44px] items-center justify-between gap-3 rounded-sm border border-transparent px-3 py-2.5 text-left text-sm font-light text-brand-sand transition-colors hover:border-brand-bronze-dark/40 hover:bg-white/[0.04] hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-champagne touch-manipulation"
              >
                <span>Browse Properties</span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-brand-bronze-dark/60 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-champagne"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#list-property"
                className="group flex min-h-[44px] items-center justify-between gap-3 rounded-sm border border-transparent px-3 py-2.5 text-left text-sm font-light text-brand-sand transition-colors hover:border-brand-bronze-dark/40 hover:bg-white/[0.04] hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-champagne touch-manipulation"
              >
                <span>List Your Property</span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-brand-bronze-dark/60 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-champagne"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#agents"
                className="group flex min-h-[44px] items-center justify-between gap-3 rounded-sm border border-transparent px-3 py-2.5 text-left text-sm font-light text-brand-sand transition-colors hover:border-brand-bronze-dark/40 hover:bg-white/[0.04] hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-champagne touch-manipulation"
              >
                <span>Meet the Advisors</span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-brand-bronze-dark/60 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-champagne"
                  aria-hidden="true"
                />
              </a>
            </nav>
            <p className="mt-4 border-t border-brand-bronze-dark/20 pt-3 text-[11px] font-light leading-relaxed text-brand-metal">
              Choose the route that matches your next step in Malta property.
            </p>
          </aside>
        </div>
      </motion.div>

      {/* ── Search bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-full shrink-0 px-4 pb-5 pt-1 sm:px-8 sm:pb-6 lg:pb-6 lg:pt-0.5"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <div className="rounded-sm border border-brand-bronze-dark/45 bg-brand-panel/78 backdrop-blur-2xl shadow-[0_12px_48px_rgba(17,15,12,0.65)] ring-1 ring-brand-bronze-dark/25 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-copper/50 to-transparent" aria-hidden="true" />

            <div className="flex flex-col lg:flex-row lg:items-stretch divide-y lg:divide-y-0 lg:divide-x divide-brand-bronze-dark/25 min-h-0">
              {/* Location */}
              <div className="flex flex-1 min-w-0 items-stretch gap-3 px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <MapPin className="w-4 h-4 text-brand-copper shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    id="hero-location-label"
                    htmlFor="hero-location"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne/90"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <HeroSearchDropdown
                      fieldId="hero-location"
                      labelledBy="hero-location-label"
                      value={criteria.location}
                      placeholder="Any Location"
                      options={HERO_LOCATION_OPTIONS}
                      isOpen={openDropdown === 'location'}
                      onOpen={() => setOpenDropdown('location')}
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(v) => update('location', v)}
                    />
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex flex-1 min-w-0 items-stretch gap-3 px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <Home className="w-4 h-4 text-brand-copper shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    id="hero-type-label"
                    htmlFor="hero-type"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne/90"
                  >
                    Property Type
                  </label>
                  <div className="relative">
                    <HeroSearchDropdown
                      fieldId="hero-type"
                      labelledBy="hero-type-label"
                      value={criteria.propertyType}
                      placeholder="Any Type"
                      options={HERO_PROPERTY_TYPE_OPTIONS}
                      isOpen={openDropdown === 'type'}
                      onOpen={() => setOpenDropdown('type')}
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(v) => update('propertyType', v)}
                    />
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-1 min-w-0 items-stretch gap-3 px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <Euro className="w-4 h-4 text-brand-copper shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    id="hero-budget-label"
                    htmlFor="hero-budget"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne/90"
                  >
                    Budget
                  </label>
                  <div className="relative">
                    <HeroSearchDropdown
                      fieldId="hero-budget"
                      labelledBy="hero-budget-label"
                      value={criteria.budget}
                      placeholder="Any Budget"
                      options={HERO_BUDGET_OPTIONS}
                      isOpen={openDropdown === 'budget'}
                      onOpen={() => setOpenDropdown('budget')}
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(v) => update('budget', v)}
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-1 min-w-0 items-stretch gap-3 px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <Bed className="w-4 h-4 text-brand-copper shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    id="hero-beds-label"
                    htmlFor="hero-beds"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne/90"
                  >
                    Bedrooms
                  </label>
                  <div className="relative">
                    <HeroSearchDropdown
                      fieldId="hero-beds"
                      labelledBy="hero-beds-label"
                      value={criteria.bedrooms}
                      placeholder="Any Bedrooms"
                      options={HERO_BEDROOMS_OPTIONS}
                      isOpen={openDropdown === 'bedrooms'}
                      onOpen={() => setOpenDropdown('bedrooms')}
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(v) => update('bedrooms', v)}
                    />
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="flex lg:w-[min(100%,11.5rem)] shrink-0 lg:shrink-0">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="epm-btn-primary flex w-full items-center justify-center gap-2.5 min-h-[52px] lg:min-h-0 px-6 py-3.5 text-[11px] sm:text-xs outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne focus-visible:ring-inset touch-manipulation"
                  aria-label="Search featured properties with selected filters"
                >
                  <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
