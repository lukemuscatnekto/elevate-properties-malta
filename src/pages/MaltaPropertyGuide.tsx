import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/site';

const GUIDE_TITLE = "Malta Property Buyer's Guide 2026 | Elevate Properties Malta";
const GUIDE_DESCRIPTION =
  "A practical guide to buying luxury property in Malta — property types, the buying process, price ranges, and how Elevate can help you find the right opportunity.";

export default function MaltaPropertyGuide() {
  useEffect(() => {
    const prevTitle = document.title;
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonicalHref = canonical?.getAttribute('href') ?? null;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDescContent = metaDesc?.getAttribute('content') ?? null;

    const base = siteConfig.domainUrl.replace(/\/$/, '');
    document.title = GUIDE_TITLE;
    canonical?.setAttribute('href', `${base}/guides/malta-property-market`);
    metaDesc?.setAttribute('content', GUIDE_DESCRIPTION);

    return () => {
      document.title = prevTitle;
      if (canonical) {
        if (prevCanonicalHref) canonical.setAttribute('href', prevCanonicalHref);
        else canonical.setAttribute('href', `${base}/`);
      }
      if (metaDesc) {
        if (prevDescContent != null) metaDesc.setAttribute('content', prevDescContent);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070809] selection:bg-brand-copper/30 selection:text-brand-ivory scroll-smooth overflow-x-hidden font-sans">
      <Navbar />

      <main id="guides-prerender-anchor" className="pt-24 sm:pt-28 pb-20">
        <article
          className="scroll-anchor-target relative border-t border-white/[0.06] bg-[#070809]"
          aria-labelledby="malta-guide-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-brand-copper/35 to-transparent"
          />

          <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-20">
            <nav className="mb-8 text-[11px] font-light tracking-wide text-[#8e96a3]" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link to="/" className="text-[#b4bcc8] transition-colors hover:text-[#e8eaee]">
                    Home
                  </Link>
                </li>
                <li className="text-[#5c6570]" aria-hidden="true">
                  /
                </li>
                <li>
                  <Link to="/guides" className="text-[#b4bcc8] transition-colors hover:text-[#e8eaee]">
                    Guides
                  </Link>
                </li>
                <li className="text-[#5c6570]" aria-hidden="true">
                  /
                </li>
                <li className="max-w-[min(100%,14rem)] truncate text-[#e8eaee]">Malta buyer&apos;s guide</li>
              </ol>
            </nav>

            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#9ea6b0]">
              <span className="inline-block h-px w-8 bg-brand-copper/55" aria-hidden="true" />
              Guide
            </p>
            <h1
              id="malta-guide-heading"
              className="mb-5 font-playfair text-3xl leading-[1.12] tracking-tight text-brand-ivory sm:text-4xl md:text-[2.5rem]"
            >
              The Malta Property Market — A Buyer&apos;s Guide
            </h1>
            <p className="mb-14 max-w-2xl border-b border-white/[0.06] pb-10 text-[15px] font-light leading-relaxed text-[#b4bcc8]">
              A concise orientation for serious buyers and investors. It is not legal or tax advice; always confirm facts with a notary and
              your own advisers before you commit.
            </p>

            <div className="space-y-10 text-[14.5px] font-light leading-relaxed text-[#b4bcc8]">
              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0]">Why Malta</h2>
                <p className="mb-4">
                  Malta is an EU member state with a well-established civil-law property framework. English is widely used in business and
                  day-to-day life, which smooths due diligence and contract discussions for many international buyers.
                </p>
                <p className="mb-4">
                  The islands combine Mediterranean lifestyle with strong air and sea links to continental Europe. For buyers weighing
                  residence or tax planning, Malta has various programmes and regimes; eligibility, conditions, and suitability change over
                  time, so any decision should rest on advice from a qualified accountant or lawyer—not marketing copy.
                </p>
                <p>
                  {siteConfig.companyName} focuses on matching the right property and mandate to your brief, then coordinating discreetly
                  with the professionals who protect your position at each step.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0]">Property types and price ranges</h2>
                <p className="mb-4">
                  You will encounter seafront apartments and penthouses, traditional townhouses, larger villas with outdoor space, and
                  occasional palazzos or historic houses of character. Each class carries different maintenance obligations, community rules,
                  and liquidity.
                </p>
                <p className="mb-4">
                  <span className="text-[#e8eaee]">Indicative entry and upper bands (verify before relying on figures):</span> apartments{' '}
                  <span className="text-[#cfd5de]">[PLACEHOLDER]</span>, townhouses <span className="text-[#cfd5de]">[PLACEHOLDER]</span>,
                  villas <span className="text-[#cfd5de]">[PLACEHOLDER]</span>, palazzos / houses of character{' '}
                  <span className="text-[#cfd5de]">[PLACEHOLDER]</span>, penthouses <span className="text-[#cfd5de]">[PLACEHOLDER]</span> — all
                  subject to location, condition, and title burdens.
                </p>
                <p>
                  In character terms, prime seafront stock in Sliema and St Julian&apos;s typically commands a premium over comparable
                  internal layouts. Valletta and the historic cores favour unique floor plates and heritage constraints. Gozo often offers
                  more space per euro for rural and coastal settings, with a different rhythm and inventory—compare like with like, not
                  headline price alone.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0]">The buying process</h2>
                <p className="mb-4">
                  Maltese conveyancing is notary-led. After terms are agreed, parties usually sign a preliminary agreement (commonly called
                  a promise of sale or <span className="text-[#e8eaee]">konvenju</span>), with a deposit and a fixed date to complete. The
                  notary investigates title, searches, and encumbrances before the final deed of sale.
                </p>
                <p className="mb-4">
                  Stamp duty and other costs apply; rates and exemptions depend on the buyer profile, property use, and current law. Use{' '}
                  <span className="text-[#cfd5de]">[PLACEHOLDER]</span> for percentages until your notary confirms the position for your
                  transaction. Timelines vary with complexity, but many straightforward residential purchases complete within roughly{' '}
                  <span className="text-[#cfd5de]">[PLACEHOLDER]</span> weeks from promise of sale to deed, subject to searches and
                  financing.
                </p>
                <p className="text-[13px] text-[#9aa3ae]">
                  Elevate works with trusted notaries and legal advisors. Contact us for introductions.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0]">Working with Elevate</h2>
                <p className="mb-4">
                  We operate as {siteConfig.companyName}, with the franchise and network context of ZANZI and Quick Lets where your mandate
                  benefits from it. Our role is to shortlist credibly, arrange private access, and keep communication discreet and efficient.
                </p>
                <p className="mb-6">
                  If this guide aligns with your stage of research, the natural next step is a confidential conversation about your budget,
                  timeline, and non-negotiables—before you engage notaries or sellers formally.
                </p>
                <Link
                  to="/#contact"
                  className="inline-flex min-h-[48px] items-center justify-center border border-white/[0.14] bg-white/[0.04] px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-ivory transition-colors hover:border-[rgba(0,159,227,0.45)] hover:bg-white/[0.07] hover:text-[#e8eaee]"
                >
                  Arrange a private consultation
                </Link>
              </section>

              <p className="text-center">
                <Link
                  to="/guides"
                  className="inline-flex min-h-[44px] items-center justify-center px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9ea6b0] transition-colors hover:text-[#e8eaee]"
                >
                  ← All guides
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
