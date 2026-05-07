/**
 * CRM Intake API — Phase 3e stub
 *
 * Today this writes directly to localStorage so the CRM works with zero backend.
 * When you have a real API, replace the entire body of each function with a single
 * fetch() call and delete the storage imports — everything else stays identical.
 *
 * Example swap:
 *   export async function saveLead(lead: NewLeadInput): Promise<Lead> {
 *     const res = await fetch('/api/crm/leads', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(lead),
 *     });
 *     if (!res.ok) throw new Error(`API error ${res.status}`);
 *     return res.json() as Promise<Lead>;
 *   }
 */
import type { Lead, Contact } from '../types';
import { addLead, addContact, type NewLeadInput } from './storage';

export async function saveLead(input: NewLeadInput): Promise<Lead> {
  // ← swap this line for a fetch() call in production
  return Promise.resolve(addLead(input));
}

export async function saveContact(input: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
  // ← swap this line for a fetch() call in production
  return Promise.resolve(addContact(input));
}
