import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Upload, X, ChevronUp, ChevronDown } from 'lucide-react';
import { getLeads, deleteLeads, restoreLeads, addLead } from '../utils/storage';
import { leadsToCSV, downloadCSV, parseCSVLeads } from '../utils/csvHelpers';
import { useUrlFilter } from '../utils/useUrlFilter';
import BulkActionBar from '../components/BulkActionBar';
import ConfirmDialog from '../components/ConfirmDialog';
import UndoToast from '../components/UndoToast';
import CSVImportModal from '../components/CSVImportModal';
import type { Lead } from '../types';

const STATUSES = ['New','Contacted','Viewing Scheduled','Negotiating','Won','Lost'] as const;
const SOURCES = ['Website Contact','Website Viewing Request','Website Valuation','Referral','Walk-in','Social Media','Portal','Direct Call','Email','Other'] as const;

const STATUS_COLOUR: Record<string, string> = {
  New:               'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Contacted:         'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Viewing Scheduled': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Negotiating:       'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Won:               'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Lost:              'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
};

function fmtDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function fmtBudget(min?: number, max?: number) {
  const fmt = (n: number) => n >= 1_000_000 ? `€${(n/1_000_000).toFixed(1)}M` : `€${(n/1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (max) return `Up to ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return '—';
}

