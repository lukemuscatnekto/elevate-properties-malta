import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, CheckSquare, Calendar, TrendingUp, Clock } from 'lucide-react';
import { getLeads, getTasks, getProperties, getViewings } from '../utils/storage';
import type { Lead, CRMTask, CRMProperty } from '../types';

function fmtEur(n?: number) {
  if (!n) return '—';
  return `€${(n / 1_000_000).toFixed(1)}M`;
}

function fmtDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

interface KPIProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  colour: string;
  to?: string;
}

function KPI({ label, value, sub, icon: Icon, colour, to }: KPIProps) {
  const inner = (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${colour} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

export default function Dashboard() {
  const leads      = useMemo(() => getLeads(), []);
  const tasks      = useMemo(() => getTasks(), []);
  const properties = useMemo(() => getProperties(), []);
  const viewings   = useMemo(() => getViewings(), []);

  const activeLeads  = leads.filter(l => !['Won', 'Lost'].includes(l.status));
  const pendingTasks = tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress');
  const upcomingViews = viewings.filter(v => v.status === 'Scheduled');
  const availableProps = properties.filter(p => p.status === 'Available');

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const urgentTasks = [...pendingTasks]
    .filter(t => t.priority === 'Urgent' || t.priority === 'High')
    .slice(0, 5);

  const statusColors: Record<Lead['status'], string> = {
    New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Contacted: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Viewing Scheduled': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Negotiating: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    Won: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Lost: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  };

  const priorityColors: Record<CRMTask['priority'], string> = {
    Urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    High:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Low:    'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, Nico — here's your morning brief.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Active Leads"      value={activeLeads.length}   icon={Users}      colour="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"   to="/crm/leads" />
        <KPI label="Available Listings" value={availableProps.length} icon={Building2}  colour="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" to="/crm/properties" />
        <KPI label="Open Tasks"        value={pendingTasks.length}   icon={CheckSquare} colour="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" to="/crm/tasks" />
        <KPI label="Upcoming Viewings" value={upcomingViews.length}  icon={Calendar}   colour="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"  to="/crm/viewings" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent leads */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" /> Recent Leads
            </h2>
            <Link to="/crm/leads" className="text-xs text-amber-600 dark:text-amber-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentLeads.map((l: Lead) => (
              <Link
                key={l.id}
                to={`/crm/leads/${l.id}`}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                    {l.firstName} {l.lastName}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{l.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[l.status]}`}>{l.status}</span>
                  <span className="text-xs text-slate-400">{fmtDate(l.createdAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Urgent/high tasks */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" /> Priority Tasks
            </h2>
            <Link to="/crm/tasks" className="text-xs text-amber-600 dark:text-amber-400 hover:underline">View all</Link>
          </div>
          {urgentTasks.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">No urgent or high-priority tasks 🎉</p>
          ) : (
            <div className="space-y-3">
              {urgentTasks.map((t: CRMTask) => (
                <div key={t.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${priorityColors[t.priority]}`}>{t.priority}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-800 dark:text-slate-200 truncate">{t.title}</p>
                    {t.dueDate && (
                      <p className="text-xs text-slate-400">Due {fmtDate(t.dueDate)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured properties */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Live Listings</h2>
          <Link to="/crm/properties" className="text-xs text-amber-600 dark:text-amber-400 hover:underline">Manage</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableProps.slice(0, 3).map((p: CRMProperty) => (
            <Link
              key={p.id}
              to={`/crm/properties/${p.id}`}
              className="group rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
                {p.media.featuredImageUrl
                  ? <img src={p.media.featuredImageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full flex items-center justify-center text-slate-300"><Building2 className="w-8 h-8" /></div>
                }
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400">{p.title}</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold mt-0.5">{fmtEur(p.askingPrice)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
