// ─── Lead ────────────────────────────────────────────────────────────────────
export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Viewing Scheduled'
  | 'Negotiating'
  | 'Won'
  | 'Lost';

export type LeadSource =
  | 'Website Contact'
  | 'Website Viewing Request'
  | 'Website Valuation'
  | 'Referral'
  | 'Walk-in'
  | 'Social Media'
  | 'Portal'
  | 'Direct Call'
  | 'Email'
  | 'Other';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  enquiryType: string;        // 'buying' | 'selling' | 'renting' | 'investment' | 'valuation'
  budgetMin?: number;
  budgetMax?: number;
  locationInterest?: string;
  notes?: string;
  assignedAgent?: string;
  propertyInterestId?: string;
  createdAt: string;          // ISO
  lastContactDate?: string;   // ISO
  intakeFormType?: string;    // 'contact' | 'valuation' | 'viewing'
}

// ─── Task ────────────────────────────────────────────────────────────────────
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export type TaskType =
  | 'Call'
  | 'Email'
  | 'Meeting'
  | 'Viewing'
  | 'Follow-up'
  | 'Document'
  | 'Other';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface CRMTask {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assignedAgent?: string;
  dueDate?: string;           // ISO date string (YYYY-MM-DD)
  completedAt?: string;       // ISO
  relatedLeadId?: string;
  relatedPropertyId?: string;
  notes?: string;
  createdAt: string;
}

// ─── Property ────────────────────────────────────────────────────────────────
export type CRMPropertyStatus = 'Available' | 'Reserved' | 'Sold' | 'Let' | 'Off Market';
export type CRMPropertyCategory =
  | 'Villa'
  | 'Penthouse'
  | 'Apartment'
  | 'Farmhouse'
  | 'Palazzo'
  | 'Townhouse'
  | 'Development Site'
  | 'Commercial'
  | 'Other';
export type SaleOrLet = 'Sale' | 'Let' | 'Both';
export type FurnishingType = 'Furnished' | 'Part-Furnished' | 'Unfurnished' | 'Shell';
export type FinishingType = 'Luxury' | 'High Spec' | 'Standard' | 'Requires Renovation';
export type MarketStatus = 'Live' | 'Draft' | 'Off Market' | 'Sold STC';
export type PriceType = 'Fixed' | 'POA' | 'Guide Price' | 'Reduced';

export interface CRMPropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  pools?: boolean;
  garden?: boolean;
  terraceM2?: number;
  internalM2?: number;
  externalM2?: number;
  seaview?: boolean;
  elevator?: boolean;
  centralAC?: boolean;
  smartHome?: boolean;
  concierge?: boolean;
  other?: string;
}

export interface CRMPropertyOwner {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface CRMPropertyMedia {
  featuredImageUrl?: string;
  galleryUrls?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
}

export interface CRMPropertyLocation {
  address?: string;
  locality?: string;
  region?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface CRMProperty {
  id: string;
  title: string;
  category: CRMPropertyCategory;
  saleOrLet: SaleOrLet;
  status: CRMPropertyStatus;
  marketStatus: MarketStatus;
  askingPrice?: number;
  priceType?: PriceType;
  monthlyRent?: number;
  furnishing?: FurnishingType;
  finishing?: FinishingType;
  yearBuilt?: number;
  referenceCode?: string;
  description?: string;
  internalNotes?: string;
  features: CRMPropertyFeatures;
  owner: CRMPropertyOwner;
  media: CRMPropertyMedia;
  location: CRMPropertyLocation;
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export type ContactType =
  | 'Buyer'
  | 'Seller'
  | 'Tenant'
  | 'Landlord'
  | 'Investor'
  | 'Professional'
  | 'Other';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  type: ContactType;
  company?: string;
  nationality?: string;
  notes?: string;
  linkedLeadId?: string;
  createdAt: string;
}

// ─── Viewing ─────────────────────────────────────────────────────────────────
export type ViewingStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';

export interface Viewing {
  id: string;
  leadId: string;
  propertyId: string;
  scheduledAt: string;        // ISO
  durationMinutes?: number;
  status: ViewingStatus;
  agent?: string;
  feedback?: string;
  notes?: string;
  createdAt: string;
}

// ─── Activity (Phase 3) ───────────────────────────────────────────────────────
export type ActivityEventType =
  | 'status_change'
  | 'task_created'
  | 'task_completed'
  | 'viewing_scheduled'
  | 'viewing_completed'
  | 'form_intake'
  | 'note'
  | 'contact_created'
  | 'property_added'
  | 'csv_import';

export interface ActivityEvent {
  id: string;
  entityId: string;                        // leadId or propertyId
  entityType: 'lead' | 'property';
  type: ActivityEventType;
  timestamp: string;                       // ISO
  description: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
}
