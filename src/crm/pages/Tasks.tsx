import { useState, useMemo } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { getTasks, updateTask, deleteTasks, restoreTasks, addTask } from '../utils/storage';
import { useUrlFilter } from '../utils/useUrlFilter';
import BulkActionBar from '../components/BulkActionBar';
import ConfirmDialog from '../components/ConfirmDialog';
import UndoToast from '../components/UndoToast';
import type { CRMTask } from '../types';

const TYPES:      CRMTask['type'][]     = ['Call','Email','Meeting','Viewing','Follow-up','Document','Other'];
const PRIORITIES: CRMTask['priority'][] = ['Low','Medium','High','Urgent'];

const PRIORITY_COLOUR: Record<string, string> = {
  Low:    'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  High:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

interface AddTaskModalProps {
  onSave: (t: Omit<CRMTask, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}
function AddTaskModal({ onSave, onClose }: AddTaskModalProps) {
  const [form, setForm] = useState<Omit<CRMTask, 'id' | 'createdAt'>>({ title: '', type: 'Call', status: 'Pending', priority: 'Medium' });
  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = 'w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-amber-400 transition-colors';
  const lbl = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">New Task</h3>
        <div><label className={lbl}>Title</label><input value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} required /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value as CRMTask['type'])} className={inputCls}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Priority</label>
            <select value={form.priority} onChange={e => set('priority', e.target.value as CRMTask['priority'])} className={inputCls}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>Assigned agent</label>
            <select value={form.assignedAgent ?? ''} onChange={e => set('assignedAgent', e.target.value || undefined)} className={inputCls}>
              <option value="">Unassigned</option>
              <option value="Nico Dalton">Nico Dalton</option>
              <option value="Luke Muscat">Luke Muscat</option>
            </select>
          </div>
          <div><label className={lbl}>Due date</label>
            <input type="date" value={form.dueDate ?? ''} onChange={e => set('dueDate', e.target.value || undefined)} className={inputCls} />
          </div>
        </div>
        <div><label className={lbl}>Notes</label><textarea value={form.notes ?? ''} onChange={e => set('notes', e.target.value || undefined)} rows={2} className={`${inputCls} h-auto py-2 resize-none`} /></div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 h-9 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors">Add task</button>
        </div>
      </div>
    </div>
  );
}

export default function Tasks() {
  const { get, set } = useUrlFilter();
  const tab    = get('tab', 'pending') as 'pending' | 'completed';
  const type   = get('type');
  const agent  = get('agent');

  const [tasks, setTasks]         = useState<CRMTask[]>(() => getTasks());
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [undoItems, setUndoItems] = useState<CRMTask[] | null>(null);
  const [addOpen, setAddOpen]     = useState(false);

  const filtered = useMemo(() => {
    let out = tasks;
    if (tab === 'pending')   out = out.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');
    if (tab === 'completed') out = out.filter(t => t.status === 'Completed' || t.status === 'Cancelled');
    if (type)  out = out.filter(t => t.type === type);
    if (agent) out = out.filter(t => t.assignedAgent === agent);
    return out;
  }, [tasks, tab, type, agent]);

  const allSelected = filtered.length > 0 && filtered.every(t => selected.has(t.id));
  const toggleSelect = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => allSelected ? setSelected(new Set()) : setSelected(new Set(filtered.map(t => t.id)));

  const markComplete = (id: string) => {
    updateTask(id, { status: 'Completed', completedAt: new Date().toISOString() });
    setTasks(getTasks());
  };

  const confirmDelete = () => {
    const removed = deleteTasks(Array.from(selected));
    setUndoItems(removed);
    setTasks(getTasks());
    setSelected(new Set());
    setConfirmOpen(false);
  };

  const handleAdd = (input: Omit<CRMTask, 'id' | 'createdAt'>) => {
    addTask(input);
    setTasks(getTasks());
    setAddOpen(false);
  };

  const inputCls = 'h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Tasks</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} {tab}</p>
        </div>
        <div className="ml-auto">
          <button onClick={() => setAddOpen(true)} className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {/* Tabs + filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
          {(['pending','completed'] as const).map(t => (
            <button key={t} onClick={() => set('tab', t)} className={`h-8 px-4 text-xs font-medium capitalize transition-colors ${tab === t ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'}`}>
              {t}
            </button>
          ))}
        </div>
        <select value={type} onChange={e => set('type', e.target.value)} className={inputCls}>
          <option value="">All types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={agent} onChange={e => set('agent', e.target.value)} className={inputCls}>
          <option value="">All agents</option>
          <option value="Nico Dalton">Nico Dalton</option>
          <option value="Luke Muscat">Luke Muscat</option>
        </select>
        {(type || agent) && (
          <button onClick={() => { set('type', ''); set('agent', ''); }} className="flex items-center gap-1 h-8 px-2 rounded-lg text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {selected.size > 0 && (
        <BulkActionBar count={selected.size} entityLabel="task" onDelete={() => setConfirmOpen(true)} onClearSelection={() => setSelected(new Set())} />
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <tr>
              <th className="px-3 py-2.5 w-10">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-amber-500" aria-label="Select all" />
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Task</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:table-cell">Priority</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:table-cell">Type</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden lg:table-cell">Agent</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:table-cell">Due</th>
              {tab === 'pending' && <th className="px-3 py-2.5 w-10" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-3 py-3">
                  <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleSelect(t.id)} className="accent-amber-500" aria-label={`Select ${t.title}`} />
                </td>
                <td className="px-3 py-3">
                  <p className={`font-medium ${t.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{t.title}</p>
                  {t.notes && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{t.notes}</p>}
                </td>
                <td className="px-3 py-3 hidden sm:table-cell">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLOUR[t.priority]}`}>{t.priority}</span>
                </td>
                <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-500 dark:text-slate-400">{t.type}</td>
                <td className="px-3 py-3 hidden lg:table-cell text-xs text-slate-500 dark:text-slate-400">{t.assignedAgent ?? '—'}</td>
                <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-400">{t.dueDate ?? '—'}</td>
                {tab === 'pending' && (
                  <td className="px-3 py-3">
                    <button onClick={() => markComplete(t.id)} title="Mark complete" className="w-7 h-7 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-10 text-center text-sm text-slate-400">No tasks match the current filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog open={confirmOpen} title={`Delete ${selected.size} task${selected.size !== 1 ? 's' : ''}?`} message="You can undo this immediately after." confirmLabel="Delete" danger onConfirm={confirmDelete} onCancel={() => setConfirmOpen(false)} />
      {undoItems && (
        <UndoToast message={`Deleted ${undoItems.length} task${undoItems.length !== 1 ? 's' : ''}.`} onUndo={() => { restoreTasks(undoItems); setTasks(getTasks()); setUndoItems(null); }} onDismiss={() => setUndoItems(null)} />
      )}
      {addOpen && <AddTaskModal onSave={handleAdd} onClose={() => setAddOpen(false)} />}
    </div>
  );
}
