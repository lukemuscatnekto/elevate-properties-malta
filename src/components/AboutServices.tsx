import { motion } from 'motion/react';
import { Key, Tag, Home, TrendingUp, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const defaultServiceCards = [
  {
    title: 'Property Advisory',
    desc: 'Bespoke guidance to find the right property.',
    Icon: Key,
    href: '#properties',
  },
  {
    title: 'Buyer Representation',
    desc: 'Expert negotiation and full purchase support.',
    Icon: Tag,
    href: '#list-property',
  },
  {
    title: 'Seller Strategy',
    desc: 'Position your property with clarity and confidence.',
    Icon: ShieldCheck,
    href: '#contact',
  },
  {
    title: 'Rentals & Lettings',
    desc: 'Guidance for landlords, tenants, and rental opportunities.',
    Icon: Camera,
    href: '#list-property',
  },
  {
    title: 'Investment Advisory',
    desc: 'Clear insight for stronger property decisions.',
    Icon: Home,
    href: '#contact',
  },
  {
    title: 'Property Management',
    desc: 'Practical support for long-term property stewardship.',
    Icon: TrendingUp,
    href: '#contact',
  },
] as const;

const previewServiceCards = [
  {
    title: 'Property advisory',
    desc: 'Brief-to-shortlist discipline — Malta-wide sourcing with valuation realism before viewings.',
    Icon: Key,
    href: '#buy-malta',
  },
  {
    title: 'Buyer representation',
    desc: 'Negotiation architecture, diligence pacing, and discreet introductions through to notarial completion.',
    Icon: Tag,
    href: '#buy-malta',
  },
  {
    title: 'Seller strategy',
    desc: 'Premium narrative, media direction, and buyer qualification so leverage stays with the owner.',
    Icon: ShieldCheck,
    href: '#sell-malta',
  },
  {
    title: 'Rentals & lettings',
    desc: 'Landlord positioning, tenancy structuring, and lettings intelligence via wider network awareness.',
    Icon: Camera,
    href: '#contact',
  },
  {
    title: 'Investment advisory',
    desc: 'Scenario modelling for yield, refurbishment, and duration holds — aligned to liquidity appetite.',
    Icon: Home,
    href: '#investment',
  },
  {
    title: 'Property management',
    desc: 'Long-horizon stewardship for owners who require operational continuity after acquisition.',
    Icon: TrendingUp,
    href: '#contact',
  },
] as const;

export default function AboutServices() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const serviceCards = elevatePreview ? previewServiceCards : defaultServiceCards;

  return (
    <section
      id="about"
      className={`scroll-anchor-target relative border-t border-white/[0.05] bg-[#07090d] ${elevatePreview ? 'border-[rgba(0,159,227,0.07)]' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="epm-accent-line absolute inset-x-0 top-0" aria-hidden="true" />

      {/* ── About block ── */}
      <div className={`px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'py-14 sm:py-[4.5rem]' : 'py-14 sm:py-16'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-3 font-sans text-[11px] font-medium tracking-[0.12em] text-[#9aa3ae]">
              <span className="h-px w-10 bg-gradient-to-r from-[rgba(0,159,227,0.42)] to-transparent" aria-hidden="true" />
              Brand foundation
            </p>
            <h2 id="about-heading" className="mb-3 font-playfair text-2xl leading-tight tracking-[0.01em] text-[#f4f4f2] md:text-3xl">
              Elevate Properties Malta
            </h2>
            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#aeb6c2] sm:text-[15px]">
              {elevatePreview
                ? 'Elevate carries the luxury tone — ZANZI franchise credibility signals Malta execution seriousness. Quick Lets network depth supports lettings intelligence when your mandate requires it.'
                : 'Modern luxury by Elevate. Official franchise credibility through ZANZI. Supported by the wider Quick Lets property network.'}
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="border border-white/[0.06] bg-[#07090d]/95 p-6 sm:p-7"
            >
              <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.12em] text-[#9ea6b0]">Elevate</p>
              <h3 className="mb-3 font-playfair text-lg text-[#f4f4f2] sm:text-xl">Premium presentation</h3>
              <p className="mb-4 font-sans text-sm font-light leading-relaxed text-[#aeb4bf]">
                Premium property presentation and private advisory.
              </p>
              <ul className="space-y-2.5 font-sans text-[13px] font-light leading-relaxed text-[#c5cad2] sm:text-sm">
                {[
                  'Luxury property positioning',
                  'Premium website experience',
                  'Private buyer and seller advisory',
                  'Modern digital marketing',
                  'Direct-owner acquisition mindset',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-4 shrink-0 bg-[rgba(0,159,227,0.45)]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="border border-white/[0.06] bg-[#07090d]/90 p-6 sm:p-7"
            >
              <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.12em] text-[#009FE3]">ZANZI</p>
              <h3 className="mb-3 font-playfair text-lg text-[#f4f4f2] sm:text-xl">Franchise credibility</h3>
              <p className="mb-4 font-sans text-sm font-light leading-relaxed text-[#aeb4bf]">
                Official franchise backing and Malta market trust.
              </p>
              <ul className="space-y-2.5 font-sans text-[13px] font-light leading-relaxed text-[#c5cad2] sm:text-sm">
                {[
                  'Recognised Malta real-estate presence',
                  'Local market experience',
                  'Buyer and seller trust',
                  'Strong local recognition',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-4 shrink-0 bg-[rgba(0,159,227,0.45)]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="border border-white/[0.06] bg-[#07090d]/90 p-6 sm:p-7"
            >
              <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.12em] text-[#c9a8f0]">Quick Lets</p>
              <h3 className="mb-3 font-playfair text-lg text-[#f4f4f2] sm:text-xl">Lettings &amp; network reach</h3>
              <p className="mb-4 font-sans text-sm font-light leading-relaxed text-[#aeb4bf]">
                Lettings network support and wider market awareness.
              </p>
              <ul className="space-y-2.5 font-sans text-[13px] font-light leading-relaxed text-[#c5cad2] sm:text-sm">
                {[
                  'Lettings market awareness',
                  'Rental and investment support',
                  'Wider property-network support',
                  'Malta tenant and landlord familiarity',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-2 h-px w-4 shrink-0 bg-[rgba(201,168,240,0.4)]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          <p className="mt-8 max-w-3xl font-sans text-sm font-light leading-relaxed text-[#8e96a3]">
            Together, Elevate Properties Malta offers a calmer, more trusted way to buy, sell, and invest in Malta property.
          </p>
          <p className="mt-6">
            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 border border-[rgba(0,159,227,0.35)] bg-[#0a0c10]/90 px-6 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.55)] hover:bg-[#0c0e14]/95 sm:w-auto sm:px-8 sm:tracking-[0.22em]"
            >
              Book a private consultation <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>

      {/* ── Services block ── */}
      <div
        id="services"
        className={`scroll-anchor-target border-t border-white/[0.05] bg-[#080a10] px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'border-[rgba(0,159,227,0.06)] py-16 sm:py-20' : 'py-14 sm:py-16'}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className={`max-w-2xl ${elevatePreview ? 'mb-12' : 'mb-10'}`}>
            <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">Our services</p>
            <h3 className="mb-3 font-playfair text-2xl leading-tight text-[#f4f4f2] md:text-[2rem] md:leading-tight">
              {elevatePreview ? 'Full-stack Malta property advisory' : 'Advisory across every stage of Malta property'}
            </h3>
            <p className="font-sans text-sm font-light leading-relaxed text-[#aeb4bf] sm:text-[15px]">
              {elevatePreview
                ? 'Serious buyers, direct owners, investors, and landlords — each pathway receives discreet handling and credible valuation discipline.'
                : 'Private advisory across buying, selling, lettings, investment, and long-term property management.'}
            </p>
          </div>

          <div className="overflow-hidden rounded-sm border border-white/[0.06]">
            {serviceCards.map((svc, i) => (
              <motion.a
                key={svc.title}
                href={anchorHref(pathname, svc.href)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group flex min-h-0 min-w-0 flex-col gap-3 border-b border-white/[0.05] bg-[#07090d]/35 px-5 py-5 transition-colors last:border-b-0 hover:bg-[#0a0c12]/45 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[rgba(0,159,227,0.4)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-6 touch-manipulation"
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <svc.Icon className="mt-0.5 h-4 w-4 shrink-0 text-[rgba(0,159,227,0.55)] transition-colors group-hover:text-[#009FE3]" aria-hidden="true" />
                  <div className="min-w-0">
                    <h4 className="font-playfair text-lg leading-snug text-[#f4f4f2] transition-colors group-hover:text-white sm:text-xl">
                      {svc.title}
                    </h4>
                    <p className="mt-1.5 font-sans text-[13px] font-light leading-relaxed text-[#9ea6b0] sm:text-sm">{svc.desc}</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d8694] transition-all group-hover:gap-3 group-hover:text-[#009FE3]" aria-hidden="true">
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