export default function Leads() {
  const navigate = useNavigate();
  const { get, set, clearAll, hasAny } = useUrlFilter();

  const q       = get('q');
  const status  = get('status');
  const source  = get('source');
  const agent   = get('agent');

  const [leads, setLeads]         = useState<Lead[]>(() => getLeads());
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [undoItems, setUndoItems] = useState<Lead[] | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [sort, setSort] = useState<{ key: keyof Lead; dir: 'asc'|'desc' }>({ key: 'createdAt', dir: 'desc' });

  const filtered = useMemo(() => {
    let out = leads;
    if (q)      out = out.filter(l => `${l.firstName} ${l.lastName} ${l.email} ${l.phone}`.toLowerCase().includes(q.toLowerCase()));
    if (status) out = out.filter(l => l.status === status);
    if (source) out = out.filter(l => l.source === source);
    if (agent)  out = out.filter(l => l.assignedAgent === agent);

    return [...out].sort((a, b) => {
      const av = String(a[sort.key] ?? '');
      const bv = String(b[sort.key] ?? '');
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [leads, q, status, source, agent, sort]);

  const allSelected = filtered.length > 0 && filtered.every(l => selected.has(l.id));

  const toggleSort = (key: keyof Lead) => {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  };

  const toggleSelect = (id: string) => {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(l => l.id)));
  };

  const handleBulkDelete = () => setConfirmOpen(true);

  const confirmDelete = () => {
    const ids = Array.from(selected);
    const removed = deleteLeads(ids);
    setUndoItems(removed);
    setLeads(getLeads());
    setSelected(new Set());
    setConfirmOpen(false);
  };

  const handleUndo = () => {
    if (undoItems) {
      restoreLeads(undoItems);
      setLeads(getLeads());
      setUndoItems(null);
    }
  };

  const handleExportSelected = () => {
    const toExport = filtered.filter(l => selected.has(l.id));
    downloadCSV(leadsToCSV(toExport), 'elevate-leads.csv');
  };

  const handleExportAll = () => downloadCSV(leadsToCSV(leads), 'elevate-leads-all.csv');

  const handleImport = (rows: Partial<Lead>[]) => {
    rows.forEach(r => {
      if (r.firstName && r.email) {
        addLead({
          firstName:      r.firstName,
          lastName:       r.lastName ?? '',
          email:          r.email,
          phone:          r.phone ?? '',
          status:         r.status ?? 'New',
          source:         r.source ?? 'Other',
          enquiryType:    r.enquiryType ?? 'buying',
          budgetMin:      r.budgetMin,
          budgetMax:      r.budgetMax,
          locationInterest: r.locationInterest,
          assignedAgent:  r.assignedAgent,
          notes:          r.notes,
          intakeFormType: 'csv_import',
        });
      }
    });
    setLeads(getLeads());
    setImportOpen(false);
  };

  const SortIcon = ({ col }: { col: keyof Lead }) => {
    if (sort.key !== col) return null;
    return sort.dir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const thCls = 'px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none';
  const inputCls = 'h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="space-y-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{leads.length} total — {filtered.length} shown</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={() => setImportOpen(true)} className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-1.5 transition-colors">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button onClick={handleExportAll} className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-1.5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => navigate('/crm/leads/new')} className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
        <input
          type="search"
          placeholder="Search name, email, phone…"
          value={q}
          onChange={e => set('q', e.target.value)}
          className={`${inputCls} w-52`}
        />
        <select value={status} onChange={e => set('status', e.target.value)} className={inputCls}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={source} onChange={e => set('source', e.target.value)} className={inputCls}>
          <option value="">All sources</option>
          {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={agent} onChange={e => set('agent', e.target.value)} className={inputCls}>
          <option value="">All agents</option>
          <option value="Nico Dalton">Nico Dalton</option>
          <option value="Luke Muscat">Luke Muscat</option>
        </select>
        {hasAny(['q','status','source','agent']) && (
          <button onClick={() => clearAll()} className="flex items-center gap-1 h-8 px-2 rounded-lg text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          entityLabel="lead"
          onDelete={handleBulkDelete}
          onExportCSV={handleExportSelected}
          onClearSelection={() => setSelected(new Set())}
        />
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <tr>
                <th className="px-3 py-2.5 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="accent-amber-500"
                    aria-label="Select all"
                  />
                </th>
                <th className={thCls} onClick={() => toggleSort('lastName')}>Name <SortIcon col="lastName" /></th>
                <th className={thCls} onClick={() => toggleSort('status')}>Status <SortIcon col="status" /></th>
                <th className={`${thCls} hidden sm:table-cell`} onClick={() => toggleSort('enquiryType')}>Type <SortIcon col="enquiryType" /></th>
                <th className={`${thCls} hidden md:table-cell`}>Budget</th>
                <th className={`${thCls} hidden lg:table-cell`} onClick={() => toggleSort('assignedAgent')}>Agent <SortIcon col="assignedAgent" /></th>
                <th className={`${thCls} hidden xl:table-cell`} onClick={() => toggleSort('createdAt')}>Added <SortIcon col="createdAt" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(l => (
                <tr
                  key={l.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                  onClick={() => navigate(`/crm/leads/${l.id}`)}
                >
                  <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(l.id)}
                      onChange={() => toggleSelect(l.id)}
                      className="accent-amber-500"
                      aria-label={`Select ${l.firstName} ${l.lastName}`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{l.firstName} {l.lastName}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{l.email}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOUR[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell capitalize text-slate-600 dark:text-slate-400">{l.enquiryType}</td>
                  <td className="px-3 py-3 hidden md:table-cell text-slate-600 dark:text-slate-400 whitespace-nowrap">{fmtBudget(l.budgetMin, l.budgetMax)}</td>
                  <td className="px-3 py-3 hidden lg:table-cell text-slate-500 dark:text-slate-400 whitespace-nowrap">{l.assignedAgent ?? '—'}</td>
                  <td className="px-3 py-3 hidden xl:table-cell text-slate-400 whitespace-nowrap">{fmtDate(l.createdAt)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-3 py-10 text-center text-sm text-slate-400">No leads match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        open={confirmOpen}
        title={`Delete ${selected.size} lead${selected.size !== 1 ? 's' : ''}?`}
        message="This action removes the selected leads from your CRM. You can undo this immediately after."
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {undoItems && (
        <UndoToast
          message={`Deleted ${undoItems.length} lead${undoItems.length !== 1 ? 's' : ''}.`}
          onUndo={handleUndo}
          onDismiss={() => setUndoItems(null)}
        />
      )}
      {importOpen && (
        <CSVImportModal
          mode="leads"
          onConfirm={rows => handleImport(rows as Partial<Lead>[])}
          onClose={() => setImportOpen(false)}
        />
      )}
    </div>
  );
}
