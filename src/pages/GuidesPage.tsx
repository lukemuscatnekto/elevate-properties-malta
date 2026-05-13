import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/site';

const GUIDES_TITLE = 'Property Guides | Elevate Properties Malta';
const GUIDES_DESCRIPTION =
  'Editorial guides from the Elevate Properties Malta team — practical context on Malta property for buyers and investors.';

export default function GuidesPage() {
  useEffect(() => {
    const prevTitle = document.title;
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonicalHref = canonical?.getAttribute('href') ?? null;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDescContent = metaDesc?.getAttribute('content') ?? null;

    const base = siteConfig.domainUrl.replace(/\/$/, '');
    document.title = GUIDES_TITLE;
    canonical?.setAttribute('href', `${base}/guides`);
    metaDesc?.setAttribute('content', GUIDES_DESCRIPTION);

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
        <section
          className="scroll-anchor-target relative border-t border-white/[0.06] bg-[#070809]"
          aria-labelledby="guides-index-heading"
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
                <li className="text-[#e8eaee]">Guides</li>
              </ol>
            </nav>

            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#9ea6b0]">
              <span className="inline-block h-px w-8 bg-brand-copper/55" aria-hidden="true" />
              Knowledge
            </p>
            <h1
              id="guides-index-heading"
              className="mb-4 font-playfair text-3xl leading-[1.1] tracking-tight text-brand-ivory sm:text-4xl md:text-[2.6rem]"
            >
              Property Guides
            </h1>
            <p className="mb-12 max-w-2xl text-[15px] font-light leading-relaxed text-[#b4bcc8]">
              Insight and advisory from the Elevate team.
            </p>

            <ul className="list-none space-y-6 p-0">
              <li>
                <Link
                  to="/guides/malta-property-market"
                  className="group block border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-[rgba(0,159,227,0.28)] hover:bg-white/[0.04] sm:p-8"
                >
                  <h2 className="font-playfair text-xl tracking-tight text-[#f4f4f2] transition-colors group-hover:text-[#e8eaee] sm:text-[1.35rem]">
                    The Malta Property Market — A Buyer&apos;s Guide
                  </h2>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-[#aeb4bf]">
                    Everything a discerning buyer or investor needs to know before approaching the Malta property market.
                  </p>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#009FE3]">
                    Read guide <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
