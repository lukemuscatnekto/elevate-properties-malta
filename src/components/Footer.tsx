import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const isConfiguredExternalUrl = (value: string) => value.startsWith('http') && !value.includes('TODO');

export default function Footer() {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const socials = [
    { Icon: Facebook, url: siteConfig.facebookUrl, label: 'Elevate Properties Malta on Facebook' },
    { Icon: Instagram, url: siteConfig.instagramUrl, label: 'Elevate Properties Malta on Instagram' },
    { Icon: Linkedin, url: siteConfig.linkedinUrl, label: 'Elevate Properties Malta on LinkedIn' },
  ] as const;
  const FOOTER_ICON_MARK = '/images/elevate-logos/04_icon_mark_quick_lets_transparent.png';
  const anySocialConfigured = socials.some((s) => isConfiguredExternalUrl(s.url));

  const { primary, secondary } = siteConfig.contacts;

  return (
    <footer
      className="relative border-t border-white/[0.06] bg-[#050608] px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      role="contentinfo"
    >
      {!elevatePreview ? <div className="epm-accent-line absolute inset-x-0 top-0" aria-hidden="true" /> : null}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-start gap-3">
              <img
                src={FOOTER_ICON_MARK}
                alt=""
                width={88}
                height={88}
                decoding="async"
                loading="lazy"
                className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).classList.add('hidden');
                }}
              />
              <span
                className="h-10 w-px shrink-0 self-center bg-gradient-to-b from-[rgba(0,159,227,0.6)] via-[rgba(232,234,238,0.2)] to-[rgba(176,132,228,0.55)] sm:h-11"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="font-playfair text-xl leading-none tracking-[0.14em] text-[#f4f4f2] sm:text-[1.35rem] sm:tracking-[0.16em]">
                  ELEVATE
                </p>
                <p className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-[#c5cad2] sm:text-[9.5px] sm:tracking-[0.2em]">
                  by <span className="font-semibold text-[#009FE3]">ZANZI</span>
                  <span className="text-[#eef1f6]"> & </span>
                  <span className="font-semibold text-[#c9a8f0]">QUICK LETS</span>
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#9ea6b0] sm:text-[8.5px] sm:tracking-[0.24em]">
                  Properties Malta
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs font-sans text-[11px] font-light leading-relaxed text-[#b4bcc8] sm:text-xs">
              {elevatePreview
                ? 'Elevate-led Malta property advisory: acquisitions, owner-direct listings, mandates, and valuations with measured execution.'
                : 'Premium Malta real estate with private advisory, refined marketing, and trusted local backing.'}
            </p>
            <p className={`mt-3 leading-relaxed ${elevatePreview ? 'text-[10px] font-light tracking-normal text-[#8e96a3]' : 'text-[9px] uppercase tracking-[0.16em] text-[#8e96a3] sm:tracking-[0.2em]'}`}>
              Official Franchise · <span className="text-[#009FE3]">ZANZI</span> &amp; <span className="text-[#c9a8f0]">QUICK LETS</span> · Malta
            </p>
          </div>

          <div className="text-xs text-brand-sand space-y-4 md:col-span-2 lg:col-span-5">
            <p className={`mb-3 ${elevatePreview ? 'text-[11px] font-light tracking-wide text-[#aeb4bf]' : 'font-sans text-[11px] font-medium tracking-[0.12em] text-[#9ea6b0]'}`}>
              Concierge · direct lines
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-1.5 border-l border-[rgba(0,159,227,0.12)] pl-4">
                <p className={`mb-1 ${elevatePreview ? 'text-[10px] font-light tracking-wide text-[#c5cad2]' : 'font-sans text-[11px] font-medium tracking-wide text-[#aeb4bf]'}`}>{primary.name}</p>
                <a href={primary.phoneHref} className="flex touch-manipulation items-center gap-2 font-light text-[#f4f4f2] transition-colors hover:text-[#e8eaee]">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#009FE3]" aria-hidden="true" /> {primary.phoneDisplay}
                </a>
              </div>
              <div className="space-y-1.5 border-l border-[rgba(0,159,227,0.1)] pl-4">
                <p className={`mb-1 ${elevatePreview ? 'text-[10px] font-light tracking-wide text-[#9ea6b0]' : 'font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]'}`}>{secondary.name}</p>
                <a href={secondary.phoneHref} className="flex touch-manipulation items-center gap-2 font-light text-[#f4f4f2] opacity-95 transition-colors hover:text-[#e8eaee]">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#009FE3] opacity-75" aria-hidden="true" /> {secondary.phoneDisplay}
                </a>
              </div>
            </div>

            <a
              href={siteConfig.primaryWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[48px] touch-manipulation items-center justify-center gap-2 border border-[rgba(0,159,227,0.28)] bg-[rgba(0,159,227,0.08)] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.42)] hover:bg-[rgba(0,159,227,0.12)]"
              aria-label="Open WhatsApp with Nico Dalton (primary WhatsApp)"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              WhatsApp: {primary.name}
            </a>
            <p className="text-[9px] text-brand-metal">
              Prefer Luke on WhatsApp?{' '}
              <a href={secondary.whatsappHref} className="text-[#009FE3] underline-offset-4 hover:text-[#e8eaee] hover:underline" target="_blank" rel="noopener noreferrer">
                Chat with {secondary.name}
              </a>
            </p>

            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#009FE3] opacity-75" aria-hidden="true" />
                <a href={siteConfig.emailHref} className="text-[11px] sm:text-xs text-brand-ivory hover:text-brand-champagne transition-colors break-all leading-snug">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <p className="flex items-start gap-2 text-brand-sand text-[11px]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#009FE3]" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </p>
              <p className={`pl-6 text-[10px] text-brand-metal ${elevatePreview ? 'font-light tracking-normal' : 'uppercase tracking-[0.2em]'}`}>{siteConfig.openingHours}</p>
            </div>
          </div>

          <nav
            className={`flex flex-wrap gap-x-4 gap-y-1.5 text-[#c5cad2] sm:gap-x-5 sm:gap-y-2 ${anySocialConfigured ? 'lg:col-span-2' : 'lg:col-span-4'} ${
              elevatePreview ? 'text-[11px] font-light tracking-wide' : 'font-sans text-[10px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em]'
            }`}
            aria-label="Footer"
          >
            <a href={anchorHref(pathname, '#hero')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Home
            </a>
            <a href={anchorHref(pathname, '#properties')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Properties
            </a>
            <a href={anchorHref(pathname, '#properties')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Featured
            </a>
            <a href={anchorHref(pathname, '#list-property')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              List property
            </a>
            <a href={anchorHref(pathname, '#services')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Services
            </a>
            <a href={anchorHref(pathname, '#trust')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Advisory
            </a>
            <a href={anchorHref(pathname, '#agents')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Advisors
            </a>
            <a href={anchorHref(pathname, '#contact')} className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Contact
            </a>
            <Link to="/privacy" className="inline-flex min-h-[44px] touch-manipulation items-center py-1 hover:text-[#e8eaee]">
              Legal
            </Link>
          </nav>

          {anySocialConfigured ? (
            <div className="flex flex-col gap-3 justify-start lg:items-end lg:text-right lg:col-span-2">
              <div className="flex items-center gap-3 lg:justify-end">
                {socials.map(({ Icon, url, label }) =>
                  isConfiguredExternalUrl(url) ? (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center border border-white/[0.12] text-[#9ea6b0] transition-all hover:border-[rgba(0,159,227,0.35)] hover:text-[#e8eaee]"
                      aria-label={label}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : null,
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2">
          <p className={`text-center leading-relaxed max-w-3xl mx-auto ${elevatePreview ? 'text-[10px] font-light tracking-normal text-brand-metal' : 'text-[10px] uppercase tracking-[0.18em] text-brand-metal'}`}>
            Elevate Properties Malta provides marketing material for illustrative purposes only. Nothing on this site constitutes
            financial, legal, or investment advice. Seek independent counsel before committing to a transaction.
          </p>
          <p className={`text-center ${elevatePreview ? 'text-[10px] font-light tracking-wide text-brand-metal' : 'text-[10px] uppercase tracking-[0.18em] text-brand-metal'}`}>
            © {new Date().getFullYear()} Elevate Properties Malta
          </p>
        </div>
      </div>
    </footer>
  );
}
