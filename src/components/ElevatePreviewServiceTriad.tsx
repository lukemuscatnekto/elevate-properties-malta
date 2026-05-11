import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

const cards = [
  {
    title: 'Buy Property',
    line: 'Private buyer guidance — Malta-wide.',
    href: '#properties',
  },
  {
    title: 'Sell / List',
    line: 'Confidential valuation & presentation.',
    href: '#list-property',
  },
  {
    title: 'Invest in Malta',
    line: 'Mandate-led sourcing & clarity.',
    href: '#contact',
  },
] as const;

export default function ElevatePreviewServiceTriad() {
  const { pathname } = useLocation();

  return (
    <section
      id="services-preview"
      className="scroll-mt-[min(5.75rem,18vw)] border-t border-white/[0.05] bg-[#060608] px-4 py-20 sm:px-10 sm:py-24"
      aria-labelledby="services-preview-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          id="services-preview-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-playfair text-lg font-light tracking-[0.02em] text-[#b8c0cc] md:mb-14 md:text-xl"
        >
          Advisory
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={anchorHref(pathname, card.href)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col justify-between rounded-sm border border-white/[0.06] bg-[#08090b] px-7 py-9 transition-colors duration-300 hover:border-white/[0.12] hover:bg-[#0a0c0f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(0,159,227,0.35)] md:min-h-[11.5rem]"
            >
              <div>
                <h3 className="font-playfair text-xl font-light text-[#eceef1] md:text-[1.35rem]">{card.title}</h3>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-[#8b939e]">{card.line}</p>
              </div>
              <span className="mt-8 text-[13px] font-light text-[#7d858f] transition-colors group-hover:text-[#c5ccd6]">
                Continue
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
