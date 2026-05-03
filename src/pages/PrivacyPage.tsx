import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/site';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black scroll-smooth overflow-x-hidden font-sans">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16">
        <section
          id="privacy"
          className="scroll-anchor-target border-t border-gold/20 bg-[#070707]"
          aria-labelledby="privacy-heading"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <p className="text-[10px] text-gold font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/60 inline-block" aria-hidden="true" />
              For our clients &amp; visitors
            </p>
            <h1 id="privacy-heading" className="text-2xl sm:text-3xl md:text-4xl font-playfair text-white leading-tight mb-4">
              Privacy &amp; data handling
            </h1>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-10 max-w-2xl">
              {siteConfig.companyName} serves a discerning Malta and EU audience. This page describes, in plain language, how we treat the
              information you share when you reach out through our website. It is not legal advice; if you need formal counsel, please speak
              with your own adviser.
            </p>

            <div className="space-y-10 text-sm text-white/60 font-light leading-relaxed">
              <div className="border border-gold/15 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-gold/90 font-semibold mb-4">What we collect</h2>
                <p className="mb-4 text-white/55">
                  When you submit a contact enquiry, request a viewing, or ask us to list a property, we may receive:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-gold/50">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your telephone number</li>
                  <li>The message or notes you include with your enquiry</li>
                  <li>
                    Where relevant, details about a property — for example when you brief us as a seller, or when you request a viewing and
                    tell us which listing you have in mind
                  </li>
                </ul>
                <p className="mt-4 text-white/45 text-xs leading-relaxed">
                  Technical information (such as the page you submitted from) may be passed through our form tools so we can respond in
                  context. We do not use this page to track you across unrelated websites.
                </p>
              </div>

              <div className="border border-gold/15 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-gold/90 font-semibold mb-4">Why we collect it</h2>
                <p className="mb-4 text-white/55">We use this information only for legitimate business purposes, including to:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-gold/50">
                  <li>Respond to your enquiries with care and accuracy</li>
                  <li>Arrange private viewings and follow up with you afterwards</li>
                  <li>Review and evaluate requests from prospective sellers</li>
                  <li>Provide tailored property advisory services where you have asked us to assist</li>
                </ul>
              </div>

              <div className="border border-gold/15 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-gold/90 font-semibold mb-4">Confidentiality</h2>
                <p className="text-white/55">
                  Enquiries are handled confidentially within {siteConfig.companyName}. We do not sell personal data, and we share details only
                  with colleagues or trusted partners where it is necessary to progress your request — for example to confirm a viewing or to
                  prepare a valuation.
                </p>
              </div>

              <div className="border border-gold/15 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-gold/90 font-semibold mb-4">Correction &amp; deletion</h2>
                <p className="text-white/55">
                  If you would like us to correct or delete information we hold from a website enquiry, please write to us at{' '}
                  <a href={siteConfig.emailHref} className="text-gold/80 hover:text-gold underline-offset-4 hover:underline break-all">
                    {siteConfig.emailDisplay}
                  </a>
                  , or call the concierge lines shown in the footer. We will handle reasonable requests promptly, subject to any legal or
                  professional obligations we may need to respect.
                </p>
              </div>

              <p className="text-[11px] text-white/40 leading-relaxed pt-2 border-t border-white/10">
                Laws and expectations around privacy differ by country. We aim to meet sensible standards for clients in Malta and across the
                EU, but this summary does not describe every legal right or every scenario — it is a courtesy overview only.
              </p>

              <p className="text-center pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 border border-gold/35 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition-colors touch-manipulation"
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
