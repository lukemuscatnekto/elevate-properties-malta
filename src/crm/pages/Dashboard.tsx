import { useMemo, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  CalendarCheck,
  ListTodo,
  Mail,
  TrendingUp,
  Home,
  ArrowRight,
} from 'lucide-react';
import CRMCard from '../components/CRMCard';
import CRMStatusBadge from '../components/CRMStatusBadge';
import { getLeads, getProperties, getTasks, getViewings } from '../utils/storage';

interface KPIProps {
  label: string;
  value: number | string;
  icon: ComponentType<{ className?: string }>;
  trend?: string;
  accent?: string;
}

function KPI({ label, value, icon: Icon, trend, accent = 'bg-teal-50 text-teal-600' }: KPIProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
        {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const leads = getLeads();
  const properties = getProperties();
  const tasks = getTasks();
  const viewings = getViewings();

  const kpis = useMemo(() => {
    const activeLeads = leads.filter(
      (l) => l.status !== 'Won' && l.status !== 'Lost'
    ).length;
    const availableListings = properties.filter((p) => p.status === 'Available').length;
    const pendingViewings = viewings.filter((v) => v.status === 'Scheduled').length;
    const openTasks = tasks.filter(
      (t) => t.status === 'Pending' || t.status === 'In Progress' || t.status === 'Overdue'
    ).length;
    const newEnquiries = leads.filter((l) => l.status === 'New').length;
    const forSale = properties.filter((p) => p.saleOrLet === 'Sale').length;
    const forRent = properties.filter((p) => p.saleOrLet === 'Rental').length;
    return {
      activeLeads,
      availableListings,
      pendingViewings,
      openTasks,
      newEnquiries,
      forSale,
      forRent,
    };
  }, [leads, properties, tasks, viewings]);

  const recentLeads = [...leads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const upcomingTasks = [...tasks]
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  const upcomingViewings = [...viewings]
    .filter((v) => v.status === 'Scheduled')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const propertyByType = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          A snapshot of leads, listings, viewings and tasks across Elevate Properties Malta.
        </p>
      </header>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <KPI label="Active Leads" value={kpis.activeLeads} icon={Users} accent="bg-sky-50 text-sky-600" />
        <KPI label="Available Listings" value={kpis.availableListings} icon={Building2} accent="bg-emerald-50 text-emerald-600" />
        <KPI label="Pending Viewings" value={kpis.pendingViewings} icon={CalendarCheck} accent="bg-amber-50 text-amber-600" />
        <KPI label="Open Tasks" value={kpis.openTasks} icon={ListTodo} accent="bg-violet-50 text-violet-600" />
        <KPI label="New Enquiries" value={kpis.newEnquiries} icon={Mail} accent="bg-rose-50 text-rose-600" />
        <KPI label="For Sale" value={kpis.forSale} icon={Home} accent="bg-teal-50 text-teal-600" />
        <KPI label="For Rent" value={kpis.forRent} icon={TrendingUp} accent="bg-indigo-50 text-indigo-600" />
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CRMCard
          title="Recent Leads"
          action={
            <Link to="/crm/leads" className="text-xs text-teal-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
          padded={false}
        >
          <ul className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="px-4 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {lead.source} · {lead.locationInterest}
                  </p>
                </div>
                <CRMStatusBadge value={lead.status} />
              </li>
            ))}
          </ul>
        </CRMCard>

        <CRMCard
          title="Upcoming Tasks"
          action={
            <Link to="/crm/tasks" className="text-xs text-teal-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
          padded={false}
        >
          <ul className="divide-y divide-slate-100">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="px-4 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{task.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(task.dueDate).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {task.assignedAgent}
                  </p>
                </div>
                <CRMStatusBadge value={task.status} />
              </li>
            ))}
          </ul>
        </CRMCard>

        <CRMCard
          title="Upcoming Viewings"
          action={
            <Link to="/crm/viewings" className="text-xs text-teal-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
          padded={false}
        >
          <ul className="divide-y divide-slate-100">
            {upcomingViewings.map((v) => {
              const prop = properties.find((p) => p.id === v.propertyId);
              const lead = leads.find((l) => l.id === v.leadId);
              return (
                <li key={v.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {prop?.title ?? v.propertyId}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {v.date} {v.time} · {lead ? `${lead.firstName} ${lead.lastName}` : v.leadId}
                    </p>
                  </div>
                  <CRMStatusBadge value={v.status} />
                </li>
              );
            })}
          </ul>
        </CRMCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CRMCard title="Listings Summary">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(propertyByType).map(([type, count]) => (
              <div
                key={type}
                className="border border-slate-200 rounded-md p-3 text-center bg-slate-50"
              >
                <p className="text-2xl font-semibold text-slate-800">{count}</p>
                <p className="text-xs text-slate-500 mt-1">{type}</p>
              </div>
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Sales / Rentals Status">
          <div className="space-y-3">
            {(['Available', 'Reserved', 'Sold', 'Let'] as const).map((status) => {
              const count = properties.filter((p) => p.status === status).length;
              const pct = properties.length === 0 ? 0 : Math.round((count / properties.length) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{status}</span>
                    <span>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CRMCard>
      </div>
    </div>
  );
}
