import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';

const isConfiguredExternalUrl = (value: string) => value.startsWith('http') && !value.includes('TODO');

export default function Footer() {
  const socials = [
    { Icon: Facebook, url: siteConfig.facebookUrl, label: 'Elevate Properties Malta on Facebook' },
    { Icon: Instagram, url: siteConfig.instagramUrl, label: 'Elevate Properties Malta on Instagram' },
    { Icon: Linkedin, url: siteConfig.linkedinUrl, label: 'Elevate Properties Malta on LinkedIn' },
  ] as const;
  const anySocialConfigured = socials.some((s) => isConfiguredExternalUrl(s.url));

  const { primary, secondary } = siteConfig.contacts;

  return (
    <footer className="bg-black border-t border-gold/20 py-8 px-4 sm:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <p className="text-xl font-playfair tracking-[0.28em] text-white">ELEVATE</p>
            <p className="text-[9px] tracking-[0.34em] text-gold uppercase">Properties Malta</p>
            <p className="mt-4 text-[11px] text-white/40 font-light leading-relaxed max-w-xs">
              Boutique luxury residential advisory in Malta — private valuations, curated listings, and discreet representation for buyers,
              sellers, and investors.
            </p>
          </div>

          <div className="text-xs text-white/70 space-y-4 md:col-span-2 lg:col-span-5">
            <p className="text-[10px] text-white/35 uppercase tracking-[0.26em] font-bold mb-3">Concierge · Direct Lines</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-1.5 border-l border-gold/20 pl-4">
                <p className="text-[10px] text-gold/70 uppercase tracking-widest">{primary.name}</p>
                <a href={primary.phoneHref} className="flex items-center gap-2 hover:text-gold transition-colors touch-manipulation font-light">
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" /> {primary.phoneDisplay}
                </a>
              </div>
              <div className="space-y-1.5 border-l border-gold/15 pl-4">
                <p className="text-[10px] text-white/38 uppercase tracking-widest">{secondary.name}</p>
                <a href={secondary.phoneHref} className="flex items-center gap-2 hover:text-gold transition-colors touch-manipulation font-light">
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0 opacity-75" aria-hidden="true" /> {secondary.phoneDisplay}
                </a>
              </div>
            </div>

            <a
              href={siteConfig.primaryWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[42px] border border-gold/35 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition-colors touch-manipulation mt-3"
              aria-label="Open WhatsApp with Nico Dalton (primary WhatsApp)"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              WhatsApp — {primary.name}
            </a>
            <p className="text-[9px] text-white/35">
              Prefer Luke on WhatsApp?{' '}
              <a href={secondary.whatsappHref} className="text-gold/60 hover:text-gold underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                Chat with {secondary.name}
              </a>
            </p>

            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5 opacity-75" aria-hidden="true" />
                <a href={siteConfig.emailHref} className="hover:text-gold transition-colors break-all">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <p className="flex items-start gap-2 text-white/50 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 pl-6">{siteConfig.openingHours}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/70 lg:col-span-2" aria-label="Footer">
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

          <div className="flex flex-col gap-3 justify-start lg:items-end lg:text-right lg:col-span-2">
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
              <p className="text-[10px] text-white/35 leading-relaxed max-w-[240px] lg:ml-auto text-left lg:text-right">
                {/* TODO_SOCIAL in site.ts */}
                LinkedIn · Instagram · Facebook URLs not published yet — add <code className="text-gold/50 text-[9px]">https://…</code> links in{' '}
                <code className="text-gold/50 text-[9px]">site.ts</code> when profiles are ready.
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
