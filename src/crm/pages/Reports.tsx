import { useEffect, useState } from 'react';
import CRMCard from '../components/CRMCard';
import { getLeads, getProperties, getTasks, getViewings } from '../utils/storage';
import type { Lead, CRMProperty, CRMTask, Viewing } from '../types';

function countBy<T>(arr: T[], keyFn: (x: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of arr) {
    const k = keyFn(item);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

function Bar({ label, value, total, color = 'bg-teal-500' }: { label: string; value: number; total: number; color?: string }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-1">
        <span>{label}</span>
        <span>{value} ({pct}%)</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Reports() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<CRMProperty[]>([]);
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [viewings, setViewings] = useState<Viewing[]>([]);

  useEffect(() => {
    setLeads(getLeads());
    setProperties(getProperties());
    setTasks(getTasks());
    setViewings(getViewings());
  }, []);

  const leadByStatus = countBy<Lead>(leads, (l: Lead) => l.status);
  const propByType = countBy<CRMProperty>(properties, (p: CRMProperty) => p.category);
  const propByLocality = countBy<CRMProperty>(properties, (p: CRMProperty) => p.location.locality);
  const taskByStatus = countBy<CRMTask>(tasks, (t: CRMTask) => t.status);
  const viewingByStatus = countBy<Viewing>(viewings, (v: Viewing) => v.status);

  // Monthly enquiry count over last 6 months
  const monthly: { month: string; count: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('en-GB', { month: 'short', year: '2-digit' });
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const count = leads.filter((l) => {
      const t = new Date(l.createdAt);
      return t >= d && t < next;
    }).length;
    monthly.push({ month: label, count });
  }
  const monthlyMax = Math.max(1, ...monthly.map((m) => m.count));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-800">Reports</h1>
        <p className="text-sm text-slate-500">High-level overview across leads, listings, viewings and tasks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CRMCard title="Leads by Status">
          <div className="space-y-3">
            {Object.entries(leadByStatus).map(([k, v]) => (
              <Bar key={k} label={k} value={v} total={leads.length} />
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Properties by Type">
          <div className="space-y-3">
            {Object.entries(propByType).map(([k, v]) => (
              <Bar key={k} label={k} value={v} total={properties.length} color="bg-amber-500" />
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Properties by Locality">
          <div className="space-y-3">
            {Object.entries(propByLocality).map(([k, v]) => (
              <Bar key={k} label={k} value={v} total={properties.length} color="bg-violet-500" />
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Tasks Overview">
          <div className="space-y-3">
            {Object.entries(taskByStatus).map(([k, v]) => (
              <Bar key={k} label={k} value={v} total={tasks.length} color="bg-sky-500" />
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Viewings Overview">
          <div className="space-y-3">
            {Object.entries(viewingByStatus).map(([k, v]) => (
              <Bar key={k} label={k} value={v} total={viewings.length} color="bg-rose-500" />
            ))}
          </div>
        </CRMCard>

        <CRMCard title="Monthly Enquiries (last 6 months)">
          <div className="flex items-end gap-3 h-40">
            {monthly.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-100 rounded-t-md flex items-end" style={{ height: '120px' }}>
                  <div
                    className="w-full bg-teal-500 rounded-t-md"
                    style={{ height: `${(m.count / monthlyMax) * 100}%` }}
                    title={`${m.count} enquiries`}
                  />
                </div>
                <p className="text-xs text-slate-500">{m.month}</p>
                <p className="text-xs font-medium text-slate-700">{m.count}</p>
              </div>
            ))}
          </div>
        </CRMCard>
      </div>
    </div>
  );
}
