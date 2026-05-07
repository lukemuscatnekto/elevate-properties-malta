import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, MapPin, Loader2 } from 'lucide-react';
import { addProperty } from '../utils/storage';
import { activityProperty } from '../utils/activity';
import CRMMapPreview from '../components/CRMMapPreview';
import CRMImageUploader from '../components/CRMImageUploader';
import type { CRMProperty } from '../types';

type Tab = 'details' | 'features' | 'owner' | 'media' | 'location' | 'notes';
const TABS: { id: Tab; label: string }[] = [
  { id: 'details',  label: 'Details'  },
  { id: 'features', label: 'Features' },
  { id: 'owner',    label: 'Owner'    },
  { id: 'media',    label: 'Media'    },
  { id: 'location', label: 'Location' },
  { id: 'notes',    label: 'Notes'    },
];

type FormState = Omit<CRMProperty, 'id' | 'createdAt' | 'updatedAt'>;

const init: FormState = {
  title: '', category: 'Apartment', saleOrLet: 'Sale',
  status: 'Available', marketStatus: 'Draft',
  priceType: 'Fixed', furnishing: 'Unfurnished', finishing: 'Standard',
  features: {}, owner: {}, media: {}, location: {},
};

export default function AddProperty() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('details');
  const [form, setForm] = useState<FormState>(init);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm(f => ({ ...f, [k]: v }));

  const setFeature = <K extends keyof CRMProperty['features']>(k: K, v: CRMProperty['features'][K]) =>
    setForm(f => ({ ...f, features: { ...f.features, [k]: v } }));

  const setOwner = <K extends keyof CRMProperty['owner']>(k: K, v: string) =>
    setForm(f => ({ ...f, owner: { ...f.owner, [k]: v } }));

  const setLocation = <K extends keyof CRMProperty['location']>(k: K, v: string | number | undefined) =>
    setForm(f => ({ ...f, location: { ...f.location, [k]: v } }));

  // Geocode via Nominatim (free, no key required)
  const geocodeAddress = async () => {
    const q = [form.location.address, form.location.locality, 'Malta'].filter(Boolean).join(', ');
    if (!q.trim()) { setGeocodeError('Enter an address or locality first.'); return; }
    setGeocoding(true);
    setGeocodeError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json() as { lat?: string; lon?: string }[];
      if (data.length === 0) {
        setGeocodeError('No results found. Try a different address.');
      } else {
        const { lat, lon } = data[0];
        setForm(f => ({ ...f, location: { ...f.location, latitude: parseFloat(lat!), longitude: parseFloat(lon!) } }));
      }
    } catch {
      setGeocodeError('Geocoding request failed. Check your network connection.');
    } finally {
      setGeocoding(false);
    }
  };

  const handleSave = () => {
    if (!form.title.trim()) { setTab('details'); return; }
    const prop = addProperty(form);
    activityProperty.added(prop.id, prop.title);
    navigate(`/crm/properties/${prop.id}`);
  };

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
  const lbl = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Add Property</h1>
        <button
          onClick={handleSave}
          className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> Save property
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t.id
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        {/* ── Details ── */}
        {tab === 'details' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Grand Harbour Penthouse — Valletta" className={inputCls} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value as CRMProperty['category'])} className={inputCls}>
                  {['Villa','Penthouse','Apartment','Farmhouse','Palazzo','Townhouse','Development Site','Commercial','Other'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Sale / Let</label>
                <select value={form.saleOrLet} onChange={e => set('saleOrLet', e.target.value as CRMProperty['saleOrLet'])} className={inputCls}>
                  <option value="Sale">Sale</option>
                  <option value="Let">Let</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as CRMProperty['status'])} className={inputCls}>
                  {['Available','Reserved','Sold','Let','Off Market'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Market status</label>
                <select value={form.marketStatus} onChange={e => set('marketStatus', e.target.value as CRMProperty['marketStatus'])} className={inputCls}>
                  {['Live','Draft','Off Market','Sold STC'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>Price type</label>
                <select value={form.priceType ?? 'Fixed'} onChange={e => set('priceType', e.target.value as CRMProperty['priceType'])} className={inputCls}>
                  {['Fixed','POA','Guide Price','Reduced'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Asking price (€)</label>
                <input type="number" value={form.askingPrice ?? ''} onChange={e => set('askingPrice', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 2500000" />
              </div>
              <div>
                <label className={lbl}>Monthly rent (€)</label>
                <input type="number" value={form.monthlyRent ?? ''} onChange={e => set('monthlyRent', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 8000" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>Furnishing</label>
                <select value={form.furnishing ?? 'Unfurnished'} onChange={e => set('furnishing', e.target.value as CRMProperty['furnishing'])} className={inputCls}>
                  {['Furnished','Part-Furnished','Unfurnished','Shell'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Finishing</label>
                <select value={form.finishing ?? 'Standard'} onChange={e => set('finishing', e.target.value as CRMProperty['finishing'])} className={inputCls}>
                  {['Luxury','High Spec','Standard','Requires Renovation'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Year built</label>
                <input type="number" value={form.yearBuilt ?? ''} onChange={e => set('yearBuilt', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 2020" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Reference code</label>
                <input value={form.referenceCode ?? ''} onChange={e => set('referenceCode', e.target.value || undefined)} className={inputCls} placeholder="e.g. EPM-007" />
              </div>
              <div>
                <label className={lbl}>Assigned agent</label>
                <select value={form.assignedAgent ?? ''} onChange={e => set('assignedAgent', e.target.value || undefined)} className={inputCls}>
                  <option value="">Unassigned</option>
                  <option value="Nico Dalton">Nico Dalton</option>
                  <option value="Luke Muscat">Luke Muscat</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Features ── */}
        {tab === 'features' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {([['bedrooms','Bedrooms'],['bathrooms','Bathrooms'],['garages','Garages']] as const).map(([k, l]) => (
                <div key={k}>
                  <label className={lbl}>{l}</label>
                  <input type="number" min={0} value={form.features[k] ?? ''} onChange={e => setFeature(k, e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {([['internalM2','Internal m²'],['externalM2','External m²'],['terraceM2','Terrace m²']] as const).map(([k, l]) => (
                <div key={k}>
                  <label className={lbl}>{l}</label>
                  <input type="number" min={0} value={form.features[k] ?? ''} onChange={e => setFeature(k, e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([['pools','Pool'],['garden','Garden'],['seaview','Sea view'],['elevator','Elevator'],['centralAC','Central A/C'],['smartHome','Smart home'],['concierge','Concierge']] as [keyof CRMProperty['features'], string][]).filter(([k]) => typeof form.features[k] !== 'number').map(([k, l]) => (
                <label key={k} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={Boolean(form.features[k as keyof typeof form.features])} onChange={e => setFeature(k as keyof CRMProperty['features'], e.target.checked as never)} className="accent-amber-500" />
                  {l}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── Owner ── */}
        {tab === 'owner' && (
          <div className="space-y-4">
            {([['name','Vendor name'],['email','Email'],['phone','Phone']] as const).map(([k, l]) => (
              <div key={k}>
                <label className={lbl}>{l}</label>
                <input value={form.owner[k] ?? ''} onChange={e => setOwner(k, e.target.value)} className={inputCls} />
              </div>
            ))}
            <div>
              <label className={lbl}>Notes (private)</label>
              <textarea value={form.owner.notes ?? ''} onChange={e => setOwner('notes', e.target.value)} rows={3} className={`${inputCls} h-auto py-2 resize-none`} />
            </div>
          </div>
        )}

        {/* ── Media ── */}
        {tab === 'media' && (
          <CRMImageUploader
            value={{ featuredImageUrl: form.media.featuredImageUrl, galleryUrls: form.media.galleryUrls }}
            onChange={v => set('media', { ...form.media, ...v })}
          />
        )}

        {/* ── Location ── */}
        {tab === 'location' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Address</label>
              <input value={form.location.address ?? ''} onChange={e => setLocation('address', e.target.value || undefined)} className={inputCls} placeholder="Street and number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Locality</label>
                <input value={form.location.locality ?? ''} onChange={e => setLocation('locality', e.target.value || undefined)} className={inputCls} placeholder="e.g. Valletta" />
              </div>
              <div>
                <label className={lbl}>Region</label>
                <input value={form.location.region ?? ''} onChange={e => setLocation('region', e.target.value || undefined)} className={inputCls} placeholder="e.g. South Eastern" />
              </div>
            </div>

            {/* Geocode button */}
            <div className="flex items-end gap-3">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Latitude</label>
                  <input type="number" step="any" value={form.location.latitude ?? ''} onChange={e => setLocation('latitude', e.target.value ? parseFloat(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 35.8997" />
                </div>
                <div>
                  <label className={lbl}>Longitude</label>
                  <input type="number" step="any" value={form.location.longitude ?? ''} onChange={e => setLocation('longitude', e.target.value ? parseFloat(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 14.5148" />
                </div>
              </div>
              <button
                type="button"
                onClick={geocodeAddress}
                disabled={geocoding}
                className="h-10 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors disabled:opacity-60 shrink-0"
              >
                {geocoding ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                {geocoding ? 'Geocoding…' : 'Geocode address'}
              </button>
            </div>
            {geocodeError && <p className="text-xs text-red-500 dark:text-red-400">{geocodeError}</p>}

            <CRMMapPreview
              latitude={form.location.latitude}
              longitude={form.location.longitude}
              label={form.title || 'Property'}
              height={240}
            />
          </div>
        )}

        {/* ── Notes ── */}
        {tab === 'notes' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Public description</label>
              <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value || undefined)} rows={5} className={`${inputCls} h-auto py-2 resize-none`} placeholder="Marketing description for this property…" />
            </div>
            <div>
              <label className={lbl}>Internal notes (private — not shown to clients)</label>
              <textarea value={form.internalNotes ?? ''} onChange={e => set('internalNotes', e.target.value || undefined)} rows={4} className={`${inputCls} h-auto py-2 resize-none`} placeholder="Vendor motivations, pricing context, strategy notes…" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
