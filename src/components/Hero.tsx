import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Home, Euro, Users, ChevronRight, Search } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden border-b border-gold/20"
      aria-label="Hero — Elevate Properties Malta"
    >
      {/* ── Parallax background ─────────────────────────────── */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Villa image */}
        <div
          className="absolute inset-0 w-full h-[115%] bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/new-hero.png'), linear-gradient(135deg,#1a1208 0%,#0B0B0D 100%)",
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
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: 'linear-gradient(to top, rgba(11,11,13,0.85) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero text content ────────────────────────────────── */}
      <motion.div style={{ opacity }} className="relative z-20 flex-1 flex items-center w-full pt-24 pb-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[580px] md:pl-1 min-w-0 w-full"
          >
            {/* Eyebrow */}
            <h1 className="font-playfair text-white leading-[0.88] tracking-tight drop-shadow-2xl mb-4 text-[clamp(3.1rem,6.5vw,5.7rem)]">
              ELEVATE YOUR
              <br />
              <span className="text-gold">MALTA LIFESTYLE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/82 text-base md:text-[1.04rem] max-w-[390px] mb-6 font-light leading-snug tracking-normal">
              Luxury villas, penthouses, and investment properties in Malta.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#properties"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gold text-black px-8 py-3 font-bold uppercase tracking-[0.18em] text-[11px] transition-all hover:bg-white hover:shadow-[0_0_40px_rgba(197,160,82,0.35)] group outline-none focus:ring-2 focus:ring-gold"
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
              <span className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-medium">
                Est. 2026
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Horizontal search bar ────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative z-20 w-full px-4 sm:px-8 pb-0" style={{ opacity }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0b0b0d]/92 backdrop-blur-xl border border-gold/35 rounded-[4px] shadow-[0_8px_40px_rgba(0,0,0,0.6)] -mb-10">
            {/* Gold top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />

            <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 divide-white/5 lg:divide-x lg:divide-gold/20 min-h-[66px]">
              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 group hover:bg-white/3 transition-colors">
                <MapPin className="w-4 h-4 text-gold/70 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="hero-location"
                    className="block text-[8px] text-gold/80 uppercase tracking-[0.18em] font-bold mb-1"
                  >
                    Location
                  </label>
                  <select
                    id="hero-location"
                    className="w-full bg-transparent text-white text-[11px] outline-none appearance-none cursor-pointer truncate"
                  >
                    <option className="bg-[#0B0B0D]">Any Location</option>
                    <option className="bg-[#0B0B0D]">Madliena</option>
                    <option className="bg-[#0B0B0D]">Sliema</option>
                    <option className="bg-[#0B0B0D]">St. Julian&apos;s</option>
                    <option className="bg-[#0B0B0D]">Valletta</option>
                    <option className="bg-[#0B0B0D]">Mellieħa</option>
                    <option className="bg-[#0B0B0D]">Rabat</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-3 px-4 py-3 group hover:bg-white/3 transition-colors">
                <Home className="w-4 h-4 text-gold/70 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="hero-type"
                    className="block text-[8px] text-gold/80 uppercase tracking-[0.18em] font-bold mb-1"
                  >
                    Property Type
                  </label>
                  <select
                    id="hero-type"
                    className="w-full bg-transparent text-white text-[11px] outline-none appearance-none cursor-pointer truncate"
                  >
                    <option className="bg-[#0B0B0D]">Any Type</option>
                    <option className="bg-[#0B0B0D]">Villa</option>
                    <option className="bg-[#0B0B0D]">Penthouse</option>
                    <option className="bg-[#0B0B0D]">Apartment</option>
                    <option className="bg-[#0B0B0D]">House of Character</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3 px-4 py-3 group hover:bg-white/3 transition-colors">
                <Euro className="w-4 h-4 text-gold/70 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="hero-budget"
                    className="block text-[8px] text-gold/80 uppercase tracking-[0.18em] font-bold mb-1"
                  >
                    Budget
                  </label>
                  <select
                    id="hero-budget"
                    className="w-full bg-transparent text-white text-[11px] outline-none appearance-none cursor-pointer truncate"
                  >
                    <option className="bg-[#0B0B0D]">Any Budget</option>
                    <option className="bg-[#0B0B0D]">Under €3M</option>
                    <option className="bg-[#0B0B0D]">€3M – €5M</option>
                    <option className="bg-[#0B0B0D]">Over €5M</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex items-center gap-3 px-4 py-3 group hover:bg-white/3 transition-colors">
                <Users className="w-4 h-4 text-gold/70 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="hero-beds"
                    className="block text-[8px] text-gold/80 uppercase tracking-[0.18em] font-bold mb-1"
                  >
                    Bedrooms
                  </label>
                  <select
                    id="hero-beds"
                    className="w-full bg-transparent text-white text-[11px] outline-none appearance-none cursor-pointer truncate"
                  >
                    <option className="bg-[#0B0B0D]">Any Bedrooms</option>
                    <option className="bg-[#0B0B0D]">2+ Beds</option>
                    <option className="bg-[#0B0B0D]">3+ Beds</option>
                    <option className="bg-[#0B0B0D]">4+ Beds</option>
                    <option className="bg-[#0B0B0D]">5+ Beds</option>
                  </select>
                </div>
              </div>

              {/* Search button — spans full width on mobile */}
              <div className="col-span-2 lg:col-span-1">
                <a
                  href="#properties"
                  className="flex items-center justify-center gap-2 w-full h-full bg-gold hover:bg-white text-black font-bold uppercase tracking-[0.22em] text-[11px] transition-all py-3 lg:py-0 outline-none focus:ring-2 focus:ring-white group"
                  aria-label="Search properties"
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
    </section>
  );
}
