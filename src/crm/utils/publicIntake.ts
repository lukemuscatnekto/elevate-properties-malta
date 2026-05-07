/**
 * Bridges public-site form submissions into the CRM.
 * All writes go through crmIntakeApi so swapping to a real backend
 * requires changes only in that one file.
 */
import type { Lead, LeadSource } from '../types';
import { saveLead } from './crmIntakeApi';
import { activityLead } from './activity';

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export function parseBudgetRange(range: string): { budgetMin?: number; budgetMax?: number } {
  if (range === '1-3')  return { budgetMin: 1_000_000, budgetMax: 3_000_000 };
  if (range === '3-10') return { budgetMin: 3_000_000, budgetMax: 10_000_000 };
  if (range === '10+')  return { budgetMin: 10_000_000 };
  return {};
}

// ─── Payload types (mirrors what formSubmission.ts sends) ─────────────────────
export interface ContactFormIntake {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  budget?: string;
  message?: string;
}

export interface ListPropertyIntake {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

export interface RequestViewingIntake {
  name?: string;
  email?: string;
  phone?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  message?: string;
}

// ─── Intake creators ──────────────────────────────────────────────────────────
export async function createLeadFromContactForm(data: ContactFormIntake): Promise<Lead> {
  const { firstName, lastName } = splitName(String(data.name ?? ''));
  const budget = parseBudgetRange(String(data.budget ?? ''));
  const lead = await saveLead({
    firstName,
    lastName,
    email: String(data.email ?? ''),
    phone: String(data.phone ?? ''),
    status: 'New',
    source: 'Website Contact' as LeadSource,
    enquiryType: String(data.type ?? 'buying'),
    notes: String(data.message ?? ''),
    intakeFormType: 'contact',
    ...budget,
  });
  activityLead.formIntake(lead.id, 'contact');
  return lead;
}

export async function createLeadFromListProperty(data: ListPropertyIntake): Promise<Lead> {
  const { firstName, lastName } = splitName(String(data.name ?? ''));
  const lead = await saveLead({
    firstName,
    lastName,
    email: String(data.email ?? ''),
    phone: String(data.phone ?? ''),
    status: 'New',
    source: 'Website Valuation' as LeadSource,
    enquiryType: 'selling',
    locationInterest: String(data.location ?? ''),
    notes: String(data.message ?? ''),
    intakeFormType: 'valuation',
  });
  activityLead.formIntake(lead.id, 'valuation');
  return lead;
}

export async function createLeadFromRequestViewing(data: RequestViewingIntake): Promise<Lead> {
  const { firstName, lastName } = splitName(String(data.name ?? ''));
  const lead = await saveLead({
    firstName,
    lastName,
    email: String(data.email ?? ''),
    phone: String(data.phone ?? ''),
    status: 'New',
    source: 'Website Viewing Request' as LeadSource,
    enquiryType: 'buying',
    locationInterest: String(data.propertyLocation ?? ''),
    notes: String(data.message ?? ''),
    intakeFormType: 'viewing',
  });
  activityLead.formIntake(lead.id, 'viewing');
  return lead;
}
