import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';

import Navbar from './Navbar';
import ElevateCinematicHero from './ElevateCinematicHero';
import PremiumTrustStrip from './PremiumTrustStrip';
import AudienceIntentPaths from './AudienceIntentPaths';
import FeaturedProperties from './FeaturedProperties';
import ElevatePreviewServiceTriad from './ElevatePreviewServiceTriad';
import ContactForm from './ContactForm';
import ListProperty from './ListProperty';
import MarketBriefingOptIn from './MarketBriefingOptIn';
import Footer from './Footer';
import { ElevatePreviewContext } from '../context/ElevatePreviewContext';

const INTRO_SESSION_KEY = 'elevate-intro-session-complete';
const VIDEO_SRC = '/videos/elevate-intro.mp4';

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

type VideoIntroProps = {
  onFinish: () => void;
};

function SessionVideoIntro({ onFinish }: VideoIntroProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const [canSkip, setCanSkip] = useState(false);
  const [failed, setFailed] = useState(false);

  const finishOnce = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    if (reduceMotion === true) {
      finishOnce();
      return;
    }
    const skipTimer = window.setTimeout(() => setCanSkip(true), 900);
    const maxTimer = window.setTimeout(finishOnce, 7800);
    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(maxTimer);
    };
  }, [reduceMotion, finishOnce]);

  useEffect(() => {
    if (reduceMotion === true || failed) return;
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => setFailed(true));
  }, [reduceMotion, failed]);

  useEffect(() => {
    if (!failed) return;
    const t = window.setTimeout(finishOnce, 2400);
    return () => window.clearTimeout(t);
  }, [failed, finishOnce]);

  if (reduceMotion === true) return null;

  return (
    <motion.section
      className="fixed inset-0 z-[90] overflow-hidden bg-[#030304]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Brand introduction video"
    >
      {!failed ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={finishOnce}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,159,227,0.14),#030304_65%)] px-8 text-center">
          <p className="font-playfair text-3xl uppercase tracking-[0.22em] text-white/92 md:text-5xl">Elevate</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-white/55 md:text-xs">
            by <span className="text-[#009FE3]">ZANZI</span>
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/40">Properties Malta</p>
          <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-white/48">
            Intro unavailable — continuing to the site.
          </p>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/55 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 flex w-[min(92vw,440px)] -translate-x-1/2 flex-col items-center gap-3 px-4 text-center">
        <div className="space-y-1">
          <p className="font-playfair text-lg uppercase tracking-[0.28em] text-white/88 sm:text-xl md:tracking-[0.32em]">Elevate</p>
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/42">
            by <span className="text-[#009FE3]">ZANZI</span> · Properties Malta
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.26em] text-white/38">Luxury real estate · Malta</p>
        {canSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onClick={finishOnce}
            className="mt-1 min-h-[44px] rounded-full border border-white/14 bg-[#0a0a0c]/90 px-7 py-3 text-[10px] font-light tracking-wide text-white/90 transition hover:border-[rgba(0,159,227,0.45)] hover:bg-[#0c0e12]"
          >
            Skip intro
          </motion.button>
        )}
      </div>

      {failed && (
        <button
          type="button"
          onClick={finishOnce}
          className="absolute bottom-28 left-1/2 min-h-[44px] -translate-x-1/2 rounded-full border border-white/16 bg-[#0a0a0c]/90 px-6 text-[10px] font-light tracking-wide text-white/78 transition hover:border-white/25 touch-manipulation"
        >
          Enter site
        </button>
      )}
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

function ElevatePreviewShell() {
  const reduceMotion = useReducedMotion();
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
    <div className="min-h-screen overflow-x-hidden bg-[#030304] font-sans selection:bg-[rgba(0,159,227,0.22)] selection:text-brand-ivory antialiased">
      <AnimatePresence>
        {!introDone ? <SessionVideoIntro key="elevate-intro" onFinish={completeIntro} /> : null}
      </AnimatePresence>

      {!introDone && (
        <button
          type="button"
          onClick={completeIntro}
          className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-[95] flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(0,159,227,0.22)] bg-[#0a0a0c]/92 px-4 py-2 text-[10px] font-light tracking-wide text-white/85 transition hover:border-[rgba(0,159,227,0.45)] hover:bg-[#0c0e12] touch-manipulation"
        >
          <Play className="h-3 w-3 text-[#009FE3]" aria-hidden="true" />
          Enter site
        </button>
      )}

      <Navbar />

      <main className="scroll-smooth space-y-0 [&>section]:scroll-mt-[min(5.75rem,18vw)]">
        <ElevateCinematicHero />
        <PremiumTrustStrip />
        <AudienceIntentPaths
          onSelectIntent={(intent) => {
            setContactIntentSignal({ key: Date.now(), value: intent });
          }}
        />
        <FeaturedProperties heroSearchCriteria={null} />
        <ElevatePreviewServiceTriad />
        <ContactForm contactIntentSignal={contactIntentSignal} />
        <ListProperty />
        <MarketBriefingOptIn />
      </main>

      <Footer />
    </div>
  );
}

/** Cinematic intro-preview homepage — mounted at `/intro-preview`. */
export default function ElevateVideoIntroWebsiteMockup() {
  return (
    <ElevatePreviewContext.Provider value={true}>
      <ElevatePreviewShell />
    </ElevatePreviewContext.Provider>
  );
}
