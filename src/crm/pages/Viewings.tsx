import { useEffect, useMemo, useState } from 'react';
import CRMCard from '../components/CRMCard';
import CRMTable, { type CRMTableColumn } from '../components/CRMTable';
import CRMStatusBadge from '../components/CRMStatusBadge';
import { getLeads, getProperties, getViewings, saveViewings } from '../utils/storage';
import type { Lead, CRMProperty, Viewing, ViewingStatus } from '../types';

const STATUSES: ViewingStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'No Show', 'Rescheduled'];

export default function Viewings() {
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [properties, setProperties] = useState<CRMProperty[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState<ViewingStatus | 'All'>('All');

  useEffect(() => {
    setViewings(getViewings());
    setProperties(getProperties());
    setLeads(getLeads());
  }, []);

  const filtered = useMemo(() => {
    return viewings
      .filter((v) => statusFilter === 'All' || v.status === statusFilter)
      .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
  }, [viewings, statusFilter]);

  const columns: CRMTableColumn<Viewing>[] = [
    {
      key: 'date',
      header: 'When',
      render: (v) => (
        <div>
          <p className="font-medium text-slate-800">{v.date}</p>
          <p className="text-xs text-slate-500">{v.time}</p>
        </div>
      ),
    },
    {
      key: 'property',
      header: 'Property',
      render: (v) => {
        const p = properties.find((x) => x.id === v.propertyId);
        return <span className="text-slate-700">{p?.title ?? v.propertyId}</span>;
      },
    },
    {
      key: 'lead',
      header: 'Client',
      render: (v) => {
        const l = leads.find((x) => x.id === v.leadId);
        return <span className="text-slate-700">{l ? `${l.firstName} ${l.lastName}` : v.leadId}</span>;
      },
    },
    { key: 'agent', header: 'Agent', render: (v) => <span className="text-slate-600">{v.assignedAgent}</span> },
    { key: 'status', header: 'Status', render: (v) => <CRMStatusBadge value={v.status} /> },
    { key: 'notes', header: 'Notes', render: (v) => <span className="text-slate-500 text-xs line-clamp-2">{v.notes}</span> },
    {
      key: 'actions',
      header: '',
      render: (v) => (
        <select
          value={v.status}
          onChange={(e) => {
            const next = viewings.map((x) =>
              x.id === v.id ? { ...x, status: e.target.value as ViewingStatus } : x
            );
            setViewings(next);
            saveViewings(next);
          }}
          className="border border-slate-200 rounded px-1 py-0.5 text-xs bg-white"
          aria-label="Update viewing status"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Viewings</h1>
          <p className="text-sm text-slate-500">{filtered.length} of {viewings.length} viewings</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ViewingStatus | 'All')}
          className="border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
          aria-label="Filter by viewing status"
        >
          <option value="All">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </header>

      <CRMCard padded={false}>
        <CRMTable<Viewing> columns={columns} rows={filtered} rowKey={(v) => v.id} />
      </CRMCard>
    </div>
  );
}
