/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Investment' | 'Draft' | 'Sold' | 'Rented';
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
  tag?: 'Featured' | 'Sea View' | 'New Listing' | 'Exclusive' | 'Historical' | 'Rare';
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
