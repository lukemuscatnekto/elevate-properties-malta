import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMImageUploader from '../components/CRMImageUploader';
import CRMMapPreview from '../components/CRMMapPreview';
import { getProperties, updateProperty } from '../utils/storage';
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

const FEATURE_KEYS: { key: keyof CRMProperty['features']; label: string }[] = [
  { key: 'garage', label: 'Garage' },
  { key: 'pool', label: 'Pool' },
  { key: 'garden', label: 'Garden' },
  { key: 'terrace', label: 'Terrace' },
  { key: 'seaView', label: 'Sea View' },
  { key: 'elevator', label: 'Elevator' },
  { key: 'airConditioning', label: 'Air Conditioning' },
  { key: 'smartHome', label: 'Smart Home' },
  { key: 'gym', label: 'Gym' },
  { key: 'parking', label: 'Parking' },
];

export default function PropertyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('details');
  const [form, setForm] = useState<CRMProperty | null>(null);

  useEffect(() => {
    const all = getProperties();
    setForm(all.find((p) => p.id === id) ?? null);
  }, [id]);

  if (!form) {
    return (
      <div className="space-y-4">
        <Link to="/crm/properties" className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to properties
        </Link>
        <div className="text-sm text-slate-500">Property not found.</div>
      </div>
    );
  }

  function update<K extends keyof CRMProperty>(key: K, value: CRMProperty[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateFeature(key: keyof CRMProperty['features'], value: boolean) {
    setForm((prev) =>
      prev ? { ...prev, features: { ...prev.features, [key]: value } } : prev
    );
  }

  function updateOwner(patch: Partial<CRMProperty['owner']>) {
    setForm((prev) =>
      prev ? { ...prev, owner: { ...prev.owner, ...patch } } : prev
    );
  }

  function updateLocation(patch: Partial<CRMProperty['location']>) {
    setForm((prev) =>
      prev ? { ...prev, location: { ...prev.location, ...patch } } : prev
    );
  }

  function updateMedia(patch: Partial<CRMProperty['media']>) {
    setForm((prev) =>
      prev ? { ...prev, media: { ...prev.media, ...patch } } : prev
    );
  }

  function handleSave() {
    if (!form) return;
    const saved = updateProperty(form.id, form);
    if (saved) navigate(`/crm/properties/${form.id}`);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            to={`/crm/properties/${form.id}`}
            className="p-2 rounded text-slate-600 hover:bg-slate-100"
            aria-label="Back to property detail"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Edit Property</h1>
            <p className="text-sm text-slate-500">{form.reference} — {form.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/crm/properties/${form.id}`)}
            className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md"
          >
            Save Changes
          </button>
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
            <Input label="Locality" value={form.location.locality} onChange={(v) => updateLocation({ locality: v })} />
            <Input label="Region" value={form.location.region} onChange={(v) => updateLocation({ region: v })} />
            <Input label="Country" value={form.location.country} onChange={(v) => updateLocation({ country: v })} />
            <Input label="Address" value={form.location.address} onChange={(v) => updateLocation({ address: v })} className="sm:col-span-3" />
            <Input label="Bedrooms" type="number" value={form.bedrooms} onChange={(v) => update('bedrooms', Number(v))} />
            <Input label="Bathrooms" type="number" value={form.bathrooms} onChange={(v) => update('bathrooms', Number(v))} />
            <Input label="Total Rooms" type="number" value={form.totalRooms} onChange={(v) => update('totalRooms', Number(v))} />
            <Input label="Inside Area (m²)" type="number" value={form.insideAreaSqm} onChange={(v) => update('insideAreaSqm', Number(v))} />
            <Input label="Outside Area (m²)" type="number" value={form.outsideAreaSqm} onChange={(v) => update('outsideAreaSqm', Number(v))} />
            <Input label="Plot Area (m²)" type="number" value={form.plotAreaSqm} onChange={(v) => update('plotAreaSqm', Number(v))} />
            <Input label="Year Built" type="number" value={form.yearBuilt ?? 0} onChange={(v) => update('yearBuilt', Number(v))} />
            <Select label="Furnishing" value={form.furnishing} options={FURNISHING} onChange={(v) => update('furnishing', v as FurnishingType)} />
            <Select label="Finishing" value={form.finishing} options={FINISHING} onChange={(v) => update('finishing', v as FinishingType)} />
            <Select label="Market Status" value={form.marketStatus} options={MARKET} onChange={(v) => update('marketStatus', v as MarketStatus)} />
            <Select label="Assigned Agent" value={form.assignedAgent} options={AGENTS} onChange={(v) => update('assignedAgent', v)} />
          </div>
        )}

        {tab === 'features' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURE_KEYS.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-700 border border-slate-200 rounded-md px-3 py-2 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={form.features[key]}
                  onChange={(e) => updateFeature(key, e.target.checked)}
                  className="accent-teal-600"
                />
                {label}
              </label>
            ))}
          </div>
        )}

        {tab === 'owner' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Owner Name" value={form.owner.name} onChange={(v) => updateOwner({ name: v })} />
            <Input label="Owner Phone" value={form.owner.phone} onChange={(v) => updateOwner({ phone: v })} />
            <Input label="Owner Email" type="email" value={form.owner.email} onChange={(v) => updateOwner({ email: v })} className="sm:col-span-2" />
            <label className="text-sm sm:col-span-2">
              <span className="text-xs text-slate-500 block mb-1">Owner Notes</span>
              <textarea
                value={form.owner.notes}
                onChange={(e) => updateOwner({ notes: e.target.value })}
                rows={3}
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
              />
            </label>
          </div>
        )}

        {tab === 'media' && (
          <CRMImageUploader
            featuredImageUrl={form.media.featuredImageUrl}
            galleryUrls={form.media.galleryUrls}
            onChange={(next) => updateMedia(next)}
          />
        )}

        {tab === 'location' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Address" value={form.location.address} onChange={(v) => updateLocation({ address: v })} className="sm:col-span-2" />
            <Input label="Locality" value={form.location.locality} onChange={(v) => updateLocation({ locality: v })} />
            <Input label="Region" value={form.location.region} onChange={(v) => updateLocation({ region: v })} />
            <Input
              label="Latitude"
              type="number"
              value={form.location.latitude ?? ''}
              onChange={(v) => updateLocation({ latitude: v === '' ? undefined : Number(v) })}
            />
            <Input
              label="Longitude"
              type="number"
              value={form.location.longitude ?? ''}
              onChange={(v) => updateLocation({ longitude: v === '' ? undefined : Number(v) })}
            />
            <label className="text-sm sm:col-span-2">
              <span className="text-xs text-slate-500 block mb-1">Directions / Notes</span>
              <textarea
                value={form.location.directionsNotes}
                onChange={(e) => updateLocation({ directionsNotes: e.target.value })}
                rows={3}
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
              />
            </label>
            <div className="sm:col-span-2 rounded-md overflow-hidden border border-slate-200">
              <CRMMapPreview
                latitude={form.location.latitude}
                longitude={form.location.longitude}
                label={form.title}
                height={260}
              />
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm">
              <span className="text-xs text-slate-500 block mb-1">Internal Notes</span>
              <textarea
                value={form.internalNotes}
                onChange={(e) => update('internalNotes', e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
              />
            </label>
            <label className="text-sm">
              <span className="text-xs text-slate-500 block mb-1">Public Description</span>
              <textarea
                value={form.publicDescription}
                onChange={(e) => update('publicDescription', e.target.value)}
                rows={4}
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
              />
            </label>
            <label className="text-sm">
              <span className="text-xs text-slate-500 block mb-1">Private Description</span>
              <textarea
                value={form.privateDescription}
                onChange={(e) => update('privateDescription', e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
              />
            </label>
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
