import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import { generateId, getProperties, saveProperties } from '../utils/storage';
import type {
  CRMProperty,
  CRMPropertyCategory,
  CRMPropertyStatus,
  FinishingType,
  FurnishingType,
  MarketStatus,
  PriceType,
  SaleOrLet,
} from '../types';

type TabKey = 'details' | 'features' | 'owner' | 'media' | 'location' | 'notes';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'features', label: 'Rooms / Features' },
  { key: 'owner', label: 'Owner' },
  { key: 'media', label: 'Media' },
  { key: 'location', label: 'Location' },
  { key: 'notes', label: 'Notes' },
];

const CATEGORIES: CRMPropertyCategory[] = [
  'Villa',
  'Apartment',
  'Penthouse',
  'Townhouse',
  'House of Character',
  'Maisonette',
  'Commercial',
  'Land',
];
const STATUSES: CRMPropertyStatus[] = [
  'Available',
  'Reserved',
  'Sold',
  'Let',
  'Pending Approval',
  'Draft',
];
const FURNISHING: FurnishingType[] = ['Unfurnished', 'Part-Furnished', 'Fully Furnished', 'Appliances Only'];
const FINISHING: FinishingType[] = ['Shell', 'Semi-Finished', 'Finished', 'Highly Finished'];
const MARKET: MarketStatus[] = ['On Market', 'Off Market', 'Coming Soon'];
const PRICE_TYPE: PriceType[] = ['Fixed', 'Negotiable', 'POA', 'Auction'];
const AGENTS = ['Luke Muscat', 'Nico Dalton'];

interface FormState {
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
  yearBuilt: number;
  furnishing: FurnishingType;
  finishing: FinishingType;
  // features
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
  // owner
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerNotes: string;
  // media
  featuredImageUrl: string;
  galleryUrlsRaw: string;
  // location
  address: string;
  locality: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
  directionsNotes: string;
  // notes
  internalNotes: string;
  publicDescription: string;
  privateDescription: string;
  assignedAgent: string;
}

const INITIAL: FormState = {
  reference: '',
  title: '',
  category: 'Apartment',
  saleOrLet: 'Sale',
  status: 'Draft',
  marketStatus: 'On Market',
  priceType: 'Fixed',
  currentPrice: 0,
  originalPrice: 0,
  bedrooms: 0,
  bathrooms: 0,
  totalRooms: 0,
  insideAreaSqm: 0,
  outsideAreaSqm: 0,
  plotAreaSqm: 0,
  yearBuilt: new Date().getFullYear(),
  furnishing: 'Unfurnished',
  finishing: 'Finished',
  garage: false,
  pool: false,
  garden: false,
  terrace: false,
  seaView: false,
  elevator: false,
  airConditioning: false,
  smartHome: false,
  gym: false,
  parking: false,
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  ownerNotes: '',
  featuredImageUrl: '',
  galleryUrlsRaw: '',
  address: '',
  locality: '',
  region: '',
  country: 'Malta',
  latitude: '',
  longitude: '',
  directionsNotes: '',
  internalNotes: '',
  publicDescription: '',
  privateDescription: '',
  assignedAgent: AGENTS[0],
};

