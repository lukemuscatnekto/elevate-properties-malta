import type { Lead, CRMTask, CRMProperty, Contact, Viewing, ActivityEvent } from '../types';
import { mockLeads } from '../data/mockLeads';
import { mockTasks } from '../data/mockTasks';
import { mockProperties } from '../data/mockProperties';
import { mockContacts } from '../data/mockContacts';
import { mockViewings } from '../data/mockViewings';

// ─── Keys ─────────────────────────────────────────────────────────────────────
const KEYS = {
  leads:      'epm_crm_leads_v1',
  tasks:      'epm_crm_tasks_v1',
  properties: 'epm_crm_properties_v1',
  contacts:   'epm_crm_contacts_v1',
  viewings:   'epm_crm_viewings_v1',
  activity:   'epm_crm_activity_v1',
  sidebar:    'epm_crm_sidebar_collapsed',
  theme:      'epm_crm_theme',
} as const;

export type CRMTheme = 'light' | 'dark';

// ─── ID generator ──────────────────────────────────────────────────────────────
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Generic read/write ────────────────────────────────────────────────────────
function read<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch {
    return seed;
  }
}

function write<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error('CRM storage write failed', key);
  }
}

// ─── Leads ────────────────────────────────────────────────────────────────────
export function getLeads(): Lead[] {
  return read<Lead>(KEYS.leads, mockLeads);
}

export interface NewLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status?: Lead['status'];
  source?: Lead['source'];
  enquiryType?: string;
  budgetMin?: number;
  budgetMax?: number;
  locationInterest?: string;
  notes?: string;
  assignedAgent?: string;
  propertyInterestId?: string;
  intakeFormType?: string;
}

export function addLead(input: NewLeadInput): Lead {
  const leads = getLeads();
  const lead: Lead = {
    id: generateId('lead'),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    status: input.status ?? 'New',
    source: input.source ?? 'Other',
    enquiryType: input.enquiryType ?? 'buying',
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    locationInterest: input.locationInterest,
    notes: input.notes,
    assignedAgent: input.assignedAgent,
    propertyInterestId: input.propertyInterestId,
    intakeFormType: input.intakeFormType,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.leads, [lead, ...leads]);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  const updated = { ...leads[idx], ...patch };
  leads[idx] = updated;
  write(KEYS.leads, leads);
  return updated;
}

export function deleteLead(id: string): Lead | null {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  const [removed] = leads.splice(idx, 1);
  write(KEYS.leads, leads);
  return removed;
}

export function deleteLeads(ids: string[]): Lead[] {
  const leads = getLeads();
  const idSet = new Set(ids);
  const removed = leads.filter(l => idSet.has(l.id));
  write(KEYS.leads, leads.filter(l => !idSet.has(l.id)));
  return removed;
}

export function restoreLeads(items: Lead[]): void {
  const leads = getLeads();
  write(KEYS.leads, [...items, ...leads]);
}

// ─── Tasks ────────────────────────────────────────────────────────────────────
export function getTasks(): CRMTask[] {
  return read<CRMTask>(KEYS.tasks, mockTasks);
}

export function addTask(input: Omit<CRMTask, 'id' | 'createdAt'>): CRMTask {
  const tasks = getTasks();
  const task: CRMTask = {
    ...input,
    id: generateId('task'),
    createdAt: new Date().toISOString(),
  };
  write(KEYS.tasks, [task, ...tasks]);
  return task;
}

export function updateTask(id: string, patch: Partial<CRMTask>): CRMTask | null {
  const tasks = getTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated = { ...tasks[idx], ...patch };
  tasks[idx] = updated;
  write(KEYS.tasks, tasks);
  return updated;
}

export function deleteTask(id: string): CRMTask | null {
  const tasks = getTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const [removed] = tasks.splice(idx, 1);
  write(KEYS.tasks, tasks);
  return removed;
}

export function deleteTasks(ids: string[]): CRMTask[] {
  const tasks = getTasks();
  const idSet = new Set(ids);
  const removed = tasks.filter(t => idSet.has(t.id));
  write(KEYS.tasks, tasks.filter(t => !idSet.has(t.id)));
  return removed;
}

export function restoreTasks(items: CRMTask[]): void {
  const tasks = getTasks();
  write(KEYS.tasks, [...items, ...tasks]);
}

// ─── Properties ───────────────────────────────────────────────────────────────
export function getProperties(): CRMProperty[] {
  return read<CRMProperty>(KEYS.properties, mockProperties);
}

export function addProperty(input: Omit<CRMProperty, 'id' | 'createdAt' | 'updatedAt'>): CRMProperty {
  const props = getProperties();
  const now = new Date().toISOString();
  const prop: CRMProperty = {
    ...input,
    id: generateId('prop'),
    createdAt: now,
    updatedAt: now,
  };
  write(KEYS.properties, [prop, ...props]);
  return prop;
}

