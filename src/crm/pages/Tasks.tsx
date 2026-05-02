import { useEffect, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import CRMCard from '../components/CRMCard';
import CRMTable, { type CRMTableColumn } from '../components/CRMTable';
import CRMStatusBadge from '../components/CRMStatusBadge';
import CRMFilterPanel from '../components/CRMFilterPanel';
import { generateId, getTasks, saveTasks } from '../utils/storage';
import type { CRMTask, TaskPriority, TaskStatus, TaskType } from '../types';

const TASK_TYPES: TaskType[] = [
  'Call',
  'Email',
  'Viewing',
  'Follow-up',
  'Valuation',
  'Listing Update',
  'Document Request',
];
const TASK_STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Completed', 'Overdue'];
const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];
const AGENTS = ['Luke Muscat', 'Nico Dalton'];

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Tasks() {
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [tab, setTab] = useState<'pending' | 'completed'>('pending');
  const [typeFilter, setTypeFilter] = useState<TaskType | 'All'>('All');
  const [agentFilter, setAgentFilter] = useState<string>('All');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setShowForm(true);
      searchParams.delete('new');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const isCompleted = t.status === 'Completed';
      if (tab === 'pending' && isCompleted) return false;
      if (tab === 'completed' && !isCompleted) return false;
      if (typeFilter !== 'All' && t.type !== typeFilter) return false;
      if (agentFilter !== 'All' && t.assignedAgent !== agentFilter) return false;
      if (from && t.dueDate < from) return false;
      if (to && t.dueDate > to + 'T23:59:59') return false;
      return true;
    });
  }, [tasks, tab, typeFilter, agentFilter, from, to]);

  const columns: CRMTableColumn<CRMTask>[] = [
    {
      key: 'title',
      header: 'Task',
      render: (t) => (
        <div>
          <p className="font-medium text-slate-800">{t.title}</p>
          <p className="text-xs text-slate-500">{t.notes}</p>
        </div>
      ),
    },
    { key: 'type', header: 'Type', render: (t) => <span className="text-slate-600">{t.type}</span> },
    { key: 'priority', header: 'Priority', render: (t) => <CRMStatusBadge value={t.priority} /> },
    { key: 'status', header: 'Status', render: (t) => <CRMStatusBadge value={t.status} /> },
    { key: 'agent', header: 'Assigned', render: (t) => <span className="text-slate-600">{t.assignedAgent}</span> },
    { key: 'createdBy', header: 'Created By', render: (t) => <span className="text-slate-600">{t.createdBy}</span> },
    { key: 'due', header: 'Due', render: (t) => <span className="text-slate-600">{formatDateTime(t.dueDate)}</span> },
    {
      key: 'actions',
      header: '',
      render: (t) =>
        t.status !== 'Completed' ? (
          <button
            type="button"
            onClick={() => {
              const next = tasks.map((x) => (x.id === t.id ? { ...x, status: 'Completed' as const } : x));
              setTasks(next);
              saveTasks(next);
            }}
            className="text-xs text-teal-700 hover:underline"
          >
            Mark complete
          </button>
        ) : null,
    },
  ];

  function handleAdd(form: HTMLFormElement) {
    const fd = new FormData(form);
    const newTask: CRMTask = {
      id: generateId('task'),
      title: String(fd.get('title') ?? ''),
      type: (fd.get('type') as TaskType) ?? 'Call',
      priority: (fd.get('priority') as TaskPriority) ?? 'Medium',
      status: 'Pending',
      assignedAgent: String(fd.get('assignedAgent') ?? AGENTS[0]),
      createdBy: 'Luke Muscat',
      dueDate: String(fd.get('dueDate') ?? new Date().toISOString()) + 'T10:00',
      notes: String(fd.get('notes') ?? ''),
      createdAt: new Date().toISOString(),
    };
    const next = [newTask, ...tasks];
    setTasks(next);
    saveTasks(next);
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Tasks</h1>
          <p className="text-sm text-slate-500">Manage daily activities and follow-ups.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <Plus className="w-4 h-4" /> New Task
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-4">
        {(['pending', 'completed'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}
          </button>
        ))}
      </div>

      <CRMFilterPanel title="Task Search & Filter Options">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Type</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TaskType | 'All')}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {TASK_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Assigned To</span>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            >
              <option value="All">All</option>
              {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Scheduled From</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            />
          </label>
          <label className="text-sm">
            <span className="text-xs text-slate-500 block mb-1">Scheduled To</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
            />
          </label>
        </div>
      </CRMFilterPanel>

      <CRMCard padded={false}>
        <CRMTable<CRMTask>
          columns={columns}
          rows={filtered}
          rowKey={(t) => t.id}
          emptyMessage="No tasks here yet."
        />
      </CRMCard>

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <header className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">New Task</h2>
              <button type="button" onClick={() => setShowForm(false)} className="p-1 rounded text-slate-500 hover:bg-slate-100" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </header>
            <form
              className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd(e.currentTarget);
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
              <label className="text-sm">
                <span className="text-xs text-slate-500 block mb-1">Assigned Agent</span>
                <select name="assignedAgent" className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white">
                  {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
              <label className="text-sm">
                <span className="text-xs text-slate-500 block mb-1">Due Date</span>
                <input name="dueDate" type="date" required className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Notes</span>
                <textarea name="notes" rows={3} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
