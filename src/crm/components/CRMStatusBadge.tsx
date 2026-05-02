interface CRMStatusBadgeProps {
  value: string;
  variant?: 'lead' | 'task' | 'property' | 'viewing' | 'auto';
}

// Maps a status string → tailwind classes. Keeps colour decisions in one place.
const COLOR_MAP: Record<string, string> = {
  // Leads
  'New': 'bg-sky-50 text-sky-700 border-sky-200',
  'Contacted': 'bg-violet-50 text-violet-700 border-violet-200',
  'Viewing Scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
  'Negotiating': 'bg-orange-50 text-orange-700 border-orange-200',
  'Won': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Lost': 'bg-rose-50 text-rose-700 border-rose-200',
  // Tasks
  'Pending': 'bg-slate-50 text-slate-700 border-slate-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
  // Properties
  'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Reserved': 'bg-amber-50 text-amber-700 border-amber-200',
  'Sold': 'bg-rose-50 text-rose-700 border-rose-200',
  'Let': 'bg-sky-50 text-sky-700 border-sky-200',
  'Pending Approval': 'bg-violet-50 text-violet-700 border-violet-200',
  'Draft': 'bg-slate-50 text-slate-600 border-slate-200',
  // Viewings
  'Scheduled': 'bg-sky-50 text-sky-700 border-sky-200',
  'Cancelled': 'bg-slate-100 text-slate-600 border-slate-200',
  'No Show': 'bg-rose-50 text-rose-700 border-rose-200',
  'Rescheduled': 'bg-amber-50 text-amber-700 border-amber-200',
  // Priorities
  'Low': 'bg-slate-50 text-slate-600 border-slate-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'High': 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function CRMStatusBadge({ value }: CRMStatusBadgeProps) {
  const cls = COLOR_MAP[value] ?? 'bg-slate-50 text-slate-600 border-slate-200';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${cls}`}
    >
      {value}
    </span>
  );
}
