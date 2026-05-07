import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, CheckSquare, BookOpen,
  Calendar, BarChart2, UserCircle, Settings, Contact2,
  LogOut, ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { label: 'Dashboard',   to: '/crm/dashboard',   Icon: LayoutDashboard },
  { label: 'Leads',       to: '/crm/leads',       Icon: Users },
  { label: 'Properties',  to: '/crm/properties',  Icon: Building2 },
  { label: 'Tasks',       to: '/crm/tasks',       Icon: CheckSquare },
  { label: 'Contacts',    to: '/crm/contacts',    Icon: BookOpen },
  { label: 'Directory',   to: '/crm/directory',   Icon: Contact2 },
  { label: 'Viewings',    to: '/crm/viewings',    Icon: Calendar },
  { label: 'Reports',     to: '/crm/reports',     Icon: BarChart2 },
];

const BOTTOM: NavItem[] = [
  { label: 'Profile',     to: '/crm/profile',     Icon: UserCircle },
  { label: 'Settings',    to: '/crm/settings',    Icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
}

export default function CRMSidebar({ collapsed }: SidebarProps) {
  const w = collapsed ? 'w-16' : 'w-64';

  const item = (nav: NavItem) => (
    <NavLink
      key={nav.to}
      to={nav.to}
      title={collapsed ? nav.label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-colors ${
          collapsed ? 'justify-center' : ''
        } ${
          isActive
            ? 'bg-amber-500/15 text-amber-300'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
        }`
      }
    >
      <nav.Icon className="w-4 h-4 shrink-0" />
      {!collapsed && <span className="truncate">{nav.label}</span>}
    </NavLink>
  );

  return (
    <aside
      className={`${w} bg-slate-900 flex flex-col shrink-0 transition-[width] duration-200 border-r border-slate-800`}
      aria-label="CRM navigation"
    >
      {/* Brand */}
      <div className={`h-14 flex items-center border-b border-slate-800 px-4 shrink-0 ${collapsed ? 'justify-center' : 'gap-2'}`}>
        {collapsed ? (
          <span className="text-amber-400 font-bold text-sm select-none">EP</span>
        ) : (
          <>
            <span className="text-amber-400 font-bold text-sm select-none">Elevate</span>
            <ChevronRight className="w-3 h-3 text-slate-600" aria-hidden="true" />
            <span className="text-slate-400 text-xs select-none">CRM</span>
          </>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV.map(item)}
      </nav>

      {/* Bottom nav + user */}
      <div className="border-t border-slate-800 py-3 px-2 space-y-0.5">
        {BOTTOM.map(item)}
        <a
          href="/"
          title={collapsed ? 'Back to site' : undefined}
          className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Back to site</span>}
        </a>
      </div>
    </aside>
  );
}
