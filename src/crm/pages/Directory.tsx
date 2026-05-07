import { useMemo } from 'react';
import { Phone, Mail, Building2 } from 'lucide-react';
import { getContacts } from '../utils/storage';
import type { Contact } from '../types';

export default function Directory() {
  const contacts = useMemo(() => getContacts(), []);

  const grouped: Record<string, Contact[]> = {};
  for (const c of contacts) {
    const letter = (c.lastName || c.firstName || '?')[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(c);
  }
  const letters = Object.keys(grouped).sort();

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Directory</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">All contacts sorted alphabetically</p>
      </div>

      {letters.map(letter => (
        <div key={letter} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{letter}</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {grouped[letter].map(c => (
              <div key={c.id} className="flex items-center gap-4 px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300 shrink-0 select-none">
                  {c.firstName[0]}{c.lastName?.[0] ?? ''}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                    {c.firstName} {c.lastName}
                    {c.company && <span className="text-slate-400 font-normal"> · {c.company}</span>}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{c.type}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {c.email && (
                    <a href={`mailto:${c.email}`} className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-colors" title={c.email}>
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-colors" title={c.phone}>
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {contacts.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16">
          <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-400">No contacts yet.</p>
        </div>
      )}
    </div>
  );
}
