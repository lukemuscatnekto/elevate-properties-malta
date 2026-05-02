// Public-site → CRM intake bridge.
//
// The public marketing site never imports CRM components or pages directly —
// it only calls these tiny helpers, which write into the same localStorage
// the CRM reads from. This keeps the CRM frontend-only while still making
// website enquiries appear in the agent pipeline.
//
// NOTE: Prototype only. There is no real backend, no spam protection, and
// localStorage data lives only in the visitor's browser — it is NOT shared
// between the public visitor and the agent. In production this bridge would
// post to a real lead-intake endpoint.

import { addLead } from './storage';
import type { Lead } from '../types';

// Best-effort name splitter for free-text "full name" inputs.
function splitName(full: string): { firstName: string; lastName: string } {
  const trimmed = (full ?? '').trim();
  if (!trimmed) return { firstName: 'Unknown', lastName: '' };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

// Map the website's "Budget Range" select values to CRM numeric ranges.
function parseBudgetRange(range: string | undefined): { from: number; to: number } {
  switch (range) {
    case '1-3':
      return { from: 1_000_000, to: 3_000_000 };
    case '3-10':
      return { from: 3_000_000, to: 10_000_000 };
    case '10+':
      return { from: 10_000_000, to: 25_000_000 };
    default:
      return { from: 0, to: 0 };
  }
}

export interface ContactFormIntake {
  fullName: string;
  email: string;
  enquiryType: string;       // 'buying' | 'selling' | 'renting' | 'investment' | 'valuation'
  budgetRange?: string;      // '1-3' | '3-10' | '10+'
  message: string;
  phone?: string;
}

export function createLeadFromContactForm(input: ContactFormIntake): Lead {
  const { firstName, lastName } = splitName(input.fullName);
  const { from, to } = parseBudgetRange(input.budgetRange);

  return addLead({
    firstName,
    lastName,
    email: input.email,
    mobile: input.phone ?? '',
    source: 'Website',
    interest:
      input.enquiryType === 'renting'
        ? 'Rent'
        : input.enquiryType === 'selling' || input.enquiryType === 'valuation'
        ? 'Both'
        : 'Buy',
    budgetFrom: from,
    budgetTo: to,
    notes:
      `Website Contact Form (${input.enquiryType})\n\n` +
      (input.message ?? '').trim(),
  });
}

export interface ListPropertyIntake {
  fullName: string;
  email: string;
  propertyLocation: string;
  phone?: string;
}

export function createLeadFromListProperty(input: ListPropertyIntake): Lead {
  const { firstName, lastName } = splitName(input.fullName);

  return addLead({
    firstName,
    lastName,
    email: input.email,
    mobile: input.phone ?? '',
    source: 'Website',
    interest: 'Both',
    locationInterest: input.propertyLocation,
    notes:
      `List Property Form — owner enquiry.\n` +
      `Property location: ${input.propertyLocation || '—'}`,
  });
}

export interface RequestViewingIntake {
  fullName: string;
  email: string;
  phone?: string;
  propertyTitle?: string;
  propertyId?: string;
  preferredDate?: string;
  message?: string;
}

export function createLeadFromRequestViewing(input: RequestViewingIntake): Lead {
  const { firstName, lastName } = splitName(input.fullName);

  return addLead({
    firstName,
    lastName,
    email: input.email,
    mobile: input.phone ?? '',
    source: 'Website',
    interest: 'Buy',
    locationInterest: input.propertyTitle ?? '',
    notes:
      `Request Viewing Form\n` +
      `Property: ${input.propertyTitle ?? input.propertyId ?? '—'}\n` +
      `Preferred date: ${input.preferredDate ?? '—'}\n\n` +
      (input.message ?? ''),
  });
}
