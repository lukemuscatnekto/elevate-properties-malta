import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Building2, X } from 'lucide-react';
import { getProperties, deleteProperties, restoreProperties } from '../utils/storage';
import { propertiesToCSV, downloadCSV } from '../utils/csvHelpers';
import { useUrlFilter } from '../utils/useUrlFilter';
import BulkActionBar from '../components/BulkActionBar';
import ConfirmDialog from '../components/ConfirmDialog';
import UndoToast from '../components/UndoToast';
import type { CRMProperty } from '../types';

const STATUSES = ['Available','Reserved','Sold','Let','Off Market'] as const;
const CATEGORIES = ['Villa','Penthouse','Apartment','Farmhouse','Palazzo','Townhouse','Development Site','Commercial','Other'] as const;

const STATUS_COLOUR: Record<string, string> = {
  Available:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Reserved:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Sold:        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  Let:         'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Off Market': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

function fmtPrice(p: CRMProperty) {
  const fmt = (n: number) => n >= 1_000_000 ? `€${(n/1_000_000).toFixed(1)}M` : `€${(n/1000).toFixed(0)}k`;
  if (p.priceType === 'POA') return 'POA';
  if (p.askingPrice) return fmt(p.askingPrice);
  if (p.monthlyRent) return `€${p.monthlyRent.toLocaleString()}/mo`;
  return '—';
}

export default function Properties() {
  const navigate = useNavigate();
  const { get, set, clearAll, hasAny } = useUrlFilter();

  const q        = get('q');
  const status   = get('status');
  const type     = get('type');
  const sl       = get('sl');
  const locality = get('locality');

  const [props, setProps]         = useState<CRMProperty[]>(() => getProperties());
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [undoItems, setUndoItems] = useState<CRMProperty[] | null>(null);

  const filtered = useMemo(() => {
    let out = props;
    if (q)        out = out.filter(p => `${p.title} ${p.referenceCode ?? ''} ${p.location.locality ?? ''}`.toLowerCase().includes(q.toLowerCase()));
    if (status)   out = out.filter(p => p.status === status);
    if (type)     out = out.filter(p => p.category === type);
    if (sl)       out = out.filter(p => p.saleOrLet === sl);
    if (locality) out = out.filter(p => (p.location.locality ?? '').toLowerCase().includes(locality.toLowerCase()));
    return out;
  }, [props, q, status, type, sl, locality]);

  const allSelected = filtered.length > 0 && filtered.every(p => selected.has(p.id));

  const toggleSelect = (id: string) => {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleAll = () => {
    allSelected ? setSelected(new Set()) : setSelected(new Set(filtered.map(p => p.id)));
  };

  const handleBulkDelete = () => setConfirmOpen(true);
  const confirmDelete = () => {
    const ids = Array.from(selected);
    const removed = deleteProperties(ids);
    setUndoItems(removed);
    setProps(getProperties());
    setSelected(new Set());
    setConfirmOpen(false);
  };

  const handleExportSelected = () => {
    const toExport = filtered.filter(p => selected.has(p.id));
    downloadCSV(propertiesToCSV(toExport), 'elevate-properties.csv');
  };
  const handleExportAll = () => downloadCSV(propertiesToCSV(props), 'elevate-properties-all.csv');

  const inputCls = 'h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Properties</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{props.length} total — {filtered.length} shown</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={handleExportAll} className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => navigate('/crm/properties/add')} className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
        <input type="search" placeholder="Search title, ref, locality…" value={q} onChange={e => set('q', e.target.value)} className={`${inputCls} w-48`} />
        <select value={status} onChange={e => set('status', e.target.value)} className={inputCls}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={type} onChange={e => set('type', e.target.value)} className={inputCls}>
          <option value="">All types</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sl} onChange={e => set('sl', e.target.value)} className={inputCls}>
          <option value="">Sale & Let</option>
          <option value="Sale">Sale</option>
          <option value="Let">Let</option>
          <option value="Both">Both</option>
        </select>
        <input type="search" placeholder="Locality…" value={locality} onChange={e => set('locality', e.target.value)} className={`${inputCls} w-32`} />
        {hasAny(['q','status','type','sl','locality']) && (
          <button onClick={() => clearAll()} className="flex items-center gap-1 h-8 px-2 rounded-lg text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          entityLabel="property"
          onDelete={handleBulkDelete}
          onExportCSV={handleExportSelected}
          onClearSelection={() => setSelected(new Set())}
        />
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div
            key={p.id}
            className={`bg-white dark:bg-slate-800 rounded-xl border overflow-hidden cursor-pointer hover:shadow-md transition-all group ${
              selected.has(p.id) ? 'border-amber-400 dark:border-amber-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {/* Selection checkbox */}
            <div className="relative">
              <div className="aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden" onClick={() => navigate(`/crm/properties/${p.id}`)}>
                {p.media.featuredImageUrl
                  ? <img src={p.media.featuredImageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600"><Building2 className="w-8 h-8" /></div>
                }
              </div>
              <div className="absolute top-2 left-2" onClick={e => { e.stopPropagation(); toggleSelect(p.id); }}>
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => {}}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                  aria-label={`Select ${p.title}`}
                />
              </div>
              <span className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLOUR[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="p-4" onClick={() => navigate(`/crm/properties/${p.id}`)}>
              <p className="text-xs text-slate-400 mb-1">{p.referenceCode ?? p.category} — {p.location.locality ?? 'Malta'}</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 mb-1">
                {p.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-bold text-amber-600 dark:text-amber-400">{fmtPrice(p)}</span>
                <span className="text-xs text-slate-400">{p.saleOrLet}</span>
              </div>
              {(p.features.bedrooms != null) && (
                <p className="text-xs text-slate-400 mt-1">
                  {p.features.bedrooms} bed · {p.features.bathrooms ?? '—'} bath
                  {p.features.internalM2 ? ` · ${p.features.internalM2}m²` : ''}
                </p>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No properties match the current filters.</p>
          </div>
        )}
      </div>

      {/* Header checkbox for all */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-amber-500" />
          <span className="text-xs text-slate-400">{allSelected ? 'Deselect all' : `Select all ${filtered.length}`}</span>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title={`Delete ${selected.size} propert${selected.size !== 1 ? 'ies' : 'y'}?`}
        message="This will remove the selected properties from your CRM. You can undo immediately after."
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {undoItems && (
        <UndoToast
          message={`Deleted ${undoItems.length} propert${undoItems.length !== 1 ? 'ies' : 'y'}.`}
          onUndo={() => { restoreProperties(undoItems); setProps(getProperties()); setUndoItems(null); }}
          onDismiss={() => setUndoItems(null)}
        />
      )}
    </div>
  );
}
