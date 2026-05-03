import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Plus, Pencil, Calendar } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMStatusBadge from '../components/CRMStatusBadge';
import { addTask, getLeads, getTasks } from '../utils/storage';
import type { Lead, CRMTask, TaskPriority, TaskType } from '../types';

const TASK_TYPES: TaskType[] = [
  'Call',
  'Email',
  'Viewing',
  'Follow-up',
  'Valuation',
  'Listing Update',
  'Document Request',
];
const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const all = getLeads();
    setLead(all.find((l) => l.id === id) ?? null);
    setTasks(getTasks().filter((t) => t.relatedLeadId === id));
  }, [id]);

  if (!lead) {
    return (
      <div className="space-y-4">
        <Link to="/crm/leads" className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to leads
        </Link>
        <div className="text-sm text-slate-500">Lead not found.</div>
      </div>
    );
  }

  function handleAddTask(form: HTMLFormElement) {
    if (!lead) return;
    const fd = new FormData(form);
    const task = addTask({
      title: String(fd.get('title') ?? ''),
      type: (fd.get('type') as TaskType) ?? 'Call',
      priority: (fd.get('priority') as TaskPriority) ?? 'Medium',
      status: 'Pending',
      assignedAgent: lead.assignedAgent,
      createdBy: 'Luke Muscat',
      relatedLeadId: lead.id,
      dueDate: String(fd.get('dueDate') ?? new Date().toISOString().slice(0, 10)) + 'T10:00',
      notes: String(fd.get('notes') ?? ''),
    });
    setTasks([task, ...tasks]);
    setShowTaskForm(false);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <Link to="/crm/leads" className="text-xs text-slate-500 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Leads
          </Link>
          <h1 className="text-2xl font-semibold text-slate-800 mt-1">
            {lead.firstName} {lead.lastName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Created {fmtDate(lead.createdAt)} · Source <span className="font-medium text-slate-700">{lead.source}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CRMStatusBadge value={lead.status} />
          <button
            type="button"
            onClick={() => navigate(`/crm/leads/${lead.id}/edit`)}
            className="inline-flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-sm font-medium px-3 py-2 rounded-md text-slate-700"
          >
            <Pencil className="w-4 h-4" /> Edit Lead
          </button>
          <button
            type="button"
            onClick={() => setShowTaskForm(true)}
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CRMCard title="Contact" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Field icon={<Mail className="w-4 h-4 text-slate-400" />} label="Email">
              <a href={`mailto:${lead.email}`} className="text-teal-700 hover:underline">{lead.email}</a>
            </Field>
            <Field icon={<Phone className="w-4 h-4 text-slate-400" />} label="Phone">
              <a href={`tel:${lead.mobile}`} className="text-teal-700 hover:underline">{lead.mobile || '—'}</a>
            </Field>
            <Field icon={<MapPin className="w-4 h-4 text-slate-400" />} label="Location interest">
              <span className="text-slate-700">{lead.locationInterest || '—'}</span>
            </Field>
            <Field icon={null} label="Property interest">
              <span className="text-slate-700">{lead.interest}</span>
            </Field>
            <Field icon={null} label="Budget">
              <span className="text-slate-700">
                €{lead.budgetFrom.toLocaleString()} – €{lead.budgetTo.toLocaleString()}
              </span>
            </Field>
            <Field icon={null} label="Assigned agent">
              <span className="text-slate-700">{lead.assignedAgent}</span>
            </Field>
            <Field icon={<Calendar className="w-4 h-4 text-slate-400" />} label="Last contact">
              <span className="text-slate-700">{fmtDate(lead.lastContactDate)}</span>
            </Field>
            <Field icon={<Calendar className="w-4 h-4 text-slate-400" />} label="Next follow-up">
              <span className="text-slate-700">{fmtDate(lead.nextFollowUpDate)}</span>
            </Field>
          </div>
        </CRMCard>

        <CRMCard title="Status">
          <div className="flex flex-col items-start gap-3">
            <CRMStatusBadge value={lead.status} />
            <p className="text-xs text-slate-500">
              Use <em>Edit Lead</em> to change the stage of this enquiry.
            </p>
          </div>
        </CRMCard>

        <CRMCard title="Notes" className="lg:col-span-2">
          {lead.notes ? (
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{lead.notes}</p>
          ) : (
            <p className="text-sm text-slate-500">No notes yet.</p>
          )}
        </CRMCard>

        <CRMCard
          title={`Related Tasks (${tasks.length})`}
          padded={false}
        >
          {tasks.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-500 text-center">No tasks yet for this lead.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <li key={t.id} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-800 truncate">{t.title}</p>
                    <CRMStatusBadge value={t.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.type} · due {fmtDate(t.dueDate)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CRMCard>
      </div>

      {showTaskForm && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <header className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Add task for {lead.firstName}</h2>
              <button type="button" onClick={() => setShowTaskForm(false)} className="text-sm text-slate-500 hover:bg-slate-100 rounded px-2 py-1" aria-label="Close">
                Close
              </button>
            </header>
            <form
              className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask(e.currentTarget);
              }}
            >
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Title</span>
                <input name="title" required className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <span className="text-xs text-slate-500 block mb-1">Type</span>
                <select name="type" className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white">
                  {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label className="text-sm">
                <span className="text-xs text-slate-500 block mb-1">Priority</span>
                <select name="priority" className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white">
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Due Date</span>
                <input name="dueDate" type="date" required className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Notes</span>
                <textarea name="notes" rows={3} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowTaskForm(false)} className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 inline-flex items-center gap-1">{icon}{label}</p>
      <p className="text-sm mt-1">{children}</p>
    </div>
  );
}
