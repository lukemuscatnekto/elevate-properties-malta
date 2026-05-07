import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { anchorHref } from '../utils/routeAnchors';

const isConfiguredExternalUrl = (value: string) => value.startsWith('http') && !value.includes('TODO');

export default function Footer() {
  const { pathname } = useLocation();
  const socials = [
    { Icon: Facebook, url: siteConfig.facebookUrl, label: 'Elevate by Zanzi on Facebook' },
    { Icon: Instagram, url: siteConfig.instagramUrl, label: 'Elevate by Zanzi on Instagram' },
    { Icon: Linkedin, url: siteConfig.linkedinUrl, label: 'Elevate by Zanzi on LinkedIn' },
  ] as const;
  const anySocialConfigured = socials.some((s) => isConfiguredExternalUrl(s.url));

  const { primary, secondary } = siteConfig.contacts;

  return (
    <footer className="bg-brand-brown-dark border-t border-brand-bronze-dark/25 py-10 px-4 sm:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <p className="text-xl font-playfair tracking-[0.18em] text-brand-ivory">Elevate</p>
            <p className="text-[9px] tracking-[0.3em] text-brand-champagne uppercase">by Zanzi</p>
            <p className="mt-4 text-[11px] text-brand-sand font-light leading-relaxed max-w-xs">
              Premium Malta real estate by Elevate, backed by the trusted property network of Zanzi and Quicklets.
            </p>
            <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-brand-metal">
              Official Zanzi Franchise · Supported by the Quicklets Network · Malta Luxury Real Estate
            </p>
          </div>

          <div className="text-xs text-brand-sand space-y-4 md:col-span-2 lg:col-span-5">
            <p className="text-[10px] text-brand-metal uppercase tracking-[0.26em] font-bold mb-3">Concierge · Direct Lines</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-1.5 border-l border-brand-bronze-dark/30 pl-4">
                <p className="text-[10px] text-brand-champagne/85 uppercase tracking-widest">{primary.name}</p>
                <a href={primary.phoneHref} className="flex items-center gap-2 hover:text-brand-champagne transition-colors touch-manipulation font-light text-brand-ivory">
                  <Phone className="w-3.5 h-3.5 text-brand-copper shrink-0" aria-hidden="true" /> {primary.phoneDisplay}
                </a>
              </div>
              <div className="space-y-1.5 border-l border-brand-bronze-dark/22 pl-4">
                <p className="text-[10px] text-brand-metal uppercase tracking-widest">{secondary.name}</p>
                <a href={secondary.phoneHref} className="flex items-center gap-2 hover:text-brand-champagne transition-colors touch-manipulation font-light text-brand-ivory">
                  <Phone className="w-3.5 h-3.5 text-brand-copper shrink-0 opacity-75" aria-hidden="true" /> {secondary.phoneDisplay}
                </a>
              </div>
            </div>

            <a
              href={siteConfig.primaryWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] border border-brand-bronze-dark/40 bg-brand-panel/35 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-champagne hover:bg-gold hover:text-charcoal transition-colors touch-manipulation mt-3"
              aria-label="Open WhatsApp with Nico Dalton (primary WhatsApp)"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              WhatsApp — {primary.name}
            </a>
            <p className="text-[9px] text-brand-metal">
              Prefer Luke on WhatsApp?{' '}
              <a href={secondary.whatsappHref} className="text-brand-copper/90 hover:text-brand-champagne underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                Chat with {secondary.name}
              </a>
            </p>

            <div className="pt-3 border-t border-brand-bronze-dark/18 space-y-1.5">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-copper shrink-0 mt-0.5 opacity-75" aria-hidden="true" />
                <a href={siteConfig.emailHref} className="text-[11px] sm:text-xs text-brand-ivory hover:text-brand-champagne transition-colors break-all leading-snug">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <p className="flex items-start gap-2 text-brand-sand text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-brand-copper shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-metal pl-6">{siteConfig.openingHours}</p>
            </div>
          </div>

          <nav
            className={`flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-brand-sand ${anySocialConfigured ? 'lg:col-span-2' : 'lg:col-span-4'}`}
            aria-label="Footer"
          >
            <a href={anchorHref(pathname, '#hero')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Properties
            </a>
            <a href={anchorHref(pathname, '#properties')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Featured
            </a>
            <a href={anchorHref(pathname, '#list-property')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              List Property
            </a>
            <a href={anchorHref(pathname, '#services')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Services
            </a>
            <a href={anchorHref(pathname, '#trust')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Advisory
            </a>
            <a href={anchorHref(pathname, '#agents')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Advisors
            </a>
            <a href={anchorHref(pathname, '#contact')} className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
              Contact
            </a>
            <Link to="/privacy" className="inline-flex items-center min-h-[44px] hover:text-brand-champagne py-1 touch-manipulation">
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
                      className="min-h-[44px] min-w-[44px] w-11 border border-brand-bronze-dark/35 hover:border-brand-copper text-brand-metal hover:text-brand-champagne transition-all flex items-center justify-center touch-manipulation"
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

        <div className="mt-8 pt-6 border-t border-brand-bronze-dark/15 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand-metal text-center leading-relaxed max-w-3xl mx-auto">
            Elevate by Zanzi provides marketing material for illustrative purposes only. Nothing on this site constitutes financial,
            legal, or investment advice — seek independent counsel before committing to a transaction.
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand-metal text-center">
            © {new Date().getFullYear()} {siteConfig.companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
