import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useCallback } from 'react';
import type { Property } from '../types';
import { featuredHomepageProperties } from '../data/featuredHomepage';
import PropertyModal from './PropertyModal';

export default function FeaturedProperties() {
  const [selected, setSelected] = useState<Property | null>(null);

  const open = useCallback((p: Property) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <section
        id="properties"
        className="scroll-anchor-target pt-8 pb-6 px-4 sm:px-8 bg-[#070707] border-t border-gold/20"
        aria-labelledby="properties-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="properties-heading" className="text-[2rem] md:text-[2.2rem] font-playfair text-white mb-5 text-center">
            Featured Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredHomepageProperties.map((property, i) => (
              <motion.article
                key={property.id}
                id={`featured-${property.id}`}
                aria-labelledby={`featured-title-${property.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group bg-[#0D0D0D] border border-gold/20 hover:border-gold/45 transition-colors rounded-[2px] overflow-hidden outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] font-bold border border-gold/30 bg-black/70 text-gold">
                    {property.tag ?? property.location}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 id={`featured-title-${property.id}`} className="text-lg sm:text-xl font-playfair text-white leading-tight min-w-0 flex-1 line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="text-gold text-lg sm:text-xl font-playfair whitespace-nowrap shrink-0 tabular-nums">{property.formattedPrice}</p>
                  </div>
                  <dl className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-white/60 text-[10px] mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Bedrooms</dt>
                      <dd className="flex items-center gap-1.5">
                        <Bed className="w-3 h-3 text-gold/65 shrink-0" aria-hidden="true" />
                        <span>{property.beds}</span>
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Bathrooms</dt>
                      <dd className="flex items-center gap-1.5">
                        <Bath className="w-3 h-3 text-gold/65 shrink-0" aria-hidden="true" />
                        <span>{property.baths}</span>
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Internal area</dt>
                      <dd className="flex items-center gap-1.5">
                        <Maximize className="w-3 h-3 text-gold/65 shrink-0" aria-hidden="true" />
                        <span>{property.sqft}m²</span>
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <dt className="sr-only">Location</dt>
                      <dd className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3 h-3 text-gold/65 shrink-0" aria-hidden="true" />
                        <span className="truncate">{property.location}</span>
                      </dd>
                    </div>
                  </dl>
                  <span className="block w-full text-center border border-gold/40 text-gold text-[9px] uppercase tracking-[0.2em] py-2.5 min-h-[44px] flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors touch-manipulation font-bold pointer-events-none" aria-hidden="true">
                    View details
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <PropertyModal property={selected} onClose={close} />
    </>
  );
}
