export interface Area {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export const areas: Area[] = [
  {
    id: '1',
    name: 'Madliena',
    description: 'The "Beverly Hills" of Malta, known for its ultra-luxury villas and coastal vistas.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800',
    count: 12
  },
  {
    id: '2',
    name: 'Valletta',
    description: 'A UNESCO World Heritage city offering historic palazzos and baroque elegance.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    count: 8
  },
  {
    id: '3',
    name: 'St. Julian\'s',
    description: 'The vibrant heart of Malta, featuring premier lifestyle amenities and bayside luxury.',
    image: 'https://images.unsplash.com/photo-1529283435508-3cd0f1ae10e0?auto=format&fit=crop&q=80&w=800',
    count: 15
  },
  {
    id: '4',
    name: 'Sliema',
    description: 'A bustling coastal town with high-end boutiques and prestigious seafront apartments.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    count: 24
  },
  {
    id: '5',
    name: 'Tigné Point',
    description: 'A contemporary car-free peninsula offering unmatched urban luxury and sea views.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    count: 6
  },
  {
    id: '6',
    name: 'Portomaso',
    description: 'Award-winning marina development representing the gold standard of Mediterranean living.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    count: 9
  },
  {
    id: '7',
    name: 'Mellieħa',
    description: 'Picturesque northern vistas and private villas overlooking Malta\'s most iconic beaches.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
    count: 11
  },
  {
    id: '8',
    name: 'Rabat',
    description: 'Serene historical estates neighboring the silent city of Mdina with panoramic country views.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800',
    count: 7
  }
];
