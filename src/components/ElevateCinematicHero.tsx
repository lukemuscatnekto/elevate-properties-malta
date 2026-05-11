import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

/**
 * Preview hero image URL. Vite serves files from `public/` at the site root, so the file on disk must be:
 *   public/images/elevate-hero-villa.png
 * which is requested as `/images/elevate-hero-villa.png` (this exact path).
 */
export const ELEVATE_PREVIEW_HERO_IMAGE = '/images/elevate-hero-villa.png';

export default function ElevateCinematicHero() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030304]"
      aria-label="Elevate Properties Malta — hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_right] bg-no-repeat"
        style={{ backgroundImage: `url(${ELEVATE_PREVIEW_HERO_IMAGE})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,5,0.5)_0%,rgba(3,3,5,0.35)_40%,rgba(3,3,5,0.82)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_45%,transparent_0%,rgba(0,0,0,0.45)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,159,227,0.07)_0%,transparent_22%,transparent_78%,rgba(0,159,227,0.07)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-16 pt-[clamp(6.5rem,18vw,9rem)] text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1, ease }}
          className="mb-8 flex items-stretch gap-5 md:gap-8"
        >
          <span className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[rgba(0,159,227,0.65)] to-transparent shadow-[0_0_24px_rgba(0,159,227,0.35)] sm:block sm:min-h-[7rem]" aria-hidden="true" />
          <div className="flex flex-col items-center">
            <h1 className="font-playfair text-[clamp(2.75rem,11vw,5.25rem)] font-light uppercase leading-none tracking-[0.14em] text-[#f8f8f6] drop-shadow-[0_8px_48px_rgba(0,0,0,0.55)] md:tracking-[0.18em]">
              Elevate
            </h1>
            <p className="mt-4 font-sans text-[clamp(0.65rem,2.2vw,0.75rem)] font-normal tracking-[0.2em] text-[#c5cbd4]">
              by <span className="font-semibold text-[#009FE3]">ZANZI</span>
            </p>
            <p className="mt-3 font-sans text-[11px] font-light tracking-[0.12em] text-[#8f97a3] md:text-[12px]">
              Properties Malta
            </p>
          </div>
          <span className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[rgba(0,159,227,0.65)] to-transparent shadow-[0_0_24px_rgba(0,159,227,0.35)] sm:block sm:min-h-[7rem]" aria-hidden="true" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.9, ease }}
          className="max-w-lg font-playfair text-[1rem] italic leading-relaxed tracking-[0.04em] text-[#eceeeb]/95 md:text-[1.15rem]"
        >
          Elevating Living. Defining Excellence.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.9, ease }}
          className="mt-5 max-w-xl text-[13px] font-light leading-relaxed text-[#b9c0ca] md:text-[14px]"
        >
          Premium property advisory across Malta.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.52, duration: 0.9, ease }}
          className="mt-3 max-w-lg text-[12px] font-light leading-relaxed text-[#9ea6b0] md:text-[13px]"
        >
          Curated homes, direct-owner opportunities, and private buyer guidance.
          <span className="mt-2 block text-[12px] font-light leading-relaxed tracking-normal text-[#9aa3b0]">
            For serious buyers, sellers, and investors.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.85, ease }}
          className="mt-12 flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5"
        >
          <a
            href={anchorHref(pathname, '#properties')}
            className="group inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-sm border border-white/[0.12] bg-[#f4f5f7] px-10 text-[11px] font-medium tracking-[0.18em] text-[#0a0a0c] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,159,227,0.14)] transition-colors duration-300 hover:bg-white hover:shadow-[0_0_0_1px_rgba(0,159,227,0.2),0_10px_40px_rgba(0,159,227,0.18)] touch-manipulation sm:min-w-[240px] sm:flex-none"
          >
            Explore Properties
            <ChevronRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={anchorHref(pathname, '#contact')}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-sm border border-white/[0.14] bg-[#070809]/55 px-10 text-[11px] font-medium uppercase tracking-[0.2em] text-[#e8eaee] transition-colors duration-300 hover:border-[rgba(0,159,227,0.32)] hover:bg-[#0a0b0d]/85 touch-manipulation sm:min-w-[240px] sm:flex-none"
          >
            Private Consultation
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35" aria-hidden="true">
        <span className="h-8 w-px bg-gradient-to-b from-[rgba(0,159,227,0.5)] to-transparent" />
      </div>
    </section>
  );
}
