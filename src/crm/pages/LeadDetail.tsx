import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Edit2, Trash2, UserPlus, Phone, Mail,
  MapPin, Briefcase, Calendar, CheckSquare, Plus,
} from 'lucide-react';
import {
  getLeads, deleteLead, getContacts, addContact, updateLead,
  getTasks, addTask, getViewings, getActivityForEntity,
} from '../utils/storage';
import { activityLead } from '../utils/activity';
import { logActivity } from '../utils/storage';
import ConfirmDialog from '../components/ConfirmDialog';
import UndoToast from '../components/UndoToast';
import ActivityTimeline from '../components/ActivityTimeline';
import type { Lead, Contact, CRMTask } from '../types';

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
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtBudget(min?: number, max?: number) {
  const fmt = (n: number) => n >= 1_000_000 ? `€${(n/1_000_000).toFixed(1)}M` : `€${(n/1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (max) return `Up to ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return 'Not specified';
}

interface Row { label: string; value: React.ReactNode }
function InfoRow({ label, value }: Row) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-800 dark:text-slate-200">{value || '—'}</span>
    </div>
  );
}

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lead, setLead]                     = useState<Lead | null>(() => getLeads().find(l => l.id === id) ?? null);
  const [confirmDelete, setConfirmDelete]   = useState(false);
  const [undoLead, setUndoLead]             = useState<Lead | null>(null);
  const [convertOpen, setConvertOpen]       = useState(false);
  const [taskModalOpen, setTaskModalOpen]   = useState(false);
  const [taskTitle, setTaskTitle]           = useState('');
  const [taskType, setTaskType]             = useState<CRMTask['type']>('Call');
  const [taskPriority, setTaskPriority]     = useState<CRMTask['priority']>('Medium');
  const [taskDue, setTaskDue]               = useState('');
  const [refreshKey, setRefreshKey]         = useState(0);

  const tasks    = useMemo(() => getTasks().filter(t => t.relatedLeadId === id), [id, refreshKey]);
  const viewings = useMemo(() => getViewings().filter(v => v.leadId === id), [id]);
  const existingContact = useMemo(() => lead ? getContacts().find(c => c.email === lead.email) : undefined, [lead]);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-slate-500">Lead not found.</p>
        <Link to="/crm/leads" className="text-amber-600 hover:underline text-sm">Back to Leads</Link>
      </div>
    );
  }

  const handleDelete = () => {
    const removed = deleteLead(lead.id);
    if (removed) setUndoLead(removed);
    navigate('/crm/leads');
  };

  const handleConvert = () => {
    if (existingContact) {
      // Merge: update linked lead
      updateLead(lead.id, { ...lead });
      alert(`Contact already exists for ${existingContact.firstName} ${existingContact.lastName}. Lead linked.`);
      setConvertOpen(false);
      return;
    }
    const newContact: Omit<Contact, 'id' | 'createdAt'> = {
      firstName:   lead.firstName,
      lastName:    lead.lastName,
      email:       lead.email,
      phone:       lead.phone,
      type:        lead.enquiryType === 'selling' ? 'Seller' : 'Buyer',
      linkedLeadId: lead.id,
    };
    addContact(newContact);
    activityLead.contactCreated(lead.id, `${lead.firstName} ${lead.lastName}`);
    logActivity({
      entityId: lead.id,
      entityType: 'lead',
      type: 'contact_created',
      timestamp: new Date().toISOString(),
      description: `Converted to contact: ${lead.firstName} ${lead.lastName}`,
    });
    setConvertOpen(false);
    navigate('/crm/contacts');
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const task = addTask({
      title:         taskTitle.trim(),
      type:          taskType,
      status:        'Pending',
      priority:      taskPriority,
      assignedAgent: lead.assignedAgent,
      dueDate:       taskDue || undefined,
      relatedLeadId: lead.id,
    });
    activityLead.taskCreated(lead.id, task.title);
    setTaskTitle('');
    setTaskDue('');
    setTaskModalOpen(false);
    setRefreshKey(k => k + 1);
  };

  const inputCls = 'w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="max-w-5xl space-y-5">
      {/* Back + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/crm/leads" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Leads
        </Link>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={() => setTaskModalOpen(true)}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Task
          </button>
          <button
            onClick={() => setConvertOpen(true)}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            {existingContact ? 'View Contact' : 'Convert to Contact'}
          </button>
          <Link
            to={`/crm/leads/${lead.id}/edit`}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </Link>
          <button
            onClick={() => setConfirmDelete(true)}
            className="h-9 px-3 rounded-lg border border-red-200 dark:border-red-800 bg-white dark:bg-slate-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {lead.firstName} {lead.lastName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lead.source}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLOUR[lead.status]}`}>
                {lead.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Mail,     value: lead.email,   href: `mailto:${lead.email}` },
                { icon: Phone,    value: lead.phone,   href: `tel:${lead.phone}` },
                { icon: MapPin,   value: lead.locationInterest ?? '—', href: undefined },
              ].map(({ icon: Icon, value, href }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {href
                    ? <a href={href} className="text-amber-600 dark:text-amber-400 hover:underline truncate">{value}</a>
                    : <span className="text-slate-600 dark:text-slate-400 truncate">{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Details</h2>
            <InfoRow label="Enquiry type"   value={<span className="capitalize">{lead.enquiryType}</span>} />
            <InfoRow label="Budget"         value={fmtBudget(lead.budgetMin, lead.budgetMax)} />
            <InfoRow label="Assigned agent" value={lead.assignedAgent} />
            <InfoRow label="Created"        value={fmtDate(lead.createdAt)} />
            <InfoRow label="Last contact"   value={fmtDate(lead.lastContactDate)} />
            <InfoRow label="Intake form"    value={lead.intakeFormType} />
            {lead.notes && (
              <div className="pt-3">
                <p className="text-xs font-medium text-slate-400 mb-1">Notes</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Tasks */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-slate-400" /> Tasks ({tasks.length})
              </h2>
              <button onClick={() => setTaskModalOpen(true)} className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
                + Add task
              </button>
            </div>
            {tasks.length === 0
              ? <p className="text-sm text-slate-400 py-2">No tasks linked to this lead.</p>
              : (
                <div className="space-y-2">
                  {tasks.map(t => (
                    <div key={t.id} className="flex items-start gap-2.5 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        t.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        t.priority === 'High' || t.priority === 'Urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}>{t.status}</span>
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{t.title}</p>
                        {t.dueDate && <p className="text-xs text-slate-400">Due {t.dueDate}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* Viewings */}
          {viewings.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-400" /> Viewings ({viewings.length})
              </h2>
              <div className="space-y-2">
                {viewings.map(v => (
                  <div key={v.id} className="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {new Date(v.scheduledAt).toLocaleDateString('en-GB', { day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit' })}
                      </p>
                      {v.feedback && <p className="text-xs text-slate-400 mt-0.5 italic">"{v.feedback}"</p>}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{v.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Activity timeline */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Activity</h2>
            <ActivityTimeline entityId={lead.id} />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        open={confirmDelete}
        title="Delete this lead?"
        message={`${lead.firstName} ${lead.lastName} will be permanently removed from the CRM.`}
        confirmLabel="Delete lead"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {undoLead && (
        <UndoToast
          message={`Lead "${undoLead.firstName} ${undoLead.lastName}" deleted.`}
          onUndo={() => { /* restore if navigated away */ setUndoLead(null); }}
          onDismiss={() => setUndoLead(null)}
        />
      )}

      {/* Convert dialog */}
      <ConfirmDialog
        open={convertOpen}
        title={existingContact ? 'Contact already exists' : 'Convert to contact?'}
        message={
          existingContact
            ? `A contact record for ${existingContact.firstName} ${existingContact.lastName} already exists. The lead will be linked to it.`
            : `Create a new Contact record from ${lead.firstName} ${lead.lastName}'s lead data?`
        }
        confirmLabel={existingContact ? 'Link contact' : 'Create contact'}
        onConfirm={handleConvert}
        onCancel={() => setConvertOpen(false)}
      />

      {/* Add task modal */}
      {taskModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setTaskModalOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Add Task</h3>
            <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Task title" className={inputCls} />
            <div className="grid grid-cols-2 gap-3">
              <select value={taskType} onChange={e => setTaskType(e.target.value as CRMTask['type'])} className={inputCls}>
                {['Call','Email','Meeting','Viewing','Follow-up','Document','Other'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <select value={taskPriority} onChange={e => setTaskPriority(e.target.value as CRMTask['priority'])} className={inputCls}>
                {['Low','Medium','High','Urgent'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <input type="date" value={taskDue} onChange={e => setTaskDue(e.target.value)} className={inputCls} />
            <div className="flex gap-3">
              <button onClick={() => setTaskModalOpen(false)} className="flex-1 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={handleAddTask} className="flex-1 h-9 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors">Add task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
