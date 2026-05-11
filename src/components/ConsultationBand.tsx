import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

export default function ConsultationBand() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();

  return (
    <section
      className={`relative border-t border-white/[0.06] bg-[#060608] px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'border-[rgba(0,159,227,0.08)] py-12 sm:py-14' : 'py-12 sm:py-14'}`}
      aria-labelledby="consultation-band-heading"
    >
      <div className="relative mx-auto max-w-5xl border border-white/[0.09] bg-[#080a0f]/85 px-6 py-8 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.22)] to-transparent" aria-hidden="true" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">Private consultation</p>
            <h2 id="consultation-band-heading" className="mb-2 font-playfair text-2xl leading-tight text-[#f4f4f2] md:text-3xl">
              Ready for your next move?
            </h2>
            <p className="font-sans text-sm font-light leading-relaxed text-[#b4bcc8]">
              {elevatePreview
                ? 'Acquisitions, listings, mandates, or valuations: brief us privately and we respond with pace.'
                : "Let's discuss your property goals in confidence."}
            </p>
            <div className="mt-4 flex flex-col items-center gap-2 font-sans text-xs font-light text-[#aeb4bf] sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
              <a href={siteConfig.contacts.primary.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-[#e8eaee]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#009FE3]" aria-hidden="true" />
                <span className="break-all">{siteConfig.contacts.primary.phoneDisplay}</span>
              </a>
              <a href={siteConfig.emailHref} className="inline-flex items-center gap-2 transition-colors hover:text-[#e8eaee]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#009FE3]" aria-hidden="true" />
                <span className="break-all">{siteConfig.emailDisplay}</span>
              </a>
            </div>
          </div>
          <a
            href={anchorHref(pathname, '#contact')}
            className={`inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center gap-2 whitespace-nowrap border px-6 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors sm:w-auto sm:px-8 sm:tracking-[0.2em] ${
              elevatePreview
                ? 'border-[rgba(0,159,227,0.42)] bg-[rgba(0,159,227,0.1)] text-[#f6f6f4] hover:border-[rgba(0,159,227,0.55)] hover:bg-[rgba(0,159,227,0.14)]'
                : 'border-[rgba(0,159,227,0.38)] bg-[rgba(0,159,227,0.08)] text-[#f4f4f2] hover:border-[rgba(0,159,227,0.55)] hover:bg-[rgba(0,159,227,0.12)]'
            }`}
          >
            Book private consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
