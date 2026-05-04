import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { publicAdvisors } from '../data/advisors';

export default function Agents() {
  return (
    <section
      id="agents"
      className="scroll-anchor-target py-10 sm:py-12 px-4 sm:px-8 bg-[#060606] border-t border-gold/20"
      aria-labelledby="agents-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-[10px] text-gold font-bold uppercase tracking-[0.35em] mb-3 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold/50" aria-hidden="true" />
            People
            <span className="w-8 h-px bg-gold/50" aria-hidden="true" />
          </p>
          <h2 id="agents-heading" className="text-2xl sm:text-3xl md:text-[2.1rem] font-playfair text-white leading-tight mb-3">
            Meet Your Advisors
          </h2>
          <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Direct access to the people handling your property conversation.
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
              className="border border-gold/18 bg-[#0B0B0B] p-6 sm:p-7 flex flex-col items-center text-center md:items-stretch md:text-left"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5 w-full">
                <div
                  className="mx-auto md:mx-0 shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full border border-gold/35 bg-black/80 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-playfair text-lg sm:text-xl text-gold tracking-[0.12em]">{advisor.initials}</span>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-lg sm:text-xl font-playfair text-white">{advisor.name}</h3>
                  <p className="text-[10px] text-gold/75 uppercase tracking-[0.22em] font-semibold">{advisor.role}</p>
                  <p className="text-white/42 text-xs sm:text-sm font-light leading-relaxed pt-1">{advisor.bio}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.07] w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a
                  href={advisor.phoneHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 border border-white/12 text-white/85 text-[11px] font-light hover:border-gold/40 hover:text-gold transition-colors touch-manipulation"
                  aria-label={`Call ${advisor.name} on ${advisor.phoneDisplay}`}
                >
                  <Phone className="w-3.5 h-3.5 text-gold/70 shrink-0" aria-hidden="true" />
                  {advisor.phoneDisplay}
                </a>
                <a
                  href={advisor.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 border border-gold/35 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition-colors touch-manipulation"
                  aria-label={`Open WhatsApp to message ${advisor.name}`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 sm:mt-10 text-center text-[11px] sm:text-xs text-white/35 font-light leading-relaxed max-w-2xl mx-auto">
          For discretion, first conversations can be handled by phone, WhatsApp, or private appointment.
        </p>
      </div>
    </section>
  );
}
