import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CRMCard from '../components/CRMCard';
import CRMTable, { type CRMTableColumn } from '../components/CRMTable';
import CRMStatusBadge from '../components/CRMStatusBadge';
import CRMFilterPanel from '../components/CRMFilterPanel';
import { getProperties } from '../utils/storage';
import { useUrlFilter } from '../utils/useUrlFilter';
import type { CRMProperty, CRMPropertyCategory, CRMPropertyStatus, SaleOrLet } from '../types';

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

export default function Properties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<CRMProperty[]>([]);
  const { get, set, clearAll, hasAny } = useUrlFilter();

  // URL-backed filters
  const search = get('q');
  const statusFilter = get('status', 'All') as CRMPropertyStatus | 'All';
  const categoryFilter = get('type', 'All') as CRMPropertyCategory | 'All';
  const salFilter = get('sl', 'All') as SaleOrLet | 'All';
  const localityFilter = get('locality');

  useEffect(() => {
    setProperties(getProperties());
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (salFilter !== 'All' && p.saleOrLet !== salFilter) return false;
      if (localityFilter && !p.location.locality.toLowerCase().includes(localityFilter.toLowerCase())) {
        return false;
      }
      if (search) {
        const q = search.toLowerCase();
        const blob = `${p.reference} ${p.title} ${p.location.locality} ${p.location.address}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [properties, search, statusFilter, categoryFilter, salFilter, localityFilter]);

  const columns: CRMTableColumn<CRMProperty>[] = [
    {
      key: 'thumb',
      header: '',
      className: 'w-16',
      render: (p) => (
        <div className="w-12 h-12 rounded overflow-hidden bg-slate-100">
          {p.media.featuredImageUrl && (
            <img
              src={p.media.featuredImageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      ),
    },
    {
      key: 'ref',
      header: 'Reference',
      render: (p) => (
        <Link to={`/crm/properties/${p.id}`} className="text-teal-700 hover:underline font-mono text-xs">
          {p.reference}
        </Link>
      ),
    },
    {
      key: 'title',
      header: 'Property',
      render: (p) => (
        <div>
          <p className="font-medium text-slate-800">{p.title}</p>
          <p className="text-xs text-slate-500">{p.location.locality}</p>
        </div>
      ),
    },
    { key: 'cat', header: 'Type', render: (p) => <span className="text-slate-600">{p.category}</span> },
    { key: 'sl', header: 'Sale / Let', render: (p) => <span className="text-slate-600">{p.saleOrLet}</span> },
    {
      key: 'price',
      header: 'Price',
      render: (p) => (
        <div>
          <p className="font-medium text-slate-800">€{p.currentPrice.toLocaleString()}</p>
          {p.originalPrice !== p.currentPrice && (
            <p className="text-xs text-slate-400 line-through">€{p.originalPrice.toLocaleString()}</p>
          )}
        </div>
      ),
    },
    { key: 'beds', header: 'Beds', render: (p) => <span className="text-slate-600">{p.bedrooms}</span> },
    { key: 'baths', header: 'Baths', render: (p) => <span className="text-slate-600">{p.bathrooms}</span> },
    { key: 'area', header: 'Area', render: (p) => <span className="text-slate-600">{p.insideAreaSqm} m²</span> },
    {
      key: 'quality',
      header: 'Quality',
      render: (p) => (
        <span className="inline-flex items-center gap-1">
          <span className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <span className="block h-full bg-amber-400" style={{ width: `${p.qualityScore * 10}%` }} />
          </span>
          <span className="text-xs text-slate-500">{p.qualityScore}/10</span>
        </span>
      ),
    },
    { key: 'status', header: 'Status', render: (p) => <CRMStatusBadge value={p.status} /> },
  ];

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Properties</h1>
          <p className="text-sm text-slate-500">{filtered.length} of {properties.length} listings</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/crm/properties/add')}
          className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </header>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-md flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            aria-label="Search properties"
            placeholder="Search by reference, title or locality…"
            value={search}
            onChange={(e) => set('q', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700"
          />
        </div>
        {hasAny(['q', 'status', 'type', 'sl', 'locality']) && (
          <button
            type="button"
            onClick={() => clearAll()}
            className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      <CRMFilterPanel title="Property Search & Filter Options" defaultOpen={hasAny(['status', 'type', 'sl', 'locality'])}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => set('status', e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Type</span>
            <select
              value={categoryFilter}
              onChange={(e) => set('type', e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {CATEGORIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Sale / Rental</span>
            <select
              value={salFilter}
              onChange={(e) => set('sl', e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              <option value="Sale">Sale</option>
              <option value="Rental">Rental</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Locality</span>
            <input
              type="text"
              value={localityFilter}
              onChange={(e) => set('locality', e.target.value)}
              placeholder="e.g. Sliema"
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            />
          </label>
        </div>
      </CRMFilterPanel>

      <CRMCard padded={false}>
        <CRMTable<CRMProperty>
          columns={columns}
          rows={filtered}
          rowKey={(p) => p.id}
          onRowClick={(p) => navigate(`/crm/properties/${p.id}`)}
          emptyMessage="No properties match the current filters."
        />
      </CRMCard>
    </div>
  );
}
