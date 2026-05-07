import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, Loader2 } from 'lucide-react';
import { getProperties, updateProperty } from '../utils/storage';
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

export default function PropertyEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const existing = getProperties().find(p => p.id === id);
  const [form, setForm] = useState<CRMProperty>(existing ?? {
    id: '', title: '', category: 'Apartment', saleOrLet: 'Sale',
    status: 'Available', marketStatus: 'Draft',
    features: {}, owner: {}, media: {}, location: {},
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  });
  const [prevStatus] = useState(form.status);
  const [tab, setTab] = useState<Tab>('details');
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');

  if (!existing) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-slate-500">Property not found.</p>
        <Link to="/crm/properties" className="text-amber-600 hover:underline text-sm">Back</Link>
      </div>
    );
  }

  const set = <K extends keyof CRMProperty>(k: K, v: CRMProperty[K]) => setForm(f => ({ ...f, [k]: v }));
  const setFeature = <K extends keyof CRMProperty['features']>(k: K, v: CRMProperty['features'][K]) =>
    setForm(f => ({ ...f, features: { ...f.features, [k]: v } }));
  const setOwner = <K extends keyof CRMProperty['owner']>(k: K, v: string) =>
    setForm(f => ({ ...f, owner: { ...f.owner, [k]: v } }));
  const setLocation = <K extends keyof CRMProperty['location']>(k: K, v: string | number | undefined) =>
    setForm(f => ({ ...f, location: { ...f.location, [k]: v } }));

  const geocodeAddress = async () => {
    const q = [form.location.address, form.location.locality, 'Malta'].filter(Boolean).join(', ');
    if (!q.trim()) { setGeocodeError('Enter an address or locality first.'); return; }
    setGeocoding(true); setGeocodeError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json() as { lat?: string; lon?: string }[];
      if (!data.length) { setGeocodeError('No results. Try a different address.'); }
      else {
        const { lat, lon } = data[0];
        setForm(f => ({ ...f, location: { ...f.location, latitude: parseFloat(lat!), longitude: parseFloat(lon!) } }));
      }
    } catch { setGeocodeError('Geocoding failed. Check your connection.'); }
    finally { setGeocoding(false); }
  };

  const handleSave = () => {
    if (form.status !== prevStatus) activityProperty.statusChanged(form.id, prevStatus, form.status);
    updateProperty(form.id, form);
    navigate(`/crm/properties/${form.id}`);
  };

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
  const lbl = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Link to={`/crm/properties/${id}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 ml-2">Edit Property</h1>
        <button onClick={handleSave} className="ml-auto h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold flex items-center gap-2 transition-colors">
          <Save className="w-4 h-4" /> Save changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.id ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        {tab === 'details' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} required />
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
                  <option value="Sale">Sale</option><option value="Let">Let</option><option value="Both">Both</option>
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
                <input type="number" value={form.askingPrice ?? ''} onChange={e => set('askingPrice', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
              </div>
              <div>
                <label className={lbl}>Monthly rent (€)</label>
                <input type="number" value={form.monthlyRent ?? ''} onChange={e => set('monthlyRent', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>Furnishing</label>
                <select value={form.furnishing ?? ''} onChange={e => set('furnishing', e.target.value as CRMProperty['furnishing'])} className={inputCls}>
                  {['Furnished','Part-Furnished','Unfurnished','Shell'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Finishing</label>
                <select value={form.finishing ?? ''} onChange={e => set('finishing', e.target.value as CRMProperty['finishing'])} className={inputCls}>
                  {['Luxury','High Spec','Standard','Requires Renovation'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Year built</label>
                <input type="number" value={form.yearBuilt ?? ''} onChange={e => set('yearBuilt', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Reference code</label>
                <input value={form.referenceCode ?? ''} onChange={e => set('referenceCode', e.target.value || undefined)} className={inputCls} />
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

        {tab === 'features' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {(['bedrooms','bathrooms','garages'] as const).map(k => (
                <div key={k}>
                  <label className={lbl}>{k.charAt(0).toUpperCase()+k.slice(1)}</label>
                  <input type="number" min={0} value={form.features[k] ?? ''} onChange={e => setFeature(k, e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {(['internalM2','externalM2','terraceM2'] as const).map(k => (
                <div key={k}>
                  <label className={lbl}>{k === 'internalM2' ? 'Internal m²' : k === 'externalM2' ? 'External m²' : 'Terrace m²'}</label>
                  <input type="number" min={0} value={form.features[k] ?? ''} onChange={e => setFeature(k, e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['pools','garden','seaview','elevator','centralAC','smartHome','concierge'] as const).map(k => (
                <label key={k} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={Boolean(form.features[k])} onChange={e => setFeature(k, e.target.checked as never)} className="accent-amber-500" />
                  {k === 'seaview' ? 'Sea view' : k === 'centralAC' ? 'Central A/C' : k === 'smartHome' ? 'Smart home' : k.charAt(0).toUpperCase()+k.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}

        {tab === 'owner' && (
          <div className="space-y-4">
            {(['name','email','phone'] as const).map(k => (
              <div key={k}>
                <label className={lbl}>{k.charAt(0).toUpperCase()+k.slice(1)}</label>
                <input value={form.owner[k] ?? ''} onChange={e => setOwner(k, e.target.value)} className={inputCls} />
              </div>
            ))}
            <div>
              <label className={lbl}>Notes (private)</label>
              <textarea value={form.owner.notes ?? ''} onChange={e => setOwner('notes', e.target.value)} rows={3} className={`${inputCls} h-auto py-2 resize-none`} />
            </div>
          </div>
        )}

        {tab === 'media' && (
          <CRMImageUploader
            value={{ featuredImageUrl: form.media.featuredImageUrl, galleryUrls: form.media.galleryUrls }}
            onChange={v => set('media', { ...form.media, ...v })}
          />
        )}

        {tab === 'location' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Address</label>
              <input value={form.location.address ?? ''} onChange={e => setLocation('address', e.target.value || undefined)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Locality</label>
                <input value={form.location.locality ?? ''} onChange={e => setLocation('locality', e.target.value || undefined)} className={inputCls} />
              </div>
              <div>
                <label className={lbl}>Region</label>
                <input value={form.location.region ?? ''} onChange={e => setLocation('region', e.target.value || undefined)} className={inputCls} />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Latitude</label>
                  <input type="number" step="any" value={form.location.latitude ?? ''} onChange={e => setLocation('latitude', e.target.value ? parseFloat(e.target.value) : undefined)} className={inputCls} />
                </div>
                <div>
                  <label className={lbl}>Longitude</label>
                  <input type="number" step="any" value={form.location.longitude ?? ''} onChange={e => setLocation('longitude', e.target.value ? parseFloat(e.target.value) : undefined)} className={inputCls} />
                </div>
              </div>
              <button type="button" onClick={geocodeAddress} disabled={geocoding} className="h-10 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors disabled:opacity-60 shrink-0">
                {geocoding ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                {geocoding ? 'Geocoding…' : 'Geocode address'}
              </button>
            </div>
            {geocodeError && <p className="text-xs text-red-500">{geocodeError}</p>}
            <CRMMapPreview latitude={form.location.latitude} longitude={form.location.longitude} label={form.title} height={240} />
          </div>
        )}

        {tab === 'notes' && (
          <div className="space-y-4">
            <div>
              <label className={lbl}>Public description</label>
              <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value || undefined)} rows={5} className={`${inputCls} h-auto py-2 resize-none`} />
            </div>
            <div>
              <label className={lbl}>Internal notes (private)</label>
              <textarea value={form.internalNotes ?? ''} onChange={e => set('internalNotes', e.target.value || undefined)} rows={4} className={`${inputCls} h-auto py-2 resize-none`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
