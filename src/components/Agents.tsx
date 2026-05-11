import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { publicAdvisors, type PublicAdvisor } from '../data/advisors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const portraitFrame =
  'mx-auto shrink-0 overflow-hidden rounded-sm border border-white/[0.07] bg-[#07090d] shadow-[0_10px_32px_rgba(0,0,0,0.22)] md:mx-0';

function AdvisorAvatar({ advisor }: { advisor: PublicAdvisor }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoSrc = advisor.photoSrc;
  const showPhoto = Boolean(photoSrc && !photoFailed);
  const photoAlt = `${advisor.name}, ${advisor.role}`;

  if (showPhoto && photoSrc) {
    return (
      <div className={`${portraitFrame} aspect-[4/5] w-[7.5rem] sm:w-[8.25rem]`}>
        <img
          src={photoSrc}
          alt={photoAlt}
          width={132}
          height={165}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${portraitFrame} flex aspect-[4/5] w-[7.5rem] items-center justify-center sm:w-[8.25rem]`} aria-hidden="true">
      <span className="font-playfair text-xl tracking-[0.12em] text-[#d0d6de] sm:text-2xl">{advisor.initials}</span>
    </div>
  );
}

export default function Agents() {
  const elevatePreview = useElevatePreviewMode();

  return (
    <section
      id="agents"
      className={`scroll-anchor-target relative overflow-hidden border-t border-white/[0.05] bg-[#080a10] px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'border-[rgba(0,159,227,0.06)] py-14 sm:py-[4.5rem]' : 'py-14 sm:py-16'}`}
      aria-labelledby="agents-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_38%_at_50%_0%,rgba(0,159,227,0.04),transparent_52%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-3 flex items-center justify-center gap-3 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[rgba(0,159,227,0.45)]" aria-hidden="true" />
            Private advisors
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[rgba(0,159,227,0.45)]" aria-hidden="true" />
          </p>
          <h2 id="agents-heading" className="mb-3 font-playfair text-2xl leading-tight text-[#f4f4f2] md:text-3xl">
            Discreet guidance, personal service.
          </h2>
          <p className="mx-auto max-w-xl px-1 font-sans text-xs font-light leading-relaxed text-[#b4bcc8] sm:text-sm">
            {elevatePreview
              ? 'Principal advisors field acquisitions, listings, and investment mandates, with discretion calibrated to Malta\'s luxury corridors.'
              : 'Local guidance, premium presentation, and a more personal real-estate experience.'}
          </p>
        </motion.div>

        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 md:gap-7">
          {publicAdvisors.map((advisor, i) => (
            <motion.li
              key={advisor.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col border border-white/[0.06] bg-[#07090d]/92 p-6 sm:p-7 ${elevatePreview ? 'rounded-sm' : ''}`}
            >
              <div className="flex w-full flex-col gap-6 md:flex-row md:items-start">
                <AdvisorAvatar advisor={advisor} />
                <div className="min-w-0 flex-1 space-y-2 text-center md:text-left">
                  <h3 className="font-playfair text-xl text-[#f4f4f2] sm:text-2xl">{advisor.name}</h3>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#009FE3] sm:text-xs sm:tracking-[0.16em]">
                    {advisor.role}
                  </p>
                  <p className="pt-1 font-sans text-sm font-light leading-relaxed text-[#b4bcc8]">{advisor.bio}</p>
                </div>
              </div>

              <div className="mt-6 flex w-full flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-start md:justify-start">
                <a
                  href={advisor.phoneHref}
                  className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 border border-white/[0.08] bg-[#080a10]/90 px-4 font-sans text-[11px] font-light text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.32)] hover:text-[#e8eaee] sm:w-auto"
                  aria-label={`Call ${advisor.name} on ${advisor.phoneDisplay}`}
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#009FE3]" aria-hidden="true" />
                  {advisor.phoneDisplay}
                </a>
                <a
                  href={advisor.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 border border-[rgba(0,159,227,0.22)] bg-[rgba(0,159,227,0.06)] px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.38)] hover:bg-[rgba(0,159,227,0.1)] sm:w-auto"
                  aria-label={`Open WhatsApp to message ${advisor.name}`}
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#009FE3]" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center font-sans text-[11px] font-light leading-relaxed text-[#8e96a3] sm:mt-12 sm:text-xs">
          For discretion, first conversations can be handled by phone, WhatsApp, or private appointment.
        </p>
      </div>
    </section>
  );
}
