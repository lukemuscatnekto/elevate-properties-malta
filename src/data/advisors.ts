/**
 * Public-facing advisors — edit here to update copy, roles, or contact links.
 * `photoSrc` is a URL under `/public` (e.g. `/images/advisor.webp`).
 */
export type PublicAdvisor = {
  id: string;
  initials: string;
  name: string;
  role: string;
  photoSrc?: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  bio: string;
};

export const publicAdvisors: PublicAdvisor[] = [
  {
    id: 'nico-dalton',
    initials: 'ND',
    name: 'Nico Dalton',
    role: 'Property Advisor',
    photoSrc: '/images/nico-dalton.png',
    phoneDisplay: '+356 9981 6646',
    phoneHref: 'tel:+35699816646',
    whatsappHref: 'https://wa.me/35699816646',
    bio: 'Direct contact for private viewings, buyer enquiries, and confidential property conversations across Malta.',
  },
  {
    id: 'luke-muscat',
    initials: 'LM',
    name: 'Luke Muscat',
    role: 'Property Advisor',
    photoSrc: '/images/luke-muscat.png',
    phoneDisplay: '+356 7742 4141',
    phoneHref: 'tel:+35677424141',
    whatsappHref: 'https://wa.me/35677424141',
    bio: 'Focused on client guidance, property introductions, and helping buyers and sellers move with clarity.',
  },
];
