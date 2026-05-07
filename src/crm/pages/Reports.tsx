import { useMemo } from 'react';
import { BarChart2, TrendingUp, Users, Building2 } from 'lucide-react';
import { getLeads, getProperties, getTasks } from '../utils/storage';
import type { Lead, CRMProperty } from '../types';

function countBy<T>(arr: T[], key: (x: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of arr) {
    const k = key(item);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

function BarRow({ label, value, max, colour }: { label: string; value: number; max: number; colour: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 dark:text-slate-400 w-32 shrink-0 truncate">{label}</span>
      <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full ${colour} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-6 text-right">{value}</span>
    </div>
  );
}

interface SectionProps { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }
function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-amber-500" />{title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function Reports() {
  const leads      = useMemo(() => getLeads(), []);
  const properties = useMemo(() => getProperties(), []);
  const tasks      = useMemo(() => getTasks(), []);

  const byStatus  = countBy<Lead>(leads, (l: Lead) => l.status);
  const bySource  = countBy<Lead>(leads, (l: Lead) => l.source);
  const byType    = countBy<Lead>(leads, (l: Lead) => l.enquiryType);
  const byAgent   = countBy<Lead>(leads, (l: Lead) => l.assignedAgent ?? 'Unassigned');
  const propStat  = countBy<CRMProperty>(properties, (p: CRMProperty) => p.status);
  const propCat   = countBy<CRMProperty>(properties, (p: CRMProperty) => p.category);
  const taskStat  = countBy(tasks, t => t.status);

  const maxStatus = Math.max(...Object.values(byStatus));
  const maxSource = Math.max(...Object.values(bySource));
  const maxType   = Math.max(...Object.values(byType));
  const maxProp   = Math.max(...Object.values(propCat));

  const wonPct = leads.length ? ((byStatus['Won'] ?? 0) / leads.length * 100).toFixed(0) : '—';
  const availPct = properties.length ? ((propStat['Available'] ?? 0) / properties.length * 100).toFixed(0) : '—';

  const colours = ['bg-amber-500','bg-blue-500','bg-green-500','bg-purple-500','bg-rose-500','bg-teal-500','bg-orange-500'];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Reports</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pipeline summary — all data from localStorage</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total leads',      value: leads.length,      icon: Users,     bg: 'bg-blue-50 dark:bg-blue-900/20', ic: 'text-blue-600 dark:text-blue-400' },
          { label: 'Win rate',         value: `${wonPct}%`,      icon: TrendingUp, bg: 'bg-green-50 dark:bg-green-900/20', ic: 'text-green-600 dark:text-green-400' },
          { label: 'Active listings',  value: propStat['Available'] ?? 0, icon: Building2, bg: 'bg-amber-50 dark:bg-amber-900/20', ic: 'text-amber-600 dark:text-amber-400' },
          { label: 'Open tasks',       value: (taskStat['Pending'] ?? 0) + (taskStat['In Progress'] ?? 0), icon: BarChart2, bg: 'bg-purple-50 dark:bg-purple-900/20', ic: 'text-purple-600 dark:text-purple-400' },
        ].map(({ label, value, icon: Icon, bg, ic }) => (
          <div key={label} className={`${bg} rounded-xl p-4 border border-transparent`}>
            <Icon className={`w-5 h-5 ${ic} mb-2`} />
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Leads by status" icon={Users}>
          {Object.entries(byStatus).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={maxStatus} colour={colours[i % colours.length]} />
          ))}
        </Section>

        <Section title="Leads by source" icon={TrendingUp}>
          {Object.entries(bySource).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={maxSource} colour={colours[i % colours.length]} />
          ))}
        </Section>

        <Section title="Leads by enquiry type" icon={Users}>
          {Object.entries(byType).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={maxType} colour={colours[i % colours.length]} />
          ))}
        </Section>

        <Section title="Leads by agent" icon={Users}>
          {Object.entries(byAgent).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={Math.max(...Object.values(byAgent))} colour={colours[i % colours.length]} />
          ))}
        </Section>

        <Section title="Properties by status" icon={Building2}>
          {Object.entries(propStat).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={Math.max(...Object.values(propStat))} colour={colours[i % colours.length]} />
          ))}
          <p className="text-xs text-slate-400 pt-1">{availPct}% of stock available</p>
        </Section>

        <Section title="Properties by category" icon={Building2}>
          {Object.entries(propCat).sort((a,b) => b[1]-a[1]).map(([k,v], i) => (
            <BarRow key={k} label={k} value={v} max={maxProp} colour={colours[i % colours.length]} />
          ))}
        </Section>
      </div>
    </div>
  );
}
