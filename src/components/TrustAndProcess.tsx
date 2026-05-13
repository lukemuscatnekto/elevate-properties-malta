import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const trustPoints = [
  {
    title: 'Official ZANZI franchise',
    body: 'Trusted local recognition paired with a premium advisory experience.',
  },
  {
    title: 'Private buyer and seller advisory',
    body: 'Tailored guidance with discreet communication at every stage.',
  },
  {
    title: 'Premium listing presentation',
    body: 'Media and storytelling are shaped to attract serious enquiries.',
  },
  {
    title: 'Confidential seller valuations',
    body: 'Practical valuation guidance for owners planning their route to market.',
  },
  {
    title: 'Supported by wider property-network reach',
    body: 'Additional confidence through trusted local network support.',
  },
];

const previewProcessSteps = [
  { title: 'Private briefing', body: 'Goals, constraints, and posture — mapped before any stock is proposed.' },
  { title: 'Curated sourcing', body: 'Featured, off-market, and owner-direct layers validated against your mandate.' },
  { title: 'Negotiation architecture', body: 'Offers framed around leverage, timing, and completion realism.' },
  { title: 'Completion stewardship', body: 'Structured liaison toward notarial commitment — fewer friction surprises.' },
] as const;

const defaultProcessSteps = [
  { title: 'Consultation', body: 'Understanding your goals and lifestyle.' },
  { title: 'Curated Search', body: 'Access to selected and private opportunities.' },
  { title: 'Expert Guidance', body: 'Strategic advice and negotiation support.' },
  { title: 'Seamless Acquisition', body: 'Support from first viewing to completion.' },
] as const;

export default function TrustAndProcess() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const processSteps = elevatePreview ? previewProcessSteps : defaultProcessSteps;

  return (
    <section
      id="trust"
      className={`scroll-anchor-target relative border-t border-white/[0.05] bg-[#07090d] px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'border-[rgba(0,159,227,0.07)] py-14 sm:py-[4.5rem]' : 'py-14 sm:py-16'}`}
      aria-labelledby="trust-heading"
    >
      <div className="epm-accent-line absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">Our advisory approach</p>
        <h2 id="trust-heading" className="mb-3 max-w-xl font-playfair text-2xl leading-[1.15] text-[#f4f4f2] md:text-3xl">
          A journey, tailored to you.
        </h2>
        <p className="mb-10 max-w-2xl font-sans text-sm font-light leading-relaxed text-[#b4bcc8] sm:mb-12 sm:text-[15px]">
          {elevatePreview
            ? 'Structured advisory: valuation sanity checks, discreet introductions, and disciplined negotiation.'
            : 'Strategic support from first consultation through to confident completion.'}
        </p>

        <ul className="mb-10 list-none border-y border-white/[0.06] p-0 sm:mb-12">
          {trustPoints.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex gap-4 border-b border-white/[0.05] px-5 py-5 last:border-b-0 sm:gap-6 sm:px-6 sm:py-6"
            >
              <span className="w-7 shrink-0 pt-0.5 font-sans text-[11px] font-medium tabular-nums text-[#009FE3] sm:text-xs">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="font-playfair text-base leading-snug text-[#f4f4f2] sm:text-lg">{item.title}</h3>
                <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#aeb4bf] sm:text-sm">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div
          className={`border border-white/[0.06] bg-[#080a10]/90 px-5 py-7 sm:px-8 sm:py-9 ${elevatePreview ? 'rounded-sm border-[rgba(0,159,227,0.1)]' : 'rounded-sm'}`}
        >
          <p className="mb-5 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">
            {elevatePreview ? 'Our process' : 'Process'}
          </p>
          <ol className="grid grid-cols-1 divide-y divide-white/[0.05] md:grid-cols-4 md:divide-x md:divide-y-0 md:divide-white/[0.05]">
            {processSteps.map((step, idx) => (
              <li key={step.title} className="px-4 py-5 md:px-5 md:py-4">
                <span className="mb-2 block font-sans text-[10px] font-medium tabular-nums tracking-[0.12em] text-[#009FE3]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="font-playfair text-sm leading-snug text-[#f4f4f2] sm:text-base">{step.title}</h4>
                <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#aeb4bf] sm:text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-center sm:mt-12">
          <a
            href={anchorHref(pathname, '#contact')}
            className={`inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center px-6 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors sm:w-auto sm:px-8 sm:tracking-[0.22em] ${
              elevatePreview
                ? 'border border-[rgba(0,159,227,0.35)] bg-[rgba(0,159,227,0.06)] text-[#f4f4f2] hover:border-[rgba(0,159,227,0.48)] hover:bg-[rgba(0,159,227,0.1)]'
                : 'border border-white/[0.12] bg-[#0a0c10]/85 text-[#f4f4f2] hover:border-[rgba(0,159,227,0.45)] hover:bg-[#0c0e12]'
            }`}
          >
            {elevatePreview ? 'Book private consultation' : 'Speak with an adviser'}
          </a>
        </p>
      </div>
    </section>
  );
}
