import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

const defaultItems = [
  {
    title: 'Premium advisory',
    body: 'Bespoke service for discerning clients.',
  },
  {
    title: 'Official ZANZI franchise',
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
      className="relative border-t border-white/[0.05] bg-[#070809] px-4 py-3 sm:px-6 sm:py-3 lg:px-8"
      aria-labelledby="premium-trust-strip-heading"
    >
      <h2 id="premium-trust-strip-heading" className="sr-only">
        Brand credentials
      </h2>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.16)] to-transparent opacity-90"
        aria-hidden="true"
      />
      <div
        className={`relative mx-auto flex max-w-6xl flex-col divide-y divide-white/[0.05] sm:flex-row sm:divide-x sm:divide-y-0 ${
          elevatePreview ? 'gap-0' : 'gap-0'
        }`}
      >
        {items.map(({ title, body }) => (
          <div
            key={title}
            className={`min-w-0 flex-1 px-3 py-3 text-center sm:px-5 sm:py-2 sm:text-left ${elevatePreview ? 'sm:first:pl-2' : ''}`}
          >
            <p className="font-playfair text-[11.5px] font-normal leading-snug tracking-[0.03em] text-[#eef1f6] sm:text-[11.5px]">{title}</p>
            <p className="mt-0.5 text-[10.5px] font-light leading-relaxed text-[#9aa3ae] sm:text-[10.5px]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
