import { motion } from 'motion/react';
import { Landmark, Eye, Briefcase, LineChart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

/** Factual commitments only — no quotes, numerical claims, awards, or credentials. */

const pillars = [
  {
    Icon: Landmark,
    title: 'Malta market orientation',
    body: 'Prime and emerging addresses across Malta and Gozo, local transaction norms, and what to budget beyond the headline price — framed for your timeline, whether you live on-island or abroad.',
  },
  {
    Icon: Eye,
    title: 'Private viewings',
    body: 'Viewings are arranged personally and quietly, with useful context on the residence and locality so your time on site feels purposeful — including after-hours appointments when that makes sense.',
  },
  {
    Icon: Briefcase,
    title: 'Discreet seller representation',
    body: 'For exceptional homes we favour controlled exposure: qualified introductions, orderly access, and materials that honour the property rather than volume-market noise.',
  },
  {
    Icon: LineChart,
    title: 'Investment support',
    body: 'For portfolio buyers we align shortlists with occupancy, tenancy, refurbishment, or long-hold angles — always subject to independent legal and tax counsel you appoint.',
  },
];

export default function TrustAndProcess() {
  const { pathname } = useLocation();

  return (
    <section
      id="trust"
      className="scroll-anchor-target py-8 px-4 sm:px-8 bg-brand-charcoal border-t border-brand-bronze-dark/25"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory mb-3">
          How we work with you
        </h2>
        <p className="text-sm text-brand-sand font-light leading-relaxed max-w-2xl mb-8">
          Explore featured residences, review details at your own pace, and lodge a discreet viewing enquiry when you are ready. If you need a
          broader search, ask — then brief us formally when you wish to instruct an off-market valuation or sale mandate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-brand-panel border border-brand-bronze-dark/25 p-5 md:p-6 min-w-0"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-brand-bronze-dark/35 flex items-center justify-center shrink-0" aria-hidden="true">
                  <item.Icon className="w-5 h-5 text-brand-copper" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-playfair text-brand-ivory mb-2">{item.title}</h3>
                  <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center">
          <a
            href={anchorHref(pathname, '#contact')}
            className="inline-flex items-center justify-center min-h-[48px] px-8 border border-brand-bronze-dark/45 bg-brand-taupe/40 text-brand-champagne text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-brand-muted hover:border-brand-copper/50 hover:text-brand-ivory transition-colors touch-manipulation"
          >
            Speak with an adviser
          </a>
        </p>
      </div>
    </section>
  );
}
