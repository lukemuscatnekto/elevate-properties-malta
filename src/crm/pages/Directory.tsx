import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import CRMCard from '../components/CRMCard';
import { getContacts } from '../utils/storage';
import type { Contact } from '../types';

// Directory is a card-grid view over the same contact data,
// useful as a quick-glance company directory for agents/partners.
export default function Directory() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const grouped: Record<string, Contact[]> = {};
  for (const c of contacts) {
    const list = grouped[c.type] ?? [];
    list.push(c);
    grouped[c.type] = list;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Directory</h1>
        <p className="text-sm text-slate-500">Quick-glance directory of contacts grouped by role.</p>
      </header>

      {Object.entries(grouped).map(([type, list]) => (
        <CRMCard key={type} title={`${type} (${list.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {list.map((c) => (
              <div key={c.id} className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-semibold">
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.firstName} {c.lastName}</p>
                    {c.company && <p className="text-xs text-slate-500 truncate">{c.company}</p>}
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-teal-700 truncate">
                    <Mail className="w-3.5 h-3.5" /> {c.email}
                  </a>
                  <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:text-teal-700">
                    <Phone className="w-3.5 h-3.5" /> {c.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CRMCard>
      ))}
    </div>
  );
}
