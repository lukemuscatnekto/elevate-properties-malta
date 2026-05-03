import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Maximize, User, Pencil } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMStatusBadge from '../components/CRMStatusBadge';
import CRMMapPreview from '../components/CRMMapPreview';
import { getProperties, updateProperty } from '../utils/storage';
import type { CRMProperty, CRMPropertyStatus } from '../types';

const QUICK_STATUSES: CRMPropertyStatus[] = ['Available', 'Reserved', 'Sold', 'Let'];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<CRMProperty | null>(null);

  useEffect(() => {
    const all = getProperties();
    setProperty(all.find((p) => p.id === id) ?? null);
  }, [id]);

  if (!property) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/crm/properties')}
          className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to properties
        </button>
        <div className="text-sm text-slate-500">Property not found.</div>
      </div>
    );
  }

  const featureEntries = Object.entries(property.features).filter(([, v]) => v);
  const galleryUrls = property.media.galleryUrls.filter((u) => u !== property.media.featuredImageUrl);

  function setStatus(status: CRMPropertyStatus) {
    if (!property) return;
    const updated = updateProperty(property.id, { status });
    if (updated) setProperty(updated);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <Link to="/crm/properties" className="text-xs text-slate-500 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Properties
          </Link>
          <h1 className="text-2xl font-semibold text-slate-800 mt-1">{property.title}</h1>
          <p className="text-sm text-slate-500 inline-flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> {property.location.address || `${property.location.locality}, ${property.location.country}`}
          </p>
          <p className="text-xs text-slate-400 font-mono mt-1">{property.reference}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <CRMStatusBadge value={property.status} />
            <button
              type="button"
              onClick={() => navigate(`/crm/properties/${property.id}/edit`)}
              className="inline-flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-sm font-medium px-3 py-2 rounded-md text-slate-700"
            >
              <Pencil className="w-4 h-4" /> Edit Property
            </button>
          </div>
          <p className="text-2xl font-semibold text-slate-800 mt-1">€{property.currentPrice.toLocaleString()}</p>
          <p className="text-xs text-slate-500">{property.priceType} · {property.saleOrLet}</p>
          {property.originalPrice !== property.currentPrice && (
            <p className="text-xs text-slate-400 line-through">Was €{property.originalPrice.toLocaleString()}</p>
          )}
        </div>
      </header>

      {/* Quick status actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 mr-1">Mark as:</span>
        {QUICK_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            disabled={property.status === s}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              property.status === s
                ? 'bg-teal-50 border-teal-200 text-teal-700 cursor-default'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Hero + gallery */}
      {property.media.featuredImageUrl && (
        <div className="space-y-2">
          <img
            src={property.media.featuredImageUrl}
            alt={property.title}
            className="w-full h-72 object-cover rounded-lg border border-slate-200"
          />
          {galleryUrls.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {galleryUrls.map((u, idx) => (
                <img key={`${u}-${idx}`} src={u} alt="" className="w-full h-20 object-cover rounded border border-slate-200" />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CRMCard title="Overview" className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Stat icon={<Bed className="w-4 h-4 text-slate-400" />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<Bath className="w-4 h-4 text-slate-400" />} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={<Maximize className="w-4 h-4 text-slate-400" />} label="Inside" value={`${property.insideAreaSqm} m²`} />
            <Stat icon={<Maximize className="w-4 h-4 text-slate-400" />} label="Outside" value={`${property.outsideAreaSqm} m²`} />
          </div>
          {property.publicDescription && (
            <>
              <hr className="my-4 border-slate-100" />
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{property.publicDescription}</p>
            </>
          )}
          {property.privateDescription && (
            <>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-4">Private notes</p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{property.privateDescription}</p>
            </>
          )}
        </CRMCard>

        <CRMCard title="Owner">
          {property.owner.name ? (
            <>
              <p className="text-sm text-slate-700 inline-flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" /> {property.owner.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">{property.owner.phone || '—'}</p>
              <p className="text-xs text-slate-500">{property.owner.email || '—'}</p>
              {property.owner.notes && <p className="text-xs text-slate-500 mt-2">{property.owner.notes}</p>}
            </>
          ) : (
            <p className="text-sm text-slate-500">No owner contact recorded.</p>
          )}
        </CRMCard>

        <CRMCard title="Features" className="lg:col-span-2">
          {featureEntries.length === 0 ? (
            <p className="text-sm text-slate-500">No special features recorded.</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {featureEntries.map(([k]) => (
                <li key={k} className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700">
                  {k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                </li>
              ))}
            </ul>
          )}
        </CRMCard>

        <CRMCard title="Listing meta">
          <dl className="text-sm space-y-2">
            <Row k="Reference" v={property.reference} />
            <Row k="Type" v={property.category} />
            <Row k="Furnishing" v={property.furnishing} />
            <Row k="Finishing" v={property.finishing} />
            <Row k="Year Built" v={property.yearBuilt ?? '—'} />
            <Row k="Agent" v={property.assignedAgent} />
            <Row k="Updated" v={new Date(property.updatedAt).toLocaleDateString('en-GB')} />
          </dl>
        </CRMCard>

        <CRMCard title="Location" className="lg:col-span-3" padded={false}>
          <div className="p-4 pb-0">
            <p className="text-sm text-slate-700">
              {property.location.address || '—'}
            </p>
            <p className="text-xs text-slate-500">
              {[property.location.locality, property.location.region, property.location.country].filter(Boolean).join(' · ')}
            </p>
          </div>
          <CRMMapPreview
            latitude={property.location.latitude}
            longitude={property.location.longitude}
            label={property.title}
            height={320}
          />
        </CRMCard>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 inline-flex items-center gap-1">{icon} {label}</p>
      <p className="text-base font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-1 last:border-0">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-slate-800 text-right">{v}</dd>
    </div>
  );
}
