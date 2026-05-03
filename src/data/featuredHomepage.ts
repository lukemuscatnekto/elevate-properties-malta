import type { Property } from '../types';

/**
 * Homepage featured listings — replace this static array with data from your CRM, Zanzi, QuickLets, or API when ready.
 * Keep the same `Property` shape (or map server fields into it) so `FeaturedProperties` and `PropertyModal` stay unchanged.
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
    status: 'For Sale',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
    tag: 'Exclusive',
    description:
      'A refined villa proposition in Mosta combining generous entertaining spaces, landscaped grounds, and a calm residential setting within reach of Malta’s key hubs.',
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
    status: 'For Sale',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    tag: 'Sea View',
    description:
      'A contemporary penthouse with elevated panoramas toward the Mediterranean — crafted for breezy terraces, understated luxury interiors, and a lock-up-and-leave lifestyle.',
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
    status: 'For Sale',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    tag: 'Featured',
    description:
      'Situated in sought-after Attard, this villa offers balanced proportions across living and bedroom wings, curated finishes, and outdoor space oriented for Malta’s Mediterranean climate.',
    features: ['Garden & pool terrace', 'Home office suite', 'Cinema nook', 'Solar-ready roof', 'Gated driveway', 'Underfloor heating (select zones)'],
    isFeatured: true,
    createdAt: '2024-06-18T09:15:00Z',
  },
];
