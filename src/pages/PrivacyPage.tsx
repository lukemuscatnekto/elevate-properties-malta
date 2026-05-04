import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/site';

const PRIVACY_TITLE = 'Privacy & Data Handling | Elevate Properties Malta';
const PRIVACY_DESCRIPTION =
  'How Elevate Properties Malta handles contact details, viewing requests, and seller enquiries submitted through this website — Malta and EU visitors.';

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
    <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal scroll-smooth overflow-x-hidden font-sans">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16">
        <section
          id="privacy"
          className="scroll-anchor-target border-t border-brand-bronze-dark/25 bg-brand-brown-dark"
          aria-labelledby="privacy-heading"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <p className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-copper/55 inline-block" aria-hidden="true" />
              For our clients &amp; visitors
            </p>
            <h1 id="privacy-heading" className="text-2xl sm:text-3xl md:text-4xl font-playfair text-brand-ivory leading-tight mb-4">
              Privacy &amp; data handling
            </h1>
            <p className="text-brand-sand font-light text-sm leading-relaxed mb-10 max-w-2xl">
              {siteConfig.companyName} serves a discerning Malta and EU audience. This page describes, in plain language, how we treat the
              information you share when you reach out through our website. It is not legal advice; if you need formal counsel, please speak
              with your own adviser.
            </p>

            <div className="space-y-10 text-sm text-brand-sand font-light leading-relaxed">
              <div className="border border-brand-bronze-dark/25 bg-brand-panel/40 p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-brand-champagne font-semibold mb-4">What we collect</h2>
                <p className="mb-4 text-brand-sand">
                  When you submit a contact enquiry, request a viewing, or ask us to list a property, we may receive:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-copper/70">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your telephone number</li>
                  <li>The message or notes you include with your enquiry</li>
                  <li>
                    Where relevant, details about a property — for example when you brief us as a seller, or when you request a viewing and
                    tell us which listing you have in mind
                  </li>
                </ul>
                <p className="mt-4 text-brand-metal text-xs leading-relaxed">
                  Technical information (such as the page you submitted from) may be passed through our form tools so we can respond in
                  context. We do not use this page to track you across unrelated websites.
                </p>
              </div>

              <div className="border border-brand-bronze-dark/25 bg-brand-panel/40 p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-brand-champagne font-semibold mb-4">Why we collect it</h2>
                <p className="mb-4 text-brand-sand">We use this information only for legitimate business purposes, including to:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-copper/70">
                  <li>Respond to your enquiries with care and accuracy</li>
                  <li>Arrange private viewings and follow up with you afterwards</li>
                  <li>Review and evaluate requests from prospective sellers</li>
                  <li>Provide tailored property advisory services where you have asked us to assist</li>
                </ul>
              </div>

              <div className="border border-brand-bronze-dark/25 bg-brand-panel/40 p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-brand-champagne font-semibold mb-4">Confidentiality</h2>
                <p className="text-brand-sand">
                  Enquiries are handled confidentially within {siteConfig.companyName}. We do not sell personal data, and we share details only
                  with colleagues or trusted partners where it is necessary to progress your request — for example to confirm a viewing or to
                  prepare a valuation.
                </p>
              </div>

              <div className="border border-brand-bronze-dark/25 bg-brand-panel/40 p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-brand-champagne font-semibold mb-4">Correction &amp; deletion</h2>
                <p className="text-brand-sand">
                  If you would like us to correct or delete information we hold from a website enquiry, please write to us at{' '}
                  <a href={siteConfig.emailHref} className="text-brand-champagne/90 hover:text-brand-copper underline-offset-4 hover:underline break-all">
                    {siteConfig.emailDisplay}
                  </a>
                  , or call the concierge lines shown in the footer. We will handle reasonable requests promptly, subject to any legal or
                  professional obligations we may need to respect.
                </p>
              </div>

              <p className="text-[11px] text-brand-metal leading-relaxed pt-2 border-t border-brand-bronze-dark/18">
                Laws and expectations around privacy differ by country. We aim to meet sensible standards for clients in Malta and across the
                EU, but this summary does not describe every legal right or every scenario — it is a courtesy overview only.
              </p>

              <p className="text-center pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 border border-brand-bronze-dark/40 bg-brand-panel/35 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-champagne hover:bg-gold hover:text-charcoal transition-colors touch-manipulation"
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
