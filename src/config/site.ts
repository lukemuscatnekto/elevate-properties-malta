export type SiteTeamMember = {
  name: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
};

const primaryContact = {
  name: 'Nico Dalton',
  phoneDisplay: '+356 9981 6646',
  phoneHref: 'tel:+35699816646',
  whatsappHref: 'https://wa.me/35699816646',
} satisfies SiteTeamMember;

const secondaryContact = {
  name: 'Luke Muscat',
  phoneDisplay: '+356 7742 4141',
  phoneHref: 'tel:+35677424141',
  whatsappHref: 'https://wa.me/35677424141',
} satisfies SiteTeamMember;

/** Public marketing site configuration. Social URLs remain empty until you add real profiles (Footer hides icons automatically). */

export const siteConfig = {
  companyName: 'Elevate by Zanzi',
  tagline: 'Official Zanzi Franchise · Malta Luxury Real Estate.',

  domainUrl: 'https://elevatepropertiesmalta.com',

  emailDisplay: 'nicodalton@elevatepropertiesmalta.com',
  emailHref: 'mailto:nicodalton@elevatepropertiesmalta.com',

  contacts: {
    primary: primaryContact,
    secondary: secondaryContact,
  },

  /** One primary WhatsApp CTA (matches Nico) — Luke’s link is listed in contact blocks. */
  primaryWhatsappHref: primaryContact.whatsappHref,

  /** Mirrors primary dial line for legacy callers (navbar, structured data uses this separately). */
  phoneDisplay: primaryContact.phoneDisplay,
  phoneHref: primaryContact.phoneHref,

  whatsappHref: primaryContact.whatsappHref,
  whatsappDisplay: primaryContact.phoneDisplay,

  address: 'Żebbuġ, Malta',
  openingHours: 'Mon-Fri: 9:00 AM - 6:00 PM (CET)',

  /** Optional social profile URLs (https). Leave empty to omit social icons on the public site. */
  instagramUrl: '',
  facebookUrl: '',
  linkedinUrl: '',
};
