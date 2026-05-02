// Tiny localStorage wrapper for the CRM prototype.
// NOTE: This is frontend-only mock persistence — not a real backend.

import type {
  Lead,
  CRMTask,
  CRMProperty,
  Contact,
  Viewing,
  LeadSource,
  LeadStatus,
} from '../types';
import { mockLeads } from '../data/mockLeads';
import { mockTasks } from '../data/mockTasks';
import { mockProperties } from '../data/mockProperties';
import { mockContacts } from '../data/mockContacts';
import { mockViewings } from '../data/mockViewings';

const KEYS = {
  leads: 'epm_crm_leads_v1',
  tasks: 'epm_crm_tasks_v1',
  properties: 'epm_crm_properties_v1',
  contacts: 'epm_crm_contacts_v1',
  viewings: 'epm_crm_viewings_v1',
} as const;

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in prototype
  }
}

// Seed-on-first-read so a fresh browser sees realistic mock data.
function seeded<T>(key: string, seed: T[]): T[] {
  const existing = safeRead<T[] | null>(key, null);
  if (existing && Array.isArray(existing)) return existing;
  safeWrite(key, seed);
  return seed;
}

// ─────────────────────────────────────────────────────────────────
// Leads
// ─────────────────────────────────────────────────────────────────
export const getLeads = (): Lead[] => seeded(KEYS.leads, mockLeads);
export const saveLeads = (leads: Lead[]): void => safeWrite(KEYS.leads, leads);

export interface NewLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  source: LeadSource;
  status?: LeadStatus;
  assignedAgent?: string;
  interest?: Lead['interest'];
  budgetFrom?: number;
  budgetTo?: number;
  locationInterest?: string;
  notes?: string;
}

export function addLead(input: NewLeadInput): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: generateId('lead'),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    mobile: input.mobile,
    source: input.source,
    status: input.status ?? 'New',
    assignedAgent: input.assignedAgent ?? 'Unassigned',
    interest: input.interest ?? 'Buy',
    budgetFrom: input.budgetFrom ?? 0,
    budgetTo: input.budgetTo ?? 0,
    locationInterest: input.locationInterest ?? '',
    notes: input.notes ?? '',
    lastContactDate: now,
    nextFollowUpDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    createdAt: now,
  };
  const next = [lead, ...getLeads()];
  saveLeads(next);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | null {
  const all = getLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  const updated: Lead = { ...all[idx], ...patch, id };
  all[idx] = updated;
  saveLeads(all);
  return updated;
}

// ─────────────────────────────────────────────────────────────────
// Tasks
// ─────────────────────────────────────────────────────────────────
export const getTasks = (): CRMTask[] => seeded(KEYS.tasks, mockTasks);
export const saveTasks = (tasks: CRMTask[]): void => safeWrite(KEYS.tasks, tasks);

export function addTask(task: Omit<CRMTask, 'id' | 'createdAt'>): CRMTask {
  const next: CRMTask = {
    ...task,
    id: generateId('task'),
    createdAt: new Date().toISOString(),
  };
  saveTasks([next, ...getTasks()]);
  return next;
}

// ─────────────────────────────────────────────────────────────────
// Properties
// ─────────────────────────────────────────────────────────────────
export const getProperties = (): CRMProperty[] => seeded(KEYS.properties, mockProperties);
export const saveProperties = (props: CRMProperty[]): void =>
  safeWrite(KEYS.properties, props);

export function addProperty(input: Omit<CRMProperty, 'id' | 'createdAt' | 'updatedAt'>): CRMProperty {
  const now = new Date().toISOString();
  const prop: CRMProperty = {
    ...input,
    id: generateId('prop'),
    createdAt: now,
    updatedAt: now,
  };
  saveProperties([prop, ...getProperties()]);
  return prop;
}

export function updateProperty(id: string, patch: Partial<CRMProperty>): CRMProperty | null {
  const all = getProperties();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: CRMProperty = {
    ...all[idx],
    ...patch,
    id,
    updatedAt: new Date().toISOString(),
  };
  all[idx] = updated;
  saveProperties(all);
  return updated;
}

// ─────────────────────────────────────────────────────────────────
// Contacts
// ─────────────────────────────────────────────────────────────────
export const getContacts = (): Contact[] => seeded(KEYS.contacts, mockContacts);
export const saveContacts = (contacts: Contact[]): void =>
  safeWrite(KEYS.contacts, contacts);

// ─────────────────────────────────────────────────────────────────
// Viewings
// ─────────────────────────────────────────────────────────────────
export const getViewings = (): Viewing[] => seeded(KEYS.viewings, mockViewings);
export const saveViewings = (viewings: Viewing[]): void =>
  safeWrite(KEYS.viewings, viewings);

// ─────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────
export function resetCRMData(): void {
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}

// Tiny ID helper — not cryptographically meaningful, fine for a prototype.
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
