import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, Sun, Moon, PanelLeftClose, PanelLeftOpen,
  Users, Building2, BookOpen, X,
} from 'lucide-react';
import { getLeads, getProperties, getContacts } from '../utils/storage';
import type { Lead, CRMProperty, Contact } from '../types';

interface SearchHit {
  id: string;
  label: string;
  sub: string;
  group: 'Leads' | 'Properties' | 'Contacts';
  href: string;
}

function searchAll(q: string): SearchHit[] {
  const lq = q.toLowerCase();
  const results: SearchHit[] = [];

  getLeads()
    .filter(l => `${l.firstName} ${l.lastName} ${l.email} ${l.phone}`.toLowerCase().includes(lq))
    .slice(0, 4)
    .forEach((l: Lead) => results.push({
      id: l.id, group: 'Leads',
      label: `${l.firstName} ${l.lastName}`,
      sub: l.email,
      href: `/crm/leads/${l.id}`,
    }));

  getProperties()
    .filter(p => `${p.title} ${p.location.locality ?? ''} ${p.referenceCode ?? ''}`.toLowerCase().includes(lq))
    .slice(0, 4)
    .forEach((p: CRMProperty) => results.push({
      id: p.id, group: 'Properties',
      label: p.title,
      sub: p.location.locality ?? p.category,
      href: `/crm/properties/${p.id}`,
    }));

  getContacts()
    .filter(c => `${c.firstName} ${c.lastName} ${c.email} ${c.company ?? ''}`.toLowerCase().includes(lq))
    .slice(0, 4)
    .forEach((c: Contact) => results.push({
      id: c.id, group: 'Contacts',
      label: `${c.firstName} ${c.lastName}`,
      sub: c.email,
      href: `/crm/contacts`,
    }));

  return results;
}

const groupIcon = (group: SearchHit['group']) => {
  if (group === 'Leads')      return <Users      className="w-3.5 h-3.5 shrink-0" />;
  if (group === 'Properties') return <Building2  className="w-3.5 h-3.5 shrink-0" />;
  return                             <BookOpen   className="w-3.5 h-3.5 shrink-0" />;
};

interface TopbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function CRMTopbar({ collapsed, onToggleCollapse, theme, onToggleTheme }: TopbarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setHits(searchAll(query));
      setOpen(true);
    } else {
      setHits([]);
      setOpen(false);
    }
  }, [query]);

  // Close on outside click
  const handleOutside = useCallback((e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [handleOutside]);

  const goTo = (href: string) => {
    navigate(href);
    setQuery('');
    setOpen(false);
  };

  // Group results
  const groups = ['Leads', 'Properties', 'Contacts'] as const;

  return (
    <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 px-4 shrink-0">
      {/* Collapse toggle (desktop only) */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
      </button>

      {/* Search */}
      <div ref={searchRef} className="relative flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search leads, properties, contacts…"
            className="w-full h-9 pl-9 pr-9 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setOpen(false); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {open && hits.length > 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-hidden">
            {groups.map(group => {
              const groupHits = hits.filter(h => h.group === group);
              if (!groupHits.length) return null;
              return (
                <div key={group}>
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                    {group}
                  </div>
                  {groupHits.map(h => (
                    <button
                      key={h.id}
                      onClick={() => goTo(h.href)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-left transition-colors"
                    >
                      <span className="text-slate-400">{groupIcon(h.group)}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{h.label}</p>
                        <p className="text-xs text-slate-400 truncate">{h.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {open && query.length >= 2 && hits.length === 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-50 px-4 py-3">
            <p className="text-sm text-slate-400">No results for "{query}"</p>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification bell (placeholder) */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300 select-none">
          ND
        </div>
      </div>
    </header>
  );
}
