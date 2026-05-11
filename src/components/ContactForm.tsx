import { motion } from 'motion/react';
import { Phone, Mail, Clock, MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { siteConfig } from '../config/site';
import { submitForm, FORM_HONEYPOT_FIELD } from '../utils/formSubmission';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';
import FormHoneypot from './FormHoneypot';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

export default function ContactForm() {
  const elevatePreview = useElevatePreviewMode();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'buying',
    budget: '1-3',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    const result = await submitForm('contact', { ...formData, [FORM_HONEYPOT_FIELD]: honeypot });
    setSuccessMessage(result.message);
    setFormState(result.success ? 'success' : 'error');
  };

  const inputCls =
    'w-full min-h-[48px] bg-[#080a0f]/85 border border-white/[0.1] px-5 py-3 sm:py-4 text-[#f4f4f2] text-sm font-light placeholder:text-[#6f7a88] focus:border-[rgba(0,159,227,0.5)] outline-none transition-colors';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <section
      id="contact"
      className={`scroll-anchor-target relative overflow-hidden border-t px-4 sm:px-6 lg:px-8 ${
        elevatePreview
          ? 'border-white/[0.06] bg-[#050608] py-12 sm:py-14'
          : 'border-white/[0.06] bg-[#07090d] py-14 sm:py-16'
      }`}
      aria-labelledby="contact-heading"
    >
      {!elevatePreview ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,159,227,0.055),transparent_50%)]"
          aria-hidden="true"
        />
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.2)] to-transparent" aria-hidden="true" />
      )}

      <div className={`relative z-10 mx-auto ${elevatePreview ? 'max-w-lg' : 'max-w-7xl'}`}>
        <div className={`grid grid-cols-1 ${elevatePreview ? 'gap-8' : 'gap-10 lg:grid-cols-2 lg:gap-14'}`}>

          {/* ── Left: glass enquiry form (Luma) ── */}
          <div className="relative order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative border ${elevatePreview ? 'rounded-xl border-[rgba(0,159,227,0.12)] bg-[#08090b]/92 p-6 backdrop-blur-md sm:p-7' : 'border-white/[0.1] bg-[#080a0f]/88 p-5 sm:p-6 md:p-7'}`}
            >
              {!elevatePreview ? (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.28)] to-transparent" aria-hidden="true" />
              ) : null}

              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                  role="status"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(0,159,227,0.28)] bg-[rgba(0,159,227,0.08)]">
                    <CheckCircle2 className="h-8 w-8 text-[#009FE3]" aria-hidden="true" />
                  </div>
                  <h2 id={elevatePreview ? 'contact-heading' : undefined} className="text-2xl font-playfair text-brand-ivory mb-4">
                    Private enquiry received
                  </h2>
                  <p className="text-brand-sand font-light leading-relaxed max-w-sm mx-auto text-sm">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="mt-8 inline-flex min-h-[48px] touch-manipulation items-center justify-center border border-white/[0.12] bg-[#0a0c10]/90 px-8 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4f4f2] transition-colors hover:border-[rgba(0,159,227,0.45)] hover:bg-[#0c0e12]"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  {elevatePreview ? (
                    <div className="mb-6 text-center">
                      <h2 id="contact-heading" className="font-playfair text-2xl text-brand-ivory md:text-[1.75rem]">
                        Enquire
                      </h2>
                      <p className="mt-2 text-[13px] font-light text-brand-sand">Serious buyers, sellers, and investors.</p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.12em] text-[#9ea6b0]">Private consultation request</p>
                      <h3 className="font-playfair text-2xl text-[#f4f4f2]">How can we help you?</h3>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="relative space-y-3" aria-label="Property enquiry form">
                    <FormHoneypot idSuffix="contact" value={honeypot} onChange={setHoneypot} />
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="cf-name" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                          Full name
                        </label>
                        <input
                          id="cf-name"
                          required
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="cf-email" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                          Email
                        </label>
                        <input
                          id="cf-email"
                          required
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="cf-phone" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                        Phone
                      </label>
                      <input
                        id="cf-phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+356 ..."
                        className={inputCls}
                      />
                    </div>

                    {/* Type + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="cf-type" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                          Interest
                        </label>
                        <select
                          id="cf-type"
                          value={formData.type}
                          onChange={e => setFormData({ ...formData, type: e.target.value })}
                          className={selectCls}
                        >
                          <option value="buying" className="bg-brand-panel">Buying a property</option>
                          <option value="selling" className="bg-brand-panel">Selling a property</option>
                          <option value="renting" className="bg-brand-panel">Renting a property</option>
                          <option value="letting" className="bg-brand-panel">Letting a property</option>
                          <option value="valuation" className="bg-brand-panel">Requesting a valuation</option>
                          <option value="viewing" className="bg-brand-panel">Booking a viewing</option>
                          <option value="investment" className="bg-brand-panel">Investment guidance</option>
                          <option value="general" className="bg-brand-panel">General enquiry</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="cf-budget" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                          Budget range
                        </label>
                        <select
                          id="cf-budget"
                          value={formData.budget}
                          onChange={e => setFormData({ ...formData, budget: e.target.value })}
                          className={selectCls}
                        >
                          <option value="1-3"  className="bg-brand-panel">€1M – €3M</option>
                          <option value="3-10" className="bg-brand-panel">€3M – €10M</option>
                          <option value="10+"  className="bg-brand-panel">€10M+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="cf-message" className="mb-1 block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                        Message
                      </label>
                      <textarea
                        id="cf-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your ideal property or investment goals…"
                        className={`${inputCls} min-h-[120px] resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="epm-btn-primary group flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-3 py-4 text-[10px] tracking-[0.22em] transition-opacity disabled:opacity-50 sm:tracking-[0.24em]"
                    >
                      {formState === 'submitting' ? (
                        'Sending…'
                      ) : (
                        <>
                          Send private enquiry
                          <MessageSquare className="h-4 w-4 opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    <p className="mx-auto max-w-md px-2 text-center font-sans text-[11px] font-light leading-relaxed text-[#8e96a3]">{formDiscretionFootnote}</p>
                    {formState === 'error' && (
                      <div className="text-[11px] text-red-200 text-center break-words space-y-2 px-2" role="alert">
                        <p>{successMessage}</p>
                        <p className="text-[10px] text-brand-metal font-light">{formTechnicalFailureHint}</p>
                      </div>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>

          {/* ── Right: Get In Touch card ── */}
          {!elevatePreview ? (
          <div className="order-2 lg:pl-2">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/[0.09] bg-[#080a0f]/75 p-6 sm:p-8"
            >
              <p className="mb-3 flex items-center gap-3 font-sans text-[11px] font-medium tracking-[0.12em] text-[#9ea6b0]">
                <span className="inline-block h-px w-8 bg-[rgba(0,159,227,0.55)]" aria-hidden="true" />
                Concierge
              </p>
              <h2 id="contact-heading" className="mb-3 font-playfair text-2xl leading-tight text-[#f4f4f2] md:text-3xl">
                Get in touch
              </h2>
              <p className="mb-8 max-w-md font-sans text-sm font-light leading-relaxed text-[#b4bcc8]">
                Speak with an Elevate advisor: share what you are looking for and our team will guide you privately.
              </p>

              <div className="mb-8 space-y-6">
                {[siteConfig.contacts.primary, siteConfig.contacts.secondary].map((c) => (
                  <div key={c.name} className="group flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1] transition-colors group-hover:border-[rgba(0,159,227,0.35)]">
                      <Phone className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]">{c.name}</p>
                      <a href={c.phoneHref} className="block truncate text-base font-light tracking-wide text-[#f4f4f2] transition-colors hover:text-white">
                        {c.phoneDisplay}
                      </a>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
                  <a
                    href={siteConfig.primaryWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] shrink-0 items-center gap-2 border border-[rgba(0,159,227,0.28)] bg-[rgba(0,159,227,0.08)] px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f4f4f2] transition-colors hover:bg-[rgba(0,159,227,0.14)] touch-manipulation"
                  >
                    <MessageCircle className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
                    WhatsApp: {siteConfig.contacts.primary.name}
                  </a>
                  <span className="max-w-[210px] self-center text-[11px] font-light text-[#aeb4bf]">
                    Or WhatsApp{' '}
                    <a href={siteConfig.contacts.secondary.whatsappHref} className="text-[#009FE3] underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                      {siteConfig.contacts.secondary.name}
                    </a>
                  </span>
                </div>

                <div className="flex items-start gap-4 border-t border-white/[0.06] pt-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1]">
                    <Mail className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]">Direct email</p>
                    <a href={siteConfig.emailHref} className="break-all text-base font-light tracking-wide text-[#f4f4f2] transition-colors hover:text-white">
                      {siteConfig.emailDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1]">
                    <Clock className="h-4 w-4 text-[#009FE3]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-[11px] font-medium tracking-wide text-[#9ea6b0]">Consultation hours</p>
                    <p className="text-base font-light text-[#f4f4f2]">{siteConfig.openingHours}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-6">
                <p className="text-[12px] font-light leading-relaxed text-[#8e96a3]">
                  Nico Dalton and Luke Muscat field inbound enquiries alongside the team. After hours, WhatsApp reaches Nico primarily; for viewing
                  windows or sensitive matters, escalate discreetly whenever required.
                </p>
              </div>
            </motion.div>
          </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
