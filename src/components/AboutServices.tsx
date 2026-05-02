import { motion } from 'motion/react';
import { Key, Tag, Home, TrendingUp, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Buy',
    desc: 'Gain exclusive access to Malta\'s finest off-market villas, penthouses, and palazzos — curated for those who expect the exceptional.',
    Icon: Key,
    href: '#properties',
  },
  {
    title: 'Sell',
    desc: 'Discreet, bespoke representation that connects your property with the world\'s most discerning buyers.',
    Icon: Tag,
    href: '#list-property',
  },
  {
    title: 'Rent',
    desc: 'A handpicked portfolio of Malta\'s most prestigious long-term residences, managed with absolute care.',
    Icon: Home,
    href: '#contact',
  },
  {
    title: 'Invest',
    desc: 'Strategic guidance on high-yield real estate and portfolio diversification across the Maltese market.',
    Icon: TrendingUp,
    href: '#contact',
  },
];

export default function AboutServices() {
  return (
    <section id="about" className="scroll-anchor-target bg-[#070707] relative border-t border-gold/20" aria-labelledby="about-heading">

      {/* ── About block ── */}
      <div className="py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

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
              agency, not a volume house — every client receives the full attention of our senior advisors.
            </p>
            <p className="text-white/40 font-light text-xs leading-relaxed mb-5 max-w-lg">
              From signature villas to premium penthouses, our focus is calibrated advice, orderly viewings, and seller campaigns that preserve discretion — whether you are transacting locally or briefing us from overseas.
            </p>

            <ul className="space-y-2 mb-8 max-w-lg text-white/38 text-[11px] sm:text-xs font-light leading-relaxed border-l border-gold/20 pl-5">
              <li>Context on neighbourhoods, micro-locations, and practical living or tenancy considerations.</li>
              <li>Coordinated introductions to trusted notaries or specialists when you need them.</li>
              <li>No loud claims — we grow credibility through consistency and confidentiality.</li>
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 min-h-[44px] text-gold text-[10px] font-bold uppercase tracking-[0.25em] touch-manipulation"
            >
              Book a confidential consultation <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative group hidden md:block"
          >
            {/* Corner accents */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold/30 pointer-events-none z-10" aria-hidden="true" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-gold/30 pointer-events-none z-10" aria-hidden="true" />

            <div className="aspect-[4/5] overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1628592102751-ba83b035e076?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Malta residence with premium stone finishes and high ceilings"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>

            {/* Factual call-out — avoids fabricated reviews or accolades */}
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
      <div id="services" className="scroll-anchor-target py-8 px-4 sm:px-8 border-t border-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-playfair text-white">Our Services</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {services.map((svc, i) => (
              <motion.a
                key={svc.title}
                href={svc.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-[#0D0D0D] border border-gold/15 hover:border-gold/40 min-w-0 p-4 flex flex-col min-h-[148px] sm:min-h-0 transition-all duration-500 outline-none focus:ring-1 focus:ring-gold touch-manipulation"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-full border border-gold/15 flex items-center justify-center mb-3 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-500">
                  <svc.Icon className="w-4 h-4 text-gold" aria-hidden="true" />
                </div>

                <h4 className="text-lg font-playfair text-white mb-2 group-hover:text-gold transition-colors duration-400">{svc.title}</h4>
                <p className="text-white/35 text-[11px] sm:text-xs font-light leading-relaxed flex-1 line-clamp-4">{svc.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-[10px] text-gold/50 uppercase tracking-widest font-bold group-hover:gap-4 transition-all duration-400" aria-hidden="true">
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
