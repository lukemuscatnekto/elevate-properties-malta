import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CRMCard from '../components/CRMCard';
import CRMTable, { type CRMTableColumn } from '../components/CRMTable';
import CRMStatusBadge from '../components/CRMStatusBadge';
import CRMFilterPanel from '../components/CRMFilterPanel';
import { generateId, getLeads, saveLeads } from '../utils/storage';
import { useUrlFilter } from '../utils/useUrlFilter';
import type { Lead, LeadSource, LeadStatus, PropertyInterest } from '../types';

const STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Viewing Scheduled',
  'Negotiating',
  'Won',
  'Lost',
];
const SOURCES: LeadSource[] = [
  'Website',
  'WhatsApp',
  'Phone',
  'Referral',
  'Social Media',
  'Walk-in',
];
const AGENTS = ['Luke Muscat', 'Nico Dalton'];

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { get, set, clearAll, hasAny } = useUrlFilter();

  // URL-backed filter state
  const search = get('q');
  const statusFilter = (get('status', 'All') as LeadStatus | 'All');
  const sourceFilter = (get('source', 'All') as LeadSource | 'All');
  const agentFilter = get('agent', 'All');

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setShowForm(true);
      const next = new URLSearchParams(searchParams);
      next.delete('new');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== 'All' && l.status !== statusFilter) return false;
      if (sourceFilter !== 'All' && l.source !== sourceFilter) return false;
      if (agentFilter !== 'All' && l.assignedAgent !== agentFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const blob = `${l.firstName} ${l.lastName} ${l.email} ${l.mobile} ${l.locationInterest}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, statusFilter, sourceFilter, agentFilter]);

  const columns: CRMTableColumn<Lead>[] = [
    {
      key: 'name',
      header: 'Lead',
      render: (l) => (
        <div>
          <p className="font-medium text-slate-800">
            {l.firstName} {l.lastName}
          </p>
          <p className="text-xs text-slate-500">{l.email}</p>
        </div>
      ),
    },
    { key: 'mobile', header: 'Mobile', render: (l) => <span className="text-slate-600">{l.mobile}</span> },
    { key: 'source', header: 'Source', render: (l) => <span className="text-slate-600">{l.source}</span> },
    { key: 'interest', header: 'Interest', render: (l) => <span className="text-slate-600">{l.interest}</span> },
    {
      key: 'budget',
      header: 'Budget',
      render: (l) => (
        <span className="text-slate-600">
          €{l.budgetFrom.toLocaleString()} – €{l.budgetTo.toLocaleString()}
        </span>
      ),
    },
    { key: 'agent', header: 'Agent', render: (l) => <span className="text-slate-600">{l.assignedAgent}</span> },
    { key: 'status', header: 'Status', render: (l) => <CRMStatusBadge value={l.status} /> },
    { key: 'lastContact', header: 'Last Contact', render: (l) => <span className="text-slate-600">{formatDate(l.lastContactDate)}</span> },
    {
      key: 'nextFollow',
      header: 'Next Follow-up',
      render: (l) => {
        const overdue = new Date(l.nextFollowUpDate) < new Date(new Date().toDateString());
        return (
          <span className={overdue ? 'text-rose-600 font-medium' : 'text-slate-600'}>
            {formatDate(l.nextFollowUpDate)}
          </span>
        );
      },
    },
  ];

  function handleAddLead(form: HTMLFormElement) {
    const fd = new FormData(form);
    const newLead: Lead = {
      id: generateId('lead'),
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      mobile: String(fd.get('mobile') ?? ''),
      source: (fd.get('source') as LeadSource) ?? 'Website',
      status: (fd.get('status') as LeadStatus) ?? 'New',
      assignedAgent: String(fd.get('assignedAgent') ?? AGENTS[0]),
      interest: (fd.get('interest') as PropertyInterest) ?? 'Buy',
      budgetFrom: Number(fd.get('budgetFrom') ?? 0),
      budgetTo: Number(fd.get('budgetTo') ?? 0),
      locationInterest: String(fd.get('locationInterest') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      lastContactDate: new Date().toISOString(),
      nextFollowUpDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    const next = [newLead, ...leads];
    setLeads(next);
    saveLeads(next);
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Leads</h1>
          <p className="text-sm text-slate-500">{filtered.length} of {leads.length} leads</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </header>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-md flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search leads…"
            aria-label="Search leads"
            value={search}
            onChange={(e) => set('q', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        {hasAny(['q', 'status', 'source', 'agent']) && (
          <button
            type="button"
            onClick={() => clearAll(['new'])}
            className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      <CRMFilterPanel title="Lead Search & Filter Options" defaultOpen={hasAny(['status', 'source', 'agent'])}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
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
            <span className="text-xs text-slate-500 block mb-1">Source</span>
            <select
              value={sourceFilter}
              onChange={(e) => set('source', e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Assigned Agent</span>
            <select
              value={agentFilter}
              onChange={(e) => set('agent', e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>
      </CRMFilterPanel>

      <CRMCard padded={false}>
        <CRMTable<Lead>
          columns={columns}
          rows={filtered}
          rowKey={(l) => l.id}
          onRowClick={(l) => navigate(`/crm/leads/${l.id}`)}
          emptyMessage="No leads match the current filters."
        />
      </CRMCard>

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <header className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Add Lead</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-1 rounded text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </header>
            <form
              className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddLead(e.currentTarget);
              }}
            >
              <Field name="firstName" label="First Name" required />
              <Field name="lastName" label="Last Name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="mobile" label="Mobile" required />
              <SelectField name="source" label="Source" options={SOURCES} />
              <SelectField name="status" label="Status" options={STATUSES} />
              <SelectField name="interest" label="Interest" options={['Buy', 'Rent', 'Both']} />
              <SelectField name="assignedAgent" label="Assigned Agent" options={AGENTS} />
              <Field name="budgetFrom" label="Budget From (€)" type="number" />
              <Field name="budgetTo" label="Budget To (€)" type="number" />
              <Field name="locationInterest" label="Location Interest" className="sm:col-span-2" />
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Notes</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
                />
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required = false,
  className = '',
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      />
    </label>
  );
}

function SelectField({ name, label, options }: { name: string; label: string; options: readonly string[] }) {
  return (
    <label className="text-sm">
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <select name={name} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
