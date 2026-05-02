import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site';

const isConfiguredExternalUrl = (value: string) => value.startsWith('http') && !value.includes('TODO');

export default function Footer() {
  const socials = [
    { Icon: Facebook, url: siteConfig.facebookUrl, label: 'Elevate Properties Malta on Facebook' },
    { Icon: Instagram, url: siteConfig.instagramUrl, label: 'Elevate Properties Malta on Instagram' },
    { Icon: Linkedin, url: siteConfig.linkedinUrl, label: 'Elevate Properties Malta on LinkedIn' },
  ] as const;
  const anySocialConfigured = socials.some((s) => isConfiguredExternalUrl(s.url));

  return (
    <footer className="bg-black border-t border-gold/20 py-8 px-4 sm:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          <div>
            <p className="text-xl font-playfair tracking-[0.28em] text-white">ELEVATE</p>
            <p className="text-[9px] tracking-[0.34em] text-gold uppercase">Properties Malta</p>
            <p className="mt-4 text-[11px] text-white/40 font-light leading-relaxed max-w-xs">
              Boutique luxury residential advisory in Malta — private valuations, curated listings, and discreet representation for buyers,
              sellers, and investors.
            </p>
          </div>

          <div className="text-xs text-white/70 space-y-3">
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold transition-colors touch-manipulation">
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" /> {siteConfig.phoneDisplay}
            </a>
            <a href={siteConfig.emailHref} className="flex items-start gap-2 hover:text-gold transition-colors break-all touch-manipulation">
              <Mail className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" aria-hidden="true" /> <span>{siteConfig.emailDisplay}</span>
            </a>
            <p className="flex items-start gap-2 text-white/50">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" aria-hidden="true" />{' '}
              <span>{siteConfig.address}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 pt-1">{siteConfig.openingHours}</p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/70" aria-label="Footer">
            <a href="#hero" className="hover:text-gold py-1 touch-manipulation">
              Home
            </a>
            <a href="#properties" className="hover:text-gold py-1 touch-manipulation">
              Buy
            </a>
            <a href="#list-property" className="hover:text-gold py-1 touch-manipulation">
              Sell
            </a>
            <a href="#services" className="hover:text-gold py-1 touch-manipulation">
              Services
            </a>
            <a href="#trust" className="hover:text-gold py-1 touch-manipulation">
              How we work
            </a>
            <a href="#contact" className="hover:text-gold py-1 touch-manipulation">
              Contact
            </a>
          </nav>

          <div className="flex flex-col gap-3 justify-start lg:items-end lg:text-right">
            {anySocialConfigured ? (
              <div className="flex items-center gap-3 lg:justify-end">
                {socials.map(({ Icon, url, label }) =>
                  isConfiguredExternalUrl(url) ? (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 min-h-[36px] min-w-[36px] border border-gold/30 hover:border-gold text-gray-400 hover:text-gold transition-all flex items-center justify-center touch-manipulation"
                      aria-label={label}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : null,
                )}
              </div>
            ) : (
              <p className="text-[10px] text-white/35 leading-relaxed max-w-[240px] lg:ml-auto">
                Social profile URLs are not set yet — add Instagram, Facebook, and LinkedIn in <code className="text-gold/50 text-[9px]">src/config/site.ts</code>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 text-center leading-relaxed max-w-3xl mx-auto">
            Elevate Properties Malta provides marketing material for illustrative purposes only. Nothing on this site constitutes financial,
            legal, or investment advice — seek independent counsel before committing to a transaction.
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 text-center">
            © {new Date().getFullYear()} {siteConfig.companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
