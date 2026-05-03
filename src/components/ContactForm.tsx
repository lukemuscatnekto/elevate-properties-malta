import { motion } from 'motion/react';
import { Phone, Mail, Clock, MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { siteConfig } from '../config/site';
import { submitForm, FORM_HONEYPOT_FIELD } from '../utils/formSubmission';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';
import FormHoneypot from './FormHoneypot';

export default function ContactForm() {
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
    'w-full min-h-[48px] bg-white/4 border border-white/8 px-5 py-3 sm:py-4 text-white text-sm font-light placeholder:text-white/15 focus:border-gold/40 outline-none transition-colors';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <section id="contact" className="scroll-anchor-target py-8 px-4 sm:px-8 bg-[#070707] relative overflow-hidden border-t border-gold/20" aria-labelledby="contact-heading">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(197,160,82,0.04),transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* ── Left: contact info ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] text-gold font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/60 inline-block" aria-hidden="true" />
                Concierge access
              </p>
              <h2 id="contact-heading" className="text-2xl md:text-3xl font-playfair text-white mb-4 leading-tight">
                Start a private conversation
              </h2>
              <p className="text-white/40 text-sm font-light leading-relaxed max-w-md mb-6">
                Message our advisers for Malta buying, leasing, divestment timing, portfolio expansion, pricing context, and introductions to
                professional partners you appoint — at whatever stage you are at today.
              </p>
            </motion.div>

            {/* Contact details — dual advisers */}
            <div className="space-y-6 mb-6">
              {[siteConfig.contacts.primary, siteConfig.contacts.secondary].map((c) => (
                <div key={c.name} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-white/8 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-400 shrink-0">
                    <Phone className="w-5 h-5 text-gold" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gold/60 uppercase tracking-[0.3em] font-bold mb-1">{c.name}</p>
                    <a href={c.phoneHref} className="text-white text-base font-light hover:text-gold transition-colors tracking-wide block truncate">
                      {c.phoneDisplay}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
                <a
                  href={siteConfig.primaryWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold/35 px-5 min-h-[48px] text-[10px] font-bold uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-black transition-colors touch-manipulation shrink-0"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp — {siteConfig.contacts.primary.name}
                </a>
                <span className="text-[11px] text-white/48 font-light self-center max-w-[200px]">
                  Or WhatsApp{' '}
                  <a href={siteConfig.contacts.secondary.whatsappHref} className="text-gold hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    {siteConfig.contacts.secondary.name}
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-5 group pt-3 border-t border-white/10">
                <div className="w-12 h-12 rounded-full border border-white/8 flex items-center justify-center group-hover:border-gold/40 shrink-0">
                  <Mail className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gold/60 uppercase tracking-[0.3em] font-bold mb-1">Direct email</p>
                  <a href={siteConfig.emailHref} className="text-white text-base font-light hover:text-gold transition-colors tracking-wide break-all">
                    {siteConfig.emailDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full border border-white/8 flex items-center justify-center group-hover:border-gold/40 shrink-0">
                  <Clock className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] text-gold/60 uppercase tracking-[0.3em] font-bold mb-1">Consultation hours</p>
                  <p className="text-white text-base font-light">{siteConfig.openingHours}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 max-w-md">
              <p className="text-white/42 text-[12px] font-light leading-relaxed">
                Nico Dalton and Luke Muscat field inbound enquiries alongside the team. After hours, WhatsApp reaches Nico primarily; for viewing
                windows or sensitive matters, escalate discreetly whenever required.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0D0D0D] border border-gold/18 p-5 sm:p-6 md:p-7 relative"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-gold/30 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold/30 pointer-events-none" aria-hidden="true" />

              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                  role="status"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/8 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-playfair text-white mb-4">We have your enquiry</h3>
                  <p className="text-white/50 font-light leading-relaxed max-w-sm mx-auto text-sm">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-gold text-[10px] font-bold uppercase tracking-[0.35em] hover:text-white transition-colors min-h-[44px] touch-manipulation"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-[10px] text-gold/60 uppercase tracking-[0.3em] font-bold mb-1">Property Enquiry</p>
                    <h3 className="text-2xl font-playfair text-white">Tell our advisers what matters</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 relative" aria-label="Property enquiry form">
                    <FormHoneypot idSuffix="contact" value={honeypot} onChange={setHoneypot} />
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="cf-name" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Full Name</label>
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
                        <label htmlFor="cf-email" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Email Address</label>
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
                      <label htmlFor="cf-phone" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Phone</label>
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
                        <label htmlFor="cf-type" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Enquiry Type</label>
                        <select
                          id="cf-type"
                          value={formData.type}
                          onChange={e => setFormData({ ...formData, type: e.target.value })}
                          className={selectCls}
                        >
                          <option value="buying"     className="bg-[#0D0D0D]">Buying</option>
                          <option value="selling"    className="bg-[#0D0D0D]">Selling</option>
                          <option value="renting"    className="bg-[#0D0D0D]">Renting</option>
                          <option value="investment" className="bg-[#0D0D0D]">Investment</option>
                          <option value="valuation"  className="bg-[#0D0D0D]">Valuation</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="cf-budget" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Budget Range</label>
                        <select
                          id="cf-budget"
                          value={formData.budget}
                          onChange={e => setFormData({ ...formData, budget: e.target.value })}
                          className={selectCls}
                        >
                          <option value="1-3"  className="bg-[#0D0D0D]">€1M – €3M</option>
                          <option value="3-10" className="bg-[#0D0D0D]">€3M – €10M</option>
                          <option value="10+"  className="bg-[#0D0D0D]">€10M+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="cf-message" className="text-[9px] text-gold/60 uppercase tracking-[0.25em] font-bold block">Your Message</label>
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
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-gold hover:bg-white text-black py-4 font-bold uppercase tracking-[0.28em] text-[10px] transition-all disabled:opacity-50 group touch-manipulation"
                    >
                      {formState === 'submitting' ? 'Sending…' : (
                        <>
                          Send to our advisers
                          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-[10px] text-white/42 text-center leading-relaxed px-2 max-w-md mx-auto">{formDiscretionFootnote}</p>
                    {formState === 'error' && (
                      <div className="text-[11px] text-red-200 text-center break-words space-y-2 px-2" role="alert">
                        <p>{successMessage}</p>
                        <p className="text-[10px] text-white/40 font-light">{formTechnicalFailureHint}</p>
                      </div>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
