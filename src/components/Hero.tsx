import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  MapPin,
  Home,
  Euro,
  Bed,
  Search,
  ShieldCheck,
  MapPinned,
  BadgeHelp,
  Handshake,
  PhoneCall,
  ChevronDown,
} from 'lucide-react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { HeroSearchCriteria } from '../types/heroSearch';
import HeroSearchDropdown from './ui/HeroSearchDropdown';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';
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
  /** When true, skips the in-hero logo video overlay (e.g. when a full-page intro plays elsewhere). */
  suppressLogoIntro?: boolean;
};

type OpenHeroDropdown = 'location' | 'type' | 'budget' | 'bedrooms';

const LOGO_VIDEO_SRC = '/videos/elevate-logo-animation.mp4';
/** Logo intro visible duration before fade-out begins */
const INTRO_HOLD_MS = 2800;
const INTRO_FADE_MS = 780;
const HERO_VILLA_IMAGE = '/images/elevate-hero-villa.png';
const HERO_BRAND_BANNER_TRANSPARENT = '/images/elevate-brand-banner-transparent.png';

const FEATURE_TABS = [
  { label: 'Premium Properties', Icon: ShieldCheck },
  { label: 'Prime Locations', Icon: MapPinned },
  { label: 'Investment Guidance', Icon: BadgeHelp },
  { label: 'Trust & Integrity', Icon: Handshake },
  { label: 'Personalised Service', Icon: PhoneCall },
] as const;

