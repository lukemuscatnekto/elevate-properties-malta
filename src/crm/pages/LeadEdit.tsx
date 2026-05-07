import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getLeads, updateLead } from '../utils/storage';
import { activityLead } from '../utils/activity';
import type { Lead } from '../types';

const STATUSES:  Lead['status'][]  = ['New','Contacted','Viewing Scheduled','Negotiating','Won','Lost'];
const SOURCES:   Lead['source'][]  = ['Website Contact','Website Viewing Request','Website Valuation','Referral','Walk-in','Social Media','Portal','Direct Call','Email','Other'];
const TYPES = ['buying','selling','renting','investment','valuation'];

export default function LeadEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const existing = getLeads().find(l => l.id === id);
  const [form, setForm] = useState<Lead>(existing ?? {
    id: '', firstName: '', lastName: '', email: '', phone: '',
    status: 'New', source: 'Other', enquiryType: 'buying',
    createdAt: new Date().toISOString(),
  });
  const [prevStatus] = useState(form.status);
  const [saving, setSaving] = useState(false);

  if (!existing) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-slate-500">Lead not found.</p>
        <Link to="/crm/leads" className="text-amber-600 hover:underline text-sm">Back to Leads</Link>
      </div>
    );
  }

  const set = <K extends keyof Lead>(k: K, v: Lead[K]) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSaving(true);
    if (form.status !== prevStatus) {
      activityLead.statusChanged(form.id, prevStatus, form.status);
    }
    updateLead(form.id, { ...form, lastContactDate: new Date().toISOString() });
    setSaving(false);
    navigate(`/crm/leads/${form.id}`);
  };

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
  const label = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link to={`/crm/leads/${id}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to lead
        </Link>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 ml-2">Edit Lead</h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>First name</label>
            <input value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className={label}>Last name</label>
            <input value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className={label}>Phone</label>
            <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value as Lead['status'])} className={inputCls}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Source</label>
            <select value={form.source} onChange={e => set('source', e.target.value as Lead['source'])} className={inputCls}>
              {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Enquiry type</label>
            <select value={form.enquiryType} onChange={e => set('enquiryType', e.target.value)} className={inputCls}>
              {TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Assigned agent</label>
            <select value={form.assignedAgent ?? ''} onChange={e => set('assignedAgent', e.target.value || undefined)} className={inputCls}>
              <option value="">Unassigned</option>
              <option value="Nico Dalton">Nico Dalton</option>
              <option value="Luke Muscat">Luke Muscat</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Budget min (€)</label>
            <input type="number" value={form.budgetMin ?? ''} onChange={e => set('budgetMin', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 1000000" />
          </div>
          <div>
            <label className={label}>Budget max (€)</label>
            <input type="number" value={form.budgetMax ?? ''} onChange={e => set('budgetMax', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} placeholder="e.g. 3000000" />
          </div>
        </div>
        <div>
          <label className={label}>Location interest</label>
          <input value={form.locationInterest ?? ''} onChange={e => set('locationInterest', e.target.value || undefined)} className={inputCls} placeholder="e.g. Valletta, Sliema" />
        </div>
        <div>
          <label className={label}>Notes</label>
          <textarea
            value={form.notes ?? ''}
            onChange={e => set('notes', e.target.value || undefined)}
            rows={4}
            className={`${inputCls} h-auto resize-none py-2`}
            placeholder="Private notes about this lead…"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link to={`/crm/leads/${id}`} className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 h-10 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
