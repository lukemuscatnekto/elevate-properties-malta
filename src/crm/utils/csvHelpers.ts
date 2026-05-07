import type { Lead, CRMProperty, Contact } from '../types';

// ─── Generic CSV builder ───────────────────────────────────────────────────────
function esc(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function row(cells: unknown[]): string {
  return cells.map(esc).join(',');
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Leads export ─────────────────────────────────────────────────────────────
const LEAD_HEADERS = [
  'id', 'firstName', 'lastName', 'email', 'phone',
  'status', 'source', 'enquiryType',
  'budgetMin', 'budgetMax', 'locationInterest',
  'assignedAgent', 'notes', 'createdAt', 'lastContactDate',
];

export function leadsToCSV(leads: Lead[]): string {
  const lines = [row(LEAD_HEADERS)];
  for (const l of leads) {
    lines.push(row([
      l.id, l.firstName, l.lastName, l.email, l.phone,
      l.status, l.source, l.enquiryType,
      l.budgetMin ?? '', l.budgetMax ?? '', l.locationInterest ?? '',
      l.assignedAgent ?? '', l.notes ?? '', l.createdAt, l.lastContactDate ?? '',
    ]));
  }
  return lines.join('\n');
}

export function parseCSVLeads(csv: string): Partial<Lead>[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(line => {
    const cells = splitCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (cells[i] ?? '').trim(); });
    return {
      firstName:       obj.firstName || undefined,
      lastName:        obj.lastName  || undefined,
      email:           obj.email     || undefined,
      phone:           obj.phone     || undefined,
      status:          (obj.status as Lead['status']) || 'New',
      source:          (obj.source as Lead['source']) || 'Other',
      enquiryType:     obj.enquiryType || 'buying',
      budgetMin:       obj.budgetMin  ? Number(obj.budgetMin)  : undefined,
      budgetMax:       obj.budgetMax  ? Number(obj.budgetMax)  : undefined,
      locationInterest: obj.locationInterest || undefined,
      assignedAgent:   obj.assignedAgent || undefined,
      notes:           obj.notes || undefined,
    };
  }).filter(l => l.firstName || l.email);
}

// ─── Contacts export ───────────────────────────────────────────────────────────
const CONTACT_HEADERS = [
  'id', 'firstName', 'lastName', 'email', 'phone',
  'type', 'company', 'nationality', 'notes', 'createdAt',
];

export function contactsToCSV(contacts: Contact[]): string {
  const lines = [row(CONTACT_HEADERS)];
  for (const c of contacts) {
    lines.push(row([
      c.id, c.firstName, c.lastName, c.email, c.phone ?? '',
      c.type, c.company ?? '', c.nationality ?? '', c.notes ?? '', c.createdAt,
    ]));
  }
  return lines.join('\n');
}

export function parseCSVContacts(csv: string): Partial<Contact>[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(line => {
    const cells = splitCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (cells[i] ?? '').trim(); });
    return {
      firstName:   obj.firstName || undefined,
      lastName:    obj.lastName  || undefined,
      email:       obj.email     || undefined,
      phone:       obj.phone     || undefined,
      type:        (obj.type as Contact['type']) || 'Other',
      company:     obj.company     || undefined,
      nationality: obj.nationality || undefined,
      notes:       obj.notes       || undefined,
    };
  }).filter(c => c.firstName || c.email);
}

// ─── Properties export (summary columns only) ─────────────────────────────────
const PROPERTY_HEADERS = [
  'id', 'referenceCode', 'title', 'category', 'saleOrLet', 'status', 'marketStatus',
  'askingPrice', 'monthlyRent', 'locality', 'bedrooms', 'bathrooms',
  'internalM2', 'assignedAgent', 'createdAt',
];

export function propertiesToCSV(properties: CRMProperty[]): string {
  const lines = [row(PROPERTY_HEADERS)];
  for (const p of properties) {
    lines.push(row([
      p.id, p.referenceCode ?? '', p.title, p.category, p.saleOrLet,
      p.status, p.marketStatus,
      p.askingPrice ?? '', p.monthlyRent ?? '',
      p.location.locality ?? '',
      p.features.bedrooms ?? '', p.features.bathrooms ?? '',
      p.features.internalM2 ?? '',
      p.assignedAgent ?? '', p.createdAt,
    ]));
  }
  return lines.join('\n');
}

// ─── Simple CSV line parser (handles quoted fields) ───────────────────────────
function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}
