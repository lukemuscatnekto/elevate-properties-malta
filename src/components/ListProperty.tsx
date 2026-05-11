import { motion } from 'motion/react';
import { CheckCircle2, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { submitForm, FORM_HONEYPOT_FIELD } from '../utils/formSubmission';
import FormHoneypot from './FormHoneypot';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';
import { anchorHref } from '../utils/routeAnchors';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';
import { HERO_PROPERTY_TYPE_OPTIONS } from '../data/heroSearchFieldOptions';

const listFieldCls =
  'w-full min-h-[44px] bg-[#07090d]/92 border border-white/[0.07] px-4 py-3 text-xs text-[#f4f4f2] placeholder:text-[#6f7a88] outline-none focus:border-[rgba(0,159,227,0.45)] transition-colors';

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
  const elevatePreview = useElevatePreviewMode();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    askingPrice: '',
    bedrooms: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    const detailBlock = [
      formData.propertyType && `Property type: ${formData.propertyType}`,
      formData.askingPrice && `Asking price (guide): ${formData.askingPrice}`,
      formData.bedrooms && `Bedrooms: ${formData.bedrooms}`,
    ]
      .filter(Boolean)
      .join('\n');
    const composedMessage = [formData.message.trim(), detailBlock].filter(Boolean).join('\n\n— Listing details —\n');

    const result = await submitForm('valuation', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      message: composedMessage,
      [FORM_HONEYPOT_FIELD]: honeypot,
    });
    setSuccessMessage(result.message);
    setFormState(result.success ? 'success' : 'error');
  };

  return (
    <section
      id="list-property"
      className={`scroll-anchor-target relative overflow-hidden border-t border-white/[0.05] px-4 sm:px-6 lg:px-8 ${elevatePreview ? 'bg-[#070809] pb-12 pt-12 sm:pb-14 sm:pt-14' : 'bg-[#080a10] pb-14 pt-12 sm:pb-16 sm:pt-14'}`}
      aria-labelledby="list-heading"
    >
      {!elevatePreview ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_75%_18%,rgba(0,159,227,0.045),transparent_50%)]"
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`relative mx-auto grid grid-cols-1 items-stretch ${elevatePreview ? 'max-w-2xl gap-8' : 'max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14'}`}
      >
        <div className="flex min-w-0 flex-col">
          {!elevatePreview ? (
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-5 flex items-center gap-3 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]"
            >
              <span className="h-px w-8 bg-gradient-to-r from-[rgba(0,159,227,0.45)] to-transparent" aria-hidden="true" />
              Seller advisory
            </motion.p>
          ) : null}

          <motion.h2
            id="list-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-playfair text-brand-ivory leading-tight mb-4 ${elevatePreview ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'}`}
          >
            {elevatePreview ? 'Confidential listing' : 'List Your Property With Elevate by Zanzi'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className={`text-brand-sand font-light leading-relaxed mb-8 ${elevatePreview ? 'max-w-md text-sm' : 'max-w-lg text-sm sm:text-base'}`}
          >
            {elevatePreview
              ? 'Premium presentation · discreet buyer qualification.'
              : 'Request a confidential valuation and discover how your property can be positioned with premium presentation and trusted backing.'}
          </motion.p>

          <div
            className={`flex flex-1 flex-col ${elevatePreview ? 'rounded-sm border border-[rgba(0,159,227,0.12)] bg-[#080a10]/96 p-5 sm:p-6' : 'border border-white/[0.06] bg-[#080a10]/95 p-5 sm:p-6'}`}
          >
            {!elevatePreview ? (
              <div className="mb-5 h-px w-12 shrink-0 bg-gradient-to-r from-[rgba(0,159,227,0.5)] to-transparent" aria-hidden="true" />
            ) : null}
            <p className={`mb-5 ${elevatePreview ? 'text-[12px] font-light text-[#aeb6c0]' : 'font-sans text-[11px] font-medium tracking-wide text-[#c5cad2]'}`}>
              Request confidential valuation
            </p>

            {formState === 'success' ? (
              <div className="flex items-start gap-4 py-4" role="status">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#009FE3]" aria-hidden="true" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lp-property-type" className="sr-only">Property type</label>
                    <select
                      id="lp-property-type"
                      required
                      value={formData.propertyType}
                      onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                      className={`${listFieldCls} min-h-[48px]`}
                    >
                      <option value="" disabled className="bg-brand-panel">
                        Property type
                      </option>
                      {HERO_PROPERTY_TYPE_OPTIONS.filter((o) => o.value !== 'any').map((o) => (
                        <option key={o.value} value={o.label} className="bg-brand-panel">
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lp-bedrooms" className="sr-only">Bedrooms</label>
                    <select
                      id="lp-bedrooms"
                      required
                      value={formData.bedrooms}
                      onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                      className={`${listFieldCls} min-h-[48px]`}
                    >
                      <option value="" disabled className="bg-brand-panel">
                        Bedrooms
                      </option>
                      {['Studio', '1', '2', '3', '4', '5+'].map((b) => (
                        <option key={b} value={b} className="bg-brand-panel">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="lp-location" className="sr-only">Property location</label>
                  <input
                    id="lp-location"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Location (locality or area)"
                    className={listFieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="lp-asking-price" className="sr-only">Asking price</label>
                  <input
                    id="lp-asking-price"
                    required
                    value={formData.askingPrice}
                    onChange={e => setFormData({ ...formData, askingPrice: e.target.value })}
                    placeholder="Asking price or guide (e.g. €1.2M or POA)"
                    className={listFieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="lp-message" className="sr-only">Property details / message</label>
                  <textarea
                    id="lp-message"
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Property details, tenure, preferred timeline, parking, finishes…"
                    className={`${listFieldCls} min-h-[88px] resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="epm-btn-primary w-full min-h-[48px] py-4 tracking-[0.3em] text-[10px] disabled:opacity-50 touch-manipulation mt-auto"
                >
                  {formState === 'submitting' ? 'Sending…' : 'Request Confidential Valuation'}
                </button>
                {formState === 'error' && (
                  <div className="text-[11px] text-red-200 text-center break-words space-y-1" role="alert">
                    <p>{successMessage}</p>
                    <p className="text-[10px] text-brand-metal font-light">{formTechnicalFailureHint}</p>
                  </div>
                )}
              </form>
            )}
            <p className="text-[10px] text-brand-metal text-center leading-relaxed mt-5 pt-4 border-t border-white/[0.06]">{formDiscretionFootnote}</p>
          </div>
        </div>

        {!elevatePreview ? (
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          aria-labelledby="list-contact-kicker"
          className="h-fit min-w-0 w-full self-start border border-white/[0.06] bg-[#07090d]/92 p-6 sm:p-8 lg:sticky lg:top-28"
        >
          <p id="list-contact-kicker" className="mb-3 flex items-center gap-3 font-sans text-[11px] font-medium tracking-[0.12em] text-[#9ea6b0]">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-white/35" aria-hidden="true" />
            Get in touch
          </p>
          <h3 className="mb-6 font-playfair text-xl leading-snug text-[#f4f4f2] sm:text-2xl">Prefer to speak before listing?</h3>

          <div className="mb-8 space-y-5">
            {[siteConfig.contacts.primary, siteConfig.contacts.secondary].map((c) => (
              <div key={c.name} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-[#080a10]/40">
                  <Phone className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]">{c.name}</p>
                  <a href={c.phoneHref} className="block truncate text-sm font-light text-[#f4f4f2] hover:text-white">
                    {c.phoneDisplay}
                  </a>
                </div>
              </div>
            ))}
            <a
              href={siteConfig.primaryWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-[rgba(0,159,227,0.22)] bg-[rgba(0,159,227,0.06)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.34)] hover:bg-[rgba(0,159,227,0.1)] touch-manipulation"
            >
              <MessageCircle className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
              WhatsApp — {siteConfig.contacts.primary.name}
            </a>
            <div className="flex items-start gap-3 border-t border-white/[0.06] pt-5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#009FE3]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.26em] text-[#9ea5b0]">Email</p>
                <a href={siteConfig.emailHref} className="break-all text-sm font-light text-[#f4f4f2] hover:text-white">
                  {siteConfig.emailDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#009FE3]" aria-hidden="true" />
              <div>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.26em] text-[#9ea5b0]">Hours</p>
                <p className="text-sm font-light text-[#f4f4f2]">{siteConfig.openingHours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="mb-4 font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]">What sellers can expect</p>
            <ul className="space-y-3 text-[11px] font-light leading-relaxed text-[#aeb4bf]">
              {sellerBenefits.slice(0, 4).map(({ title, body }) => (
                <li key={title}>
                  <span className="font-semibold text-[#e2e4e9]">{title}</span> — {body}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 border-t border-white/[0.06] pt-6 text-center text-[10px] font-light leading-relaxed text-[#8e96a3]">
            Discreet handling · Premium presentation · Trusted local backing.
          </p>
          <p className="mt-4 text-center">
            <a
              href={anchorHref(pathname, '#contact')}
              className="inline-flex min-h-[44px] w-full items-center justify-center border border-white/[0.08] bg-[#080a10]/90 px-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.32)] touch-manipulation sm:w-auto"
            >
              Full enquiry form
            </a>
          </p>
        </motion.aside>
        ) : null}
      </div>
    </section>
  );
}
