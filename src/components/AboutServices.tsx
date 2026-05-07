import { motion } from 'motion/react';
import { Key, Tag, Home, TrendingUp, ArrowRight, ShieldCheck, Gem, Camera, Building2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

const serviceCards = [
  {
    title: 'Buy Property in Malta',
    desc: 'Access curated villas, penthouses, apartments, and private opportunities matched to your goals and timing.',
    Icon: Key,
    href: '#properties',
  },
  {
    title: 'Sell With Confidence',
    desc: 'Position your property with premium presentation, qualified buyer handling, and trusted advisory from valuation to negotiation.',
    Icon: Tag,
    href: '#list-property',
  },
  {
    title: 'Confidential Valuations',
    desc: 'Receive discreet pricing guidance shaped by current Malta demand, property positioning, and route-to-market strategy.',
    Icon: ShieldCheck,
    href: '#contact',
  },
  {
    title: 'Luxury Property Marketing',
    desc: 'Showcase your asset through high-end media, controlled exposure, and polished storytelling aligned to serious buyers.',
    Icon: Camera,
    href: '#list-property',
  },
  {
    title: 'Investment Advisory',
    desc: 'Evaluate opportunities with practical guidance on holding strategy, positioning, and acquisition decision support.',
    Icon: TrendingUp,
    href: '#contact',
  },
  {
    title: 'Rent & Letting Guidance',
    desc: 'Supported by wider rental-market awareness and trusted network reach, we help clients approach Malta rentals and lettings with clearer guidance.',
    Icon: Home,
    href: '#contact',
  },
  {
    title: 'Direct-Owner Opportunities',
    desc: 'Access conversations and opportunities surfaced through direct-owner acquisition and relationship-driven sourcing.',
    Icon: Building2,
    href: '#properties',
  },
  {
    title: 'Private Viewings',
    desc: 'Arrange discreet viewing schedules with clear preparation and follow-up that respects owners, buyers, and timing.',
    Icon: Gem,
    href: '#contact',
  },
];

export default function AboutServices() {
  const { pathname } = useLocation();

  return (
    <section id="about" className="scroll-anchor-target bg-brand-brown-dark relative border-t border-brand-bronze-dark/25" aria-labelledby="about-heading">

      {/* ── About block ── */}
      <div className="py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 max-w-3xl">
            <p className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-copper/60 inline-block" aria-hidden="true" />
              Official positioning
            </p>
            <h2 id="about-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory leading-tight mb-2">
              Elevate Leads. Zanzi and Quicklets Back the Network.
            </h2>
            <p className="text-brand-sand text-sm font-light leading-relaxed max-w-2xl">
              Elevate by Zanzi brings together premium digital execution, trusted franchise credibility, and broader Malta property-network
              strength. The result is a more modern, more visible, and more trusted way to move through the Malta property market.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            <motion.article
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true }}
              className="border border-brand-copper/35 bg-brand-panel p-6 sm:p-7 shadow-[0_16px_40px_rgba(20,15,11,0.45)]"
            >
              <p className="text-[10px] text-brand-champagne uppercase tracking-[0.28em] font-bold mb-2">Elevate</p>
              <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory mb-3">Premium Presentation</h3>
              <p className="text-brand-sand text-sm font-light leading-relaxed mb-4">
                Elevate delivers a modern luxury property experience through digital-first execution, private advisory, and premium representation.
              </p>
              <ul className="space-y-2.5 text-[12px] sm:text-sm text-brand-sand">
                {[
                  'Luxury property positioning',
                  'Premium website experience',
                  'Private advisory process',
                  'Modern digital marketing',
                  'Direct-owner acquisition mindset',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-5 shrink-0 bg-brand-copper/55" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true }}
              className="border border-brand-bronze-dark/30 bg-brand-taupe p-6 sm:p-7"
            >
              <p className="text-[10px] text-brand-champagne uppercase tracking-[0.28em] font-bold mb-2">Zanzi</p>
              <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory mb-3">Franchise Credibility</h3>
              <p className="text-brand-sand text-sm font-light leading-relaxed mb-4">
                Zanzi adds established real-estate recognition, local market knowledge, and trusted franchise credibility across Malta.
              </p>
              <ul className="space-y-2.5 text-[12px] sm:text-sm text-brand-sand">
                {[
                  'Recognised Malta real-estate presence',
                  'Local market experience',
                  'Buyer and seller trust',
                  'Strong property network',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-5 shrink-0 bg-brand-copper/55" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true }}
              className="border border-brand-bronze-dark/30 bg-brand-taupe/80 p-6 sm:p-7"
            >
              <p className="text-[10px] text-brand-champagne uppercase tracking-[0.28em] font-bold mb-2">Quicklets</p>
              <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory mb-3">Lettings &amp; Network Reach</h3>
              <p className="text-brand-sand text-sm font-light leading-relaxed mb-4">
                Quicklets contributes trusted lettings awareness and wider network support for rental and investment pathways in Malta.
              </p>
              <ul className="space-y-2.5 text-[12px] sm:text-sm text-brand-sand">
                {[
                  'Lettings market awareness',
                  'Rental and investment support',
                  'Wider property network trust',
                  'Malta tenant and landlord familiarity',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-5 shrink-0 bg-brand-copper/55" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          <p className="mt-6 text-brand-metal text-sm font-light leading-relaxed max-w-3xl">
            Together, Elevate by Zanzi offers a more trusted, modern, and personal way to buy, sell, and invest in Malta property.
          </p>
          <p className="mt-6">
            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 border border-brand-bronze-dark/45 bg-brand-taupe/40 text-brand-champagne text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-brand-muted hover:border-brand-copper/50 hover:text-brand-ivory transition-colors touch-manipulation"
            >
              Book a Private Consultation <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>

      {/* ── Services block ── */}
      <div id="services" className="scroll-anchor-target py-10 px-4 sm:px-8 border-t border-brand-bronze-dark/25 bg-brand-charcoal/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-playfair text-brand-ivory mb-2">Services by Elevate by Zanzi</h3>
            <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed">
              Official, high-touch support across buying, selling, renting, lettings, valuation, and investment in Malta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {serviceCards.map((svc, i) => (
              <motion.a
                key={svc.title}
                href={anchorHref(pathname, svc.href)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-brand-panel border border-brand-bronze-dark/25 hover:border-brand-copper/50 min-w-0 p-4 sm:p-5 flex flex-col min-h-[158px] sm:min-h-[168px] lg:min-h-0 transition-all duration-500 outline-none focus:ring-1 focus:ring-brand-copper/55 touch-manipulation"
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
