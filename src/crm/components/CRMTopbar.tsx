import { Menu, Search, Plus, LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface CRMTopbarProps {
  onMenuClick: () => void;
}

export default function CRMTopbar({ onMenuClick }: CRMTopbarProps) {
  const navigate = useNavigate();
  const [quickOpen, setQuickOpen] = useState(false);

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

      {/* Global search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search leads, properties, contacts…"
          aria-label="Global search"
          className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
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
