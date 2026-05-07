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
    role: 'Director · Elevate by Zanzi',
    photoSrc: '/images/nico-dalton.png',
    phoneDisplay: '+356 9981 6646',
    phoneHref: 'tel:+35699816646',
    whatsappHref: 'https://wa.me/35699816646',
    bio: 'Leads private advisory across buying, selling, valuations, and premium property positioning throughout Malta.',
  },
  {
    id: 'luke-muscat',
    initials: 'LM',
    name: 'Luke Muscat',
    role: 'Property Advisor · Elevate by Zanzi',
    photoSrc: '/images/luke-muscat.png',
    phoneDisplay: '+356 7742 4141',
    phoneHref: 'tel:+35677424141',
    whatsappHref: 'https://wa.me/35677424141',
    bio: 'Supports buyer and seller journeys with local guidance, structured follow-up, and discreet property introductions.',
  },
];
