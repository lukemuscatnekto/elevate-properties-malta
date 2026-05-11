import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Property } from '../types';
import type { HeroSearchCriteria } from '../types/heroSearch';
import { featuredHomepageProperties } from '../data/featuredHomepage';
import PropertyModal from './PropertyModal';
import { anchorHref } from '../utils/routeAnchors';
import { filterPropertiesByHeroCriteria, hasActiveHeroFilter } from '../utils/applyHeroPropertyFilters';
import { useElevatePreviewMode } from '../context/ElevatePreviewContext';

type FeaturedPropertiesProps = {
  heroSearchCriteria: HeroSearchCriteria | null;
};

export default function FeaturedProperties({ heroSearchCriteria }: FeaturedPropertiesProps) {
  const { pathname } = useLocation();
  const elevatePreview = useElevatePreviewMode();
  const [selected, setSelected] = useState<Property | null>(null);

  const open = useCallback((p: Property) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  const filtered = useMemo(() => {
    if (heroSearchCriteria === null) return featuredHomepageProperties;
    return filterPropertiesByHeroCriteria(featuredHomepageProperties, heroSearchCriteria);
  }, [heroSearchCriteria]);

  useEffect(() => {
    setSelected((prev) => {
      if (!prev) return null;
      return filtered.some((p) => p.id === prev.id) ? prev : null;
    });
  }, [filtered]);

  const heroBanner =
    heroSearchCriteria === null
      ? null
      : !hasActiveHeroFilter(heroSearchCriteria)
        ? {
            textBefore: 'Showing featured properties. For a tailored shortlist, ',
            linkLabel: 'contact our advisors',
            textAfter: '.',
          }
        : filtered.length === 0
          ? {
              textBefore:
                'Nothing in our current featured spotlight matches these selections. Adjust your filters or ',
              linkLabel: 'contact our advisors',
              textAfter: ' for a tailored shortlist.',
            }
          : {
              textBefore: 'Showing featured properties that match your selections. For a tailored shortlist, ',
              linkLabel: 'contact our advisors',
              textAfter: '.',
            };

  return (
    <>
      <section
        id="properties"
        className={`scroll-anchor-target relative overflow-hidden border-t px-4 sm:px-6 lg:px-8 ${
          elevatePreview
            ? 'border-white/[0.05] bg-[#07090d] py-16 sm:py-20'
            : 'border-white/[0.05] bg-[#07090d] py-14 sm:py-16'
        }`}
        aria-labelledby="properties-heading"
      >
        {!elevatePreview ? (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_72%_0%,rgba(0,159,227,0.045),transparent_52%)]"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/96 via-[#07090d]/94 to-[#07090d]/98" aria-hidden="true" />
          </>
        ) : null}
        {!elevatePreview ? <div className="epm-accent-line relative z-10" aria-hidden="true" /> : null}

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              {!elevatePreview ? (
                <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.18em] text-[#9ea6b0] sm:text-xs sm:tracking-[0.2em]">
                  Featured properties
                </p>
              ) : null}
              <h2
                id="properties-heading"
                className="mb-3 font-playfair text-[1.65rem] font-normal leading-[1.12] tracking-[0.02em] text-[#f4f4f2] sm:text-3xl md:text-[2.15rem]"
              >
                {elevatePreview ? 'Curated homes & discreet introductions.' : 'Handpicked for discerning buyers'}
              </h2>
              {!elevatePreview ? (
                <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-[#aeb4bf] sm:text-[15px]">
                  A curated selection of Malta&apos;s finest homes and investment opportunities.
                </p>
              ) : (
                <p className="max-w-md text-[13px] font-light leading-relaxed text-[#aeb4bf]">
                  Availability confirmed on enquiry — prime Malta stock moves privately.
                </p>
              )}
            </div>
            <a
              href={anchorHref(pathname, '#contact')}
              className={`inline-flex min-h-[48px] shrink-0 items-center justify-center px-7 transition-all duration-300 touch-manipulation ${
                elevatePreview
                  ? 'border border-white/[0.1] bg-[#0a0b0d] text-[13px] font-light tracking-wide text-[#e8eaee] hover:border-[rgba(0,159,227,0.28)] hover:bg-[#0c0e12]'
                  : 'epm-hero-cta-primary border-[rgba(0,159,227,0.35)] bg-[#0a0c10]/85 hover:border-[rgba(0,159,227,0.55)] hover:shadow-[0_0_28px_rgba(0,159,227,0.08)]'
              }`}
            >
              {elevatePreview ? 'Enquire' : 'View all properties'}
            </a>
          </div>

          {heroBanner ? (
            <p className="mx-auto mb-8 max-w-2xl px-1 text-center font-sans text-xs font-light leading-relaxed text-[#c5cad2] sm:mb-9 sm:text-sm">
              {heroBanner.textBefore}
              <a
                href={anchorHref(pathname, '#contact')}
                className="text-[#009FE3] underline decoration-[rgba(0,159,227,0.35)] underline-offset-4 transition-colors hover:text-[#e8eaee] hover:decoration-[rgba(0,159,227,0.6)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(0,159,227,0.55)]"
              >
                {heroBanner.linkLabel}
              </a>
              {heroBanner.textAfter}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <div
              className="border border-white/[0.07] bg-[#080a10]/75 px-4 py-10 text-center sm:px-6"
              role="status"
              aria-live="polite"
            >
              <p className="mx-auto max-w-md font-sans text-sm font-light leading-relaxed text-[#c5cad2]">
                No featured listings match every filter you chose. Try broader selections, or reach out for a confidential shortlist.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 border-b border-white/[0.05] pb-12 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
              {filtered.map((property, i) => (
                <motion.article
                  key={property.id}
                  id={`featured-${property.id}`}
                  aria-labelledby={`featured-title-${property.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-40px' }}
                  className={`group cursor-pointer overflow-hidden rounded-sm border outline-none transition-[border-color,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-[rgba(0,159,227,0.45)] focus-visible:ring-offset-2 ${
                    elevatePreview
                      ? 'border-white/[0.06] bg-[#080a10]/95 focus-visible:ring-offset-[#07090d] hover:border-[rgba(0,159,227,0.32)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.38)]'
                      : 'border-white/[0.07] bg-[#080a10]/95 focus-visible:ring-offset-[#07090d] hover:border-[rgba(0,159,227,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,159,227,0.08)]'
                  }`}
                  tabIndex={0}
                  onClick={() => open(property)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      open(property);
                    }
                  }}
                >
                  <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10]">
                    <img
                      src={property.image}
                      alt={`${property.title}, ${property.location}`}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#07090d]/78 via-[#07090d]/15 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute left-2.5 top-2.5 max-w-[min(12rem,70%)] truncate px-2 py-0.5 font-sans text-[10px] font-medium tracking-[0.06em] text-[#eef1f6] transition-colors ${
                        elevatePreview
                          ? 'border border-white/[0.06] bg-[#080a10]/88 text-[#c8cdd4]'
                          : 'border border-white/[0.08] bg-[#07090d]/82 text-[#dce1e8]'
                      }`}
                    >
                      {property.tag ?? property.location}
                    </span>
                    <div
                      className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,159,227,0.35)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="border-t border-white/[0.05] bg-[#07090d]/55 p-4 sm:p-5">
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3
                        id={`featured-title-${property.id}`}
                        className="min-w-0 flex-1 font-playfair text-lg leading-snug text-[#f4f4f2] line-clamp-2 sm:text-xl"
                      >
                        {property.title}
                      </h3>
                      <p className="shrink-0 whitespace-nowrap font-playfair text-lg tabular-nums text-[#e2e4e9] sm:text-xl">
                        {property.formattedPrice}
                      </p>
                    </div>
                    <dl className="mb-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 font-sans text-[11px] text-[#aeb4bf]">
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Bedrooms</dt>
                        <dd className="flex items-center gap-1.5">
                          <Bed className="h-3 w-3 shrink-0 text-[rgba(0,159,227,0.65)]" aria-hidden="true" />
                          <span>{property.beds}</span>
                        </dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Bathrooms</dt>
                        <dd className="flex items-center gap-1.5">
                          <Bath className="h-3 w-3 shrink-0 text-[rgba(0,159,227,0.65)]" aria-hidden="true" />
                          <span>{property.baths}</span>
                        </dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Internal area</dt>
                        <dd className="flex items-center gap-1.5">
                          <Maximize className="h-3 w-3 shrink-0 text-[rgba(0,159,227,0.65)]" aria-hidden="true" />
                          <span>{property.sqft}m²</span>
                        </dd>
                      </div>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <dt className="sr-only">Location</dt>
                        <dd className="flex min-w-0 items-center gap-1.5">
                          <MapPin className="h-3 w-3 shrink-0 text-[rgba(0,159,227,0.65)]" aria-hidden="true" />
                          <span className="truncate">{property.location}</span>
                        </dd>
                      </div>
                    </dl>
                    <div className="grid grid-cols-2 gap-2">
                      <span
                        className={`pointer-events-none flex min-h-[44px] w-full items-center justify-center border py-2.5 text-center font-sans transition-colors touch-manipulation ${
                          elevatePreview
                            ? 'border-white/[0.08] bg-[#0a0a0c] text-[10px] font-light tracking-wide text-[#d2d6de] group-hover:border-white/[0.12]'
                            : 'border border-[rgba(0,159,227,0.28)] bg-[rgba(0,159,227,0.06)] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#f0f2f5] group-hover:border-[rgba(0,159,227,0.45)]'
                        }`}
                        aria-hidden="true"
                      >
                        Request private viewing
                      </span>
                      <span
                        className={`pointer-events-none flex min-h-[44px] w-full items-center justify-center border py-2.5 text-center font-sans transition-colors ${
                          elevatePreview
                            ? 'border-white/[0.06] bg-transparent text-[10px] font-light tracking-wide text-[#9aa2ac] group-hover:border-white/[0.1] group-hover:text-[#c5cad2]'
                            : 'border border-white/[0.1] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#c5cad2] group-hover:border-white/[0.16] group-hover:text-[#e8eaee]'
                        }`}
                        aria-hidden="true"
                      >
                        View details
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <nav
            className={`mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 ${elevatePreview ? 'mt-14' : ''}`}
            aria-label="After browsing listings"
          >
            <span className="text-center font-sans text-[11px] font-light leading-relaxed text-[#9ea6b0] sm:flex-1 sm:text-right sm:text-[12px]">
              {elevatePreview ? 'Need something precise? Brief us privately.' : 'Want broader options than this spotlight, or bespoke shortlists?'}
            </span>
            <a
              href={anchorHref(pathname, '#contact')}
              className="epm-btn-primary epm-btn-primary-sm inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center whitespace-nowrap px-8 sm:w-auto"
            >
              Speak with an advisor
            </a>
          </nav>
        </div>
      </section>

      <PropertyModal property={selected} onClose={close} />
    </>
  );
}
