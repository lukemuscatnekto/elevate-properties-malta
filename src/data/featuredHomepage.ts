import type { Property } from '../types';

/**
 * Homepage featured listings. Replace this static array with data from your CRM, ZANZI, Quick Lets, or API when ready.
 * Keep the same `Property` shape (or map server fields into it) so `FeaturedProperties` and `PropertyModal` stay unchanged.
 *
 * Wording note: these entries are framed as curated selections / typologies (not confirmed live listings) so the public site
 * stays honest until real CRM inventory is wired up. Tags use "Featured Selection" / "Curated Selection" / "Investment Profile"
 * rather than "Listing" so advisors are never asked about a specific property they don't actively represent.
 */
export const featuredHomepageProperties: Property[] = [
  {
    id: 'mosta-villa-f',
    title: 'Mosta Villa',
    price: 2_450_000,
    formattedPrice: '€2,450,000',
    location: 'Mosta',
    beds: 5,
    baths: 4,
    sqft: 610,
    type: 'Villa',
    status: 'Representative profile',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
    tag: 'Featured Selection',
    description:
      'A refined villa typology in the Mosta corridor: generous entertaining spaces, landscaped grounds, and a calm residential setting within reach of Malta’s key hubs. Indicative guide pricing for a comparable mandate.',
    features: ['Pool-ready grounds', 'Multi-car garage', 'Guest wing', 'Smart climate', 'Wine storage', 'Security system'],
    isFeatured: true,
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'st-pauls-penthouse-f',
    title: "St. Paul’s Bay Penthouse",
    price: 1_780_000,
    formattedPrice: '€1,780,000',
    location: "St. Paul's Bay",
    beds: 4,
    baths: 3,
    sqft: 430,
    type: 'Penthouse',
    status: 'Representative profile',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    tag: 'Curated Selection',
    description:
      'A contemporary penthouse typology with elevated panoramas toward the Mediterranean: breezy terraces, understated interiors, and a lock-up-and-leave rhythm. Indicative guide pricing for a comparable mandate.',
    features: ['Sweeping terraces', 'Private lift lobby', 'Marina proximity', 'Storage', 'High-spec kitchen', 'Double glazing'],
    isFeatured: true,
    createdAt: '2024-06-12T14:30:00Z',
  },
  {
    id: 'attard-villa-f',
    title: 'Attard Villa',
    price: 2_180_000,
    formattedPrice: '€2,180,000',
    location: 'Attard',
    beds: 4,
    baths: 4,
    sqft: 520,
    type: 'Villa',
    status: 'Representative profile',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    tag: 'Investment Profile',
    description:
      'An Attard-style villa typology balanced across living and bedroom wings, with curated finishes and outdoor space oriented for Malta’s Mediterranean climate. Indicative guide pricing for a comparable mandate.',
    features: ['Garden & pool terrace', 'Home office suite', 'Cinema nook', 'Solar-ready roof', 'Gated driveway', 'Underfloor heating (select zones)'],
    isFeatured: true,
    createdAt: '2024-06-18T09:15:00Z',
  },
];
