import type { HeroSearchOption } from '../types/heroSearchDropdown';

export const HERO_LOCATION_OPTIONS: HeroSearchOption[] = [
  { value: 'any', label: 'Any Location' },
  { value: 'sliema', label: 'Sliema' },
  { value: 'st-julians', label: "St. Julian's" },
  { value: 'valletta', label: 'Valletta' },
  { value: 'mosta', label: 'Mosta' },
  { value: 'attard', label: 'Attard' },
  { value: 'mellieha', label: 'Mellieħa' },
  { value: 'mdina-rabat', label: 'Mdina / Rabat' },
  { value: 'st-pauls-bay', label: "St. Paul's Bay" },
  { value: 'zebbug', label: 'Żebbuġ' },
];

export const HERO_PROPERTY_TYPE_OPTIONS: HeroSearchOption[] = [
  { value: 'any', label: 'Any Type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'maisonette', label: 'Maisonette' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
];

export const HERO_BUDGET_OPTIONS: HeroSearchOption[] = [
  { value: 'any', label: 'Any Budget' },
  { value: 'upto-250k', label: 'Up to €250K' },
  { value: '250k-500k', label: '€250K – €500K' },
  { value: '500k-1m', label: '€500K – €1M' },
  { value: '1m-3m', label: '€1M – €3M' },
  { value: '3m-plus', label: '€3M+' },
];

export const HERO_BEDROOMS_OPTIONS: HeroSearchOption[] = [
  { value: 'any', label: 'Any Bedrooms' },
  { value: 'beds-1', label: '1+' },
  { value: 'beds-2', label: '2+' },
  { value: 'beds-3', label: '3+' },
  { value: 'beds-4', label: '4+' },
  { value: 'beds-5', label: '5+' },
];
