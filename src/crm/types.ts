// CRM domain types — kept separate from the public website's Property type.

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Viewing Scheduled'
  | 'Negotiating'
  | 'Won'
  | 'Lost';

export type LeadSource =
  | 'Website'
  | 'WhatsApp'
  | 'Phone'
  | 'Referral'
  | 'Social Media'
  | 'Walk-in';

export type PropertyInterest = 'Buy' | 'Rent' | 'Both';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  source: LeadSource;
  status: LeadStatus;
  assignedAgent: string;
  interest: PropertyInterest;
  budgetFrom: number;
  budgetTo: number;
  locationInterest: string;
  notes: string;
  lastContactDate: string; // ISO
  nextFollowUpDate: string; // ISO
  createdAt: string;
}

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';

export type TaskType =
  | 'Call'
  | 'Email'
  | 'Viewing'
  | 'Follow-up'
  | 'Valuation'
  | 'Listing Update'
  | 'Document Request';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface CRMTask {
  id: string;
  title: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assignedAgent: string;
  createdBy: string;
  relatedLeadId?: string;
  relatedPropertyId?: string;
  dueDate: string; // ISO
  notes: string;
  createdAt: string;
}

export type CRMPropertyStatus =
  | 'Available'
  | 'Reserved'
  | 'Sold'
  | 'Let'
  | 'Pending Approval'
  | 'Draft';

export type CRMPropertyCategory =
  | 'Villa'
  | 'Apartment'
  | 'Penthouse'
  | 'Townhouse'
  | 'House of Character'
  | 'Maisonette'
  | 'Commercial'
  | 'Land';

export type SaleOrLet = 'Sale' | 'Rental';

export type FurnishingType =
  | 'Unfurnished'
  | 'Part-Furnished'
  | 'Fully Furnished'
  | 'Appliances Only';

export type FinishingType = 'Shell' | 'Semi-Finished' | 'Finished' | 'Highly Finished';

export type MarketStatus = 'On Market' | 'Off Market' | 'Coming Soon';

export type PriceType = 'Fixed' | 'Negotiable' | 'POA' | 'Auction';

export interface CRMPropertyFeatures {
  garage: boolean;
  pool: boolean;
  garden: boolean;
  terrace: boolean;
  seaView: boolean;
  elevator: boolean;
  airConditioning: boolean;
  smartHome: boolean;
  gym: boolean;
  parking: boolean;
}

export interface CRMPropertyOwner {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface CRMPropertyMedia {
  featuredImageUrl: string;
  galleryUrls: string[];
}

export interface CRMPropertyLocation {
  address: string;
  locality: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
  directionsNotes: string;
}

export interface CRMProperty {
  id: string;
  reference: string;
  title: string;
  category: CRMPropertyCategory;
  saleOrLet: SaleOrLet;
  status: CRMPropertyStatus;
  marketStatus: MarketStatus;
  priceType: PriceType;
  currentPrice: number;
  originalPrice: number;
  bedrooms: number;
  bathrooms: number;
  totalRooms: number;
  insideAreaSqm: number;
  outsideAreaSqm: number;
  plotAreaSqm: number;
  yearBuilt?: number;
  furnishing: FurnishingType;
  finishing: FinishingType;
  qualityScore: number; // 1–10 internal
  features: CRMPropertyFeatures;
  owner: CRMPropertyOwner;
  media: CRMPropertyMedia;
  location: CRMPropertyLocation;
  internalNotes: string;
  publicDescription: string;
  privateDescription: string;
  assignedAgent: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactType =
  | 'Buyer'
  | 'Seller'
  | 'Tenant'
  | 'Landlord'
  | 'Investor'
  | 'Agent'
  | 'Partner'
  | 'Contractor';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  type: ContactType;
  phone: string;
  email: string;
  company?: string;
  notes: string;
  relatedLeadIds: string[];
  relatedPropertyIds: string[];
  createdAt: string;
}

export type ViewingStatus =
  | 'Scheduled'
  | 'Completed'
  | 'Cancelled'
  | 'No Show'
  | 'Rescheduled';

export interface Viewing {
  id: string;
  propertyId: string;
  leadId: string;
  date: string; // ISO date
  time: string; // HH:MM
  assignedAgent: string;
  status: ViewingStatus;
  notes: string;
  createdAt: string;
}
