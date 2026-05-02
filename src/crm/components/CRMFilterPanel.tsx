import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface CRMFilterPanelProps {
  title?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CRMFilterPanel({
  title = 'Search & Filter Options',
  defaultOpen = false,
  children,
}: CRMFilterPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-slate-500" />
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100">{children}</div>
      )}
    </section>
  );
}
