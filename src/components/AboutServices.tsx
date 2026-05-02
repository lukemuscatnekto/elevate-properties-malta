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
              From signature villas to premium penthouses, our boutique team delivers a discreet, premium service tailored to each client.
            </p>

            {/* Stats (illustrative — replace with audited figures before regulated advertising) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-2 py-4 border-y border-white/5" aria-label="Illustrative brand highlights">
              {[
                { val: '€50M+',  label: 'Portfolio Value' },
                { val: '120+',   label: 'Premium Listings' },
                { val: '100%',   label: 'Client Discretion' },
              ].map(s => (
                <div key={s.label} className="group text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-playfair text-white mb-1 group-hover:text-gold transition-colors tabular-nums">{s.val}</p>
                  <p className="text-[8px] sm:text-[9px] text-white/25 uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-white/20 mb-6 max-w-lg leading-relaxed">Figures are representative highlights for positioning — not audited performance claims.</p>

            <a href="#contact" className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[0.25em]">
              Book a Private Consultation <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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

            {/* Floating quote card */}
            <div className="absolute -bottom-8 -left-8 bg-[#0D0D0D] border border-gold/15 p-7 hidden xl:block shadow-2xl max-w-[240px]">
              <div className="flex gap-0.5 mb-3" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-gold" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-white font-playfair text-base italic leading-snug mb-2">&ldquo;Malta&rsquo;s most trusted luxury agency.&rdquo;</p>
              <p className="text-gold/50 text-[9px] uppercase tracking-widest font-bold">Representative client sentiment — not third-party accreditation</p>
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
                  Enquire <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
