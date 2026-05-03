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
    <section id="about" className="scroll-anchor-target bg-[#070707] relative border-t border-gold/20" aria-labelledby="about-heading">

      {/* ── About block ── */}
      <div className="py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Copy side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] text-gold font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/60 inline-block" aria-hidden="true" />
              Who We Are
            </p>
            <h2 id="about-heading" className="text-2xl md:text-3xl font-playfair text-white leading-tight mb-4">
              About Elevate Properties Malta
            </h2>

            <p className="text-white/55 font-light text-sm leading-relaxed mb-3 max-w-lg">
              Elevate Properties Malta was founded on a single conviction: that the island&rsquo;s most
              exceptional homes deserve representation that is equally exceptional. We are a boutique
              agency, not a volume house — every client receives the full attention of our senior advisers.
            </p>
            <p className="text-white/40 font-light text-xs leading-relaxed mb-6 max-w-lg">
              From first homes to landmark residences, our focus is calibrated advice, orderly viewings, and seller campaigns that preserve discretion — whether you are transacting locally or briefing us from overseas.
            </p>

            <div className="mb-8 max-w-lg border border-gold/15 bg-white/[0.02] p-5">
              <p className="text-[10px] text-gold/75 uppercase tracking-[0.28em] font-bold mb-3">Why clients choose Elevate</p>
              <ul className="space-y-2.5 text-white/42 text-[11px] sm:text-xs font-light leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-gold/60 shrink-0" aria-hidden="true">·</span>
                  <span>Director-led contact — no anonymous call centres.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold/60 shrink-0" aria-hidden="true">·</span>
                  <span>Quiet execution: viewings and materials aligned to your comfort level.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold/60 shrink-0" aria-hidden="true">·</span>
                  <span>Malta-wide perspective with an eye for micro-location and long-term value.</span>
                </li>
              </ul>
            </div>

            <ul className="space-y-2 mb-8 max-w-lg text-white/38 text-[11px] sm:text-xs font-light leading-relaxed border-l border-gold/20 pl-5">
              <li>Context on neighbourhoods, micro-locations, and practical living or tenancy considerations.</li>
              <li>Coordinated introductions to trusted notaries or specialists when you need them.</li>
              <li>No loud claims — we grow credibility through consistency and confidentiality.</li>
            </ul>

            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex items-center gap-2 min-h-[44px] text-gold text-[10px] font-bold uppercase tracking-[0.25em] touch-manipulation"
            >
              Book a confidential consultation <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Image — mobile: stack below copy; md+: column */}
          <div className="lg:hidden rounded-[2px] overflow-hidden border border-white/8 aspect-[16/10] max-h-[280px]">
            <img
              src="/images/new-hero.png"
              alt="Elevate Properties Malta — Malta residence"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              width={1200}
              height={750}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative group hidden lg:block"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold/30 pointer-events-none z-10" aria-hidden="true" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-gold/30 pointer-events-none z-10" aria-hidden="true" />

            <div className="aspect-[4/5] overflow-hidden border border-white/5 rounded-[2px]">
              <img
                src="/images/new-hero.png"
                alt="Elevate Properties Malta — Malta residence"
                className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-[1.02]"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>

            <div className="absolute -bottom-8 -left-8 bg-[#0D0D0D] border border-gold/15 p-6 hidden xl:block shadow-2xl max-w-[260px]">
              <p className="text-[9px] text-gold/70 uppercase tracking-[0.3em] font-bold mb-2">What to expect first</p>
              <ol className="text-white/50 text-[11px] font-light leading-relaxed space-y-2 list-decimal list-inside">
                <li>Brief qualification of your objectives and timing.</li>
                <li>Curated options or valuation direction — aligned to budget.</li>
                <li>Clear next steps, without obligation.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Services block ── */}
      <div id="services" className="scroll-anchor-target py-10 px-4 sm:px-8 border-t border-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-playfair text-white mb-2">Our Services</h3>
            <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed">
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
                className="group bg-[#0D0D0D] border border-gold/15 hover:border-gold/40 min-w-0 p-4 sm:p-5 flex flex-col min-h-[158px] sm:min-h-[168px] lg:min-h-0 transition-all duration-500 outline-none focus:ring-1 focus:ring-gold touch-manipulation"
              >
                <div className="w-9 h-9 rounded-full border border-gold/15 flex items-center justify-center mb-3 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-500">
                  <svc.Icon className="w-4 h-4 text-gold" aria-hidden="true" />
                </div>

                <h4 className="text-base sm:text-lg font-playfair text-white mb-2 group-hover:text-gold transition-colors duration-400">{svc.title}</h4>
                <p className="text-white/35 text-[10px] sm:text-[11px] font-light leading-relaxed flex-1 line-clamp-5 sm:line-clamp-4">{svc.desc}</p>

                <div className="mt-5 flex items-center gap-2 text-[10px] text-gold/50 uppercase tracking-widest font-bold group-hover:gap-4 transition-all duration-400" aria-hidden="true">
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
