import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { appendBriefingRequest } from '../utils/briefingRequestsStorage';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const CONFIRMATION =
  'Thank you. A member of the Elevate team will be in touch shortly.';

const inputCls =
  'w-full min-h-[48px] bg-[#07090d]/92 border border-white/[0.07] px-5 py-3 sm:py-4 text-[#f4f4f2] text-sm font-light placeholder:text-[#6f7a88] focus:border-[rgba(0,159,227,0.45)] outline-none transition-colors';

function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function MarketBriefingOptIn() {
  const elevatePreview = useElevatePreviewMode();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const name = firstName.trim();
    const em = email.trim();
    if (!name) {
      setError('Please enter your first name.');
      return;
    }
    if (!em || !isValidEmail(em)) {
      setError('Please enter a valid email address.');
      return;
    }
    appendBriefingRequest({ name, email: em });
    setStatus('success');
  };

  return (
    <section
      id="market-briefing"
      className={`scroll-anchor-target relative border-t border-white/[0.05] px-4 sm:px-6 lg:px-8 ${
        elevatePreview ? 'bg-[#070809] py-12 sm:py-14' : 'bg-[#070809] py-12 sm:py-16'
      }`}
      aria-labelledby="market-briefing-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-24px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {!elevatePreview ? (
            <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.14em] text-[#9ea6b0]">Market insight</p>
          ) : null}
          <h2
            id="market-briefing-heading"
            className="mb-3 font-playfair text-[1.5rem] font-normal leading-[1.15] tracking-[0.02em] text-[#f4f4f2] sm:text-2xl md:text-[1.85rem]"
          >
            The Malta Property Market Briefing
          </h2>
          <p className="mb-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-[#aeb4bf] sm:text-[15px]">
            A private quarterly report for qualified buyers and investors. Prepared by the Elevate advisory team and sent
            discreetly to your inbox.
          </p>

          {status === 'success' ? (
            <div
              className="border border-white/[0.08] bg-[#080a10]/90 px-5 py-8 text-center sm:px-8"
              role="status"
              aria-live="polite"
            >
              <p className="font-sans text-sm font-light leading-relaxed text-[#e8eaee]">{CONFIRMATION}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Request the Malta Property Market Briefing">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="mb-first-name" className="block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                    First name
                  </label>
                  <input
                    id="mb-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputCls}
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="mb-email" className="block font-sans text-[12px] font-medium tracking-wide text-[#c5cad2]">
                    Email address
                  </label>
                  <input
                    id="mb-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {error ? (
                <p className="text-[12px] font-light text-red-200/95" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="epm-btn-primary inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center px-8 py-4 text-[10px] tracking-[0.22em] sm:w-auto sm:tracking-[0.24em]"
              >
                Request the Briefing
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
