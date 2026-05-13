import { Building2, Key, Search, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

export type AudienceIntentValue = 'buying' | 'renting' | 'selling' | 'owner-direct';

type PathDef = {
  intent: AudienceIntentValue;
  title: string;
  subline: string;
  Icon: typeof Search;
};

const PATHS: PathDef[] = [
  {
    intent: 'buying',
    title: 'I want to buy',
    subline: 'Browse curated properties and arrange a private viewing.',
    Icon: Search,
  },
  {
    intent: 'renting',
    title: 'I want to rent',
    subline: "Explore premium lettings across Malta's finest addresses.",
    Icon: Key,
  },
  {
    intent: 'selling',
    title: 'I want to sell',
    subline: 'Request a confidential valuation and market advisory.',
    Icon: Tag,
  },
  {
    intent: 'owner-direct',
    title: 'I own a property',
    subline: 'List directly. Full market exposure. No intermediaries.',
    Icon: Building2,
  },
];

type AudienceIntentPathsProps = {
  onSelectIntent: (intent: AudienceIntentValue) => void;
};

export default function AudienceIntentPaths({ onSelectIntent }: AudienceIntentPathsProps) {
  const elevatePreview = useElevatePreviewMode();

  const handleSelect = (intent: AudienceIntentValue) => {
    onSelectIntent(intent);
    if (typeof document === 'undefined') return;
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.requestAnimationFrame(() => {
      document.getElementById('cf-type')?.focus();
    });
  };

  return (
    <section
      id="audience-intent"
      className={`scroll-anchor-target relative overflow-hidden border-t px-4 sm:px-6 lg:px-8 ${
        elevatePreview ? 'border-white/[0.05] bg-[#07090d] py-14 sm:py-16' : 'border-white/[0.05] bg-[#07090d] py-14 sm:py-16'
      }`}
      aria-labelledby="audience-intent-heading"
    >
      {!elevatePreview ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_42%_at_50%_0%,rgba(0,159,227,0.04),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/95 via-[#07090d]/92 to-[#07090d]/97" aria-hidden="true" />
        </>
      ) : null}
      {!elevatePreview ? <div className="epm-accent-line relative z-10" aria-hidden="true" /> : null}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl md:mb-12">
          {!elevatePreview ? (
            <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.18em] text-[#9ea6b0] sm:text-xs sm:tracking-[0.2em]">
              Start here
            </p>
          ) : null}
          <h2
            id="audience-intent-heading"
            className="mb-3 font-playfair text-[1.65rem] font-normal leading-[1.12] tracking-[0.02em] text-[#f4f4f2] sm:text-3xl md:text-[2.15rem]"
          >
            How can we help you?
          </h2>
          <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-[#aeb4bf] sm:text-[15px]">
            Tell us what you are looking for and we will guide you from there.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {PATHS.map(({ intent, title, subline, Icon }, i) => (
            <motion.div
              key={intent}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-32px' }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => handleSelect(intent)}
                className={`group flex h-full w-full flex-col text-left outline-none transition-[border-color,box-shadow,transform] duration-300 ease-out touch-manipulation focus-visible:ring-2 focus-visible:ring-[rgba(0,159,227,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090d] ${
                  elevatePreview
                    ? 'min-h-[140px] rounded-sm border border-white/[0.07] bg-[#080a10]/90 p-5 hover:-translate-y-0.5 hover:border-[rgba(0,159,227,0.28)]'
                    : 'min-h-[148px] rounded-sm border border-white/[0.08] bg-[#080a10]/95 p-5 sm:p-6 hover:-translate-y-0.5 hover:border-[rgba(0,159,227,0.32)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)]'
                }`}
              >
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,159,227,0.22)] bg-[rgba(0,159,227,0.06)] text-[#009FE3] transition-colors duration-300 group-hover:border-[rgba(0,159,227,0.38)] group-hover:bg-[rgba(0,159,227,0.1)]"
                  aria-hidden="true"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="font-playfair text-lg leading-snug tracking-[0.02em] text-[#f4f4f2] sm:text-xl">{title}</span>
                <span className="mt-2 font-sans text-[13px] font-light leading-relaxed text-[#8e96a3] sm:text-sm">{subline}</span>
                <span className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#009FE3] transition-colors group-hover:text-[#e8eaee]">
                  Continue to enquiry
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
