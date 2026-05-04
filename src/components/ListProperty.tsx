import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { submitForm, FORM_HONEYPOT_FIELD } from '../utils/formSubmission';
import FormHoneypot from './FormHoneypot';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';
import { anchorHref } from '../utils/routeAnchors';

const listFieldCls =
  'w-full min-h-[44px] bg-brand-muted/35 border border-brand-bronze-dark/22 px-4 py-3 text-xs text-brand-ivory placeholder:text-brand-metal/75 outline-none focus:border-brand-copper/50 transition-colors';

const sellerBenefits = [
  {
    title: 'Private Representation',
    body: 'Selective exposure, carefully handled introductions, and a process shaped around discretion.',
  },
  {
    title: 'Qualified Buyers',
    body: 'Enquiries are filtered carefully so viewings are purposeful and aligned with your positioning.',
  },
  {
    title: 'Presentation Strategy',
    body: 'Photography, marketing materials, and property narrative are prepared to reflect the home properly.',
  },
  {
    title: 'End-to-End Coordination',
    body: 'From first briefing through negotiation and onward coordination, every step is handled with structure.',
  },
] as const;

export default function ListProperty() {
  const { pathname } = useLocation();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    const result = await submitForm('valuation', { ...formData, [FORM_HONEYPOT_FIELD]: honeypot });
    setSuccessMessage(result.message);
    setFormState(result.success ? 'success' : 'error');
  };

  return (
    <section id="list-property" className="scroll-anchor-target py-10 sm:py-12 px-4 sm:px-8 bg-brand-brown-dark relative overflow-hidden border-t border-brand-bronze-dark/25" aria-labelledby="list-heading">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

        <div className="flex flex-col min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.45em] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-brand-copper/60 inline-block" aria-hidden="true" />
            Sell with Distinction
          </motion.p>

          <motion.h2
            id="list-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-playfair text-brand-ivory leading-tight mb-4"
          >
            Private Representation
            <br />
            <span className="italic font-light text-brand-copper">for Exceptional Homes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-brand-sand text-sm sm:text-base font-light leading-relaxed max-w-lg mb-8"
          >
            If you own a property of distinction in Malta, we invite you to explore what a truly private,
            bespoke selling experience looks like. We do not advertise widely — we represent selectively.
          </motion.p>

          <div className="bg-brand-panel border border-brand-bronze-dark/25 p-5 sm:p-6 flex-1 flex flex-col">
            <div className="h-[1px] w-12 bg-brand-copper/45 mb-6 shrink-0" aria-hidden="true" />
            <p className="text-[10px] text-brand-champagne/90 uppercase tracking-[0.3em] font-bold mb-5">Request a Confidential Valuation</p>

            {formState === 'success' ? (
              <div className="flex items-start gap-4 py-4" role="status">
                <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-brand-ivory text-sm font-medium mb-1">Briefing logged</p>
                  <p className="text-brand-sand text-xs font-light leading-relaxed break-words">{successMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 relative flex-1 flex flex-col" aria-label="Confidential valuation request">
                <FormHoneypot idSuffix="list" value={honeypot} onChange={setHoneypot} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lp-name" className="sr-only">Your name</label>
                    <input
                      id="lp-name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      autoComplete="name"
                      className={listFieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="lp-email" className="sr-only">Email address</label>
                    <input
                      id="lp-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      autoComplete="email"
                      className={listFieldCls}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lp-phone" className="sr-only">Phone</label>
                  <input
                    id="lp-phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone (incl. country code)"
                    className={listFieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="lp-location" className="sr-only">Property location</label>
                  <input
                    id="lp-location"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Property locality or address (area-level is fine)"
                    className={listFieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="lp-message" className="sr-only">Message</label>
                  <textarea
                    id="lp-message"
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Anything we should know — timing, tenure, rough guide price…"
                    className={`${listFieldCls} min-h-[88px] resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="epm-btn-primary w-full min-h-[48px] py-4 tracking-[0.3em] text-[10px] disabled:opacity-50 touch-manipulation mt-auto"
                >
                  {formState === 'submitting' ? 'Sending…' : 'Submit confidential briefing'}
                </button>
                {formState === 'error' && (
                  <div className="text-[11px] text-red-200 text-center break-words space-y-1" role="alert">
                    <p>{successMessage}</p>
                    <p className="text-[10px] text-brand-metal font-light">{formTechnicalFailureHint}</p>
                  </div>
                )}
              </form>
            )}
            <p className="text-[10px] text-brand-metal text-center leading-relaxed mt-5 pt-4 border-t border-brand-bronze-dark/18">{formDiscretionFootnote}</p>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          aria-labelledby="seller-panel-kicker"
          className="lg:sticky lg:top-28 self-start border border-brand-bronze-dark/30 bg-brand-taupe p-6 sm:p-8 flex flex-col h-fit min-h-0 w-full"
        >
          <p id="seller-panel-kicker" className="text-[10px] text-brand-champagne font-bold uppercase tracking-[0.32em] mb-4">
            What sellers can expect
          </p>
          <h3 className="text-lg sm:text-xl font-playfair text-brand-ivory leading-snug mb-6">
            Quiet representation with disciplined execution.
          </h3>
          <div className="space-y-0 flex-1">
            {sellerBenefits.map(({ title, body }, i) => (
              <div
                key={title}
                className={`py-4 ${i > 0 ? 'border-t border-brand-bronze-dark/15' : ''}`}
              >
                <p className="text-[11px] sm:text-xs font-semibold text-brand-ivory/95 tracking-wide mb-1.5">{title}</p>
                <p className="text-[11px] sm:text-sm text-brand-sand font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 pt-6 border-t border-brand-bronze-dark/20 text-[11px] sm:text-xs text-brand-metal font-light leading-relaxed">
            We do not rely on mass-market noise when a more considered route better protects the asset.
          </p>
          <p className="mt-5 text-center">
            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex items-center justify-center min-h-[44px] px-5 w-full sm:w-auto border border-brand-bronze-dark/40 bg-brand-panel/40 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-champagne hover:bg-gold hover:text-charcoal transition-colors touch-manipulation"
            >
              Speak with us first
            </a>
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
