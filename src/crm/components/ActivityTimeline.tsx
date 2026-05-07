import { useMemo } from 'react';
import {
  ArrowRightLeft, CheckSquare, Calendar, Globe, MessageSquare,
  UserPlus, Building2, Upload, Clock,
} from 'lucide-react';
import type { ActivityEvent, ActivityEventType } from '../types';
import { getActivityForEntity } from '../utils/storage';

interface ActivityTimelineProps {
  entityId: string;
  className?: string;
}

function icon(type: ActivityEventType) {
  switch (type) {
    case 'status_change':      return <ArrowRightLeft className="w-3.5 h-3.5" />;
    case 'task_created':       return <CheckSquare    className="w-3.5 h-3.5" />;
    case 'task_completed':     return <CheckSquare    className="w-3.5 h-3.5" />;
    case 'viewing_scheduled':  return <Calendar       className="w-3.5 h-3.5" />;
    case 'viewing_completed':  return <Calendar       className="w-3.5 h-3.5" />;
    case 'form_intake':        return <Globe          className="w-3.5 h-3.5" />;
    case 'note':               return <MessageSquare  className="w-3.5 h-3.5" />;
    case 'contact_created':    return <UserPlus       className="w-3.5 h-3.5" />;
    case 'property_added':     return <Building2      className="w-3.5 h-3.5" />;
    case 'csv_import':         return <Upload         className="w-3.5 h-3.5" />;
    default:                   return <Clock          className="w-3.5 h-3.5" />;
  }
}

function colour(type: ActivityEventType): string {
  switch (type) {
    case 'status_change':      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    case 'task_created':       return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    case 'task_completed':     return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
    case 'viewing_scheduled':  return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
    case 'viewing_completed':  return 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300';
    case 'form_intake':        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    case 'note':               return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    case 'contact_created':    return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
    case 'property_added':     return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300';
    default:                   return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
  }
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function EventRow({ event }: { event: ActivityEvent }) {
  const ic = icon(event.type);
  const cl = colour(event.type);
  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <span className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${cl}`}>
        {ic}
      </span>
      {/* Connector line (rendered by parent) */}
      <div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{event.description}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{fmtDate(event.timestamp)}</p>
      </div>
    </div>
  );
}

export default function ActivityTimeline({ entityId, className = '' }: ActivityTimelineProps) {
  const events = useMemo(
    () => getActivityForEntity(entityId).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    [entityId],
  );

  if (events.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400 dark:text-slate-500">No activity recorded yet.</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
      <div className="space-y-5">
        {events.map(ev => <EventRow key={ev.id} event={ev} />)}
      </div>
    </div>
  );
}