export default function AddProperty() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('details');
  const [form, setForm] = useState<FormState>(INITIAL);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildProperty(overrideStatus?: CRMPropertyStatus): CRMProperty {
    const now = new Date().toISOString();
    const galleryUrls = form.galleryUrlsRaw
      .split(/\r?\n/)
      .map((u) => u.trim())
      .filter(Boolean);

    return {
      id: generateId('prop'),
      reference: form.reference || `EPM-${Date.now().toString(36).toUpperCase()}`,
      title: form.title,
      category: form.category,
      saleOrLet: form.saleOrLet,
      status: overrideStatus ?? form.status,
      marketStatus: form.marketStatus,
      priceType: form.priceType,
      currentPrice: Number(form.currentPrice) || 0,
      originalPrice: Number(form.originalPrice || form.currentPrice) || 0,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      totalRooms: Number(form.totalRooms) || 0,
      insideAreaSqm: Number(form.insideAreaSqm) || 0,
      outsideAreaSqm: Number(form.outsideAreaSqm) || 0,
      plotAreaSqm: Number(form.plotAreaSqm) || 0,
      yearBuilt: Number(form.yearBuilt) || undefined,
      furnishing: form.furnishing,
      finishing: form.finishing,
      qualityScore: 7,
      features: {
        garage: form.garage,
        pool: form.pool,
        garden: form.garden,
        terrace: form.terrace,
        seaView: form.seaView,
        elevator: form.elevator,
        airConditioning: form.airConditioning,
        smartHome: form.smartHome,
        gym: form.gym,
        parking: form.parking,
      },
      owner: {
        name: form.ownerName,
        phone: form.ownerPhone,
        email: form.ownerEmail,
        notes: form.ownerNotes,
      },
      media: {
        featuredImageUrl: form.featuredImageUrl,
        galleryUrls,
      },
      location: {
        address: form.address,
        locality: form.locality,
        region: form.region,
        country: form.country,
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
        directionsNotes: form.directionsNotes,
      },
      internalNotes: form.internalNotes,
      publicDescription: form.publicDescription,
      privateDescription: form.privateDescription,
      assignedAgent: form.assignedAgent,
      createdAt: now,
      updatedAt: now,
    };
  }

  function handleSave(status?: CRMPropertyStatus) {
    const newProp = buildProperty(status);
    const next = [newProp, ...getProperties()];
    saveProperties(next);
    navigate('/crm/properties');
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/crm/properties')}
            className="p-2 rounded text-slate-600 hover:bg-slate-100"
            aria-label="Back to properties"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Add Property</h1>
            <p className="text-sm text-slate-500">Create a new listing for the Elevate portfolio.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate('/crm/properties')} className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
          <button type="button" onClick={() => handleSave('Draft')} className="px-3 py-2 text-sm border border-slate-200 hover:bg-slate-50 rounded-md text-slate-700">Save Draft</button>
          <button type="button" onClick={() => handleSave()} className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md">Save Property</button>
          <button type="button" onClick={() => handleSave('Available')} className="px-3 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-md">Save & Publish</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-4 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-1 pb-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t.key ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <CRMCard>
        {tab === 'details' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Reference" value={form.reference} onChange={(v) => update('reference', v)} />
            <Input label="Title" value={form.title} onChange={(v) => update('title', v)} className="sm:col-span-2" />
            <Select label="Property Type" value={form.category} options={CATEGORIES} onChange={(v) => update('category', v as CRMPropertyCategory)} />
            <Select label="Sale / Rental" value={form.saleOrLet} options={['Sale', 'Rental']} onChange={(v) => update('saleOrLet', v as SaleOrLet)} />
            <Select label="Status" value={form.status} options={STATUSES} onChange={(v) => update('status', v as CRMPropertyStatus)} />
            <Input label="Sale / Rental Price (€)" type="number" value={form.currentPrice} onChange={(v) => update('currentPrice', Number(v))} />
            <Input label="Original Price (€)" type="number" value={form.originalPrice} onChange={(v) => update('originalPrice', Number(v))} />
            <Select label="Price Type" value={form.priceType} options={PRICE_TYPE} onChange={(v) => update('priceType', v as PriceType)} />
            <Input label="Locality" value={form.locality} onChange={(v) => update('locality', v)} />
            <Input label="Region" value={form.region} onChange={(v) => update('region', v)} />
            <Input label="Country" value={form.country} onChange={(v) => update('country', v)} />
            <Input label="Address" value={form.address} onChange={(v) => update('address', v)} className="sm:col-span-3" />
            <Input label="Bedrooms" type="number" value={form.bedrooms} onChange={(v) => update('bedrooms', Number(v))} />
            <Input label="Bathrooms" type="number" value={form.bathrooms} onChange={(v) => update('bathrooms', Number(v))} />
            <Input label="Total Rooms" type="number" value={form.totalRooms} onChange={(v) => update('totalRooms', Number(v))} />
            <Input label="Inside Area (m²)" type="number" value={form.insideAreaSqm} onChange={(v) => update('insideAreaSqm', Number(v))} />
            <Input label="Outside Area (m²)" type="number" value={form.outsideAreaSqm} onChange={(v) => update('outsideAreaSqm', Number(v))} />
            <Input label="Plot Area (m²)" type="number" value={form.plotAreaSqm} onChange={(v) => update('plotAreaSqm', Number(v))} />
            <Input label="Year Built" type="number" value={form.yearBuilt} onChange={(v) => update('yearBuilt', Number(v))} />
            <Select label="Furnishing" value={form.furnishing} options={FURNISHING} onChange={(v) => update('furnishing', v as FurnishingType)} />
            <Select label="Finishing" value={form.finishing} options={FINISHING} onChange={(v) => update('finishing', v as FinishingType)} />
            <Select label="Market Status" value={form.marketStatus} options={MARKET} onChange={(v) => update('marketStatus', v as MarketStatus)} />
            <Select label="Assigned Agent" value={form.assignedAgent} options={AGENTS} onChange={(v) => update('assignedAgent', v)} />
          </div>
        )}

        {tab === 'features' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ['garage', 'Garage'],
              ['pool', 'Pool'],
              ['garden', 'Garden'],
              ['terrace', 'Terrace'],
              ['seaView', 'Sea View'],
              ['elevator', 'Elevator'],
              ['airConditioning', 'Air Conditioning'],
              ['smartHome', 'Smart Home'],
              ['gym', 'Gym'],
              ['parking', 'Parking'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-700 border border-slate-200 rounded-md px-3 py-2 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={form[key as keyof FormState] as boolean}
                  onChange={(e) => update(key as keyof FormState, e.target.checked as never)}
                  className="accent-teal-600"
                />
                {label}
              </label>
            ))}
            <Input label="Bedrooms" type="number" value={form.bedrooms} onChange={(v) => update('bedrooms', Number(v))} className="col-span-2" />
            <Input label="Bathrooms" type="number" value={form.bathrooms} onChange={(v) => update('bathrooms', Number(v))} className="col-span-2" />
          </div>
        )}

        {tab === 'owner' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Owner Name" value={form.ownerName} onChange={(v) => update('ownerName', v)} />
            <Input label="Owner Phone" value={form.ownerPhone} onChange={(v) => update('ownerPhone', v)} />
            <Input label="Owner Email" type="email" value={form.ownerEmail} onChange={(v) => update('ownerEmail', v)} className="sm:col-span-2" />
            <TextArea label="Owner Notes" value={form.ownerNotes} onChange={(v) => update('ownerNotes', v)} className="sm:col-span-2" />
          </div>
        )}

        {tab === 'media' && (
          <div className="grid grid-cols-1 gap-3">
            <Input label="Featured Image URL" value={form.featuredImageUrl} onChange={(v) => update('featuredImageUrl', v)} />
            <TextArea
              label="Gallery Image URLs (one per line)"
              value={form.galleryUrlsRaw}
              onChange={(v) => update('galleryUrlsRaw', v)}
            />
            <div className="flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-md p-8 text-sm text-slate-500">
              Drag &amp; drop image upload (placeholder — wired in Phase 2)
            </div>
            {form.featuredImageUrl && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Featured preview</p>
                <img src={form.featuredImageUrl} alt="Featured" className="w-full max-w-md rounded border border-slate-200" />
              </div>
            )}
          </div>
        )}

        {tab === 'location' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Address" value={form.address} onChange={(v) => update('address', v)} className="sm:col-span-2" />
            <Input label="Locality" value={form.locality} onChange={(v) => update('locality', v)} />
            <Input label="Region" value={form.region} onChange={(v) => update('region', v)} />
            <Input label="Latitude" value={form.latitude} onChange={(v) => update('latitude', v)} />
            <Input label="Longitude" value={form.longitude} onChange={(v) => update('longitude', v)} />
            <TextArea label="Directions / Notes" value={form.directionsNotes} onChange={(v) => update('directionsNotes', v)} className="sm:col-span-2" />
            <div className="sm:col-span-2 h-48 bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-sm text-slate-500">
              Map preview (Malta) — Google Maps integration in Phase 2
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="grid grid-cols-1 gap-3">
            <TextArea label="Internal Notes" value={form.internalNotes} onChange={(v) => update('internalNotes', v)} />
            <TextArea label="Public Description" value={form.publicDescription} onChange={(v) => update('publicDescription', v)} />
            <TextArea label="Private Description" value={form.privateDescription} onChange={(v) => update('privateDescription', v)} />
          </div>
        )}
      </CRMCard>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}

function Input({ label, value, onChange, type = 'text', className = '' }: InputProps) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      />
    </label>
  );
}

interface SelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  className?: string;
}

function Select({ label, value, options, onChange, className = '' }: SelectProps) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

function TextArea({ label, value, onChange, className = '' }: TextAreaProps): ReactNode {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      />
    </label>
  );
}