export function updateProperty(id: string, patch: Partial<CRMProperty>): CRMProperty | null {
  const props = getProperties();
  const idx = props.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const updated = { ...props[idx], ...patch, updatedAt: new Date().toISOString() };
  props[idx] = updated;
  write(KEYS.properties, props);
  return updated;
}

export function deleteProperty(id: string): CRMProperty | null {
  const props = getProperties();
  const idx = props.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const [removed] = props.splice(idx, 1);
  write(KEYS.properties, props);
  return removed;
}

export function deleteProperties(ids: string[]): CRMProperty[] {
  const props = getProperties();
  const idSet = new Set(ids);
  const removed = props.filter(p => idSet.has(p.id));
  write(KEYS.properties, props.filter(p => !idSet.has(p.id)));
  return removed;
}

export function restoreProperties(items: CRMProperty[]): void {
  const props = getProperties();
  write(KEYS.properties, [...items, ...props]);
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
export function getContacts(): Contact[] {
  return read<Contact>(KEYS.contacts, mockContacts);
}

export function addContact(input: Omit<Contact, 'id' | 'createdAt'>): Contact {
  const contacts = getContacts();
  const contact: Contact = {
    ...input,
    id: generateId('contact'),
    createdAt: new Date().toISOString(),
  };
  write(KEYS.contacts, [contact, ...contacts]);
  return contact;
}

export function updateContact(id: string, patch: Partial<Contact>): Contact | null {
  const contacts = getContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return null;
  const updated = { ...contacts[idx], ...patch };
  contacts[idx] = updated;
  write(KEYS.contacts, contacts);
  return updated;
}

export function deleteContact(id: string): Contact | null {
  const contacts = getContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return null;
  const [removed] = contacts.splice(idx, 1);
  write(KEYS.contacts, contacts);
  return removed;
}

export function deleteContacts(ids: string[]): Contact[] {
  const contacts = getContacts();
  const idSet = new Set(ids);
  const removed = contacts.filter(c => idSet.has(c.id));
  write(KEYS.contacts, contacts.filter(c => !idSet.has(c.id)));
  return removed;
}

export function restoreContacts(items: Contact[]): void {
  const contacts = getContacts();
  write(KEYS.contacts, [...items, ...contacts]);
}

// ─── Viewings ─────────────────────────────────────────────────────────────────
export function getViewings(): Viewing[] {
  return read<Viewing>(KEYS.viewings, mockViewings);
}

export function addViewing(input: Omit<Viewing, 'id' | 'createdAt'>): Viewing {
  const viewings = getViewings();
  const viewing: Viewing = {
    ...input,
    id: generateId('viewing'),
    createdAt: new Date().toISOString(),
  };
  write(KEYS.viewings, [viewing, ...viewings]);
  return viewing;
}

export function updateViewing(id: string, patch: Partial<Viewing>): Viewing | null {
  const viewings = getViewings();
  const idx = viewings.findIndex(v => v.id === id);
  if (idx === -1) return null;
  const updated = { ...viewings[idx], ...patch };
  viewings[idx] = updated;
  write(KEYS.viewings, viewings);
  return updated;
}

// ─── Activity Log ─────────────────────────────────────────────────────────────
export function getActivity(): ActivityEvent[] {
  return read<ActivityEvent>(KEYS.activity, []);
}

export function logActivity(event: Omit<ActivityEvent, 'id'>): ActivityEvent {
  const all = getActivity();
  const entry: ActivityEvent = {
    ...event,
    id: generateId('act'),
  };
  write(KEYS.activity, [entry, ...all]);
  return entry;
}

export function getActivityForEntity(entityId: string): ActivityEvent[] {
  return getActivity().filter(e => e.entityId === entityId);
}

// ─── Theme ────────────────────────────────────────────────────────────────────
export function getTheme(): CRMTheme {
  try {
    const v = localStorage.getItem(KEYS.theme);
    return v === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setTheme(theme: CRMTheme): void {
  try {
    localStorage.setItem(KEYS.theme, theme);
  } catch { /* noop */ }
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export function getSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(KEYS.sidebar) === 'true';
  } catch {
    return false;
  }
}

export function setSidebarCollapsed(v: boolean): void {
  try {
    localStorage.setItem(KEYS.sidebar, String(v));
  } catch { /* noop */ }
}

// ─── Reset ────────────────────────────────────────────────────────────────────
export function resetCRMData(): void {
  Object.values(KEYS).forEach(k => {
    try { localStorage.removeItem(k); } catch { /* noop */ }
  });
}
