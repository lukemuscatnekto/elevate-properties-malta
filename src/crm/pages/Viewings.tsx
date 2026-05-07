import { useMemo } from 'react';
import { Calendar, User, Building2 } from 'lucide-react';
import { getViewings, getLeads, getProperties } from '../utils/storage';

const STATUS_COLOUR: Record<string, string> = {
  Scheduled:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Completed:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Cancelled:  'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  'No-Show':  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function Viewings() {
  const viewings   = useMemo(() => getViewings().sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()), []);
  const leads      = useMemo(() => getLeads(), []);
  const properties = useMemo(() => getProperties(), []);

  const getLead = (id: string) => leads.find(l => l.id === id);
  const getProp = (id: string) => properties.find(p => p.id === id);

  return (
    <div className="space-y-4 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Viewings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{viewings.length} total</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
        {viewings.map(v => {
          const lead = getLead(v.leadId);
          const prop = getProp(v.propertyId);
          return (
            <div key={v.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4">
              <div className="shrink-0">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {new Date(v.scheduledAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  <span className="text-slate-400 text-xs">
                    {new Date(v.scheduledAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 min-w-0">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {lead ? `${lead.firstName} ${lead.lastName}` : <span className="text-slate-400 italic">Unknown lead</span>}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 min-w-0">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{prop?.title ?? <span className="text-slate-400 italic">Unknown property</span>}</span>
                </div>
                {v.feedback && (
                  <p className="text-xs text-slate-400 italic col-span-2 truncate">"{v.feedback}"</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {v.agent && <span className="text-xs text-slate-400">{v.agent}</span>}
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOUR[v.status]}`}>{v.status}</span>
              </div>
            </div>
          );
        })}
        {viewings.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No viewings scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
