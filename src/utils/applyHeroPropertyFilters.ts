import type { Property } from '../types';
import type { HeroSearchCriteria } from '../types/heroSearch';

function norm(s: string): string {
  return s.replace(/\u2019/g, "'").toLowerCase().trim();
}

export function hasActiveHeroFilter(criteria: HeroSearchCriteria): boolean {
  return (
    criteria.location !== 'any' ||
    criteria.propertyType !== 'any' ||
    criteria.budget !== 'any' ||
    criteria.bedrooms !== 'any'
  );
}

function matchesLocation(property: Property, key: string): boolean {
  if (key === 'any') return true;
  const loc = norm(property.location);
  switch (key) {
    case 'sliema':
      return loc.includes('sliema');
    case 'st-julians':
      return loc.includes('julian');
    case 'valletta':
      return loc.includes('valletta');
    case 'mosta':
      return loc.includes('mosta');
    case 'attard':
      return loc.includes('attard');
    case 'mellieha':
      return loc.includes('mellie');
    case 'mdina-rabat':
      return loc.includes('mdina') || loc.includes('rabat');
    case 'st-pauls-bay':
      return loc.includes('paul') && loc.includes('bay');
    case 'zebbug':
      return loc.includes('zebbug') || loc.includes('ebbu');
    default:
      return false;
  }
}

function matchesType(property: Property, key: string): boolean {
  if (key === 'any') return true;
  const map: Record<string, Property['type'][]> = {
    apartment: ['Apartment'],
    penthouse: ['Penthouse'],
    villa: ['Villa'],
    townhouse: ['House of Character'],
    maisonette: [],
    commercial: [],
    land: [],
  };
  const allowed = map[key];
  if (!allowed || allowed.length === 0) return false;
  return allowed.includes(property.type);
}

function matchesBudget(property: Property, key: string): boolean {
  if (key === 'any') return true;
  const { price } = property;
  switch (key) {
    case 'upto-250k':
      return price <= 250_000;
    case '250k-500k':
      return price > 250_000 && price <= 500_000;
    case '500k-1m':
      return price > 500_000 && price <= 1_000_000;
    case '1m-3m':
      return price > 1_000_000 && price <= 3_000_000;
    case '3m-plus':
      return price > 3_000_000;
    default:
      return false;
  }
}

function minBedsFromKey(key: string): number | null {
  if (key === 'any') return null;
  const n = Number(key.replace('beds-', ''));
  return Number.isFinite(n) ? n : null;
}

function matchesBedrooms(property: Property, key: string): boolean {
  const min = minBedsFromKey(key);
  if (min === null) return true;
  return property.beds >= min;
}

/**
 * Filters the featured spotlight using hero search keys. Safe for the current static dataset.
 */
export function filterPropertiesByHeroCriteria(
  properties: Property[],
  criteria: HeroSearchCriteria
): Property[] {
  return properties.filter(
    (p) =>
      matchesLocation(p, criteria.location) &&
      matchesType(p, criteria.propertyType) &&
      matchesBudget(p, criteria.budget) &&
      matchesBedrooms(p, criteria.bedrooms)
  );
}
