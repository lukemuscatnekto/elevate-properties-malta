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

type FeaturedPropertiesProps = {
  heroSearchCriteria: HeroSearchCriteria | null;
};

export default function FeaturedProperties({ heroSearchCriteria }: FeaturedPropertiesProps) {
  const { pathname } = useLocation();
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
        className="scroll-anchor-target py-10 px-4 sm:px-8 bg-brand-brown-dark border-t border-brand-bronze-dark/25"
        aria-labelledby="properties-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="properties-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory mb-3 text-center">
            Featured Properties
          </h2>
          <p className="text-xs sm:text-sm text-brand-sand font-light leading-relaxed text-center max-w-2xl mx-auto mb-2">
            A curated spotlight from our Malta portfolio — open any card for specifications, narrative, and highlights. When you are ready to
            inspect in person, request a confidential viewing from that screen.
          </p>
          <p className="text-[10px] text-brand-metal uppercase tracking-[0.22em] text-center mb-7">
            Featured selection · Availability subject to confirmation
          </p>

          {heroBanner ? (
            <p className="text-center text-xs sm:text-sm text-brand-sand font-light leading-relaxed max-w-2xl mx-auto mb-6 px-1">
              {heroBanner.textBefore}
              <a
                href={anchorHref(pathname, '#contact')}
                className="text-brand-champagne underline-offset-2 hover:text-brand-copper hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper/60"
              >
                {heroBanner.linkLabel}
              </a>
              {heroBanner.textAfter}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <div
              className="py-10 sm:py-11 px-4 text-center border border-brand-bronze-dark/30 bg-brand-taupe/90 rounded-sm pb-10 mb-0 border-b border-brand-bronze-dark/20"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm text-brand-sand font-light max-w-md mx-auto leading-relaxed">
                No featured listings match every filter you chose. Try broader selections, or reach out for a confidential shortlist.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 border-b border-brand-bronze-dark/20">
              {filtered.map((property, i) => (
                <motion.article
                  key={property.id}
                  id={`featured-${property.id}`}
                  aria-labelledby={`featured-title-${property.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group bg-brand-panel border border-brand-bronze-dark/30 hover:border-brand-copper/55 transition-colors rounded-[2px] overflow-hidden outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-brown-dark"
                  tabIndex={0}
                  onClick={() => open(property)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      open(property);
                    }
                  }}
                >
                  <div className="relative aspect-[16/8.3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={`${property.title}, ${property.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" aria-hidden="true" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] font-bold border border-brand-bronze-dark/40 bg-brand-espresso/80 text-brand-champagne">
                      {property.tag ?? property.location}
                    </span>
                  </div>

                  <div className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 id={`featured-title-${property.id}`} className="text-lg sm:text-xl font-playfair text-brand-ivory leading-tight min-w-0 flex-1 line-clamp-2">
                        {property.title}
                      </h3>
                      <p className="text-brand-copper text-lg sm:text-xl font-playfair whitespace-nowrap shrink-0 tabular-nums">{property.formattedPrice}</p>
                    </div>
                    <dl className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-brand-sand text-[10px] mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Bedrooms</dt>
                        <dd className="flex items-center gap-1.5">
                          <Bed className="w-3 h-3 text-brand-copper/70 shrink-0" aria-hidden="true" />
                          <span>{property.beds}</span>
                        </dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Bathrooms</dt>
                        <dd className="flex items-center gap-1.5">
                          <Bath className="w-3 h-3 text-brand-copper/70 shrink-0" aria-hidden="true" />
                          <span>{property.baths}</span>
                        </dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Internal area</dt>
                        <dd className="flex items-center gap-1.5">
                          <Maximize className="w-3 h-3 text-brand-copper/70 shrink-0" aria-hidden="true" />
                          <span>{property.sqft}m²</span>
                        </dd>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <dt className="sr-only">Location</dt>
                        <dd className="flex items-center gap-1.5 min-w-0">
                          <MapPin className="w-3 h-3 text-brand-copper/70 shrink-0" aria-hidden="true" />
                          <span className="truncate">{property.location}</span>
                        </dd>
                      </div>
                    </dl>
                    <span className="block w-full text-center border border-brand-bronze-dark/45 text-brand-champagne text-[9px] uppercase tracking-[0.2em] py-2.5 min-h-[44px] flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors touch-manipulation font-bold pointer-events-none" aria-hidden="true">
                      View listing · enquire
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <nav className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto" aria-label="After browsing listings">
            <span className="text-[11px] text-brand-metal font-light text-center sm:text-right sm:flex-1">
              Want broader options than this spotlight — or bespoke shortlists?
            </span>
            <a
              href={anchorHref(pathname, '#contact')}
              className="epm-btn-primary epm-btn-primary-sm inline-flex min-h-[48px] w-full sm:w-auto px-8 whitespace-nowrap touch-manipulation"
            >
              Contact an adviser
            </a>
          </nav>
        </div>
      </section>

      <PropertyModal property={selected} onClose={close} />
    </>
  );
}