export default function Hero({ onSearch, suppressLogoIntro = false }: HeroProps) {
  const ref = useRef(null);
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const reduceMotion = useReducedMotion();
  const skipLogoIntro = reduceMotion === true || suppressLogoIntro;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [criteria, setCriteria] = useState<HeroSearchCriteria>(defaultCriteria);
  const [openDropdown, setOpenDropdown] = useState<OpenHeroDropdown | null>(null);

  /** Full-screen logo reveal overlay — not the in-hero thumbnail */
  const [introLayerMounted, setIntroLayerMounted] = useState(!skipLogoIntro);
  const [introLayerOpaque, setIntroLayerOpaque] = useState(!skipLogoIntro);

  useEffect(() => {
    if (skipLogoIntro) {
      setIntroLayerMounted(false);
      setIntroLayerOpaque(false);
      return;
    }
    const hold = window.setTimeout(() => setIntroLayerOpaque(false), INTRO_HOLD_MS);
    return () => window.clearTimeout(hold);
  }, [skipLogoIntro]);

  useEffect(() => {
    if (skipLogoIntro || !introLayerMounted) return;
    if (introLayerOpaque) return;
    const unmount = window.setTimeout(() => setIntroLayerMounted(false), INTRO_FADE_MS + 40);
    return () => window.clearTimeout(unmount);
  }, [skipLogoIntro, introLayerMounted, introLayerOpaque]);

  const motionEase = [0.22, 1, 0.36, 1] as const;
  const fadeDuration = reduceMotion ? 0 : 1.2;
  const fadeDelay = (ms: number) => (reduceMotion ? 0 : ms);

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
      className={`relative flex min-h-[100dvh] min-h-screen flex-col overflow-x-clip border-b ${
        elevatePreview ? 'border-white/[0.04]' : 'border-white/[0.06]'
      }`}
      aria-label="Hero — Elevate by Zanzi Properties Malta"
    >
      {/* ── Premium logo intro (full viewport, then fades — not inside hero lockup) ── */}
      {introLayerMounted && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#030304] transition-opacity ease-out ${
            introLayerOpaque ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          style={{ transitionDuration: `${INTRO_FADE_MS}ms` }}
          aria-hidden="true"
        >
          <div className="flex w-[min(92vw,520px)] max-w-[520px] min-w-[220px] flex-col items-center px-6 sm:min-w-[280px] md:w-[min(85vw,520px)]">
            <video
              className="h-auto w-full max-h-[min(55vh,380px)] object-contain sm:max-h-[min(52vh,460px)] md:max-h-[min(48vh,520px)]"
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controls={false}
              onError={() => {
                setIntroLayerMounted(false);
                setIntroLayerOpaque(false);
              }}
            >
              <source src={LOGO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ── Villa photography — dominant; scrims keep text readable without hiding scene ── */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_VILLA_IMAGE}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="absolute left-1/2 top-1/2 h-[112%] w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-[center_right] sm:object-[70%_center] lg:object-[74%_center]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,8,0.64)_0%,rgba(4,5,8,0.46)_34%,rgba(4,5,8,0.2)_62%,rgba(4,5,8,0.06)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_72%_at_72%_42%,transparent_0%,rgba(5,6,8,0.18)_58%,rgba(5,6,8,0.4)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-[#050608]/34 via-transparent to-transparent sm:h-[38%]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#050608]/58 via-[#050608]/16 to-transparent sm:h-[32%]"
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className={`relative z-20 flex min-h-0 w-full flex-1 flex-col px-4 sm:px-6 ${
          elevatePreview
            ? 'pt-[clamp(4.35rem,11.5vw,6rem)]'
            : 'pt-[clamp(3.85rem,10vw,5.35rem)]'
        }`}
      >
        {/* Transparent brand banner + trust copy */}
        <div className="relative z-20 mx-auto mt-3 w-full max-w-6xl shrink-0 pb-1.5 sm:mt-6 md:mt-11 md:pb-2.5">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: fadeDuration, ease: motionEase }}
            className="flex w-full justify-center md:justify-start md:pl-1 lg:pl-3"
          >
            <img
              src={HERO_BRAND_BANNER_TRANSPARENT}
              alt="Elevate by Zanzi and Quick Lets Properties Malta"
              width={720}
              height={260}
              decoding="async"
              fetchPriority="high"
              className="h-auto w-auto max-w-[min(96vw,20rem)] object-contain object-left drop-shadow-[0_6px_28px_rgba(0,0,0,0.38)] sm:max-w-[min(92vw,28rem)] md:max-w-[min(80vw,34rem)] lg:max-w-[36rem]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, delay: fadeDelay(0.08), ease: motionEase }}
            className="mx-auto mt-2 max-w-3xl text-center md:mt-2.5"
          >
            <div className="mx-auto flex justify-center opacity-90" aria-hidden="true">
              <span className="h-px w-12 bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.32)] to-transparent sm:w-14" />
            </div>
            <p className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.17em] text-[#e4e9f0]/92 sm:text-[8.5px] sm:tracking-[0.19em] md:text-[9px] md:tracking-[0.2em]">
              CURATED MALTA PROPERTIES • PRIVATE VIEWINGS • DIRECT OWNER OPPORTUNITIES
            </p>
            <div className="mx-auto mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#dce2ea]/95 sm:mt-2 sm:gap-x-3.5 sm:text-[7px] sm:tracking-[0.16em] md:text-[7.5px]">
              <span>Sales & Lettings</span>
              <span
                className="h-px w-6 shrink-0 rounded-full bg-[rgba(176,132,228,0.85)] sm:w-7"
                aria-hidden="true"
              />
              <span>
                Powered by <span className="text-[#009FE3]">ZANZI</span>
                <span className="text-[#eef1f6]"> & </span>
                <span className="text-[#c9a8f0]">QUICK LETS</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Lower hero: advisor row, tabs, search, feature strip */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.22, ease: motionEase }}
          className="relative z-20 mt-auto w-full shrink-0 pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-1.5 sm:pb-[4.5rem] md:pb-[4.35rem]"
        >
          <div className="relative mx-auto w-full max-w-6xl min-w-0 px-0 pb-0.5">
            <div className="mb-1 flex justify-center md:mb-1.5 md:justify-end">
              <a
                href={anchorHref(pathname, '#contact')}
                className="inline-flex min-h-[36px] max-w-[92vw] items-center gap-1.5 rounded-sm border border-[rgba(0,159,227,0.32)] bg-[#07090c]/45 px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-[#eef1f6] backdrop-blur-[10px] transition-colors hover:border-[rgba(0,159,227,0.5)] hover:bg-[#0a0c10]/60 sm:min-h-[38px] sm:px-3 sm:text-[9px] sm:tracking-[0.14em] md:max-w-none"
              >
                <PhoneCall className="h-3 w-3 shrink-0 text-[#009FE3] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                Speak to an Advisor
              </a>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-stretch overflow-hidden rounded-sm border border-white/[0.1] bg-[#07090c]/42 text-[8px] uppercase tracking-[0.14em] text-[#d6dbe3] shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-[10px] sm:text-[9px] sm:tracking-[0.16em]">
                <button type="button" className="relative min-h-[32px] px-3 font-medium text-[#f2f4f8] sm:min-h-[34px] sm:px-4">
                  Buy Properties
                  <span className="absolute inset-x-2 bottom-0 h-px bg-[rgba(0,159,227,0.72)]" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="min-h-[32px] border-l border-white/[0.08] px-3 font-medium transition-colors hover:bg-white/[0.04] sm:min-h-[34px] sm:px-4"
                >
                  Quick Lets
                </button>
                <span className="flex min-h-[32px] items-center border-l border-white/[0.08] bg-[#0f1a2a]/65 px-2 text-[6.5px] tracking-[0.12em] text-[#6ea9df] sm:min-h-[34px] sm:px-2.5 sm:text-[7px] sm:tracking-[0.14em]">
                  Lettings Focus
                </span>
              </div>
            </div>

            <div className="epm-hero-search-dock mt-1.5 w-full overflow-hidden !shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_32px_rgba(0,0,0,0.38)] sm:mt-2">
              <div
                className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.22)] to-transparent"
                aria-hidden="true"
              />

              <div className="flex flex-col divide-y divide-white/[0.045] lg:flex-row lg:items-stretch lg:divide-x lg:divide-y-0 lg:min-h-[2.625rem]">
                {/* Location */}
                <div className="flex min-h-0 flex-1 min-w-0 items-stretch gap-1.5 px-2.5 py-1.5 transition-colors hover:bg-white/[0.02] sm:gap-2 sm:px-3 sm:py-2">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-brand-copper/90 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label
                      id="hero-location-label"
                      htmlFor="hero-location"
                      className="mb-0.5 block text-[7px] font-bold uppercase tracking-[0.16em] text-[#d9d9d9]/95 sm:mb-1 sm:text-[8px] sm:tracking-[0.18em]"
                    >
                      Area or Location
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
                <div className="flex min-h-0 flex-1 min-w-0 items-stretch gap-1.5 px-2.5 py-1.5 transition-colors hover:bg-white/[0.02] sm:gap-2 sm:px-3 sm:py-2">
                  <Home className="mt-0.5 h-3 w-3 shrink-0 text-brand-copper/90 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label
                      id="hero-type-label"
                      htmlFor="hero-type"
                      className="mb-0.5 block text-[7px] font-bold uppercase tracking-[0.16em] text-[#d9d9d9]/95 sm:mb-1 sm:text-[8px] sm:tracking-[0.18em]"
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
                <div className="flex min-h-0 flex-1 min-w-0 items-stretch gap-1.5 px-2.5 py-1.5 transition-colors hover:bg-white/[0.02] sm:gap-2 sm:px-3 sm:py-2">
                  <Euro className="mt-0.5 h-3 w-3 shrink-0 text-brand-copper/90 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label
                      id="hero-budget-label"
                      htmlFor="hero-budget"
                      className="mb-0.5 block text-[7px] font-bold uppercase tracking-[0.16em] text-[#d9d9d9]/95 sm:mb-1 sm:text-[8px] sm:tracking-[0.18em]"
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
                <div className="flex min-h-0 flex-1 min-w-0 items-stretch gap-1.5 px-2.5 py-1.5 transition-colors hover:bg-white/[0.02] sm:gap-2 sm:px-3 sm:py-2">
                  <Bed className="mt-0.5 h-3 w-3 shrink-0 text-brand-copper/90 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label
                      id="hero-beds-label"
                      htmlFor="hero-beds"
                      className="mb-0.5 block text-[7px] font-bold uppercase tracking-[0.16em] text-[#d9d9d9]/95 sm:mb-1 sm:text-[8px] sm:tracking-[0.18em]"
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
                <div className="flex shrink-0 lg:w-[min(100%,10.5rem)] lg:shrink-0">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="flex min-h-[44px] w-full items-center justify-center gap-1.5 border border-[rgba(0,159,227,0.4)] bg-[#07090c]/48 px-3 py-2 font-sans text-[8px] font-semibold uppercase tracking-[0.14em] text-[#f4f4f2] backdrop-blur-[10px] transition-all duration-300 hover:border-[rgba(0,159,227,0.62)] hover:shadow-[0_0_18px_rgba(0,159,227,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/50 focus-visible:ring-inset touch-manipulation sm:min-h-[46px] sm:text-[9px] sm:tracking-[0.16em] lg:min-h-full lg:py-1.5"
                    aria-label="Search featured properties with selected filters"
                  >
                    <Search className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    Search Properties
                  </button>
                </div>
              </div>
            </div>

            <div className="no-scrollbar mt-1.5 overflow-x-auto border border-white/[0.07] bg-[#07090c]/28 backdrop-blur-[6px] sm:mt-2">
              <div className="flex min-w-full divide-x divide-white/[0.07] lg:min-w-0">
                {FEATURE_TABS.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href={anchorHref(pathname, '#services')}
                    className="group relative flex min-h-[40px] min-w-[42%] flex-1 items-center justify-center gap-1.5 px-2 py-2 text-center transition-colors hover:bg-white/[0.03] sm:min-h-[42px] sm:min-w-0 sm:gap-2 sm:px-2.5"
                  >
                    <Icon className="h-3 w-3 shrink-0 text-[#c5cad2] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    <span className="text-[7.5px] font-medium uppercase leading-tight tracking-[0.1em] text-[#dbe0e7] sm:text-[8px] sm:tracking-[0.12em]">
                      {label}
                    </span>
                    <span
                      className="absolute inset-x-3 bottom-0 h-px bg-[rgba(0,159,227,0.28)] transition-colors group-hover:bg-[rgba(0,159,227,0.55)]"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <a
          href={anchorHref(pathname, '#properties')}
          className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-[9px] uppercase tracking-[0.22em] text-[#bcc4ce] transition-colors hover:text-[#e8ebef] sm:bottom-5 sm:text-[10px] sm:tracking-[0.24em]"
        >
          Explore
          <ChevronDown className="h-3 w-3 text-[#009FE3] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
