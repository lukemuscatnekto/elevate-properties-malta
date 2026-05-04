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
      className="relative min-h-screen min-h-[100dvh] flex flex-col overflow-x-hidden border-b border-brand-bronze-dark/25"
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
          className="absolute inset-x-0 bottom-0 h-48 sm:h-56"
          style={{
            background: 'linear-gradient(to top, rgba(11,11,13,0.88) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero text content ────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex-1 flex items-center w-full pt-24 pb-6 sm:pb-8 px-4 sm:px-8 min-h-0"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[580px] md:pl-1 min-w-0 w-full"
          >
            {/* Eyebrow */}
            <h1 className="font-playfair text-brand-ivory leading-[0.88] tracking-tight drop-shadow-2xl mb-4 text-[clamp(3.1rem,6.5vw,5.7rem)]">
              ELEVATE YOUR
              <br />
              <span className="text-brand-copper">LIFESTYLE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-brand-sand text-base md:text-[1.04rem] max-w-[420px] mb-6 font-light leading-snug tracking-normal">
              From first homes to standout residences and investment opportunities — carefully guided across Malta.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#properties"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="epm-btn-primary px-8 py-3 group"
              >
                View Properties
                <ChevronRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </motion.a>
            </div>

            {/* Est. badge */}
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-px bg-gold/50" aria-hidden="true" />
              <span className="text-brand-metal text-[10px] uppercase tracking-[0.4em] font-medium">
                Est. 2026
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Search bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 w-full max-w-full px-4 sm:px-8 pb-8 sm:pb-10 pt-2 shrink-0"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <div className="overflow-x-hidden overflow-y-visible rounded-sm border border-brand-bronze-dark/45 bg-brand-panel/78 backdrop-blur-2xl shadow-[0_12px_48px_rgba(17,15,12,0.65)] ring-1 ring-brand-bronze-dark/25">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-copper/50 to-transparent" aria-hidden="true" />

            <div className="flex flex-col lg:flex-row lg:items-stretch divide-y lg:divide-y-0 lg:divide-x divide-brand-bronze-dark/25 min-h-0">
              {/* Location */}
              <div className="flex flex-1 min-w-0 items-stretch px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <HeroSearchDropdown
                  label="Location"
                  value={criteria.location}
                  placeholder="Any Location"
                  options={HERO_LOCATION_OPTIONS}
                  icon={<MapPin className="h-4 w-4" aria-hidden />}
                  isOpen={openDropdown === 'location'}
                  onOpen={() => setOpenDropdown('location')}
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(v) => update('location', v)}
                />
              </div>

              {/* Property Type */}
              <div className="flex flex-1 min-w-0 items-stretch px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <HeroSearchDropdown
                  label="Property Type"
                  value={criteria.propertyType}
                  placeholder="Any Type"
                  options={HERO_PROPERTY_TYPE_OPTIONS}
                  icon={<Home className="h-4 w-4" aria-hidden />}
                  isOpen={openDropdown === 'type'}
                  onOpen={() => setOpenDropdown('type')}
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(v) => update('propertyType', v)}
                />
              </div>

              {/* Budget */}
              <div className="flex flex-1 min-w-0 items-stretch px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <HeroSearchDropdown
                  label="Budget"
                  value={criteria.budget}
                  placeholder="Any Budget"
                  options={HERO_BUDGET_OPTIONS}
                  icon={<Euro className="h-4 w-4" aria-hidden />}
                  isOpen={openDropdown === 'budget'}
                  onOpen={() => setOpenDropdown('budget')}
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(v) => update('budget', v)}
                />
              </div>

              {/* Bedrooms */}
              <div className="flex flex-1 min-w-0 items-stretch px-4 sm:px-5 py-3.5 sm:py-4 transition-colors hover:bg-white/[0.04]">
                <HeroSearchDropdown
                  label="Bedrooms"
                  value={criteria.bedrooms}
                  placeholder="Any Bedrooms"
                  options={HERO_BEDROOMS_OPTIONS}
                  icon={<Bed className="h-4 w-4" aria-hidden />}
                  isOpen={openDropdown === 'bedrooms'}
                  onOpen={() => setOpenDropdown('bedrooms')}
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(v) => update('bedrooms', v)}
                />
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
