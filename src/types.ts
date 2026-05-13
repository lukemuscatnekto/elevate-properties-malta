/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PropertyStatus =
  | 'For Sale'
  | 'For Rent'
  | 'Investment'
  | 'Draft'
  | 'Sold'
  | 'Rented'
  /** Illustrative homepage spotlight entry; not a confirmed on-market listing. */
  | 'Representative profile';
export type PropertyType = 'Villa' | 'Penthouse' | 'Apartment' | 'House of Character';

export interface Property {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  location: string;
  address?: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  images?: string[];
  tag?:
    | 'Featured'
    | 'Featured Selection'
    | 'Curated Selection'
    | 'Investment Profile'
    | 'Sea View'
    | 'New Listing'
    | 'Exclusive'
    | 'Historical'
    | 'Rare'
    | 'Private Opportunity'
    | 'Investment Potential'
    | 'New to Market'
    | 'Luxury Listing'
    | 'Elevate Pick'
    | 'Rental Opportunity'
    | 'Network Listing';
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  isFeatured?: boolean;
  isPrivate?: boolean;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}
