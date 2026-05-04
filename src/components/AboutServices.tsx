import { motion } from 'motion/react';
import { Key, Tag, Home, TrendingUp, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

const services = [
  {
    title: 'Buy',
    desc: 'Access to Malta’s standout homes — from first-time milestones to trophy residences — curated with discretion and clear market context.',
    Icon: Key,
    href: '#properties',
  },
  {
    title: 'Sell',
    desc: 'Discreet, bespoke representation that connects your property with qualified buyers — without volume-market noise.',
    Icon: Tag,
    href: '#list-property',
  },
  {
    title: 'Rent',
    desc: 'Long-term residences and tenancy-ready homes, presented with the same care we bring to sales mandates.',
    Icon: Home,
    href: '#contact',
  },
  {
    title: 'Invest',
    desc: 'Portfolio-level guidance on yield, hold periods, and diversification — always alongside the legal and tax advisers you appoint.',
    Icon: TrendingUp,
    href: '#contact',
  },
];

export default function AboutServices() {
  const { pathname } = useLocation();

  return (
    <section id="about" className="scroll-anchor-target bg-brand-brown-dark relative border-t border-brand-bronze-dark/25" aria-labelledby="about-heading">

      {/* ── About block ── */}
      <div className="py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

          {/* Editorial copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <p className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-copper/60 inline-block" aria-hidden="true" />
              Who We Are
            </p>
            <h2 id="about-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory leading-tight mb-5">
              About Elevate Properties Malta
            </h2>

            <div className="space-y-4 max-w-lg text-brand-sand font-light text-sm leading-relaxed mb-8">
              <p>
                Elevate Properties Malta was founded on a single conviction: that the island&rsquo;s most compelling homes deserve
                representation that is equally considered.
              </p>
              <p>
                We are a boutique agency, not a volume house — every client benefits from direct senior attention, thoughtful positioning, and a
                measured approach to introductions, viewings, and negotiation.
              </p>
              <p className="text-brand-metal text-[13px] sm:text-sm">
                From first homes to standout residences, our focus is calibrated advice and discreet execution — whether you are transacting locally
                or briefing us from overseas.
              </p>
            </div>

            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex items-center gap-2 min-h-[44px] mt-auto text-brand-champagne text-[10px] font-bold uppercase tracking-[0.25em] touch-manipulation hover:text-brand-copper transition-colors"
            >
              Book a confidential consultation <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Trust panel — editorial, no photography */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
            aria-labelledby="about-trust-kicker"
            className="border border-brand-bronze-dark/30 bg-brand-taupe p-6 sm:p-8 flex flex-col h-full"
          >
            <p id="about-trust-kicker" className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.34em] mb-4">
              Why clients choose Elevate
            </p>
            <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory leading-snug mb-6 max-w-md">
              Private guidance. Market clarity. Carefully handled representation.
            </h3>
            <ul className="space-y-4 flex-1">
              {[
                'Director-led contact from the first conversation.',
                'Measured guidance across buying, selling, renting, and investment.',
                'Quiet execution with viewings and introductions handled discreetly.',
                'A Malta-wide perspective with attention to micro-location and long-term value.',
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[12px] sm:text-sm text-brand-sand font-light leading-relaxed border-b border-brand-bronze-dark/15 pb-4 last:border-0 last:pb-0"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-brand-copper/45" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-6 border-t border-brand-bronze-dark/20 text-[11px] sm:text-xs text-brand-metal font-light leading-relaxed">
              Where needed, we coordinate introductions to trusted notaries, specialists, and professional partners you appoint.
            </p>
          </motion.aside>
        </div>
      </div>

      {/* ── Services block ── */}
      <div id="services" className="scroll-anchor-target py-10 px-4 sm:px-8 border-t border-brand-bronze-dark/25 bg-brand-charcoal/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-playfair text-brand-ivory mb-2">Our Services</h3>
            <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed">
              Four ways we support you — each path leads to the same discreet, director-led service.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((svc, i) => (
              <motion.a
                key={svc.title}
                href={anchorHref(pathname, svc.href)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-brand-panel border border-brand-bronze-dark/25 hover:border-brand-copper/50 min-w-0 p-4 sm:p-5 flex flex-col min-h-[158px] sm:min-h-[168px] lg:min-h-0 transition-all duration-500 outline-none focus:ring-1 focus:ring-gold touch-manipulation"
              >
                <div className="w-9 h-9 rounded-full border border-brand-bronze-dark/30 flex items-center justify-center mb-3 group-hover:border-brand-copper/55 group-hover:bg-brand-bronze-dark/15 transition-all duration-500">
                  <svc.Icon className="w-4 h-4 text-brand-copper" aria-hidden="true" />
                </div>

                <h4 className="text-base sm:text-lg font-playfair text-brand-ivory mb-2 group-hover:text-brand-champagne transition-colors duration-400">{svc.title}</h4>
                <p className="text-brand-metal text-[10px] sm:text-[11px] font-light leading-relaxed flex-1 line-clamp-5 sm:line-clamp-4">{svc.desc}</p>

                <div className="mt-5 flex items-center gap-2 text-[10px] text-brand-bronze-dark/80 uppercase tracking-widest font-bold group-hover:gap-4 transition-all duration-400" aria-hidden="true">
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
