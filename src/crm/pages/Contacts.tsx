import { useState, useMemo } from 'react';
import { Plus, Download, Upload, X, Search } from 'lucide-react';
import { getContacts, deleteContacts, restoreContacts, addContact } from '../utils/storage';
import { contactsToCSV, downloadCSV, parseCSVContacts } from '../utils/csvHelpers';
import BulkActionBar from '../components/BulkActionBar';
import ConfirmDialog from '../components/ConfirmDialog';
import UndoToast from '../components/UndoToast';
import CSVImportModal from '../components/CSVImportModal';
import type { Contact } from '../types';

const TYPES: Contact['type'][] = ['Buyer','Seller','Tenant','Landlord','Investor','Professional','Other'];

const TYPE_COLOUR: Record<Contact['type'], string> = {
  Buyer:        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Seller:       'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Tenant:       'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  Landlord:     'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Investor:     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Professional: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  Other:        'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

interface AddModalProps {
  onSave: (c: Omit<Contact, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

function AddContactModal({ onSave, onClose }: AddModalProps) {
  const [form, setForm] = useState<Omit<Contact, 'id' | 'createdAt'>>({
    firstName: '', lastName: '', email: '', type: 'Buyer',
  });
  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = 'w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:border-amber-400 transition-colors text-slate-800 dark:text-slate-200';
  const lbl = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">New Contact</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>First name</label><input value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls} required /></div>
          <div><label className={lbl}>Last name</label><input value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls} /></div>
        </div>
        <div><label className={lbl}>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} required /></div>
        <div><label className={lbl}>Phone</label><input value={form.phone ?? ''} onChange={e => set('phone', e.target.value || undefined)} className={inputCls} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value as Contact['type'])} className={inputCls}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Company</label><input value={form.company ?? ''} onChange={e => set('company', e.target.value || undefined)} className={inputCls} /></div>
        </div>
        <div><label className={lbl}>Notes</label><textarea value={form.notes ?? ''} onChange={e => set('notes', e.target.value || undefined)} rows={2} className={`${inputCls} h-auto py-2 resize-none`} /></div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 h-9 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors">Save contact</button>
        </div>
      </div>
    </div>
  );
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(() => getContacts());
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [undoItems, setUndoItems] = useState<Contact[] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const filtered = useMemo(() => {
    let out = contacts;
    if (q)          out = out.filter(c => `${c.firstName} ${c.lastName} ${c.email} ${c.company ?? ''}`.toLowerCase().includes(q.toLowerCase()));
    if (typeFilter) out = out.filter(c => c.type === typeFilter);
    return out;
  }, [contacts, q, typeFilter]);

  const allSelected = filtered.length > 0 && filtered.every(c => selected.has(c.id));
  const toggleSelect = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => allSelected ? setSelected(new Set()) : setSelected(new Set(filtered.map(c => c.id)));

  const confirmDelete = () => {
    const ids = Array.from(selected);
    const removed = deleteContacts(ids);
    setUndoItems(removed);
    setContacts(getContacts());
    setSelected(new Set());
    setConfirmOpen(false);
  };

  const handleAddContact = (data: Omit<Contact, 'id' | 'createdAt'>) => {
    addContact(data);
    setContacts(getContacts());
    setAddOpen(false);
  };

  const handleImport = (rows: Partial<Contact>[]) => {
    rows.forEach(r => {
      if (r.firstName && r.email) {
        addContact({ firstName: r.firstName, lastName: r.lastName ?? '', email: r.email, phone: r.phone, type: r.type ?? 'Other', company: r.company, nationality: r.nationality, notes: r.notes });
      }
    });
    setContacts(getContacts());
    setImportOpen(false);
  };

  const handleExportSelected = () => {
    downloadCSV(contactsToCSV(filtered.filter(c => selected.has(c.id))), 'elevate-contacts.csv');
  };

  const inputCls = 'h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-amber-400 transition-colors';

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Contacts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{contacts.length} total — {filtered.length} shown</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={() => setImportOpen(true)} className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
            <Upload className="w-4 h-4" /> Import
          </button>
          <button onClick={() => downloadCSV(contactsToCSV(contacts), 'elevate-contacts-all.csv')} className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setAddOpen(true)} className="h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="search" placeholder="Search name, email, company…" value={q} onChange={e => setQ(e.target.value)} className={`${inputCls} pl-8 w-52`} />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className={inputCls}>
          <option value="">All types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {(q || typeFilter) && (
          <button onClick={() => { setQ(''); setTypeFilter(''); }} className="flex items-center gap-1 h-8 px-2 rounded-lg text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          entityLabel="contact"
          onDelete={() => setConfirmOpen(true)}
          onExportCSV={handleExportSelected}
          onClearSelection={() => setSelected(new Set())}
        />
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <tr>
              <th className="px-3 py-2.5 w-10">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-amber-500" aria-label="Select all" />
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Name</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Type</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:table-cell">Email</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:table-cell">Phone</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden lg:table-cell">Company</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hidden xl:table-cell">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-3 py-3">
                  <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleSelect(c.id)} className="accent-amber-500" aria-label={`Select ${c.firstName} ${c.lastName}`} />
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-slate-800 dark:text-slate-200">{c.firstName} {c.lastName}</p>
                  {c.nationality && <p className="text-xs text-slate-400">{c.nationality}</p>}
                </td>
                <td className="px-3 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_COLOUR[c.type]}`}>{c.type}</span>
                </td>
                <td className="px-3 py-3 hidden sm:table-cell">
                  <a href={`mailto:${c.email}`} className="text-amber-600 dark:text-amber-400 hover:underline text-xs">{c.email}</a>
                </td>
                <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-500 dark:text-slate-400">
                  {c.phone ? <a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a> : '—'}
                </td>
                <td className="px-3 py-3 hidden lg:table-cell text-xs text-slate-500 dark:text-slate-400">{c.company ?? '—'}</td>
                <td className="px-3 py-3 hidden xl:table-cell text-xs text-slate-400">{fmtDate(c.createdAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-10 text-center text-sm text-slate-400">No contacts match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={`Delete ${selected.size} contact${selected.size !== 1 ? 's' : ''}?`}
        message="This removes the selected contacts. You can undo immediately after."
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {undoItems && (
        <UndoToast
          message={`Deleted ${undoItems.length} contact${undoItems.length !== 1 ? 's' : ''}.`}
          onUndo={() => { restoreContacts(undoItems); setContacts(getContacts()); setUndoItems(null); }}
          onDismiss={() => setUndoItems(null)}
        />
      )}
      {addOpen && <AddContactModal onSave={handleAddContact} onClose={() => setAddOpen(false)} />}
      {importOpen && <CSVImportModal mode="contacts" onConfirm={rows => handleImport(rows as Partial<Contact>[])} onClose={() => setImportOpen(false)} />}
    </div>
  );
}
