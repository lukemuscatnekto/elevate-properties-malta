import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Maximize, User } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMStatusBadge from '../components/CRMStatusBadge';
import { getProperties } from '../utils/storage';
import type { CRMProperty } from '../types';

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
        <button onClick={() => navigate('/crm/properties')} className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to properties
        </button>
        <div className="text-sm text-slate-500">Property not found.</div>
      </div>
    );
  }

  const featureEntries = Object.entries(property.features).filter(([, v]) => v);

  return (
    <div className="space-y-5">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <Link to="/crm/properties" className="text-xs text-slate-500 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Properties
          </Link>
          <h1 className="text-2xl font-semibold text-slate-800 mt-1">{property.title}</h1>
          <p className="text-sm text-slate-500 inline-flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> {property.location.address}
          </p>
        </div>
        <div className="text-right">
          <CRMStatusBadge value={property.status} />
          <p className="text-2xl font-semibold text-slate-800 mt-2">€{property.currentPrice.toLocaleString()}</p>
          <p className="text-xs text-slate-500">{property.priceType} · {property.saleOrLet}</p>
        </div>
      </header>

      {property.media.featuredImageUrl && (
        <img
          src={property.media.featuredImageUrl}
          alt={property.title}
          className="w-full h-72 object-cover rounded-lg border border-slate-200"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CRMCard title="Overview" className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Stat icon={<Bed className="w-4 h-4 text-slate-400" />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<Bath className="w-4 h-4 text-slate-400" />} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={<Maximize className="w-4 h-4 text-slate-400" />} label="Inside" value={`${property.insideAreaSqm} m²`} />
            <Stat icon={<Maximize className="w-4 h-4 text-slate-400" />} label="Outside" value={`${property.outsideAreaSqm} m²`} />
          </div>
          <hr className="my-4 border-slate-100" />
          <p className="text-sm text-slate-600 leading-relaxed">{property.publicDescription}</p>
          {property.privateDescription && (
            <>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-4">Private notes</p>
              <p className="text-sm text-slate-600 leading-relaxed">{property.privateDescription}</p>
            </>
          )}
        </CRMCard>

        <CRMCard title="Owner">
          <p className="text-sm text-slate-700 inline-flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" /> {property.owner.name}
          </p>
          <p className="text-xs text-slate-500 mt-1">{property.owner.phone}</p>
          <p className="text-xs text-slate-500">{property.owner.email}</p>
          {property.owner.notes && <p className="text-xs text-slate-500 mt-2">{property.owner.notes}</p>}
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
          </dl>
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
