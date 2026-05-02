import { motion } from 'motion/react';
import { ShieldCheck, Target, Camera, Key, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { submitForm } from '../utils/formSubmission';
import { formDiscretionFootnote, formTechnicalFailureHint } from '../content/formFootnotes';

const pillars = [
  {
    Icon: Camera,
    title: 'Cinematic Presentation',
    desc: 'Professional HDR photography and cinematic drone footage that captures the true character of your home.',
  },
  {
    Icon: ShieldCheck,
    title: 'Vetted Buyers Only',
    desc: 'Every prospective buyer is discreetly qualified before a single viewing is arranged.',
  },
  {
    Icon: Target,
    title: 'Global Reach',
    desc: 'Your property placed before a curated network of international high-net-worth buyers and investors.',
  },
  {
    Icon: Key,
    title: 'End-to-End Service',
    desc: 'From first consultation through to legal completion — we manage every detail on your behalf.',
  },
];

export default function ListProperty() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', location: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    const result = await submitForm('valuation', formData);
    setSuccessMessage(result.message);
    setFormState(result.success ? 'success' : 'error');
  };

  return (
    <section id="list-property" className="scroll-anchor-target py-10 sm:py-12 px-4 sm:px-8 bg-[#070707] relative overflow-hidden border-t border-gold/20" aria-labelledby="list-heading">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* ── Left: copy + pillars + form ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-gold font-bold uppercase tracking-[0.45em] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-gold/60 inline-block" aria-hidden="true" />
            Sell with Distinction
          </motion.p>

          <motion.h2
            id="list-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-playfair text-white leading-tight mb-4"
          >
            Private Representation
            <br />
            <span className="italic font-light text-gold">for Exceptional Homes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/45 text-sm sm:text-base font-light leading-relaxed max-w-lg mb-8"
          >
            If you own a property of distinction in Malta, we invite you to explore what a truly private,
            bespoke selling experience looks like. We do not advertise widely — we represent selectively.
          </motion.p>

          {/* Pillars */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" aria-label="Our selling approach">
            {pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gold/6 border border-gold/15 flex items-center justify-center shrink-0" aria-hidden="true">
                  <p.Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold mb-1">{p.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed font-light">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Express enquiry form */}
          <div className="bg-[#0D0D0D] border border-gold/15 p-5 sm:p-6">
            <div className="h-[1px] w-12 bg-gold/40 mb-6" aria-hidden="true" />
            <p className="text-[10px] text-gold/70 uppercase tracking-[0.3em] font-bold mb-5">Request a Confidential Valuation</p>

            {formState === 'success' ? (
              <div className="flex items-start gap-4 py-4" role="status">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white text-sm font-medium mb-1">Briefing logged</p>
                  <p className="text-gray-400 text-xs font-light leading-relaxed break-words">{successMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" aria-label="Confidential valuation request">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="lp-name" className="sr-only">Your name</label>
                    <input
                      id="lp-name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      autoComplete="name"
                      className="w-full min-h-[44px] bg-black/60 border border-white/8 px-4 py-3 text-xs text-white placeholder:text-white/20 outline-none focus:border-gold/35 transition-colors"
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
                      className="w-full min-h-[44px] bg-black/60 border border-white/8 px-4 py-3 text-xs text-white placeholder:text-white/20 outline-none focus:border-gold/35 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lp-location" className="sr-only">Property location</label>
                    <input
                      id="lp-location"
                      required
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Property Location"
                      className="w-full min-h-[44px] bg-black/60 border border-white/8 px-4 py-3 text-xs text-white placeholder:text-white/20 outline-none focus:border-gold/35 transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full min-h-[48px] bg-gold hover:bg-white text-black py-4 font-bold uppercase tracking-[0.3em] text-[10px] transition-all disabled:opacity-50 touch-manipulation"
                >
                  {formState === 'submitting' ? 'Sending…' : 'Submit confidential briefing'}
                </button>
                {formState === 'error' && (
                  <div className="text-[11px] text-red-200 text-center break-words space-y-1" role="alert">
                    <p>{successMessage}</p>
                    <p className="text-[10px] text-white/40 font-light">{formTechnicalFailureHint}</p>
                  </div>
                )}
              </form>
            )}
            <p className="text-[10px] text-white/38 text-center leading-relaxed mt-5 pt-4 border-t border-white/6">{formDiscretionFootnote}</p>
            {import.meta.env.DEV && (
              <p className="text-[9px] text-white/25 text-center mt-4 leading-relaxed break-words border-t border-white/5 pt-3">
                Dev: set <code className="text-gold/60">VITE_FORM_PROVIDER</code> and endpoint in <code className="text-gold/60">.env</code> — see README
                (Formspree / Netlify / EmailJS).
              </p>
            )}
          </div>
        </div>

        {/* ── Right: image + testimonial ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group lg:sticky lg:top-28"
        >
          <div className="relative aspect-[4/5] overflow-hidden border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1628592102751-ba83b03bc995?auto=format&fit=crop&q=80&w=1200"
              alt="Elegantly appointed luxury interior — high ceilings, natural stone, bespoke finishes"
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />

            <aside className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 bg-black/84 backdrop-blur-md border border-gold/15 p-5 sm:p-6 max-h-[52vh] sm:max-h-none overflow-y-auto shadow-2xl">
              <p className="text-[9px] text-gold/75 uppercase tracking-[0.28em] font-bold mb-3">Selling in Malta?</p>
              <ul className="text-[11px] sm:text-xs text-white/65 font-light leading-relaxed space-y-2 list-disc list-inside">
                <li>Valuations consider micro-location, covenant strength, tenancy (if applicable), capex allowances, comparable evidence, not algorithmic guesses.</li>
                <li>Buyers introduced only after prudent qualification — safeguarding your diary and doorstep.</li>
                <li>Materials and tours follow your approvals; nothing broadcasts without consent.</li>
              </ul>
              <p className="mt-4 text-[10px] text-white/38 leading-relaxed">
                Professional legal tax and structuring advice stays with licensed practitioners you nominate — Elevate concentrates on transactional representation plus marketing choreography.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 border border-gold/35 text-[9px] font-bold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition-colors touch-manipulation"
                >
                  Speak with us first
                </a>
              </div>
            </aside>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold/30 pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-gold/30 pointer-events-none" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
