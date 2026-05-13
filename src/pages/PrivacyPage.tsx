import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/site';

const PRIVACY_TITLE = 'Privacy & Data Handling | Elevate Properties Malta';
const PRIVACY_DESCRIPTION =
  'How Elevate Properties Malta handles contact details, viewing requests, and seller enquiries submitted through this website. Malta and EU visitors.';

export default function PrivacyPage() {
  useEffect(() => {
    const prevTitle = document.title;
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonicalHref = canonical?.getAttribute('href') ?? null;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDescContent = metaDesc?.getAttribute('content') ?? null;

    const base = siteConfig.domainUrl.replace(/\/$/, '');
    document.title = PRIVACY_TITLE;
    canonical?.setAttribute('href', `${base}/privacy`);
    metaDesc?.setAttribute('content', PRIVACY_DESCRIPTION);

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

      <main className="pt-24 sm:pt-28 pb-20">
        <section
          id="privacy"
          className="scroll-anchor-target relative border-t border-white/[0.06] bg-[#070809]"
          aria-labelledby="privacy-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-brand-copper/35 to-transparent"
          />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#9ea6b0] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-copper/55 inline-block" aria-hidden="true" />
              For our clients and visitors
            </p>
            <h1
              id="privacy-heading"
              className="text-3xl sm:text-4xl md:text-[2.6rem] font-playfair text-brand-ivory leading-[1.1] tracking-tight mb-5"
            >
              Privacy and data handling
            </h1>
            <p className="text-[15px] text-[#b4bcc8] font-light leading-relaxed mb-12 max-w-2xl">
              {siteConfig.companyName} serves a discerning Malta and EU audience. This page describes, in plain language, how we treat the
              information you share when you reach out through our website. It is not legal advice; if you need formal counsel, please speak
              with your own adviser.
            </p>

            <div className="space-y-8 text-[14.5px] text-[#b4bcc8] font-light leading-relaxed">
              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0] mb-5">
                  What we collect
                </h2>
                <p className="mb-4">
                  When you submit a buying, selling, renting, letting, valuation, viewing, or investment enquiry, we may receive:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-copper/70">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your telephone number</li>
                  <li>The message or notes you include with your enquiry</li>
                  <li>
                    Where relevant, details about a property: for example when you brief us as a seller, or when you request a viewing and
                    tell us which listing you have in mind
                  </li>
                </ul>
                <p className="mt-4 text-[12.5px] text-[#8e96a3] leading-relaxed">
                  Technical information (such as the page you submitted from) may be passed through our form tools so we can respond in
                  context. We do not use this page to track you across unrelated websites.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0] mb-5">
                  Why we collect it
                </h2>
                <p className="mb-4">We use this information only for legitimate business purposes, including to:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-copper/70">
                  <li>Respond to your enquiries with care and accuracy</li>
                  <li>Arrange private viewings and follow up with you afterwards</li>
                  <li>Review and evaluate requests from prospective sellers</li>
                  <li>Provide tailored property advisory services where you have asked us to assist</li>
                </ul>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0] mb-5">
                  Confidentiality
                </h2>
                <p>
                  Enquiries are handled confidentially within {siteConfig.companyName}. We do not sell personal data, and we share details only
                  with colleagues or trusted partners where it is necessary to progress your request: for example to confirm a viewing or to
                  prepare a valuation.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0] mb-5">
                  Cookies and analytics
                </h2>
                <p className="mb-4">
                  This public marketing site does not load Google Analytics, Meta Pixel, or other third-party advertising or analytics
                  scripts at present, so no cookie banner is required for those tools yet.
                </p>
                <p className="mb-4">
                  We may use{' '}
                  <span className="text-[#e8eaee]">sessionStorage</span> in your browser for lightweight presentation preferences (for
                  example whether you have already seen the homepage intro during the current session). That storage stays on your device
                  and is not used to profile you across unrelated websites.
                </p>
                <p>
                  The separate CRM workspace reachable from this project uses{' '}
                  <span className="text-[#e8eaee]">localStorage</span> for its demo data layer; it is not used to track casual visitors to
                  the public pages. Before any analytics or advertising pixels are added to the live marketing site, we will introduce an
                  appropriate consent flow and update this page accordingly.
                </p>
              </section>

              <section className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9ea6b0] mb-5">
                  Correction and deletion
                </h2>
                <p>
                  If you would like us to correct or delete information we hold from a website enquiry, please write to us at{' '}
                  <a
                    href={siteConfig.emailHref}
                    className="text-brand-ivory hover:text-brand-copper underline underline-offset-4 decoration-white/20 hover:decoration-brand-copper/70 transition-colors break-all"
                  >
                    {siteConfig.emailDisplay}
                  </a>
                  , or call the concierge lines shown in the footer. We will handle reasonable requests promptly, subject to any legal or
                  professional obligations we may need to respect.
                </p>
              </section>

              <p className="text-[11.5px] text-[#8e96a3] leading-relaxed pt-2 border-t border-white/[0.05]">
                Laws and expectations around privacy differ by country. We aim to meet sensible standards for clients in Malta and across the
                EU, but this summary does not describe every legal right or every scenario; it is a courtesy overview only.
              </p>

              <p className="text-center pt-6">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center min-h-[44px] px-7 border border-white/15 bg-white/[0.03] text-[10px] font-bold uppercase tracking-[0.24em] text-brand-ivory hover:border-brand-copper/55 hover:bg-white/[0.06] hover:text-brand-copper transition-colors duration-200 touch-manipulation"
                >
                  Return to home
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
