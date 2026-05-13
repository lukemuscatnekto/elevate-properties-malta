import { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import ListProperty from './components/ListProperty';
import AboutServices from './components/AboutServices';
import TrustAndProcess from './components/TrustAndProcess';
import Agents from './components/Agents';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PremiumTrustStrip from './components/PremiumTrustStrip';
import AudienceIntentPaths from './components/AudienceIntentPaths';
import ConsultationBand from './components/ConsultationBand';
import MarketBriefingOptIn from './components/MarketBriefingOptIn';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { HeroSearchCriteria } from './types/heroSearch';

const INTRO_SESSION_KEY = 'elevate-intro-session-complete';
const INTRO_ICON_MARK = '/images/elevate-logos/04_icon_mark_quick_lets_transparent.png';

function readIntroComplete(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function writeIntroComplete(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    /* private mode / quota */
  }
}

type IntroProps = {
  onFinish: () => void;
};

const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

function SessionIntro({ onFinish }: IntroProps) {
  const reduceMotion = useReducedMotion();
  const finishedRef = useRef(false);
  const [canSkip, setCanSkip] = useState(false);

  const finishOnce = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    if (reduceMotion === true) {
      const shortHold = window.setTimeout(finishOnce, 240);
      return () => window.clearTimeout(shortHold);
    }
    const skipTimer = window.setTimeout(() => setCanSkip(true), 900);
    const autoTimer = window.setTimeout(finishOnce, 2300);
    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(autoTimer);
    };
  }, [reduceMotion, finishOnce]);

  const revealDur = reduceMotion ? 0.001 : 0.6;
  const delay = (ms: number) => (reduceMotion ? 0 : ms);

  return (
    <motion.section
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#050608]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.001 : 0.4, ease: INTRO_EASE }}
      aria-label="Elevate Properties Malta brand introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_44%_at_50%_44%,rgba(0,159,227,0.16),transparent_62%),radial-gradient(ellipse_56%_42%_at_50%_62%,rgba(176,132,228,0.07),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,6,8,0.55)_88%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.img
          src={INTRO_ICON_MARK}
          alt=""
          width={120}
          height={120}
          decoding="async"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: revealDur, delay: delay(0.05), ease: INTRO_EASE }}
          className="mb-7 h-[84px] w-[84px] object-contain drop-shadow-[0_4px_24px_rgba(0,159,227,0.18)] sm:mb-8 sm:h-[100px] sm:w-[100px]"
        />
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: revealDur, delay: delay(0.22), ease: INTRO_EASE }}
          className="font-playfair text-[2rem] leading-none tracking-[0.18em] text-[#f4f4f2] sm:text-[2.5rem] sm:tracking-[0.2em] md:text-[2.85rem]"
        >
          ELEVATE
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: revealDur, delay: delay(0.38), ease: INTRO_EASE }}
          className="mt-4 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-[#dce2ea] sm:text-[11px] sm:tracking-[0.32em]"
        >
          by <span className="text-[#009FE3]">ZANZI</span>
          <span className="text-[#eef1f6]"> &amp; </span>
          <span className="text-[#c9a8f0]">QUICK LETS</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: revealDur, delay: delay(0.52), ease: INTRO_EASE }}
          className="mt-2 text-[9px] uppercase tracking-[0.28em] text-[#9ea6b0] sm:text-[10px] sm:tracking-[0.3em]"
        >
          Properties Malta
        </motion.p>
      </div>

      {canSkip && !reduceMotion ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: INTRO_EASE }}
          onClick={finishOnce}
          className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 inline-flex min-h-[40px] -translate-x-1/2 touch-manipulation items-center justify-center rounded-sm border border-white/[0.1] bg-[#0a0a0c]/85 px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#e8eaee] backdrop-blur-md transition-colors hover:border-[rgba(0,159,227,0.4)] hover:bg-[#0c0e14]/90"
          aria-label="Skip introduction and enter site"
        >
          Enter site
        </motion.button>
      ) : null}
    </motion.section>
  );
}

function initialIntroDone(): boolean {
  if (readIntroComplete()) return true;
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    writeIntroComplete();
    return true;
  }
  return false;
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [heroSearchCriteria, setHeroSearchCriteria] = useState<HeroSearchCriteria | null>(null);
  const [introDone, setIntroDone] = useState(initialIntroDone);
  const [contactIntentSignal, setContactIntentSignal] = useState<{ key: number; value: string } | null>(null);

  useEffect(() => {
    if (reduceMotion === true) {
      writeIntroComplete();
      setIntroDone(true);
    }
  }, [reduceMotion]);

  const completeIntro = useCallback(() => {
    writeIntroComplete();
    setIntroDone(true);
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-[#070809] selection:bg-[rgba(0,159,227,0.28)] selection:text-brand-ivory scroll-smooth overflow-x-hidden font-sans">
        <AnimatePresence>
          {!introDone ? <SessionIntro key="elevate-home-intro" onFinish={completeIntro} /> : null}
        </AnimatePresence>

        <Navbar />

        <main className="space-y-0">
          <Hero onSearch={setHeroSearchCriteria} suppressLogoIntro />
          <PremiumTrustStrip />
          <AudienceIntentPaths
            onSelectIntent={(intent) => {
              setContactIntentSignal({ key: Date.now(), value: intent });
            }}
          />
          <FeaturedProperties heroSearchCriteria={heroSearchCriteria} />
          <AboutServices />
          <TrustAndProcess />
          <ListProperty />
          <ContactForm contactIntentSignal={contactIntentSignal} />
          <Agents />
          <ConsultationBand />
          <MarketBriefingOptIn />
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
}
