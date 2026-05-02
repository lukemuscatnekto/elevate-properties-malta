import type { Viewing } from '../types';

const today = new Date();
const dateOffset = (days: number) => {
  const d = new Date(today.getTime() + days * 86400000);
  return d.toISOString().split('T')[0];
};
const now = today.toISOString();

export const mockViewings: Viewing[] = [
  {
    id: 'view_001',
    propertyId: 'prop_002',
    leadId: 'lead_002',
    date: dateOffset(1),
    time: '10:30',
    assignedAgent: 'Nico Dalton',
    status: 'Scheduled',
    notes: 'Second viewing — bring drone footage.',
    createdAt: now,
  },
  {
    id: 'view_002',
    propertyId: 'prop_001',
    leadId: 'lead_002',
    date: dateOffset(-2),
    time: '15:00',
    assignedAgent: 'Luke Muscat',
    status: 'Completed',
    notes: 'Client liked but wants to see Madliena first.',
    createdAt: now,
  },
  {
    id: 'view_003',
    propertyId: 'prop_004',
    leadId: 'lead_004',
    date: dateOffset(2),
    time: '17:00',
    assignedAgent: 'Nico Dalton',
    status: 'Scheduled',
    notes: 'Bring lease draft.',
    createdAt: now,
  },
  {
    id: 'view_004',
    propertyId: 'prop_003',
    leadId: 'lead_003',
    date: dateOffset(-5),
    time: '11:00',
    assignedAgent: 'Luke Muscat',
    status: 'Completed',
    notes: 'Resulted in offer at €1.35M.',
    createdAt: now,
  },
  {
    id: 'view_005',
    propertyId: 'prop_005',
    leadId: 'lead_007',
    date: dateOffset(-1),
    time: '14:00',
    assignedAgent: 'Nico Dalton',
    status: 'No Show',
    notes: 'Client did not respond to confirmation.',
    createdAt: now,
  },
];
