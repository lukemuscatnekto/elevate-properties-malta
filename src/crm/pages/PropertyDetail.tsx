import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Edit2, Trash2, MapPin, Bed, Bath, Maximize,
  Building2, Calendar, User,
} from 'lucide-react';
import { getProperties, deleteProperty, updateProperty, getViewings, getLeads } from '../utils/storage';
import { activityProperty } from '../utils/activity';
import CRMMapPreview from '../components/CRMMapPreview';
import ActivityTimeline from '../components/ActivityTimeline';
import ConfirmDialog from '../components/ConfirmDialog';
import type { CRMProperty, CRMPropertyStatus } from '../types';

const STATUS_COLOUR: Record<string, string> = {
  Available:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Reserved:     'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Sold:         'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  Let:          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Off Market': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

const QUICK_STATUSES: CRMPropertyStatus[] = ['Available', 'Reserved', 'Sold', 'Let'];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface RowProps { label: string; value?: React.ReactNode }
function Row({ label, value }: RowProps) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-xs text-slate-400 w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  );
}

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<CRMProperty | null>(
    () => getProperties().find(p => p.id === id) ?? null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const viewings = getViewings().filter(v => v.propertyId === id);
  const leads    = getLeads();

  if (!property) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-slate-500">Property not found.</p>
        <Link to="/crm/properties" className="text-amber-600 hover:underline text-sm">Back to Properties</Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteProperty(property.id);
    navigate('/crm/properties');
  };

  const handleStatusChange = (newStatus: CRMPropertyStatus) => {
    const prev = property.status;
    const updated = updateProperty(property.id, { status: newStatus });
    if (updated) {
      setProperty(updated);
      activityProperty.statusChanged(property.id, prev, newStatus);
    }
  };

  const fmtPrice = () => {
    const fmt = (n: number) => n >= 1_000_000 ? `€${(n/1_000_000).toFixed(2)}M` : `€${n.toLocaleString()}`;
    if (property.priceType === 'POA') return 'Price on application';
    if (property.askingPrice) return fmt(property.askingPrice);
    if (property.monthlyRent) return `€${property.monthlyRent.toLocaleString()}/month`;
    return 'Not disclosed';
  };

  const gallery = (property.media.galleryUrls ?? []).filter(u => u !== property.media.featuredImageUrl);

  return (
    <div className="max-w-6xl space-y-5">
      {/* Navigation + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/crm/properties" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Properties
        </Link>
        <div className="ml-auto flex flex-wrap gap-2">
          <Link
            to={`/crm/properties/${property.id}/edit`}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </Link>
          <button
            onClick={() => setConfirmDelete(true)}
            className="h-9 px-3 rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-slate-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Hero image */}
          {property.media.featuredImageUrl && (
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img src={property.media.featuredImageUrl} alt={property.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {gallery.map((url, i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Title card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">{property.referenceCode ?? property.category} · {property.saleOrLet}</p>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{property.title}</h1>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLOUR[property.status]}`}>
                {property.status}
              </span>
            </div>

            {property.location.locality && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {[property.location.locality, property.location.region, property.location.country].filter(Boolean).join(', ')}
              </div>
            )}

            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-3">{fmtPrice()}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-4">
              {property.features.bedrooms != null && (
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Bed className="w-4 h-4 text-slate-400" /> {property.features.bedrooms} bed
                </div>
              )}
              {property.features.bathrooms != null && (
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Bath className="w-4 h-4 text-slate-400" /> {property.features.bathrooms} bath
                </div>
              )}
              {property.features.internalM2 && (
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Maximize className="w-4 h-4 text-slate-400" /> {property.features.internalM2}m² internal
                </div>
              )}
              {property.features.seaview && (
                <span className="text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full">Sea view</span>
              )}
              {property.features.pools && (
                <span className="text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 px-2 py-0.5 rounded-full">Pool</span>
              )}
            </div>

            {/* Quick status change */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs font-medium text-slate-400 self-center">Change status:</span>
              {QUICK_STATUSES.filter(s => s !== property.status).map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`h-7 px-3 rounded-full text-xs font-medium transition-colors ${STATUS_COLOUR[s]} hover:opacity-80`}
                >
                  Mark as {s}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Details</h2>
            <Row label="Category"    value={property.category} />
            <Row label="Finishing"   value={property.finishing} />
            <Row label="Furnishing"  value={property.furnishing} />
            <Row label="Year built"  value={property.yearBuilt} />
            <Row label="Market"      value={property.marketStatus} />
            <Row label="Agent"       value={property.assignedAgent} />
            <Row label="Added"       value={fmtDate(property.createdAt)} />
            <Row label="Updated"     value={fmtDate(property.updatedAt)} />
            {property.description && (
              <div className="pt-3">
                <p className="text-xs font-medium text-slate-400 mb-2">Description</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{property.description}</p>
              </div>
            )}
            {property.internalNotes && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-3">
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">Internal notes</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{property.internalNotes}</p>
              </div>
            )}
          </div>

          {/* Owner */}
          {(property.owner.name || property.owner.email) && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-slate-400" /> Owner / Vendor
              </h2>
              <Row label="Name"  value={property.owner.name} />
              <Row label="Email" value={property.owner.email ? <a href={`mailto:${property.owner.email}`} className="text-amber-600 hover:underline">{property.owner.email}</a> : undefined} />
              <Row label="Phone" value={property.owner.phone ? <a href={`tel:${property.owner.phone}`} className="text-amber-600 hover:underline">{property.owner.phone}</a> : undefined} />
              <Row label="Notes" value={property.owner.notes} />
            </div>
          )}

          {/* Viewings */}
          {viewings.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-400" /> Viewings ({viewings.length})
              </h2>
              <div className="space-y-2">
                {viewings.map(v => {
                  const lead = leads.find(l => l.id === v.leadId);
                  return (
                    <div key={v.id} className="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {lead ? `${lead.firstName} ${lead.lastName}` : 'Unknown lead'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(v.scheduledAt).toLocaleString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">{v.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: map + activity */}
        <div className="space-y-5">
          {/* Map */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400" /> Location
            </h2>
            <CRMMapPreview
              latitude={property.location.latitude}
              longitude={property.location.longitude}
              label={property.title}
              height={200}
            />
            {property.location.address && (
              <p className="text-xs text-slate-400 mt-2">{property.location.address}, {property.location.locality}</p>
            )}
          </div>

          {/* Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Activity</h2>
            <ActivityTimeline entityId={property.id} />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this property?"
        message={`"${property.title}" will be permanently removed from the CRM.`}
        confirmLabel="Delete property"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
