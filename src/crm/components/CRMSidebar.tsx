import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Building2,
  Contact,
  BookUser,
  CalendarCheck,
  BarChart3,
  UserCircle,
  Settings,
  X,
} from 'lucide-react';

interface CRMSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
}

const NAV = [
  { to: '/crm/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/crm/leads', label: 'Leads', icon: Users },
  { to: '/crm/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/crm/properties', label: 'Properties', icon: Building2 },
  { to: '/crm/contacts', label: 'Contacts', icon: Contact },
  { to: '/crm/directory', label: 'Directory', icon: BookUser },
  { to: '/crm/viewings', label: 'Viewings', icon: CalendarCheck },
  { to: '/crm/reports', label: 'Reports', icon: BarChart3 },
  { to: '/crm/profile', label: 'User Profile', icon: UserCircle },
  { to: '/crm/settings', label: 'Settings', icon: Settings },
] as const;

export default function CRMSidebar({ isOpen, onClose, collapsed }: CRMSidebarProps) {
  const widthCls = collapsed ? 'w-16' : 'w-64';

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 ${widthCls} bg-[#0F172A] text-slate-100 flex flex-col transform transition-[transform,width] duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="CRM navigation"
      >
        {/* Brand block */}
        <div className={`px-${collapsed ? '3' : '5'} pt-5 pb-4 border-b border-white/5 flex items-center justify-between`}>
          {collapsed ? (
            <div className="w-full flex justify-center">
              <div className="w-9 h-9 rounded-md bg-amber-300/20 text-amber-200 flex items-center justify-center font-bold text-sm" title="Elevate Properties Malta CRM">
                EP
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-semibold">
                Elevate Properties
              </p>
              <p className="text-base font-semibold text-white mt-0.5">Malta CRM</p>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1 rounded text-slate-300 hover:bg-white/5"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current user */}
        <div className={`${collapsed ? 'px-2 py-3 flex justify-center' : 'px-5 py-4'} border-b border-white/5`}>
          {collapsed ? (
            <div
              className="w-9 h-9 rounded-full bg-amber-300/20 text-amber-200 flex items-center justify-center font-semibold"
              title="Luke Muscat — Senior Agent"
            >
              LM
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-300/20 text-amber-200 flex items-center justify-center font-semibold">
                LM
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">Luke Muscat</p>
                <p className="text-[11px] text-slate-400 truncate">Senior Agent</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-5'} py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/5 text-white border-l-2 border-amber-300'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="px-5 py-3 border-t border-white/5 text-[10px] text-slate-500">
            v0.2 · Internal prototype
          </div>
        )}
      </aside>
    </>
  );
}
