/**
 * Convenience wrappers around logActivity for common CRM events.
 * Components call these helpers rather than constructing ActivityEvent objects directly.
 */
import type { ActivityEventType } from '../types';
import { logActivity } from './storage';

function log(
  entityId: string,
  entityType: 'lead' | 'property',
  type: ActivityEventType,
  description: string,
  meta?: Record<string, string | number | boolean | null | undefined>,
) {
  logActivity({ entityId, entityType, type, description, meta, timestamp: new Date().toISOString() });
}

// ─── Lead events ──────────────────────────────────────────────────────────────
export const activityLead = {
  statusChanged(leadId: string, from: string, to: string) {
    log(leadId, 'lead', 'status_change', `Status changed from "${from}" to "${to}"`, { from, to });
  },
  formIntake(leadId: string, formType: string) {
    log(leadId, 'lead', 'form_intake', `Lead created via ${formType} form on the public website`, { formType });
  },
  taskCreated(leadId: string, taskTitle: string) {
    log(leadId, 'lead', 'task_created', `Task created: "${taskTitle}"`, { taskTitle });
  },
  taskCompleted(leadId: string, taskTitle: string) {
    log(leadId, 'lead', 'task_completed', `Task completed: "${taskTitle}"`, { taskTitle });
  },
  viewingScheduled(leadId: string, propertyTitle: string, scheduledAt: string) {
    log(leadId, 'lead', 'viewing_scheduled', `Viewing scheduled at ${propertyTitle}`, { propertyTitle, scheduledAt });
  },
  viewingCompleted(leadId: string, propertyTitle: string) {
    log(leadId, 'lead', 'viewing_completed', `Viewing completed at ${propertyTitle}`, { propertyTitle });
  },
  contactCreated(leadId: string, contactName: string) {
    log(leadId, 'lead', 'contact_created', `Converted to contact: ${contactName}`, { contactName });
  },
  noted(leadId: string, note: string) {
    log(leadId, 'lead', 'note', note);
  },
};

// ─── Property events ──────────────────────────────────────────────────────────
export const activityProperty = {
  statusChanged(propertyId: string, from: string, to: string) {
    log(propertyId, 'property', 'status_change', `Status changed from "${from}" to "${to}"`, { from, to });
  },
  added(propertyId: string, title: string) {
    log(propertyId, 'property', 'property_added', `Property added to CRM: "${title}"`, { title });
  },
  taskCreated(propertyId: string, taskTitle: string) {
    log(propertyId, 'property', 'task_created', `Task created: "${taskTitle}"`, { taskTitle });
  },
  viewingScheduled(propertyId: string, leadName: string, scheduledAt: string) {
    log(propertyId, 'property', 'viewing_scheduled', `Viewing scheduled with ${leadName}`, { leadName, scheduledAt });
  },
  viewingCompleted(propertyId: string, leadName: string) {
    log(propertyId, 'property', 'viewing_completed', `Viewing completed with ${leadName}`, { leadName });
  },
  noted(propertyId: string, note: string) {
    log(propertyId, 'property', 'note', note);
  },
};
