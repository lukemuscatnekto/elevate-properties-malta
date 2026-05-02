import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMTable, { type CRMTableColumn } from '../components/CRMTable';
import { generateId, getContacts, saveContacts } from '../utils/storage';
import type { Contact, ContactType } from '../types';

const TYPES: ContactType[] = [
  'Buyer',
  'Seller',
  'Tenant',
  'Landlord',
  'Investor',
  'Agent',
  'Partner',
  'Contractor',
];

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContactType | 'All'>('All');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (typeFilter !== 'All' && c.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const blob = `${c.firstName} ${c.lastName} ${c.email} ${c.phone} ${c.company ?? ''}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [contacts, search, typeFilter]);

  const columns: CRMTableColumn<Contact>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (c) => (
        <div>
          <p className="font-medium text-slate-800">{c.firstName} {c.lastName}</p>
          {c.company && <p className="text-xs text-slate-500">{c.company}</p>}
        </div>
      ),
    },
    { key: 'type', header: 'Type', render: (c) => <span className="text-slate-600">{c.type}</span> },
    { key: 'phone', header: 'Phone', render: (c) => <span className="text-slate-600">{c.phone}</span> },
    { key: 'email', header: 'Email', render: (c) => <span className="text-slate-600">{c.email}</span> },
    { key: 'related', header: 'Related', render: (c) => <span className="text-slate-600 text-xs">{c.relatedLeadIds.length} leads · {c.relatedPropertyIds.length} props</span> },
    { key: 'notes', header: 'Notes', render: (c) => <span className="text-slate-500 text-xs line-clamp-2">{c.notes}</span> },
  ];

  function handleAdd(form: HTMLFormElement) {
    const fd = new FormData(form);
    const newContact: Contact = {
      id: generateId('cont'),
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      type: (fd.get('type') as ContactType) ?? 'Buyer',
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? '') || undefined,
      notes: String(fd.get('notes') ?? ''),
      relatedLeadIds: [],
      relatedPropertyIds: [],
      createdAt: new Date().toISOString(),
    };
    const next = [newContact, ...contacts];
    setContacts(next);
    saveContacts(next);
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Contacts</h1>
          <p className="text-sm text-slate-500">{filtered.length} of {contacts.length} contacts</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </header>

      <div className="flex gap-3 flex-wrap">
        <div className="relative max-w-md flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            aria-label="Search contacts"
            placeholder="Search contacts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ContactType | 'All')}
          className="border border-slate-200 rounded-md px-2 py-2 text-sm bg-white"
          aria-label="Filter by contact type"
        >
          <option value="All">All Types</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <CRMCard padded={false}>
        <CRMTable<Contact>
          columns={columns}
          rows={filtered}
          rowKey={(c) => c.id}
        />
      </CRMCard>

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <header className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Add Contact</h2>
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
              <Input name="firstName" label="First Name" required />
              <Input name="lastName" label="Last Name" required />
              <label className="text-sm">
                <span className="text-xs text-slate-500 block mb-1">Type</span>
                <select name="type" className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white">
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <Input name="company" label="Company (optional)" />
              <Input name="phone" label="Phone" required />
              <Input name="email" label="Email" type="email" required />
              <label className="text-sm sm:col-span-2">
                <span className="text-xs text-slate-500 block mb-1">Notes</span>
                <textarea name="notes" rows={3} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm" />
              </label>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md">Save Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ name, label, type = 'text', required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm">
      <span className="text-xs text-slate-500 block mb-1">{label}</span>
      <input name={name} type={type} required={required} className="w-full border border-slate-200 rounded-md px-2 py-2 text-sm bg-white" />
    </label>
  );
}
