import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Compass,
  Gem,
  LineChart,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

const sectionFrame =
  'relative overflow-hidden border-t border-white/[0.055] px-4 sm:px-8 lg:px-10';
const glassCard =
  'rounded-2xl border border-[rgba(0,159,227,0.14)] bg-black/[0.38] p-6 backdrop-blur-2xl shadow-[0_28px_80px_rgba(0,0,0,0.38)] transition-[border-color,box-shadow] duration-500 hover:border-[rgba(0,159,227,0.28)] hover:shadow-[0_32px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(0,159,227,0.06)] sm:p-7';
const eyebrow =
  'mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[#b8c0cc]';

/** Eyebrow + pillars before featured listings — positions buyer sourcing without inventing inventory. */
export function ElevateFeaturedLeadIn() {
  const { pathname } = useLocation();

  const pillars = [
    {
      title: 'Private buyer requirements',
      body:
        'We document tenure sensitivities, yield thresholds, lifestyle cadence, and liquidity preferences — then stress-test every introduction against your brief before a viewing is proposed.',
      Icon: Users,
    },
    {
      title: 'Owner-direct opportunities',
      body:
        'Beyond portals: discreet conversations with owners and advisers where execution posture matters as much as price.',
      Icon: Shield,
    },
    {
      title: 'Curated Malta homes',
      body:
        'What appears publicly is only part of the story. Prime Malta inventory moves quietly — contact Elevate for what is genuinely available today.',
      Icon: Gem,
    },
  ];

  return (
    <section
      className={`${sectionFrame} scroll-mt-[min(5.75rem,18vw)] bg-[#040508] py-16 sm:py-20`}
      aria-label="How we work with buyers"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(0,159,227,0.075),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_40%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.25)] to-transparent opacity-80" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-3xl lg:mb-14"
        >
          <p className={`${eyebrow} mb-2 text-[#9ea8b5]`}>
            <span className="inline-block h-px w-10 bg-gradient-to-r from-[rgba(0,159,227,0.4)] to-transparent" aria-hidden="true" />
            Acquisition posture · Elevate Properties Malta
          </p>
          <h2 className="font-playfair text-[clamp(1.65rem,4vw,2.35rem)] font-normal leading-tight tracking-[0.04em] text-[#f2f3f5] md:tracking-[0.06em]">
            Serious buyers deserve disciplined sourcing —{' '}
            <span className="text-[#aeb6bf]">not catalogue scrolling.</span>
          </h2>
          <p className="mt-5 text-[15px] font-light leading-[1.7] text-[#aeb4bf] sm:text-base">
            Elevate Properties Malta is engineered for purchasers who value clarity: curated introductions, valuation realism,
            and negotiation discipline. If nothing below mirrors your brief exactly,{' '}
            <a
              href={anchorHref(pathname, '#contact')}
              className="font-medium text-[#009FE3] underline-offset-[5px] decoration-[rgba(0,159,227,0.35)] hover:underline"
            >
              request current availability
            </a>{' '}
            — private mandates and owner-direct conversations are where Malta&apos;s best opportunities surface first.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {pillars.map(({ title, body, Icon }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={glassCard}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,159,227,0.2)] bg-[rgba(0,159,227,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Icon className="h-[18px] w-[18px] text-[rgba(0,159,227,0.92)]" aria-hidden="true" />
              </div>
              <h3 className="mb-2.5 font-playfair text-xl tracking-[0.02em] text-[#f4f4f2]">{title}</h3>
              <p className="flex-1 text-[13px] font-light leading-relaxed text-[#9ea5b0] sm:text-sm">{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionBuyMalta() {
  const { pathname } = useLocation();

  const points = [
    'Malta-wide sourcing — coastal lifestyle, central villa belts, and yield-led corridors framed against real liquidity.',
    'Tenure and fiscal context upfront — fewer surprises when you reach notarial commitment.',
    'Private consultation cadence — tight briefing loops while stock is validated.',
    'Owner-direct and off-market threads layered beside open-market listings.',
  ];

  return (
    <section
      id="buy-malta"
      className={`${sectionFrame} scroll-anchor-target bg-[#07090c] py-16 sm:py-20`}
      aria-labelledby="buy-malta-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(0,159,227,0.055)_0%,transparent_46%),radial-gradient(ellipse_70%_50%_at_100%_80%,rgba(0,159,227,0.04),transparent_55%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className={eyebrow}>
            <Compass className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
            Buy property in Malta
          </p>
          <h2 id="buy-malta-heading" className="font-playfair text-[clamp(1.85rem,4.2vw,2.85rem)] leading-[1.12] tracking-[0.03em] text-[#f6f6f4]">
            Acquire with intelligence —{' '}
            <span className="block mt-1 text-[clamp(1.1rem,2.5vw,1.35rem)] font-normal tracking-[0.12em] text-[#009FE3]/95 uppercase">
              by ZANZI advisory discipline
            </span>
          </h2>
          <p className="mt-5 text-[15px] font-light leading-[1.75] text-brand-sand sm:text-base">
            Malta rewards buyers who arrive prepared: locality premiums, refurbishment realities, and seasonal liquidity
            all shape outcomes. Elevate translates your mandate into a structured search — calibrated viewings,
            transparent positioning, and negotiation architecture aligned with how you actually want to own.
          </p>
          <ul className="mt-8 space-y-4 text-[14px] font-light leading-relaxed text-[#c5cad3] sm:text-[15px]">
            {points.map((line) => (
              <li key={line} className="flex gap-4">
                <span className="mt-2 h-px w-8 shrink-0 bg-gradient-to-r from-[rgba(0,159,227,0.65)] to-transparent" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={anchorHref(pathname, '#contact')}
              className="epm-btn-primary inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 px-9 text-[10px] uppercase tracking-[0.26em] touch-manipulation sm:flex-none"
            >
              Book private buyer consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={anchorHref(pathname, '#properties')}
              className="inline-flex min-h-[50px] flex-1 items-center justify-center border border-white/[0.12] bg-transparent px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8eaee] backdrop-blur-sm transition-colors hover:border-[rgba(0,159,227,0.35)] hover:text-white touch-manipulation sm:flex-none"
            >
              Review curated spotlight
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className={`${glassCard} lg:p-8`}
        >
          <div className="mb-6 h-px w-16 bg-gradient-to-r from-[rgba(0,159,227,0.65)] to-transparent" aria-hidden="true" />
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#009FE3]/90">Briefing checklist</p>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-brand-sand">
            Share indicative budget (ranges are fine), financing posture, preferred localities, occupancy timeline, and
            whether this purchase is lifestyle-led or balance-sheet-led. We reciprocate with valuation sanity-checks and
            sourcing realism — before anyone wastes a Saturday on misaligned stock.
          </p>
          <p className="mt-6 border-t border-white/[0.07] pt-6 text-[12px] font-light leading-relaxed text-brand-metal">
            elevatepropertiesmalta.com · Advisor continuity · Official ZANZI franchise positioning · Malta-wide execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionSellElevate() {
  const { pathname } = useLocation();

  return (
    <section
      id="sell-malta"
      className={`${sectionFrame} scroll-anchor-target bg-[#050608] py-16 sm:py-20`}
      aria-labelledby="sell-malta-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={eyebrow}>
              <Building2 className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
              Sell / list your property
            </p>
            <h2 id="sell-malta-heading" className="font-playfair text-[clamp(1.85rem,4vw,2.75rem)] leading-tight tracking-[0.03em] text-[#f4f4f2]">
              Premium presentation for owners who expect leverage —{' '}
              <span className="text-[#aeb4bf] not-italic">not exposure noise.</span>
            </h2>
            <p className="mt-5 text-[15px] font-light leading-[1.75] text-[#aeb4bf] sm:text-base">
              Elevate protects how your property enters the narrative: disciplined buyer qualification, cinematic media
              direction, and discreet syndication where reputation-sensitive assets demand restraint.{' '}
              <span className="font-medium text-[#e8eaee]">Elevate</span> leads the story;{' '}
              <span className="text-[#009FE3]/90">ZANZI</span> franchise credibility reinforces trust when buyers verify
              seriousness.
            </p>
            <ul className="mt-8 space-y-4 text-[14px] font-light leading-relaxed text-[#aeb4bf] sm:text-[15px]">
              <li className="flex gap-3">
                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#009FE3]" aria-hidden="true" />
                Pricing discipline anchored in comparable evidence — valuation guidance that respects the door, not ego.
              </li>
              <li className="flex gap-3">
                <Shield className="mt-1 h-4 w-4 shrink-0 text-[#009FE3]" aria-hidden="true" />
                Confidential listings and phased reveals — ideal when occupation, tenancy, or shareholder optics matter.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${glassCard}`}
          >
            <p className="text-[15px] font-light leading-relaxed text-[#aeb4bf]">
              Ready to brief us confidentially? The listing form captures owner identity, contact channels, property
              typology, locality, asking guidance, bedroom count, and narrative detail — routed straight into Elevate&apos;s
              advisory workflow (same intake logic as the main site).
            </p>
            <a
              href={anchorHref(pathname, '#list-property')}
              className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-[rgba(0,159,227,0.42)] bg-[rgba(0,159,227,0.1)] px-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f4f4f2] transition-colors hover:bg-[rgba(0,159,227,0.16)] touch-manipulation sm:w-auto"
            >
              Open confidential listing form
              <ArrowRight className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
            </a>
            <p className="mt-6 text-center text-[11px] font-light text-[#8e96a3]">
              Prefer voice first?{' '}
              <a href={anchorHref(pathname, '#contact')} className="text-[#009FE3] hover:underline">
                Speak with an advisor
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionInvestment() {
  const { pathname } = useLocation();

  return (
    <section
      id="investment"
      className={`${sectionFrame} scroll-anchor-target bg-[#07090d] py-16 sm:py-20`}
      aria-labelledby="investment-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(0,159,227,0.09),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={eyebrow}>
              <LineChart className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
              Investment guidance · Malta
            </p>
            <h2 id="investment-heading" className="font-playfair text-[clamp(1.85rem,4vw,2.8rem)] leading-tight text-[#f4f4f2]">
              Capital allocation —{' '}
              <span className="text-[#009FE3]/95">without brochure yield fantasy.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.75] text-[#aeb4bf] sm:text-base">
              Residential yield, value-add refurbishment, and longer-duration holds each carry different friction costs
              in Malta. Elevate frames scenarios around tenancy realities, recurring charges, refurbishment drift, and exit
              liquidity — then aligns sourcing with how aggressively you want capital deployed.
            </p>
            <a
              href={anchorHref(pathname, '#contact')}
              className="mt-10 inline-flex min-h-[50px] items-center gap-2 border border-[rgba(0,159,227,0.32)] bg-black/40 px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f4f4f2] backdrop-blur-md transition-colors hover:bg-[rgba(0,159,227,0.08)] hover:border-[rgba(0,159,227,0.45)] touch-manipulation"
            >
              Discuss an investment mandate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${glassCard} border-white/[0.06]`}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#009FE3]/85">What we deliver</p>
            <ul className="mt-4 space-y-3 text-[13px] font-light leading-relaxed text-[#9ea5b0]">
              <li>Stress-tested comparable frameworks — not vanity pricing charts.</li>
              <li>Mandate-led sourcing — aligned to risk, refurbishment appetite, and holding horizon.</li>
              <li>Discreet introductions where vendors prefer institutional posture.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionWhyElevate() {
  const { pathname } = useLocation();

  const rows = [
    {
      title: 'Elevate leads — visibly',
      body: 'Typography, pacing, and enquiry handling all reinforce Elevate first: calm authority, cinematic restraint, and concierge responsiveness.',
    },
    {
      title: 'ZANZI credibility — quietly decisive',
      body: 'Official franchise backing signals Malta execution seriousness without competing with the Elevate narrative.',
    },
    {
      title: 'Owner-direct sourcing ethic',
      body: 'We pursue conversations traditional portals never surface — fewer mismatched viewings, sharper negotiation posture.',
    },
    {
      title: 'Advisor continuity',
      body: 'Your brief stays attached to senior judgement — not bounced across rotating inbox queues.',
    },
  ];

  return (
    <section
      id="why-elevate"
      className={`${sectionFrame} scroll-anchor-target bg-[#06070a] py-16 sm:py-20`}
      aria-labelledby="why-elevate-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.2)] to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl lg:mb-14"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.38em] text-[#9ea8b5]">Why Elevate Properties Malta</p>
          <h2 id="why-elevate-heading" className="font-playfair text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[0.02em] text-[#f7f7f5]">
            Elevate
          </h2>
          <p className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.42em] text-[#009FE3]/90 sm:text-xs">
            by ZANZI · Properties Malta
          </p>
          <p className="mt-6 text-[15px] font-light leading-[1.75] text-[#aeb4bf] sm:text-base">
            Premium real estate is operational — valuations that survive scrutiny, presentation that respects the asset,
            and negotiations that protect leverage. Elevate Properties Malta assembles those disciplines for buyers,
            sellers, and investors who treat property as consequential capital.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {rows.map((row, i) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-black/45 to-black/[0.22] p-7 backdrop-blur-xl"
            >
              <h3 className="font-playfair text-xl tracking-[0.02em] text-[#f2f3f5]">{row.title}</h3>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-[#aeb4bf]">{row.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 border-t border-white/[0.06] pt-10 text-center text-[12px] font-light leading-relaxed text-[#8e96a3]">
          Direct advisory ·{' '}
          <a href="tel:+35699816646" className="text-[#009FE3] hover:underline">
            +356 9981 6646
          </a>
          {' · '}
          <a href="mailto:nicodalton@elevatepropertiesmalta.com" className="text-[#009FE3] hover:underline">
            nicodalton@elevatepropertiesmalta.com
          </a>
          {' · '}
          <a href={anchorHref(pathname, '#contact')} className="text-[#009FE3] hover:underline">
            Secure enquiry
          </a>
        </p>
      </div>
    </section>
  );
}
