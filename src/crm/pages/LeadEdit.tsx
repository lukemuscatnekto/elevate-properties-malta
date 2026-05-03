import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import { getLeads, updateLead } from '../utils/storage';
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
const INTERESTS: PropertyInterest[] = ['Buy', 'Rent', 'Both'];
const AGENTS = ['Luke Muscat', 'Nico Dalton', 'Unassigned'];

export default function LeadEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Lead | null>(null);

  useEffect(() => {
    const all = getLeads();
    setForm(all.find((l) => l.id === id) ?? null);
  }, [id]);

  if (!form) {
    return (
      <div className="space-y-4">
        <Link to="/crm/leads" className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to leads
        </Link>
        <div className="text-sm text-slate-500">Lead not found.</div>
      </div>
    );
  }

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const saved = updateLead(form.id, {
      ...form,
      lastContactDate: new Date().toISOString(),
    });
    if (saved) navigate(`/crm/leads/${form.id}`);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Link
            to={`/crm/leads/${form.id}`}
            className="text-xs text-slate-500 hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Lead detail
          </Link>
          <h1 className="text-2xl font-semibold text-slate-800 mt-1">
            Edit lead — {form.firstName} {form.lastName}
          </h1>
        </div>
      </header>

      <CRMCard>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="First Name" value={form.firstName} onChange={(v) => update('firstName', v)} required />
          <Input label="Last Name" value={form.lastName} onChange={(v) => update('lastName', v)} required />
          <Input label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
          <Input label="Phone" value={form.mobile} onChange={(v) => update('mobile', v)} />
          <Select label="Status" value={form.status} options={STATUSES} onChange={(v) => update('status', v as LeadStatus)} />
          <Select label="Source" value={form.source} options={SOURCES} onChange={(v) => update('source', v as LeadSource)} />
          <Select label="Property Interest" value={form.interest} options={INTERESTS} onChange={(v) => update('interest', v as PropertyInterest)} />
          <Select label="Assigned Agent" value={form.assignedAgent} options={AGENTS} onChange={(v) => update('assignedAgent', v)} />
          <Input label="Budget From (€)" type="number" value={form.budgetFrom} onChange={(v) => update('budgetFrom', Number(v))} />
          <Input label="Budget To (€)" type="number" value={form.budgetTo} onChange={(v) => update('budgetTo', Number(v))} />
          <Input label="Location Interest" value={form.locationInterest} onChange={(v) => update('locationInterest', v)} className="sm:col-span-2" />
          <Input label="Next Follow-up" type="date" value={form.nextFollowUpDate.slice(0, 10)} onChange={(v) => update('nextFollowUpDate', new Date(v).toISOString())} />
          <label className="text-sm sm:col-span-2">
            <span className="text-xs text-slate-500 block mb-1">Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              rows={5}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            />
          </label>

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={() => navigate(`/crm/leads/${form.id}`)}
              className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </CRMCard>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

function Input({ label, value, onChange, type = 'text', required, className = '' }: InputProps) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      />
    </label>
  );
}

interface SelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  className?: string;
}

function Select({ label, value, options, onChange, className = '' }: SelectProps) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
