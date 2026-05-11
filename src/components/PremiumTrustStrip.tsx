import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const defaultItems = [
  {
    title: 'Premium advisory',
    body: 'Bespoke service for discerning clients.',
  },
  {
    title: 'Official Zanzi franchise',
    body: "Aligned with Malta's trusted real-estate network.",
  },
  {
    title: 'Quick Lets network',
    body: 'Lettings intelligence when your mandate requires it.',
  },
  {
    title: 'Local expertise',
    body: 'Deep market knowledge and proven local insight.',
  },
] as const;

const previewCinematicItems = [
  {
    title: 'Official ZANZI franchise',
    body: 'Trusted Malta execution.',
  },
  {
    title: 'Elevate advisory',
    body: 'Private buyers and sellers.',
  },
  {
    title: 'Malta-wide',
    body: 'Curated introductions.',
  },
] as const;

export default function PremiumTrustStrip() {
  const elevatePreview = useElevatePreviewMode();
  const items = elevatePreview ? previewCinematicItems : defaultItems;

  return (
    <section
      className={`relative border-t px-4 sm:px-6 lg:px-8 ${
        elevatePreview
          ? 'border-white/[0.05] bg-[#060608] py-4 sm:py-5'
          : 'border-white/[0.06] bg-[#080a10] py-3 sm:py-3.5'
      }`}
      aria-labelledby="premium-trust-strip-heading"
    >
      <h2 id="premium-trust-strip-heading" className="sr-only">
        Brand credentials
      </h2>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.2)] to-transparent opacity-90"
        aria-hidden="true"
      />
      <div
        className={`relative mx-auto flex max-w-6xl flex-col divide-y divide-white/[0.07] sm:flex-row sm:divide-x sm:divide-y-0 ${
          elevatePreview ? 'gap-0' : 'gap-0'
        }`}
      >
        {items.map(({ title, body }) => (
          <div
            key={title}
            className={`min-w-0 flex-1 px-3 py-3 text-center sm:px-5 sm:py-2.5 sm:text-left ${elevatePreview ? 'sm:first:pl-2' : ''}`}
          >
            <p className="font-playfair text-[11px] font-normal leading-snug tracking-[0.04em] text-[#e8eaee] sm:text-xs">{title}</p>
            <p className="mt-1 text-[10px] font-light leading-relaxed text-[#9ea6b0] sm:text-[11px]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
