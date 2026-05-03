import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Menu,
  Search,
  Plus,
  LogOut,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Building2,
  Contact as ContactIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getContacts, getLeads, getProperties } from '../utils/storage';
import type { Contact, Lead, CRMProperty } from '../types';

interface CRMTopbarProps {
  onMenuClick: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface SearchHit {
  group: 'Leads' | 'Properties' | 'Contacts';
  id: string;
  primary: string;
  secondary: string;
  href: string;
}

function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const leadHits: SearchHit[] = getLeads()
    .filter((l: Lead) => {
      const blob = `${l.firstName} ${l.lastName} ${l.email} ${l.mobile}`.toLowerCase();
      return blob.includes(q);
    })
    .slice(0, 6)
    .map((l) => ({
      group: 'Leads',
      id: l.id,
      primary: `${l.firstName} ${l.lastName}`.trim(),
      secondary: `${l.email}${l.mobile ? ' · ' + l.mobile : ''}`,
      href: `/crm/leads/${l.id}`,
    }));

  const propertyHits: SearchHit[] = getProperties()
    .filter((p: CRMProperty) => {
      const blob = `${p.title} ${p.reference} ${p.location.locality}`.toLowerCase();
      return blob.includes(q);
    })
    .slice(0, 6)
    .map((p) => ({
      group: 'Properties',
      id: p.id,
      primary: p.title,
      secondary: `${p.reference} · ${p.location.locality}`,
      href: `/crm/properties/${p.id}`,
    }));

  const contactHits: SearchHit[] = getContacts()
    .filter((c: Contact) => {
      const blob = `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase();
      return blob.includes(q);
    })
    .slice(0, 6)
    .map((c) => ({
      group: 'Contacts',
      id: c.id,
      primary: `${c.firstName} ${c.lastName}`.trim(),
      secondary: `${c.type}${c.email ? ' · ' + c.email : ''}`,
      href: `/crm/contacts?q=${encodeURIComponent(`${c.firstName} ${c.lastName}`)}`,
    }));

  return [...leadHits, ...propertyHits, ...contactHits];
}

export default function CRMTopbar({ onMenuClick, collapsed, onToggleCollapse }: CRMTopbarProps) {
  const navigate = useNavigate();
  const [quickOpen, setQuickOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);

  const hits = useMemo(() => (query ? searchAll(query) : []), [query]);

  // Click-outside to close the dropdowns.
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handle);
      return () => document.removeEventListener('mousedown', handle);
    }
    return;
  }, [searchOpen]);

  const grouped: Record<string, SearchHit[]> = {};
  for (const h of hits) {
    (grouped[h.group] = grouped[h.group] ?? []).push(h);
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-3 shrink-0">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded text-slate-600 hover:bg-slate-100"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Compact-sidebar toggle (desktop) */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden lg:inline-flex p-2 rounded text-slate-600 hover:bg-slate-100"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
      </button>

      {/* Global search */}
      <div className="flex-1 max-w-xl relative" ref={searchRef}>
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search leads, properties, contacts…"
          aria-label="Global CRM search"
          value={query}
          onFocus={() => setSearchOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        {searchOpen && query.trim().length >= 2 && (
          <div
            role="listbox"
            className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-40 max-h-96 overflow-y-auto"
          >
            {hits.length === 0 ? (
              <p className="px-3 py-4 text-sm text-slate-500 text-center">No results found.</p>
            ) : (
              Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    {group}
                  </p>
                  <ul>
                    {items.map((h) => (
                      <li key={`${h.group}-${h.id}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery('');
                            navigate(h.href);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-3"
                        >
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                            {h.group === 'Leads' && <User className="w-3.5 h-3.5" />}
                            {h.group === 'Properties' && <Building2 className="w-3.5 h-3.5" />}
                            {h.group === 'Contacts' && <ContactIcon className="w-3.5 h-3.5" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm text-slate-800 truncate">{h.primary}</span>
                            <span className="block text-xs text-slate-500 truncate">{h.secondary}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Quick add */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setQuickOpen((v) => !v)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-md transition-colors"
            aria-haspopup="menu"
            aria-expanded={quickOpen}
          >
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
          {quickOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-30"
            >
              <button
                role="menuitem"
                onClick={() => { setQuickOpen(false); navigate('/crm/leads?new=1'); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Add Lead
              </button>
              <button
                role="menuitem"
                onClick={() => { setQuickOpen(false); navigate('/crm/properties/add'); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Add Property
              </button>
              <button
                role="menuitem"
                onClick={() => { setQuickOpen(false); navigate('/crm/tasks?new=1'); }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Add Task
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="p-2 rounded text-slate-600 hover:bg-slate-100 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="p-2 rounded text-slate-600 hover:bg-slate-100"
          aria-label="Exit CRM (back to public site)"
          title="Back to public site"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
