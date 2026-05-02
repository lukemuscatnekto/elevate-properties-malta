import { motion } from 'motion/react';
import { Landmark, Eye, Briefcase, LineChart } from 'lucide-react';

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
    body: 'Viewings are arranged personally, quietly, and with advance context on the residence and locality so your time on site is purposeful — including after-hours appointments when sensible.',
  },
  {
    Icon: Briefcase,
    title: 'Discreet seller representation',
    body: 'For exceptional homes we favour controlled exposure: qualified introductions, orderly access, and materials that honour the property rather than volume listing noise.',
  },
  {
    Icon: LineChart,
    title: 'Investment support',
    body: 'For portfolio buyers we align shortlists with occupancy, tenancy, refurbishment, or long-hold angles — always subject to independent legal and tax counsel you appoint.',
  },
];

export default function TrustAndProcess() {
  return (
    <section
      id="trust"
      className="scroll-anchor-target py-8 px-4 sm:px-8 bg-[#060606] border-t border-gold/20"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-playfair text-white mb-3">
          How we work with you
        </h2>
        <p className="text-sm text-white/45 font-light leading-relaxed max-w-2xl mb-8">
          Explore featured residences, inspect details in-depth, lodge a discreet viewing enquiry when you&apos;re comfortable, escalate to concierge search if you wish, then briefing us formally when instructing an off-market valuation or sale mandate.
          Add verified accolades or regulatory references manually when legally issued.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-[#0D0D0D] border border-gold/15 p-5 md:p-6 min-w-0"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-gold/20 flex items-center justify-center shrink-0" aria-hidden="true">
                  <item.Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-playfair text-white mb-2">{item.title}</h3>
                  <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center min-h-[48px] px-8 border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-gold hover:text-black transition-colors touch-manipulation"
          >
            Speak with an advisor
          </a>
        </p>
      </div>
    </section>
  );
}
