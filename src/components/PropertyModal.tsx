import { motion, AnimatePresence } from 'motion/react';
import { X, Bed, Bath, Maximize, MapPin, Check, Send, Phone, Mail, User, CheckCircle2 } from 'lucide-react';
import type { Property } from '../types';
import { useState, FormEvent, useEffect } from 'react';
import { submitForm, FORM_HONEYPOT_FIELD } from '../utils/formSubmission';
import FormHoneypot from './FormHoneypot';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = property ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [property, onClose]);

  useEffect(() => {
    if (!property) {
      setFormState('idle');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setHoneypot('');
      setSuccessMessage('');
    }
  }, [property]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!property) return;
    setFormState('submitting');
    const result = await submitForm('viewing', {
      ...formData,
      [FORM_HONEYPOT_FIELD]: honeypot,
      propertyTitle: property.title,
      propertyId: property.id,
      propertyPrice: property.formattedPrice,
      propertyLocation: property.location,
    });
    setSuccessMessage(result.message);
    setFormState(result.success ? 'success' : 'error');
  };

  const inputCls =
    'w-full min-h-[48px] bg-brand-panel/75 border border-white/12 py-3 sm:py-4 pl-11 pr-4 text-brand-ivory text-xs placeholder:text-brand-metal/75 focus:border-brand-copper/55 outline-none transition-colors';

  return (
    <AnimatePresence>
      {property && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-espresso/94 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            role="document"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[min(92dvh,920px)] bg-brand-charcoal border border-white/10 shadow-[0_40px_80px_rgba(8,10,14,0.75)] overflow-hidden flex flex-col lg:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close property details"
              className="absolute top-4 right-4 z-[110] min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-espresso/80 border border-white/14 hover:bg-brand-copper/16 hover:border-brand-copper/45 text-brand-ivory transition-all focus:outline-none focus:ring-2 focus:ring-brand-copper/55 touch-manipulation"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="lg:w-[55%] relative h-52 sm:h-64 lg:h-auto lg:min-h-[320px] shrink-0 overflow-hidden">
              <img src={property.image} alt={`${property.title}, ${property.location}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" aria-hidden="true" />

              <div className="absolute bottom-6 left-6 right-6">
                {property.tag && (
                  <span className="inline-block px-4 py-1 border border-white/14 bg-black/45 text-brand-silver text-[9px] font-bold uppercase tracking-[0.26em] mb-3">
                    {property.tag}
                  </span>
                )}
                <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl text-brand-ivory font-playfair font-light leading-snug">
                  {property.title}
                </h2>
              </div>
            </div>

            <div className="lg:w-[45%] flex-1 overflow-y-auto bg-brand-brown-dark border-l border-white/10 custom-scrollbar min-h-0">
              <div className="p-6 md:p-8 space-y-6 pb-10">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
                    <p className="text-2xl sm:text-3xl text-brand-copper font-playfair tabular-nums">{property.formattedPrice}</p>
                    <address className="flex items-center gap-1.5 text-brand-metal not-italic text-[10px] uppercase tracking-[0.2em]">
                      <MapPin className="w-3.5 h-3.5 text-brand-copper/55 shrink-0" aria-hidden="true" />
                      <span className="break-words">{property.location}, Malta</span>
                    </address>
                  </div>

                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/10" aria-label="Property specifications">
                    {[
                      { Icon: Bed, val: property.beds, label: 'Beds' },
                      { Icon: Bath, val: property.baths, label: 'Baths' },
                      { Icon: Maximize, val: `${property.sqft}m²`, label: 'Area' },
                    ].map(({ Icon, val, label }) => (
                      <div key={label} className="text-center group">
                        <Icon className="w-4 h-4 text-brand-copper/65 group-hover:text-brand-champagne mx-auto mb-2 transition-colors" aria-hidden="true" />
                        <p className="text-brand-ivory text-sm sm:text-base font-light">{val}</p>
                        <p className="text-[9px] text-brand-metal uppercase tracking-widest">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-brand-champagne/80 uppercase tracking-[0.3em] font-bold mb-2">Overview</p>
                  <p className="text-brand-sand text-sm font-light leading-relaxed">{property.description}</p>
                  <p className="mt-4 text-[10px] font-light leading-relaxed text-brand-metal">
                    Properties shown are representative of our advisory portfolio and are subject to availability. Contact Elevate Properties
                    Malta for current status and private opportunities.
                  </p>
                </div>

                {property.features?.length ? (
                  <div>
                    <p className="text-[10px] text-brand-champagne/80 uppercase tracking-[0.3em] font-bold mb-3">Highlights</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-brand-copper/10 border border-brand-copper/25 flex items-center justify-center shrink-0" aria-hidden="true">
                            <Check className="w-2.5 h-2.5 text-brand-copper" />
                          </span>
                          <span className="text-brand-sand text-xs font-light">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="border-t border-white/10 pt-6">
                  <p className="text-[10px] text-brand-champagne/80 uppercase tracking-[0.3em] font-bold mb-2">Arrange a Private Viewing</p>
                  <p className="text-brand-metal text-[11px] font-light leading-relaxed mb-5">
                    Submit your details and an advisor from Elevate Properties Malta will contact you to confirm availability and next steps.
                  </p>

                  {formState === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 border border-white/10 bg-brand-panel/50 px-4"
                    >
                      <CheckCircle2 className="w-10 h-10 text-brand-copper mx-auto mb-4" aria-hidden="true" />
                      <p className="text-brand-ivory font-playfair text-xl mb-2">Viewing request received</p>
                      <p className="text-brand-sand text-sm font-light break-words max-w-xs mx-auto">{successMessage}</p>
                      <button
                        type="button"
                        onClick={() => setFormState('idle')}
                        className="mt-5 inline-flex min-h-[48px] items-center justify-center px-8 border border-white/14 bg-brand-panel text-brand-champagne text-[10px] uppercase font-bold tracking-[0.28em] hover:bg-brand-muted hover:border-brand-copper/50 hover:text-brand-ivory transition-colors touch-manipulation"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 relative" aria-label="Request a private viewing for this property">
                      <FormHoneypot idSuffix="modal" value={honeypot} onChange={setHoneypot} />
                      <div className="relative group">
                        <label htmlFor="modal-name" className="sr-only">
                          Full name
                        </label>
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-copper/35 group-focus-within:text-brand-copper transition-colors" aria-hidden="true" />
                        <input
                          id="modal-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Full name"
                          className={inputCls}
                        />
                      </div>
                      <div className="relative group">
                        <label htmlFor="modal-email" className="sr-only">
                          Email
                        </label>
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-copper/35 group-focus-within:text-brand-copper transition-colors" aria-hidden="true" />
                        <input
                          id="modal-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email address"
                          className={inputCls}
                        />
                      </div>
                      <div className="relative group">
                        <label htmlFor="modal-phone" className="sr-only">
                          Phone
                        </label>
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-copper/35 group-focus-within:text-brand-copper transition-colors" aria-hidden="true" />
                        <input
                          id="modal-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Phone number"
                          className={inputCls}
                        />
                      </div>
                      <div className="relative group">
                        <label htmlFor="modal-message" className="text-[10px] text-white/38 uppercase tracking-widest font-bold mb-2 block sr-only">
                          Notes (optional)
                        </label>
                        <textarea
                          id="modal-message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Preferred days or times — or questions before we confirm the viewing."
                          className={`${inputCls} min-h-[88px] py-3 pl-4 resize-none`}
                          autoComplete="off"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="epm-btn-primary w-full flex items-center justify-center gap-2.5 py-4 tracking-[0.3em] text-[10px] transition-all disabled:opacity-50 group touch-manipulation min-h-[48px]"
                      >
                        {formState === 'submitting' ? (
                          'Sending…'
                        ) : (
                          <>
                            Request a Private Viewing
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                          </>
                        )}
                      </button>
                      {formState === 'error' && (
                        <div className="text-[11px] text-red-200/95 text-center break-words space-y-1" role="alert">
                          <p>{successMessage}</p>
                          <p className="text-[10px] text-brand-metal font-light">{formTechnicalFailureHint}</p>
                        </div>
                      )}
                      <p className="text-[10px] text-brand-metal text-center break-words leading-relaxed">{formDiscretionFootnote}</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
