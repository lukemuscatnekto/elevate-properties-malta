import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { publicAdvisors, type PublicAdvisor } from '../data/advisors';

const avatarFrame =
  'mx-auto md:mx-0 shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full border border-brand-bronze-dark/40 bg-brand-espresso/85 overflow-hidden';

function AdvisorAvatar({ advisor }: { advisor: PublicAdvisor }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoSrc = advisor.photoSrc;
  const showPhoto = Boolean(photoSrc && !photoFailed);
  const photoAlt = `${advisor.name}, ${advisor.role}`;

  if (showPhoto && photoSrc) {
    return (
      <div className={`${avatarFrame} ring-1 ring-brand-bronze-dark/25`}>
        <img
          src={photoSrc}
          alt={photoAlt}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${avatarFrame} flex items-center justify-center`} aria-hidden="true">
      <span className="font-playfair text-lg sm:text-xl text-brand-champagne tracking-[0.12em]">{advisor.initials}</span>
    </div>
  );
}

export default function Agents() {
  return (
    <section
      id="agents"
      className="scroll-anchor-target py-10 px-4 sm:px-8 bg-brand-charcoal border-t border-brand-bronze-dark/25"
      aria-labelledby="agents-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-9 sm:mb-10"
        >
          <p className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.35em] mb-3 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-brand-copper/50" aria-hidden="true" />
            Private Advisors
            <span className="w-8 h-px bg-brand-copper/50" aria-hidden="true" />
          </p>
          <h2 id="agents-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory leading-tight mb-3">
            Meet the Advisors Behind Elevate by Zanzi
          </h2>
          <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Local guidance, premium presentation, and a more personal real-estate experience.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 list-none p-0 m-0">
          {publicAdvisors.map((advisor, i) => (
            <motion.li
              key={advisor.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="border border-brand-bronze-dark/28 bg-brand-panel p-6 sm:p-7 flex flex-col items-center text-center md:items-stretch md:text-left"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5 w-full">
                <AdvisorAvatar advisor={advisor} />
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory">{advisor.name}</h3>
                  <p className="text-[10px] text-brand-copper uppercase tracking-[0.22em] font-semibold">{advisor.role}</p>
                  <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed pt-1">{advisor.bio}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-bronze-dark/20 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a
                  href={advisor.phoneHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 border border-brand-bronze-dark/35 bg-brand-taupe/30 text-brand-ivory/95 text-[11px] font-light hover:border-brand-copper/50 hover:text-brand-champagne transition-colors touch-manipulation"
                  aria-label={`Call ${advisor.name} on ${advisor.phoneDisplay}`}
                >
                  <Phone className="w-3.5 h-3.5 text-brand-copper shrink-0" aria-hidden="true" />
                  {advisor.phoneDisplay}
                </a>
                <a
                  href={advisor.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 border border-brand-bronze-dark/45 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-champagne hover:bg-gold hover:text-charcoal transition-colors touch-manipulation"
                  aria-label={`Open WhatsApp to message ${advisor.name}`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 sm:mt-10 text-center text-[11px] sm:text-xs text-brand-metal font-light leading-relaxed max-w-2xl mx-auto">
          For discretion, first conversations can be handled by phone, WhatsApp, or private appointment.
        </p>
      </div>
    </section>
  );
}
